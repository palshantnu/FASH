import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { MyStoreDetail, StoreInfoAttributes,StoreInfoAllAttributes,MyStoreDetailAllData } from "./response";
import { setStorageData } from "../../../framework/src/Utilities";
import i18n from '../../../components/src/i18n/i18n.config'
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
  loading: boolean;
  token: string;
  storeId: string;
  storeInfo: StoreInfoAttributes;
  storeInfoAll:StoreInfoAllAttributes;
  refreshing:boolean;
  languageUpdate:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MyStoreDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getStoreInfoApiId = "";
  updateStoreStatusApiCallId = "";
  getStoreInfoAllApiId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: true,
      token: "",
      storeId: "",
      storeInfo: {} as StoreInfoAttributes,
      storeInfoAll:{} as StoreInfoAllAttributes,
      refreshing:false,
      languageUpdate:i18n.language
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      this.handleTokenResponse(message);
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.handleNavigationPayload(message);
    }
    if (getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.getToken();
  };

  getToken = () => {
    const tokenMessage: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMessage);
  };

  handleTokenResponse = (message: Message) => {
    const token = message.getData(getName(MessageEnum.SessionResponseToken));
    this.setState({ token }, () => {
      if (this.state.storeId && !("store_name" in this.state.storeInfo)) {
        this.getStoreInfo(this.state.storeId, token);
        this.getStoreInfoForAllData(this.state.storeId, token)
      }
    });
  };

  handleNavigationPayload = (message: Message) => {
    const storeId = message.getData(
      getName(MessageEnum.NavigationPayloadMyStoreIdMessage)
    );
    if (storeId) {
      this.setState({ storeId }, () => {
         setStorageData('storeId', storeId)
        if (this.state.token && !("store_name" in this.state.storeInfo)) {
          this.getStoreInfo(storeId, this.state.token);
          this.getStoreInfoForAllData(storeId, this.state.token)
        }
      });
    }
  };

  handleRestApiResponses = (message: Message) => {
    const apiId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const response = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const error = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (response && !error) {
      this.handleSuccess(response, apiId);
    } else {
      this.parseApiCatchErrorResponse(error);
    }
  };

  handleSuccess = (_response: unknown, id: string) => {
    if (id === this.getStoreInfoApiId) {
      const response = _response as MyStoreDetail;
      if ("data" in response) {
        this.setState({
          loading: false,
          storeInfo: response.data.attributes,
        });
        return;
      }
    }
    if (id === this.getStoreInfoAllApiId) {
      const response = _response as MyStoreDetailAllData;
      if ("data" in response) {
        this.setState({
          loading: false,
          storeInfoAll: response.data.attributes,
        });
        return;
      }
    }
    if (id === this.updateStoreStatusApiCallId) {
      const response = _response as MyStoreDetail | { error: string };
      if ("error" in response) {
        this.setState({ loading: false });
        return showMessage({
          message: response.error,
          type: "warning",
          position: { top: 8 },
        });
      }
      if ("data" in response) {
        showMessage({
          message: i18n.t('storeUpdateSuccessText'),
          position: { top: 8 },
          type: "success",
        });
        return this.setState(
          ({ storeInfo }) => ({
            storeInfo: { ...storeInfo, is_open: !storeInfo.is_open },
            loading: false,
          }),
          () => {this.getStoreAllData()}
        );
      }
    }
  };

  getStoreAllData = ()=>{
    this.getStoreInfo(this.state.storeId, this.state.token)
    this.getStoreInfoForAllData(this.state.storeId, this.state.token)
  }

  getStoreInfo = (storeId: string | number, token: string) => {
    let endPointManage = '';
    if(this.state.languageUpdate === 'en')
    {
      endPointManage = configJSON.getShopdetailAPIEndpoint+storeId
    }else{
      endPointManage = configJSON.getShopdetailAPIEndpoint+storeId+'?language=ar'
    }
    const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getStoreInfoApiId = msg.messageId;
    msg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
      endPointManage,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token,
      }),
    });
    runEngine.sendMessage(msg.id, msg);
  };

  getStoreInfoForAllData = (storeId: string | number, token: string) => {
    const msgRequest = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getStoreInfoAllApiId = msgRequest.messageId;
    msgRequest.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
      configJSON.getShopdetailAPIEndpoint+storeId+"?all_data=true",
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token,
      }),
    });
    runEngine.sendMessage(msgRequest.id, msgRequest);
  };

  toggleStoreStatus = (storeId: string | number, status: boolean) => {
    this.setState({ loading: true });
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.changeStoreStatusEndpoint +
        `?id=${storeId}&status=${!status}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.httpPutMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.updateStoreStatusApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
  };

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  parseStoreTime = (time: StoreInfoAttributes["store_operating_hours"]) => {
    if (!time || typeof time !== 'object') return '';
  
    return Object.keys(time)
      .filter((v) => time[v] && time[v].is_open)
      .map(
        (v) => `${time[v].open} - ${time[v].close} For ${this.capitalize(v)}`
      )
      .join("\n");
  };

  goToCategoriesScreen = () => {
    const msg = new Message(getName(MessageEnum.NavigationCategoriesMessage));
    msg.initializeFromObject({
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.ShowByStoreId)]: this.state.storeId,
      [getName(MessageEnum.catalogueType)]: "categories",
    });
    this.send(msg);
  };

  goToInventoryManagementScreen = () => {
    const msg = new Message(getName(MessageEnum.NavigationInventoryManagement));
    msg.initializeFromObject({
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.ShowByStoreId)]: this.state.storeId,
    });
    this.send(msg);
  };

  goToOffersAndDiscounts = ()=>{
    const msgss: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    msgss.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'Promocodes' 
    );
    msgss.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    )
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), {
      storeId:this.state.storeId,
     
           
    });
    msgss.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgss);
     
  }

  yetToBeDeveloped = () => {
    showMessage({
      message: i18n.t('thisFeatureNotDev'),
      position: { top: 8 },
      type: "info",
    });
  };

  manageTimingRedirection = ()=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationManageTimingsMessage)
    );

    msg.addData(getName(MessageEnum.ManageTimingStoreIdPayloadMessage), this.state.storeId);

    msg.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msg);
  }

  editStoreDetailRedirection = ()=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEditStoreDetailMessage)
    );

    msg.addData(getName(MessageEnum.ManageTimingStoreIdPayloadMessage), this.state.storeId);

    msg.addData(getName(MessageEnum.StoreDetailsPayloadMessage), this.state.storeInfoAll);

    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(msg);
  }

  refreshData = ()=>{
    this.setState({refreshing:true})
    this.getStoreInfo(this.state.storeId,this.state.token)
    this.getStoreInfoForAllData(this.state.storeId, this.state.token)
    setTimeout(() => {
      this.setState({refreshing:false})
    }, 2000);
  }
  // Customizable Area End
}
