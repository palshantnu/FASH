import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
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
  errors: [];
  
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
  productNameArabic:string;
  brandArabic: string;
  materialArabic: string;
  fitArabic: string;
  productCareArabic:string;
  productDescriptionArabic:string;
  genderAra:string;
}

interface ProductData {
  addProductDetails: AddProductDetails;
  variants: Variant[];
}

interface VariantResponse {
  variants: Variant[];
  errors: string[];
  error: string;
  already_exists?:[];
}

interface ApiResponse{
  variants: Variant[];
  errors: [];
  error: string;
  data: CatalogueVariant[];

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
  txtSavedValue: string;
  txtInputValue: string;
  enableField: boolean;
  // Customizable Area Start
  token: string;
  loading: boolean;
  sizeSelected: string[];
  colorSelected: string[];
  quantity: string;
  isQuantity: boolean;
  price: string;
  isPrice: boolean;
  sku: string;
  issku: boolean;
  stock: string;
  isStock: boolean;
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
  catalougeDetails: ProductData;
  modalVisible: boolean;
  isGalary: boolean;
  selectedViewForImageUploading: string;
  selectedColorForImageUploading: string;
  errorMsg: {
    errorHeader: string,
    errorTitle: string
  }
  succesfullModal: boolean;
  userType:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class VarientsController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getSizeListApiCallMsgId: string = "";
  getColorListApiCallMsgId: string = "";
  getCreateVarientsApiCallMsgId: string = "";
  postCreateCatalougeApiCallMsgId: string = "";
  getCheckSkuValidationApiCallMsgId:string="";
  createProductsID:string="";
  getStylishApiCallId:string="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtSavedValue: "A",
      txtInputValue: "",
      enableField: false,
      // Customizable Area Start
      userType:"",
      token: "",
      loading: false,
      sizeSelected: [],
      colorSelected: [],
      quantity: '',
      isQuantity: false,
      price: '',
      isPrice: false,
      sku: '',
      issku: false,
      stock: '',
      isStock: false,
      colorList: [],
      sizeList: [],
      variants: [],
      isVariantButtonDisabled: true,
      catalougeDetails: {
        addProductDetails: {
          brand: "",
          category: "",
          fit: "",
          gender: "",
          isListed: "",
          material: "",
          productCare: "",
          productDescription: "",
          productName: "",
          subCategory: "",
          subSubCategory: "",

          productNameArabic:"",
          brandArabic: "",
          materialArabic: "",
          fitArabic: "",
          productCareArabic:"",
          productDescriptionArabic:"",
          genderAra:""
        },
        variants: []
      },
      modalVisible: false,
      isGalary: true,
      selectedViewForImageUploading: "",
      selectedColorForImageUploading: "",
      errorMsg: {
        "errorHeader": "",
        "errorTitle": ""
      },
      succesfullModal: false,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));
      this.setState({ txtSavedValue: value });
    }
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const catalougeApiData = message.getData(
        getName(MessageEnum.ProductDetailsData));
      this.handlePropsNavigationData(catalougeApiData)
    }

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived", message);
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }
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
        this.setState({ loading: false })
        this.showAlert("Alert", configJSON.somethingWentWrongMsg);
      }
      if(apiRequestCallId === this.getStylishApiCallId ){
        this.setNewUserData(responseJson)
   
      }
      if(apiRequestCallId === this.createProductsID){
        this.handleCreateCatalogueApiResponseInAssign(responseJson)
      }
      
      if (apiRequestCallId) {
        this.setState({ loading: false })
        this.handleManagingTheApiResponseWithCallId(apiRequestCallId,responseJson)

      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
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
this.submitProductDetailsAPI()
}else{
  this.navigationToAssignStore();
}
  }
