import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { MyBidsData } from "./responseStore";

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
  apiData: MyBidsData;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  prev_page: number | null;
  page_size: number;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class MyBidsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getMyBidsApiCallId = "";
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
      apiData: {} as MyBidsData,
      current_page: 0,
      next_page: 1,
      prev_page: 0,
      total_pages: 0,
      page_size: 10,
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.getMyBidsApiCallId) {
          this.setState({ loading: false });
          if (!responseJson.error) {
            this.setState({
              apiData: responseJson,
              next_page: responseJson.meta.next_page,
              prev_page: responseJson.meta.prev_page,
              total_pages: responseJson.meta.total_pages,
              current_page: responseJson.meta.current_page,
            });
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
    this.getMyToken();
    this.props.navigation.addListener("willFocus", async() => {
      this.getMyToken();
      let currencyGet = await getStorageData('currencyIcon', true)
      this.setState({ localCurrency: currencyGet })
    });
    // Customizable Area End
  }

  // Customizable Area Start
  ApiCallFun = (
    header: unknown,
    body: unknown,
    method: string,
    endpoint: string,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    setMessageId(message.messageId);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(message.messageId, message);
  };

  getMyToken = async() => {
    this.defaultPaginationCatalogue();
    let token = await getStorageData('token',true)
    this.setState({token:token}, ()=>{
      this.getMyBidsList(token, "normal");
    })
  };
 

  defaultPaginationCatalogue = () => {
    this.setState({
      prev_page: 0,
      current_page: 0,
      next_page: 1,
      total_pages: 0,
      apiData: {} as MyBidsData,
    });
  };

  getMyBidsList = async (token: string, callingType: string,) => {
    let {
      next_page,
      total_pages,
      page_size,
    } = this.state;
    if (callingType === "normal") {
      if (total_pages === 1) {
        next_page = 1;
      }
      this.defaultPaginationCatalogue();
    } else if (next_page == null) {
      return false;
    }

    this.setState({ loading: true });

    const header = {
      token: token,
    };

    this.ApiCallFun(
      header,
      null,
      configJSON.getSellersAPIMethod,
      configJSON.getMyBidsListApiEndPoint + `?page=${next_page}&per_page=${page_size}`,
      (messageId) => {
        this.getMyBidsApiCallId = messageId;
      }
    );
  };

  formatNumber = (num : number) => {
    const number = Number(num);
    return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
  };

  navigateToViewProductSourcing = (id: string) => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistViewProductSourcingPageMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.StylistViewProductSourcingPage), {
      requestId: id,
    });
    this.send(message);
  }

  // Customizable Area End
}