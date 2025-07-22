import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {isEmpty,getStorageData,setStorageData,removeStorageData} from "../../../framework/src/Utilities"
import moment from "moment";
import 'moment/locale/ar-dz';
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';
interface AttachmentsStoreProps {
  type: string;
  uri: string;
  name: string;
}

interface ResponseProps {
  errors:string;
}

export interface WeekDayArrProps {
  id:string,
  day:string,
  startTime:string,
  endTime:string,
  status:boolean,
  dayFromError:boolean,
  dayToError:boolean,
  errorMsg:string,
  startTimeTf:string,
  endTimeTf:string;
  showDayValue:string;
}

interface CreateStoreTimeProps {
  storeImage:string;
  storeImageUpload:AttachmentsStoreProps;
  storeName:string;
  storeNameArabic:string;
  storeDes:string;
  storeDesArabic:string;
  address:string;
  latitude:string;
  longitude:string;
  area:string;
  areaArabic:string;
  block:string;
  blockArabic:string;
  mallName:string;
  mallNameArabic:string;
  floor:string;
  floorArabic:string;
  unitNumber:string;
  city:string;
  cityArabic:string;
  zipCode:string;
  reachDriver:string;
  reachDriverArabic:string;
  countryCode:string;
  phoneNumber:string;
  weekDayArr:WeekDayArrProps[];
  orderShip:string;
}

