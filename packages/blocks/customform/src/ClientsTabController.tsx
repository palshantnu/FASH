import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import i18n from "../../../components/src/i18n/i18n.config";
const navigation = require("react-navigation");
// Customizable Area Start
interface StylishReqAttributes {
  stylist_id: string,
  gender: string,
  colour: string,
  detail: string,
  min_price: number,
  max_price: number,
  status: string,
  buyer_name: string,
  buyer_profile: string,
  stylist_name: string,
  created_at: string;
}
interface StylishReqData {
  id: string,
  attributes: StylishReqAttributes
}
interface StylishRequestList {
  data: StylishReqData[]
  errors: object

}
interface APIPayloadType {
  endPoint: string;
  method: string;
  body?: object;
  token?: string;
  contentType?: string;
  type?: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: typeof navigation;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  itemList: any[];
  requestArr: StylishReqData[]
  isLoading: boolean;
  localCurrency: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ClientsTabController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  stylishListApiCallID: string = '';
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      itemList: [
        { name: i18n.t('my_clients'), screenName: 'MyClients' },
        { name: i18n.t('styling_requests'), screenName: 'StylingRequestList' },
        { name: i18n.t('call_back_requests'), screenName: 'CallRequestList' },
      ],
      requestArr: [],
      isLoading: false,
      localCurrency: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getStylingList()
    this.props.navigation.addListener("willFocus", async () => {
      let currencyGet = await getStorageData('currencyIcon', true)
      this.setState({ localCurrency: currencyGet })
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start 
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.stylishListApiCallID) {
          this.getListSuccessResponse(responseJson)
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start

  getListSuccessResponse = (responseJson: StylishRequestList) => {
    if (responseJson.data && !responseJson.errors) {
      const numberOfItemsToDisplay = 2;
      const listArr = responseJson.data; // listArr is an array
      const limitedData = listArr.slice(0, numberOfItemsToDisplay); // Use slice to get first 2 items

      this.setState({ isLoading: false, requestArr: limitedData });
    } else {
      this.setState({ isLoading: false, requestArr: [] });
    }
  }


  apiCall = async (data: APIPayloadType) => {
    this.setState({ isLoading: true })
    let token = await getStorageData('token', true)
    const { contentType, method, endPoint, body } = data;
    const header = {
      "Content-Type": contentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getStylingList = async () => {
    this.setState({ isLoading: true })
    this.stylishListApiCallID = await this.apiCall({
      method: configJSON.validationApiMethodType,
      endPoint: 'bx_block_custom_form/hire_stylist_custom_forms',
      contentType: configJSON.validationApiContentType,
    })

  }

  navigationRequestDetailsHandler = (id: string) => {
    this.props.navigation.navigation.navigate("StlyingRequestDetails", { param1: id, callBack: this.getStylingList, type: 'ClientTab' })
  }

  onGoback = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), 'ClientsAndChatTab');
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
    this.send(message)
  }

  getReqStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return i18n.t('requested');
      case 'accepted':
        return i18n.t('accepted');
      case 'rejected':
        return i18n.t('rejected');
      default: return '';

    }
  }

  getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#D1FAE5';
      case 'accepted':
        return '#FFE7D0';
      case 'rejected':
        return '#eb9696';
      default: return '#ffffff';

    }
  }
  getStatusTextColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#059669';
      case 'accepted':
        return '#BE5B00';
      case 'rejected':
        return '#de1212';
      default: return '#ffffff';

    }
  }

  onHandleScreen = (screenName: string) => {
    setStorageData("navigationType", "ClientsAndChatTab")
    this.props.navigation.navigation.navigate(screenName)
  }
  // Customizable Area End

}