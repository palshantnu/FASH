// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStorageData } from '../../framework/src/Utilities';

configure({ adapter: new Adapter() });
jest.mock("react-native-modal-datetime-picker", function () {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("@react-native-community/datetimepicker");
});
jest.mock("react-native-htmlview", function () {
  
  return "";
});
jest.mock('react-native-flash-message', () => ({
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
}));
jest.mock("react-native-elements", () => ({
  CheckBox: jest.fn()
}))

jest.mock("react-native-responsive-fontsize", () => ({
  RFValue: jest.fn()
}))

jest.mock("../../framework/src/Utilities", () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))


