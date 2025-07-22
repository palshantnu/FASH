import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";

export interface StylistFavAttributeProps {
  full_name: string;
  profile_picture: string;
  bio: string;
}

export interface AllFavStylistArrProps {
  id: string;
  attributes: StylistFavAttributeProps;
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
  allFavStylistArr: AllFavStylistArrProps[];
  allFavStylistArrUpdate: AllFavStylistArrProps[];
  token: string;
  loading: boolean;
  stylistSearchTxt: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformBuyerfavStylistController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getBuyerAllFavStylistApiCallId = "";
  buyerFavStylistRemoveApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      allFavStylistArr: [],
      allFavStylistArrUpdate: [],
      token: "",
      loading: false,
      stylistSearchTxt: "",
    };

    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(_from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleAllFavStylistApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getBuyerAllFavStylist();

    this.props.navigation.addListener("willFocus", () => {
      this.getBuyerAllFavStylist();
    });
    // Customizable Area End
  }

  checkSpecialCharacter = (value: string) => {
    let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
    if (!regexSp.test(value)) {
      this.setState({ stylistSearchTxt: value.trimStart() });
    }
  };

  getBuyerAllFavStylist = async () => {
    let token = await getStorageData("token", true);
    this.setState({ loading: true, token: token });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getBuyerAllFavStylistApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getBuyerFavStylistApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleAllFavStylistApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    if (responseJson) {
      if (apiRequestCallId === this.getBuyerAllFavStylistApiCallId) {
        if (responseJson.errors === undefined) {
          this.setState({
            allFavStylistArr: responseJson.data,
            allFavStylistArrUpdate: responseJson.data,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      }
      if (apiRequestCallId === this.buyerFavStylistRemoveApiCallId) {
        showMessage({
          message: i18n.t("stylistRemovedText"),
          position: { top: 8 },
          type: "success",
        });
        this.getBuyerAllFavStylist();
      }
    }
  };

  searchFavStylist = () => {
    let text = this.state.stylistSearchTxt.trimEnd();
    let data1 = this.state.allFavStylistArrUpdate;
    if (data1 != undefined) {
      const newData = data1.filter((item) => {
        //applying filter for the inserted text in search bar
        const itemData = item.attributes.full_name
          ? item.attributes.full_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length > 0) {
        this.setState({
          allFavStylistArr: newData,
        });
      } else {
        this.setState({
          allFavStylistArr: [],
        });
      }
    }
  };

  removeFavStylist = async (sellerId: string) => {
    let token = await getStorageData("token", true);
    this.setState({ loading: true, token: token });
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.buyerFavStylistRemoveApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.buyerRemoveFavStylistApiEndPoint + "/" + sellerId
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteSourceProductApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  btnRedirectStylistProfile = (stylistId: string) => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistProfileMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.StylistProfile), {
      stylist_id: stylistId,
    });
    this.send(message);
  };
  // Customizable Area End
}
