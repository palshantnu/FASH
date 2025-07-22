import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import ImagePicker from 'react-native-image-crop-picker';
import {
  BusinessItem,
} from "../../productdescription3/src/response";
import i18n from "../../../components/src/i18n/i18n.config";



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
  focusedButtonIndex: number


  productName: string;
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
  editProductNameErrorMsg: string;
  editGenderErrorMsg: string;
  editBrandErrorMsg: string;
  editCategoryErrorMsg: string;
  subCategoryErrorMsg: string;
  editMeterialErrorMsg: string;
  editFitErrorMsg: string;
  editProductCareErrorMsg: string;
  editProductDescriptionErrorMsg: string;
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
    errorHeader: string,
    errorTitle: string
  }
  modalVisible: boolean;
  isGalary: boolean;
  selectedViewForImageUploading: string;
  selectedColorForImageUploading: string;
  initialSkuValues: string[];

  assignStore: BusinessItem[]
  isThisAssignStore: boolean;
  assignStoreSearchText: string;
  isSelectAll: boolean;
  selectedItem: string[]
userType:string;
  productArabicName: string;
  genderArabic:string;
  genderArabicText:string;
  brandArabic:string;
  materialArabic:string;
  fitArabic:string;
  productCareArabic:string;
  productDescriptionArabic:string;
  editProductNameArabicErrorMsg:string;
  editGenderArabicErrorMsg:string;
  editbrandArabicErrorMsg:string;
  editMeterialArabicErrorMsg:string;
  editFitArabicErrorMsg:string
  editProductCareArabicErrorMsg:string
  editProductDescriptionArabicErrorMsg:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AssignStoreConroller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getcategoriesProductApiCallMsgId: string = "";
  getSubcategoriesApiCallMsgId: string = "";
  getSubSubCategoriesApiCallMsgId: string = "";
  updateProductDetailsApiCallMsgId: string = "";

  getAllStoreApiCallId: string = "";
  postCreateCatalougeApiCallMsgId: string = "";

  getSizeListApiCallMsgId: string = "";
  getColorListApiCallMsgId: string = "";
  getCreateVarientsApiCallMsgId: string = "";
  getCheckSkuValidationApiCallMsgId: string = "";
  getStylishProfileApiCallId: string = "";
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
      userType:"",
      token: "",
      focusedButtonIndex: 0,


      productName: "",
      errorMessage: "",
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
      editProductNameErrorMsg: "",
      editGenderErrorMsg: "",
      editBrandErrorMsg: "",
      editCategoryErrorMsg: "",
      subCategoryErrorMsg: "",
      editMeterialErrorMsg: "",
      editFitErrorMsg: "",
      editProductCareErrorMsg: "",
      editProductDescriptionErrorMsg: "",
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
        "errorHeader": "",
        "errorTitle": ""
      },
      modalVisible: false,
      isGalary: true,
      selectedViewForImageUploading: "",
      selectedColorForImageUploading: "",
      initialSkuValues: [],
      assignStore: [

      ],
      isThisAssignStore: false,
      assignStoreSearchText: "",
      isSelectAll: false,
      selectedItem: [],
      productArabicName:"",
      genderArabic:"",
      genderArabicText:"",
      brandArabic:"",
      materialArabic:"",
      fitArabic:"",
      productCareArabic:"",
      productDescriptionArabic:"",
      editProductNameArabicErrorMsg:"",
      editGenderArabicErrorMsg:"",
      editbrandArabicErrorMsg:"",
      editMeterialArabicErrorMsg:"",
      editFitArabicErrorMsg:"",
      editProductCareArabicErrorMsg:"",
      editProductDescriptionArabicErrorMsg:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const catalougeApiData = message.getData(
        getName(MessageEnum.ProductDetailsData));
      if (catalougeApiData) {
        this.handleCatalogueDetialsPropsData(catalougeApiData)
      }

    }

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {

      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.handleResponseToken(token)

    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));


      if (errorReponse) {
        this.setState({ loading: false })
        this.showAlert("Alert", configJSON.somethingWentWrongMsg)
      }
      if (apiRequestCallId && responseJson) {
        this.handleManagingTheApiResponseWithCallId(apiRequestCallId, responseJson)
        if (apiRequestCallId !== this.getCheckSkuValidationApiCallMsgId) {
          this.setState({ loading: false })
        }
       
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  handleResponseToken = (token: string) => {
    if (token) {
      this.setState({ token: token },()=>{
        this.getProfileData()
      });
      
    }
    else {
      this.showAlert("Alert", configJSON.loginAlertMessage);
    }
  }

  handleCatalogueDetialsPropsData = (CatalogueDetails: any) => {
    const { name,name_arabic,prodcut_care_arabic,description_arabic, gender,fit_arabic,gender_arabic,material_arabic, brand_name,brand_name_arabic, category, sub_category, sub_sub_category, material, fit, prodcut_care, description, list_the_product } = CatalogueDetails.attributes;
    const { catalogue_variants_with_store, catalogue_variants } = CatalogueDetails.attributes;
    let colorSet: Set<string> = new Set();
    let sizeSet: Set<string> = new Set();
    let assignStoreId: Set<string> = new Set();
    catalogue_variants.forEach((variant: any) => {
      if (variant.attributes.catalogue_variant_color_id !== null) {
        colorSet.add(variant.attributes.catalogue_variant_color_id.toString());
      }
      if (variant.attributes.catalogue_variant_size_id !== null) {
        sizeSet.add(variant.attributes.catalogue_variant_size_id.toString());
      }
    });
    const colorId: string[] = [...colorSet];
    const sizeId: string[] = [...sizeSet];
    catalogue_variants_with_store.forEach((variant: any) => {
      if (variant.store_info && variant.store_info.id) {
        assignStoreId.add(variant.store_info.id.toString());
      }

    });
    const assignStoreSelectedId: string[] = [...assignStoreId];
  

    this.setState({
      catalogueId: CatalogueDetails.id,
      productName: name,
      productArabicName:name_arabic,
      gender: gender === "male" ? "1" : "2",
      genderArabic: gender_arabic == "آخر" ? "1":"2",
      genderText: gender,
      genderArabicText: gender_arabic == null ? "آخر" : gender_arabic,
      brand: brand_name,
      brandArabic:brand_name_arabic,
      material,
      materialArabic:material_arabic,
      fit,
      fitArabic:fit_arabic,
      productCare: prodcut_care,
      productCareArabic:prodcut_care_arabic,
      productDescription: description,
      productDescriptionArabic:description_arabic,
      isListed: list_the_product === "listed" ? true : false,
      categories: [{ label: category.attributes.name, value: category.id }],
      category: category.id,
      subCategories: [{ label: sub_category.attributes.name, value: sub_category.id }],
      subCategory: sub_category.id,
      subSubCategoryList: [{ label: sub_sub_category.attributes.name, value: sub_sub_category.id }],
      subSubCategory: sub_sub_category.id,

      colorSelected: colorId,
      sizeSelected: sizeId,
      selectedItem: assignStoreSelectedId

    }, () => { this.createTheVariants() });
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

  handleManagingTheApiResponseWithCallId = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId === this.getcategoriesProductApiCallMsgId) {
      this.handleProductCateegoriesResponse(responseJson)

    }
    if(apiRequestCallId === this.getStylishProfileApiCallId){
      this.setNewUserData(responseJson)
 
    }
    if (apiRequestCallId === this.getSubcategoriesApiCallMsgId) {
      this.handleProductSubCategoriesResponse(responseJson)

    }

    if (apiRequestCallId === this.getSubSubCategoriesApiCallMsgId) {
      this.handleProductSubSubcategoriesResponse(responseJson)

    }

    if (apiRequestCallId === this.updateProductDetailsApiCallMsgId) {
      this.handleUpdateProductDetailsResponse(responseJson)

    }


    if (apiRequestCallId === this.getSizeListApiCallMsgId) {
      this.handleSizeListResponse(responseJson)
    }
    else if (apiRequestCallId === this.getColorListApiCallMsgId) {
      this.handleColorListResponse(responseJson)
    }
    else if (apiRequestCallId === this.getCreateVarientsApiCallMsgId) {
      this.handleCreateVariantResponse(responseJson)
    }

    else if (apiRequestCallId === this.getCheckSkuValidationApiCallMsgId) {
      this.handleGetSkuValidationResponse(responseJson)
    }

    else if (apiRequestCallId === this.getAllStoreApiCallId) {

      this.handleGetStorelistResponse(responseJson)


    }


  }
  setNewUserData(responseJson:{errors:string,data:{type:string}}){
    if(!responseJson.errors){
      this.setUserData(responseJson)
    }else{
      this.setUserData({data:{type:'sdffdsfd'}})
    }
  }
  setUserData(responseJson:{data:{type:string}}){
    if(responseJson.data.type==="stylist_account"){
    this.setState({userType:"stylist_account"})
    }
  }
  getProfileData = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.stylistCustomFormEndPoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.getExampleMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });
    this.getStylishProfileApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };
  handleUpdateProductDetailsResponse = (responseJson: CategoryResponse) => {
    if (responseJson) {
      if (responseJson.data) {
        showMessage({
          message: i18n.t('productUpdateSuccess'),
          position: { top: 5 },
        });

        if(this.state.focusedButtonIndex<3 && this.state.userType!=="stylist_account"){
          this.handleFocusSelectedView(this.state.focusedButtonIndex+1)
        }else{
        this.props.navigation.goBack()
        }
      }
      else if (responseJson.errors && responseJson.errors[0].name.length > 1) {
        this.setState({ editProductNameErrorMsg: i18n.t('productNameAlreadyExist') })
      }
      else { this.showAlert("Alert", configJSON.somethingWentWrongMsg) }
    }
    else { this.showAlert("Alert", configJSON.somethingWentWrongMsg) }
  }

  handleProductCateegoriesResponse = (productResponseJson: CategoryResponse) => {
    if (productResponseJson && productResponseJson.data && !productResponseJson.errors) {
      const formattedData = productResponseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ categories: formattedData });
    }
  }

  handleProductSubCategoriesResponse = (subCategoryResponseJson: CategoryResponse) => {
    if (subCategoryResponseJson && subCategoryResponseJson.data && !subCategoryResponseJson.errors) {
      const formattedData = subCategoryResponseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ subCategories: formattedData });
    }
  }

  handleProductSubSubcategoriesResponse = (subResponseJson: CategoryResponse) => {
    if (subResponseJson && subResponseJson.data && !subResponseJson.errors) {
      const formattedData = subResponseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ subSubCategoryList: formattedData });
    }
  }

  handleSizeListResponse = (responseJson: ApiResponseForColorAndSizeVarient) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const formattedData = responseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ sizeList: formattedData });
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);

    }
  }

  handleColorListResponse = (responseJson: ApiResponseForColorAndSizeVarient) => {

    if (responseJson && responseJson.data && !responseJson.errors) {
      const formattedData = responseJson.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ colorList: formattedData });
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);

    }
  }

  updatedCreateVariantResponse=(responseJson:any)=>{
    const imageMap: ImageMap = {};

    responseJson.forEach((variant: Variant) => {
      const colorId = variant.catalogue_variant_color_id;


      if (imageMap[colorId]) {
        if (variant.front_image) {
          imageMap[colorId].front_image = variant.front_image;
        }
        if (variant.back_image) {
          imageMap[colorId].back_image = variant.back_image;
        }
        if (variant.side_image) {
          imageMap[colorId].side_image = variant.side_image;
        }
      } else {

        imageMap[colorId] = {
          front_image: variant.front_image,
          back_image: variant.back_image,
          side_image: variant.side_image
        };
      }
    });
    const updatedResponseData = responseJson.map((variant: Variant) => {
      const colorId = variant.catalogue_variant_color_id;
      return {
        ...variant,
        front_image: imageMap[colorId].front_image,
        back_image: imageMap[colorId].back_image,
        side_image: imageMap[colorId].side_image
      };
    });

    return updatedResponseData

  }

  handleCreateVariantResponse = (responseJson: any) => {
    if (responseJson && !responseJson.errors && !responseJson.error) {
      const skuArray = responseJson
        .filter((variant: Variant) => variant.sku !== null)
        .map((variant: Variant) => `"${variant.sku}"`);

     const updatedResponseData=this.updatedCreateVariantResponse(responseJson)

      this.setState({ variants: updatedResponseData, isVariantButtonDisabled: true, initialSkuValues: skuArray });

    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);
    }

  }

  handleGetSkuValidationResponse = (responseJson: VariantResponse) => {
    if (responseJson && !responseJson.errors && !responseJson.error) {
      if (responseJson.already_exists) {
        if (responseJson.already_exists.length === 0) {
          
          this.handleVariantsSaveDetails()
        } else if (responseJson.already_exists.length > 0) {
          const skuString = responseJson.already_exists.join(", ")
          const errorTitle = `'${skuString}'`;

          this.setState({
            errorMsg: {
              errorHeader: i18n.t('skuValueExit'),
              errorTitle: errorTitle,
            },
            loading:false
          });
        }

      }
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);
    }

  }

  handleGetStorelistResponse = (responseJson: any) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      this.setState({
        assignStore: responseJson.data,


      })
      if (!this.state.assignStoreSearchText) {
        this.setState({ isThisAssignStore: responseJson.data.length > 0 })
      }
    } else { this.showAlert("Alert", configJSON.somethingWentWrongMsg) }
  }


  fetchTheProductCategories = async () => {
    const header = {
      "Content-Type": configJSON.getCategoriesApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getcategoriesProductApiCallMsgId = requestMessage.messageId;

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
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchTheProductSubCategories = async () => {
    if (this.state.category) {
      const subHeader = {
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
        Number(this.state.category)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(subHeader)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getSubCategoriesApiMethod
      );
      this.setState({ loading: true })
      runEngine.sendMessage(requestMessage.id, requestMessage);
    } else {
      this.setState({
        subCategoryErrorMsg: i18n.t('pleaseSelectCategory'),
      });
    }
  }

  fetchTheSubSubCategoriesProduct = async () => {
    if (this.state.subCategory) {
      const catHeader = {
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
        JSON.stringify(catHeader)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getSubCategoriesApiMethod
      );
      this.setState({ loading: true })
      runEngine.sendMessage(requestMessage.id, requestMessage);
    } else {
      this.setState({
        subSubCategoryError: i18n.t('pleaseSelectSubCategory'),
      });
    }
  }

  updateTheProductDetailsCatalogue = async (formData: any) => {

    const header = {
      "Content-Type": configJSON.updateCatalougueApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProductDetailsApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateCatalogueApiEndPoint +
      Number(this.state.catalogueId)
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
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);

  }


  fetchTheSizeList = async () => {
    const header = {
      "Content-Type": configJSON.getSizeApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSizeListApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSizeApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSizeApiMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchTheColorList = async () => {
    const header = {
      "Content-Type": configJSON.getColorListApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getColorListApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getColorListApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getColorListMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createTheVariants = async () => {
    const header = {
      "Content-Type": configJSON.createVarientContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCreateVarientsApiCallMsgId = requestMessage.messageId;
    const variantSizeIds = this.state.sizeSelected.map(Number);
    const variantColorIds = this.state.colorSelected.map(Number);
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createVarientEndPoint + `variant_size_ids=[${variantSizeIds.join(',')}]&variant_color_ids=[${variantColorIds.join(',')}]` + `&catalogue_id=${Number(this.state.catalogueId)}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createVarientMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  fetchTheStoreDetails = async (searchTxt?: string) => {

    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllStoreApiCallId = requestMessage.messageId;
    if (searchTxt) {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllStoreApiEndPoint + "&search=" + searchTxt
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllStoreApiEndPoint
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getExampleMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  checkTheSkuValueValidation = async () => {

    const header = {
      "Content-Type": configJSON.createVarientContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCheckSkuValidationApiCallMsgId = requestMessage.messageId;



    const skuArray = this.state.variants.map((variant: Variant) => `"${variant.sku}"`);

    const newSkuArray: string[] = skuArray.filter((sku: string) => !this.state.initialSkuValues.includes(sku));

    const skuParams = encodeURIComponent(`[${newSkuArray.join(',')}]`);

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSkuValidationEndPoint + skuParams
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createVarientMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updateVariantProperty = (index: number, property: string, value: string) => {
    const variants = [...this.state.variants];
    if (variants[index]) {
      variants[index][property] = value;
      this.setState({ variants });
    }
  }

  handleCreateTheVariantls = () => {
    const { sizeSelected, colorSelected } = this.state;
    if ((sizeSelected.length * colorSelected.length) > 30) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('limitExceed'),
          errorTitle: i18n.t('maxVariantCreate')
        }
      });
    }
    else {
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });
      this.createTheVariants()
    }
  }

  handleUpdateVariantSaveDetailsButton = () => {



    let hasVariants = this.checkVariantsAvailability();
    if (!hasVariants) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('variantsNotAvailable'),
          errorTitle: i18n.t('pleaseAddVariant')
        }
      });
      return;
    }

    const hasMissingValues = this.checkMissingValues();
    if (hasMissingValues) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('valueMissing'),
          errorTitle: i18n.t('variantMustHaveValue')
        }
      });
      return;
    }

    const hasInvalidPriceOrStockQty = this.checkInvalidPriceOrStockQty();
    if (hasInvalidPriceOrStockQty) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('invalidPrice'),
          errorTitle: i18n.t('priceQuantity')
        }
      });
      return;
    }

    const hasDuplicateSku = this.checkDuplicateSku();
    if (hasDuplicateSku) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('invalidSku'),
          errorTitle: i18n.t('uniqueSkuValue')
        }
      });
      return;
    }


    this.checkTheSkuValueValidation()
  }

  checkVariantsAvailability = () => {
    const { variants } = this.state
    return variants && variants.length > 0;
  }

  checkMissingValues = () => {
    const { variants } = this.state
    return variants.some((variant: Variant) => !variant.sku || !variant.stock_qty || !variant.price);
  }

  checkDuplicateSku = () => {
    const { variants } = this.state
    const skuSet = new Set();
    return variants.some((variant: Variant) => {
      if (skuSet.has(variant.sku)) {
        return true;
      }
      skuSet.add(variant.sku);
      return false;
    });
  }

  handleTextEmptyInputBox = () => {
    this.setState({
      errorMsg: {
        errorHeader: i18n.t('variantsNotAvailable'),
        errorTitle: i18n.t('enteringAddVarient')
      }
    });
  }

  checkInvalidPriceOrStockQty = () => {
    const { variants } = this.state;
    return variants.some((variant: Variant) => {
      const price = Number(variant.price);
      const stockQty = Number(variant.stock_qty);
      if (isNaN(price) || isNaN(stockQty)) {
        return true;
      }
      return price <= 0 || stockQty <= 0;
    });
  }
  checkCreateVariantButtonStatus = () => {
 
    const { colorSelected, sizeSelected } = this.state;
    if (colorSelected?.length === 0 || sizeSelected?.length === 0) {
      this.setState({ isVariantButtonDisabled: true })
    } else {
      this.setState({ isVariantButtonDisabled: false })
    }
  }


  checkIsEmpty = (str: string) => {
    return !str?.trim();
  };

  handleEditProductValidation = () => {
    this.setState({
      editProductNameErrorMsg: "",
      editProductNameArabicErrorMsg:"",
      editGenderErrorMsg: "",
      editGenderArabicErrorMsg:"",
      editBrandErrorMsg: "",
      editbrandArabicErrorMsg:"",
      editCategoryErrorMsg: "",
      subCategoryErrorMsg: "",
      subSubCategoryError:"",
      editMeterialErrorMsg: "",
      editMeterialArabicErrorMsg:"",
      editFitErrorMsg: "",
      editFitArabicErrorMsg:"",
      editProductCareErrorMsg: "",
      editProductCareArabicErrorMsg:"",
      editProductDescriptionErrorMsg: "",
      editProductDescriptionArabicErrorMsg:""
    });
    const {
      productName,
      productArabicName,
      gender,
      genderArabic,
      brand,
      brandArabic,
      category,
      subCategory,
      subSubCategory,

    } = this.state;
    let hasError;

    if (this.checkIsEmpty(productName)) {
      this.setState({
        editProductNameErrorMsg: i18n.t('requiredProduct'),
      });
      hasError = true;
    }else {
      const regex =/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
      const isValid = regex.test(productName);
      if (!isValid) {
        this.setState({
          editProductNameErrorMsg: i18n.t("productNameValidation"),
        });
        hasError = true;
      }
    }
    if (this.checkIsEmpty(productArabicName)) {
      this.setState({
        editProductNameArabicErrorMsg: i18n.t("requiredProduct"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(gender)) {
      this.setState({
        editGenderErrorMsg: i18n.t('requiredGender'),
      });
      hasError = true;
    }
    if (this.checkIsEmpty(genderArabic)) {
      this.setState({
        editGenderArabicErrorMsg: i18n.t("requiredGender"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(brand)) {
      this.setState({
        editBrandErrorMsg: i18n.t('brandRequired'),
      });
      hasError = true;
    }
    if (this.checkIsEmpty(brandArabic)) {
      this.setState({
        editbrandArabicErrorMsg: i18n.t("brandRequired"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(category)) {
      this.setState({
        editCategoryErrorMsg: i18n.t('requiredCategory'),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(subCategory)) {
      this.setState({
        subCategoryErrorMsg: i18n.t('requiredSubCategory'),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(subSubCategory)) {
      this.setState({
        subSubCategoryError: i18n.t('requiredSubSubCategory'),
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
    if (this.checkIsEmpty(material)) {
      this.setState({
        editMeterialErrorMsg: i18n.t('requiredMaterial'),
      });
      hasError = true;
    }
       if (this.checkIsEmpty(materialArabic)) {
      this.setState({
        editMeterialArabicErrorMsg: i18n.t("requiredMaterial"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(fit)) {
      this.setState({
        editFitErrorMsg: i18n.t('requiredFit'),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(fitArabic)) {
      this.setState({
        editFitArabicErrorMsg: i18n.t("requiredFit"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(productCare)) {
      this.setState({
        editProductCareErrorMsg: i18n.t('requiredProductCare'),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(productCareArabic)) {
      this.setState({
        editProductCareArabicErrorMsg: i18n.t("requiredProductCare"),
      });
      hasError = true;
    }

    if (this.checkIsEmpty(productDescription)) {
      this.setState({
        editProductDescriptionErrorMsg: i18n.t('requiredProductDescription'),
      });
      hasError = true;
    }
    if (this.checkIsEmpty(productDescriptionArabic)) {
      this.setState({
        editProductDescriptionArabicErrorMsg: i18n.t("requiredProductDescription"),
      });
      hasError = true;
    }
  
    return !!hasError;
  };

  listRadioBoxHandler = () => {
    this.setState({ isListed: true, });
  };
  unListRadioBoxHandler = () => {
    this.setState({ isListed: false });
  };
  handleEditSelctGender = (item: { label: string; value: string }) => {

    this.setState({
      gender: item.value,
      genderText: item.label,
      editGenderErrorMsg: "",
    });
  };
  handleEditSelctGenderArabic = (item: { label: string; value: string }) => {

    this.setState({
      genderArabic: item.value,
      genderArabicText: item.label,
      editGenderArabicErrorMsg: "",
    });
  };

  handleEditBrandSelect = (text: string) => {
    this.setState({
      brand: text,
      editBrandErrorMsg: "",
    });
  };

  handleEditBrandArabicSelect = (text: string) => {
    this.setState({
      brandArabic: text,
      editbrandArabicErrorMsg: "",
    });
  };
  handleEditCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      category: item.value,

      editCategoryErrorMsg: "",
      subCategory: "",
      subSubCategory: ""
    });
  };
  handleEditSubCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      subCategory: item.value,
      subCategoryErrorMsg: "",
      subSubCategory: ""
    });
  };
  handleEditSubSubCategorySelect = (item: { label: string; value: string }) => {
    this.setState({
      subSubCategory: item.value,
      subSubCategoryError: "",
    });
  };

  handleEditChangetheProductName = (text: string) => {
    this.setState({
      productName: text,
      editProductNameErrorMsg: "",
    });
  };

  handleEditChangetheArabicProductName = (text: string) => {
    this.setState({
      productArabicName: text,
      editProductNameArabicErrorMsg: "",
    });
  };

  handleEditChangetheMaterial = (text: string) => {
    this.setState({
      material: text,
      editMeterialErrorMsg: "",
    });
  };

  handleEditChangetheArabicMaterial = (text: string) => {
    this.setState({
      materialArabic: text,
      editMeterialArabicErrorMsg: "",
    });
  };

  handleEditChangetheFit = (text: string) => {
    this.setState({
      fit: text,
      editFitErrorMsg: "",
    });
  };

  handleEditChangetheArabicFit = (text: string) => {
    this.setState({
      fitArabic: text,
      editFitArabicErrorMsg: "",
    });
  };

  handleEditChangetheProductCare = (text: string) => {
    this.setState({
      productCare: text,
      editProductCareErrorMsg: "",
    });
  };

  handleEditChangetheArabicProductCare = (text: string) => {
    this.setState({
      productCareArabic: text,
      editProductCareArabicErrorMsg: "",
    });
  };

  handleEditChangetheDescription = (text: string) => {
    this.setState({
      productDescription: text,
      editProductDescriptionErrorMsg: "",
    });
  };

  handleEditChangetheArabicDescription = (text: string) => {
    this.setState({
      productDescriptionArabic: text,
      editProductDescriptionArabicErrorMsg: "",
    });
  };

  handleProductDetailsSaveButton = () => {

    if (!this.handleEditProductValidation()) {
      const {
        productName,
        genderText,
        brand,
        category,
        subCategory,
        material,
        fit,
        productCare,
        productDescription,
        isListed,
        subSubCategory,
        productArabicName,
        brandArabic,
        genderArabicText,
        materialArabic,
        fitArabic,
        productCareArabic,
        productDescriptionArabic
      } = this.state;
      let formData = new FormData();

      formData.append("name", productName);
      formData.append("gender", genderText.toLocaleLowerCase());
      formData.append("brand_name", brand);
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategory);
      formData.append("sub_sub_category_id", subSubCategory);
      formData.append("material", material);
      formData.append("fit", fit);
      formData.append("prodcut_care", productCare);
      formData.append("list_the_product", isListed ? "listed" : "unlisted");
      formData.append("description", productDescription);

      formData.append("name_arabic", productArabicName)
      formData.append("brand_name_arabic", brandArabic)
      formData.append("material_arabic",materialArabic)
      formData.append("fit_arabic",fitArabic)
      formData.append("prodcut_care_arabic", productCareArabic)
      formData.append("description_arabic", productDescriptionArabic)
      formData.append("gender_arabic", genderArabicText.toLocaleLowerCase())

      this.updateTheProductDetailsCatalogue(formData);
    }
  };


  handleIntialFocusVariant = () => {
    const updatedVariants = this.state.variants.map((variant: Variant) => ({
      ...variant,
      focusedView: 'front'
    }));
    this.setState({ variants: updatedVariants })
  }
  handleFocusSelectedView = (index: number) => {
    this.setState({
      errorMsg: {
        errorHeader: "",
        errorTitle: ""
      }
    });
    if (index === 1) {
      this.fetchTheSizeList();
      this.fetchTheColorList();

    }
    else if (index === 2) {
      this.handleIntialFocusVariant()
    }

    else if (index === 3) {
      this.fetchTheStoreDetails()
    }
    this.setState({ focusedButtonIndex: index })
  }


  checkImageUriAvailability = (image: string | { uri: string } | undefined) => {
    if (image !== null && image !== undefined) {
        if (typeof image === 'string') {
            return image.length > 0;
        } else if (typeof image === 'object' && 'uri' in image) {
            return image.uri.length > 0;
        }
    }
    return false;
}

getImageUri = (image: string | { uri: string } | undefined) => {
  if (image !== null && image !== undefined) {
      if (typeof image === 'string') {
        if(image.length > 0){
          return image;
        }
          
      } else if (typeof image === 'object' && 'uri' in image) {
        if(image.uri.length > 0){
          return image.uri
        }
         
      }
  }
  return undefined
 
}


  handleViewSelection = (color: string, view: string, deleteTheImage?: boolean) => {
    const updatedVariants = this.state.variants?.map((variant: Variant) => {
      if (variant.variant_color === color) {
        if (deleteTheImage) {
          return {
            ...variant,
            focusedView: view,
            [`${view}_image`]: null
          };
        } else {
          return {
            ...variant,
            focusedView: view
          };
        }
      } else {
        return variant;
      }
    });

    this.setState({
      variants: updatedVariants
    })
  }


  handleUpdateStateForVarient = (focusedView: string, color: string) => {
    this.setState({
      selectedColorForImageUploading: color,
      selectedViewForImageUploading: focusedView
    }, () => {
      this.setState({ modalVisible: true })
    })
  }
  closeImageModal = () => {
    this.setState({ modalVisible: false })
  }

  handleUploadImageToVarient = (objData: {}, size: number) => {
    this.setState({
      modalVisible: false
    });
    if (size < 4 * 1024 * 1024) {
      const updatedVariants = this.state.variants?.map((variant: Variant) => {
        if (variant.variant_color === this.state.selectedColorForImageUploading) {
          return {
            ...variant,
            [`${this.state.selectedViewForImageUploading}_image`]: objData
          };
        } else {
          return variant;
        }
      });


      this.setState({ variants: updatedVariants });
    } else {
      this.showAlert("Alert", i18n.t('imageSizeExceed'));

    }

  }


  async handleImageOperation(isCamera: boolean) {


    try {
      let image = isCamera
        ? await ImagePicker.openCamera({

          mediaType: 'photo',

          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4
        })
        : await ImagePicker.openPicker({

          mediaType: 'photo',

          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4
        });

      if (image.path) {

        let objData = JSON.parse(JSON.stringify({
          name: "profile.jpg",
          type: image.mime,
          uri: image.path,
        }));
        this.handleUploadImageToVarient(objData, image.size)
      } else {
        this.showAlert("Alert", i18n.t('unableProcessImage'));
      }
    } catch (error) {
      this.setState({
        modalVisible: false
      });
      if (error instanceof Error && error.message !== i18n.t('userCancelImage')) {
        this.showAlert("Alert", error.message || i18n.t('unableProcessImage'));
      }
    }

  }
  validateVariantsImages = () => {
    const { variants } = this.state
    for (const variant of variants) {
      if (!variant.front_image && !variant.back_image && !variant.side_image) {
        return false;
      }
    }

    return true;
  }

  getFormatedImage=(image:any)=>{
if(image.uri){
return image
}
else {
  return JSON.parse(JSON.stringify({
    name: "profile.jpg",
    type: 'image/jpg',
    uri: image
  }));
}
  }

  savedTheVariantDetails = () => {
    this.setState({ loading: true })
    let formData = new FormData();
    this.state.variants.forEach((variant: Variant, index: number) => {
      const { id, catalogue_variant_color_id, catalogue_variant_size_id, stock_qty, price, sku, back_image, front_image, side_image } = variant;
      if (id !== null) {
        formData.append(`catalogue_variants_attributes[${index}][id]`, id.toString());
      }
      formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_color_id]`, catalogue_variant_color_id.toString());
      formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_size_id]`, catalogue_variant_size_id.toString());
      formData.append(`catalogue_variants_attributes[${index}][stock_qty]`, stock_qty.toString());
      formData.append(`catalogue_variants_attributes[${index}][price]`, price.toString());
      formData.append(`catalogue_variants_attributes[${index}][sku]`, sku.toString());

      if (front_image) {
const frontImage=this.getFormatedImage(front_image)
          formData.append(`catalogue_variants_attributes[${index}][front_image]`, frontImage);
      }

      if (back_image) {
        const backImage=this.getFormatedImage(back_image)
          formData.append(`catalogue_variants_attributes[${index}][back_image]`, backImage);
      }

      if (side_image) {
        const sideImage=this.getFormatedImage(side_image)
          formData.append(`catalogue_variants_attributes[${index}][side_image]`,sideImage);
      }
    });
    this.state.selectedItem.forEach((item: string | number) => {
      formData.append("store_ids[]", item.toString());
    });
    this.updateTheProductDetailsCatalogue(formData)
  }

  handleVariantsSaveDetails = () => {
    let isValid = this.validateVariantsImages()
    if (isValid) {

      this.savedTheVariantDetails();
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });


    } else if(this.state.focusedButtonIndex===2){
      this.setState({ loading: false })
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('failAddProduct'),
          errorTitle: i18n.t('imageVariant')
        }
      });
     
    }
    else {
  
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });
      this.handleIntialFocusVariant()
      this.setState({ focusedButtonIndex: 2 ,loading:false})
    }
  }


  updateTheSearchText = (text: string) => {
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
    this.setState({ assignStoreSearchText: newText });

  }

  searchAssignStore = () => {
    this.fetchTheStoreDetails(this.state.assignStoreSearchText)
  }

  updateSelectAllCheckBox = () => {
    this.setState({ isSelectAll: !(this.state.isSelectAll) })
  }

  toggleItemSelection = (id: string) => {
    const index = this.state.selectedItem.indexOf(id);
    if (index === -1) {
      this.setState({
        selectedItem: [...this.state.selectedItem, id],

      })

    } else {
      this.setState({
        selectedItem: (this.state.selectedItem.filter((item: string | number) => item !== id)),
        isSelectAll: false
      })

    }
  }

  toggleSelectAll = () => {
    const { assignStore } = this.state;
    const { isSelectAll } = this.state;

    if (!isSelectAll) {
      const allIds = assignStore.map((item: BusinessItem) => item.id);
      this.setState({
        selectedItem: allIds,
        isSelectAll: true
      });
    } else {
      this.setState({
        selectedItem: [],
        isSelectAll: false
      });
    }
  };
  handleAssignStoreSaveButton = () => {
    if (this.state.selectedItem.length > 0) {
      let formData = new FormData();
      this.state.selectedItem.forEach((item: string | number) => {
        formData.append("store_ids[]", item.toString());
      });
      this.updateTheProductDetailsCatalogue(formData)
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });
    }
    else {

      this.setState({
        errorMsg: {
          errorHeader: i18n.t('storeRequired'),
          errorTitle: i18n.t('pleaseSelectStore')
        }
      });

    }

  }



  // Customizable Area End
}
