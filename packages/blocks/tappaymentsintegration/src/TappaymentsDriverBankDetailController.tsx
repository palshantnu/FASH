import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { DriverBankMethodProps } from "./types/types";
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
  allPaymentMethodArr:DriverBankMethodProps[];
  token: string;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentsDriverBankDetailController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getDriverPaymentMethodApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.NavigationPayLoadMessage),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
        allPaymentMethodArr:[],
        token: "",
        loading:false
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.handlePaymentMethodApiResponses(message);
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.props.navigation.addListener("willFocus", () => {
          this.getDriverPaymentMethod();
        });
        // Customizable Area End
    }
  
    getDriverPaymentMethod = async() => {
      let token = await getStorageData('token',true)
        this.setState({loading:true,token:token})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
  
        this.getDriverPaymentMethodApiCallId = requestMessage.messageId;
  
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getPaymentMethodApiCallId
        );
  
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    handlePaymentMethodApiResponses = (message: Message) => {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson) {
        if (apiRequestCallId === this.getDriverPaymentMethodApiCallId) {
          if(responseJson.errors === undefined)
          {
              this.setState({allPaymentMethodArr:responseJson.data,loading:false})
          }else{
            this.setState({loading:false})
          }
        }
      }
    }
  // Customizable Area End
}
