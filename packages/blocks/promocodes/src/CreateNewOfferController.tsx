import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


// Customizable Area Start
import moment from "moment";
import { getStorageData } from "../../../framework/src/Utilities";
import 'moment/locale/ar'; // Import Arabic locale
import i18n from '../../../components/src/i18n/i18n.config';
export interface ProductList{
  product:string,sku:string,selectStatus:boolean,id:number
}
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectVerientIds:number[],
  errorMsgPromocode:boolean,
  isSelectAll:boolean,
  discountPercent: string;
  productModel:boolean,
  maxCap: string
  createPromocode: string;
  startDate: string;
  campaingStartDate: Date;
  campaingStartDateModalVisible: boolean
  isDatePickerVisible: boolean;
  selectedDate: Date;
  selectedDate1: Date;
  selectFromDate: boolean;
  selectToDate: boolean;
  termsAccepted: boolean;
  minOrderValue: string
  respArray: string;
  isStartDatePickerVisible: boolean,
  isEndDatePickerVisible: boolean,
  allUsersText: string;
token:string
  promoCodeErrorMsg: string;
  errorMsg: boolean
  selectUserType:boolean
  type:string
  productList:ProductList[] ;
  errorMsgProduct:boolean,
  errorMsgDiscountPercent:boolean,
  errorMsgToDate:boolean,
  errorMsgMaxCap:boolean,
  errorMsgMinOrderValue:boolean,
  errorMsgStartDate:boolean,
  offer_id:number,
  startDateErrorMsg:string,
  endDateErrorMsg:string,
  loading:boolean,
  htmlCode:string,
  termsShow:boolean,
  currencyIconSS: string;
  scrollViewRef: ScrollView | null;
  // Customizable Area End
}

interface SS {
   // Customizable Area Start
 id: number;
  // Customizable Area End
  
}

export default class CreateNewOfferController extends BlockComponent<Props, S, SS> {

 // Customizable Area Start
 createApiCallId: string ="";
 getProductListApiCallId: string ="";
 getOfferDetailsApiCallId: string ="";
 termsConditoinId: string ="";
  // Customizable Area End 

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      loading:false,
      termsShow:false,
      selectVerientIds:[],
      isSelectAll:false,
      productList:[],
      errorMsgPromocode:false,
      errorMsgProduct:false,
      errorMsgDiscountPercent:false,
      errorMsgToDate:false,
      errorMsgMinOrderValue:false,
      errorMsgStartDate:false,
      errorMsgMaxCap:false,
      startDateErrorMsg:"",
      endDateErrorMsg:"",
   token:"",
   selectFromDate: false,
   selectUserType:false,
  selectToDate: false,
  productModel:false,
      discountPercent: '',
      maxCap: '',
      campaingStartDate: new Date(),
      campaingStartDateModalVisible: false,
      startDate: '',
      isDatePickerVisible: false,
      selectedDate: new Date(),
      termsAccepted: false,
      createPromocode: '',
      minOrderValue: '',
      respArray: '',
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      allUsersText: i18n.t('All Users'),
      selectedDate1: new Date(),
      promoCodeErrorMsg: '',
      errorMsg: false,
      type:'',
      offer_id:0,
      htmlCode:"",
      currencyIconSS: '$',
      scrollViewRef: null,
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

