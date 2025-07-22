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
  Stylist,
  StylistListResponse,
  StylistMeta,
} from "../__tests__/__mocks__/types";
import i18n from '../../../components/src/i18n/i18n.config';
import { getStorageData } from "../../../framework/src/Utilities";
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
  stylists: Stylist[];
  meta: StylistMeta;
  search: string;
  emptyMessage: string;
  favouriteList: Record<string, boolean>;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class StylistListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  focusListener = { remove: () => {} } as EmitterSubscription;
  getStylistsApiCallId = "";
  searchStylistApiCallId = "";
  loadMoreApiCallId = "";
  markFavouriteApiCallId = "";
  removeFavouriteApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token: "",
      loading: true,
      stylists: [],
      meta: {} as StylistMeta,
      search: "",
      emptyMessage: i18n.t('noStylistAvailableText'),
      favouriteList: {},
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      switch (apiCallId) {
        case this.getStylistsApiCallId:
          this.setState({ favouriteList: {}})
          let response = responseJson as StylistListResponse;
          if (response.data) {
            this.setState({
              stylists: response.data,
              meta: response.meta,
              favouriteList: this.parseFavourites(response),
              loading: false,
              emptyMessage: i18n.t('noStylistFoundText'),
              search: "",
            });
          }
          this.getStylistsApiCallId = "fetched";
          this.searchStylistApiCallId = "";
          break;
        case this.searchStylistApiCallId:
          const sResponse = responseJson as StylistListResponse;
          this.handleSearchResponse(sResponse);
          break;
        case this.loadMoreApiCallId:
          const lResponse = responseJson as StylistListResponse;
          this.handleLoadMore(lResponse);
          break;
        case this.markFavouriteApiCallId:
        case this.removeFavouriteApiCallId:
          let newMessage = responseJson.message.replace('favorites', "favourites")
          showMessage({
            message: newMessage,
            position: { top: 8 },
            type: "success",
          });
          this.setState({ loading: false });
          break;
        default:
          break;
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    await this.getData();
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      this.getData();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  getData = async () => {
    const token = await getStorageData("token", true);
    this.setState({ token }, () => this.listStylists(token));
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  onSearchKeyChange = (text: string) => {
    this.setState({ search: text });
  };

  listStylists = (token: string) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.listStylistEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.apiMethodTypeGet,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token,
      }),
    });

    this.setState({ loading: true });
    this.getStylistsApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  searchStylist = () => {
    if (!this.state.search) {
      return this.listStylists(this.state.token);
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.searchStylistEndpoint + this.state.search,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.apiMethodTypeGet,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });

    this.setState({ loading: true });
    this.searchStylistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  handleSearchResponse = (response: StylistListResponse) => {
    if (response.data) {
      this.setState({
        stylists: response.data,
        loading: false,
        meta: response.meta,
        favouriteList: this.parseFavourites(response),
      });
    } else {
      this.setState(({ search }) => ({
        stylists: [],
        loading: false,
        meta: response.meta,
        emptyMessage: i18n.t('noStylistsMatchingText')+' "' + search + '"',
      }));
    }
    this.getStylistsApiCallId = "";
    this.searchStylistApiCallId = "searched";
  };

  loadMore = () => {
    if (!this.state.meta.next_page) {
      return;
    }
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const endpoint = this.searchStylistApiCallId
      ? configJSON.searchStylistEndpoint + this.state.search
      : configJSON.listStylistEndpoint;
    const params =
      (this.searchStylistApiCallId ? "&" : "?") +
      `per_page=20&page=${this.state.meta.next_page}`;
    message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]: endpoint + params,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.apiMethodTypeGet,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
         token: this.state.token,
        }),
    });

    this.setState({ loading: true });
      this.loadMoreApiCallId = message.messageId;
      runEngine.sendMessage(message.messageId, message);
  };

  handleLoadMore = (response: StylistListResponse) => {
    if (response.data) {
      this.setState(({ stylists }) => ({
        stylists: [...stylists, ...response.data],
        meta: response.meta,
        favouriteList: this.parseFavourites(response),
        loading: false,
      }));
    } else {
      this.setState({ loading: false });
    }
  };

  markFavourite = (stylistId: string | number) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.updateFavouriteEndpoint,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.submitSourceProductApiMethod,
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
        "Content-Type": "application/json",
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        id: stylistId,
      }),
    });

    this.markFavouriteApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  goToStylistPortfolio = (stylistId: string | number) => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistProfileMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.StylistProfile), {
      stylist_id: stylistId,
    });
    this.send(message);
  }

  removeFavorite = (stylistId: string | number) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          configJSON.updateFavouriteEndpoint + "/" + stylistId,
        [getName(MessageEnum.RestAPIRequestMethodMessage)]:
          configJSON.deleteSourceProductApiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });

    this.removeFavouriteApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  parseFavourites = (response: StylistListResponse): S["favouriteList"] => {
    const newItems: S["favouriteList"] = {};
    for (const stylist of response.data) {
      if (stylist.attributes.is_favorite) {
        newItems[stylist.id] = true;
      }
    }
    return {
      ...this.state.favouriteList,
      ...newItems,
    };
  };

  toggleFavourite = (stylistId: string) => {
    this.setState(({ favouriteList }) => {
      if (favouriteList[stylistId]) {
        this.removeFavorite(stylistId);
      } else {
        this.markFavourite(stylistId);
      }
      return {
        favouriteList: {
          ...favouriteList,
          [stylistId]: !favouriteList[stylistId],
        },
        loading: true,
      };
    });
  };
  // Customizable Area End
}
