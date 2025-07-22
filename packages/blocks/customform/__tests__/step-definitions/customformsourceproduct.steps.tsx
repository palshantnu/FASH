import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { shallow, ShallowWrapper } from "enzyme";

import CustomformSourceProduct from "../../src/CustomformSourceProduct";
import CustomformSourceProductWeb from "../../src/CustomformSourceProduct.web";
import { fireEvent } from "@testing-library/react-native";
import { act } from "@testing-library/react-native";

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
  id: "StylistDashboard",
};

const feature = loadFeature(
  "./__tests__/features/customformsourceproduct-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up CustomformSourceProduct", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on CustomformSourceProduct screen", () => {
      screen = render(<CustomformSourceProduct {...screenProps} />);
      render(<CustomformSourceProductWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("customformSourceProduct")).not.toBe(null);
    });

    given("I can see the submit button", () => {
      expect(screen.queryByTestId("btnSubmitButton")).not.toBe(null);
    });

    when("I click on submit button with empty fields", () => {
      const submitButton = screen.getByTestId("btnSubmitButton");
      fireEvent.press(submitButton);
    });

    then("I can see the Product Name error message", () => {
      expect(screen.queryByTestId("Product Name *-Error")).not.toBe(null);
    });

    given("Form for SoucreProduct is loaded with out errors", () => {
      expect(screen.queryByTestId("customformSourceProduct")).not.toBe(null);
    });

    then("I can see Product Name and edit it", () => {
      expect(screen.getByTestId("Product Name *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Product Name *-input");
      fireEvent.changeText(textInputComponent, "New Product Title");
    });

    then("I can see Product Description and edit it", () => {
      expect(screen.getByTestId("Product Description *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId(
        "Product Description *-input"
      );
      fireEvent.changeText(textInputComponent, "New Product Description");
    });

    then("I can see Product Colour and edit it", () => {
      expect(screen.getByTestId("Product Colour *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Product Colour *-input");
      fireEvent.changeText(textInputComponent, "red");
    });

    then("I can see Product Sizes and edit it", () => {
      expect(screen.getByTestId("Product Sizes *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Product Sizes *-input");
      fireEvent.changeText(textInputComponent, "Small");
    });

    then("I can see Min Price and edit it", () => {
      expect(screen.getByTestId("Min Price *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Min Price *-input");
      fireEvent.changeText(textInputComponent, "100");
    });

    then("I can see Max Price and edit it", () => {
      expect(screen.getByTestId("Max Price *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Max Price *-input");
      fireEvent.changeText(textInputComponent, "200");
    });

    then("I can see Product Quantity and edit it", () => {
      expect(screen.getByTestId("Product Quantity *-input")).not.toBe(null);
      let textInputComponent = screen.getByTestId("Product Quantity *-input");
      fireEvent.changeText(textInputComponent, "10");
    });

    then("I can select gender", () => {
      let inpGender = screen.getByTestId("Select Gender");
      fireEvent.press(inpGender);
      const item = { label: "Male", value: "male" };
      screen.container.instance.handleSelctGender(item);
    });

    then("I can click on upload icon and see the upload modal", () => {
      let upload = screen.getByTestId("btnUploadProductImage");
      fireEvent.press(upload);
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
    });

    then("I can find camera button", () => {
      let camera = screen.getByTestId("btn_camera");
      fireEvent.press(camera);
      expect(screen.getByTestId("cameraModalCheck")).toBeTruthy();
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

    when("I click on submit button with filed fields", () => {
      const submitButton = screen.getByTestId("btnSubmitButton");
      fireEvent.press(submitButton);
    });
  });


  test("Buyer opens up CustomformSourceProduct for test", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on CustomformSourceProduct screen for test", () => {
      screen = render(<CustomformSourceProduct {...screenProps} />);
      render(<CustomformSourceProductWeb {...screenProps} />);
    });

    when("The page loads completely for test", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors for test", () => {
      expect(screen.queryByTestId("customformSourceProduct")).not.toBe(null);
    });

    given("I can see the submit button for test", () => {
      expect(screen.queryByTestId("btnSubmitButton")).not.toBe(null);
    });
  });

  test("Buyer opens up CustomformSourceProduct for test currency", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on CustomformSourceProduct screen for test currency", () => {
      screen = render(<CustomformSourceProduct {...screenProps} />);
      render(<CustomformSourceProductWeb {...screenProps} />);
    });

    when("The page loads completely for test currency", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors for test currency", () => {
      expect(screen.queryByTestId("customformSourceProduct")).not.toBe(null);
    });

    given("I can see the submit button for test currency", () => {
      expect(screen.queryByTestId("btnSubmitButton")).not.toBe(null);
    });
  });

  test("Buyer opens up CustomformSourceProduct for check", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: CustomformSourceProduct;

    given("Buyer is on CustomformSourceProduct screen for check", () => {
      addressManagementBlock = shallow(<CustomformSourceProduct {...screenProps} />);
    });

    when("The page loads completely for check", () => {
      instance = addressManagementBlock.instance() as CustomformSourceProduct;
      const messsage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      messsage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messsage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: [
          {
            numeric_code: "+992",
            country_full_name: "Tajikistan",
            country_code: "TJ",
            country_flag: "🇹🇯",
          },
          {
            numeric_code: "+1",
            country_full_name: "Jamaica",
            country_code: "JM",
            country_flag: "🇯🇲",
          },
          {
            numeric_code: "+509",
            country_full_name: "Haiti",
            country_code: "HT",
            country_flag: "🇭🇹",
          },
          {
            numeric_code: "+965",
            country_full_name: "Kuwait",
            country_code: "KW",
            country_flag: "🇰🇼",
          },
        ],
      });
      runEngine.sendMessage("UNIT TEST", messsage);
    });

    then("Buyer can see the page without errors for check", () => {
      const msgAddAddressErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              name:
                "must have a unique combination of Apartment Number, Building/House, and Block",
            },
          ],
        }
      );

      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI.messageId
      );
      instance.submitSourceProductApiCallId = msgAddAddressErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgAddAddressErrorRestAPI);
    });
  });

  test("Buyer opens up CustomformSourceProduct for check product colour", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on CustomformSourceProduct screen for check product colour", () => {
      screen = render(<CustomformSourceProduct {...screenProps} />);
      render(<CustomformSourceProductWeb {...screenProps} />);
    });

    when("The page loads completely for check product colour", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

    then("Buyer can see the page without errors for check product colour", () => {
      expect(screen.queryByTestId("customformSourceProduct")).not.toBe(null);
    });
  });

  test("Buyer opens up CustomformSourceProduct for product size with comma and without comma", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: CustomformSourceProduct;

    given("Buyer is on CustomformSourceProduct screen for product size with comma and without comma", () => {
      addressManagementBlock = shallow(<CustomformSourceProduct {...screenProps} />);
    });

    when("The page loads completely for product size with comma and without comma", () => {
      instance = addressManagementBlock.instance() as CustomformSourceProduct;
      const messsage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      messsage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messsage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: [
          {
            numeric_code: "+992",
            country_full_name: "Tajikistan",
            country_code: "TJ",
            country_flag: "🇹🇯",
          },
          {
            numeric_code: "+1",
            country_full_name: "Jamaica",
            country_code: "JM",
            country_flag: "🇯🇲",
          },
          {
            numeric_code: "+509",
            country_full_name: "Haiti",
            country_code: "HT",
            country_flag: "🇭🇹",
          },
          {
            numeric_code: "+965",
            country_full_name: "Kuwait",
            country_code: "KW",
            country_flag: "🇰🇼",
          },
        ],
      });
      runEngine.sendMessage("UNIT TEST", messsage);
    });

    then("Buyer can see the page without errors for product size with comma and without comma", () => {
      const msgAddAddressErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              name:
                "must have a unique combination of Apartment Number, Building/House, and Block",
            },
          ],
        }
      );

      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI.messageId
      );
      instance.submitSourceProductApiCallId = msgAddAddressErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgAddAddressErrorRestAPI);
    });
  });
});

