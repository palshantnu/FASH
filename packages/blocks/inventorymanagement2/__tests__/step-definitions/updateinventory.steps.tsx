import React from "react";
import {
  jest,
  test,
  expect,
  beforeAll,
  describe,
  beforeEach,
} from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert, AlertButton } from "react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import UpdateInventory from "../../src/UpdateInventoryScreen";

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
    getParam: (key: string, _defaultValue: unknown) => {
      if (key === "filters") {
        return "asdf";
      }
      if (key === "filterObj") {
        return {};
      }
      if (key === "storeId") {
        return 90;
      }
    },
    state: {
      key: "temp-key-123",
    },
  },
  id: "UpdateInventory",
};

const dummyInventoryData = {
  data: [
    {
      id: "260",
      type: "inventory_management",
      attributes: {
        id: 260,
        catalogue_id: 194,
        product_name: "Abibas Stadium 3",
        product_description: "Bagpack",
        sku: "979981BKPK",
        stock_qty: "50",
        low_stock_threshold: "10",
        is_listed: true,
        price: "49.0",
        size: "Medium",
        colour: "Black",
        gender: "male",
        front_image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVVFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0348f295bc3f6fefcd8451f74a06e59a6855c68d/profile.jpg",
        brand_name: "Abibas ",
      },
    },
  ],
};

describe("Seller can render inventory data", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<UpdateInventory {...screenProps} />);
  });

  test("Seller can see loader", () => {
    const { queryByTestId } = screen;
    expect(queryByTestId("custom-loader")).not.toBeNull();
  });

  test("Seller can see empty table", () => {
    const { container, queryByTestId } = screen;

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("tests", tokenMsg);

    const payloadMsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    payloadMsg.addData(getName(MessageEnum.ShowByStoreId), "115");
    runEngine.sendMessage("navigation", payloadMsg);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        error: "No catalogues found for this store",
      },
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("emptyView")).not.toBeNull();
    container.instance.runAfterNavPayload("Stylist", "");
    container.instance.runAfterNavPayload("Seller", "115");
  });

  test("Seller can see inventory table", () => {
    const { container, queryByTestId } = screen;
    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);

    expect(queryByTestId("inventoryData")).not.toBeNull();
  });

  test("Seller can handle error response", () => {
    const { container, queryByTestId } = screen;
    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceErrorMessage)]: "CRASHED",
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });
});

describe("Seller can update inventory", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<UpdateInventory {...screenProps} />);
    const { container, queryByTestId } = screen;

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("tests", tokenMsg);

    const payloadMsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    payloadMsg.addData(getName(MessageEnum.ShowByStoreId), "115");
    runEngine.sendMessage("navigation", payloadMsg);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("inventoryData")).not.toBeNull();
  });

  test("Seller can update stock qty", () => {
    const { getByTestId } = screen;
    const stock = getByTestId("stock-0-2");
    fireEvent.changeText(stock, "10");
  });

  test("Stock gets to 0 if no input provided", () => {
    const { getByTestId } = screen;
    const stock = getByTestId("stock-0-2");
    fireEvent.changeText(stock, "");
    fireEvent(stock, "blur");
    expect(stock.props.value).toBe("0");
  });

  test("Seller can update low stock threshold", () => {
    const { getByTestId } = screen;
    const lowStock = getByTestId("lowStock-0-3");
    fireEvent.changeText(lowStock, "10");
  });

  test("Low stock threshold gets to 0 if no input provided", () => {
    const { getByTestId } = screen;
    const lowStock = getByTestId("lowStock-0-3");
    fireEvent.changeText(lowStock, "");
    fireEvent(lowStock, "blur");
    expect(lowStock.props.value).toBe("0");
  });

  test("Seller can toggle list or unlist", () => {
    const { getByTestId } = screen;
    const switchElem = getByTestId("switch-0-4");
    fireEvent.press(switchElem);
    expect(switchElem.props.style.backgroundColor).toBe("#E2E8F0");
  });

  test("Seller can update inventory", () => {
    const { getByTestId, container } = screen;
    const confirm = getByTestId("confirmButton");
    fireEvent.press(confirm);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.updateInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);

    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });

  test("Dirty state resets if changes are reset", () => {
    const { getByTestId } = screen;
    const lowStock = getByTestId("lowStock-0-3");
    const confirmButton = getByTestId("confirmButton");

    fireEvent.changeText(lowStock, "50");
    fireEvent(lowStock, "blur");
    expect(confirmButton.props.style.backgroundColor).toBe("#CCBEB1");

    fireEvent.changeText(lowStock, "10");
    fireEvent(lowStock, "blur");
    expect(confirmButton.props.style.backgroundColor).toBe("#FFFFFF");
  });
});

describe("Seller can perform queries", () => {
  let screen: ReturnType<typeof render>;
  const callbacks: Array<AlertButton["onPress"]> = [];

  beforeEach(() => {
    jest
      .spyOn(Alert, "alert")
      .mockImplementation(
        (_msg: string, _desc?: string, btns?: AlertButton[]) => {
          if (Array.isArray(btns)) {
            btns.forEach((x) => callbacks.push(x.onPress));
          }
        }
      );
  });

  beforeAll(() => {
    screen = render(<UpdateInventory {...screenProps} />);
    const { container, queryByTestId } = screen;

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("tests", tokenMsg);

    const payloadMsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    payloadMsg.addData(getName(MessageEnum.ShowByStoreId), "115");
    runEngine.sendMessage("navigation", payloadMsg);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("inventoryData")).not.toBeNull();
  });

  test("Seller can type his query", () => {
    const { getByTestId } = screen;
    const search = getByTestId("searchInventory");
    fireEvent.changeText(search, "Abibas");
  });

  test("Seller get warning if key length lesser than 3", () => {
    const { getByTestId } = screen;
    const search = getByTestId("searchInventory");
    fireEvent.changeText(search, "");
    fireEvent(search, "onSubmitEditing");
  });

  test("Seller can search", () => {
    const { getByTestId, container } = screen;
    const search = getByTestId("searchInventory");
    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    // search with no results
    fireEvent.changeText(search, "Adidas");
    fireEvent(search, "onSubmitEditing");
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        error: "No Products Found",
      },
    });
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    // search with results
    fireEvent.changeText(search, "Abib");
    fireEvent(search, "onSubmitEditing");
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });

  test("Seller can update searched items", () => {
    const { getByTestId, container } = screen;

    const confirm = getByTestId("confirmButton");
    fireEvent.press(confirm);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.updateInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);

    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });

  test("Seller can undo search", () => {
    const { getByTestId, container } = screen;
    const search = getByTestId("searchInventory");
    fireEvent.changeText(search, "");
    fireEvent(search, "onSubmitEditing");
  });
});

describe("Seller can filter inventory", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<UpdateInventory {...screenProps} />);
    const { container, queryByTestId } = screen;

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("tests", tokenMsg);

    const payloadMsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    payloadMsg.addData(getName(MessageEnum.ShowByStoreId), "115");
    runEngine.sendMessage("navigation", payloadMsg);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("inventoryData")).not.toBeNull();
  });

  test("Seller can open filter list", () => {
    fireEvent.press(screen.getByTestId("btn-navigation-right"));
  });

  test("Seller can call filtered request", () => {
    const { container, queryByTestId, getByTestId } = screen;

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("inventoryData")).not.toBeNull();

    listenerMap.get("willBlur")!();
    listenerMap.get("didFocus")!();
    fireEvent.press(getByTestId("goBack"));
  });
});
