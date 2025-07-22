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
import ReportPerson from '../../src/ReportPerson';
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
  id: 'ReportPerson',
};

const feature = loadFeature("./__tests__/features/ReportPerson-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ReportPerson', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: ReportPerson;

    given('I am a User loading ReportPerson', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<ReportPerson {...(screenProps as any)} />);
    });

    when('I navigate to the ReportPerson', async () => {
      instance = exampleBlockA.instance() as ReportPerson;

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

    then('Report person Go back function', () => {
      let goBackBtn = exampleBlockA.findWhere(
        (node) => node.prop("leftTestId") === "goBackBtn"
      )
      goBackBtn.simulate("press")
      goBackBtn.props().onLeftPress()

      let ClientnavigationButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ClientnavigationBtn"
      )
      ClientnavigationButton.simulate("press")
    })
    
  });
});

// Customizable Area End
