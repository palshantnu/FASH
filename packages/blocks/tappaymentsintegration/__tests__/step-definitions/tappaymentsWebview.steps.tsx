import React from "react";

import { defineFeature, loadFeature } from "jest-cucumber";
import { jest, expect } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { mockOrderResponse } from "../../__mocks__/mocks";
import TapPaymentsWebview from "../../src/TapPaymentsWebview";

const screenProps = {
  navigation: {
    pop: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  id: "TapPaymentsWebview",
};

const feature = loadFeature(
  "./__tests__/features/tappaymentsWebview-scenario.feature"
);

defineFeature(feature, (test) => {
  test("User navigates to tappaymentsWebview", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;

    given("I am a User loading tappaymentsWebview", () => {
      screen = render(<TapPaymentsWebview {...screenProps} />);
    });

    when(
      "I navigate to the tappaymentsWebview will load webURL to load",
      () => {
        const message = new Message(
          getName(MessageEnum.NavigationPayLoadMessage)
        );
        message.addData(getName(MessageEnum.NavigationPayloadTapWebView), {
          token: "token",
          WebUrl: "https://tap.company",
          authId: "auth_xxxxxxx",
        });
        runEngine.sendMessage("UNIT TEST", message);
      }
    );

    then("Webview will set", () => {
      expect(screen.queryByTestId("webView")).not.toBe(null);
    });

    when("Payment will done on webview", () => {
      const webview = screen.getByTestId("webView");
      fireEvent(webview, "onNavigationStateChange", {
        url: "https://fash.shop/admin",
      });

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      screen.container.instance.getAuthorizeApiCallId = message.messageId;

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "DECLINED",
        response: { message: "DECLINED" },
      });
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "INITIATED",
      });
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "AUTHORIZED",
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("Webview will close with success data return", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(3);
    });
  });

  test("User loads a charge URL", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;

    given("user has opened a charge URL", () => {
      screen = render(<TapPaymentsWebview {...screenProps} />);

      const message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      message.addData(getName(MessageEnum.NavigationPayloadTapWebView), {
        token: "token",
        WebUrl: "https://tap.company",
        chargeId: "chg_xxxxxxx",
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    when("charge is captured", () => {
      const webview = screen.getByTestId("webView");
      fireEvent(webview, "onNavigationStateChange", {
        url: "https://fash.shop/admin",
      });

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      screen.container.instance.getChargeApiCallId = message.messageId;

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "CAPTURED",
        meta: {
          message: 'Congratulations, Your Order is placed, 25 Loyalty points on the way.'
      }
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("user goes to success screen", () => {
      expect(screenProps.navigation.replace).toHaveBeenLastCalledWith(
        "PaymentSuccess",
      );
    });

    when("charge is not captured", () => {
      const session = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      session.addData(getName(MessageEnum.NavigationPayloadTapWebView), {
        token: "token",
        WebUrl: "https://tap.company",
        chargeId: "chg_xxxxxxx",
      });
      runEngine.sendMessage("UNIT TEST", session);

      const webview = screen.getByTestId("webView");
      fireEvent(webview, "onNavigationStateChange", {
        url: "https://fash.shop/admin",
      });

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        message.messageId
      );
      screen.container.instance.getChargeApiCallId = message.messageId;

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "DECLINED",
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("user goes back with alert", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalled();
    });
  });
});
