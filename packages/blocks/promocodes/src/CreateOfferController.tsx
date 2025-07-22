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
interface ArrayHeader {
  id:number;
  header:string;

}
interface CouponCatalogues{
  "id": number,
  "coupon_code_id": number,
  "catalogue_variant_id": number,
}
interface OfferList {
  "id": number,
  "type": string,
  "attributes": {
      "id": number,
      "code": string,
      "isActive": boolean,
      "discount_type": string,
      "discount": string,
      "valid_from": Date,
      "valid_to": Date,
      "min_cart_value": string,
      "max_cart_value": string,
      "applicable_for": string,
      "discount_cap": string,
      "coupon_catalogues":CouponCatalogues[],
      "coupon_business_informations": []
  }
}

import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
 token:string;
  subHeader:Array<ArrayHeader>;
  selectedHeader:string;
  offerList:OfferList[];
  modalVisible:boolean;
  offer_id:number
  type:string,
  deleteModal:boolean;
  selectedCurrencyIndex: number; // Add this line
  loading: boolean;
  currencyIconS: string;
  localLanguage:string;
  // Customizable Area End
}

interface SS {
  id: number;
}

export default class CreateOfferController extends BlockComponent<Props, S, SS> {
 
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      type:"",
      offer_id:0,
      deleteModal:false,
      modalVisible:false,
      token: '',
      offerList:[],
      subHeader:[{id:1, header:i18n.t("Create offer")}, {id:2, header:i18n.t("Track Offer")}],
      selectedHeader:i18n.t("Create offer"),
      selectedCurrencyIndex: 0, // Initialize it here, 0 for Dollar
      loading: false,
      currencyIconS: '$',
      localLanguage:i18n.language
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("message received ", message);    
    
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (
        getName(MessageEnum.RestAPIResponceMessage) === message.id &&

        apiRequestCallId === this.getOfferListApiCallId &&
        !responseJson.errors
      ) {
        this.setState({offerList:responseJson.data.reverse()})
      }
      
      
      if (
        getName(MessageEnum.RestAPIResponceMessage) === message.id &&

        apiRequestCallId === this.getDeleteOfferApiCallId &&
        !responseJson.errors
      ) {
        
        this.showAlert("Alert", i18n.t("offerDiscountDeletedError"));
        this.getOfferList(this.state.token)
      }else{
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
      
    }
    // Customizable Area End
  }


  async componentDidMount() {
    super.componentDidMount();
   // Customizable Area Start
   this.getData();
   if (this.isPlatformWeb() === false) {
     this.props.navigation.addListener("willFocus", () => {
       this.getData();
     });

  };
  this.renderSelectedCurrency()
       // Customizable Area End
  }
  
  // Customizable Area Start
  
  selectHeader = (item: { id: number; header: string }) => {
    this.setState({ selectedHeader: i18n.t(item.header) });
    if(item.header==="Track Offer"){
      this.getOfferList(this.state.token)
    }
  };
  getOfferListApiCallId:string=""
  getOfferList=async(token:string)=>{
   
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getOfferListApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createApiEndPoint
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
 navigateToCreateNewOffer = (type:string,offer_id?:number)=>{
    const msgss: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    msgss.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'CreateNewOffer' 
    );
    msgss.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    )
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      type: type,offer_id:offer_id
    });
    msgss.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgss);
  }
  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token},()=> this.getOfferList(token) );
  };
  getToken = () => {
    const msgsss: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgsss);
  };

  formatDateOffer = (date: Date) => {
    if (!date) return '';
    const locale = i18n.language === 'ar' ? 'ar' : 'en';
    return moment(date).locale(locale).format('ddd, DD MMM YYYY');
  };
  showModel=(item:OfferList)=>{
    this.setState({modalVisible:true,offer_id:item.attributes.id,type:item.attributes.discount_type==="Store"?'Stores':"Products"})
  }
  editOffer(){
    this.setState({modalVisible:false})
    this.navigateToCreateNewOffer(this.state.type,this.state.offer_id)
  }
  getDeleteOfferApiCallId:string=""
  deleteModal=()=>{
    this.setState({modalVisible:false})
    setTimeout(()=>{
      this.setState({deleteModal:true})
    },100)
    
  }
  deleteOfferItem=async()=>{
    this.setState({deleteModal:false})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getDeleteOfferApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createApiEndPoint+'/'+this.state.offer_id
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }
  getUpdateOfferApiCallId:string=""
  updateOfferStatus=async(offer_id:number)=>{
    let offerData=this.state.offerList;
    let index=offerData.findIndex((item:OfferList)=>item.id===offer_id)
    if(index!=-1){
      offerData[index].attributes.isActive= !offerData[index].attributes.isActive
    }
    this.setState({offerList:offerData})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getUpdateOfferApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createApiEndPoint+'/'+offer_id+"/toggle_active"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updateAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

  }
   renderSelectedCurrency = async() => {
    let currencyIcon = await getStorageData('currencyIcon')
    this.setState ({currencyIconS:currencyIcon.replace(/(^"|"$)/g, '')})
  };
  // Customizable Area End
}
