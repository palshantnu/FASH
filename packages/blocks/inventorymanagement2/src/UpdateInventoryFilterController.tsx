import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
// @ts-expect-error Builder doesn't follow TS in navigation, types is not installed for this package
import { NavigationActions } from "react-navigation";
import { Filters } from "./response";
import i18n from '../../../components/src/i18n/i18n.config'
import storage from "framework/src/StorageProvider";
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
  storeId: string;
  isFilterOpen: boolean;
  filters: Filters;
  emptyMessage: string;
  backKey: string;
  selectedModeStr : string;
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
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      storeId: "",
      isFilterOpen: false,
      filters: {
        // in_stock: false,
        low_on_stock: false,
        listed: false,
        unlisted: false,
        out_of_stock: false,
      },
      emptyMessage: configJSON.noCataloguesFound,
      backKey: "",
      selectedModeStr : "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
      const filters = message.getData(
        getName(MessageEnum.NavigationPayloadUpdateInventoryFilters)
      );
      const updateInventoryKey = message.getData(
        getName(MessageEnum.NavigationPlUpdateInventoryKey)
      );
      if (storeId && this.state.storeId !== storeId) {
        this.setState({ storeId, filters, backKey: updateInventoryKey });
      }
      this.getSelectedMode(filters, updateInventoryKey);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  get filters(): Array<{ title: string; key: keyof Filters }> {
    return [
      // { title: "In Stock", key: "in_stock" },
      { title: i18n.t('lowOnStock'), key: "low_on_stock" },
      { title: i18n.t('outOfStock'), key: "out_of_stock" },
      { title: i18n.t('unlist'), key: "unlisted" },
      { title: i18n.t('listed'), key: "listed" },
    ];
  }
  
  getSelectedMode = async (filters: Filters, updateInventoryKey: string) => {
    const selectedModeStr = await storage.get("FA_LOGIN_MODE");
    this.afterGetSelectedMode(filters, updateInventoryKey, selectedModeStr);
  };

  afterGetSelectedMode = async (filters: Filters, updateInventoryKey: string, selectedModeStr: string) => {
    if (selectedModeStr === "Stylist") {
      this.setState({ filters, backKey: updateInventoryKey });
    }
    this.setState({ selectedModeStr });
  }

  getListingQuery = (listed: boolean, unlisted: boolean) => {
    if ((!listed && !unlisted) || (listed && unlisted)) {
      return "";
    }
    if (listed) {
      return "&listing=true";
    }
    if (unlisted) {
      return "&listing=false";
    }
  };

  getStockStatusQuery = (lowOnStock: boolean, outOfStock: boolean) => {
    if ((!lowOnStock && !outOfStock) || (lowOnStock && outOfStock)) {
      return "";
    }
    if (lowOnStock) {
      return "&stock_status=low_on_stock";
    }
    if (outOfStock) {
      return "&stock_status=out_of_stock";
    }
  };

  closeFilters = () => this.props.navigation.goBack();

  clearAllFilters = () => {
    this.setState({
      filters: {
        listed: false,
        unlisted: false,
        low_on_stock: false,
        out_of_stock: false,
      },
    });
  };

  handleFilter = (filterKey: keyof Filters) => {
    return () => {
      this.setState(({ filters }) => ({
        filters: {
          ...filters,
          [filterKey]: !filters[filterKey],
        },
      }));
    };
  };

  getFilterQuery = (filters: Filters) => {
    let queryParams: string[] = [];
  
    // Add store_id if not in 'Stylist' mode
    if (this.state.selectedModeStr !== 'Stylist') {
      queryParams.push(`store_id=${this.state.storeId}`);
    }
  
    // Handle mutually exclusive listing filters
    if (filters.listed !== filters.unlisted) {
      queryParams.push(`listing=${filters.listed ? "true" : "false"}`);
    }
  
    // Handle mutually exclusive stock filters
    if (filters.low_on_stock !== filters.out_of_stock) {
      queryParams.push(`stock_status=${filters.low_on_stock ? "low_on_stock" : "out_of_stock"}`);
    }
  
    // Join query parameters with '&', and return with '?' prefix if not empty
    return queryParams.length >0 ? `?${queryParams.join("&")}` : "";
  };
  
  
  

  goBackToInventoryWithData = () => {
    if (
      ![
        this.state.filters.listed,
        this.state.filters.unlisted,
        this.state.filters.low_on_stock,
        this.state.filters.out_of_stock,
      ].includes(true)
    ) {
      const setParamsAction = NavigationActions.setParams({
        params: {
          filters: "",
          filterObj: this.state.filters,
          storeId: this.state.storeId,
        },
        key: this.state.backKey,
      });
      this.props.navigation.dispatch(setParamsAction);
      this.props.navigation.goBack();
    }

    const listing = this.getListingQuery(
      this.state.filters.listed,
      this.state.filters.unlisted
    );

    const stockStatus = this.getStockStatusQuery(
      this.state.filters.low_on_stock,
      this.state.filters.out_of_stock
    );

    const setParamsAction = NavigationActions.setParams({
      key: this.state.backKey,
      params: {
        filters:  this.getFilterQuery(this.state.filters),
        filterObj: this.state.filters,
        storeId: this.state.storeId,
      },
    });
    this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
