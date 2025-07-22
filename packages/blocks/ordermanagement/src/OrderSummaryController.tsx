import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSON = require("./config");
import storage from "../../../framework/src/StorageProvider";

import {
  AcceptReturnResponse,
  CountResponseJson,
  OrderItemSeller,
  SellerOrderSellerSeller,
  ListReturnRefundOrderResponse,
} from "./types";
import {
  getStorageData,
  setStorageData
} from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import moment from "moment";
// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  roleType: string;
  showModal: boolean;
  loading: boolean;
  allOrdersCount: string | number;
  newOrderCount: string | number;
  inProcessCount: string | number;
  readyForCollectionCount: string | number;
  outOfDeliveryCount: string | number;
  deliveredCount: string | number;
  returnAndRefundCount: number;
  returnRequestCount: number;
  returnInProcessCount: number;
  returnUnderProcessCount: number;
  refundedCount: number;
  rejectedCount: string | number;
  focusedButtonIndex: string;
  returnRequestAccordian: boolean;
  returnInProcessAccordian: boolean;
  returnUnderProcessAccordian: boolean;
  returnRefundedAccordian: boolean;
  orderList: any[];
  returnAndRefundList: {
    return_request: SellerOrderSellerSeller[];
    return_in_process: SellerOrderSellerSeller[];
    return_under_process: SellerOrderSellerSeller[];
    refunded: SellerOrderSellerSeller[];
  };
  returnRequest:SellerOrderSellerSeller[];
  acceptReturnModal: boolean;
  returnOrderId: number;
  changeTheOrderStatusModal: boolean;
  updateStatusItemId: null | undefined | number;
  searchText: string,
  timeRemainingData: {
    id: string,
    minutes: number,
    startTime:string,
    timeRemaining: string}[];
  currencyIcon: string
  selectedModeStr: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderSummaryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getOrderSummaryCountMsgId: string = "";
  getOrderListMsgId: string = "";
  getOrderListSearchMsgId: string = "";
  getReturnRefundMsgId = "";
  updateTheAcceptStatusMsgId: string = "";
  acceptReturnMsgId = "";
  returnOrderMsgId: string = "";
  refundedOrderMsgId: string = "";
  timer: NodeJS.Timer | number = 0;
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
      showModal: false,
      roleType: "",
      token: "",
      searchText: "",
      allOrdersCount: 0,
      newOrderCount: 0,
      inProcessCount: 0,
      readyForCollectionCount: 0,
      outOfDeliveryCount: 0,
      deliveredCount: 0,
      returnAndRefundCount: 0,
      rejectedCount: 0,
      returnRequestCount: 0,
      returnInProcessCount: 0,
      returnUnderProcessCount: 0,
      refundedCount: 0,
      focusedButtonIndex: "all_orders",
      returnRequestAccordian: false,
      returnInProcessAccordian: false,
      returnUnderProcessAccordian: false,
      returnRefundedAccordian: false,
      orderList: [],
      returnAndRefundList: {
        return_request: [],
        return_in_process: [],
        return_under_process: [],
        refunded: [],
      },
      returnRequest:[],
      acceptReturnModal: false,
      returnOrderId: -1,
      changeTheOrderStatusModal: false,
      updateStatusItemId: null,
      timeRemainingData: [],
      currencyIcon: '',
      selectedModeStr: ""
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
        const token = message.getData(
          getName(MessageEnum.SessionResponseToken)
        );
        this.setState({ token: token }, () => {
          this.fetchTheOrderSummaryCount();
          this.fetchTheOrder(this.state.focusedButtonIndex);
        });
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (errorReponse) {
        this.setState({ loading: false });
        showMessage({
          message: "something went wrong",
          position: { top: 0 },
        });
      }

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.getOrderListSearchMsgId) {
          this.handleApiResponseSearch(responseJson);
        }
        
        this.handleApiResponseCallId(apiRequestCallId, responseJson);
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getCurrencyIcon()
    try {
      const role_type = await getStorageData('FA_LOGIN_ROLE', false)
      this.setState({ roleType: role_type })
    } catch (error) {
      this.setState({ roleType: "0" })
    }

    if (!this.state.token) {
      this.getTokenInOrderSummary();
    }

    this.props.navigation.addListener("willFocus", () => {
      this.getCurrencyIcon()
      if (this.state.token) {
        this.fetchTheOrderSummaryCount();
        this.fetchTheOrder(this.state.focusedButtonIndex);
      }
    });

    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.setState({ selectedModeStr: selectedModeStr });
  }

  componentWillUnmount = async () => {
    if (this.timer) {
      clearInterval(this.timer as number)
    }
  }

  newTimer: number | null = null;

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

