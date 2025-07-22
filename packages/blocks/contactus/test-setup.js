// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AsyncStorageFactory from "@react-native-community/async-storage";
import { NativeModules} from "react-native";
  jest.mock("react-native-flash-message", () => {
});
  NativeModules.RNCAsyncStorage = {
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
configure({ adapter: new Adapter() });

jest.mock("react-native-image-crop-picker",()=>
    {
        return{
            openCamera:jest.fn().mockImplementationOnce(()=>Promise.resolve({
                mime:"image/png",
                data:"base64StringData"
            })),
            openPicker:jest.fn().mockImplementationOnce(()=>Promise.resolve(
                {
                    mime:"image/png",
                    data:"base64StringData"
                }
            )),

        }
})

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))