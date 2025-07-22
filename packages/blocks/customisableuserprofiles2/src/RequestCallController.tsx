import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  reason: string;
  reasonError: boolean;
  reasonErrorMessage: string;
  hours: string;
  hoursError: boolean;
  hoursErrorMessage: string;
  minutes: string;
  minutesError: boolean;
  minutesErrorMessage: string;
  token: string;
  stylist_id: string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class RequestCallController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  requestCallApiCallID = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      loading: false,
      reason: '',
      reasonError: false,
      reasonErrorMessage: '',
      hours: '',
      hoursError: false,
      hoursErrorMessage: '',
      minutes: '',
      minutesError: false,
      minutesErrorMessage: '',
      token: '',
      stylist_id : '',
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      this.handleSessionResponseMessage(message);
      return;
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestAPIResponseMessage(message);
      return;
    } 
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  updateReason = (reason: string) => {
    this.setState({
      reason: reason.trimStart(),
      reasonError: false,
      reasonErrorMessage: '',
    });
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  private handleSessionResponseMessage(message: Message) {
    let token = message.getData(getName(MessageEnum.SessionResponseToken));
    runEngine.debugLog("TOKEN", token);
    if (token) {
      this.setState({ token: token });
    }
  }

  private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.RequestCall));
    this.setState({ stylist_id: data.stylistId });
  }

  private handleRestAPIResponseMessage(message: Message) {
    const dataMessage = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
  
    if (this.requestCallApiCallID === dataMessage) {
      this.handleRequestCallResponse(message);
    }
  }

   private handleRequestCallResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!responseJson.errors) {
      this.setState({ loading: false });
      this.props.navigation.goBack();
      showMessage({
        message: i18n.t("requestCallSuccessMsg"),
        position: { top: 8 },
        type: "success",
      });
    } 
  }

  updateHours = (hours: string) => {
    const regex = /^\d*$/;
    if (regex.test(hours)) {
      this.setState({
        hours: hours,
        hoursError: false,
        hoursErrorMessage: '',
      });
    } 
  }

  validateForm = () => {
    const { reason, hours, minutes } = this.state;
    let result = true;
    if (!reason) {
      this.setState({
        reasonError: true,
        reasonErrorMessage: i18n.t("reasonForCallErrorMessage"),
      });
      result = false;
    }
    if (!hours) {
      this.setState({
        hoursError: true,
        hoursErrorMessage: i18n.t("requiredHoursErrorMsg")
      });
      result = false;
    }
    if (parseInt(hours) >= 24) {
      this.setState({
        hoursError: true,
        hoursErrorMessage: i18n.t("maxHoursErrorMsg"),
      });
      result = false;
    }
    if (!minutes) {
      this.setState({
        minutesError: true,
        minutesErrorMessage: i18n.t("requiredMinsErrorMsg"),
      });
      result = false;
    }
    if (parseInt(minutes) >= 60) {
      this.setState({
        minutesError: true,
        minutesErrorMessage: i18n.t("minsErrorMsg"),
      });
      result = false;
    }
    if (result) {
      this.setState({
        reasonError: false,
        reasonErrorMessage: '',
        hoursError: false,
        hoursErrorMessage: '',
        minutesError: false,
        minutesErrorMessage: '',
      });
    }
    return result;
  }

  requestCall = () => {
    this.setState({ loading: true });
    if (!this.validateForm()) {
      this.setState({ loading: false });
      return;
    }
    const { reason, hours, minutes } = this.state;
    this.makeCallRequest(reason, hours, minutes);
  }

  apiCall = (
    apiLink: string,
    method: string,
    header: unknown,
    content: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiLink
    );
    setMessageId(message.messageId);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), content);
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    runEngine.sendMessage(message.messageId, message);
  };

  makeCallRequest = (reason: string, hours: string, minutes: string) => {
    let body = new FormData();
    body.append("reason", reason);
    body.append("hour", hours);
    body.append("minute", minutes);
    body.append("stylist_id", this.state.stylist_id);
    const header = {
      token: this.state.token
    };
    this.apiCall(
      configJSON.requestCallEndPoint,
      configJSON.exampleAPiMethod,
      header,
      body,
      (messageId) => {
        this.requestCallApiCallID = messageId;
      }
    );
  }
  updateMinutes = (minutes: string) => {
    const regex = /^\d*$/;
    if (regex.test(minutes)) {
      this.setState({
        minutes: minutes,
        minutesError: false,
        minutesErrorMessage: '',
      });
    } 
  }
  // Customizable Area End
}