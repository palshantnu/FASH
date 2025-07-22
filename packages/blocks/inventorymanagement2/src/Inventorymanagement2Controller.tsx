import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { LogBox } from "react-native";
import { createRef, MutableRefObject } from "react";
import { showMessage } from "react-native-flash-message";
import { StatsResponse } from "./response";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import storage from "../../../framework/src/StorageProvider";
import { getStorageData } from "framework/src/Utilities";
interface NavEvent {
  remove: () => unknown;
}

import i18n from '../../../components/src/i18n/i18n.config'

LogBox.ignoreLogs(["loginOptionsParams.role"]);
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  token: string;
  loading: boolean;
  storeId: string;
  bulkActionModal: boolean;
  stats?: StatsResponse;
  selectedModeStr: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Inventorymanagement2Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  willFocusListener: NavEvent | null = null;
  willBlurListener: NavEvent | null = null;
  isFocused: MutableRefObject<boolean | null>;
  getStatsApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: true,
      // Customizable Area Start
      token: "",
      loading: true,
      storeId: "",
      bulkActionModal: false,
      selectedModeStr: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.isFocused = createRef();
    this.isFocused.current = false;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, this.toggleGetStats);
    }

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
      if (storeId && this.state.storeId !== storeId) {
        this.setState({ storeId }, this.toggleGetStats);
      }
    }

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      return this.handleApiResponse(apiCallId, responseJson, errorResponse);
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  componentDidMount = async () => {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.isFocused.current = true;
        this.toggleGetStats();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );
    this.isFocused.current = true;
    this.grabToken();
  };

  componentWillUnmount = async () => {
    this.willBlurListener?.remove();
    this.willFocusListener?.remove();
  };

  grabToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  get menu() {
    const menuList = [
      {
        title: i18n.t('updateInventory'),
        onPress: this.goToUpdateInventory,
        testID: "updateInventory",
      },
      {
        title: i18n.t('setPrices'),
        onPress: this.goToSetPrices,
        testID: "setPrices",
      },
      {
        title: i18n.t('pairTheProducts'),
        onPress: () => this.navigatesToPairItWithScreen(),
        testID: "pairTheProducts",
      },
      {
        title: i18n.t('bulkActions'),
        onPress: () => this.setState({ bulkActionModal: true }),
        testID: "bulkActions",
      },
      {
        title: i18n.t('downloadTemplates'),
        onPress: () => this.props.navigation.navigate("DownloadTemplates"),
        testID: "downloadTemplates",
      },
    ];
    // Add "Assign Store" if the selectedModeStr is not "Stylist"
    if (this.state.selectedModeStr !== "Stylist") {
      menuList.splice(2, 0, {
        title: i18n.t('assignStore'),
        onPress: () => 
          this.props.navigation.navigate("SelectStoreProducts", {
            comingFrom: "assignStore",
            storeId: this.state.storeId,
          }),
        testID: "assignStore",
    });
  }

  return menuList;
  }

  toggleGetStats = async() => {
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.setState({ selectedModeStr: selectedModeStr });
    this.getStats();
  }

  getStats = async() => {
    const token = await getStorageData("token", true);
    if (this.state.selectedModeStr == "Stylist") {
      const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
      msg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.statsStylistApiEndpoint ,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: token,
        }),
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
      });
      this.getStatsApiCallId = msg.messageId;
      runEngine.sendMessage(msg.id, msg);
      this.setState({ loading: true });
    }
    if (this.state.token && this.state.storeId && this.isFocused.current) {
      const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
      msg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.statsApiEndpoint +
          this.state.storeId +
          "/store_variant_count",
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
      });
      this.getStatsApiCallId = msg.messageId;
      runEngine.sendMessage(msg.id, msg);
      this.setState({ loading: true });
    }

  };

  handleApiResponse = (
    apiCallId: string,
    response: unknown,
    error: unknown
  ) => {
    if (response) {
      if (apiCallId === this.getStatsApiCallId) {
        const resp = response as StatsResponse | { error: string };
        if ("total_products" in resp) {
          this.setState({ stats: resp, loading: false });
        } else {
          this.setState({
            stats: {
              low_stock: "N/A",
              out_of_stock: "N/A",
              total_products: "N/A",
              unlisted: "N/A",
            },
            loading: false,
          });
        }
      }
    }
    if (error) {
      this.parseApiCatchErrorResponse(error);
    }
  };

  goToUpdateInventory = () => {
    const msg = new Message(getName(MessageEnum.NavigationUpdateInventory));
    msg.initializeFromObject({
      [getName(MessageEnum.ShowByStoreId)]: this.state.storeId,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(msg);
  };

  goToSetPrices = () => {
    const msg = new Message(getName(MessageEnum.NavigationSetPrices));
    msg.initializeFromObject({
      [getName(MessageEnum.ShowByStoreId)]: this.state.storeId,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(msg);
  };

  yetToBeDeveloped = () => {
    showMessage({
      message: "This feature is yet to be developed",
      type: "info",
      position: { top: 8 },
    });
  };

  goToCSVPage = (title: string, subTitle: string) => {
    this.setState({ bulkActionModal: false });
    this.props.navigation.navigate("UploadCSV", {
      title: title,
      subTitle: subTitle,
    });
  };

  goToSelectStorePage = () => {
    this.setState({ bulkActionModal: false });
    this.props.navigation.navigate("SelectStoreProducts", {
      comingFrom: "bulkActions",
      storeId: this.state.storeId,
    });
  };

  navigatesToPairItWithScreen = () => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPairItWithMessage)
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };
  // Customizable Area End
}
