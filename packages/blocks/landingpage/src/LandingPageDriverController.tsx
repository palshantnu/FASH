import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import { createRef, MutableRefObject } from "react";
import {
  EventSubscription,
  Linking,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { NewOrder } from "./responses";
import {
  setStorageData,
  getStorageData,
} from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import { setupNotification } from "../../../components/src/Notificationservices/NotificationService";
import messaging from '@react-native-firebase/messaging';
import i18n from "../../../components/src/i18n/i18n.config";
interface MapLocationProps {
  lat: number;
  lng: number;
}

interface MapGeomatryProps {
  location: MapLocationProps;
}

interface RequestProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface MapProps {
  formatted_address: string;
  geometry: MapGeomatryProps;
}

interface RegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
interface Coordinate{
  latitude: number;
  longitude: number;
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
  loading: boolean;
  driverStatusRequest:string
  storeSideStatus:boolean;
  token: string;
  latitude: number;
  longitude: number;
  latdelta: string;
  longdelta: string;
  region: RegionProps;
  sellerLocation: RegionProps;
  driverOnlineOffline: boolean;
  showNewOrder: boolean;
  newOrderList: NewOrder;
  driverStatus: string;
  showNavigation: boolean;
  navigationStarted: boolean;
  orderInfo: boolean;
  isVisibleModal: boolean;
  isVisibleModal2: boolean;
  OtpArray: any[];
  button_enable_disable: boolean;
  otp: string;
  showErrorMessage: boolean;
  showErroMessageString: string;
  custNavigation: boolean;
  DropLocation: boolean;
  CustList: any;
  orderOngoing: boolean;
  custNavigationStarted: boolean;
  orderDetails: boolean;
  orderCompleted: boolean;
  orderNo: boolean;
  storeOTPDone: boolean;
  customerSideDone:boolean;
  cancelOrderModal:boolean,
  distance:number;
  hasNewNotification: boolean
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageDriverController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  isFocused: MutableRefObject<boolean | null>;
  willFocusListener: EventSubscription | null = null;
  willBlurListener: EventSubscription | null = null;
  onMapReady = "";
  marker = "";
  interval: number=0;
  intervalOrder: number=0;
  getNewOrderId: string = "";
  deliveredId: string = "";
  getOnlineOfflineId: string = "";
  confirmOrderId: string = "";
  sendOtpId: string = "";
  enterOtpId: string = "";
  arrivedId: string = "";
  inTransitId: string = "";
  DriverOtpId: string = "";
  confirmOtpId: string = "";
  updateLocationId: string = "";
  otpTextInput: any = [];
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
      loading: false,
      storeOTPDone:false,
      cancelOrderModal:false,
      customerSideDone:false,
      token: "",
      distance:-1,
      latitude: 22.6917, 
      longitude: 75.8314,
      latdelta: "",
      longdelta: "",
      storeSideStatus:false,
      region: {
        latitude: 22.6917, 
        longitude: 75.8314,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      sellerLocation: {
        latitude: 22.6917, 
      longitude: 75.8314,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      },
      driverOnlineOffline: false,
      showNewOrder: false,
      newOrderList: {id:"",type:'order',attributes:{}},
      driverStatus: "offline",
      showNavigation: false,
      navigationStarted: false,
      orderCompleted: false,
      orderInfo: false,
      orderNo: false,
      orderOngoing: false,
      isVisibleModal: false,
      isVisibleModal2: false,
      OtpArray: ["", "", "", ""],
      button_enable_disable: false,
      otp: "",
      showErrorMessage: false,
      showErroMessageString: "",
      custNavigation: false,
      DropLocation: false,
      CustList: {},
      custNavigationStarted: false,
      orderDetails: false,
      driverStatusRequest:"",
      hasNewNotification: false
    };

    this.isFocused = createRef();
    this.isFocused.current = true;
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
   
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId === this.getNewOrderId && responseJson.data) {
        this.setState({
          newOrderList: responseJson.data,
        });
      }
      if (apiRequestCallId === this.getNewOrderId && responseJson.data===undefined) {
        this.setState({
          newOrderList: {id:"",attributes:{},type:'order'},
        });
      }
      
      this.arriverdRequestSet(apiRequestCallId,responseJson)
    }
  }

  // Customizable Area Start
  confirmOderResponceSet(){
  if(this.state.driverStatusRequest=="accept"){
    this.setState({ showNavigation: true ,loading:false});
    this.fetchNewOrderList();
    }else{
      this.setState({ loading:false});
      showMessage({
        message: 'Order rejected successfully',
        type: "success",
        position: { top: 8 },
      });
      this.handleBackPress()
    }
  }
  setDataForOtp(responseJson:{error:string}){
    if( !responseJson.error){
      this.setState({ loading: false,isVisibleModal:false,orderCompleted: this.state.newOrderList.attributes.status==="return_in_process"?true:false  });
      this.resetOtpArray();
      if(this.state.newOrderList.attributes.status!="return_in_process"){
        this.fetchNewOrderList();
        setTimeout(()=>{
          this.fetchNewOrderList();
        },500)
        
      }
    }
    else{
      this.setState({
        showErrorMessage: true,
        showErroMessageString: "*Invalid OTP",
        loading: false,
        isVisibleModal:true
      });
    }
  }
  setDataForconfirmOtp(responseJson:{error:string}){
    if( !responseJson.error) {
      this.setState({ loading: false,isVisibleModal:false,orderCompleted:  (this.state.newOrderList.attributes.status==="return_in_process")?false:true });
      this.resetOtpArray();
      if(this.state.newOrderList.attributes.status==="return_in_process"){
        this.fetchNewOrderList();
        setTimeout(()=>{
          this.fetchNewOrderList();
        },500)
      }
    }else{
      this.setState({
        showErrorMessage: true,
        showErroMessageString: "*Invalid OTP",
        loading: false,
        isVisibleModal:true
      });
    }
  }
  arriverdRequestSet(apiRequestCallId:string,responseJson:{error:string}){
    if (apiRequestCallId === this.arrivedId) {
      this.OrderInTransit();
      }
      if (apiRequestCallId === this.inTransitId) {
        if(this.state.newOrderList.attributes.status==="return_under_process" || this.state.newOrderList.attributes.status==="return_in_process"){
          this.otpByDriver()
        }else{
         this.sendStoreOTP();
        }
        this.fetchNewOrderList();
        }
      if (apiRequestCallId === this.sendOtpId) {
        this.setState({ loading: false });
      this.fetchNewOrderList();
      }
      if (apiRequestCallId === this.confirmOrderId) {
       this.confirmOderResponceSet()
      }
      if (apiRequestCallId === this.confirmOtpId ){ 
        this.setDataForconfirmOtp(responseJson)
    }
      if( apiRequestCallId === this.enterOtpId ){ 
        this.setDataForOtp(responseJson)
    }
      if( apiRequestCallId === this.DriverOtpId){
        this.setState({ loading: false });
        this.fetchNewOrderList();
      }
      if (apiRequestCallId === this.getOnlineOfflineId) {
        if(this.state.driverStatus==="online"){
          this.getcurrentlatlogn()
          this.fetchNewOrderList();
        }
       }
  }
  async componentDidMount(): Promise<void> {
    setupNotification(this.props)
    await this.requestLocation()
    this.getData();
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.isFocused.current = true;
        this.getData();
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });

       messaging().onMessage(async remoteMessage => {
          this.setState({ hasNewNotification: true }); 
      });
        setupNotification(this.props)
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );
    this.timer = setInterval(() => {
      this.getData();
    }, 5000);
    await this.setDriverOnline();
  }
  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token }, () =>{
      this.getcurrentlatlogn()
    if(this.state.driverStatus==="online"){
      this.fetchNewOrderList()
    }
    clearInterval(Number(this.interval))
    this.interval=  Number(setInterval(()=>{
    this.getcurrentlatlogn()
      },1000*60))
    } );
  };
  setDriverOnline = async () => {
    const driverOnlineOffline = await getStorageData("driverOnlineOffline");
   if( driverOnlineOffline!=null){
    const driverStatus = driverOnlineOffline === 'true' ? "online" : "offline";
    this.setState({
      driverOnlineOffline: driverOnlineOffline === "true",
      driverStatus,
    });
    if(driverStatus==="online"){
      this.getcurrentlatlogn()
      this.fetchNewOrderList();
    }
    }else{
      this.setState({
        driverOnlineOffline: false,
        driverStatus:"offline",
      });
    }
  };
  checkStatusCustomerForNavigateButton(status:string){
    if((status==="store_otp_confirm" && this.state.newOrderList.attributes.status==="shipped") || (this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp" && this.state.newOrderList.attributes.status==="return_in_process")){
      if(this.state.distance<=1){
        this.setState({customerSideDone:true})
      }
  }else{
    this.setState({customerSideDone:false})
  }
  }
  checkStatus(status:string){
     if(this.state.distance!=-1){
  if(status==="accepted"){
      if(this.state.distance<=1){
        this.setState({storeSideStatus:true})
      }
  }else{
    this.setState({storeSideStatus:false})
  }
  this.checkStatusCustomerForNavigateButton(status)
}
  }
  checkLocationData(result:{distance:number}){
    this.setState({distance:result.distance})
  }

  componentWillUnmount = async () => {
    if (this.timer) {
      clearInterval(this.timer as number)
    }
  }

  onlineOfflineStatusUpdate = async (value: boolean) => {
    const status = value ? "online" : "offline";
    this.setState(
      { driverOnlineOffline: value, driverStatus: status },
      async () => {
        await this.UpdateOnlineOffline();
        await setStorageData("driverOnlineOffline", value.toString());
        clearInterval(Number(this.intervalOrder))
      this.intervalOrder=  Number(setInterval(()=>{
       this.fetchNewOrderList()
        },10000*60))
      }
    );
  };

  handleOrder = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "LandingPageDriver"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
    setTimeout(()=>{
      this.setState({newOrderList:{attributes:{},id:'',type:'order'}})
      this.fetchNewOrderList();
    },1000*60)
  };

  btnNotificationRedirection = () => {
    this.setState({hasNewNotification:false})
    const message = new Message(
      getName(MessageEnum.NavigationNotificationsBuyer)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  handleOrderInfo1 = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "LandingPageDriverOrder"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.LoginOptionsNavigationDataMessage),
      true
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
    setTimeout(()=>{
      this.setState({newOrderList:{attributes:{},id:'',type:'order'}})
      this.fetchNewOrderList();
    },1000*60)
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };
  formatDate = (date: Date) => {
    moment.locale(i18n.language);
    return moment(date).format('DD-MMM-YYYY')
  };
  formatTime = (date: Date) => {
    moment.locale(i18n.language);
    return moment(date).format('HH:MM A')
  };
 
  handleDashboard = async() => {
    this.handleOrder()
  };
  callInPhone=()=>{
    let phone=this.state.newOrderList?.attributes?.business_information?.contact_number;
    Linking.openURL('tel:'+phone)
  }

  callInPhoneCustomer=()=>{
    let phone=this.state.newOrderList?.attributes?.delivery_address?.contact_number;
    Linking.openURL('tel:'+phone)
  }

  chatWithCustomer=(userID : string)=>{
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'Chat'
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
        userID
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  }

  btnRedirectDriverOrder = async() => {
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationDriverNewOrder)
    );
    msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(msgNavigation);
    setTimeout(()=>{
      this.setState({newOrderList:{attributes:{},id:'',type:'order'}})
      this.fetchNewOrderList();
    },1000*60)
  };

  handleStartNavigation = () => {
    this.setState({ showNavigation: true });
  };

  resetOtpArray = () => {
    this.setState({ OtpArray: this.state.OtpArray.map(() => "") });
  };

  handleBackPress = () => {
    this.handleOrder()
  };

  fetchNewOrderList = async () => {
    let deviceId = await getStorageData('USER_FCM_TOKEN')
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getNewOrderId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.getNewOrderList}${deviceId}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(message.id, message);
  };

  UpdateOnlineOffline = async () => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getOnlineOfflineId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateOnlineStatus +
        `${this.state.latitude}&longitude=${this.state.longitude}&driver_status=${this.state.driverStatus}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  ArrivedAtLocation = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const order = this.state.newOrderList;
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.arrivedId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.arrivedAtLocation + `${order?.attributes?.id}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  OrderInTransit = async () => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const order = this.state.newOrderList;
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.inTransitId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.orderInTransit + `${order?.attributes?.id}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);
  };

  acceptOrRejectOrder = async (action: string) => {
    let driverStatus = "";
    if (action === "accept") {
      this.setState({ showNavigation: true,driverStatusRequest:'accept' });
      driverStatus = "order_accepted";
    } else if (action === "reject") {
      this.setState({ showNavigation: true,driverStatusRequest:"reject" });
      driverStatus = "order_rejected";
    }
    this.setState({ loading: true });
    const order = this.state.newOrderList;
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.confirmOrderId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.acceptOrRejectOrder +
        `${order?.attributes?.id}&driver_status=${driverStatus}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(message.id, message);
  };

  getcurrentlatlogn = async () => {
    let locationRequest = (await this.requestLocation()) as RequestProps;
    if(locationRequest){
    let latitude = locationRequest.coords.latitude;
    let longitude = locationRequest.coords.longitude;
    this.updateLatLongDriver(latitude,longitude)
    this.setState({ latitude: latitude, longitude: longitude, region: {
      latitude: latitude, 
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }});
    }
  };
  updateLatLongDriver=(lat:number,long:number)=>{
      const header = {
        "Content-Type": configJSON.exampleApiContentType,
        token: this.state.token,
      };
      const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      this.updateLocationId = message.messageId;
      message.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.driverLocationEndpoint+"?lat="+lat+"&long="+long
      );
      message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
      message.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.PutApiMethod
      );
      runEngine.sendMessage(message.id, message);
  }
  prevoiusFocus = (key: string, index: number) => {
    if (key === "Backspace" && index !== 0) {
      const otp = [...this.state.OtpArray];
      otp[index] = "";

      const stringOtp = otp.join("");

      this.setState({
        OtpArray: otp,
        otp: stringOtp,
        button_enable_disable: stringOtp.length === 4,
      });

      this.otpTextInput[index - 1].focus();
    }
  };
  changeFocus = (value: string, index: number) => {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.OtpArray;
    otp[index] = value;
    let stringOtp = otp.join("");
    if (stringOtp.length == 4) {
      this.setState({ button_enable_disable: true });
    } else {
      this.setState({ button_enable_disable: false });
    }
    this.setState({
      OtpArray: otp,
      otp: stringOtp,
      showErrorMessage: false,
      showErroMessageString: "",
    });
  };

  sendStoreOTP = async () => {
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.sendOtpId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendOtp + `${this.state.newOrderList?.id}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    runEngine.sendMessage(message.id, message);
  };

  enterOTP = async () => {
    if (!this.state.otp || this.state.otp.length <= 3) {
      this.setState({
        showErrorMessage: true,
        showErroMessageString: "* Enter 4 digit OTP",
        loading: false,
        isVisibleModal:true
      });
      return false;
    }

    this.setState({ loading:true,isVisibleModal:false})
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.enterOtpId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.enterOtp +
        `${this.state.newOrderList?.id}&otp=${this.state.otp}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    runEngine.sendMessage(message.id, message);
    
  };

  otpByDriver = async () => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.DriverOtpId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.otpbyDriver+ `${this.state.newOrderList?.id}`
    );
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PutApiMethod
    );
    runEngine.sendMessage(message.id, message);
  };
  toggleModal=()=>{
    this.setState({ isVisibleModal: !this.state.isVisibleModal,OtpArray:["","","",""],otp:""})
  }
  confirmOTP = async () => {
    if (!this.state.otp || this.state.otp.length <= 3) {
      this.setState({
        showErrorMessage: true,
        showErroMessageString: "* Enter 4 digit OTP",
        loading: false,
        isVisibleModal:true
      });
      return false;
    }

    this.setState({loading:true,isVisibleModal:false });
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.confirmOtpId = message.messageId;
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.confirmOtp
    );
    let httpBody={seller_order_id:this.state.newOrderList?.id,otp:this.state.otp}
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    runEngine.sendMessage(message.id, message);
    this.resetOtpArray();
  };

  requestLocation = () => {
    return new Promise(async (resolve) => {
      if (Platform.OS === "ios") {
        Geolocation.requestAuthorization('always');
        resolve(this.getOneTimeLocation());
        resolve(this.subscribeLocationLocation());
        
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
              buttonPositive: "Ok",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            resolve(this.getOneTimeLocation());
            resolve(this.subscribeLocationLocation());
          } else {
            let position = {
              coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
            };
            resolve(position);
          }
        } catch (_error) {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        }
      }
    });
  };

  getOneTimeLocation = () => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          });
          resolve(position);
        },
        () => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  };

  handleNavigation = async() => {
    const { latitude, longitude } = this.state;
    const sellerLatitudecheck =this.latitudeSet()
    const sellerLongitudecheck =this.longitudeSet()
    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${sellerLatitudecheck},${sellerLongitudecheck}&travelmode=driving`;
    this.checkStatus(this.state.newOrderList.attributes.driver_order_status)
    Linking.openURL(url);
  };

  handleCustNavigation = async() => {
    const { latitude, longitude } = this.state;
    const CustLatitudecheck =this.latitudeSet()
    const CustLongitudecheck =this.longitudeSet()
    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${CustLatitudecheck},${CustLongitudecheck}&travelmode=driving`;
    this.checkStatus(this.state.newOrderList.attributes.driver_order_status)
    Linking.openURL(url);
    
  };

  subscribeLocationLocation = () => {
    return new Promise((resolve) => {
      Geolocation.watchPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          });
          resolve(position);
        },
        (_error) => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  };
  cancelModalClose(){
    this.setState({cancelOrderModal:!this.state.cancelOrderModal})
  }
  cancelOrderConfirm(){
    this.setState({cancelOrderModal:!this.state.cancelOrderModal})
    this.acceptOrRejectOrder("reject");
  }
  latitudeSet(){
    if(this.state.newOrderList?.attributes?.status==="processed" || (this.state.newOrderList?.attributes?.status==="return_in_process" && this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp")){
      return this.state.newOrderList?.attributes?.business_information?.latitude
    }else if(this.state.newOrderList?.attributes?.status==="shipped" || this.state.newOrderList?.attributes?.status==="return_in_process"){
      return this.state.newOrderList?.attributes?.delivery_address?.latitude
    }else{
      return this.state.newOrderList?.attributes?.business_information?.latitude
    }
  }
  longitudeSet(){
    if(this.state.newOrderList?.attributes?.status==="processed" || (this.state.newOrderList?.attributes?.status==="return_in_process" && this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp")){
      return this.state.newOrderList?.attributes?.business_information?.longitude
    }else if(this.state.newOrderList?.attributes?.status==="shipped" ||  this.state.newOrderList?.attributes?.status==="return_in_process" ){
      return this.state.newOrderList?.attributes?.delivery_address?.longitude
    }else{
      return this.state.newOrderList?.attributes?.business_information?.longitude
    }
  }
  setPhoneNo(){
    if(this.state.newOrderList?.attributes?.status==="processed"){
      return this.state.newOrderList?.attributes?.business_information?.contact_number
    }
    if( this.state.newOrderList?.attributes?.status==="return_in_process" && this.state.newOrderList.attributes.driver_order_status==="store_otp_send"){
      return this.state.newOrderList?.attributes?.business_information?.contact_number
    }
    if(this.state.newOrderList?.attributes?.status==="shipped" || this.state.newOrderList?.attributes?.status==="return_in_process"){
      return this.state.newOrderList?.attributes?.delivery_address?.contact_number
    }
    
  }
  
  setCustomerName(){
    if(this.state.newOrderList?.attributes?.status==="processed" || this.state.newOrderList?.attributes?.status==="shipped"){
      return this.state.newOrderList?.attributes?.customer_information?.first_name+" "+this.state.newOrderList?.attributes?.customer_information?.last_name  || "";

    }
     if( this.state.newOrderList?.attributes?.status==="return_in_process"){
      return  this.state.newOrderList?.attributes?.business_information
      ?.store_name
    }
  }

  setStoreName(){
    if(this.state.newOrderList?.attributes?.status==="processed" || this.state.newOrderList?.attributes?.status==="shipped"){
      return this.state.newOrderList?.attributes?.business_information
      ?.store_name 
    }
     if(this.state.newOrderList?.attributes?.status==="return_in_process"){
      return  this.state.newOrderList?.attributes?.customer_information?.first_name+" "+this.state.newOrderList?.attributes?.customer_information?.last_name  || "";
    }
  }
  getDeliveryInfo = () => {
    if(this.state.newOrderList?.attributes?.status==="processed" || this.state.newOrderList?.attributes?.status==="shipped"){
      return this.state.newOrderList?.attributes?.delivery_address?.street 
    } 
    if( this.state.newOrderList?.attributes?.status==="return_in_process"){
      return  this.state.newOrderList?.attributes?.business_information?.address;
    }
    
  };
  getBusinessInfo = () => {
    if(this.state.newOrderList?.attributes?.status==="processed" || this.state.newOrderList?.attributes?.status==="shipped"){
      return this.state.newOrderList?.attributes?.business_information?.address 
    }
    if(this.state.newOrderList?.attributes?.status==="return_under_process" || this.state.newOrderList?.attributes?.status==="return_in_process"){
      return  this.state.newOrderList?.attributes?.delivery_address?.street 
    }
    
  };
  checkStatusCustomer(){
    return (!this.state.orderCompleted && this.state.newOrderList.attributes.driver_order_status==="send_customer_otp" && this.state.newOrderList.attributes.status==="shipped") || ( !this.state.orderCompleted && this.state.newOrderList.attributes.driver_order_status==="store_otp_send" && this.state.newOrderList.attributes.status==="return_in_process") 
  }
  checkStatusStore(){
    return (this.state.newOrderList.attributes.driver_order_status==="store_otp_send" && this.state.newOrderList.attributes.status==="shipped") || (this.state.newOrderList.attributes.driver_order_status==="send_customer_otp" &&  this.state.newOrderList.attributes.status==="return_in_process")
  }
  // Customizable Area End
}
