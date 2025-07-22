import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData, setStorageData } from "framework/src/Utilities";
import moment from 'moment';
import i18n from "../../../components/src/i18n/i18n.config";
import storage from "../../../framework/src/StorageProvider";

// Customizable Area Start
export interface NotificationArrProps {
    id:string;
    is_read:boolean;
    contents:string;
    created_at:string;
    action:string
}

export interface NotificationData {
  id: string;
  attributes: NotificationArrProps
}
interface APIPayloadType {
  endPoint: string;
  method: string;
  body?: object;
  token?: string;
  contentType?: string;
  type?: string;
}
interface NotificationList {
  data: NotificationData[]
  errors:object
 
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
  token:string;
  loading:boolean;
  notificationType:string;
  notificationArr:NotificationData[];
  notificationDealArr:NotificationData[];
  notificationOrderArr:NotificationData[];
  flatNotificationArr:NotificationData[];
  selectedModeStr:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class NotificationsBuyerController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  notificationListApiCallID: string = '';
  notificationDealsApiCallID: string = '';
  notificationOrdersApiCallID: string = '';
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
        token:'',
        loading:false,
        notificationType:'all',
        notificationArr:[],
        notificationDealArr:[],
        notificationOrderArr:[],
        flatNotificationArr:[],
        selectedModeStr:'',
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.props.navigation.addListener("willFocus", () => {
        this.activeNotificationTab('all')
        this.getNotificationList()
    });
    this.toggleGetStats();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId != null) {
          if (apiRequestCallId === this.notificationListApiCallID) {
            this.getListSuccessResponse(responseJson)
          } else if (apiRequestCallId === this.notificationDealsApiCallID) {
            this.getDealsSuccessResponse(responseJson)
          } else if (apiRequestCallId === this.notificationOrdersApiCallID) {
            this.getOrdersSuccessResponse(responseJson)
          }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  toggleGetStats = async() => {
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.setState({ selectedModeStr: selectedModeStr });
  }

  getListSuccessResponse = (response: NotificationList) => {
    if(response.data && !response.errors){
      this.setState({ loading: false,notificationArr: response.data,flatNotificationArr: response.data});
    }else{
      this.getListFailureResponse(response) 
    }
  }

  getDealsSuccessResponse = (response: NotificationList) => {
    if(response.data && !response.errors){
      this.setState({ loading: false,notificationDealArr: response.data, flatNotificationArr: response.data});
    }else{
      this.getListFailureResponse(response) 
    }
  }

  getOrdersSuccessResponse = (response: NotificationList) => {
    if(response.data &&!response.errors){
      this.setState({ loading: false,notificationOrderArr: response.data, flatNotificationArr: response.data});
    }else{
      this.getListFailureResponse(response) 
    }
  }

  getListFailureResponse = (error: NotificationList) => {
    this.setState({ loading: false, flatNotificationArr: []})
   }

    activeAnalytics = (notificationType:string)=>{
        this.setState({flatNotificationArr:[]})
        this.setState({notificationType:notificationType})
        this.activeNotificationTab(notificationType)
    }

    activeNotificationTab = (notificationType:string)=>{
        if(notificationType === 'all')
        {
            this.getNotificationList()
        }
        if(notificationType === 'deals')
        {
            this.getNotificationDeals()
        }
        if(notificationType === 'yourOrder'){
            this.getNotificationOrders()
        }
    }

    apiCall = async (data:APIPayloadType) => {
      this.setState({ loading: true })
      let token = await getStorageData('token', true)
      const { contentType, method, endPoint, body } = data;
      const header = {
        "Content-Type": contentType,
        token: token,
      };
  
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        endPoint
      );
  
      requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),method);
  
      body &&
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return requestMessage.messageId;
    };
  
    getNotificationList = async () => {
      this.setState({loading:true})
      this.notificationListApiCallID = await this.apiCall({
        method: configJSON.getDataMethod,
        endPoint: configJSON.notificationListEndPoint,
        contentType: configJSON.apiContentType,
      })
  
    }

    getNotificationDeals = async () => {
      this.setState({loading:true})
      this.notificationDealsApiCallID = await this.apiCall({
        method: configJSON.getDataMethod,
        endPoint: configJSON.notificationListEndPoint + "?notification_type=for_deal",
        contentType: configJSON.apiContentType,
      })
    }

    getNotificationOrders = async () => {
      this.setState({loading:true})
      this.notificationOrdersApiCallID = await this.apiCall({
        method: configJSON.getDataMethod,
        endPoint: configJSON.notificationListEndPoint + "?notification_type=for_order",
        contentType: configJSON.apiContentType,
      })
    }
    timeAgo = (inputDate:string)  =>{
      moment.locale(i18n.language);
      return moment(inputDate).fromNow();
    }
    onNavigateScreen = (action: string, value : any) => {
      switch (action) {
        case "seller_new_order":
        case "appointment_is_made_by_client":
        case "seller_cancel_order":
        case "seller_payment_confirm":
          return this.props.navigation.navigate("OrderSummary");
    
        case "seller_product_price":
        case "seller_low_stock":
          return this.props.navigation.navigate("CatalogueSeller");
    
        case "seller_store_approved":
          return this.props.navigation.navigate("Stores");
    
        case "seller_terms_updates":
        case "buyer_requested_stylists":
        case "buyer_quoted_for_stylist_items":
          return this.props.navigation.navigate("SellerProfile")
    
        case "stylist_terms_updates":
          return this.props.navigation.navigate("StylistProfile");
    
        case "stylist_monthly_orders_report":
        case "monthly_deliveries_updates":
          return this.props.navigation.navigate("stylistDashboard")
    
        case "buyer_catalogue_price_drop":
          return this.props.navigation.navigate("Catalogue");
    
        case "weekly_update_loyalty_points":
        case "monthly_orders_report":
          return this.props.navigation.navigate("LandingPage");
    
        case "driver_terms_updates":
          return this.props.navigation.navigate("DriverProfile");
    
        case "earning_status_updates":
          return this.props.navigation.navigate("LandingPageDriver");
    
        case "product_sourcing_request_by_stylist":
          return this.props.navigation.navigate("StylistCatalogue");
    
        case "account_password_changed":
          return this.onNavigateLandingScreen();
    
        case "sign_up":
          return this.props.navigation.navigate("LandingPage");
    
        case "order_confirm":
        case "order_dispatched":
        case "order_placed":
        case "order_delivered":
        case "payment_done":
          this.orderDetailRedirect(value.data.order_id);
          break;

        case "delivery_assignment":
          this.props.navigation.goBack();
          break;
    
        default:
          return '';
      }
    };


    orderDetailRedirect = async(orderId:string)=>{
        await setStorageData("orderId",orderId.toString()); 
        this.navigateToOrderSummryBuyer();
    }

    navigateToOrderSummryBuyer = () => {
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationOrderBuyerSummary)
      );
      msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msgNavigation);

    }
    
     onNavigateLandingScreen = async () => {
      const role = await getStorageData("FA_LOGIN_ROLE", false);
      if (role === 1) {
        return  this.props.navigation.navigate('LandingPage');
      } else if (role === 3) {
        return this.props.navigation.navigate('stylistDashboard');
      } else if (role === 2) {
        return this.props.navigation.navigate('SellerDashboard');

      } else {
        return this.props.navigation.navigate('LandingPageDriver');
      }  
    }     
  // Customizable Area End
}