   // Customizable Area Start
  async componentDidMount() {
   super.componentDidMount();
    this.getData();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getData();
      });
   }
   this.renderSelectedCurrencyy()
    // Customizable Area End
  }

  // Customizable Area Start
  getData = async () => {
    const token = await getStorageData("token", true);    
    this.setState({ token:token });
  };

 // Customizable Area End

 // Customizable Area Start
  async receive(from: string, message: Message) {
    
   runEngine.debugLog("Message Recived", message);

    
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      let data = message.getData(getName(MessageEnum.SessionResponseData));
      this.setDataInOffer( data.type,data.offer_id)
    }
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
 
    if (message.id === getName(MessageEnum.RestAPIResponceMessage) && !responseJson.errors) {
      
      if (apiRequestCallId === this.createApiCallId ) {        
        this.setState({ respArray: responseJson })
        this.showSuccessMessage()
      }
      
      if(  apiRequestCallId === this.getProductListApiCallId ){
        this.setProductItem(responseJson.data)
      }
      if(  apiRequestCallId === this.getOfferDetailsApiCallId ){
        this.setOfferDetails(responseJson.data)
      }
      if(  apiRequestCallId === this.termsConditoinId ){
          this.setState({
            loading: false,
            termsShow:true
          });
          this.setState({ htmlCode: responseJson?.description })
        }
    }else{
      this.setState({
        loading: false,
       });
        this.showErrorMessage(responseJson) 
    }
    }
    // Customizable Area End
  

  // Customizable Area Start

  setScrollViewRef = (ref: any) => {
    this.setState({ scrollViewRef: ref });
  };

  scrollToTop = (value: number) => {
    const { scrollViewRef } = this.state;
    if (scrollViewRef) {
      scrollViewRef.scrollTo({ y: value});
    }
  };

  showSuccessMessage(){
    showMessage({
      message: this.state.offer_id!=0?i18n.t('Offer updated successfully'): i18n.t('Offer created successfully'),
      type: "success",
      position: { top: 8 },
    });
      this.props.navigation.goBack()
  }
  setOfferDetails=(responseJson:{
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
        "coupon_catalogues":{
          "id": number,
          "coupon_code_id": number,
          "catalogue_variant_id": number,
        }[],
        "coupon_business_informations": []
    }
  })=>{
this.setState({minOrderValue:parseInt(responseJson.attributes.min_cart_value).toString(),discountPercent:parseInt(responseJson.attributes.discount).toString(),maxCap:parseInt(responseJson.attributes.discount_cap).toString(),selectUserType:responseJson.attributes.applicable_for==="all_users"?true:false,createPromocode:responseJson.attributes.code,selectFromDate:true,selectToDate:true,selectedDate:responseJson.attributes.valid_from,selectedDate1:responseJson.attributes.valid_to})
  if(responseJson.attributes.discount_type!="Store"){
    let data=[]
    for (let value of responseJson.attributes.coupon_catalogues) {
     
      data.push(value.catalogue_variant_id);
    
      }
  this.setState({selectVerientIds:data})
  }
}
  setDataInOffer(type:string,offer_id:number){    
    this.setState({ type: type});
    if(offer_id!=undefined){
      this.setState({ offer_id:offer_id });
      this.getOfferDetails()
    }
    if(type==='Products'){
     this.getProductList()
    }
  }
    hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false,isStartDatePickerVisible:false,isEndDatePickerVisible:false });
  };
  handleConfirmDate = (date: Date) => {
    this.setState({ selectedDate: date,selectFromDate:true, isDatePickerVisible: false ,isStartDatePickerVisible:false,errorMsgStartDate:false});
  };
  handleConfirmDate1 = (date: Date) => {
    this.setState({ selectedDate1: date,selectToDate:true, isDatePickerVisible: false,isEndDatePickerVisible:false,errorMsgToDate:false });
  };
