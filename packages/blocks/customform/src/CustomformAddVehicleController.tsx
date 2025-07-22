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
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';

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
  selectImage:string;
  attachmentData:AttachmentsProps;
  selectImageError:boolean;
  selectInsuranceImage:string;
  attachmentInsuranceData:AttachmentsProps;
  selectInsuranceImageError:boolean;
  selectInsuranceImageErrorMsg:string;
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
  selectImageType:string;
  vehicleType:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformAddVehicleController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadDriverAddVehicleApiCallId="";
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
        selectInsuranceImage:'',
        attachmentInsuranceData: { name: "", type: "", uri: "" },
        selectInsuranceImageError:false,
        selectInsuranceImageErrorMsg:'',
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
        selectImageType:'',
        vehicleType:''
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
    
      const vehicleType = message.getData(
        getName(MessageEnum.AddVehicleTypePayloadMessage)
      )
      this.setState({vehicleType:vehicleType})
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.uploadDriverAddVehicleApiCallId) {
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
      if(responseJson.errors === undefined)
      {
        showMessage({
          message: i18n.t('vehicleAddSuccessfullyText'),
          position: { top: 0 },
        });
        this.setState({inputLabel:'',inputPlaceholderLabel:'',photoBoxTitle:'',photoSubTitle:'',licenseDataErrorMessage:'',photoErrorMessage:'',successMessageShow:'',selectImage:'',attachmentData: { name: "", type: "", uri: "" },selectImageError:false,selectInsuranceImage:'',selectInsuranceImageError:false,attachmentInsuranceData:{ name: "", type: "", uri: "" }})
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationDriverShowVehicleMessage)
        );
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
      }else{
          this.setState({selectInsuranceImageError:true,selectInsuranceImageErrorMsg:'* '+responseJson.errors[0]?.registration_number})
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

    btnAddVehicle = async()=>{
        if(isEmpty(this.state.licenseData))
        {
            this.setState({licenseDataError:true})
            return false;
        }

        
        if(isEmpty(this.state.selectImage))
        {
            this.setState({selectImageError:true,photoErrorMessage:i18n.t('pleaseSelectVehicleRegPhoto')})
            return false;
        }

        if(isEmpty(this.state.selectInsuranceImage))
        {
            this.setState({selectInsuranceImageError:true,selectInsuranceImageErrorMsg:i18n.t('pleaseSelectInsuranceError')})
            return false;
        }

        let profiledata: string | Blob = {
            'name': this.state.attachmentData.name,
            'type':  this.state.attachmentData.type,
            'uri':  this.state.attachmentData.uri
        } as unknown as Blob;

        let insuranceImageData: string | Blob = {
            'name': this.state.attachmentInsuranceData.name,
            'type':  this.state.attachmentInsuranceData.type,
            'uri':  this.state.attachmentInsuranceData.uri
        } as unknown as Blob;

        let formdata = new FormData()
        formdata.append("registration_number",this.state.licenseData);
        formdata.append("vehicle_registration",profiledata);
        formdata.append("vehicle_insurance_file",insuranceImageData);
        formdata.append("vehicle_type",this.state.vehicleType);

        const header = {
            "Content-Type": configJSON.validationFormContentType,
            token: this.state.token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        
        this.uploadDriverAddVehicleApiCallId = requestMessage.messageId;

        requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getDriverAllVehicleApiEndPoint
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
        this.updateImageGalleryData(imageResult)
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

    updateImageGalleryData = (objImage:Image)=>{
        let finaldata = 'data:' + objImage.mime + ';base64,' + objImage.data

        let objData: AttachmentsProps = {
          name: "profile.jpg",
          type: objImage.mime,
          uri: objImage.path,
        };

        if(this.state.selectImageType === 'first')
        {
      
            this.setState({
              selectImage: finaldata,
              mediamodal: false,
              selectImageError:false,
              attachmentData:objData
            })
        }else{
        
              this.setState({
                selectInsuranceImage: finaldata,
                mediamodal: false,
                selectInsuranceImageError:false,
                attachmentInsuranceData:objData
              })
        }
  
    }
  
    Camerapopen = async () => {
      this.launchCamera(true).then((objImage) => {
        const imageResultCamera = objImage as Image
        this.updateImageGalleryData(imageResultCamera)
      }).catch((error) => {
        this.setState({ mediamodal: false })
      })
    }

    openCameraGallery = (imageType:string)=>{
      this.setState({mediamodal:true,selectImageType:imageType})
    }

    closeCameraGallery = ()=>{
      this.setState({mediamodal:false})
    }

    updateSearchState = (licenseData:string)=>{
      this.setState({ licenseData: licenseData,licenseDataError:false });
    }
    // Customizable Area End
}
