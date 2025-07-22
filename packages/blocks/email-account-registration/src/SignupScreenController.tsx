import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import { Alert } from "react-native";
import { getStorageData,setStorageData } from "framework/src/Utilities";
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comPassword: string;
  phoneNumber: string;
  role: string;
  isPassowrd: boolean;
  isComPass: boolean;
  isSelect: boolean;
  isRole: string;
  isBuyer: boolean;
  isSeller: boolean;
  isDriver: boolean;
  isStylist: boolean;
  roleId: string;
  isLoading: boolean;
  isFirstName: boolean;
  isLastName: boolean;
  isEmail: boolean;
  isHidePassword: boolean;
  isHideComPassword: boolean;
  isPhone: boolean;
  isRegister: boolean;
  errorMessage: string;
  validateAll: boolean;
  isChecked: boolean;
  isvalidCheck: boolean;
  dropdownOpen: boolean;
  selectedCodeIndex: number;
  selectedCountryCode: string;
  countryList: Array<CountryData>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SignupScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createAccountApiCallID = "";
  apiEmailSignupCallId: string = "";
  countryCodeApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      timeout: configJSON.timeout,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      comPassword: "",
      phoneNumber: "",
      role: "",
      isPassowrd: false,
      isComPass: false,
      isRole: "",
      isSelect: false,
      isBuyer: false,
      isSeller: false,
      isDriver: false,
      isStylist: false,
      roleId: "",
      isLoading: false,
      isFirstName: false,
      isLastName: false,
      isEmail: false,
      isHidePassword: false,
      isHideComPassword: false,
      isPhone: false,
      isRegister: false,
      errorMessage: "",
      validateAll: false,
      isChecked: false,
      isvalidCheck: false,
      dropdownOpen: false,
      selectedCodeIndex: 0,
      selectedCountryCode: "+965",
      countryList: [],
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

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiResponseMessageId = getName(MessageEnum.RestAPIResponceMessage);
    const responseDataMessageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (message.id === apiResponseMessageId) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      switch (responseDataMessageId) {
        case this.countryCodeApiCallId:
          if (responseJson) {
            const kuwaitIndex = responseJson.findIndex(
              ({ country_code }: CountryData) => country_code === "KW"
            );
            this.setState({
              countryList: responseJson,
              selectedCountryCode: responseJson[kuwaitIndex].numeric_code,
              selectedCodeIndex: kuwaitIndex,
              isLoading: false,
            });
          }
          break;
        case this.createAccountApiCallID:
          if (responseJson && !responseJson.errors) {
            this.createAccountSucessCallBack(responseJson);
          } else if (responseJson && responseJson.errors) {
            this.createAccountFailureCallBack(responseJson);
          } else {
            this.setState({ isLoading: false });
            this.parseApiErrorResponse(responseJson);
          }
          break;
        default:
          break;
      }

      this.setState({ isLoading: false });
      this.parseApiCatchErrorResponse(errorReponse);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchCountryCodes();
    const role: Record<string, string> = {
      Buyer: "0",
      Seller: "1",
      "Delivery Partner": "2",
      Stylist: "3",
    };
    const mode = (await getStorageData("FA_LOGIN_MODE", false)) as string;
    this.setState({ roleId: role[mode] ?? "0" });
    // Customizable Area End
  }

  // Customizable Area Start
  createAccountSucessCallBack = (responseJson: any) => {
    if (responseJson?.data) {
      this.setState({ isLoading: false });
      const data = {
        email: responseJson.data.attributes.email,
        phoneNumber: responseJson.data.attributes.full_phone_number,
        smsToken: responseJson.meta.sms_otp_token,
        emailToken: responseJson.meta.email_otp_token,
      };
      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("VeriftAccount", { item: data });
      }, 500);
    }
    setStorageData("signupId",JSON.stringify(responseJson.data.id))
  };

  createAccountFailureCallBack = (responseJson: {
    errors: Record<string, string> | Array<Record<string, string>>;
  }) => {
    this.setState({ isLoading: false });
    const error = Array.isArray(responseJson.errors)
      ? responseJson.errors[0]
      : responseJson.errors;
    const errorKey = Object.keys(error)[0];
    if (["full_phone_number", "email"].includes(errorKey)) {
      if( ["email"].includes(errorKey)){
        this.setState({ isEmail: true, errorMessage: `* ${error[errorKey]}` });
        return;
      }
      if( ["full_phone_number"].includes(errorKey)){
        this.setState({ isPhone: true, errorMessage: `* ${error[errorKey]}` });
        return;
      } 
    }

    const _errorKey = errorKey.split("_").join(" ");
    const message =
      _errorKey.charAt(0).toUpperCase() +
      errorKey.slice(1) +
      " " +
      error[errorKey];

    Alert.alert("Error", message);
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
      isvalidCheck: false,
    }));
  };

  // Customizable Area End
  // Customizable Area Start
  // /*istanbul ignore next*/
  createAccount = async () => {
    // You can define your custom rules here
    // For example, allow only alphabets and spaces

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    const sanitizedFirst = this.state.firstName.replace(/\s+/g, " ").trim();
    const sanitizedLast = this.state.lastName.replace(/\s+/g, " ").trim();

    if (!sanitizedFirst) {
      this.setState({ isFirstName: true });
      return;
    }
    if (!sanitizedLast) {
      this.setState({ isLastName: true });
      return;
    }
    if (this.state.email.length === 0) {
      this.setState({
        isEmail: true,
        errorMessage: i18n.t("Please_enter_email"),
      });
      return;
    }
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        isEmail: true,
        errorMessage: i18n.t("EnterVilidEmail"),
      });
      return;
    }
    if (this.state.password.length === 0) {
      this.setState({
        isPassowrd: true,
        errorMessage: i18n.t("Please_enter_password"),
      });
      return;
    }
    if (!passwordRegex.test(this.state.password)) {
      this.setState({
        isPassowrd: true,
        errorMessage:i18n.t("EnterValidPass"),
      });
      return;
    }
    this.validateFurtherFields();
  };

  validateFurtherFields = () => {
    if (this.state.comPassword.length === 0) {
      this.setState({
        isComPass: true,
        errorMessage: i18n.t("ReenterPasswordError"),
      });
      return;
    }
    if (this.state.password !== this.state.comPassword) {
      this.setState({
        isComPass: true,
        errorMessage:i18n.t("PasswordNotMatchError"), 
      });
      return;
    }
    if (this.state.phoneNumber.length === 0) {
      this.setState({
        isPhone: true,
        errorMessage: i18n.t("Please_enter_phonenumber"),
      });
      return;
    }
    if (
      this.state.phoneNumber.length < 8 ||
      this.state.phoneNumber.length > 11
    ) {
      this.setState({
        isPhone: true,
        errorMessage: i18n.t("ValidPhoneNumber"),
      });
      return;
    }
    this.checkvel();
  };
  checkvel = () => {
    if (!this.state.isChecked) {
      this.setState({
        isvalidCheck: true,
        errorMessage:i18n.t("TermConditionsError"),
      });
      return;
    }
    this.apiCallFunction();
  };

  apiCallFunction = async () => {
    this.setState({ isLoading: true });
    let deviceId = await getStorageData('USER_FCM_TOKEN')

    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const attrs = {
      full_phone_number:
        this.state.selectedCountryCode + this.state.phoneNumber,
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password,
      password_confirmation: this.state.comPassword,
      role: parseInt(this.state.roleId, 10),
      device_id: deviceId,
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

    this.createAccountApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.signupAPiEndPoint
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  nevigateToTermNdCondition = () => {
    setStorageData("policyType",JSON.stringify('Terms & Conditions'))
    this.btnRedirectSingupPolicies();
  };

  nevigateToPrivacyStatement = () => {
    setStorageData("policyType",JSON.stringify('Privacy Policy'))
    this.btnRedirectSingupPolicies()
  };

  btnRedirectSingupPolicies = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationTermsAndConditionsPrivacy)
    );

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }

  fetchCountryCodes = () => {
    this.setState({ isLoading: true });
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

  handleFirstName = (text: string) => {
    this.setState({ firstName: text, isFirstName: false });
  };

  handleLastName = (text: string) => {
    this.setState({ lastName: text, isLastName: false });
  };

  handleEmailChange = (text: string) => {
    this.setState({
      email: text.replace(/\s/g, ""),
      isEmail: false,
    });
  };

  handlePasswordChange = (text: string) => {
    if (text !== undefined && text !== null) {
      this.setState({ password: text.replace(/\s/g, "") });
    }
    this.setState({ isPassowrd: false });
  };

  handleConfirmPasswordChange = (text: string) => {
    this.setState({ comPassword: text, isComPass: false });
  };

  togglePasswordHide = () => {
    this.setState({ isHidePassword: !this.state.isHidePassword });
  };

  toggleConfirmPasswordHide = () => {
    this.setState({ isHideComPassword: !this.state.isHideComPassword });
  };

  handleMobileChange = (text: string) => {
    if (text !== undefined && text !== null) {
      this.setState({
        phoneNumber: text.replace(/\s/g, ""),
      });
    }
    this.setState({ isPhone: false });
  };

  toggleCountryDropdown = (open: boolean) => {
    this.setState({ dropdownOpen: !open });
  };

  handleCountrySelect = (index: number, { numeric_code }: CountryData) => {
    this.setState({
      selectedCodeIndex: index,
      dropdownOpen: false,
      selectedCountryCode: numeric_code,
    });
  };
  // Customizable Area End
}
