import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { activeStatus,inActiveStatus,notFocus } from "./assets";
import React from "react";
import { Image,Dimensions, Platform } from "react-native";
import Scale from "../../../components/src/Scale";
import { getStorageData } from "framework/src/Utilities";
import i18n from '../../../components/src/i18n/i18n.config';
import storage from "framework/src/StorageProvider";
const windowWidth = Dimensions.get("window").width;
export interface OrderDetailProps {
  id:string;
  store_name:string;
}

export interface TimingArrProps {
  time: string;
  title: string;
  description: string;
  icon: JSX.Element;
  lineColor: string;
  position: string;
}

export interface NewOrder {
  id: string;
  type: "order";
  attributes: any;
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
  orderId:any;
  status: string;
  selectedModeStr : string;
  timeStatusArr:TimingArrProps[];
  orderStatusList: {attributes:{
    rejected_at:  string 
    delivered_at:string 
    in_transit_at:string
    shipped_at: string
    confirmed_at: string 
    process_at:  string 
    return_reject_at:string 
    return_cancel_at:string 
    returned_at: string 
    placed_at:  string 
    return_pick_at: string 
    returned_assign_at: string 
     return_placed_at:string 
    return_confirmed_at:string 
}};
  isTrackOrderDisabled:boolean;
  placed_at: string;
  trackId: number;
  orderNo:string;
  languagePosition:string
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderManagementBuyerSummaryController extends BlockComponent<Props, S, SS> {
  getBuyerOrderDetailApiCallId: string = "";
  // Customizable Area Start
  getSellerOrderDetailApiCallId: string = "";
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
      loading:false,
      trackId: 2,
      selectedModeStr : "",
      status: 'search',
      timeStatusArr : [],
      orderDetailArr:
        {
          id:'1',
          store_name:'H&M'
        },
      orderId:'1',
      orderStatusList: {attributes:{
        rejected_at:  "",
        delivered_at:"",
        in_transit_at:"",
        shipped_at: "",
        confirmed_at: "",
        process_at: "",
        return_reject_at:"",
        return_cancel_at:"",
        returned_at: "",
        placed_at:  "",
        return_pick_at: "",
        returned_assign_at:"",
        return_placed_at:"",
        return_confirmed_at:"",
    }},
      isTrackOrderDisabled: false,
      placed_at: "",
      orderNo:"",
      languagePosition:i18n.language==='ar'?'right':"left"
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
      this.setState({ token: token })
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      
      if (apiRequestCallId === this.getBuyerOrderDetailApiCallId) {
        let indexItem=responseJson.data.attributes.order_items.findIndex((item:{id:number})=>item.id===this.state.orderId)
        this.setState({
          orderNo:responseJson.data.attributes.order_number,
          orderStatusList: responseJson.data.attributes.order_items[indexItem],
        }, responseJson.data.attributes.order_items[indexItem].attributes.return_placed_at!=null?this.updateReturnTimeline:this.updateTimeline);
      }
      else if (apiRequestCallId === this.getSellerOrderDetailApiCallId) {
        let indexItem=responseJson.data.attributes.order_items.findIndex((item:{id:number})=>item.id===this.state.orderId)
        this.setState({
          orderNo:responseJson.data.attributes.order_management_order.attributes.order_number,
          orderStatusList: responseJson.data.attributes.order_items[indexItem],
        }, responseJson.data.attributes.order_items[indexItem].attributes.return_placed_at!=null?this.updateReturnTimeline:this.updateTimeline);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  formatDate = (dateString: string | number | Date) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();

    const monthIndex = dateObj.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[monthIndex];
    return `${day} ${month}`;
  };

  isActiveStatus(simplifiedStatus: string, simplifiedTitle: string) {    
    const statusMap: { [key: string]: string } = {
        'ready_to_ship': 'processing',
        'in_transit': 'out for delivery',
        'processed' : 'processing',
    };

    return (
        simplifiedStatus === simplifiedTitle ||
        statusMap[simplifiedStatus] === simplifiedTitle
    );
}
isActiveReturnStatus(simplifiedStatus: string, simplifiedTitle: string) {
  const statusMap: { [key: string]: string } = {
    'return_placed': 'placed',
    'return_confirmed': 'confirmed',
      'returned_assign': 'out for pickup',
      'return_pick': 'order picked up',
      'returned': 'completed',
  };
  return (
      simplifiedStatus === simplifiedTitle ||
      statusMap[simplifiedStatus] === simplifiedTitle
  );
}
calculateIconSize(iconColor: boolean, notFocus: boolean, windowWidth: number) {
  return iconColor === notFocus ? windowWidth * 4 / 100 : windowWidth * 6 / 100;
}

determineColors(isActive: boolean, foundCurrentStatus: boolean) {
  const lineColor = isActive || foundCurrentStatus ? '#CBD5E1' : '#CCBEB1';
  const titleColor = isActive || !foundCurrentStatus ? '#375280' : '#94A3B8';
  
  return { lineColor, titleColor };
}
  checkOderStatus=()=> {
    let { status, orderStatusList } = this.state;
   
    if (orderStatusList.attributes.returned_assign_at !== null && status === "return_confirmed") {
      if (orderStatusList.attributes.return_pick_at !== null) {
       
        status="return_pick"
  }
      else if(orderStatusList.attributes.return_pick_at === null) {
       
        status= "returned_assign"
      }
}
return status
}
  updateReturnTimeline = () => {
   let status=this.checkOderStatus()
    let  {orderStatusList} = this.state;
    let foundCurrentStatus = false;
    let isTrackOrderDisabled = false;
    const defaultTimelineItems = [
      {
        time: '09:00',
        title: 'Return placed',
        description: `${i18n.t('Returnplaceddescription')} ${this.formatDate(orderStatusList.attributes.return_placed_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '10:45',
        title: 'Return confirmed',
        description: `${i18n.t('Returnconfirmeddescription')} ${this.formatDate(orderStatusList.attributes.return_confirmed_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '12:00',
        title: 'Out For Pickup',
        description: `${i18n.t('OutForPickupdescription')} ${this.formatDate(orderStatusList.attributes.returned_assign_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '14:00',
        title: 'Order Picked Up',
        description: `${i18n.t('OrderPickedUpdescription')} ${this.formatDate(orderStatusList.attributes.return_pick_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '16:30',
        title: 'Return Completed',
        description: `${i18n.t('ReturnCompleteddescription')} ${this.formatDate(orderStatusList.attributes.returned_at)}`,
        position:this.state.languagePosition
      }
      
    ]
    const rejectedStatusItem = {
      time: '16:30',
      title: 'Return Cancelled',
      description: `${i18n.t('ReturnCancelleddescription')} ${this.formatDate(orderStatusList.attributes.return_cancel_at)}`,
      icon: <Image style={{ width: 20, height: 20 }} source={activeStatus} />,
      lineColor: '#FF0000',
      titleStyle: { color: '' },
      position:this.state.languagePosition
    };
    const rejectedStatusItems = {
      time: '16:30',
      title: 'Return Rejected',
      description: `${i18n.t('ReturnRejecteddescription')} ${this.formatDate(orderStatusList.attributes.return_reject_at)}`,
      icon: <Image style={{ width: 20, height: 20 }} source={activeStatus} />,
      lineColor: '#FF0000',
      titleStyle: { color: '' },
      position:this.state.languagePosition
    };

    let updatedTimeStatusArr = defaultTimelineItems.map(item => {
      let simplifiedTitle = item.title.replace('Return', '').trim().toLowerCase();
      let simplifiedStatus = status.replace('Return', '').trim().toLowerCase();
      const isActive = this.isActiveReturnStatus(simplifiedStatus, simplifiedTitle);
      const iconColor = isActive && activeStatus || foundCurrentStatus && notFocus || "";
      const { lineColor, titleColor } = this.determineColors(isActive, foundCurrentStatus);
      const iconSize = this.calculateIconSize(iconColor, notFocus, windowWidth);
      if (isActive) {
        foundCurrentStatus = true;
      }

      if (orderStatusList.attributes.returned_assign_at === null || orderStatusList.attributes.return_pick_at !== null || status.toLowerCase() === 'return_cancelled' || status.toLowerCase() === 'return_rejected') {
       
        isTrackOrderDisabled = true;
      }

      const iconStyle = {
        width: iconSize,
        height: iconSize,
        ...(isActive ? { top: 5.1 } : "")
      };

      return {
        ...item,
        icon: <Image style={iconStyle} source={iconColor} />,
        lineColor: lineColor,
        titleStyle: { color: titleColor }
      };
    });
    if (status.toLowerCase() === 'return_cancelled') {
      updatedTimeStatusArr = [
        ...updatedTimeStatusArr.filter(item => item.title === 'Return placed'),
        rejectedStatusItem
      ];
    }
    if (status.toLowerCase() === 'return_rejected') {
      updatedTimeStatusArr = [
        ...updatedTimeStatusArr.filter(item => item.title === 'Return placed'),
        rejectedStatusItems
      ];
    }
    let updatedTimeStatus=this.updatedReturnTimeStatusArrChange(updatedTimeStatusArr)
    this.setState({ timeStatusArr: updatedTimeStatus, isTrackOrderDisabled });
  };
  updatedReturnTimeStatusArrChange=(updatedTimeArr:TimingArrProps[])=>{
    updatedTimeArr.forEach(item => {
      if(item.title==="Return placed"){
        item.title=i18n.t('Returnplaced');
      }else if(item.title==="Return confirmed"){
        item.title=i18n.t('Returnconfirmed');
      }else if(item.title==="Out For Pickup"){
        item.title=i18n.t('OutForPickup')
      }else if(item.title==="Order Picked Up"){
        item.title=i18n.t('OrderPickedUp')
      }else if(item.title==="Return Completed"){
        item.title=i18n.t('ReturnCompleted')
      }else if(item.title==="Return Cancelled"){
        item.title=i18n.t('ReturnCancelled')
      }else{
        item.title=i18n.t('ReturnRejected')
      }
    })
    return updatedTimeArr;

  }
  updateTimeline = () => {
    let { status, orderStatusList } = this.state;
    let foundCurrentStatus = false;
    let isTrackOrderDisabled = true;
//  'ready_to_ship': 'processing',
//         'in_transit': 'out for delivery'
    const defaultTimelineItems = [
      {
        time: '09:00',
        title: 'Order placed',
        description: `${i18n.t('Orderplaceddescription')} ${this.formatDate(orderStatusList.attributes.placed_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '10:45',
        title: 'Order confirmed',
        description: `${i18n.t('Orderconfirmeddescription')} ${this.formatDate(orderStatusList.attributes.confirmed_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '12:00',
        title: 'Order processing',
        description: `${i18n.t('Orderprocessingdescription')} ${this.formatDate(orderStatusList.attributes.process_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '14:00',
        title: 'Order shipped',
        description: `${i18n.t('Ordershippeddescription')} ${this.formatDate(orderStatusList.attributes.shipped_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '16:30',
        title: 'Out for delivery',
        description: `${i18n.t('Outfordeliverydescription')} ${this.formatDate(orderStatusList.attributes.in_transit_at)}`,
        position:this.state.languagePosition
      },
      {
        time: '16:30',
        title: 'Order Delivered',
        description: `${i18n.t('OrderDelivereddescription')} ${this.formatDate(orderStatusList.attributes.delivered_at)}`,
        position:this.state.languagePosition
      }
    ]
    const rejectedStatusItem = {
      time: '16:30',
      title: 'Order Rejected',
      description: `${i18n.t('OrderRejecteddescription')} ${this.formatDate(orderStatusList.attributes.rejected_at)}`,
      icon: <Image style={{ width: 20, height: 20 }} source={activeStatus} />,
      lineColor: '#FF0000',
      titleStyle: { color: '' },
      position:this.state.languagePosition
    };

    if(status==='ready_to_ship'){
      status = 'shipped'
    }

    let updatedTimeStatusArr = defaultTimelineItems.map(item => {
      let simplifiedTitle = item.title.replace('Order', '').trim().toLowerCase();
      let simplifiedStatus = status.replace('Order', '').trim().toLowerCase();
      const isActive = this.isActiveStatus(simplifiedStatus, simplifiedTitle);
      const iconColor = isActive && activeStatus || foundCurrentStatus && notFocus;
      const { lineColor, titleColor } = this.determineColors(isActive, foundCurrentStatus);
      let iconSize = this.calculateIconSize(iconColor, notFocus, windowWidth);
      if (isActive) { 
        foundCurrentStatus = true;
      }
      if (simplifiedStatus === 'in_transit') {
        isTrackOrderDisabled = false;
      }

      const iconStyle = {
        width: iconSize,
        height: iconSize,
        ...(isActive ? { top: 5.1 } : "")
      };

      return {
        ...item,
        icon: <Image style={iconStyle} source={iconColor} />,
        lineColor: lineColor,
        titleStyle: { color: titleColor }
      };
    });
    if (status.toLowerCase() === 'cancelled') {
      updatedTimeStatusArr = [
        ...updatedTimeStatusArr.filter(item => item.title === 'Order placed'),
        rejectedStatusItem
      ];
    }
    let updatedTimeStatus=this.updatedTimeStatusArrChange(updatedTimeStatusArr);
    this.setState({ timeStatusArr: updatedTimeStatus, isTrackOrderDisabled });
  };
  updatedTimeStatusArrChange=(updatedTimeStatusArr:TimingArrProps[])=>{
    updatedTimeStatusArr.forEach(item => {
      if(item.title==="Order placed"){item.title=i18n.t('Orderplaced');}else
      if(item.title==="Order confirmed"){item.title=i18n.t('Orderconfirmed')}else
      if(item.title==="Order processing"){item.title=i18n.t('Orderprocessing')}else
      if(item.title==="Order shipped"){item.title=i18n.t('Ordershipped')}else
      if(item.title==="Out for delivery"){item.title=i18n.t('Outfordelivery')}else
      if(item.title==="Order Delivered"){item.title=i18n.t('OrderDelivered')}else{
        item.title=i18n.t('OrderRejected')
      }
    })
    return updatedTimeStatusArr;

  }
  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenForOrderStatus();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenForOrderStatus();
    });
    // Customizable Area End
  }

  getTokenForOrderStatus = async() => {
    const token= await getStorageData('token',true);
    const idData= await getStorageData('orderId',true);
      const status= await getStorageData('orderStatus',true);
      const orderId= await getStorageData('orderIdNew',true);
      this.setState({trackId: orderId,token:token})
      if (idData) {  
        this.setState({ orderId: idData, status: status, }, this.updateTimeline);
      } else {
        this.setState({ orderId: orderId, status: status, }, this.updateTimeline);
      }
      this.getSelectedMode(orderId);
  };

  getSelectedMode = async (orderId :any) => {
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.afterGetSelectedMode(selectedModeStr,orderId);
  };

  afterGetSelectedMode =(selectedModeStr : string, orderId:any) =>{
    if (selectedModeStr === "Seller") {
      this.getOrderDetailsAsSeller(orderId);
    } else {
      this.getOrderDetail(orderId)
    }
    this.setState({ selectedModeStr });
  }
  
  getOrderDetail = (orderId:string) => {
    const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBuyerOrderDetailApiCallId = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getOrderDetailBuyerStoreApiEndPoint+orderId
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

getOrderDetailsAsSeller = (orderId:string) => {
  const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
  };
  const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
  );

  this.getSellerOrderDetailApiCallId = requestMessage.messageId;

  requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrderSummarySellerEndpoint+orderId
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

btnTrackOrder = ()=>{
  const msgs = new Message(getName(MessageEnum.NavigationMessage));
  msgs.addData(
    getName(MessageEnum.NavigationTargetMessage),
    "OrderManagementBuyerConfirmation"
  );
  msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  const raiseMessage: Message = new Message(
    getName(MessageEnum.NavigationPayLoadMessage)
  );
  raiseMessage.addData(
    getName(MessageEnum.LoginOptionsNavigationDataMessage),
    {orderId: this.state.trackId, status: this.state.status, trackId: this.state.orderId}
  );
  msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
  runEngine.sendMessage("MergeEngineUtilities", msgs);
}
  // Customizable Area End
}
