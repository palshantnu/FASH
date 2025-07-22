import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
import { getStorageData } from "framework/src/Utilities";
import moment from "moment";
import React, {createRef} from "react"
import { lineDataItem } from "react-native-gifted-charts";
import { FlatList,Linking } from "react-native";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
interface FilterArrProps {
  label:string,
  value:string
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

interface ProductArrProps {
    id:string;
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
  donwloadSelectStatus:string;
  calendarModal:boolean;
  endDate:Date;
  maxDateRangeNumber:number;
  dateShowManage:string;
  chartFilterData:AnalyticsChartProps[];
  downloadModal:boolean;
  filterArrDropdown:FilterArrProps[];
  filterSelected:string;
  maxValue:number,
  months:string[],
  month:string[],
  setMonthName:string,
  salesRevenue:string,
  showLesser:boolean,
  lossPercentage:string,
  profitPercentage:string,
  currentIndex:number,
  monthName:number,
  lineData:lineDataItem[],
  lineData2:lineDataItem[],
  currencyLocal:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsSalesGrowthReportSellerController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerGrowthCallApiId=""
  downloadDocumentSalesGrowthApiCallId = ""
  flatListRef:React.RefObject<FlatList>;
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
        maxValue:50,
        setMonthName:"",
        loading:false,
        startDate:new Date(),
        donwloadSelectStatus:'pdf',
        calendarModal:false,
        endDate:new Date(),
        maxDateRangeNumber:0,
        dateShowManage:'',
        chartFilterData:[],
         months :[i18n.t('janShortText'),i18n.t('febShortText'), i18n.t('marShortText'),i18n.t('aprShortText'),i18n.t('mayText'),i18n.t('juneShortText'),i18n.t('julyShortText'),i18n.t('augShortText'),i18n.t('sepShortText'),i18n.t('octShortText'),i18n.t('novShortText'),i18n.t('decShortText')],
         month:["January","February","March","April","May","June","July",
         "August","September","October","November","December"],
        downloadModal:false,
        filterArrDropdown:[
          {label:i18n.t('weeklyText'),value:'Weekly'},
          {label:i18n.t('monthlyText'),value:'Monthly'},
        ],
        monthName:-1,
        filterSelected:'Monthly',
        salesRevenue:"",
        showLesser:false,
        lossPercentage:"0%",
        profitPercentage:"0%",
        currentIndex:1,
        lineData:[],
        lineData2:[],
        currencyLocal:''
    };
    this.flatListRef=createRef()
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    moment.locale(i18n.language)
    this.initilizeCurrentMonth();
    this.getSellerTotalRevenue()
    this.props.navigation.addListener("willFocus", async() => {
      this.initilizeCurrentMonth();
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({currencyLocal:currencyGet})
      this.getSellerTotalRevenue()
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseDataManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start
  apiResponseDataManage = (message:Message) => {
        const apiRequestCallIds = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJsons = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        let errorReponses = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
        )
   
        if (responseJsons.error === undefined) {
        
            if (apiRequestCallIds === this.getSellerGrowthCallApiId) {
              if(this.state.filterSelected.toLocaleLowerCase()==="monthly"){
                this.setScrollMonth()
                  let data= this.convertChartArr(responseJsons.data.total_revenue.current_month)
                  let dataq= this.convertChartArr(responseJsons.data.total_revenue.previous_month)
                 let dataqNew=this.dataSortIinArray(dataq[0])
                 let dataNew=this.dataSortIinArray(data[0])
                  this.setState({loading:false,salesRevenue:responseJsons.data.sales_revenue,showLesser:responseJsons.data.loss,lossPercentage:responseJsons.data.loss_percentage,profitPercentage:responseJsons.data.profit_percentage,lineData:dataNew,lineData2:dataqNew}) 
                  this.getMaxValue()
                }else{
             
              let data= this.convertChartArrNew(responseJsons.data.total_revenue.current_week)
              let dataq= this.convertChartArrNew(responseJsons.data.total_revenue.previous_week)
              this.setState({loading:false,salesRevenue:responseJsons.data.sales_revenue,showLesser:responseJsons.data.loss,lossPercentage:responseJsons.data.loss_percentage,profitPercentage:responseJsons.data.profit_percentage,lineData:data,lineData2:dataq})
              this.getMaxValue()
            }
            }
            if (apiRequestCallIds === this.downloadDocumentSalesGrowthApiCallId) {
              this.setState({loading:false})
              Linking.openURL(responseJsons.url)
            }
        
        }else{
            
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponses)
        }
    }
    dataSortIinArray(data:{label:string,value:number}[]){
      return data.sort((item:{label:string,value:number}, item1:{label:string,value:number}) => parseInt(item.label) < parseInt(item1.label) ? -1 : 1);
    }
    dataSortIinArrayValue(data: lineDataItem[]) {
      return data.sort((item: lineDataItem, item1: lineDataItem) => {
        const v1 = item?.value ?? 0;
        const v2 = item1?.value ?? 0;
        return v1 < v2 ? -1 : 1;
      });
    }
    getMaxValue() {
      let lineData = this.dataSortIinArrayValue(this.state.lineData);
      let lineData2 = this.dataSortIinArrayValue(this.state.lineData2);
    
      const lastValue1 = lineData[lineData.length - 1].value;
      const lastValue2 = lineData2[lineData2.length - 1].value;
      if (lastValue1 && lastValue2) {
        let x = lastValue1;
        if (lastValue1 < lastValue2) {
          x = lastValue2;
        }
        const maxValue = x + 500;
        this.setState({ maxValue });
      }
    }

