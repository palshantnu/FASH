import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import storage from "framework/src/StorageProvider";
import { ChargeResponse, WebhookResponse } from "./types/types";
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
  accessToken: string;
  amount: number;
  currency: string;
  transaction: string;
  order: string;
  baseUrl: string;
  chargeResponse: ChargeResponse | null;
  webhookResponse: WebhookResponse | null;
  redirectResult: string;
  isRedirecting: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TappaymentsintegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  postChargeApiCallId: string = "";
  getWebhookApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      accessToken: "",
      amount: 0,
      currency: "AED",
      transaction: "",
      order: "",
      chargeResponse: null,
      webhookResponse: null,
      baseUrl: "",
      redirectResult: "",
      isRedirecting: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);
    // Customizable Area Start

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    switch (apiRequestCallId) {
      case this.postChargeApiCallId:
        this.setState({ chargeResponse: responseJson });
        this.setState({ redirectResult: responseJson.id });
        this.requestWebhook();
        const link = document.createElement("a");
        link.href = responseJson.transaction.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case this.getWebhookApiCallId:
        this.setState({ webhookResponse: responseJson });
        if (!responseJson.status) {
          setTimeout(() => {
            this.requestWebhook();
          }, 5000);
        }
        break;
    }
    // Customizable Area End
  }

  // Customizable Area Start
  setAmountValue = (text: string) => {
    this.setState({ amount: parseInt(text, 10) });
  };

  setCurrency = (text: string | unknown) => {
    this.setState({ currency: typeof text === "string" ? text : "" });
  };

  setTransactionValue = (text: string) => {
    this.setState({ transaction: text });
  };

  setOrderValue = (text: string) => {
    this.setState({ order: text });
  };

  requestCharge = async () => {
    this.setState({ isRedirecting: true });
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.accessToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.postChargeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.chargeApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    const parsedUrl = new URL(document.location.href);
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({
        amount: this.state.amount,
        currency: "AED",
        reference: {
          transaction: this.state.transaction,
          order: this.state.order,
        },
        customer: {
          first_name: "test",
          middle_name: "test",
          last_name: "test",
          email: "test@test.com",
          phone: {
            country_cod: 965,
            number: 51234567,
          },
        },
        redirect: {
          url: `${parsedUrl.origin}${parsedUrl.pathname}`,
        },
      })
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  requestWebhook = async () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.accessToken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getWebhookApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.webhookApiEndPoint + this.state.redirectResult
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleClose = () => {
    this.setState({ redirectResult: "", webhookResponse: null });
  };

  getAlertText = () => {
    if (this.state.webhookResponse?.status == "CAPTURED") {
      return configJSON.labelPaySuccess;
    }
    if (
      document.location.href.includes("tap_id") &&
      this.state.webhookResponse == null
    ) {
      return configJSON.labelCheckingStatus;
    }
    if (this.state.isRedirecting) {
      return configJSON.labelRedirecting;
    }
    return configJSON.labelPayFailed;
  };

  async componentDidMount() {
    const accessToken = await storage.get("token");
    this.setState({ accessToken }, () => {});
    // Customizable Area Start
    this.setState({ baseUrl: document.location.origin });
    const locationUrl = document.location;
    const newUrl = new URL(`${locationUrl}`);
    const params = new URLSearchParams(newUrl.search);
    const redirectResult = params.get("tap_id");
    redirectResult &&
      this.setState({ redirectResult }, () => this.requestWebhook());
    // Customizable Area End
  }

  // Customizable Area End
}
