// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules} from "react-native";
jest.mock("react-native-modal-activityindicator", () => {
  });
  jest.mock("@react-native-community/google-signin", () => ({
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn()
        .mockImplementation(() => true),
      signIn: jest.fn().mockImplementation(() => ({
        user: {
          email: "test@gmail.com",
          id: "id"
        }
      }))
    },
    statusCodes: {
      PLAY_SERVICES_NOT_AVAILABLE: 1,
      SIGN_IN_CANCELLED: 2,
      IN_PROGRESS: 3
    },
  }));

  jest.mock("react-native-fbsdk", () => ({
    LoginManager: {
      logInWithPermissions: jest
        .fn()
        .mockImplementation(() => Promise.resolve("")),
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
configure({ adapter: new Adapter() });

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))
