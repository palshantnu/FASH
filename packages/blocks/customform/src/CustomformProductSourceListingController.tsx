import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ProductSourcingRequestData } from "./responseStore";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
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
  token: string;
  loading: boolean;
  apiData: ProductSourcingRequestData;
  refreshing: boolean;
  deleteModal: boolean;
  selectedItemId: string;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class CustomformProductSourceListingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiCallId = "";
  deleteCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token: "",
      loading: false,
      apiData: {} as ProductSourcingRequestData,
      refreshing: false,
      deleteModal: false,
      selectedItemId: "",
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      this.handleSessionResponse(message);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleRestApiResponse(message);
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

  handleSessionResponse(message: Message) {
    let token = message.getData(getName(MessageEnum.SessionResponseToken));
    runEngine.debugLog("TOKEN", token);
    if (token) {
      this.setState({ token: token });
      this.getProductSourcingList(token);
    }
  }
  
  handleRestApiResponse(message: Message) {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
  
    if (apiRequestCallId) {
      this.processApiResponse(apiRequestCallId, responseJson);
    }
  }

  processApiResponse(apiRequestCallId: string, responseJson: any) {
    if (apiRequestCallId === this.apiCallId) {
      this.handleApiCallResponse(responseJson);
    } else if (apiRequestCallId === this.deleteCallId) {
      this.handleDeleteCallResponse(responseJson);
    }
  }
  
  handleApiCallResponse(responseJson: any) {
    this.setState({ loading: false });
    if (!responseJson.errors) {
      this.setState({ apiData: responseJson });
    }
  }
  
  handleDeleteCallResponse(responseJson: any) {
    this.setState({ loading: false });
    if (!responseJson.errors) {
      showMessage({
        message: i18n.t("ProductSourcingDeletedSuccessfully"),
        position: { top: 8 },
        type: "success",
      });
      this.getProductSourcingList(this.state.token);
    }
  }

  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

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

  refreshData = () => {
    this.setState({ refreshing: true });
    this.getProductSourcingList(this.state.token);
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  getProductSourcingList = (token: string) => {
    this.setState({ loading: true });
    let header = {
      token: token,
    };
    this.apiCall(
      configJSON.getProductSourcingListApiEndPoint,
      configJSON.getProductSourcingMethod,
      header,
      null,
      (messageId) => {
        this.apiCallId = messageId;
      }
    );
  };

  handelDeleteModal = (id: string) => {
    this.setState({ deleteModal: true, selectedItemId: id });
  };

  handleDeleteModalClose = () => {
    this.setState({ deleteModal: false });
  };

  deleteRequestConfirm = async () => {
    this.setState({ deleteModal: false });
    this.deleteTheProduct(this.state.selectedItemId);
  }

  deleteTheProduct = (id: string) => {
    this.setState({ loading: true });
    let header = {
      token: this.state.token,
    };
    this.apiCall(
      configJSON.deleteSourceProductApiEndPoint + id,
      configJSON.deleteSourceProductApiMethod,
      header,
      null,
      (messageId) => {
        this.deleteCallId = messageId;
      }
    );
  };

  navigateToSourceProduct = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCustomformSourceProduct)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  navigateToDetailProduct = (productId: string) => {
    const message = new Message(
      getName(MessageEnum.NavigationBuyerProductSourcingViewMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.BuyerProductSourcingView), {
      productId : productId,
    });
    this.send(message);
  };

  formatNumber = (num : number) => {
    const number = Number(num);
    return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
  };

  // Customizable Area End
}
