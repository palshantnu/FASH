import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Linking } from "react-native";
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
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactUsSupportDriverController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
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
      token:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    } 
    // Customizable Area End
  }

  btnContactUsAddRedirectionDriver = (contactType:string,headerTitle:string)=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationContactUsAddContactDriverMessage)
    );

    msg.addData(getName(MessageEnum.ContactUsTypeMessage), contactType);

    msg.addData(getName(MessageEnum.ContactUsHeaderTitleMessage), headerTitle);

    msg.addData(getName(MessageEnum.ContactUsTokenMessage), this.state.token);

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msg);
  }

  adminCallDriver = ()=>{
    const phoneNumberAdmin = '8962687619'
    Linking.openURL(`tel:${phoneNumberAdmin}`);
  }
  // Customizable Area End
}
