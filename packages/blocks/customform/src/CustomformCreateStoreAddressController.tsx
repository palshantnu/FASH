import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import {isEmpty,getStorageData,setStorageData} from "../../../framework/src/Utilities"
import i18n from "../../../components/src/i18n/i18n.config";

interface PaymentIdProps {
  [index:number]:string
}

interface CreateStorePropsAdd {
  address:string;
  latitude:number;
  longitude:number;
  area:string;
  areaArabic:string;
  block:string;
  blockArabic:string;
  mallName:string;
  mallNameArabic:string;
  floor:string;
  floorArabic:string;
  unitNumber:string;
  city:string;
  cityArabic:string;
  zipCode:string;
  paymentMode:PaymentIdProps[],
  reachDriver:string;
  reachDriverArabic:string;
  countryCode:string;
  phoneNumber:string;
}

interface AddressProps {
  addressselected:string;
  latitude:string;
  longitude:string;
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
  address:string;
  addressError:boolean;
  area:string;
  areaError:boolean;
  areaArabic:string;
  areaErrorArabic:boolean;
  blockStore:string;
  blockStoreError:boolean;
  blockStoreArabic:string;
  blockStoreErrorArabic:boolean;
  mallName:string;
  mallNameError:boolean;
  mallNameArabic:string;
  floor:string;
  floorArabic:string;
  unitNumber:string;
  city:string;
  cityError:boolean;
  cityArabic:string;
  cityErrorArabic:boolean;
  zipcode:string;
  zipcodeError:boolean;
  driverReach:string;
  driverReachError:boolean;
  driverReachArabic:string;
  driverReachErrorArabic:boolean;
  selectedCountryCode:string;
  phoneNumber:string;
  phoneNumberError:boolean;
  countryList: CountryData[],
  loading:boolean;
  dropdownOpen:boolean;
  selectedCodeIndex:number;
  formattedAddress:string;
  latitude:string;
  longitude:string;
  languageGet : string;
  formError:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformCreateStoreAddressController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  paymentModeRef:any;
  countryCodeApiCallId: string = "";
  checkPhoneNumberCallId: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      address:'',
      addressError:false,
      area:'',
      areaError:false,
      areaArabic:'',
      areaErrorArabic:false,
      blockStore:'',
      blockStoreError:false,
      blockStoreArabic:'',
      blockStoreErrorArabic:false,
      mallName:'',
      mallNameError:false,
      mallNameArabic:'',
      floor:'',
      floorArabic:'',
      unitNumber:'',
      city:'',
      cityError:false,
      cityArabic:'',
      cityErrorArabic:false,
      zipcode:'',
      zipcodeError:false,
      driverReach:'',
      driverReachError:false,
      driverReachArabic:'',
      driverReachErrorArabic:false,
      selectedCountryCode:"+965",
      phoneNumber:'',
      phoneNumberError:false,
      countryList: [],
      loading:false,
      dropdownOpen:false,
      selectedCodeIndex:0,
      formattedAddress:'',
      latitude:'',
      longitude:'',
      languageGet : i18n.language,
      formError:false,
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.fetchCountryCodes();
    this.getToken();
    this.getLocalDataAddress()
    this.getStoreDataAddress()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      this.fetchCountryCodes();
      this.getLocalDataAddress()
      this.getStoreDataAddress()
    });
    // Customizable Area End
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.countryCodeApiCallId) {
          const kuwaitIndex = responseJson.findIndex((c: CountryData) => c.numeric_code === this.state.selectedCountryCode)
          this.setState({
            countryList: responseJson,
            loading: false,
            selectedCountryCode:responseJson[kuwaitIndex].numeric_code,
            selectedCodeIndex:kuwaitIndex
          });
        }
        else if (apiRequestCallId === this.checkPhoneNumberCallId) {
          this.setState({ loading: false });
          if (responseJson.errors) {
            this.setState({ phoneNumberError: true });
          } else {
            console.log("responseJson=====", responseJson);
            if (responseJson.company_contact_valid) {
              this.setState({ formError: false, phoneNumberError: false });
              let localObjectGet = await getStorageData('createStoreArr',true)
              this.updateLocalDataAndRedirect(localObjectGet)
            } else {
              this.setState({ formError: true, phoneNumberError: true });
            }
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
    checkBoarderWidth(stateValue1:boolean){
      if(stateValue1){
          return 1;
      }
      else{
          return 0;
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

    getToken = () => {
      const msg: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msg);
    };

    getLocalDataAddress = async()=>{
      let localObjectGet = await getStorageData('createStoreArr',true)
      this.getLocalDataAddressConfirm(localObjectGet)
    }

    getLocalDataAddressConfirm = async(localObjectParse:CreateStorePropsAdd)=>{
      if(localObjectParse != null)
      {
        this.setState({address:localObjectParse.address,area:localObjectParse.area,blockStore:localObjectParse.block,mallName:localObjectParse.mallName,floor:localObjectParse.floor,unitNumber:localObjectParse.unitNumber,city:localObjectParse.city,zipcode:localObjectParse.zipCode,driverReach:localObjectParse.reachDriver,phoneNumber:localObjectParse.phoneNumber,selectedCountryCode:localObjectParse.countryCode,areaArabic:localObjectParse.areaArabic,blockStoreArabic:localObjectParse.blockArabic,mallNameArabic:localObjectParse.mallNameArabic,floorArabic:localObjectParse.floorArabic,cityArabic:localObjectParse.cityArabic,driverReachArabic:localObjectParse.reachDriverArabic})
      }
    }

    getStoreDataAddress = async()=>{
      let localObjectAddress = await getStorageData('storeAddressMap',true)
      this.getStoreAddress(localObjectAddress)
    }

    getStoreAddress = async(localObjectAddGet:AddressProps)=>{
      if(localObjectAddGet != null)
      {
        this.setState({address:localObjectAddGet.addressselected,latitude:localObjectAddGet.latitude,longitude:localObjectAddGet.longitude})
      }
    }

    nextBtnTimingRedirection = async()=>{
      if(isEmpty(this.state.address))
      {
        this.setState({addressError:true})
        return false;
      }

      if(isEmpty(this.state.area))
      {
        this.setState({areaError:true})
        return false;
      }

      if(isEmpty(this.state.areaArabic))
      {
        this.setState({areaErrorArabic:true})
        return false;
      }

      if(isEmpty(this.state.blockStore))
      {
        this.setState({blockStoreError:true})
        return false;
      }

      if(isEmpty(this.state.blockStoreArabic))
      {
        this.setState({blockStoreErrorArabic:true})
        return false;
      }

      if(isEmpty(this.state.city))
      {
        this.setState({cityError:true})
        return false;
      }

      if(isEmpty(this.state.cityArabic))
      {
        this.setState({cityErrorArabic:true})
        return false;
      }

      if(isEmpty(this.state.zipcode))
      {
        this.setState({zipcodeError:true})
        return false;
      }

      if(isEmpty(this.state.driverReach))
      {
        this.setState({driverReachError:true})
        return false;
      }

      if(isEmpty(this.state.driverReachArabic))
      {
        this.setState({driverReachErrorArabic:true})
        return false;
      }

      if (isEmpty(this.state.phoneNumber)) {
        this.setState({ phoneNumberError: true });
        return false;
      } else {
        this.setState({ formError: false }, ()=> {
          this.checkPhoneNumber(this.state.phoneNumber);
        });
      }
    }

    checkPhoneNumber = (phoneNumber: string) => {
      let header = {
        token: this.state.token,
      };

      let formData = new FormData();
      formData.append("data[attributes][company_contact_number]", this.state.selectedCountryCode + phoneNumber);

      this.setState({ loading: true });
      const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
      this.checkPhoneNumberCallId = message.messageId;
  
      message.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.postCheckPhoneNumberApiEndPoint
      );
      message.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.apiMethodTypePost
      );

      message.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formData
      );
  
      runEngine.sendMessage(message.id, message);
    };

    updateLocalDataAndRedirect=async(localObjectParse:CreateStorePropsAdd)=>{
      
        localObjectParse.address = this.state.address;
        localObjectParse.area = this.state.area;
        localObjectParse.areaArabic = this.state.areaArabic;
        localObjectParse.block = this.state.blockStore;
        localObjectParse.blockArabic = this.state.blockStoreArabic;
        localObjectParse.mallName = this.state.mallName;
        localObjectParse.mallNameArabic = this.state.mallNameArabic;
        localObjectParse.floor = this.state.floor;
        localObjectParse.floorArabic = this.state.floorArabic;
        localObjectParse.unitNumber = this.state.unitNumber;
        localObjectParse.city = this.state.city;
        localObjectParse.cityArabic = this.state.cityArabic;
        localObjectParse.zipCode = this.state.zipcode;
        localObjectParse.paymentMode = [];
        localObjectParse.reachDriver = this.state.driverReach;
        localObjectParse.reachDriverArabic = this.state.driverReachArabic;
        localObjectParse.countryCode = this.state.selectedCountryCode;
        localObjectParse.phoneNumber = this.state.phoneNumber;
        localObjectParse.latitude = parseFloat(this.state.latitude);
        localObjectParse.longitude = parseFloat(this.state.longitude);
        
        setStorageData("createStoreArr",JSON.stringify(localObjectParse))

      const msg: Message = new Message(
      getName(MessageEnum.NavigationCustomformCreateStoreTimingMessage)
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
  // Customizable Area End
}
