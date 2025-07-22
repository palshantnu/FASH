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
import { SalesVolumeData } from "./responseStore";
import React, {createRef} from "react";
import moment from "moment";
import { FlatList, Linking } from "react-native";

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
    color:string;
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
  salesVolumeAnalyticsData:SalesVolumeData;
  analyticsType:string;
  downloadModal:boolean;
  storeProductText:string;
  filterArrDropdown:FilterArrProps[];
  filterSelectedPie:string;
  selectedId:string;
  selectedName:string;
  chartPieFilterData:AnalyticsChartProps[];
  currentIndex:number;
  monthName:number;
  months:string[],
  month:string[],
  setMonthName:string,
  startDate:Date;
  showData:boolean;
  currencyLocalIcon:string
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsSalesVolumeController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerSalesVolumeApiCallId = "";
  downloadDocumentSalesVolumeApiCallId = "";
  flatListRefPie:React.RefObject<FlatList>;
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
        salesVolumeAnalyticsData:{
            filter_range: "",
            total_sold_units: 0,
            sold_units:0,
            returned_units: 0,
            products:{
                name: '',
                sold_units: 0,
                returned_units: 0,
                price: '0',
                image_url: null,
            }
        },
        analyticsType:'store',
        downloadModal:false,
        storeProductText:i18n.t('allStoresText'),
        filterArrDropdown:[
          {label:i18n.t('weeklyText'),value:'weekly'},
          {label:i18n.t('monthlyText'),value:'monthly'}
        ],
        filterSelectedPie:'monthly',
        selectedId:'',
        selectedName:'',
        chartPieFilterData:[],
        currentIndex:1,
        monthName:-1,
        months :[i18n.t('janShortText'), i18n.t('febShortText'), i18n.t('marShortText'), i18n.t('aprShortText'), i18n.t('mayText'), i18n.t('juneShortText'), i18n.t('julyShortText'),i18n.t('augShortText'), i18n.t('sepShortText'), i18n.t('octShortText'), i18n.t('novShortText'), i18n.t('decShortText')],
        month:["January","February","March","April","May","June","July",
         "August","September","October","November","December"],
        setMonthName:moment(new Date()).format('MMMM'),
        startDate:new Date(),
        showData:false,
        currencyLocalIcon:''
    };
    this.flatListRefPie=createRef()
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    moment.locale(i18n.language)
    this.initilizeCurrentMonth();
    this.getLocalData()
    this.props.navigation.addListener("willFocus", async() => {
      let currencyIcon = await getStorageData('currencyIcon',true)
      this.setState({currencyLocalIcon:currencyIcon})
      this.getLocalData()
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleApiResponses(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleApiResponses = (message : Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.getSellerSalesVolumeApiCallId) {
        this.successResponseDataPie(message)
      }
      if(apiRequestCallId === this.downloadDocumentSalesVolumeApiCallId)
      {
          this.setState({loading:false})
          Linking.openURL(responseJson.url)
      }
    }
  }

  successResponseDataPie = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (responseJson.data) {
      if (this.state.filterSelectedPie === 'monthly') {
        this.setScrollMonth()
      }

      this.setState({ salesVolumeAnalyticsData: responseJson.data })
      if (responseJson.data.total_sold_units != 0) {
        let dataGet = this.convertObjectChart(responseJson.data)
        this.setState({ chartPieFilterData: dataGet, loading: false })
      } else {
        this.setState({ chartPieFilterData: [], loading: false })
      }
    }
  }

  downloadModalOpen = () => {
    this.setState({ downloadModal: true })
  }

  downloadModalClose = () => {
    this.setState({ downloadModal: false })
  }

  btnConfirmDownload = () => {
    this.donwloadDocument(this.state.donwloadSelectStatus)
    this.downloadModalClose()
  }

  convertObjectChart = (anlyticsData: SalesVolumeData) => {
    let tempData = []
    for (const [key, value_get] of Object.entries(anlyticsData)) {
      if (key === 'sold_units' || key === "returned_units") {
        tempData.push({ label: key, value: value_get, color: this.setPieColor(key) })
      }
    }

    return tempData;
  }

  selectDownloadStatus = (donwloadSelectStatus: string) => {
    this.setState({ donwloadSelectStatus: donwloadSelectStatus })
  }

  selectFilterUpdate = (item: string) => {
    this.setState({ filterSelectedPie: item }, () => {
      if (item === 'monthly') {
        this.setState({ monthName: -1, setMonthName: moment(new Date()).format('MMMM') })
      }
      this.getSellerSalesVolume()
    })
  }

  btnRedirectSelectStore = () => {
    if (this.state.analyticsType === 'store') {
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationAnalyticsSelectStore)
      );

      msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );

      this.send(msgNavigation);
    } else {
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

    getLocalData = async()=>{
        let reportType = await getStorageData('reportType',true)
        this.setState({analyticsType:reportType})
        if(reportType === 'store')
        {
            let storeDetail = await getStorageData('AnalyticsStoreDetail',true);
            if(storeDetail != null)
            {
                this.setState({selectedId:storeDetail.selectedId,selectedName:storeDetail.SelectedName,storeProductText:storeDetail.SelectedName,showData:true},()=>{this.getSellerSalesVolume()})
            }else{
                this.setState({storeProductText:i18n.t('allStoresText'),selectedId:'',selectedName:'',showData:true})
                this.getSellerSalesVolume()
            }
        }else{
            let productDetail = await getStorageData('AnalyticsProductDetail',true);
            if(productDetail != null)
            {
                this.setState({selectedId:productDetail.productSelectedId,selectedName:productDetail.productSelectedName,storeProductText:productDetail.productSelectedName,showData:true},()=>{this.getSellerSalesVolume()})
            }else{
                this.setState({storeProductText:i18n.t('selectProductText'),selectedId:'',selectedName:'',chartPieFilterData:[],showData:false})
            }
        }
    }

    getSellerSalesVolume = async() => {
      this.setState({ loading: true });
      let token = await getStorageData('token',true)
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getSellerSalesVolumeApiCallId = requestMessage.messageId;
      if(this.state.analyticsType === 'store')
      {
        if(this.state.selectedId === '')
        {
          // calling this 
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getSalesVolumeReportApiEndPoint+this.state.filterSelectedPie+'&month='+this.state.setMonthName.toLowerCase()
          );
        }else{
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getSalesVolumeReportApiEndPoint+this.state.filterSelectedPie+'&month='+this.state.setMonthName.toLowerCase()+'&id='+this.state.selectedId
          );
        }
      }else{
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getSalesVolumeReportProductApiEndPoint+'/'+this.state.selectedId+'?filter_range='+this.state.filterSelectedPie+'&month='+this.state.setMonthName
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

    nextPress = () => {
      if (this.state.currentIndex < 7 ) {
        this.flatListRefPie.current?.scrollToIndex({
          animated: true,
          index: this.state.currentIndex + 1,
        });
        this.setState({ currentIndex: this.state.currentIndex + 1 });
      }
    };

    backPress = () => {
      if (this.state.currentIndex > 0) {
        this.flatListRefPie.current?.scrollToIndex({
          animated: true,
          index: this.state.currentIndex - 1,
        });
        this.setState({ currentIndex: this.state.currentIndex - 1 });
      }
    };

    setMonthName=(value:number)=>{
        this.setState({monthName:value,setMonthName:this.state.month[value]},()=>{this.getSellerSalesVolume()})
    }

      initilizeCurrentMonth(){
          let get_month= moment(new Date()).format('M')
          this.setState({currentIndex:parseInt(get_month)-1,monthName:parseInt(get_month)-1})
        }

    setScrollMonth(){
          let get_month= (this.state.monthName + 1) > 0 ? (this.state.monthName + 1).toString() : moment(new Date()).format('M');
          this.flatListRefPie.current?.scrollToIndex({
            animated: true,
            index:parseInt(get_month)-1
        });
        this.setState({currentIndex:parseInt(get_month)-1,monthName:parseInt(get_month)-1})
        }

    setPieColor = (label:string)=>{
        if(label === 'sold_units')
        {
            return '#375280';
        }else{
            return '#F59E0B';
        }
    }

    donwloadDocument = async(documenType:string)=>{
        this.setState({ loading: true });
        let token = await getStorageData('token',true)
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
  
        this.downloadDocumentSalesVolumeApiCallId = requestMessage.messageId;

        if(this.state.analyticsType === 'store')
        {
            if(this.state.selectedId === '')
            {
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                configJSON.downloadSalesVolumeStoreApiEndPoint+documenType
            );
            }else{
            requestMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                configJSON.downloadSalesVolumeStoreApiEndPoint+documenType+'&id='+this.state.selectedId
            );
            }
        }else{
            requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.downloadSalesVolumeProductApiEndPoint+this.state.selectedId+'?type='+documenType
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
    }

  // Customizable Area End
}
