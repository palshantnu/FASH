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
import i18n from '../../../components/src/i18n/i18n.config';
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start

interface DriverPolicyProps {
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
  loading: boolean;
  htmlCode: string;
  headerTitleMessage:string;
  headerShowTitle:string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsConditionsDriverPolicyController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDriverPolicyApiCallId: string = '';
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
      token: "",
      loading: false,
      htmlCode: '',
      headerTitleMessage:'',
      headerShowTitle:''
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
            const policyType = message.getData(
                getName(MessageEnum.PolicyTypePayloadMessage)
            );
            
            this.setState({headerTitleMessage:policyType})
        }

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

            const apiRequestCallIdTnC = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            const responseJsonDataTnC = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (responseJsonDataTnC && !responseJsonDataTnC.errors) {
                this.handleSuccessApiResDriver(apiRequestCallIdTnC, responseJsonDataTnC);
            } else {
                this.handleErrorApiResDriver();
            }
        }
        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();
        this.getDriverPolicy(i18n.language)
        this.props.navigation.addListener('didFocus', async() => {
            this.getDriverPolicy(i18n.language)
        })
    }

    handleErrorApiResDriver() {
        this.setState({
        loading: false
        });
    }

    handleSuccessApiResDriver(apiRequestCallId: string, data: DriverPolicyProps) {
        this.setState({loading: false});
        if (apiRequestCallId === this.getDriverPolicyApiCallId) {
        this.setState({ htmlCode: data.description })
        }
    }

    getDriverPolicy=async(languageG:string)=> {
        let tokenManage = await getStorageData("token", true);
        let payoutPolicyApiEndPoint = '';
        let deliveryPolicyApiEndPoint = '';
        if(languageG === 'en')
        {
          payoutPolicyApiEndPoint = configJSON.getPayoutPolicyApiEndPoint
          deliveryPolicyApiEndPoint = configJSON.getProductDeliveryPolicyApiEndPoint
        }else{
          payoutPolicyApiEndPoint = configJSON.getPayoutPolicyApiEndPoint+'&language=ar';
          deliveryPolicyApiEndPoint = configJSON.getProductDeliveryPolicyApiEndPoint+'&language=ar';
        }
        const header = {
            "Content-Type": configJSON.apiContentType,
            token:tokenManage
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverPolicyApiCallId = requestMessage.messageId;
        if(this.state.headerTitleMessage === 'Payout Policy')
        {
          this.setState({headerShowTitle:i18n.t('payoutPolicyText')})
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                payoutPolicyApiEndPoint
            );
        }else{
            this.setState({headerShowTitle:i18n.t('productPolicyText')})
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                deliveryPolicyApiEndPoint
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
}
