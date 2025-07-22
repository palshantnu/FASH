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
    token:string;
    logoutModal:boolean;
    deleteStylistModal:boolean,
      userId:string
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2stylController extends BlockComponent<
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
      getName(MessageEnum.SessionResponseMessage),
      
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token:'',
      logoutModal:false,
         deleteStylistModal:false,
      userId:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

    async componentDidMount(): Promise<void> {
      this.getData();
      this.props.navigation.addListener(
        "didFocus",
        async () => {
          this.getData();
        }
      );
    }
    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({token:token})
        }
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
            
            if(messageId===this.getUserDetailsApiCallID){
              this.setState({userId:responseJson.data.id})
             
            }
            if(messageId===this.deleteAccountApiCallId){
              showMessage({
                message: i18n.t('deleteMassage'),
                type: "success",
                position: { top: 8 },
              });
              this.btnLogoutAndRedirectionStylist()
            }
            }
        
            if (errorReponse) {
              this.parseApiCatchErrorResponse(errorReponse);
            }
            }
        // Customizable Area End
    }

    getTokenStylist = () => {
        const msgToken: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msgToken);
    };

    termsUseRedirectionStylist = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTermsAndUseMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    privacyPolicyRedirectionStylist = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTermsConditionsDetailMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    shippingPolicyRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationShippingPolicyMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    returnPolicyRedirectionStylist = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationReturnPolicyMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    btnFaqRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationCustomisableProfileFaq)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    getHelpRedirectionStylist = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationContactUsMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    logoutModalOpen = ()=>{
        this.setState({logoutModal:true})
    }

    logoutModalClose = ()=>{
        this.setState({logoutModal:false})
    }

    btnNotSettingRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationNotificationsettingsStylist)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }
    btnEditProfileRedirection= ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationStylistEditProfile)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }
    btnLogoutAndRedirectionStylist = ()=>{
        
        removeStorageData('buyerAddAddressMap')
        removeStorageData('autoLogin')
        removeStorageData('storeAddressMap')
        removeStorageData('token')
        removeStorageData('createStoreArr')

        this.setState({logoutModal:false})
        const msgNavigationRedirect: Message = new Message(
            getName(MessageEnum.NavigationLoginOptionsMessage)
        );
    
        msgNavigationRedirect.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );
        
        const sessionMessageRemove = new Message(getName(MessageEnum.SessionSaveMessage));
        sessionMessageRemove.initializeFromObject({
        [getName(MessageEnum.SessionResponseData)]: {},
        [getName(MessageEnum.SessionResponseToken)]: null
        })

        this.send(sessionMessageRemove);

        this.send(msgNavigationRedirect);
    }
    btnPortfolioRedirection = () => {
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationPhotoLibrary)
          );
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
    }

    btnStylistAddress = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationAddressesMessage)
          );
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
    }

    btnStylistPaymentHistory = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationTappaymentsBuyerHistory)
          );
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
    }

    btnStylistEarningRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTappaymentSellerEarning)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    btnStylistBankRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTappaymentsDriverBankDetail)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    goToStylistLanguageRedirection = ()=>{
        const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationBuyerLanguageAndCurrencyMessage)
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
      }else{
        this.btnLogoutAndRedirectionStylist()
      }
      };
      getUserDetails = () => {
        
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
      btnStylistDeleteConfirm= () => {
        this.setState({deleteStylistModal:false})
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
          configJSON.deleteAPiMethod
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
      deleteStylistModalClose=()=>{
        this.setState({deleteStylistModal:false})
      }
      deleteStylistModalOpen=()=>{
        this.setState({deleteStylistModal:true})
      }
  // Customizable Area End
}
