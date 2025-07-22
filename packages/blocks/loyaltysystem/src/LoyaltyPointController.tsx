import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import moment from "moment";
import i18n from '../../../components/src/i18n/i18n.config';
import { getStorageData } from "framework/src/Utilities";
import 'moment/locale/ar-dz';

export interface EarningSellerTra  {
    credited_on: string | null,
    debited_on: null | string,
    id: any,
    loyalty_point_id: number,
    message:string | null,
    order_management_order_id: number,
    order_number: string | null,
    point: number,
    temp_order_id: any,
    transaction_for: string | null,
    transaction_type: string | null
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
  loyaltyArrSeller:EarningSellerTra[];
  filterModal:boolean;
  filterSelectStatus:string;
  filterSelectStatusShow:string;
  beforeConfirmSelectStatus:string;
  languagueIcon:string;
  languageGet:string;
  loyaltyPointstoShow:'',
  filteredData:EarningSellerTra[];
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LoyaltyPointController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerLoyaltyPointsCallApiId:string = "";
  getBuyerLoyaltyTransc:string = ""
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
        loyaltyArrSeller:[],
        filterModal:false,
        filterSelectStatus:'all',
        filterSelectStatusShow:i18n.t('allText'),
        beforeConfirmSelectStatus:'',
        languagueIcon:'',
        languageGet:i18n.language,
        loyaltyPointstoShow:'',
        filteredData:[]
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getBuyerLoyaltyPoints()
    this.getBuyerLoyaltyTransaction()
    this.props.navigation.addListener("willFocus", async() => {
      let currencyIcon = await getStorageData('currencyIcon',true)
      this.setState({languagueIcon:currencyIcon})
      if(this.state.languageGet === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
      this.getBuyerLoyaltyTransaction()
      this.getBuyerLoyaltyPoints()
    });
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            this.apiResponseTransactionManage(message)
        }
        // Customizable Area End
    }

  // Customizable Area Start

    apiResponseTransactionManage = (message:Message) =>
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
          if (apiRequestCallId === this.getBuyerLoyaltyPointsCallApiId) {                        
             let loayltyPoints = responseJson.data.attributes.point_balance
              this.setState({
                loading:false,
                loyaltyPointstoShow:loayltyPoints
              })
          }

          if (apiRequestCallId === this.getBuyerLoyaltyTransc) {                        
            let responseDataSet = responseJson.data                        
               this.setState({
                loyaltyArrSeller:responseDataSet,
                filteredData:responseDataSet,
                loading:false,
               })
          }
        
      }else{
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponse)
      }
    }

    filterModalClose = ()=>{
      this.setState({filterModal:false})
    }

    filterModalOpen = ()=>{
      this.setState({filterModal:true})
    }

    selectFilterStatus = (filterSttus:string,showFilterStatus:string)=>{
      this.setState({
        filterSelectStatus:filterSttus,
        beforeConfirmSelectStatus:showFilterStatus
      })
    }

    btnConfirmFilter = ()=>{
      this.setState({filterSelectStatusShow:this.state.beforeConfirmSelectStatus})
      this.filterModalClose()
      this.filterLoyaltyData(this.state.filterSelectStatus)
    }

    convertDateEarning = (getDate: string | null): string => {
      if (!getDate) {
        return "N/A";
      }
      return moment(getDate).format("MMM DD, YYYY");
    };

    btnRedirectLoyaltyRedeem = ()=>{
    const ViewLoyalty: Message = new Message(getName(MessageEnum.NavigationSearchDataMessage));
    ViewLoyalty.addData(getName(MessageEnum.NavigationScreenMessage), "LoyaltyRedeem");
    ViewLoyalty.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    ViewLoyalty.addData(getName(MessageEnum.NavigationIdDataMassage), { loyaltyPoint: this.state.loyaltyPointstoShow });
    this.send(ViewLoyalty);
  
  }

    getBuyerLoyaltyPoints = async() => {
        let token = await getStorageData('token',true)
        this.setState({loading:true})
        
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getBuyerLoyaltyPointsCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.buyerLoyaltPoint
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

    getBuyerLoyaltyTransaction = async() => {
      let token = await getStorageData('token',true)
      this.setState({loading:true})
      
      const header = {
          "Content-Type": configJSON.validationApiContentType,
          token: token,
      };

      const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getBuyerLoyaltyTransc = requestMessage.messageId;

      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.buyerLoyaltyTransactionApiEndPoint
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

    filterLoyaltyData = (filterSelectStatus: string) => {
      const { loyaltyArrSeller } = this.state;
      let filtered: EarningSellerTra[] = []      
      if (filterSelectStatus === 'all') {
          filtered = loyaltyArrSeller;
      } else if (filterSelectStatus === 'sold') {
          filtered = loyaltyArrSeller.filter((item: any) => item.transaction_type === 'debit');
      } else if (filterSelectStatus === 'refunded') {
          filtered = loyaltyArrSeller.filter((item: any) => item.transaction_type === 'credit');
      }
  
      this.setState({ filteredData: filtered });
  };
  
  // Customizable Area End
}
