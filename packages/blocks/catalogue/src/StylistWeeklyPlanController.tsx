import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
// Customizable Area Start
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
import LowerCaseReplace from '../../../components/src/LowerCaseReplace'

interface Category {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    image: string;
  };
}

interface CategoryResponse {
  data: Category[];
  errors: { name: string }[];
  error: string;
  exists: boolean;
}

interface CatalogueVariant {
  id: string;
  type: string;
  attributes: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

interface ApiResponseForColorAndSizeVarient {
  data: CatalogueVariant[];

  errors: { name: string }[];
  error: string;
  exists: boolean;
}

export interface Variant {
  id: number | null;
  catalogue_id: number | null;
  catalogue_variant_color_id: number;
  catalogue_variant_size_id: number;
  price: number;
  stock_qty: number;
  sku: string;
  is_listed: boolean;
  remove_front_image: string | null;
  remove_back_image: string | null;
  remove_side_image: string | null;
  variant_color: string;
  variant_size: string;
  front_image: string | null;
  back_image: string | null;
  side_image: string | null;
}

export interface VariantAttributes {
  attributes: Variant;
}

interface AddProductDetails {
  brand: string;
  category: string;
  fit: string;
  gender: string;
  isListed: string;
  material: string;
  productCare: string;
  productDescription: string;
  productName: string;
  subCategory: string;
  subSubCategory: string;
}

interface ProductData {
  addProductDetails: AddProductDetails;
  variants: Variant[];
}

interface VariantResponse {
  variants: Variant[];
  errors: string[];
  error: string;
  already_exists?: [];
  data: CatalogueVariant[];

  exists: boolean;
}

interface ApiResponse {
  variants: Variant[];
  errors: [];
  error: string;
  data: CatalogueVariant[];
}
interface ImageMap {
  [colorId: number]: {
    front_image: string | null;
    back_image: string | null;
    side_image: string | null;
  };
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  token: string | null;
  loading: boolean;
  focusedButtonIndex: number;

  service_charges: any;
  errorMessage: string;
  brandName: string;
  material: string;
  fit: string;
  productCare: string;
  productDescription: string;
  isListed: boolean;
  gender: string;
  brand: string;
  category: string;
  subCategory: string;
  productNameErrorMsg: string;
  stylingsErrorMsg: string;
  brandErrorMsg: string;
  categoryErrorMsg: string;
  subCategoryErrorMsg: string;
  meterialErrorMsg: string;
  fitErrorMsg: string;
  productCareErrorMsg: string;
  productDescriptionErrorMsg: string;
  categories: {
    label: string;
    value: string;
  }[];
  subCategories: {
    label: string;
    value: string;
  }[];

  productNameExisting: boolean;
  genderText: string;
  subSubCategory: string;
  subSubCategoryError: string;
  subSubCategoryList: {
    label: string;
    value: string;
  }[];
  catalogueId: number | string;

  sizeSelected: string[];
  colorSelected: string[];
  colorList: {
    label: string;
    value: string;
  }[];
  sizeList: {
    label: string;
    value: string;
  }[];
  variants: Variant[] | any;
  isVariantButtonDisabled: boolean;
  errorMsg: {
    errorHeader: string;
    errorTitle: string;
  };
  modalVisible: boolean;
  isGalary: boolean;
  discussion_time: string;
  name: string;
  initialSkuValues: string[];
  voice_call_facility: any;
  planData: any;
  isThisAssignStore: boolean;
  name_plan: string;
  isSelectAll: boolean;
  selectedItem: string[];
  selectedPlan: string;
  createPlanList: {};
  styling_per_week: number;
  id: string;
  updatePlan: [];
  isNewPlan: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class StylistWeeklyPlanController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPlanId: string = "";
  updatePlanId: string = "";
  willFocusListener: any;
  isFocused: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      enableField: false,
      txtInputValue: "",
      txtSavedValue: "A",
      // Customizable Area Start
      loading: false,
      selectedPlan: "",
      token: "",
      focusedButtonIndex: 0,
      id: "",
      styling_per_week: 0,
      service_charges: "",
      errorMessage: "",
      voice_call_facility: "",
      brandName: "",
      material: "",
      fit: "",
      productCare: "",
      productDescription: "",
      isListed: true,

      gender: "",
      brand: "",
      category: "",
      subCategory: "",
      productNameErrorMsg: "",
      stylingsErrorMsg: "",
      brandErrorMsg: "",
      categoryErrorMsg: "",
      subCategoryErrorMsg: "",
      meterialErrorMsg: "",
      fitErrorMsg: "",
      isNewPlan: false,
      productCareErrorMsg: "",
      productDescriptionErrorMsg: "",
      categories: [],
      subCategories: [],
      productNameExisting: false,
      genderText: "",
      subSubCategory: "",
      subSubCategoryError: "",
      subSubCategoryList: [],
      catalogueId: "",

