// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";

jest.useFakeTimers();


jest.mock('i18next', () => ({
  t: (key) => key,
  init: () => {},
  use: () => {},
  changeLanguage: jest.fn()
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn(),
  language: 'en'
}))

jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
  types: { pdf: 'application/pdf' },
  isCancel: jest.fn(() => false),
}));

jest.mock('react-native-fs', () => ({
  stat: jest.fn(),
}));

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(),
  openCamera: jest.fn(),
}));



jest.mock("react-native-geolocation-service", () => ({
  getCurrentPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 123,
        longitude: 45,
      },
    });
  }),
  watchPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 123,
        longitude: 45,
      },
    });
  }),
  error: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 123,
        longitude: 45,
      },
    });
  }),
  requestAuthorization: () => "granted",
}));

jest.mock("react-native-vector-icons/AntDesign", () => {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("react-native-vector-icons/AntDesign");
});

jest.mock('react-native-google-places-autocomplete', () => {
  const GooglePlacesAutocomplete = () => <></>;
  return { GooglePlacesAutocomplete };
});

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

jest.mock("react-native-image-crop-picker", () => {
  return {
    openCamera: jest.fn().mockImplementation(({ multiple }) =>
      Promise.resolve(
        multiple
          ? [
              {
                mime: "image/png",
                data: "base64StringData",
                path: "/image/png",
              },
            ]
          : {
              mime: "image/png",
              data: "base64StringData",
              path: "/image/png",
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
                path: "/image/png",
              },
            ]
          : {
              mime: "image/png",
              data: "base64StringData",
              path: "/image/png",
            }
      )
    ),
  };
});

jest.mock("react-native-image-picker", () => ({
  launchImageLibrary: jest.fn().mockImplementation(() =>
    Promise.resolve({
      assets: [
        {
          type: "image/png",
          data: "base64StringData",
          uri: "/image/png",
        },
      ],
    })
  ),
}));

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("react-native-modal-datetime-picker", function() {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("@react-native-community/datetimepicker");
});

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

process.env.RNTL_SKIP_AUTO_CLEANUP = true;

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
