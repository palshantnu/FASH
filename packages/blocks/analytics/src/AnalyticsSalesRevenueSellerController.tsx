import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { SalesRevenueData } from "./responseStore";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { Linking } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config';
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
    frontColor:string;
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
  donwloadSelectStatus:string;
  salesRevenueAnalyticsData:SalesRevenueData;
  apiSelectStatus:string;
  analyticsType:string;
  downloadModal:boolean;
  firstCard:string;
  secondCard:string;
  storeProductText:string;
  filterArrDropdown:FilterArrProps[];
  filterSelected:string;
  selectedId:string;
  selectedName:string;
  chartFilterData:AnalyticsChartProps[];
  selectedChartBar:string;
  roleTypeManage:string;
  currencyLocalGet:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsSalesRevenueSellerController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerSalesRevenueApiCallId = "";
  downloadDocumentSalesRevenueApiCallId = "";
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
        donwloadSelectStatus:'pdf',
        salesRevenueAnalyticsData:{
            filter_range: "",
            average_order_value: '0',
            average_unit_price:'0',
            sales_volume: '0',
            max_value:'0',
            graph_data:{
              total_revenue:{}
            },
            sold_units: 0,
            returned_units: 0,
            price: '0',
            image_url: null,
            name: '',
        },
        apiSelectStatus:'daily_earnings',
        analyticsType:'store',
        downloadModal:false,
        firstCard:i18n.t('averageOrderValueText'),
        secondCard:i18n.t('salesVolumeText'),
        storeProductText:i18n.t('allStoresText'),
        filterArrDropdown:[
          {label:i18n.t('weeklyText'),value:'weekly'},
          {label:i18n.t('monthlyText'),value:'monthly'}
        ],
        filterSelected:'monthly',
        selectedId:'',
        selectedName:'',
        chartFilterData:[],
        selectedChartBar:'',
        roleTypeManage:'',
        currencyLocalGet:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getLocalData()
    this.props.navigation.addListener("willFocus", async() => {
      let currencyGetLocal = await getStorageData('currencyIcon',true)
      this.setState({currencyLocalGet:currencyGetLocal})
      this.getLocalData()
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.getSellerSalesRevenueApiCallId) {
          this.successResponseData(message)
        }
        if (apiRequestCallId === this.downloadDocumentSalesRevenueApiCallId) {
          this.setState({loading:false})
          Linking.openURL(responseJson.url)
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  successResponseData = (message:Message)=>{
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (responseJson.errors === undefined) {
      if(responseJson.data.name === undefined)
      {
        responseJson.data.average_unit_price = 0
      }else{
        responseJson.data.average_order_value = 0
      }
      this.setState({salesRevenueAnalyticsData:responseJson.data})
      let dataGet = this.convertMonthChartArr(responseJson.data.graph_data.total_revenue)
      this.setState({chartFilterData:dataGet,loading:false})
    }
  }

    setCardText = (analyticsType:string)=>{
        if(analyticsType === 'store')
        {
            this.setState({firstCard:i18n.t('averageOrderValueText'),secondCard:i18n.t('salesVolumeText')})

        }else{
            if(this.state.salesRevenueAnalyticsData.name === undefined)
            {
              this.state.salesRevenueAnalyticsData.sales_volume = '0'
              this.setState({chartFilterData:[]})
            }
            this.setState({firstCard:i18n.t('averageUnitPriceText'),secondCard:i18n.t('salesVolumeText')})
        }

        this.getLocalData()
    }

    downloadModalOpen = ()=>{
        this.setState({downloadModal:true})
    }

    downloadModalClose = ()=>{
        this.setState({downloadModal:false})
    }

    btnConfirmDownload = ()=>{
      this.donwloadSalesDocument(this.state.donwloadSelectStatus)
      this.downloadModalClose()
    }

    convertMonthChartArr = (anlyticsData:Record<string,number>)=>{
      return Object.entries(anlyticsData).map(([label,value])=>({label:label,value,frontColor:'rgba(55, 82, 128, 0.15)'}));
    }

    activeAnalytics = (analyticsType:string)=>{
        this.setState({analyticsType:analyticsType},()=>{this.setCardText(analyticsType);})
    }

    selectDownloadStatus = (donwloadSelectStatus:string)=>{
        this.setState({donwloadSelectStatus:donwloadSelectStatus})
    }

    selectFilterUpdate = (item:string)=>{
      this.setState({filterSelected:item},()=>{this.getSellerSalesRevenue()})
    }

    btnRedirectSelectStore = ()=>{
      if(this.state.analyticsType === 'store')
      {
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationAnalyticsSelectStore)
        );
    
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );
  
        this.send(msgNavigation);
      }else{
        const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationAnalyticsSelectProduct)
        );
    
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );

        this.send(msgNavigation);
      }
    }

    // istanbul ignore next
    getLocalData = async()=>{
      let roleType = await getStorageData('FA_LOGIN_MODE')
      this.setState({roleTypeManage:roleType})
      if(roleType === 'Stylist')
      {
        this.setState({analyticsType:'product'})
      }
      if(this.state.analyticsType === 'store')
      {
        let storeDetail = await getStorageData('AnalyticsStoreDetail',true);
        if(storeDetail != null && storeDetail.SelectedName !=='')
        {
          this.setState({selectedId:storeDetail.selectedId,selectedName:storeDetail.SelectedName,storeProductText:storeDetail.SelectedName},()=>{this.getSellerSalesRevenue()})
        }else{
          this.setState({storeProductText:i18n.t('allStoresText'),selectedId:'',selectedName:''})
          this.getSellerSalesRevenue()
        }
      }else{
        let productDetail = await getStorageData('AnalyticsProductDetail',true);
        if(productDetail != null && productDetail.productSelectedName!=='')
        {
          this.setState({selectedId:productDetail.productSelectedId,selectedName:productDetail.productSelectedName,storeProductText:productDetail.productSelectedName},()=>{this.getSellerSalesRevenue()})
        }else{
          this.setState({storeProductText:i18n.t('selectProductText'),selectedId:'',selectedName:''})
        }
      }
    }

    getSellerSalesRevenue = async() => {
      this.setState({ loading: true });
      let token = await getStorageData('token',true)
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getSellerSalesRevenueApiCallId = requestMessage.messageId;

      if(this.state.analyticsType === 'store')
      {
        if(this.state.selectedId === '')
        {
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getSellerSalesRevenueStoreApiEndPoint+'/get_sales_revenue_report?filter_range='+this.state.filterSelected
          );
        }else{
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getSellerSalesRevenueStoreApiEndPoint+'/get_sales_revenue_report?filter_range='+this.state.filterSelected+'&id='+this.state.selectedId
          );
        }
      }else{
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getSellerSalesRevenueProductApiEndPoint+'/'+this.state.selectedId+'?filter_range='+this.state.filterSelected
        );
      }
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.validationApiMethodType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    };

    barClick = (data:AnalyticsChartProps)=>{
      let tempData = []
      for (const [_key, value_get] of Object.entries(this.state.chartFilterData)) {
        if(value_get.label != data.label)
        {
          tempData.push({ label: value_get.label, value: value_get.value,frontColor:'rgba(55, 82, 128, 0.15)' })
        }else{
          tempData.push({ label: value_get.label, value: value_get.value,frontColor:'rgba(55, 82, 128, 1)' })
        }
      }
      this.setState({chartFilterData:tempData})
    }

    donwloadSalesDocument = async(documenType:string)=>{
      this.setState({ loading: true });
      let token = await getStorageData('token',true)
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessageDownload = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.downloadDocumentSalesRevenueApiCallId = requestMessageDownload.messageId;

    if(this.state.analyticsType === 'store')
    {
      if(this.state.selectedId === '')
      {
        requestMessageDownload.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.downloadSalesRevenueTotalApiEndPoint+documenType
        );
      }else{
        requestMessageDownload.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.downloadSalesVolumeStoreApiEndPoint+documenType+'&id='+this.state.selectedId
        );
      }
    }else{
      requestMessageDownload.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.downloadSalesRevenueProductApiEndPoint+this.state.selectedId+'?type='+documenType
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
          sVal = sVal.toFixed(1);
      }

      return PriceConvertValue(sVal + convert[sNum],this.state.currencyLocalGet);
  }

  // Customizable Area End
}
