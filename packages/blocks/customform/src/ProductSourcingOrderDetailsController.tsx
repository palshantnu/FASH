import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { OrderRequest } from "./responseStore";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { showMessage } from "react-native-flash-message";

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
  token: string;
  loading: boolean;
  apiData: OrderRequest;
  refreshing: boolean;
  orderID : string;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ProductSourcingOrderDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderDetailsCallId = "";
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
      token: "",
      loading: false,
      orderID : "",
      refreshing: false,
      apiData: {} as OrderRequest,
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const Data = message.getData(
          getName(MessageEnum.ProductSourcingOrderDetailsData)
      );
      this.setState({ orderID : Data.data.id });
      this.getOrderDetails(this.state.token);
  }
  if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleApiResponse(message);
  }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    let currencyGet = await getStorageData('currencyIcon', true)
    this.setState({ localCurrency: currencyGet })
   
    // Customizable Area End
  }

  // Customizable Area Start
  
  getToken = async() => {
    let token = await getStorageData('token',true)
    this.setState({token:token}, () => {
      this.getOrderDetails(this.state.token);
    })
  };

  getOrderDetails = async (token: string) => {
    if (token === "") {
      return;
    }
    this.setState({ loading: true });
    const header = {
        token: token,
    };
    this.ApiCall(
      configJSON.getOrderDetailsApiEndPoint + this.state.orderID,
      header,
      configJSON.apiMethodTypeGet,
      null,
      (messageId) => {
        this.getOrderDetailsCallId = messageId;
      }
    );
  }

  ApiCall = (
    link: string,
    header: unknown,
    method: string,
    body: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      message.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        link
      );
      setMessageId(message.messageId);
      message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
      message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
      message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
      runEngine.sendMessage(message.messageId, message);
  };

  handleApiResponse = (message: Message) => {
    // getOrderDetailsCallId
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (apiRequestCallId === this.getOrderDetailsCallId) {
      this.setState({ loading: false });
      if (!responseJson.error) {
        this.setState({ apiData: responseJson });
      }
      if (responseJson.error) {
        this.setState({ loading: false });
        showMessage({
          message: responseJson.error,
          position: { top: 8 },
        });
        this.props.navigation.goBack();
      }
    }
  }



extractShippingAddress = (addressData: any) => {
  if (!addressData) return "Shipping address not available";

  // Build address in the desired format
  const addressString = `${addressData.house_or_building_number || ""} ${addressData.street || ""}, ${addressData.area || ""}, ${addressData.block || ""}, ${addressData.city || ""}, ${addressData.country || ""}`.trim();

  // Replace any instances of multiple commas or trailing commas
  return addressString
    .replace(/,\s*,+/g, ',') 
    .replace(/,\s*$/, '');    
};

  // Customizable Area End
}