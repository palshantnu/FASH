import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { loadFeature, defineFeature } from "jest-cucumber";
import { jest, expect } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

import {
  mockCountResponse,
  mockAllOrdersResponse,
  createMockData,
  mockReturnOrderResponse
} from "../__mocks__/response";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "OrderSummary",
};

import OrderSummary from "../../src/OrderSummary";

const feature = loadFeature("./__tests__/features/ordersummary.rntl.feature");

defineFeature(feature, (test) => {
  const runEngineSpy = jest.spyOn(runEngine, "sendMessage");

  test("Seller opens order summary page", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;

    given("I am a seller opened the order summary page", () => {
      screen = render(<OrderSummary {...screenProps} />);
    });

    when("page loads", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const countResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countResponse.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countResponse.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockCountResponse,
      });
      screen.container.instance.getOrderSummaryCountMsgId =
        countResponse.messageId;
      runEngine.sendMessage("UNIT TEST", countResponse);

      const allOrdersResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      allOrdersResponse.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: allOrdersResponse.messageId,
        [getName(
          MessageEnum.RestAPIResponceSuccessMessage
        )]: mockAllOrdersResponse,
      });
      screen.container.instance.getOrderListMsgId = allOrdersResponse.messageId;
      runEngine.sendMessage("UNIT TEST", allOrdersResponse);
    });

    then("I can see all orders", () => {
      expect(screen.queryByTestId("flatList-main")).not.toBe(null);
    });
  });

  test("Seller opens refund tab", ({ given, when, then, and }) => {
    let screen: ReturnType<typeof render>;
    given("I am a seller opened the order summary page", () => {
      screen = render(<OrderSummary {...screenProps} />);

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const countResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countResponse.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countResponse.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockCountResponse,
      });
      screen.container.instance.getOrderSummaryCountMsgId =
        countResponse.messageId;
      runEngine.sendMessage("UNIT TEST", countResponse);

      const allOrdersResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      allOrdersResponse.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: allOrdersResponse.messageId,
        [getName(
          MessageEnum.RestAPIResponceSuccessMessage
        )]: mockAllOrdersResponse,
      });
      screen.container.instance.getOrderListMsgId = allOrdersResponse.messageId;
      runEngine.sendMessage("UNIT TEST", allOrdersResponse);
    });

    when("I go to the refund tab", () => {
      fireEvent.press(screen.getByTestId("return_and_refund"));

      const returnOrdersMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      returnOrdersMsg.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: returnOrdersMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: createMockData(
          "return_in_process"
        ),
      });
      screen.container.instance.getOrderListMsgId = returnOrdersMsg.messageId;
      runEngine.sendMessage("UNIT TEST", returnOrdersMsg);
    });

    then("I can see all return and refund orders", () => {
      expect(screen.queryByTestId("returnRequestAccordian")).not.toBe(null);
    });

    when("I click on return request accordion", () => {
      fireEvent.press(screen.getByTestId("returnRequestAccordian"));

      const returnOrdersMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      returnOrdersMsg.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: returnOrdersMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: createMockData(
          "return_request",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId =
        returnOrdersMsg.messageId;
      runEngine.sendMessage("UNIT TEST", returnOrdersMsg);
    });

    then("I can see the return request orders", () => {
      expect(screen.queryByTestId("returnRequestContainer")).not.toBe(null);
    });

    and("I can reject a request", () => {
      fireEvent.press(screen.getByTestId("rejectReturnButton"));
    });

    when("I accept a request", () => {
      fireEvent.press(screen.getByTestId("acceptReturnButton"));
      fireEvent.press(screen.getByTestId("confirmReturnBtn"));

      const returnOrdersMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      returnOrdersMsg.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: returnOrdersMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: createMockData(
          "return_request",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId =
        returnOrdersMsg.messageId;
      runEngine.sendMessage("UNIT TEST", returnOrdersMsg);
    });

    then("I can see the order in return in process tab", () => {
      fireEvent.press(screen.getByTestId("returnInProcessAccordian"));
      const data = createMockData("return_in_process", false);
      const messageTwo = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      messageTwo.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messageTwo.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: data,
      });
      screen.container.instance.getReturnRefundMsgId = messageTwo.messageId;
      runEngine.sendMessage("UNIT TEST", messageTwo);
      
      expect(
        screen.getByTestId("returnInProcessFl").props.children.props.data.length
      ).toBe(data.data?.length);
    });

    when("I receive the return order", () => {
      fireEvent.press(screen.getByTestId("returnInProcessAccordian"));
      fireEvent.press(screen.getByTestId("returnInProgressButton"));
      const messageTwo = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      messageTwo.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messageTwo.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: createMockData(
          "return_under_process",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId = messageTwo.messageId;
      runEngine.sendMessage("UNIT TEST", messageTwo);
    });

    then("I can reject the refund", () => {
      fireEvent.press(screen.getByTestId("rejectRefundButton"));
      const last = runEngineSpy.mock.calls[runEngineSpy.mock.calls.length - 1];
      expect(last[1].properties.NavigationTargetMessage).toBe("RejectRefund");
    });

    when("I initiated a refund", () => {
      fireEvent.press(screen.getByTestId("initiateRefundButton"));
      fireEvent.press(screen.getByTestId("returnRefundedAccordian"));

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: createMockData(
          "refunded",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("I can see refunded order", () => {
      // mocked generation data length is 1
      expect(
        screen.getByTestId("returnRefundedFl").props.children.props.data.length
      ).toBe(1);
    });
    when("I accept a request self drop", () => {
      fireEvent.press(screen.getByTestId("confirmReturnBtn"));

      const returnOrdersMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      returnOrdersMsg.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: returnOrdersMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockReturnOrderResponse(
          "return_request",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId =
        returnOrdersMsg.messageId;
      runEngine.sendMessage("UNIT TEST", returnOrdersMsg);
    });

    then("I can see the order self drop in return in process tab", () => {
      fireEvent.press(screen.getByTestId("returnInProcessAccordian"));
      const data = mockReturnOrderResponse("return_in_process", false);
      const messageTwo = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      messageTwo.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messageTwo.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: data,
      });
      screen.container.instance.getReturnRefundMsgId = messageTwo.messageId;
      runEngine.sendMessage("UNIT TEST", messageTwo);
      
      expect(
        screen.getByTestId("returnInProcessFl").props.children.props.data.length
      ).toBe(data.data?.length);
    });

    when("I receive the self drop return order", () => {
      fireEvent.press(screen.getByTestId("returnInProcessAccordian"));
      fireEvent.press(screen.getByTestId("returnInProgressButton"));
      const messageTwo = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      messageTwo.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messageTwo.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockReturnOrderResponse(
          "return_under_process",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId = messageTwo.messageId;
      runEngine.sendMessage("UNIT TEST", messageTwo);
    });

    then("I can reject self drop the refund", () => {
      fireEvent.press(screen.getByTestId("rejectRefundButton"));
      const last = runEngineSpy.mock.calls[runEngineSpy.mock.calls.length - 1];
      expect(last[1].properties.NavigationTargetMessage).toBe("RejectRefund");
    });

    when("I initiated self drop a refund", () => {
      fireEvent.press(screen.getByTestId("initiateRefundButton"));
      fireEvent.press(screen.getByTestId("returnRefundedAccordian"));

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockReturnOrderResponse(
          "refunded",
          false
        ),
      });
      screen.container.instance.getReturnRefundMsgId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
     
    });

    then("I can see self drop refunded order", () => {
      // mocked generation data length is 1
      const messageTwo = new Message(getName(MessageEnum.RestAPIResponceMessage));
      messageTwo.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messageTwo.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockReturnOrderResponse(
          "refunded",
          false
        ),
      });
      screen.container.instance.refundedOrderMsgId = messageTwo.messageId;
      runEngine.sendMessage("UNIT TEST", messageTwo);
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockReturnOrderResponse(
          "refunded",
          false
        ),
      });
      screen.container.instance.returnOrderMsgId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
      expect(
        screen.getByTestId("returnRefundedFl").props.children.props.data.length
      ).toBe(1);
    });
  });
});
