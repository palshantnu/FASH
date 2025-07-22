import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { act, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { fireEvent } from "@testing-library/react-native";
import BidYourQuote from "../../src/BidYourQuote";
import BidYourQuoteWeb from "../../src/BidYourQuote.web";

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
  id: "BidYourQuote",
};

const feature = loadFeature(
  "./__tests__/features/bidyourquote-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Stylist opens up BidYourQuote to add bid", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on BidYourQuote screen", () => {
      screen = render(<BidYourQuote {...screenProps} />);
      render(<BidYourQuoteWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Stylist can see the page without errors", () => {
      expect(screen.queryByTestId("BidYourQuote")).not.toBe(null);
    });

    then("Stylist can press the back button", () => {
      let buttonComponent = screen.getByTestId("backButtonID");
      fireEvent.press(buttonComponent);
    });

    then("Stylist can press the submit button", () => {
      let buttonComponent = screen.getByTestId("submitButton");
      fireEvent.press(buttonComponent);
    });

    then("Stylist can add input to Description-input", () => {
      let textInputComponent = screen.getByTestId("Description-input");
      fireEvent.changeText(textInputComponent, "New Product Description");
    });

    then("Stylist can add input to Quote-price-input", () => {
      let textInputComponent = screen.getByTestId("Price-input");
      fireEvent.changeText(textInputComponent, "100");
    });

    then("Stylist can click on upload icon and see the upload modal", () => {
      let upload = screen.getByTestId("btnUploadProductImage");
      fireEvent.press(upload);
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
      screen.container.instance.setState({ camModal: true });
    });

    then("I can find camera button", () => {
      let camera = screen.getByTestId("btn_camera");
      fireEvent.press(camera);
    });

    then("I can find gallery button", () => {
      let gallery = screen.getByTestId("btn_gallery");
      fireEvent.press(gallery);
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
    });

    then("I can see the cancel button", () => {
      let cancel = screen.getByTestId("btn_cancelMedia");
      fireEvent.press(cancel);
    });

    then("I can click on upload icon again and see the upload modal", () => {
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
    });

    then("I can find gallery button and selecte image", () => {
      let gallery = screen.getByTestId("btn_gallery");
      fireEvent.press(gallery);
      const mockImage = {
        uri: "file://path/to/mock/image.jpg",
        name: "mockImage.jpg",
        type: "image/jpeg",
      };
      act(() => {
        screen.container.instance.updateImageGalleryData(mockImage);
      });
    });

    then("I can click on submit button with filed fields", () => {
      let submitButton = screen.getByTestId("submitButton");
      fireEvent.press(submitButton);
      screen.container.instance.createStylistOffer();

      const submitmessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitmessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: submitmessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {}
        }
      });
      screen.container.instance.getStylistOfferApiCallId = submitmessage.messageId;
      runEngine.sendMessage("UNIT TEST", submitmessage);
    });
  });

  test("Stylist opens up BidYourQuote to edit bid", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on BidYourQuote screen", () => {
      screen = render(<BidYourQuote {...screenProps} />);
      render(<BidYourQuoteWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
      const data = {
        for : "Edit",
        minPrice : 100,
        maxPrice : 200,
        id : "1",
        product_description: "test",
        quote_price: "100",
        images: [{ id: 1, url: "image.png" }],
        request_id: "1"
      }
      const requestmsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      requestmsg.addData(getName(MessageEnum.BidYourQuote), data); 
      runEngine.sendMessage("UNIT TEST", requestmsg);
    });

    then("Stylist can see the page without errors", () => {
      expect(screen.queryByTestId("BidYourQuote")).not.toBe(null);
    });

    then("Stylist can see the submit button", () => {
      expect(screen.getByTestId("submitButton")).not.toBe(null);
    });

    then("Stylist can press the submit button", () => {
      let buttonComponent = screen.getByTestId("submitButton");
      fireEvent.press(buttonComponent);
    });

  });

  test("Stylist opens up BidYourQuote", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on BidYourQuote screen for test", () => {
      screen = render(<BidYourQuote {...screenProps} />);
      render(<BidYourQuoteWeb {...screenProps} />);
    });

    when("The page loads completely for test", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

   
    then("I can click on upload icon again and see the upload modal for test", () => {
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
    });
  });


  test("Stylist opens up BidYourQuote to add bid for add data", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on BidYourQuote screen for add data", () => {
      screen = render(<BidYourQuote {...screenProps} />);
      render(<BidYourQuoteWeb {...screenProps} />);
    });

    when("The page loads completely for add data", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("I can click on submit button with filed fields for add data", () => {
      let submitButton = screen.getByTestId("submitButton");
      fireEvent.press(submitButton);
      screen.container.instance.createStylistOffer();

      const submitmessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      submitmessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: submitmessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {}
        }
      });
      screen.container.instance.getStylistOfferApiCallId = submitmessage.messageId;
      runEngine.sendMessage("UNIT TEST", submitmessage);
    });
  });


});