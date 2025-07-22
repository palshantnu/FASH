// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from '@react-native-community/async-storage';
import { NativeModules } from "react-native"

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native-element-dropdown", () => ({}));

jest.mock("react-native-keyboard-aware-scroll-view", ()=> ({}))

jest.mock("react-native-webview", () => ({}));

jest.mock("react-native-flash-message", () => ({}));

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
}));

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'currencyIcon'|| keys === "token")
      {
        return "true"
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn(),
    isEmpty:jest.fn()
  };
});

const customFormData = () => {};
customFormData.prototype.constructor = jest.fn();
customFormData.prototype.append = jest.fn();

global.FormData = customFormData;

class MockBlob {
  constructor(content, options) {
    this.content = content;
    this.options = options;
  }
}
global.Blob = MockBlob;

// jest.setup.js

class MockEvent {
  constructor(eventName) {
    this.type = eventName;
    this.target = null;
  }
}

class MockFileReader {
  constructor() {
    this.result = null;
    this.error = null;
    this.onload = null;
    this.onerror = null;
  }

  readAsDataURL(file) {
    this.result = `data:${file.type};base64,${Buffer.from(
      file.content
    ).toString("base64")}`;
    if (typeof this.onload === "function") {
      const event = new MockEvent("load");
      event.target = this;
      this.onload(event);
    }
  }

  readAsText(file, encoding) {
    this.result = Buffer.from(file.content).toString(encoding || "utf-8");
    if (typeof this.onload === "function") {
      const event = new MockEvent("load");
      event.target = this;
      this.onload(event);
    }
  }

  abort() {}

  addEventListener(eventName, handler) {
    if (eventName === "load") {
      this.onload = handler;
    } else if (eventName === "error") {
      this.onerror = handler;
    }
  }

  removeEventListener(eventName, handler) {
    if (eventName === "load") {
      this.onload = null;
    } else if (eventName === "error") {
      this.onerror = null;
    }
  }
}
jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))
jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockResolvedValue([{
      cropRect: { height: 1279, width: 960, x: 0, y: 0 },
      height: 1280,
      mime: "image/jpeg",
      modificationDate: "1678976186000",
      path:
        "image.url",
      size: 114368,
      width: 960,
    }]),
    openCamera: jest.fn(() => Promise.resolve('string')),
  };
});

jest.mock('@kesha-antonov/react-native-action-cable', () => {
  class MockCable {
    constructor() {
      this.channels = {};
    }
    setChannel(channelName, options) {
      const handlers = {};
      this.channels[channelName] = {
        perform: jest.fn(),
        on: jest.fn((event, callback) => {
          handlers[event] = callback;
          callback({"payload":{
            "data": {
              "id": "377",
              "type": "chat_message",
              "attributes": {
                "id": 377,
                "message": "Hello",
                "account_id": 188,
                "chat_id": 121,
                "created_at": "2024-05-15T13:47:21.365Z",
                "updated_at": "2024-05-15T13:47:21.377Z",
                "is_mark_read": true,
                "attachments": null,
              }
          },
          "action": "received"
          }})
        }),
        handlers,
      };
      return this.channels[channelName];
    }
    channel(channelName) {
      return this.channels[channelName];
    }
  }
  return {
    ActionCable: {
      createConsumer: jest.fn(() => ({
        subscriptions: {
          create: jest.fn(),
        },
      })),
      disconnect: jest.fn(),
    },
    Cable: MockCable,
  };
});

global.FileReader = MockFileReader;

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
