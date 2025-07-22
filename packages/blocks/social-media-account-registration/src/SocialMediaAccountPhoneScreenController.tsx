import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import { isEmpty,setStorageData } from "../../../framework/src/Utilities";
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
  token: string;
  loading: boolean;
  dropdownOpen: boolean;
  selectedCodeIndex: number;
  countryList: CountryData[];
  countryCodeSelected: string;
  mobileNo: string;
  mobileNoError: boolean;
  accountId: string;
  mobileNoErrorMsg: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class SocialMediaAccountPhoneScreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  countryCodeApiCallId: string = "";
  addPhonenumberCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      loading: false,
      dropdownOpen: false,
      selectedCodeIndex: 0,
      countryList: [],
      countryCodeSelected: "+965",
      mobileNo: "",
      mobileNoError: false,
      accountId: "",
      mobileNoErrorMsg: "* Please enter your phone number",
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      this.fetchCountryCodes();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const accountId = message.getData(getName(MessageEnum.accountIdMessage));
      this.setState({ accountId: accountId });
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.countryCodeApiCallId) {
          const kuwaitIndex = responseJson.findIndex(
            (c: CountryData) => c.country_code === "KW"
          );
          this.setState({
            countryList: responseJson,
            selectedCodeIndex: kuwaitIndex,
            countryCodeSelected: responseJson[kuwaitIndex].numeric_code,
            loading: false,
          });
        }
        if (apiRequestCallId === this.addPhonenumberCallId) {
          this.saveLoggedInUserData(responseJson);
          this.addPhoneNumberSuccess(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
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
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(message.id, message);
  };

  sendOtpSocialLogin = () => {
    if (isEmpty(this.state.mobileNo)) {
      this.setState({ mobileNoError: true });
      return false;
    }

    const header = {
      "Content-Type": configJSON.formContentType,
    };

    let formdata = new FormData();

    formdata.append("account_id", this.state.accountId);
    formdata.append("full_phone_number",this.state.countryCodeSelected + this.state.mobileNo
    );

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addPhonenumberCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addPhoneNumberApiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  addPhoneNumberSuccess = (responseJson: any) => {
    if (responseJson.errors) {
      this.setState({
        mobileNoErrorMsg: responseJson.errors.message,
        mobileNoError: true,
      });
    } else {
      this.otpScreenRedirection(responseJson);
    }
  };

  otpScreenRedirection = (responseJson: any) => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialMediaAccountOtpVerify)
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      responseJson.meta.sms_otp_token
    );
    msg.addData(
      getName(MessageEnum.AuthTokenPhoneNumberMessage),
      this.state.mobileNo
    );
    msg.addData(
      getName(MessageEnum.AuthPhoneCountryCodeMessage),
      this.state.countryCodeSelected
    );

    this.send(msg);
  };

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
      setStorageData("UserFullName", JSON.stringify(responseJson.data.attributes.full_name));
      setStorageData("userID", JSON.stringify(responseJson.data.id))
      setStorageData('token',JSON.stringify(responseJson.meta.token))

      this.send(msg);
    }
  }
  // Customizable Area End
}
