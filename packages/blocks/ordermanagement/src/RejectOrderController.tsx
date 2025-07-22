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
  reason: string
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
  selectedRejectReason:DropDownListType|null
  allRejectedReason:DropDownListType[];
  sellerOrderId:null|string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RejectOrderController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateTheRejectStatusMsgId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      selectedRejectReason:null,
      allRejectedReason:[
      { reason: 'Out of Stock', id: '1' },
      { reason: 'Pricing Error', id: '2' },
      { reason: 'Order Processing Error', id: '3' },
      { reason: 'Payment Processing Issue', id: '4' },
      { reason: 'Order Limit Exceeded', id: '5' },
      {reason:'Violation of Purchase Policy',id:"6"}
     
    ],
    sellerOrderId:null,
    
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (!this.state.token) {
      if (getName(MessageEnum.SessionResponseMessage) === message.id) {
        const token = message.getData(getName(MessageEnum.SessionResponseToken));
        this.setState({ token: token });
      }
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const sellerOrderId = message.getData(
        getName(MessageEnum.NavigationPlayLoadSellerOrderId));

      this.setState({
       sellerOrderId
      } )
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
          position: { top: 1 },
        });
      }
      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.updateTheRejectStatusMsgId) {
          this.handleRejectOrderResponse(responseJson)
        }
        this.setState({ loading: false })
    
      }
     
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    if (!this.state.token) {
      this.getTokenInReject();
    }

    this.props.navigation.addListener("willFocus", () => {
     

    });
  }

  getTokenInReject = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  handleRejectOrderResponse=(responseJson:CountResponseJson)=>{
    if (responseJson && !responseJson.error && !responseJson.errors && responseJson.data) {
      showMessage({
        message: 'Order Rejected',
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
  updateTheStatus = async () => {
    const {token,sellerOrderId,selectedRejectReason}=this.state
    if(!selectedRejectReason){
      showMessage({
        message: 'Please select the reason',
        position: { top: 0 },
      });
      return
    }
        const headerAssign = {
          "Content-Type": configJSON.applicationJson,
          token: token,
        };
        const requestMessageAssign = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
    
        this.updateTheRejectStatusMsgId = requestMessageAssign.messageId;
    
        requestMessageAssign.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.updateTheOrderStatus+`seller_order_id=${sellerOrderId}&type=reject&driver_id=94&reason_of_rejection=${selectedRejectReason?.reason}`
    
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

  dropDownpUpdatedreason=(selectedReason:DropDownListType)=>{
    this.setState({selectedRejectReason:selectedReason})
  }


  // Customizable Area End
}
