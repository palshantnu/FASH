import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Starts
import { getStorageData } from "../../../framework/src/Utilities";
import { Category } from "./response";
import i18n from '../../../components/src/i18n/i18n.config';
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
  fromWishlist: boolean;
  token:string,
  userRole:string,
  isItfromstylist:boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CategoriesCatalogueController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getUserApiCallIDs:string=""
  willFocusListener:string=""
  getCategorysApiCallId:string=""
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      fromWishlist: false,
      token:"",
      userRole:"",
      isItfromstylist:false
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
  if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (responseJson) {
   
    if(messageId===this.getUserApiCallIDs){
      this.setState({userRole:responseJson.data.attributes.id_proof.record.role})
    }
    if (messageId === this.getCategorysApiCallId) {
      this.subCategoryPageRedirection(responseJson.data)
    }
  }
  }
   
  }
  subCategoryPageRedirection = (categoryItem: Category[]) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationSubCateMessage)
    );
    message.initializeFromObject({
      [getName(MessageEnum.categoryIdMessage)]: categoryItem[0].id,
      [getName(MessageEnum.categoryNameMessage)]: categoryItem[0].attributes.name,
      [getName(MessageEnum.categoryArrMessage)]: categoryItem,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };
  async componentDidMount() {
   
    super.componentDidMount();
   
    this.getDatas();
    this.props.navigation.addListener(
      "willFocus",
      async () => {
        const stylistCheck = await getStorageData("stylistFromwishlist");
        this.setState({isItfromstylist:stylistCheck})
        this.getDatas();
      }
    );
   
  }
 
  getDatas = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token },()=>{
      this.getProfileDataResponse()
    });
  };
  categoryStoreRedirection = (catalogueType: string) => {
    
    if((this.state.userRole==="buyer" || this.state.userRole==="") && catalogueType==="category"){
      this.getCategoriresData(i18n.language);
    }else{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCategoriesMessage)
    );
    msg.addData(getName(MessageEnum.catalogueType), catalogueType);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  };
  getCategoriresData = (languageSet:string) => {
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCategorysApiCallId = requestMessage.messageId;
    if(languageSet === 'ar')
    {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.categoryAPIEndPoint+'?language=arabic'
      );
    }else{
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.categoryAPIEndPoint
      );
    }
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  redirectGoHome =async () => {
    if (this.state.userRole==="buyer" || this.state.userRole==="") {
      this.goBacktolanding()
      return;
    }
    this.props.navigation.pop();
  };
  getProfileDataResponse = () => {
   
    let header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };
    const getUserInfoRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserApiCallIDs = getUserInfoRequestMessage.messageId;

    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileEndpoints
    );
    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    runEngine.sendMessage(
      getUserInfoRequestMessage.id,
      getUserInfoRequestMessage
    );
    return getUserInfoRequestMessage.messageId;
  };
  goBacktolanding=()=>{
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "LandingPage"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs);
  }

  // Customizable Area End
}
