import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData, setStorageData } from "framework/src/Utilities";
import moment from "moment";
// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';

export interface ItemAttributesProps {
  quantity: number,
  catalogue_name: string,
  catalogue_variant_color: string,
  catalogue_variant_size:string,
  catalogue_variant_front_image:string|null,
  status:string,
  return_type:string
}
export interface ItemArrProps {
    id:string,
    attributes:ItemAttributesProps,
}

export interface DeliveryAttributesProps {
  name:string,
  street: string,
  zip_code: string,
  area: string,
  block: string,
  city: string,
  house_or_building_number: string,
}

export interface DeliveryAddProps {
  id:string,
  attributes:DeliveryAttributesProps
}

export interface OrderAttributesProps {
  order_number:string,
  order_date:string,
  status:string,
  order_items:ItemArrProps[],
  delivery_addresses:DeliveryAddProps,
  placed_at:string
}

export interface OrderArrProps {
    id:string,
    attributes:OrderAttributesProps
  }
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
  token: string;
  token1: string;
  loading:boolean;
  orderArr:OrderArrProps[];
  orderType:string;
  cancelOrderModal:boolean;
  orderId:string;
  orderIndex:number;
  buttonText:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderManagementBuyerOrderViewController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerOrderApiCallId = "";
  getBuyerOrderCancelApiCallId = "";
  cancelRefundApiCallId= "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      token1: "",
      loading:false,
      orderArr:[],
      orderType:'Processing',
      cancelOrderModal:false,
      orderId:'0',
      orderIndex:0,
      buttonText:""
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token1: token })
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

        const orderType = message.getData(
          getName(MessageEnum.OrderTypeNavigationPayloadMessage)
        )

        const navigationToken = message.getData(
          getName(MessageEnum.navigationTokenMessage)
        );
       await setStorageData("orderType",JSON.stringify(orderType))
        this.setState({token:navigationToken,orderType:orderType})
        if(orderType==="Delivered"){
          this.setState({buttonText:i18n.t("ReturnOrder")})
          this.getOrderAccordingStatus(orderType);
        }
        if(orderType==="Returned"){
          this.setState({buttonText:i18n.t("ReturnCancel")})
          this.getOrderAccordingStatus(orderType);
        }
        if(orderType === 'Processing')
        {
          this.getOrderAccordingStatus(orderType);
          this.setState({buttonText:i18n.t("CancelOrder")})
        }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleStoreApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenForOrderStatus();

    this.props.navigation.addListener("willFocus",() => {
      this.getTokenForOrderStatus();
    });
    // Customizable Area End
  }

  getTokenForOrderStatus = async() => {
    let orderType= await getStorageData("orderType")
     this.setState({orderType:JSON.parse(orderType)})
    const msgTokenOrder: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgTokenOrder);
  };

  handleStoreApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    this.setState({loading:false})
    if (responseJson) {
      if (apiRequestCallId === this.getBuyerOrderApiCallId) {
        if(responseJson.errors === undefined)
        {
            this.setState({orderArr:responseJson.data})
        }
      }

      if (apiRequestCallId === this.getBuyerOrderCancelApiCallId || apiRequestCallId === this.cancelRefundApiCallId) {
        if(responseJson.errors === undefined)
        {
          let dataGet = this.state.orderArr
          dataGet.splice(this.state.orderIndex,1)
          this.setState({cancelOrderModal:false,orderArr:dataGet})
          showMessage({
            message: i18n.t("orderCancelSuccessMessage"),
            position: { top: 0 },
          });
        }
      }
    }
  }

  btnOrderStatusRedirect = async(orderId:string, status: string)=>{
     await setStorageData('orderId',JSON.stringify(orderId))
     await setStorageData('orderStatus',JSON.stringify(status))
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "OrderManagementBuyerOrderStatus"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.LoginOptionsNavigationDataMessage),
      {orderId: orderId, status: status}
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
  }

orderRedirectMode = async(orderId:string, return_type:string|null)=>{
  await setStorageData("orderId",orderId)
  const msg: Message = new Message(getName(MessageEnum.NavigationMessage));
  msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  msg.addData(
    getName(MessageEnum.NavigationTargetMessage),
    "OrderReturnMode"
  );
  const raiseMessage: Message = new Message(
    getName(MessageEnum.NavigationPayLoadMessage)
  );
  raiseMessage.addData(getName(MessageEnum.SessionResponseData),return_type);
  msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
  this.send(msg);
  }

  orderDetailRedirect = async(orderId:string)=>{
    await setStorageData("orderId",orderId)
    const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationOrderBuyerSummary)
      );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
}

  getOrderAccordingStatus = async(orderType:string) => {
    let token = await getStorageData('token',true)
      this.setState({loading:true})
      const header = {
          "Content-Type": configJSON.apiContentType,
          token: token,
      };
      const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getBuyerOrderApiCallId = requestMessage.messageId;

      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getBuyerOrderStatusApiEndPoint+'?status='+orderType.toLowerCase()
      );

      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
      );
      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.listOfOrdersMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  dateFormatChange = (date:string) => {
    let dateUpdate = moment(date).format("DD MMM YYYY");
    return dateUpdate
  }

  cancelOrder = (orderId:string,orderIndex:number)=>{
    if(this.state.orderType==="Delivered"){
      const message: Message = new Message(
        getName(MessageEnum.NavigationRefundmanagement)
      );
  
      message.addData(getName(MessageEnum.RefundmanagementNavigationPayloadMessage), orderId);
  
      message.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );
  
      this.send(message);
    } else{
      this.setState({cancelOrderModal:true,orderId:orderId,orderIndex:orderIndex})
    }
  }

  cancelOrderConfirm = async()=>{
    this.setState({loading:true,cancelOrderModal:false})
    if(this.state.orderType==="Returned"){
      this.refundOrderUpdate()
    }else{
    let tokenGet = await getStorageData('token',true)
      const header = {
          "Content-Type": configJSON.apiContentType,
          token: tokenGet,
      };
      const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getBuyerOrderCancelApiCallId = requestMessage.messageId;

      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.cancelBuyerOrderApiEndPoint+'?order_id='+this.state.orderId
      );

      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
      );
      requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.cencelOrderMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  }

  cancelModalClose = ()=>{
    this.setState({ cancelOrderModal: false });
  }
  refundOrderUpdate=()=>{
    let selectItems:number[]=[]
    this.state.orderArr[this.state.orderIndex].attributes.order_items.forEach(element=>{
      selectItems.push(parseInt(element.id))
    })
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token1,
  };
  const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
  );
  let date=new Date();
  let dateNew=moment(date,'DD-MM-YYYY')
  dateNew.add(1,'days')
  this.cancelRefundApiCallId = requestMessage.messageId;
  let newdates=moment(dateNew).format('DD-MM-YYYY')
  let times=moment(date).format('H A')
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
);
  requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.returnOrderEndPoint+this.state.orderId+"&type=cancel_return&order_return_date="+newdates+"&order_return_time="+times+"&order_item_ids=["+selectItems.toString()+"]"
  );
  requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
