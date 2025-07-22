import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { removeStorageData, setStorageData } from "../../../framework/src/Utilities";
interface ResponseJsonProps {
    message: string;
    errors:{
      pin:string;
    }
}
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
  disableResend: boolean;
  OtpArray: any[];
  showErrorMessage: boolean;
  showErroMessageString: string;
  remainingTime: string;
  seconds: number;
  contact_number: any;
  button_enable_disable: boolean;
  token: string;
  loading: boolean;
  countryCodeSelected: any;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SocialMediaAccountOtpVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: any;
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
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      otp: "",
      otpAuthToken: "",
      userAccountID: "",
      disableResend: false,
      OtpArray: ["", "", "", ""],
      showErrorMessage: false,
      showErroMessageString: "",
      remainingTime: "",
      seconds: 60,
      contact_number: "",
      button_enable_disable: false,
      token: "",
      loading: false,
      countryCodeSelected: "+965",
    };
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.getTokenAndIdOtp(message);
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
          this.otpAfterSocialResponseData(responseJson);

          this.parseApiCatchErrorResponse(errorReponse);
          this.setState({ loading: false });
        } else if (apiRequestCallId === this.resendOTPApiCallID) {
          if (!responseJson.errors) {
            this.setState({
              loading: false,
              seconds: 60,
              OtpArray: ["", "", "", ""],
              otp: "",
              remainingTime: "0:00",
              disableResend: true,
            });
            clearInterval(this.intervel);
            this.intervel = setInterval(() => {
              this.tickSocial();
            }, 1000);
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    this.intervel = setInterval(() => {
      this.tickSocial();
    }, 1000);
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getTokenAndIdOtp = (message: Message) => {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const authTokenOtp = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );

      const phoneNumberOtp = message.getData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage)
      );

      const countryCodeOtp = message.getData(
        getName(MessageEnum.AuthPhoneCountryCodeMessage)
      );

      this.setState({
        contact_number: phoneNumberOtp,
        countryCodeSelected: countryCodeOtp,
        token: authTokenOtp,
      });
    }
  };

  otpAfterSocialResponseData = (responseJson:ResponseJsonProps) => {
    if (responseJson.errors === undefined) {
      //Need To send Login token message to save for future call
      this.sendLoginSuccessMessageSocial();
      this.openInfoPageSocial();
    } else {
      //Check Error Response
      if (responseJson.errors.pin) {
        this.setState({
          showErrorMessage: true,
          showErroMessageString: responseJson.errors.pin,
          loading: false,
        });
      } else {
        this.sendLoginFailMessageSocial();
        this.parseApiErrorResponse(responseJson);
      }
    }
  };

  sendLoginFailMessageSocial() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  saveLoggedInUserDataSocial(responseJson: ResponseJsonProps) {
    if (responseJson) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );

      this.send(msg);
    }
  }

  sendLoginSuccessMessageSocial() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.contact_number);

    msg.addData(
      getName(MessageEnum.LoginCountryCode),
      this.state.countryCodeSelected
    );

    this.send(msg);
  }

  openInfoPageSocial() {
    this.setState({
      seconds: 60,
      OtpArray: ["", "", "", ""],
      otp: "",
      remainingTime: "0:00",
      disableResend: true,
    });
    clearInterval(this.intervel);
    this.intervel = setInterval(() => {
      this.tickSocial();
    }, 1000);

    showMessage({
      message: configJSON.googleSuccessMessage,
      position: { top: 0 },
    });
    
    const msg: Message = new Message(
      getName(MessageEnum.NavigationLandingPageMessage)
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    setStorageData("autoLogin",JSON.stringify(185));
    removeStorageData("requireSignIn");

    this.send(msg);
  }

  async submitOtp() {
    if (!this.state.otp || this.state.otp.length === 0) {
      this.setState({
        showErrorMessage: true,
        showErroMessageString: "Enter 4 digit OTP",
      });
      return false;
    }

    const httpBody = {
      otp_type: "social_otp",
      token: this.state.token,
      pin: this.state.otp,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    this.otpAuthApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.otpVerifyApiEndpoint
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
      configJSON.httpPostMethod
    );

    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  resendOTP = async () => {
    this.setState({
      loading: true,
      showErroMessageString: "",
      showErrorMessage: false,
    });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.resendOTPApiCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.resendOtpApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const attrs = {
      full_phone_number:
        this.state.countryCodeSelected + this.state.contact_number,
    };

    const data = {
      type: "sms_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  changeFocusSocial = (value: any, index: number) => {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.OtpArray;
    otp[index] = value;
    let stringOtp = otp.join("");
    if (stringOtp.length == 4) {
      this.setState({ button_enable_disable: true });
    } else {
      this.setState({ button_enable_disable: false });
    }
    this.setState({
      OtpArray: otp,
      otp: stringOtp,
      showErrorMessage: false,
      showErroMessageString: "",
    });
  };

  prevoiusFocusSocial = (key: any, index: number) => {
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

  tickSocial = () => {
    let secondsSocial = this.state.seconds;

    let m: any = Math.floor(secondsSocial / 60);
    let s: any = secondsSocial % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    if (secondsSocial <= 1) {
      this.setState({
        remainingTime: "0:00",
        disableResend: true,
      });
      clearInterval(this.intervel);
      return;
    }

    secondsSocial -= 1;

    this.setState({
      seconds: secondsSocial,
      remainingTime: m + ":" + s,
    });
  };

  async componentWillUnmount() {
    clearInterval(this.intervel);
  }

  replaceNumberSocial = (strNumber: string) => {
    if (strNumber !== undefined) {
      return strNumber.replace(/\d(?=\d{4})/g, "*");
    }
  };
  // Customizable Area End
}
