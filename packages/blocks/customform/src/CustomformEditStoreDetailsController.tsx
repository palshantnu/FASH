import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from 'react-native-image-crop-picker';
import {isEmpty,getStorageData,removeStorageData} from "../../../framework/src/Utilities"
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";

interface ResponseProps {
  exists:boolean;
}

interface AttachmentsProps {
  type: string;
  uri: string;
  name: string;
}
interface CreateStoreProps {
  storeImage:string;
  storeImageUpload:AttachmentsProps;
  storeName:string;
  storeDes:string;
}

interface AddressProps {
    addressselected:string;
    latitude:string;
    longitude:string;
  }

interface UpdateResponseProps{
  errors:[
    {
      contact_number:string;
      zipcode:string;
    }
  ]
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
  token: string;
  storeName:string;
  storeNameEditArabic:string;
  storeError:boolean;
  storeArabicError:boolean;
  storeDescription:string;
  storeDescriptionEditArabic:string;
  storeDescriptionError:boolean;
  storeDesEditArabicError:boolean;
  mediamodal:boolean;
  selectImage:string;
  attachmentData:AttachmentsProps;
  selectImageError:boolean;
  imageFileName:string;
  storeNameErrorMessage:string;
  loading:boolean;
  storeDataActive:number;
  address:string;
  addressError:boolean;
  area:string;
  areaEditArabic:string;
  areaError:boolean;
  areaEditArabicError:boolean;
  blockStore:string;
  blockStoreArabic:string;
  blockStoreError:boolean;
  blockStoreEditArabicError:boolean;
  mallName:string;
  mallNameEditArabic:string;
  mallNameError:boolean;
  floor:string;
  floorEdtiArabic:string;
  unitNumber:string;
  city:string;
  cityEditArabic:string;
  cityError:boolean;
  cityArabicError:boolean;
  zipcode:string;
  zipcodeError:boolean;
  driverReach:string;
  driverReachEditArabic:string;
  driverReachError:boolean;
  driverReachEditArabicError:boolean;
  selectedCountryCode:string;
  phoneNumber:string;
  phoneNumberError:boolean;
  countryList: CountryData[],
  dropdownOpen:boolean;
  selectedCodeIndex:number;
  formattedAddress:string;
  latitude:string;
  longitude:string;
  storeId:string;
  editImage:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformEditStoreDetailsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getStoreNameApiCallId="";
  countryCodeApiCallId = "";
  updateStoreCallApiId="";
  checkContactNumberCallId="";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      storeName:'',
      storeNameEditArabic:'',
      storeError:false,
      storeArabicError:false,
      storeDescription:'',
      storeDescriptionEditArabic:'',
      storeDescriptionError:false,
      storeDesEditArabicError:false,
      mediamodal:false,
      selectImage:'',
      attachmentData: { name: "", type: "", uri: "" },
      selectImageError:false,
      imageFileName:'',
      storeNameErrorMessage: i18n.t('pleaseEnterStoreNameError'),
      loading:false,
      storeDataActive:0,
      address:'',
      addressError:false,
      area:'',
      areaEditArabic:'',
      areaError:false,
      areaEditArabicError:false,
      blockStore:'',
      blockStoreArabic:'',
      blockStoreError:false,
      blockStoreEditArabicError:false,
      mallName:'',
      mallNameEditArabic:'',
      mallNameError:false,
      floor:'',
      floorEdtiArabic:'',
      unitNumber:'',
      city:'',
      cityEditArabic:'',
      cityError:false,
      cityArabicError:false,
      zipcode:'',
      zipcodeError:false,
      driverReach:'',
      driverReachEditArabic:'',
      driverReachError:false,
      driverReachEditArabicError:false,
      selectedCountryCode:"",
      phoneNumber:'',
      phoneNumberError:false,
      countryList: [],
      dropdownOpen:false,
      selectedCodeIndex:0,
      formattedAddress:'',
      latitude:'',
      longitude:'',
      storeId:'0',
      editImage:false
    };


    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.getTokenAndPayload(message)

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.getStoreNameApiCallId) {
          this.setState({loading:false})
          this.storeAfterSuccess(responseJson)
        }
        if (apiRequestCallId === this.countryCodeApiCallId) {
            this.setState({loading: false})
            const kuwaitIndex = responseJson.findIndex((c: CountryData) => c.numeric_code === this.state.selectedCountryCode)
            this.setState({
              countryList: responseJson,
              selectedCountryCode:responseJson[kuwaitIndex].numeric_code,
              selectedCodeIndex:kuwaitIndex
            });
        }
        if(apiRequestCallId === this.updateStoreCallApiId)
        {
          this.setState({loading:false})
          this.updateStoreCondition(responseJson)
          
        }
        if(apiRequestCallId === this.checkContactNumberCallId)
        {
          if (!responseJson.company_contact_valid) {
            this.setState({ phoneNumberError: true, loading:false });
          } else {
            this.setState({ phoneNumberError: false,loading:false});
            this.checkUpdateStoreName();
          }
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.fetchCountryCodes()
    this.getStoreDataAddress()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      this.fetchCountryCodes();
      this.getStoreDataAddress()
    });
    // Customizable Area End
  }

    // Customizable Area Start
    getTokenAndPayload = (message:Message)=>{
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            runEngine.debugLog("TOKEN", token);
            this.setState({ token: token });
        }
      
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
    
            const storeId = message.getData(
            getName(MessageEnum.ManageTimingStoreIdPayloadMessage)
            )
    
            const storeInfoGet = message.getData(
            getName(MessageEnum.StoreDetailsPayloadMessage)
            );

            let unitNumber = storeInfoGet.unit_number === null ? '':storeInfoGet.unit_number.toString();

            let paymentModeIndex = storeInfoGet.payment_mode[0]
            this.setState({storeId:storeId,storeName:storeInfoGet.store_name,storeDescription:storeInfoGet.description,selectImage:storeInfoGet.image,area:storeInfoGet.area,blockStore:storeInfoGet.block,mallName:storeInfoGet.mall_name,floor:storeInfoGet.floor,city:storeInfoGet.city,zipcode:storeInfoGet.zipcode,driverReach:storeInfoGet.driver_instruction,latitude:storeInfoGet.latitude,longitude:storeInfoGet.longitude,phoneNumber:storeInfoGet.contact_number.phone_number,selectedCountryCode:storeInfoGet.contact_number.country_code,editImage:false,address:storeInfoGet.address,unitNumber:unitNumber,storeNameEditArabic:storeInfoGet.store_name_arabic,storeDescriptionEditArabic:storeInfoGet.description_arabic,areaEditArabic:storeInfoGet.area_arabic,blockStoreArabic:storeInfoGet.block_arabic,mallNameEditArabic:storeInfoGet.mall_name_arabic,floorEdtiArabic:storeInfoGet.floor_arabic,cityEditArabic:storeInfoGet.city_arabic,driverReachEditArabic:storeInfoGet.driver_instruction_arabic})
        }
    }

    storeAfterSuccess = async(responseJson:ResponseProps)=>{
      if(responseJson)
      {
        if(responseJson.exists)
        {
          this.setState({storeNameErrorMessage:i18n.t('storeNameAlreadyError'),storeError:true})
        }else{
          this.updateDataForApi()
        }
      }
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    getStoreDataAddress = async()=>{
        let localObjectAddress = await getStorageData('storeAddressMap',true)
        this.getStoreAddress(localObjectAddress)
      }
  
    getStoreAddress = async(localObjectAddGet:AddressProps)=>{
        if(localObjectAddGet != null)
        {
            this.setState({address:localObjectAddGet.addressselected,latitude:localObjectAddGet.latitude,longitude:localObjectAddGet.longitude})
        }else{
            this.setState({address:this.state.address,latitude:this.state.latitude,longitude:this.state.longitude})
        }
    }

    checkBoarderColor(stateValue1:boolean){
        if(stateValue1){
            return 'red';
        }
        else{
            return '#A9A9A9';
        }
    }

    updateStoreDetails = async()=>{

      if(isEmpty(this.state.selectImage))
      {
        this.setState({selectImageError:true,storeDataActive:0})
        return false;
      }

      if(isEmpty(this.state.storeName))
      {
        this.setState({storeError:true,storeNameErrorMessage: i18n.t('pleaseEnterStoreNameError'),storeDataActive:0})
        return false;
      }

      if(isEmpty(this.state.storeNameEditArabic))
        {
          this.setState({storeArabicError:true,storeNameErrorMessage: i18n.t('pleaseEnterStoreNameError'),storeDataActive:0})
          return false;
        }

      if(isEmpty(this.state.storeDescription))
      {
        this.setState({storeDescriptionError:true,storeDataActive:0})
        return false;
      }

      if(isEmpty(this.state.storeDescriptionEditArabic))
        {
          this.setState({storeDesEditArabicError:true,storeDataActive:0})
          return false;
        }

      if(isEmpty(this.state.address))
      {
        this.setState({addressError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.area))
      {
        this.setState({areaError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.areaEditArabic))
      {
        this.setState({areaEditArabicError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.blockStore))
      {
        this.setState({blockStoreError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.blockStoreArabic))
      {
        this.setState({blockStoreEditArabicError:true,storeDataActive:1})
        return false;
      }

      this.updateStoreRemianingConditions()
    }

    updateStoreRemianingConditions = ()=>{


      if(isEmpty(this.state.city))
      {
        this.setState({cityError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.cityEditArabic))
      {
        this.setState({cityArabicError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.zipcode))
      {
        this.setState({zipcodeError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.driverReach))
      {
        this.setState({driverReachError:true,storeDataActive:1})
        return false;
      }

      if(isEmpty(this.state.driverReachEditArabic))
      {
        this.setState({driverReachEditArabicError:true,storeDataActive:1})
        return false;
      }

      if (isEmpty(this.state.phoneNumber)) {
        this.setState({ phoneNumberError: true,storeDataActive:1 });
        return false;
      }else {
        this.setState({ phoneNumberError: false,storeDataActive:1 }, ()=> {
          this.checkContactNumber(this.state.selectedCountryCode + this.state.phoneNumber);
        });
      }

    }    

    checkContactNumber = (phoneNumber: string) => {
    
      let formData = new FormData();
      formData.append("data[attributes][company_contact_number]", phoneNumber);

      let header = {
        token: this.state.token,
      };

      this.setState({ loading: true });
      const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      message.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      message.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost
      );
      message.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.postCheckPhoneNumberApiEndPoint
      );
      this.checkContactNumberCallId = message.messageId; 
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );
  
      runEngine.sendMessage(message.id, message);
    }

    updateDataForApi = async ()=>{

      const header = {
        "Content-Type": configJSON.validationFormContentType,
        token: this.state.token
      };

      let paymentModeData = "";

      let profiledata: string | Blob = {
        'name': this.state.attachmentData.name,
        'type':  this.state.attachmentData.type,
        'uri':  this.state.attachmentData.uri
      } as unknown as Blob;

      let formdata = new FormData()
      if(this.state.editImage)
      {
        formdata.append("business[image]",profiledata);
      }
      formdata.append("business[store_name]",this.state.storeName);
      formdata.append("business[description]",this.state.storeDescription);
      formdata.append("business[address]",this.state.address);
      formdata.append("business[latitude]",this.state.latitude);
      formdata.append("business[longitude]",this.state.longitude);
      formdata.append("business[area]",this.state.area);
      formdata.append("business[block]",this.state.blockStore);
      formdata.append("business[mall_name]",this.state.mallName);
      formdata.append("business[floor]",this.state.floor);
      formdata.append("business[unit_number]",this.state.unitNumber);
      formdata.append("business[city]",this.state.city);
      formdata.append("business[zipcode]",this.state.zipcode);
      formdata.append("business[payment_mode][]",paymentModeData);
      formdata.append("business[driver_instruction]",this.state.driverReach);
      formdata.append("business[contact_number]",this.state.selectedCountryCode+''+this.state.phoneNumber);
      formdata.append("business[store_name_arabic]",this.state.storeNameEditArabic);
      formdata.append("business[description_arabic]",this.state.storeDescriptionEditArabic);
      formdata.append("business[address_arabic]",this.state.address);
      formdata.append("business[area_arabic]",this.state.areaEditArabic);
      formdata.append("business[block_arabic]",this.state.blockStoreArabic);
      formdata.append("business[mall_name_arabic]",this.state.mallNameEditArabic);
      formdata.append("business[floor_arabic]",this.state.floorEdtiArabic);
      formdata.append("business[city_arabic]",this.state.cityEditArabic);
      formdata.append("business[driver_instruction_arabic]",this.state.driverReachEditArabic);

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.updateStoreCallApiId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createStoreApiEndPoint+'/'+this.state.storeId
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formdata
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.sellerDetailsAPIMethodPATCH
      );
      this.setState({loading:true})
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

    }

    launchGellery = async (crop: any) => {
      return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4,
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    Galleryopen = () => {
      this.launchGellery(true).then((obj: any) => {
        let finaldata = 'data:' + obj.mime + ';base64,' + obj.data
  
        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: obj.mime,
          uri: obj.path,
        };
  
        this.setState({
          selectImage: finaldata,
          mediamodal: false,
          imageFileName:obj.filename ? obj.filename : 'image.jpg',
          selectImageError:false,
          attachmentData:objData,
          editImage:true
        })
      }).catch((error) => {
        this.setState({ mediamodal: false })
  
      })
    }

    launchCamera = async (crop: any) => {
      return new Promise((resolve, reject) => {
        ImagePicker.openCamera({
          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4,
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      })
    }
  
    Camerapopen = async () => {
      this.launchCamera(true).then((obj: any) => {
        let finaldata = 'data:' + obj.mime + ';base64,' + obj.data
        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: obj.mime,
          uri: obj.path,
        };
        this.setState({
          selectImage: finaldata,
          mediamodal: false,
          imageFileName:obj.filename ? obj.filename : 'image.jpg',
          selectImageError:false,
          attachmentData:objData,
          editImage:true
        })
      }).catch((error) => {
        this.setState({ mediamodal: false })
      })
    }

    checkUpdateStoreName = async()=>{
      this.setState({loading:true})
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getStoreNameApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getStoreNameApiEndPoint+'?store_name='+this.state.storeName+'store_id='+this.state.storeId
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
      return true;
    }

    checkBoarderWidth(stateValue1:boolean){
        if(stateValue1){
            return 1;
        }
        else{
            return 0;
        }
    }

    btnRedirectGps = ()=>{
        const msg: Message = new Message(
          getName(MessageEnum.NavigationCustomformMapMessage)
          );
    
        msg.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );
  
        this.send(msg);
    }

    fetchCountryCodes = () => {
        this.setState({ loading: true });
        const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
        this.countryCodeApiCallId = message.messageId;
    
        message.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.countryCodeApiEndpoint
        );
        message.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.validationApiMethodType
        );
    
        runEngine.sendMessage(message.id, message);
    }; 

    manageTab = ()=>{
      if(this.state.storeDataActive === 0)
      {
        this.setState({storeDataActive:1})
      }else{
        this.props.navigation.goBack()
      }
    }

    updateStoreCondition = (responseJson:UpdateResponseProps)=>{
      if(responseJson.errors === undefined)
      {
        removeStorageData('storeAddressMap')
        showMessage({
            message: configJSON.storeUpdateSuccessMessage,
            position: { top: 0 },
        });
        this.manageTab()
      }else{
        this.setState({storeDataActive:1})
        if(responseJson.errors[0].contact_number)
        {
          showMessage({
            message: configJSON.validContactNumberMessage,
            position: { top: 0 },
          });
        }
        if(responseJson.errors[0].zipcode)
        {
          showMessage({
            message: configJSON.zipcodeErrorMessage,
            position: { top: 0 },
          });
        }
      }
    }
    // Customizable Area End
}
