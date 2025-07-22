import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { jest, beforeAll, expect, afterAll } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistList from "../../src/StylistList";

import { Listener } from "../__mocks__/mocks";
import { stylistArr } from "../__mocks__/responses";

const listener = new Listener();

const screenProps = {
  id: "StylistList",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: listener.addEventListener,
  },
};

const feature = loadFeature(
  "./__tests__/features/stylist-list-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementation(() => Promise.resolve("TOKEN"));
  });

  afterAll(() => {
    cleanup();
  });

  test("I am a buyer opening stylist listing page", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I can see the list of stylist", () => {
      screen = render(<StylistList {...screenProps} />);

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const stylistMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      stylistMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: stylistArr.slice(0, 5),
          meta: {
            next_page: 2,
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          stylistMessage.messageId,
      });
      screen.container.instance.getStylistsApiCallId = stylistMessage.messageId;
      screen.container.instance.setState({favouriteList:{}})
      runEngine.sendMessage("UNIT TEST", stylistMessage);
    });

    when("I scroll", () => {
      fireEvent(screen.getByTestId("fl"), "endReached");

      const stylistEmptyMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      stylistEmptyMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "No Stylists Found",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          stylistEmptyMessage.messageId,
      });
      screen.container.instance.loadMoreApiCallId =
        stylistEmptyMessage.messageId;
      runEngine.sendMessage("UNIT TEST", stylistEmptyMessage);
      const stylistMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      stylistMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: stylistArr.slice(5, 10),
          meta: {
            next_page: null,
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          stylistMessage.messageId,
      });
      screen.container.instance.loadMoreApiCallId = stylistMessage.messageId;
      runEngine.sendMessage("UNIT TEST", stylistMessage);
      fireEvent(screen.getByTestId("fl"), "endReached");
    });

    then("I can see more data loaded", () => {
      expect(screen.getByTestId("fl").props.data.length).toBe(10);
    });

    when("I click on favorite", () => {

      const firstStylist = screen.getAllByTestId("StylistProducts");
      fireEvent.press(firstStylist[0]);

      const firstStylistRedirect = screen.getAllByTestId("StylistProductsName");
      fireEvent.press(firstStylistRedirect[0]);

      const icons = screen.getAllByTestId("favouriteButton");
      fireEvent.press(icons[0]);

      const favMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      favMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "Stylist is added to favourite list",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: favMessage.messageId,
      });
      screen.container.instance.markFavouriteApiCallId = favMessage.messageId;
      runEngine.sendMessage("UNIT TEST", favMessage);
    });

    then("favorite button changes", () => {
      expect(screen.queryAllByTestId("heart").length).toBeGreaterThan(0);
    });

    when("I click on favorite again", () => {
      const icons = screen.getAllByTestId("favouriteButton");
      fireEvent.press(icons[0]);

      const favMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      favMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "Stylist is removed from favourite list",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: favMessage.messageId,
      });
      screen.container.instance.removeFavouriteApiCallId = favMessage.messageId;
      runEngine.sendMessage("UNIT TEST", favMessage);
    });

    then("stylist is removed from favorite", () => {
      const search = screen.getByTestId("search");
      fireEvent(search, "submitEditing");
      fireEvent.changeText(search, "stylist");
      fireEvent(search, "submitEditing");
      
      expect(screen.queryAllByTestId("hearto")).not.toBe(null);
    });

    when("I search a name", () => {
      const search = screen.getByTestId("search");
      fireEvent(search, "submitEditing");
      fireEvent.changeText(search, "stylist");
      fireEvent(search, "submitEditing");

      const searchMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      searchMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: stylistArr.slice(0, 5),
          meta: {
            next_page: 2,
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          searchMessage.messageId,
      });
      screen.container.instance.searchStylistApiCallId =
        searchMessage.messageId;
      runEngine.sendMessage("UNIT TEST", searchMessage);

      fireEvent(screen.getByTestId("fl"), "endReached");

      const searchMoreMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      searchMoreMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: stylistArr.slice(5, 10),
          meta: {
            next_page: null,
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          searchMoreMessage.messageId,
      });
      screen.container.instance.loadMoreApiCallId = searchMoreMessage.messageId;
      runEngine.sendMessage("UNIT TEST", searchMoreMessage);
    });

    then("I can see results", () => {
      expect(screen.getByTestId("fl").props.data.length).toBe(10);
    });

    when("there is no results", () => {
      const searchMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      searchMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "no data found",
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          searchMessage.messageId,
      });
      screen.container.instance.searchStylistApiCallId =
        searchMessage.messageId;
      runEngine.sendMessage("UNIT TEST", searchMessage);
    });

    then("I can see empty message", () => {
      expect(screen.queryByTestId("empty")).not.toBe(null);

      fireEvent.press(screen.getByTestId("goBackIcon"));
      listener.simulateListener("willFocus");
    });
  });
});
