import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import { EmitterSubscription } from "react-native";
import { mastercard } from "./assets";
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
  token: string;
  loading: boolean;
  selected: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddCardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  willFocus = { remove: () => {} } as EmitterSubscription;
  willBlur = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: false,
      selected: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      return this.handleToken(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.getToken();
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
      this.getToken();
    });
    this.willBlur = this.props.navigation.addListener("willBlur", () => {
      runEngine.unSubscribeFromMessages(
        this as IBlock,
        this.subScribedMessages
      );
    });
  };

  componentWillUnmount = async () => {
    this.willFocus.remove();
    this.willBlur.remove();
    runEngine.unSubscribeFromMessages(this as IBlock, this.subScribedMessages);
  };

  getToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  handleToken = (message: Message) => {
    const token = message.getData(getName(MessageEnum.SessionResponseToken));
    this.setState({ token, selected: this.cards[0].id });
  };

  get cards() {
    return [
      { cardBrand: mastercard, id: "card-1", last4: 6527 },
      { cardBrand: mastercard, id: "card-2", last4: 2728 },
    ];
  }

  goToAddCards = () => {
    const message = new Message(getName(MessageEnum.NavigationAddCard));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  select = (paymentMethodId: string) => {
    this.setState({ selected: paymentMethodId });
  };
  // Customizable Area End
}
