import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Platform,BackHandler } from "react-native";
import { imgPasswordInVisible } from "./assets";
import {
  isEmail,
  removeStorageData,
  setStorageData,
  getStorageData
} from "../../../framework/src/Utilities";
import {
  SuccessfulLoginResponse,
  SocialLoginResponse,
  Account,
} from "./response";
import storage from "../../../framework/src/StorageProvider";
import i18n from "../../../components/src/i18n/i18n.config";
import { showMessage } from "react-native-flash-message";
import { GoogleSignin } from "@react-native-community/google-signin";
import { appleAuth } from '@invertase/react-native-apple-authentication';
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
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: boolean;
  imgPasswordInVisible: boolean;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  email_error: boolean;
  password_error: boolean;
  loading: boolean;
  role: number;
  phoneLoginOnly: boolean;
  language:number;
  currency:number;
  LoginType : string;
  deviceId:string;
  guestRedirectKey:string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  labelTitle: string = "";
  socialLoginApiCallId: string = "";
  _didFocusSubscription= "";
  _willBlurSubscription = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      email_error: false,
      password_error: false,
      loading: false,
      role: 0,
      phoneLoginOnly: false,
      language:0,
      currency:0,
      LoginType : "",
      deviceId:'',
      guestRedirectKey:''
    };
    this.labelTitle = configJSON.labelTitle;
    this.googleConfigure();
    this.backHandleForApp();
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // Customizable Area Start
    const role = await getStorageData("FA_LOGIN_ROLE", false);
    this.setState({
      role: parseInt(role),
      phoneLoginOnly: [1, 2,3].includes(parseInt(role))
    })

    let language = await getStorageData('FA_LANGUAGE');
    let currency = await getStorageData("FA_CURRENCY")
    let deviceId = await getStorageData('USER_FCM_TOKEN')
    this.setState({language:language,currency:currency,deviceId:deviceId})
    let redirectKey = await getStorageData('guestBuyerRedirectKey')
    if(redirectKey != null)
    {
      this.setState({guestRedirectKey:redirectKey})
    }
    this._didFocusSubscription = this.props.navigation.addListener('willFocus', () =>
      BackHandler.addEventListener('hardwareBackPress', this.btnBackManage)
    );

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.btnBackManage)
    );
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const loginOptionsParams = message.getData(
        getName(MessageEnum.LoginOptionsNavigationDataMessage)
      );
      this.setState({ 
        role: parseInt(loginOptionsParams.role),
      });
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          this.handleLoginReponse(responseJson, errorReponse);
        } else if (apiRequestCallId === this.socialLoginApiCallId) {
          this.manageSocialCondition(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleLoginReponse = async (
    responseJson: SuccessfulLoginResponse,
    errorReponse: unknown
  ) => {
    this.setState({ loading: false });
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const modesMap: Record<string, string> = {
        Buyer: "buyer",
        Seller: "seller",
        Stylist: "stylist",
        "Delivery Partner": "driver",
      };
      const selectedModeStr = await storage.get("FA_LOGIN_MODE");
      if (responseJson.meta.account.role !== modesMap[selectedModeStr]) {
        return showMessage({
          message:i18n.t(
            "Select_diffrent_Account"),
          position: { top: 0 },
          type: i18n.t("warning"),
        });
      }
      runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
      const currencyLocal = await getStorageData("currencyIcon", true);
      this.UpdateTimeAndLanguage(responseJson.meta.token, currencyLocal, i18n.language);
      this.saveLoggedInUserData(responseJson);
      this.sendLoginSuccessMessage();
      this.openInfoPage(responseJson);
      this.resetFields();
    } else {
      //Check Error Response
      this.parseApiErrorResponse(responseJson);
      this.sendLoginFailMessage();
    }

    this.parseApiCatchErrorResponse(errorReponse);
  };

  UpdateTimeAndLanguage (token : string, currencies : string, lang : string) {
    const currency = currencies == "$" ? 0 : 1;
    const language = lang == "en" ? 0 : 1;
    const header = {
        "Content-Type": "application/json",
        token: token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        "account_block/accounts/update_language_currency"+'?language='+language+'&currency='+currency
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "PUT"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
} 

  googleConfigure = () => {
    if (Platform.OS === "android") {
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        webClientId:
          "462024028556-e8t1e3qnu31q50r3gto9f7r728supic3.apps.googleusercontent.com", 
        offlineAccess: true,
      });
    } else {
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        webClientId:
          "462024028556-ah2pecaho521k772e1n789uhc28etd69.apps.googleusercontent.com",
        offlineAccess: true,
      });
    }
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  sendLoginFailMessage() {
    const msgFailure: Message = new Message(
      getName(MessageEnum.LoginFaliureMessage)
    );
    this.send(msgFailure);
  }

  sendLoginSuccessMessage() {
    const msgSuccess: Message = new Message(
      getName(MessageEnum.LoginSuccessMessage)
    );

    msgSuccess.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msgSuccess.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msgSuccess.addData(getName(MessageEnum.LoginPassword), this.state.password);
    this.send(msgSuccess);
  }

  saveLoggedInUserData(responseJson: SuccessfulLoginResponse) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msgSession: Message = new Message(
        getName(MessageEnum.SessionSaveMessage)
      );

      msgSession.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msgSession.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );
      setStorageData("UserFullName", JSON.stringify(responseJson.meta.account.full_name));
      setStorageData("token", JSON.stringify(responseJson.meta.refresh_token));
      setStorageData("userID", JSON.stringify(responseJson.meta.id))
      this.send(msgSession);
    }
  }

  openInfoPage(responseJson: SuccessfulLoginResponse) {
    // Merge Engine - Navigation - btnEmailLogIn - Start
    let redirectBuyer:MessageEnum;
    if(this.state.guestRedirectKey === '')
    {
      redirectBuyer = MessageEnum.NavigationLandingPageMessage
    }else{
      redirectBuyer = MessageEnum.NavigationShoppingCartOrdersMessage
    }

    const sellerOptions: Record<Account["seller_status"], MessageEnum> = {
      Signup: MessageEnum.NavigationAccounActivationMessage,
      Account_activation: MessageEnum.NavigationCustomformCreateStoreUploadMessage,
      Store_created: MessageEnum.NavigationCustomformStoreShowMessage,
      Document_uploaded: MessageEnum.NavigationCustomformConfirmationMessage,
    };

    const driverOptions: Record<
      string,
      Record<Account["driver_redirect_flag"], MessageEnum>
    > = {
      Agency: {
        driver_document_submission_page:
          MessageEnum.NavigationDriverAgencyDocumentMessage,
        driver_landing_page: MessageEnum.NavigationLandingPageDriverMessage,
      },
      Driver: {
        driver_document_submission_page: MessageEnum.NavigationDriverDocuments,
        driver_landing_page: MessageEnum.NavigationLandingPageDriverMessage,
      },
    };

    const stylistOptions: Record<Account["stylist_redirect_flag"], MessageEnum> =
      {
        stylist_document_submission_page: MessageEnum.NavigationStylistUploadDocs,
        stylist_confirmation_page: MessageEnum.NavigationStylistConfirmation,
        stylist_landing_page: MessageEnum.NavigationStylistDashboard,
      };

    const pages: Record<string, MessageEnum> = {
      buyer: redirectBuyer,
      seller:
        // responseJson.meta.account.approve_status === "Pending"
        //   ? sellerOptions[responseJson.meta.account.seller_status]
        //   : 
          MessageEnum.NavigationSellerDashboard,
      driver: responseJson.meta.account.driver_redirect_flag
        ? driverOptions[responseJson.meta.custom_account?.account_type || "Driver"][
            responseJson.meta.account.driver_redirect_flag
          ]
        : MessageEnum.NavigationDriverRegistrationType,
      stylist: responseJson.meta.account.stylist_redirect_flag
        ? stylistOptions[responseJson.meta.account.stylist_redirect_flag]
        : MessageEnum.NavigationStylistCreateProfile,
    };

    const msgNavigate: Message = new Message(
      getName(pages[responseJson.meta.account.role])
    );

    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msgNavigate);
    if(responseJson.meta.account.role === 'buyer' || responseJson.meta.account.role === 'seller' || responseJson.meta.account.role === 'driver' || responseJson.meta.account.role === 'stylist')
      {
        if (pages[responseJson.meta.account.role] == MessageEnum.NavigationStylistUploadDocs || pages[responseJson.meta.account.role] == MessageEnum.NavigationStylistConfirmation || pages[responseJson.meta.account.role] == MessageEnum.NavigationStylistCreateProfile || pages[responseJson.meta.account.role] == MessageEnum.NavigationDriverAgencyDocumentMessage || pages[responseJson.meta.account.role] == MessageEnum.NavigationCustomformCreateStoreUploadMessage) {
        return;
      }
        setStorageData(
          "autoLogin",
          JSON.stringify(pages[responseJson.meta.account.role])
        );
      }
      removeStorageData("requireSignIn");
    removeStorageData('guestBuyerRedirectKey')
    // Merge Engine - Navigation - btnEmailLogIn - End
  }

  resetFields = () => {
    this.setState({
      enablePasswordField: true,
      email: "",
      password: "",
      checkedRememberMe: false,
      password_error: false,
      loading: false,
      email_error: false,
      phoneLoginOnly: false,
      role: 0,
    });
  }

  goToForgotPassword() {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigateResetPasswordMessage)
    );
    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    msgNavigate.addData(
      getName(MessageEnum.NavigationForgotPasswordPageInfo),
      "email"
    );
    this.send(msgNavigate);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  goToSocialLogin() {
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(msgNavigate);
  }

  doEmailLogIn(): boolean {
    let emailVerify = isEmail("", this.state.email);
    let deviceId = this.state.deviceId
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !emailVerify.status
    ) {
      this.setState({ email_error: true });
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.setState({ password_error: true });
      return false;
    }
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      device_id: deviceId
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
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

  checkBoarderColor(stateValue1: boolean) {
    if (stateValue1) {
      return "red";
    } else {
      return "#A9A9A9";
    }
  }

  passwordHideShow = () => {
    let enablePasswordField = this.state.enablePasswordField;
    if (enablePasswordField) {
      this.setState({ enablePasswordField: false });
    } else {
      this.setState({ enablePasswordField: true });
    }
  };

  signupRedirection = () => {
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpScreenMessage)
    );

    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msgNavigate);
  };

  phoneLoginRedirection = () => {
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigationMobilePhoneLogInMessage)
    );

    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msgNavigate);
  };

  googleLogin = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      let result = {
        social_name: userInfo.user.name,
        social_first_name: userInfo.user.givenName,
        social_last_name: userInfo.user.familyName,
        social_email: userInfo.user.email,
        social_image: userInfo.user.photo,
        social_type: "google",
        logintype: "google",
        social_id: userInfo.user.id,
      };
      this.sendGoogleLoginApi(result);
    } catch (_error: unknown) {
      // prevent from crash;
    }
  };

  sendGoogleLoginApi = (result: {
    social_name: string | null;
    social_first_name: string | null;
    social_last_name: string | null ;
    social_email: string | null;
    social_image: string | null;
    social_type: string;
    logintype: string;
    social_id: string;
  }) => {
    this.setState({ loading: true, LoginType : "google" });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const attrs = {
      provider: result.social_type,
      email: result.social_email,
      unique_auth_id: result.social_id,
      role: this.state.role,
      first_name : result.social_first_name,
      last_name : result.social_last_name,
      language:this.state.language,
      currency:this.state.currency
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

    this.socialLoginApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.socialLoginAPiEndPoint
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
  };

  manageSocialCondition = async (responseJson: SocialLoginResponse | SuccessfulLoginResponse) => {
    this.setState({ loading: false });
    if ("data" in responseJson) {
      let socialAttr = responseJson.data.attributes;
      if (!socialAttr.activated) {
        if (socialAttr.full_phone_number === null) {
          const msgNavigate: Message = new Message(
            getName(MessageEnum.NavigationSocialMediaAccountPhoneScreen)
          );
          msgNavigate.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
          );
          msgNavigate.addData(
            getName(MessageEnum.accountIdMessage),
            responseJson.data.id
          );
          this.send(msgNavigate);
        }
      }
    } else {
      if ("errors" in responseJson) {
        const response = responseJson as unknown as SocialLoginResponse;
        const error = response.errors!;
        let socialAttr = error[0];
        if (!socialAttr.activated) {
          const msgNavigate: Message = new Message(
            getName(MessageEnum.NavigationSocialMediaAccountPhoneScreen)
          );
          msgNavigate.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
          );
          msgNavigate.addData(
            getName(MessageEnum.accountIdMessage),
            socialAttr.account_id
          );
          this.send(msgNavigate);
        }
      } else {
        const currencyLocal = await getStorageData("currencyIcon", true);
        this.saveLoggedInUserData(responseJson);
        this.UpdateTimeAndLanguage(responseJson.meta.token, currencyLocal, i18n.language);
        this.sendLoginSuccessMessage();
        this.displaySuccessMessage();
        this.openInfoPage(responseJson);
      }
    }
  };

  displaySuccessMessage = () => {
    let successMsg = "";
        if(this.state.LoginType == "apple"){
          successMsg = i18n.t("appleLoginSuccess");
        }
        else if(this.state.LoginType == "google"){
          successMsg = i18n.t("googleLoginSuccess");
        }
        showMessage({
          position: { top: 0 },
          message: successMsg,
        });
  }

  btnBackManage = ()=>{
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigationLoginOptionsMessage)
    );
    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(msgNavigate);
    return true;
  }
  
  btnAppleLogin = async()=>{
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      this.appleLoginApi(appleAuthRequestResponse);
    } catch (error) {
    }
  }

  appleLoginApi = (appleResponse:any)=>{
      this.setState({ LoginType : "apple" });
      let attrs ={}
      if(appleResponse?.fullName?.familyName !== null)
      {
        setStorageData("appledata",JSON.stringify(appleResponse))
        attrs={
          provider: 'apple',
          email: appleResponse.email,
          unique_auth_id: appleResponse.identityToken,
          role: this.state.role,
          first_name: appleResponse?.fullName?.givenName,
          last_name: appleResponse.fullName.familyName,
          language:this.state.language,
          currency:this.state.currency
        }
      }else{
        attrs={
          provider: 'apple',
          email: null,
          unique_auth_id: appleResponse.identityToken,
          role: this.state.role,
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
        attributes: attrs,
      };

      const httpBody = {
        data: data,
      };

      const requestMessageApple = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.socialLoginApiCallId = requestMessageApple.messageId;
      requestMessageApple.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.socialLoginAPiEndPoint
      );
      requestMessageApple.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessageApple.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      requestMessageApple.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.loginAPiMethod
      );
      runEngine.sendMessage(requestMessageApple.id, requestMessageApple);
  
      return true;
  }  

  backHandleForApp = ()=>{
    this._didFocusSubscription = this.props.navigation.addListener('willFocus', () =>
      BackHandler.addEventListener('hardwareBackPress', this.btnBackManage)
    );
  }

  commingSoon = ()=>{
    showMessage({
      message: i18n.t('featureCommingSoon'),
      position: { top: 0 },
    });
  }
  // Customizable Area End
}
