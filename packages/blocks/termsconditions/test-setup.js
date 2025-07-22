// test-setup.js

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules } from "react-native";

// Configure Enzyme with React 16 adapter
configure({ adapter: new Adapter() });

// Mocking Platform module in React Native
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null,
}));

// Mock react-native-flash-message
jest.mock("react-native-flash-message", () => {});

jest.useFakeTimers();

// Mock FormData
class MockFormData {
  _data = [];

  append(key, value) {
    this._data.push({ key, value });
  }

  getData() {
    return this._data;
  }
}

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))


global.FormData = MockFormData;


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
