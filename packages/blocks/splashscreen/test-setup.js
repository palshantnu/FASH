// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
import AsyncStorageFactory from "@react-native-community/async-storage";

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
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "autoLogin") {
        return '181'
      }
     return null;
    }),
    setStorageData: jest.fn(),
  };
});

jest.mock('../../framework/src/Utilities', () => ({
  setStorageData: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      getToken: jest.fn()
     
    })),
  };
});

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {},
  RESULTS: {},
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  localNotification: jest.fn(),
  requestPermissions: jest.fn(),
  createChannel: jest.fn(),
})); 

jest.mock('@react-native-community/push-notification-ios', () => ({
addEventListener: jest.fn(),
requestPermissions: jest.fn(),
getInitialNotification: jest.fn(),
presentLocalNotification: jest.fn(),
scheduleLocalNotification: jest.fn(),
cancelLocalNotifications: jest.fn(),
removeAllDeliveredNotifications: jest.fn(),
removeDeliveredNotifications: jest.fn(),
getDeliveredNotifications: jest.fn(),
addNotificationRequest: jest.fn(),
removePendingNotificationRequests: jest.fn(),
getPendingNotificationRequests: jest.fn(),
setNotificationCategories: jest.fn(),
}));

