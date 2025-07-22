import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// @ts-expect-error Builder doesn't follow TS in navigation, types is not installed for this package
import { NavigationActions } from "react-navigation";
import {
  FilterType,
  SizeAttributes,
  SizesResponse,
  ColorAttributes,
  ColorsResponse,
  FiltersPayload,
  SortByAttributes,
  CategoriesResponse,
  StoreAttributes,
  StoreResponse,
} from "./response";
import i18n from "../../../components/src/i18n/i18n.config";
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
  selectedFilter: FilterType;
  minPrice: string;
  maxPrice: string;
  sizes: Array<SizeAttributes>;
  sortBy: Array<SortByAttributes>;
  colors: Array<ColorAttributes>;
  stores: Array<StoreAttributes>;
  filters: FiltersPayload;
  categories: {
    label: string;
    value: string;
  }[];
  subCategories: {
    label: string;
    value: string;
  }[];
  category: string[];
  subCategory: string[];
  from: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CatalogueFilterController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getColorsApiCallId = "";
  getSizesApiCallId = "";
  getStoresApiCallId = "";
  getCategoriesApiCallId = "";
  getSubCategoriesApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      loading: true,
      selectedFilter: "price",
      minPrice: "",
      maxPrice: "",
      sizes: [],
      colors: [],
      categories: [],
      category: [],
      subCategory: [],
      subCategories: [],
      stores: [
        {
          "id": 2,
          "store_name": "AStore 134489754cbbc",
          selected: false
        },
        {
          "id": 1,
          "store_name": "AStore 134489754cbbc",
          selected: false
        }
      ],
      sortBy: [
        {
          id: 1,
          value: "most_recent",
          name: i18n.t("mostRecent"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          selected: false,
        },
        {
          id: 2,
          value: "oldest_first",
          name: i18n.t("oldestFirst"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          selected: false,
        },

        {
          id: 3,
          value: "price_asc",
          name: i18n.t("priceLowToHigh"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          selected: false,
        },
        {
          id: 4,
          value: "price_desc",
          name: i18n.t("priceHighToLow"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          selected: false,
        },
        {
          id: 5,
          value: "popularity",
          name: i18n.t("popularity"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          selected: false,
        },
      ],
      filters: {
        filters: { sizes: [], colors: [], stores: [], categories: [], subCategory: [], sort: "" },
        backKey: "",
      },
      from: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      return this.handleApiResponses(message);
    }
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const filters = message.getData(
        getName(MessageEnum.CatalogueFilters)
      ) as FiltersPayload;
      this.setState({
        filters : filters,
        minPrice: filters.filters.minPrice || "",
        maxPrice: filters.filters.maxPrice || "",
        from: filters.from || "",
        category : filters.filters.categories || [],
        subCategory : filters.filters.subCategory || [],
      });
      if (filters.filters.sort) {
        let x = this.state.sortBy.findIndex((item: SortByAttributes) => item.value === filters.filters.sort);
        this.toggleSort(x);
      }
      this.getSizeList();
      this.getColorsList();
      this.getStoresList();
      this.getCategoriesList();
      this.getSubCategoriesList();
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  handleApiResponses = (message: Message) => {
    const apiCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiCallId) {
      case this.getColorsApiCallId:
        this.handleColorResponse(responseJson);
        break;
      case this.getSizesApiCallId:
        this.handleSizeResponse(responseJson);
        break;
      case this.getCategoriesApiCallId:
        this.handleCategoriesResponse(responseJson);
        break;
      case this.getSubCategoriesApiCallId:
        this.handleSubCategoriesResponse(responseJson);
        break;
      case this.getStoresApiCallId:
        this.handleStoresResponse(responseJson);
        break;
      default:
        break;
    }
  };

  handleSizeResponse = (response: SizesResponse) => {
    if (response.data) {
      const sizes = response.data.map((size) => {
        return {
          ...size.attributes,
          selected: this.state.filters.filters.sizes.includes(
            size.attributes.id
          ),
        };
      });
      this.setState({ sizes });
    }
  };

  handleStoresResponse = (response: StoreResponse) => {
    if (response.data) {
      const stores = response.data.map((store) => {
        return {
          ...store.attributes,
          selected: this.state.filters.filters.stores.includes(
            store.attributes.id
          ),
        };
      });
      this.setState({ stores });
    }
  };

  handleCategoriesResponse = (response: CategoriesResponse) => {
    if (response.data) {
      const formattedData = response.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ categories: formattedData });
    }
  };

  handleSubCategoriesResponse = (response: any) => {
    //SubCategoriesResponse
    if (response.data) {
      const formattedData = response.data.map(
        (item: { attributes: { name: string; id: number } }) => ({
          label: item.attributes.name,
          value: item.attributes.id.toString(),
        })
      );

      this.setState({ subCategories: formattedData });
    }
  };

  handleColorResponse = (response: ColorsResponse) => {
    if (response.data) {
      this.setState({
        colors: response.data.map((color) => ({
          ...color.attributes,
          selected: this.state.filters.filters.colors.includes(
            color.attributes.id
          ),
        })),
      });
    }
  };

  goBack = () => this.props.navigation.goBack();

  get filters(): Array<[FilterType, string]> {
    switch (this.state.from) {
      case "home":
        return [
          ["price", i18n.t("price")],
          ["size", i18n.t("size")],
          ["color", i18n.t("color")],
          ["sort", i18n.t("sort")],
          ["category", i18n.t("category")],
          ["stores", i18n.t("stores")],
        ];
      case "store":
        return [
          ["price", i18n.t("price")],
          ["size", i18n.t("size")],
          ["color", i18n.t("color")],
          ["sort", i18n.t("sort")],
          ["category", i18n.t("category")],
        ];
      default:
        return [
          ["price", i18n.t("price")],
          ["size", i18n.t("size")],
          ["color", i18n.t("color")],
          ["stores", i18n.t("stores")],
        ];
    }
  }

  filtersLength = () => {
    return this.filters.length;
  };

  getFilter = (_filter: unknown, filterIndex: number) => {
    return this.filters[filterIndex];
  };

  selectFilter = (filter: FilterType) => {
    this.setState({ selectedFilter: filter });
  };

  updateMinPrice = (price: string) => {
    if (/^\d*$/.test(price)) {
      this.setState({ minPrice: price });
    }
  };

  updateMaxPrice = (price: string) => {
    if (/^\d*$/.test(price)) {
      this.setState({ maxPrice: price });
    }
  };

  sizesCount = () => this.state.sizes.length;

  sortBYCount = () => this.state.sortBy.length;

  storesCount = () => this.state.stores.length;

  getSize = (_size: unknown, sizeIndex: number) => this.state.sizes[sizeIndex];

  getStore = (_store: unknown, storeIndex: number) =>
    this.state.stores[storeIndex];

  getSortBy = (_sortBy: unknown, sortIndex: number) =>
    this.state.sortBy[sortIndex];

  colorsCount = () => this.state.colors.length;

  getColor = (_color: unknown, colorIndex: number) => {
    return this.state.colors[colorIndex];
  };

  toggleSize = (sizeIndex: number) => {
    this.setState(({ sizes }) => {
      const _sizes = [...sizes];
      _sizes[sizeIndex].selected = !_sizes[sizeIndex].selected;
      return { sizes: _sizes };
    });
  };

  toggleStore = (storeIndex: number) => {
    this.setState(({ stores }) => {
      const _stores = [...stores];
      _stores[storeIndex].selected = !_stores[storeIndex].selected;
      return { stores: _stores };
    });
  };

  toggleSort = (sortIndex: number) => {
    this.setState(({ sortBy }) => {
      const _sortBy = sortBy.map((item, index) => ({
        ...item,
        selected: index === sortIndex,
      }));
      return { sortBy: _sortBy };
    });
  };

  toggleColor = (colorIndex: number) => {
    this.setState(({ colors }) => {
      const _colors = [...colors];
      _colors[colorIndex].selected = !_colors[colorIndex].selected;
      return { colors: _colors };
    });
  };

  handleCategorySelect = (item: string[]) => {
    this.setState({
      category: item,
    });
  };

  handleCategoryRemoveItem = (item: string) => {
    const category = this.state.category;
    const index = category.indexOf(item);
    category.splice(index, 1);
    this.setState({ category: category });
  };

  handleSubCategorySelect = (item: string[]) => {
    this.setState({
      subCategory: item,
    });
  };

  handleSubCategoryRemoveItem = (item: string) => {
    const subCategory = this.state.subCategory;
    const index = subCategory.indexOf(item);
    subCategory.splice(index, 1);
    this.setState({ subCategory: subCategory });
  };

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
    runEngine.sendMessage(message.messageId, message);
  };

  getColorsList = () => {
    this.apiCall(
      configJSON.getColorListApiEndPoint,
      configJSON.getColorListMethod,
      null,
      null,
      (messageId) => {
        this.getColorsApiCallId = messageId;
      }
    );
  };

  getSizeList = () => {
    this.apiCall(
      configJSON.getSizeApiEndPoint,
      configJSON.getSizeApiMethod,
      null,
      null,
      (messageId) => {
        this.getSizesApiCallId = messageId;
      }
    );
  };

  getStoresList = () => {
    this.apiCall(
      configJSON.getStoresApiEndPoint,
      configJSON.getStoresApiMethod,
      null,
      null,
      (messageId) => {
        this.getStoresApiCallId = messageId;
      }
    );
  };

  getCategoriesList = () => {
    this.apiCall(
      configJSON.getCategoriesApiEndPoint,
      configJSON.getCategoriesApiMethod,
      null,
      null,
      (messageId) => {
        this.getCategoriesApiCallId = messageId;
      }
    );
  };

  getSubCategoriesList = () => {
    this.apiCall(
      configJSON.getSubCategoriesApiEndPoint + `${this.state.category.join(",")}`,
      configJSON.getSubCategoriesApiMethod,
      null,
      null,
      (messageId) => {
        this.getSubCategoriesApiCallId = messageId;
      }
    );
  };

  clearAllFilter = () => {
    this.setState(({ sizes, colors, stores }) => {
      return {
        selectedFilter: "price",
        maxPrice: "",
        minPrice: "",
        sizes: sizes.map((size) => ({ ...size, selected: false })),
        stores: stores.map((store) => ({ ...store, selected: false })),
        colors: colors.map((color) => ({ ...color, selected: false })),
        sortBy: this.state.sortBy.map((sort) => ({ ...sort, selected: false })),
        category: [],
        subCategory: [],
      };
    });
  };

  applyFilter = () => {
    const sizes: Array<number> = [];
    for (const size of this.state.sizes) {
      if (size.selected) {
        sizes.push(size.id);
      }
    }

    const stores: Array<number> = [];
    for (const store of this.state.stores) {
      if (store.selected) {
        stores.push(store.id);
      }
    }

    const colors: Array<number> = [];
    for (const color of this.state.colors) {
      if (color.selected) {
        colors.push(color.id);
      }
    }

    const currentSort = this.state.sortBy.find(
      (item) => item.selected === true
    );
    const sort = currentSort ? currentSort.value : "";

    let filters;

    if (this.state.from === "home") {
      filters = {
        sizes,
        colors,
        stores,
        maxPrice: this.state.maxPrice,
        minPrice: this.state.minPrice,
        sort: sort,
        categories: this.state.category,
        subCategory: this.state.subCategory,
      };
    } else if (this.state.from === "store") {
      filters = {
        sizes,
        colors,
        maxPrice: this.state.maxPrice,
        minPrice: this.state.minPrice,
        sort: sort,
        categories: this.state.category,
        subCategory: this.state.subCategory,
      };
    } else {
      filters = {
        sizes,
        colors,
        stores,
        maxPrice: this.state.maxPrice,
        minPrice: this.state.minPrice,
      };
    }
    

    const setParamsAction = NavigationActions.setParams({
      params: {
        filters: filters,
      },
      key: this.state.filters.backKey,
    });
    this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
