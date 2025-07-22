import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import { Keyboard, Alert, EventSubscription } from "react-native";
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
import storage from "../../../framework/src/StorageProvider";
import { InventoryItem, InventorySuccessReponse, Filters } from "./response";
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
  emptyMessage: string;
  filtersQuery: string;
  filters: Filters;
  selectedModeStr: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UpdateInventoryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  willFocusListener: EventSubscription | null = null;
  willBlurListener: EventSubscription | null = null;
  isFocused: MutableRefObject<boolean | null>;
  getInventoryApiCallId = "";
  updateInventoryApiCallId = "";
  isUpdated = false;
  isSearched = false;
  isFiltered = false;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: true,
      storeId: "",
      items: [],
      searchKey: "",
      rowsData: [],
      isDirty: false,
      filtersQuery: "",
      emptyMessage: configJSON.noCataloguesFound,
      filters: {
        listed: false,
        unlisted: false,
        low_on_stock: false,
        out_of_stock: false,
      },
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
      return this.handleToken(message);
    }

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      return this.handleNavigationPayload(message);
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

  // Customizable Area Start
  componentDidMount = async () => {
    this.willFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.isFocused.current = true;
        const filters = this.props.navigation.getParam("filters", "");
        const filtersObj = this.props.navigation.getParam(
          "filterObj",
          this.state.filters
        );
        const storeId = this.props.navigation.getParam(
          "storeId",
          this.state.storeId
        );
        if (filters) {
          this.setState(
            {
              filters: filtersObj,
              storeId: storeId,
            },
            () => this.getFilteredList(filters)
          );
        } else {
          this.getInventory();
        }
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );

    this.isFocused.current = true;
    this.getToken();
  };

  componentWillUnmount = async () => {
    this.willBlurListener?.remove();
    this.willFocusListener?.remove();
  };

  getToken = () => {
    const tokenMessage: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMessage);
  };

  handleToken = (message: Message) => {
    const token = message.getData(getName(MessageEnum.SessionResponseToken));
    this.setState({ token }, () => {
      this.getInventory();
    });
  };

  handleNavigationPayload = async(message: Message) => {
    const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.runAfterNavPayload(selectedModeStr, storeId);
  };

  runAfterNavPayload = (selectedModeStr: string, storeId : string) => {
    this.setState({ selectedModeStr: selectedModeStr }, 
      () => {
      if (this.state.selectedModeStr == "Stylist") {
        this.getInventory();
      }}
    );
    if (storeId && this.state.storeId !== storeId) {
      this.setState({ storeId }, this.getInventory);
    } 
  }

  handleApiResponse = (
    apiCallId: string,
    responseJson: unknown,
    errorResponse: unknown
  ) => {
    if (!responseJson && errorResponse) {
      this.setState({ loading: false, items: [], rowsData: [[]] });
      this.parseApiErrorResponse(errorResponse);
      return;
    }
    if (apiCallId === this.getInventoryApiCallId) {
      const response = responseJson as InventorySuccessReponse;
      this.handleGetInventoryApiResponse(response);
      return;
    }

    if (apiCallId === this.updateInventoryApiCallId) {
      this.isUpdated = true;
      if (this.isSearched) {
        this.searchItem();
        return;
      }
      const response = responseJson as InventorySuccessReponse;
      if ("data" in response) {
        this.getInventory();
        return;
      }
    }
  };

  getInventory = async() => {
    
    if (this.state.selectedModeStr == "Stylist") {
      const inventoryMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      inventoryMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.listInventoryEndpoint,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      });
      this.setState({ loading: true });
      this.getInventoryApiCallId = inventoryMessage.messageId;
      this.isSearched = false;
      runEngine.sendMessage(inventoryMessage.id, inventoryMessage);
    }

    if (this.state.token && this.state.storeId && this.isFocused.current) {
      
      const inventoryMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      inventoryMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.listInventoryEndpoint + `?store_id=${this.state.storeId}`,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.validationApiMethodType,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
          token: this.state.token,
        }),
      });
      this.setState({ loading: true });
      this.getInventoryApiCallId = inventoryMessage.messageId;
      this.isSearched = false;
      runEngine.sendMessage(inventoryMessage.id, inventoryMessage);
    }
  };

  handleGetInventoryApiResponse = (response: InventorySuccessReponse) => {
    if ("data" in response) {
      this.setState({
        items: response.data,
        loading: false,
        rowsData: this.getRows(response.data),
        isDirty: false,
        emptyMessage: this.isSearched
          ? configJSON.emptySearchResult
          : configJSON.noCataloguesFound,
      });
    } else {
      this.setState({ loading: false, items: [], rowsData: [[]] });
    }
    if (this.isUpdated) {
      showMessage({
        message: i18n.t('inventoryUpdate'),
        type: "success",
        position: { top: 8 },
      });
      this.isUpdated = false;
      this.props.navigation.goBack();
    }
    if (this.isFiltered) {
      this.setState({ emptyMessage: configJSON.emptyFilterResult });
      this.isFiltered = false;
    }
  };

  updateSearchKeyword = (text: string) => {
    this.setState({ searchKey: text.trim() });
  };

  searchItem = async () => {
    Keyboard.dismiss();
    const searchKey = this.state.searchKey;

    if (this.state.isDirty && !this.isSearched) {
      const cont = await new Promise<boolean>((resolve) => {
        Alert.alert(
          "Discard changes ?",
          "You have unsaved changes, would you still like to continue",
          [
            { text: "Continue", onPress: () => resolve(true) },
            { text: "Cancel", onPress: () => resolve(false) },
          ]
        );
      });
      if (!cont) {
        return;
      }
    }

    if (searchKey.length === 0 && this.isSearched) {
      return this.getInventory();
    }

    if (searchKey.trim().length < 3) {
      return showMessage({
        message:i18n.t('pleaseSearchAtLeast'),
        position: { top: 0 },
        type: "warning",
      });
    }
    const searchMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    searchMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
      this.state.storeId == "" ? configJSON.searchInventoryEndpoint +
      searchKey.trim() :
      configJSON.searchInventoryEndpoint +
      searchKey.trim() + `&store_id=${this.state.storeId}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.getInventoryApiCallId = searchMessage.messageId;
    this.isSearched = true;
    this.setState({ loading: true });
    runEngine.sendMessage(searchMessage.id, searchMessage);
  };

  toggleListStatus = (rowNumber: number, columnNumber: number) => {
    this.setState(({ rowsData }) => {
      const rows = [...rowsData];
      rows[rowNumber][columnNumber] = !rows[rowNumber][columnNumber];
      return { rowsData: rows };
    }, this.handleDirtyState);
  };

  updateInput = (text: string, rowNumber: number, columnNumber: number) => {
    if (/^\d*$/.test(text.trim())) {
      this.setState(({ rowsData }) => {
        const rows = [...rowsData];
        rows[rowNumber][columnNumber] = text.trim();
        return { rowsData: rows };
      }, this.handleDirtyState);
    }
  };

  setToZero = (rowNumber: number, columnNumber: number) => {
    if (!this.state.rowsData[rowNumber][columnNumber]) {
      this.updateInput("0", rowNumber, columnNumber);
    }
  };

  getRows = (data: InventoryItem[]) => {
    return data.map(({ attributes }) => [
      attributes.product_name,
      attributes.sku,
      attributes.stock_qty,
      attributes.low_stock_threshold,
      attributes.is_listed,
    ]);
  };

  handleDirtyState = () => {
    const cleanRows = this.getRows(this.state.items);
    const currentRows = [...this.state.rowsData];
    const isDirty = !this.deepEqualArrays(cleanRows, currentRows);
    this.setState({ isDirty });
  };

  deepEqualArrays = (arr1: unknown[], arr2: unknown[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let iterator = 0; iterator < arr1.length; iterator++) {
      const val1 = arr1[iterator];
      const val2 = arr2[iterator];

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
        stock_qty: number;
        low_stock_threshold: number;
        is_listed: boolean;
      }
    >();

    for (const [index, { attributes }] of this.state.items.entries()) {
      const dirtyRow = this.state.rowsData[index];
      if (
        this.deepEqualArrays(this.state.rowsData[index], [
          attributes.product_name,
          attributes.sku,
          attributes.stock_qty,
          attributes.low_stock_threshold,
          attributes.is_listed,
        ])
      ) {
        continue;
      }
      dirtyRows.set(attributes.id.toString(), {
        id: attributes.id,
        is_listed: Boolean(dirtyRow[4]),
        low_stock_threshold: Number(dirtyRow[3]),
        stock_qty: Number(dirtyRow[2]),
      });
    }

    const body = JSON.stringify({
      catalogue_variants: Array.from(dirtyRows).map((item) => item[1]),
    });

    const updateMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    updateMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.updateInventoryEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.httpPatchType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
        "Content-Type": "application/json",
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });
    this.updateInventoryApiCallId = updateMessage.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(updateMessage.id, updateMessage);
  };

  getFilteredList = (query: string) => {
    const endPoint = configJSON.filterInventoryEndpoint + query;
    const filterMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    filterMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]: endPoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.getInventoryApiCallId = filterMessage.messageId;
    this.isFiltered = true;
    this.setState({ loading: true });
    runEngine.sendMessage(filterMessage.id, filterMessage);
  };

  goToFilters = () => {
    const message = new Message(
      getName(MessageEnum.NavigationUpdateInventoryFilters)
    );
    message.initializeFromObject({
      [getName(MessageEnum.ShowByStoreId)]: this.state.storeId,
      [getName(MessageEnum.NavigationPayloadUpdateInventoryFilters)]:
        this.state.filters,
      [getName(MessageEnum.NavigationPlUpdateInventoryKey)]:
        this.props.navigation.state.key,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };
  // Customizable Area End
}
