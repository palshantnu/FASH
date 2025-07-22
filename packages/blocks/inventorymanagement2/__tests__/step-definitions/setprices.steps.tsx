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
import SetPrices from "../../src/SetPricesScreen";

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
  id: "SetPrices",
};
const dummyUpdateInventoryData = {
  data:[{"id":"517","type":"inventory_management","attributes":{"id":517,"catalogue_id":332,"product_name":"Partywear mens","product_description":"ieiejrjr firjrjr fjrjjrr rjrjjr\njrjej","sku":"l1","stock_qty":497,"low_stock_threshold":0,"is_listed":true,"price":"1000.0","size":"Small","discounted_price":"700.0","discounted_percentage":null,"colour":"Black","gender":"male","front_image":"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaFVRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f0f2edf27975af7cc28466f2a4058b139545ec43/profile.jpg","brand_name":"Zara","pair_it_with":[]}}]
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
          "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVVFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0348f295bc3f6fefcd8451f74a06e59a6855c68d/profile.jpg",
        brand_name: "Abibas ",
      },
    },
  ],
};

describe("Seller can render inventory data", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<SetPrices {...screenProps} />);
  });

  test("Seller can see loader", () => {
    const { queryByTestId } = screen;
    expect(queryByTestId("custom-loader")).not.toBeNull();
  });

  test("Seller can see empty table", () => {

    const { container, queryByTestId,getByTestId } = screen;

     getByTestId("mainContainer");
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
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });

  test("Seller can see price table", () => {
    const { container, queryByTestId } = screen;
    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);

    // expect(queryByTestId("pricesData")).not.toBeNull();
  });

  test("Seller can handle error response", () => {
    const { container } = screen;
    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceErrorMessage)]: "CRASHED",
    });
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });
});

describe("Seller can update inventory", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<SetPrices {...screenProps} />);
    const { container, queryByTestId } = screen;
    container.instance.runAfterNavPayload();
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
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyUpdateInventoryData,
    });
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    expect(queryByTestId("pricesData")).not.toBeNull();
  });

  test("Seller can update price", () => {
    const { getByTestId,container } = screen;
    const stock = getByTestId("price-0-2");
    fireEvent.changeText(stock, "15");

    const disPrice = getByTestId("lowStock-0-3");
    fireEvent.changeText(disPrice,"18")
    

    fireEvent.changeText(disPrice, "");
    fireEvent(disPrice, "blur");
    fireEvent.changeText(disPrice, "10");
    fireEvent(disPrice, "blur");
    const disPrice1 = getByTestId("lowStock-0-4");
    fireEvent.changeText(disPrice1,"")

    fireEvent.changeText(disPrice1, "");
    fireEvent(disPrice1, "blur");
    fireEvent.changeText(disPrice1, "18");
    fireEvent(disPrice1, "blur");
    
  });

  test("Seller can update inventory", () => {
    const { getByTestId, container } = screen;
    container.instance.updateInput('50',0,4);

    const discountedPrice = getByTestId("lowStock-0-4");
    fireEvent.changeText(discountedPrice,"15")
    
    fireEvent.changeText(discountedPrice, "");
    fireEvent(discountedPrice, "blur");
    fireEvent.changeText(discountedPrice, "10");
    fireEvent(discountedPrice, "blur");
    
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

    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
  });

  test("Dirty state resets if changes are reset", () => {
    const { getByTestId } = screen;
    const price = getByTestId("price-0-2");
    const confirmButton = getByTestId("confirmButton");

    fireEvent.changeText(price, "");
    fireEvent(price, "blur");

    fireEvent.changeText(price, "5.");
    fireEvent(price, "blur");

    fireEvent.changeText(price, "50");
    fireEvent(price, "blur");
    expect(confirmButton.props.style.backgroundColor).toBe("#CCBEB1");

    fireEvent.changeText(price, "49.0");
    fireEvent(price, "blur");
    expect(confirmButton.props.style.backgroundColor).toBeTruthy();
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
    screen = render(<SetPrices {...screenProps} />);
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
    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    // expect(queryByTestId("pricesData")).not.toBeNull();
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

    // const confirm = getByTestId("confirmButton");
    // fireEvent.press(confirm);

    const inventoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    inventoryMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: inventoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyInventoryData,
    });
    container.instance.updateInventoryApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);

    container.instance.getInventoryPricesApiCallId = inventoryMsg.messageId;
    runEngine.sendMessage("getInventory", inventoryMsg);
    container.instance.runAfterNavPayload("Stylist", "115");
  });

  test("Seller can undo search", () => {
    const { getByTestId } = screen;
    const search = getByTestId("searchInventory");
    fireEvent.changeText(search, "");
    fireEvent(search, "onSubmitEditing");
  });

  test("Seller can go back", () => {
    const { getByTestId } = screen;
    // fireEvent.press(getByTestId("btn-navigation-left"));
  });
});
