import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
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

export interface ItemAttributesProps {
  driver_name: string;
  quantity: number,
  catalogue_name: string,
  catalogue_variant_color: string,
  catalogue_variant_size:string,
  catalogue_variant_front_image:string|null,
  store_name:string,
  status: string,
  reason_of_return: string,
}
export interface ItemArrDetProps {
    id:string,
    attributes:ItemAttributesProps,
}

export interface DeliveryAttributesDetProps {
  name:string,
  street: string,
  zip_code: string,
  area: string,
  block: string,
  city: string,
  house_or_building_number: string,
}

export interface DeliveryAddDetProps {
  id:string,
  attributes:DeliveryAttributesDetProps
}

export interface AttributeProps {
  order_number:string,
  order_date:string,
  reason_of_return:string,
  status:string,
  order_items:ItemArrDetProps[],
  
  delivery_addresses:DeliveryAddDetProps,
  placed_at:string
}

export interface DetailProps {
  id:string;
  attributes:AttributeProps,
}
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
  selectedMode:number,
  cancelOrderModal:boolean,
  order_id:number,
  orderDetailArr:DetailProps
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderReturnModeConfirmController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateTheAcceptStatusMsgId: string = "";
  cancelRefundApiCallId: string = "";
  getBuyerOrderDetailApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
     
      getName(MessageEnum.RestAPIResponceMessage),
    
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      selectedMode:0,
      cancelOrderModal:false,
      order_id:0,
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
          placed_at:''
        }
      }
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (!responseJson) {
      this.parseApiErrorResponse(errorReponse);
      return;
    }
    if (messageId === this.cancelRefundApiCallId) {
      this.goBackToOrderSummaryScreen()
    }
    if (messageId === this.getBuyerOrderDetailApiCallId) {
     this.setState({orderDetailArr:responseJson.data})
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    if (!this.state.token) {
      this.getTokenInAssign();
    }

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenInAssign();

    });
  }

  getTokenInAssign = async() => {
  
      const token = await getStorageData("token", true);
      const idData= await getStorageData('orderId',true);
      const selectedMode = await getStorageData("selectedMode", true);
      this.setState({ token,selectedMode,order_id:idData })
      this.getOrderDetail(idData)
  };

 
  navigationToOredrSummary=()=>{
    if (this.state.selectedMode === 0) {
      showMessage({
        message: i18n.t('selfDropSuccesMessage'),
        position: { top: 0 },
      });
    }
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), 'Returned');

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);
    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(message);
  }

  goBackToOrderSummaryScreen=()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), 'Returned');

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
    
  }
 
  returnCancelOrder=()=>{
    this.setState({cancelOrderModal:true})
  }
  returnCancelModalClose=()=>{
    this.setState({cancelOrderModal:false})
  }
  cancelOrderConfirm(){
    let selectItems:number[]=[]
    this.state.orderDetailArr.attributes.order_items.forEach(element=>{
      selectItems.push(parseInt(element.id))
    })
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
  };
  const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
  );

  this.cancelRefundApiCallId = requestMessages.messageId;
  let dates=new Date();
  let dateNews=moment(dates,'DD-MM-YYYY')
  dateNews.add(1,'days')
  let newdates=moment(dateNews).format('DD-MM-YYYY')
  let times=moment(dates).format('H A')
  requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.returnOrderEndPoint+this.state.order_id+"&type=cancel_return&order_return_date="+newdates+"&order_return_time="+times+"&order_item_ids=["+selectItems.toString()+"]"
  );

  requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
  );
  requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
  );
  runEngine.sendMessage(requestMessages.id, requestMessages);
  }
  getOrderDetail = (orderId:string) => {
    const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
    };
    const requestMessages = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBuyerOrderDetailApiCallId = requestMessages.messageId;

    requestMessages.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getOrderDetailBuyerStoreApiEndPoint+orderId
    );

    requestMessages.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessages.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.listOfOrdersMethod
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
}
  // Customizable Area End
}
