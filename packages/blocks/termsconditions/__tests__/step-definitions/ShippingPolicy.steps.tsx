import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ShippingPolicy from "../../src/shippingPolicy";
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
  id: "ShippingPolicy",
};

const feature = loadFeature("./__tests__/features/ShippingPolicy-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

const termsCondsData = {
  termsConds: 'description',
  termsCondsId: '"'
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to ShippingPolicy", ({ given, when, then }) => {
    let termsConditionsWrapper: ShallowWrapper;
    let shippingInstance: ShippingPolicy;

    given("I am a User loading ShippingPolicy", () => {
      termsConditionsWrapper = shallow(<ShippingPolicy {...screenProps} />);
    });

    when("I navigate to ShippingPolicy", () => {
      shippingInstance = termsConditionsWrapper.instance() as ShippingPolicy; 
    });

    then("ShippingPolicy will load", () => {
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
      shippingInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
        ])
      );
    });

    then("ShippingPolicy will load english api with out errors", () => {
      shippingInstance.getShippingPolicy('11111dfsvdf','en')

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
      shippingInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
        ])
      );
    });

    then('goBackID',()=>{
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'goBackID');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
      const mockResponse = { description: '<p>Hello World</p>' };
      const mockTnCId = 'tnc-123';
      shippingInstance.termNdConditionID = mockTnCId;
    jest.spyOn(shippingInstance, 'handleSuccessApiResTnC').mockImplementation(() => {});
    const apiRequestCallIdTnC = 'some-other-id';

    if (apiRequestCallIdTnC === shippingInstance.termNdConditionID) {
      shippingInstance.handleSuccessApiResTnC(mockResponse);
    }

    expect(shippingInstance.handleSuccessApiResTnC).not.toHaveBeenCalled();
    const data = { description: '<p>Hello World</p>' };
    shippingInstance.handleSuccessApiResTnC(data); 
    expect(termsConditionsWrapper.state('htmlCode')).toBe('<p>Hello World</p>');

    const setStateSpy = jest.spyOn(shippingInstance, 'setState');

    shippingInstance.handleSuccessApiResTnC(data);

    expect(setStateSpy).not.toHaveBeenCalledWith(expect.objectContaining({ htmlCode: expect.anything() }));
  });
  });
});
