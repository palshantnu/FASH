// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from 'react';
import  { PERMISSIONS } from "react-native-permissions";

jest.setTimeout(30000); 

configure({ adapter: new Adapter() });

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  localNotification: jest.fn(),
  requestPermissions: jest.fn(),
  createChannel: jest.fn(),
}));

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

const mockCheckMultipleResult = {
  [PERMISSIONS.IOS.LOCATION_ALWAYS]: 'granted',
  [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]: 'granted',
};


jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios_location_when_in_use',
      LOCATION_ALWAYS: 'granted'
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android_access_fine_location1',
    },
    CAMERA: 'camera',
    PHOTO_LIBRARY: 'photo-library',
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    UNAVAILABLE: 'unavailable',
    BLOCKED: 'blocked',
    LIMITED: 'limited'
  },
  check: jest.fn().mockReturnValue('granted'),
  request: jest.fn(),
  openSettings: jest.fn(() => Promise.resolve()),
  checkMultiple: jest.fn(() => Promise.resolve(mockCheckMultipleResult)),
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


const addListenerMock = jest.fn((event, callback) => {
  if (event === 'willFocus') {
    callback();
  }
});

jest.mock("react-native-geolocation-service", () => ({
  getCurrentPosition: jest.fn((success, error) => {
    success({
      coords: {
        latitude: 29.3117, 
        longitude: 47.4818
      },
    });
    error({
      coords: {
        latitude: 29.3117, 
        longitude: 47.4818
      },
    })
  }),
  watchPosition: jest.fn((success, error) => {
      success({
        coords: {
          latitude: 29.3117, 
          longitude: 47.4818
        },
      });
      error({
        coords: {
          latitude: 29.3117, 
          longitude: 47.4818
        },
      })
  }),
  error: jest.fn((success, error) => {
      success({
        coords: {
          latitude: 29.3117, 
        longitude: 47.4818
        },
      });
  }),
  requestAuthorization: () => "granted6",
}));

jest.mock("react-native-device-info", () => ({
  getUniqueId: "unique-id",
}));
jest.mock("react-native-size-matters", () => ({
  scale: jest.fn((size) => size * 2),
}));
jest.mock("../../framework/src/StorageProvider", () => {
  let store = {}
  return {
    set: function(key, value) {
      store[key] = value.toString();
    },
    get: function(key) {
      if(key==="driverOnlineOffline"){
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
jest.mock('react-native-geocoding', () => ({
  init: jest.fn(),  // Mock the init method
  from: jest.fn(() => Promise.resolve({ // Mock the 'from' method
    results: [
      {
        formatted_address: '123 Mock St, Test City, TC 12345',
        geometry: {
          location: {
            lat: 12.34,
            lng: 56.78,
          },
        },
      },
    ],
  })),
  geocodeAddress: jest.fn(() => Promise.resolve({ // Mock another function as needed
    results: [
      {
        formatted_address: '456 Mock Ave, Test City, TC 67890',
      },
    ],
  })),
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

jest.mock('react-native-google-places-autocomplete', () => {
  return {
    GooglePlacesAutocomplete: jest.fn(() => null),
  };
});

function FormDataMock() {
  this.append = jest.fn();
}

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'address_id')
      {
        return "282"
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});


jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'Location_Recirect')
      {
        return "undefined"
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});

jest.useFakeTimers();

global.FormData = FormDataMock;