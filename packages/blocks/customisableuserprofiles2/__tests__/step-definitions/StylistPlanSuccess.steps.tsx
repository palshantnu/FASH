import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistPlanSuccess from "../../src/StylistPlanSuccess";
import StylistPlanSuccessWeb from "../../src/StylistPlanSuccess.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "StylistPlanSuccess",
};

const feature = loadFeature(
  "./__tests__/features/StylistPlanSuccess-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up StylistPlanSuccess", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on StylistPlanSuccess screen", () => {
      screen = render(<StylistPlanSuccess {...screenProps} />);
      render(<StylistPlanSuccessWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("StylistPlanSuccess")).not.toBe(null);
      const NextButton = screen.getByTestId("nextButton");
      fireEvent(NextButton, "press");
    });
  });
});