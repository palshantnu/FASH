import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import {
  jest,
  describe,
  test,
  beforeEach,
  expect,
  beforeAll,
} from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import MyStoresList from "../../src/MyStoresList";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
    addListener: jest.fn().mockImplementation((_name, callBack = jest.fn()) => {
      if (typeof callBack === "function") {
        callBack();
      }
      return {
        remove: jest.fn(),
      };
    }),
  },
  id: "MyStoresList",
};

const dummyStoresData = {
  data: [
    {
      id: "84",
      type: "bussiness",
      attributes: {
        store_name: "Marvel",
        description: "Get Marvel Merchandised products",
        area: "5640 - Saar 13057",
        block: "Kuwait City",
        mall_name: "Marvel Mall",
        floor: "",
        unit_number: null,
        city: "Kuwait City",
        zipcode: "242217",
        driver_instruction: "N/A",
        average_shipping_time: "20 mins",
        payment_mode: ["CREDIT CARD,DEBIT CARD,COD"],
        store_operating_hours: {
          monday: {
            open: "10:00",
            close: "21:30",
            is_open: true,
          },
          tuesday: {
            open: "10:00",
            close: "21:30",
            is_open: true,
          },
          wednesday: {
            open: "10:00",
            close: "21:30",
            is_open: true,
          },
          thursday: {
            open: "10:00",
            close: "21:30",
            is_open: true,
          },
          friday: {
            open: "10:00",
            close: "21:30",
            is_open: true,
          },
          saturday: {
            open: "10:00",
            close: "17:30",
            is_open: true,
          },
          sunday: {
            open: "08:00",
            close: "22:00",
            is_open: true,
          },
        },
        status: "Pending",
        latitude: 29.378586,
        longitude: 47.990341,
        is_open: false,
        available_variants: [],
        image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdndEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3a986420b3b3d8dee17633f137893a0668b99b38/profile.jpg",
        email: "lee.stan.seller@yopmail.com",
        contact_number: {
          country_code: "+965",
          phone_number: "25533011",
        },
        expected_delivery_time: "2024-03-01T07:16:12.583+00:00",
      },
    },
  ],
};

describe("User Navigates to MyStoresList", () => {
  test("User can see loader", () => {
    const screen = render(<MyStoresList {...screenProps} />);
    const { getByTestId } = screen;
    expect(getByTestId("loader-ui")).toBeTruthy();
  });
});

describe("MyStoresList Loads Properly", () => {
  let screen: ReturnType<typeof render>;
  beforeEach(() => {
    screen = render(<MyStoresList {...screenProps} />);

    const { container } = screen;
    // Send token
    container.instance.isFocused.current = true;
    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "token");
    runEngine.sendMessage("token test", tokenMsg);

    // send stores list
    const storesMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
    container.instance.getStoreApiCallId = storesMsg.messageId;
    storesMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: storesMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoresData,
    });
    runEngine.sendMessage("stores message", storesMsg);

    // navigation data 
    const requestmsg = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    requestmsg.initializeFromObject({
      [getName(MessageEnum.SessionResponseData)]: {"to": "InventoryManagement"},
    });
    runEngine.sendMessage("UNIT TEST", requestmsg);

  });

  test("User can see stores once loading is done", () => {
    const { getByTestId } = screen;
    expect(getByTestId("stores-list")).toBeTruthy();
  });

  test("User can go to create new store page", () => {
    const { getByTestId } = screen;
    const addNewStoreBtn = getByTestId("addNewStore");
    expect(addNewStoreBtn).toBeTruthy();
    fireEvent.press(addNewStoreBtn);
  });

  test("User can go to store details", () => {
    const { getByTestId } = screen;
    fireEvent.press(getByTestId("store-1"));
  });

  test("User can toggle store open status", () => {
    const { getByTestId, container } = screen;
    const toggleSwitch = getByTestId("toggleOpenStatus");
    fireEvent.press(toggleSwitch);

    // Success
    const storesMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
    container.instance.updateStoreStatusApiCallId = storesMsg.messageId;
    storesMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: storesMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: dummyStoresData.data.map((item) => {
          item.attributes.is_open = !item.attributes.is_open;
          return item;
        }),
      },
    });
    runEngine.sendMessage("stores message", storesMsg);

    // Error
    storesMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      error: "Store must be approved.",
    });
    runEngine.sendMessage("stores message", storesMsg);

    // Alert Test
    const storesListMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
    container.instance.getStoreApiCallId = storesListMsg.messageId;
    storesListMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: storesListMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoresData,
    });
    runEngine.sendMessage("stores message", storesListMsg);
  });
});

describe("User can perform search", () => {
  let screen: ReturnType<typeof render>;
  beforeEach(() => {
    screen = render(<MyStoresList {...screenProps} />);
    const { container } = screen;
    // Send token
    // container.instance.isFocused.current = true;
    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "token");
    runEngine.sendMessage("token test", tokenMsg);

    // send stores list
    const storesMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
    container.instance.getStoreApiCallId = storesMsg.messageId;
    storesMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: storesMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoresData,
    });
    runEngine.sendMessage("stores message", storesMsg);
  });

  test("User can see search result", () => {
    const { getByTestId, queryByTestId } = screen;
    const searchBox = getByTestId("searchStore");

    fireEvent.changeText(searchBox, "Mar");
    fireEvent(searchBox, "onSubmitEditing");

    expect(queryByTestId("empty")).toBeNull();
  });

  test("User can see no results found", () => {
    const { getByTestId, queryByTestId } = screen;
    const searchBox = getByTestId("searchStore");

    fireEvent.changeText(searchBox, "popo");
    fireEvent(searchBox, "onSubmitEditing");

    expect(queryByTestId("empty")).toBeTruthy();
  });

  test("User can reset search", () => {
    const { getByTestId, queryByTestId } = screen;
    const searchBox = getByTestId("searchStore");

    fireEvent.changeText(searchBox, "");
    fireEvent(searchBox, "onSubmitEditing");

    expect(queryByTestId("empty")).toBeNull();
  });
});
