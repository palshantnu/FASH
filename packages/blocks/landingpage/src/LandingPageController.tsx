import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { AddressResponse,Address } from "../../addressmanagement/src/responses";
import { createRef, MutableRefObject } from "react";
import {
  EventSubscription,
  Linking,
  PermissionsAndroid,
  Platform,
  Alert
} from "react-native";
import { getUniqueId } from "react-native-device-info";
import { showMessage } from "react-native-flash-message";
import { CartResponses } from "./responses";
import { showAlert } from "../../../components/src/CustomAlert";
import { setStorageData,getStorageData } from "../../../framework/src/Utilities";
import Geolocation from "react-native-geolocation-service";

import Geocoder from "react-native-geocoding";
interface MapLocationProps {
  lat: number;
  lng: number;
}

interface MapGeomatryProps {
  location: MapLocationProps;
}

interface RequestProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface MapProps {
  formatted_address: string;
  geometry: MapGeomatryProps;
}

interface RegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
import { setupNotification } from "../../../components/src/Notificationservices/NotificationService";
import messaging from '@react-native-firebase/messaging';
import i18n from "../../../components/src/i18n/i18n.config";
import { removeStorageData } from "framework/src/Utilities";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";
export interface CatalogueListing {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    primary_image: string | null;
    primary_price: string;
    is_wishlist?: boolean;
    primary_discounted_percentage?:string;
    primary_main_price:string;
    primary_store_name:string;
    primary_brand_name:string;
  };
}

interface LandingPageContentAttributes {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link_type: string,
  link_id: number,
  link: string;
  rank: number;
  created_at: string;
  updated_at: string;
  image: string;
  app_image:string
}
export interface LocationAttributes {
  id: string,
  type: string,
 attributes :{ 
  name: string,
  country_code: string,
  phone_number: string,
  contact_number: string,
  street: string,
  zipcode: string,
  area: string,
  block: string,
  city: string | null,
  house_or_building_number: string | null,
  floor: null | string,
  address_name: string,
  is_default: boolean,
  latitude: number,
  longitude: number,
  is_default_1:boolean
}
}
export interface LandingPageContent {
  id: string;
  type: string;
  attributes: LandingPageContentAttributes;
}
export interface HomeCategory {
  id: number;
  name: string;
  value: string;
}

