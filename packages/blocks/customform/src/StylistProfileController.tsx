import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";

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
  stylistList: any;
  stylistListError: string;
  portfolioList: any;
  listData: [];
  loadMore: boolean;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class StylistProfileController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getHiredStylistListId: string = "";
  getPortfolioId: string = "";
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
      stylistList: "",
      stylistListError: "",
      portfolioList: "",
      listData: [],
      loadMore: true,
      loading:false
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getHiredStylistListId) {
        this.setState({
          stylistList: responseJson?.data,
        });
      }
      if (apiRequestCallId === this.getPortfolioId) {
        this.setState({
          portfolioList: responseJson?.data,loading:false
        });
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    super.componentDidMount();

    this.props.navigation.addListener("willFocus", () => {
      this.getStylistList();
      this.getPortfolioList();
    });
    // Customizable Area End
  }

  goBacktolanding=()=>{
    const msgs: Message = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "LandingPage"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs);
  }

  navigateProductSourcing = () => {
    this.props.navigation.navigate("CustomformProductSourceListing");
  };

  getStylistList = async () => {
    let token = await getStorageData("token", true);
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getHiredStylistListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.hiredStylist
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getPortfolioList = async () => {
    let token = await getStorageData("token", true);
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.validationApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPortfolioId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.portfolio
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  goToStylist = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "StylistList",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
    });
    this.send(message);
  };

  handlePortfolio = () => {
    this.props.navigation.navigate("StylishProfileDashboard");
  };
  navigateToMyRequest = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), 'MyRequest');
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
    this.send(message)
  }

  btnRedirectStylist = (item:any)=>{
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

  goToStylistProfile = (stylistId: number | string) => {
    const message = new Message(
      getName(MessageEnum.NavigationStylistProfileMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.StylistProfile), {
      stylist_id: stylistId,
    });
    this.send(message);
  }

  navigateFromHiredStylish = (userID: any) => {
    const messageHire: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    messageHire.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'Chat'
    );
    messageHire.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessageHire: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessageHire.addData(getName(MessageEnum.SessionResponseData), {
      userID
    });
    messageHire.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageHire);
    this.send(messageHire);
  } 
  // Customizable Area End
}
