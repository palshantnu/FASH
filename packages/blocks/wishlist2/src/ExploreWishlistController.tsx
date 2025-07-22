import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { EmitterSubscription } from "react-native";
import {
  WishlistResponse,
  YouMayAlsoLike,
} from "../__tests__/__mocks__/types";
import { getStorageData } from "framework/src/Utilities";
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
  localCurrency:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ExploreWishlistController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getWishlistApiCallId = "";

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
      localCurrency:""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      return this.handleApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.getData();
    
    this.focusListener = this.props.navigation.addListener("willFocus",async () => {
      this.getData();
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({localCurrency:currencyGet})
      
    });
  };
  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token },()=>{
      this.getExploreWishlist()
    });
  };
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
     
       this.setState ({
        wishlist: response,
        loading:  false,
      });
    }
  
    
  };

  getExploreWishlist = async() => {
    let wishlist_id=await getStorageData("wishlist_id", true)
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.showWishlistEndpoint+wishlist_id,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.getMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });

    this.setState({ loading: true });
    this.getWishlistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };


  goToExploreProduct = (catalogueId: number | string) => {
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

  goBackExplore = () => this.props.navigation.goBack();
 
  returntextExploreAlign=()=>{
   if(this.state.selectedLanguage=="en")
    {
      return "left"
    }
    else{
      return "right"
    }
  }
  // Customizable Area End
}
