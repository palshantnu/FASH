import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Tappaymentsintegration from "../../src/Tappaymentsintegration.web";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Message } from "framework/src/Message";
import { runEngine } from "framework/src/RunEngine";
import {
  mockChargeResponse,
  mockWebhookSuccessRes,
  mockWebhookResponse,
} from "../../__mocks__/mocks";
import { act } from "react-dom/test-utils";
import { configJSON } from "../../src/TappaymentsintegrationController.web";
const screenProps = {
  navigation: jest.fn(),
  id: "TappaymentsintegrationWeb",
};

const feature = loadFeature(
  "./__tests__/features/tappaymentsintegration-scenario.web.feature"
);

jest.mock("../../../../framework/src/StorageProvider", () => ({
  get: jest.fn().mockImplementation((key: string) =>
    Promise.resolve(
      JSON.stringify({
        accesToken: "",
      })
    )
  ),
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentsintegration", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Tappaymentsintegration;

    given("I am a User loading tappaymentsintegration", () => {
      exampleBlockA = shallow(<Tappaymentsintegration {...screenProps} />);
    });

    when("I navigate to the tappaymentsintegration", () => {
      instance = exampleBlockA.instance() as Tappaymentsintegration;
    });

    then("I can input amount", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "amount"
      );
      const event = {
        preventDefault() {},
        target: { value: "1" },
      };
      textInputComponent.simulate("change", event);
      expect(textInputComponent.props().helperText).toBe(
        configJSON.amountLimit
      );
    });

    then("I can input currency", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "currency"
      );
      const eventBlank = {
        preventDefault() {},
        target: { value: 1 },
      };
      textInputComponent.simulate("change", eventBlank);
      const event = {
        preventDefault() {},
        target: { value: "AED" },
      };
      textInputComponent.simulate("change", event);
      expect(textInputComponent.props().value).toBe("AED");
    });

    then("I can input transaction", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "transaction"
      );
      const event = {
        preventDefault() {},
        target: { value: "1" },
      };
      textInputComponent.simulate("change", event);
      expect(textInputComponent.props().helperText).toBe(
        configJSON.requireRefIdTransaction
      );
    });

    then("I can input order", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "order"
      );
      const event = {
        preventDefault() {},
        target: { value: "1" },
      };
      textInputComponent.simulate("change", event);
      expect(textInputComponent.props().helperText).toBe(
        configJSON.requireRefIdOrder
      );
    });

    then("I can pay with tap", () => {
      const submit = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "submit"
      );
      submit.simulate("click");

      let apiMessageCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMessageCall.messageId
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockChargeResponse
      );
      instance.postChargeApiCallId = apiMessageCall.messageId;
      runEngine.sendMessage("Unit Test", apiMessageCall);

      expect(runEngine.sendMessage).toBeCalled();
    });

    then("I can check the transaction status", () => {
      let apiMessageCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMessageCall.messageId
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookResponse
      );
      instance.getWebhookApiCallId = apiMessageCall.messageId;
      runEngine.sendMessage("Unit Test", apiMessageCall);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(runEngine.sendMessage).toBeCalled();
    });

    then("I can see successful transaction", () => {
      let apiMessageCall = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMessageCall.messageId
      );
      apiMessageCall.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookSuccessRes
      );
      instance.getWebhookApiCallId = apiMessageCall.messageId;
      runEngine.sendMessage("Unit Test", apiMessageCall);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(runEngine.sendMessage).toBeCalled();
    });

    then("I can close alert", () => {
      const close = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "close-alert"
      );
      close.simulate("click");
      expect(close.props().children).toBe("Close");
    });
  });
});
