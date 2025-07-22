import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "framework/src/Message";
import { WebViewNavigation } from "react-native-webview";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
import { RefObject } from "react";
import { showMessage } from "react-native-flash-message";
import { ChargeResponse, OrderReponse } from "./types/types";
import { Keyboard, EmitterSubscription, ScrollView } from "react-native";

const { baseURL } = require("../../../framework/src/config");
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
  webUrl: string;
  emptyheight: number;
  chargeId: string;
  token: string;
  loading: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TapWebViewForStylistPlanController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getChargeApiCallId = "";
  getOrderApiCallId = "";
  keyboardDidShow = { remove: () => {} } as EmitterSubscription;
  keyboardWillHide = { remove: () => {} } as EmitterSubscription;
  scrollRef: RefObject<ScrollView> = { current: null };
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      webUrl: "",
      chargeId: "",
      emptyheight: 0,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);

    // Customizable Area Start
    if (
      getName(MessageEnum.NavigationPayLoadMessage) === message.id &&
      message.getData(getName(MessageEnum.NavigationTapWebViewForStylistPlanMessageData))
    ) {
      const itemData = message.getData(
        getName(MessageEnum.NavigationTapWebViewForStylistPlanMessageData)
      );

      if (itemData.WebUrl) {
          this.setState({
            webUrl: itemData.WebUrl,
            token: itemData.token,
            chargeId: itemData.chargeId,
            loading: false,
          });
      }
      return;
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const successResponse = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiCallId === this.getChargeApiCallId) {
        const response = successResponse as ChargeResponse;
        if (response.status === "CAPTURED") {
          this.props.navigation.replace("StylistPlanSuccess");
        } else {
          showMessage({
            message:
              response.response?.message ||
              i18n.t('failedCardErrorText'),
            position: { top: 8 },
          });
          this.props.navigation.goBack();
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  componentWillUnmount = async () => {
    this.keyboardDidShow.remove();
    this.keyboardWillHide.remove();
};

  componentDidMount = async () => {
    this.keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      ({ endCoordinates }) => {
        this.setState(
          {
            emptyheight: endCoordinates.height,
          },
          () => this.scrollRef.current!.scrollToEnd({ animated: true })
        );
      }
    );

    this.keyboardWillHide = Keyboard.addListener("keyboardDidHide", () => {
      this.setState({ emptyheight: 0 }, this.scrollToEnd);
    });
  };

  onNavigationStateChangeHandler = (webView: WebViewNavigation) => {
    if (webView.url.includes("/admin")) {
      this.setState({ loading: true });
      if (this.state.chargeId) {
        this.getCharge();
      }
    }
  };

  getCharge = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));

    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: `${configJSON.retrieveHireCharge}${this.state.chargeId}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": configJSON.validationApiContentType,
      },
    });

    this.getChargeApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };


  scrollToEnd = () => this.scrollRef.current!.scrollToEnd({ animated: true });
  // Customizable Area End
}