handleManagingTheApiResponseWithCallId=(apiRequestCallId:string,responseJson:ApiResponse)=>{
  if (apiRequestCallId === this.getSizeListApiCallMsgId) {
    this.handleSizeListResponse(responseJson)
  }
  if (apiRequestCallId === this.getColorListApiCallMsgId) {
    this.handleColorListResponse(responseJson)
  }
  if (apiRequestCallId === this.getCreateVarientsApiCallMsgId) {
    this.handleCreateVariantResponse(responseJson)
  }
  if (apiRequestCallId === this.getCheckSkuValidationApiCallMsgId) {
    this.handleGetSkuValidationResponse(responseJson)
  }
}



checkCreateVariantButtonStatus = () => {
  const { colorSelected, sizeSelected } = this.state;
  if (colorSelected?.length === 0 || sizeSelected?.length === 0) {
    this.setState({ isVariantButtonDisabled: true })
  } else {
    this.setState({ isVariantButtonDisabled: false })
  }
}

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async componentDidMount() {
    this.getToken();
    this.checkCreateVariantButtonStatus()
  }
  handlePropsNavigationData = (catalougeApiData: ProductData) => {
    if (catalougeApiData.variants && catalougeApiData.variants.length > 0) {
      this.setState({
        variants: catalougeApiData.variants
      })
    }
    this.setState({ catalougeDetails: catalougeApiData })
  }

  handleSizeListResponse = (responseJsons: ApiResponseForColorAndSizeVarient) => {
    if (responseJsons && responseJsons.data && !responseJsons.errors) {
      const formattedDatas = responseJsons.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );
    
      this.setState({ sizeList: formattedDatas });
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);
    }
  }

  handleColorListResponse = (responseJsonData: ApiResponseForColorAndSizeVarient) => {

    if (responseJsonData && responseJsonData.data && !responseJsonData.errors) {
      const formattedValues = responseJsonData.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );
      this.setState({ colorList: formattedValues });
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);

    }
  }
  handleCreateVariantResponse = (responseJsonData: VariantResponse) => {
    if (responseJsonData && !responseJsonData.errors && !responseJsonData.error) {

      this.setState({ variants: responseJsonData, isVariantButtonDisabled: true });
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);
    }
  }

  handleGetSkuValidationResponse= (responseJson: VariantResponse) => {
    if (responseJson && !responseJson.errors && !responseJson.error) {
if(responseJson.already_exists){
  if (responseJson.already_exists.length === 0) {
    this.navigationToVarietImageUploadScreen();
  } else if (responseJson.already_exists.length > 0) {
    const skuString = responseJson.already_exists.join(", ")
    const errorTitle = `'${skuString}'`; 
  
    this.setState({
      errorMsg: {
        errorHeader: i18n.t('skuValueExit'),
        errorTitle: errorTitle
      }
    });
  }

}     
    } else {
      this.showAlert("Alert", configJSON.somethingWentWrongMsg);
    }

  }

  fetchTheSizeList = async () => {
    const header = {
      "Content-Type": configJSON.getSizeApiContentType,
      token: this.state.token,
    };
    const requestMessageCode = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getSizeListApiCallMsgId = requestMessageCode.messageId;

    requestMessageCode.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSizeApiEndPoint
    );

    requestMessageCode.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessageCode.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSizeApiMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageCode.id, requestMessageCode);
  };

  fetchTheColorList = async () => {
    const header = {
      "Content-Type": configJSON.getColorListApiContentType,
      token: this.state.token,
    };
    const requestMessageData = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getColorListApiCallMsgId = requestMessageData.messageId;

    requestMessageData.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getColorListApiEndPoint
    );

    requestMessageData.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessageData.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getColorListMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageData.id, requestMessageData);
  };

  createTheVariants = async () => {
    const header = {
      "Content-Type": configJSON.createVarientContentType,
      token: this.state.token,
    };
    const requestMessageValue = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCreateVarientsApiCallMsgId = requestMessageValue.messageId;
    const variantSizeIds = this.state.sizeSelected.map(Number);
    const variantColorIds = this.state.colorSelected.map(Number);
    requestMessageValue.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createVarientEndPoint + `variant_size_ids=[${variantSizeIds.join(',')}]&variant_color_ids=[${variantColorIds.join(',')}]`
    );
    requestMessageValue.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessageValue.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createVarientMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageValue.id, requestMessageValue);
  };

  checkTheSkuValueValidation = async () => {
    const header = {
      "Content-Type": configJSON.createVarientContentType,
      token: this.state.token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCheckSkuValidationApiCallMsgId = requestMessages.messageId;

    const skuArray = this.state.variants.map((variant: Variant) => `"${variant.sku}"`);
const skuParams = encodeURIComponent(`[${skuArray.join(',')}]`);
    
requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSkuValidationEndPoint + skuParams
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.createVarientMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  updateVariantProperty = (indexs: number, propertys: string, value: string) => {
    const variants = [...this.state.variants];
    if (variants[indexs]) {
      variants[indexs][propertys] = value;
      this.setState({ variants });
    }
  }
  handleCreateTheVariantls = () => {
    const { sizeSelected, colorSelected } = this.state;
    if ((sizeSelected.length * colorSelected.length) > 30) {
      this.setState({
        errorMsg: {
          errorTitle: i18n.t('maxVariantCreate'),
          errorHeader: i18n.t('limitExceed'),
        }
      });
    }
    else {
      this.setState({
        errorMsg: {
          errorTitle: "",
          errorHeader: "",
        }
      });
      this.createTheVariants()
    }
  }

  navigationToVarietImageUploadScreen = () => {
    this.setState({
      errorMsg: {
        errorHeader: "",
        errorTitle: "",
      }
    });
    const updatedVariantss = this.state.variants.map((variant: Variant) => ({
      ...variant,
      focusedView: 'front'
    }));

    const updatedCatalogueDetails = {
      ...this.state.catalougeDetails,
      variants: updatedVariantss
    };
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationVarientImageMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msgs.addData(getName(MessageEnum.ProductDetailsData), updatedCatalogueDetails);
    this.send(msgs);
  }

  handleAllTheValidation = () => {
    let hasVariantsValidation = this.checkVariantsAvailabilitys();
    if (!hasVariantsValidation) {
      this.setState({
        errorMsg: {
          errorTitle: i18n.t('pleaseAddVariant'),
          errorHeader: i18n.t('variantsNotAvailable'),
        }
      });
      return;
    }
    const hasMissingValuesValidation = this.checkMissingValuess();
    if (hasMissingValuesValidation) {
      this.setState({
        errorMsg: {
          errorTitle: i18n.t('variantMustHaveValue'),
          errorHeader: i18n.t('valueMissing'),
        }
      });
      return;
    }
    const hasInvalidPriceOrStockQtys = this.checkInvalidPriceOrStockQty();
    if (hasInvalidPriceOrStockQtys) {
      this.setState({
        errorMsg: {
          errorTitle: i18n.t('priceQuantity'),
          errorHeader: i18n.t('invalidPrice'),
        }
      });
      return;
    }
    const hasDuplicateSkuss = this.checkDuplicateSkus();
    if (hasDuplicateSkuss) {
      this.setState({
        errorMsg: {
          errorTitle: i18n.t('uniqueSkuValue'),
          errorHeader: i18n.t('invalidSku'),
        }
      });
      return;
    } 
    this.checkTheSkuValueValidation()
  }

  checkVariantsAvailabilitys = () => {
    const { variants } = this.state
    return variants && variants.length > 0;
  }

  checkMissingValuess = () => {
    const { variants } = this.state
    return variants.some((variant: Variant) => !variant.sku || !variant.stock_qty || !variant.price);
  }

  checkDuplicateSkus = () => {
    const { variants } = this.state
    const skuSets = new Set();
    return variants.some((variant: Variant) => {
      if (skuSets.has(variant.sku)) {
        return true;
      }
      skuSets.add(variant.sku);
      return false;
    });
  }

  handleTextEmptyInputBox=()=>{
    this.setState({
      errorMsg: {
        errorTitle: i18n.t('enteringAddVarient'),
        errorHeader: i18n.t('variantsNotAvailable'),
      }
    });
  }

  checkInvalidPriceOrStockQty = () => {
    const { variants } = this.state;
    return variants.some((variant: Variant) => {
      const prices = Number(variant.price);
      const stockQtys = Number(variant.stock_qty);
      if (isNaN(prices) || isNaN(stockQtys)) {
        return true; 
      }
      return prices <= 0 || stockQtys <= 0;
    });
  }
  handleUploadImageToVarient = (objData: {}, size: number) => {
    this.setState({
      modalVisible: false
    });
    if (size < 4 * 1024 * 1024) {
      const updatedVariants = this.state.catalougeDetails?.variants.map((variant: Variant) => {
        if (variant.variant_color === this.state.selectedColorForImageUploading) {
          return {
            ...variant,
            [`remove_${this.state.selectedViewForImageUploading}_image`]: objData
          };
        } else {
          return variant;
        }
      });
      this.setState({ catalougeDetails: { ...this.state.catalougeDetails, variants: updatedVariants } });
    } else {
      this.showAlert("Alert", i18n.t('imageSizeExceed'));
    }
  }

  async handleImageOperation(isCameras: boolean) {
    try {
      let images = isCameras
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

      if (images.path) {
        let objDatas = JSON.parse(JSON.stringify({
          name: "profile.jpg",
          type: images.mime,
          uri: images.path,
        }));
        this.handleUploadImageToVarient(objDatas, images.size)
      } else {
        this.showAlert("Alert", i18n.t('unableProcessImage'));
      }
    } catch (errors) {
      this.setState({
        modalVisible: false
      });
      if (errors instanceof Error && errors.message !== i18n.t('userCancelImage')) {
        this.showAlert("Alert", errors.message || i18n.t('unableProcessImage'));
      }
    }
    
  }


  validateVariantsImages = () => {
    const variants = this.state.catalougeDetails.variants;

    for (const variant of variants) {
      if (!variant.remove_front_image && !variant.remove_back_image && !variant.remove_side_image) {
        return false;
      }
    }

    return true;
  }

navigationToAssignStore=()=>{
  const msg: Message = new Message(
    getName(MessageEnum.NavigationAssignstoreMessage)
  );
  msg.addData(getName(MessageEnum.ProductDetailsData), this.state.catalougeDetails);
  msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  this.send(msg);
}
getProfileStylistData = () => {
  const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
  message.initializeFromObject({
    [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
      configJSON.stylistCustomFormEndPoint,
    [getName(MessageEnum.RestAPIRequestMethodMessage)]:
      configJSON.apiMethodTypeGet,
    [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
      token: this.state.token,
    },
  });
  this.getStylishApiCallId = message.messageId;
  this.setState({ loading: true });
  runEngine.sendMessage(message.messageId, message);
};
handleCreateCatalogueApiResponseInAssign = (responseJson: {error:string,errors:string}) => {
  if (responseJson && !responseJson.errors && !responseJson.error) {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "StylistCatalogue");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
 
    this.send(message);
    showMessage({
      message: i18n.t('productCreateSuccess'),
      position: { top: 0 },
    });
  } else {
    if (responseJson.errors) {
      this.showAlert("Alert", JSON.stringify(responseJson.errors));
    }
  }
  this.setState({ loading: false })
}
submitProductDetailsAPI = () => {
  const headerSubmit = {
    "Content-Type": configJSON.createCatalougueApiContentType,
    token: this.state.token,
  };

  const addProductDetails = this.state.catalougeDetails.addProductDetails

  const variants = this.state.catalougeDetails.variants
  let formData = new FormData()
  formData.append("name", addProductDetails.productName)
  formData.append("gender", addProductDetails.gender)
  formData.append("brand_name", addProductDetails.brand)
  formData.append("category_id", addProductDetails.category)
  formData.append("sub_category_id", addProductDetails.subCategory)
  formData.append("sub_sub_category_id", addProductDetails.subSubCategory)
  formData.append("material", addProductDetails.material)
  formData.append("fit", addProductDetails.fit)
  formData.append("prodcut_care", addProductDetails.productCare)
  formData.append("list_the_product", addProductDetails.isListed)
  formData.append("description", addProductDetails.productDescription)
  variants.forEach((variant: Variant, index: number) => {
      const { catalogue_variant_color_id, catalogue_variant_size_id, stock_qty, price, sku, remove_back_image, remove_front_image, remove_side_image } = variant;
      formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_color_id]`, catalogue_variant_color_id.toString());
      formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_size_id]`, catalogue_variant_size_id.toString());
      formData.append(`catalogue_variants_attributes[${index}][stock_qty]`, stock_qty.toString());
      formData.append(`catalogue_variants_attributes[${index}][price]`, price.toString());
      formData.append(`catalogue_variants_attributes[${index}][sku]`, sku.toString());
      if (remove_front_image) {
          formData.append(`catalogue_variants_attributes[${index}][front_image]`, remove_front_image);
      }
      if (remove_back_image) {
          formData.append(`catalogue_variants_attributes[${index}][back_image]`, remove_back_image);
      }
      if (remove_side_image) {
          formData.append(`catalogue_variants_attributes[${index}][side_image]`, remove_side_image);
      }
  });
  formData.append("name_arabic", addProductDetails.productNameArabic)
  formData.append("brand_name_arabic", addProductDetails.brandArabic)
  formData.append("material_arabic", addProductDetails.materialArabic)
  formData.append("fit_arabic", addProductDetails.fitArabic)
  formData.append("prodcut_care_arabic", addProductDetails.productCareArabic)
  formData.append("description_arabic", addProductDetails.productDescriptionArabic)
  formData.append("gender_arabic", addProductDetails.genderAra)
  const requestMessageSubmit = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.createProductsID = requestMessageSubmit.messageId;
    requestMessageSubmit.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.assignStoreEndpoint
    );

  requestMessageSubmit.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(headerSubmit)
  );

  requestMessageSubmit.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.postMethod
  );

  requestMessageSubmit.addData(
    getName(MessageEnum.RestAPIRequestBodyMessage),
   formData
  );

  this.setState({ loading: true })
  runEngine.sendMessage(requestMessageSubmit.id, requestMessageSubmit);
}

  handleCreateButton = () => {
    let isValid = this.validateVariantsImages();

    if (!isValid) {
      this.setState({
        errorMsg: {
          errorHeader: i18n.t('failAddProduct'),
          errorTitle: i18n.t('imageVariant')
        }
      });
    } else {
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });
      this.getProfileStylistData()
     
    }
  };


  checkImageUriAvailability = (image: { uri?: string }) => {
    if (image && image.uri) {
      return true;
    } else {
      return false;
    }
  }

  handleUpdateStateForVarient = (focusedView: string, color: string) => {
    this.setState({
      selectedColorForImageUploading: color,
      selectedViewForImageUploading: focusedView
    }, () => {
      this.setState({ modalVisible: true })
    })
  }
  handleViewSelection = (color: string, view: string, deleteTheImage?: boolean) => {
    const updatedVariants = this.state.catalougeDetails?.variants.map((variant: Variant) => {
      if (variant.variant_color === color) {
        if (deleteTheImage) {
          return {
            ...variant,
            focusedView: view,
            [`remove_${view}_image`]: null
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


    this.setState(prevState => ({
      catalougeDetails: {
        ...prevState.catalougeDetails,
        variants: updatedVariants
      }
    }));
  }

  navigationBackToVariantscreen = () => {
    
    const msg: Message = new Message(
      getName(MessageEnum.NavigationVarientMessage)
    );
    msg.addData(getName(MessageEnum.ProductDetailsData), this.state.catalougeDetails);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  
  closeImageModal = () => {
    this.setState({ modalVisible: false })
  }
  showGaleryModel(){
    this.setState({ isGalary: true })
  }
  hideGaleryModel(){
    this.setState({ isGalary: false })
  }
  // Customizable Area End
}
