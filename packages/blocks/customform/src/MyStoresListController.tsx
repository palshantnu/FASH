import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import { Keyboard } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ResponseStore } from "./responseStore";
import i18n from '../../../components/src/i18n/i18n.config';
import { removeStorageData } from "../../../framework/src/Utilities";

interface NavEvent {
  remove: () => unknown;
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
  token: string;
  storeSearchTxt: string;
  storeArr: Array<ResponseStore | { id: null }>;
  loading: boolean;
  searchStoreEmptyMessage: string;
  toInventoryManagement: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomformStoreShowController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  willFocusListener: NavEvent | null = null;
  willBlurListener: NavEvent | null = null;
  storeArrBackup: MutableRefObject<Array<ResponseStore> | null>;
  getStoreApiCallId = "";
  updateStoreStatusApiCallId = "";
  _updated: boolean = false;
  isFocused: MutableRefObject<boolean | null>;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      token: "",
      storeSearchTxt: "",
      loading: true,
      storeArr: [],
      searchStoreEmptyMessage: "",
      toInventoryManagement: false,
    };

    this.storeArrBackup = createRef();
    this.storeArrBackup.current = null;
    this.isFocused = createRef();
    this.isFocused.current = true;
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, () => {
        if (this.isFocused.current) {
          this.getAllStore(token);
        }
      });
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (responseJson) {
        this.handleApiResponses(responseJson, apiRequestCallId);
      }
    } else if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(getName(MessageEnum.SessionResponseData));
      if (data.to && data.to == "InventoryManagement") {
        this.setState({ toInventoryManagement: true });
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.isFocused.current = true;
        this._fetchToken();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
        this.setState({ storeSearchTxt: "" });
      }
    );
    this._fetchToken();
    // Customizable Area End
  }

  // Customizable Area Start
  async componentWillUnmount() {
    this.willBlurListener!.remove();
    this.willFocusListener!.remove();
  }

  _fetchToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleApiResponses = (response: unknown, apiRequestCallId: string) => {
    const responseJson = response as
      | {
        data: ResponseStore[];
      }
      | { error: string };
    if (apiRequestCallId === this.getStoreApiCallId) {
      this.setState({ loading: false });
      if ("data" in responseJson) {
        this.myStoreGetApiResponseSuccess(responseJson.data);
      }
    } else if (apiRequestCallId === this.updateStoreStatusApiCallId) {
      if ("error" in responseJson) {
        this.setState({ loading: false });
        return showMessage({
          message: responseJson.error,
          type: "warning",
          position: { top: 9 },
        });
      }
      this._updated = true;
      this.getAllStore(this.state.token);
    }
  };

  updateSearchText = (text: string) => {
    this.setState({ storeSearchTxt: text });
  };

  searchStore = () => {
    Keyboard.dismiss();
    const text = this.state.storeSearchTxt.trim();
    if (text === "") {
      return this.setState({
        storeArr: [{ id: null }, ...this.storeArrBackup.current!],
      });
    }
    const searched = this.storeArrBackup.current!.filter((i) =>
      i.attributes.store_name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ storeArr: searched });
  };

  myStoreGetApiResponseSuccess = (response?: ResponseStore[]) => {
    if (response && Array.isArray(response)) {
      this.storeArrBackup.current = response;
      this.setState({
        storeArr: [{ id: null }, ...response],
      });
    }
    if (this._updated) {
      this._updated = false;
      showMessage({
        message: i18n.t('storeUpdateSuccessText'),
        position: { top: 8 },
        type: "success",
      });
    }
  };

  addNewStore = () => {
    removeStorageData("createStoreArr");
    removeStorageData("storeAddressMap");
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCustomformCreateStoreUploadMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  toggleStoreStatus = (id: string | number, status: boolean) => {
    this.setState({ loading: true });

    const header = {
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.changeStoreStatusEndpoint + `?id=${id}&status=${!status}`,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.sellerDetailsAPIMethodPUT,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify(
        header
      ),
    });
    this.updateStoreStatusApiCallId = message.messageId;

    runEngine.sendMessage(message.id, message);
  };

  getAllStore = (token: string) => {
    this.setState({ loading: !this.state.storeArr.length });
    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token,
    };
    const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.getStoreApiCallId = msg.messageId;
    msg.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.getAllStoreApiEndPoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify(
        header
      ),
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.validationApiMethodType,
    });
    runEngine.sendMessage(msg.id, msg);
  };

  goToInventoryManagementScreen = (storeId:  string | number) => {
    const msg = new Message(getName(MessageEnum.NavigationInventoryManagement));
    msg.initializeFromObject({
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.ShowByStoreId)]: storeId,
    });
    this.send(msg);
  };

  goToStore = (storeId: string | number) => {
    if (this.state.toInventoryManagement) {
      this.goToInventoryManagementScreen(storeId);
      return;
    }
    const msg = new Message(
      getName(MessageEnum.NavigationMyStoreDetailsMessage)
    );
    msg.initializeFromObject({
      [getName(MessageEnum.NavigationPayloadMyStoreIdMessage)]: storeId,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(msg);
  };
  // Customizable Area End
}
