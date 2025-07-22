import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

interface SubImageRoot2 {
  imageId: number
  image: any
}
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
  token: string;
  chunkedArray: SubImageRoot2[][],
  imageData: SubImageRoot2[],
  user_id: string,
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class SeeAllStylistPortfolioImageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPortfolioImagesApiCallID = "";
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
        chunkedArray: [],
        imageData: [],
        token: "",
        user_id: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      this.handleSessionResponseMessage(message);
      return;
    }
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
      return;
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestAPIResponseMessage(message);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
    private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.SeeAllStylistPortfolioImage));
    this.setState({ user_id: data.stylistId },()=>{
        this.getPortfolioImages(this.state.token);  
    } );
  }
  
  private handleSessionResponseMessage(message: Message) {
    let token = message.getData(getName(MessageEnum.SessionResponseToken));
    runEngine.debugLog("TOKEN", token);
    if (token) {
      this.setState({ token: token }, () => {
        this.getPortfolioImages(this.state.token);
      });
    }
  }
  
  private handleRestAPIResponseMessage(message: Message) {
    const dataMessage = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
  
    if (this.getPortfolioImagesApiCallID === dataMessage) {
      this.handlePortfolioImagesResponse(message);
    }
  }

  private handlePortfolioImagesResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!responseJson.errors) {
      this.setState({ imageData: responseJson.data[0]?.attributes?.images }, () => {
        this.chunkArray(this.state.imageData, 3);
      });
    } 
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  chunkArray = (array: SubImageRoot2[], chunkSize: number) => {
    const result: SubImageRoot2[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    this.setState({ chunkedArray: result, loading: false })
  };

  navigateTo = (item: any) => {
    const message = new Message(
        getName(MessageEnum.NavigationStylistPortfolioSingleImageMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      message.addData(getName(MessageEnum.StylistPortfolioSingleImage), item);
      this.send(message);
}

  apiCall = (
    apiLink: string,
    type: string,
    header: unknown,
    content: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiLink
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), type);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), content);
    setMessageId(message.messageId);
    runEngine.sendMessage(message.messageId, message);
  };

  getPortfolioImages = (token: string) => {
    if ((this.state.user_id == '') || (this.state.token == '')) {
    return;
    }
    this.setState({ loading: true })
    const header = {
      token: token
    };
    this.apiCall(
    `${configJSON.getPortfoliosImagesEndPoint}${this.state.user_id}`,
      configJSON.validationApiMethodType,
      header,
      null,
      (messageId) => {
        this.getPortfolioImagesApiCallID = messageId;
      }
    );
  };
  // Customizable Area End
}