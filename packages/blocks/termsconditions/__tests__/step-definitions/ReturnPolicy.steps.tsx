import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ReturnPolicy from "../../src/ReturnPolicy";
import { Alert } from "react-native";
import HTMLView from 'react-native-htmlview'
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "ReturnPolicy",
};

const feature = loadFeature("./__tests__/features/ReturnPolicy-scenario.feature");

const termsCondsData = {
  termsConds: 'description',
  termsCondsId: '"'
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.useFakeTimers()
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
    jest
        .spyOn(utils, "getStorageData")
        .mockImplementation(async (keyName, _parse) => {
          if (keyName === "token") {
            return "seller";
          }
          return "random";
        });
  });

  test("User navigates to ReturnPolicy", ({ given, when, then }) => {
    let termsConditionsWrapper: ShallowWrapper;
    let returnInstance: ReturnPolicy;

    given("I am a User loading ReturnPolicy", () => {
      termsConditionsWrapper = shallow(<ReturnPolicy {...screenProps} />);
    });

    when("I navigate to ReturnPolicy", () => {
      returnInstance = termsConditionsWrapper.instance() as ReturnPolicy;
    });

    then("ReturnPolicy will load", () => {
      const msgNavigationPayload = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgNavigationPayload.addData(getName(MessageEnum.SessionResponseData), termsCondsData);
      runEngine.sendMessage("Unit Test", msgNavigationPayload);

      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

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
          data: "success",
        }
      );
      returnInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(Alert.alert('Error', 'No data present'));
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
      backButtonComponent.simulate('press',);
    });

    then("ReturnPolicy will api call english language", () => {
      returnInstance.getRetunPolicy('11111dfsvdf')
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
          data: "success",
        }
      );
      returnInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(Alert.alert('Error', 'No data present'));
    });

    then('goBackID', () => {
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
      backButtonComponent.simulate('press',);
      
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(2);
      
  });

  let wrapper ;

  wrapper = shallow(<ReturnPolicy {...screenProps} />);

  then('renders HTMLView with correct props', () => {

    const htmlView = wrapper.find(HTMLView);
    expect(htmlView.exists()).toBe(true);

    const htmlValue = htmlView.prop('value');
    const stylesheet = htmlView.prop('stylesheet');

    expect(typeof htmlValue).toBe('string'); 
    expect(stylesheet).toHaveProperty('p');

  });
});
});
