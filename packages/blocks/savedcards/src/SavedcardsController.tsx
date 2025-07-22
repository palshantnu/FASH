import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, MutableRefObject } from "react";
import {
  ViewabilityConfig,
  ViewToken,
  Platform,
  FlatList,
  EmitterSubscription,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import RNGoSell from "@tap-payments/gosell-sdk-react-native";
import { v4 } from "uuid";

import {
  RetriveCustomerResponse,
  CreateCustomerResponse,
  TokenizedCard,
  AuthorizeCardResponse,
  CardData,
} from "./responses";
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  loading: boolean;
  token: string;
  cards: CardData[];
  cardIndex: number;
  customer?: RetriveCustomerResponse;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SavedcardsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  retriveCustomerApiCallId = "";
  createCustomerApiCallId = "";
  listCardsApiCallId = "";
  authorizeCardApiCallId = "";
  deleteCardApiCallId = "";
  cardsRef: MutableRefObject<FlatList<CardData> | null>;
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loading: true,
      token: "",
      cards: [],
      cardIndex: 0,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.cardsRef = createRef();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, this.retriveCustomer);
    } else if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleApiResponses(message);
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  componentDidMount = async () => {
    this.getToken();
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      if (this.state.token) {
        this.listCards();
      }
    });
  };

  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  getToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  handleApiResponses = (message: Message) => {
    const responseId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    ) as string;
    const successResponse = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
  
    if (successResponse) {
      switch (responseId) {
        case this.retriveCustomerApiCallId:
          this.handleRetrieveCustomer(successResponse);
          break;
        case this.createCustomerApiCallId:
          this.handleCreateCustomer(successResponse);
          break;
        case this.listCardsApiCallId:
          this.handleListCards(successResponse);
          break;
        case this.authorizeCardApiCallId:
          this.handleAuthorizeCard(successResponse);
          break;
        case this.deleteCardApiCallId:
          this.handleDeleteCard(successResponse);
          break;
        default:
          break;
      }
    }
    if (errorResponse) {
      this.parseApiErrorResponse(errorResponse);
    }
  };
  
  handleRetrieveCustomer = (successResponse: any) => {
    const custResponse = successResponse as RetriveCustomerResponse;
    if (custResponse.id) {
      this.setState({ customer: custResponse }, this.listCards);
    } else {
      this.createCustomer();
    }
  };
  
  handleCreateCustomer = (successResponse: any) => {
    const createResponse = successResponse as CreateCustomerResponse;
    if (createResponse.customer_id) {
      this.retriveCustomer();
    } else {
      this.setState({ loading: false });
    }
  };
  
  handleListCards = (successResponse: any) => {
    this.setState({ cards: successResponse.data, loading: false });
  };
  
  handleDeleteCard = (successResponse: any) => {
    if (successResponse.deleted) {
      showMessage({
        message: "Your card has been removed",
        position: { top: 8 },
      });
      this.cardsRef.current?.scrollToIndex({ animated: false, index: 0 });
      this.setState(({ cards }) => ({
        loading: false,
        cards: cards.filter((card) => card.id !== successResponse.id),
      }));
    } else {
      showMessage({
        message: successResponse.error,
        position: { top: 8 },
      });
      this.setState({ loading: false });
    }
  };

  viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100,
  };

  onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems[0]) {
      this.setState({ cardIndex: viewableItems[0].index! });
    }
  };

  yetToBeDeveloped = () => {
    showMessage({
      message: "This feature is yet to be developed",
      position: { top: 8 },
      type: "info",
    });
  };

  retriveCustomer = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.retriveCustomer,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.retriveCustomerApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  createCustomer = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.createCustomerEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.createCustomerApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  listCards = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.listCardEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.validationApiMethodType,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
      }),
    });
    this.listCardsApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };

  deleteCard = (cardId: string) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    const body = new FormData();
    body.append("card_id", cardId);
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.deleteCardEndpoint,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.deleteMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: body,
    });

    this.deleteCardApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  askDeleteConfirmation = (cardId: string) => {
    showAlert({
      messsage: i18n.t("deleteCardWarning"),
      okButton: { text: i18n.t("Yes"), onPress: () => this.deleteCard(cardId) },
      cancelButton: { text: i18n.t("Cancel") },
    });
  };

  authorizeCard = (data: TokenizedCard) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.authorizeCardEndpoint,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: JSON.stringify({
        token: this.state.token,
        "Content-Type": configJSON.validationApiContentType,
      }),
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        token: data.token,
        redirect_url: "/admin",
        currency: "USD",
        type: "VOID",
      }),
    });

    this.authorizeCardApiCallId = message.messageId;
    this.setState({ loading: true });

    runEngine.sendMessage(message.messageId, message);
  };

  handleAuthorizeCard = (response: AuthorizeCardResponse) => {
    this.setState({ loading: false });
    if ("error" in response) {
      showMessage({
        message: String(response.error),
        position: { top: 8 },
        type: "info",
      });
      return;
    }
    if (response.status === "VALID") {
      showMessage({
        message: i18n.t("cardAddedMsg"),
        position: { top: 8 },
        type: "info",
      });
      this.listCards();
      return;
    }
    if (response.status === "INVALID") {
      showMessage({
        message: i18n.t("sorrycannotAddthisCard"),
        position: { top: 8 },
        type: "info",
      });
      return;
    }
    if (response.transaction.url) {
      const messge = new Message(getName(MessageEnum.NavigationTapWebView));
      messge.initializeFromObject({
        [getName(MessageEnum.NavigationPropsMessage)]: this.props,
        [getName(MessageEnum.NavigationPayloadTapWebView)]: {
          WebUrl: response.transaction.url,
          token: this.state.token,
          authId: response.id,
        },
      });
      this.send(messge);
    }
  };

  addCard = () => {
    const transaction = v4().split("-").join("");
    const order = v4().split("-").join("");
    RNGoSell.goSellSDK.startPayment(
      {
        appCredentials: {
          language: RNGoSell.goSellSDKModels.Languages.EN,
          bundleID: Platform.select({
            ios: configJSON.iosBundleId,
            android: configJSON.androidBundleId,
          }),
          production_secrete_key: Platform.select({
            ios: configJSON.prodIosKey,
            android: configJSON.prodAndroidKey,
          }),
          sandbox_secrete_key: Platform.select({
            ios: configJSON.sandboxIosKey,
            android: configJSON.sandboxAndroidKey,
          }),
        },
        sessionParameters: {
          allowedCadTypes: RNGoSell.goSellSDKModels.AllowedCadTypes.ALL,
          amount: "0.1",
          allowsToSaveSameCardMoreThanOnce: false,
          applePayMerchantID: "merchant.com.FashionAggregator",
          authorizeAction: {
            time: 1,
            timeInHours: 1,
            type: "VOID",
          },
          cardHolderName: this.state.customer?.first_name,
          customer: this.state.customer!.id,
          destinations: "",
          editCardHolderName: true,
          isRequires3DSecure: true,
          isUserAllowedToSaveCard: true,
          merchantID: "30476196",
          SDKMode: RNGoSell.goSellSDKModels.SDKMode.Sandbox,
          trxMode: RNGoSell.goSellSDKModels.TrxMode.TOKENIZE_CARD,
          transactionCurrency: "USD",
          postURL: "https://tap.company",
          paymentDescription: "SAVE CARD",
          paymenMetaData: {},
          paymentReference: {
            track: "track",
            payment: "payment",
            gateway: "gateway",
            acquirer: "acquirer",
            transaction: transaction,
            order: order,
            gosellID: v4(),
          },
          paymentitems: [],
          paymentStatementDescriptor: "",
          paymentType: RNGoSell.goSellSDKModels.PaymentTypes.CARD,
          receiptSettings: { id: v4(), email: false, sms: true },
          uiDisplayMode: RNGoSell.goSellSDKModels.UiDisplayModes.LIGHT,
        },
      },
      0,
      this.handleCardAdd
    );
  };

  handleCardAdd = (error: Error | null, status: Record<string, unknown>) => {
    if (error) {
      showMessage({
        message: error.message ?? i18n.t("somethingWentWrong"),
        position: { top: 8 },
        type: "warning",
      });
      return;
    }
    const resultStatus = status.sdk_result as string;
    switch (resultStatus) {
      case "SUCCESS":
        const success = status as unknown as TokenizedCard;
        this.authorizeCard(success);
        break;
      case "FAILED":
      case "SDK_ERROR":
        showMessage({
          message: i18n.t("somethingWentWrongTryAgain"),
          position: { top: 8 },
          type: "warning",
        });
        break;
      case "NOT_IMPLEMENTED":
        showMessage({
          message: i18n.t("featureNotAvailable"),
          position: { top: 8 },
          type: "warning",
        });
        break;
      default:
        break;
    }
  };
  // Customizable Area End
}
