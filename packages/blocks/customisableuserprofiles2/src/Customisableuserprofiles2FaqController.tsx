import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import i18n from "../../../components/src/i18n/i18n.config";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start

interface FaqAttributesProps {
  question:string;
  answer:string;
  status:boolean;
}
interface FaqProps {
  id:string;
  attributes:FaqAttributesProps
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
    txtInputValue: string;
    txtSavedValue: string;
    // Customizable Area Start
    loading:boolean;
    faq_arr:FaqProps[];
    faqUpdateArr:FaqProps[];
    faqSearchText:string;
    token:string;
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2FaqController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
   getFaqApiCallID:string="";
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
      txtInputValue: "",
      txtSavedValue: "A",
      // Customizable Area Start
      loading:false,
      faq_arr:[],
      faqUpdateArr:[],
      faqSearchText:'',
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

    this.props.navigation.addListener('willBlur', async() => {
      this.setState({faqSearchText:''})
    })
  }

  select_btn = async(faqIndex:number) => {
  let faqData = this.state.faq_arr

  if (faqData[faqIndex].attributes.status) {
    faqData[faqIndex].attributes.status = false
  }
  else {
      for (let i = 0; i < faqData.length; i++) {
          if (i == faqIndex) {
              faqData[i].attributes.status = true;
          }
          else {
              faqData[i].attributes.status = false;
          }
      }
  }
  this.setState({faq_arr:faqData})
}
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    this.getTokenValue(message)
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
        if (apiRequestCallId === this.getFaqApiCallID) {
          this.setState({ loading: false,faq_arr:responseJson.data,faqUpdateArr:responseJson.data ? responseJson.data : [] });
        }
      }else if (errorReponse) {
        this.setState({ loading: false });
        this.parseApiErrorResponse(errorReponse)
      }
    }
    // Customizable Area End
  }

  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

  getTokenValue = (message:Message)=>{
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({token:token})
      this.getAllFaqData(token, i18n.language)
    }
  }

  getAllFaqData = async(token:string, Language: string)=>{

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token:token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getFaqApiCallID = requestMessage.messageId;
    let faqEndPoint = '';
    if(Language === 'en')
      {
        faqEndPoint = configJSON.faqEndPoint
      }else{
        faqEndPoint = configJSON.faqEndPoint+'?language=arabic';
      }
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      faqEndPoint
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

  searchFaq = (searchvalue:string)=>{
    let faqUpdateArr = this.state.faqUpdateArr
    if(searchvalue === '')
    {
      this.setState({faq_arr:faqUpdateArr})
    }else{
      let data1 = faqUpdateArr
      const newData = data1.filter((item:FaqProps)=> {
          //applying filter for the inserted text in search bar
          const itemData = item.attributes.question.toUpperCase()
          const textData = searchvalue.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      if (newData.length > 0) {
          this.setState({
            faq_arr: newData,
          });
      }
      else {
          this.setState({
            faq_arr: [],
          });
      }
    }
  }

  onSearchInput = (searchText:string)=>{
    this.setState({faqSearchText:searchText})
    this.searchFaq(searchText)
  }
  // Customizable Area End
}
