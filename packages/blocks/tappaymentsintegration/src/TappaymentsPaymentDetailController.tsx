import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import moment from "moment";
import 'moment/locale/ar-dz';
import { BuyerPaymentResponseProps } from "./types/types";
import { getStorageData } from "framework/src/Utilities";
import { Linking } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config';
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
  loading:boolean;
  paymentDetailData:BuyerPaymentResponseProps;
  localCurrencyIcon:string;
  localLanguageGet:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentsPaymentDetailController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerAllPaymentApiCallId = "";
  getBuyerPaymentDeleteApiCallId="";
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
        loading:false,
        paymentDetailData:{
            id:'',
            status: '',
            charge_id: '',
            merchant_id: '',
            order_id: '',
            amount: 0,
            currency: '',
            customer_id: '',
            order_management_order_id: 0,
            refund_id: '',
            refund_amount: '',
            last_four_card_digit: '',
            payment_type: '',
            deleted: false,
            created_at:'',
            url:''
        },
        localCurrencyIcon:'',
        localLanguageGet:i18n.language
    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
        const paymentDetail = message.getData(
            getName(MessageEnum.paymentDetailPayloadMessage)
        );
        this.setState({paymentDetailData:paymentDetail})
    }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.props.navigation.addListener("willFocus", async() => {
          let currencyIcon = await getStorageData('currencyIcon',true)
          this.setState({localCurrencyIcon:currencyIcon})
          if(this.state.localLanguageGet === 'en')
          {
            moment.locale('en')
          }else{
            moment.locale('ar-dz')
          }
        });
        // Customizable Area End
    }

    timeFormatChange = (time:string) => {
        let timeUpdate = moment(time).format("hh:ss A");
        return timeUpdate
    }

    dateFormatChange = (date:string) => {
      let dateUpdate = moment(date).format("DD MMM YYYY");
      return dateUpdate
    }

    downloadPdf = ()=>{
        Linking.openURL(this.state.paymentDetailData.url)
    }
  // Customizable Area End
}
