import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { CartData, ChargeCreateResponse, ShippingAddress } from "./types";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { getStorageData } from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import { EmitterSubscription } from "react-native";

// Customizable Area Start
const config = require("../../../framework/src/config");
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
  localCurrency:string;
  token: string;
  address: ShippingAddress;
  cart: CartData;
  orederId : string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ChatCheckoutController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDataApiCallId: string = "";
  placeCartApiCallId: string = "";
  willFocus = { remove: () => {} } as EmitterSubscription;
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
        localCurrency:"",
        token : "",
        address: {} as ShippingAddress,
        cart: {} as CartData,
        orederId : "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleAPIResponse(message);
    } else if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayload(message);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = async () => {
    const token = await getStorageData("token", true);
    let currencyGet = await getStorageData('currencyIcon',true)
    this.setState({ token, loading: true,localCurrency:currencyGet }, () => {
      this.getCart();
    });
  };
  goToAddressSelection = () => {
    const message = new Message(
      getName(MessageEnum.NavigationAddressesMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.CheckoutAddressMessage), {
      id: this.state.orederId, from : "cart"
    });
    this.send(message);
  };

    handleAPIResponse = (response: any) => {
      const apiRequestCallId = response.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = response.getData(getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getDataApiCallId) {
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.setState({ loading: false, cart: responseJson.cart_item.data.attributes, address: responseJson.cart_item.data.attributes.shipping_address[0] });
        } 
      } else if (apiRequestCallId === this.placeCartApiCallId) {
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
      }
    }

    handleNavigationPayload = (message: Message) => {
      const cartOrderID = message.getData(
        getName(MessageEnum.NavigationChatCheckoutData)
      );
      if (cartOrderID) {
        this.setState({ orederId : cartOrderID}, () => {
          this.getCart();
        });
      }
    }

    parseAddress = (address: ShippingAddress) => {
      if (!address || !("zipcode" in address)) {
        return "";
      }
      return [
        address.house_or_building_number,
        address.street,
        address.block,
        address.area,
        address.city,
        address.zipcode,
      ]
        .filter((item) => item)
        .join(", ");
    };

      priceConvert = (price?: string | number, minus = false) => {
        if (!price) {
          return "-";
        }
        return (minus ? "- " : "") +  PriceConvertValue(parseFloat(price.toString()).toFixed(2),this.state.localCurrency);
      };

      placeOrder = () => {
        if (!this.state.address?.name) {
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
                  order_request_id: this.state.orederId.toString(),
                  redirect_url: config.baseURL + "/admin",
                },
              }),
            });
        
            this.placeCartApiCallId = message.messageId;
            this.setState({ loading: true });
            runEngine.sendMessage(message.id, message);
      }

      funToCallAPI = (
        method: string,
        endpoint: string,
        body: unknown,
        header: unknown,
        setMessageId: (messageId: string) => void
      ) => {
        const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
        setMessageId(message.messageId);
        message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
        message.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endpoint
        );
        message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
        message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
        runEngine.sendMessage(message.messageId, message);
      };

      getCart = () => {
          if (this.state.orederId == "" || this.state.token == "") {
            return;
          }
          let header = {
            "Content-Type": configJSON.apiContentType,
            token : this.state.token,
          }
          this.setState({ loading: true });
          this.funToCallAPI(
            configJSON.getApiMethod,
            configJSON.getChatCartApiEndPoint + this.state.orederId,
            null,
            JSON.stringify(header),
            (messageId) => {
              this.getDataApiCallId = messageId;
            }
          );
        };
  // Customizable Area End
}