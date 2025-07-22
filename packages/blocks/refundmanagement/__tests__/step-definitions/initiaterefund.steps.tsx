import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import InitiateRefund from "../../src/InitiateRefund";

const screenProps = {
  id: "InitiateRefund",
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      if (event === "willFocus") {
        (callback as Function)();
      }
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
};

const feature = loadFeature("./__tests__/features/initiate-refund.feature");

defineFeature(feature, (test) => {
  test("I am an seller trying to refund", ({ given, when, then, and }) => {
    let screen: ReturnType<typeof render>;
    given("I have opened initiate refund page", () => {
      screen = render(<InitiateRefund {...screenProps} />);

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage(session.messageId, session);

      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.addData(
        getName(MessageEnum.NavigationRejectReturnOrderId),
        "OD000000317"
      );
      runEngine.sendMessage(session.messageId, navigation);

      const apiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {},
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      });
      screen.container.instance.getOrderApiCallId = apiMessage.messageId;
      runEngine.sendMessage(apiMessage.messageId, apiMessage);

      const apiMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          orders: {
            data: [
              {
                id: 100,
                attributes: {
                  order_items: [
                    { attributes: { unit_price: 10 } },
                    { attributes: { unit_price: 12 } },
                  ],
                },
              },
            ],
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          apiMessage2.messageId,
      });
      screen.container.instance.getOrderApiCallId = apiMessage2.messageId;
      runEngine.sendMessage(apiMessage2.messageId, apiMessage2);
    });

    and("I can initiate a refund", () => {

      const apiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {},
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      });
      screen.container.instance.initiateRefundApiCallId = apiMessage.messageId;
      runEngine.sendMessage(apiMessage.messageId, apiMessage);

      const apiMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMessage2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "Hello",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          apiMessage2.messageId,
      });
      screen.container.instance.initiateRefundApiCallId = apiMessage2.messageId;
      runEngine.sendMessage(apiMessage2.messageId, apiMessage2);
    });

    when("I click on go back", () => {
      fireEvent.press(screen.getByTestId("goBackIcon"));
    });

    then("I go back to previous screen", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalled();

      const orderNumber = 12345;

      screen.container.instance.setState({ orderNumber: 12345 }, screen.container.instance.getOrderId); // Act

    });
  });
});