      sizeSelected: [],
      colorSelected: [],
      colorList: [],
      sizeList: [],
      variants: [],
      isVariantButtonDisabled: true,
      errorMsg: {
        errorHeader: "",
        errorTitle: "",
      },
      modalVisible: false,
      isGalary: true,
      discussion_time: "",
      name: "",
      initialSkuValues: [],
      planData: [],
      isThisAssignStore: false,
      name_plan: "",
      isSelectAll: false,
      selectedItem: [],
      createPlanList: {},
      updatePlan: [],
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.handleSessionResponse(message);
    this.handleNavigationPayload(message);
    this.handlePlanData(message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.handleApiResponse(apiRequestCallId, responseJson);
      if (apiRequestCallId === this.getPlanId) {
        this.setState(
          {
            createPlanList: responseJson,
            loading: false,
          },
          () => {
            if (responseJson.data) {
              this.props.navigation.goBack();
              showMessage({
                message: i18n.t("planCreationMsg"),
                position: { top: 0 },
              });
            }
            if (responseJson.errors) {
              Alert.alert(
                i18n.t("tryAgain"),
                i18n.t("planCreationError")
              );
            }
          }
        );
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  handleApiResponse(apiRequestCallId: string, responseJson: any) {
    if (apiRequestCallId === this.updatePlanId) {
      this.handleUpdatePlanResponse(responseJson);
    }
  }

  handleUpdatePlanResponse(responseJson: any) {
    this.setState(
      {
        updatePlan: responseJson,
        loading: false,
      },
      () => {
        if (responseJson) {
          this.props.navigation.goBack();
          showMessage({
            message: i18n.t("planUpdateMsg"),
            position: { top: 0 },
          });
        }
      }
    );
  }

  handleSessionResponse(message: Message) {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
  }

  handleNavigationPayload(message: Message) {
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const plan = message.getData(
        getName(MessageEnum.LoginOptionsNavigationDataMessage)
      );
      if (plan) {
        const { planTitle } = plan;
        this.setState({ selectedPlan: planTitle });
      }
    }
  }

  convertNameFormat(name: string) {
    switch (name) {
      case "weekly_plan":
        return i18n.t("weeklyPlan");
      case "monthly_plan":
        return i18n.t("monthlyPlan");
      case "quarterly_plan":
        return i18n.t("quarterlyPlan");
      default:
        return name;
    }
  }

  originalNameFormat(name: string) {
    switch (name) {
      case i18n.t("weeklyPlan"):
        return "weekly_plan";
      case i18n.t("monthlyPlan"):
        return "monthly_plan";
      case i18n.t("quarterlyPlan"):
        return "quarterly_plan";
      default:
        return name;
    }
  }

  handlePlanData(message: Message) {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const planData = message.getData(getName(MessageEnum.PlayLoadSignupId));
      const { attributes, id } = planData.planData;
      const {
        name,
        discussion_time,
        service_charges,
        styling_per_week,
        voice_call_facility,
      } = attributes;
      this.setState({
        discussion_time,
        name: this.convertNameFormat(name),
        name_plan: this.convertNameFormat(name),
        service_charges: parseFloat(service_charges),
        styling_per_week: parseInt(styling_per_week),
        voice_call_facility,
        id,
      });
    }
  }

  async componentDidMount() {
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  isEmpty = (str: string) => {
    return !str.trim();
  };

  handleValidation = () => {
    this.setState({
      stylingsErrorMsg: "",
      categoryErrorMsg: "",
      subCategoryErrorMsg: "",
      meterialErrorMsg: "",
    });
    const {
      styling_per_week,
      discussion_time,
      voice_call_facility,
      service_charges,
    } = this.state;
    let hasError = false;

    if (!styling_per_week) {
      this.setState({
        stylingsErrorMsg: i18n.t("stylingError"),
      });
      hasError = true;
    }
    if (this.isEmpty(discussion_time)) {
      this.setState({
        categoryErrorMsg: i18n.t("disTimeError"),
      });
      hasError = true;
    }
    if (typeof voice_call_facility !== "boolean") {
      this.setState({
        subCategoryErrorMsg: i18n.t("voiceCallError"),
      });
      hasError = true;
    }
    let errorMsg = "";
    if (service_charges === "") {
      errorMsg = i18n.t("serviceError");
    } else if (
      parseFloat(service_charges) <= 0 ||
      /^0+$/.test(service_charges)
    ) {
      errorMsg = i18n.t("chargesRequired");
    }

    if (errorMsg) {
      this.setState({
        meterialErrorMsg: errorMsg,
      });
      hasError = true;
    }

    return hasError;
  };

  handleSaveButton = () => {
    if (!this.handleValidation()) {
      const formData = {
        service_information: {
          name: LowerCaseReplace(this.state.selectedPlan) || LowerCaseReplace(this.originalNameFormat(this.state.name_plan)),
          styling_per_week: this.state.styling_per_week,
          discussion_time: this.state.discussion_time,
          voice_call_facility: this.state.voice_call_facility,
          service_charges: this.state.service_charges,
        },
      };
      {
        this.state.selectedPlan && this.createPlan(JSON.stringify(formData));
      }
      {
        this.state.name && this.updatePlan(JSON.stringify(formData));
      }
      this.props.navigation.navigate("StylistCatalogue");
    }
  };

  handleSelctGender = (item: { label: string; value: number }) => {
    this.setState({
      styling_per_week: item.value,
      genderText: item.label,
      stylingsErrorMsg: "",
    });
  };

  handleCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      discussion_time: item.value,
      categoryErrorMsg: "",
    });
  };
  handleSubCategorySelect = (item: { label: string; value: boolean }) => {
    this.setState({
      voice_call_facility: item.value,
      subCategoryErrorMsg: "",
    });
  };
  handleChangetheMaterial = (text: string) => {
    const service_charges = text.replace("$", "");
    this.setState({
      service_charges,
      meterialErrorMsg: "",
    });
  };

  createPlan = async (formData: any) => {
    const header = {
      "Content-Type": configJSON.getSizeApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPlanId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.selectPlan
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updatePlan = async (formData: any) => {
    const header = {
      "Content-Type": configJSON.getSizeApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updatePlanId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.selectPlan + `/${this.state.id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updatePutMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };
}

// Customizable Area End
