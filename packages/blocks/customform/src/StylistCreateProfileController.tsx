import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, RefObject } from "react";
import { ScrollView, LogBox, EmitterSubscription } from "react-native";
import ImagePicker, { Options, Image } from "react-native-image-crop-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { showMessage } from "react-native-flash-message";
import * as yup from "yup";

import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import {
  getStorageData,
  removeStorageData,
  getOS,
} from "../../../framework/src/Utilities";
import { StylistCustomFormResponse } from "../__tests__/__mocks__/types";
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
  step: number;
  error: string;
  profilePhoto: {
    uri: string;
    name: string;
    type: string;
  };
  profileBio: string;
  areaOfExpertise: string;
  yoe: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  pinterest: string;
  language: string;
  mediaModal: boolean;
  selectMultiple: boolean;
  portfolio: Array<{
    uri: string;
    name: string;
    type: string;
    description: string;
  }>;
  countries: Array<CountryData>;
  selectedCountryCode: string;
  selectedCountryCodeIndex: number;
  phoneNumber: string;
  isCountryOpen: boolean;
  address: string;
  area: string;
  block: string;
  mallName: string;
  floor: string;
  unitNumber: string;
  city: string;
  zip: string;
  accName: string;
  iban: string;
  accNumber: string;
  errorKey:
  | keyof Pick<
    S,
    | "profileBio"
    | "yoe"
    | "areaOfExpertise"
    | "language"
    | "address"
    | "accName"
    | "accNumber"
    | "iban"
    | "portfolio"
  >
  | "";
  customFormId: string | number;
  selectedlanguage: string
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
  countryCodesApiCallId = "";
  getCustomProfileApiCallId = "";
  updateDataApiCallId = "";
  uploadPortfolioApiCallId = "";
  checkIBANCallID = "";
  focusListener = { remove: () => { } } as EmitterSubscription;
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
      step: 0,
      error: "",
      profilePhoto: { uri: "", name: "", type: "" },
      profileBio: "",
      areaOfExpertise: "",
      yoe: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      pinterest: "",
      language: "",
      mediaModal: false,
      selectMultiple: false,
      portfolio: [],
      countries: [],
      selectedCountryCode: "",
      selectedCountryCodeIndex: 0,
      phoneNumber: "",
      isCountryOpen: false,
      address: "",
      area: "",
      block: "",
      mallName: "",
      floor: "",
      unitNumber: "",
      city: "",
      zip: "",
      accName: "",
      iban: "",
      accNumber: "",
      errorKey: "",
      customFormId: 0,
      selectedlanguage: "ar"
    };
    this.scrollRef = createRef();

    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (
      message.id === getName(MessageEnum.SessionResponseMessage) &&
      !this.state.token
    ) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, this.fetchCustomProfile);
      return;
    }
  
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
  
      this.handleApiResponse(apiCallId, responseJson);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchCountryCodes();
    this.send(new Message(getName(MessageEnum.SessionRequestMessage)));
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        try {
          this.setState({ selectedlanguage: i18n.language }, () => {
          })

          const address = await getStorageData("storeAddressMap", true);
          if (typeof address === "object" && "addressselected" in address) {
            this.setState({ address: address.addressselected, error: "" });
          }
          removeStorageData("storeAddressMap");
        } catch (_) { }
      }
    );
    // Customizable Area End
  }

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  private handleApiResponse(apiCallId: string, responseJson: any) {
    switch (apiCallId) {
      case this.countryCodesApiCallId:
        this.handleCountryCodesResponse(responseJson);
        break;
      case this.getCustomProfileApiCallId:
        this.handleCustomProfileResponse(responseJson);
        break;
      case this.updateDataApiCallId:
        this.handleUpdateDataResponse(responseJson);
        break;
      case this.uploadPortfolioApiCallId:
        this.handleUploadPortfolioResponse(responseJson);
        break;
      case this.checkIBANCallID:
        this.handleCheckIBANResponse(responseJson);
        break;
      default:
        break;
    }
  }
  
  private handleCountryCodesResponse(responseJson: any) {
    const kuwaitIndex = responseJson.findIndex(
      ({ country_code }: CountryData) => country_code === "KW"
    );
    this.setState(({ profileBio }) => ({
      countries: responseJson,
      selectedCountryCode: responseJson[kuwaitIndex].numeric_code,
      selectedCountryCodeIndex: kuwaitIndex,
      loading: Boolean(profileBio),
    }));
  }
  
  private handleCustomProfileResponse(responseJson: StylistCustomFormResponse) {
    if (!responseJson.data) return;
  
    const bank = responseJson.data.attributes.bank_detail.data[0];
    this.setState(({ countries }) => ({
      profilePhoto: {
        uri: responseJson.data.attributes.profile_picture,
        name: "",
        type: "",
      },
      profileBio: responseJson.data.attributes.biography,
      areaOfExpertise: responseJson.data.attributes.expertise,
      yoe: responseJson.data.attributes.year_of_experience,
      facebook: responseJson.data.attributes.facebook,
      instagram: responseJson.data.attributes.instagram,
      tiktok: responseJson.data.attributes.tiktok,
      pinterest: responseJson.data.attributes.pinterest,
      language: responseJson.data.attributes.preferred_language,
      phoneNumber: this.bypassNull(responseJson.data.attributes.contact_number),
      address: this.bypassNull(responseJson.data.attributes.address),
      area: this.bypassNull(responseJson.data.attributes.location_info),
      block: this.bypassNull(responseJson.data.attributes.block),
      mallName: this.bypassNull(responseJson.data.attributes.mall_name),
      floor: this.bypassNull(responseJson.data.attributes.floor),
      unitNumber: this.bypassNull(responseJson.data.attributes.unit_number),
      city: this.bypassNull(responseJson.data.attributes.city),
      zip: this.bypassNull(responseJson.data.attributes.zipcode),
      accName: bank.attributes.account_holder_name,
      iban: bank.attributes.iban,
      accNumber: bank.attributes.account_number,
      loading: !countries.length,
    }));
  }
  
  private handleUpdateDataResponse(responseJson: StylistCustomFormResponse) {
    if ("error" in responseJson) {
      showMessage({
        message: responseJson.error!,
        position: { top: 8 },
        type: "danger",
      });
      this.setState({ loading: false });
      return;
    }
  
    if ("errors" in responseJson) {
      
      const firstErrorObject = responseJson.errors[0];
      const firstErrorKey = Object.keys(firstErrorObject)[0];
      const firstErrorMessage = firstErrorObject[firstErrorKey][0];

      showMessage({ 
        message: firstErrorMessage,
        position: { top: 8 },
        type: "danger",
      });
      this.setState({ loading: false });
      return;
    }
  
    this.setState(
      {
        mediaModal: false,
        loading: false,
        step: 2,
        customFormId: responseJson.data?.id ?? 0,
      },
      () => {
        this.scrollRef.current!.scrollTo({ y: 0, animated: false });
      }
    );
  }
  
  private handleUploadPortfolioResponse(responseJson: any) {
    if ("data" in responseJson) {
      this.setState({ loading: false });
      showMessage({
        message: i18n.t("uploadSuccess"),
        type: "success",
        position: { top: 8 },
      });
      this.goToUploadDocs();
    }
  }
  
  private handleCheckIBANResponse(responseJson: any) {
    if (!responseJson.owner_iban_valid) {
      this.setState({ loading: false });
      showMessage({
        message: i18n.t("invalidIBANNumber"),
        type: "danger",
        position: { top: 8 },
      });
    } else {
      this.setState({ loading: false });
      this.updateData();
    }
  }

  goBackStep = () => {
    if (this.state.step === 0) {
      this.btnLogoutConfirm()
    }
    this.setState(({ step }) => ({ step: step - 1 }));
  };

  btnLogoutConfirm = ()=>{
    removeStorageData('storeAddressMap')
    removeStorageData('createStoreArr')
    removeStorageData('buyerAddAddressMap')
    removeStorageData('token')
    removeStorageData('autoLogin')
    const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationLoginOptionsMessage)
    );

    msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
    );

    const sessionMessage = new Message(getName(MessageEnum.SessionSaveMessage));
    sessionMessage.initializeFromObject({
      [getName(MessageEnum.SessionResponseData)]: {},
      [getName(MessageEnum.SessionResponseToken)]: null
    })

    this.send(sessionMessage);

    this.send(msgNavigation);
  }

  selectMultiple = async (options: Options) => {
    if (getOS() === "ios") {
      return await ImagePicker.openPicker({ ...options, multiple: true });
    }
    return (
      await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 10,
      })
    ).assets!.map((value) => ({
      path: value.uri,
      mime: value.type,
    }));
  };

  selectPhoto = async (type: "camera" | "gallery", multiple: boolean) => {
    const options: Options = {
      mediaType: "photo",
      cropping: true,
      height: 500,
      width: 500,
    };

    if (multiple) {
      try {
        const response =
          type === "gallery"
            ? await this.selectMultiple(options)
            : await ImagePicker.openCamera({ ...options, multiple: true });
        if (response) {
          const portfolio = response.map((image, imageIndex) => ({
            uri: image.path!,
            type: image.mime!,
            name: `portfolio_${imageIndex + 1}.${image.mime!.split("/")[1]}`,
            description: "",
          }));
          this.setState({ portfolio });
        }
      } catch (_error) { }
      this.setState({ mediaModal: false });
      return;
    }

    try {
      const response: Image =
        type === "gallery"
          ? await ImagePicker.openPicker(options)
          : await ImagePicker.openCamera(options);

      this.setState({
        profilePhoto: {
          uri: response.path,
          type: response.mime,
          name: `profile_photo.${response.mime.split("/")[1]}`,
        },
      });
    } catch (_error) { }
    this.setState({ mediaModal: false });
  };

  choosePhoto = () => this.selectPhoto("gallery", this.state.selectMultiple);
  capturePhoto = () => this.selectPhoto("camera", this.state.selectMultiple);

  openModal = () => this.setState({ mediaModal: true, selectMultiple: false });
  closeModal = () => this.setState({ mediaModal: false });

  get languages() {
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

  onLanguageChange = ({ value }: { display: string; value: string }) => {
    this.setState({ language: value });
  };

  onProfileBioChange = (text: string) => {
    this.setState({ profileBio: text, error: "" });
  };

  onAreaOfExperiseChange = (text: string) => {
    this.setState({ areaOfExpertise: text, error: "" });
  };

  onYoeChange = (text: string) => {
    if (/^\d{0,2}$/.test(text)) {
      this.setState({ yoe: text, error: "" });
    }
  };

  onInstaChange = (text: string) => {
    this.setState({ instagram: text, error: "" });
  };

  onFbChange = (text: string) => {
    this.setState({ facebook: text, error: "" });
  };

  onTiktokChange = (text: string) => {
    this.setState({ tiktok: text, error: "" });
  };

  onPinterestChange = (text: string) => {
    this.setState({ pinterest: text, error: "" });
  };

  toggleCountry = () => {
    this.setState(({ isCountryOpen }) => ({ isCountryOpen: !isCountryOpen }));
  };

  onCountrySelect = (sindex: number,  country_data: CountryData) => {
    this.setState({
      isCountryOpen: false,
      selectedCountryCodeIndex: sindex,
      selectedCountryCode: country_data.numeric_code,
    });
  };

  onPhoneChange = (text: string) => {
    this.setState({ phoneNumber: text, error: "" });
  };

  onAddressChange = (text: string) => {
    this.setState({ address: text, error: "" });
  };

  onAreaChange = (text: string) => {
    this.setState({ area: text, error: "" });
  };

  onBlockChange = (text: string) => {
    this.setState({ block: text, error: "" });
  };

  onMallChange = (text: string) => {
    this.setState({ mallName: text, error: "" });
  };

  onFloorChange = (text: string) => {
    this.setState({ floor: text, error: "" });
  };

  onUnitChange = (text: string) => {
    this.setState({ unitNumber: text, error: "" });
  };

  onCityChange = (text: string) => {
    this.setState({ city: text, error: "" });
  };

  onZipChange = (text: string) => {
    if (/^\d{0,6}$/.test(text)) {
      this.setState({ zip: text, error: "" });
    }
  };

  onAccountNameChange = (text: string) => {
    this.setState({ accName: text, error: "" });
  };

  onAccountNumberChange = (text: string) => {
    this.setState({ accNumber: text, error: "" });
  };

  onIbanChange = (text: string) => {
    this.setState({ iban: text, error: "" });
  };

  validatePageOne = () => {
    const schema: Partial<Record<
      Exclude<S["errorKey"], "">,
      yup.Schema<unknown>
    >> = {
      profileBio: yup.string().required(i18n.t('errorEnterBio')),
      areaOfExpertise: yup
        .string()
        .required(i18n.t('errorEnterAreaExper')),
      yoe: yup.string().required(i18n.t('errorEnterYearExp')),
      language: yup.string().required(i18n.t('errorChooseLanguage')),
    };

    for (const [keyName, validator] of Object.entries(schema)) {
      try {
        if (validator) {
          validator.validateSync(this.state[keyName as keyof S]);
        }
      } catch (_error) {
        const validationError = _error as yup.ValidationError;
        this.setState({
          error: validationError.message,
          errorKey: keyName as S["errorKey"],
        });
        if (keyName === "language") {
          this.scrollRef.current!.scrollToEnd();
        }
        return;
      }
    }

    this.setState({ step: 1, mediaModal: false, loading: false }, () => {
      this.scrollRef.current!.scrollTo({ y: 0, animated: false });
    });
  };

  validatePageTwo = () => {
    const schema: Partial<Record<
      Exclude<S["errorKey"], "">,
      yup.Schema<unknown>
    >> = {
      address: yup.string().required(i18n.t('pleaseEnterAddressErrorText')),
      accName: yup.string().required(i18n.t('pleaseEnterAccountHolderErrorText')),
      iban: yup.string().required(i18n.t('EnterIBANNumberError')),
      accNumber: yup.string().required(i18n.t('pleaseEnterAccountNumberErrorText')),
    };

    for (const [keyName, validator] of Object.entries(schema)) {
      try {
        if (validator) {
          validator.validateSync(this.state[keyName as keyof S]);
        }
      } catch (_error) {
        const validationError = _error as yup.ValidationError;
        this.setState({
          error: validationError.message,
          errorKey: keyName as S["errorKey"],
        });
        if (["accName", "iban", "accNumber"].includes(keyName)) {
          this.scrollRef.current!.scrollToEnd();
        }
        return;
      }
    }

    this.checkIban();

  };

  checkIban = () => {
    const iban = this.state.iban;
    let formData = new FormData();
      formData.append("data[attributes][iban]", iban);

      let header = {
        token: this.state.token,
      };

      this.setState({ loading: true });
      const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      message.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost
      );
      message.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.checkIBANnumberEndpoint
      );
      this.checkIBANCallID = message.messageId; 
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );
  
      runEngine.sendMessage(message.id, message);
  }


  updateData = () => {
    const body = new FormData();

    if (this.state.profilePhoto.type) {
      body.append(
        "profile_picture",
        (this.state.profilePhoto as unknown) as Blob
      );
    }
    body.append("biography", this.state.profileBio);
    body.append("year_of_experience", this.state.yoe);
    body.append("expertise", this.state.areaOfExpertise);
    body.append("facebook", this.state.facebook);
    body.append("instagram", this.state.instagram);
    body.append("tiktok", this.state.tiktok);
    body.append("pinterest", this.state.pinterest);
    body.append("preferred_language", this.state.language);
    body.append("address", this.state.address);
    body.append("location_info", this.state.area);
    body.append("block", this.state.block);
    body.append("mall_name", this.state.mallName);
    body.append("floor", this.state.floor);
    body.append("unit_number", this.state.unitNumber);
    body.append("city", this.state.city);
    body.append("zipcode", this.state.zip);
    body.append("account_holder_name", this.state.accName);
    body.append("account_number", this.state.accNumber);
    body.append("iban", this.state.iban);
    body.append(
      "contact_number",
      this.state.selectedCountryCode + this.state.phoneNumber
    );

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.stylistCustomFormEndPoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.updateDataApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  uploadPortfolio = () => {
    if (!this.state.portfolio.length) {
      return this.setState({
        error: "Please select photos",
        errorKey: "portfolio",
      });
    }

    const body = new FormData();
    for (const portfolio of this.state.portfolio) {
      const { description, ...photo } = portfolio;
      body.append("images[]", (photo as unknown) as Blob);
      body.append("image_descriptions[]", portfolio.description);
    }

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.updatePortfolio,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });
    this.uploadPortfolioApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  next = () => {
    if (this.state.step === 0) {
      this.validatePageOne();
    } else if (this.state.step === 1) {
      this.validatePageTwo();
    } else {
      this.uploadPortfolio();
    }
  };

  fetchCountryCodes = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.countryCodeApiEndpoint,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.validationApiMethodType,
    });
    this.countryCodesApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  fetchCustomProfile = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.stylistCustomFormEndPoint,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });
    this.getCustomProfileApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  openMultiModal = () => {
    this.setState({ selectMultiple: true, mediaModal: true, errorKey: "" });
  };

  getPortfolioCount = () => this.state.portfolio.length;

  getPortfolio = (port: unknown, pIndex: number) =>
    this.state.portfolio[pIndex];

  updatePortfolioDesc = (text: string, pIndex: number) => {
    this.setState(({ portfolio }) => {
      const newData = [...portfolio];
      newData[pIndex].description = text;
      return { portfolio: newData };
    });
  };

  deletePortfolioItem = (pIndex: number) => {
    this.setState(({ portfolio }) => {
      const newData = [...portfolio];
      newData.splice(pIndex, 1);
      return { portfolio: newData };
    });
  };

  bypassNull = (text: string | null) => text || "";

  deleteAllPortfolio = () => this.setState({ portfolio: [] });

  removePfp = () => {
    this.setState({ profilePhoto: { name: "", type: "", uri: "" } });
  };

  btnRedirectGps = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCustomformMapMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  skipPortfolio = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.stylistCustomFormEndPoint +
        `/${this.state.customFormId}?skip=true`,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.sellerDetailsAPIMethodPUT,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: new FormData(),
    });
    runEngine.sendMessage(message.messageId, message);
    this.goToUploadDocs();
  };

  goToUploadDocs = () => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistUploadDocs)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  returnAlignment = () => {
    if (i18n.language == "ar") {
      return "right"
    }
    else {
      return "left"
    }
  }
  returnFlexDirection = () => {
    if (this.state.selectedlanguage == "ar") {
      return "row-reverse"
    }
    else {
      return "row"
    }
  }
  returnPaddingForAddress=()=>{
    if (this.state.selectedlanguage == "ar") {
      return  70
    }
    else {
      return 5
    }
  }
  // Customizable Area End
}
