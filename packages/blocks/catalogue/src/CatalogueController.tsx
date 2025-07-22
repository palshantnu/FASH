import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { EmitterSubscription } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  Catalogue,
  CatalogueSuccessResponse,
  FiltersPayload,
} from "./response";
import { getStorageData } from "framework/src/Utilities";
import { showAlert } from "../../../components/src/CustomAlert";
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
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  fromSubCatagory: boolean;
  subCategoryId: number;
  catalogueArr: Catalogue[];
  subCategoryName: string;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  prev_page: number | null;
  page_size: number;
  loading: boolean;
  catalogueSearchTxt: string;
  searchEmptyMessage: string;
  storeId: string;
  isSeller: boolean;
  filters: FiltersPayload["filters"];
  stylistWishlist: { isStylist: boolean; wishlistId: string | number };
  localCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getProductApiCallId = "";
  addWishlistApiCallId = "";
  removeWishlistApiCallId = "";
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      // Customizable Area Start
      fromSubCatagory: false,
      subCategoryId: 0,
      catalogueArr: [],
      subCategoryName: "",
      current_page: 0,
      next_page: 1,
      prev_page: 0,
      total_pages: 0,
      page_size: 10,
      loading: false,
      catalogueSearchTxt: "",
      searchEmptyMessage: "",
      storeId: "",
      isSeller: false,
      filters: {
        sizes: [],
        colors: [],
        stores: [],
        categories: [],
        subCategory: [],
        sort: "",
      },
      stylistWishlist: { isStylist: false, wishlistId: 0 },
      localCurrency:''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
        const stylistCheck = await getStorageData("stylistFromwishlist");
        this.setState({ stylistWishlist: JSON.parse(stylistCheck) });
        const filters = this.props.navigation.getParam(
          "filters",
          this.state.filters
        );
        this.defaultPaginationCatalogue();
        this.setState({ filters }, () => {
          this.getListRequest(
            "normal",
            this.state.subCategoryId,
            this.state.token
          );
        });
      }
    );
    const mode = (await getStorageData("FA_LOGIN_MODE")) as string;
    if (mode.toLocaleLowerCase() === "seller") {
      this.getToken();
      this.setState({ isSeller: true });
    }
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    this.getTokenAndValueId(message);
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getProductApiCallId !== null &&
      this.getProductApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.successData(responseJson);
      } else {
        this.setState({ loading: false });
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    this.handleWishlistResponse(message);
    // Customizable Area End
  }

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  getTokenAndValueId = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token: token });
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const subCategoryId = message.getData(
        getName(MessageEnum.SubCategoryIdMessage)
      );
      const sessionToken =
        message.getData(getName(MessageEnum.navigationTokenMessage)) ??
        this.state.token;
      const subCategoryName = message.getData(
        getName(MessageEnum.subCategoryNameMessage)
      );
      const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
      if (subCategoryName !== "" && subCategoryName) {
        this.setState({
          fromSubCatagory: true,
        });
      }
      if (subCategoryId && subCategoryName) {
        this.setState({
          subCategoryId: subCategoryId,
          subCategoryName: subCategoryName,
          storeId: storeId ?? "",
          token: sessionToken,
        });
        this.getListRequest("normal", subCategoryId, sessionToken);
      }
    }
  };

  catalogueDetailRedirection = (catalogueId: number | string) => {
    this.setState({ catalogueSearchTxt: "" });
    const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), catalogueId);
    message.addData(getName(MessageEnum.ShowByStoreId), this.state.isSeller);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  priceConvertValue = (value: number | string) => {
    if (value === null) {
      return "0";
    } else {
      return value;
    }
  };

  defaultPaginationCatalogue = () => {
    this.setState({
      prev_page: 0,
      current_page: 0,
      next_page: 1,
      total_pages: 0,
      catalogueArr: [],
    });
  };

  successData = (responseJson: CatalogueSuccessResponse) => {
    const prev_data = this.state.catalogueArr;
    const pagination = responseJson.meta;
    if (responseJson.data != null) {
      this.setState({
        loading: false,
        catalogueArr: [...prev_data, ...responseJson.data],
        next_page: pagination.next_page,
        prev_page: pagination.prev_page,
        total_pages: pagination.total_pages,
        current_page: pagination.current_page,
      });
    } else {
      this.setState({
        loading: false,
        catalogueArr: [],
        current_page: 0,
        next_page: 1,
        prev_page: 0,
        total_pages: 0,
      });
    }
  };

  searchCatalogue = () => {
    this.setState(
      { current_page: 0, next_page: 1, prev_page: 0, total_pages: 0 },
      () => {
        this.getListRequest(
          "normal",
          this.state.subCategoryId,
          this.state.token,
          this.state.catalogueSearchTxt.trimStart()
        );
      }
    );
  };

  getListRequest = async(
    callingType: string,
    subCategoryId: number,
    token: string,
    searchTxt: string = ""
  ) => {
    let {
      next_page,
      total_pages,
      page_size,
      filters,
      fromSubCatagory,
      storeId,
      subCategoryName,
    } = this.state;
    if (callingType === "normal") {
      if (total_pages === 1) {
        next_page = 1;
      }
      this.defaultPaginationCatalogue();
    } else if (next_page == null) {
      return false;
    }

    this.setState({ loading: true });

    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;

    const filtersUri = this.getFilterUri(filters);
 
    let apiEndPoint = "";

    // get user lat long from loacl storage
    const latLong = await getStorageData('buyerCoordinateAddressMap', true);

    switch (true) {
      case fromSubCatagory && !!storeId:
        apiEndPoint = `${configJSON.getCatalogueByStore}?store_id=${storeId}&sub_sub_category_id=${subCategoryId}&page=${next_page}&per_page=${page_size}&search=${searchTxt}${filtersUri}`;
        break;
      case fromSubCatagory && !storeId:
        apiEndPoint = `${this.getCatalogueListEndpoint(this.state.token)}?sub_sub_category_ids[]=${subCategoryId}&page=${next_page}&per_page=${page_size}${filtersUri}`;
        break;
      default:
        apiEndPoint = `${configJSON.getBySearchAndFilterApiEndPoint}?page=${next_page}&per_page=${page_size}&search=${searchTxt}${filtersUri}`;
        break;
    }

    if (latLong) {
      apiEndPoint += `&latitude=${latLong.buyLat}&longitude=${latLong.buyLong}`;
    }

    this.setState({
      searchEmptyMessage:
        searchTxt ||
        (filtersUri
          ? " with the applied filters"
          : ` named '${subCategoryName}'`),
    });
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      fromSubCatagory ? JSON.stringify(header) : null
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  checkSpecialCharacter = (value: string) => {
    let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
    if (!regexSp.test(value)) {
      this.setState({ catalogueSearchTxt: value.trimStart() });
    }
  };

  // to be modified for fromSubCatagory false
  getFilterUri = (filters: FiltersPayload["filters"]) => {
    let query = "";
    const addFilter = (key: string, value?: string | string[] | null) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    };

    addFilter("min_price", filters.minPrice);
    addFilter("max_price", filters.maxPrice);
    addFilter("catalogue_variant_size_ids[]", filters.sizes.join(","));
    addFilter("catalogue_variant_color_ids[]", filters.colors.join(","));
    addFilter("store_ids[]", filters.stores.join(","));

    if (!this.state.fromSubCatagory) {
      addFilter("category_ids[]", filters.categories?.join(","));
      addFilter("sub_category_ids[]", filters.subCategory?.join(","));
      addFilter("sort", filters.sort);
    }

    return query;
  };

  goToFilter = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCatalogueFilterMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.CatalogueFilters), {
      backKey: this.props.navigation.state.key,
      filters: this.state.filters,
      from: "catalogue",
    });
    this.send(message);
  };

  goToFilterFromHome = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCatalogueFilterMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.CatalogueFilters), {
      backKey: this.props.navigation.state.key,
      filters: this.state.filters,
      from: "home",
    });
    this.send(message);
  };

  getCatalogueListEndpoint = (token?: string) => {
    if (token) {
      return configJSON.catalogueListEndpoint;
    }
    return configJSON.productAPiEndPoint;
  };

  removeFromWishlist = (catalogueId: string | number) => {
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.removeWishlistApiCallId = messsage.messageId;
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.remWishlistEndpoint + String(catalogueId),
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
    });

    runEngine.sendMessage(messsage.messageId, messsage);
  };

  addToWishlist = (catalogueId: string | number) => {
    let apiBody;
    if (this.state.stylistWishlist?.isStylist) {
      apiBody = {
        data: {
          favouriteable_id: catalogueId,
          wishlist_id: this.state.stylistWishlist.wishlistId,
        },
      };
    } else {
      apiBody = {
        data: {
          favouriteable_id: catalogueId,
        },
      };
    }
    const messsage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    messsage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.addWishlistEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.postMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify(apiBody),
    });

    this.addWishlistApiCallId = messsage.messageId;
    runEngine.sendMessage(messsage.messageId, messsage);
  };

  goToSignIn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  toggleWishlist = (catalogue: Catalogue) => {
    if (this.state.token) {
      this.setState(({ catalogueArr }) => {
        const updatedArray = [...catalogueArr];
        const catalogueIndex = updatedArray.findIndex(
          (ctlg) => catalogue.id === ctlg.id
        );
        updatedArray[catalogueIndex].attributes.is_wishlist =
          !catalogueArr[catalogueIndex].attributes.is_wishlist;
        return { catalogueArr: updatedArray };
      });
      if (catalogue.attributes.is_wishlist) {
        this.removeFromWishlist(catalogue.id);
      } else {
        this.addToWishlist(catalogue.id);
      }
    } else {
      showAlert({
        messsage: i18n.t("youNeedToSignInToCreateWishlistCat"),
        okButton: {
          text: i18n.t("signInCat"),
          onPress: () => this.goToSignIn(),
        },
        cancelButton: { text: i18n.t("cancel") },
      });
    }
  };

  handleWishlistResponse = (message: Message) => {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (
        [this.addWishlistApiCallId, this.removeWishlistApiCallId].includes(
          apiCallId
        )
      ) {
        showMessage({
          type: "success",
          position: { top: 8 },
          message:
            apiCallId === this.addWishlistApiCallId
              ? i18n.t("itemAddedToWishlistCatalogue")
              : i18n.t("itemRemovedFromWishlistCatalogue"),
        });
      }
    }
  };

  
  // Customizable Area End
}
