import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import i18n from '../../../components/src/i18n/i18n.config';
import {isEmpty} from "../../../framework/src/Utilities"
import { showMessage } from "react-native-flash-message";

interface ResponseProps {
  exists:boolean;
  errors:[{
    registration_number:string;
  }]
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
  selectCivilIdFrontImage:string;
  attachmentData:AttachmentsProps;
  selectCivilIdFrontImageError:boolean;
  selectCivilIdBackImage:string;
  attachmentCivilIdData:AttachmentsProps;
  selectCivilIdBackImageError:boolean;
  selectCivilIdBackImageErrorMsg:string;
  selectPassportFrontImage:string;
  attachmentPassportFrontData:AttachmentsProps;
  selectPassportBackImage:string;
  attachmentPassportBackData:AttachmentsProps;
  loading:boolean;
  headerTitleMessage:string;
  photoErrorMessage:string;
  successMessageShow:string;
  inputFieldShow:boolean;
  selectCivilIdFrontImageType:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverCivilPassportController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadDriverCivilPassportApiCallId="";
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
        selectCivilIdFrontImage:'',
        attachmentData: { name: "", type: "", uri: "" },
        selectCivilIdFrontImageError:false,
        selectCivilIdBackImage:'',
        attachmentCivilIdData: { name: "", type: "", uri: "" },
        selectCivilIdBackImageError:false,
        selectCivilIdBackImageErrorMsg:'',
        selectPassportFrontImage:'',
        attachmentPassportFrontData: { name: "", type: "", uri: "" },
        selectPassportBackImage:'',
        attachmentPassportBackData: { name: "", type: "", uri: "" },
        loading:false,
        headerTitleMessage:'',
        photoErrorMessage:'',
        successMessageShow:'',
        inputFieldShow:false,
        selectCivilIdFrontImageType:'',
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
        if (apiRequestCallId === this.uploadDriverCivilPassportApiCallId) {
          this.setState({loading:false})
          this.uploadAfterSuccessCivilPassport(responseJson)
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getTokenDriverCivilPassport();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenDriverCivilPassport();
    });
    // Customizable Area End
  }

    // Customizable Area Start
    uploadAfterSuccessCivilPassport = async(responseJson:ResponseProps)=>{
      if(responseJson.errors === undefined)
      {
        showMessage({
          message: i18n.t('civilIdPassportSubmitSuccessText'),
          position: { top: 0 },
        });
        this.setState({photoErrorMessage:'',successMessageShow:'',selectCivilIdFrontImage:'',attachmentData: { name: "", type: "", uri: "" },selectCivilIdFrontImageError:false,selectCivilIdBackImage:'',selectCivilIdBackImageError:false,attachmentCivilIdData:{ name: "", type: "", uri: "" },attachmentPassportFrontData:{ name: "", type: "", uri: "" },attachmentPassportBackData:{ name: "", type: "", uri: "" }})
        this.props.navigation.goBack()
      }else{
          this.setState({selectCivilIdBackImageError:true,selectCivilIdBackImageErrorMsg:'* '+responseJson.errors[0]?.registration_number})
        }
    }

    getTokenDriverCivilPassport = () => {
        const msgToken: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msgToken);
    };

    btnUploadCivilPassport = async()=>{        
        if(isEmpty(this.state.selectCivilIdFrontImage))
        {
            this.setState({selectCivilIdFrontImageError:true,photoErrorMessage:i18n.t('pleaseSelectCivilFrontPhoto')})
            return false;
        }

        if(isEmpty(this.state.selectCivilIdBackImage))
        {
            this.setState({selectCivilIdBackImageError:true,selectCivilIdBackImageErrorMsg:i18n.t('pleaseSelectCivilBackPhoto')})
            return false;
        }

        let civilFrontImagedata: string | Blob = {
            'name': this.state.attachmentData.name,
            'type':  this.state.attachmentData.type,
            'uri':  this.state.attachmentData.uri
        } as unknown as Blob;

        let civilBackImageData: string | Blob = {
            'name': this.state.attachmentCivilIdData.name,
            'type':  this.state.attachmentCivilIdData.type,
            'uri':  this.state.attachmentCivilIdData.uri
        } as unknown as Blob;

        let passportFrontImageData: string | Blob = {
            'name': this.state.attachmentPassportFrontData.name,
            'type':  this.state.attachmentPassportFrontData.type,
            'uri':  this.state.attachmentPassportFrontData.uri
        } as unknown as Blob;

        let passportBackImageData: string | Blob = {
            'name': this.state.attachmentPassportBackData.name,
            'type':  this.state.attachmentPassportBackData.type,
            'uri':  this.state.attachmentPassportBackData.uri
        } as unknown as Blob;

        let formdata = new FormData()
        formdata.append("civil_id_front_photo",civilFrontImagedata);
        formdata.append("civil_id_back_photo",civilBackImageData);
        if(this.state.selectPassportFrontImage != '')
        {
            formdata.append("passport_front_photo",passportFrontImageData);
        }
        if(this.state.selectPassportBackImage != '')
        {
            formdata.append("passport_back_photo",passportBackImageData);
        }

        const header = {
            "Content-Type": configJSON.validationFormContentType,
            token: this.state.token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        
        this.uploadDriverCivilPassportApiCallId = requestMessage.messageId;

        requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.uploadCivilOrPassportApiCallId
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
        configJSON.sellerDetailsAPIMethodPOST
        );

        this.setState({loading:true})
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    launchGallery = async (crop: boolean) => {
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
      this.launchGallery(true).then((objImage) => {
        const imageResult = objImage as Image
        this.updateImageGalleryCivilData(imageResult)
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

    updateImageGalleryCivilData = (objImage:Image)=>{
        let finaldata = 'data:' + objImage.mime + ';base64,' + objImage.data

        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: objImage.mime,
          uri: objImage.path,
        };

        if(this.state.selectCivilIdFrontImageType === 'first')
        {
            this.setState({
              selectCivilIdFrontImage: finaldata,
              mediamodal: false,
              selectCivilIdFrontImageError:false,
              attachmentData:objData
            })
        }else if(this.state.selectCivilIdFrontImageType === 'second')
        {
            this.setState({
              selectCivilIdBackImage: finaldata,
              mediamodal: false,
              selectCivilIdBackImageError:false,
              attachmentCivilIdData:objData
            })
        }else if(this.state.selectCivilIdFrontImageType === 'third')
        {
            this.setState({
              selectPassportFrontImage: finaldata,
              mediamodal: false,
              attachmentPassportFrontData:objData
            })
        }
        else{
            this.setState({
            selectPassportBackImage: finaldata,
            mediamodal: false,
            attachmentPassportBackData:objData
            })
        }
  
    }
  
    Camerapopen = async () => {
      this.launchCamera(true).then((objImage) => {
        const imageResultCamera = objImage as Image
        this.updateImageGalleryCivilData(imageResultCamera)
      }).catch((error) => {
        this.setState({ mediamodal: false })
      })
    }

    openCameraGallery = (imageType:string)=>{
      this.setState({mediamodal:true,selectCivilIdFrontImageType:imageType})
    }

    closeCameraGallery = ()=>{
      this.setState({mediamodal:false})
    }
    // Customizable Area End
}
