import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
import {
  OrderListResponse,
  InitiateRefundResponse,
} from "../__tests__/__mocks__/types";
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  loading: boolean;
  error: string;
  orderId: string;
  orderNumber: string;
  refundAmount: string;
  refundAmountBackup: string;
  refund_amount_price: string;
  refund_error_message: string;
  currencyIcon: string;
  languageType:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InitiateRefundController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderApiCallId = "";
  initiateRefundApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: true,
      orderId: "",
      error: "",
      orderNumber: "",
      refundAmount: "",
      refundAmountBackup: "",
      refund_amount_price: '',
      refund_error_message: '',
      currencyIcon: '',
      languageType:"en"
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const orderNumber = message.getData(
        getName(MessageEnum.NavigationRejectReturnOrderId)
      );
      let params = message.getData(getName(MessageEnum.NavigationPayLoadMessage));

      this.setState({ refund_amount_price: params.amountID })
      return this.setState({ orderNumber }, this.getOrderId);
    }
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      return this.setState({ token }, this.getOrderId);
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      this.handleApiResponses(apiCallId, response);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.send(new Message(getName(MessageEnum.SessionRequestMessage)));
    this.getCurrencyIcon()

    this.props.navigation.addListener("willFocus", async() => {
      let language = await getStorageData('FA_LANGUAGE_ST')
      if(language){            
        this.setState({languageType:language})
      }
  });
  };

  getCurrencyIcon = async () => {
    let currencyIcon = await getStorageData('currencyIcon', true)
    this.setState({ currencyIcon: currencyIcon })
  }

  handleApiResponses = (apiCallId: string, response: unknown) => {
    if (apiCallId === this.getOrderApiCallId) {
      const json = response as OrderListResponse;
      if (json.orders) {
        const order = json.orders.data[0];
        let refundAmount = 0;
        order.attributes.order_items.forEach((item) => {
          refundAmount += parseFloat(item.attributes.unit_price);
        });

        this.setState({
          orderId: order.id,
          refundAmount: parseInt(String(refundAmount)).toString(),
          refundAmountBackup: parseInt(String(refundAmount)).toString(),
        });
      } else {
        showMessage({
          message: json.error || "Something went wrong",
          position: { top: 8 },
        });
      }
      this.getOrderApiCallId = "";
      this.setState({ loading: false });
      return;
    }
    if (apiCallId === this.initiateRefundApiCallId) {
      const refund = response as InitiateRefundResponse;
      if (refund.data) {
        showMessage({
          message: i18n.t('initiateRefundSuccessfully'),
          position: { top: 8 },
        });
        this.setState({ loading: false });
        this.props.navigation.goBack();
      } else {
        const error = Array.isArray(refund.error)
          ? refund.error[0].message
          : refund.error;

        this.setState({ loading: false, refund_error_message: error });
      }
    }
  };

  getOrderId = () => {
    if (this.state.token && this.state.orderNumber) {
      const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.searchEndpoint + this.state.orderNumber,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.getMethod,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
          token: this.state.token,
          "Content-type": configJSON.validationApiContentType,
        },
      });

      this.setState({ loading: true });
      this.getOrderApiCallId = message.messageId;
      runEngine.sendMessage(message.messageId, message);
    }
  };

  goBack = () => this.props.navigation.goBack();

  // onRefundAmountChange = (text: string) => {
  //   if (/^\d*$/.test(text)) {
  //     return this.setState({ refundAmount: text, error: "" });
  //   }
  // };

  initateRefund = () => {
    if (!this.state.refundAmount) {
      this.setState({ error: `*${i18n.t('refundAmountCannotEmpty')}` });
      return;
    }
    if (
      Number(this.state.refundAmount) > Number(this.state.refundAmountBackup)
    ) {
      this.setState({ error: i18n.t('refundAmountCannotMoreSaleAmount') });
      return;
    }

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const query =
      `?type=initiate_refund` +
      `&seller_order_id=${this.state.orderId}` +
      `&refund_amount=${this.state.refundAmount}`;

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateStatusEndpoint + query,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.putAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });

    this.setState({ loading: true });
    this.initiateRefundApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };
  // Customizable Area End
}
