// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";
import * as utils from "../../framework/src/Utilities";

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

class CustomError extends Error {
  code = "";
  constructor({ code }) {
    super("");
    this.message = "Error";
    this.code = code;
  }
}

jest.mock("@react-native-community/google-signin", () => ({
  statusCodes: {
    SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
    IN_PROGRESS: "IN_PROGRESS",
    PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
    SIGN_IN_REQUIRED: "SIGN_IN_REQUIRED",
  },
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockImplementation(() => true),
    signIn: jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject({ code: "SIGN_IN_CANCELLED" })
      )
      .mockImplementationOnce(() => Promise.reject({ code: "IN_PROGRESS" }))
      .mockImplementationOnce(() =>
        Promise.reject({ code: "PLAY_SERVICES_NOT_AVAILABLE" })
      )
      .mockImplementationOnce(() =>
        Promise.reject({ code: "SIGN_IN_REQUIRED" })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          user: {
            name: "Muhib KFoury",
            givenName: "Muhib",
            familyName: "KFoury",
            email: "muhib@kf.ory",
            photo: "https://example.com/blol.png",
            id: "ASDFQWER_545454",
          },
        })
      ),
  },
}));

NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
};

AsyncStorageFactory.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
};
// In your test setup or beforeEach block:
jest.spyOn(utils, 'setStorageData').mockImplementation(() => undefined);
jest.spyOn(utils, 'removeStorageData').mockImplementation(() => undefined);

 jest.mock("../../framework/src/Utilities", () => {
    return {
      getStorageData: jest.fn().mockImplementation((keys) => {
        if(keys === 'reportType')
        {
          return 'store'
        }
    }),
      setStorageData: jest.fn(),
      removeStorageData: jest.fn()
    };
  });

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

jest.mock("@invertase/react-native-apple-authentication", () => ({
  appleAuth: {
    performRequest: jest.fn().mockImplementation(() => ({
      requestedOperation: {},
      requestedScopes : {}
    })),
  },
}));


configure({ adapter: new Adapter() });
