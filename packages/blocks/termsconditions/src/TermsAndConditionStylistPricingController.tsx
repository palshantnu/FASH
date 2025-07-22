import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config'
import { getStorageData } from "framework/src/Utilities";
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

export default class TermsAndConditionStylistPricingController extends BlockComponent<
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
  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getTermNdCondition(i18n.language);
  }

  async getTermNdCondition(languageGet:string) {
    this.setState({
      loading: true
    });

    let token = await getStorageData('token',true)

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };

    const termNdCondition = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.termNdConditionID = termNdCondition.messageId;
    termNdCondition.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    if(languageGet === 'en')
    {
      termNdCondition.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getTermsNDCondsStylistPricingApiEndPoint
      );
    }else{
      termNdCondition.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getTermsNDCondsStylistPricingApiEndPoint+'?language=ar'
      );
    }
    termNdCondition.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(termNdCondition.id, termNdCondition);
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      if (this.termNdConditionID == message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        const responseJsonDataTnC = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
  
        if (responseJsonDataTnC && !responseJsonDataTnC.errors) {
          this.handleSuccessApiResTnC(responseJsonDataTnC)
        }
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  handleSuccessApiResTnC(data: TermsConditionProps) {
    this.setState({
      loading: false
    });
    this.setState({ htmlCode: data?.description })
  }
  // Customizable Area End
}
