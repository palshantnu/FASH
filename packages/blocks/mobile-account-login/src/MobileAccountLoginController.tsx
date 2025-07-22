import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import storage from "../../../framework/src/StorageProvider";
import { MobileLoginSuccessResponse } from "./responses";
import { showMessage } from "react-native-flash-message";
import { GoogleSignin,statusCodes } from '@react-native-community/google-signin';
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Platform } from "react-native";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  countryCodeSelected: string;
  mobileNo: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;

  placeHolderCountryCode: string;
  placeHolderMobile: string;
  placeHolderPassword: string;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  labelForgotPassword: string;
  btnTxtEmailLogin: string;
  mobileNoError: boolean;
  loading: boolean;
  dropdownOpen: boolean;
  selectedCodeIndex: number;
  countryList: CountryData[];
  roleId:number;
  emailOnly: boolean;
  currency:number;
  language:number;
  loginProvider : string;
  guestRedirectKeyMobile:string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class MobileAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiPhoneLoginCallId = "";
  countryCodeApiCallId = "";
  socialLoginPhoneApiCallId = "";
  labelTitle: string;
  private readonly errorTitle = "Error";
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ];

    this.state = {
      countryCodeSelected: "+965",
      mobileNo: "",
      placeHolderCountryCode: "Select Country",
      enablePasswordField: true,
      checkedRememberMe: false,

      placeHolderMobile: configJSON.placeHolderMobile,
      placeHolderPassword: configJSON.placeHolderPassword,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      labelForgotPassword: configJSON.labelForgotPassword,
      btnTxtEmailLogin: configJSON.btnTxtEmailLogin,
      mobileNoError: false,
      loading: false,
      dropdownOpen: false,
      selectedCodeIndex: 0,
      countryList: [],
      roleId: 0,
      emailOnly: false,
      currency:0,
      language:0,
      loginProvider : "",
      guestRedirectKeyMobile:''
    };

    this.labelTitle = configJSON.labelTitle;
    this.googleConfigurePhone()
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchCountryCodes();
    const role = await getStorageData("FA_LOGIN_ROLE", false);
    this.setState({
      roleId: parseInt(role),
      emailOnly: [1, 2,3].includes(parseInt(role))
    })
    let currency = await getStorageData("FA_CURRENCY")
    let language = await getStorageData('FA_LANGUAGE');
    this.setState({language:language,currency:currency})
    let redirectKeyPhone = await getStorageData('guestBuyerRedirectKey')
    if(redirectKeyPhone != null)
    {
      this.setState({guestRedirectKeyMobile:redirectKeyPhone})
    }
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.setState({ loading: false });

    const responseMessageId = getName(MessageEnum.RestAPIResponceMessage);
    const responseDataMessageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (message.id === responseMessageId) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      switch (responseDataMessageId) {
        case this.countryCodeApiCallId:
          const kuwaitIndex = responseJson.findIndex((c: CountryData) => c.country_code === 'KW')
          this.setState({
            countryList: responseJson,
            selectedCodeIndex: kuwaitIndex,
            countryCodeSelected: responseJson[kuwaitIndex].numeric_code,
            loading: false
          });
          break;
        case this.apiPhoneLoginCallId:
          await this.handlePhoneLoginResponse(responseJson);
          break;
          case this.socialLoginPhoneApiCallId:
          if (responseJson) {
            //Need To send Login token message to save for future call
            this.manageSocialConditionPhone(responseJson)
          }
          break;
        default:
          break;
      }

      this.parseApiCatchErrorResponse(errorReponse);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }
  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.mobileNo);

    msg.addData(
      getName(MessageEnum.LoginCountryCode),
      this.state.countryCodeSelected
    );

    this.send(msg);
  }

  saveLoggedInUserDataPhone(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );
      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      setStorageData("UserFullName", JSON.stringify(responseJson.meta.account.full_name));
      setStorageData("userID", JSON.stringify(responseJson.meta.id))
      this.send(msg);
    }
  }

  openInfoPagePhone(responseJson: MobileLoginSuccessResponse) {
    const pages: Record<string, MessageEnum> = {
      buyer: MessageEnum.NavigationPhoneVerificationMessage,
      seller: MessageEnum.NavigationPhoneVerificationMessage,
      driver: MessageEnum.NavigationPhoneVerificationMessage,
      stylist: MessageEnum.NavigationPhoneVerificationMessage,
    }
    const msg: Message = new Message(
      getName(pages[responseJson.meta.account.role] ?? MessageEnum.NavigationCategoryCatalogueMessage)
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    msg.addData(
      getName(MessageEnum.AuthTokenPhoneNumberMessage),
      {
       phone : this.state.mobileNo,
       token : responseJson.meta.token,
      }
    );

    this.send(msg);
  }

  handlePhoneLoginResponse = async (responseJson: MobileLoginSuccessResponse) => {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const modesMap: Record<string, string> = {
        "Buyer": "buyer", 
        "Seller": "seller", 
        "Stylist": "stylist", 
        "Delivery Partner": "driver"
      }
      const selectedModeStr = await storage.get("FA_LOGIN_MODE");
      const currencyLocal = await getStorageData("currencyIcon", true);
      if(responseJson.meta.account.role !== modesMap[selectedModeStr]) {
        return showMessage({
          message: i18n.t("loginErrorRole"),
          position: {top: 0},
          type: "warning"
        })
      }
      //Need To send Login token message to save for future call
      this.UpdateCurrencyAndLanguage(responseJson.meta.token, currencyLocal, i18n.language);
      this.saveLoggedInUserDataPhone(responseJson);
      this.sendLoginSuccessMessage();
      this.openInfoPagePhone(responseJson);
    } else {
      //Check Error Response
      this.sendLoginFailMessage();
      this.parseApiErrorResponse(responseJson);
    }
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToEmailLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  UpdateCurrencyAndLanguage (token : string, currency : string, lang : string) {
    const curr = currency == "$" ? 0 : 1;
    const language = lang == "en" ? 0 : 1;
    const headerx = {
        token: token,
        "Content-Type": configJSON.loginApiContentType,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.updateCurrLang+'?language='+language+'&currency='+curr
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headerx)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.APIMethodUpdate
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
} 

  doMobileLogIn(): boolean {
    if (this.state.mobileNo === null || this.state.mobileNo.length === 0) {
      this.setState({ mobileNoError: true });
      return false;
    }
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.loginApiContentType
    };
    const attrs = {
      full_phone_number: this.state.countryCodeSelected + this.state.mobileNo
    };
    const data = {
      type: "sms_account",
      attributes: attrs
    };
    const httpBody = {
      data: data
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiPhoneLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  signupRedirection = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  btnEmailLoginRedirection = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  fetchCountryCodes = () => {
    this.setState({ loading: true });
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.countryCodeApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryCodeApiEndpoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.countryCodeApiMethod
    );

    runEngine.sendMessage(message.id, message);
  };

  googleConfigurePhone = async()=>{
    if(Platform.OS === 'ios')
    {
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        webClientId: '462024028556-ah2pecaho521k772e1n789uhc28etd69.apps.googleusercontent.com',
        offlineAccess: true,
      });
    }else{
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        webClientId: '462024028556-e8t1e3qnu31q50r3gto9f7r728supic3.apps.googleusercontent.com',
        offlineAccess: true,
      });
    }
    let roleLocal = await getStorageData("FA_LOGIN_ROLE",true)
    this.setState({roleId:parseFloat(roleLocal)})
  }

  googleLoginPhone=async()=> {
    
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog:true,
      });
      const userInfo = await GoogleSignin.signIn();
      let result={ 
        'social_name':userInfo.user.name,
        'social_first_name':userInfo.user.givenName,
        'social_last_name':userInfo.user.familyName,
        'social_email':userInfo.user.email,
        'social_image':userInfo.user.photo,
        'social_type':'google',
        'logintype':'google',
        'social_id':userInfo.user.id
      }
      this.sendGoogleLoginApiPhone(result)

  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      runEngine.debugLog('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      runEngine.debugLog('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      runEngine.debugLog('Play Services Not Available or Outdated');
    } else {
      runEngine.debugLog('Some Other Error Happened',error);
    }
  }
  }

  sendGoogleLoginApiPhone = (result:any)=>{
    this.setState({loading:true, loginProvider : "google"})
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };
    const attrs = {
      provider:result.social_type,
      email:result.social_email,
      unique_auth_id:result.social_id,
      role:this.state.roleId,
      first_name : result.social_first_name,
      last_name : result.social_last_name,
    };

    const data = {
      type: "social_account",
      attributes: attrs,
    };
    const httpBody = {
      data: data,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.socialLoginPhoneApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.socialLoginPhoneAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  manageSocialConditionPhone = (responseJson:any)=>{
    this.setState({loading:false})
    if(responseJson.data != undefined)
    {
      let socialAttrPhone = responseJson.data.attributes
      if(!socialAttrPhone.activated)
      {
       if(socialAttrPhone.full_phone_number === null)
       {
          const msg: Message = new Message(
            getName(MessageEnum.NavigationSocialMediaAccountPhoneScreen)
          );
          msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
          msg.addData(getName(MessageEnum.accountIdMessage), responseJson.data.id);
          this.send(msg);
       } 
      }
    }else{
      if(responseJson.errors != undefined)
      {
        let socialAttrPhone = responseJson.errors[0]
        if(!socialAttrPhone.activated)
        {
          const msg: Message = new Message(
            getName(MessageEnum.NavigationSocialMediaAccountPhoneScreen)
          );

          msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

          msg.addData(getName(MessageEnum.accountIdMessage), socialAttrPhone.account_id);
          
          this.send(msg);
        }
      } else{
        this.handleAfterLogin();
        this.handleSucceessMsgMobile();
        this.saveLoggedInUserDataPhone(responseJson);
      }
    }
  }

  handleSucceessMsgMobile = () => {
    let loginSuccessMsg = "";
        if(this.state.loginProvider == "apple"){
          loginSuccessMsg = i18n.t("appleLoginSuccess");
        }
        else if(this.state.loginProvider == "google"){
          loginSuccessMsg = i18n.t("googleLoginSuccess");
        }
        showMessage({
          position: { top: 0 },
          message: loginSuccessMsg,
        });
  }

  handleAfterLogin = () => {
    let redirectBuyerSocial:MessageEnum;
    if(this.state.guestRedirectKeyMobile === '')
    {
      redirectBuyerSocial = MessageEnum.NavigationLandingPageMessage
    }else{
      redirectBuyerSocial = MessageEnum.NavigationShoppingCartOrdersMessage
    }
    setStorageData("autoLogin",JSON.stringify(194));
    removeStorageData("requireSignIn");
    const msg: Message = new Message(
      getName(redirectBuyerSocial)
    );

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msg);
  }
  appleLoginPhone = async()=>{
    try {
      const appleAuthRequestResponsePhone = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      this.appleLoginPhoneApi(appleAuthRequestResponsePhone);
    } catch (error) {
    }
  }

  appleLoginPhoneApi = (appleResponse:any)=>{
    this.setState({ loginProvider : "apple" });
      let attrsphone ={}
      if(appleResponse?.fullName?.familyName !== null)
      {
        setStorageData("appledata",JSON.stringify(appleResponse))
        attrsphone={
          provider: 'apple',
          email: appleResponse.email,
          unique_auth_id: appleResponse.identityToken,
          role: this.state.roleId,
          first_name: appleResponse?.fullName?.givenName,
          last_name: appleResponse.fullName.familyName,
          language:this.state.language,
          currency:this.state.currency
        }
      }else{
        attrsphone={
          provider: 'apple',
          email: null,
          unique_auth_id: appleResponse.identityToken,
          role: this.state.roleId,
          first_name: 'apple',
          last_name: 'apple',
          language:this.state.language,
          currency:this.state.currency
        }
      }

      const header = {
        "Content-Type": configJSON.loginApiContentType,
      };
  
      const data = {
        type: "social_account",
        attributes: attrsphone,
      };

      const httpBody = {
        data: data,
      };

      const requestMessageApplePhone = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.socialLoginPhoneApiCallId = requestMessageApplePhone.messageId;
      requestMessageApplePhone.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.socialLoginPhoneAPiEndPoint
      );
      requestMessageApplePhone.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessageApplePhone.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      requestMessageApplePhone.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.loginAPiMethod
      );
      runEngine.sendMessage(requestMessageApplePhone.id, requestMessageApplePhone);
  
      return true;
  }  
  // Customizable Area End
}
