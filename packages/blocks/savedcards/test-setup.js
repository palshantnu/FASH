// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: (key) => key,
  init: () => {},
  use: () => {},
  changeLanguage: jest.fn()
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("@tap-payments/gosell-sdk-react-native", () => ({
  goSellSDK: {
    startPayment: jest.fn((config, time, handler) => {
      handler("x", "y");
    }),
  },
  goSellSDKModels: {
    Languages: {
      EN: "en",
      AR: "ar",
    },
    PaymentTypes: {
      ALL: "PaymentType.ALL",
      CARD: "PaymentType.CARD",
      WEB: "PaymentType.WEB",
      APPLE_PAY: "PaymentType.APPLE_PAY",
    },
    AllowedCadTypes: {
      CREDIT: "CREDIT",
      DEBIT: "DEBIT",
      ALL: "ALL",
    },
    UiDisplayModes: {
      FOLLOW_DEVICE: "FOLLOW_DEVICE",
      LIGHT: "LIGHT",
      DARK: "DARK",
    },
    TrxMode: {
      PURCHASE: "TransactionMode.PURCHASE",
      AUTHORIZE_CAPTURE: "TransactionMode.AUTHORIZE_CAPTURE",
      SAVE_CARD: "TransactionMode.SAVE_CARD",
      TOKENIZE_CARD: "TransactionMode.TOKENIZE_CARD",
    },
    SDKMode: {
      Sandbox: "SDKMode.Sandbox",
      Production: "SDKMode.Production",
    },
    Listener: {
      paymentInit: "paymentInit",
    },
    SDKAppearanceMode: {
      Fullscreen: 1,
      Windowed: 0,
    },
  },
  goSellEmitter: {
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}));

class MockedFormData {
  body = new Map();
  constructor() {}

  append = (keyName, value) => {
    this.body.set(keyName, value);
  };

  get = (keyName) => this.body.get(keyName);
}

global.FormData = MockedFormData;

process.env.RNTL_SKIP_AUTO_CLEANUP = true;
