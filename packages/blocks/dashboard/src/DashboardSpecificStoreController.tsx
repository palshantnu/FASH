import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { CountResponseJson, OrderItemSeller, SellerOrderSellerSeller} from "../../ordermanagement/src/types"
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  isLoading: boolean;
  token: string;
  storeOpenCloseStatus:boolean;
  newOrders:SellerOrderSellerSeller[];
  storeOrderId:string;
  storeName:string;
  storeImageUrl:null|string;
  totalCount:string,
  totalDelivered:string,
  totalProgress:string,
  totalPending:string;
  storeLabelText:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardSpecificStoreController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderListOfStoreMsgId:string="";
  storeStatusUpadateApiCallId:string = "";
  getOrderCountMsgId:string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.RestAPIResponceMessage),
        getName(MessageEnum.AccoutLoginSuccess),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.SessionSaveMessage),
        getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
        loading: false,
        isLoading: false,
        token: "",
        storeOpenCloseStatus:true,
        newOrders:[],
        storeOrderId:"",
        storeImageUrl:null,
        storeName:"",
      totalCount:"0",
      totalDelivered:"0",
      totalProgress:"0",
      totalPending:"0",
      storeLabelText:i18n.t("storeOpen")

    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const storeOrderId = message.getData(
          getName(MessageEnum.ManageTimingStoreIdPayloadMessage));
        
      if (storeOrderId) {
        const {store_name,image,is_open}=storeOrderId.attributes
          this.setState({ storeOrderId: storeOrderId.id,storeName:store_name,storeImageUrl:image,storeOpenCloseStatus:is_open},
            ()=>{
              this.fetchTheOrderCount()
              this.fetchTheOrder()
              this.updateStoreStatusText()
            })
          
      }
     

  }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      ) as string;
      if (this.getOrderCountMsgId === responseId) {
        const response = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        this.setState({ totalCount:response.total_orders,totalDelivered:response.total_delivered_orders,totalProgress:response.total_in_process_orders,
        totalPending:response.total_new_orders,});
      }
      this.handleApiResponseData(message);
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    
    this.getData();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getData();
       
      });
    }
  }
  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token  },
      ()=>{
        this.fetchTheOrderCount()
        this.fetchTheOrder()

      })
  };
  staticOrders = [
    {
      id: "aseerdf",
      timeAndId: "#4564-4512 | 03:10 PM",
      items: [
        {
          id: "1-15",
          uri: "https://i.ibb.co/vXySXkc/image-shawl.png",
          name: "Shawl Collar Blazer with Belt(Woman)",
          quantity: 3
        },
        {
          id: "1-24",
          uri: "https://i.ibb.co/Mstq2hp/image-shawl2.png",
          name: "Shawl Collar Blazer gray with Belt(Woman)",
          quantity: 2
        },
      ],
    },
    {
      id: "sdf11g",
      timeAndId: "#2564-4012 | 04:20 PM",
      items: [
        {
          id: "2-11",
          uri: "https://i.ibb.co/vXySXkc/image-shawl.png",
          name: "Shawl Collar Blazer with Belt(Woman)",
          quantity: 2
        },
        {
          id: "2-28",
          uri: "https://i.ibb.co/Mstq2hp/image-shawl2.png",
          name: "Shawl Collar Blazer gray with Belt(Woman)",
          quantity: 1
        },
      ],
    },
  ];

  onLoading = () => {
    this.setState({ isLoading: true });
    this.getData();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  getTokenStoreDashboard = () => {
    if(!this.state.token){
    const specificStoreMessage: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(specificStoreMessage);}
  };

  navigationToNaviagtioMenu=()=>{
    const specificStoreMessage: Message = new Message(
      getName(MessageEnum.NavigationDashboardSelectStore)
    );
    specificStoreMessage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(specificStoreMessage);
  }

  handleApiResponseData = (message: Message) => {
    const responseId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    ) as string;
    const successResponse = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (successResponse) {
      this.handleSuccessResponse(successResponse, responseId);
    } else {
      this.parseApiCatchErrorResponse(errorResponse);
      
    }
    this.setState({ loading: false });
  };

  handleSuccessResponse = (response:{data:SellerOrderSellerSeller[]}, messageId: string) => {
    if (this.getOrderListOfStoreMsgId === messageId) {
      const orders = response;
      if (orders.data) {
        this.setState({
          newOrders:orders.data
        });
      } else {
        this.setState({ newOrders: [] });
      }
    }

 
  };

  fetchTheOrder = async () => {

    const headerAssign = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderListOfStoreMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryGetOrdersEndPoint + "new_orders"+"&store_ids[]="+this.state.storeOrderId
    );


    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };


  storeStatusUpdate = (statusSend: boolean) => {

    const {storeOrderId}=this.state
    
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.storeStatusUpadateApiCallId = requestMessage.messageId;
    
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.storeStatusApiEndPoint+'?id='+storeOrderId+"&status="+!statusSend
      );
    

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.dashboardPutApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  fetchTheOrderCount = async () => {

    const headerAssign = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderCountMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryGetOrdersCountEndPoint+"?store_ids[]="+this.state.storeOrderId
    );


    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };
  
  toggleStoreOpenCloseStatus = (storeStatus:boolean)=>{
    this.setState({storeOpenCloseStatus:!storeStatus},()=>{
      this.updateStoreStatusText()
    })
    this.storeStatusUpdate(storeStatus)
  }
 

  formatThePrice=(subTotal:string)=>{
    const subTotalNumber = parseFloat(subTotal); 
const subTotalInteger = Math.floor(subTotalNumber);
return subTotalInteger
}

toggleStatus = () => this.toggleStoreOpenCloseStatus(this.state.storeOpenCloseStatus);

getTimeInCorrectFormat = (placedAt: string) => {
  const placedDate = new Date(placedAt);
  const hours = placedDate.getHours();
  const minutes = placedDate.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return formattedTime
}

getTheTotalPrice = (order_items: OrderItemSeller[]) => {
  let totalPrice = 0;
  order_items.forEach((item: OrderItemSeller) => {
      totalPrice += parseFloat(item.attributes.total_price);
  });
  return totalPrice.toFixed(2); 
}

getStoreName=(value:string|null)=>{
  if( value==null && !value){
    return ""
  }else{
    return value
  }
}

navigationToRejectOrder = (OrderId:number) => {
  const message: Message = new Message(
    getName(MessageEnum.NavigationRejectOrderMessage)
  );

  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  message.addData(getName(MessageEnum.NavigationPlayLoadSellerOrderId), OrderId);
  this.send(message);
}

navigationToAcceptOrder = (OrderId: number) => {
  const message: Message = new Message(
    getName(MessageEnum.NavigationAcceptOrderMessage)
  );

  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  message.addData(getName(MessageEnum.NavigationPlayLoadSellerOrderId), OrderId);
  this.send(message);
}

handleNavigateToOrdersTab=()=>{
  const message: Message = new Message(
    getName(MessageEnum.OrderSummaryNavaigationMessage)
  );

  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  this.send(message);
}

  updateStoreStatusText = ()=>{
    if(this.state.storeOpenCloseStatus)
    {
      this.setState({storeLabelText:i18n.t("storeOpen")})
    }else{
      this.setState({storeLabelText:i18n.t("storeClosed")})
    }
  }
  // Customizable Area End
}
