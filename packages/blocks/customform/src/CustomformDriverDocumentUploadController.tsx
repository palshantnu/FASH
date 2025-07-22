import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import {isEmpty} from "../../../framework/src/Utilities"
import i18n from '../../../components/src/i18n/i18n.config';
import { showMessage } from "react-native-flash-message";

interface ResponseProps {
  exists:boolean;
  error:string;
}

interface AttachmentsProps {
  type: string;
  uri: string;
  name: string;
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
  licenseData:string;
  licenseDataError:boolean;
  mediamodal:boolean;
  selectImage:string;
  attachmentData:AttachmentsProps;
  selectImageError:boolean;
  licenseDataErrorMessage:string;
  loading:boolean;
  inputLabel:string;
  inputPlaceholderLabel:string;
  photoBoxTitle:string;
  photoSubTitle:string;
  headerTitleMessage:string;
  photoErrorMessage:string;
  successMessageShow:string;
  inputFieldShow:boolean;
  showHeaderTitleText:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverDocumentUploadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadDriverDocumentPhotoApiCallId="";
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
        licenseData:'',
        licenseDataError:false,
        mediamodal:false,
        selectImage:'',
        attachmentData: { name: "", type: "", uri: "" },
        selectImageError:false,
        licenseDataErrorMessage:i18n.t('pleaseEnterVehicleRegistrationError'),
        loading:false,
        inputLabel:'',
        inputPlaceholderLabel:'',
        photoBoxTitle:'',
        photoSubTitle:'',
        headerTitleMessage:'',
        photoErrorMessage:'',
        successMessageShow:'',
        inputFieldShow:false,
        showHeaderTitleText:''
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
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
    
