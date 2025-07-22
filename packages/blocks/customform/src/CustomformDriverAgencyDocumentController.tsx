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
export interface DriverAgencyDocStatusProps {
  profile_photo_status: string;
  license_status: string;
  vehicle_registration_status: string;
  bank_detail_status: string;
  civil_id_passport_status: string;
  agency_authorization_letter_status:string;
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
  driverAgencyDocumentStatus:DriverAgencyDocStatusProps
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverAgencyDocumentController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getDriverAgencyDocumentApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.NavigationPayLoadMessage),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      token: "",
      loading:false,
      driverAgencyDocumentStatus:{
        profile_photo_status: '',
        license_status: '',
        vehicle_registration_status: '',
        bank_detail_status: '',
        civil_id_passport_status: '',
        agency_authorization_letter_status:''
      }
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
      this.getDriverAgencyDocumentStatus(token)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleAgencyDocumentApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenDriverAgencyDocument();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenDriverAgencyDocument();
    });
    // Customizable Area End
  }

  handleAgencyDocumentApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.getDriverAgencyDocumentApiCallId) {
        this.setState({loading:false})
        if(responseJson.errors === undefined)
        {
          this.setState({driverAgencyDocumentStatus:responseJson})
        }
      }
    }
  }

    getTokenDriverAgencyDocument = () => {
      const msg: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msg);
    };

    getDriverAgencyDocumentStatus = (token:string) => {
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverAgencyDocumentApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverAgencyApiCallId
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

    btnRedirectContact = ()=>{
        const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationContactUsDriverMessage)
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

    statusColorManageAgency = (statusGet:string)=>{
      if(statusGet === 'Approved'){
        return '#059669';
      }else if(statusGet === 'In Review')
      {
        return '#F59E0B';
      }else if(statusGet === 'Submit Again' || statusGet === 'Under Review')
      {
        return '#DC2626';
      }else{
        return '#94A3B8';
      }
    }

    btnRedirectDriverAgenecyPhoto = ()=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationDriverProfilePhotoMessage)
        );
  
      msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msgNavigation);
    }

    btnRedirectAddVehicleDocumentUpload = ()=>{
      const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationSelectVehicle)
        );
      msgNavigation.addData(getName(MessageEnum.AddVehiclePageNamePayloadMessage), 'Add Vehicle');
      msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msgNavigation);
    }

    btnRedirectCivilIdPass = ()=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationDriverCivilPassportMessage)
        );
  
      msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msgNavigation);
    }

    btnRedirectAddBank = ()=>{
      const msgNavigation: Message = new Message(
        getName(MessageEnum.NavigationTappaymentAddBank)
        );
  
      msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
      );

      this.send(msgNavigation);
    }

    statusReturnAgency = (statusGet:string)=>{
      if(statusGet === 'Approved'){
        return i18n.t('approvedText');
      }else if(statusGet === 'In Review')
      {
        return i18n.t('inReviewText');
      }else if(statusGet === 'Submit Again')
      {
        return i18n.t('submitAgainText');
      }else{
        return statusGet
      }
    }
    LogOutAction = ()=>{
      removeStorageData('createStoreArr')
      removeStorageData('storeAddressMap')
      removeStorageData('autoLogin')
      removeStorageData('token')
      removeStorageData('buyerAddAddressMap')
      const navMsg: Message = new Message(
          getName(MessageEnum.NavigationLoginOptionsMessage)
      );
      
      const sessionMsg = new Message(getName(MessageEnum.SessionSaveMessage));
      navMsg.addData(
          getName(MessageEnum.NavigationPropsMessage),
          this.props
      );
  
      sessionMsg.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: null,
        [getName(MessageEnum.SessionResponseData)]: {}
      })
  
      this.send(sessionMsg);
  
      this.send(navMsg);
    }
  // Customizable Area End
}
