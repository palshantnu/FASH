import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert, Keyboard } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IMessage {
  id: string;
}
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  chatId: number;
  isFocus: boolean;
  value: any
  onChangeTxtValue: string
  reasons: any
  reportReasonId: number
  chatID: any
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatViewController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  addUserToChatApiCallId: string = "";
  leaveChatApiCallId: string = "";
  sendMessageApiCallId: string = "";
  toggleMuteApiCallId: string = "";
  updateReadMessageApiCallId: string = "";
  refreshChatInterval: unknown;
  reportPersonApiCallId: string = "";
  reportPersonReasonApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionRequestMessage),
      getName(MessageEnum.SessionResponseToken),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      chatId: 3,
      isFocus: false,
      value: null,
      onChangeTxtValue: "",
      reasons: [],
      reportReasonId: 0,
      chatID: 0
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token }, () => {
          this.reportPersonReason(token)
        });
      }
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const chatOrderID = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      const { chatId } = chatOrderID
      this.setState({ chatID: chatId })
    }
    let apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      if (apiRequestCallId === this.reportPersonReasonApiCallId) {
        this.setState({ reasons: responseJson?.reasons })
      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      if (apiRequestCallId === this.reportPersonApiCallId) {
        if (responseJson?.chat_report) {
          this.navigateToChat(responseJson?.chat_report?.reason)
        } else if (responseJson?.message) {
          alert(JSON.stringify(responseJson.message))
        }
        else {
          Alert.alert(responseJson?.errors[0])
        }
      }
    }
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  hideKeyboard() {
    if (!this.isPlatformWeb()) {
      Keyboard.dismiss();
    }
  }

  onChangeInputText = (text: string) => {
    this.setState({ onChangeTxtValue: text })
  }

  goBackBtn = () => {
    this.props.navigation.goBack()
  }

  onFocusBtn = () => {
    this.setState({ isFocus: true })
  }

  onBlurBtn = () => {
    this.setState({ isFocus: false })
  }

  onChangeDropBtn = (item: any) => {
    this.setState({ value: item?.reason, reportReasonId: item?.id })
    this.setState({ isFocus: false })
  }

  reportPersonReason = async (token: any) => {
    const header = {
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.reportPersonReasonApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/report_reasons`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  reportPersonApi = async () => {
    const header = {
      'Content-Type': 'application/json',
      token: this.state.token,
    };

    const data = {
      'chat_report_reason_id': this.state.reportReasonId,
      'comment': this.state.onChangeTxtValue
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.reportPersonApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/${this.state.chatID}/report_chat`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  navigateToChat = (reason: string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'ReportPerson'
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      reason
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  }
  // Customizable Area End
}
