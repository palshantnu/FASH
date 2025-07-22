import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { createRef, MutableRefObject } from "react";
import { EmitterSubscription } from "react-native";
import { showMessage, MessageOptions } from "react-native-flash-message";
import moment from "moment";

import i18n from '../../../components/src/i18n/i18n.config'
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  order_id: any;
  catalogue_id: number;
  quantity: number;
  taxable: boolean;
  taxable_value: number;
  cancelOrderModal:boolean;
  token: string;
  orderList: any;
  orderItems: Array<unknown>;
  isVisible: boolean;
  isRefreshing: boolean;
  isSelectAll:boolean,
  id: any;
  name: string;
  description: string;
  price: number;
  currency: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  trendingList: Array<unknown>;
  cartMeta: any;
  cartItems: any;
  loading: boolean;
  subTotal: string;
  shipping: string;
  totalTax: string;
  total: string;
  selectItem:number[]
  reason:string,
  errorMsg:boolean;
  currencyIcon:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RefundmanagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getRefundApiCallId = "";
  showOrderApiCallId = "";
  createOrderItemApiCallId = "";
  deleteOrderItemApiCallId = "";
  getCartApiCallId = "";
  updateQuantityApiCallId = "";
  removeItemApiCallId = "";
  updateRefundApiCallId = "";
  actionMessageRef: MutableRefObject<MessageOptions | null>;
  willFocusListener = { remove: () => {} } as EmitterSubscription;
  willBlurListener = { remove: () => {} } as EmitterSubscription;
  isFocused = true;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      selectItem:[],
      isSelectAll:false,
      order_id: 0,
      catalogue_id: 0,
      errorMsg:false,
      reason:"",
      quantity: 0,
      taxable: false,
      taxable_value: 0,
      token: "",
      orderList: {attributes:{}},
      orderItems: [],
      isVisible: false,
      isRefreshing: false,
      cancelOrderModal:false,
      id: 0,
      name: "",
      description: "",
      price: 0,
      currency: "",
      category_id: 0,
      created_at: "",
      updated_at: "",
      account_id: 0,
      trendingList: [],
      cartMeta: {} ,
      cartItems: [],
      loading: false,
      subTotal: "0",
      shipping: "0",
      totalTax: "",
      total: "0",
      currencyIcon:''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.actionMessageRef = createRef();
    this.actionMessageRef.current = null;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
 
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

        const orderId = message.getData(
          getName(MessageEnum.RefundmanagementNavigationPayloadMessage)
        )
        this.setState({order_id:orderId})
       
        
    }
    
  if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
    this.handleApiResponse(message);
  }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
   
    super.componentDidMount();
    this.isFocused = true;
    this.getData();
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.isFocused = true;
        this.getData();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused = false;
      }
    );
    this.getCurrencyIcon()
  }

  getCurrencyIcon = async () => {
    let currencyIcon = await getStorageData('currencyIcon', true)
    this.setState({ currencyIcon: currencyIcon })
  }

  getToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };
  getData = async () => {
    const token = await getStorageData("token", true);
    console.log('token',token)
    this.setState({ token },()=>{
      this.getRefundOrderList()
    });
  };
  getRefundOrderList = () => {
    this.setState({loading:true})
    const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: this.state.token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getRefundApiCallId = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getOrderDetailBuyerStoreApiEndPoint+this.state.order_id
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
}

  handleApiResponse = (message: Message) => {
    this.setState({loading:false})
    const messageId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (responseJson) {
    this.setState({loading:false})
    if(messageId===this.getRefundApiCallId){
      this.setState({cartItems:responseJson.data.attributes.order_items,orderList:responseJson.data})
      this.selectAll()
    }
    if(messageId===this.updateRefundApiCallId && responseJson.data){
      showMessage({
        message: `${i18n.t('returnOrderSuccessfully')}`,
        type: "success",
        position: { top: 8 },
      });
      this.orderRedirection()
    }
    }

    if (errorReponse) {
      this.parseApiCatchErrorResponse(errorReponse);
    }
  };
  orderRedirection = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderReturnConfirm)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), 'OrderReturnConfirm');

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }
  backRedirection = ()=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), 'Delivered');

    message.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }
  selectAll=()=>{
    let total:string=this.state.total
    let subTotal:string=this.state.subTotal
    if(!this.state.isSelectAll){
      
      let selectItem:number[]=[];
      this.state.cartItems.forEach((element:{id:number,attributes:{total_price:string,status:string}}) => {
       if(element.attributes.status==="delivered"){
        let index:number=this.state.selectItem.findIndex(item=>item===element.id)
        if(index===-1){
        subTotal=(parseInt(subTotal)+parseInt(element.attributes.total_price)).toString()
       total=(parseInt(subTotal)+parseInt(this.state.shipping)).toString()
      }
      selectItem.push(element.id)
      }
      });
      this.setState({isSelectAll:true,selectItem:selectItem,subTotal:subTotal,total:total})
    }else{
      this.setState({isSelectAll:false,selectItem:[],subTotal:'0',total:"0"})
    }
  }
  itemShowSelected(itemId:number){
   let index:number=this.state.selectItem.findIndex(item=>item===itemId)
   if(index!=-1){
    return true
   }else{
    return false
   }
   
  }
  itemSelected(itemId:number){
    let selectItem=this.state.selectItem;
    let total:string=""
    let subTotal:string=this.state.subTotal
    let index:number=this.state.selectItem.findIndex(item=>item===itemId)
    let dataIndex:number=this.state.cartItems.findIndex((item:{id:number})=>item.id===itemId)
    if(index!=-1 ){
      subTotal=(parseInt(subTotal)-parseInt(this.state.cartItems[dataIndex].attributes.total_price)).toString()
       total=(parseInt(subTotal)+parseInt(this.state.shipping)).toString()
      selectItem.splice(index,1)
      this.setState({selectItem:selectItem,isSelectAll:(selectItem.length>0 && this.state.isSelectAll),subTotal:subTotal,total:total})
    }else{
      subTotal=(parseInt(subTotal)+parseInt(this.state.cartItems[dataIndex].attributes.total_price)).toString()
      total=(parseInt(subTotal)+parseInt(this.state.shipping)).toString()
      selectItem.push(itemId)
      if(this.state.cartItems.length===1){
        this.setState({selectItem:selectItem,isSelectAll:true,subTotal:subTotal,total:total})
   
      }else{
        this.setState({selectItem:selectItem,isSelectAll:(selectItem.length>0  && this.state.isSelectAll),subTotal:subTotal,total:total})
   
      }
      }
      }
  refundOrderUpdate=()=>{
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
  };
  const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
  );

  this.updateRefundApiCallId = requestMessage.messageId;
  let date=new Date();
  let dateNew=moment(date,'DD-MM-YYYY')
   moment.locale('en');
  dateNew.add(1,'days')
  let newdate=moment(dateNew).format('DD-MM-YYYY')
  let time=moment(date).format('H A')
  requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.refundUpdateEndpoint+"?order_id="+this.state.order_id+"&type=return_order&order_return_date="+newdate+"&order_return_time="+time+"&order_item_ids=["+this.state.selectItem.toString()+"]&reason="+this.state.reason
  );

  requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
  );
  requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putAPiMethod
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  cancelModalClose=()=>{
    this.setState({cancelOrderModal:false,reason:""})
  }
  cancelOrderConfirm=()=>{
    if(this.state.reason===""){
      this.setState({errorMsg:true})
    }else{
    this.setState({cancelOrderModal:false})
    this.refundOrderUpdate()
    }
  }
  showOrderConfirm=()=>{
    this.setState({cancelOrderModal:true})
  }
  handleChangetheReason=(value:string)=>{
    this.setState({reason:value,errorMsg:false})
  }
  // Customizable Area End
}
