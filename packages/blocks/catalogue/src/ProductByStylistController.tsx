import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
    Catalogue,
  } from "./response";
  import { showMessage } from "react-native-flash-message";
import { showAlert } from "../../../components/src/CustomAlert";
import i18n from "../../../components/src/i18n/i18n.config";
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  isSeller: boolean;
  token: string;
  catalogueArr: Catalogue[];
  stylist_id: string;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  prev_page: number | null;
  localCurrencyGet:string;
  languageLocal:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ProductByStylistController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  addWishlistApiCallId = "";
  removeWishlistApiCallId = "";
  getProductByStylistApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.RestAPIResponceMessage),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.NavigationPayLoadMessage),
      ];

    this.state = {
        loading: false,
        stylist_id: "",
        isSeller: false,
        token: "",
        catalogueArr: [],
        current_page: 0,
        next_page: 1,
        prev_page: 0,
        total_pages: 0,
        localCurrencyGet:'',
        languageLocal:'en'
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
        this.handleNavigationPayloadMessage(message);
        return;
      }
    
      if (message.id === getName(MessageEnum.SessionResponseMessage)) {
        this.handleSessionResponseMessage(message);
        return;
      }
    
      if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
        this.handleRestAPIResponseMessage(message);
      }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
      let currencyLocal = await getStorageData('currencyIcon',true)
      let languageLocal = await getStorageData('FA_LANGUAGE_ST',true)
      this.setState({localCurrencyGet:currencyLocal,languageLocal:languageLocal})
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.ProductByStylist));
    if (data != undefined) {
      this.setState({ stylist_id: data } , () =>{ 
          this.getProductByStylist(this.state.token, 'normal');
      });
    }
  }

  private handleSessionResponseMessage(message: Message) {
    let token = message.getData(getName(MessageEnum.SessionResponseToken));
    runEngine.debugLog("TOKEN", token);
    if (token) {
      this.setState({ token: token }, () => {
        this.getProductByStylist(this.state.token, 'normal');
      });
    }
  }

  private handleRestAPIResponseMessage(message: Message) {
    const dataMessage = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
  
    if (this.getProductByStylistApiCallId === dataMessage) {
        this.handleProductByStylistResponse(message);
    } else if (this.addWishlistApiCallId === dataMessage) {
        this.handleWishlistResponseProduct(message);
    } else if (this.removeWishlistApiCallId === dataMessage) {
        this.handleWishlistResponseProduct(message);
    }
  }

  private handleProductByStylistResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!responseJson.errors) {
        const prev_data = this.state.catalogueArr;
        this.setState({ 
            loading: false, 
            catalogueArr: [...prev_data, ...responseJson.data],
            next_page: responseJson.meta.next_page,
            prev_page: responseJson.meta.prev_page,
            total_pages: responseJson.meta.total_pages,
            current_page: responseJson.meta.current_page 
        })
    } else {
        this.setState({ loading: false });
        alert("Something went wrong");
    }
  }
  

  catalogueDetailRedirection = (catalogueId: number | string) => {
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
    raiseMessageOrder.addData(getName(MessageEnum.productIDMessage),catalogueId);
    raiseMessageOrder.addData(getName(MessageEnum.ShowByStoreId), this.state.isSeller);
    messageOrder.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageOrder);
    this.send(messageOrder);
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  priceConvertValue = (value: number | string) => {
    if (value === null) {
      return "0";
    } else {
      return value;
    }
  };

  handleWishlistResponseProduct = (message: Message) => {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (
        [this.addWishlistApiCallId, this.removeWishlistApiCallId].includes(
          apiCallId
        )
      ) {
        showMessage({
          position: { top: 8 },
          message:
            apiCallId === this.addWishlistApiCallId
              ? i18n.t("itemAddedToWishlist")
              : i18n.t("itemRemovedFromWishlist"),
          type: "success",
        });
      }
    }
  };

  toggleWishlistProduct = (catalogue: Catalogue) => {
    if (this.state.token) {
      this.setState(({ catalogueArr }) => {
        const updatedArray = [...catalogueArr];
        const catalogueIndex = updatedArray.findIndex(
          (ctlg) => catalogue.id === ctlg.id
        );
        updatedArray[catalogueIndex].attributes.is_wishlist =
          !catalogueArr[catalogueIndex].attributes.is_wishlist;
        return { catalogueArr: updatedArray };
      });
      if (catalogue.attributes.is_wishlist) {
        this.removeFromWishlist(catalogue.id);
      } else {
        this.addToWishlist(catalogue.id);
      }
    } else {
      showAlert({
        okButton: {
          text: i18n.t("signIn"),
          onPress: () => this.goToSignIn(),
        },
        messsage: i18n.t("youNeedToSignInToCreateWishlist"),
        cancelButton: { text: i18n.t("Cancel") },
      });
    }
  };

  getProductByStylist = (token: string,callingType: string) => {
    let {
        next_page,
        total_pages,
      } = this.state;
    if (token == "" || this.state.stylist_id == "") { 
      return;
    }
  
    if (callingType === "normal") {
        if (total_pages === 1) {
          next_page = 1;
        }
        this.defaultPaginationCatalogue();
      } else if (next_page == null) {
        return;
      }
      this.setState({ loading: true });
    const message: Message = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.getProductByStylistEndpoint+ this.state.stylist_id+ `?page=${next_page}&per_page=10`,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.apiMethodTypeGet,
    });

    this.getProductByStylistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  removeFromWishlist = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.remWishlistEndpoint + String(catalogueId),
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
    });

    this.removeWishlistApiCallId = messsage.messageId;
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  defaultPaginationCatalogue = () => {
    this.setState({
      prev_page: 0,
      current_page: 0,
      next_page: 1,
      total_pages: 0,
      catalogueArr: [],
    });
  };

  addToWishlist = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.addWishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.postMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: {
          favouriteable_id: catalogueId,
        },
      }),
    });

    this.addWishlistApiCallId = messsage.messageId;
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  goToSignIn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  // Customizable Area End
}