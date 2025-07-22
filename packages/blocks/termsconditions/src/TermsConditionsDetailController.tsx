import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface ITermsCondsUsers {
  id: string;
  attributes: {
    created_at: string;
    description: string;
    accepted_by: [
      {
        account_id: string;
        accepted_on: string;
        email: string;
      }
    ];
  };
}

interface PrivacyPolicyProps {
  description:string
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
  termsCondsUserList: ITermsCondsUsers[];
  loading: boolean;
  htmlCode: string;
  isLoading:boolean;
  termsCondsId: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsConditionsDetailController extends BlockComponent<
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
      termsCondsUserList: [],
      loading: false,
      htmlCode: '',
      isLoading:false,
      termsCondsId: '',
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

  handleErrorApiResTnC(errorResponseTnC: any) {
    this.setState({
      loading: false
    });
  }

  handleSuccessApiResTnC(apiRequestCallId: string, data: PrivacyPolicyProps) {
    this.setState({
      loading: false
    });
    if (apiRequestCallId === this.termNdConditionID) {
      this.setState({ htmlCode: data.description })
    }
  }

  async getTermNdCondition(languageGet:string) {
    this.setState({
      loading: true
    });
    const termNdCondition = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.termNdConditionID = termNdCondition.messageId;
    if(languageGet === 'ar')
    {
      termNdCondition.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getPrivacyPolicyEndpoint+'?language=ar'
      );
    }else{
      termNdCondition.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getPrivacyPolicyEndpoint
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
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const termsCondsUsersData = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      const { termsCondsUsers } = termsCondsUsersData;
      this.setState({ termsCondsUserList: termsCondsUsers });
    }

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
      if (responseJsonDataTnC && !responseJsonDataTnC.errors) {
          this.handleSuccessApiResTnC(apiRequestCallIdTnC, responseJsonDataTnC);
      } else {
        this.handleErrorApiResTnC(errorResponseTnC);
      }
    }
    // Customizable Area End
  }
}
