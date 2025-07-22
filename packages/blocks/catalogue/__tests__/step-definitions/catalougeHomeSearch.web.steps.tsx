import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import CatalogueHomeSearchWeb from "../../src/CatalogueHomeSearch.web";


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "StylistDashboard",
};

const feature = loadFeature(
  "./__tests__/features/catalouge-search-scenario.feature" 
);

defineFeature(feature, (test) => {
  test("Buyer opens up CatalogHomeSearch", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on CatalogHomeSearch screen", () => {
      render(<CatalogueHomeSearchWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
    });

  });
});