import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token:string;
  loading:boolean;
  message : string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LoyaltyConfirmationController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
        token:'',
        loading:false,
        message : ''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
            const responseData = message.getData(
                getName(MessageEnum.LoyaltyConfirmationData)
            );
            this.setState({
                message: responseData.promo_code.description
            });
        }
        // Customizable Area End
    }

  // Customizable Area Start
    btnRedirectCatalogue = ()=>{
      const message = new Message(getName(MessageEnum.NavigationCheckout));
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
    }
  // Customizable Area End
}
