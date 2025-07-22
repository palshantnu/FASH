import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules, Platform } from "react-native";
import AsyncStorageFactory from "@react-native-community/async-storage";

jest.mock("react-native-timeline-flatlist", function() {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("react-native-timeline-flatlist");
});

jest.mock("react-native-maps", function() {
  const React = require('react');
  const mockComponent = require("react-native/jest/mockComponent");
  const mocked = mockComponent("react-native-maps");

  // Mock MapView component with ref methods
  const MapView = React.forwardRef((props, ref) => {
    const mockRefMethods = {
      fitToSuppliedMarkers: jest.fn(),
    };

    React.useImperativeHandle(ref, () => mockRefMethods);
    return React.createElement("react-native-maps", props);
  });

  return {
    __esModule: true,
    default: MapView,
    Marker: mocked.Marker,
  };
});

jest.mock("react-native-maps-directions", () => {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("react-native-maps-directions");
});

Platform.OS = "android";

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

jest.mock("../../framework/src/Utilities", () => {
  return {
    heightFromPercentage: jest.fn(),
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return "181";
      }
      if (keys === "orderId") {
        return "1480";
      }
      if (keys === "orderStatus") {
        return "ready_to_ship";
      }
      if (keys === "orderType") {
        return JSON.stringify("Returned");
      }
      
      return null;
    }),
    setStorageData: jest.fn(),
  };
});

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));
jest.mock("react-native-localize", () => ({
  findBestAvailableLanguage: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  return jest.fn().mockImplementation(() => ({
    LegacyStorage: () => {},
    get: jest.fn(),
    remove: jest.fn(),
  }));
});
jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))
jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {}),
    setStorageData: jest.fn(),
    
  };
});
