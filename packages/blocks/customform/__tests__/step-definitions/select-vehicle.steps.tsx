import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import * as flash from "react-native-flash-message";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import SelectVehicle from "../../src/SelectVehicle";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "SelectVehicle",
};

const feature = loadFeature(
  "./__tests__/features/select-vehicle.scenario.feature"
);

defineFeature(feature, (test) => {
  const spy = jest.spyOn(runEngine, "sendMessage");
  const flashSpy = jest.spyOn(flash, "showMessage");
  let screen: ReturnType<typeof render>;

  test("User navigates to select vehicle screen", ({ given, when, then }) => {
    given("The page loaded properly", () => {
      screen = render(<SelectVehicle {...screenProps} />);

      const message = new Message(getName(MessageEnum.SessionResponseMessage));
      message.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", message);
    });

    when("User selects a vehicle type", () => {
      fireEvent.press(screen.getByTestId("item-type-1"));
    });

    then("Selected vehicle should update", () => {
      const selected = screen.getByTestId("item-type-1");
      const styles = selected.props.style;
      expect(styles[2].borderColor).toBe("#CCBEB1");
    });

    when("User clicks on next", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("User navigates to next screen", () => {
      const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationAddVehicleMessage");
    });

    when("User clicks on back icon", () => {
      fireEvent.press(screen.getByTestId("goBackBtn"));
    });

    then("User goes back to previous screen", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    when("User clicks on support button", () => {
      fireEvent.press(screen.getByTestId("supportBtn"));
    });

    then("User gets alert", () => {
      expect(flashSpy).toHaveBeenCalledTimes(1);
    });
  });
});
