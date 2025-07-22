import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  stylistPortfolioDetailProfile : string;
  stylistPortfolioDetailDesc : string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class StylistPortfolioSingleImageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
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
        loading: true,
        stylistPortfolioDetailProfile: "",
        stylistPortfolioDetailDesc: ""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
        this.handleNavigationPayloadMessage(message);
      }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    // Customizable Area End
  }

  // Customizable Area Start
  private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.StylistPortfolioSingleImage));
    this.setState({
      stylistPortfolioDetailProfile: data.item.url,
      stylistPortfolioDetailDesc: data.item.description
    });
  }
  // Customizable Area End
}