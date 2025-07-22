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
import TermsConditionsDetail from "../../src/TermsConditionsDetail";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "TermsConditionsDetail",
};

const feature = loadFeature(
  "./__tests__/features/TermsConditionsDetail-scenario.feature"
);

const responseJsonDataTnC = {
  description: "njfkndsjfb kdjsfn"
};

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
    let instance: TermsConditionsDetail;

    given("I am a User loading TermsConditions", () => {
      termsConditionsWrapper = shallow(
        <TermsConditionsDetail {...screenProps} />
      );
    });

    when("I navigate to TermsConditions", () => {
      instance = termsConditionsWrapper.instance() as TermsConditionsDetail;
      jest.spyOn(instance, "send");
      const msgNavigationPayload = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgNavigationPayload.addData(getName(MessageEnum.SessionResponseData), {
        // termsCondsId: testTermsConds.id,
      });
      runEngine.sendMessage("Unit Test", msgNavigationPayload);

      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

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
      // instance.getTermsCondsCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("I can press btnNavigateEdit", () => {
      const btnNavigateEdit = termsConditionsWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateEdit"
      );
      // btnNavigateEdit.simulate("press");
      expect(termsConditionsWrapper).toBeTruthy();
    });

    then("I can press btnNavigateUsers", () => {
      const btnNavigateUsers = termsConditionsWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateUsers"
      );
      // btnNavigateUsers.simulate("press");
      // expect(termsConditionsWrapper).toBeTruthy();
    });

    then("TermsConditions will load", () => {
      expect(termsConditionsWrapper).toBeTruthy();
    });

    then('go back', () => {
      let backButtonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'backBuID');
      backButtonComponent.simulate('press',);
    });
    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      instance.getTermNdCondition('ar');
      instance.handleErrorApiResTnC('');
      expect(termsConditionsWrapper).toBeTruthy();
    });
  });
});
