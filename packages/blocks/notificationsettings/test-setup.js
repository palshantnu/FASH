// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock("react-native-flash-message", () => {
});
configure({ adapter: new Adapter() });

jest.mock("../../components/src/i18n/i18n.config", () => ({
    t: jest.fn((key) => key),
    changeLanguage: jest.fn()
  }))