showErrorMessage(responseJson:{errors:[{code:string,discount_cap:string}]}){
  if(responseJson.errors!=undefined && responseJson.errors[0]?.code){
    this.parseApiCatchErrorResponse(i18n.t("promoCodeText")+responseJson.errors[0].code);
  }
  if(responseJson.errors!=undefined && responseJson.errors[0]?.discount_cap){
    this.parseApiCatchErrorResponse(responseJson.errors[0].discount_cap);
  }
}
  openDobModal = () => this.setState({ isStartDatePickerVisible: true });
  openDobModal1 = () => this.setState({ isEndDatePickerVisible: true }); 
  formatDate = (date: Date) => {
    if (!date) return '';
    const locale = i18n.language === 'ar' ? 'ar' : 'en';
    return moment(date).locale(locale).format('ddd, DD MMM YYYY');
  };

  handleMinOrderValueChange = (value: string) => {
    this.setState({ minOrderValue: this.handleNumberOnly(value),errorMsgMinOrderValue:false });
  };

  handlePromoCode = (value: string) => {
    this.setState({ createPromocode: value, errorMsg: false,errorMsgPromocode:false })
  }

  handleDiscountPercent = (value: string) => {
   
    this.setState({ discountPercent: this.handleNumberOnly(value),errorMsgDiscountPercent:false })
  }

  handleMaxCap = (value: string) => {
    this.setState({ maxCap: this.handleNumberOnly(value),errorMsgMaxCap:false })
  };

  handleNumberOnly = (value:string)=>{
      // Allow only digits and decimal points
      const filteredText = value.replace(/[^0-9.]/g, '');
    
      // Ensure only one decimal point
      const parts = filteredText.split('.');
    
      // If there's a decimal point, limit the digits after it to a maximum of 2
      const validText = parts.length > 1
        ? parts[0] + '.' + parts[1].slice(0, 2) // Keep only the first two digits after the decimal
        : filteredText;
      return validText
  }

  setProductItem=async(responseJson:{attributes:{catalogue:{name:string},catalogue_variant:{sku:string},catalogue_variant_id:number}}[])=>{
    let data:{product:string,sku:string,id:number,selectStatus:boolean}[]=[]
    responseJson.forEach(element => {
      if(element.attributes.catalogue!=null){
      data.push({product:element.attributes.catalogue.name,sku:element.attributes.catalogue_variant.sku,id:element.attributes.catalogue_variant_id,selectStatus:false})
      }
    });
    this.setState({productList:data})
  }
  async createButtonAPICall() {
    this.setState({ loading: true });
    let storeId = await getStorageData('storeId')
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };
    let dataforAPI={}
    if(this.state.type!='Products'){
     dataforAPI = {
      applicable_for: this.state.selectUserType?'all_users':"new_users",
      coupon_type: "store_discount", bussiness_information_id: storeId,discount_type: "Store",discount: parseInt(this.state.discountPercent),discount_cap: parseInt(this.state.maxCap),code: this.state.createPromocode,min_cart_value: parseInt(this.state.minOrderValue),max_cart_value: parseInt(this.state.maxCap),valid_from: this.state.selectedDate,valid_to: this.state.selectedDate1,usage_limit_per_coupon: 20,usage_limit_per_customer: 1,is_active: true
    };
  }else{
    dataforAPI = {
      applicable_for: this.state.selectUserType?'all_users':"new_users",
      coupon_type: "product_discount",bussiness_information_id: storeId,discount_type: "Products",discount: parseInt(this.state.discountPercent),discount_cap: parseInt(this.state.maxCap),code: this.state.createPromocode,min_cart_value: parseInt(this.state.minOrderValue),max_cart_value: parseInt(this.state.maxCap),valid_from: this.state.selectedDate,valid_to: this.state.selectedDate1,usage_limit_per_coupon: 20,usage_limit_per_customer: 1,is_active: true
    };
  }
  
    const httpBody = {
      data: dataforAPI,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createApiCallId = requestMessage.messageId;
    let endpoint= configJSON.createApiEndPoint
    if(this.state.offer_id!=0){
      endpoint=endpoint+"/"+this.state.offer_id
    }
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      this.state.offer_id!=0?configJSON.updateAPiMethod:configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  getOfferDetails=async()=>{
    const token = await getStorageData("token", true);
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getOfferDetailsApiCallId = requestMessage.messageId;
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
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  getProductList=async()=>{
    let storeId = await getStorageData('storeId')
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createApiEndPoint+'/'+storeId+'/store_catalouge_variants_list'
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
  AllusersbtnPress = () => {
    this.setState({ allUsersText: i18n.t('All Users'),selectUserType:true });
  };

  newUsersBtnPress = () => {
    this.setState({ allUsersText: i18n.t('New Users'),selectUserType:false });
  };

  handleCheckBox = () => {
    this.setState({ termsAccepted: !this.state.termsAccepted })
  }
  startDateCheck(){
    let newDate=new Date()
    if(!this.state.selectFromDate){
      this.setState({startDateErrorMsg:i18n.t("*Please select start date")})
      return true;
    }
    if(!this.endAfterStart(newDate,new Date(this.state.selectedDate))){
      this.setState({startDateErrorMsg:i18n.t("*Please select valid date can not past date")})
      return true;
    }
  }
  endDateCheckValidation(){
    if(!this.state.selectToDate){
      this.setState({endDateErrorMsg:i18n.t("pleaseSelectEndDateStar")})
      return true;
    }
  
    if(!this.endAfterStart(new Date(this.state.selectedDate),new Date(this.state.selectedDate1))){
      this.setState({endDateErrorMsg:i18n.t("*Please select valid date can not past start date")})
      return true;
    }

    if(!this.endAfterStart(new Date(this.state.campaingStartDate),new Date(this.state.selectedDate1))){
      this.setState({endDateErrorMsg:i18n.t("*Please select valid date can not past date")})
      return true;
    }

    
  }
  checkDiscountPercent(){
    return this.state.discountPercent === "" || parseInt(this.state.discountPercent) <=0 || this.state.discountPercent==="." || parseInt(this.state.discountPercent) >= 100
  }
  checkMaxCap(){
    return this.state.maxCap == "" || parseInt(this.state.maxCap) <=0 || this.state.maxCap==="."
  }
  checkMinValue(){
    return this.state.minOrderValue == "" || parseInt(this.state.minOrderValue) <=0 || this.state.minOrderValue==="."
  }


  handleTheCreateButton = () => {

    if (this.state.type === "Products" && this.state.selectVerientIds.length<=0) {
      this.setState({ errorMsgProduct:true })
      return

    }else if (this.checkDiscountPercent()) {
      this.setState({ errorMsgDiscountPercent:true })
      this.scrollToTop(0)
      return

    }else if (this.checkMaxCap()) {
      this.setState({ errorMsgMaxCap:true })
      this.scrollToTop(10)
      return

    }
    else if (this.state.createPromocode === "") {
      this.setState({ errorMsg: true,errorMsgPromocode:true })
      this.scrollToTop(30)
      return

    }
    else if (this.checkMinValue()) {
      this.setState({ errorMsgMinOrderValue:true })
      this.scrollToTop(70)
      return

    }
    else if (this.startDateCheck()) {
      this.setState({ errorMsgStartDate:true })
      this.scrollToTop(150)
      return

    }
    else if (this.endDateCheckValidation() ) {
      this.setState({ errorMsgToDate:true })
      this.scrollToTop(250)
      return

    }
    else if (!this.state.termsAccepted ) {
      showMessage({
        message: i18n.t('Please accept terms & condition'),
        type: "success",
        position: { top: 8 },
      });
      return
    } 
    this.createButtonAPICall()
  };

navigationToTremsAndConditions = ()=>{

    this.setState({
      loading: true
    });
    const termNdConditions = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.termsConditoinId = termNdConditions.messageId;

    termNdConditions.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTermsNDCondsApiEndPoint
    );
    termNdConditions.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(termNdConditions.id, termNdConditions);
  
}
showProductModel(){
  if(this.state.offer_id!=0 && this.state.type!="Stores"){
    let data=this.state.productList
    for (let value of this.state.selectVerientIds) {
      const index = this.state.productList.findIndex(item=>item.id===value);
      if(index!=-1){
        data[index].selectStatus=true
      }
      this.setState({productList:data,isSelectAll:data.length===this.state.selectVerientIds.length})
    }
  }
  this.setState({productModel:true})
}
hideProdcutModel(){
  this.setState({productModel:false})
}

toggleItemSelection = (items:ProductList) => {
 let data=this.state.productList
  const index = data.findIndex(item=>item.id===items.id);
  if (index != -1 ) {
    data[index].selectStatus=!data[index].selectStatus
    this.setState({
      productList: data,
    })

  } 
}

toggleSelectAll = () => {
  let data:{product:string,sku:string,id:number,selectStatus:boolean}[]=[]
  if (!this.state.isSelectAll) {

    data=this.state.productList.map(element => {
     element.selectStatus=true
     return element;
    });
   
    this.setState({
      productList:data,
      isSelectAll: true
    });
  } else {
    data=this.state.productList.map(element => {
      element.selectStatus=false
      return element;
     });
    
     this.setState({
       productList:data,
       isSelectAll: false
     });
  }
};
 endAfterStart(start:Date, end:Date) {
 if(moment(start).format("DD-MM-YYYY")===moment(end).format("DD-MM-YYYY")){
  return true;
 }else{
  return  start<= end;
 }
} 
 
handleAssignStoreSaveButton = () => {
  let data:number[]=[]
  for (let value of this.state.productList) {
    if(value.selectStatus){
    
    data.push( value.id);
  }
  
    }
this.setState({selectVerientIds:data,productModel:false,errorMsgProduct:false})
}
renderSelectedCurrencyy = async() => {
  let currencyIcon = await getStorageData('currencyIcon')
  this.setState ({currencyIconSS:currencyIcon.replace(/(^"|"$)/g, '')})
};
  // Customizable Area End
}
