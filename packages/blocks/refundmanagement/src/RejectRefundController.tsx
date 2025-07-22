import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImageCropPicker from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
import { getStorageData } from "framework/src/Utilities";
import i18n from '../../../components/src/i18n/i18n.config'
import {
  RefundRejectResponse,
  ReturnRejectResponse,
} from "../__tests__/__mocks__/types";
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
  modal: boolean;
  rejectReason: number;
  rejectDescription: string;
  orderId: string;
  rejectDoc: {
    name: string;
    uri: string;
    type: string;
    backupFileName: string;
  };
  mode: "return" | "refund";
  error:
    | keyof Pick<S, "rejectReason" | "rejectDoc" | "rejectDescription">
    | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RejectRefundController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  returnRejectedApiCallId = "";
  refundRejectedApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: false,
      orderId: "",
      modal: false,
      rejectReason: -1,
      rejectDescription: "",
      rejectDoc: { name: "", uri: "", type: "", backupFileName: "" },
      mode: "refund",
      error: null,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const mode = message.getData(getName(MessageEnum.NavigationRejectType));
      const orderId = message.getData(
        getName(MessageEnum.NavigationRejectReturnOrderId)
      );
      this.setState({ mode: mode === "refund" ? "refund" : "return", orderId });
      return;
    }

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const json = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      switch (apiCallId) {
        case this.refundRejectedApiCallId:
          this.handleReject(json, "refund");
          break;
        case this.returnRejectedApiCallId:
          this.handleReject(json, "return");
          break;
        default:
          break;
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token });
  };

  get reasons() {
    return [
      { label: "Worn or Used Items" },
      { label: "Damaged Items" },
      { label: "Altered Items" },
      { label: "Sale Items" },
      { label: "Past Return Window" },
      { label: "Hygiene Concerns" },
    ];
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  openModal = () => this.setState({ modal: true });

  dismissModal = () => this.setState({ modal: false });

  capturePhoto = async () => {
    try {
      const photo = await ImageCropPicker.openCamera({
        multiple: false,
        freeStyleCropEnabled: true,
        mediaType: "photo",
      });
      this.setState({
        rejectDoc: {
          uri: photo.path,
          type: photo.mime,
          name: `reject-doc.${photo.mime.split("/")[1]}`,
          backupFileName: photo.path.split("/").pop()!,
        },
        modal: false,
        error: null,
      });
    } catch (_error) {
      runEngine.debugLog(_error);
      this.setState({ modal: false });
    }
  };

  selectPhoto = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        multiple: false,
        freeStyleCropEnabled: true,
        mediaType: "photo",
      });
      this.setState({
        rejectDoc: {
          uri: image.path,
          type: image.mime,
          name: `reject-doc.${image.mime.split("/")[1]}`,
          backupFileName: image.path.split("/").pop()!,
        },
        modal: false,
        error: null,
      });
    } catch (_error) {
      runEngine.debugLog(_error);
      this.setState({ modal: false });
    }
  };

  onReasonChange = (reason: { label: string }) => {
    const rIndex = this.reasons.findIndex(
      (item) => item.label === reason.label
    );
    this.setState({ rejectReason: rIndex, error: null });
  };

  onReasonUpdate = (rejectDescription: string) => {
    this.setState({ rejectDescription, error: null });
  };

  rejectReturn = () => {
    if (this.state.rejectReason < 0) {
      return this.setState({ error: "rejectReason" });
    }
    if (!this.state.rejectDescription) {
      return this.setState({ error: "rejectDescription" });
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const query =
      "?type=return_reject" +
      `&seller_order_id=${this.state.orderId}` +
      `&reason_of_rejection=${this.reasons[this.state.rejectReason].label}` +
      `&rejection_detail=${this.state.rejectDescription}`;

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateStatusEndpoint + query,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.putAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });

    this.returnRejectedApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  rejectRefund = () => {
    if (this.state.rejectReason < 0) {
      return this.setState({ error: "rejectReason" });
    }
    if (!this.state.rejectDoc.uri) {
      return this.setState({ error: "rejectDoc" });
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const query =
      "?type=refund_rejected" + `&seller_order_id=${this.state.orderId}`;

    const body = new FormData();
    body.append("image", (this.state.rejectDoc as unknown) as Blob);
    body.append(
      "reason_of_refund_rejected",
      this.reasons[this.state.rejectReason].label
    );

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateStatusEndpoint + query,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.putAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.refundRejectedApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  reject = () => {
    if (this.state.mode === "return") {
      this.rejectReturn();
    } else {
      this.rejectRefund();
    }
  };

  handleReject = (
    response: RefundRejectResponse | ReturnRejectResponse,
    mode: S["mode"]
  ) => {
    this.setState({ loading: false });
    if (response.data) {
      showMessage({
        message:
          mode === "refund"
            ? i18n.t('refundRejectedSuccessfully')
            : i18n.t('returnRequestRejectedSuccessfully'),
        type: "success",
        position: { top: 8 },
      });
      this.props.navigation.goBack();
    } else {
      showMessage({
        message: response.error || "Something went wrong",
        type: "success",
        position: { top: 8 },
      });
    }
  };
  // Customizable Area End
}
