import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {isEmpty} from "../../../framework/src/Utilities"
import i18n from '../../../components/src/i18n/i18n.config';
import moment from "moment";
import 'moment/locale/ar-dz';
import { showMessage } from "react-native-flash-message";

interface TimingArrProps {
  label:string,
  value:string
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
    endTimeTf:string,
    showDayValue:string
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
  avgTimeError:boolean;
  timingArrDropdown:TimingArrProps[];
  weekDayArr:WeekDayArrProps[];
  weekDayStatus:boolean;
  loading:boolean;
  isDatePickerVisibleEdit:boolean;
  timeType:string;
  currentIndex:number;
  orderAvgTiming:string;
  storeId:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformCreateManageTimingController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getStoreTimingsApiCallId = "";
  updateTimingsCallApiId ="";
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
      isDatePickerVisibleEdit:false,
      timeType:'',
      currentIndex:0,
      orderAvgTiming:'',
      storeId:'0'
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
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

        const storeId = message.getData(
          getName(MessageEnum.ManageTimingStoreIdPayloadMessage)
        )
  
        const navigationToken = message.getData(
          getName(MessageEnum.navigationTokenMessage)
        );
  
        this.setState({token:navigationToken,storeId:storeId})
        this.getManageTimings(navigationToken,storeId)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleStoreApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenManageTiming();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenManageTiming();
    });
    // Customizable Area End
  }

  handleStoreApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.updateTimingsCallApiId) {
        this.setState({loading:false})
        if(responseJson.errors === undefined)
        {
            showMessage({
                message: i18n.t('storeTimingUpdatedSuccessfully'),
                position: { top: 0 },
            });
            this.props.navigation.goBack()
        }
      }
      if (apiRequestCallId === this.getStoreTimingsApiCallId) {
        this.setState({loading:false})
        if(responseJson.errors === undefined)
        {
            let storeTimingArr = responseJson.store_operating_hours
            let localWeekData = this.state.weekDayArr
            localWeekData[0].startTime = moment(storeTimingArr['monday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[0].endTime = moment(storeTimingArr['monday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[0].startTimeTf = storeTimingArr['monday'].open
            localWeekData[0].endTimeTf = storeTimingArr['monday'].close
            localWeekData[1].startTime = moment(storeTimingArr['tuesday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[1].endTime = moment(storeTimingArr['tuesday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[1].startTimeTf = storeTimingArr['tuesday'].open
            localWeekData[1].endTimeTf = storeTimingArr['tuesday'].close
            localWeekData[2].startTime = moment(storeTimingArr['wednesday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[2].endTime = moment(storeTimingArr['wednesday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[2].startTimeTf = storeTimingArr['wednesday'].open
            localWeekData[2].endTimeTf = storeTimingArr['wednesday'].close
            localWeekData[3].startTime = moment(storeTimingArr['thursday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[3].endTime = moment(storeTimingArr['thursday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[3].startTimeTf = storeTimingArr['thursday'].open
            localWeekData[3].endTimeTf = storeTimingArr['thursday'].close
            localWeekData[4].startTime = moment(storeTimingArr['friday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[4].endTime = moment(storeTimingArr['friday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[4].startTimeTf = storeTimingArr['friday'].open
            localWeekData[4].endTimeTf = storeTimingArr['friday'].close
            localWeekData[5].startTime = moment(storeTimingArr['saturday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[5].endTime = moment(storeTimingArr['saturday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[5].startTimeTf = storeTimingArr['saturday'].open
            localWeekData[5].endTimeTf = storeTimingArr['saturday'].close
            localWeekData[6].startTime = moment(storeTimingArr['sunday'].open, ["HH:mm"]).format("hh:mm A")
            localWeekData[6].endTime = moment(storeTimingArr['sunday'].close, ["HH:mm"]).format("hh:mm A")
            localWeekData[6].startTimeTf = storeTimingArr['sunday'].open
            localWeekData[6].endTimeTf = storeTimingArr['sunday'].close
            this.setState({weekDayArr:localWeekData,orderAvgTiming:responseJson.average_shipping_time})
        }
      }
    }
  }

    updateStoreTimingsBtn = async()=>{
        
      let getWeekArrEdit = this.state.weekDayArr;
      if(!this.checkEmptyEditValidation(getWeekArrEdit,0))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,1))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,2))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,3))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,4))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,5))
      {
          return false
      }
      if(!this.checkEmptyEditValidation(getWeekArrEdit,6))
      {
          return false
      }

      if(isEmpty(this.state.orderAvgTiming))
      {
          this.setState({avgTimeError:true})
          return false
      }
      this.updateSetApiCalling()
      
    }

    updateSetApiCalling = ()=>{
      const header = {
        "Content-Type": configJSON.validationFormContentType,
        token: this.state.token
      };

      let formdata = new FormData()
      formdata.append("business[store_operating_hours][monday][open]",this.state.weekDayArr[0].startTimeTf);
      formdata.append("business[store_operating_hours][monday][close]",this.state.weekDayArr[0].endTimeTf);
      formdata.append("business[store_operating_hours][tuesday][open]",this.state.weekDayArr[1].startTimeTf);
      formdata.append("business[store_operating_hours][tuesday][close]",this.state.weekDayArr[1].endTimeTf);
      formdata.append("business[store_operating_hours][wednesday][open]",this.state.weekDayArr[2].startTimeTf);
      formdata.append("business[store_operating_hours][wednesday][close]",this.state.weekDayArr[2].endTimeTf);
      formdata.append("business[store_operating_hours][thursday][open]",this.state.weekDayArr[3].startTimeTf);
      formdata.append("business[store_operating_hours][thursday][close]",this.state.weekDayArr[3].endTimeTf);
      formdata.append("business[store_operating_hours][friday][open]",this.state.weekDayArr[4].startTimeTf);
      formdata.append("business[store_operating_hours][friday][close]",this.state.weekDayArr[4].endTimeTf);
      formdata.append("business[store_operating_hours][saturday][open]",this.state.weekDayArr[5].startTimeTf);
      formdata.append("business[store_operating_hours][saturday][close]",this.state.weekDayArr[5].endTimeTf);
      formdata.append("business[store_operating_hours][sunday][open]",this.state.weekDayArr[6].startTimeTf);
      formdata.append("business[store_operating_hours][sunday][close]",this.state.weekDayArr[6].endTimeTf);
      formdata.append("business[average_shipping_time]",this.state.orderAvgTiming);

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.updateTimingsCallApiId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.updateStoreTimingsApiEndPoint+this.state.storeId+'/manage_timings'
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
        configJSON.sellerDetailsAPIMethodPATCH
      );
      this.setState({loading:true})
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;
    }

    selectAvgTimeUpdate = (item:string)=>{
        this.setState({orderAvgTiming:item,avgTimeError:false})
    }

    manageFromTimeEdit = (text:Date)=>{
        let getWeekArr = this.state.weekDayArr;
        getWeekArr[this.state.currentIndex].startTime = this.changeTimeFormatEdit(text); 
        getWeekArr[this.state.currentIndex].dayFromError = false; 
        getWeekArr[this.state.currentIndex].startTimeTf = this.updateTwentyFourFormatEdit(text); 
        this.setState({weekDayArr:getWeekArr})
    }

    manageToTimeEdit = (text:Date)=>{
        let getWeekArr = this.state.weekDayArr;
        let startTime = getWeekArr[this.state.currentIndex].startTimeTf;
        let endTime = this.updateTwentyFourFormatEdit(text)
        if(endTime < startTime)
        {
            getWeekArr[this.state.currentIndex].dayFromError = true;
            getWeekArr[this.state.currentIndex].dayToError = true;
            getWeekArr[this.state.currentIndex].endTime = '';
            getWeekArr[this.state.currentIndex].endTimeTf = '';
            getWeekArr[this.state.currentIndex].errorMsg = i18n.t('pleaseSelectTimeGreaterText');
        }else{
            getWeekArr[this.state.currentIndex].endTime = this.changeTimeFormatEdit(text); 
            getWeekArr[this.state.currentIndex].endTimeTf = endTime; 
            getWeekArr[this.state.currentIndex].dayFromError = false;
            getWeekArr[this.state.currentIndex].dayToError = false;
        }
        this.setState({weekDayArr:getWeekArr})
    }
    showTimepickerEdit = (timeType:string,item:WeekDayArrProps,index:number) => {
        this.setState({
          isDatePickerVisibleEdit: true,
          timeType:timeType,
          currentIndex:index
        })
    };
    
    hideDatePickerEdit = () => {
      this.setState({isDatePickerVisibleEdit: false})
    }
    
    handleConfirmEdit = (text:Date) => {
      this.hideDatePickerEdit();
      if(this.state.timeType === 'from')
      {
          this.manageFromTimeEdit(text)
      }else{
          this.manageToTimeEdit(text)
      }
    }

    changeTimeFormatEdit = (time:Date)=>{
        let updateTime = moment(time).format("hh:mm A");
        return updateTime;
    }

    updateTwentyFourFormatEdit = (time:Date)=>{
        let updateTime = moment(time).format("HH:mm");
        return updateTime;
    }

    checkEmptyEditValidation =(getWeekArr:WeekDayArrProps[],index:number)=>{

        if(isEmpty(getWeekArr[index].startTime))
        {
            getWeekArr[index].dayFromError = true;
            getWeekArr[index].dayToError = false;
            getWeekArr[index].errorMsg = i18n.t('pleaseSelectFromTimeText')+' '+getWeekArr[index].showDayValue;
            this.setState({weekDayArr:getWeekArr})
            return false;
        }
        if(isEmpty(getWeekArr[index].endTime))
        {
            getWeekArr[index].dayToError = true;
            getWeekArr[index].dayFromError = false;
            getWeekArr[index].errorMsg = i18n.t('pleaseSelectToTimeText')+' '+getWeekArr[index].showDayValue;
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

    checkBoarderColor(stateValue1:boolean){
        if(stateValue1){
            return 'red';
        }
        else{
            return '#A9A9A9';
        }
    }

    checkBoarderWidth(stateValue1:boolean){
      if(stateValue1){
          return 1;
      }
      else{
          return 0;
      }
    }

    getTokenManageTiming = () => {
      const msg: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msg);
      if(i18n.language === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
    };

    getManageTimings = (token:string,storeId:string) => {
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getStoreTimingsApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getManageTimingStoreApiEndPoint+storeId+'/store_operating_hours'
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
  // Customizable Area End
}