    initilizeCurrentMonth(){
      let get_month= moment(new Date()).format('M')
      this.setState({currentIndex:parseInt(get_month)-1,monthName:parseInt(get_month)-1})
    }
    setScrollMonth(){
       let get_month= (this.state.monthName + 1) > 0 ? (this.state.monthName + 1).toString() : moment(new Date()).format('M');
      this.flatListRef?.current?.scrollToIndex({
        animated: true,
        index:parseInt(get_month)-1
    });
    this.setState({currentIndex:parseInt(get_month)-1,monthName:parseInt(get_month)-1})
    }
    getSellerTotalRevenue = async() => {
        let token = await getStorageData('token',true)
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getSellerGrowthCallApiId = requestMessage.messageId;
        let endPoint=configJSON.getSellerGrowthApiEndPoint+"filter_range="+this.state.filterSelected.toLocaleLowerCase();
        if(this.state.monthName!=-1 && this.state.filterSelected.toLocaleLowerCase()==="monthly"){
          endPoint= endPoint+"&month="+this.state.setMonthName.toLocaleLowerCase()
        }
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            endPoint
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
  

    downloadModalOpen = ()=>{
        this.setState({downloadModal:true})
    }

    downloadModalClose = ()=>{
        this.setState({downloadModal:false})
    }

    btnConfirmDownload = ()=>{
      this.donwloadSalesGrowthDocument(this.state.donwloadSelectStatus)
      this.downloadModalClose()
    }

    convertChartArr = (anlyticsData:Record<string,number>)=>{
        return Object.entries(anlyticsData).map(([labels,value])=>
          Object.entries(value).map(([label,value])=>({label:label,value:parseFloat(value)}
          )
        ));
    }
    convertChartArrNew = (anlyticsData:Record<string,string>)=>{
      return Object.entries(anlyticsData).map(([label,value])=>
       ({label:label.toString(),value:parseFloat(value)}
       
      ));
  }

    selectDownloadStatus = (donwloadSelectStatus:string)=>{
        this.setState({donwloadSelectStatus:donwloadSelectStatus})
    }

    selectFilterUpdate = (item:string)=>{
      this.setState({filterSelected:item,monthName:-1})
      this.getSellerTotalRevenue()
    }

  
    convertValue(value:string) {
     
      let convert = ["", "K", "M", "B", "T"];
  
    
      let sNum = Math.floor(("" + value).length / 3);
  
      let sVal:number|string = parseFloat(
          (sNum != 0
              ? parseInt(value) / Math.pow(1000, sNum)
              : parseInt(value)
          ).toPrecision(2)
      );
  
      if (sVal % 1 != 0) {
          sVal = sVal.toFixed(2);
      }
  
     
      return PriceConvertValue(sVal + convert[sNum],this.state.currencyLocal);
  }
  nextPress = () => {
    if (this.state.currentIndex < 7) {
      this.flatListRef?.current?.scrollToIndex({
        animated: true,
        index: this.state.currentIndex + 1,
      });
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  };
  
  backPress = () => {
    if (this.state.currentIndex > 0) {
      this.flatListRef?.current?.scrollToIndex({
        animated: true,
        index: this.state.currentIndex - 1,
      });
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  };

setMonthName(value:number){
this.setState({monthName:value,setMonthName:this.state.month[value]})
this.getSellerTotalRevenue()
}

  donwloadSalesGrowthDocument = async(documenType:string)=>{
    this.setState({ loading: true });
    let token = await getStorageData('token',true)
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessageDownload = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.downloadDocumentSalesGrowthApiCallId = requestMessageDownload.messageId;

    if(this.state.filterSelected === 'Monthly')
    {
      requestMessageDownload.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.downloadSalesGrowthApiEndPoint+documenType+'&month='+this.state.setMonthName.toLocaleLowerCase()
      );
    }else{
      requestMessageDownload.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.downloadSalesGrowthApiEndPoint+documenType
      );
    }

    requestMessageDownload.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessageDownload.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessageDownload.id, requestMessageDownload);
  }
  // Customizable Area End
}
