import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert } from "react-native";
// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End
export const configJSON = require("./config");
// Customizable Area Start
export interface ITermsCondsUsers {
  account_id: string;
  accepted_on: string;
  email: string;
}
interface ShippingPolicyProps {
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
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ShippingPolicyController extends BlockComponent<
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
      token: '',
      termsCondsUserList: [],
      loading: false,
      htmlCode: '',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getTokenPolicy();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenPolicy();
    });
  }

  getTokenPolicy = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      runEngine.debugLog("Message Recived == =", message);
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getShippingPolicy(token,i18n.language);
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
      this.setState({ loading: false })
      if (apiRequestCallIdTnC === this.termNdConditionID) {
        this.handleSuccessApiResTnC(responseJsonDataTnC);
      }
    }
    // Customizable Area End
  }
  handleErrorApiResTnC() {
    this.setState({
      loading: false
    });
    Alert.alert("Error", "No data present")
  }

  handleSuccessApiResTnC(data: ShippingPolicyProps) {
    this.setState({
      loading: false
    });
    if(data.description){
      this.setState({ htmlCode: data?.description })
    }else {
      Alert.alert("Error", "No data present")
    }
  }

  getShippingPolicy(token:string,languageGet:string) {
    this.setState({
      loading: true
    });

    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token
    };

    const shippingPolicy = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.termNdConditionID = shippingPolicy.messageId;

    if(languageGet === 'en')
    {
      shippingPolicy.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getShippingPolicy
      );
    }else{
      shippingPolicy.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getShippingPolicy+'&language=arabic'
      );
    }


    shippingPolicy.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    shippingPolicy.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );
    runEngine.sendMessage(shippingPolicy.id, shippingPolicy);
  }
}
