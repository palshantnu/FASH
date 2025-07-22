import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {CountResponseJson} from "./types"
import { showMessage } from "react-native-flash-message";

export interface DropDownListType {
  id: string;
  sku: string
}
export const configJSON = require("./config");

type Errors = | [
  {
    message: string;
  }
] | null


// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string | null;
  loading: boolean;
 
  errorMsg: {
    errorHeader: string,
    errorTitle: string
  },
  timing:number;
  sellerOrderId:null|string
  
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AcceptOrderController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateTheAcceptStatusMsgId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",

      errorMsg: {
        "errorHeader": "",
        "errorTitle": ""
      },
    timing:30,
    sellerOrderId:null,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const sellerOrderId = message.getData(
        getName(MessageEnum.NavigationPlayLoadSellerOrderId));

      this.setState({
       sellerOrderId
      } )
    }
    if (!this.state.token) {
      if (getName(MessageEnum.SessionResponseMessage) === message.id) {
        const token = message.getData(getName(MessageEnum.SessionResponseToken));
        this.setState({ token: token });
      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (errorReponse) {
        this.setState({ loading: false })
        showMessage({
          message: 'something went wrong',
          position: { top: 0 },
        });
      }
      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.updateTheAcceptStatusMsgId) {
          this.handleAcceptOrderResponse(responseJson)
        }
        this.setState({ loading: false })
    
      }
     
    }
 
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    if (!this.state.token) {
      this.getTokenInAssign();
    }

    this.props.navigation.addListener("willFocus", () => {
     

    });
  }

  getTokenInAssign = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  handleAcceptOrderResponse=(responseJson:CountResponseJson)=>{
    if (responseJson && !responseJson.error && !responseJson.errors && responseJson.data) {
      showMessage({
        message: 'Order Accepted',
        position: { top: 0 },
      });
    
    }
    this.navigationToOredrSummary()
  }
  navigationToOredrSummary=()=>{
    const message: Message = new Message(
      getName(MessageEnum.OrderSummaryNavaigationMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);

    
  }

  goBackToOrderSummaryScreen=()=>{
    this.props.navigation.goBack()
    
  }
  increaseTiming = () => {
    this.setState((prevState) => ({
      timing: prevState.timing + 5 
    }));
  }

  decreaseTiming = () => {
    this.setState(prevState => ({
      timing: Math.max(5, prevState.timing - 5) 
    }));
  }

  updateTheStatus = async () => {
const {token,sellerOrderId,timing}=this.state
    const headerAssign = {
      "Content-Type": configJSON.applicationJson,
      token: token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateTheAcceptStatusMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateTheOrderStatus+`seller_order_id=${sellerOrderId}&type=accept&driver_id=94&accept_order_upload_time=${timing}`

    );


    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };

  // Customizable Area End
}
