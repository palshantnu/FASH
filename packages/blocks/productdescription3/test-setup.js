// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock('@react-native-firebase/analytics', () => ({}));

jest.mock("react-native-device-info", () => ({
  getUniqueId: () => "random",
}));
jest.mock('react-native-chart-kit', () => ({}));
jest.mock('react-native-paper', () => {
  return {
    RadioButton: {
      Group: ({ children }) => <>{children}</>,
    },
  };
});
jest.mock('react-native-modal-datetime-picker', () => ({}));
jest.mock('react-native-svg', () => ({}));
jest.mock("@react-native-async-storage/async-storage", () => {
  return jest.fn().mockImplementation(() => ({
  LegacyStorage: () => { },
  get: jest.fn(),
  remove: jest.fn()
  }));
  });

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

configure({ adapter: new Adapter() });

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'reportType')
      {
        return 'store'
      }
      if(keys === 'token')
        {
          return 'store'
        }
      return null
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});

jest.mock('react-native-share', () => ({
  open: jest.fn((options) => {
    if (options.fail) {
      // Simulate an error response
      return Promise.reject({ errorMessage: "An error occurred" });
    }
    // Simulate a success response
    return Promise.resolve({
      message: "Shared successfully",
      ...options,
  });
  }),
}));

