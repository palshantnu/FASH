import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistDetailedProfile from "../../src/StylistDetailedProfile";
import StylistDetailedProfileWeb from "../../src/StylistDetailedProfile.web";

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return '181'
      }
     return null;
    }),
    setStorageData: jest.fn(),
  };
});

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "StylistProfile",
};



const portfolioResponse ={
  "data": {
      "stylist_id": 1007,
      "bio": "Shdkfjf",
      "profile_picture": "photo.jpeg",
      "name": "Anurag Rai"
  },
  "meta": {
      "is_fav": false,
      "is_hired": false
  }
}

const portfolioImagesResponse ={
  "data": [
      {
          "attributes": {
            "images": [
              {
                "portfolio_image_id": 52,
                "description": "",
                "image_id": 3476,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 53,
                "description": "",
                "image_id": 3477,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 54,
                "description": "",
                "image_id": 3478,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 55,
                "description": "",
                "image_id": 3479,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 56,
                "description": "Zhdcb",
                "image_id": 3480,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 57,
                "description": "Zhdvch\n",
                "image_id": 3481,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 58,
                "description": "Xhdhcjf",
                "image_id": 3482,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 59,
                "description": "Zhdcb",
                "image_id": 3484,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 60,
                "description": "Zhdvch\n",
                "image_id": 3485,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 61,
                "description": "Xhdhcjf",
                "image_id": 3486,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 62,
                "description": "Zhdcb",
                "image_id": 3487,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 63,
                "description": "Zhdvch\n",
                "image_id": 3488,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 64,
                "description": "Xhdhcjf",
                "image_id": 3489,
                "url": "image.jpeg"
              },
              {
                "portfolio_image_id": 65,
                "description": "",
                "image_id": 3498,
                "url": "image.jpeg"
              }
            ]
          }          
      }
  ]
}

const data ={ 
  message : "portfolio_image",
}

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));


const feature = loadFeature(
  "./__tests__/features/stylistdetailedprofile-scenario.feature"
);

defineFeature(feature, (test) => {
  test("User navigates to StylistProfile", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I am a User loading StylistProfile", () => {
      screen = render(<StylistDetailedProfile {...screenProps} />);
      render(<StylistDetailedProfileWeb {...screenProps} />);
    });

    when("I navigate to the StylistProfile", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const navMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navMsg.addData(getName(MessageEnum.StylistProfile), {
        stylist_id: 1007
      });
      runEngine.sendMessage("UNIT TEST", navMsg);
      
      const portfolioMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      portfolioMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        portfolioMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          portfolioResponse,
      });
      screen.container.instance.getPortfolioApiCallID = portfolioMsg.messageId;
      runEngine.sendMessage("UNIT TEST", portfolioMsg);

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

    then("StylistProfile will load with out errors", () => {
      expect(screen.queryByTestId("StylistProfile")).not.toBe(null);
    });

    then("I can press various buttons", () => {
      let backBtn = screen.getByTestId("backButtonID");
      fireEvent.press(backBtn);
      let btnRequestCallback = screen.getByTestId("btnRequestCallback");
      fireEvent.press(btnRequestCallback);
      let btnChat = screen.getByTestId("btnChat");
      fireEvent.press(btnChat);
      let btnProducts = screen.getByTestId("btnProducts");
      fireEvent.press(btnProducts);
      let btnPricing = screen.getByTestId("btnPricing");
      fireEvent.press(btnPricing);
      let btnExplore = screen.getByTestId("btnExplore");
      fireEvent.press(btnExplore);
      let btnHireStylist = screen.getByTestId("btnHireStylist");
      fireEvent.press(btnHireStylist);
      let btnFav = screen.getByTestId("btnFav");
      fireEvent.press(btnFav);
      const favMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      favMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        favMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        data,
      });
      screen.container.instance.updateFavApiCallID = favMsg.messageId;
      runEngine.sendMessage("UNIT TEST", favMsg);
      screen.container.instance.showStylistFavMessage(true);
    });
  });
});