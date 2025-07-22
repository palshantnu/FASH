import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
export interface OtpVerifySuccessResponse {
  meta: {
    token: string;
    refresh_token: string;
    account: Account;
  };
}
export interface Account {
  id: number;
  first_name: null;
  last_name: null;
  full_phone_number: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  device_id: null;
  unique_auth_id: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  user_name: null;
  platform: null;
  user_type: null;
  app_language_id: null;
  last_visit_at: null;
  is_blacklisted: boolean;
  suspend_until: null;
  status: string;
  gender: null;
  date_of_birth: null;
  age: null;
  stripe_id: null;
  stripe_subscription_id: null;
  stripe_subscription_date: null;
  role: string;
  full_name: string;
  is_verified: null;
  share_token: null;
  approve_status: string;
  seller_status: "Signup" | "Store_created" | "Document_uploaded";
  driver_redirect_flag: "document_submission_page" | "landing_page";
  notification: Notification;
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
  labelInfo: string;
  toMessage: string;
  disableResend: boolean;
  OtpArray: Array<string>;
  showErrorMessage: boolean;
  showErroMessageString: string;
  remainingTime: string;
  seconds: number;
 
  button_enable_disable: boolean;
  loading: boolean;
  token: string;
  email: string;
  
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  
  // Customizable Area End
}

export default class VerifyAccountController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: string = "";
  labelInfo: string= "";
  resendOTPApiCallID: string = "";
  interval: ReturnType<typeof setInterval> | null = null;
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
      seconds: 10,
      
      button_enable_disable: false,
      loading: false,
      token: '',
      email: '',
   
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
        
    
          this.parseApiCatchErrorResponse(errorReponse);
          this.setState({ loading: false })
          
        } else if (apiRequestCallId === this.resendOTPApiCallID) {
          if (!responseJson.errors) {

            this.setState({
              loading: false,
              seconds: 10,
              OtpArray: ["", "", "", ""],
              otp: "",
              remainingTime: '0:00',
              disableResend: true
            })
           
            this.interval = setInterval(() => {
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
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const phoneNumber = message.getData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage)
      );
      
      this.setState({email:phoneNumber})
    }
  }

 

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  getToken = () =>{
    const msegs: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msegs);
  }

  sendLoginFailMessage() {
    const msegss: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msegss);
  }





  

  tick() {
    let seconds = this.state.seconds - 1;
    this.setState({ seconds });

    if (seconds <= 0) {
    
      this.setState({ disableResend: false });
    } else {
      const minimum = Math.floor(seconds / 60);
      const secForTick = seconds % 60;
      this.setState({ remainingTime: `${minimum}:${secForTick < 10 ? "0" : ""}${secForTick}` });
    }
  }

  // Customizable Area End
}