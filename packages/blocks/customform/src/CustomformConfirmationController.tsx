import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {removeStorageData} from "../../../framework/src/Utilities"
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
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomformConfirmationController extends BlockComponent<Props, S, SS> {
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
      token:'',
      loading:false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getTokenConfirmation();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenConfirmation();
    });
    // Customizable Area End
  }

  getTokenConfirmation = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  createStoreRedirection = ()=>{
    removeStorageData('createStoreArr')
    removeStorageData('storeAddressMap')
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCustomformCreateStoreUploadMessage)
      );

    msg.addData(
    getName(MessageEnum.NavigationPropsMessage),
    this.props
    );

    this.send(msg);
  }

  logOutBtn = ()=>{
    removeStorageData('storeAddressMap')
    removeStorageData('createStoreArr')
    removeStorageData('SELLER_STATUS')
    removeStorageData('token')
    removeStorageData('autoLogin')
    const msg: Message = new Message(
        getName(MessageEnum.NavigationLoginOptionsMessage)
    );
  
    msg.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
    );

    this.send(msg);

  }
  // Customizable Area End
}
