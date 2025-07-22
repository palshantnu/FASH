import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import {isEmail,isEmpty} from "../../../framework/src/Utilities"
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config';
interface AttachmentsProps {
  type: string;
  uri: string;
  name: string;
}

interface OrderAttributeProps {
  order_number: string;
}

interface OrderProps {
  id:string;
  attributes: OrderAttributeProps
}

interface DropdownItemProps {
  value:string;
}

export interface DropdownArrProps{
  label:string;
  value:string;
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
  contactUsType:string;
  token:string;
  name:string;
  email:string;
  subject:string;
  description:string;
  selectImage:string;
  nameError:boolean;
  emailError:boolean;
  subjectError:boolean;
  descriptionError:boolean;
  selectImageError:boolean;
  storeNameError:boolean;
  contactUsHeaderMessage:string;
  mediamodal:boolean;
  imageFileName:string;
  deliveredOrderArr:DropdownArrProps[];
  deliveredOrderArrDropdown:DropdownArrProps[];
  orderId:string;
  loading:boolean;
  attachmentData:AttachmentsProps;
  headerTitleShow:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ContactUsAddContactDriverController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getAllDeliveredOrderCallApiId:string = "";
  addContactUsDrivercallApiId:string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      contactUsType:'',
      token:'',
      name:'',
      email:'',
      subject:'',
      description:'',
      selectImage:'',
      nameError:false,
      emailError:false,
      subjectError:false,
      descriptionError:false,
      selectImageError:false,
      storeNameError:false,
      contactUsHeaderMessage:'',
      mediamodal:false,
      imageFileName:'',
      deliveredOrderArr:[],
      deliveredOrderArrDropdown:[],
      orderId:'0',
      loading:false,
      attachmentData: { name: "", type: "", uri: "" },
      headerTitleShow:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.getTokenAndValue(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )

      if (responseJson) {
        this.setState({loading:false})
        if (apiRequestCallId === this.getAllDeliveredOrderCallApiId) {
          let tempdeliveredOrderArr = []
          let storeResponse :OrderProps = responseJson.data
          for (const [_key, value_get] of Object.entries(storeResponse)) {
            tempdeliveredOrderArr.push({ label: value_get.attributes.order_number, value: value_get.id })
          }
          this.setState({ deliveredOrderArrDropdown: tempdeliveredOrderArr,loading:false,deliveredOrderArr:responseJson.data })
        }
        if (apiRequestCallId === this.addContactUsDrivercallApiId) {
          this.setState({name:'',email:'',subject:'',description:'',selectImage:'',attachmentData: { name: "", type: "", uri: "" },orderId:'0'})
          showMessage({
            message: i18n.t('contactUsSuccessText'),
            position: { top: 0 },
          });
          this.props.navigation.goBack();
        }
      }else{
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponse)
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

  getTokenAndValue = (message:Message)=>{
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    } 
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const contactUsType = message.getData(
        getName(MessageEnum.ContactUsTypeMessage)
      );

      const contactUsHeader = message.getData(
        getName(MessageEnum.ContactUsHeaderTitleMessage)
      );

      const contactUsToken = message.getData(
        getName(MessageEnum.ContactUsTokenMessage)
      );

      this.setState({contactUsType:contactUsType,contactUsHeaderMessage:contactUsHeader})
      if(contactUsType === 'deliveredOrder')
      {
        this.setState({headerTitleShow:i18n.t('deliverySpecificContactText')})
        this.getAllOrderDeliveredData(contactUsToken)
      }else{
        this.setState({headerTitleShow:i18n.t('payoutRelatedConcernText')})
      }
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

  launchGallery = async (crop: boolean) => {
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

  launchCamera = async (crop: boolean) => {
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

  Galleryopen = () => {
    this.launchGallery(true).then((objImage) => {
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
        imageFileName:imageResult.filename ? imageResult.filename : 'image.jpg',
        selectImageError:false,
        attachmentData:objData
      })
    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }

  Camerapopen = async () => {
    this.launchCamera(true).then((objImage) => {
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
        imageFileName:imageResult.filename ? imageResult.filename : 'image.jpg',
        selectImageError:false,
        attachmentData:objData
      })

    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }

  contactUsSubmitDriver = ()=>{
    let emailVerify = isEmail('',this.state.email);
    if(this.state.contactUsType === 'deliveredOrder')
    {
      if(this.state.orderId === '0')
      {
        this.setState({storeNameError:true})
        return false;
      }
    }
    if(isEmpty(this.state.name))
    {
      this.setState({nameError:true})
      return false;
    }
    if(isEmpty(this.state.email) || !emailVerify.status)
    {
      this.setState({emailError:true})
      return false;
    }
    if(isEmpty(this.state.subject))
    {
      this.setState({subjectError:true})
      return false;
    }
    if(isEmpty(this.state.description))
    {
      this.setState({descriptionError:true})
      return false;
    }

    if(isEmpty(this.state.selectImage))
    {
      this.setState({selectImageError:true})
      return false;
    }

   
    this.afterCallApiDriver()
  }

  afterCallApiDriver = () =>{
    const header = {
      "Content-Type": configJSON.apiContentTypeFormdata,
      token: this.state.token
    };

    let imageData: string | Blob = {
      'name': this.state.attachmentData.name,
      'type':  this.state.attachmentData.type,
      'uri':  this.state.attachmentData.uri
    } as unknown as Blob;

    let formdata = new FormData()
    if(this.state.contactUsType === 'deliveredOrder')
    {
      formdata.append("data[query_type]","Delivery-Specific Concerns");
      formdata.append("data[order_management_order_id]",this.state.orderId)
    }else{
      formdata.append("data[query_type]","Payout-Related Concerns")
    }
    formdata.append("data[name]",this.state.name)
    formdata.append("data[email]",this.state.email)
    formdata.append("data[subject]",this.state.subject)
    formdata.append("data[description]",this.state.description)
    formdata.append("data[image]", imageData);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addContactUsDrivercallApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addContactApiEndPoint
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
      configJSON.httpPostMethod
    );
    this.setState({loading:true})
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  selectOrder = (item:DropdownItemProps)=>{
    this.setState({orderId:item.value,storeNameError:false})
  }

  getAllOrderDeliveredData = async(token:string)=>{  
    const header = {
      "Content-Type": configJSON.contactUsApiContentType,
      token:token
    };
  
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
  
    this.getAllDeliveredOrderCallApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getDriverOrderApiEndPoint
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
  
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );
  
    this.setState({ loading: true })
  
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  onNameChange = (name:string)=>{
    this.setState({ name: name,nameError:false });
  }

  onEmailChange = (email:string)=>{
    this.setState({ email: email,emailError:false });
  }

  onSubjectChange = (subject:string)=>{
    this.setState({ subject: subject,subjectError:false });
  }

  onDescriptionChange = (description:string)=>{
    this.setState({ description: description,descriptionError:false });
  }

  mediaModalOpen = ()=>{
    this.setState({mediamodal:true})
  }

  mediaModalClose = ()=>{
    this.setState({mediamodal:false})
  }
  // Customizable Area End
}
