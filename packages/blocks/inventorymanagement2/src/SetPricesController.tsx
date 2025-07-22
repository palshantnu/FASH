import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import { Keyboard, Alert, NativeEventSubscription } from "react-native";
import { showMessage } from "react-native-flash-message";
import { InventoryItem, InventorySuccessReponse } from "./response";
import storage from "../../../framework/src/StorageProvider";
interface RowType {
  [key: number]: string | number | string[] | number[];
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
  loading: boolean;
  storeId: string;
  items: InventoryItem[];
  rowsData: (string | number | boolean)[][];
  searchKey: string;
  isDirty: boolean;
  selectedModeStr : string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SetPricesController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  willFocusListener: NativeEventSubscription | null = null;
  willBlurListener: NativeEventSubscription | null = null;
  isFocused: MutableRefObject<boolean | null>;
  isSearched = false;
  isUpdated = false;
  getInventoryPricesApiCallId = "";
  updateInventoryApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: true,
      storeId: "",
      isDirty: false,
      items: [],
      rowsData: [],
      searchKey: "",
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
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      return this.setState({ token }, this.getInventoryPrices);
    }

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      return this.handleNavPayload(message);
    }

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      return this.handleApiResponse(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.isFocused.current = true;
        this.getInventoryPrices();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );

    this.isFocused.current = true;
    this.getchToken();
  };

  componentWillUnmount = async () => {
    this.willBlurListener?.remove();
    this.willFocusListener?.remove();
  };

  getchToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleNavPayload = async(message: Message) => {
    const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.runAfterNavPayload(selectedModeStr, storeId);
  };

  runAfterNavPayload = (selectedModeStr: string, storeId : string) => {
    this.setState({ selectedModeStr: selectedModeStr }, 
      () => {
        if (selectedModeStr == "Stylist") {
          this.getInventoryPrices();
        }}
    );
    if (storeId && this.state.storeId !== storeId) {
      this.setState({ storeId }, this.getInventoryPrices);
    }
  }

  handleApiResponse = (message: Message) => {
    const apiCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (responseJson) {
      if (apiCallId === this.getInventoryPricesApiCallId) {
        this.handleGetInventoryPricesResponse(responseJson);
        return;
      } else if (apiCallId === this.updateInventoryApiCallId) {
        
        this.handleUpdateInventoryResponse(responseJson);
        return;
      }
    }
    if (errorResponse) {
      this.setState({ loading: false, items: [], rowsData: [[]] });
      this.parseApiErrorResponse(errorResponse);
    }
  };

  handleGetInventoryPricesResponse = (responseJson: unknown) => {
    const response = responseJson as InventorySuccessReponse;
    if ("data" in response) {
      this.setState({
        loading: false,
        isDirty: false,
        items: response.data,
        rowsData: this.getRows(response.data),
      });
    } else {
      this.setState({ loading: false, items: [], rowsData: [[]] });
    }
    if (this.isUpdated) {
      showMessage({
        message: "Prices updated successfully",
        position: { top: 8 },
        type: "success",
      });
      this.isUpdated = false;
      this.props.navigation.goBack();
    }
  };

  handleUpdateInventoryResponse = (responseJson: unknown) => {
    this.isUpdated = true;
    if (this.isSearched) {
      this.searchCatalogue();
      return;
    }
    const response = responseJson as InventorySuccessReponse;
    if ("data" in response) {
      this.getInventoryPrices();
    }
  };

  getInventoryPrices = async() => {
    if (this.state.selectedModeStr == "Stylist") {
      const getInevntoryMsg = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      getInevntoryMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.listInventoryEndpoint,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      });
      this.getInventoryPricesApiCallId = getInevntoryMsg.messageId;
      this.isSearched = false;
      this.setState({ loading: true });
      runEngine.sendMessage(getInevntoryMsg.id, getInevntoryMsg);
    }
    if (this.isFocused.current && this.state.token && this.state.storeId) {
      const getInevntoryMsg = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      getInevntoryMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.listInventoryEndpoint + `?store_id=${this.state.storeId}`,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      });
      this.getInventoryPricesApiCallId = getInevntoryMsg.messageId;
      this.isSearched = false;
      this.setState({ loading: true });
      runEngine.sendMessage(getInevntoryMsg.id, getInevntoryMsg);
    }
  };

  searchCatalogue = async () => {
    Keyboard.dismiss();
    const key = this.state.searchKey;

    if (!this.isSearched && this.state.isDirty) {
      const _continue = await new Promise<boolean>((res) => {
        Alert.alert(
          "Discard changes ?",
          "You have unsaved changes, would you still like to continue",
          [
            { text: "Continue", onPress: () => res(true) },
            { text: "Cancel", onPress: () => res(false) },
          ]
        );
      });
      if (!_continue) {
        return;
      }
    }

    if (key.length === 0 && this.isSearched) {
      return this.getInventoryPrices();
    }

    if (key.trim().length < 3) {
      return showMessage({
        message: "Please search at least 3 letters",
        type: "warning",
        position: { top: 0 },
      });
    }

    const msg = new Message(getName(MessageEnum.RestAPIRequestMessage));
    msg.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.searchInventoryEndpoint +
        key.trim() +
        `&store_id=${this.state.storeId}`,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.setState({ loading: true });
    this.isSearched = true;
    this.getInventoryPricesApiCallId = msg.messageId;
    runEngine.sendMessage(msg.id, msg);
  };

  updateSearchKeyword = (text: string) => {
    this.setState({ searchKey: text.trim() });
  };
  updatePriceInput = (text: string, r: number, c: number) => {
    const regexTwoDecimals = /^\d*(\.\d{0,2})?$/;
    if (regexTwoDecimals.test(text.trim()) || text === "") {
      this.setState(({ rowsData }) => {
        const rows = [...rowsData];
        rows[r][c] = text.trim();
        const priceText = parseFloat(text);
  
        // Ensure only two decimal places in priceText
        const formattedPriceText = priceText.toFixed(2);
  
        const disPercentage = parseFloat(rows[r][3] as string);
        if (!isNaN(priceText) && !isNaN(disPercentage)) {
          const finalCalcu = (parseFloat(formattedPriceText) * disPercentage) / 100;
          if (Array.isArray(rows[r][4])) {
            (rows[r][4] as unknown as string[])[0] = finalCalcu.toFixed(2);
          } else {
            rows[r][4] = finalCalcu.toFixed(2);
          }
        }
        return { rowsData: rows };
      }, this.handleDirtyState);
    }
  };
  

  updateInput = (text: string, r: number, c: number) => {
    const numberText = text.replace(/\D/g, '');
    if (!isNaN(parseFloat(numberText.trim())) && Number.isInteger(parseFloat(numberText.trim())) && parseFloat(numberText.trim()) <=100 && parseFloat(numberText.trim()) >= -1 || numberText === "") {
      this.setState(({ rowsData }) => {
        const rows = [...rowsData];
        rows[r][c] = numberText.trim();
        const dataPrice = parseFloat(rows[r][2] as string);
        const perText = parseFloat(numberText);
        if (!isNaN(dataPrice) && !isNaN(perText)) {
            const calcu = (dataPrice * perText / 100);
            if (Array.isArray(rows[r][4])) {
              (rows[r][4] as unknown as string[])[0] = calcu.toFixed(2);
            } else {
                rows[r][4] = calcu.toFixed(2);
            }
        } 
        return { rowsData: rows };
      }, this.handleDirtyState);
    }
  };

  onBlur = (r: number, c: number) => {
    const currentText = this.state.rowsData[r][c];
    if (!currentText) {
      return this.updateInput(
        this.state.items[r].attributes.price.toString(),
        r,
        c
      );
    }
    if (currentText.toString().split("").pop() === ".") {
      return this.updateInput(
        parseFloat(this.state.items[r].attributes.price.toString()).toFixed(2),
        r,
        c
      );
    }
  };

  getRows = (data: InventoryItem[]) => {
    return data.map(({ attributes }) => {
      const dis_price = attributes.price - attributes.price * (attributes.discounted_percentage === null ? 0 : attributes.discounted_percentage) / 100;
      if(attributes.discounted_percentage === null){
        attributes.discounted_percentage =0;
      }
      const dis_percentage= attributes.discounted_percentage.toString();
      const discount_per = parseInt(dis_percentage)
     return [
      attributes.product_name,
      attributes.sku,
      attributes.price,
      attributes.discounted_percentage === null? 0:discount_per,
      dis_price?dis_price:attributes.discounted_price,
    ]});
  };

  handleDirtyState = () => {
    const cleanRows = this.getRows(this.state.items);
    const currentRows = [...this.state.rowsData];
    const isDirty = !this.deepEqualArrays(cleanRows, currentRows);
    this.setState({ isDirty });
  };

  deepEqualArrays = (arrayOne: unknown[], arrayTwo: unknown[]): boolean => {
    if (arrayOne.length !== arrayTwo.length) {
      return false;
    }

    for (let i = 0; i < arrayOne.length; i++) {
      const val1 = arrayOne[i];
      const val2 = arrayTwo[i];

      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (!this.deepEqualArrays(val1, val2)) {
          return false;
        }
      } else if (Array.isArray(val1) || Array.isArray(val2) || val1 !== val2) {
        return false;
      }
    }

    return true;
  };

  updateItems = () => {
    const dirtyRows = new Map<
      string,
      {
        id: number;
        price: number;
        discounted_percentage:number;
      }
    >();

    for (const [index, { attributes }] of this.state.items.entries()) {
      const dirtyRow = this.state.rowsData[index];
      if (
        this.deepEqualArrays(this.state.rowsData[index], [
          attributes.product_name,
          attributes.sku,
          attributes.price,
          attributes.discounted_percentage,
          attributes.dis_price,
        ])
      ) {
        continue;
      }
      dirtyRows.set(attributes.id.toString(), {
        id: attributes.id,
        price: Number(dirtyRow[2]),
        discounted_percentage:Number(dirtyRow[3]),
      });
    }
    const updateMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    updateMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.httpPatchType,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateInventoryEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
        "Content-Type": "application/json",
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        catalogue_variants: Array.from(dirtyRows).map((i) => i[1]),
      }),
    });
    this.updateInventoryApiCallId = updateMessage.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(updateMessage.id, updateMessage);
  };
  // Customizable Area End
}
