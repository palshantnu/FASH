import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import { Alert } from "react-native";
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
  email: string;
  isEmail: boolean;
  errorMessage: string;
  isLoading: boolean;
  emailOrPhone: string;
  phoneNumber: string;
  isPhone: boolean;
  countryList: Array<CountryData>;
  selectedCountryCodeIndex: number;
  selectedCountryCode: string;
  dropdownOpen: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ResetPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  forgotPasswordSendOTPApiCallID: any;
  countryCodesApiCallId = "";
  myLanguage = i18n.language;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.state = {
      // Customizable Area Start
      email: "",
      isEmail: false,
      errorMessage: "",
      isLoading: false,
      emailOrPhone: "",
      phoneNumber: "",
      isPhone: false,
      countryList: [],
      selectedCountryCodeIndex: 0,
      selectedCountryCode: "+965",
      dropdownOpen: false,
      // Customizable Area End
    };
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
    ];
    // Customizable Area End

    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchCountryCodes();
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
      switch (apiRequestCallId) {
        case this.forgotPasswordSendOTPApiCallID:
          this.setState({ isLoading: false });
          if (responseJson) {
            console.log("999", responseJson);
            if (responseJson.errors) {
              this.sendOTPFailureCallBack(responseJson);
            } else {
              this.sendOTPSucessCallBack(responseJson);
            }
          } else if (errorReponse) {
            this.parseApiCatchErrorResponse(errorReponse);
          }
          break;
        case this.countryCodesApiCallId:
          if (responseJson) {
            const kuwaitIndex = responseJson.findIndex(
              (c: CountryData) => c.country_code === "KW"
            );
            this.setState({
              countryList: responseJson,
              selectedCountryCodeIndex: kuwaitIndex,
              selectedCountryCode: responseJson[kuwaitIndex].numeric_code,
              isLoading: false,
            });
          }
          break;
        default:
          break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  sendOTPSucessCallBack = (responseJson: any) => {
    if (responseJson?.data?.attributes?.full_phone_number) {
      let data = {
        email_or_full_phone_number:
          responseJson?.data?.attributes?.full_phone_number,
        type: responseJson?.data?.type,
        token: responseJson.meta.token,
        phoneNumber: responseJson?.data?.attributes?.full_phone_number,
      };
      this.props?.navigation?.navigate("ResetPasswordOTP", { item: data });
    } else {
      let data = {
        email_or_full_phone_number: responseJson?.data?.attributes?.email,
        emailAddress: responseJson?.data?.attributes?.email,
        type: responseJson?.data?.type,
        token: responseJson?.meta?.token,
      };
      this.props?.navigation?.navigate("ResetPasswordOTP", { item: data });
    }
  };
  sendOTPFailureCallBack = (responseJson: any) => {
    if (responseJson?.errors[0]?.otp) {
      Alert.alert("Error", "Account not found");
    } else {
      Alert.alert("Error", "Invalid or unrecognized email address");
    }
  };

  apiCall = async (data: any) => {
    const { contentType, method, endPoint, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    let header = {
      "Content-Type": contentType,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  // Customizable Area End
  // Customizable Area Start
  /*istanbul ignore next*/
  reSetPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("this.state.email :", this.state.email);
    console.log("this.state.phoneNumber :", this.state.phoneNumber);

    if (
      !emailRegex.test(this.state.email) &&
      !this.state.email &&
      !this.state.phoneNumber
    ) {
      this.setState({ isEmail: true, isPhone: true });
      return;
    }

    if (this.state.email) {
      this.setState({ isPhone: false, errorMessage: "" });
      this.setState({ phoneNumber: "" });
      this.resetPasswordAPiCall(this.state.email);
    }

    if (this.state.phoneNumber) {
      this.setState({ isEmail: false, errorMessage: "" });
      this.setState({ email: "" });
      this.resetPasswordAPiCall(
        this.state.selectedCountryCode + this.state.phoneNumber
      );
    }
  };

  resetPasswordAPiCall = async (emailOrPhone: string) => {
    this.setState({ isLoading: true, errorMessage: "" });
    let httpBody = {
      data: {
        attributes: {
          email_or_full_phone_number: emailOrPhone,
        },
      },
    };
    this.forgotPasswordSendOTPApiCallID = await this.apiCall({
      contentType: "application/json",
      method: "POST",
      endPoint: "forgot_password/otp",
      body: httpBody,
    });
  };

  fetchCountryCodes = () => {
    this.setState({ isLoading: true });
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.countryCodesApiCallId = message.messageId;

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
  returnAlignment = () => {
    if (this.myLanguage == "en") {
      return "left";
    } else {
      return "right";
    }
  };
  returnTransform = () => {
    if (this.myLanguage == "en") {
      return "0deg";
    } else {
      return "180deg";
    }
  };

  returnFlexDirection = () => {
    if (this.myLanguage == "en") {
      return "row";
    } else {
      return "row-reverse";
    }
  };
  orReturn = () => {
    if (this.myLanguage == "en") {
      return "OR";
    } else {
      return "";
    }
  };

  // Customizable Area End
}
