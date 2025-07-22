import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert} from "react-native";

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

interface ReturnPolicyProps {
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
  htmlCode:string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ReturnPolicyController extends BlockComponent<
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
      htmlCode:'',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }


  async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
}

getToken = () => {
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
      this.getRetunPolicy(i18n.language);
    } 

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallIdTnC = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJsonDataTnC = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJsonDataTnC && !responseJsonDataTnC.errors) {
          this.handleSuccessApiResTnC(apiRequestCallIdTnC, responseJsonDataTnC);
      }
    }
    // Customizable Area End
  }


  handleErrorApiResTnC() {
    this.setState({
      loading: false
    });
  }

  handleSuccessApiResTnC(apiRequestCallId: string, data: ReturnPolicyProps) {
    if (apiRequestCallId === this.termNdConditionID) {
      this.setState({htmlCode: data?.description,loading:false})
    }
  }

  async getRetunPolicy(languageSelected:string) {
    this.setState({
      loading: true
    });
    let token = await getStorageData('token',true)

    let returnPolicyEndPoint = '';
    if(languageSelected === 'en')
    {
      returnPolicyEndPoint = configJSON.getReturnPolicy
    }else{
      returnPolicyEndPoint = configJSON.getReturnPolicy+'&language=ar'
    }
    
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token
    };

    const shippingPolicy = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.termNdConditionID = shippingPolicy.messageId;

    shippingPolicy.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      returnPolicyEndPoint
    );

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
