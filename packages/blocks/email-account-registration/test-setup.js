// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
import AsyncStorageFactory from "@react-native-community/async-storage";

class MockedFormData {
  body = new Map();
  constructor() {}

  append = (keyName, value) => {
    this.body.set(keyName, value);
  };

  get = (keyName) => this.body.get(keyName);
}

global.FormData = MockedFormData;

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
  isEmpty:jest.fn()
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
  isEmpty:jest.fn()
};
jest.mock('react-native-flash-message', ()=> ({
  showMessage: jest.fn()
}))

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({
      filename: "",
      mime: "path.jpg",
      path: "jpg",
    }),
  ),
  openCamera: jest.fn(() => Promise.resolve({
      filename: "",
      mime: "path.jpg",
      path: "jpg",
  }),),
}));

jest.mock("react-native-document-picker", () => ({
  pickSingle: jest.fn().mockImplementation(() =>
    Promise.resolve(
      {
          name: "file-3",
          type: "path.jpg",
          uri: "jpg",
      },
    )
  ), types: {
      images: "image/*"
    },
    isCancel: jest.fn().mockImplementation((error) => error === "cancel"),
}));

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'USER_TYPE')
      {
        return '0'
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn(),
    isEmail:jest.fn().mockImplementation((keys) => {
      return [true,''] 
  })
  };
});

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))


jest.mock("../../framework/src/Utilities", () => ({
  removeStorageData: jest.fn()
}));

process.env.RNTL_SKIP_AUTO_CLEANUP = true;