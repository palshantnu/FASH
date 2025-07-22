import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { jest, expect, afterEach } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import * as flash from "react-native-flash-message";

import RejectRefund from "../../src/RejectRefund";

const screenProps = {
  id: "RejectRefund",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
};

const feature = loadFeature("./__tests__/features/reject-refund.feature");

defineFeature(feature, (test) => {
  afterEach(() => {
    cleanup();
  });

  test("I am an seller trying to reject refund", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I have opened reject refund page", () => {
      screen = render(<RejectRefund {...screenProps} />);

      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.initializeFromObject({
        [getName(MessageEnum.NavigationRejectType)]: "refund",
        [getName(MessageEnum.NavigationRejectReturnOrderId)]: 99,
      });
      runEngine.sendMessage(navigation.messageId, navigation);
    });

    when("I select a reason", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));

      fireEvent(
        screen.getByTestId("reasonDd"),
        "onChange",
        screen.container.instance.reasons[1]
      );
    });

    then("reason gets updated", () => {
      expect(
        screen.queryAllByText(screen.container.instance.reasons[1].label, {
          exact: false,
        })
      ).not.toBe(null);
    });

    when("I click on upload photo", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));

      fireEvent.press(screen.getByTestId("uploadPhoto"));
      fireEvent.press(screen.getByTestId("btnGallery"));
      fireEvent.press(screen.getByTestId("btnCamera"));
      fireEvent.press(screen.getByTestId("btnCancelMedia"));
    });

    then("I can select a photo", () => {
      expect(screen.getByTestId("uploadImage").props.source.uri).toBe(
        "/image/item.png"
      );
    });

    when("I click submit", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));

      const apiMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "Order not found",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          apiMessage2.messageId,
      });
      screen.container.instance.refundRejectedApiCallId = apiMessage2.messageId;
      runEngine.sendMessage("UNIT TEST", apiMessage2);

      const apiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {},
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      });
      screen.container.instance.refundRejectedApiCallId = apiMessage.messageId;
      runEngine.sendMessage("UNIT TEST", apiMessage);
    });

    then("refund gets rejected", () => {
      expect(screenProps.navigation.goBack).toBeCalled();
    });
  });

  test("I am an seller trying to reject return", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    const flashSpy = jest.spyOn(flash, "showMessage");
    given("I have opened reject return page", () => {
      screen = render(<RejectRefund {...screenProps} />);

      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.initializeFromObject({
        [getName(MessageEnum.NavigationRejectType)]: "return",
        [getName(MessageEnum.NavigationRejectReturnOrderId)]: 99,
      });
      runEngine.sendMessage(navigation.messageId, navigation);
    });

    when("I select a reason", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));

      fireEvent(
        screen.getByTestId("reasonDd"),
        "onChange",
        screen.container.instance.reasons[1]
      );
    });

    then("reason gets updated", () => {
      expect(
        screen.queryAllByText(screen.container.instance.reasons[1].label, {
          exact: false,
        })
      ).not.toBe(null);
    });

    when("I add description", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));
      fireEvent.changeText(
        screen.getByTestId("rejDetailsInput"),
        "Lorem ipsum"
      );
    });

    then("Description gets updated", () => {
      expect(screen.getByTestId("rejDetailsInput").props.value).toBe(
        "Lorem ipsum"
      );
    });

    when("I click submit", () => {
      fireEvent.press(screen.getByTestId("confirmBtn"));

      const apiMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          errors: "Order not found",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          apiMessage2.messageId,
      });
      screen.container.instance.returnRejectedApiCallId = apiMessage2.messageId;
      runEngine.sendMessage("UNIT TEST", apiMessage2);

      const apiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {},
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      });
      screen.container.instance.returnRejectedApiCallId = apiMessage.messageId;
      runEngine.sendMessage("UNIT TEST", apiMessage);
    });

    then("return gets rejected", () => {
      const last = flashSpy.mock.calls[flashSpy.mock.calls.length - 1];
      expect(last[0].message).toBe("returnRequestRejectedSuccessfully");
    });
  });
});
