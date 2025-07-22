// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockChargeResponse } from "./__mocks__/mocks";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

jest.mock("react-native-calendar-picker", function() {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("react-native-calendar-picker");
});

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))

jest.mock("../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if(keys === 'loyaltyPoints')
      {
        return 'Congratulations, Your Order is placed, 25 Loyalty points on the way.'
      }
  }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});