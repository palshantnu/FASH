import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { HireStylistCustomForm, OrderData } from "./responseStore";
import {setStorageData, getStorageData} from "../../../framework/src/Utilities"
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
  loading: boolean;
  refreshing : boolean;
  token: string;
  timeRemainingData: {
    id: string,
    minutes: number,
    startTime:string,
    timeRemaining: string}[];
  newRequestData :HireStylistCustomForm[];
  newOrderData: OrderData[];
  hasNewNotification:boolean;
  isUnderReview:boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class StylistDashboardController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getRequestsApiCallId: string = "";
  getNewOrderListApiCallId: string = "";
  timer: NodeJS.Timer | number = 0;
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
      refreshing : false,
      loading: false,
      timeRemainingData: [],
      newRequestData: [],
      newOrderData: [],
      hasNewNotification:false,
      isUnderReview: false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      ) as string;
      if (this.getRequestsApiCallId === responseId) {
        const response = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const filteredData = response.data.filter((item: HireStylistCustomForm) => item.attributes.status == 'pending');
        this.setState({ newRequestData: filteredData, loading: false });
      }
      if (this.getNewOrderListApiCallId === responseId) {
        const response = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        console.log(response, "==========Response");
        if (response.orders && response.orders.data && response.orders.data.length > 0) { 
          this.setState({ newOrderData: response.orders.data, loading: false }, ()=> {
            this.initialTimeRemaining();
          });
        }
        else {
          this.setState({ newOrderData: [], loading: false });
        }
      }
    } else if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data= message.getData(
        getName(MessageEnum.storeIDMessage)
      );
      this.setState({isUnderReview:data.underReview})
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getToken();
    setupNotification(this.props)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      this.setState({ hasNewNotification: true }); 
  });

   messaging().onMessage(async remoteMessage => {
      this.setState({ hasNewNotification: true }); 
  });
    this.timer = setInterval(() => {
      this.getToken(false);
    }, 5000);
  }

  componentWillUnmount = async () => {
    if (this.timer) {
      clearInterval(this.timer as number)
    }
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

  getGender = (gender: string) => {
    return gender === "male" ? "Male" : "Female";
  }

  formatTime = (time: string) => {
    const timeParts = /(\d{1,2}):(\d{2})(am|pm)/.exec(time);
    
    if (!timeParts) {
        throw new Error("Invalid time format");
    }
    
    let hours = parseInt(timeParts[1], 10);
    const minutes = timeParts[2];
    const period = timeParts[3];

    if (period === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    
    return `${formattedHours}:${minutes} ${period.toUpperCase()}`;
}

  formatThePrice=(subTotal:string)=>{
    const subTotalNumber = parseFloat(subTotal); 
    const subTotalInteger = Math.floor(subTotalNumber);
    return subTotalInteger
  }

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
    const newTimeRemainingData = this.calculateNewTimeRemainingData(this.state.newOrderData as any);
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
            this.getToken(false);
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

  getTheTotalPrice = (order_items: any[]) => {
    let totalPrice = 0;
    order_items.forEach((item: any) => {
        totalPrice += parseFloat(item.attributes.total_price);
    });
    return totalPrice.toFixed(2); 
  }

  refreshData = () => {
    this.setState({ refreshing: true });
    this.getToken(false);
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  apiCall = (
    endpoint: string,
    method: string,
    header: unknown,
    body: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    setMessageId(message.messageId);
    runEngine.sendMessage(message.messageId, message);
  };

  getToken = async(loading = true) => {
    const token = await getStorageData("token", true);
    this.setState({ token : token }, ()=> {
      this.getRequests(loading);
      this.getNewOrderList(loading);
    });
  };

  getNewOrderList = async(loading = true) => {
    this.setState({ loading: loading });
    let deviceId = await getStorageData('USER_FCM_TOKEN')

    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    this.apiCall(
      configJSON.getNewOrderListApiEndPoint,
      configJSON.getMethod,
      JSON.stringify(header),
      null,
      (messageId) => {
        this.getNewOrderListApiCallId = messageId;
      }
    );
  };

  getRequests = async(loading = true) => {
    this.setState({ loading: loading });
    const header = {
      "Content-Type": configJSON.dashboarContentType,
      token: this.state.token,
    };
    this.apiCall(
      configJSON.getRequestListApiEndPoint,
      configJSON.getMethod,
      JSON.stringify(header),
      null,
      (messageId) => {
        this.getRequestsApiCallId = messageId;
      }
    );
  };

  navigateToStlistAsBuyer = () => {
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "stylistAsBuyer"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), "data");
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs);
  };

  navigateToStylistRequests = () => {
    setStorageData("navigationType","stylistDashboard")
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "StylingRequestList");
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
      )
    message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
     Types:"stylistDashboard"
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message)
  };

  navigateToOrders = () => {
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "OrderSummary"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  };

  navigationHandler = (id:string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "StlyingRequestDetails");
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
      )
    message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      param1: id ,callBack:this.getRequests,type: 'Dashboard'
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message)
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

  btnRedirectAnalytics = ()=>{
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
