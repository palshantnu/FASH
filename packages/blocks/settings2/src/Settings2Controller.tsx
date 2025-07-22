import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import {removeStorageData,getStorageData} from "../../../framework/src/Utilities"
import i18n from '../../../components/src/i18n/i18n.config'

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  isLoading: boolean;
  token: string;
  // Customizable Area Start
  logoutModal:boolean;
  deleteModal:boolean;
  userId:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Settings2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  deleteAccountApiCallId:string=""
  getUserDetailsApiCallID:string=""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      isLoading: false,
      token: '',
      // Customizable Area Start
      logoutModal:false,
      deleteModal:false,
      userId:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getData();
    this.props.navigation.addListener(
      "didFocus",
      async () => {
        this.getData();
      }
    );
    // Customizable Area End
  }


  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (responseJson) {
    this.setState({isLoading:false})
    if(messageId===this.getUserDetailsApiCallID){
      this.setState({userId:responseJson.data.id})
     
    }
    if(messageId===this.deleteAccountApiCallId){
      showMessage({
        message: i18n.t('deleteMassage'),
        type: "success",
        position: { top: 8 },
      });
      this.btnLogoutConfirm()
    }
    }

    if (errorReponse) {
      this.parseApiCatchErrorResponse(errorReponse);
    }
    }
    // Customizable Area End
  }



  // web events
  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  myProfileNav() {
    // @ts-ignore
    this.props.navigation.navigate('ProfileScreen')
  }
  goToTNC() {
    // @ts-ignore
    this.props.navigation.navigate('TermsConditionsUsers')
  }

  goToPnc() {
    this.props.navigation.navigate('TermsConditionsDetail')
  }

  goToShippingPlcy() {
    this.props.navigation.navigate('ShippingPolicy')
  }

  goToReturnPlcy() {
    this.props.navigation.navigate('ReturnPolicy')
  }
  nevFAQ() {
    this.props.navigation.navigate('Customisableuserprofiles2Faq')
  }
  nevContactus() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationContactUsSupportMessage)
    );

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msg);
  }
  goToAdress() {
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationAddressesMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  goToLanguageRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationBuyerLanguageAndCurrencyMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnLogoutConfirm = ()=>{
    removeStorageData('storeAddressMap')
    removeStorageData('createStoreArr')
    removeStorageData('buyerAddAddressMap')
    removeStorageData('token')
    removeStorageData('autoLogin')
    this.setState({logoutModal:false})
    const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationLoginOptionsMessage)
    );

    msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
    );

    const sessionMessage = new Message(getName(MessageEnum.SessionSaveMessage));
    sessionMessage.initializeFromObject({
      [getName(MessageEnum.SessionResponseData)]: {},
      [getName(MessageEnum.SessionResponseToken)]: null
    })

    this.send(sessionMessage);

    this.send(msgNavigation);
  }

  logOutModalOpen = ()=>{
    this.setState({logoutModal:true})
  }
  logOutModalClose = ()=>{
    this.setState({logoutModal:false})
  }
  deleteModalOpen=()=>{

 this.setState({deleteModal:true})
  }
  deleteModalClose = ()=>{
    this.setState({deleteModal:false})
  }
  orderPageRedirection = (orderType:string)=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), orderType);

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }

  goToAllOrderRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationBuyerAllOrder)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  goToSavedCards = () => {
    const savedCardsMessage = new Message(
      getName(MessageEnum.NavigationSavedCards)
    );
    savedCardsMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(savedCardsMessage);
  };

  goToPaymentHistory = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationTappaymentsBuyerHistory)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnRedirectFavStylist = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationCustomformBuyerfavStylist)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  getData = async () => {
    const token = await getStorageData("token", true);
    if(token!==null){
      this.setState({ token },()=>{
        this.getUserDetails()
      });
    } else {
      this.setState({ isLoading: false });
    }
  };
  getUserDetails = () => {
    this.setState({ isLoading: true });
    let header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const getUserInfoRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserDetailsApiCallID = getUserInfoRequestMessage.messageId;

    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileEndpoint
    );
    getUserInfoRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(
      getUserInfoRequestMessage.id,
      getUserInfoRequestMessage
    );
    return getUserInfoRequestMessage.messageId;
  };
  btnDeleteConfirm= () => {
    this.setState({deleteModal:false,isLoading:true})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteAccountApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteProfileEndpoint + `${this.state.userId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  loyatyRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationLoyaltyPoints)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  loginAction = () => {
    const messageOrder: Message = new Message(
        getName(MessageEnum.NavigationMessage)
    );
    messageOrder.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'EmailAccountLoginBlock'
    );
    messageOrder.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messageOrder);
}
  // Customizable Area End
}
