import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";

export interface DropDownListType {
  id: string;
  sku: string
}
export const configJSON = require("./config");

type Errors = | [
  {
    message: string;
  }
] | null


// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderReturnConfirmController extends BlockComponent<
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
     
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

 
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    if (!this.state.token) {
      this.getToken();
    }
 }

  getToken = async() => {
  
      const token = await getStorageData("token", true);
     
      this.setState({ token})
   
  };
  backRedirection = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), 'Returned');

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }
 

  // Customizable Area End
}
