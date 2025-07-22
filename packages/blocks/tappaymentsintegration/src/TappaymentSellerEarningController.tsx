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

interface TransactionsProps {
  "id":string;
  "amount": string;
  "status": string;
  "created_at": Date;
  "order_number": string;
}

interface CatalogueProps {
  name:string;
}

interface OrderItemsProps {
  catalogue:CatalogueProps
}

export interface EarningSellerProps {
  id: string;
  account_id: number;
  amount: string;
  driver_order_id: null;
  status: string;
  created_at: Date;
  updated_at: string;
  seller_order_id: number;
  order_number: string;
  catalogue_name: null;
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
  earningArrSeller:EarningSellerProps[];
  filterModal:boolean;
  filterSelectStatus:string;
  filterSelectStatusShow:string;
  beforeConfirmSelectStatus:string;
  languagueIcon:string;
  languageGet:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentSellerEarningController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerEarningCallApiId:string = "";
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
        earningArrSeller:[],
        filterModal:false,
        filterSelectStatus:'all',
        filterSelectStatusShow:i18n.t('allText'),
        beforeConfirmSelectStatus:i18n.t('allText'),
        languagueIcon:'',
        languageGet:i18n.language
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getSellerEarning()
    this.props.navigation.addListener("willFocus", async() => {
      let currencyIcon = await getStorageData('currencyIcon',true)
      this.setState({languagueIcon:currencyIcon})
      if(this.state.languageGet === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
      this.getSellerEarning()
    });
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
          this.apiResponseSellerEarning(message)
        }
        // Customizable Area End
    }

  // Customizable Area Start

  apiResponseSellerEarning = (message:Message) =>
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
          if (apiRequestCallId === this.getSellerEarningCallApiId) {
              this.setState({earningArrSeller:responseJson.earning_details,loading:false})
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
      this.setState({filterSelectStatus:filterSttus,beforeConfirmSelectStatus:showFilterStatus})
    }

    btnConfirmFilter = ()=>{
      this.setState({filterSelectStatusShow:this.state.beforeConfirmSelectStatus})
      this.getSellerEarning()
      this.filterModalClose()
    }

    getSellerEarning = async() => {
      let token = await getStorageData('token',true)
      this.setState({loading:true,token:token})
      const header = {
          "Content-Type": configJSON.validationApiContentType,
          token: token,
      };
      const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getSellerEarningCallApiId = requestMessage.messageId;

      requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.getSellerEarningApiCallId+'?type='+this.state.filterSelectStatus
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

    convertDateEarning = (getDate:Date)=>{
      return moment(getDate).format("MMM DD, YYYY");
    }

    capitalizeFirstLetter=(value:string)=> {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  // Customizable Area End
}
