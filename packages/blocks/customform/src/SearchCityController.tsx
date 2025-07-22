import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { CityType } from "./responseStore";
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
  selectedCityIndex: number;
  selectedVehicle: string;
  searchText: string;
  city: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class SearchCityController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
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
      token: "",
      selectedCityIndex: 0,
      selectedVehicle: "",
      searchText: "",
      city: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const payload = message.getData(
        getName(MessageEnum.NavigationDriverRegData)
      );
      if (payload.vehicle) {
        this.setState({ selectedVehicle: payload.vehicle });
        runEngine.unSubscribeFromMessages(this as IBlock, [
          getName(MessageEnum.NavigationPayLoadMessage),
        ]);
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.fetchToken();
    // Customizable Area End
  }

  // Customizable Area Start
  fetchToken = () => {
    this.send(new Message(getName(MessageEnum.SessionRequestMessage)));
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  get cities(): Array<{ title: string; data: CityType[] }> {
    return [
      {
        title: "Nearby Cities",
        data: [
          { name: "Kuwait City", value: "kuwait-city" },
          { name: "Mishrif", value: "misrif" },
          { name: "Al Maqwa", value: "al-maqwa" },
          { name: "Az Zawr", value: "az-zawr" },
        ],
      },
      {
        title: "All Cities",
        data: [
          { name: "Abraq Khaytan", value: "abraq-khaytan" },
          { name: "Ad Da`iyah", value: "ad-daiyah" },
          { name: "Ad Dast", value: "ad-dast" },
          { name: "Ad Dasmah", value: "ad-dasmah" },
          { name: "Ad Diba`iyah", value: "ad-dibayah" },
          { name: "Al Manqaf", value: "al-manqaf" },
          { name: "Al Maqwa", value: "al-maqwa-1" },
          { name: "An Nijfah", value: "an-nijfah" },
          { name: "Al Qurayn", value: "al-qurayn" },
          { name: "Al Wafrah", value: "al-wafrah" },
          { name: "Az Zawr", value: "az-zawr-1" },
        ],
      },
    ];
  }

  keyExtrator = (item: CityType, index: number) => {
    return `${item.value}-${index + 1}`;
  };

  onSupportPress = () => {
    showMessage({
      message: "This feature is not yet developed",
      type: "info",
      position: { top: 8 },
    });
  };

  handleSearchText = (searchText: string) => this.setState({ searchText });

  goToDriverPersonalDetails = () => {
    const message = new Message(
      getName(MessageEnum.NavigationDriverPersonalDetails)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationDriverRegData), {
      vehicle: this.state.selectedVehicle,
      city: "kuwait",
    });
    this.send(message);
  };
  // Customizable Area End
}
