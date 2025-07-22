import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import moment from "moment";
import {
  CatalogueVariant,
  CatalogueVariantAttributes,
  colorList
} from "./response";
import { ViewabilityConfig, ViewToken, EmitterSubscription } from "react-native";
import { getStorageData } from "framework/src/Utilities";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import i18n from '../../../components/src/i18n/i18n.config'
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

  errorMessage: string;

  productImages: Array<{ id: string, uri: string }>;
  productImageIndex: number;
  catalogueId: number | string;
 
  isProductoutOfStock: boolean;
  isProductUnAvailable: boolean;
  sku: string;
  productDetailsData: CatalogueVariant|any
  productName: string;
  productPrice: string;
  productPrimaryPrice:string;
  primaryDiscountedPercentage:string;
  categoryname: string;
  subCategoryName: string;
  colorlist:colorList[]
selectedColor:string;
sizeList:colorList[];
selectedSize:string;
productDescription:string;
localCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProductdescriptionSellerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getCatalogueDetailsApiMsgCallId: string = "";
  focusListener = { remove: () => {} } as EmitterSubscription;
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
      txtInputValue: "",
      enableField: false,
      txtSavedValue: "A",
      // Customizable Area Start
      token: "",
      loading: false,

      errorMessage: "",

      productImages: [],
      productImageIndex: 0,
      catalogueId: "",
      
      isProductoutOfStock: false,
      isProductUnAvailable: false,
      sku: "",
      productDetailsData: {
        
      },
      productName: "",
      productPrice: "",
      productPrimaryPrice:"",
      primaryDiscountedPercentage:"",
      categoryname: "",
      subCategoryName: "",
      colorlist:[],
      selectedColor:"",
      sizeList:[],
      selectedSize:"",
      productDescription:'',
      localCurrency:''
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

      const catalougeId = message.getData(
        getName(MessageEnum.ProductDescriptionSellerCatalogueId));
      if (catalougeId) {
        this.setState({ catalogueId: catalougeId }, () => {
          this.fetchTheCatalogueDetails()
        })
      }

    }

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {


      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token: token });
      }
      else {
        this.showAlert(i18n.t('alertText'), i18n.t('pleaseLoginAgain'));
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));


      if (errorReponse) {
        this.setState({ loading: false })
        this.showAlert(i18n.t('alertText'), i18n.t('somethingWentWrong'))
      }
      if (apiRequestCallId) {
        if (apiRequestCallId === this.getCatalogueDetailsApiMsgCallId) {
          this.handleProductDescriptionResponse(responseJson)

        }

        this.setState({ loading: false })
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleProductDescriptionResponse = (responseJson: any) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const attributes = responseJson.data.attributes;
      const variant = attributes.catalogue_variants[0].attributes;
      const variants=attributes.catalogue_variants;
      const images = this.getVariantImages(variant);
      const outOfStock = this.getOutOfStockDStatus(variant);
      const sku = this.getSkuValue(variant);
      const uniqueColorVariants = this.extractUniqueVariants(variants, 'color');
const uniqueSizeVariants = this.extractUniqueVariants(variants, 'size');
     


      this.setState({
        productDetailsData: responseJson.data,
       
        productImages: images,
        isProductoutOfStock: outOfStock,
        sku: sku,
        productName: attributes.name,
        productPrice: attributes.primary_price,
        productPrimaryPrice:attributes.primary_main_price,
        primaryDiscountedPercentage:attributes.primary_discounted_percentage,
        categoryname: attributes.category.attributes.name,
        subCategoryName: attributes.sub_category.attributes.name,
        colorlist:uniqueColorVariants,
        sizeList:uniqueSizeVariants,
        selectedColor:variant.catalogue_variant_color_id,
        selectedSize:variant.catalogue_variant_size_id,
        productDescription:attributes.description
      })
    }

  }


  getVariantImages = (variant: CatalogueVariantAttributes) => {
    const image_keys: Array<keyof CatalogueVariant['attributes']> = ['front_image', 'side_image', 'back_image']
    const variantImages: S['productImages'] = [];
    if (!variant.front_image && !variant.back_image && !variant.side_image) {
      variantImages.push({ id: 'no-image', uri: 'https://i.ibb.co/8Nb9QHL/image.png' })
    } else {
      image_keys.forEach(key => {
        if (variant[key]) {
          variantImages.push({ id: key, uri: variant[key] })
        }
      })
    }
    return variantImages;
  }

  getOutOfStockDStatus = (variant: CatalogueVariantAttributes) => {
    if (!variant.stock_qty || variant.stock_qty <= 0) {
      return true
    } else { return false }
  }

  getSkuValue = (variant: CatalogueVariantAttributes) => {
    if (variant.sku) {
      return variant.sku
    }
    else return ""
  }


   extractUniqueVariants=(variant: any[], variantType: string) =>{
    const uniqueVariantsSet = new Set<string>();
    variant.forEach((variant: any) => {
      const variantData = variant.attributes[`catalogue_variant_${variantType}`];
      if (variantData && variantData.id) {
        uniqueVariantsSet.add(JSON.stringify({
          id: variantData.id,
          name: variantData.name
        }));
      }
    });
    return Array.from(uniqueVariantsSet).map((variantString: string) => JSON.parse(variantString));
  }


  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async componentDidMount(): Promise<void> {
    this.getToken();

    this.props.navigation.addListener("willFocus", async () => {
      this.getToken();
      if(this.state.token.length>1){
      this.fetchTheCatalogueDetails()}
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({localCurrency:currencyGet})
    });
  }

  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  fetchTheCatalogueDetails = async () => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getCatalogueDetailsApiMsgCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCatalogueDetailsApiEndPoint + Number(this.state.catalogueId)
    );

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

  viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100
  }
  priceConvertValue = (value: string) => {
    if (value === null) {
      return '0';
    } else return parseFloat(value)
  }

  onViewableItemsChanged = ({ viewableItems }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems[0]) {
      this.setState({ productImageIndex: viewableItems[0].index! })
    }
  }
  navigatesToEditProductPage=()=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEditProductMessage)
    );
    msg.addData(getName(MessageEnum.ProductDetailsData), this.state.productDetailsData);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  compareAndViewTheVariants = (colorId: string | number, sizeId: string | number,type:string) => {
    const variants = this.state.productDetailsData.attributes.catalogue_variants;

  
    const numericColorId = Number(colorId);
    const numericSizeId = Number(sizeId);

   
    const matchingVariant = variants.find((variant:CatalogueVariant) => {
        const attributes = variant.attributes;
        return (
            attributes.catalogue_variant_color_id === numericColorId &&
            attributes.catalogue_variant_size_id === numericSizeId
        );
    });

    
    if(matchingVariant){
     
      const outOfStock = this.getOutOfStockDStatus(matchingVariant.attributes);
      const sku = this.getSkuValue(matchingVariant.attributes);

      this.setState({
     
        isProductoutOfStock: outOfStock,
        sku: sku,
        productPrice:matchingVariant.attributes.price,
      })
      if(type==="color"){
        const images = this.getVariantImages(matchingVariant.attributes);

      this.setState({
        productImages: images,
      
      })
      }
    }
    
}


  dropDownpUpdatedColorValue=(item:{name:string,id:string})=>{
    this.setState({selectedColor:item.id})
    this.compareAndViewTheVariants(item.id,this.state.selectedSize,"color")
    
  }
  dropDownpUpdatedSizeValue=(item:{name:string,id:string})=>{
    this.setState({selectedSize:item.id})
    this.compareAndViewTheVariants(this.state.selectedColor,item.id,"size")
   
  }

  catalogueDetailRedirection = () => {
    const messageOrder: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    messageOrder.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'ProductDetails1'
    );
    messageOrder.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessageOrder: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessageOrder.addData(getName(MessageEnum.productIDMessage),this.state.catalogueId);
    raiseMessageOrder.addData(getName(MessageEnum.ShowByStoreId), true);
    messageOrder.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageOrder);
    this.send(messageOrder);
  };
  
  handleProduct = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "ProductAnalytics"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.LoginOptionsNavigationDataMessage),
      {id: this.state.productDetailsData.id}
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
  }
  // Customizable Area End
}
