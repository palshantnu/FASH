import React from "react";
import { jest, expect, beforeAll, describe, it, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import * as flash from "react-native-flash-message";

import PaymentSuccess from "../../src/PaymentSuccess";

const config = require("../../src/config");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },
  id: "Checkout",
};

describe("Payment Success Screen", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<PaymentSuccess {...screenProps} />);
  });

  it("should render payment success page without errors", () => {
    expect(screen.queryByTestId("confirmation")).not.toBeNull();
  });

  test("user can go to all orders", () => {
    fireEvent.press(screen.getByTestId("allOrders"));
  });

  test("user can go back", () => {
    fireEvent.press(screen.getByTestId("btn-navigation-left"));
    expect(screenProps.navigation.pop).toBeCalledWith(2);
  });
});
