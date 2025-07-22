import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import i18n from "../../../components/src/i18n/i18n.config";

// Customizable Area Start
import { EmitterSubscription } from "react-native";
export type ImageRoot = Root2[][]

import { showMessage } from "react-native-flash-message";

export interface Root2 {
  imageId: number
  image: any
}

export type SubImageRoot = SubImageRoot2[]

export interface SubImageRoot2 {
  imageId: number
  image: any
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
  chunkedArray: any,
  imageData: SubImageRoot2[],
  loader: boolean,
  stylistPortfolioDetailDesc: string;
  stylistPortfolioDetailProfile: string
  portfolioImageID: string
  token: string
  stylistPortfolioProfilePic: string
  stylistPortfolioName: string
  stylistPortfolioIsFav: boolean
  stylistPortfolioIsHire: boolean
  stylistId: string
  isFavorite: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class StylishProfileDashboardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getPortfolioApiCallID = "";
  getPortfolioDetailsApiCallID = "";
  favoriteApiCallID = "";
  unFavoriteApiCallID: any = ""
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      , getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.SessionResponseData),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      chunkedArray: [],
      imageData: [],
      loader: false,
      stylistPortfolioDetailDesc: "",
      portfolioImageID: "",
      stylistPortfolioDetailProfile: "",
      token: "",
      stylistPortfolioProfilePic: "",
      stylistPortfolioName: "",
      stylistPortfolioIsFav: false,
      stylistPortfolioIsHire: false,
      stylistId: "",
      isFavorite: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      this.setState({chunkedArray:[]})
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token: token }, () => {
          this.getStylistPortfolio()
        })
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const catalogueData = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      if (catalogueData) {
        this.setState({
          portfolioImageID: catalogueData.item?.item?.portfolio_image_id
        }, () => { this.getStylistPortfolioDetails() });
      }
    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiRequestCallId) {
      case this.getPortfolioApiCallID:
        this.getPortfolioApi(responseJson)
        break;
      case this.getPortfolioDetailsApiCallID:
        this.getPortfolioDetailApi(responseJson)
        break;
      case this.favoriteApiCallID:
        this.favortieApi(responseJson)
        break;
      case this.unFavoriteApiCallID:
        this.unfavoriteApi(responseJson)
        break;

      default:
        break;
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getStylistPortfolio()
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    this.focusListener = this.props.navigation.addListener("willFocus", async () => {
      if (this.state.portfolioImageID !== "") {
        this.getStylistPortfolioDetails()
      }
    });
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  getPortfolioApi = async (responseJson: any) => {
    if (responseJson?.errors || responseJson === undefined) {
      this.setState({ loader: false }, () => {
        alert(i18n.t("noRecordFoundText"))
      })
    } else {
      this.setState({ imageData: responseJson.data }, () => {
        this.chunkArray(this.state.imageData, 3)
      })
    }
  }

  getPortfolioDetailApi = async (responseJson: any) => {
    this.settingDetailsPortfolio(responseJson)
  }

  favortieApi = async (responseJson: any) => {
    if (responseJson.message) {
      showMessage({
        message: i18n.t("profileAddedToFav"),
        position: { top: 8 },
        type: "success",
      });
      this.setState({ stylistPortfolioIsFav: true })
    } else {
      alert(responseJson?.error)
    }
  }

  unfavoriteApi = async (responseJson: any) => {
    if (responseJson.message) {
      showMessage({
        message: i18n.t("profileRemovedFromFav"),
        position: { top: 8 },
        type: "success",
      });
      this.setState({ stylistPortfolioIsFav: false })
    } else {
      alert(responseJson?.error)
    }
  }

  chunkArray = (array: any, chunkSize: number) => {
    const result: SubImageRoot2[][] = [];
    array.map((item: any) => {
      item?.attributes?.images?.map((val: any) => {
        result.push(val);
      })
    })
    for (let i = 0; i < result.length; i += chunkSize) {
      this.state.chunkedArray.push(result.slice(i, i + chunkSize))
    }
    this.setState({ loader: false })
  };

  navigateTo = (item: any) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'StylishProfileDetails'
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      item
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  }

  getStylistPortfolio = async () => {
    this.setState({ loader: true })

    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPortfolioApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/accounts/portfolio`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
  
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  stylistProfileBtn = () => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistProfileMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.StylistProfile), {
      stylist_id: this.state.stylistId,
    });
    this.send(message);
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  getStylistPortfolioDetails = async () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPortfolioDetailsApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `portfolio/buyer_show_portfolio_image?portfolio_image_id=${this.state.portfolioImageID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  settingDetailsPortfolio = (responseJson: any) => {
    if (responseJson?.errors) {
      this.setState({ loader: false }, () => {
        alert("No record found!")
      })
    } else {
      this.setState({
        stylistPortfolioDetailDesc: responseJson?.data?.attributes?.description,
        stylistPortfolioDetailProfile: responseJson?.data?.attributes?.image_url,
        stylistPortfolioIsFav: responseJson?.meta?.is_fav,
        stylistPortfolioIsHire: responseJson?.meta?.is_hired,
        stylistPortfolioName: responseJson?.data?.attributes?.name,
        stylistPortfolioProfilePic: responseJson?.data?.attributes?.profile_picture,
        stylistId: responseJson?.data?.attributes?.stylist_id
      })
    }
  }

  favoriteFunc = async () => {
    if(this.state.stylistPortfolioIsFav === true) {
      this.unFavoriteFunc()
    } else {
      this.heartFunc()
    }
  }

  heartFunc = async () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const httpBody = {
      id: this.state.stylistId 
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.favoriteApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/account_block/buyer_favourites`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  unFavoriteFunc = async () => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.unFavoriteApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/account_block/buyer_favourites/${this.state.stylistId}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  // Customizable Area End
}
