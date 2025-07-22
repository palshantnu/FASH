// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock("react-native-flash-message", () => {
});
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));
jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

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
  
  global.FormData = MockFormData;

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
})
const append = jest.fn()
global.FormData = () => ({ entries, append })
function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock
jest.mock('../../framework/src/StorageProvider', () => {
  return {
      get: jest.fn(),
      remove: jest.fn()
  }
})
jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return 'fdfdjfdj23'
      }
     return null;
    }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});
jest.mock("react-native-element-dropdown", () => ({}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))
