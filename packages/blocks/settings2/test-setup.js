// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("@react-native-async-storage/async-storage", () => {
  return jest.fn().mockImplementation(() => ({
  LegacyStorage: () => { },
  get: jest.fn(),
  remove: jest.fn()
  }));
  });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

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

jest.useFakeTimers();

process.env.RNTL_SKIP_AUTO_CLEANUP = true;