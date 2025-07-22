import React from "react";
import { jest, describe, beforeAll, expect, it, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import PaymentMethods from "../../src/PaymentMethods";

const listenerMap = new Map<string, (...args: unknown[]) => unknown>();

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: (_name: string, _callback: (..._x: unknown[]) => unknown) => {
      listenerMap.set(_name, _callback);
      return {
        remove: () => listenerMap.delete(_name),
      };
    },
  },
  id: "PaymentMethods",
};

describe("Add Card Page", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<PaymentMethods {...screenProps} />);
    jest.useFakeTimers();

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("UNIT TEST", tokenMsg);

    const navMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    navMsg.addData(getName(MessageEnum.NavigationPayloadAddCard), true);
    runEngine.sendMessage("UNIT TEST", navMsg);

    listenerMap.get("willFocus")!();
  });

  it("should render properly", () => {
    expect(screen.queryByTestId("paymentMethodPage")).not.toBeNull();
  });

  it("can click on add card", () => {
    fireEvent.press(screen.getByTestId("addCard"));
  });

  it("can change selected card", () => {
    const cardTwo = screen.getByTestId("card-2");

    fireEvent.press(cardTwo);
    expect(cardTwo.props.style[3].borderColor).toBe("#CCBEB1");
  });

  it("can go back", () => {
    fireEvent.press(screen.getByTestId("btn-navigation-left"));
    listenerMap.get("willBlur")!();
    screen.unmount();

    expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