      const documentType = message.getData(
        getName(MessageEnum.ManageDriverDocumentType)
      )
      this.setState({headerTitleMessage:documentType})
      this.manageAccordingTypePage(documentType)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.uploadDriverDocumentPhotoApiCallId) {
          this.setState({loading:false})
          this.uploadAfterSuccess(responseJson)
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

    // Customizable Area Start
    uploadAfterSuccess = async(responseJson:ResponseProps)=>{
      if(responseJson.error === undefined)
      {
        showMessage({
          message: this.state.successMessageShow,
          position: { top: 0 },
        });
        this.setState({inputLabel:'',inputPlaceholderLabel:'',photoBoxTitle:'',photoSubTitle:'',licenseDataErrorMessage:'',photoErrorMessage:'',successMessageShow:'',selectImage:'',attachmentData: { name: "", type: "", uri: "" },selectImageError:false,})
        this.props.navigation.goBack();
      }else{
        if(this.state.headerTitleMessage === 'Agency Authorization Letter')
        {
          this.setState({selectImageError:true,photoErrorMessage:responseJson.error})
        }else{
          this.setState({licenseDataErrorMessage:responseJson.error,licenseDataError:true})
        }
      }
    }

    getToken = () => {
        const msgToken: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msgToken);
    };
    checkBoarderColor(stateValue1:boolean){
        if(stateValue1){
            return 'red';
        }
        else{
            return '#A9A9A9';
        }
    }

    uploadDriverDocuments = async()=>{
      let endPointManage = '';
      let methodManage = '';
      let formdata = new FormData()
      let profiledata: string | Blob = {
        'name': this.state.attachmentData.name,
        'type':  this.state.attachmentData.type,
        'uri':  this.state.attachmentData.uri
      } as unknown as Blob;
      
      if(this.state.headerTitleMessage === 'Driving License')
      {
        if(isEmpty(this.state.licenseData))
        {
            this.setState({licenseDataError:true})
            return false;
        }
        endPointManage = configJSON.uploadDriverLicensePhotoApiEndPoint;
        methodManage = configJSON.sellerDetailsAPIMethodPOST;
        formdata.append("license",profiledata);
        formdata.append("license_number",this.state.licenseData);
      }
      else{
        endPointManage = configJSON.uploadAgencyAuthorizationApiEndPoint;
        methodManage = configJSON.sellerDetailsAPIMethodPOST;
        formdata.append("agency_authorization_letter",profiledata);
      }

      if(isEmpty(this.state.selectImage))
      {
          this.setState({selectImageError:true})
          return false;
      }

      const header = {
        "Content-Type": configJSON.validationFormContentType,
        token: this.state.token
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
        
      this.uploadDriverDocumentPhotoApiCallId = requestMessage.messageId;

      requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPointManage
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
      methodManage
      );
      this.setState({loading:true})
      runEngine.sendMessage(requestMessage.id, requestMessage);
      return true;

     
    }

    launchGellery = async (crop: boolean) => {
      return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
          mediaType: 'photo',
          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4,
        }).then((resp) => {
          resolve(resp);
        }).catch((error) => {
          reject(error);
        });
      });
    }

    Galleryopen = () => {
      this.launchGellery(true).then((objImage) => {
        const imageResult = objImage as Image
        let finaldata = 'data:' + imageResult.mime + ';base64,' + imageResult.data
  
        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: imageResult.mime,
          uri: imageResult.path,
        };
  
        this.setState({
          selectImage: finaldata,
          mediamodal: false,
          selectImageError:false,
          attachmentData:objData
        })
      }).catch((error) => {
        this.setState({ mediamodal: false })
  
      })
    }

    launchCamera = async (crop: boolean) => {
      return new Promise((resolve, reject) => {
        ImagePicker.openCamera({
          maxWidth: 300,
          maxHeight: 400,
          includeBase64: true,
          includeExif: true,
          compressImageQuality: 0.4,
        }).then((resp) => {
          resolve(resp);
        }).catch((error) => {
          reject(error);
        });
      })
    }
  
    Camerapopen = async () => {
      this.launchCamera(true).then((objImage) => {
        const imageResultCamera = objImage as Image
        let finaldata = 'data:' + imageResultCamera.mime + ';base64,' + imageResultCamera.data
        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: imageResultCamera.mime,
          uri: imageResultCamera.path,
        };
        this.setState({
          selectImage: finaldata,
          mediamodal: false,
          selectImageError:false,
          attachmentData:objData
        })
      }).catch((error) => {
        this.setState({ mediamodal: false })
      })
    }

    manageAccordingTypePage = (documentType:string)=>{
      if(documentType === 'Driving License')
      {
        this.setState({inputLabel:i18n.t('licenseNumberText'),inputPlaceholderLabel:i18n.t('licensePlaceholderText'),photoBoxTitle:i18n.t('drivingLicensePhotoText'),photoSubTitle:i18n.t('uploadFrontDrivingPhoto'),licenseDataErrorMessage:i18n.t('pleaseEnterLicenseError'),photoErrorMessage:i18n.t('pleaseSelectFrontDLicenseText'),successMessageShow:i18n.t('licenseSubmiitedSuccessText'),inputFieldShow:true,showHeaderTitleText:i18n.t('drivingLicenseText')})
      }
      else if(documentType === 'Agency Authorization Letter')
      {
        this.setState({inputLabel:'',inputPlaceholderLabel:'',photoBoxTitle:i18n.t('agencyAuthLetterPhoto'),photoSubTitle:i18n.t('uploadAgencyAuthLetter'),licenseDataErrorMessage:'',photoErrorMessage:i18n.t('pleaseSelectAgenecyAuthPhoto'),successMessageShow:i18n.t('agencyAuthLetterSuccessText'),inputFieldShow:false,showHeaderTitleText:i18n.t('agencyAuthorizationLetterText')})
      }
    }
    openCameraGallery = ()=>{
      this.setState({mediamodal:true})
    }

    closeCameraGallery = ()=>{
      this.setState({mediamodal:false})
    }

    updateSearchState = (licenseData:string)=>{
      const isAlphanumeric = /^[a-z0-9]+$/i.test(licenseData);
      if (isAlphanumeric) {
        this.setState({ licenseData: licenseData, licenseDataError: false });
      }  
    }
    // Customizable Area End
}
