// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

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


configure({ adapter: new Adapter() });

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

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));
jest.mock("react-native-tab-view", ()=> ({
  SceneMap: jest.fn(),
  renderScene: jest.fn()
}));
jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function(key, value) {
      store[key] = value.toString();
    },
    get: function(key) {
      if(key==="token"){
        return store[key]=JSON.stringify("true");
      }else{
      return store[key];
      }
    },
    remove: function(key) {
      delete store[key];
    },
  };
});
jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function(key, value) {
      store[key] = value.toString();
    },
    get: function(key) {
      if(key==="FA_LANGUAGE_ST"){
        return store[key]=JSON.stringify("en");
      }else{
      return store[key];
      }
    },
    remove: function(key) {
      delete store[key];
    },
  };
});
jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function(key, value) {
      store[key] = value.toString();
    },
    get: function(key) {
      if(key==="buyerCoordinateAddressMap"){
        return store[key]=JSON.stringify("true");
      }else{
      return store[key];
      }
    },
    remove: function(key) {
      delete store[key];
    },
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
