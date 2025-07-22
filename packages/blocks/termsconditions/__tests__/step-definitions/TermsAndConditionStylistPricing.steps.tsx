import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import TermsAndConditionStylistPricing from "../../src/TermsAndConditionStylistPricing";
import TermsAndConditionStylistPricingWeb from "../../src/TermsAndConditionStylistPricing.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "TermsAndConditionStylistPricing",
};

const responseJsonDataTnC ={
  description : "njfkndsjfb kdjsfn"
};

const feature = loadFeature(
  "./__tests__/features/TermsAndConditionStylistPricing-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up TermsAndConditionStylistPricing", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on TermsAndConditionStylistPricing screen", () => {
      screen = render(<TermsAndConditionStylistPricing {...screenProps} />);
      render(<TermsAndConditionStylistPricingWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
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
      screen.container.instance.termNdConditionID = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("Buyer can see the page without errors", () => {
      screen.container.instance.getTermNdCondition('en')
      expect(screen.queryByTestId("TermsAndConditionStylistPricing")).not.toBe(null);
    });
  });
});