import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { isEmpty } from "../../../framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
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
  contactUsType: string;
  token: string;
  area: string;
  address: string;
  zipcode: string;
  block: string;
  houseNumber: string;
  areaError: boolean;
  addressError: boolean;
  zipcodeError: boolean;
  blockError: boolean;
  houseNumberError: boolean;
  loading: boolean;
  accountType: string;
  agencyContactNumber: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AddressEditDriverController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  updateDriverAddressApiCallId: string = "";
  getDriverAddressApiCallId: string = "";
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
      contactUsType: "",
      token: "",
      area: "",
      address: "",
      zipcode: "",
      block: "",
      houseNumber: "",
      areaError: false,
      addressError: false,
      zipcodeError: false,
      blockError: false,
      houseNumberError: false,
      loading: false,
      accountType: "",
      agencyContactNumber: "",
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.getTokenAndValue(message);
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseManage(message);
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

  getTokenAndValue = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
      this.getEditAddress(token);
    }
  };

  apiResponseManage = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (responseJson) {
      this.setState({ loading: false });
      this.checkAllApiCallIdStatus(message);
    } else {
      this.setState({ loading: false });
      this.parseApiErrorResponse(errorReponse);
    }
  };

  checkAllApiCallIdStatus = (message: Message) => {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (apiRequestCallId === this.updateDriverAddressApiCallId) {
      this.manageSuccessWork();
    }
    if (apiRequestCallId === this.getDriverAddressApiCallId) {
      let responseData = responseJson.data.attributes;
      this.setState({
        accountType: responseData.account_type,
        address: responseData.address,
        zipcode: responseData.zip_code,
        houseNumber: responseData.house_or_building_number,
        area: responseData.area,
        block: responseData.block,
        agencyContactNumber:
          responseData.country_code + responseData.agency_contact_number,
      });
    }
  };

  checkBoarderColor(stateValue1: boolean) {
    if (stateValue1) {
      return "red";
    } else {
      return "#A9A9A9";
    }
  }

  updateDriverAddress = () => {
    if (isEmpty(this.state.address)) {
      this.setState({ addressError: true });
      return false;
    }
    if (isEmpty(this.state.area)) {
      this.setState({ areaError: true });
      return false;
    }
    if (isEmpty(this.state.block)) {
      this.setState({ blockError: true });
      return false;
    }
    if (isEmpty(this.state.houseNumber)) {
      this.setState({ houseNumberError: true });
      return false;
    }

    this.afterCallApiUpdateAddress();
  };

  afterCallApiUpdateAddress = () => {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };

    let attrs = {};

    if (this.state.accountType === "Agency") {
      attrs = {
        account_type: this.state.accountType,
        address: this.state.address,
        area: this.state.area,
        zip_code: this.state.zipcode,
        block: this.state.block,
        house_or_building_number: this.state.houseNumber,
        agency_contact_number: this.state.agencyContactNumber,
      };
    } else {
      attrs = {
        account_type: this.state.accountType,
        address: this.state.address,
        area: this.state.area,
        zip_code: this.state.zipcode,
        block: this.state.block,
        house_or_building_number: this.state.houseNumber,
      };
    }

    const dataBody = {
      attributes: attrs,
    };

    const httpBody = {
      data: dataBody,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateDriverAddressApiCallId = requestMessage.messageId;

    if (this.state.accountType === "Agency") {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.updateAegencyAddressApiEndPoint
      );
    } else {
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.updateDriverAddressApiEndPoint
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addAddressApiMethod
    );

    this.setState({ loading: true });

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  onAreaChange = (name: string) => {
    this.setState({ area: name, areaError: false });
  };

  onAddressChange = (address: string) => {
    this.setState({ address: address, addressError: false });
  };

  onzipcodeChange = (zipcode: string) => {
    this.setState({ zipcode: zipcode, zipcodeError: false });
  };

  onHouseNumberChange = (houseNumber: string) => {
    this.setState({ houseNumber: houseNumber, houseNumberError: false });
  };

  onBlockChange = (block: string) => {
    this.setState({ block: block, blockError: false });
  };

  getEditAddress = async (token: string) => {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: token,
    };

    const requestMessageCity = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getDriverAddressApiCallId = requestMessageCity.messageId;
    requestMessageCity.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getEditAddressApiEndPoint
    );

    requestMessageCity.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessageCity.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAddressApiMethod
    );

    this.setState({ loading: true });

    runEngine.sendMessage(requestMessageCity.id, requestMessageCity);
    return true;
  };

  manageSuccessWork = () => {
    showMessage({
      message: i18n.t("addressUpdatedSuccessfullyMessage"),
      position: { top: 0 },
    });
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
