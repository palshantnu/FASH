// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncStorageFactory from "@react-native-community/async-storage";

configure({ adapter: new Adapter() });
jest.mock('react-native-flash-message', () => ({
    showMessage: jest.fn(),
    hideMessage: jest.fn(),
}));
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

AsyncStorageFactory.RNCAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  };
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
  jest.mock('react-native-fs', () => ({
    DocumentDirectoryPath: '/mock/document/path',
    DownloadDirectoryPath: '/mock/download/path',
    downloadFile: jest.fn(() => ({
      promise: Promise.resolve({ statusCode: 200 }),
    })),
  }));
// prevents auto cleanup after
process.env.RNTL_SKIP_AUTO_CLEANUP = true;
