import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import { EventSubscription } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
import { OrderItemSellerNew, SellerOrderSellerNew, SellerOrderSellerSeller} from "../../ordermanagement/src/types"
import { setupNotification } from "../../../components/src/Notificationservices/NotificationService";
import messaging from '@react-native-firebase/messaging';
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
  token: string;
  hasNewNotification:boolean
  loading: boolean;
  isRefreshing: boolean;
  newOrders:SellerOrderSellerNew[];
  totalCount:string,
  totalDelivered:string,
  totalProgress:string,
  totalPending:string
  timeRemainingData: {
    id: string,
    minutes: number,
    startTime:string,
    timeRemaining: string
  }[];
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class SellerDashboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderListMsgId:string="";
  getOrderSummaryCountMsgId:string="";
  getOrderCountMsgId:string="";
  isFocused: MutableRefObject<boolean | null>;
  willFocusListener: EventSubscription | null = null;
  willBlurListener: EventSubscription | null = null;
  timer: NodeJS.Timer | number = 0;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token: "",
      loading: false,
      isRefreshing: false,
      newOrders:[],
      totalCount:"0",
      totalDelivered:"0",
      totalProgress:"0",
      totalPending:"0",
      timeRemainingData: [],
      hasNewNotification:false
    };
    this.isFocused = createRef();
    this.isFocused.current = true;
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
  async componentDidMount(): Promise<void> {
    this.getData();
    setupNotification(this.props)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      this.setState({ hasNewNotification: true }); 
  });

   messaging().onMessage(async remoteMessage => {
      this.setState({ hasNewNotification: true }); 
  });
    this.timer = setInterval(() => {
      this.getData(false)
    }, 5000);

    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.isFocused.current = true;
        this.getData();
        setupNotification(this.props)
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });
    
       messaging().onMessage(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );
  }

  componentWillUnmount = async () => {
    if (this.timer) {
      clearInterval(this.timer as number)
    }
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.getData(false);
    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 2000);
  };

  newTimer: number | null = null;

  calculateNewTimeRemainingData = (
    orderList: {id:string,attributes:{status: string;
      order_wait_time: number;
      order_management_order: {
        attributes: {
          placed_at: string;
        };
      };}}[]
  ): { id: string; minutes: number; startTime: string; timeRemaining: string }[] => {
    return orderList
      .filter((order) => order.attributes.status === "new_order")
      .map((order) => {
        const minutes = order.attributes.order_wait_time;
        const startTime = order.attributes.order_management_order.attributes.placed_at;
        const { minutes: remainingMinutes, seconds } = this.getTimeRemaining(startTime, minutes);
  
        if (remainingMinutes > 0 || seconds > 0) {
          return {
            id: order.id,
            minutes,
            startTime,
            timeRemaining: `${remainingMinutes}:${seconds.toString().padStart(2, "0")}`,
          };
        }
        return null;
      })
      .filter((item): item is { id: string; minutes: number; startTime: string; timeRemaining: string } => item !== null);
  };

  initialTimeRemaining = () => {
  const newTimeRemainingData = this.calculateNewTimeRemainingData(this.state.newOrders);
  this.setState({ timeRemainingData: newTimeRemainingData }, () => {
    this.startReducingTimer();
  });
  };
  
  findTimeRemainingForId = (id: string): string | undefined => {
    const timeObj = this.state.timeRemainingData.find((item) => item.id === id);
    return timeObj ? timeObj.timeRemaining : "00:00";
  };

  startReducingTimer = () => {
    if (this.newTimer) {
      return;
    }
    this.newTimer = setInterval(() => {
      let allZero = true;
  
      const updatedTimeRemainingData = this.state.timeRemainingData
        .map((timeObj) => {
          const { id, minutes, startTime } = timeObj;
          const { minutes: remainingMinutes, seconds } = this.getTimeRemaining(startTime, minutes);
  
          if (remainingMinutes > 0 || seconds > 0) {
            allZero = false;
            return {
              id,
              minutes,
              startTime,
              timeRemaining: `${remainingMinutes}:${seconds.toString().padStart(2, "0")}`,
            };
          } else {
            this.getData(false);
            return null;
          }
        })
        .filter((item): item is { id: string; minutes: number; startTime: string; timeRemaining: string } => item !== null);
  
      this.setState({ timeRemainingData: updatedTimeRemainingData });
  
      if (allZero) {
        clearInterval(this.newTimer as number);
        this.newTimer = null;
      }
    }, 1000) as unknown as number;
  };

  getTimeRemaining = (startTime: string, totalMinutes: number) => {
    const totalSeconds = totalMinutes * 60;
    const startTimestamp = new Date(startTime).getTime();
    const currentTimestamp = Date.now();
    const elapsedSeconds = Math.floor((currentTimestamp - startTimestamp) / 1000);
    const remainingSeconds = Math.max(totalSeconds - elapsedSeconds, 0);
  
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
  
    return { minutes: remainingMinutes, seconds };
  };

  getData = async (loading = true) => {
    const token = await getStorageData("token", true);
    this.setState({ token  }, () => {
        this.fetchTheOrderCount()
        this.fetchTheOrder(loading)
    });
  };


  getToken = () => {
    const tokenMessage: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMessage);
  };

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

  handleSuccessResponse = (response: {data:SellerOrderSellerSeller[]}, messageId: string) => {
    if (this.getOrderListMsgId === messageId) {
      let orders = response as any;
      if (orders.orders && orders.orders.data) {
        this.setState({
          newOrders:orders.orders.data
        } , ()=> {
          this.initialTimeRemaining();
        });
      } else {
        this.setState({ newOrders: [] });
      }
    }
  };

  fetchTheOrder = async ( loading = true) => {
    let deviceId = await getStorageData('USER_FCM_TOKEN')
    const headerAssign = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderListMsgId = requestMessageAssign.messageId;
    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryGetOrdersEndPoint + "new_orders"
    );


    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    this.setState({ loading });
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
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
      configJSON.orderSummaryGetOrdersCountEndPoint
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
  

  navigationToNaviagtioMenu=()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationNavigationMenuMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);

   
  }

  navigationSelectStore = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationDashboardSelectStore)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  formatThePrice=(subTotal:string)=>{
    const subTotalNumber = parseFloat(subTotal); 
const subTotalInteger = Math.floor(subTotalNumber);
return subTotalInteger
}

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

getTheTotalPrice = (order_items: OrderItemSellerNew[]) => {
  let totalPrice = 0;
  order_items.forEach((item: OrderItemSellerNew) => {
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

  btnRedirectDashboard = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationAnalyticsInsightsMessage)
    );
  
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }
  btnNotificationRedirection = () => {
    this.setState({hasNewNotification:false})
    const message = new Message(
      getName(MessageEnum.NavigationNotificationsBuyer)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  // Customizable Area End
}
