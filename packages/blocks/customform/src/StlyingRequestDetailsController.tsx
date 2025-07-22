// Customizable Area Start
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { fashionOne, fashionThree, fashionTwo } from "./assets";
import { ImageSourcePropType } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
import { IBlock } from "../../../framework/src/IBlock";
import i18n from "../../../components/src/i18n/i18n.config";
const navigation = require("react-navigation");

// Customizable Area End

export const configJSON = require("./config");
// Customizable Area Start
type StatusType = string | null | undefined;
interface Image {
  url: string;
}

interface Attributes {
  stylist_id: number;
  gender: string;
  colour: string;
  detail: string;
  min_price: number;
  max_price: number;
  status: string | null;
  buyer_name: string;
  buyer_profile: string | null;
  buyer_id : string;
  stylist_name: string;
  stylist_profile: string;
  images: Image[];
  created_at:string;
}

interface Data {
  id: string;
  type: string;
  attributes: Attributes;
}

interface HireStylistCustomForm {
  data: Data;
  errors:object
}

// Customizable Area End
export interface Props {
  // Customizable Area Start
  navigation: typeof navigation;
  // Customizable Area End
}
// Customizable Area End
interface S {
  // Customizable Area Start
  imagesData: ImageSourcePropType[]
  isLoading: boolean;
  stylishId: string;
  stylishData: HireStylistCustomForm | null;
  onUpdateList?: () => void | undefined;
  screenType: string;
  localCurrency:string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class StlyingDetailsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  stylingDetailsApiCallID: string = '';
  stylishStatusApiCallID: string = '';
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    // Customizable Area Start
    this.state = {
      imagesData: [fashionOne, fashionThree, fashionTwo],
      isLoading: false,
      stylishId: '',
      stylishData: null,
      onUpdateList: () => { },
      screenType:'StylingList',
      localCurrency:""
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

      async componentDidMount() {
        super.componentDidMount();
        // Customizable Area Start
       const {param1,callBack,type} = this.props.navigation.state.params
       this.setState({
        stylishId: param1,
        isLoading: true,
        onUpdateList: callBack(),
        screenType:type
      }, () => {
        this.getStylingRequestDetails();
      });
      this.props.navigation.addListener("willFocus", async() => {
        let currencyGet = await getStorageData('currencyIcon', true)
        this.setState({ localCurrency: currencyGet })
      });
        // Customizable Area End
    }

  async receive(from: string, message: Message) {
    // Customizable Area Start 
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleRestAPIResponseMessage(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  // Chunk 1: Handling navigation payload message
  handleNavigationPayloadMessage(message: Message) {
    const data = message.getData(getName(MessageEnum.SessionResponseData));
    this.setState({
      stylishId: data.param1,
      isLoading: true,
      onUpdateList: data.callBack(),
      screenType:data.type || 'StylingList'
    }, () => {
      this.getStylingRequestDetails();
    });
  }
  //2
  handleRestAPIResponseMessage(message: Message) {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

    if (apiRequestCallId != null) {
      if (responseJson && !responseJson.errors) {
        this.handleSuccessfulResponse(apiRequestCallId, responseJson);
      } else {
        this.handleErrorResponse(apiRequestCallId, responseJson);
      }
    }
  }

  // Chunk 3: Handling successful responses
  handleSuccessfulResponse(apiRequestCallId: string, responseJson: HireStylistCustomForm) {
    if (apiRequestCallId === this.stylingDetailsApiCallID) {
      this.getDetailsSuccessResponse(responseJson);
    }
    if (apiRequestCallId === this.stylishStatusApiCallID) {
      this.updateStatusSuccessResponse(responseJson);
    }
  }

  // Chunk 4: Handling error responses
  handleErrorResponse(apiRequestCallId: string, responseJson: HireStylistCustomForm) {
    if (apiRequestCallId === this.stylingDetailsApiCallID) {
      this.getDetailsFailureResponse(responseJson);
    }
    if (apiRequestCallId === this.stylishStatusApiCallID) {
      this.updateStatusFailureResponse(responseJson);
    }
  }
  getDetailsSuccessResponse = (response: HireStylistCustomForm) => {
    this.setState({ isLoading: false, stylishData: response })

  }
  getDetailsFailureResponse = (error: object) => {
    this.setState({ isLoading: false, stylishData: null })
  }
  updateStatusSuccessResponse = (response: object) => {
    this.setState({ isLoading: false }, () => {
      this.getStylingRequestDetails()
    })
  }
  updateStatusFailureResponse = (error: object) => {
    this.setState({ isLoading: false })
  }

  apiCall = async (data: any) => {
    this.setState({ isLoading: true })
    let token = await getStorageData('token', true)
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body && type !== "formData"
      ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      :
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getStylingRequestDetails = async () => {
    this.setState({ isLoading: true })
    this.stylingDetailsApiCallID = await this.apiCall({
      method: configJSON.validationApiMethodType,
      endPoint: `${configJSON.stylingRequestPoint}/${this.state.stylishId}`,
      contentType: configJSON.validationApiContentType,
    })
  }

  isAccept = async (status: string) => {
    let formData = new FormData();
    this.setState({
      isLoading: true
    })
    formData.append('status', status)
    this.stylishStatusApiCallID = await this.apiCall({
      method: configJSON.updateAPiMethod,
      endPoint: `bx_block_custom_form/hire_stylist_custom_forms/${this.state.stylishId}/update_status`,
      body: formData,
      type: 'formData'
    })
  };
  getScreenName() {
    let screenName = '';
    
    if (this.state.screenType === 'ClientTab') {
      screenName = 'ClientsAndChatTab';
    } else if (this.state.screenType === 'Dashboard') {
      screenName = 'stylistDashboard';
    } else {
      screenName = 'StylingRequestList';
    }

    return screenName;
  }

  goBack = async () => {
    if (this.state.onUpdateList) {
      if (typeof this.state.onUpdateList === 'function') {
        this.state.onUpdateList();
      }
      
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), this.getScreenName());
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
      const raiseMessage: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
      this.send(message)
    }
  };


  getStatusBackgroundColor = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return '#D1FAE5';
      case 'accepted':
        return '#FFE7D0';
      case 'rejected':
        return '#eb9696';
      default: return '#ffffff';

    }
  }
  getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return '#059669';
      case 'accepted':
        return '#BE5B00';
      case 'rejected':
        return '#de1212';
      default: return '#ffffff';

    }
  }
  getStatus = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return i18n.t('new_request');
      case 'accepted':
        return i18n.t('accepted');
      case 'rejected':
        return i18n.t('rejected');
      default: return '';

    }
  }

  navigateToChat = (userID: any) => {
    const messageDetail: Message = new Message(
      getName(MessageEnum.NavigationMessage)
  );
  messageDetail.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'Chat'
  );
  messageDetail.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

  const raiseMessageDetail: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
  );

  raiseMessageDetail.addData(getName(MessageEnum.SessionResponseData), {
      userID
  });
  messageDetail.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageDetail);
  this.send(messageDetail);
  }
  // Customizable Area End
}
