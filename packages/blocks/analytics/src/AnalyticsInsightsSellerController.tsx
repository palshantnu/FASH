import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData,removeStorageData } from "framework/src/Utilities";
import { setStorageData } from "../../../framework/src/Utilities";
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
  totalRevenue:string;
  roleType:string;
  getCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsInsightsSellerController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSelleeTotalRevenueCallApiId:string = "";
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
        totalRevenue:'0.0',
        roleType:'',
        getCurrency:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getSellerTotalRevenue()
    this.props.navigation.addListener("willFocus", async() => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({getCurrency:currencyGet})
        this.getSellerTotalRevenue();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start

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
            if (apiRequestCallId === this.getSelleeTotalRevenueCallApiId) {
                this.setState({totalRevenue:responseJson.data.total_revenue,loading:false})
            }
        
        }else{
            
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponse)
        }
    }

    getSellerTotalRevenue = async() => {
      removeStorageData('AnalyticsStoreDetail')
      removeStorageData('AnalyticsProductDetail')
        let token = await getStorageData('token',true)
        let roleType = await getStorageData('FA_LOGIN_MODE')
        this.setState({loading:true,roleType:roleType})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getSelleeTotalRevenueCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getSellerTotalRevenueApiEndPoint
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
    btnRedirectSalesGrowthReport=()=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationAnalyticsSalesGrowthReportSeller)
    );
    msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
    );
    this.send(msgNavigation);
    }
    btnRedirectSalesRevenue = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationAnalyticsSalesRevenueSeller)
        );
    
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );

        this.send(msgNavigation);
    }

    btnSalesVolumeStore = (reportType:string)=>{
      setStorageData('reportType',JSON.stringify(reportType))
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationAnalyticsSalesVolume)
      );
      msgNavigation.addData(
          getName(MessageEnum.NavigationPropsMessage),
          this.props
      );
      this.send(msgNavigation);
    }

  // Customizable Area End
}
