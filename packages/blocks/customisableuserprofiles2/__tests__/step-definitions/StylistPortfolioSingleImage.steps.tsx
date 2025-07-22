import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistPortfolioSingleImage from "../../src/StylistPortfolioSingleImage";
import StylistPortfolioSingleImageWeb from "../../src/StylistPortfolioSingleImage.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "StylistPortfolioSingleImage",
};

const feature = loadFeature(
  "./__tests__/features/StylistPortfolioSingleImage-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up StylistPortfolioSingleImage", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on StylistPortfolioSingleImage screen", () => {
      screen = render(<StylistPortfolioSingleImage {...screenProps} />);
      render(<StylistPortfolioSingleImageWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const dataMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      dataMsg.addData(getName(MessageEnum.StylistPortfolioSingleImage), {item : {
        url : 'imageurl',
        description : 'description',
      }});
      runEngine.sendMessage("UNIT TEST", dataMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("StylistPortfolioSingleImage")).not.toBe(null);
    });

    then("Buyer can press back button", () => {
      let backBtn = screen.getByTestId("backButtonID");
      fireEvent.press(backBtn);
    });
  });
});