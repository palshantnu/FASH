import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
import { removeStorageData } from "../../../framework/src/Utilities";
export interface DriverDocStatusProps {
  profile_photo_status: string;
  license_status: string;
  vehicle_registration_status: string;
  bank_detail_status: string;
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
  loading:boolean;
  storeId:string;
  driverDocumentStatus:DriverDocStatusProps;
  fromProfile:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverDocumentController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getDriverDocumentSubApiCallId = "";
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
      loading:false,
      storeId:'0',
      driverDocumentStatus:{
        profile_photo_status: '',
        license_status: '',
        vehicle_registration_status: '',
        bank_detail_status: ''
      },
      fromProfile: false,
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
      this.getDriverDocumentStatus(token)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleStoreApiResponses(message);
    }
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(
        getName(MessageEnum.BidYourQuote)
      );
      if(data.from == "Profile"){
        this.setState({fromProfile:true})
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenDriverDocument();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenDriverDocument();
    });
    // Customizable Area End
  }

  handleStoreApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.getDriverDocumentSubApiCallId) {
        this.setState({loading:false})
        if(responseJson.errors === undefined)
        {
          this.setState({driverDocumentStatus:responseJson})
        }
      }
    }
  }

    getTokenDriverDocument = () => {
      const msgToken: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msgToken);
    };

    btnLogoutConfirm = ()=>{
      if (this.state.fromProfile) {
        this.props.navigation.goBack();
        return;
      }
      removeStorageData('storeAddressMap')
      removeStorageData('createStoreArr')
      removeStorageData('buyerAddAddressMap')
      removeStorageData('token')
      removeStorageData('autoLogin')
      const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationLoginOptionsMessage)
      );
  
      msgNavigation.addData(
          getName(MessageEnum.NavigationPropsMessage),
          this.props
      );
  
      const sessionMessage = new Message(getName(MessageEnum.SessionSaveMessage));
      sessionMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseData)]: {},
        [getName(MessageEnum.SessionResponseToken)]: null
      })
  
      this.send(sessionMessage);
  
      this.send(msgNavigation);
    }

    getDriverDocumentStatus = (token:string) => {
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverDocumentSubApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverDocumentApiEndPoint
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

    btnRedirectDriverPhoto = ()=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationDriverProfilePhotoMessage)
        );
  
      msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msgNavigation);
    }

    btnRedirectDocumentUpload = (documentType:string)=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationDriverDocumentUploadMessage)
      );
  
      msgNavigation.addData(getName(MessageEnum.ManageDriverDocumentType), documentType);
  
      msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );
  
      this.send(msgNavigation);
    }

    statusColorManage = (statusGet:string)=>{
      if(statusGet === 'Approved'){
        return '#059669';
      }else if(statusGet === 'In Review')
      {
        return '#F59E0B';
      }else if(statusGet === 'Submit Again Not Approved'|| statusGet === 'Under Review')
      {
        return '#DC2626';
      }else{
        return '#94A3B8';
      }
    }

    btnRedirectAddVehicleDriver = ()=>{
      const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationSelectVehicle)
        );
      msgNavigation.addData(getName(MessageEnum.AddVehiclePageNamePayloadMessage), 'Add Vehicle');
      msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msgNavigation);
    }

    btnRedirectAddBankDriver = ()=>{
      const msgNavigationDriver: Message = new Message(
        getName(MessageEnum.NavigationTappaymentAddBank)
        );
  
      msgNavigationDriver.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msgNavigationDriver);
    }

    statusAccordingTextManage = (statusGet:string)=>{
      if(statusGet === 'Approved'){

        return i18n.t('approvedText');

      }else if(statusGet === 'In Review')
      {

        return i18n.t('inReviewText');

      }else if(statusGet === 'Submit Again Not Approved')
      {
        return i18n.t('submitAgainApprovedText');
      }else{

        return statusGet;
        
      }
    }
  // Customizable Area End
}
