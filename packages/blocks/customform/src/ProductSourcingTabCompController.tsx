import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ApiData } from "./responseStore";

// Customizable Area Start
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
  apiData: ApiData;
  refreshing: boolean;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class ProductSourcingTabCompController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProductApiCallId = "";
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
      refreshing: false,
      apiData: {
        "data": []
      } ,
      localCurrency:"$"
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token: token });
        this.getProductSourcingList(token);
        console.log('@@@@ =================================================================',token);
        
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        if (apiRequestCallId != null) {
          if (apiRequestCallId === this.getProductApiCallId) {
            this.setState({ loading: false });
            if (!responseJson.errors) {
              this.setState({ apiData: responseJson });
              return;
            }
          }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    let currencyGetBeforeLoadPage = await getStorageData('currencyIcon', true)
    this.setState({ localCurrency: currencyGetBeforeLoadPage })
     this.props.navigation.addListener("willFocus", async() => {
       this.getToken();
      let currencyGet = await getStorageData('currencyIcon', true)
       this.setState({ localCurrency: currencyGet })
    });
    // Customizable Area End
  }

  // Customizable Area Start
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

  formatNumber = (num : number) => {
    const number = Number(num);
    return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
  };

  getProductSourcingList = async (token: string) => {
    this.setState({ loading: true });
    const header = {
      token: token,
    };

    this.apiCall(
      configJSON.getProductSourcingListApiEndPoint,
      configJSON.getProductSourcingListMethod,
      header,
      null,
      (messageId) => {
        this.getProductApiCallId = messageId;
      }
    );
  };

  refreshData = () => {
    this.setState({ refreshing: true });
    this.getProductSourcingList(this.state.token);
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  navigateToMyBids = () => {
      const message = new Message(
        getName(MessageEnum.NavigationMyBidsMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
  };

  navigateToSeeAllProductSourcing = () => {
      const message = new Message(getName(MessageEnum.NavigationSeeAllProductSourcingMessage));
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
  };

  navigateToViewProductSourcing = (id: string) => {
    const message = new Message(
        getName(MessageEnum.NavigationStylistViewProductSourcingPageMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      message.addData(getName(MessageEnum.StylistViewProductSourcingPage), {
        requestId : id,
      });
    this.send(message);
  }

  // Customizable Area End
}