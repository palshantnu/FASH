import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import moment from "moment";
import 'moment/locale/ar-dz';
import i18n from '../../../components/src/i18n/i18n.config';

export interface EarningProps {
    earningName :string;
    status:boolean;
    selectEarning:string;
    showEarning:string;
    earningShowFilter:string
  }

export interface AnalyticsProps{
    login_time: string;
    total_earning: number;
    deliveries: number;
    earnings_by_date:object;
}

interface AnalyticsChartProps {
    value:number;
    label:string;
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
  token:string;
  loading:boolean;
  startDate:Date;
  filterSelectStatus:string;
  filterArr:EarningProps[];
  calendarModal:boolean;
  endDate:Date;
  maxDateRangeNumber:number;
  dateShowManage:string;
  chartFilterData:AnalyticsChartProps[];
  earningAnalyticsData:AnalyticsProps;
  apiSelectStatus:string;
  earningDataManage:string;
  currencyUpdate:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsDriverEarningController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getDriverAnalyticCallApiId:string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
        token:'',
        loading:false,
        startDate:new Date(),
        filterSelectStatus:'Daily',
        filterArr:[
            {
                earningName:'Daily',
                status:false,
                selectEarning:'daily_earnings',
                showEarning:i18n.t('dailyText'),
                earningShowFilter:i18n.t('dailyEarningsText')
            },
            {
                earningName:'Weekly',
                status:false,
                selectEarning:'weekly_earnings',
                showEarning:i18n.t('weeklyText'),
                earningShowFilter:i18n.t('weeklyEarningsText')
            },
            {
                earningName:'Monthly',
                status:false,
                selectEarning:'monthly_earnings',
                showEarning:i18n.t('monthlyText'),
                earningShowFilter:i18n.t('monthlyEarningsText')
            },
        ],
        calendarModal:false,
        endDate:new Date(),
        maxDateRangeNumber:0,
        dateShowManage:'',
        chartFilterData:[],
        earningAnalyticsData:{
            "login_time": "0 min",
            "total_earning": 0.00,
            "deliveries": 0,
            earnings_by_date:{}
        },
        apiSelectStatus:'daily_earnings',
        earningDataManage:i18n.t('dailyEarningsText'),
        currencyUpdate:''
    };

    // Customizable Area End
    this.onDateChange = this.onDateChange.bind(this);
    this.onDateChangeDaily = this.onDateChangeDaily.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.props.navigation.addListener("willFocus", async() => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({currencyUpdate:currencyGet})
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.getTokenAndValue(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start

  getTokenAndValue = (message:Message)=>{
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
        const driverEarningProps = message.getData(
          getName(MessageEnum.DriverAnalyticsPayloadMessage)
        );
        
        this.setState({filterSelectStatus:driverEarningProps.activeType,startDate:driverEarningProps.startDate,endDate:driverEarningProps.endDate,apiSelectStatus:driverEarningProps.apiSelectEarningStatus},()=>{this.updateDateString()})

        if(i18n.language === 'en')
        {
          moment.locale('en')
        }else{
          moment.locale('ar-dz')
        }
    }
  }

  apiResponseManage = (message:Message) =>
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
        if (apiRequestCallId === this.getDriverAnalyticCallApiId) {
            this.setState({earningAnalyticsData:responseJson,loading:false})
            let dataGet = this.convertChartArr(responseJson.earnings_by_date)
            this.setState({chartFilterData:dataGet})
        }
      
    }else{
        
      this.setState({loading:false,earningAnalyticsData:{
        "login_time": "0 min",
        "total_earning": 0.00,
        "deliveries": 0,
        earnings_by_date:{}  
    },chartFilterData:[]})
      this.parseApiErrorResponse(errorReponse)
    }
  }

    setDateMaxRange = (filterSelectStatus:string)=>{
        if(filterSelectStatus === 'Weekly')
        {
            this.setState({maxDateRangeNumber:6})
        }
        if(filterSelectStatus === 'Monthly')
        {
            this.setState({maxDateRangeNumber:30})
        }
        this.updateDateString()
    }

    onDateChange(date:Date,type:string) {
        let selectedDate = this.updateDate(date);
        let todayDate = this.updateDate(new Date())
        if(type === 'START_DATE')
        {
            if(todayDate === selectedDate)
            {
                this.setState({endDate:date,calendarModal:false})
            }
            this.setState({
                startDate:date
            })
        }else{
            this.setState({
                endDate:date,calendarModal:false
            },()=>{this.updateDateString()})
        }
    }

    onDateChangeDaily(date:Date) {
        this.setState({
            startDate:date,calendarModal:false
        },()=>{this.updateDateString()})
    }

    selectStatus = (item: { earningName: string,selectEarning:string,earningShowFilter:string }) => {
        this.setState({filterSelectStatus: item.earningName,apiSelectStatus:item.selectEarning,earningDataManage:item.earningShowFilter},()=>{this.updateFirstDateAnalytics()});
        this.setDateMaxRange(item.earningName)
    };

    calendarOpen = ()=>{
        this.setState({calendarModal:true})
    }

    calendarClose = ()=>{
        this.setState({calendarModal:false})
    }

    updateDate = (getDate:Date)=>{
        let newDate = new Date(getDate)
        let date = newDate.getDate();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        return year+'-'+month+'-'+date;
    }

    currentDateUpdate = (getDateCurrent:Date)=>{
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
        if(this.state.filterSelectStatus === 'Daily')
        {
            let dateShow = this.updateEndDate(this.state.startDate)
            this.setState({dateShowManage:dateShow})
        }
        if(this.state.filterSelectStatus === 'Weekly')
        {
            let dateShowStart = this.updateFirstDate(this.state.startDate)
            let dateShowEnd = this.updateEndDate(this.state.endDate)
            this.setState({dateShowManage:dateShowStart+' - '+dateShowEnd})
        }
        if(this.state.filterSelectStatus === 'Monthly')
        {
            let dateShow = this.updateMonthYear(this.state.startDate)
            this.setState({dateShowManage:dateShow})
        }
        this.getDriverAnalytics()
    }

    getDriverAnalytics = async() => {
        let token = await getStorageData('token',true)
        let startDate = this.currentDateUpdate(this.state.startDate);
        let endDate = this.currentDateUpdate(this.state.endDate);
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverAnalyticCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverAnalyticsApiCallId+'type='+this.state.apiSelectStatus+'&start_date='+startDate+'&end_date='+endDate
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

    convertChartArr = (anlyticsData:Record<string,number>)=>{
        return Object.entries(anlyticsData).map(([label,value])=>({label:moment(label).format("DD ddd"),value}));
    }

    btnSeeEarningActivity = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationTappaymentDEarningActivity)
        );
    
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );

        this.send(msgNavigation);
    }

    updateFirstDateAnalytics = ()=>{
        let currentDate = new Date()
        if(this.state.filterSelectStatus === 'Daily')
        {
            let dateShow = this.updateEndDate(currentDate)
            this.setState({dateShowManage:dateShow,startDate:currentDate},()=>{this.getDriverAnalytics()})
        }
        if(this.state.filterSelectStatus === 'Weekly')
        {
            let startDate = moment().subtract(6,'d').format('YYYY-MM-DD');
            // @ts-expect-error component has wrong type support
            let dateShowStart = this.updateFirstDate(startDate)
            let dateShowEnd = this.updateEndDate(currentDate)
            this.setState({dateShowManage:dateShowStart+' - '+dateShowEnd,startDate:new Date(startDate),endDate:currentDate},()=>{this.getDriverAnalytics()})
        }
        if(this.state.filterSelectStatus === 'Monthly')
        {
            let startDate = moment().startOf('month').format('YYYY-MM-DD');
            // @ts-expect-error component has wrong type support
            let dateShow = this.updateMonthYear(startDate)
            this.setState({dateShowManage:dateShow,startDate:new Date(startDate),endDate:currentDate},()=>{this.getDriverAnalytics()})
        }
    }

  // Customizable Area End
}
