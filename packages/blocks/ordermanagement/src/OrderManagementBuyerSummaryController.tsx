import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData,setStorageData } from "framework/src/Utilities";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';
export interface ItemAttributesOrderProps {
  driver_name: string;
  quantity: number,
  catalogue_name: string,
  catalogue_variant_color: string,
  catalogue_variant_size:string,
  catalogue_variant_front_image:string|null,
  store_name:string,
  status: string,
  reason_of_return: string,
  return_type: string,
  stylist_full_name:string
}
export interface ItemArrOrderDetProps {
    id:string,
    attributes:ItemAttributesOrderProps,
}

export interface DeliveryAttributesOrderDetProps {
  name:string,
  street: string,
  zip_code: string,
  area: string,
  block: string,
  city: string,
  house_or_building_number: string,
}

export interface DeliveryAddOrderDetProps {
  id:string,
  attributes:DeliveryAttributesOrderDetProps
}

interface PaymentDetailsProps {
  "id": number;
  "status": string;
  "charge_id": string;
  "merchant_id": null,
  "order_id": string;
  "amount": string;
  "currency": string;
  "customer_id": string;
  "reason": string;
  "account_id": number,
  "order_management_order_id": null,
  "refund_id": null,
  "refund_amount": string;
  "refund_reason": null,
  "seller_order_id": null,
  "last_four_card_digit": string;
  "payment_type": string;
  "deleted": boolean,
  "temp_order_id": number;
}

export interface OrderAttributeProps {
  order_number:string,
  order_date:string,
  reason_of_return:string,
  status:string,
  order_items:ItemArrOrderDetProps[],
  applied_copon_code:string|null,
  delivery_addresses:DeliveryAddOrderDetProps,
  placed_at:string;
  payment_detail:PaymentDetailsProps
  applied_discount:string|null
}

export interface OrderDetailProps {
  id:string;
  attributes:OrderAttributeProps,
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
  loading:boolean;
  orderDetailArr:OrderDetailProps;
  orderId:string;
  cancelOrderModal:boolean,
  retern_items:ItemArrOrderDetProps[],
  localCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderManagementBuyerSummaryController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerOrderDetailApiCallId = "";
  returnOrderID: string = "";
  cancelRefundApiCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      loading:false,
      cancelOrderModal:false,
      retern_items:[],
      orderDetailArr:{
        id:'0',
        attributes:{
          order_number:'',
          order_date:'',
          status:'',
          reason_of_return:"",
         
          order_items:[
          ],
          delivery_addresses:{
            id:'',
            attributes:{
              name:'',
              street: '',
              zip_code: '',
              area: '',
              block: '',
              city: '',
              house_or_building_number: '',
            }
          },
          placed_at:'',
          payment_detail:{
            "id": 0,
            "status": "",
            "charge_id": "",
            "merchant_id": null,
            "order_id": "",
            "amount": "",
            "currency": "",
            "customer_id": "",
            "reason": "",
            "account_id": 0,
            "order_management_order_id": null,
            "refund_id": null,
            "refund_amount": "",
            "refund_reason": null,
            "seller_order_id": null,
            "last_four_card_digit": "",
            "payment_type": "",
            "deleted": false,
            "temp_order_id": 0
          },
          applied_copon_code: null,
          applied_discount: "0"
        }
      },
      orderId:'0',
      localCurrency:''
    }  

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
      this.getOrderDetail(token)
    }
   
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleStoreApiResponsesSum(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenForOrderStatus();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenForOrderStatus();
    });
    let currencyGet = await getStorageData('currencyIcon', true)
    this.setState({ localCurrency: currencyGet })
    // Customizable Area End
  }

  handleStoreApiResponsesSum = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    this.setState({loading:false})
    if (responseJson) {
      if (apiRequestCallId === this.getBuyerOrderDetailApiCallId) {
        if(responseJson.errors === undefined)
        {   
          let orderData=responseJson.data
          this.setResponceSummery(orderData)
        }
      }
      if ( apiRequestCallId === this.cancelRefundApiCallId) {
        if(responseJson.errors === undefined)
        { 
          let orderDetailArr=this.state.orderDetailArr
          orderDetailArr.attributes.status="return_cancelled"
          this.setState({cancelOrderModal:false,orderDetailArr:orderDetailArr})
          showMessage({
            message: i18n.t("orderCancelSuccessMessage"),
            position: { top: 0 },
          });
         
        }
      }
    }
  }
  setResponceSummery=(orderData:OrderDetailProps)=>{
    let orderReturnItem:ItemArrOrderDetProps[]=[]
    orderData.attributes?.order_items.forEach((element:ItemArrOrderDetProps,index:number )=> {
      if(element.attributes.status==="returned" ||  element.attributes.status==="refunded"){
        orderData.attributes?.order_items.splice(index,1)
        orderReturnItem.push(element)
        
      }
    });
      this.setState({orderDetailArr:orderData,retern_items:orderReturnItem})  
  }
  getTokenForOrderStatus = async() => {
    let orderId= await getStorageData('orderId',true)
    this.setState({orderId:orderId})
    const msgsss: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgsss);
  };

    getOrderDetail = (token:string) => {
        this.setState({loading:true})     
        const header = {
            "Content-Type": configJSON.apiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getBuyerOrderDetailApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getOrderDetailBuyerStoreApiEndPoint+this.state.orderId
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

    returnOrder = () => {
      const message: Message = new Message(
        getName(MessageEnum.NavigationRefundmanagement)
      );
  
      message.addData(getName(MessageEnum.RefundmanagementNavigationPayloadMessage), this.state.orderId);
  
      message.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );
  
      this.send(message);

  }

    btnOrderStatusRedirect = async(orderId:string, status: string, id:string)=>{
      await setStorageData('orderId',JSON.stringify(id))
      await setStorageData('orderIdNew',JSON.stringify(orderId))
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
      {orderId: orderId, status: status, id: id}
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
    }

    dateFormatChangeSummary = (date:string) => {
      let dateUpdateSum = moment(date).format("DD MMM YYYY");
      return dateUpdateSum
    }

    statusManage = (status:string) =>{
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
    returnCancelOrder(){
      this.setState({cancelOrderModal:true})
    }
    cancelModalClose(){
      this.setState({cancelOrderModal:false})
    }
    cancelOrderConfirm(){
      let selectItem:number[]=[]
      this.state.orderDetailArr.attributes.order_items.forEach(element=>{
        selectItem.push(parseInt(element.id))
      })
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.cancelRefundApiCallId = requestMessage.messageId;
    let date=new Date();
    let dateNew=moment(date,'DD-MM-YYYY')
    dateNew.add(1,'days')
    let newdate=moment(dateNew).format('DD-MM-YYYY')
    let time=moment(date).format('H A')
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.returnOrderEndPoint+this.state.orderId+"&type=cancel_return&order_return_date="+newdate+"&order_return_time="+time+"&order_item_ids=["+selectItem.toString()+"]"
    );
  
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.putMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  
  // Customizable Area End
}
