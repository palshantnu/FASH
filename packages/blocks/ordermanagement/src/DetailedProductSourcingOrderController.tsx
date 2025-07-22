import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { ProductSourcingOrdersList } from "./types";
interface OrderStatus {
    label: string;
    value: string;
    color: string;
    backgroundColor: string;
  }

export const ORDER_STATUSES: OrderStatus[] = [
    { label: "Accepted", value: "accepted", color: "#10B981", backgroundColor: "#E2F8F0" },
    { label: "In Process", value: "in_process", color: "#BE5B00", backgroundColor: "#FFE7D0" },
    { label: "Ready for Collection", value: "ready",  color: "#10B981", backgroundColor: "#E2F8F0" },
    { label: "Out for Delivery", value: "out_delivery",  color: "#10B981", backgroundColor: "#E2F8F0" },
    { label: "Delivered", value: "delivered", color: "#10B981", backgroundColor: "#E2F8F0" },
  ];
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
  apiData: ProductSourcingOrdersList;
  refreshing: boolean;
  localCurrency:string;
  selectedStatus: any,
  showStatusDropdown : boolean;
  orderId : string
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DetailedProductSourcingOrderController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderDetailsApiCallId = "";
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
      refreshing: false,
      apiData: {} as ProductSourcingOrdersList, 
      localCurrency:"",
      selectedStatus: ORDER_STATUSES[0],
      showStatusDropdown: false,
      orderId: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const Data = message.getData(
          getName(MessageEnum.DetailedProductSourcingOrderData)
      );
      this.setState({ orderId : Data.data });
      this.getOrderDetails(this.state.token);
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleAPIResponse(message);
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

  getOrderDetails = (tokenget: string) => {
    if (tokenget === "") {
      return;
    }
    this.setState({ loading: true });
    const header = {
        "Content-Type": configJSON.apiContentType,
        token: tokenget,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderDetailsApiCallId = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getOrderByIdMethod
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getOrderDetailsApiEndPoint + this.state.orderId
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleAPIResponse = (message : Message) =>{
    const callId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
  );
  const data = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
  );
  if (callId == this.getOrderDetailsApiCallId) {
    this.setState({ loading: false });
    if (!data.error || !data.errors) {
      this.setState({ apiData: data });
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