import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert, ImageSourcePropType, Linking } from "react-native";
import { RegisterType } from "./responseStore";
import i18n from '../../../components/src/i18n/i18n.config';
import { showMessage } from "react-native-flash-message";

import { agency, driver } from "./assets";
import { getOS } from "framework/src/Utilities";

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
  selectedIndex: number;
  customCareNumber : string;
  loading: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class DriverRegistrationTypeController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  setCustomCareNumber: string = "";
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
      selectedIndex: 0,
      token: "",
      customCareNumber: "",
      loading: true,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      if (!this.state.token) {
        const token = message.getData(
          getName(MessageEnum.SessionResponseToken)
        );
        this.setState({ token });
      }
    }
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.setCustomCareNumber) {
          this.setState({loading:false})
          this.setState({ customCareNumber: responseJson.data[0].attributes.contact_support_number });
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.getCustomCareNumber();
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  goBack = () => this.props.navigation.navigate('EmailAccountLoginBlock');

  get registerAsTypes(): RegisterType[] {
    return [
      {
        name: "Register as a Driver",
        value: "driver",
        showName:i18n.t('registerAsDriverText'),
        icon: driver as ImageSourcePropType,
      },
      {
        name: "Register as an Agency",
        value: "agency",
        showName:i18n.t('registerAdAgency'),
        icon: agency as ImageSourcePropType,
      },
    ];
  }

  getCountRegisterAsTypes = () => {
    return this.registerAsTypes.length;
  };

  getItem = (_data: unknown, index: number) => {
    return this.registerAsTypes[index];
  };

  extractor = (data: RegisterType) => data.value;

  selectType = (index: number) => {
    this.setState({ selectedIndex: index });
  };

  onCustomerCarePress = () => {
    let phoneNumber = '';
        const operatingSystem = getOS()
        phoneNumber = `tel:${this.state.customCareNumber}`;
        Linking.canOpenURL(phoneNumber)
          .then(() => {
              return Linking.openURL(phoneNumber);
          })
          .catch((err) => Alert.alert('An error occurred', err));
  };

  goToSelectVehicle = () => {
    if (this.state.selectedIndex === 1) {
      return this.onCustomerCarePress();
    }
    const message = new Message(getName(MessageEnum.NavigationDriverPersonalDetails));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  getCustomCareNumber = () => {
    const header = {
      "Content-Type": "application/json",
    };
    this.apiCall(
      configJSON.customCareNumberEndpoint,
      "GET",
      header,
      null,
      (messageId) => {
        this.setCustomCareNumber = messageId;
    }
    );
  }

  apiCall = (
    endpoint: string,
    method: string,
    header: unknown,
    body: unknown,
    setMessageId: (messageId: string) => void
) => {
  const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
  message.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    endpoint
  );
  message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
  message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
  message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
  setMessageId(message.messageId);
  this.setState({loading:true})
    runEngine.sendMessage(message.messageId, message);
};
  // Customizable Area End
}
