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
import * as yup from "yup";
import RNFS from "react-native-fs";
import DocumentPicker from "react-native-document-picker";
import i18n from "../../../components/src/i18n/i18n.config";

interface FileData {
  uri: string;
  name: string;
  type: string;
  backupFileName: string;
}
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
  mediaModal: boolean;
  passport: FileData;
  commercial_license: FileData;
  authorized_signature: FileData;
  moa: FileData;
  business_bank_account: FileData;
  errorKey:
    | keyof Pick<
        S,
        | "passport"
        | "commercial_license"
        | "moa"
        | "authorized_signature"
        | "business_bank_account"
      >
    | "";
  docState: Exclude<S["errorKey"], "">;
  selectedLanguage: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class StylistVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  uploadDocsApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token: "",
      loading: false,
      mediaModal: false,
      passport: { name: "", uri: "", type: "", backupFileName: "" },
      commercial_license: { name: "", uri: "", type: "", backupFileName: "" },
      authorized_signature: { name: "", uri: "", type: "", backupFileName: "" },
      moa: { name: "", uri: "", type: "", backupFileName: "" },
      business_bank_account: {
        name: "",
        uri: "",
        type: "",
        backupFileName: "",
      },
      errorKey: "",
      docState: "passport",
      selectedLanguage: "en",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      return this.handleSessionResponse(message);
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiCallId === this.uploadDocsApiCallId) {
        if ("data" in responseJson) {
          showMessage({
            message: "Your documents have been uploaded successfully",
            type: "success",
            position: { top: 8 },
          });
          this.setState({ loading: false });
          const messages = new Message(
            getName(MessageEnum.NavigationStylistConfirmation)
          );
          messages.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
          );
          this.send(messages);
          return;
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
    // Customizable Area End
  }

  // Customizable Area Start
  handleSessionResponse = (message: Message) => {
    if (!this.state.token) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
  // istanbul ignore next
  addDocs = async (
    keyName: Exclude<S["errorKey"], "">,
    mode: "camera" | "gallery"
  ) => {
    try {
      let uri: string = "";
      let type: string = "";
      let name: string = "";

      if (keyName === "moa") {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });

        const file = res[0];
        uri = file.uri;
        type = file.type!;
        name = file.name;
      } else {
        const image =
          mode === "gallery"
            ? await ImageCropPicker.openPicker({
                freeStyleCropEnabled: true,
                compressImageMaxWidth: 1024,
                compressImageMaxHeight: 1024,
                compressImageQuality: 1,
              })
            : await ImageCropPicker.openCamera({
                freeStyleCropEnabled: true,
              });

        uri = image.path;
        type = image.mime;
        name = `${keyName}.${type.split("/")[1]}`;
      }
      const stats = await RNFS.stat(uri);
      const sizeInBytes = Number(stats.size);
      const fileSizeInMB = sizeInBytes / (1024 * 1024);

      if (fileSizeInMB > 4) {
        showMessage({
          message: i18n.t("stylistUUploadDocSizeMessage"),
          position: { top: 8 },
          type: "warning",
        });
        this.setState({ errorKey: "", mediaModal: false });
        return;
      }

      this.setState({
        [keyName as "passport"]: {
          uri,
          type,
          name,
          backupFileName: uri.split("/").pop()!,
        },
        errorKey: "",
        mediaModal: false,
      });
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  removeDoc = (keyName: Exclude<S["errorKey"], "">) => {
    this.setState({
      [keyName as "passport"]: {
        name: "",
        uri: "",
        type: "",
        backupFileName: "",
      },
    });
  };
  // istanbul ignore next
  uploadDocs = () => {
    const validator = yup.object({
      uri: yup.string().required(),
      type: yup.string().required(),
    });

    for (const keyName of [
      "passport",
      "commercial_license",
      "moa",
      "authorized_signature",
      "business_bank_account",
    ]) {
      try {
        validator.validateSync(this.state[keyName as keyof S]);
      } catch (_error) {
        this.setState({ errorKey: keyName as S["errorKey"] });
        showMessage({
          message: "Please choose all documents",
          position: { top: 8 },
          type: "warning",
        });
        return;
      }
    }

    const body = new FormData();
    for (const keyName of [
      "passport",
      "commercial_license",
      "moa",
      "authorized_signature",
      "business_bank_account",
    ]) {
      const photo = { ...this.state[keyName as "passport"] };
      body.append(keyName, photo as unknown as Blob);
    }

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.sellerDetailsAPIMethodPATCH,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.uploadStylistDocs,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.setState({ loading: true });
    this.uploadDocsApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  openModal = (docKey: S["docState"]) => {
    this.setState({ docState: docKey, mediaModal: true });
  };
  closeModal = () => this.setState({ mediaModal: false });
  capturePhoto = () => {
    this.addDocs(this.state.docState, "camera");
  };
  choosePhoto = () => {
    this.addDocs(this.state.docState, "gallery");
  };
  // istanbul ignore next
  returnAlignment = () => {
    if (i18n.language === "ar") {
      return "right";
    } else {
      return "left";
    }
  };

  returnFlexDirection = () => {
    if (i18n.language === "ar") {
      return "row-reverse";
    } else {
      return "row";
    }
  };
  // Customizable Area End
}
