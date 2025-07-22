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
  // Customizable Area Start
  loading: boolean;
  token: string;
  logoutModal:boolean;
   deleteDriverModal:boolean,
      userDriverId:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2driverprofileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOnlineOfflineId:string=""
  deleteAccountDriverApiCallId:string=""
  getUserDetailsDriverApiCallID:string=""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: '',
      logoutModal:false,
      deleteDriverModal:false,
      userDriverId:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getDriverData();
    this.props.navigation.addListener(
      "didFocus",
      async () => {
        this.getDriverData();
      }
    );
    // Customizable Area End
  }


  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    
      const messageDriverId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseDriverJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorDriverReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
  
      if (responseDriverJson) {
      
      if(messageDriverId===this.getUserDetailsDriverApiCallID){
        this.setState({userDriverId:responseDriverJson.data.id})
       
      }
      if(messageDriverId===this.deleteAccountDriverApiCallId){
        showMessage({
          message: i18n.t('deleteMassage'),
          type: "success",
          position: { top: 8 },
        });
        this.btnLogoutConfirmDriver()
      }
      }
  
      if (errorDriverReponse) {
        this.parseApiCatchErrorResponse(errorDriverReponse);
      }
      }
    // Customizable Area End
  }

  // Customizable Area Start

  getTokenProfileDriver = async() => {
    const token = await getStorageData("token", true);
    this.setState({ token })
  };

  btnTermConditionRedirection() {
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationTermsAndUseMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnPrivacyPolicyRedirection() {
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationTermsConditionsDetailMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  UpdateOnlineOffline = async () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getOnlineOfflineId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateOnlineStatus +"?latitude=22.6917&longitude=75.8314&driver_status=offline"
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );
    runEngine.sendMessage(message.id, message);
  };
  btnLogoutConfirmDriver = ()=>{
    removeStorageData('driverOnlineOffline')
    removeStorageData('storeAddressMap')
    removeStorageData('createStoreArr')
    removeStorageData('buyerAddAddressMap')
    removeStorageData('token')
    removeStorageData('autoLogin')
    this.UpdateOnlineOffline()
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

  goToDocumentsRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationDriverDocuments)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msgNavigation.addData(getName(MessageEnum.BidYourQuote), {
      from : "Profile",
    });
    this.send(msgNavigation);
  }

  driverPolicyRedirection = (policyType:string)=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationTermsConditionsDriverPolicy)
    );

    message.addData(getName(MessageEnum.PolicyTypePayloadMessage), policyType);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }

  driverProfileRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationProfileScreenMessage)
      );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnFAQRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationCustomisableProfileFaq)
      );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnContactUsRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationContactUsDriverMessage)
      );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnEditAddressRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationDriverEditAddressMessage)
      );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  btnRedirectPaymentMethodDriver = () => {
    const msgNavigation: Message = new Message(
    getName(MessageEnum.NavigationTappaymentsDriverBankDetail)
    );

    msgNavigation.addData(
    getName(MessageEnum.NavigationPropsMessage),
    this.props
    );

    this.send(msgNavigation);
  };

  btnRedirectEarningActivity = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationTappaymentDEarningActivity)
      );
  
    msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );
  
    this.send(msgNavigation);
  }

  btnAddVehicleRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationDriverShowVehicleMessage)
      );
  
    msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );
  
    this.send(msgNavigation);
  }
  getDriverData = async () => {
    const token = await getStorageData("token", true);
   if(token!==null){
    this.setState({ token },()=>{
      this.getUserDriverDetails()
    });
  }else{
    this.btnLogoutConfirmDriver()
  }
  };
  getUserDriverDetails = () => {
    
    let header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const getUserRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserDetailsDriverApiCallID = getUserRequestMessage.messageId;

    getUserRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    getUserRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileEndpoint
    );
    getUserRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(
      getUserRequestMessage.id,
      getUserRequestMessage
    );
    return getUserRequestMessage.messageId;
  };
  btnDriverDeleteConfirm= () => {
    this.setState({deleteDriverModal:false})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestDriverMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteAccountDriverApiCallId = requestDriverMessage.messageId;

    requestDriverMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteAPiMethod
    );
    requestDriverMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteProfileEndpoint + `${this.state.userDriverId}`
    );
    requestDriverMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestDriverMessage.id, requestDriverMessage);
  };
  deleteDriverModalClose=()=>{
    this.setState({deleteDriverModal:false})
  }
  deleteDriverModalOpen=()=>{
    this.setState({deleteDriverModal:true})
  }
  goToLanguageRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationBuyerLanguageAndCurrencyMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  // Customizable Area End
}