interface ApiResponseForCatalogueList {
  errors: string;
  data: CatalogueListing[];
  meta: {
    total_pages: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
  };
}
interface ApiResponseForContentManagementList {
  data: LandingPageContent[];
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
  address:string;
  addressList:Array<Address> | null;
  homeBannerArr: LandingPageContent[];
  CarouselIndex: number;
  homeCategoryArr: HomeCategory[];
  categorySelectStatus: HomeCategory;
  loading: boolean;
  locationModel:boolean;
  homeCatalogueArr: CatalogueListing[];
  token: string;
  cartItemCount: string;
  titleContent: string;
  subTitleContent: string;
  nextPage: number | null;
  latitude: number|null;
  longitude: number|null;
  latdelta: string;
  longdelta: string;
  region: RegionProps;
  addressselected: string;
  errorMess: string;  hasNewNotification: boolean;
  localCurrency:string;
  addressName:string | null;
  fullAddress : LocationAttributes | null;
  backupDefaultAddressId:string|null;
  checkoutId:number|null;
  loadingCat:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  cartApiCallId = "";
  getCategorysApiCallId = "";
  getCatalogueApiMsgCallId: string = "";
  addWishlistApiCallId = "";
  removeWishlistApiCallId = "";
  getTitleContentApiCallId = "";
  apiGetAllAddressCallId = "";
  apiDeleteAddressCallId ="";
  isFocused: MutableRefObject<boolean | null>;
  willFocusListener: EventSubscription | null = null;
  willBlurListener: EventSubscription | null = null;
  focusListener :EventSubscription | null = null;
  getCarouselListApiMsgCallId: string = "";
  googlePlacesRef: React.RefObject<any> = createRef();
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    Geocoder.init(configJSON.API_KEY);
    this.state = {
      address:"",
      addressList: [],
      homeBannerArr: [],
      CarouselIndex: 0,
      locationModel:false,
      homeCategoryArr: [
        {
          id: 1,
          name: "TRENDING",
          value: "trending",
        },
        {
          id: 2,
          name: "NEW LAUNCHES",
          value: "new_launches",
        },
        {
          id: 3,
          name: "RECOMMENDATION",
          value: "recommendations",
        },
      ],
      categorySelectStatus: { id: 1, name: i18n.t('trendingtabtitle'), value: "trending" },
      loading: false,
      homeCatalogueArr: [],
      token: "",
      cartItemCount: "",
      titleContent: "",
      subTitleContent: "",
      nextPage: null,
      latitude: null,
      longitude: null,
      latdelta: "0.0922",
      longdelta: "0.0421",
      region: {
        latitude: 29.378586,
        longitude: 47.990341,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      addressselected: "",
      errorMess: "",
      hasNewNotification: false,
      localCurrency:"",
      addressName:"",
      fullAddress: null,
      backupDefaultAddressId: null,
      checkoutId:0,
      loadingCat:true,
    };
    this.googlePlacesRef = createRef();
    this.isFocused = createRef();
    this.isFocused.current = true;
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({addressName:i18n.t('deliveringTo')})
      this.setState({ token: token, homeCatalogueArr: [] }, () => {
        if (this.isFocused.current) {
          this.getCartCount(token);
           this.fetchTheCarouselList();
          this.getTitleContentApiFun();
          this.loadAddresses(token);
          this.getStoreDataAddress();
        }
      });
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponse(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  languageChangeUnsubscribe: any = null;

  async componentDidMount(): Promise<void> {
    this.getToken();
    this.getBuyercurrentlatlogn();
    this.getOneTimeLocation();
    if (i18n.on) {
      this.languageChangeUnsubscribe = i18n.on('languageChanged', this.handleLanguageChange);
    }
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });

       messaging().onMessage(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });
         setupNotification(this.props)
        this.isFocused.current = true;
        this.getToken();
        this.checkPopupOpen();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );
    this.focusListener = this.props.navigation.addListener("willFocus", async () => {
      this.loadAddresses(this.state.token);
      this.getStoreDataAddress(); 
    });
  }
  getStoreDataAddress = async () => {
      let localObjectAddress = await getStorageData("buyerAddAddressMap", true);
      this.getStoreAddress(localObjectAddress);
    };

    getStoreAddress = async (localObjectAddGet: any) => {
      if (localObjectAddGet !== null) {
        this.setState({
          address: localObjectAddGet.addressselected,
          latitude: localObjectAddGet.latitude,
          longitude: localObjectAddGet.longitude,
        },()=>{this.fetchTheCatalogues(this.state.categorySelectStatus.value, 1)});
      }
    };

  async componentWillUnmount(): Promise<void> {
    // Remove language change listener
    if (this.languageChangeUnsubscribe && i18n.off) {
      i18n.off('languageChanged', this.handleLanguageChange);
    }
  }

  handleLanguageChange=()=> {
    let temp = this.state.addressName;
    if (temp == "Delivering to" || temp == "التوصيل الى") {
      this.setState({ addressName: i18n.t("deliveringTo") });
    }
  }

  loadAddresses = (token: string) => {
   
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAddressApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );

    this.apiGetAllAddressCallId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  checkPopupOpen = async() =>{
   const popupOpenValue = await getStorageData('Location_Recirect',true)   
    if(popupOpenValue){
      this.setState({locationModel:true})
      await removeStorageData("Location_Recirect");
    }
    
  }

  getBuyercurrentlatlogn = async () => {
    const granted = await this.requestPermission();
    let data = (await this.requestFromLocation(granted)) as RequestProps;

    let buyerLatitude = data.coords.latitude;
    let buyerLongitude = data.coords.longitude;
    this.setState({ latitude: buyerLatitude, longitude: buyerLongitude });
    
    Geocoder.from(buyerLatitude, buyerLongitude)
      .then(async (json) => {
        let addressComponent = json.results[0].formatted_address;
        let buyerCoordinates = {
          buyLat: data.coords.latitude,
          buyLong: data.coords.longitude,
          addressselected: addressComponent,
        };
       this.setLatLongForCatelogues(buyerCoordinates)
        setupNotification(this.props)
      })
      .catch((error) => this.setState({ errorMess: error }));
  };

  setLatLongForCatelogues = async(buyerCoordinates:any) =>{
    await setStorageData(
      "buyerCoordinateAddressMap",
      JSON.stringify(buyerCoordinates)
    );
  }

  handleClearInput = () => {
         this.googlePlacesRef.current.setAddressText('');
 };

  requestPermission = async () => {
    if (Platform.OS === "ios") {
      return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      return await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, {
        title: "Why We Need Your Location:",
        message:
          "To provide you with our express 2-hour delivery, we need your location to show you suitable stores within this timeframe. Without it, we can’t fulfill our promise to deliver on time.",
        buttonPositive: "Ok",
      });
    }
  };

  requestFromLocation = (checkPer  : string) => {
    this.setState({ locationModel: false });
    return new Promise(async (resolve) => {
      try {
        if (checkPer === RESULTS.GRANTED) {
          resolve(this.fetchLocation());
          resolve(this.subscribeToLocation());
        } else {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };

          resolve(position);
        }
      } catch (_error) {
        let position = {
          coords: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          },
        };
        resolve(position);
      }
    });
  };

  requestFromLocationAgain = async() => {
    await removeStorageData('address_id'); 
    this.setState({ locationModel: false });
    return new Promise(async (resolve) => {

      const checkPermission = async () => {
        if (Platform.OS === "ios") {
          return await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
          return await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
      };
  
      try {
        const hasPermission = await checkPermission(); 
        if (hasPermission === RESULTS.GRANTED) {
          resolve(this.fetchLocation());
          resolve(this.subscribeToLocation());
        } else {
          const granted = await this.requestPermission();
          if (granted === RESULTS.GRANTED) {
            resolve(this.fetchLocation());
            resolve(this.subscribeToLocation());
          } else {
            Alert.alert(
              "Location Permission Denied",
              "Location access is required for this feature. Please enable it from settings or allow it in the popup.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Enable Location",
                  onPress: () => openSettings(),
                },
              ]
            );
            let position = {
              coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
            };
            resolve(position);
          }
        }
      } catch (_error) {
        let position = {
          coords: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          },
        };
        resolve(position);
      }
    });
  };
  
  fetchLocation = () => {
    this.setState({addressName:i18n.t('deliveringTo'),loading:true})
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            address: "",
            loading:false,
            fullAddress:null,
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            homeCatalogueArr:[] 
          });
          let buyerCoordinates = {
            buyLat: position.coords.latitude,
            buyLong: position.coords.longitude,
            addressselected: "",
          };
          removeStorageData('address_id')
         this.setLatLongForCatelogues(buyerCoordinates)
          resolve(position);
        },
        () => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
      this.getOneTimeLocation();
    });
  };

  subscribeToLocation = async() => {
    return new Promise((resolve) => {
      Geolocation.watchPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            loading:false
          });
          resolve(position);
        },
        (_error) => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  };
  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  // Function to call api for getting title and subtitle
  getTitleContentApiFun = async () => {
    let deviceId = await getStorageData('USER_FCM_TOKEN')
    let header: object

    if(this.state.token){
      header = {
        "Content-Type": configJSON.exampleApiContentType,
        token:this.state.token
      };
    }else{
      header = {
        "Content-Type": configJSON.exampleApiContentType,
      };
    }
    let language= i18n.language==='ar' && 'Arabic'
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getTitleContentApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getTitleContent}?device_id=${deviceId}&language=${language}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  getCatagoryTabAccordingToLogin = () => {
    const categoryArr = [
      {
        id: 1,
        name: i18n.t('trendingtabtitle'),
        value: "trending",
      },

      {
        id: 2,
        name: i18n.t('newLaunchestabtitle'),
        value: "new_launches",
      },
    ];

    if (this.state.token) {
      categoryArr.push({
        id: 3,
        name: i18n.t('recommededtabtitle'),
        value: "recommendations",
      });
    }

    return categoryArr;
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
      if (responseId === this.apiGetAllAddressCallId) {
        this.setState({ loading: false });
        this.getAddressResponseHandler(successResponse, errorResponse);
      }else if(responseId === this.apiDeleteAddressCallId){
        this.loadAddresses(this.state.token)
        this.setState({ loading: false });   
        Alert.alert('Address Deleted','Address deleted successfully.')      
      }
      else{
      this.handleSuccessResponse(successResponse, responseId);
      }
    } else {
      this.parseApiCatchErrorResponse(errorResponse);
      this.setState({ loading: false });
    }
  };
  getAddressResponseHandler = async(
    responseJson: AddressResponse,
    errorResponse: unknown
  ) => {  
    this.setState({homeCatalogueArr:[]}) 
    if (responseJson !== null) {
      this.handleAddressCondition(responseJson)
    }
    
    this.parseApiCatchErrorResponse(errorResponse);
  };

  handleAddressCondition = async(responseJson:AddressResponse)=>{
    if ("data" in responseJson) {
      let addresses = responseJson.data;
      let backupDefault = "";    
      try {
        const savedId = await getStorageData('address_id', true); 
        if (savedId !== null) {
          addresses = addresses.map((item) => {
            const isDefault = item.id === savedId.toString();
            if (isDefault) {
              backupDefault = item.id;
            }
            return {
              ...item,
              attributes: { ...item.attributes, is_default_1: isDefault },
            };
          });
          this.handleDefaultAddress(savedId.toString());
        }else{
          this.fetchTheCatalogues(this.state.categorySelectStatus.value, 1);
        }

        return this.setState({
          addressList: addresses,
          backupDefaultAddressId: backupDefault,
          loading: false,
        });

      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    }else{
      this.fetchTheCatalogues(this.state.categorySelectStatus.value, 1);
    }
  }
  handleSuccessResponse = (response: unknown, messageId: string) => {
    const handleCartResponse = (cart: CartResponses) => {
      this.setState({
        cartItemCount: cart.data ? String(cart.data.attributes.order_item_count) : "",
      });
    };

    const handleCategoryResponse = (responseJson: any) => {
      this.subCategoryPageRedirection(responseJson.data);
    };

    const handleTitleContentResponse = (response: any) => {
      console.log("+====", response)
      this.setState({
        titleContent: response.data.attributes.title,
        subTitleContent: response.data.attributes.subtitle,
      });
    };

    const handleCatalogueResponse = (catalogueList: ApiResponseForCatalogueList) => {
      if (catalogueList.data && catalogueList.data.length > 0) {
        this.setState((prevState) => ({
          homeCatalogueArr: [
            ...prevState.homeCatalogueArr,
            ...catalogueList.data,
          ],
          nextPage: catalogueList.meta.next_page || null
        }));
      } else {
         this.setState({
          homeCatalogueArr: [],
          nextPage: null,
          loadingCat: false,
        });
        this.state.token && showMessage({
          message: catalogueList?.errors,
          position: { top: 0 },
        });

      }
    };

    const handleCarouselResponse = (carouselList: ApiResponseForContentManagementList) => {
      this.setState({
        homeBannerArr: carouselList.data || [],
      });
    };

    const handleWishlistResponse = (message: string) => {
      showMessage({
        type: "success",
        position: { top: 8 },
        message,
      });
      this.setState({ loading: false });
    };

    if (this.cartApiCallId === messageId) {
      handleCartResponse(response as CartResponses);
    } else if (messageId === this.getCategorysApiCallId) {
      handleCategoryResponse(response as any);
    } else if (this.getTitleContentApiCallId === messageId) {
      handleTitleContentResponse(response as any);
    } else if (this.getCatalogueApiMsgCallId === messageId) {
      handleCatalogueResponse(response as ApiResponseForCatalogueList);
      this.setState({ loadingCat: false });
    } else if (this.getCarouselListApiMsgCallId === messageId) {
      handleCarouselResponse(response as ApiResponseForContentManagementList);
    } else if (this.addWishlistApiCallId === messageId) {
      handleWishlistResponse(configJSON.addWishlistSuccessMsg);
    } else if (this.removeWishlistApiCallId === messageId) {
      handleWishlistResponse(configJSON.removeWishlistSuccessMsg);
    }
  };


  selectStatus = (item: HomeCategory) => {
    this.setState({ categorySelectStatus: item });
    this.setState(
      {
        homeCatalogueArr: [],
      },
      () => {
        this.fetchTheCatalogues(item.value, 1);
      }
    );
  };

  priceConvertValue = (value: unknown) => {
    if (value === null) {
      return "0";
    } else {
      return value;
    }
  };

  goToCart = () => {
    const message = new Message(
      getName(MessageEnum.NavigationShoppingCartOrdersMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    runEngine.sendMessage(message.id, message);
  };

  getCartCount = (token: string) => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: token,
    };
    const endpoint =
      (token
        ? configJSON.cartApiEndpoint
        : configJSON.getGuestCartApiEndpoint) +
      `?unique_token=${getUniqueId()}`;

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.cartApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(message.id, message);
  };

  fetchTheCatalogues = async (value: string, currentPage: number) => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCatalogueApiMsgCallId = message.messageId;
    let endPoint = this.state.token
    ? configJSON.getAfterCatalogueListEndPoint
    : configJSON.getCatalogueListEndPoint;
    let currency = this.state.localCurrency === "$"?"&currency=dollar":"&currency=dinar";
    
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint + `page=${currentPage}&per_page=10&sort=${value}${currency}&latitude=${this.state.latitude}&longitude=${this.state.longitude}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loadingCat: true });
    runEngine.sendMessage(message.id, message);
  };

  fetchTheCarouselList = async () => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCarouselListApiMsgCallId = message.messageId;

    let language= i18n.language==='ar' && 'Arabic'
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getCarouselListForLandingPage}?language=${language}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  renderMoreCatalogue = () => {
    const { nextPage, categorySelectStatus } = this.state;
    if (nextPage !== null) {
      this.fetchTheCatalogues(categorySelectStatus.value, nextPage);
    }
  };

  catalogueDetailRedirection = (catalogueId: string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), catalogueId);
    message.addData(getName(MessageEnum.ShowByStoreId), false);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };


  handleCarsouelImageChange = (index: number) => {
    this.setState({ CarouselIndex: index });
  };

  addWishlist = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.addWishlistEndpoint,
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

    this.addWishlistApiCallId = messsage.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  rmWishlist = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.rmWishlistEndpoint + String(catalogueId),
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
    });

    this.removeWishlistApiCallId = messsage.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  toggleWishlistData = (catalogue: CatalogueListing) => {
    if (this.state.token) {
      this.setState(({ homeCatalogueArr }) => {
        const updatedArray = [...homeCatalogueArr];
        const catalogueIndex = updatedArray.findIndex(
          (ctlg) => catalogue.id === ctlg.id
        );
        updatedArray[catalogueIndex].attributes.is_wishlist =
          !homeCatalogueArr[catalogueIndex].attributes.is_wishlist;
        return { homeCatalogueArr: updatedArray };
      });
      if (catalogue.attributes.is_wishlist) {
        this.rmWishlist(catalogue.id);
      } else {
        this.addWishlist(catalogue.id);
      }
    } else {
      showAlert({
        messsage: "You need to sign in to create wishlist",
        okButton: {
          text: "Sign In",
          onPress: () => {
            this.navigateToSignIn();
          },
        },
        cancelButton: { text: "Cancel" },
      });
    }
  };

  truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };

  navigateToSignIn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  navigateToCatalogueHomeSearch = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCatalogueHomeSearchMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  btnNotificationRedirection = () => {
    this.setState({hasNewNotification:false})
    const message = new Message(
      getName(MessageEnum.NavigationNotificationsBuyer)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  loyatyRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationLoyaltyPoints)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }

  shopDetailRedirect = (shopId: number | string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationStoreProfileMessage)
    );
    message.addData(getName(MessageEnum.storeIDMessage), shopId);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  handleSliderPress = (item: any) => {
    let data = item.item.attributes;

    switch (data.link_type) {
      case "single_product":
        this.catalogueDetailRedirection(data.link_id)
        break;
      
      case "about_us":

        break;

      case "loyalty_point":
        // require to check for sign in
        this.loyatyRedirection()
        break;

      case "trending":
        this.selectStatus(this.state.homeCategoryArr[0])
        break;

      case "store_link":
        this.shopDetailRedirect(data.link_id)
        break;

      case "store_category":
        this.storeCategoryRedirection();
        break;

      case "product_category_sub_category":
        this.getCategoriresData(i18n.language);
        break;

      default:
        break;
    }
    
  }

  storeCategoryRedirection = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationCategoriesMessage)
    );
    message.addData(getName(MessageEnum.catalogueType), "store");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  
  getCategoriresData = (languageSet:string) => {
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCategorysApiCallId = requestMessage.messageId;
    if(languageSet === 'ar')
    {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.categoryAPIEndPoint+'?language=arabic'
      );
    }else{
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.categoryAPIEndPoint
      );
    }
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  subCategoryPageRedirection = (categoryItem: any) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationSubCateMessage)
    );
    message.initializeFromObject({
      [getName(MessageEnum.categoryIdMessage)]: categoryItem[0].id,
      [getName(MessageEnum.categoryNameMessage)]: categoryItem[0].attributes.name,
      [getName(MessageEnum.categoryArrMessage)]: categoryItem,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };
  goToAddAddress = async() => {
    this.hideLocationModel()
    await setStorageData('Location_Recirect',"true")    
    const message: Message = new Message(
      getName(MessageEnum.NavigationAddAddressMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  editAddress = async(addressId: string) => {
    if (this.state.addressList !== null) {
      const addressData = this.state.addressList.find(
        (address) => address.id === addressId
      )!;

      this.hideLocationModel()
     
      const message = new Message(
        getName(MessageEnum.NavigationAddAddressMessage)
      );
      message.initializeFromObject({
        [getName(MessageEnum.NavigationPropsMessage)]: this.props,
        [getName(MessageEnum.AddAddressMessage)]: {
          data: {
            ...addressData,
            attributes: {
              ...addressData.attributes,
              is_default_1: addressData.id === addressId,
            },
          },
          countryIndex: 0,
          comingFrom: "edit",
        },
      });
      this.send(message);
    }
    await setStorageData('Location_Recirect',"true")    
  };
  btnredirectMap=()=>{
    this.setState({locationModel:false})
    this.props.navigation.navigate("CustomformMap", {
      comingFrom: "buyerAddAddress",
    });
  }
  toggleAssignAddress = (id: string) => {
    this.setState(
      ({ addressList }) => {
        const updatedAddressList = addressList!.map((item) => ({
          ...item,
          attributes: {
            ...item.attributes,
            is_default_1: item.id.toString() === id.toString(),
          },
        }));
        return {
          loading: true,
          addressList: updatedAddressList,
          homeCatalogueArr:[]
        };
      },
    );
    this.handleAddressUpdate(id)
    this.handleDefaultAddress(id)
  };
  
  handleDefaultAddress = (id:string) => { 
    const selected = this.state.addressList!.find((address) => address.id === id);
    if (selected) {      
      const { house_or_building_number, street, area, block, zipcode } = selected.attributes;
      const fullAddress = [house_or_building_number, street, area, block, zipcode]
        .filter(Boolean)
        .join(', ');
      const addressName = selected.attributes.address_name
      this.setState({ 
        address: fullAddress,
        loading:false,
        addressName:addressName,
        fullAddress:selected,
        latitude:selected.attributes.latitude,
        longitude:selected.attributes.longitude,
        homeCatalogueArr:[] 
      });
      let buyerCoordinates = {
        buyLat: selected.attributes.latitude,
        buyLong: selected.attributes.longitude,
        addressselected: selected,
       };
      this.setLatLongForCatelogues(buyerCoordinates)
    }
    setTimeout(() => {      
      if(this.state.fullAddress){
        this.fetchTheCatalogues(this.state.categorySelectStatus.value, 1);
      } 
    }, 1500);
  };

  addressNameSet =() =>[
    this.setState({addressName:i18n.t('deliveringTo')})
  ] 

  showLocationModel=()=>{
    this.setState({locationModel:true})
  }
  hideLocationModel=()=>{
    this.setState({locationModel:false})
  }

  updateSuccessMessage = () =>{
   Alert.alert('Delivery Address Updated', 'Your delivery address has been updated successfully.');
   this.hideLocationModel()
  }

  handleAddressUpdate = async(id:string) => {
   await setStorageData('address_id',id)
  };
    
  selectAddress = async (details: MapProps | null) => {
    this.setState({locationModel:false})
    if (details) {
      this.setState({
        addressselected: details?.formatted_address,
        region: {
          ...this.state.region,
          latitude: details?.geometry.location.lat,
          longitude: details?.geometry.location.lng,
        },
      });
      let localObject = {
        addressselected: details?.formatted_address,
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng,
      };
      if (
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params.comingFrom === "buyerAddAddress"
      ) {
        setStorageData("buyerAddAddressMap", JSON.stringify(localObject));
      } else {
        await setStorageData("storeAddressMap", JSON.stringify(localObject));
      }
    }
  };
  getOneTimeLocation = () => {
    this.setState({locationModel:false})
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + "AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw")
        .then((response) => response.json())
            .then((responseJson) => {
              
            this.setState({
              address:responseJson.results[0]?.formatted_address,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              loading:false
            });
           
})
         
          resolve(position);
        },
        () => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  };

  deleteAddressButton = (addressId: string) => {    
    Alert.alert(i18n.t("Alert"), i18n.t("Are you sure you want to delete address"), [
      {
        text: i18n.t("No"),
        onPress: () => {},
        style: "cancel",
      },
      { text: i18n.t("Yes"), onPress: () => this.DdeleteAddressButton(addressId) },
    ]);
  };

  DdeleteAddressButton = (addressId: string) => {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };
    const requestMessageforDelete = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDeleteAddressCallId = requestMessageforDelete.messageId;
    requestMessageforDelete.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAddressAPiEndPoint + "/" + addressId
    );
    requestMessageforDelete.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessageforDelete.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteAddressApiMethod
    );
    runEngine.sendMessage(requestMessageforDelete.id, requestMessageforDelete);
  };

  handleGooglePlacesAutocomplete = (details: any) => {
    removeStorageData('address_id')
    this.setState({
      homeCatalogueArr:[],
      locationModel:false,
      addressName:i18n.t('deliveringTo'),
      address: details.formatted_address,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      region: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    },()=>{
      this.fetchTheCatalogues(this.state.categorySelectStatus.value, 1);
      this.loadAddresses(this.state.token)
      let buyerCoordinates = {
        buyLat: this.state.latitude,
        buyLong: this.state.longitude,
        addressselected: this.state.address,
      };
     this.setLatLongForCatelogues(buyerCoordinates)
    });
  }
  // Customizable Area End
}
