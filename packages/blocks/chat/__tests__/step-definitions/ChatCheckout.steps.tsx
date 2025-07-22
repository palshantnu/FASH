import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import ChatCheckout from "../../src/ChatCheckout";
import ChatCheckoutWeb from "../../src/ChatCheckout.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      if (event === "focus") {
        callback();
      }
      if (event === "willFocus") {
        callback();
      }
      if (event === "didFocus") {
        callback();
      }
      if (event === "willBlur") {
        callback();
      }
      if (event === "didBlur") {
        callback();
      }
    }),
  },
  id: "BuyerProductSourcingView",
};

const feature = loadFeature(
  "./__tests__/features/ChatCheckout-scenario.feature"
);

let mockAPIResponse = {
  "cart_item": {
      "data": {
          "id": "92",
          "type": "order_request",
          "attributes": {
              "product_name": "H&M T shirts",
              "product_desc": "Flower Print",
              "status": "in_cart",
              "gender": "male",
              "size": "XL",
              "color": "Olive green",
              "quantity": 1,
              "product_quantity": 6,
              "accept_through": null,
              "accept_time": null,
              "primary_display_image": null,
              "primary_image": null,
              "price_per_unit": "60.0",
              "shipping_cost": "50.0",
              "total_amount": "410.0",
              "sku": null,
              "product_sourcing_request_id": null,
              "stylist": "Anuraggg Rai",
              "buyer": "Test Test",
              "estimated_arrival_time": "2025-01-29T19:12:37.164Z",
              "payment_method": null,
              "shipping_address": [
                  {
                      "id": 553,
                      "country": null,
                      "latitude": 29.3413899,
                      "longitude": 47.9935975,
                      "address_name": "ba1",
                      "addressble_id": 1082,
                      "addressble_type": "AccountBlock::Account",
                      "address_type": null,
                      "created_at": "2025-01-24T06:42:18.817Z",
                      "updated_at": "2025-01-27T10:00:14.935Z",
                      "first_name": null,
                      "last_name": null,
                      "number": null,
                      "street": "8XRV+86W, Kuwait",
                      "zipcode": "452001",
                      "area": "Nuzha",
                      "block": "3",
                      "city": "Kuwait",
                      "house_or_building_number": "204",
                      "floor": null,
                      "apartment_number": null,
                      "name": "Jahin",
                      "contact_number": "+96523245875",
                      "is_default": true,
                      "country_code": "+965",
                      "phone_number": "23245875"
                  }
              ]
          }
      }
  }
}

defineFeature(feature, (test) => {
  test("Buyer opens up ChatCheckout", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on ChatCheckout screen", () => {
      screen = render(<ChatCheckout {...screenProps} />);
      render(<ChatCheckoutWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const getNavData: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      getNavData.addData(getName(MessageEnum.NavigationChatCheckoutData),"1");

      runEngine.sendMessage("Unit Test", getNavData);

      const getDataMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getDataMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getDataMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        mockAPIResponse,
      });
      screen.container.instance.getDataApiCallId = getDataMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getDataMessage);

      const placeCartApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      placeCartApi.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        placeCartApi.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        {
            id : "1",
            transaction : {
              url : "https://www.google.com"
            }
        },
      });
      screen.container.instance.placeCartApiCallId = placeCartApi.messageId;
      runEngine.sendMessage("UNIT TEST", placeCartApi);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("ChatCheckout")).not.toBe(null);
      // const addAddress = screen.getByTestId("addAddress");
      // fireEvent.press(addAddress);

      const checkoutBtn = screen.getByTestId("checkoutBtn");
      fireEvent.press(checkoutBtn);
    });
  });
});