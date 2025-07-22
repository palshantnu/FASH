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
import { showMessage } from "react-native-flash-message";

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
  selectImage:string;
  attachmentData:AttachmentsProps;
  selectImageError:boolean;
  imageFileName:string;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverProfilePhotoController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadDriverProfilePhotoApiCallId="";
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
      selectImage:'',
      attachmentData: { name: "", type: "", uri: "" },
      selectImageError:false,
      imageFileName:'',
      loading:false
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
        if (apiRequestCallId === this.uploadDriverProfilePhotoApiCallId) {
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
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

    // Customizable Area Start
    storeAfterSuccess = async(responseJson:ResponseProps)=>{
      if(responseJson)
      {
        showMessage({
            message: i18n.t('profilePhotoSuccessText'),
            position: { top: 0 },
        });
        this.props.navigation.goBack();
      }
    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    uploadProfilePhoto = async()=>{

        const header = {
            "Content-Type": configJSON.validationFormContentType,
            token: this.state.token
        };

        let profiledata: string | Blob = {
            'name': this.state.attachmentData.name,
            'type':  this.state.attachmentData.type,
            'uri':  this.state.attachmentData.uri
        } as unknown as Blob;
    
        let formdata = new FormData()
        formdata.append("profile_photo",profiledata);

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
          
        this.uploadDriverProfilePhotoApiCallId = requestMessage.messageId;

        requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.uploadDriverProfilePhotoApiEndPoint
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
          imageFileName:obj.filename ? obj.filename : 'image.jpg',
          selectImageError:false,
          attachmentData:objData
        })
      }).catch((error) => {
        this.setState({ selectImage: '' })
      })
    }
    // Customizable Area End
}
