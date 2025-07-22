import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { ImageSourcePropType } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config';
import { carLogo, bike, scooter } from "./assets";
import { VehicleType } from "./responseStore";
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
  selectedVehicleIndex: number;
  token: string;
  pageName:string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class SelectVehicleController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
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
      token: "",
      selectedVehicleIndex: 0,
      pageName:''
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      this.handleSessionResponse(message);
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
    
      const pageName = message.getData(
        getName(MessageEnum.AddVehiclePageNamePayloadMessage)
      )

      this.setState({pageName:pageName})
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.grabToken();
    // Customizable Area End
  }

  // Customizable Area Start
  handleSessionResponse = (message: Message) => {
    if (!this.state.token) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
  };

  goBack = () => this.props.navigation.goBack();

  grabToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  get vehicleTypes(): VehicleType[] {
    return [
      {
        name: "Motorbike",
        value: "motorbike",
        icon: bike as ImageSourcePropType,
        showName:i18n.t('motorbikeText')
      },
      {
        name: "Scooter",
        value: "scooter",
        icon: scooter as ImageSourcePropType,
        showName:i18n.t('scooterText')
      },
      {
        name: "Car",
        value: "car",
        icon: carLogo as ImageSourcePropType,
        showName:i18n.t('carText')
      },
    ];
  }

  getCountVehicleTypes = () => {
    return this.vehicleTypes.length;
  };

  getItem = (_data: unknown, index: number) => {
    return this.vehicleTypes[index];
  };

  extractor = (data: VehicleType) => data.value;

  selectType = (index: number) => {
    this.setState({ selectedVehicleIndex: index });
  };

  onCustomerCarePress = () => {
    showMessage({
      message: "This feature is not yet developed",
      type: "info",
      position: { top: 8 },
    });
  };

  goToNextVechile = () => {
    let vehicleType = this.vehicleTypes[this.state.selectedVehicleIndex].name;
    const message = new Message(getName(MessageEnum.NavigationAddVehicleMessage));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.AddVehicleTypePayloadMessage), vehicleType);
    this.send(message);
  };
  // Customizable Area End
}
