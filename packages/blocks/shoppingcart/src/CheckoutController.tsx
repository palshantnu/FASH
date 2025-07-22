import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import { RefObject, createRef } from "react";
import { EmitterSubscription, TextInput } from "react-native";
import { getUniqueId } from "react-native-device-info";
import {
  AddressAttributes,
  CartAttributes,
  CartWithItemsResponse,
  ChargeCreateResponse,
  ApplyCouponResponse,
  RemoveCouponResponse,
} from "./response";
import { showMessage } from "react-native-flash-message";
import { getStorageData } from "framework/src/Utilities";
const config = require("../../../framework/src/config");
import i18n from '../../../components/src/i18n/i18n.config';
import PriceConvertValue from "../../../components/src/PriceConvertValue";
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
  order_id: string;
  loading: boolean;
  token: string;
  fastShip: boolean;
  coupon: string;
  editable: boolean;
  errorCoupon: string;
  address: AddressAttributes;
  addressId: number | string;
  cart: CartAttributes;
  localCurrency:string;
  loyalty_points:number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CheckoutController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  willFocus = { remove: () => {} } as EmitterSubscription;
  willBlur = { remove: () => {} } as EmitterSubscription;
  isFocused = true;
  cartApiCallId = "";
  applyCouponApiCallId = "";
  removeCouponApiCallId = "";
  placeCartApiCallId = "";
  inputRef: RefObject<TextInput>;
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
      loading: true,
      order_id: "",
      token: "",
      fastShip: true,
      coupon: configJSON.promoPlaceHolder,
      editable: true,
      errorCoupon: "",
      address: {} as AddressAttributes,
      addressId: 0,
      cart: {} as CartAttributes,
      localCurrency:"",
      loyalty_points:0
      // Customizable Area End
    };

    // Customizable Area Start
    this.inputRef = createRef();
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.isFocused = true;
    this.getToken();

    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this.isFocused = true;
      this.getToken();
    });
    this.willBlur = this.props.navigation.addListener("willBlur", () => {
      this.isFocused = false;
      this.getToken();
    });
    // Customizable Area End
  }

  receive = async (from: string, message: Message) => {
    // Customizable Area Start
    if (!this.isFocused) {
      return;
    }

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleApiResponses(message);
    }
    // Customizable Area End
  };

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.willBlur.remove();
    this.willFocus.remove();
    runEngine.unSubscribeFromMessages(this as IBlock, this.subScribedMessages);
  };

  getToken = async () => {
    const token = await getStorageData("token", true);
    let currencyGet = await getStorageData('currencyIcon',true)
    this.setState({ token, loading: true,localCurrency:currencyGet }, () => {
      this.getCart();
    });
  };

  getCart = async() => {
    const buyNowOrderID = await getStorageData("buyNowOrderID", true);
    const token = this.state.token;
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:buyNowOrderID!==null?configJSON.getBuyNowCartApiEndpoint+buyNowOrderID:
        configJSON.getCartApiEndpoint + `?unique_token=${getUniqueId()}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.getApiMethod,
    });
    this.cartApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
  };

  handleApiResponses = (message: Message) => {
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (!responseJson) {
      this.parseApiErrorResponse(errorReponse);
      return;
    }
    if (messageId === this.cartApiCallId) {
      const cartResponse = responseJson as CartWithItemsResponse;
      const loyaltyPoints = responseJson.data.attributes.loyalty_points_discount      
      return this.setState({
        loyalty_points:loyaltyPoints,
        cart: cartResponse.data.attributes,
        address:
          cartResponse.data.attributes.delivery_addresses?.attributes ||
          ({} as AddressAttributes),
        coupon:
          cartResponse.data.attributes.applied_copon_code ||
          i18n.t("promoPlaceHolder"),
        editable: !Boolean(cartResponse.data.attributes.applied_copon_code),
        loading: false,
      });
    } else if (messageId === this.placeCartApiCallId) {
      const charge = responseJson as ChargeCreateResponse;
      if (charge.transaction.url) {
        const messge = new Message(getName(MessageEnum.NavigationTapWebView));
        messge.initializeFromObject({
          [getName(MessageEnum.NavigationPropsMessage)]: this.props,
          [getName(MessageEnum.NavigationPayloadTapWebView)]: {
            WebUrl: charge.transaction.url,
            token: this.state.token,
            chargeId: charge.id,
          },
        });
        this.send(messge);
      }
    } else if (messageId === this.applyCouponApiCallId) {
      const cartResponse = responseJson as ApplyCouponResponse;
      showMessage({
        message: cartResponse.data?.message ?? cartResponse.message,
        position: { top: 8 },
        textStyle: { textTransform: "capitalize" },
      });
      if (cartResponse.data) {
        return this.setState({
          cart: cartResponse.data.coupon.data.attributes,
          editable: false,
          loading: false,
          errorCoupon: ""
        });
      }
      showMessage({
        message: cartResponse.message,
        position: { top: 8 },
        type: "warning",
        textStyle: { textTransform: "capitalize" },
      });
      return this.setState({
        errorCoupon: "",
        loading: false,
      });
    } else if (messageId === this.removeCouponApiCallId) {
      const removeResponse = responseJson as RemoveCouponResponse;
      showMessage({
        message: removeResponse.message,
        position: { top: 8 },
        textStyle: { textTransform: "capitalize" },
      });
      if (removeResponse.data) {
        return this.setState({
          cart: removeResponse.data.data.attributes,
          coupon: configJSON.promoPlaceHolder,
          editable: true,
          loading: false,
        });
      }
      return this.setState({
        coupon: configJSON.promoPlaceHolder,
        errorCoupon: "",
        loading: false,
      });
    }
  };

  resetPromoPlaceholder = () => {
    if (this.state.coupon === i18n.t("promoPlaceHolder")) {
      this.setState({ coupon: "", errorCoupon: "" });
    }
  };

  handlePormoChange = (text: string) => {
    if (/^[a-zA-Z0-9]{0,10}$/.exec(text.trim())) {
      this.setState({
        coupon: text.trim(),
        errorCoupon: "",
      });
    }
  };

  onPromoBlur = () => {
    if (this.state.coupon === "") {
      this.setState({ coupon: configJSON.promoPlaceHolder, errorCoupon: "" });
    }
  };

  onSubmit = () => {
    if (this.state.coupon === configJSON.promoPlaceHolder) {
      return this.setState({
        coupon: "",
        errorCoupon: "Invalid Promo Code",
      });
    }
    if (this.state.coupon === "") {
      return this.setState({ coupon: configJSON.promoPlaceHolder });
    }

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.applyCouponEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-type": configJSON.apiContentType,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.postApiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        order_id: this.state.cart.id,
        code: this.state.coupon,
        cart_value: this.state.cart.total,
      }),
    });

    this.applyCouponApiCallId = message.messageId;
    this.setState({ loading: true, errorCoupon: "" });
    runEngine.sendMessage(message.messageId, message);
  };

  removeCoupon = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.removeCouponEndpoint + this.state.cart.id,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteApiMethod,
    });

    this.setState({ loading: true });
    this.removeCouponApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  priceConvert = (price?: string | number, minus = false) => {
    if (!price) {
      return "-";
    }
    return (minus ? "- " : "") +  PriceConvertValue(parseFloat(price.toString()).toFixed(2),this.state.localCurrency);
  };

  parseAddress = (address?: AddressAttributes) => {
    if (!address || !("zip_code" in address)) {
      return "";
    }
    return [
      address.house_or_building_number,
      address.street,
      address.block,
      address.area,
      address.city,
      address.zip_code,
    ]
      .filter((item) => item)
      .join(", ");
  };

  placeOrder = () => {
    if (!this.state.cart.delivery_addresses) {
      return showMessage({
        message: "Please select an address before placing order",
        position: { top: 8 },
        type: "warning",
      });
    }

    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.createCharge,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.postApiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: {
          temp_order_id: this.state.cart.id.toString(),
          redirect_url: config.baseURL + "/admin",
        },
      }),
    });

    this.placeCartApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  goToAddressSelection = () => {
    const message = new Message(
      getName(MessageEnum.NavigationAddressesMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.CheckoutAddressMessage), {
      id: this.state.cart.id,
    });
    this.send(message);
  };

  focus = () => this.inputRef.current!.focus();
  // Customizable Area End
}
