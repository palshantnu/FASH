import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import i18n from "../../../components/src/i18n/i18n.config";
const navigation = require("react-navigation");
// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";

interface APIPayloadType {
  endPoint: string;
  method: string;
  body?: object;
  token?: string;
  contentType?: string;
  type?: string;
}
interface StylishAttributes {
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
  created_at: string,
}
 interface StylishData {
  id: string,
  attributes:StylishAttributes
 }
interface RequestList {
  data: StylishData[]
  errors:object
 
}
export type PlatformKeys = "ios" | "android";
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
  stylingrequestArr: StylishData[]
  isLoading: boolean;
  localCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class StylingRequestsListController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  stylingListApiCallID: string = '';
  PlatformCss: Record<PlatformKeys, number> = {
    ios: 20,
    android: 0,
};
  PlatformHeaderCss: Record<PlatformKeys, number> = {
  ios: 10,
  android: 0,
  };
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
      isLoading: false,
      stylingrequestArr: [],
      localCurrency:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.props.navigation.addListener("willFocus", async() => {
      let currencyGet = await getStorageData('currencyIcon', true)
      this.setState({ localCurrency: currencyGet })
    });
    this.getStylingRequestList()
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
          if (apiRequestCallId === this.stylingListApiCallID) {
            this.getListSuccessResponse(responseJson)
          }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getListSuccessResponse = (response:RequestList) => {
    if(response.data && !response.errors){
      this.setState({ isLoading: false, stylingrequestArr: response.data })
    }else{
      this.getListFailureResponse(response) 
    }
    

  }
  getListFailureResponse = (error: object) => {
    this.setState({ isLoading: false, stylingrequestArr:[]})
  }

  apiCall = async (data:APIPayloadType) => {
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
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),method);

    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getStylingRequestList = async () => {
    this.setState({isLoading:true})
    this.stylingListApiCallID = await this.apiCall({
      method: configJSON.validationApiMethodType,
      endPoint: 'bx_block_custom_form/hire_stylist_custom_forms',
      contentType: configJSON.validationApiContentType,
    })

  }

  navigationHandler = (id:string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "StlyingRequestDetails");
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
      )
    message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      param1: id ,callBack: this.getStylingRequestList
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message)
  }
  onGoback = async () => {
    const navigaionType = await getStorageData("navigationType");
    const msg: Message = new Message(getName(MessageEnum.NavigationMessage));
    msg.addData(getName(MessageEnum.NavigationTargetMessage), navigaionType );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msg);
  }
  getStatusBackgroundColor = (status:string) =>{
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
  getStatusColor = (status:string) =>{
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
  getStatus = (status:string) =>{
    switch (status) {
     case 'pending':
      return i18n.t('new_request');
    case 'accepted':
      return i18n.t('accepted');  
    case 'rejected':
      return i18n.t('rejected');
     default: return '';   

    }
  }
  // Customizable Area End

}