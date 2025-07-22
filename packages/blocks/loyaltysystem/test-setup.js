// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("../../components/src/i18n/i18n.config", () => ({
    t: jest.fn((key) => key),
    changeLanguage: jest.fn()
}))
jest.mock("../../framework/src/StorageProvider", () => {
    let store = {}
    return {
      set: function(key, value) {
        store[key] = value.toString();
      },
      get: function(key) {
        if(key==="driverOnlineOffline"){
          return store[key]="true";
        }else{
        return store[key];
        }
      },
      remove: function(key) {
        delete store[key];
      },
    };
  });