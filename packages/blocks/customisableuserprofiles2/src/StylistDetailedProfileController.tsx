import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";

// Customizable Area Start
export interface SubImageRoot2 {
  imageId: number
  image: any
}

interface PortfolioImageAttributes {
  id: number;
  description: string;
  image_url: string;
  stylist_id: number;
  bio: string;
  profile_picture: string;
  name: string;
}

interface PortfolioImageData {
  stylist_id: number,
  bio: string,
  profile_picture : string,
  name: string,
}

interface MetaData {
  is_fav: boolean;
  is_hired: boolean;
  request_status: string;
}

interface PortfolioImageResponse {
  data: PortfolioImageData;
  meta: MetaData;
}

import { showMessage } from "react-native-flash-message";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  loading: boolean;
  token: string;
  chunkedArray: SubImageRoot2[][],
  imageData: SubImageRoot2[],
  user_id: string,
  stylist_id: string,
  apiData :PortfolioImageResponse,
  isHired: boolean
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class StylistDetailedProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPortfolioApiCallID = "";
  getPortfolioImagesApiCallID = "";
  updateFavApiCallID = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
        loading: false,
        chunkedArray: [],
        imageData: [],
        token: "",
        user_id: "",
        stylist_id: "",
        apiData: {} as PortfolioImageResponse,
        isHired: false,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
      return;
    }
  
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestAPIResponseMessage(message);
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start

  private handleNavigationPayloadMessage(message: Message) {
    let data = message.getData(getName(MessageEnum.StylistProfile));
    if (data != undefined) {
      this.setState({ stylist_id: data.stylist_id });
      this.getPortfolio(this.state.token);
    }
  }
  
  
  private handleRestAPIResponseMessage(message: Message) {
    const dataMessage = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
  
    if (this.getPortfolioImagesApiCallID === dataMessage) {
      this.handlePortfolioImagesResponse(message);
    } else if (this.getPortfolioApiCallID === dataMessage) {
      this.handlePortfolioResponse(message);
    } else if (this.updateFavApiCallID === dataMessage) {
      this.handleUpdateFavResponse(message);
    }
  }
  
  private handlePortfolioImagesResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!responseJson.errors) {
      this.setState({ imageData: responseJson.data[0]?.attributes?.images }, () => {
        if (this.state.imageData?.length> 0) {
          this.chunkArray(this.state.imageData, 3);
        } else {
          this.setState({ loading: false });
        }
      });
    } 
  }
  
  private handlePortfolioResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (!responseJson.errors) {
      this.setState({ apiData: responseJson, isHired : responseJson.meta.is_hired }, () => {
        this.getPortfolioImages(this.state.stylist_id);
      });
    }
  }
  
  private handleUpdateFavResponse(message: Message) {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (responseJson.message) {
      this.setState({ loading: false });
      this.getPortfolio(this.state.token);
      this.showStylistFavMessage(this.state.apiData.meta.is_fav);
    }
  }

  showStylistFavMessage = (isFav: boolean) => {
    if (!isFav) {
      showMessage({
        message: "Profile added to favorite",
        position: { top: 8 },
        type: "success",
      });
    }
    else {
      showMessage({
        message: "Profile removed from favorite",
        position: { top: 8 },
        type: "success",
      });
    }
  }

  getToken = async() => {
    let token = await getStorageData('token',true);
    if (token) {
      this.setState({ token: token }, () => {
        this.getPortfolio(this.state.token);
      });
    }
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

  getPortfolio = (token: string) => {
    this.setState({ loading: true })
    if (this.state.stylist_id == "" || this.state.stylist_id == undefined) {
      this.setState({ loading: false })
      return;
    }
    const header = {
      token:token
    };

    this.apiCall(
      `${configJSON.getPortfolioByStylistEndPoint}${this.state.stylist_id}`,
      configJSON.validationApiMethodType,
      header,
      null,
      (messageId) => {
        this.getPortfolioApiCallID = messageId;
      }
    );
  }

  handleFav = () => {
    this.setState({ loading: true })
    let formData = new FormData();
    formData.append("favorite", this.state.apiData.meta.is_fav ? "false" : "true");
    formData.append("id", `${this.state.stylist_id}`);
    const header = {
      token: this.state.token
    };

    this.apiCall(
      configJSON.updateFavEndPoint,
      configJSON.putApiMethod,
      header,
      formData,
      (messageId) => {
        this.updateFavApiCallID = messageId;
      }
    );
  }


  getPortfolioImages = (user_id: string) => {

    const header = {
      token: this.state.token
    };

    this.apiCall(
      `${configJSON.getPortfoliosImagesEndPoint}${user_id}`,
      configJSON.validationApiMethodType,
      header,
      null,
      (messageId) => {
        this.getPortfolioImagesApiCallID = messageId;
      }
    );
  };

  navigateToYetToDevelop = () => {
    const message = new Message(
        getName(MessageEnum.NavigationYetToBeDevelopedMessage)
      );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  navigateToHireStylistForm = () =>{
   const message = new Message(getName(MessageEnum.NavigationMessage));
  message.addData(getName(MessageEnum.NavigationTargetMessage), "RequirementForm");
  const raiseMessage: Message = new Message(
    getName(MessageEnum.NavigationPayLoadMessage)
    )
  message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
  raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
    stylistId: this.state.stylist_id
  });
  message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
  this.send(message)

  }

  NavigateToPricing = (from : string) => {
    const message = new Message(
      getName(MessageEnum.NavigationPricingMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.Pricing), {
      stylistId: this.state.stylist_id,
      from: from
    });
    this.send(message);
  }

  chunkArray = (array: SubImageRoot2[], chunkSize: number) => {
    const result: SubImageRoot2[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    this.setState({ chunkedArray: result, loading: false })
  };

  navigateToRequestCall = () => {
    const message = new Message(
      getName(MessageEnum.NavigationRequestCallMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.RequestCall), {
      stylistId: this.state.stylist_id
    });
    this.send(message);
  }

  navigateToSeeAll = () => {
    const message = new Message(
      getName(MessageEnum.NavigationSeeAllStylistPortfolioImageMessage)
    );
  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  message.addData(getName(MessageEnum.SeeAllStylistPortfolioImage), {
    stylistId : this.state.stylist_id
  });
  this.send(message);
  }


  goToProductByStylist =()=>{
    const message = new Message(
      getName(MessageEnum.NavigationProductByStylistMessage)
    );
  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  message.addData(getName(MessageEnum.ProductByStylist), this.state.stylist_id);
  this.send(message);
  }

  navigateToChat = (userID: any) => {
    const messageDetail: Message = new Message(
      getName(MessageEnum.NavigationMessage)
  );
  messageDetail.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'Chat'
  );
  messageDetail.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

  const raiseMessageDetail: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
  );

  raiseMessageDetail.addData(getName(MessageEnum.SessionResponseData), {
      userID
  });
  messageDetail.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageDetail);
  this.send(messageDetail);
  }
  // Customizable Area End
}