enum LANGUAGES {
  EN = "en",
  AR = "ar",
}
enum PAYMENT_TYPES {
  ALL = "PaymentType.ALL",
  CARD = "PaymentType.CARD",
  WEB = "PaymentType.WEB",
  APPLE_PAY = "PaymentType.APPLE_PAY",
}

enum ALLOWED_CAD_TYPES {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
  ALL = "ALL",
}

enum UI_DISPLAY_MODE {
  FOLLOW_DEVICE = "FOLLOW_DEVICE",
  LIGHT = "LIGHT",
  DARK = "DARK",
}

enum TRX_MODE {
  PURCHASE = "TransactionMode.PURCHASE",
  AUTHORIZE_CAPTURE = "TransactionMode.AUTHORIZE_CAPTURE",
  SAVE_CARD = "TransactionMode.SAVE_CARD",
  TOKENIZE_CARD = "TransactionMode.TOKENIZE_CARD",
}

enum SDK_MODE {
  Sandbox = "SDKMode.Sandbox",
  Production = "SDKMode.Production",
}

enum LISTENER {
  paymentInit = "paymentInit",
}

enum SDK_APPEARANCE_MODE {
  Fullscreen = 1,
  Windowed = 0,
}

declare module "@tap-payments/gosell-sdk-react-native" {
  import type { NativeEventEmitter } from "react-native";
  export const goSellListener = {} as NativeEventEmitter;

  export const goSellSDKModels = {
    Languages: LANGUAGES,
    PaymentTypes: PAYMENT_TYPES,
    AllowedCadTypes: ALLOWED_CAD_TYPES,
    UiDisplayModes: UI_DISPLAY_MODE,
    TrxMode: TRX_MODE,
    SDKMode: SDK_MODE,
    Listener: LISTENER,
    SDKAppearanceMode: SDK_APPEARANCE_MODE,
  };

  interface AppCredentials {
    production_secrete_key: string;
    language: LANGUAGES;
    sandbox_secrete_key: string;
    bundleID: string;
  }

  interface SessionParameters {
    paymentStatementDescriptor: string;
    transactionCurrency: string;
    isUserAllowedToSaveCard: boolean;
    paymentType: PAYMENT_TYPES;
    amount: string;
    shipping: {
      name: string;
      description: string;
      amount: string;
    }[];
    allowedCadTypes: ALLOWED_CARD_TYPES;
    paymentitems: paymentitems;
    paymenMetaData: Record<string, unknown>;
    applePayMerchantID: string;
    authorizeAction: { timeInHours: number; time: number; type: "CAPTURE" | "VOID" };
    cardHolderName: string;
    editCardHolderName: boolean;
    postURL: string;
    paymentDescription: string;
    destinations: string;
    trxMode: TRX_MODE;
    taxes: taxes;
    merchantID: string;
    SDKMode: SDK_MODE;
    customer: customer;
    isRequires3DSecure: boolean;
    receiptSettings: { id: string; email: boolean; sms: boolean };
    allowsToSaveSameCardMoreThanOnce: boolean;
    paymentReference: paymentReference;
    uiDisplayMode: UI_DISPLAY_MODE;
  }

  interface SDKConfigurations {
    appCredentials: AppCredentials;
    sessionParameters: Partial<SessionParameters>;
  }

  export const goSellSDK = {
    startPayment: (
      config: SDKConfigurations,
      timeout: number,
      callback: (error: Error | null, status: Record<string, unknown>) => void
    ): void => {},
  };
}
