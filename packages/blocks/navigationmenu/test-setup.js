// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("../../framework/src/Utilities", () => ({
    removeStorageData: jest.fn()
  }));

  jest.mock('react-native-flash-message', ()=> ({
    showMessage: jest.fn()
}))
