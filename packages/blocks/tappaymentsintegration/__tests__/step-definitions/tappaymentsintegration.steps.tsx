import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Tappaymentsintegration from "../../src/Tappaymentsintegration";
import  {
  configJSON
} from "../../src/TappaymentsintegrationController";
import {
  mockChargeRes,
  mockWebhookRetry1Res,
  mockWebhookRetry2Res,
  mockWebhookCancelledRes,
  mockWebhookRetryRes,
  mockWebhookSuccessRes,
  currencyList,
} from "../../__mocks__/mocks";

import { act } from "react-dom/test-utils";
const screenProps = {
  navigation: jest.fn(),
  id: "Tappaymentsintegration",
};

const feature = loadFeature(
  "./__tests__/features/tappaymentsintegration-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentsintegration", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: Tappaymentsintegration;

    given("I am a User loading tappaymentsintegration", () => {
      wrapper = shallow(<Tappaymentsintegration {...screenProps} />);
    });

    when(
      "I navigate to the tappaymentsintegration and check with validation data",
      () => {
        instance = wrapper.instance() as Tappaymentsintegration;

        const touchValidate = wrapper.findWhere(
          (node) => node.prop("testID") === "touchValidate"
        );
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputAmount")
          .simulate("changeText", "");
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputAmount")
          .simulate("changeText", "123");
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "selectCurrency")
          .simulate("change", currencyList[0]);
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputRefId")
          .simulate("changeText", "");
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputRefId")
          .simulate("changeText", "TER3762");
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputOrderId")
          .simulate("changeText", "");
        touchValidate.simulate("press");

        wrapper
          .findWhere((node) => node.prop("testID") === "txtInputOrderId")
          .simulate("changeText", "TER3762");
        touchValidate.simulate("press");
      }
    );

    when("Charge api will called", () => {
      const postApiChargeMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      postApiChargeMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postApiChargeMessage
      );
      postApiChargeMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postApiChargeMessage.messageId
      );

      instance.postChargeApiCallId = postApiChargeMessage.messageId;
      runEngine.sendMessage("Unit Test", postApiChargeMessage);

      postApiChargeMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        {
          errors: [],
        }
      );
      runEngine.sendMessage("Unit Test", postApiChargeMessage);

      const postApiChargeMessage1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      postApiChargeMessage1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postApiChargeMessage1
      );
      postApiChargeMessage1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        postApiChargeMessage1.messageId
      );
      instance.postChargeApiCallId = postApiChargeMessage1.messageId;

      postApiChargeMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "something went wrong",
        }
      );
      runEngine.sendMessage("Unit Test", postApiChargeMessage1);

      postApiChargeMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          error: "data not found",
        }
      );
      runEngine.sendMessage("Unit Test", postApiChargeMessage1);

      postApiChargeMessage1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockChargeRes
      );
      runEngine.sendMessage("Unit Test", postApiChargeMessage1);
    });

    then(
      "tappaymentsintegration will load with out errors and charge api will called",
      () => {
        expect(runEngine.sendMessage).toBeCalled();
      }
    );

    when("Coming back to screen with success response", () => {
      const messageWebhookCall = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      messageWebhookCall.addData(configJSON.TapPaymentSuccessData, {
        updateData: true,
      });
      runEngine.sendMessage("Unit Test", messageWebhookCall);
      act(() => {
        jest.runOnlyPendingTimers();
      });
    });

    then("Alert with payment response will show", () => {
      expect(runEngine.sendMessage).toBeCalled();
    });

    when("Webhook api will provide response", () => {
      const getPaymentWebhookMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPaymentWebhookMessage
      );
      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPaymentWebhookMessage.messageId
      );
      instance.getWebhookApiCallId = getPaymentWebhookMessage.messageId;

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookCancelledRes
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookSuccessRes
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookRetryRes
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookRetry1Res
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);
      act(() => {
        jest.runOnlyPendingTimers();
      });
    });

    then("Webhook api will provide response", () => {
      const getPaymentWebhookMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPaymentWebhookMessage
      );
      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPaymentWebhookMessage.messageId
      );
      instance.getWebhookApiCallId = getPaymentWebhookMessage.messageId;

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookRetry1Res
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      getPaymentWebhookMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockWebhookRetry2Res
      );
      runEngine.sendMessage("Unit Test", getPaymentWebhookMessage);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(mockWebhookSuccessRes.status).toBe("CAPTURED");
    });
  });
});
