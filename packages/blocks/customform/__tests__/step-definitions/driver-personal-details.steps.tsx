import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import * as flash from "react-native-flash-message";
import moment from "moment";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import DriverPersonalDetails from "../../src/DriverPersonalDetails";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "DriverPersonalDetails",
};

const feature = loadFeature(
  "./__tests__/features/driver-personal-details.scenario.feature"
);

defineFeature(feature, (test) => {
  const spy = jest.spyOn(runEngine, "sendMessage");
  const flashSpy = jest.spyOn(flash, "showMessage");
  const dobDate = moment()
    .subtract({ years: 21 })
    .toDate();
  const dobStr = moment(dobDate).format("DD-MM-YYYY");
  let screen: ReturnType<typeof render>;

  test("User navigates to the screen", ({ given, when, then }) => {
    given("the screen loaded properly", () => {
      screen = render(<DriverPersonalDetails {...screenProps} />);

      const message = new Message(getName(MessageEnum.SessionResponseMessage));
      message.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", message);

      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.addData(getName(MessageEnum.NavigationDriverRegData), {
        vehicle: "Motorbike",
        city: "noida",
      });
      runEngine.sendMessage("UNIT TEST", navigation);
    });

    when("user changes DOB", () => {
      fireEvent.press(screen.getByTestId("dobModal"));
      const picker = screen.getByTestId("dobPicker");
      fireEvent(picker, "confirm", dobDate);
      fireEvent(picker, "hide");
      fireEvent(picker, "cancel");
    });

    then("DOB should get updated", () => {
      expect(screen.queryByText(dobStr)).toBe(null);
    });

    when("user changes address", () => {
      fireEvent.changeText(screen.getByTestId("address"), "Random Address");
    });

    then("address should get updated", () => {
      expect(screen.getByTestId("address").props.value).toBe("Random Address");
    });

    when("user changes area", () => {
      fireEvent.changeText(screen.getByTestId("area"), "Random Area");
    });

    then("area should get updated", () => {
      expect(screen.getByTestId("area").props.value).toBe("Random Area");
    });

    when("user changes block", () => {
      fireEvent.changeText(screen.getByTestId("block"), "Random Block");
    });

    then("block should get updated", () => {
      expect(screen.getByTestId("block").props.value).toBe("Random Block");
    });

    when("user chanegs house number", () => {
      fireEvent.changeText(screen.getByTestId("hob"), "House 99");
    });

    then("house number should get updated", () => {
      expect(screen.getByTestId("hob").props.value).toBe("House 99");
    });

    when("user changes zipcode", () => {
      fireEvent.changeText(screen.getByTestId("zip"), "721001");
    });

    then("zip code should get updated", () => {
      expect(screen.getByTestId("zip").props.value).toBe("721001");
    });

    when("user clicks on next", () => {
      fireEvent.press(screen.getByTestId("btnNext"));
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      screen.container.instance.customDataApiCallId = message.messageId;
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        error: "ASDF",
      });
      runEngine.sendMessage("UNIT TEST", message);
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "Profile updated successfully",
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("user should go to next screen", () => {
      const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationDriverDocuments");
    });

    when("user clicks on support", () => {
      fireEvent.press(screen.getByTestId("ccBtn"));
    });

    then("user should get alert", () => {
      expect(flashSpy).toHaveBeenCalledTimes(2);
    });

    when("user clicks on go back", () => {
      fireEvent.press(screen.getByTestId("backBtn"));
    });

    then("user should go back", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
