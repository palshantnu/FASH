import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { buyerProductSourcingViewData } from "../__mocks__/responses";
import { fireEvent } from "@testing-library/react-native";

import BuyerProductSourcingDetailed from "../../src/BuyerProductSourcingDetailed";
import BuyerProductSourcingDetailedWeb from "../../src/BuyerProductSourcingDetailed.web";

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
  id: "BuyerProductSourcingView",
};

const feature = loadFeature(
  "./__tests__/features/buyerProductSourcingView-scenario.feature"
);

const dummyData = {
  data: {
    id: "36",
    type: "product_sourcing_request",
    attributes: {
      id: 36,
      product_name: "Khel",
      request_status: "pending",
      max_price: "600.0",
      min_price: "250.0",
      sizes: ["Large"],
      description:
        "Uske ghumi Jan of the 3D or 5th se hu um Or hm ex of ring de in hu de for FB 3D nu",
      gender: "female",
      quantity: 600,
      colours: ["Yellow"],
      images: [
        {
          id: 3712,
          url: "profile.jpg",
        },
      ],
      total_stylist_offer_requests: 1,
      product_sourcing_stylist_prices: [],
    },
  },
};

defineFeature(feature, (test) => {
  test("Buyer opens up BuyerProductSourcingView", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on BuyerProductSourcingView screen", () => {
      screen = render(<BuyerProductSourcingDetailed {...screenProps} />);
      render(<BuyerProductSourcingDetailedWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const requestmsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      tokenMsg.addData(getName(MessageEnum.BuyerProductSourcingView), {
        productId: 6,
      });
      screen.container.instance.setState({
        _id: 6,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);

      screen.container.instance.getProductData("TOKEN");

      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          buyerProductSourcingViewData,
      });
      screen.container.instance.getProductDataCallId =
        sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

      const acceptQuoteMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      acceptQuoteMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          acceptQuoteMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          buyerProductSourcingViewData,
      });
      screen.container.instance.acceptQuoteCallId =
        acceptQuoteMessage.messageId;
      runEngine.sendMessage("UNIT TEST", acceptQuoteMessage);

      const rejectQuoteMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rejectQuoteMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          rejectQuoteMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          buyerProductSourcingViewData,
      });
      screen.container.instance.rejectQuoteCallId =
        rejectQuoteMessage.messageId;
      runEngine.sendMessage("UNIT TEST", rejectQuoteMessage);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("BuyerProductSourcingView")).not.toBe(null);
    });

    then("Buyer can press the Back Button", () => {
      let buttonComponent = screen.getByTestId("backButtonID");
      fireEvent.press(buttonComponent);
    });

    then("Buyer can see and press the Reject Button", () => {
      const data = buyerProductSourcingViewData.data.attributes;
      const rejectButton = screen.getByTestId(
        "rejectButton" + data.product_sourcing_stylist_prices[0].id
      );
      fireEvent.press(rejectButton);
    });

    then("Buyer can press No button", () => {
      const noButton = screen.getByTestId("btnCancelRequestNoreject");
      fireEvent.press(noButton);
    });

    then("Buyer can press Yes button", () => {
      const yesButton = screen.getByTestId("btnAcceptOrRejectreject");
      fireEvent.press(yesButton);
    });

    then("Buyer can see and press the Accept Button", () => {
      const data = buyerProductSourcingViewData.data.attributes;
      const acceptButton = screen.getByTestId(
        "acceptButton" + data.product_sourcing_stylist_prices[0].id
      );
      fireEvent.press(acceptButton);
      expect(screen.getByTestId("acceptModal")).toBeTruthy();
    });

    then("Buyer can press No button", () => {
      const noButton = screen.getByTestId("btnCancelRequestNoaccept");
      fireEvent.press(noButton);
    });

    then("Buyer can press Yes button", () => {
      const yesButton = screen.getByTestId("btnAcceptOrRejectaccept");
      fireEvent.press(yesButton);
    });

    then("Buyer can see and press the Chat Button", () => {
      const data = buyerProductSourcingViewData.data.attributes;
      const chatButton = screen.getByTestId(
        "chatButton" + data.product_sourcing_stylist_prices[0].id
      );
      fireEvent.press(chatButton);
    });

    then("Buyer can refresh the ScrollView on pull", () => {
      const ScrollView = screen.getByTestId("product_sourcing_scrollview");
      fireEvent(ScrollView, "refreshControl");
      screen.container.instance.refreshData();
      expect(ScrollView).toBeTruthy();
    });

    then("Buyer can see acceptChatText button", () => {
      const data =
        buyerProductSourcingViewData.data.attributes
          .product_sourcing_stylist_prices[1];
      const acceptChatText = screen.getByTestId("acceptChatText" + data.id);
      fireEvent.press(acceptChatText);
      expect(acceptChatText).toBeTruthy();
    });
  });

  test("Buyer opens up BuyerProductSourcingView without any bids", ({
    given,
    when,
    then,
  }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on BuyerProductSourcingView screen", () => {
      screen = render(<BuyerProductSourcingDetailed {...screenProps} />);
      render(<BuyerProductSourcingDetailedWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const requestmsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      tokenMsg.addData(getName(MessageEnum.BuyerProductSourcingView), {
        productId: 6,
      });
      screen.container.instance.setState({
        _id: 6,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);

      screen.container.instance.getProductData("TOKEN");

      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyData,
      });
      screen.container.instance.getProductDataCallId =
        sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

      const acceptQuoteMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      acceptQuoteMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          acceptQuoteMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          buyerProductSourcingViewData,
      });
      screen.container.instance.acceptQuoteCallId =
        acceptQuoteMessage.messageId;
      runEngine.sendMessage("UNIT TEST", acceptQuoteMessage);

      const rejectQuoteMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rejectQuoteMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          rejectQuoteMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          buyerProductSourcingViewData,
      });
      screen.container.instance.rejectQuoteCallId =
        rejectQuoteMessage.messageId;
      runEngine.sendMessage("UNIT TEST", rejectQuoteMessage);
    });

    then("Buyer can see the page without errors", () => {
      const noButton = screen.getByTestId("btnCancelRequestNoaccept");
      fireEvent.press(noButton);
      expect(screen.queryByTestId("BuyerProductSourcingView")).not.toBe(null);
    });
  });

 
});
