import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import SeeAllStylistPortfolioImage from "../../src/SeeAllStylistPortfolioImage";
import SeeAllStylistPortfolioImageWeb from "../../src/SeeAllStylistPortfolioImage.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "SeeAllStylistPortfolioImage",
};

const feature = loadFeature(
  "./__tests__/features/SeeAllStylistPortfolioImage-scenario.feature"
);

const portfolioImagesResponse ={
  "data": [
      {
          "attributes": {
            "images": [
              {
                  "portfolio_image_id": 37,
                  "description": "Asdasd",
                  "image_id": 3386,
                  "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
              },
              {
                  "portfolio_image_id": 38,
                  "description": "Asdasd",
                  "image_id": 3386,
                  "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
              },
              {
                  "portfolio_image_id": 39,
                  "description": "Asdasd",
                  "image_id": 3386,
                  "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
              },
              {
                "portfolio_image_id": 37,
                "description": "Asdasd",
                "image_id": 3386,
                "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
            },
            {
              },
          {
            },
            {
              "portfolio_image_id": 37,
              "description": "Asdasd",
              "image_id": 3386,
              "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
          },
          {
              "portfolio_image_id": 38,
              "description": "Asdasd",
              "image_id": 3386,
              "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
          },
          {
              "portfolio_image_id": 39,
              "description": "Asdasd",
              "image_id": 3386,
              "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
          },
            ]
          }          
      }
  ]
}

defineFeature(feature, (test) => {
  test("Buyer opens up SeeAllStylistPortfolioImage", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on SeeAllStylistPortfolioImage screen", () => {
      screen = render(<SeeAllStylistPortfolioImage {...screenProps} />);
      render(<SeeAllStylistPortfolioImageWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const stylistMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      stylistMsg.addData(getName(MessageEnum.SeeAllStylistPortfolioImage), {stylistId: "STYLIST_ID"});
      runEngine.sendMessage("UNIT TEST", stylistMsg);

      const portfolioImageMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      portfolioImageMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        portfolioImageMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          portfolioImagesResponse,
      });
      screen.container.instance.getPortfolioImagesApiCallID = portfolioImageMsg.messageId;
      runEngine.sendMessage("UNIT TEST", portfolioImageMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("SeeAllStylistPortfolioImage")).not.toBe(null);
    });

    then("Buyer can press various buttons", () => {
      let backBtn = screen.getByTestId("backButtonID");
      fireEvent.press(backBtn);
      const imageView = screen.getByTestId("image01");
      fireEvent.press(imageView);
      const imageView01 = screen.getByTestId("image11");
      fireEvent.press(imageView01);
      const imageView12 = screen.getByTestId("image12");
      fireEvent.press(imageView12);
      const imageView20 = screen.getByTestId("image20-37");
      fireEvent.press(imageView20);
      const imageView30 = screen.getByTestId("image30");
      fireEvent.press(imageView30);
      const imageView31 = screen.getByTestId("image31");
      fireEvent.press(imageView31);
      const imageView32 = screen.getByTestId("image32");
      fireEvent.press(imageView32);
    });
  });
});