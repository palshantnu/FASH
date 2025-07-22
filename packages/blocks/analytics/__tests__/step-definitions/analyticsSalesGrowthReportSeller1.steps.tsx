import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import AnalyticsSalesGrowthReportSeller from "../../src/AnalyticsSalesGrowthReportSeller";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "AnalyticsSalesGrowthReportSeller",
};

const feature = loadFeature(
  "./__tests__/features/analyticsSalesGrowthReportSeller-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up BuyerProductSourcingView", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on BuyerProductSourcingView screen", () => {
      screen = render(<AnalyticsSalesGrowthReportSeller {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("BuyerProductSourcingView")).not.toBe(null);
    });
  });
});
