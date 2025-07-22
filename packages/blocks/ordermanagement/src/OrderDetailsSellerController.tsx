import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

import moment from "moment";
import { CountResponseJson,DeliveryAddress , SellerOrderSellerSeller} from "./types"
import { showMessage } from "react-native-flash-message";
import {
  getStorageData,
  setStorageData
} from "../../../framework/src/Utilities";
import i18n from "../../../components/src/i18n/i18n.config";
export const configJSON = require("./config");


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
  orderDetailsList: SellerOrderSellerSeller|null,
  changeTheOrderStatusModal: boolean
  deliverDate: string | null;
  roleType:string;
  localCurrency : string;
  id:any ;
  orderId: number;
  status : any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderDetailsSellerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateTheProceesedStatusMsgId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      orderDetailsList: null,
      changeTheOrderStatusModal: false,
      deliverDate: null,
      roleType:'',
      localCurrency:'',
      id:'',
      orderId: 0,
      status:'',
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const orderDetailsList = message.getData(
        getName(MessageEnum.NavigationPlayLoadSellerOrderDetails));
      if (orderDetailsList) {
        const { status, id, order_items } = orderDetailsList.attributes;
        const date1 = orderDetailsList?.attributes?.order_management_order?.attributes.delivered_at;
        const date2 = orderDetailsList?.attributes?.order_items[0]?.attributes.delivered_at;
        const date3 = moment().add({hours: 2})
        const date = date2 ? this.formatTheDate(date2) : moment(date1 ?? date3).format('DD MMM YYYY');
        this.setState({
          orderDetailsList: orderDetailsList,
          deliverDate: date,
          id:order_items[0].id,
          orderId: id,
          status: status,
        },)

      }

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
     
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      if (errorReponse) {
        this.setState({ loading: false })
        showMessage({
          message: 'something went wrong',
          position: { top:1 },
        });
      }
      this.handleApiResponseCallId(apiRequestCallId, responseJson)

    }

    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    moment.locale(i18n.language)
    const role_type = await getStorageData('FA_LOGIN_ROLE',false)
    if(role_type){
      this.setState({roleType:role_type})
    }
    if (!this.state.token) {
      this.getTokenInOrderDetails();
    }

    this.props.navigation.addListener("willFocus", () => {
     
    });

    let currencyGet = await getStorageData('currencyIcon',true)
    this.setState({localCurrency:currencyGet})

  }

  getTokenInOrderDetails = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  handleApiResponseCallId = (apiRequestCallId: string, responseJson: CountResponseJson) => {
    if (apiRequestCallId && responseJson) {

      if (apiRequestCallId === this.updateTheProceesedStatusMsgId) {
        this.handleUpdateOrderResponse(responseJson)
      }

      this.setState({ loading: false })



    }
  }

  handleUpdateOrderResponse = (responseJson: CountResponseJson) => {
    if (responseJson && !responseJson.error && !responseJson.errors && responseJson.data) {
      showMessage({
        message: 'Order ready for collection',
        position: { top: 0 },
      });
      this.props.navigation.goBack();
    }

  }
  updateTheStatus = async () => {
    const { token, orderDetailsList } = this.state
    const updateStatusItemId = orderDetailsList?.attributes.id
    const headerAssign = {
      "Content-Type": configJSON.applicationJson,
      token: token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateTheProceesedStatusMsgId = requestMessageAssign.messageId;
    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );
    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateTheOrderStatus + `seller_order_id=${updateStatusItemId}&type=ready_to_ship&accept_order_upload_time=${30}`
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };
  navigationToRejectOrder = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationRejectOrderMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationPlayLoadSellerOrderId), this.state.orderDetailsList?.attributes.id);
    this.send(message);
  }

  navigationToAcceptOrder = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationAcceptOrderMessage)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationPlayLoadSellerOrderId), this.state.orderDetailsList?.attributes.id);
    this.send(message);
  }

  formatTheDate = (orderDeliverDate: string|null|undefined) => {
    if (orderDeliverDate) {
      const parsedDate = moment(orderDeliverDate, 'DD-MM-YYYY');

      const formattedDate = parsedDate.format('DD MMM YYYY');
      return formattedDate
    }
    else return ""
  }

  formatTheAddress = (Address: DeliveryAddress|null|undefined) => {
    if (Address) {
      const { house_or_building_number, street, area, city } = Address.attributes;
      return `${house_or_building_number},${street}, ${area}, ${city}`;
    }
    else return ""
  }
  getItemsLength = () => {
    return this.state.orderDetailsList?.attributes?.order_items.length || 0;
  }
  getTheStatusOfOrderDetails = () => {
    return this.state.orderDetailsList?.attributes.status || ""
  }
  updateStatusModal = () => {
    this.setState({ changeTheOrderStatusModal: !this.state.changeTheOrderStatusModal })
  }
  noImplementedFeature = () => {
    showMessage({
      message: 'This feature not implemented yet',
      position: { top: 0 },
    });

  }

  trackOrder = async () => {
    const { id, orderId, status } = this.state;
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

  getRejectionOfOrderReason = () => {
    return this.state.orderDetailsList?.attributes.order_items[0].attributes.reason_of_rejection || "";
  }
  getReasonOfOrderReturn = () => {
    return this.state.orderDetailsList?.attributes.order_items[0].attributes.reason_of_return || "";
  }

  showColor = () => {
    const { orderDetailsList } = this.state;
    const orderItems =orderDetailsList && orderDetailsList.attributes && orderDetailsList.attributes.order_items[0] && orderDetailsList.attributes.order_items[0].attributes 
  
    if (orderItems) {
      if (orderItems.driver_name || orderItems.otp) {
        return '#F4F4F4';
      }
    }
    return '#ffffff';
  }  
  formatThePrice = (subTotal: string) => {
    const subTotalNumber = parseFloat(subTotal);
    const subTotalInteger = Math.floor(subTotalNumber);
    return subTotalInteger
  }

  showDeliveryDate = (order: SellerOrderSellerSeller | null) => {
    if (order) {
      return [
        "shipped",
        "delivered",
        "return_and_refund",
        "return_request",
        "return_in_process",
        "return_under_process",
        "refunded"
      ].includes(order.attributes.status)
    }
    return false;
  }
  onGetArriveTime = (estimatedArrivalTime: string | null | undefined) =>{
    const currentTime = moment();
    const arrivalTime = moment(estimatedArrivalTime);
  
    const duration = moment.duration(arrivalTime.diff(currentTime));
  
    const hours = duration.hours();
    const minutes = duration.minutes();

    return {hours: hours, minutes: minutes}
  }
  // Customizable Area End
}
