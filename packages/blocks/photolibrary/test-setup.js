// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-document-picker', () => ({
    types: {
        allFiles: '.ics'
    },
    pickSingle: jest.fn().mockImplementation(() => ({uri: 'test'}))
}))

jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: (option) =>
      Promise.resolve({
        width: 300,
        height: 400,
        cropping: true,
        multiple: false,
        mediaType: "photo",
        compressImageQuality: 0.3,
        includeBase64: true,path: "Image.jpg",
        mime:'sadas'
      }),
    Options: {},
    Image: {},
    openCamera: (option) =>
      Promise.resolve([{
        cropRect: { height: 1279, width: 960, x: 0, y: 0 },
        height: 1280,
        mime: "image/jpeg",
        modificationDate: "1678976186000",
        path: "Image.jpg",
        size: 114368,
        width: 960,
      },
      {
        cropRect: { height: 1279, width: 960, x: 0, y: 0 },
        height: 1280,
        mime: "image/jpeg",
        modificationDate: "1678976186000",
        path: "Image.jpg",
        size: 114368,
        width: 960,
      }]),
  };
});

jest.mock("react-native-image-picker", () => {
  return {
    launchImageLibrary: (option) =>
      Promise.resolve([{
        assets: [
          { uri: "file:///dummyPicture.jpg", fileName: "dummyPicture.jpg" },
        ],
      }]),
    ImageLibraryOptions: {},
    launchCamera: (option) =>
      Promise.resolve([{
        assets: [
          { uri: "file:///dummyPicture.jpg", fileName: "dummyPicture.jpg" },
        ],
      }]),
  };
});
jest.mock("react-native-keyboard-aware-scroll-view", ()=> ({}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(`BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:20220915T103000Z
    DTEND:20220915T111500Z
    SUMMARY:React Native
    DESCRIPTION:Description
    END:VEVENT
    END:VCALENDAR`),
  })
);

global.URL.createObjectURL = jest.fn().mockImplementation(() => "/filepath.ics")

jest.mock("../../components/src/i18n/i18n.config", () => ({
  t: jest.fn((key) => key),
  changeLanguage: jest.fn()
}))