import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {isEmpty} from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';
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
  accountHolderName:string;
  IbanNumber:string;
  accountNumber:string;
  accountHolderNameError:boolean;
  IbanNumberError:boolean;
  accountNumberError:boolean;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentsAddBankController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  addBankAccountCallApiId:string = "";
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
      accountHolderName:'',
      IbanNumber:'',
      accountNumber:'',
      accountHolderNameError:false,
      IbanNumberError:false,
      accountNumberError:false,
      loading:false,
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
      this.apiResponseManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

  getTokenAndValue = (message:Message)=>{
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    } 
  }

  apiResponseManage = (message:Message) =>
  {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    )

    if (responseJson) {
      this.setState({loading:false})
      this.checkAllApiCallIdStatus(message)
      
    }else{
      this.setState({loading:false})
      this.parseApiErrorResponse(errorReponse)
    }
  }

  checkAllApiCallIdStatus = (message:Message)=>{
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        if (apiRequestCallId === this.addBankAccountCallApiId) {
          if(responseJson.error != undefined)
          {
            showMessage({
              message: responseJson.error,
              position: { top: 0 },
          });
          }else if (responseJson.errors != undefined) {
            const firstErrorObject = responseJson.errors[0];
            const firstErrorKey = Object.keys(firstErrorObject)[0];
            const firstErrorMessage = "Iban " + firstErrorObject[firstErrorKey];
            showMessage({
              message: firstErrorMessage,
              position: { top: 8 },
              type: "danger",
            });
          }
          else{
            this.setState({accountHolderName:'',IbanNumber:'',accountNumber:''})
            this.apiAfterSuccessManage()
          }
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


  addBankAccount = ()=>{
    if(isEmpty(this.state.accountHolderName))
    {
      this.setState({accountHolderNameError:true})
      return false;
    }
    if(isEmpty(this.state.IbanNumber))
    {
      this.setState({IbanNumberError:true})
      return false;
    }
    if(isEmpty(this.state.accountNumber))
    {
        this.setState({accountNumberError:true})
        return false;
    }
   
    this.afterCallApiAccount()
  }

  afterCallApiAccount = () =>{
    const header = {
      "Content-Type": configJSON.validationFormContentType,
      token: this.state.token
    };

    let formdata = new FormData()

    formdata.append("account_holder_name",this.state.accountHolderName)
    formdata.append("iban",this.state.IbanNumber)
    formdata.append("account_number",this.state.accountNumber)

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addBankAccountCallApiId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addBankAccountApiEndPoint
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
      configJSON.postApiMethod
    );
    this.setState({loading:true})
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

    onAccountHolderNameChange = (name:string)=>{
        this.setState({ accountHolderName: name,accountHolderNameError:false });
    }

    onIbanNumberChange = (text: string) => {
        this.setState({IbanNumber: text, IbanNumberError: false });
    };

    onAccountNumberChange = (text: string) => {
        if (this.checkNumberExists(text)) {
            this.setState({
                accountNumber: text
            });
        }
        this.setState({ accountNumberError: false });
    };

    checkNumberExists = (text:string)=>{
        let regexCheck = new RegExp(/^\d+$/)
        let checkNumber = regexCheck.test(text);
        return checkNumber;
    }

    apiAfterSuccessManage = ()=>{
        showMessage({
            message: i18n.t('bankAccountAddSuccessText'),
            position: { top: 0 },
        });
        this.props.navigation.goBack()
    }
  // Customizable Area End
}
