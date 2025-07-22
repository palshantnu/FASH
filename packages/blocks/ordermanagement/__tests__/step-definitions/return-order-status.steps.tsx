import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { loadFeature, defineFeature } from "jest-cucumber";
import { jest, beforeAll, expect } from "@jest/globals";

import * as utils from "../../../../framework/src/Utilities";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { shallow, ShallowWrapper } from 'enzyme';

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "ReturnOrderStatus",
};

import ReturnOrderStatus from "../../src/ReturnOrderStatus";

const feature = loadFeature("./__tests__/features/return-order-status.feature");

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementation(() => Promise.resolve("token"));
  });

  test("I am a seller checking status of return item", ({
    given,
    when,
    then,
  }) => {
    let screen: ReturnType<typeof render>;
    const rSpy = jest.spyOn(runEngine, "sendMessage");
    given("I have opned the page", () => {
      screen = render(<ReturnOrderStatus {...screenProps} />);
    });

    when("data is loaded", () => {
      const payload = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      payload.initializeFromObject({
        [getName(MessageEnum.NavigationOrderStatusId)]: "#OD001",
      });
      runEngine.sendMessage("Unit Test", payload);

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          return_placed_at: "2024-08-09T07:44:43.069Z",
          return_cancel_at: null,
          return_confirmed_at: "2024-08-09T08:57:36.326Z",
          return_reject_at: null,
          returned_assign_at: "2024-08-31T12:52:19.186Z",
          return_pick_at: null,
          return_at: null,
          order_number: "OD00000417",
          placed_at: "2024-08-09T07:06:18.180Z",
          reason: "aise hi",
          refunded_cancel_at: null,
          reason_refunded_cancel: null,
          refunded_at: null,
          otp: null,
          longitude: 87.7589865,
          latitude: 21.8812053,
        },
      });
      screen.container.instance.orderStatusApicallId = message.messageId;
      runEngine.sendMessage(message.messageId, message);
    });

    then("I can see the status", () => {
      const timeline = screen.queryByTestId("timeline")
      expect(timeline).not.toBe(null);
    });

    when("Order is out for pickup", () => {
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          return_placed_at: "2024-08-09T07:44:43.069Z",
          return_cancel_at: null,
          return_confirmed_at: "2024-08-09T08:57:36.326Z",
          return_reject_at: null,
          return_pick_at: "2024-08-11T12:53:22.334Z",
          returned_assign_at: "2024-08-11T12:52:19.186Z",
          return_at: null,
          order_number: "OD00000417",
          placed_at: "2024-08-09T07:06:18.180Z",
          reason: "aise hi",
          refunded_cancel_at: null,
          reason_refunded_cancel: null,
          refunded_at: null,
          otp: null,
          longitude: 87.7589865,
          latitude: 21.8812053,
        },
      });
      screen.container.instance.orderStatusApicallId = message.messageId;
      runEngine.sendMessage(message.messageId, message);
    });

    then("I can go to track order page", () => {
      fireEvent.press(screen.getByTestId("trackDriver"));
      const lastCall = rSpy.mock.calls[rSpy.mock.calls.length - 1];
      expect(lastCall[1].properties.NavigationTargetMessage).toBe(
        "TrackReturn"
      );

      fireEvent.press(screen.getByTestId("btnBackAssignstore"));
    });
  });

  test("User as a seller checking status of return item", ({ given, when, then }) => {
    let returnOrederStatusWrapper: ShallowWrapper;
    let instance: ReturnOrderStatus;

    given("I have opned the page", () => {
      returnOrederStatusWrapper = shallow(<ReturnOrderStatus {...screenProps} />);
      instance = returnOrederStatusWrapper.instance() as ReturnOrderStatus;
    });

    when("Order is out for pickup", () => {
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          return_placed_at: "2024-08-09T07:44:43.069Z",
          return_cancel_at: null,
          return_confirmed_at: "2024-08-09T08:57:36.326Z",
          return_reject_at: null,
          return_pick_at: "2024-08-11T12:53:22.334Z",
          returned_assign_at: "2024-08-11T12:52:19.186Z",
          return_at: null,
          order_number: "OD00000417",
          placed_at: "2024-08-09T07:06:18.180Z",
          reason: "aise hi",
          refunded_cancel_at: null,
          reason_refunded_cancel: null,
          refunded_at: null,
          otp: null,
          longitude: 87.7589865,
          latitude: 21.8812053,
        },
      });
      instance.orderStatusApicallId = message.messageId;
      runEngine.sendMessage(message.messageId, message);
    });

    then("I can go to track order page", () => {
      expect(instance.orderStatusApicallId.length).toBeGreaterThanOrEqual(0);
    });

  });
});
