import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import { Alert, AlertButton, AlertOptions } from "react-native";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import CustomformProductSourceListing from "../../src/CustomformProductSourceListing";
import CustomformProductSourceListingWeb from "../../src/CustomformProductSourceListing.web";
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
  id: "productSourceListing",
};

const feature = loadFeature(
  "./__tests__/features/customformproductsourcelisting-scenario.feature"
);


defineFeature(feature, (test) => {

  test("Buyer opens up ProductSourceListing", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on ProductSourceListing screen", () => {
      screen = render(<CustomformProductSourceListing {...screenProps} />);
      render(<CustomformProductSourceListingWeb {...screenProps} />);
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
      screen.container.instance.apiCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("productSourceListing")).not.toBe(null);
    });

    then("Buyer can see the Delete Button", () => {
      const data = sourceProductResponse.data;
      expect(screen.queryByTestId("deleteButton" + data[0].id)).not.toBe(null);
    });

    then("Buyer can press the delete Button", () => {
      const data = sourceProductResponse.data;
      const deleteButton = screen.getByTestId("deleteButton" + data[0].id);
      fireEvent.press(deleteButton);
    });

    then("Buyer should see a confirmation alert", () => {
      expect(screen.queryByTestId("DeleteModal")).not.toBe(null);
      expect(screen.queryByTestId("btnCancelRequestNo")).not.toBe(null);
    });

    when("Buyer presses 'No' on the alert", () => {
      const noButton = screen.getByTestId("btnCancelRequestNo");
      fireEvent.press(noButton);
    });

    then("Buyer can press the delete Button", () => {
      const data = sourceProductResponse.data;
      const deleteButton = screen.getByTestId("deleteButton" + data[0].id);
      fireEvent.press(deleteButton);
    });

    then("Buyer should see a confirmation alert", () => {
      expect(screen.queryByTestId("DeleteModal")).not.toBe(null);
      expect(screen.queryByTestId("btnDeleteRequestYes")).not.toBe(null);
    });

    when("Buyer presses 'Yes' on the alert", () => {
      const yesButton = screen.getByTestId("btnDeleteRequestYes");
      fireEvent.press(yesButton);
    });

    then("delete source product should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const deleteAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI.messageId
      );
      screen.container.instance.deleteCallId = deleteAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteAddressAPI);
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

    then("Buyer can see source a product button", () => {

      expect(screen.queryByTestId("addButton")).not.toBe(null);
    });

    then("Buyer can click the source a product button", () => {
      const sourceAProductButton = screen.getByTestId("addButton");
      fireEvent.press(sourceAProductButton);
    });

    then("Buyer can refresh the FlatList on pull", () => {
      const Flatlist = screen.getByTestId("product_sourcing_flatlist_list");
      fireEvent(Flatlist, 'refreshControl');
      screen.container.instance.refreshData();
    });
  });
});
