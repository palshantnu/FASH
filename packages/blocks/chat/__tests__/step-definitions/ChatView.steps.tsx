import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';
import * as storageData from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import ChatView from '../../src/ChatView'

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
    state: {
      params: {
        id: 90,
      },
    },
  },
  id: 'ChatView',
};

const feature = loadFeature("./__tests__/features/ChatView-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');
jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockResolvedValue([{
      cropRect: { height: 1279, width: 960, x: 0, y: 0 },
      height: 1280,
      mime: "image/jpeg",
      modificationDate: "1678976186000",
      path:
        "image.url",
      size: 114368,
      width: 960,
    }]),
    openCamera: jest.fn(() => Promise.resolve('string')),
  };
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ChatView', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: ChatView;

    given('I am a User loading ChatView', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<ChatView {...(screenProps as any)} />);
    });

    when('I navigate to the ChatView', async () => {
      instance = exampleBlockA.instance() as ChatView;

      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);

    });

    then("User can open modal successfully", () => {
      const MockFunction = jest.spyOn(instance, "goBackBtn")
      let goBackButton = exampleBlockA.findWhere(
        (node) => node.prop("leftTestId") === "goBackButton"
      )
      goBackButton.simulate("press")
      goBackButton.props().onLeftPress()

      let ReportPersonApi = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonApi"
      )
      ReportPersonApi.simulate("press")

      let HideKeyboard = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "HideKeyboard"
      )
      HideKeyboard.simulate("press")
      expect(MockFunction).toHaveBeenCalled()
    })

    then("User can give feedback", () => {
      const MockFunction = jest.spyOn(instance, "onChangeInputText")
      let inputChange = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInput"
      )

      inputChange.props().onChangeText("text")

      expect(MockFunction).toHaveBeenCalled()
    })

    then("User can select from dropDown menu", () => {
      const MockFunction = jest.spyOn(instance, "onFocusBtn")
      let dropDownMenu = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "dropDown"
      )
      dropDownMenu.props().onFocus()
      dropDownMenu.props().onBlur()
      dropDownMenu.props().onChange({})

      expect(MockFunction).toHaveBeenCalled()
    })

    then("User can report person successfully", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has already been reported."
        }
      );
      instance.reportPersonApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
      
      const msgValidationAPI1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI1.messageId
      );
      msgValidationAPI1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has already been reported.",
          "chat_report": {
            "reason": "Harassment"
          }
        }
      );
      instance.reportPersonApiCallId = msgValidationAPI1.messageId;
      const { receive: mockReceive1 } = instance;
      mockReceive("unit test", msgValidationAPI1)


    })

    then("Report person error message", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": [
            {
              "token": "Invalid token"
            }
          ]
        }
      );
      instance.reportPersonApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("Reasons to report person", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has been successfully blocked.",
          "reasons": [
            {
              "id": 1,
              "reason": "Harassment",
              "created_at": "2024-08-14T05:54:00.547Z",
              "updated_at": "2024-08-14T05:54:00.547Z"
            },
            {
              "id": 2,
              "reason": "Spam",
              "created_at": "2024-08-14T05:54:14.425Z",
              "updated_at": "2024-08-14T05:54:14.425Z"
            },
            {
              "id": 3,
              "reason": "Inappropriate Content",
              "created_at": "2024-08-14T05:54:26.641Z",
              "updated_at": "2024-08-14T05:54:26.641Z"
            },
            {
              "id": 4,
              "reason": "Scam or Fraud",
              "created_at": "2024-08-14T05:54:38.352Z",
              "updated_at": "2024-08-14T05:54:38.352Z"
            },
            {
              "id": 5,
              "reason": "Impersonation",
              "created_at": "2024-08-14T05:54:50.746Z",
              "updated_at": "2024-08-14T05:54:50.746Z"
            },
            {
              "id": 6,
              "reason": "Hate Speech",
              "created_at": "2024-08-14T05:55:04.424Z",
              "updated_at": "2024-08-14T05:55:04.424Z"
            },
            {
              "id": 7,
              "reason": "not good",
              "created_at": "2024-08-14T12:35:01.717Z",
              "updated_at": "2024-08-14T12:35:01.717Z"
            }
          ]
        }
      );
      instance.reportPersonReasonApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

  });
});

// Customizable Area End
