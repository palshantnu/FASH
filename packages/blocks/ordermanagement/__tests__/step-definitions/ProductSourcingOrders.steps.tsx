import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import ProductSourcingOrders from "../../src/ProductSourcingOrders";
import ProductSourcingOrdersWeb from "../../src/ProductSourcingOrders.web";

import { fireEvent } from "@testing-library/react-native";
import { beforeEach, expect } from "@jest/globals";

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return ''
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
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
},
  id: "ProductSourcingOrders",
};

const mockData = {
  "data": [
      {
          "id": "43",
          "type": "order_request",
          "attributes": {
              "product_name": "New test",
              "status": "accepted",
              "gender": "Female",
              "size": "Mes",
              "color": "Red",
              "quantity": 1,
              "product_quantity": 15,
              "price_per_unit": "25.0",
              "shipping_cost": "0.0",
              "product_display_image": null,
              "accept_through": "Bids",
              "sku": null,
              "product_sourcing_request_id": 109,
              "stylist": "fashion fashion",
              "buyer": "Test Test",
              "payment_method": null,
              "shipping_address": [
                  {
                      "id": 380,
                      "country": null,
                      "latitude": 22.7195687,
                      "longitude": 75.8577258,
                      "address_name": "home 2",
                      "addressble_id": 1082,
                      "addressble_type": "AccountBlock::Account",
                      "address_type": null,
                      "created_at": "2024-10-03T08:13:49.430Z",
                      "updated_at": "2024-10-16T06:45:47.606Z",
                      "first_name": null,
                      "last_name": null,
                      "number": null,
                      "street": "Indore, Madhya Pradesh, India",
                      "zipcode": "452006",
                      "area": "near mog line",
                      "block": "indor ",
                      "city": null,
                      "house_or_building_number": "34",
                      "floor": null,
                      "apartment_number": null,
                      "name": "الاهمية ",
                      "contact_number": "+918962256650",
                      "is_default": true,
                      "country_code": "+91",
                      "phone_number": "8962256650"
                  }
              ]
          }
      }
  ]
}

const feature = loadFeature(
  "./__tests__/features/ProductSourcingOrders-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Stylist opens up ProductSourcingOrders", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
      jest.spyOn(runEngine, "sendMessage");
    });

    given("Stylist is on ProductSourcingOrders screen", () => {
      screen = render(<ProductSourcingOrders {...screenProps} />);
      render(<ProductSourcingOrdersWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        {
          error : "not found"
        },
      });
      screen.container.instance.getProductSourcingOrdersCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        mockData,
      });
      screen.container.instance.getProductSourcingOrdersCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);
      
    });

    then("stylist can see the page without errors", () => {
      expect(screen.queryByTestId("ProductSourcingOrders")).not.toBe(null);
    });


  });
});