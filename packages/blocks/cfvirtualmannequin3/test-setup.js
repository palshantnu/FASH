// test-setup.js
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock('react-native-image-crop-picker', () => ({
  openCamera: jest.fn(() => Promise.resolve({
    path: "rn_image_picker_lib_temp_05f7220d-1ba6-48a6-b239-536fdabf7fdc.png",
    data: 'mocked-image-data',
  }),),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn((options, callback) => {
    // Simulating different responses
    callback({ didCancel: true }); // Simulate a user cancellation
    callback({ errorCode: { errorMessage: "errorMessage" } });
    callback({ "assets": [{ "bitrate": 12962943, "duration": 4, "fileName": "rn_image_picker_lib_temp_05f7220d-1ba6-48a6-b239-536fdabf7fdc.mp4", "fileSize": 7356091, "height": 1280, "type": "video/mp4", "uri": "file:///data/user/0/com.FashionAggregator/cache/rn_image_picker_lib_temp_05f7220d-1ba6-48a6-b239-536fdabf7fdc.mp4", "width": 720 }] });
  }),
}));