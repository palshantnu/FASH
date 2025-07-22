import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { currencyList, myURL } from "../__mocks__/mocks";

// Customizable Area Start
export interface ICurrencyList {
  currency: string;
  code: string;
}
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
  isLoading: boolean;
  chargeId: string;
  amount: string;
  refTransactionId: string;
  refOrderId: string;
  selectedCurrency: string;
  isLoadingWebhook: boolean;
  currencyList: ICurrencyList[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TappaymentsintegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  postChargeApiCallId: string = "";
  getWebhookApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isLoading: false,
      chargeId: "",
      amount: "",
      refTransactionId: "",
      refOrderId: "",
      selectedCurrency: "",
      isLoadingWebhook: false,
      currencyList: currencyList,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponse(message);
    } else if (
      getName(MessageEnum.NavigationPayLoadMessage) === message.id &&
      message.getData(configJSON.TapPaymentSuccessData)
    ) {
      const itemData = message.getData(
        configJSON.TapPaymentSuccessData
      );
      if (itemData.updateData) {
        const updateData = itemData.updateData;
        if (updateData === true) {
          this.webhookCall();
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  addAmount = (amount: string) => {
    this.setState({ amount: amount.replace(/\D/gm, "") });
  };

  addTransactionId = (transactionId: string) => {
    this.setState({ refTransactionId: transactionId });
  };

  addReferenceId = (orderId: string) => {
    this.setState({ refOrderId: orderId });
  };

  handleApiResponse = (message: Message) => {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errInResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errInResponse || responseJson.error || responseJson.errors) {
      this.setState({ isLoading: false, isLoadingWebhook: false });
      (errInResponse || responseJson.errors) &&
        this.parseApiErrorResponse(errInResponse);
      responseJson.error && this.parseApiCatchErrorResponse(responseJson.error);
    } else if (apiRequestCallId === this.postChargeApiCallId) {
      this.setState({
        isLoading: false,
        chargeId: responseJson.id,
      });
      const message: Message = new Message(
        getName(MessageEnum.NavigationMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        configJSON.tapPaymentWebviewOpen
      );
      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      raiseMessage.addData(configJSON.TapPaymentNavigationData, {
        WebUrl: responseJson.transaction.url,
      });
      message.addData(
        getName(MessageEnum.NavigationRaiseMessage),
        raiseMessage
      );
      this.send(message);
    } else if (apiRequestCallId === this.getWebhookApiCallId) {
      this.setState({
        isLoadingWebhook: false,
      });
      if (
        responseJson.success === "false" ||
        responseJson.success === false ||
        responseJson.reason === configJSON.retry
      ) {
        this.webhookCall();
      } else if (
        responseJson.success === "true" ||
        responseJson.success === true ||
        responseJson.status === configJSON.captured
      ) {
        this.setState({
          amount: "",
          refTransactionId: "",
          refOrderId: "",
          selectedCurrency: "",
        });
        this.showAlert(configJSON.success, configJSON.successTransaction);
      } else {
        this.showAlert(configJSON.failed, configJSON.failedPayment);
      }
    }
  };

  setCurrency(item: { code: string }) {
    if (item.code !== this.state.selectedCurrency) {
      this.setState({
        selectedCurrency: item.code,
      });
    }
  }

  validateData = () => {
    const { amount, selectedCurrency, refOrderId, refTransactionId } =
      this.state;
    if (amount === "" || parseInt(amount, 10) > 10000) {
      this.showAlert("", configJSON.errorAmount);
      return;
    } else if (selectedCurrency === "") {
      this.showAlert("", configJSON.errorCurrency);
      return;
    } else if (refTransactionId === "") {
      this.showAlert("", configJSON.errorTransactionId);
      return;
    } else if (refOrderId === "") {
      this.showAlert("", configJSON.errorOrderId);
      return;
    }
    this.callChargeApi();
  };

  callChargeApi = () => {
    this.setState({
      isLoading: true,
    });
    this.hideKeyboard();
    const header = {
      "Content-Type": configJSON.apiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const bodyParams = {
      amount: this.state.amount,
      currency: this.state.selectedCurrency,
      save_card: false,
      reference: {
        transaction: this.state.refTransactionId,
        order: this.state.refOrderId,
      },
      // Change this details when needed
      customer: {
        first_name: "test",
        middle_name: "test",
        last_name: "test",
        email: "test@test.com",
        phone: {
          country_code: 965,
          number: 51234567,
        },
      },
      redirect: {
        url: myURL,
      },
    };
    this.postChargeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.chargeApi
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyParams)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  webhookCall = () => {
    this.setState({
      isLoadingWebhook: true,
    });

    const header = {
      "Content-Type": configJSON.apiContentType,
    };
    const requestMessageWebhook = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getWebhookApiCallId = requestMessageWebhook.messageId;
    requestMessageWebhook.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessageWebhook.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.webhookApi}${this.state.chargeId}`
    );
    requestMessageWebhook.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    setTimeout(() => {
      runEngine.sendMessage(requestMessageWebhook.id, requestMessageWebhook);
    }, 5000);
  };
  // Customizable Area End
}
