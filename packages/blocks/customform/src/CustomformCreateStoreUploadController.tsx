import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from 'react-native-image-crop-picker';
import i18n from '../../../components/src/i18n/i18n.config';
import {isEmpty,getStorageData,setStorageData} from "../../../framework/src/Utilities"

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
  storeNameArabic:string;
  storeDesArabic:string;
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
  storeError:boolean;
  storeDescription:string;
  storeDescriptionError:boolean;
  storeNameArabic:string;
  storeArabicError:boolean;
  storeArabicDescription:string;
  storeArabicDescriptionError:boolean;
  mediamodal:boolean;
  selectImage:string;
  attachmentData:AttachmentsProps;
  selectImageError:boolean;
  imageFileName:string;
  storeNameErrorMessage:string;
  loading:boolean;
  languageManage:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformCreateStoreUploadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getStoreNameApiCallId="";
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
      storeName:'',
      storeError:false,
      storeDescription:'',
      storeDescriptionError:false,
      storeNameArabic:'',
      storeArabicError:false,
      storeArabicDescription:'',
      storeArabicDescriptionError:false,
      mediamodal:false,
      selectImage:'',
      attachmentData: { name: "", type: "", uri: "" },
      selectImageError:false,
      imageFileName:'',
      storeNameErrorMessage:i18n.t('pleaseEnterStoreNameError'),
      loading:false,
      languageManage:i18n.language
    };


    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }

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
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.getLocalData()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
      this.getLocalData()
    });
    // Customizable Area End
  }

    // Customizable Area Start
    storeAfterSuccess = async(responseJson:ResponseProps)=>{
      if(responseJson)
      {
        if(responseJson.exists)
        {
          this.setState({storeNameErrorMessage:i18n.t('storeNameAlreadyError'),storeError:true})
        }else{
          let localObjectGet = await getStorageData('createStoreArr',true)
          this.setDataForApi(localObjectGet)
        }
      }
    }
    getLocalData = async()=>{
      let localObjectGet = await getStorageData('createStoreArr',true)
      this.getLocalDataConfirm(localObjectGet)
    }

    getLocalDataConfirm = async(localObjectParse:CreateStoreProps|null)=>{
      if(localObjectParse != null)
      {
        this.setState({storeName:localObjectParse.storeName,storeDescription:localObjectParse.storeDes,storeNameArabic:localObjectParse.storeNameArabic,storeArabicDescription:localObjectParse.storeDesArabic,selectImage:localObjectParse.storeImage,attachmentData:localObjectParse.storeImageUpload})
      }else{
        let localObject = {
          storeImage:'',
          storeImageUpload:'',
          storeName:'',
          storeDes:'',
          storeNameArabic:'',
          storeDesArabic:'',
          address:'',
          latitute:'',
          longitude:'',
          area:'',
          block:'',
          mallName:'',
          floor:'',
          unitNumber:'',
          city:'',
          zipCode:'',
          paymentMode:[],
          reachDriver:'',
          countryCode:"+965",
          phoneNumber:'',
          weekDayArr:[],
          orderShip:''
        }
        this.setState({storeName:'',storeDescription:'',selectImage:'',attachmentData:{ name: "", type: "", uri: "" }})
        setStorageData("createStoreArr",JSON.stringify(localObject))
      }

    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };
    checkBoarderColor(stateValue1:boolean){
        if(stateValue1){
            return 'red';
        }
        else{
            return '#A9A9A9';
        }
    }

    nextBtnAddressRedirection = async()=>{

      if(isEmpty(this.state.selectImage))
      {
        this.setState({selectImageError:true})
        return false;
      }

      if(isEmpty(this.state.storeName))
      {
        this.setState({storeError:true,storeNameErrorMessage:i18n.t('pleaseEnterStoreNameError')})
        return false;
      }

      if(isEmpty(this.state.storeNameArabic))
      {
        this.setState({storeArabicError:true,storeNameErrorMessage:i18n.t('pleaseEnterStoreNameError')})
        return false;
      }

      if(isEmpty(this.state.storeDescription))
      {
        this.setState({storeDescriptionError:true})
        return false;
      }

      if(isEmpty(this.state.storeArabicDescription))
      {
        this.setState({storeArabicDescriptionError:true})
        return false;
      }

      this.checkStoreName();
     
    }

    setDataForApi = async (localObjectParse:CreateStoreProps)=>{
      
      const imageData: any = this.state.attachmentData

      localObjectParse.storeImage = this.state.selectImage;
      localObjectParse.storeImageUpload = imageData;
      localObjectParse.storeName = this.state.storeName;
      localObjectParse.storeDes = this.state.storeDescription;
      localObjectParse.storeNameArabic = this.state.storeNameArabic;
      localObjectParse.storeDesArabic = this.state.storeArabicDescription;
      
      setStorageData("createStoreArr",JSON.stringify(localObjectParse))


      this.nextRedirectionConfirm()
    }

    nextRedirectionConfirm = ()=>{
      const msg: Message = new Message(
        getName(MessageEnum.NavigationCustomformCreateStoreAddressMessage)
        );
  
      msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msg);
    }

    cancelBtnRedirection = ()=>{
      this.props.navigation.goBack();
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
          attachmentData:objData
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
          attachmentData:objData
        })
      }).catch((error) => {
        this.setState({ mediamodal: false })
      })
    }

    checkStoreName = async()=>{
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
        configJSON.getStoreNameApiEndPoint+'?store_name='+this.state.storeName
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
    // Customizable Area End
}
