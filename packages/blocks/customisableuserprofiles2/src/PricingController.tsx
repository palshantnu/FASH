import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
import { EmitterSubscription } from "react-native";
// Customizable Area Start
export interface ServiceAttributes {
  name: string;
  styling_per_week: number;
  discussion_time: string;
  voice_call_facility: boolean;
  video_call_facility: boolean;
  service_charges: number;
}

export interface Service {
  id: string;
  type: string;
  attributes: ServiceAttributes;
}

interface ServiceData {
  data: Service[];
}
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  apiData: ServiceData;
  selectedService: Service;
  tAndC: boolean;
  stylistId: string;
  isvalidCheck: boolean;
  errorMessage: string;
  localCurrency:string;
  isViewOnly: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class PricingController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPricingApiCallId: string = "";
  hireStylistApiCallId: string = "";
  createHireStylistChargesApiCallId: string = "";
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    this.state = {
      loading: false,
      apiData: {} as ServiceData,
      selectedService: {} as Service,
      tAndC: false,
      stylistId: "",
      isvalidCheck: false,
      errorMessage: "",
      localCurrency:'',
      isViewOnly: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const messageId = message.id;

  if (messageId === getName(MessageEnum.NavigationPayLoadMessage)) {
    this.handleNavigationPayloadMessage(message);
    return;
  }

  if (getName(MessageEnum.RestAPIResponceMessage) === messageId) {
    await this.handleRestAPIResponse(message);
  }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
      }
    );
    // Customizable Area End
  }

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };
  
  private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.Pricing));
    if (data != undefined) {
      this.setState({ stylistId: data.stylistId }, () => {
        this.fetchPricingData();
      });
      if (data.from === "price") {
        this.setState({ isViewOnly: true });
      }
    }
  }
  // Customizable Area End

  private async handleRestAPIResponse(message: Message) {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
  
    if (apiRequestCallId === this.getPricingApiCallId) {
      this.handlePricingApiResponse(responseJson);
    } else if (apiRequestCallId === this.hireStylistApiCallId) {
      this.handleHireStylistApiResponse(responseJson);
    } else if (apiRequestCallId === this.createHireStylistChargesApiCallId) {
      await this.handleCreateHireStylistChargesApiResponse(responseJson);
    }
  }
  
  private handlePricingApiResponse(responseJson: any) {
    this.setState({ loading: false });
  
    if (!responseJson.errors) {
      this.setState({
        apiData: responseJson,
        selectedService: responseJson.data[0],
      });
    }
  }
  
  private handleHireStylistApiResponse(responseJson: any) {
    if (!responseJson.errors) {
      this.createHireStylistCharges(responseJson.data.id);
    } else {
      this.setState({ loading: false });
    }
  }
  
  private async handleCreateHireStylistChargesApiResponse(responseJson: any) {
    this.setState({ loading: false });
  
    if (!responseJson.errors && !responseJson.error) {
      const token = await getStorageData("token", true);
  
      if (responseJson.transaction.url) {
        this.navigateToStylistPlan(responseJson.transaction.url, token, responseJson.id);
      }
    }
  }

  private navigateToStylistPlan(webUrl: string, token: string, chargeId: string) {
    const message = new Message(getName(MessageEnum.NavigationTapWebViewForStylistPlanMessage));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationTapWebViewForStylistPlanMessageData), {
      WebUrl: webUrl,
      token: token,
      chargeId: chargeId,
    });
    this.send(message);
  }

  toggleSelectedService = (service: Service) => {
    this.setState({ selectedService: service });
  }

  toggleTAndC = () => {
    this.setState({ tAndC: !this.state.tAndC , isvalidCheck : false, errorMessage: ""});
  }

  fetchPricingData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ loading: true });
    const header = {
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]: configJSON.pricingEndpoint + this.state.stylistId,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify(header),
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.apiMethodTypeGet
    });
    this.getPricingApiCallId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  createHireStylistCharges = async (id: string) => {
    const token = await getStorageData("token", true);
    const body = {
      data: {
        hire_request_id: parseInt(id),
        redirect_url: "/admin"
      }
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.createHireStylistChargesEndPoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: token,
        "Content-Type": "application/json",
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify(body),
    });

    this.createHireStylistChargesApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  }

  OpenTAndC = () => {
    const message = new Message(
      getName(MessageEnum.NavigationTermsAndConditionStylistPricingMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  navigateToYetToDevelop = async () => {
    if (!this.state.tAndC) {
      this.setState({
        isvalidCheck: true,
        errorMessage:
          `* ${i18n.t("pleaseAgreeToTheTermsAndConditions")}`,
      });
      return;
    }
    this.setState({ loading: true });
    const token = await getStorageData("token", true);
    const formData = new FormData();
    formData.append("stylist_id", this.state.stylistId);
    formData.append("service_informations_id", this.state.selectedService.id);
    formData.append("policy", `${this.state.tAndC}`);
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.hireStylistApiCallId = requestMessage.messageId;
    const header = {
      token: token
    };
    requestMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]: configJSON.hireStylistEndPoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify(header),
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: formData
    });

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}