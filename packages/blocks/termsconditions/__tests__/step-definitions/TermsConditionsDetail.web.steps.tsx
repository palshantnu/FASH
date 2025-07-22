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
import TermsConditionsDetail from "../../src/TermsConditionsDetail.web";
import ITermsCondsUsers  from "../../src/TermsConditionsDetailController";
const navigation = require("react-navigation");

const screenProps = {
  navigation,
  id: "TermsConditionsDetail",
};

const feature = loadFeature(
  "./__tests__/features/TermsConditionsDetail-scenario.web.feature"
);

const testTermsConds = {
  id: "1",
  attributes: {
    description: "description",
    created_at: "2099-04-12T23:40:46.740Z",
    accepted_by: [
      {
        account_id: "a58df44adaa42199f6e7cced",
        accepted_on: "2097-06-14T07:41:04.548Z",
        email: "Selmer.Simonis11@yahoo.com",
      },
    ],
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
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
        termsCondsId: testTermsConds.id,
      });
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
          data: testTermsConds,
          meta: {
            message: "termsconds data",
          },
        }
      );
      instance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("I can press btnNavigateEdit", () => {
      const btnNavigateEdit = termsConditionsWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateEdit"
      );
      btnNavigateEdit.simulate("press");
      expect(termsConditionsWrapper).toBeTruthy();
    });

    then("I can press btnNavigateUsers", () => {
      const btnNavigateUsers = termsConditionsWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateUsers"
      );
      btnNavigateUsers.simulate("press");
      expect(termsConditionsWrapper).toBeTruthy();
    });

    then("TermsConditions will load", () => {
      expect(termsConditionsWrapper).toBeTruthy();
    });

    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      expect(termsConditionsWrapper).toBeTruthy();
    });
  });
});
