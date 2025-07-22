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
import TapPaymentView from '../../src/TapPaymentView';
import { replace } from 'formik';
jest.useFakeTimers();
const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
    replace:jest.fn(),
    state: {
      params: {
        id: 90,
      },
    },
  },
  id: 'TapPaymentView',
};

const feature = loadFeature("./__tests__/features/TapPaymentView-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to TapPaymentView', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: TapPaymentView;

    given('I am a User loading TapPaymentView', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<TapPaymentView {...(screenProps as any)} />);
    });

    when('I navigate to the TapPaymentView', async () => {
      instance = exampleBlockA.instance() as TapPaymentView;
      const message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      message.addData(getName(MessageEnum.NavigationTapPaymentsViewMessageData), {
        token: "token",
        WebUrl: "https://tap.company",
        chargeId: "chg_xxxxxxx",
      });
      runEngine.sendMessage("UNIT TEST", message);
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

    then("Web view for doing payment", () => {
      let webView = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "webView"
      );
      webView.props().onNavigationStateChange({ url: "/admin" })

      const addHomeDetails = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      addHomeDetails.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails.messageId
      );
      instance.getChargeApiCallId = addHomeDetails.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", addHomeDetails)


      const addHomeDetails2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addHomeDetails2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails2
      );
      addHomeDetails2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          status: "CAPTURED",
          meta: {
            message: 'Congratulations, Your Order is placed, 25 Loyalty points on the way.'
        }
        }
      );
      addHomeDetails2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addHomeDetails2.messageId
      );
      instance.getChargeApiCallId = addHomeDetails2.messageId;
      const { receive: mockReceive2 } = instance;
      mockReceive2("unit test", addHomeDetails2)

    })

  });
});

// Customizable Area End
