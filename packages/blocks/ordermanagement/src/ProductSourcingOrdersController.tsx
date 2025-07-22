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
  apiData: any;
  refreshing: boolean;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ProductSourcingOrdersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProductSourcingOrdersCallId = "";
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
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleApiResponse(message);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    let currencyGet = await getStorageData('currencyIcon', true)
    this.setState({ localCurrency: currencyGet })
    this.getToken();
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = async() => {
    let token = await getStorageData('token',true)
    this.setState({token:token}, () => {
      this.getProductSourcingOrders(this.state.token);
    })
  };

  getProductSourcingOrders = async (tokenget: string) => {
    console.log("@@@@ =======================", tokenget)
    if (tokenget === "") {
      return;
    }
    this.setState({ loading: true });
    const header = {
        token: tokenget,
    };
    this.ApiCall(
        configJSON.getProductSourcingOrdersApiEndPoint,
        header,
        configJSON.getMethod,
        null,
        (messageId) => {
            this.getProductSourcingOrdersCallId = messageId;
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
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (apiRequestCallId === this.getProductSourcingOrdersCallId) {
      this.setState({ loading: false });
      if (!responseJson.error && !responseJson.errors) {
        this.setState({ apiData: responseJson });
      }
    }
  }

  navigateToDetailedProductSourcingOrder = ({ id }: { id: string }) => {
    const message = new Message(
      getName(MessageEnum.NavigationDetailedProductSourcingOrderMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.DetailedProductSourcingOrderData), {
      data: id,
    });
    this.send(message);
  };

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // Customizable Area End
}