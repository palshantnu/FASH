import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config'
import { Alert } from "react-native";
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

interface SingupPolicyProps {
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
  loading: boolean;
  token: string;
  htmlCodeSingup: string;
  headerTitleUserMessage:string;
  showHeaderTitle:string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsAndConditionsPrivacyController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllUserPolicyApiCallId: string = '';
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      htmlCodeSingup: '',
      headerTitleUserMessage:'',
      showHeaderTitle:''
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            const responseJsonData = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (responseJsonData && !responseJsonData.errors) {
                this.handleSuccessApiResSingup(apiRequestCallId, responseJsonData);
            } else {
                this.handleErrorApiResSingup();
            }
        }
        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();
        this.getAllUserPolicy(i18n.language)
        this.props.navigation.addListener('didFocus', async() => {
            this.getAllUserPolicy(i18n.language)
        })
    }

    handleErrorApiResSingup() {
        this.setState({
        loading: false
        });
    }

    handleSuccessApiResSingup(apiRequestCallId: string, data: SingupPolicyProps) {
        this.setState({loading: false});
        if (apiRequestCallId === this.getAllUserPolicyApiCallId) {
        this.setState({ htmlCodeSingup: data.description })
        }
    }

    getAllUserPolicy=async(getLanguage:string)=> {
        let policyType = await getStorageData('policyType',true)
        this.setState({headerTitleUserMessage:policyType})
        const header = {
            "Content-Type": configJSON.apiContentType,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getAllUserPolicyApiCallId = requestMessage.messageId;
        if(policyType === 'Privacy Policy')
        {
          this.setState({showHeaderTitle:i18n.t('privacyPolicyText')})
          if(getLanguage === 'en')
          {
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                configJSON.getPrivacyPolicyEndpoint
            );
          }else{
            requestMessage.addData(
              getName(MessageEnum.RestAPIResponceEndPointMessage),
              configJSON.getPrivacyPolicyEndpoint+'?language=ar'
            );
          }
        }else{
          this.setState({showHeaderTitle:i18n.t('termsConditionsText')})
          if(getLanguage === 'en')
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
}
