import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import i18n from "../../../../components/src/i18n/i18n.config";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import ProductByStylist from "../../src/ProductByStylist";
import ProductByStylistWeb from "../../src/ProductByStylist.web";

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
  id: "ProductByStylist",
};

const catalogueArr = {
    data: [
      {
        id: "45",
        type: "catalogue",
        attributes: {
          sub_category: {
            id: 369,
            name: "Latest Dresses",
            created_at: "2023-09-26T13:16:14.163Z",
            updated_at: "2023-09-26T13:16:14.163Z",
            parent_id: null,
            rank: null,
          },
          brand: null,
          tags: [],
          reviews: [],
          name: "Catalogue TEST",
          sku: "123123AAA",
          description: "Test Desc",
          manufacture_date: "2023-09-26T00:00:00.000Z",
          length: null,
          breadth: null,
          height: null,
          stock_qty: 5,
          availability: "in_stock",
          weight: null,
          price: null,
          recommended: null,
          on_sale: null,
          sale_price: null,
          discount: null,
          is_wishlist: false,
          product_number: "333222",
          category: {
            id: "61",
            type: "category",
            attributes: {
              id: 61,
              name: "New Arrivals",
              status: "active",
              created_at: "2023-09-26T13:16:14.144Z",
              updated_at: "2023-10-27T04:50:03.073Z",
              image:
                "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--900ce3a3c57ed0c3c6f95e4b2098110a86a3731c/Image%20Pasted%20at%202023-9-13%2018-22%20(1).png",
            },
          },
          service: null,
          images: null,
          average_rating: 0,
          catalogue_variants: [
            {
              id: "54",
              type: "catalogue_variant",
              attributes: {
                id: 54,
                catalogue_id: 45,
                catalogue_variant_color_id: 7,
                catalogue_variant_color: {
                  id: 7,
                  name: "Grey",
                  created_at: "2023-10-05T05:19:28.122Z",
                  updated_at: "2023-10-05T05:19:28.122Z",
                },
                catalogue_variant_size_id: 3,
                catalogue_variant_size: {
                  id: 3,
                  name: "Large",
                  created_at: "2023-09-22T04:45:48.783Z",
                  updated_at: "2023-09-22T04:45:48.783Z",
                },
                price: "1500.0",
                stock_qty: 4448,
                on_sale: null,
                sale_price: null,
                discount_price: null,
                length: null,
                breadth: null,
                height: null,
                created_at: "2023-11-02T13:52:02.806Z",
                updated_at: "2023-11-14T05:27:08.431Z",
                images: null,
              },
            },
          ],
        },
      },
    ],
    meta: {
      total_pages: 1,
      current_page: 1,
      total_record: 6,
      prev_page: null,
      next_page: null,
    },
  };

const feature = loadFeature(
  "./__tests__/features/ProductByStylist-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up ProductByStylist", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on ProductByStylist screen", () => {
      screen = render(<ProductByStylist {...screenProps} />);
      render(<ProductByStylistWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const msgPlayloadAPI = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgPlayloadAPI.addData(
        getName(MessageEnum.ProductByStylist),
        "987"
      );
      runEngine.sendMessage("Unit Test", msgPlayloadAPI);

      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      screen.container.instance.getProductByStylistApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("ProductByStylist")).not.toBe(null);
    });

    then("Buyer can press buttons", () => {
      const button = screen.getByTestId("backButtonID");
      fireEvent.press(button);
      const button2 = screen.getByTestId("btnCatalogueListRedirection");
      fireEvent.press(button2);
      const button3 = screen.getByTestId("wishlist-0");
      fireEvent.press(button3);
      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      screen.container.instance.addWishlistApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
      fireEvent.press(button3);
      const msggetdata1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata1
      );
      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata1.messageId
      );
      screen.container.instance.removeWishlistApiCallId = msggetdata1.messageId;
      runEngine.sendMessage("Unit Test", msggetdata1);
    });
  });
  test("Buyer opens up ProductByStylist with arabic lang", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on ProductByStylist screen", () => {
      screen = render(<ProductByStylist {...screenProps} />);
      i18n.language = "en"
      render(<ProductByStylistWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const msgPlayloadAPI = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgPlayloadAPI.addData(
        getName(MessageEnum.ProductByStylist),
        "987"
      );
      runEngine.sendMessage("Unit Test", msgPlayloadAPI);

      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      screen.container.instance.getProductByStylistApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("ProductByStylist")).not.toBe(null);
    });

    then("Buyer can press buttons", () => {
      const button = screen.getByTestId("backButtonID");
      fireEvent.press(button);
      const button2 = screen.getByTestId("btnCatalogueListRedirection");
      fireEvent.press(button2);
      const button3 = screen.getByTestId("wishlist-0");
      fireEvent.press(button3);
      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      screen.container.instance.addWishlistApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
      fireEvent.press(button3);
      const msggetdata1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata1
      );
      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata1.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata1.messageId
      );
      screen.container.instance.removeWishlistApiCallId = msggetdata1.messageId;
      runEngine.sendMessage("Unit Test", msggetdata1);
    });
  })
});