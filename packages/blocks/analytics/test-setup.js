// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

jest.mock('react-native-gifted-charts', () => ({}));
jest.mock('@react-native-firebase/analytics', () => ({}));

jest.mock("react-native-calendar-picker", function() {
    const mockComponent = require("react-native/jest/mockComponent");
    return mockComponent("react-native-calendar-picker");
  });

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

  jest.mock("../../framework/src/Utilities", () => {
    return {
      getStorageData: jest.fn().mockImplementation((keys) => {
        if(keys === 'reportType')
        {
          return 'store'
        }
    }),
      setStorageData: jest.fn(),
      removeStorageData: jest.fn()
    };
  });

  jest.mock("react-native-flash-message", () => ({
    showMessage: jest.fn(),
    hideMessage: jest.fn(),
  }));
