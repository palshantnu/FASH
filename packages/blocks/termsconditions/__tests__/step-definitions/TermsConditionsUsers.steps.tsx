import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TermsConditionsUsers from "../../src/TermsConditionsUsers";

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementationOnce((keys) => {
      if(keys === 'token')
      {
        return '123'
      }
      if(keys === 'FA_LOGIN_MODE')
      {
        return  'Delivery Partner'
      }
  }),
  removeStorageData: jest.fn()
  };
});

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
  id: "TermsConditionsUsers",
};

const responseJsonDataTnC ={
  description : "njfkndsjfb kdjsfn"
};

const feature = loadFeature("./__tests__/features/TermsConditionsUsers-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to TermsConditions", ({ given, when, then }) => {
    let termsConditionsWrapper: ShallowWrapper;
    let TermsInstance: TermsConditionsUsers;

    given("I am a User loading TermsConditions", () => {
      termsConditionsWrapper = shallow(<TermsConditionsUsers {...screenProps} />);
    });

    when("I navigate to TermsConditions", () => {
      TermsInstance = termsConditionsWrapper.instance() as TermsConditionsUsers;
    });

    then("TermsConditions will load", () => {
      const msgSession = new Message(getName(MessageEnum.RestAPIResponceMessage));
      runEngine.sendMessage("Unit Test", msgSession);

      const msgApiResponse = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgApiResponse.addData(getName(MessageEnum.RestAPIResponceMessage), responseJsonDataTnC);
      runEngine.sendMessage("Unit Test", msgApiResponse);

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
          data: '',
          meta: {
            message: "termsconds data",
          },
        }
      );
      TermsInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
        ])
        ); 
    });

    then('I can click back button with out errors', () => {
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'backTermsButtonID');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then('I can call api with response errors',()=>{
      TermsInstance.getTermNdCondition('ar')
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
      TermsInstance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
        ])
        );   
    });

    then('I can call api with errors',()=>{
      jest.clearAllMocks();
      TermsInstance.getTermNdCondition('en')
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: "Invalid token",
        }
      );
      TermsInstance.termNdConditionID = msgValidationAPI.messageId;
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
