import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from "react-native-document-picker";
import {isEmpty} from "../../../framework/src/Utilities"

interface AttachmentsUploadProps {
    type: string|null;
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
  token:string;
  loading:boolean;
  documentPickerModal:boolean;
  documentFileIdProof:string;
  documentFileIdLicense:string;
  chooseDocType:string;
  docIdRes:AttachmentsUploadProps;
  docLicenseRes:AttachmentsUploadProps;
  documentIdProofError:boolean;
  documentLicenseError:boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomformCreateUploadDocumentController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadDocumentCallApiId = "";
  // Customizable Area End
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token:'',
      loading:false,
      documentPickerModal:false,
      documentFileIdProof:'',
      documentFileIdLicense:'',
      chooseDocType:'id',
      docIdRes:{ name: "", type: "", uri: "" },
      docLicenseRes:{ name: "", type: "", uri: "" },
      documentIdProofError:false,
      documentLicenseError:false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.uploadDocumentCallApiId) {
          this.setState({loading:false})
          if(responseJson.errors === undefined)
          {
            this.afterDocumentProcess()
          }
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getTokenStore();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenStore();
    });
    // Customizable Area End
  }


  getTokenStore = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  openImageFile = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });

      if(this.state.chooseDocType === 'id')
      {
          this.setState({ documentFileIdProof: response.uri, documentPickerModal: false, docIdRes: response,documentIdProofError:false })
      }else{
          this.setState({ documentFileIdLicense: response.uri, documentPickerModal: false, docLicenseRes: response,documentLicenseError:false })
      }
    } catch (error) {
      this.setState({documentPickerModal:false})
      if (DocumentPicker.isCancel(error)) {
        runEngine.debugLog("Message Recived", "User Canceled Picker");
      } else {
        runEngine.debugLog("Message Recived", error);
      }
    }
  }

  uploadDocument = ()=>{
    if(isEmpty(this.state.documentFileIdProof))
    {
        this.setState({documentIdProofError:true})
        return false;
    }

    if(isEmpty(this.state.documentFileIdLicense))
    {
        this.setState({documentLicenseError:true})
        return false;
    }

    const header = {
    "Content-Type": configJSON.validationFormContentType,
    token: this.state.token
    };

    let profiledata: string | Blob = {
    'name': this.state.docIdRes.name,
    'type':  this.state.docIdRes.type,
    'uri':  this.state.docIdRes.uri
    } as unknown as Blob;

    let documentLicense: string | Blob = {
    'name': this.state.docLicenseRes.name,
    'type':  this.state.docLicenseRes.type,
    'uri':  this.state.docLicenseRes.uri
    } as unknown as Blob;

    let formdata = new FormData()
    formdata.append("id_proof",profiledata);
    formdata.append("license",documentLicense);

    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );
    this.uploadDocumentCallApiId = requestMessage.messageId;
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.uploadDocumentApiEndPoint
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

  afterDocumentProcess = ()=>{
    this.setState({
      documentFileIdProof:'',
      documentFileIdLicense:'',
      chooseDocType:'id',
      docIdRes:{ name: "", type: "", uri: "" },
      docLicenseRes:{ name: "", type: "", uri: "" },
    })
    const msg: Message = new Message(
        getName(MessageEnum.NavigationCustomformConfirmationMessage)
        );
  
      msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msg);
  }

  openModalAndSetValue = (value:string)=>{
    this.setState({documentPickerModal:true,chooseDocType:value})
  }

  launchCameraDoc = async (crop: any) => {
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

  CameraDocOpen = async () => {
    this.launchCameraDoc(true).then((obj: any) => {
      let finaldata = 'data:' + obj.mime + ';base64,' + obj.data
      let objData: AttachmentsUploadProps = {
        name: obj.filename ? obj.filename : 'image.jpg',
        type: obj.mime,
        uri: obj.path,
      };

      if(this.state.chooseDocType === 'id')
      {
          this.setState({ documentFileIdProof: finaldata, documentPickerModal: false, docIdRes: objData,documentIdProofError:false })
      }else{
          this.setState({ documentFileIdLicense: finaldata, documentPickerModal: false, docLicenseRes: objData,documentLicenseError:false })
      }
    }).catch((error) => {
      this.setState({ documentPickerModal: false })
    })
  }
  // Customizable Area End
}
