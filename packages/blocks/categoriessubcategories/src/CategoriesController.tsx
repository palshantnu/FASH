import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Category, StoreData, StoresSuccessResponse } from "./response";
import i18n from "../../../components/src/i18n/i18n.config";
import { getStorageData } from "framework/src/Utilities";
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
  selectedTopCategory: number;
  categoryBgColor: string;
  shopBgColor: string;
  categoryTextColor: string;
  shopTextColor: string;
  categoryArr: Category[];
  categorySelectStatus: string;
  shopArr: StoreData[];
  shopSearchTxt: string;
  loading: boolean;
  token: string;
  selectedCategoryId: number;
  prevPage: number;
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  pageSize: number;
  catalogueType: string;
  headerMessage: string;
  showStoreCategoryByStoreId: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CategoriesController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getCategoryApiCallId = "";
  getShopApiCallId = "";
  didFocusListener: NavEvent | null = null;
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      selectedTopCategory: 1,
      categoryBgColor: "#CCBEB1",
      shopBgColor: "#F4F4F4",
      categoryTextColor: "#ffffff",
      shopTextColor: "#375280",
      categoryArr: [],
      categorySelectStatus: "All",
      shopArr: [],
      shopSearchTxt: "",
      loading: true,
      token: "",
      selectedCategoryId: 0,
      prevPage: 0,
      currentPage: 0,
      nextPage: null,
      totalPages: 0,
      pageSize: 10,
      catalogueType: "",
      headerMessage: "",
      showStoreCategoryByStoreId: "",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getToken();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.getToken();
      }
    );
  }

  async componentWillUnmount() {
    this.didFocusListener!.remove();
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    this.getTokenAndId(message);

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.handleNavigationPayload(message);
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.getCategoryApiCallId) {
          this.setState({ loading: false, categoryArr: responseJson.data });
        }

        if (apiRequestCallId === this.getShopApiCallId) {
          this.shopSuccessData(responseJson);
        }
      } else if (errorReponse) {
        this.setState({ loading: false });
        this.parseApiErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }

  getTokenAndId = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token });
    }
  };

  handleNavigationPayload = (message: Message) => {
    const catalogueTypeGet = message.getData(
      getName(MessageEnum.catalogueType)
    );
    const ShowByStoreIdPayload = message.getData(
      getName(MessageEnum.ShowByStoreId)
    );
    if (catalogueTypeGet) {
      this.setState(
        {
          catalogueType: catalogueTypeGet,
          selectedTopCategory: catalogueTypeGet === "store" ? 2 : 1,
          headerMessage:
            catalogueTypeGet === "store"
              ? i18n.t("stores")
              : i18n.t("categoriesText"),
          showStoreCategoryByStoreId: ShowByStoreIdPayload ?? "",
        },
        () => {
          if (catalogueTypeGet === "store") {
            this.getAllShops("normal", "");
          } else {
            this.getCategorires();
          }
        }
      );
    }
  };

  getCategorires = () => {
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };
    const endpoint = this.state.showStoreCategoryByStoreId
      ? configJSON.categoryByStoreIdEndpoint +
        "?get_feature=category" +
        `&store_id=${this.state.showStoreCategoryByStoreId}`
      : configJSON.categoryAPIEndPoint;
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCategoryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  defaultPaginationShop = () => {
    this.setState({
      prevPage: 0,
      currentPage: 0,
      nextPage: 1,
      totalPages: 0,
      shopArr: [],
    });
  };

  getAllShops = async (callingType: string, searchValue: string) => {
    let nextPage = this.state.nextPage;
    if (callingType === "normal") {
      if (this.state.nextPage === null) {
        nextPage = 1;
      }
      this.defaultPaginationShop();
    } else {
      if (this.state.nextPage == null) {
        return false;
      }
    }
    const latLong = await getStorageData("buyerCoordinateAddressMap", true);

    const headerShop = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getShopApiCallId = requestMessage.messageId;

    let apiEndpoint =
      configJSON.shopAPIEndPoint +
      "?user_id=0&page=" +
      nextPage +
      "&per_page=" +
      this.state.pageSize;

    if (latLong) {
      apiEndpoint +=
        "&latitude=" + latLong.buyLat + "&longitude=" + latLong.buyLong;
    }

    if (searchValue.trimStart() !== "") {
      apiEndpoint += "&search=" + searchValue.trimStart();
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      apiEndpoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerShop)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };
  subCategoryRedirection = (categoryItem: Category) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationSubCateMessage)
    );
    message.initializeFromObject({
      [getName(MessageEnum.categoryIdMessage)]: categoryItem.id,
      [getName(MessageEnum.categoryNameMessage)]: categoryItem.attributes.name,
      [getName(MessageEnum.categoryArrMessage)]: this.state.categoryArr,
      [getName(MessageEnum.ShowByStoreId)]:
        this.state.showStoreCategoryByStoreId,
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };

  shopDetailRedirect = (shopId: number | string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationStoreProfileMessage)
    );
    message.addData(getName(MessageEnum.storeIDMessage), shopId);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  shopSuccessData = (responseJson: StoresSuccessResponse) => {
    if (responseJson.data !== undefined) {
      const data = responseJson.data.data;
      const pagination = responseJson.meta;
      if (data !== null) {
        this.setState(({ shopArr, currentPage }) => {
          let shopData = [...shopArr, ...data];
          if (currentPage === pagination.current_page) {
            shopData = data;
          }
          return {
            loading: false,
            shopArr: shopData,
            nextPage: pagination.next_page,
            prevPage: pagination.prev_page ?? 0,
            totalPages: pagination.total_pages,
            currentPage: pagination.current_page,
          };
        });
      } else {
        this.setState({
          loading: false,
          shopArr: [],
          currentPage: 0,
          nextPage: 1,
          prevPage: 0,
          totalPages: 0,
        });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  searchShops = (text: string) => {
    this.getAllShops("normal", text.trimStart());
  };

  // Customizable Area End
}
