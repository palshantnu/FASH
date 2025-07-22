import React from "react";
import { jest, describe, beforeAll, expect, it, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import AddCard from "../../src/AddCard";

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
  id: "AddCard",
};

describe("Add Card Page", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<AddCard {...screenProps} />);
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
    expect(screen.queryByTestId("addCardPage")).not.toBeNull();
  });

  test("user can enter name", () => {
    const nameField = screen.getByTestId("name");
    fireEvent.changeText(nameField, "John Doe");
    expect(nameField.props.value).toBe("John Doe");
  });

  test("user can enter amex card number", () => {
    const card = screen.getByTestId("ccn");
    fireEvent.changeText(card, "378");
    fireEvent.changeText(card, "3782246");
    fireEvent.changeText(card, "378282246310");
    fireEvent.changeText(card, "378282246310005");
    expect(card.props.value).toBe("3782 822463 10005");
  });

  test("user can enter other brand card numbers", () => {
    const card = screen.getByTestId("ccn");
    fireEvent.changeText(card, "555");
    fireEvent.changeText(card, "5555555");
    fireEvent.changeText(card, "55555555555");
    fireEvent.changeText(card, "5555555555554444");
    expect(card.props.value).toBe("5555 5555 5555 4444");
  });

  test("user can enter expiry", () => {
    const expiry = screen.getByTestId("expiry");
    fireEvent.changeText(expiry, "12");
    fireEvent.changeText(expiry, "1225");
    expect(expiry.props.value).toBe("12/25");
  });

  test("user can enter cvv", () => {
    const cvv = screen.getByTestId("cvv");
    fireEvent.changeText(cvv, "125");
    expect(cvv.props.value).toBe("125");
  });

  test("user can toggle save card", () => {
    const save = screen.getByTestId("saveCard");
    fireEvent.press(save);
    expect(save.props.style.backgroundColor).toBe("#375280");
  });

  test("user can save card", () => {
    const button = screen.getByTestId("addCard");
    fireEvent.press(button);
  });

  test("user can go back", () => {
    const goBackBtn = screen.getByTestId("btn-navigation-left");
    fireEvent.press(goBackBtn);
    expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);

    listenerMap.get("willBlur")!();
    screen.unmount();
  });
});
