import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { EmitterSubscription } from "react-native";
import { CartData } from "./types";
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
  cartData: CartData;
  localCurrency: string;
  cartId: string;
  token: string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ChatCartController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
    focusListener = { remove: () => {} } as EmitterSubscription;
    getCartDataApiCallId: string = "";
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
        token: "",
        cartData: {} as CartData,
        localCurrency: "",
        cartId : "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const cartOrderID = message.getData(
        getName(MessageEnum.NavigationChatCartData)
      );
      if (cartOrderID && cartOrderID.order_info) {
        this.setState({ cartId : cartOrderID.order_info}, () => {
          this.getCartData();
        });
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getCartDataApiCallId) {
        if (responseJson && !responseJson.error && !responseJson.errors) {
          this.setState({ loading: false, cartData: responseJson.cart_item.data.attributes });
        } 
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.focusListener = this.props.navigation.addListener(
          "willFocus",
          async () => {
            let currencyGet = await getStorageData('currencyIcon',true)
            this.setState({localCurrency:currencyGet})
          }
        );
    // Customizable Area End
  }

  // Customizable Area Start
  async componentWillUnmount() {
    this.focusListener.remove();
  }

  async getToken() {
    const token = await getStorageData("token", true);
    this.afterGettingToken(token);
  }

  afterGettingToken(token: string) {
    this.setState({ token }, () => {
      this.getCartData();
    });
  }
  handleCheckout = () => {
    const message = new Message(
      getName(MessageEnum.NavigationChatCheckoutMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationChatCheckoutData), this.state.cartId);
    this.send(message);  
  }

  apiCall = (
    endpoint: string,
    method: string,
    header: unknown,
    body: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    setMessageId(message.messageId);
    runEngine.sendMessage(message.messageId, message);
  };

  getCartData = () => {
    if (this.state.cartId == "" || this.state.token == "") {
      return; 
    }
    let header = {
      "Content-Type": configJSON.apiContentType,
      token : this.state.token,
    }
    this.setState({ loading: true });
    this.apiCall(
      configJSON.getChatCartApiEndPoint + this.state.cartId,
      configJSON.getApiMethod,
      JSON.stringify(header),
      null,
      (messageId) => {
        this.getCartDataApiCallId = messageId;
      }
    );
  };
  // Customizable Area End
}