import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { RefObject, createRef } from "react";
import { Alert, ScrollView } from "react-native";
import ImagePicker, { Options, Image } from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
import * as yup from "yup";
import { StylistCustomFormResponse } from "../__tests__/__mocks__/types";
import { getStorageData } from "../../../framework/src/Utilities";
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
  token: string;
  loading: boolean;
  editStatus: boolean;
  userId: string;
  error: string;
  profilePhoto: {
    uri: string;
    type: string;
    name: string;
  };
  facebook: string;
  instagram: string;
  tiktok: string;
  pinterest: string;
  profileBio: string;
  areaOfExpertise: string;
  yoe: string;
  language: string;
  mediaModal: boolean;
  errorKey:
    | keyof Pick<
        S,
        | "profileBio"
        | "yoe"
        | "areaOfExpertise"
        | "pinterest"
        | "facebook"
        | "tiktok"
        | "instagram"
        | "language"
      >
    | "";
  selectedlanguage: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class StylistCreateProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  scrollRef: RefObject<ScrollView> = { current: null };
  getStylishProfileApiCallId = "";
  updateStylishDataApiCallId = "";
  focusListener = "";
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
      userId: "",
      editStatus: false,
      error: "",
      profilePhoto: { uri: "", name: "", type: "" },
      language: "",
      profileBio: "",
      areaOfExpertise: "",
      yoe: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      pinterest: "",
      errorKey: "",
      mediaModal: false,
      selectedlanguage: "en",
    };
    this.scrollRef = createRef();
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      switch (apiCallId) {
        case this.getStylishProfileApiCallId:
          const response = responseJson as StylistCustomFormResponse;
          this.setState({
            yoe: response.data.attributes.year_of_experience,
            facebook: response.data.attributes.facebook,
            instagram: response.data.attributes.instagram,
            tiktok: response.data.attributes.tiktok,
            pinterest: response.data.attributes.pinterest,
            language: response.data.attributes.preferred_language,
            profilePhoto: {
              uri: response.data.attributes.profile_picture,
              name: "",
              type: "",
            },
            userId: response.data.id,
            profileBio: response.data.attributes.biography,
            areaOfExpertise: response.data.attributes.expertise,
            loading: false,
          });
          break;
        case this.updateStylishDataApiCallId:
          this.setState(
            {
              mediaModal: false,
              loading: false,
              editStatus: false,
            },
            () => {
              showMessage({
                message: "Profile updated successfully",
                position: { top: 0 },
              });
              this.scrollRef.current!.scrollTo({ y: 0, animated: false });
            }
          );
          break;
        default:
          break;
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start

    const token = await getStorageData("token", true);
    this.setState({ token }, () => {
      this.getProfileData();
    });
    this.props.navigation.addListener("didFocus", async () => {
      const mylanguage = await getStorageData("FA_LANGUAGE_ST");
      this.setState({ selectedlanguage: mylanguage }, () => {});
    });

    // Customizable Area End
  }

  // Customizable Area Start

  goBackTo = () => {
    this.setState({ editStatus: !this.state.editStatus });
  };

  selectImage = async (type: "camera" | "gallery") => {
    const options: Options = {
      mediaType: "photo",
      cropping: true,
      height: 500,
      width: 500,
    };
    try {
      const responses: Image =
        type === "gallery"
          ? await ImagePicker.openPicker(options)
          : await ImagePicker.openCamera(options);

      this.setState({
        profilePhoto: {
          uri: responses.path,
          type: responses.mime,
          name: `profile_photo.${responses.mime.split("/")[1]}`,
        },
      });
    } catch (_error) {}
    this.setState({ mediaModal: false });
  };

  chooseImage = () => this.selectImage("gallery");
  captureImage = () => this.selectImage("camera");

  openImageModal = () => this.setState({ mediaModal: true });
  closeImageModal = () => this.setState({ mediaModal: false });

  get languageType() {
    return [
      {
        display: "English",
        value: "english",
      },
      {
        display: "Arabic - عربي",
        value: "arabic",
      },
    ];
  }

  onSelectLanguageChange = ({ value }: { display: string; value: string }) => {
    this.setState({ language: value });
  };

  onProfileDataBioChange = (text: string) => {
    this.setState({ profileBio: text, error: "" });
  };

  onExperiseChange = (text: string) => {
    this.setState({ areaOfExpertise: text, error: "" });
  };

  onExperiseYearsChange = (text: string) => {
    if (/^\d{0,2}$/.test(text)) {
      this.setState({ yoe: text, error: "" });
    }
  }; //istanbul ignore next
  onInstraChange = (text: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/;
    if (text === "") {
      this.setState({ instagram: text, error: "", errorKey: "" });
    } else if (pattern.test(text)) {
      this.setState({ instagram: text, error: "", errorKey: "" });
    } else {
      this.setState({
        instagram: text,
        error: "Invalid Instagram URL",
        errorKey: "instagram",
      });
    }
  }; //istanbul ignore next
  onFacebookChange = (text: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/;
    if (text === "") {
      this.setState({ facebook: text, error: "", errorKey: "" });
    } else if (pattern.test(text)) {
      this.setState({ facebook: text, error: "", errorKey: "" });
    } else {
      this.setState({
        facebook: text,
        error: "Invalid Facebook URL",
        errorKey: "facebook",
      });
    }
  }; //istanbul ignore next
  onTiktokLinkChange = (text: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._]+\/?$/;
    if (text === "") {
      this.setState({ tiktok: text, error: "", errorKey: "" });
    } else if (pattern.test(text)) {
      this.setState({ tiktok: text, error: "", errorKey: "" });
    } else {
      this.setState({
        tiktok: text,
        error: "Invalid TikTok URL",
        errorKey: "tiktok",
      });
    }
  }; //istanbul ignore next
  onPinterestLinkChange = (text: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?pinterest\.com\/[A-Za-z0-9._-]+\/?$/;
    if (text === "") {
      this.setState({ pinterest: text, error: "", errorKey: "" });
    } else if (pattern.test(text)) {
      this.setState({ pinterest: text, error: "", errorKey: "" });
    } else {
      this.setState({
        pinterest: text,
        error: "Invalid Pinterest URL",
        errorKey: "pinterest",
      });
    }
  };

  validateCheck = () => {
    const schemaCheck: Partial<
      Record<Exclude<S["errorKey"], "">, yup.Schema<unknown>>
    > = {
      profileBio: yup.string().required(i18n.t("*choose_language")),
      areaOfExpertise: yup.string().required(i18n.t("*enter_Expertise")),
      yoe: yup.string().required(i18n.t("*enter_experience")),
      language: yup.string().required(i18n.t("*enter_bio")),
    };

    for (const [keyValue, validator] of Object.entries(schemaCheck)) {
      try {
        if (validator) {
          validator.validateSync(this.state[keyValue as keyof S]);
        }
      } catch (_error) {
        const validationErrors = _error as yup.ValidationError;
        this.setState({
          error: validationErrors.message,
          errorKey: keyValue as S["errorKey"],
        });
        if (keyValue === "language") {
          this.scrollRef.current!.scrollToEnd();
        }
        return;
      }
    }
    if (this.state.errorKey !== "") {
      Alert.alert(`Invalid ${this.state.errorKey} URL`);
      return true;
    }
    this.setState({ mediaModal: false, loading: false }, () => {
      this.updateStylishProfile();
    });
  };

  updateStylishProfile = () => {
    const bodyData = new FormData();

    if (this.state.profilePhoto.type) {
      bodyData.append(
        "profile_picture",
        this.state.profilePhoto as unknown as Blob
      );
    }
    bodyData.append("biography", this.state.profileBio);
    bodyData.append("year_of_experience", this.state.yoe);
    bodyData.append("expertise", this.state.areaOfExpertise);
    bodyData.append("facebook", this.state.facebook);
    bodyData.append("instagram", this.state.instagram);
    bodyData.append("tiktok", this.state.tiktok);
    bodyData.append("pinterest", this.state.pinterest);
    bodyData.append("preferred_language", this.state.language);
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.stylistCustomFormEndPoint + "/" + this.state.userId,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.updateAPiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: bodyData,
    });

    this.updateStylishDataApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  nextBtn = () => {
    if (this.state.editStatus) {
      this.validateCheck();
    } else {
      this.goBackTo();
    }
  };

  getProfileData = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.stylistCustomFormEndPoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });
    this.getStylishProfileApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };
  removeProfilePic = () => {
    this.setState({ profilePhoto: { name: "", type: "", uri: "" } });
    this.updateStylishProfile();
  };
  backToProfilePage() {
    this.props.navigation.goBack();
  }
  headerButtonPressLeft = () => {
    if (this.state.selectedlanguage == "en") {
      this.backToProfilePage();
    }
  };
  headerButtonPressRight = () => {
    if (this.state.selectedlanguage == "ar") {
      this.backToProfilePage();
    }
  };

  // Customizable Area End
}