initialTimeRemaining = () => {
  const newTimeRemainingData = this.calculateNewTimeRemainingData(this.state.orderList);
  this.setState({ timeRemainingData: newTimeRemainingData }, () => {
    this.startReducingTimer();
  });
};

findTimeRemainingForId = (id: string): string | undefined => {
  const timeObj = this.state.timeRemainingData.find((item) => item.id === id);
  return timeObj ? timeObj.timeRemaining : "00:00";
};

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
            this.fetchTheOrderSummaryCount(false);
            this.fetchTheOrder(this.state.focusedButtonIndex)
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


  getTokenInOrderSummary = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  handleApiResponseCallId = (
    apiRequestCallId: string,
    responseJson: CountResponseJson
  ) => {
    if (apiRequestCallId === this.getOrderSummaryCountMsgId) {
      this.handleOrderSummaryCount(responseJson);
    }
    if (apiRequestCallId === this.getOrderListMsgId) {
      this.fetchTheOrderSummaryCount();
      this.handleOrderList(responseJson);
    }
    if (apiRequestCallId === this.updateTheAcceptStatusMsgId) {
      this.fetchTheOrderSummaryCount();
      this.handleUpdateOrderResponse(responseJson);
    }
    if (apiRequestCallId === this.getReturnRefundMsgId) {
      this.handleReturnRefundList(
        (responseJson as unknown) as ListReturnRefundOrderResponse
      );
    }
    if (apiRequestCallId === this.acceptReturnMsgId) {
      showMessage({
        message: responseJson.data
          ? "Order return accepted"
          : responseJson.error,
        position: { top: 8 },
        type: "success",
      });
      this.handleSetreturnRequestAccordian(true);
    }
    if(apiRequestCallId===this.returnOrderMsgId){
      this.fetchReturnRefundOrders("return_in_process");
        this.fetchTheOrderSummaryCount();
        this.fetchTheOrder(this.state.focusedButtonIndex);
    }
    if(apiRequestCallId===this.refundedOrderMsgId){
      this.fetchReturnRefundOrders(
        "refund_under_process" as keyof S["returnAndRefundList"]
      );
        this.fetchTheOrderSummaryCount();
        this.fetchTheOrder(this.state.focusedButtonIndex);
    }
  };
  handleApiResponseSearch = (responseJson: CountResponseJson) => {

    switch (this.state.focusedButtonIndex) {

      case "all_orders":
        this.setState({ allOrdersCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "new_orders":
        this.setState({ newOrderCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "in_process":
        this.setState({ inProcessCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "processed":
        this.setState({ readyForCollectionCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "shipped":
        this.setState({ outOfDeliveryCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "delivered":
        this.setState({ deliveredCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;
      case "return_and_refund":
        this.handleReturnRefundListHandel(responseJson);
        break;

      case "rejected":
        this.setState({ rejectedCount: responseJson.error ? 0 : responseJson.orders.data.length })
        this.handleOrderList(responseJson)
        break;

    }
  };
  handleReturnRefundListHandel(responseJson: CountResponseJson) {
    if (this.state.returnRequestAccordian) {
      this.handleReturnRefundListHandelreturnRequest(responseJson)
    }
    if (this.state.returnInProcessAccordian) {
      this.handleReturnRefundListHandelProcess(responseJson)
    }
    if (this.state.returnUnderProcessAccordian) {
      this.handleReturnRefundListHandelUnder(responseJson)
    }
    if (this.state.returnRefundedAccordian) {
      this.handleReturnRefundListHandelrefunded(responseJson)
    }

  }
  handleReturnRefundListHandelreturnRequest(responseJson: CountResponseJson) {
    let returnAndRefundList: { return_request: SellerOrderSellerSeller[]; return_in_process: SellerOrderSellerSeller[]; return_under_process: SellerOrderSellerSeller[]; refunded: SellerOrderSellerSeller[]; } = { return_request: [], return_in_process: [], return_under_process: [], refunded: [], }
    if (!responseJson.error) {
      responseJson.orders.data.forEach((element: SellerOrderSellerSeller) => {
        if (element.attributes.status === "return_request") {
          returnAndRefundList.return_request.push(element)
        }
      });
    }
    let returnAndRefundCount = 0
    returnAndRefundCount = this.state.returnAndRefundCount - this.state.returnRequestCount;
    returnAndRefundCount = returnAndRefundCount + returnAndRefundList.return_request.length;
    this.setState({ returnAndRefundCount: returnAndRefundCount, returnRequestCount: returnAndRefundList.return_request.length, returnAndRefundList: returnAndRefundList })
  }
  handleReturnRefundListHandelProcess(responseJson: CountResponseJson) {
    let returnAndRefundList: { return_request: SellerOrderSellerSeller[]; return_in_process: SellerOrderSellerSeller[]; return_under_process: SellerOrderSellerSeller[]; refunded: SellerOrderSellerSeller[]; } = { return_request: [], return_in_process: [], return_under_process: [], refunded: [], }
    if (!responseJson.error) {
      responseJson.orders.data.forEach((element: SellerOrderSellerSeller) => {
        if (element.attributes.status === "return_in_process") {
          returnAndRefundList.return_in_process.push(element)
        }
      });
    }
    let returnAndRefundCount = 0
    returnAndRefundCount = this.state.returnAndRefundCount - this.state.returnInProcessCount;
    returnAndRefundCount = returnAndRefundCount + returnAndRefundList.return_in_process.length;
    this.setState({ returnAndRefundCount: returnAndRefundCount, returnInProcessCount: returnAndRefundList.return_in_process.length, returnAndRefundList: returnAndRefundList })
  }
  handleReturnRefundListHandelUnder(responseJson: CountResponseJson) {
    let returnAndRefundList: { return_request: SellerOrderSellerSeller[]; return_in_process: SellerOrderSellerSeller[]; return_under_process: SellerOrderSellerSeller[]; refunded: SellerOrderSellerSeller[]; } = { return_request: [], return_in_process: [], return_under_process: [], refunded: [], }
    if (!responseJson.error) {
      responseJson.orders.data.forEach((element: SellerOrderSellerSeller) => {
        if (element.attributes.status === "return_under_process") {
          returnAndRefundList.return_under_process.push(element)
        }
      });
    }
    let returnAndRefundCount = 0
    returnAndRefundCount = this.state.returnAndRefundCount - this.state.returnUnderProcessCount;
    returnAndRefundCount = returnAndRefundCount + returnAndRefundList.return_under_process.length;
    this.setState({ returnAndRefundCount: returnAndRefundCount, returnUnderProcessCount: returnAndRefundList.return_under_process.length, returnAndRefundList: returnAndRefundList })
  }
  handleReturnRefundListHandelrefunded(responseJson: CountResponseJson) {
    let returnAndRefundList: { return_request: SellerOrderSellerSeller[]; return_in_process: SellerOrderSellerSeller[]; return_under_process: SellerOrderSellerSeller[]; refunded: SellerOrderSellerSeller[]; } = { return_request: [], return_in_process: [], return_under_process: [], refunded: [], }
    if (!responseJson.error) {
      responseJson.orders.data.forEach((element: SellerOrderSellerSeller) => {
        if (element.attributes.status === "refunded") {
          returnAndRefundList.refunded.push(element)
        }
      });
    }
    let returnAndRefundCount = 0
    returnAndRefundCount = this.state.returnAndRefundCount - this.state.refundedCount;
    returnAndRefundCount = returnAndRefundCount + returnAndRefundList.refunded.length;
    this.setState({ returnAndRefundCount: returnAndRefundCount, refundedCount: returnAndRefundList.refunded.length, returnAndRefundList: returnAndRefundList })
  }
  handleOrderSummaryCount = (responseJson: CountResponseJson) => {
    if (responseJson && !responseJson.error && !responseJson.errors) {
      this.setState({
        allOrdersCount: responseJson.total_orders,
        newOrderCount: responseJson.total_new_orders,
        inProcessCount: responseJson.total_in_process_orders,
        readyForCollectionCount: responseJson.total_process_orders,
        outOfDeliveryCount: responseJson.total_shipped_orders,
        deliveredCount: responseJson.total_delivered_orders,
        returnAndRefundCount: responseJson.total_return_refund_orders,
        rejectedCount: responseJson.total_rejected_orders,
        returnRequestCount: responseJson.total_return_request,
        returnInProcessCount: responseJson.total_return_in_process,
        returnUnderProcessCount: responseJson.total_return_under_process,
        refundedCount: responseJson.total_refunded,
        searchText: ""
      });
    } else {
      showMessage({
        message: "something went wrong",
        position: { top: 0 },
      });
    }
  };

  handleOrderList = (responseJson: CountResponseJson) => {
    if (
      responseJson &&
      responseJson.orders &&
      responseJson.orders.data &&
      !responseJson.error &&
      !responseJson.errors
    ) {

      this.setState(
        () => {
          return {
            orderList: responseJson.orders.data,
            loading:false
          };
        },
        () => { 
            this.initialTimeRemaining();
        });
    } else {
      this.setState({ orderList: [],loading:false });
    }
  };

  handleUpdateOrderResponse = (responseJson: CountResponseJson) => {
    if (
      responseJson &&
      !responseJson.error &&
      !responseJson.errors &&
      responseJson.data
    ) {
      showMessage({
        message: "Order ready for collection",
        position: { top: 1 },
      });
      this.setState({ changeTheOrderStatusModal: false });
      this.fetchTheOrderSummaryCount();
      this.fetchTheOrder(this.state.focusedButtonIndex);
    }
  };

  handleAcceptReturnOrderResponse = (response: AcceptReturnResponse) => {
    if (response.data) {
      showMessage({
        message: "Return accepted",
        position: { top: 8 },
      });
      this.fetchTheOrder(this.state.focusedButtonIndex);
      this.fetchTheOrderSummaryCount();
    }
  };

  fetchTheOrderSummaryCount = async (loading = true) => {
    const headerAssign = {
      "Content-Type": configJSON.applicationJson,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderSummaryCountMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryCountEndPoint
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

  fetchTheOrder = async (type: string, loading = true) => {

    this.setState({ focusedButtonIndex: type })
    const headerAssign = {
      "Content-Type": configJSON.applicationJson,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderListMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryGetOrders + type
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

  updateTheStatus = async () => {
    const { token, updateStatusItemId } = this.state;
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
      configJSON.updateTheOrderStatus +
      `seller_order_id=${updateStatusItemId}&type=ready_to_ship&accept_order_upload_time=${30}`
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };

  handleFocusSelectedView = (index: string) => {
    this.setState({
      focusedButtonIndex: index,
      orderList: [],
    });

    switch (index) {
      case "new_orders":
      case "in_process":
      case "all_orders":
      case "processed":
      case "rejected":
      case "shipped":
      case "delivered":
        this.fetchTheOrder(index);
        break;
      default:
        break;
    }
  };

  navigationToRejectOrder = (OrderId: number) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationRejectOrderMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(
      getName(MessageEnum.NavigationPlayLoadSellerOrderId),
      OrderId
    );
    this.send(message);
  };

  navigationToAcceptOrder = (OrderId: number) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationAcceptOrderMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(
      getName(MessageEnum.NavigationPlayLoadSellerOrderId),
      OrderId
    );
    this.send(message);
  };

  navigationToOrderDetailsSeller = (item: SellerOrderSellerSeller) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderDetailsSellerMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(
      getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
      item
    );
    this.send(message);
  };

  navigationToInventoryManagement = () => {
    this.setState({ showModal: false })
    if (this.state.selectedModeStr == "Seller") {
      this.navigateTo();
      return;
    }
    const message: Message = new Message(
      getName(MessageEnum.NavigationInventoryManagement)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(message);
  };

  navigateTo = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'MyStoresList'
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      to : "InventoryManagement",
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  }

  handleSetreturnRequestAccordian = (returnRequestAccordian: boolean) => {
    this.setState(
      {
        returnRequestAccordian,
        returnInProcessAccordian: false,
        returnUnderProcessAccordian: false,
        returnRefundedAccordian: false,
      },
      () => {
        if (returnRequestAccordian) {
          this.fetchTheOrderSummaryCount()
          this.fetchReturnRefundOrders("return_request");
          this.fetchTheOrder(this.state.focusedButtonIndex);
        }
      }
    );
  };

  handleSetreturnInProcessAccordian = (returnInProcessAccordian: boolean) => {
    this.setState(
      {
        returnRequestAccordian: false,
        returnInProcessAccordian,
        returnUnderProcessAccordian: false,
        returnRefundedAccordian: false,
      },
      () => {
        if (returnInProcessAccordian) {
          this.fetchTheOrderSummaryCount()
          this.fetchReturnRefundOrders("return_in_process");
          this.fetchTheOrder(this.state.focusedButtonIndex);
        }
      }
    );
  };

  handleSetreturnUnderProcessAccordian = (
    returnUnderProcessAccordian: boolean
  ) => {
    this.setState(
      {
        returnRequestAccordian: false,
        returnInProcessAccordian: false,
        returnUnderProcessAccordian,
        returnRefundedAccordian: false,
      },
      () => {
        if (returnUnderProcessAccordian) {
          this.fetchTheOrderSummaryCount();
          this.fetchTheOrder(this.state.focusedButtonIndex);
          this.fetchReturnRefundOrders(
            "refund_under_process" as keyof S["returnAndRefundList"]
          );
        }
      }
    );
  };

  handleSetreturnRefundedAccordian = (returnRefundedAccordian: boolean) => {
    this.setState(
      {
        returnRequestAccordian: false,
        returnInProcessAccordian: false,
        returnUnderProcessAccordian: false,
        returnRefundedAccordian,
      },
      () => {
        if (returnRefundedAccordian) {
          this.fetchTheOrderSummaryCount()
          this.fetchReturnRefundOrders("refunded");
        }
      }
    );
  };

  fetchReturnRefundOrders = (type: keyof S["returnAndRefundList"]) => {
    this.setState({ loading: true });
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.listReturnRefundOrders + type + `&page=1&per_page=100`,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.listOfOrdersMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
    });

    this.getReturnRefundMsgId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  handleReturnRefundList = (response: ListReturnRefundOrderResponse) => {
    if (response.data && response.data[0]) {
      const requestData = response.data.filter(data => data.attributes.status == 'return_request')
      const status = response.data[0].attributes
        .status as keyof S["returnAndRefundList"];
      this.setState(({ returnAndRefundList }) => ({
        returnAndRefundList: {
          ...returnAndRefundList,
          [status]: response.data,
        },
        loading: false,
        returnRequest:requestData
      }));
    } 
    else {
      this.setState(() => ({
        returnAndRefundList: {
          return_request: [],
          return_in_process: [],
          return_under_process: [],
          refunded: [],
        },
        loading: false,
        returnRequest:[]
      }));
    }
  };

  getCurrencyIcon = async () => {
    let currencyIcon = await getStorageData('currencyIcon', true)
    this.setState({ currencyIcon: currencyIcon })
  }

  getTimeInCorrectFormat = (placedAt: string) => {
    const placedDate = new Date(placedAt);
    const hours = placedDate.getHours();
    const minutes = placedDate.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

    return formattedTime;
  };

  formatThePrice = (subTotal: string) => {
    const subTotalNumber = parseFloat(subTotal);
    const subTotalInteger = Math.floor(subTotalNumber);
    return subTotalInteger;
  };
  threeDotFunction = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  dotCloseFunc = () => {
    this.setState({ showModal: false })
  }
  updateStatusModal = (OrderId?: number) => {
    this.setState({
      changeTheOrderStatusModal: !this.state.changeTheOrderStatusModal,
      updateStatusItemId: OrderId,
    });
  };

  acceptReturnModal = (orderId: number) => {
    this.setState({
      acceptReturnModal: true,
      returnOrderId: orderId,
    });
  };

  closeReturnModal = () => {
    this.setState({ acceptReturnModal: false });
  };

  acceptReturn = () => {
    this.setState({ loading: true, acceptReturnModal: false });
    const apiMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const params = `?type=return_accept&seller_order_id=${this.state.returnOrderId}`;
    apiMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.acceptReturnEndpoint + params,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.putMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.acceptReturnMsgId = apiMessage.messageId;
    runEngine.sendMessage(apiMessage.messageId, apiMessage);
  };

  rejectReturn = (orderId: number) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));

    const returnPayload = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    returnPayload.initializeFromObject({
      [getName(MessageEnum.NavigationRejectReturnOrderId)]: orderId,
      [getName(MessageEnum.NavigationRejectType)]: "return",
    });

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "RejectRefund",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.NavigationRaiseMessage)]: returnPayload,
    });
    this.send(message);
  };

  rejectRefund = (orderId: number) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));

    const rejectPayload = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    rejectPayload.initializeFromObject({
      [getName(MessageEnum.NavigationRejectReturnOrderId)]: orderId,
      [getName(MessageEnum.NavigationRejectType)]: "refund",
    });

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "RejectRefund",
      [getName(MessageEnum.NavigationRaiseMessage)]: rejectPayload,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };

  initiateRefund = (orderId: string, refundPrice: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    const payload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    payload.initializeFromObject({
      [getName(MessageEnum.NavigationRejectReturnOrderId)]: orderId,
    });

    payload.addData(getName(MessageEnum.NavigationPayLoadMessage), {
      amountID: refundPrice
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), payload);

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "InitiateRefund",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.NavigationRaiseMessage)]: payload,
    });

    this.send(message);
  };
  trackRefundedOrder= (orderId: number) => {
    const apiMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const params = `?status=refunded&seller_order_id=${orderId}`;
    apiMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.returnedOrderEndpoint + params,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.putMethod,
    });

    this.setState({ loading: true});
    this.refundedOrderMsgId = apiMessage.messageId;
    runEngine.sendMessage(apiMessage.messageId, apiMessage);
  };
  trackReturnedOrder= (orderId: number) => {
    const apiMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const params = `?status=returned&seller_order_id=${orderId}`;
    apiMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.returnedOrderEndpoint + params,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.putMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });

    this.setState({ loading: true,returnOrderId:orderId});
    this.returnOrderMsgId = apiMessage.messageId;
    runEngine.sendMessage(apiMessage.messageId, apiMessage);
  };
  trackOrder = async (id: any, orderId: number, status : any) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));

    const payload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    payload.initializeFromObject({
      [getName(MessageEnum.NavigationOrderStatusId)]: orderId,
    });
    await setStorageData('orderId',JSON.stringify(id))
    await setStorageData('orderIdNew',JSON.stringify(orderId))
    await setStorageData('orderStatus',JSON.stringify(status))

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "OrderManagementBuyerOrderStatus",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.NavigationRaiseMessage)]: payload,
    });

    this.send(message);
  };

  trackRejectedOrder(orderId: number) {
    const message = new Message(getName(MessageEnum.NavigationMessage));

    const payload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    payload.initializeFromObject({
      [getName(MessageEnum.NavigationOrderStatusId)]: orderId,
    });

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "RejectOrderStatus",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.NavigationRaiseMessage)]: payload,
    });

    this.send(message);
  }

  noImplementedFeature = () => {
    showMessage({
      message: "This feature not implemented yet",
      position: { top: 0 },
    });
  };

  getTheTotalPrice = (order_items: OrderItemSeller[]) => {
    let totalPrice = 0;
    order_items.forEach((item: OrderItemSeller) => {
      totalPrice += parseFloat(item.attributes.total_price);
    });
    return totalPrice.toFixed(2);
  };
  getBrandName = (order_items: OrderItemSeller[]) => {
    let name: string | null = ''
    order_items.forEach((item: OrderItemSeller) => {
      name = item.attributes.store_name;
    })
    return name

  }
  getDriverDetails = (order_items: OrderItemSeller[]) => {
    let driverName: string = ''
    let otp: string = ''

    order_items.forEach((item: OrderItemSeller) => {
      driverName = item.attributes.driver_name;
      otp = item.attributes.otp;
    })
    return { driverName, otp }
  }
  searchOrderByNameAndNumber() {
    let searchText = this.state.searchText.trimEnd()
    const headerAssign = {
      "Content-Type": configJSON.applicationJson,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOrderListSearchMsgId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderSummaryGetOrders + this.state.focusedButtonIndex + "&search=" + searchText
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);

  }
  setValueForSearch(text: string) {
    this.setState({ searchText: text.trimStart() })
  }

  showColor = (driverDetails: { driverName: string, otp: string }) => {
    const hasDriverName = driverDetails && driverDetails.driverName && driverDetails.driverName !== "null";
    const hasOtp = driverDetails && driverDetails.otp && driverDetails.otp !== "null" && driverDetails.otp !== null;

    if (hasDriverName || hasOtp) {
      return '#F4F4F4';
    }

    return '#ffffff';
  }

  NavigateToProductSourcingOrders = () => {
    const message = new Message(
      getName(MessageEnum.NavigationProductSourcingOrdersMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  onGetArriveTime = (estimatedArrivalTime: string | null | undefined) => {
    const currentTime = moment();
    const arrivalTime = moment(estimatedArrivalTime);

    const duration = moment.duration(arrivalTime.diff(currentTime));

    const hours = duration.hours();
    const minutes = duration.minutes();

    return { hours: hours, minutes: minutes }
  }

  // Customizable Area End
}
