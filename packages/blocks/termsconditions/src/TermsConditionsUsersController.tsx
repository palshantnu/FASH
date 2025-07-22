import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface ITermsCondsUsers {
  account_id: string;
  accepted_on: string;
  email: string;
}

interface TermsConditionProps {
  description:string;
}

// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  loading: boolean;
  htmlCode: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsConditionsUsersController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  termNdConditionID: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: false,
      htmlCode: '',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getTermNdCondition(i18n.language)
    this.props.navigation.addListener('didFocus', async() => {
        this.getTermNdCondition(i18n.language)
    })
  }

  getTermNdCondition=async(appLanguage:string)=> {
    let tokenManage = await getStorageData("token", true);
    let roleGet = await getStorageData('FA_LOGIN_MODE')
    let header = {}
    if(tokenManage != null && roleGet === 'Delivery Partner')
    {
      header = {
          "Content-Type": configJSON.apiContentType,
          token:tokenManage
      };
    }else{
      header = {
        "Content-Type": configJSON.apiContentType,
      };
    }

    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.termNdConditionID = requestMessage.messageId;
    
    if(appLanguage === 'en')
    {
      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getTermsNDCondsApiEndPoint
      );
    }else{
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getTermsNDCondsApiEndPoint+'?language=ar'
      );
    }

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getApiMethod
    );

    this.setState({ loading: true })

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallIdTnC = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJsonDataTnC = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponseTnC = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if(apiRequestCallIdTnC === this.termNdConditionID)
      {
        if (responseJsonDataTnC && !responseJsonDataTnC.errors) {
          this.handleSuccessApiResTnC(responseJsonDataTnC)
        } else if (responseJsonDataTnC && responseJsonDataTnC.errors) {
          this.handleErrorApiResTnC()
        } else if (errorResponseTnC) {
          this.parseApiCatchErrorResponse(errorResponseTnC);
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  handleErrorApiResTnC() {
    this.setState({
      loading: false
    });
  }
  handleSuccessApiResTnC(data: TermsConditionProps) {
    this.setState({
      loading: false
    });
    this.setState({ htmlCode: data?.description })
  }
  // Customizable Area End
}
