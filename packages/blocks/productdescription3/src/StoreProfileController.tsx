import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { StoreInfoAttributes,CatalogueListing, FiltersPayload } from "./response";
import { showAlert } from "../../../components/src/CustomAlert";
import { EmitterSubscription } from "react-native";
import { getStorageData } from "framework/src/Utilities";
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
  productListData: any;
  token: string;
  isloading: boolean;
  isWishSelected: boolean;
  shopOneData: any;
  storeOneBgImg: string;
  storeName: string;
  storeAddress: string;
  contactNumber: string;
  driverInstruction: string;
  storeHrs: any;
  storeId: string;
  catalogArray: any
  // Customizable Area Start
  storeData: StoreInfoAttributes;
  detailAddress: string,
  imgState: string,
  storeOpratingData: any,
  storeSearchTxt: string,
  localCurrency:string;
  localLanguage:string;
  filters: FiltersPayload["filters"];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class StoreProfileController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getShopListApiCallId: any;
  getcatalogListApiCallId: any;
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      productListData: [
        {
          id: '0',
          title: 'First Item',
        },
        {
          id: '1',
          title: 'Second Item',
        },
        {
          id: '2',
          title: 'Third Item',
        },
      ],
      token: "",
      isloading: false,
      isWishSelected: false,
      shopOneData: {},
      storeOneBgImg: '',
      storeName: '',
      storeAddress: '',
      contactNumber: '',
      driverInstruction: '',
      storeHrs: {},
      storeId: '',
      catalogArray: [],
      storeData: {
        store_name: '',
        description: null,
        area: '',
        block: '',
        address: '',
        mall_name: null,
        floor: '',
        unit_number: null,
        city: '',
        zipcode: '',
        driver_instruction: '',
        average_shipping_time: '',
        payment_mode: [],
        store_operating_hours: {
          'monday':{
            open: '',
            close: '',
            is_open: false,
          }
        },
        status: '',
        latitude: null,
        longitude: null,
        is_open: false,
        available_variants: [],
        image: null,
        email: '',
        contact_number: {
          country_code: '',
          phone_number: '',
        },
        expected_delivery_time: '',
      },
      detailAddress: '',
      imgState: '',
      storeOpratingData: {},
      storeSearchTxt: '',
      localCurrency:'',
      localLanguage:i18n.language,
      filters: {
        sizes: [],
        colors: [],
        stores: [],
        categories: [],
        subCategory: [],
        sort: "",
      },
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
        const filters = this.props.navigation.getParam(
          "filters",
          this.state.filters
        );
        this.callAfterGettingFilters(filters)
      }
    );
  }
  
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  getToken = () => {
    const tokenMessage: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMessage);
  };


  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("Message Recived", message);
    this.getTokenID(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseAllId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.setState({ isloading: false })
      if (responseJson) {
        this.manageSuccessCallBack(responseJson, responseAllId)
      }
      if (errorReponse) {
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getTokenID = async(message: Message) => {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const storeid = message.getData(getName(MessageEnum.storeIDMessage));
      if(storeid != undefined)
      {
        let token = await getStorageData('token',true)
        this.setState({ storeId: storeid,token:token }, () => {
          this.getshopdetailRequest();
          this.getcatalogList(this.state.storeSearchTxt,token)
        });
      }else{
        this.getshopdetailRequest();
      }
    } 
  }

  manageSuccessCallBack = (responseJson: any, responseId: any) => {
    if (responseId === this.getShopListApiCallId) {
      this.shopOneDesCallBack(responseJson)
    } else if (responseId === this.getcatalogListApiCallId) {
      this.catalogListCallBack(responseJson)
    }
  }

  catalogListCallBack = (responseJson: any) => {
    if (responseJson.errors) {
      this.setState({ catalogArray: [] })
    } else {
      const data = responseJson.data
      const prev_data = this.state.catalogArray
      if (data !== null) {
        this.setState({ catalogArray: [...prev_data, ...data], })
      }
      this.setState({ catalogArray: responseJson.data })
    }
  }

  callAfterGettingFilters = (filters: FiltersPayload["filters"]) => {
    this.setState({ filters }, () => {
      this.getcatalogList(this.state.storeSearchTxt,this.state.token)
    });
  }
  
  shopOneDesCallBack = (responseJson: any) => {
    let resData = responseJson?.data?.attributes
    this.setState({
      shopOneData: resData,
      storeOneBgImg: resData?.image,
      storeName: resData?.store_name,
      storeAddress: resData?.address,
      contactNumber: resData?.contact_number,
      driverInstruction: resData?.driver_instruction,
    });
    this.setState({ storeHrs: resData?.store_operating_hours })
  }

  priceConvertValue = (value: any) => {
    if (value === null) {
      return '0';
    }
    return value
  }

  getshopdetailRequest = () => {
    if (!this.state.storeId) {
      return;
    }
    let detailEndPoint = '';
    if(this.state.localLanguage === 'en')
    {
      detailEndPoint = configJSON.getShopdetailAPIEndpoint+this.state.storeId
    }else{
      detailEndPoint = configJSON.getShopdetailAPIEndpoint+this.state.storeId+'?language=ar'
    }
    this.setState({ isloading: true })
    const header = {
      "Content-Type": configJSON.validationApiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getShopListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      detailEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getFilterUri = (filters: FiltersPayload["filters"]) => {
    let query = "";
    const addFilter = (key: string, value?: string | string[] | null) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    };

    addFilter("min_price", filters.minPrice);
    addFilter("max_price", filters.maxPrice);
    addFilter("catalogue_variant_size_ids[]", filters.sizes.join(","));
    addFilter("catalogue_variant_color_ids[]", filters.colors.join(","));
    addFilter("category_ids[]", filters.categories.join(","));
    addFilter("sub_category_ids[]", filters.subCategory.join(","));
    addFilter("sort", filters.sort);
    return query;
  };

  getcatalogList = (storeSearchTxt: string,token:string | null) => {
    if (!this.state.storeId) {
      return;
    }
    this.setState({ isloading: true })
    let header = {}
    if(token != '')
    {
      header = {
        "Content-Type": configJSON.validationApiContentType,
        "token":token
      };
    }else{

      header = {
        "Content-Type": configJSON.validationApiContentType,
      };
    }

    const filtersUri = this.getFilterUri(this.state.filters);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getcatalogListApiCallId = requestMessage.messageId;
    const currency = this.state.localCurrency === "$"? 'dollar':'dinar';
    let endPoint = '';
    if(token != '' && token != null)
    {
      if (storeSearchTxt === '') {
        endPoint = configJSON.getCatalogueWithTokenApiEndPoint + `${this.state.storeId}${filtersUri}`
      } else {
        endPoint = configJSON.getCatalogueWithTokenApiEndPoint + `${this.state.storeId}&search=${storeSearchTxt}${filtersUri}`
      }
    }else{
      if (storeSearchTxt === '') {
        endPoint = configJSON.getCatalogueWithOutTokenApiEndPoint + `${this.state.storeId}&currency=${currency}${filtersUri}`
      } else {
        endPoint = configJSON.getCatalogueWithOutTokenApiEndPoint + `${this.state.storeId}&search=${storeSearchTxt}&currency=${currency}${filtersUri}`
      }
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToStoreDetailScreen = () => {
    this.props.navigation.navigate('StoreDetailsScreen', {
      storeData: this.state.shopOneData,
      address: this.state.storeAddress,
      imgState: this.state.storeOneBgImg,
      storeOpratingData: this.state.storeHrs
    })
  }

  searchstoreCatalog = (text: string) => {
    this.getcatalogList(text,this.state.token)
  }

  storeCatalogueDetailRedirection = (catalogueId: string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), catalogueId);
    message.addData(getName(MessageEnum.ShowByStoreId), false);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  toggleWishlistItem = (catalogue: CatalogueListing) => {
    if (this.state.token) {
      this.setState(({ catalogArray }) => {
        const updatedArrayItem = [...catalogArray];
        const catalogueIndex = updatedArrayItem.findIndex(
          (catalogueRef) => catalogue.id === catalogueRef.id
        );
        updatedArrayItem[catalogueIndex].attributes.is_wishlist =
          !catalogArray[catalogueIndex].attributes.is_wishlist;
        return { catalogArray: updatedArrayItem };
      });
      if (catalogue.attributes.is_wishlist) {
        this.removeWishlistItem(catalogue.id);
      } else {
        this.addWishlistItem(catalogue.id);
      }
    } else {
      showAlert({
        messsage: i18n.t('youNeedToSignInToCreateWishlist'),
        okButton: {
          text: i18n.t('signInCat'),
          onPress: () => {
            this.navigateToSignIn();
          },
        },
        cancelButton: { text: i18n.t('cancelText') },
      });
    }
  };

  addWishlistItem = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.addToWishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: {
          favouriteable_id: catalogueId,
        },
      }),
    });

    runEngine.sendMessage(messsage.messageId, messsage);
  };

  removeWishlistItem = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.removeFromWishlistEndpoint + String(catalogueId),
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
    });

    runEngine.sendMessage(messsage.messageId, messsage);
  };

  goToFilter = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCatalogueFilterMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.CatalogueFilters), {
      backKey: this.props.navigation.state.key,
      filters: this.state.filters,
      from: "store",
    });
    this.send(message);
  };

  navigateToSignIn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  capitalizeFirstLetter=(value:string)=> {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  // Customizable Area End
}
