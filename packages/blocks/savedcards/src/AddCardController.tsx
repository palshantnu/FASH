import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import { EmitterSubscription, Platform } from "react-native";
import RNGoSell from "@tap-payments/gosell-sdk-react-native";
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
  checkout: boolean;
  name: string;
  ccn: string;
  exipry: string;
  cvv: string;
  loading: boolean;
  saveCard: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class AddCardController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  willBlur = { remove: () => {} } as EmitterSubscription;
  willFocus = { remove: () => {} } as EmitterSubscription;
  tapListener = {} as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      checkout: false,
      name: "",
      ccn: "",
      cvv: "",
      exipry: "",
      loading: false,
      saveCard: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      return this.handleToken(message);
    }

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      return this.handleNavigationPayload(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount = async () => {
    this.grabToken();
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
      this.grabToken();
    });
    this.willBlur = this.props.navigation.addListener("willBlur", () => {
      runEngine.unSubscribeFromMessages(
        this as IBlock,
        this.subScribedMessages
      );
    });
  };

  componentWillUnmount = async () => {
    this.willBlur.remove();
    this.willFocus.remove();
    runEngine.unSubscribeFromMessages(this as IBlock, this.subScribedMessages);
  };

  grabToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  handleToken = (message: Message) => {
    const token = message.getData(getName(MessageEnum.SessionResponseToken));
    this.setState({ token });
  };

  handleNavigationPayload = (message: Message) => {
    const shouldCheckout = message.getData(
      getName(MessageEnum.NavigationPayloadAddCard)
    );
    if (shouldCheckout) {
      this.setState({ checkout: true });
    }
  };

  handleNameChange = (text: string) => {
    this.setState({ name: text });
  };

  handleCCN = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");

    // Format the card number
    let formattedText = "";
    if (cleanedText.startsWith("3")) {
      // Format for Amex card: 4-6-5
      for (let iter = 0; iter < cleanedText.length; iter++) {
        if (iter === 4 || iter === 10) {
          formattedText += " ";
        }
        formattedText += cleanedText[iter];
      }
    } else {
      // Format for other cards: 4-4-4-4
      for (let iter = 0; iter < cleanedText.length; iter++) {
        if (iter > 0 && iter % 4 === 0) {
          formattedText += " ";
        }
        formattedText += cleanedText[iter];
      }
    }
    this.setState({ ccn: formattedText });
  };

  handleExpiry = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    let formattedText = "";
    if (cleanedText.length > 2) {
      formattedText += cleanedText.slice(0, 2) + "/" + cleanedText.slice(2);
    } else {
      formattedText += cleanedText;
    }
    this.setState({ exipry: formattedText });
  };

  handleCVV = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    if (cleanedText.length < 4) {
      this.setState({ cvv: cleanedText });
    }
  };

  toggleSave = (value: boolean) => {
    this.setState({ saveCard: value });
  };

  addCard = () => {
    this.setState({ loading: true });
    RNGoSell.goSellSDK.startPayment(
      {
        appCredentials: {
          language: RNGoSell.goSellSDKModels.Languages.EN,
          bundleID: Platform.select({
            android: configJSON.androidBundleId,
            ios: configJSON.iosBundleId,
          }),
          sandbox_secrete_key: Platform.select({
            android: configJSON.sandboxAndroidKey,
            ios: configJSON.sandboxIosKey,
          }),
          production_secrete_key: Platform.select({
            android: configJSON.prodAndroidKey,
            ios: configJSON.prodIosKey,
          }),
        },
        sessionParameters: {
          allowedCadTypes: RNGoSell.goSellSDKModels.AllowedCadTypes.ALL,
          amount: "100",
          allowsToSaveSameCardMoreThanOnce: true,
          applePayMerchantID: "",
          authorizeAction: {
            time: 10,
            timeInHours: 10,
            type: "CAPTURE",
          },
          cardHolderName: "John Doe",
          customer: {},
          destinations: "null",
          editCardHolderName: false,
          isRequires3DSecure: true,
          isUserAllowedToSaveCard: true,
          merchantID: "",
          SDKMode: RNGoSell.goSellSDKModels.SDKMode.Sandbox,
          trxMode: RNGoSell.goSellSDKModels.TrxMode.TOKENIZE_CARD,
          transactionCurrency: "usd",
          postURL: "https://tap.company",
          paymentDescription: "SAVE CARD",
          paymenMetaData: {},
          paymentReference: {
            track: "track",
            payment: "payment",
            gateway: "gateway",
            acquirer: "acquirer",
            transaction: "trans_910101",
            order: "order_262625",
            gosellID: null,
          },
          paymentitems: [],
          paymentStatementDescriptor: "",
          paymentType: RNGoSell.goSellSDKModels.PaymentTypes.CARD,
          receiptSettings: { id: '', email: false, sms: true },
        },
      },
      0,
      () => {}
    );
  };
  // Customizable Area End
}
