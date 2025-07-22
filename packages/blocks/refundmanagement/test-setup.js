// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";

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
jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));
jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("node:stream", () => jest.requireActual("stream"));
jest.mock("node:assert", () => jest.requireActual("assert"));
jest.mock("node:net", () => jest.requireActual("net"));

jest.mock("react-native-image-crop-picker", () => {
  return {
    openCamera: jest.fn().mockImplementation(({ multiple }) =>
      Promise.resolve(
        multiple
          ? [
              {
                mime: "image/png",
                data: "base64StringData",
                path: "/image/item.png",
              },
            ]
          : {
              mime: "image/png",
              data: "base64StringData",
              path: "/image/item.png",
            }
      )
    ),
    openPicker: jest.fn().mockImplementation(({ multiple }) =>
      Promise.resolve(
        multiple
          ? [
              {
                mime: "image/png",
                data: "base64StringData",
                path: "/image/item.png",
              },
            ]
          : {
              mime: "image/png",
              data: "base64StringData",
              path: "/image/item.png",
            }
      )
    ),
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
jest.mock("@react-native-async-storage/async-storage", () => {
  return jest.fn().mockImplementation(() => ({
    LegacyStorage: () => {},
    get: jest.fn(),
    remove: jest.fn(),
  }));
});

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'FA_LANGUAGE_ST')
      {
        return 'ar'
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;
