import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import i18n from '../../../components/src/i18n/i18n.config';
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import { Linking } from "react-native";
import 'moment/locale/ar-dz';
import { BuyerPaymentResponseProps } from "./types/types";
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
  allPaymentHistoryArr:BuyerPaymentResponseProps[];
  allPaymentHistoryArrUpdate:BuyerPaymentResponseProps[];
  token: string;
  loading:boolean;
  orderSearchTxt:string;
  deletePaymentModal:boolean;
  paymentId:string;
  localLanguageGet:string;
  languageCheck:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentsBuyerHistoryController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerAllPaymentApiCallId = "";
  buyerPaymentDeleteApiCallId="";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.NavigationPayLoadMessage),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
        allPaymentHistoryArr:[],
        allPaymentHistoryArrUpdate:[],
        token: "",
        loading:false,
        orderSearchTxt:'',
        deletePaymentModal:false,
        paymentId:'0',
        localLanguageGet:'',
        languageCheck:i18n.language
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.handleAllOrderApiResponses(message);
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.props.navigation.addListener("willFocus", async() => {
          let currencyIcon = await getStorageData('currencyIcon',true)
          this.setState({localLanguageGet:currencyIcon})
          if(this.state.languageCheck === 'en')
          {
            moment.locale('en')
          }else{
            moment.locale('ar-dz')
          }
          this.getBuyerAllPayment();
        });
        // Customizable Area End
    }

    checkSpecialCharacter = (value: string) => {
        let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
        if (!regexSp.test(value)) {
          this.setState({ orderSearchTxt: value.trimStart() });
        }
    }

    paymentDetailRedirect = (paymentDetail:BuyerPaymentResponseProps)=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationTappaymentsPaymentDetail)
        );

        msgNavigation.addData(getName(MessageEnum.paymentDetailPayloadMessage), paymentDetail);
    
        msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );
    
        this.send(msgNavigation);
    }
  
    getBuyerAllPayment = async() => {
      let token = await getStorageData('token',true)
        this.setState({loading:true,token:token})
        const header = {
            "Content-Type": configJSON.apiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
  
        this.getBuyerAllPaymentApiCallId = requestMessage.messageId;
  
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.buyerPaymentHistoryApiEndPoint
        );
  
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.getApiMethod
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    handleAllOrderApiResponses = (message: Message) => {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson) {
        if (apiRequestCallId === this.getBuyerAllPaymentApiCallId) {
          if(responseJson.errors === undefined)
          {
              this.setState({allPaymentHistoryArr:responseJson,allPaymentHistoryArrUpdate:responseJson,loading:false})
          }else{
            this.setState({loading:false})
          }
        }
        if(apiRequestCallId === this.buyerPaymentDeleteApiCallId)
        {
            this.setState({loading:false})
            this.getBuyerAllPayment()
            showMessage({
                message: i18n.t('paymentHistoryDeleteSuccessText'),
                position: { top: 0 },
            });

        }
      }
    }

    dateFormatChangeOrder = (date:string) => {
      let dateUpdate = moment(date).format("DD MMM YYYY hh:ss A");
      return dateUpdate
    }

    searchBuyerOrder = ()=>{
      let text = this.state.orderSearchTxt.trimEnd();
      let data1 = this.state.allPaymentHistoryArrUpdate;
      if (data1 != undefined) {
        const newData = data1.filter((item) => {
          //applying filter for the inserted text in search bar
          const itemData = item.order_id
            ? item.order_id.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length > 0) {
          this.setState({
            allPaymentHistoryArr: newData,
          });
        } else {
          this.setState({
            allPaymentHistoryArr: [],
          });
        }
      }
    }

    deleteModalOpen = (paymentId:string)=>{
        this.setState({ deletePaymentModal: true,paymentId:paymentId });
    }

    deleteModalClose = ()=>{
        this.setState({ deletePaymentModal: false });
    }

    deletepaymentConfirm = async()=>{
        this.setState({loading:true,deletePaymentModal:false})
        let tokenGet = await getStorageData('token',true)
          const header = {
              "Content-Type": configJSON.apiContentType,
              token: tokenGet,
          };
          const requestMessage = new Message(
              getName(MessageEnum.RestAPIRequestMessage)
          );
    
          this.buyerPaymentDeleteApiCallId = requestMessage.messageId;
    
          requestMessage.addData(
              getName(MessageEnum.RestAPIResponceEndPointMessage),
              configJSON.buyerPaymentHistoryApiEndPoint+'/'+this.state.paymentId
          );
    
          requestMessage.addData(
              getName(MessageEnum.RestAPIRequestHeaderMessage),
              JSON.stringify(header)
          );
          requestMessage.addData(
              getName(MessageEnum.RestAPIRequestMethodMessage),
              configJSON.httpDeleteApiMethodType
          );
          runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    downloadReceipt = (pdfUrl:string)=>{
        Linking.openURL(pdfUrl)
    }
  // Customizable Area End
}