interface TimingArrProps {
  label:string,
  value:string
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
  activatedSeller: boolean;
  avgTimeError:boolean;
  timingArrDropdown:TimingArrProps[];
  weekDayArr:WeekDayArrProps[];
  weekDayStatus:boolean;
  loading:boolean;
  isDatePickerVisible:boolean;
  timeType:string;
  currentIndex:number;
  orderAvgTiming:string;
  languageUpdate:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformCreateStoreTimingController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerDetailsApiCallId = "";
  addStoreCallApiId ="";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      activatedSeller: false,
      avgTimeError:false,
      timingArrDropdown:[
        {label:i18n.t('tenMinsText'),value:'10 mins'},
        {label:i18n.t('tweMinsText'),value:'20 mins'},
        {label:i18n.t('thiMinsText'),value:'30 mins'},
        {label:i18n.t('fourtyMinsText'),value:'40 mins'},
        {label:i18n.t('fiftyMinsText'),value:'50 mins'},
        {label:i18n.t('sixtyMinsText'),value:'60 mins'},
      ],
      weekDayArr:[
        {id:'1',day:'Mon',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('monShortText')},
        {id:'2',day:'Tue',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('tueShortText')},
        {id:'3',day:'Wed',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('wedShortText')},
        {id:'4',day:'Thu',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('thuShortText')},
        {id:'5',day:'Fri',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('friShortText')},
        {id:'6',day:'Sat',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('satShortText')},
        {id:'7',day:'Sun',startTime:'',endTime:'',status:false,dayFromError:false,dayToError:false,errorMsg:'',startTimeTf:'',endTimeTf:'',showDayValue:i18n.t('sunShortText')},
      ],
      weekDayStatus:true,
      loading:false,
      isDatePickerVisible:false,
      timeType:'',
      currentIndex:0,
      orderAvgTiming:'',
      languageUpdate:i18n.language
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token }, this.getSellerProfile);
    }
    else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenFocus();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenFocus();
      this.getLocalDataTiming()
    });
    // Customizable Area End
  }

  handleApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.addStoreCallApiId) {
        this.setState({ loading: false })
        if (responseJson.errors === undefined) {
          this.storeApiResponseSuccess(responseJson)
        } else {
          this.parseApiCatchErrorResponse(responseJson.errors[0]?.contact_number);
        }
      }
      if (apiRequestCallId === this.getSellerDetailsApiCallId) {
        if ("data" in responseJson) {
          const activated =
            responseJson.data.attributes.id_proof.record.approve_status ===
            "Approved";
          setStorageData("SELLER_STATUS", responseJson.data.attributes.seller_status);
          this.setState({
            activatedSeller: activated,
          });
        }
      }
    }
  }

  getLocalDataTiming = async()=>{
    let localObjectGet = await getStorageData('createStoreArr')
    if(localObjectGet != null)
    {
      let localObjectParse = JSON.parse(localObjectGet);
      if(localObjectParse.weekDayArr.length > 0)
      {
        this.setState({weekDayArr:localObjectParse.weekDayArr,orderAvgTiming:localObjectParse.orderShip})
      }
    }

  }

  createStoreBtn = async () => {

    let getWeekArr = this.state.weekDayArr;
    if (!this.checkEmptyValidation(getWeekArr, 0)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 1)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 2)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 3)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 4)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 5)) {
      return false
    }
    if (!this.checkEmptyValidation(getWeekArr, 6)) {
      return false
    }

    if (isEmpty(this.state.orderAvgTiming)) {
      this.setState({ avgTimeError: true })
      return false
    }

    let localObjectGet = await getStorageData('createStoreArr', true)
    let paymentDataMethod = localObjectGet.paymentMode.join(',')
    this.dataSetApiCalling(localObjectGet, paymentDataMethod)

  }

  dataSetApiCalling = (localObjectParse: CreateStoreTimeProps, paymentDataMethod: string) => {
    let getWeekArr = this.state.weekDayArr;
    localObjectParse.weekDayArr = this.state.weekDayArr;
    localObjectParse.orderShip = this.state.orderAvgTiming

    setStorageData("createStoreArr", JSON.stringify(localObjectParse))
    const header = {
      "Content-Type": configJSON.validationFormContentType,
      token: this.state.token
    };

    let profiledata: string | Blob = {
      'name': localObjectParse.storeImageUpload.name,
      'type': localObjectParse.storeImageUpload.type,
      'uri': localObjectParse.storeImageUpload.uri
    } as unknown as Blob;

    let formdata = new FormData()
    formdata.append("business[store_name]", localObjectParse.storeName);
    formdata.append("business[description]", localObjectParse.storeDes);
    formdata.append("business[image]", profiledata);
    formdata.append("business[address]", localObjectParse.address);
    formdata.append("business[latitude]", localObjectParse.latitude);
    formdata.append("business[longitude]", localObjectParse.longitude);
    formdata.append("business[area]", localObjectParse.area);
    formdata.append("business[block]", localObjectParse.block);
    formdata.append("business[mall_name]", localObjectParse.mallName);
    formdata.append("business[floor]", localObjectParse.floor);
    formdata.append("business[unit_number]", localObjectParse.unitNumber);
    formdata.append("business[city]", localObjectParse.city);
    formdata.append("business[zipcode]", localObjectParse.zipCode);
    formdata.append("business[payment_mode][]", paymentDataMethod);
    formdata.append("business[driver_instruction]", localObjectParse.reachDriver);
    formdata.append("business[contact_number]", localObjectParse.countryCode + '' + localObjectParse.phoneNumber);
    formdata.append("business[store_operating_hours][monday][open]", getWeekArr[0].startTimeTf);
    formdata.append("business[store_operating_hours][monday][close]", getWeekArr[0].endTimeTf);
    formdata.append("business[store_operating_hours][tuesday][open]", getWeekArr[1].startTimeTf);
    formdata.append("business[store_operating_hours][tuesday][close]", getWeekArr[1].endTimeTf);
    formdata.append("business[store_operating_hours][wednesday][open]", getWeekArr[2].startTimeTf);
    formdata.append("business[store_operating_hours][wednesday][close]", getWeekArr[2].endTimeTf);
    formdata.append("business[store_operating_hours][thursday][open]", getWeekArr[3].startTimeTf);
    formdata.append("business[store_operating_hours][thursday][close]", getWeekArr[3].endTimeTf);
    formdata.append("business[store_operating_hours][friday][open]", getWeekArr[4].startTimeTf);
    formdata.append("business[store_operating_hours][friday][close]", getWeekArr[4].endTimeTf);
    formdata.append("business[store_operating_hours][saturday][open]", getWeekArr[5].startTimeTf);
    formdata.append("business[store_operating_hours][saturday][close]", getWeekArr[5].endTimeTf);
    formdata.append("business[store_operating_hours][sunday][open]", getWeekArr[6].startTimeTf);
    formdata.append("business[store_operating_hours][sunday][close]", getWeekArr[6].endTimeTf);
    formdata.append("business[average_shipping_time]", this.state.orderAvgTiming);
    formdata.append("business[store_name_arabic]", localObjectParse.storeNameArabic);
    formdata.append("business[description_arabic]", localObjectParse.storeDesArabic);
    formdata.append("business[address_arabic]", localObjectParse.address);
    formdata.append("business[area_arabic]", localObjectParse.areaArabic);
    formdata.append("business[block_arabic]", localObjectParse.blockArabic);
    formdata.append("business[mall_name_arabic]", localObjectParse.mallNameArabic);
    formdata.append("business[floor_arabic]", localObjectParse.floorArabic);
    formdata.append("business[city_arabic]", localObjectParse.cityArabic);
    formdata.append("business[driver_instruction_arabic]", localObjectParse.reachDriverArabic);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addStoreCallApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createStoreApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.sellerDetailsAPIMethodPOST
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }
    selectAvgTime = (item:string)=>{
        this.setState({orderAvgTiming:item,avgTimeError:false})
    }

    manageFromTime = (text:Date)=>{
        let getWeekArr = this.state.weekDayArr;
        getWeekArr[this.state.currentIndex].startTime = this.changeTimeFormat(text); 
        getWeekArr[this.state.currentIndex].dayFromError = false; 
        getWeekArr[this.state.currentIndex].startTimeTf = this.changeTwentyFourFormat(text); 
        this.setState({weekDayArr:getWeekArr})
    }

    manageToTime = (text:Date)=>{
        let getWeekArr = this.state.weekDayArr;
        let startTime = getWeekArr[this.state.currentIndex].startTimeTf;
        let endTime = this.changeTwentyFourFormat(text)
        if(endTime < startTime)
        {
            getWeekArr[this.state.currentIndex].dayFromError = true;
            getWeekArr[this.state.currentIndex].dayToError = true;
            getWeekArr[this.state.currentIndex].endTime = '';
            getWeekArr[this.state.currentIndex].endTimeTf = '';
            getWeekArr[this.state.currentIndex].errorMsg = i18n.t('pleaseSelectTimeGreaterText');
        }else{
            getWeekArr[this.state.currentIndex].endTime = this.changeTimeFormat(text); 
            getWeekArr[this.state.currentIndex].endTimeTf = endTime; 
            getWeekArr[this.state.currentIndex].dayFromError = false;
            getWeekArr[this.state.currentIndex].dayToError = false;
        }
        this.setState({weekDayArr:getWeekArr})
    }
    showTimepicker = (timeType:string,item:WeekDayArrProps,index:number) => {
        this.setState({
          isDatePickerVisible: true,
          timeType:timeType,
          currentIndex:index
        })
    };
    
    hideDatePicker = () => {
      this.setState({isDatePickerVisible: false},()=>{console.log(this.state.isDatePickerVisible)})
    }
    
    handleConfirm = (text:Date) => {
      this.hideDatePicker();
      if(this.state.timeType === 'from')
      {
          this.manageFromTime(text)
      }else{
          this.manageToTime(text)
      }
    }

    changeTimeFormat = (time:Date)=>{
        let updateTime = moment(time).format("hh:mm A");
        return updateTime;
    }

    changeTwentyFourFormat = (time:Date)=>{
        let updateTime = moment(time).format("HH:mm");
        return updateTime;
    }

    checkEmptyValidation =(getWeekArr:WeekDayArrProps[],index:number)=>{
        if(isEmpty(getWeekArr[index].startTime))
        {
            getWeekArr[index].dayFromError = true;
            getWeekArr[index].dayToError = false;
            getWeekArr[index].errorMsg = i18n.t('pleaseSelectFromTimeText')+' '+getWeekArr[index].day;
            this.setState({weekDayArr:getWeekArr})
            return false;
        }
        if(isEmpty(getWeekArr[index].endTime))
        {
            getWeekArr[index].dayToError = true;
            getWeekArr[index].dayFromError = false;
            getWeekArr[index].errorMsg = i18n.t('pleaseSelectToTimeText')+' '+getWeekArr[index].day;
            this.setState({weekDayArr:getWeekArr})
            return false;
        }
        if(getWeekArr[index].endTimeTf < getWeekArr[index].startTimeTf)
        {
            getWeekArr[index].dayToError = true;
            getWeekArr[index].dayFromError = false;
            getWeekArr[index].errorMsg = i18n.t('pleaseSelectTimeGreaterText');
            this.setState({weekDayArr:getWeekArr})
            return false;
        }
        return true;
    }

    checkBoarderWidth(stateValue1:boolean){
      if(stateValue1){
          return 1;
      }
      else{
          return 0;
      }
    }

    checkBoarderColor(stateValue1:boolean){
      if(stateValue1){
          return 'red';
      }
      else{
          return '#A9A9A9';
      }
    }

    getTokenFocus = () => {
      if(i18n.language === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
      const msg: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msg);
    };

    storeApiResponseSuccess = async(responseJson:ResponseProps)=>{
      if(!responseJson.errors)
      {
        removeStorageData('createStoreArr')
        removeStorageData('storeAddressMap')
        showMessage({
          message: configJSON.createStoreSuccessMessage,
          position: { top: 0 },
        });
        
        if(this.state.activatedSeller) {
          return this.props.navigation.pop(3);
        }

        const msg: Message = new Message(
          getName(MessageEnum.NavigationCustomformStoreShowMessage)
        );
    
        msg.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );
  
        this.send(msg);
      }
    }

    getSellerProfile = () => {
      const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
      msg.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceEndPointMessage
        )]: configJSON.getProfileEndpoint,
        [getName(
          MessageEnum.RestAPIRequestMethodMessage
        )]: configJSON.getSellersAPIMethod,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      });
      this.getSellerDetailsApiCallId = msg.messageId;
      runEngine.sendMessage(msg.id, msg);
    };
  // Customizable Area End
}
