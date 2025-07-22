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
import PaymentRequest from '../../src/PaymentRequest';
import { Alert, Platform } from 'react-native';
jest.useFakeTimers();
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
  id: 'PaymentRequest',
};

const feature = loadFeature("./__tests__/features/PaymentRequest-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to PaymentRequest', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: PaymentRequest;

    given('I am a User loading PaymentRequest', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<PaymentRequest {...(screenProps as any)} />);
      Platform.OS = "ios"
      exampleBlockA = shallow(<PaymentRequest {...(screenProps)} />);
    });

    when('I navigate to the PaymentRequest', async () => {
      instance = exampleBlockA.instance() as PaymentRequest;

      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);

      const getpostlistRefresh: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), {
        chatId: 1
      });
      runEngine.sendMessage("Unit Test", getpostlistRefresh);
    });

    then('Text input for reason of payment', () => {
      let textInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputReason"
      );
      textInput.simulate("changeText", "Where are you");

      let simulatedTextInput = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputReason"
      );
      expect(simulatedTextInput.prop("value")).toBe("Where are you");
    })

    then('Text input for amount of payment', () => {
      let textInputAmount = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputAmount"
      );
      textInputAmount.simulate("changeText", "Where are you");

      let simulatedTextInputAmount = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "textInputAmount"
      );
      expect(simulatedTextInputAmount.prop("value")).toBe("KWD Where are you");
    })

    then('Api call for payment request', () => {
      const addHomeDetails = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: { key: "datata" }
        }
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails.messageId
      );
      instance.sendMessageRequestApiCallId = addHomeDetails.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", addHomeDetails)

      let sendMessageRequest = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendMessageRequest"
      )
      sendMessageRequest.simulate("press")

      instance.sendMessageRequest()
      instance.setState({ reason: '', amount: '' });
      jest.spyOn(Alert, 'alert');
      const result = instance.sendMessageRequest();

      expect(Alert.alert).toHaveBeenCalledWith(
        "Something went wrong!",
        "Please enter a reason and amount field."
      );
    })

  });
});

// Customizable Area End
