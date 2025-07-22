// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.useFakeTimers();

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("react-native-device-info", () => ({
  getUniqueId: () => "random",
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))
jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'buyNowOrderID')
      {
        return 'store'
      }
      if(keys === 'currencyIcon')
        {
          return 'store'
        }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});
process.env.RNTL_SKIP_AUTO_CLEANUP = true;
