import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ViewabilityConfig, ViewToken, EmitterSubscription, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import { getUniqueId } from "react-native-device-info";
import moment from "moment";
import 'moment/locale/ar-dz';
import { getStorageData, removeStorageData } from "framework/src/Utilities";
import { showAlert } from "../../../components/src/CustomAlert";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { setStorageData } from "framework/src/Utilities";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import i18n from '../../../components/src/i18n/i18n.config'
import {
  CatalogueDataSuccess,
  CatalogueVariant,
  CatalogueVariantAttributes,
  VariantAttributes,
  StoreInfoAttributes,
  OwnerAddProps,
  BuyNowResponse,
} from "./response";
import Share from 'react-native-share';
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
  productId: string | number;
  loading: boolean;
  productData: NonNullable<CatalogueDataSuccess["data"]>;
  productImages: Array<{ id: string; uri: string }>;
  productImageIndex: number;
  selectedVariant: CatalogueVariantAttributes;
  store?: { id: string } & StoreInfoAttributes;
  fitText: string;
  descText: string;
  careAndMaterialText: string;
  colors: Array<VariantAttributes>;
  selectedColorId: number;
  sizes: Array<VariantAttributes>;
  descriptionOpen: boolean;
  fitOpen: boolean;
  careAndMaterialOpen: boolean;
  expDeliveryAndCostOpen: boolean;
  shopInfoOpen: boolean;
  sellerPov: boolean;
  storeAddress : string | undefined;
  pairItWith: boolean;
  stylistInfoOpen: boolean;
  stylistName: string;
  stylistAddress: OwnerAddProps | null;
  localCurrency: string;
  loyaltyPoints:any|null;
  languageUpdated:string;
  store_id:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Productdescription3Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProductDetailApiCallId = "";
  addToCartApiCallId = "";
  buyNowApiCallId = "";
  sendAppUrl = ""
  focusListener = { remove: () => { } } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      token: "",
      productId: "",
      storeAddress : "",
      loading: true,
      productImages: [],
      productImageIndex: 0,
      productData: {} as NonNullable<CatalogueDataSuccess["data"]>,
      selectedVariant: {} as CatalogueVariantAttributes,
      store: {} as { id: string } & StoreInfoAttributes,
      fitText: "",
      descText: "",
      careAndMaterialText: "",
      colors: [],
      selectedColorId: 0,
      sizes: [],
      descriptionOpen: true,
      fitOpen: true,
      careAndMaterialOpen: true,
      expDeliveryAndCostOpen: true,
      shopInfoOpen: true,
      sellerPov: false,
      pairItWith: false,
      stylistInfoOpen: true,
      stylistName: "",
      stylistAddress: null,
      localCurrency: '',
      loyaltyPoints:0,
      languageUpdated:i18n.language,
      store_id:''
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

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const productId = message.getData(getName(MessageEnum.productIDMessage));
      const sellerPov = message.getData(getName(MessageEnum.ShowByStoreId));
      if (productId) {
        this.setState({ productId, sellerPov: Boolean(sellerPov) });
      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponse(message);
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>, snapshot?: SS | undefined): void {
    if(prevState.localCurrency !== this.state.localCurrency){
      this.getProductInfo(this.state.productId);
    }
  }
    
  componentDidMount = async () => {
    this.getToken();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.getToken();
        let currencyGet = await getStorageData('currencyIcon', true)
        this.setState({ localCurrency: currencyGet })
        removeStorageData('DeepLinkingNavigation')
      }
    );
  };

  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  getToken = async() => {
    moment.locale(i18n.language)
    const token = await getStorageData("token", true);
    this.setState({ token:token!=null?token:"" },()=>{
       this.handleSession();
    })
  };

  handleApiResponse = (message: Message) => {
    const responseId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    ) as string;
    const successResponse = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (successResponse) {
      if (responseId === this.getProductDetailApiCallId) {
        return this.handleProductResponse(successResponse);
      }
      if(responseId === this.sendAppUrl){        
        this.shareAppUrl(successResponse.shareable_link)
      }
      if (responseId === this.addToCartApiCallId) {
        this.setState({ loading: false });
        if ("data" in successResponse) {
          showMessage({
            message: i18n.t('itemSuccessfullyadded'),
            position: { top: 8 },
            type: "success",
          });
          this.navigateToCart();
        } else {
          showMessage({
            message:
              successResponse.errors ??
              successResponse.message ??
              successResponse.error,
            position: { top: 8 },
            type: "warning",
          });
        }
        return;
      }
      if (responseId === this.buyNowApiCallId) {
        this.handleBuyNow(successResponse);
      }
    }

    this.parseApiCatchErrorResponse(errorResponse);
  };

  handleSession = async () => {
   
    const _productId = (await this.props.navigation.getParam("cid")) as string;
    this.setState(
      ({ productId }) => {
        if (_productId) {
          return {  productId: _productId };
        }
        return {  productId };
      },
      () => {
        if (this.state.productId) {
          this.getProductInfo(this.state.productId);
        }
      }
    );
  };

  getDescriptionText = (description :string , descriptionArabic: string) => {
    return (i18n.language == "en" ? description : descriptionArabic);
  }

  getFitText = (fitEnglish : string , fitArabic : string, fitDescription : string , fitDescriptionAr : string) => {
    const fitDescriptionFinal = i18n.language == "en" ? fitDescription : fitDescriptionAr;
    return i18n.t("fit") +  " - " +
    (i18n.language == "en" ? fitEnglish : fitArabic) +
    (fitDescriptionFinal
      ? "\n".concat(fitDescriptionFinal)
      : "");
  }

  getMaterialAndCareText = (material: string, materialArabic: string, care: string, careArabic: string) => {
    let productCare = i18n.language == "en" ? care : careArabic;
    return i18n.t("material") + " - " +
      ((i18n.language == "en" ? material : materialArabic)) +
      (productCare
        ? "\n" + (productCare)
        : "");
  }

  handleProductResponse = (_response: unknown) => {
    const response = _response as CatalogueDataSuccess;
    if (response.error) {
      this.setState({ loading: false });
      return showMessage({
        message: i18n.t('catalogueDoesNot'),
        type: "danger",
        position: { top: 8 },
      });
    }
    if (response.data) {
      const colors = new Map<number, S["colors"][0]>();
      response.data.attributes.catalogue_variants_with_store.forEach((item) => {
        colors.set(
          item.attributes.catalogue_variant_color_id,
          item.attributes.catalogue_variant_color
        );
      });
      const variant =
        response.data.attributes.catalogue_variants_with_store[0].attributes;
        const variantForLoyaltyPoint =
        response.data.attributes.catalogue_variants_with_store[0].attributes.loyalty_points_wil_credit;
        console.log('variantForLoyaltyPointvariantForLoyaltyPoint',variantForLoyaltyPoint);
        
      const images = this.grabImages(variant);
      const _colors = Array.from(colors).map((color) => color[1]);
      const fitText = this.getFitText(
        response.data.attributes.fit,
        response.data.attributes.fit_arabic,
        response.data.attributes.fit_discription,
        response.data.attributes.fit_discription_arabic
      )
      const careAndMaterialText = this.getMaterialAndCareText(
        response.data.attributes.material,
        response.data.attributes.material_arabic,
        response.data.attributes.prodcut_care,
        response.data.attributes.prodcut_care_arabic
      )
      const descText = this.getDescriptionText(
        response.data.attributes.description,
        response.data.attributes.description_arabic
      );
      let pairIt = false;
      if (!this.state.sellerPov) {
        if (variant.pair_it_with.length > 0) {
          pairIt = true;
        }
      }
      this.setState({
        loading: false,
        loyaltyPoints:variantForLoyaltyPoint,
        productData: response.data,
        selectedVariant: variant,
        pairItWith: pairIt,
        storeAddress: response.data.attributes.catalogue_variants_with_store[0].store_info?.attributes?.address,
        store: {
          ...response.data.attributes.catalogue_variants_with_store[0]
            .store_info!.attributes,
          id: response.data.attributes.catalogue_variants_with_store[0]
            .store_info!.id,
        },
        productImages: images,
        fitText,
        descText,
        careAndMaterialText,
        colors: _colors,
        selectedColorId: _colors[0].id,
        store_id:response.data.attributes.catalogue_variants_with_store[0]
        .store_info!.id,
        stylistName: response.data.attributes.owner_full_name,
        stylistAddress: response.data.attributes.owner_address != null ? response.data.attributes.owner_address : null,
      });
      return this.handleColorChange(this.state.colors[0]);
    }
  };

  handleBuyNow = async (response: BuyNowResponse) => {
    if (response.data) {
      this.setState({ loading: false });
      await setStorageData('buyNowOrderID', response.data.id)
      const message = new Message(getName(MessageEnum.NavigationCheckout));
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
    } else {
      showMessage({
        message: response.message ?? i18n.t('somethingWentWrong'),
        position: { top: 8 },
      });
    }
  };

  grabImages = (variant: CatalogueVariantAttributes) => {
    const image_keys: Array<keyof CatalogueVariant["attributes"]> = [
      "front_image",
      "side_image",
      "back_image",
    ];
    const images: S["productImages"] = [];
    if (!variant.front_image && !variant.back_image && !variant.side_image) {
      images.push({
        id: "no-image",
        uri: "https://i.ibb.co/8Nb9QHL/image.png",
      });
    } else {
      image_keys.forEach((imageKey) => {
        if (variant[imageKey]) {
          images.push({ id: imageKey, uri: variant[imageKey] });
        }
      });
    }
    return images;
  };

  getProductInfo = (productId: string | number) => {
    if (!productId) {
      return;
    }
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const endpoint = this.state.token
      ? configJSON.getProductDetailWithTokenApi
      : configJSON.getproductdetailAPIEndpoint;
    let currencyWithToken = this.state.localCurrency === "$"?"&currency=dollar":"&currency=dinar";
    let currencyWithoutToken = this.state.localCurrency === "$"?"?currency=dollar":"?currency=dinar";
    const currency = this.state.token? currencyWithToken:currencyWithoutToken
    const language= i18n.language ==="ar" && "Arabic"
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductDetailApiCallId = requestMessage.messageId;
    requestMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        endpoint + `${this.state.productId}`+ currency+ `&language=${language}`,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]:
        JSON.stringify(header),
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
    });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  addToCart = () => {
    let body = {}
    if(this.state.token)
    {
      if (this.state.stylistAddress === null) {
        if (!this.state.store?.id) {
          return showMessage({
            message: i18n.t('sorryThisItemCant'),
            type: "warning",
            position: { top: 8 },
          });
        }
        body = {
          quantity: 1,
          catalogue_id: this.state.productId,
          catalogue_variant_id: this.state.selectedVariant.id,
          bussiness_information_id: this.state.store?.id,
          unique_token: getUniqueId(),
        };
      } else {
        body = {
          quantity: 1,
          catalogue_id: this.state.productId,
          catalogue_variant_id: this.state.selectedVariant.id,
        };
      }
    }else {
      body = {
        quantity: 1,
        catalogue_id: this.state.productId,
        catalogue_variant_id: this.state.selectedVariant.id,
        bussiness_information_id: this.state.store?.id,
        unique_token: getUniqueId(),
      };
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.validationApiContentType,
    };

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]: this.state.token
        ? configJSON.addToCartAPIEndpoint
        : configJSON.addToCartGuestApiEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]:
        JSON.stringify(header),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify(body),
    });
    this.addToCartApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
    this.setState({ loading: true });
  };

  buyNow = async() => {
    let savedId = await getStorageData('address_id',true);          
    if (!this.state.token) {
      showAlert({
        messsage: i18n.t('youNeedToSignToAccess'),
        okButton: {
          text: i18n.t('signIn'),
          onPress: () => this.goToSignIn(),
        },
        cancelButton: { text: i18n.t('cancelText') },
      });
      return;
    }
    let bodyBuyNow = {}
    if (this.state.store) {
      bodyBuyNow = {
        quantity: 1,
        catalogue_id: this.state.productId,
        catalogue_variant_id: this.state.selectedVariant.id,
        bussiness_information_id: this.state.store.id,
        address_id:savedId
      };
    } else {
      bodyBuyNow = {
        quantity: 1,
        catalogue_id: this.state.productId,
        catalogue_variant_id: this.state.selectedVariant.id,
        address_id:savedId
      };
    }

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.validationApiContentType,
    };

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]: configJSON.buyNowEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]:
        JSON.stringify(header),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify(bodyBuyNow),
    });
    this.buyNowApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
    this.setState({ loading: true });
  };

  navigateToCart = () => {
    const message = new Message(
      getName(MessageEnum.NavigationShoppingCartOrdersMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    runEngine.sendMessage(message.id, message);
  };

  viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100,
  };

  onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems[0]) {
      this.setState({ productImageIndex: viewableItems[0].index! });
    }
  };

  handleColorChange = (item: VariantAttributes) => {
    const variants =
      this.state.productData.attributes.catalogue_variants_with_store;
    const validSizes: VariantAttributes[] = [];
    for (const variant of variants) {
      if (variant.attributes.catalogue_variant_color_id === item.id) {
        validSizes.push(variant.attributes.catalogue_variant_size);
      }
    }
    this.setState({ sizes: validSizes, selectedColorId: item.id }, () => {
      this.handleSizeChange(validSizes[0]);
    });
  };

  handleSizeChange = (item: VariantAttributes) => {
    const variants =
      this.state.productData.attributes.catalogue_variants_with_store;
    const selectedVariantIndex = variants.findIndex((_item) => {
      return (
        this.state.selectedColorId ===
        _item.attributes.catalogue_variant_color_id &&
        item.id === _item.attributes.catalogue_variant_size_id
      );
    });
    if (selectedVariantIndex > -1) {
      this.setState({
        selectedVariant: variants[selectedVariantIndex].attributes,
        productImages: this.grabImages(
          variants[selectedVariantIndex].attributes
        ),
        productImageIndex: 0,
        store: {
          ...variants[selectedVariantIndex].store_info!.attributes,
          id: variants[selectedVariantIndex].store_info!.id,
        },
      });
    }
  };

  static getStoreAddress = (store?: StoreInfoAttributes) => {
    if (!store) {
      return "";
    }
    let address = "";
    if (store.mall_name) {
      address += store.mall_name + ", ";
    }
    if (store.floor) {
      address += "Floor " + store.floor + ", ";
    }
    if (store.area) {
      address += store.area + ", ";
    }
    if (store.block) {
      address += store.block + ", ";
    }
    if (store.city) {
      address += store.city + ", ";
    }
    if (store.zipcode) {
      address += store.zipcode;
    }
    return address;
  };

  getEstimatedDelivery = (store?: StoreInfoAttributes) => {
    let deliverBy = i18n.t("deliveryBy") + ": ";
    if (store) {
      deliverBy += moment(store.expected_delivery_time).format(
        "ddd, DD MMM - YYYY"
      );
    } else {
      deliverBy += moment().add({ days: 2 }).format("ddd, DD MMM - YYYY");
    }
    return deliverBy;
  };

  getTotalCost = (price: string, shipping = "10.0") => {
    let totalCost = parseFloat(price) + parseFloat(shipping)
    let parseData = parseFloat(totalCost.toString()).toFixed(2)
    return PriceConvertValue(parseData, this.state.localCurrency)
  };

  shareAppUrl = async(url:string) => {
    this.setState({ loading: false })
    let shareOptions = {
      message: url,
      failOnCancel: false,
    };
    Share.open(shareOptions)
  };

  shareButton = async () => {
    this.setState({ loading: true })
    const header = {
        "Content-Type": "application/json",
     };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sendAppUrl = requestMessage.messageId;
    const producd_id =  this.state.productId
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getproductdetailAPIEndpoint + String(producd_id),
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
}

  navigateToPairWith = () => {
    if (!this.state.selectedVariant.pair_it_with.length) {
      return showMessage({
        message: i18n.t('noCataloguePairs'),
        position: { top: 8 },
        type: "info",
      });
    }
    const message = new Message(
      getName(MessageEnum.NavigationPairedProductsMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(
      getName(MessageEnum.NavigationPayloadPairedProductsMessage),
      {
        ...this.state.selectedVariant,
        catalogue: {
          name: this.state.productData.attributes.name,
          id: this.state.productId,
          brand_name: this.state.productData.attributes.brand_name,
        },
      }
    );
    runEngine.sendMessage(message.id, message);
  };

  addWishlist = (productId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.addToWishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.postMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: {
          favouriteable_id: productId,
        },
      }),
    });

    showMessage({
      type: "success",
      position: { top: 8 },
      message: i18n.t('itemAddedToWishlist'),
    });
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  removeWishlist = (productId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.removeFromWishlistEndpoint + String(productId),
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
    });

    showMessage({
      type: "success",
      position: { top: 8 },
      message: i18n.t('itemRemovedFromWishlist'),
    });
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  toggleWishlist = () => {
    if (this.state.token) {
      this.setState(({ productData }) => ({
        productData: {
          ...productData,
          attributes: {
            ...productData.attributes,
            is_wishlist: !productData.attributes.is_wishlist,
          },
        },
      }));
      if (this.state.productData.attributes.is_wishlist) {
        this.removeWishlist(this.state.productId);
      } else {
        this.addWishlist(this.state.productId);
      }
    } else {
      showAlert({
        messsage: i18n.t('youNeedToSignInToCreateWishlist'),
        okButton: {
          text: i18n.t('signIn'),
          onPress: () => this.goToSignIn(),
        },
        cancelButton: { text: i18n.t('cancelText') },
      });
    }
  };

  goToSignIn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  setStylistAddress = (stylist: OwnerAddProps) => {
    let address = "";
    if (stylist.mall_name) {
      address += stylist.mall_name + ", ";
    }
    if (stylist.floor) {
      address += "Floor " + stylist.floor + ", ";
    }
    if (stylist.area) {
      address += stylist.area + ", ";
    }
    if (stylist.block) {
      address += stylist.block + ", ";
    }
    if (stylist.city) {
      address += stylist.city + ", ";
    }
    if (stylist.zipcode) {
      address += stylist.zipcode;
    }
    return address;
  };

  btnNavigationStore = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationStoreProfileMessage)
    );
    message.addData(getName(MessageEnum.storeIDMessage), this.state.store_id);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }
  // Customizable Area End
}
