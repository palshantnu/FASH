// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
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

jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function(key, value) {
      store[key] = value.toString();
    },
    get: function(key) {
      if(key==="Location_Recirect"){
        return store[key]="true";
      }else{
      return store[key];
      }
    },
    remove: function(key) {
      delete store[key];
    },
  };
});

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'Location_Recirect')
      {
        return "true"
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn(),
    isEmpty:jest.fn()
  };
});


configure({ adapter: new Adapter() });

// process.env.RNTL_SKIP_AUTO_CLEANUP = true;
