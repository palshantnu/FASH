import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import storage from "../../../framework/src/StorageProvider";
import { setStorageData } from "framework/src/Utilities";

// @ts-expect-error there is no types
import { NavigationActions } from "react-navigation";
import messaging from "@react-native-firebase/messaging";
import i18n from "../../../components/src/i18n/i18n.config";
import { setupNotification } from "../../../components/src/Notificationservices/NotificationService";
import { EmitterSubscription } from "react-native";
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
  selectedModeIndex: number;
  selectedLanguageIndex: number;
  selectedCurrencyIndex: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplashscreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
   willFocus = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      selectedModeIndex: 0,
      selectedLanguageIndex: 0,
      selectedCurrencyIndex: 0,
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [];
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      if (i18n.language === "ar") {
        this.setState({ selectedLanguageIndex: 1 });
      }
    });
    const fcm_push_token = await messaging().getToken();
    await setStorageData("USER_FCM_TOKEN", fcm_push_token);
    
    // Customizable Area End
  }

  // Customizable Area Start
  get modes() {
    return ["Buyer", "Seller", "Stylist", "Delivery Partner"];
  }

  get languages() {
    return ["English", "Arabic - عربي"];
  }

  get currencies() {
    return ["Dollar", "Dinar"];
  }

  extractKeys = (item: string, index: number) =>
    `${item.replace(/ /g, "-")}-${index + 1}`;

  updateMode = (index: number) => {
    this.setState({ selectedModeIndex: index });
  };

  updateLanguage = (index: number) => {
    this.setState({ selectedLanguageIndex: index });
    let selectedLanguage = "";
    if (index === 0) {
      selectedLanguage = "en";
    } else {
      selectedLanguage = "ar";
    }
    i18n.changeLanguage(selectedLanguage);
  };

  updateCurrency = (index: number) => {
    this.setState({ selectedCurrencyIndex: index });
  };

  btnLoginRedirection = async() => {
    const params = {
      mode: this.modes[this.state.selectedModeIndex],
      role: this.getRole(this.state.selectedModeIndex),
      language: this.languages[this.state.selectedLanguageIndex],
      currency: this.currencies[this.state.selectedCurrencyIndex],
    };
    if (
      this.modes[this.state.selectedModeIndex] === "Seller" ||
      this.modes[this.state.selectedModeIndex] === "Stylist" ||
      this.modes[this.state.selectedModeIndex] === "Delivery Partner"
    ) {
      setupNotification(this.props);
    }
    storage.set("FA_LOGIN_MODE", this.modes[this.state.selectedModeIndex]);
    storage.set("FA_LOGIN_ROLE", JSON.stringify(params.role));
    await setStorageData("USER_TYPE", JSON.stringify(params.role));
    storage.set(
      "FA_LANGUAGE",
      this.languages[this.state.selectedLanguageIndex]
    );
    storage.set(
      "FA_CURRENCY",
      this.currencies[this.state.selectedCurrencyIndex]
    );

    this.setCurrencyStorage(this.currencies[this.state.selectedCurrencyIndex]);

    if (this.state.selectedModeIndex === 0) {
      setStorageData(
        "autoLogin",
        JSON.stringify(MessageEnum.NavigationLandingPageMessage)
      );
      setStorageData("requireSignIn", "yes");
      this.props.navigation.reset(
        [
          NavigationActions.navigate({
            routeName: "TabNavigations",
          }),
        ],
        0
      );
      return;
    }

    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(
      getName(MessageEnum.LoginOptionsNavigationDataMessage),
      params
    );
    this.send(message);
  };

  getRole = (indexNumber: number) => {
    if (indexNumber < 2) {
      return indexNumber;
    }
    return indexNumber === 2 ? 3 : 2;
  };

  setCurrencyStorage = (currency: string) => {
    let currencyIcon = "";
    if (currency === "Dinar") {
      currencyIcon = "KWD ";
    } else {
      currencyIcon = "$";
    }
    setStorageData("currencyIcon", JSON.stringify(currencyIcon));
  };
  // Customizable Area End
}
