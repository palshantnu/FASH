import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { SourcingRequestStylistResponse } from "./responseStore";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
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
  apiData: SourcingRequestStylistResponse;
  _id : string;
  token: string;
  deleteModal: boolean;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class StylistViewProductSourcingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProductApiCallId = "";
  deleteProductApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      loading: false,
      _id : "",
      token: "",
      apiData: {} as SourcingRequestStylistResponse,
      deleteModal: false,
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    switch (message.id) {
      case getName(MessageEnum.RestAPIResponceMessage):
        this.handleRestApiResponse(message);
        break;
      case getName(MessageEnum.NavigationPayLoadMessage):
        this.handleNavigationPayload(message);
        break;
      default:
        break;
    }    
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
      this.getToken();
      let currencyGet = await getStorageData('currencyIcon', true)
      this.setState({ localCurrency: currencyGet })
    });
    // Customizable Area End
  }

  // Customizable Area Start


  handleNavigationPayload(message: Message) {
    const RequestId = message.getData(getName(MessageEnum.StylistViewProductSourcingPage));
    this.setState({ _id: RequestId.requestId });
    this.getProductData(this.state.token);
  }

  handleRestApiResponse(message: Message) {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
  
    if (apiRequestCallId != null) {
      if (apiRequestCallId === this.getProductApiCallId) {
        this.processGetProductResponse(responseJson);
      } else if (apiRequestCallId === this.deleteProductApiCallId) {
        this.processDeleteProductResponse(responseJson);
      }
    }
  }
  
  processGetProductResponse(responseJson : any) {
    this.setState({ loading: false });
    if (!responseJson.errors) {
      console.log(JSON.stringify(responseJson), "===Response JSON")
      this.setState({ apiData: responseJson });
    }
  }
  
  formatNumber = (num : any) => {
    const number = Number(num);
    return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
  };

  processDeleteProductResponse(responseJson : any) {
    this.setState({ loading: false });
    if (!responseJson.errors) {
      this.getProductData(this.state.token);
      showMessage({
        message: "Bid deleted successfully.",
        position: { top: 8 },
        type: "success",
      });
    }
  }


  apiCallFunction = (
    endpoint: string,
    method: string,
    header: unknown,
    body: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    setMessageId(message.messageId);
    runEngine.sendMessage(message.messageId, message);
  };

  getProductData = async (token: string) => {
    this.setState({ loading: true });
    const header = {
      token: token,
    };

    if (this.state._id === "") {
      return;
    }
    this.apiCallFunction(
      configJSON.stylistViewProductSourcingPage + "?product_sourcing_request_id=" + this.state._id,
      configJSON.apiMethodTypeGet,
      header,
      null,
      (messageId) => {
        this.getProductApiCallId = messageId;
      }
    );

  };

  getToken = async() => {
    let token = await getStorageData('token',true)
    this.setState({token:token}, ()=>{
      this.getProductData(token)
    })
  };

  handleDeleteModel = () => {
    this.setState({ deleteModal: true })
  }

  handleDelete = () => {
    this.setState({ loading: true, deleteModal: false });
    const header = {
      token: this.state.token,
    };

    this.apiCallFunction(
      configJSON.createStylistOfferApiEndPoint + "/" + this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].id,
      configJSON.deleteSourceProductApiMethod,
      header,
      null,
      (messageId) => {
        this.deleteProductApiCallId = messageId;
      }
    )

  }

  navigateToBidYourQuoteEdit = () => {
    const message = new Message(
      getName(MessageEnum.NavigationBidYourQuoteMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.BidYourQuote), {
      for : "Edit",
      maxPrice : parseInt(this.state.apiData.data.attributes.max_price),
      id : this.state.apiData.data.id,
      minPrice : parseInt(this.state.apiData.data.attributes.min_price),
      product_description : this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].product_description,
      quote_price : this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].quote_price.toString(),
      images : this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].images,
      request_id : this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].id,
    });

    this.send(message);
  };

  navigateToBidYourQuote = () => {
    const message = new Message(
      getName(MessageEnum.NavigationBidYourQuoteMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.BidYourQuote), {
      for : "Add",
      minPrice : parseInt(this.state.apiData.data.attributes.min_price),
      maxPrice : parseInt(this.state.apiData.data.attributes.max_price),
      id : this.state.apiData.data.id
    });

    this.send(message);
  };

  navigationToChatWithCustomer = (userID : string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
  );
  message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'Chat'
  );
  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

  const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
  );

  raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
    userID
  });
  message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
  this.send(message);
  }
  // Customizable Area End
}