import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {isEmail,isEmpty} from "../../../framework/src/Utilities"
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';
interface AttachmentsProps {
  type: string;
  uri: string;
  name: string;
}

interface StoreAttributeProps {
  store_name: string;
  id:number;
}

interface StoreProps {
  attributes: StoreAttributeProps
}
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
  contactUsType:string;
  token:any;
  name:string;
  email:string;
  subject:string;
  description:string;
  selectImage:string;
  nameError:boolean;
  emailError:boolean;
  subjectError:boolean;
  descriptionError:boolean;
  selectImageError:boolean;
  storeNameError:boolean;
  contactUsHeaderMessage:string;
  mediamodal:boolean;
  imageFileName:string;
  storeId:string;
  loading:boolean;
  attachmentData:AttachmentsProps;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactUsAddContactController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getAllStoreCallApiId:any;
  addContactUscallApiId:any;
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
      contactUsType:'',
      token:'',
      name:'',
      email:'',
      subject:'',
      description:'',
      selectImage:'',
      nameError:false,
      emailError:false,
      subjectError:false,
      descriptionError:false,
      selectImageError:false,
      storeNameError:false,
      contactUsHeaderMessage:'',
      mediamodal:false,
      imageFileName:'',
      storeId:'0',
      loading:false,
      attachmentData: { name: "", type: "", uri: "" },
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.getTokenAndValue(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )

      if (responseJson) {
        if (apiRequestCallId === this.addContactUscallApiId) {
          this.setState({name:'',email:'',subject:'',description:'',selectImage:'',attachmentData: { name: "", type: "", uri: "" },storeId:'0'})
          showMessage({
            message: i18n.t('contactUsSuccessText'),
            position: { top: 0 },
          });
          this.props.navigation.goBack();
        }
      }else{
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponse)
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getTokenAndValue = (message:any)=>{
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    } 
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const contactUsType = message.getData(
        getName(MessageEnum.ContactUsTypeMessage)
      );

      const contactUsHeader = message.getData(
        getName(MessageEnum.ContactUsHeaderTitleMessage)
      );

      const contactUsToken = message.getData(
        getName(MessageEnum.ContactUsTokenMessage)
      );

      this.setState({contactUsType:contactUsType,contactUsHeaderMessage:contactUsHeader})
    }
  }

  checkBoarderColor(stateValue1:boolean){
    if(stateValue1){
      return 'red';
    }
    else{
      return '#A9A9A9';
    }
  }

  contactUsSubmit = ()=>{
    let emailVerify = isEmail('',this.state.email);
    if(isEmpty(this.state.name))
    {
      this.setState({nameError:true})
      return false;
    }
    if(isEmpty(this.state.email) || !emailVerify.status)
    {
      this.setState({emailError:true})
      return false;
    }
    if(isEmpty(this.state.subject))
    {
      this.setState({subjectError:true})
      return false;
    }
    if(isEmpty(this.state.description))
    {
      this.setState({descriptionError:true})
      return false;
    }
   
    this.afterCallApi()
  }

  afterCallApi = () =>{
    const header = {
      "Content-Type": configJSON.apiContentTypeFormdata,
      token: this.state.token
    };

    let formdata = new FormData()

    formdata.append("data[query_type]","Admin-Related Concerns")
    formdata.append("data[name]",this.state.name)
    formdata.append("data[email]",this.state.email)
    formdata.append("data[subject]",this.state.subject)
    formdata.append("data[description]",this.state.description)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addContactUscallApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addContactApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );
    this.setState({loading:true})
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  // Customizable Area End
}
