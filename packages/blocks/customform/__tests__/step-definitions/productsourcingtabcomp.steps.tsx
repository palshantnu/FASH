import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import ProductSourcingTabComp from "../../src/ProductSourcingTabComp";
import ProductSourcingTabCompWeb from "../../src/ProductSourcingTabComp.web";
import { sourceProductResponse } from "../__mocks__/responses";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },
  id: "MyBidsTabComp",
};

const feature = loadFeature(
  "./__tests__/features/productsourcingtabcomp-scenario.feature"
);

defineFeature(feature, (test) => {
  test("User opens up MyBidsTabComp", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on MyBidsTabComp screen", () => {
      screen = render(<ProductSourcingTabComp {...screenProps} />);
      render(<ProductSourcingTabCompWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      // Fetch list of Product Source
      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          sourceProductResponse,
      });
      screen.container.instance.getProductApiCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);
    });

    then("User can see the page without errors", () => {
      expect(screen.queryByTestId("ProductSourcingTabComp")).not.toBe(null);
    });

    then("Buyer can see the My Bids Button", () => {
      expect(screen.queryByTestId("myBidsButton")).not.toBe(null);
    });

    then("Buyer can press the My Bids Button", () => {
      const button = screen.getByTestId("myBidsButton");
      fireEvent.press(button);
    });

    then("Buyer can see the See All Button", () => {
      expect(screen.queryByTestId("seeAllButton")).not.toBe(null);
    });

    then("Buyer can press the See All Button", () => {
      const button = screen.getByTestId("seeAllButton");
      fireEvent.press(button);
    });
    then("Buyer can refresh the FlatList on pull", () => {
      const Flatlist = screen.getByTestId("product_sourcing_flatlist_list");
      fireEvent(Flatlist, 'refreshControl');
      screen.container.instance.refreshData();
    });
    then("Buyer can see the view Button", () => {
      const data = sourceProductResponse.data;
      expect(screen.queryByTestId("viewButton" + data[0].id)).not.toBe(null);
    });

    then("Buyer can click the view Button", () => {
      const data = sourceProductResponse.data;
      const viewButton = screen.getByTestId("viewButton" + data[0].id);
      fireEvent.press(viewButton);
    });
  });


  test("User opens up MyBidsTabComp for test", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on MyBidsTabComp screen for test", () => {
      screen = render(<ProductSourcingTabComp {...screenProps} />);
      render(<ProductSourcingTabCompWeb {...screenProps} />);
    });

    when("The page loads completely for test", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("User can see the page without errors for test", () => {
      expect(screen.queryByTestId("ProductSourcingTabComp")).not.toBe(null);
    });
  });

  test("User opens up MyBidsTabComp for currency change", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on MyBidsTabComp screen for currency change", () => {
      screen = render(<ProductSourcingTabComp {...screenProps} />);
      render(<ProductSourcingTabCompWeb {...screenProps} />);
    });

    when("The page loads completely for currency change", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("User can see the page without errors for currency change", () => {
      expect(screen.queryByTestId("ProductSourcingTabComp")).not.toBe(null);
    });
  });
});