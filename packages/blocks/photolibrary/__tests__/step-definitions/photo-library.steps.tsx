import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import PhotoLibrary from "../../src/PhotoLibrary";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "PhotoLibraryView",
};

const feature = loadFeature(
  "./__tests__/features/photo-library-scenario.feature"
);

const mockAPIResponse = {
    "data": [
      {
        "id": "44",
        "type": "portfolio",
        "attributes": {
          "images": [
            {
              "portfolio_image_id": 93,
              "description": "Description for image 1",
              "image_id": 4081,
              "url": "image.png"
            },
            {
              "portfolio_image_id": 92,
              "description": "C Sykmbcfdedaaaa",
              "image_id": 4080,
              "url": "image.png"
            },
          ]
        }
      }
    ]
  }

jest.mock("../../../../framework/src/StorageProvider", () => ({
    get: jest.fn().mockImplementation(() => Promise.resolve([]))
  }));

defineFeature(feature, (test) => {
  test("Stylist opens up PhotoLibraryView", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    
    given("Stylist is on PhotoLibraryView screen", () => {
      screen = render(<PhotoLibrary {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const getDataMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getDataMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getDataMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        mockAPIResponse,
      });
      screen.container.instance.apiGetPortfolio = getDataMsg.messageId;
      runEngine.sendMessage("UNIT TEST", getDataMsg);

    });

    then("Stylist can see the page without errors", () => {
      expect(screen.queryByTestId("PhotoLibraryView")).not.toBe(null);

      let CheckBoxValues = screen.getByTestId("CheckBoxValues")
      fireEvent(CheckBoxValues, "onValueChange");
    });
  });
});