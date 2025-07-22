import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert, Linking } from "react-native";
import moment from "moment";
import { getStorageData } from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
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
  analyticsData: any;
  catalogueId: string;
  loading: boolean;
  filter: string;
  formattedFromDate: string;
  formattedToDate: string;
  isModal: boolean;
  selectedValue: string;
  downloadData: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ProductAnalyticsController extends BlockComponent<Props, S, SS> {
  getDataId: string = "";
  getDownloadFileId: string = "";
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      analyticsData: "",
      catalogueId: "",
      loading: false,
      filter: "",
      formattedFromDate: "",
      formattedToDate: "",
      isModal: false,
      selectedValue: "",
      downloadData: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    this.handleNavigationPayload(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getDataId) {
        this.setState({
          analyticsData: responseJson?.data, 
          loading: false
        });

        if (responseJson?.error) {
          Alert.alert(
            'Error',
            responseJson?.error,
          );
        }
      }
      if (apiRequestCallId === this.getDownloadFileId) {
        this.setState({
          downloadData: responseJson,
        });
        if (responseJson.url) {
          showMessage({
            message: i18n.t('fileSuccessfullyExportedText'),
            position: { top: 0 }
          });
          setTimeout(() => {
            Linking.openURL(responseJson.url);
          }, 1000);
        } else {
          showMessage({
            message: i18n.t('no_data_found'),
            position: { top: 0 },
          });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleNavigationPayload(message: Message) {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const data = message.getData(getName(MessageEnum.PlayLoadSignupId));

      const formatDate = (dateString: moment.MomentInput) => {
        return dateString ? moment(dateString).format('ddd, DD MMM YYYY') : '';
      };
      if (data) {
        const filter = data.filter;
        const fromDate = formatDate(data.fromDate);
        const toDate = formatDate(data.toDate);

        this.setState({
          filter: filter,
          formattedFromDate: fromDate,
          formattedToDate: toDate
        });
      }

      const data2 = message.getData(getName(MessageEnum.PlayLoadSignupId));
      if (typeof data2 === 'object' && data2.filter) {
        const filter = data2.filter;
        this.setState({
          filter: filter,
        });
      }

      const data1 = message.getData(getName(MessageEnum.LoginOptionsNavigationDataMessage));
      if (typeof data1 === 'object' && data1.id) {
        const id = data1.id;
        this.setState({ catalogueId: id });
      }
      this.getOrderDetail(this.state.catalogueId);
    }
  }

  removeModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  handleRadioButtonPress = (value: any) => {
    this.setState({ selectedValue: value });
};

  getOrderDetail = async (id: string) => {
    let token = await getStorageData('token',true)
    const header = {
      "Content-Type": configJSON.validationApiContentType, 
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getDataId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getData + `${id}/get_analytical_report?filter_range=${this.state.filter || 'this week'}&&start_date=${this.state.formattedFromDate}&&end_date=${this.state.formattedToDate}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)

    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToBackInAddAddress = async () => {
    this.props.navigation.goBack();
  };

  navigateFilter = () => {
    const msg = new Message(getName(MessageEnum.NavigationMessage));
    msg.addData(getName(MessageEnum.NavigationTargetMessage), "AnalyticsFilter");
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), { filter: this.state.filter, fromDate: this.state.formattedFromDate, toDate: this.state.formattedToDate });

    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msg);
  }

  handleDownload = () => {
    if (this.state.selectedValue) {
      this.getDownloadFile();
    } else {
      Alert.alert("Error", i18n.t('pleaseSelectSomethingErrorText'))
    }
  }

  getDownloadFile = async () => { 
    let userID = await getStorageData("userID")
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getDownloadFileId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
       `catalogues/${this.state.catalogueId}/download_report/${userID}?type=${this.state.selectedValue}`
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
  // Customizable Area End
}
