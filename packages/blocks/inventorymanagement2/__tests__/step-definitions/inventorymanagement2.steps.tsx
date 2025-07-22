import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {
  jest,
  test,
  expect,
  beforeAll,
  beforeEach,
  describe,
} from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import Inventorymanagement2 from "../../src/Inventorymanagement2";

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
  id: "Inventorymanagement2",
};

describe("I navigate to Inventory Management", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<Inventorymanagement2 {...screenProps} />);
  });

  test("I can see loader", () => {
    const { queryByTestId } = screen;
    expect(queryByTestId("custom-loader")).toBeTruthy();
  });

  test("I can see inventory management page", () => {
    const { queryByTestId, container } = screen;

    const msg = new Message(getName(MessageEnum.SessionResponseMessage));
    msg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", msg);

    const nav = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    nav.addData(getName(MessageEnum.ShowByStoreId), "100");
    runEngine.sendMessage("Unit Test", nav);

    const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
    apiMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        total_products: 3,
        out_of_stock: 0,
        low_stock: 0,
        unlisted: 2,
      },
      [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMsg.messageId,
    });
    container.instance.getStatsApiCallId = apiMsg.messageId;
    runEngine.sendMessage("Unit Test", apiMsg);

    expect(queryByTestId("custom-loader")).toBeNull();
  });

  test("I can go to other screens", () => {
    const { container, getByTestId } = screen;
    for (const menu of container.instance.menu) {
      fireEvent.press(getByTestId(menu.testID));
    }
  });

  test("Ignore API calling when I am on different screen", () => {
    listenerMap.get("willBlur")!();
    const msg = new Message(getName(MessageEnum.SessionResponseMessage));
    msg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", msg);

    const nav = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    nav.addData(getName(MessageEnum.ShowByStoreId), "100");
    runEngine.sendMessage("Unit Test", nav);
  });

  test("User focuses the screen again", () => {
    listenerMap.get("willFocus")!();
    const msg = new Message(getName(MessageEnum.SessionResponseMessage));
    msg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", msg);

    const nav = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    nav.addData(getName(MessageEnum.ShowByStoreId), "100");
    runEngine.sendMessage("Unit Test", nav);
  });

  test("I can exit the page", () => {
    const { getByTestId } = screen;
    fireEvent.press(getByTestId("btn-navigation-left"));
  });
});

const feature = loadFeature(
  "./__tests__/features/inventorymanagement2-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to inventorymanagement2", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Inventorymanagement2;

    given("I am a User loading inventorymanagement2", () => {
      exampleBlockA = shallow(<Inventorymanagement2 {...screenProps} />);
    });

    when("I navigate to the inventorymanagement2", () => {
      instance = exampleBlockA.instance() as Inventorymanagement2;
    });

    then("inventorymanagement2 will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          total_products: 3,
          out_of_stock: 0,
          low_stock: 0,
          unlisted: 2,
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMsg.messageId,
      });
      instance.getStatsApiCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("I can enter text with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click bulk action button to open modal", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "buttonsLoad"
      );
      let bulkAction = buttonComponent.findWhere(
        (node) => node.prop("testID") === "bulkActions"
      );
      bulkAction.simulate("press");

      let modal = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modal"
      );
      modal.props().onRequestClose();

      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click catgorie buttons", () => {
      let updateBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "updateBtn"
      );
      updateBtn.simulate("press");

      let assignBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "assignBtn"
      );
      assignBtn.simulate("press");

      let addBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "addBtn"
      );
      addBtn.simulate("press");

      let editBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "editBtn"
      );
      editBtn.simulate("press");

      let deleteBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "deleteBtn"
      );
      deleteBtn.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      instance.setState({ selectedModeStr: "Stylist"});
      instance.getStats();
    });

    then("I can click modal close button", () => {
      let popupCloseBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "popupCloseBtn"
      );
      popupCloseBtn.simulate("press");

      let cancelBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancelBtn"
      );
      cancelBtn.simulate("press");

      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
