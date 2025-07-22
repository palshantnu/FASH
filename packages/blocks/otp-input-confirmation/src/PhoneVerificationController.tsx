import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { OtpVerifySuccessResponse, Account } from "./response";
import { removeStorageData, setStorageData,getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  otp: string;
  otpAuthToken: string;
  userAccountID: string;
  labelInfo: string;
  toMessage: string;
  disableResend: boolean;
  OtpArray: any[];
  showErrorMessage: boolean;
  showErroMessageString: string;
  remainingTime: string;
  seconds: number;
  contact_number: any;
  button_enable_disable: boolean;
  loading: boolean;
  token: string;
  email: string;
  countryCodeSelected: any;
  guestRedirectKeyPhone:string;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class PhoneVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: any;
  labelInfo: any;
  resendOTPApiCallID: any;
  otpTextInput: any = [];
  intervel: any = null
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      otp: "",
      otpAuthToken: "",
      userAccountID: "",
      labelInfo: configJSON.labelInfo,
      toMessage: "",
      disableResend: false,
      OtpArray: ["", "", "", ""],
      showErrorMessage: false,
      showErroMessageString: '',
      remainingTime: '',
      seconds: 60,
      contact_number: '',
      button_enable_disable: false,
      loading: false,
      token: '',
      email: '',
      countryCodeSelected: "+91",
      guestRedirectKeyPhone:''
    };
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.getTokenAndId(message)
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

      if (apiRequestCallId) {
        if (apiRequestCallId === this.otpAuthApiCallId) {
          this.otpAfterResponseData(responseJson)
    
          this.parseApiCatchErrorResponse(errorReponse);
          this.setState({ loading: false })
          
        } else if (apiRequestCallId === this.resendOTPApiCallID) {
          this.setState({loading: false})
          if (!responseJson.errors) {
            alert("Resend OTP send !")
            this.setState({
              loading: false,
              seconds: 60,
              OtpArray: ["", "", "", ""],
              otp: "",
              remainingTime: '0:00',
              disableResend: true
            })
            clearInterval(this.intervel)
            this.intervel = setInterval(() => {
              this.tick()
            }, 1000)

          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getTokenAndId = (message: Message)=>{
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const data = message.getData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage)
      );
      
      this.setState({
        contact_number:data.phone,
        token : data.token,
      })
    }
  }

  otpAfterResponseData = (responseJson:any)=>{
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      //Need To send Login token message to save for future call
      this.saveLoggedInUserData(responseJson);
      this.sendLoginSuccessMessage();
      this.openInfoPage(responseJson);
    } else {
      //Check Error Response
      if(responseJson?.errors[0]?.pin)
      {
        this.setState({ showErrorMessage: true, showErroMessageString: responseJson?.errors[0]?.pin })
      }else{
        this.sendLoginFailMessage();
        this.parseApiErrorResponse(responseJson);
      }
    }
  }

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    this.intervel = setInterval(() => {
      this.tick()
    }, 1000)

    let redirectKeyPhone = await getStorageData('guestBuyerRedirectKey')
    if(redirectKeyPhone != null)
    {
      this.setState({guestRedirectKeyPhone:redirectKeyPhone})
    }
  }

  getToken = () =>{
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      setStorageData('token',JSON.stringify(responseJson.meta.refresh_token))
      this.send(msg);
    }
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.contact_number);

    msg.addData(
      getName(MessageEnum.LoginCountryCode),
      this.state.countryCodeSelected
    );

    this.send(msg);
  }

  openInfoPage(response: OtpVerifySuccessResponse) {
    this.setState({
      seconds: 60,
      OtpArray: ["", "", "", ""],
      otp: "",
      remainingTime: "0:00",
      disableResend: true,
    });
    clearInterval(this.intervel);
    this.intervel = setInterval(() => {
      this.tick();
    }, 1000);

    let redirectBuyerPhone:MessageEnum;
    if(this.state.guestRedirectKeyPhone === '')
    {
      redirectBuyerPhone = MessageEnum.NavigationLandingPageMessage
    }else{
      redirectBuyerPhone = MessageEnum.NavigationShoppingCartOrdersMessage
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

    const stylistOptions: Record<
      Account["stylist_redirect_flag"],
      MessageEnum
    > = {
      stylist_document_submission_page: MessageEnum.NavigationStylistUploadDocs,
      stylist_confirmation_page: MessageEnum.NavigationStylistConfirmation,
      stylist_landing_page: MessageEnum.NavigationStylistDashboard,
    };

    const pages: Record<string, MessageEnum> = {
      buyer: redirectBuyerPhone,
      seller:
        response.meta.account.approve_status === "Pending"
          ? sellerOptions[response.meta.account.seller_status]
          : MessageEnum.NavigationSellerDashboard,
      driver: response.meta.account.driver_redirect_flag
        ? driverOptions[response.meta.custom_account?.account_type || "Driver"][
            response.meta.account.driver_redirect_flag
          ]
        : MessageEnum.NavigationDriverRegistrationType,
      stylist: response.meta.account.stylist_redirect_flag
        ? stylistOptions[response.meta.account.stylist_redirect_flag]
        : MessageEnum.NavigationStylistCreateProfile,
    };

    let role = response.meta.account.role;

    if(role === 'buyer' || role === 'seller' || role === 'driver' || role === 'stylist')
    {
      setStorageData(
        "autoLogin",
        JSON.stringify(pages[response.meta.account.role])
      );
    }
    removeStorageData('guestBuyerRedirectKey')
    removeStorageData("requireSignIn");
    const msgNavigate: Message = new Message(
      getName(pages[response.meta.account.role])
    );

    msgNavigate.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigate);
  }

  async submitOtp() {
    if (!this.state.otp || this.state.otp.length === 0) {
      this.setState({ showErrorMessage: true, showErroMessageString: "Enter 4 digit OTP" })
      return false
    }
    
    const httpBody = {
      "token": this.state.token,
      "pin": this.state.otp,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const headers = {
      "Content-Type": configJSON.apiVerifyOtpContentType,
    };

    this.otpAuthApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.otpVerifyEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    this.setState({loading:true})
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  resendOTP = async () => {
    this.setState({
      loading: true,
      showErroMessageString: "",
      showErrorMessage: false
    })
    const header = {
      "Content-Type": configJSON.apiVerifyOtpContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.resendOTPApiCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.resendOtpEndPoint
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const attrs = {
      full_phone_number: this.state.countryCodeSelected+this.state.contact_number,
    };

    const data = {
      type: "sms_account",
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  async componentWillUnmount() {
    clearInterval(this.intervel)
  }
  prevoiusFocus = (key: string, index: number) => {
    if (key == 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].focus()

      const otp = this.state.OtpArray
      otp[index] = '';

      let stringOtp = otp.join("")

      if (stringOtp.length == 4) {
        this.setState({ button_enable_disable: true })
      } else {
        this.setState({ button_enable_disable: false })

      }
      this.setState({ OtpArray: otp, otp: stringOtp });
    }
  }
  changeFocus = (value: string, index: number) => {

    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.OtpArray;
    otp[index] = value;
    let stringOtp = otp.join("")
    if (stringOtp.length == 4) {
      this.setState({ button_enable_disable: true })
    } else {
      this.setState({ button_enable_disable: false })

    }
    this.setState({ OtpArray: otp, otp: stringOtp, showErrorMessage: false, showErroMessageString: "" });
  }

  tick = () => {
    let seconds = this.state.seconds;
    let m: any = Math.floor(seconds / 60);
    let s: any = seconds % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    if (seconds <= 1) {
      this.setState({
        remainingTime: "0:00",
        disableResend: true
      }
      )
      clearInterval(this.intervel)
      return
    }

    seconds -= 1

    this.setState(
      {
        seconds: seconds,
        remainingTime: m + ':' + s,
      }
    )
  }

  replaceNumber = (str:string)=>{
    if(str != undefined)
    {
      return str.replace(/\d(?=\d{4})/g, "*");
    }
  }

  // Customizable Area End
}