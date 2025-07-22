import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import SeeAllProductSourcing from "../../src/SeeAllProductSourcing";
import SeeAllProductSourcingWeb from "../../src/SeeAllProductSourcing.web";
import { sourceProductResponse } from "../__mocks__/responses";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "StylistProductSourcing",
};

const feature = loadFeature(
  "./__tests__/features/seeallproductsourcing-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Stylist opens up StylistProductSourcing", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on StylistProductSourcing screen", () => {
      screen = render(<SeeAllProductSourcing {...screenProps} />);
      render(<SeeAllProductSourcingWeb {...screenProps} />);
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

    then("stylist can see the page without errors", () => {
      expect(screen.queryByTestId("SeeAllProductSourcing")).not.toBe(null);
    });
  });
});