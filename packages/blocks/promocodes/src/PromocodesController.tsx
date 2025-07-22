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
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  
  loading: boolean;
 
  token: string;
  
  storeId:string
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class PromocodesController extends BlockComponent<Props, S, SS> {
  apiPromoCodeCallId: string = "";
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
      loading:false,
      token: '',
     
      storeId:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
   
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
     
    }
    
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
  
    

      
      if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
        const payloadMessage = message.getData(
          getName(MessageEnum.NavigationPayLoadMessage)
        );
        this.setState({
          storeId: payloadMessage.storeId
        })
        
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
 

  handleRedirection(promocode: string) {
    this.props.navigation.navigate("PromocodeDetails", {
      promocode: JSON.stringify(promocode),
    });
  }


  handleScreen =()=>{
    const msgss: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    msgss.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'CreateOffer' 
    );
    msgss.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    )
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    
    msgss.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgss);
  }
  // Customizable Area End
}
