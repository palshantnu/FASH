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

import SearchCity from "../../src/SearchCity";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "SearchCity",
};

const feature = loadFeature(
  "./__tests__/features/search-city.scenario.feature"
);

defineFeature(feature, (test) => {
  const spy = jest.spyOn(runEngine, "sendMessage");
  const flashSpy = jest.spyOn(flash, "showMessage");
  let screen: ReturnType<typeof render>;

  test("User navigates to search city page", ({ given, when, then }) => {
    given("The page loaded successfully", () => {
      screen = render(<SearchCity {...screenProps} />);

      const message = new Message(getName(MessageEnum.SessionResponseMessage));
      message.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", message);

      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.addData(getName(MessageEnum.NavigationDriverRegData), {
        vehicle: "Motorbike",
      });
      runEngine.sendMessage("UNIT TEST", navigation);
    });

    when("User types on searchbox", () => {
      fireEvent.changeText(screen.getByTestId("search"), "Tokyo");
    });

    then("User can see the query", () => {
      expect(screen.getByTestId("search").props.value).toBe("Tokyo");
    });

    when("User clicks on next", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("User can go to next screen", () => {
      const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationDriverPersonalDetails");
    });

    when("User clicks on support", () => {
      fireEvent.press(screen.getByTestId("supportBtn"));
    });

    then("User gets a warning", () => {
      expect(flashSpy).toHaveBeenCalledTimes(1);
    });

    when("User clicks on go back", () => {
      fireEvent.press(screen.getByTestId("goBackBtn"));
    });

    then("user goes back", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
