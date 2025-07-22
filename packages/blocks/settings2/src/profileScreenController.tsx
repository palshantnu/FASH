import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert } from "react-native";
import { isEmail } from "../../../framework/src/Utilities";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import { UserDetailResponse } from "./responses";
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
  isLoading: boolean;
  firstName: string;
  lastName: string;
  isFirstName: boolean;
  isLastName: boolean;
  isEmail: boolean;
  email: string;
  errorMessage: string;
  phoneNumber: string;
  isPhone: boolean;
  token: string;
  isNewPassowrd: boolean;
  newPassword: string;
  isHidePassword: boolean;
  isOldHidePassword: boolean;
  isComPass: boolean;
  comPassword: string;
  isHideComPassword: boolean;
  pfullName: string;
  confirmPassword: string;
  hidePassword: boolean;
  hidePasswordConfirm: boolean;
  isPassword: boolean;
  isComPassword: boolean;
  isOldPassowrd: boolean;
  oldPassword: string;
  pphoneNumber: string;
  isEmailChanged: boolean;
  isPhoneNumberChanged: boolean;
  newEmail: string;
  newPhone: string;
  emailToken: string;
  smsToken: string;
  dropdownOpen: boolean;
  selectedCountryIndex: number;
  selectedCountryCode: string;
  countryList: CountryData[];
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProfileScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateProfileApiCallID = "";
  resetNewPasswordApiCallID = "";
  getUserInfoApiCallID = "";
  countryCodeApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      isLoading: false,
      // Customizable Area Start
      firstName: "",
      lastName: "",
      isFirstName: false,
      isLastName: false,
      pfullName: "Enter your full name",
      pphoneNumber: "Enter your phone number",
      isEmail: false,
      email: "",
      errorMessage: "",
      isPhone: false,
      phoneNumber: "",
      token: "",
      isNewPassowrd: false,
      newPassword: "",
      isHidePassword: false,
      isOldHidePassword: false,
      isComPass: false,
      comPassword: "",
      isHideComPassword: false,
      confirmPassword: "",
      hidePassword: false,
      hidePasswordConfirm: false,
      isPassword: false,
      isComPassword: false,
      isOldPassowrd: false,
      oldPassword: "",
      isEmailChanged: false,
      isPhoneNumberChanged: false,
      newEmail: "",
      newPhone: "",
      emailToken: "",
      smsToken: "",
      countryList: [],
      selectedCountryIndex: 0,
      selectedCountryCode: "+965",
      dropdownOpen: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState(
        {
          token: token,
        },
        () => {
          this.fetchCountryCodes();
        }
      );
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (responseJson) {
        switch (apiId) {
          case this.countryCodeApiCallId:
            const kuwaitIndex = responseJson.findIndex(
              ({ country_code }: CountryData) => country_code === "KW"
            );
            this.setState({
              countryList: responseJson,
              selectedCountryCode: responseJson[kuwaitIndex].numeric_code,
              selectedCountryIndex: kuwaitIndex,
            });
            this.getProfileResponse();
            break;
          case this.getUserInfoApiCallID:
            this.handleCondition(
              "errors" in responseJson,
              () => {},
              () => this.getUserInfoSucessCallBack(responseJson)
            );
            break;
          case this.updateProfileApiCallID:
            this.handleCondition(
              "errors" in responseJson,
              () => this.updateProfileFailureCallBack(responseJson),
              () => this.updateProfileSucessCallBack(responseJson)
            );
            break;
          case this.resetNewPasswordApiCallID:
            this.handleCondition(
              "errors" in responseJson,
              () => this.resetNewPasswordFailureCallBack(responseJson),
              () => this.resetNewPasswordSucessCallBack(responseJson)
            );
            break;
          default:
            break;
        }
      } else {
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }

  // Customizable Area Start
  handleCondition = (
    cond: boolean,
    ifFunc: () => unknown,
    elseFunc: () => unknown
  ) => {
    if (cond) {
      ifFunc();
    } else {
      elseFunc();
    }
  };

  getUserInfoSucessCallBack = (responseJson: UserDetailResponse) => {
    const data = responseJson?.data?.attributes;
    if (!data) {
      return;
    }
    const countryCode = "+" + data.country_code;
    const countryIndex = this.state.countryList.findIndex(
      ({ numeric_code }) => numeric_code === countryCode
    );
    this.setState({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      newEmail: data.email,
      phoneNumber: data.phone_number,
      newPhone: data.phone_number,
      selectedCountryCode: this.state.countryList[countryIndex].numeric_code,
      selectedCountryIndex: countryIndex,
      isLoading: false,
    });
  };

  handleFirstName = (text: string) => {
    this.setState({ firstName: text.replace(/\d/g, ''), isFirstName: false });
  };

  handleLastName = (text: string) => {
    this.setState({ lastName: text.replace(/\d/g, ''), isLastName: false });
  };

  handleEmail = (text: string) => {
    this.setState({
      email: text.replace(/\s/g, ""),
      isEmail: false,
    });
  };

  handlePhoneNumber = (phoneNumber: string) => {
    this.setState({ phoneNumber, isPhone: false });
  };

  handleCountrySelect = (index: number, { numeric_code }: CountryData) => {
    this.setState({
      selectedCountryIndex: index,
      dropdownOpen: false,
      selectedCountryCode: numeric_code,
    });
  };

  handleDropdownToggle = () => {
    this.setState(({ dropdownOpen }) => ({
      dropdownOpen: !dropdownOpen,
    }));
  };

  handleOldPassword = (text: string) => {
    if (text !== undefined && text !== null) {
      this.setState({ oldPassword: text.replace(/\s/g, "") });
    }
    this.setState({
      isOldPassowrd: false,
    });
  };

  toggleOldPassword = () =>
    this.setState({
      isOldHidePassword: !this.state.isOldHidePassword,
    });

  handleNewPassword = (text: string) => {
    if (text !== undefined && text !== null) {
      this.setState({
        newPassword: text.replace(/\s/g, ""),
        isNewPassowrd: false,
        isComPass: false,
      });
    }
  };

  toggleNewPassword = () => {
    this.setState({ isHidePassword: !this.state.isHidePassword });
  };

  handleConfirmPassword = (text: string) => {
    this.setState({ comPassword: text, isComPassword: false });
  };

  toggleConfirmPassword = () => {
    this.setState({
      isHideComPassword: !this.state.isHideComPassword,
    });
  };

  updateProfileSucessCallBack = (responseJson: any) => {
    this.setState(
      {
        emailToken: responseJson?.meta?.email_token,
        smsToken: responseJson?.meta?.sms_token,
        isLoading: false,
      },
      () => {
        this.checkEmailChange();
      }
    );
  };
