import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

import i18n from '../../../components/src/i18n/i18n.config';
interface DriverQueryAttributesProps
{
  id:number;
  title:string;
  answer:string;
  status?:boolean;
}
interface DriverQueryProps {
  id:number;
  attributes:DriverQueryAttributesProps;
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
  token: string;
  queryContactArr:DriverQueryProps[];
  languageGet:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactusDriverController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      queryContactArr:[
        {
          id:1,
          "attributes":{
            "id":1,
            "title":i18n.t('payoutText'),
            "answer":i18n.t('payoutAnswerText')
          }
        },
        {
          id:2,
          "attributes":{
            "id":2,
            "title":i18n.t('applicationNotApprovedText'),
            "answer":i18n.t('applicationNotApprovedAnswerText')
          }
        },
        {
          id:3,
          "attributes":{
            "id":3,
            "title":i18n.t('othersText'),
            "answer":i18n.t('otherDriverAnswerText')
          }
        }
      ],
      languageGet:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
        this.getToken();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token,languageGet:i18n.language });
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

  openCloseQuestion = async(questionIndex:number) => {
    let contactData = this.state.queryContactArr
  
    if (contactData[questionIndex].attributes.status) {
      contactData[questionIndex].attributes.status = false
    }
    else {
        for (let i = 0; i < contactData.length; i++) {
            if (i == questionIndex) {
                contactData[i].attributes.status = true;
            }
            else {
                contactData[i].attributes.status = false;
            }
        }
    }
    this.setState({queryContactArr:contactData})
  }

    contactUsSupportDriverRedirection = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationContactUsSupportDriverMessage)
        );
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );
        this.send(msgNavigation);
    }
  // Customizable Area End
}
