import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import i18n from "../../../components/src/i18n/i18n.config";
interface ProductNameExistingResponse {
  exists: boolean;
  errors: string[];
  error: string;
}

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
  errors: string[];
  error: string;
  exists: boolean;
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
  token: string;
  loading: boolean;
  productName: string;
  productNameArabic: string;
  errorMessage: string;
  brandName: string;
  material: string;
  materialArabic: string;
  fit: string;
  fitArabic: string;
  productCare: string;
  productCareArabic: string;
  productDescription: string;
  productDescriptionArabic: string;
  isListed: boolean;
  isUnlisted: boolean;
  gender: string;
  genderArabic: string;
  brand: string;
  brandArabic: string;
  category: string;
  subCategory: string;
  productNameErrorMsg: string;
  productNameArabicErrorMsg: string;
  genderErrorMsg: string;
  genderArabicErrorMsg: string;
  brandErrorMsg: string;
  brandArabicErrorMsg: string;
  categoryErrorMsg: string;
  subCategoryErrorMsg: string;
  meterialErrorMsg: string;
  meterialArabicErrorMsg: string;
  fitErrorMsg: string;
  fitDescriptionErrorMsg: string;
  fitArabicErrorMsg: string;
  productCareErrorMsg: string;
  productCareArabicErrorMsg: string;
  productDescriptionErrorMsg: string;
  productDescriptionArabicErrorMsg: string;
  categories: {
    label: string;
    value: string;
  }[];
  subCategories: { label: string; value: string }[];
  categoriesSelectedIdForSubCategories: number | null;
  productNameExisting: boolean;
  genderText: string;
  genderArabicText: string;
  subSubCategory: string;
  subSubCategoryError: string;
  subSubCategoryList: { label: string; value: string }[];
  languageType:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddProductController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getcategoriesApiCallMsgId: string = "";
  getSubcategoriesApiCallMsgId: string = "";
  getProductNameExistingApiCallMsgId: string = "";
  getSubSubCategoriesApiCallMsgId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      enableField: false,
      txtSavedValue: "A",
      // Customizable Area Start
      token: "",
      loading: false,
      productName: "",
      productNameArabic: "",
      errorMessage: "",
      brandName: "",
      material: "",
      materialArabic: "",
      fit: "",
      fitArabic: "",
      productCare: "",
      productCareArabic: "",
      productDescription: "",
      productDescriptionArabic: "",
      isListed: true,
      isUnlisted: false,
      gender: "",
      genderArabic: "",
      brand: "",
      brandArabic: "",
      category: "",
      subCategory: "",
      productNameErrorMsg: "",
      productNameArabicErrorMsg: "",
      genderErrorMsg: "",
      genderArabicErrorMsg: "",
      brandErrorMsg: "",
      brandArabicErrorMsg: "",
      categoryErrorMsg: "",
      subCategoryErrorMsg: "",
      meterialErrorMsg: "",
      meterialArabicErrorMsg: "",
      fitErrorMsg: "",
      fitDescriptionErrorMsg: "",
      fitArabicErrorMsg: "",
      productCareErrorMsg: "",
      productCareArabicErrorMsg: "",
      productDescriptionErrorMsg: "",
      productDescriptionArabicErrorMsg: "",
      categories: [],
      subCategories: [],
      categoriesSelectedIdForSubCategories: null,
      productNameExisting: false,
      genderText: "",
      genderArabicText: "",
      subSubCategory: "",
      subSubCategoryError: "",
      subSubCategoryList: [],
      languageType:"en"
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (errorReponse) {
        this.showAlert("Alert", configJSON.somethingWentWrongMsg);
        this.setState({ loading: false });
      }
      if (apiRequestCallId) {
        this.handleManagingTheApiResponseWithCallId(
          apiRequestCallId,
          responseJson
        );
        this.setState({ loading: false });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleManagingTheApiResponseWithCallId = (
    apiRequestCallId: string,
    responseJson: CategoryResponse
  ) => {
    if (apiRequestCallId === this.getcategoriesApiCallMsgId) {
      this.handleCateegoriesResponse(responseJson);
    }
    if (apiRequestCallId === this.getSubcategoriesApiCallMsgId) {
      this.handleSubCategoriesResponse(responseJson);
    }

    if (apiRequestCallId === this.getSubSubCategoriesApiCallMsgId) {
      this.handleSubSubcategoriesResponse(responseJson);
    }

    if (apiRequestCallId === this.getProductNameExistingApiCallMsgId) {
      this.handleProductNameExistingResponse(responseJson);
    }
  };

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async componentDidMount(): Promise<void> {
    this.getData();
    this.toSetLanguageType();
    this.props.navigation.addListener("willFocus", () => {
      this.getData();
      this.toSetLanguageType();
    });
  }
  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token });
  };

  handleProductNameExistingResponse = (
    responseJson: ProductNameExistingResponse
  ) => {
    if (responseJson && !responseJson.errors && !responseJson.error) {
      this.setState({ productNameExisting: responseJson.exists }, () => {
        if (responseJson.exists) {
          this.setState({
            productNameErrorMsg: i18n.t("productNameAlreadyExist"),
          });
        } else if (!responseJson.exists) {
          this.navigationToVarientScreen();
          this.setState({ productNameErrorMsg: "" });
        }
      });
    }
  };

  handleCateegoriesResponse = (responseJson: CategoryResponse) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const formattedData = responseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ categories: formattedData });
    }
  };

  handleSubCategoriesResponse = (responseJson: CategoryResponse) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const formattedData = responseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ subCategories: formattedData });
    }
  };

  handleSubSubcategoriesResponse = (responseJson: CategoryResponse) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const formattedData = responseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ subSubCategoryList: formattedData });
    }
  };

  toSetLanguageType = async() =>{
    let languageType = await getStorageData('FA_LANGUAGE_ST')    
    this.setState({languageType:languageType})
  }

  fetchTheCategories = async () => {
    const header = {
      "Content-Type": configJSON.getCategoriesApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getcategoriesApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCategoriesApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getCategoriesApiMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchTheSubCategories = async () => {
    if (this.state.categoriesSelectedIdForSubCategories) {
      const header = {
        "Content-Type": configJSON.getSubCategoriesApiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getSubcategoriesApiCallMsgId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getSubCategoriesApiEndPoint +
          this.state.categoriesSelectedIdForSubCategories
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getSubCategoriesApiMethod
      );
      this.setState({ loading: true });
      runEngine.sendMessage(requestMessage.id, requestMessage);
    } else {
      this.setState({
        subCategoryErrorMsg: i18n.t("pleaseSelectCategory"),
      });
    }
  };

  fetchTheSubSubCategories = async () => {
    if (this.state.subCategory) {
      const header = {
        "Content-Type": configJSON.getSubCategoriesApiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getSubSubCategoriesApiCallMsgId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getSubSubCategoriesApiEndPoint +
          Number(this.state.subCategory)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getSubCategoriesApiMethod
      );
      this.setState({ loading: true });
      runEngine.sendMessage(requestMessage.id, requestMessage);
    } else {
      this.setState({
        subSubCategoryError: i18n.t("pleaseSelectSubCategory"),
      });
    }
  };

  handleFetchProductNameExisting = async () => {
    const header = {
      "Content-Type": configJSON.getCategoriesApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProductNameExistingApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPreoductNameExistingEndPoint + this.state.productName
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getCategoriesApiMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  isEmpty = (str: string) => {
    return !str.trim();
  };

  handleValidation = () => {
    this.setState({
      productNameErrorMsg: "",
      productNameArabicErrorMsg: "",
      genderErrorMsg: "",
      genderArabicErrorMsg: "",
      brandErrorMsg: "",
      brandArabicErrorMsg: "",
      categoryErrorMsg: "",
      subCategoryErrorMsg: "",
      subSubCategoryError: "",
      meterialErrorMsg: "",
      meterialArabicErrorMsg: "",
      fitErrorMsg: "",
      fitArabicErrorMsg: "",
      productCareErrorMsg: "",
      productCareArabicErrorMsg: "",
      productDescriptionErrorMsg: "",
      productDescriptionArabicErrorMsg: "",
    });
  
    const {
      productName,
      productNameArabic,
      gender,
      genderArabic,
      brand,
      brandArabic,
      category,
      subCategory,
      subSubCategory,
    } = this.state;
  
    let hasError;
  
    if (this.isEmpty(productName)) {
      this.setState({
        productNameErrorMsg: i18n.t("requiredProduct"),
      });
      hasError = true;
    } else {
      const regex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
      const isValid = regex.test(productName);
      if (!isValid) {
        this.setState({
          productNameErrorMsg: i18n.t("productNameValidation"),
        });
        hasError = true;
      }
    }
  
    if (this.isEmpty(productNameArabic)) {
      this.setState({
        productNameArabicErrorMsg: i18n.t("requiredProduct"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(gender)) {
      this.setState({
        genderErrorMsg: i18n.t("requiredGender"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(genderArabic)) {
      this.setState({
        genderArabicErrorMsg: i18n.t("requiredGender"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(brand)) {
      this.setState({
        brandErrorMsg: i18n.t("brandRequired"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(brandArabic)) {
      this.setState({
        brandArabicErrorMsg: i18n.t("brandRequired"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(category)) {
      this.setState({
        categoryErrorMsg: i18n.t("requiredCategory"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(subCategory)) {
      this.setState({
        subCategoryErrorMsg: i18n.t("requiredSubCategory"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(subSubCategory)) {
      this.setState({
        subSubCategoryError: i18n.t("requiredSubSubCategory"),
      });
      hasError = true;
    }
    
    const remainingErrors = this.handleRemaingFunctions();
    return hasError || remainingErrors;
  };
  handleRemaingFunctions = () => {
    const {
      material,
      materialArabic,
      fit,
      fitArabic,
      productCare,
      productCareArabic,
      productDescription,
      productDescriptionArabic,
    } = this.state;
  
    let hasError;
    if (this.isEmpty(material)) {
      this.setState({
        meterialErrorMsg: i18n.t("requiredMaterial"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(materialArabic)) {
      this.setState({
        meterialArabicErrorMsg: i18n.t("requiredMaterial"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(fit)) {
      this.setState({
        fitErrorMsg: i18n.t("requiredFit"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(fitArabic)) {
      this.setState({
        fitArabicErrorMsg: i18n.t("requiredFit"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(productCare)) {
      this.setState({
        productCareErrorMsg: i18n.t("requiredProductCare"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(productCareArabic)) {
      this.setState({
        productCareArabicErrorMsg: i18n.t("requiredProductCare"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(productDescription)) {
      this.setState({
        productDescriptionErrorMsg: i18n.t("requiredProductDescription"),
      });
      hasError = true;
    }
  
    if (this.isEmpty(productDescriptionArabic)) {
      this.setState({
        productDescriptionArabicErrorMsg: i18n.t("requiredProductDescription"),
      });
      hasError = true;
    }
  
    return !!hasError;
  };

  listRadioBoxHandler = () => {
    this.setState({ isListed: true, isUnlisted: false });
  };
  unListRadioBoxHandler = () => {
    this.setState({ isListed: false, isUnlisted: true });
  };
  handleSelctGender = (item: { label: string; value: string }) => {
    this.setState({
      gender: item.value,
      genderText: item.label,
      genderErrorMsg: "",
      genderArabic : item.value,
      genderArabicText: item.value == "1" ? "آخر" : "أنثى",
      genderArabicErrorMsg: "",
    });
  };

  handleSelctGenderArabic = (item: { label: string; value: string }) => {
    this.setState({
      genderArabic: item.value,
      genderArabicText: item.label,
      genderArabicErrorMsg: "",
      gender: item.value,
      genderText: item.value == "1" ? "Male" : "Female",
      genderErrorMsg: "",
    });
  };

  handleBrandSelect = (text: string) => {
    this.setState({
      brand: text,
      brandErrorMsg: "",
    });
  };

  handleBrandArabicSelect = (text: string) => {
    this.setState({
      brandArabic: text,
      brandArabicErrorMsg: "",
    });
  };

  handleCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      category: item.value,
      categoriesSelectedIdForSubCategories: Number(item.value),
      categoryErrorMsg: "",
      subCategory: "",
      subSubCategory: "",
    });
  };
  handleSubCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      subCategory: item.value,
      subCategoryErrorMsg: "",
      subSubCategory: "",
    });
  };
  handleSubSubCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      subSubCategory: item.value,
      subSubCategoryError: "",
    });
  };

  handleChangetheProductName = (text: string) => {
    this.setState({
      productName: text,
      productNameErrorMsg:""
    });
  };

  handleChangetheProductNameArabic = (text: string) => {
    this.setState({
      productNameArabic: text,
      productNameArabicErrorMsg: "",
    });
  };

  handleChangetheMaterial = (text: string) => {
    this.setState({
      material: text,
      meterialErrorMsg: "",
    });
  };

  handleChangetheArabicMaterial = (text: string) => {
    this.setState({
      materialArabic: text,
      meterialArabicErrorMsg: "",
    });
  };

  handleChangetheFit = (text: string) => {
    this.setState({
      fit: text,
      fitErrorMsg: "",
    });
  };

  handleChangetheArabicFit = (text: string) => {
    this.setState({
      fitArabic: text,
      fitArabicErrorMsg: "",
    });
  };

  handleChangetheProductCare = (text: string) => {
    this.setState({
      productCare: text,
      productCareErrorMsg: "",
    });
  };

  handleChangetheArabicProductCare = (text: string) => {
    this.setState({
      productCareArabic: text,
      productCareArabicErrorMsg: "",
    });
  };

  handleChangetheDescription = (text: string) => {
    this.setState({
      productDescription: text,
      productDescriptionErrorMsg: "",
    });
  };

  handleChangetheArabicDescription = (text: string) => {
    this.setState({
      productDescriptionArabic: text,
      productDescriptionArabicErrorMsg: "",
    });
  };

  handleTheNextButton = () => {
    if (!this.handleValidation()) {
      this.handleFetchProductNameExisting();
    }
  };

  navigationToVarientScreen = () => {
    const {
      productName,
      productNameArabic,
      genderText,
      genderArabicText,
      brand,
      brandArabic,
      category,
      subCategory,
      material,
      materialArabic,
      fit,
      fitArabic,
      productCare,
      productCareArabic,
      productDescription,
      productDescriptionArabic,
      isListed,
      subSubCategory,
    } = this.state;
    const catalougueApiData = {
      addProductDetails: {
        productName,
        gender: genderText.toLocaleLowerCase(),
        brand,
        category,
        subCategory,
        subSubCategory,
        material,
        fit,
        productCare,
        productDescription,
        isListed: isListed ? "listed" : "unlisted",

        productNameArabic,
        brandArabic,
        materialArabic,
        fitArabic,
        productCareArabic,
        productDescriptionArabic,
        genderAra: genderArabicText.toLocaleLowerCase(),
      },
    };
    const msg: Message = new Message(
      getName(MessageEnum.NavigationVarientMessage)
    );
    msg.addData(getName(MessageEnum.ProductDetailsData), catalougueApiData);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };
  // Customizable Area End
}