// istanbul ignore next
  updateProfileFailureCallBack = (responseJson: any) => {
    this.setState({
      emailToken: responseJson?.meta?.email_token,
        smsToken: responseJson?.meta?.sms_token,
       isLoading: false });
    const error = Array.isArray(responseJson.errors)
      ? responseJson.errors[0]
      : responseJson.errors;

    const errorKey = Object.keys(error)[0];
    const errors: Record<string, string> = {
      full_name: i18n.t("fullNameValidation"),
      full_phone_number: i18n.t("phoneNumberValidation1"),
    };
    showMessage({
      message:
        errors[errorKey] ||
        (errorKey.charAt(0).toUpperCase() + errorKey.slice(1)).replace(/_/g, " ") +
          " " +
          error[errorKey],
      type: "warning",
      position: { top: 8 },
    });

    const emailResult = this.state.newEmail.localeCompare(this.state.email);
    const phoneResult = this.state.phoneNumber.localeCompare(
      this.state.newPhone
    );
    if (emailResult !== 0 || phoneResult !== 0 && error.message ==="New phone number must be verified before updating profile") {
      this.navigateVerifyAccount(
        emailResult !== 0,
        phoneResult !== 0,
        emailResult !== 0 && phoneResult !== 0
      );
    }

  };

  resetNewPasswordSucessCallBack = (responseJson: any) => {
    this.setState({ isLoading: false });

    Alert.alert("Success", responseJson?.meta?.message, [
      {
        text: "OK",
        onPress: () => this.props.navigation.goBack(),
      },
    ]);
  };

  resetNewPasswordFailureCallBack = (responseJson: any) => {
    this.setState({ isLoading: false });
    Alert.alert("Error", responseJson.errors);
  };

  onPressSaveChnages = () => {
    const checkEmail = isEmail("", this.state.email);
    const sanitizedFirstName = this.state.firstName.replace(/\s+/g, " ").trim();
    const sanitizedLastName = this.state.lastName.replace(/\s+/g, " ").trim();

    if (!sanitizedFirstName) {
      this.setState({ isFirstName: true });
      return;
    }
    if (!sanitizedLastName) {
      this.setState({ isLastName: true });
      return;
    }
    if (this.state.email.length === 0) {
      this.setState({
        isEmail: true,
        errorMessage: i18n.t("emptyEmailValidation"),
      });
      return;
    }
    if (!checkEmail.status) {
      this.setState({
        isEmail: true,
        errorMessage: i18n.t("emailValidation"),
      });
      return;
    }
    if (
      this.state.phoneNumber.length < 8 ||
      this.state.phoneNumber.length > 11
    ) {
      this.setState({
        isPhone: true,
        errorMessage: i18n.t("phoneNumberValidation"),
      });
      return false;
    } else {
      this.apiCallFunction();
    }
  };

  checkEmailChange = () => {
    const emailResult = this.state.newEmail.localeCompare(this.state.email);
    const phoneResult = this.state.phoneNumber.localeCompare(
      this.state.newPhone
    );
    if (emailResult !== 0 || phoneResult !== 0) {
      this.navigateVerifyAccount(
        emailResult !== 0,
        phoneResult !== 0,
        emailResult !== 0 && phoneResult !== 0
      );
    } else {
      showMessage({
        message: i18n.t("profileUpdateSuccess"),
        type: "success",
        position: { top: 8 },
      });
    }
  };

  navigateVerifyAccount = (
    isEmailChanged: boolean,
    isPhoneChanged: boolean,
    isBothParamsChanged: boolean
  ) => {
    this.setState({ newEmail: "", newPhone: "" }, () => {
      this.props.navigation.navigate("VeriftAccount", {
        item: {
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          isEmailChanged,
          isPhoneChanged,
          isBothParamsChanged,
          smsToken: this.state.smsToken,
          emailToken: this.state.emailToken,
        },
      });
    });
  };

  apiCallFunction = () => {
    this.setState({ isLoading: true });

    const header = {
      token: this.state.token,
      "Content-Type": configJSON.validationApiContentType,
    };
    const httpBody = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      full_phone_number:
        this.state.selectedCountryCode + this.state.phoneNumber,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.updateProfileApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateProfileEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.APiMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  onPressChangePass = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (this.state.oldPassword.length === 0) {
      this.setState({
        isOldPassowrd: true,
        errorMessage: i18n.t("emptyOldPasswordValidation"),
      });
      return;
    }

    if (this.state.newPassword.length === 0) {
      this.setState({
        isNewPassowrd: true,
        errorMessage: i18n.t("emptyNewPasswordValidation"),
      });
      return;
    }

    if (this.state.oldPassword == this.state.newPassword) {
      this.setState({
        isComPass: true,
        errorMessage:  i18n.t("oldAndNewPasswordValidation"),
      });
      return;
    }

    if (!passwordRegex.test(this.state.newPassword)) {
      this.setState({
        isNewPassowrd: true,
        errorMessage: i18n.t("newPasswordValidation"),
      });
      return;
    }

    if (this.state.comPassword.length === 0) {
      this.setState({
        isComPassword: true,
        errorMessage: i18n.t("emptyComPasswordValidation"),
      });
      return;
    }

    if (this.state.newPassword !== this.state.comPassword) {
      this.setState({
        isComPassword: true,
        errorMessage: i18n.t("newPasswordValidation1"),
      });
      return false;
    } else {
      this.apiCall();
    }
  };

  apiCall = () => {
    this.setState({ isLoading: true });
    let header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    let httpBody = {
      data: {
        current_password: this.state.oldPassword,
        new_password: this.state.newPassword,
        confirm_password: this.state.comPassword,
      },
    };

    const chnagePassRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resetNewPasswordApiCallID = chnagePassRequestMessage.messageId;

    chnagePassRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    chnagePassRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.changePass
    );
    chnagePassRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    chnagePassRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.APiMethod
    );
    runEngine.sendMessage(
      chnagePassRequestMessage.id,
      chnagePassRequestMessage
    );
    return chnagePassRequestMessage.messageId;
  };

  getProfileResponse = () => {
    this.setState({ isLoading: true });
    let header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const getUserInfoRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserInfoApiCallID = getUserInfoRequestMessage.messageId;

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
  // Customizable Area End
}
