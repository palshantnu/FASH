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
    loading:boolean;
    adminRequestArr:any[];
    token:any;
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2selleradminrequestController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
   getAdminRequestApiCallID:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading:false,
      adminRequestArr:[],
      token:'',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

    async componentDidMount(): Promise<void> {
        this.getToken()
        this.props.navigation.addListener('didFocus', async() => {
        this.getToken()
        })
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        this.getTokenAdminValue(message)
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        let errorReponse = message.getData(
            getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        
        if (responseJson && !responseJson.errors) {
            if (apiRequestCallId === this.getAdminRequestApiCallID) {
            this.setState({ loading: false,adminRequestArr:responseJson.data });
            }

        }else if (errorReponse) {
            this.setState({ loading: false });
            this.parseApiErrorResponse(errorReponse)
        }
        }
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    getTokenAdminValue = (message:Message)=>{
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({token:token})
            this.getAllAdminRequestData(token)
        }
    }

    getAllAdminRequestData = async(token:string)=>{

        const header = {
        "Content-Type": configJSON.validationApiContentType,
        token:token
        };

        const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getAdminRequestApiCallID = requestMessage.messageId;
        requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAdminRequestApiEndPoint
        );

        requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
        );

        requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
        );

        this.setState({ loading: true })

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }
  // Customizable Area End
}
