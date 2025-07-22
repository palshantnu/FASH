import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { EmitterSubscription } from "react-native";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { showMessage } from "react-native-flash-message";
import {
  WishlistResponse,
  YouMayAlsoLikeResponse,
  YouMayAlsoLike,
} from "../__tests__/__mocks__/types";
import { getStorageData, setStorageData } from "framework/src/Utilities";
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  token: string;
  loading: boolean;
  wishlist: WishlistResponse;
  youMayAlsoLike: YouMayAlsoLike[];
  wishlistClientUserId:string |number;
  fromWishlist:boolean;
  clientWshlistName:string;
  stylistPersonal:boolean;
  selectedLanguage:string;
  localCurrency:string,
  languageType:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Wishlist2Controller extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getWishlistApiCallId = "";
  addWishlistApiCallId = "";
  removeWishlistApiCallId = "";
  getYouMayAlsoLikeApiCallId = "";
  apiForStylistWishlistCallId = "";
  stylistPersonalWishlistApiId="";
  addedToWishList = false;
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationScreenNameMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.NavigationTargetMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loading: true,
      token: "",
      wishlist: {} as WishlistResponse,
      youMayAlsoLike: [],
      wishlistClientUserId:"",
      fromWishlist:false,
      clientWshlistName:"",
      stylistPersonal:false,
      selectedLanguage:i18n.language,
      localCurrency:"",
      languageType:"en"
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
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, () => {
        this.getWishlist();
        this.getYouMayAlsoLike();
      });
      return;
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const NavigationData = message.getData(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      // fromDashboardAsBuyer
     
      const msgData = message.getData(
        getName(MessageEnum.wishlistIdMessage)
      );
      if(NavigationData?.fromDashboardAsBuyer)
        {
this.setState({stylistPersonal:true,fromWishlist:false,wishlistClientUserId:NavigationData?.data})
this.apiForStylistWishlist(NavigationData?.data,true)
            return
        }
      if(msgData)
        {
          this.setState({wishlistClientUserId:msgData.data},()=>{
           })
           if(msgData.fromWishlist)
            {
               this.setState({fromWishlist:true,clientWshlistName:msgData?.clientWshlistName})
               this.apiForStylistWishlist(msgData?.data,false)
            }
            else{
              this.setState({fromWishlist:false})
            }
        }
     
      
    }
    
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      return this.handleApiResponses(message);
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
  componentDidMount = async () => {
    this.send(new Message(getName(MessageEnum.SessionRequestMessage)));
    this.focusListener = this.props.navigation.addListener("willFocus",async () => {
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({localCurrency:currencyGet})
      this.callfunctionForLanguage()
      if (this.state.token) {
        this.setState({selectedLanguage:i18n.language})
        this.addedToWishList = false;
        if(this.state.fromWishlist)
          {
            this.apiForStylistWishlist(this.state.wishlistClientUserId, false)
          }
          else if(this.state.stylistPersonal)
            {
              this.apiForStylistWishlist(this.state.wishlistClientUserId,true)
            }
            else{
              this.getWishlist();
              this.getYouMayAlsoLike();
            }
      }
    });
   };

   callfunctionForLanguage = async() =>{
    let languagegetfrmstorage = await getStorageData('FA_LANGUAGE_ST')
    if(languagegetfrmstorage){            
      this.setState({languageType:languagegetfrmstorage})
    }
   }
 
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  handleApiResponses = (message: Message) => {
    const apiCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const response = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (apiCallId === this.getWishlistApiCallId) {
      this.getWishlistApiCallId = "";
      if (this.addedToWishList) {
        showMessage({
          message: i18n.t("addedtowishlist"),
          type: "success",
          position: { top: 8 },
        });
        this.addedToWishList = false;
      }
      return this.setState(({ loading }) => ({
        wishlist: response,
        loading: this.getYouMayAlsoLikeApiCallId ? loading : false,
      }));
    }
    if (apiCallId === this.removeWishlistApiCallId) {
      showMessage({
        type: "success",
        position: { top: 8 },
        message:i18n.t("Theitemhasbeenremoved"),
      });
      return this.setState({ loading: false });
    }
    if (apiCallId === this.addWishlistApiCallId) {
      this.addedToWishList = true;
      this.getWishlist();
      this.getYouMayAlsoLike();
      return;
    }
    if (apiCallId === this.getYouMayAlsoLikeApiCallId) {
      return this.handleYouMayAlsoLike(response);
    }
    if(apiCallId==this.apiForStylistWishlistCallId)
      {
        let modiFiedData={...response}
        modiFiedData.data.push({forStylist:true})
        this.setState({wishlist:modiFiedData},()=>{
        })
      }
      if(apiCallId==this.stylistPersonalWishlistApiId)
        { 
          this.setState({wishlist:response})
        }
  };

  getWishlist = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.wishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.getMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });

    this.setState({ loading: true });
    this.getWishlistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  removeWishlist = (catalogueId: number|string) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.wishlistRemoveEndpoint + `${catalogueId}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });

    this.removeWishlistApiCallId = message.messageId;
    if(!this.state.fromWishlist)
      {
        this.setState(({ wishlist }) => ({
          wishlist: {
            ...wishlist,
            data: wishlist.data.filter(
              (item) => item.attributes.favouriteable_id !== catalogueId
            ),
          },
          loading: true,
        }));
      }
      else{
        let wishListdata:any=[...this.state.wishlist.data]
      let popped=  wishListdata.pop()
      console.log(wishListdata,"wishListdata")
      let FilteredWishlist=wishListdata.filter(
        (item:any) => item.attributes?.favouriteable_id !== catalogueId
      )
       FilteredWishlist.push(popped)
       this.setState({wishlist:{
        data:FilteredWishlist,
       },loading:true})
      }
  
    runEngine.sendMessage(message.messageId, message);
  };

  addWishlist = (catalogueId: number | string) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.wishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.postMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: { favouriteable_id: catalogueId },
      }),
    });

    this.setState({ loading: true });
    this.addWishlistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  handleYouMayAlsoLike = (apiResponse: YouMayAlsoLikeResponse) => {
    this.getYouMayAlsoLikeApiCallId = "";
    if (Array.isArray(apiResponse.data)) {
      this.setState(({ loading }) => ({
        youMayAlsoLike: apiResponse.data
          .filter((item) => !item.attributes.is_wishlist)
          .slice(0, 2),
        loading: this.getWishlistApiCallId ? loading : false,
      }));
    } else {
      this.setState({ loading: false });
    }
  }

  goToProduct = (catalogueId: number | string) => {
    const message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.initializeFromObject({
      [getName(MessageEnum.productIDMessage)]: catalogueId,
      [getName(MessageEnum.ShowByStoreId)]: false,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };

  parsePrice = (price: string) => {
    return "$" + parseFloat(price).toFixed(2);
  };

  getYouMayAlsoLike = async() => {
    const latLong = await getStorageData("buyerCoordinateAddressMap", true);
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.getCatalogueListEndpoint+"&latitude=" + latLong.buyLat + "&longitude=" + latLong.buyLong,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.getMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });

    this.getYouMayAlsoLikeApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  goBack = () => this.props.navigation.goBack();
  navigateToCategory =async () => {
   await setStorageData("stylistFromwishlist",JSON.stringify({isStylist:true,wishlistId:this.state.wishlistClientUserId}))
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "CategoryNavigation"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), {fromWishlist:true});
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs);

  };
  apiForStylistWishlist=(wishlistId:number|string,stylistpersonal:boolean)=>{
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
  
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if(stylistpersonal)
      {

        this.stylistPersonalWishlistApiId=requestMessage.messageId;
      }
      else{
        this.apiForStylistWishlistCallId = requestMessage.messageId;
      }
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.wishlistEndpoint+"?wishlist_id="+wishlistId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
   
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  
  returnHeading=()=>{
    if(this.state.fromWishlist)
      {
        return this.state.clientWshlistName
      }
      else{
        return i18n.t("Wishlist")
      }
  }
  returntextAlign=()=>{
   if(this.state.selectedLanguage=="en")
    {
      return "left"
    }
    else{
      return "right"
    }
  }
  
  goBacktolanding=()=>{
    if(this.state.fromWishlist) {
      this.goBack();
      return;
    }
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "LandingPage"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs);
  }
  // Customizable Area End
}
