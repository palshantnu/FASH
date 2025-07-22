import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { isEmpty, setStorageData } from "../../../framework/src/Utilities";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform, Alert } from "react-native";
interface MapLocationProps {
  lat: number;
  lng: number;
}

interface MapGeomatryProps {
  location: MapLocationProps;
}

interface RequestProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface MapProps {
  formatted_address: string;
  geometry: MapGeomatryProps;
}

interface RegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
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
  latitude: number;
  longitude: number;
  latdelta: string;
  longdelta: string;
  region: RegionProps;
  token: string;
  addressselected: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomformMapController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getStoreNameApiCallId = "";
  onMapReady = "";
  marker = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      latitude: 29.378586,
      longitude: 47.990341,
      latdelta: "0.0922",
      longdelta: "0.0421",
      region: {
        latitude: 29.378586,
        longitude: 47.990341,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      token: "",
      addressselected: "",
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.getcurrentlatlogn();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  getcurrentlatlogn = async () => {
    let data = (await this.requestLocation()) as RequestProps;
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;
    this.setState({ latitude: latitude, longitude: longitude });
  };

  requestLocation = () => {
    return new Promise(async (resolve) => {
      if (Platform.OS === "ios") {
        resolve(this.getOneTimeLocation());
        resolve(this.subscribeLocationLocation());
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
              buttonPositive: "Ok",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            resolve(this.getOneTimeLocation());
            resolve(this.subscribeLocationLocation());
          } else {
            let position = {
              coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              },
            };
            resolve(position);
          }
        } catch (_error) {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        }
      }
    });
  };

  getOneTimeLocation = () => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          });
          resolve(position);
        },
        () => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  };

  subscribeLocationLocation = () => {
    return new Promise((resolve) => {
      Geolocation.watchPosition(
        (position) => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          });
          resolve(position);
        },
        (_error) => {
          let position = {
            coords: {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          };
          resolve(position);
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  selectAddress = async (details: MapProps | null) => {
    if (details) {
      this.setState({
        addressselected: details.formatted_address,
        region: {
          ...this.state.region,
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        },
      });
      let localObject = {
        addressselected: details.formatted_address,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      if (
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params.comingFrom === "buyerAddAddress"
      ) {
        setStorageData("buyerAddAddressMap", JSON.stringify(localObject));
      } else {
        await setStorageData("storeAddressMap", JSON.stringify(localObject));
      }
    }
  };

  btnConfirmLocation = async () => {
    if (isEmpty(this.state.addressselected)) {
      Alert.alert("Please search valid address then click on Choose Location.");
      return false;
    }
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
