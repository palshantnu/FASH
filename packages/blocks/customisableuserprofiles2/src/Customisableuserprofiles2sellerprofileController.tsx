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
    deleteSellerModal:boolean;
    userSellerId:string,
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2sellerprofileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
   deleteAccountSellerApiCallId:string=""
  getUserDetailsSellerApiCallID:string=""
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
       deleteSellerModal:false,
      userSellerId:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

    async componentDidMount(): Promise<void> {
        this.getSellerData();
    this.props.navigation.addListener(
      "didFocus",
      async () => {
        this.getSellerData();
      }
    );
    }
    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    
            const messageSellerId = message.getData(
              getName(MessageEnum.RestAPIResponceDataMessage)
            );
            const responseSellerJson = message.getData(
              getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            const errorSellerReponse = message.getData(
              getName(MessageEnum.RestAPIResponceErrorMessage)
            );
        
            if (responseSellerJson) {
           
            if(messageSellerId===this.getUserDetailsSellerApiCallID){
              this.setState({userSellerId:responseSellerJson.data.id})
             
            }
            if(messageSellerId===this.deleteAccountSellerApiCallId){
              showMessage({
                message: i18n.t('deleteMassage'),
                type: "success",
                position: { top: 8 },
              });
              this.btnLogoutAndRedirection()
            }
            }
        
            if (errorSellerReponse) {
              this.parseApiCatchErrorResponse(errorSellerReponse);
            }
            }
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    profileScreenRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationProfileScreenMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    notificationStatusRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationSellerNotificationStatusMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    adminRequestRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationSellerAdminRequestMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    termsUseRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTermsAndUseMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    privacyPolicyRedirection = ()=>{
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

    returnPolicyRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationReturnPolicyMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    faqRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationCustomisableProfileFaq)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    getHelpRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationContactUsMessage)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    btnLanguageRedirection = ()=>{
        const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationBuyerLanguageAndCurrencyMessage)
        );
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
    }

    btnLogoutAndRedirection = ()=>{
        removeStorageData('storeAddressMap')
        removeStorageData('autoLogin')
        removeStorageData('createStoreArr')
        removeStorageData('token')
        removeStorageData('buyerAddAddressMap')
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

    btnEarningRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTappaymentSellerEarning)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }

    btnBankRedirection = ()=>{
        const msg: Message = new Message(
            getName(MessageEnum.NavigationTappaymentsDriverBankDetail)
            );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
    }
    getSellerData = async () => {
        const token = await getStorageData("token", true);
        if(token!==null){
        this.setState({ token },()=>{
          this.getSellerUserDetails()
        });
      }else{
        this.btnLogoutAndRedirection()
      }
      };
      getSellerUserDetails = () => {
        
        let header = {
          "Content-Type": configJSON.validationApiContentType,
          token: this.state.token,
        };
        const getUserSellerInfoRequestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getUserDetailsSellerApiCallID = getUserSellerInfoRequestMessage.messageId;
    
        getUserSellerInfoRequestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        getUserSellerInfoRequestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getProfileEndpoint
        );
        getUserSellerInfoRequestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.validationApiMethodType
        );
        runEngine.sendMessage(
          getUserSellerInfoRequestMessage.id,
          getUserSellerInfoRequestMessage
        );
        return getUserSellerInfoRequestMessage.messageId;
      };
      btnSellerDeleteConfirm= () => {
        this.setState({deleteSellerModal:false})
        const header = {
          "Content-Type": configJSON.validationApiContentType,
          token: this.state.token,
        };
        const requestSellerMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.deleteAccountSellerApiCallId = requestSellerMessage.messageId;
    
        requestSellerMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.deleteAPiMethod
        );
        requestSellerMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.deleteProfileEndpoint + `${this.state.userSellerId}`
        );
        requestSellerMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
    
        runEngine.sendMessage(requestSellerMessage.id, requestSellerMessage);
      };
      deleteSellerModalClose=()=>{
        this.setState({deleteSellerModal:false})
      }
      deleteSellerModalOpen=()=>{
        this.setState({deleteSellerModal:true})
      }
  // Customizable Area End
}
