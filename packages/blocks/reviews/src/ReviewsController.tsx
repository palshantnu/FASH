import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  title: string;
  description: string;
  account_id: number;
  anonymous: boolean;
  ReviewsList: [];
  activeCreatedAt: string;
  isVisible: boolean;
  accountReview: any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReviewsController extends BlockComponent<Props, S, SS> {
  reviewsApiCallId: any;
  deleteReviewApiCallId: any;
  addReviewApiCallId: any;
  updateReviewApiCallId: any;
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage)
    ];

    this.state = {
      title: "",
      description: "",
      account_id: 1,
      anonymous: false,
      token: "",
      ReviewsList: [],
      accountReview: null,
      activeCreatedAt: "",
      isVisible: false
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
      this.getReviewsList(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      runEngine.debugLog("API Message Recived", message);

      if (responseJson && responseJson.data) {
        if (apiRequestCallId === this.reviewsApiCallId) {
          console.log("reviews list",JSON.stringify(responseJson));
          this.setState({ accountReview: responseJson.data });
          let reviewsList = responseJson;
        }
        if (apiRequestCallId === this.addReviewApiCallId || apiRequestCallId === this.updateReviewApiCallId) {
          console.log("add review" + responseJson.data.id);
          if(responseJson.data.id === null) {
            this.updateQueryApi();
          } else  {
            this.props.navigation.goBack();
          }
        }
      } else if (responseJson && responseJson.errors) {
          if (responseJson.errors ) {
            if (apiRequestCallId === this.updateReviewApiCallId || apiRequestCallId === this.addReviewApiCallId) {
              responseJson.errors.forEach((error:any)=> {
                if ( error["token"] ) {
                  this.showAlert(configJSON.errorTitle, error["token"]);
                  this.props.navigation.goBack();
                } else if ( error["review"] ) {
                  this.showAlert(configJSON.errorTitle, error["review"].join("."));
                  this.props.navigation.goBack();
                } else {
                  this.showAlert(configJSON.errorTitle, error);
                }
              })
            }
          }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  txtNameProps = {
    onChangeText: (text: string) => {
      this.setState({ title: text });

      //@ts-ignore
      this.txtNameProps.value = text;
    }
  };

  txtTitleProps = {
    onChangeText: (text: string) => {
      this.setState({ title: text });

      //@ts-ignore
      this.txtTitleProps.value = text;
    }
  };
  submitProps = {
    onPress : () => {
      this.addQueryApi();
    }
  }
 
  txtDescriptionProps = {
    onChangeText: (text: string) => {
      this.setState({ description: text });
      //@ts-ignore
      this.txtDescriptionProps.value = text;
    }
  };

  addQuery = () => {
    this.props.navigation.navigate("AddReview");
  };

  hideModal = () => {
    this.setState({ isVisible: false });
  };

  setModal = (item: any) => {
    this.setState({
      title: item.attributes.title,
      account_id: item.account_id,
      description: item.attributes.description,
      accountReview: null,
      anonymous: item.attributes.anonymous,
      isVisible: !this.state.isVisible
    });
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  updateQueryApi = () => {
    console.log("update");
    let data = {
      data: {
        attributes: {
          title: this.state.title,
          description: this.state.description,
          account_id: this.state.account_id,
          anonymous: this.state.anonymous
        }
      }
    };
    
    const header = {
      "Content-Type": configJSON.ReviewsApiContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateReviewApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getReviewsAPiEndPoint+"/"+this.state.account_id
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPutMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  addQueryApi = () => {
      let data = {
        data: {
          attributes: {
            title: this.state.title,
            description: this.state.description,
            account_id: this.state.account_id,
            anonymous: this.state.anonymous
          }
        }
      };
      
      const header = {
        "Content-Type": configJSON.ReviewsApiContentType,
        token: this.state.token
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.addReviewApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getReviewsAPiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(data)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
      //@ts-ignore
      this.state.ReviewsList.push({attributes: data.attributes});
  };

  getReviewsList = (token: string) => {
    const header = {
      "Content-Type": configJSON.ReviewsApiContentType,
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.reviewsApiCallId = requestMessage.messageId;

    console.log("reviews list", this.state.ReviewsList);
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getReviewsAPiEndPoint + "?account_id="+ this.state.account_id
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End
}
