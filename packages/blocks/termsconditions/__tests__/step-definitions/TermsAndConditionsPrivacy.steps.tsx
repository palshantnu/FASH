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
import TermsAndConditionsPrivacy from "../../src/TermsAndConditionsPrivacy";
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
  id: "TermsAndConditionsPrivacy",
};

const feature = loadFeature("./__tests__/features/TermsAndConditionsPrivacy-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to TermsAndConditionsPrivacy", ({ given, when, then }) => {
    let termsConditionsWrapper: ShallowWrapper;
    let instance: TermsAndConditionsPrivacy;

    given("I am a User loading TermsAndConditionsPrivacy", () => {
      termsConditionsWrapper = shallow(<TermsAndConditionsPrivacy {...screenProps} />);
    });

    when("I navigate to TermsAndConditionsPrivacy", () => {
      instance = termsConditionsWrapper.instance() as TermsAndConditionsPrivacy;
    });

    then("TermsAndConditionsPrivacy will load", () => {
        const msgNavigationPayload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        msgNavigationPayload.addData(getName(MessageEnum.PolicyTypePayloadMessage), 'Payout Policy');
        runEngine.sendMessage("Unit Test", msgNavigationPayload);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    });

    then('I can click back notification page with out errors',()=>{
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'btnBackAllUserPolicy');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then('I can load policy data with out errors',()=>{
        
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
      instance.getAllUserPolicyApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
        ])
        );   
    });
    then("I can load product policy with out errors", () => {
        const msgNavigationPayload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        msgNavigationPayload.addData(getName(MessageEnum.PolicyTypePayloadMessage), 'Product');
        runEngine.sendMessage("Unit Test", msgNavigationPayload);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    });

    then('I can load policy data with errors',()=>{
        
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
            errors: "Invalid token",
          }
        );
        instance.getAllUserPolicyApiCallId = msgValidationAPI.messageId;
        runEngine.sendMessage("Unit Test", msgValidationAPI);
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
          );   
    });
  });
});
