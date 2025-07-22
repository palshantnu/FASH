import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import TapWebViewForStylistPlan from "../../src/TapWebViewForStylistPlan";
import TapWebViewForStylistPlanWeb from "../../src/TapWebViewForStylistPlan.web";
import { mockOrderResponse } from "../../__mocks__/mocks";

const screenProps = {
  navigation: {
    pop: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  id: "TapWebViewForStylistPlan",
};

const feature = loadFeature(
  "./__tests__/features/tapwebviewforstylistplan-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up the TapWebViewForStylistPlan screen", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on the TapWebViewForStylistPlan screen", () => {
      screen = render(<TapWebViewForStylistPlan {...screenProps} />);
      render(<TapWebViewForStylistPlanWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
        const message = new Message(
            getName(MessageEnum.NavigationPayLoadMessage)
          );
          message.addData(getName(MessageEnum.NavigationTapWebViewForStylistPlanMessageData), {
            token: "token",
            WebUrl: "https://tap.company",
            chargeId: "chg_xxxxxxx",
          });
          runEngine.sendMessage("UNIT TEST", message);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("TapWebViewForStylistPlan")).not.toBe(null);
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
        });
        runEngine.sendMessage("UNIT TEST", message);
  
        const orderMessage = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        orderMessage.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]:
            orderMessage.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockOrderResponse,
        });
        screen.container.instance.getOrderApiCallId = orderMessage.messageId;
        runEngine.sendMessage("UNIT TEST", orderMessage);
      });
  
      then("user goes to success screen", () => {
        expect(screenProps.navigation.replace).toHaveBeenLastCalledWith(
          "StylistPlanSuccess"
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