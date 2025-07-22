// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
jest.mock("../../framework/src/StorageProvider", () => {
    let store = {}
    return {
      set: function(key, value) {
        store[key] = value.toString();
      },
      get: function(key) {
        if(key==="token"){
          return store[key]=JSON.stringify("rjhtjkrehtkjhrehjkthrej");
        }else{
        return store[key];
        }
      },
      remove: function(key) {
        delete store[key];
      },
    };
  });

  jest.mock("react-native-device-info", () => ({
    getUniqueId: "random",
  }));

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

  jest.mock('react-native-push-notification', () => ({
    configure: jest.fn(),
    localNotification: jest.fn(),
    requestPermissions: jest.fn(),
    createChannel: jest.fn(),
  })); 
  jest.mock('@react-native-firebase/messaging', () => {
    return {
      __esModule: true,
      default: jest.fn(() => ({
        setBackgroundMessageHandler: jest.fn((handler) => {
          handler({ notification: { title: 'Test Notification' } });
        }),
        onMessage: jest.fn((handler) => {
          handler({ notification: { title: 'Foreground Test Notification' } });
        }),
      })),
    };
  });

  jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

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
