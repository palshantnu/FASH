import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import { EmitterSubscription } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { showMessage, MessageOptions } from "react-native-flash-message";
import { OrderItem, CartAttributes, CartWithItemsResponse } from "./response";
import { getStorageData,removeStorageData,setStorageData } from "framework/src/Utilities";

import { showAlert } from "../../../components/src/CustomAlert";
import i18n from '../../../components/src/i18n/i18n.config';
import moment from "moment";
import 'moment/locale/ar-dz';
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
  order_id: any;
  catalogue_id: number;
  quantity: number;
  taxable: boolean;
  taxable_value: number;
  token: string;
  orderList: Array<unknown>;
  orderItems: Array<unknown>;
  isVisible: boolean;
  isRefreshing: boolean;
  localCurrency:string;
  id: any;
  name: string;
  description: string;
  price: number;
  currency: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  trendingList: Array<unknown>;
  cartMeta: CartAttributes;
  cartItems: OrderItem[];
  loading: boolean;
  subTotal: string;
  shipping: string;
  totalTax: string;
  total: string;
  languageSet:string;
  isAddressUpdated:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShoppingCartOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrdersApiCallId = "";
  showOrderApiCallId = "";
  createOrderItemApiCallId = "";
  deleteOrderItemApiCallId = "";
  getCartApiCallId = "";
  updateQuantityApiCallId = "";
  removeItemApiCallId = "";
  updateDelieveryAdd = "";
  actionMessageRef: MutableRefObject<MessageOptions | null>;
  willFocusListener = { remove: () => {} } as EmitterSubscription;
  willBlurListener = { remove: () => {} } as EmitterSubscription;
  isFocused = true;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      order_id: 0,
      catalogue_id: 0,
      quantity: 0,
      taxable: false,
      taxable_value: 0,
      token: "",
      orderList: [],
      orderItems: [],
      isVisible: false,
      isRefreshing: false,
      localCurrency:'',
      id: 0,
      name: "",
      description: "",
      price: 0,
      currency: "",
      category_id: 0,
      created_at: "",
      updated_at: "",
      account_id: 0,
      trendingList: [],
      cartMeta: {} as CartAttributes,
      cartItems: [],
      loading: true,
      subTotal: "",
      shipping: "",
      totalTax: "",
      total: "",
      languageSet:i18n.language,
      isAddressUpdated:false
      // Customizable Area End
    };

    // Customizable Area Start
    this.actionMessageRef = createRef();
    this.actionMessageRef.current = null;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.isFocused = true;
    this.getToken();
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.isFocused = true;
        this.getToken();
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused = false;
      }
    );
    // Customizable Area End
  }

  receive = async (from: String, message: Message) => {
    // Customizable Area Start
    if (!this.isFocused) {
      return;
    }
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token }, () => this.getCart(token));
      } else {
        this.getCart("");
      }
    }

    // Handle Rest API Responses
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponse(message);
    }
    // Customizable Area End
  };

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.willFocusListener?.remove();
    this.willBlurListener?.remove();
    runEngine.unSubscribeFromMessages(this as IBlock, this.subScribedMessages);
  };

  isNumberNull(number: number) {
    return number === null || Number.isNaN(number);
  }

  hideModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  navigateToAddShoppingCartOrderItem = () => {
    this.props.navigation.navigate("AddShoppingCartOrderItem");
  };

  navigateToShoppingCartOrders = () => {
    this.props.navigation.navigate("ShoppingCartOrders");
  };

  updateAddress = async() => {
    let addressId =  await getStorageData("address_id", true);
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.assignAddress,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.postApiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        address_id: addressId,
        order_id: this.state.order_id,
      }),
    });
    this.updateDelieveryAdd = message.messageId;
    runEngine.sendMessage(message.id, message);
  }

  getToken = async() => {
    if(this.state.languageSet === 'en')
    {
      moment.locale('en')
    }else{
      moment.locale('ar-dz')
    }
    await removeStorageData('buyNowOrderID')
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  goToCatalogueDetails = ( catalogueId : number) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), catalogueId);
    message.addData(getName(MessageEnum.ShowByStoreId), false);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  setModal = (item: { post: S }) => {
    this.setState({
      id: item.post?.id,
      name: item.post?.name,
      description: item.post?.description,
      price: item.post?.price,
      currency: item.post?.currency,
      category_id: item.post?.category_id,
      created_at: item.post.created_at,
      updated_at: item.post?.updated_at,
      account_id: item.post?.account_id,
      isVisible: !this.state.isVisible,
    });
  };

  getOrders = (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    const params = { filter_by: "scheduled" };

    this.getOrdersApiCallId = requestMessage.messageId;
    let urlParams = new URLSearchParams(params).toString();

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getOrdersApiEndPoint}?${urlParams}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  showOrder = (order_id: string) => {
    this.setState({ isVisible: true });

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.showOrderApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrdersApiEndPoint + "/" + `${order_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({ isRefreshing: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createOrderItem = (token: string) => {
    if (
      this.isNumberNull(this.state.catalogue_id) ||
      this.isNumberNull(this.state.quantity) ||
      this.isNumberNull(this.state.taxable_value)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory,
        ""
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const order_items = {
      catalogue_id: this.state.catalogue_id,
      quantity: this.state.quantity,
      taxable: this.state.taxable,
      taxable_value: this.state.taxable_value,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createOrderItemApiCallId = requestMessage.messageId;

    const httpBody = {
      order_items,
    };
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createOrderItemApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  };

  deleteOrderItem = (order_id: any, order_item_id: any) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.deleteOrderItemApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteOrderItemApiEndPoint +
        "/" +
        `${order_id}` +
        "/order_items/" +
        `${order_item_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleApiResponse = (message: Message) => {
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (responseJson) {
      if (responseJson.data || responseJson.message || responseJson.error) {
        switch (messageId) {
          case this.getCartApiCallId:
            this.handleCartResponse(responseJson);
            break;
          case this.updateDelieveryAdd:
            this.setState({ isAddressUpdated: false }, ()=> {
              this.getCart(this.state.token);
            });
            break;
          case this.removeItemApiCallId:
            this.getCart(this.state.token, {
              message: "Item have been removed from your cart",
              position: { top: 0 },
              type: "success",
            });
            break;
          case this.updateQuantityApiCallId:
            if ("error" in responseJson) {
              this.setState({ loading: false });
              showMessage({
                message: "Sorry, this item is out of stock",
                position: { top: 8 },
                type: "warning",
              });
              break;
            }
            this.getCart(this.state.token, {
              message: "Quantity updated successfully",
              position: { top: 0 },
              type: "danger",
            });
            break;
          case this.getOrdersApiCallId:
            this.setState({ orderList: responseJson.data });
            break;
          case this.showOrderApiCallId:
            this.setState({ isRefreshing: false });
            this.setState({
              orderItems: responseJson.data.attributes.order_items.data,
            });
            break;
          case this.createOrderItemApiCallId:
            // this was already handled this way. I just moved the line here while refactoring for sonarcube
            this.props.navigation.navigate("ShoppingCartOrders");
            break;
          case this.deleteOrderItemApiCallId:
            this.showOrder(this.state.order_id);
            this.getOrders(this.state.token);
            break;
          default:
            break;
        }
      }
    }

    if (errorReponse) {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  };

  handleCartResponse = async(responseJson: Record<string, unknown>) => {
    if (responseJson && "data" in responseJson) {
      const { data } = responseJson as unknown as CartWithItemsResponse;
      this.setState({
        loading: false,
        order_id: data.id,
        cartMeta: data.attributes,
        cartItems: data.attributes.order_items,
        ...this.getRenderCost(data.attributes),
      });
    } else {
      this.setState({
        loading: false,
        order_id: 0,
        cartMeta: {} as CartAttributes,
        cartItems: [],
      });
    }
    if (this.actionMessageRef.current) {
      showMessage(this.actionMessageRef.current);
    }
    if (this.state.isAddressUpdated) {
      await this.updateAddress()
    }
  };

  getCart = (token: string, alertMessage?: MessageOptions) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const endpoint =
      (token
        ? configJSON.getCartApiEndpoint
        : configJSON.getGuestCartApiEndpoint) +
      `?unique_token=${getUniqueId()}`;

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getCartApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    this.setState({ loading: true });
    this.actionMessageRef.current = alertMessage ?? null;
    runEngine.sendMessage(message.id, message);
  };

  updateQuantity = (
    order_item_id: string,
    current_quantity: number,
    type: "increment" | "decrement"
  ) => {
    const items = this.state.cartItems.filter(
      (_item) => _item.id === order_item_id
    );
    if (!items.length) {
      showMessage({
        message: configJSON.orderItemNotFound,
        position: { top: 0 },
        type: "warning",
      });
      return;
    }
    const item = items[0];

    if (current_quantity === 1 && type === "decrement") {
      this.removeItemFromCart([order_item_id]);
      return;
    }

    const updatedQuantity = current_quantity + (type === "increment" ? +1 : -1);
    const header = JSON.stringify({
      "Content-Type": configJSON.apiContentType,
    });
    const body = JSON.stringify({
      order_item_id,
      quantity: updatedQuantity,
    });

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.updateQuantityApiCallId = message.messageId;

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateItemApiEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.putApiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  removeItemFromCart = (order_items_ids: string[]) => {
    const items = this.state.cartItems.filter((_item) =>
      order_items_ids.includes(_item.id)
    );
    if (!items.length && items.length !== order_items_ids.length) {
      // can't find all orders
      showMessage({
        message: configJSON.ordersNotFound,
        position: { top: 0 },
        type: "warning",
      });
      return;
    }

    const header = JSON.stringify({
      "Content-Type": configJSON.apiContentType,
    });
    const body = JSON.stringify({
      order_id: this.state.order_id,
      order_items_ids,
    });

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.removeItemApiCallId = message.messageId;

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.removeItemFromCartEndPoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.postApiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  getRenderCost = (cart: any) => {
    const subTotal = cart.sub_total
      ?  parseFloat(cart.sub_total).toFixed(2)
      : "0";
    const shipping = cart.shipping_charge
      ?  parseFloat(cart.shipping_charge).toFixed(2)
      : "0";
    const totalTax = cart.total_tax
      ?  parseFloat(cart.total_tax.toString()).toFixed(2)
      : "0";
    const total = cart.total_payable_amount ?  parseFloat(cart.total_payable_amount).toFixed(2) : "0";

    return {
      subTotal,
      shipping,
      totalTax,
      total,
    };
  };

  goToCheckout = async () => {
    setStorageData("guestBuyerRedirectKey",'shoppingCart')
    if (await getStorageData("requireSignIn")) {
      const message = new Message(
        getName(MessageEnum.NavigationEmailLogInMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

      showAlert({
        messsage:
          "To complete the checkout process, please Sign In into your account / Register to the platform",
        okButton: {
          text: "Sign In",
          onPress: () => this.send(message),
        },
        cancelButton: { text: "Cancel" },
      });
      return;
    }

    const message = new Message(getName(MessageEnum.NavigationCheckout));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };


  getDataStoreAndStylist = (storeData:string|undefined|null,stylist_name:string|null)=>{
    if(storeData === undefined)
    {
      return i18n.t("stylist")+' : '+stylist_name
    }else{
      return i18n.t("store")+' : '+storeData
    }
  }

  dateConvertMoment = (getDateCurrent:string)=>{
    return moment(getDateCurrent).format("DD MMM YYYY");
  }
  // Customizable Area End
}
