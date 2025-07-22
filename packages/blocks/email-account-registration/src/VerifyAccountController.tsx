import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from 'react-native'
import i18n from "../../../components/src/i18n/i18n.config";
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
  timeout: any;
  inputBoxLength: number;
  otp: string;
  verifyEmail: string;
  verifyPhone: string;
  smsToken: string;
  emailToken: string;
  email: string;
  emailVerified: boolean;
  isOtp: boolean;
  isLoading:boolean;
  newOtp:string
  OtpArray: any[];
  button_enable_disable: boolean;
  showErrorMessage: boolean,
  showErroMessageString:string,
  maskedEmail:any;
  isEmailChanged: boolean;
  isPhoneChanged: boolean;
  isBothParamsChanges: boolean;
  remainingTime: string;
  seconds: number;
  disableResend: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class VeriftAccountController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  verifyAccountApiCallID: any;
  resendOTPApiCallID: any
  otpTextInput:any = [];
  verifyAccountDetailsApiCallID: any;
  intervel: any = null
  // codeInputRef: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      timeout: configJSON.timeout,
      inputBoxLength: 4,
      otp: '',
      verifyEmail: '',
      verifyPhone: '',
      smsToken: '',
      emailToken: '',
      email: '',
      emailVerified: false,
      isOtp: false,
      isLoading:false,
      newOtp:'',
      OtpArray: ["", "", "", ""],
      button_enable_disable: false,
      showErrorMessage: false,
      showErroMessageString: '',
      maskedEmail: "",
      isEmailChanged: false,
      isPhoneChanged: false,
      isBothParamsChanges: false,
      remainingTime: '',
      seconds: 60,
      disableResend:false
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    // Customizable Area End

    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.intervel = setInterval(() => {
      this.tickTimer()
    }, 1000)
    this.setState({
      verifyEmail: this.props.navigation.state.params.item.email,
      verifyPhone: this.props.navigation?.state.params.item.phoneNumber,
      smsToken: this.props.navigation?.state.params.item.smsToken,
      emailToken: this.props.navigation?.state.params.item.emailToken,
      isEmailChanged: this.props.navigation?.state.params.item?.isEmailChanged,
      isPhoneChanged: this.props.navigation?.state.params.item?.isPhoneChanged,
      isBothParamsChanges: this.props.navigation?.state.params.item?.isBothParamsChanged
    }, () => {
      this.setState({
        maskedEmail: this.maskEmail()
      })
    })
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
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson && !responseJson.errors) {
        this.successResponce(apiRequestCallId, responseJson)
      } else if (responseJson && responseJson.errors) {
        this.failureResponce(apiRequestCallId, responseJson)
      } else if (errorReponse) {
        this.setState({isLoading:false})
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  successResponce = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.verifyAccountApiCallID) {
      this.accountSucessCallBack(responseJson)
    }
    if (apiRequestCallId === this.resendOTPApiCallID) {
      this.resendOTPSucessCallBack(responseJson)
    }
    if(apiRequestCallId === this.verifyAccountDetailsApiCallID){
      this.verifyAccountSucessCallBack(responseJson)
    }
  }

  failureResponce = (apiRequestCallId: any, responseJson: any) => {
    if (apiRequestCallId === this.verifyAccountApiCallID) {
      this.accountFailureCallBack(responseJson)
    }
    if (apiRequestCallId === this.resendOTPApiCallID) {
      this.resendOTPFailureCallBack(responseJson)
    }
    if(apiRequestCallId === this.verifyAccountDetailsApiCallID){
     this.verifyAccountDetailFailureCallBack(responseJson)
    }
  }
  
  verifyAccountDetailFailureCallBack=(responseJson: any)=>{
    this.setState({isLoading:false})
    if(responseJson.errors.pin){
      this.setState({ showErrorMessage: true, showErroMessageString: i18n.t('incurrectOTP') })
    }
  }
  accountSucessCallBack = (responseJson: any) => {
    this.setState({isLoading:false})
    if (this.state.emailVerified) {
      Alert.alert(responseJson?.message)
      setTimeout(() => {
        const message: Message = new Message(
          getName(MessageEnum.NavigationEmailLogInMessage)
        );
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(message);
      }, 500);

    } else {
      Alert.alert(responseJson.message)
      this.setState({ emailVerified: true, otp: '',OtpArray: ['', '', '', ''],seconds: 60,disableResend: true }, 
        () => {
          this.intervel = setInterval(() => {
            this.tickTimer()
          }, 1000)
      })
    }
  }

  verifyAccountSucessCallBack = (responseJson: any) => {
    this.setState({isLoading:false})
    this.setState({seconds: 60,remainingTime: '0:00',disableResend: true })
    if (this.state.emailVerified) {
      Alert.alert(responseJson?.message)
      setTimeout(() => {
        this.props.navigation.navigate('ProfileScreen')
      }, 500);

    } else {
      Alert.alert(responseJson.message)
      if(this.state.isBothParamsChanges){
        this.setState({ emailVerified: true, otp: '',OtpArray: ['', '', '', ''] })
      }else{
        Alert.alert(responseJson.message)
        setTimeout(() => {
          this.props.navigation.navigate('ProfileScreen')
        }, 500);
      }
    }
  }
  
  accountFailureCallBack = (responseJson: any) => {
    this.setState({isLoading:false})
    
    if(responseJson.errors.pin){
      this.setState({ showErrorMessage: true, showErroMessageString: i18n.t('incurrectOTP') })
    }
    else{
      Alert.alert("Invalid token")
    }
  }

  resendOTPSucessCallBack = (responseJson: any) => {
    this.setState({isLoading:false, seconds:60, disableResend: true })
     Alert.alert(i18n.t('otp_send_successfully'))
     this.intervel = setInterval(() => {
      this.tickTimer()
    }, 1000)
    if (this.state.emailVerified) {
      this.setState({ smsToken: responseJson?.meta?.token })
    } else {
      this.setState({ emailToken: responseJson?.meta?.token })
    }
  }

  resendOTPFailureCallBack = (responseJson: any) => {
    this.setState({isLoading:false})
  }

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;
    let header = {
      "Content-Type": contentType,
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  changeDetailsHandler = () => {
    if(this.state.isEmailChanged || this.state.isPhoneChanged) {
      this.verifyDetailsChange()
    }else{
      this.verifyAccount()
    }
  }

  verifyDetailsChange = async () => {
    this.setState({ isLoading: true });
    let otpType;
    let token;

    if (!this.state.otp || this.state.otp.length <= 3) {
      this.setState({
        showErrorMessage: true,
        showErroMessageString: i18n.t('EnterOTP'),
        isLoading: false,
      });
      return false;
    }

    if (this.state.isBothParamsChanges) {
      otpType = this.state.emailVerified ? "sms_otp" : "email_otp";
      token = this.state.emailVerified ? this.state.smsToken : this.state.emailToken;
    } else {
      otpType = this.state.isPhoneChanged ? "sms_otp" : "email_otp";
      token = this.state.isPhoneChanged ? this.state.smsToken : this.state.emailToken;
    }
  
    const httpBody = {
      otp_type: otpType,
      token: token,
      pin: this.state.otp,
    }
      
      this.verifyAccountDetailsApiCallID = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: "account_block/accounts/verify_account_otp",
        body: httpBody,
      })
  }

  verifyAccount = async () => {
    this.setState({isLoading:true})
    if (!this.state.otp || this.state.otp.length <= 3 ) {
      this.setState({ showErrorMessage: true, showErroMessageString: i18n.t('EnterOTP') })
      this.setState({isLoading:false})
      return false
    }
    else {
      let httpBody = {
        otp_type: this.state.emailVerified ? "sms_otp" : "email_otp",
        token: this.state.emailVerified ? this.state.smsToken : this.state.emailToken,
        pin: this.state.otp
      }

      this.verifyAccountApiCallID = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: "account_block/accounts/verify_account_otp",
        body: httpBody,
      })
    }
  }

  resendOtp = async () => {
    
    if (this.state.remainingTime != '0:00') {
      return false;
    }

    this.setState({isLoading:true})
    if (this.state.emailVerified) {
      let httpBody = {
        data: {
          type: "sms_account",
          attributes: {
            full_phone_number: "+" + this.state.verifyPhone
          }
        }
      }
      
      this.resendOTPApiCallID = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: "account_block/accounts/resend_account_otp",
        body: httpBody,
      })

    } else {
      let httpBody = {
        data: {
          type: "email_account",
          attributes: {
            email: this.state.verifyEmail
          }
        }
      }

      this.resendOTPApiCallID = await this.apiCall({
        contentType: "application/json",
        method: "POST",
        endPoint: "account_block/accounts/resend_account_otp",
        body: httpBody,
      })
    }
  }

  prevoiusFocus = (key: any, index: number) => {
    if (key == 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].focus()

      const otp = this.state.OtpArray
      otp[index] = '';

      let stringOtp = ""
      otp.forEach(
        (item, index) => {
          stringOtp += item
        })
      this.setState({ OtpArray: otp, otp: stringOtp });
    }
  }

  changeFocus = (value: any, index: number) => {

    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.OtpArray;
    otp[index] = value;
    let stringOtpFocus = ""
    otp.forEach(
      (item, index) => {
        stringOtpFocus += item
      }
    )
    this.setState({ OtpArray: otp, otp: stringOtpFocus, showErrorMessage: false, showErroMessageString: "" });
  }
  maskEmail = () => {
    const { verifyEmail } = this.state;
    if(verifyEmail) {
        const [username, domain] = verifyEmail?.split('@');
        const maskedUsername = username?.slice(0, 1) + '*'.repeat(username.length - 2) + username?.split('').reverse()?.join('')?.slice(0, 1);
        return maskedUsername + '@' + domain;
    }
  }

  tickTimer = () => {
    let secondsTimer = this.state.seconds;
    let minutes: any = Math.floor(secondsTimer / 60);
    let secTime: any = secondsTimer % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secTime = secTime < 10 ? '0' + secTime : secTime;
    if (secondsTimer <= 1) {
      this.setState({
        remainingTime: "0:00",
        disableResend: true
      }
      )

      clearInterval(this.intervel)
      return
    }
    secondsTimer -= 1
    this.setState({seconds: secondsTimer,remainingTime: minutes + ':' +secTime})
  }
  // Customizable Area End
}
