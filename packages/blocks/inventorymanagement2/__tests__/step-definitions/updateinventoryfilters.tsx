import React from "react";
import { jest, expect, beforeAll, describe } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import UpdateInventoryFilter from "../../src/UpdateInventoryFilter";

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
    dispatch: jest.fn(),
  },
  id: "UpdateInventoryFilters",
};

describe("Seller opens filter screen first time", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<UpdateInventoryFilter {...screenProps} />);

    const payloadMsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    payloadMsg.initializeFromObject({
      [getName(MessageEnum.ShowByStoreId)]: "115",
      [getName(MessageEnum.NavigationPayloadUpdateInventoryFilters)]: {
        low_on_stock: false,
        listed: false,
        unlisted: false,
        out_of_stock: false,
      },
      [getName(MessageEnum.NavigationPlUpdateInventoryKey)]: "lol-lol-lol",
    });
    runEngine.sendMessage("navigation", payloadMsg);
  });

  it("renders filters without error", () => {
    const { queryByTestId } = screen;
    expect(queryByTestId("filterScreen")).not.toBeNull();
  });

  it("allows seller to toggle filters", () => {
    const { container } = screen;
    const filters = container.instance.filters;
    for (const filter of filters) {
      fireEvent(screen.getByTestId(filter.key), "change");
    }
  });

  it("combination of filters", () => {
    const { container, getByTestId } = screen;
    const filters = container.instance.filters;

    fireEvent.press(getByTestId("applyFilter"));

    for (const filter of filters) {
      fireEvent(getByTestId(filter.key), "change");
      fireEvent.press(getByTestId("applyFilter"));
    }

    for (const filter of [filters[0], filters[3]]) {
      fireEvent(getByTestId(filter.key), "change");
      fireEvent.press(getByTestId("applyFilter"));
    }

    for (const filter of [filters[1], filters[2]]) {
      fireEvent(getByTestId(filter.key), "change");
      fireEvent.press(getByTestId("applyFilter"));
    }

    screen.container.instance.setState({ filters: { low_on_stock: false,
      listed: false,
      unlisted: true,
      out_of_stock: false, } });
      fireEvent.press(getByTestId("applyFilter"));
      screen.container.instance.setState({ filters: { low_on_stock: false,
        listed: false,
        unlisted: false,
        out_of_stock: true, } });
        fireEvent.press(getByTestId("applyFilter"));
    let selectedModeStr = "Stylist";
    let updateInventoryKey = "lol-lol-lol";
    screen.container.instance.afterGetSelectedMode(filters, updateInventoryKey, selectedModeStr);
  });
});
