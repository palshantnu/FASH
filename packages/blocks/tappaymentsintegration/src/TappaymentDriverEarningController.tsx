import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {EarningProps} from './types/types'
import moment from "moment";
import i18n from '../../../components/src/i18n/i18n.config';
import { getStorageData } from "framework/src/Utilities";
import 'moment/locale/ar-dz';

interface EarningDataProps{
    login_time: string;
    total_earning: number;
    deliveries: number;
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
  token: string;
  categorySelectStatus:string;
  filterArr:EarningProps[];
  calendarModalEarning:boolean;
  apiSelectEarningStatus:string;
  startDateEarning:Date;
  endDateEarning:Date;
  dateShowTitleManage:string;
  earningData:EarningDataProps;
  maxDateRangeNumber:number;
  earningDataManageT:string;
  localLanguage:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentDriverEarningController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getDriverEarningCallApiId:string = "";
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
        token: "",
        categorySelectStatus:'Daily',
        filterArr:[
            {
                showEarning:i18n.t('dailyText'),
                earningShowFilter:i18n.t('dailyEarningsText'),
                earningName:'Daily',
                status:false,
                selectEarning:'daily_earnings',

            },
            {
                showEarning:i18n.t('weeklyText'),
                earningShowFilter:i18n.t('weeklyEarningsText'),
                earningName:'Weekly',
                status:false,
                selectEarning:'weekly_earnings',
            },
            {
                showEarning:i18n.t('monthlyText'),
                earningShowFilter:i18n.t('monthlyEarningsText'),
                earningName:'Monthly',
                status:false,
                selectEarning:'monthly_earnings'
            },
        ],
        calendarModalEarning:false,
        apiSelectEarningStatus:'daily_earnings',
        startDateEarning:new Date(),
        endDateEarning:new Date(),
        dateShowTitleManage:'',
        earningData:{
            login_time: "0 min",
            total_earning: 0.00,
            deliveries: 0,
        },
        maxDateRangeNumber:0,
        earningDataManageT:i18n.t('dailyEarningsText'),
        localLanguage:''
    };

    this.onDateChangeEarning = this.onDateChangeEarning.bind(this);
    this.onDateChangeDailyEarning = this.onDateChangeDailyEarning.bind(this);

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.apiResponseEarningManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start

    getTokenLocal = async()=>{
        let token = await getStorageData('token',true)
        this.setState({token:token})
        if(i18n.language === 'en')
        {
          moment.locale('en')
        }else{
          moment.locale('ar-dz')
        }
    }

    async componentDidMount() {
        super.componentDidMount();
        // Customizable Area Start
        this.getTokenLocal()
        let currencyIcon = await getStorageData('currencyIcon',true)
        this.setState({localLanguage:currencyIcon})
        this.props.navigation.addListener("willFocus", async() => {
            let currencyIcon = await getStorageData('currencyIcon',true)
            this.setState({localLanguage:currencyIcon})
            this.getTokenLocal();
            this.updateFirstTimeDate()
        });
        // Customizable Area End
    }

    apiResponseEarningManage = (message:Message) =>
    {
      const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
      );
  
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
  
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )
  
      if (responseJson.error === undefined) {
          if (apiRequestCallId === this.getDriverEarningCallApiId) {
              this.setState({earningData:responseJson,loading:false})
          }
        
      }else{
        this.setState({loading:false,earningData:{
          login_time: "0 min",
          total_earning: 0.00,
          deliveries: 0}})
        this.parseApiErrorResponse(errorReponse)
      }
    }

    btnRedirectSeeDetail = () => {

        let dataSend = {
            activeType:this.state.categorySelectStatus,
            startDate:this.state.startDateEarning,
            endDate:this.state.endDateEarning,
            apiSelectEarningStatus:this.state.apiSelectEarningStatus
        }

        const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationAnalyticsDriverEarning)
        );

        msgNavigation.addData(getName(MessageEnum.DriverAnalyticsPayloadMessage), dataSend);

        msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );

        this.send(msgNavigation);
    };

    btnRedirectPaymentMethod = () => {
        const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationTappaymentsDriverBankDetail)
        );

        msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );

        this.send(msgNavigation);
    };

    btnRedirectHelpSupport = () => {
        const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationContactUsDriverMessage)
        );

        msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );

        this.send(msgNavigation);
    };

    selectStatus = (item: { earningName: string,selectEarning:string,earningShowFilter:string }) => {
        this.setState({
        categorySelectStatus: item.earningName,apiSelectEarningStatus:item.selectEarning,earningDataManageT:item.earningShowFilter
        },()=>{this.updateFirstTimeDate()});
        this.setDateMaxRangeEarning(item.earningName)
    };

    calendarEarningOpen = ()=>{
        this.setState({calendarModalEarning:true})
    }

    calendarEarningClose = ()=>{
        this.setState({calendarModalEarning:false})
    }

    updateDate = (getDate:Date)=>{
        let newDate = new Date(getDate)
        let date = newDate.getDate();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        return year+'-'+month+'-'+date;
    }

    currentDateUpdateEarning = (getDateCurrent:Date)=>{
        return moment(getDateCurrent).format("DD-MM-YYYY");
    }

    updateFirstDate = (getDate:Date)=>{
        return moment(getDate).format("DD MMM");
    }
    updateEndDate = (getDate:Date)=>{
        return moment(getDate).format("DD MMM YYYY");
    }

    updateMonthYear = (getDate:Date)=>{
        return moment(getDate).format("MMM YYYY");
    }

    updateDateString = ()=>{
        if(this.state.categorySelectStatus === 'Daily')
        {
            let dateShow = this.updateEndDate(this.state.startDateEarning)
            this.setState({dateShowTitleManage:dateShow})
        }
        if(this.state.categorySelectStatus === 'Weekly')
        {
            let dateShowStart = this.updateFirstDate(this.state.startDateEarning)
            let dateShowEnd = this.updateEndDate(this.state.endDateEarning)
            this.setState({dateShowTitleManage:dateShowStart+' - '+dateShowEnd})
        }
        if(this.state.categorySelectStatus === 'Monthly')
        {
            let dateShow = this.updateMonthYear(this.state.startDateEarning)
            this.setState({dateShowTitleManage:dateShow})
        }
        this.getDriverEarning()
    }

    updateFirstTimeDate = ()=>{
        let currentDate = new Date()
        if(this.state.categorySelectStatus === 'Daily')
        {
            let dateShow = this.updateEndDate(currentDate)
            this.setState({dateShowTitleManage:dateShow,startDateEarning:currentDate},()=>{this.getDriverEarning()})
        }
        if(this.state.categorySelectStatus === 'Weekly')
        {
            let startDate = moment().subtract(6,'d').format('YYYY-MM-DD');
            // @ts-expect-error component has wrong type support
            let dateShowStart = this.updateFirstDate(startDate)
            let dateShowEnd = this.updateEndDate(currentDate)
            this.setState({dateShowTitleManage:dateShowStart+' - '+dateShowEnd,startDateEarning:new Date(startDate),endDateEarning:currentDate},()=>{this.getDriverEarning()})
        }
        if(this.state.categorySelectStatus === 'Monthly')
        {
            let startDate = moment().startOf('month').format('YYYY-MM-DD');
            // @ts-expect-error component has wrong type support
            let dateShow = this.updateMonthYear(startDate)
            this.setState({dateShowTitleManage:dateShow,startDateEarning:new Date(startDate),endDateEarning:currentDate},()=>{this.getDriverEarning()})
        }
    }

    getDriverEarning = async() => {
        let startDate = this.currentDateUpdateEarning(this.state.startDateEarning);
        let endDate = this.currentDateUpdateEarning(this.state.endDateEarning);
        let token = await getStorageData('token',true)
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverEarningCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverEarningApiCallId+'?type='+this.state.apiSelectEarningStatus+'&start_date='+startDate+'&end_date='+endDate
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

    onDateChangeEarning(date:Date,type:string) {
        let selectedDate = this.updateDate(date);
        let todayDate = this.updateDate(new Date())
        if(type === 'START_DATE')
        {
            if(todayDate === selectedDate)
            {
                this.setState({endDateEarning:date,calendarModalEarning:false},()=>{this.updateDateString()})
            }
            this.setState({
                startDateEarning:date
            },()=>{this.updateDateString()})
        }else{
            this.setState({
                endDateEarning:date,calendarModalEarning:false
            },()=>{this.updateDateString()})
        }
    }

    onDateChangeDailyEarning(date:Date) {
        this.setState({
            startDateEarning:date,calendarModalEarning:false,endDateEarning:date
        },()=>{this.updateDateString()})
    }

    setDateMaxRangeEarning = (filterSelectStatus:string)=>{
        if(filterSelectStatus === 'Weekly')
        {
            this.setState({maxDateRangeNumber:6})
        }
        if(filterSelectStatus === 'Monthly')
        {
            this.setState({maxDateRangeNumber:30})
        }
    }


  // Customizable Area End
}