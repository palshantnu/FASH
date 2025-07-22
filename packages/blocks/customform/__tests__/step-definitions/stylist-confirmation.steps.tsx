import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";

import StylistConfirmation from "../../src/StylistConfirmation";
import StylistConfirmationWeb from "../../src/StylistConfirmation.web";

const screenProps = {
  id: "StylistConfirmation",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
};

const feature = loadFeature(
  "./__tests__/features/stylist-confirmation-scenario.feature"
);

defineFeature(feature, (test) => {
  test("I am a stylist waiting for approval", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    const messageSpy = jest.spyOn(runEngine, "sendMessage");

    given("I am on confirmation page", () => {
      screen = render(<StylistConfirmation {...screenProps} />);
      render(<StylistConfirmationWeb {...screenProps} />);
    });
    when("I click on go to dashboard", () => {
      fireEvent.press(screen.getByTestId("goToDashboard"));
    });
    then("I navigate to dashboard page", () => {
      const lastcall = messageSpy.mock.calls[messageSpy.mock.calls.length - 1];
      expect(lastcall[1].id).toBe("NavigationStylistDashboard");
    });
  });
});
