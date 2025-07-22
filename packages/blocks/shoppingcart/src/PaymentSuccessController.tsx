import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { getStorageData } from "framework/src/Utilities";
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
  loading: boolean;
  token: string;
  order_id: string;
  store: string;
  loyaltyPoints:number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PaymentSuccessController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      order_id: "",
      token: "",
      store: "",
      loyaltyPoints:0
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.props.navigation.addListener("willFocus", async() => {
      let loyaltyPointsToSet = await getStorageData('loyaltyPoints',true)
        this.setState({loyaltyPoints:loyaltyPointsToSet})
     });
    // Customizable Area End
  }

  receive = async (from: string, message: Message) => {
    // Customizable Area Start
    // Customizable Area End
  };

  // Customizable Area Start
  goToOrders = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationBuyerAllOrder)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  // Customizable Area End
}
