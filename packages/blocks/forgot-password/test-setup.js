// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("../../components/src/i18n/i18n.config", () => ({
    t: jest.fn((key) => key),
    changeLanguage: () => new Promise(() => {}),
}))



jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        language: "en",
        addResourceBundle: () => jest.fn(),
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));