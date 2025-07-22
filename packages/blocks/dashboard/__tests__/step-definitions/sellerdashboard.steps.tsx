import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import SellerDashboard from "../../src/SellerDashboard";

const screenProps = {
  navigation: {
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
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "SellerDashboard",
};


const NewOrderMockData = {
  "data": [
    {
      "id": "155",
      "type": "seller_order_seller",
      "attributes": {
        "id": 155,
        "order_wait_time":1,
        "status": "new_order",
        "accept_order_upload_time": null,
        "order_items": [
          {
            "id": "322",
            "type": "order_item_seller",
            "attributes": {
              "quantity": 1,
              "unit_price": "30.0",
              "total_price": "30.0",
              "reason_of_rejection": null,
              "status": "placed",
              "catalogue_name": "winter best t shirt",
              "brand_name": "bjk",
              "catalogue_variant_color": "Limegreen",
              "catalogue_variant_sku": "hfgb",
              "store_name": "Hi store",
              "catalogue_variant_size": "Small",
              "catalogue_variant_front_image": "image.png",
              "catalogue_variant_back_image": "",
              "catalogue_variant_side_image": "",
              "driver": null
            }
          }
        ],
        "order_management_order": {
          "id": "219",
          "type": "order_seller_side",
          "attributes": {
            "order_number": "OD00000184",
            "account": "Nishanth",
            "sub_total": "30.0",
            "total": "94.4",
            "status": "placed",
            "placed_at": "2024-05-13T18:00:54.656Z",
            "confirmed_at": null,
            "in_transit_at": null,
            "delivered_at": null,
            "cancelled_at": null,
            "refunded_at": null,
            "returned_at": null,
            "deliver_by": null,
            "order_status_id": 2,
            "created_at": "2024-05-13T18:00:42.087Z",
            "updated_at": "2024-05-13T18:00:54.704Z",
            "order_deliver_date": "09-12-2024",
            "order_deliver_time": "2PM",
            "delivery_addresses": null,
            "order_return_date": null,
            "order_return_time": null,
            "payment_detail": null
          }
        }
      }
    }
  ]
}

const sendMessage = jest.spyOn(runEngine, "sendMessage");



const feature = loadFeature(
  "./__tests__/features/sellerdashboard-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to SellerDashboard", ({ given, when, then }) => {
    let SellerDashboardWrapper: ShallowWrapper;
    let instance: SellerDashboard;

    given("I am a User loading SellerDashboard", () => {
      SellerDashboardWrapper = shallow(<SellerDashboard {...screenProps} />);
      jest.advanceTimersByTime(10000);

    });

    when("I navigate to the SellerDashboard", () => {
      instance = SellerDashboardWrapper.instance() as SellerDashboard;

      instance.componentWillUnmount();
    });

    then("I can load token with out errors", () => {
      instance.isFocused.current = true;
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
    })

    then("I can able to click analytics", () => {
      const flatlist = SellerDashboardWrapper.findWhere(
        (node) => node.prop("testID") === "new_order_list"
      );
      const renderItem = flatlist.renderProp("ListHeaderComponent")({});
      let let_button = renderItem.findWhere(
        (node) => node.prop("testID") == "btnRedirectDashboard"
      );
      let_button.simulate("press");
      flatlist.renderProp("ItemSeparatorComponent")({});
      expect(let_button.exists()).toBe(true);
    });

    then('I can able to fetch the new order', () => {
      const apiTestMsgs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsgs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsgs.messageId
      );
      apiTestMsgs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          total_orders: "10", total_delivered_orders: "10", total_in_process_orders: "10",
          total_new_orders: "10",
        }
      );
      instance.getOrderCountMsgId = apiTestMsgs.messageId;

      instance.onRefresh();
      jest.advanceTimersByTime(4000);

      runEngine.sendMessage("Test", apiTestMsgs);
      const apiTestMsgNews = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsgNews.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsgNews.messageId
      );
      apiTestMsgNews.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          total_orders: "10", total_delivered_orders: "10", total_in_process_orders: "10",
          total_new_orders: "10",
        }
      );
      instance.getOrderCountMsgId = apiTestMsgNews.messageId;

      runEngine.sendMessage("Test", apiTestMsgNews);
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        NewOrderMockData
      );
      instance.getOrderListMsgId = apiTestMsg.messageId;

      runEngine.sendMessage("Test", apiTestMsg);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            properties: expect.objectContaining({
              RestAPIResponceSuccessMessage: expect.objectContaining({
                data: NewOrderMockData.data,
              }),
            }),
          }),
        ])
      );
      instance.initialTimeRemaining();
      instance.findTimeRemainingForId("155");
      instance.getTimeRemaining('11',2);
      instance.calculateNewTimeRemainingData(NewOrderMockData.data);
      instance.setState({
        timeRemainingData: [
          {
            id: '1', timeRemaining: '5',
            minutes: 0,
            startTime: ""
        },
        {
            id: '2', timeRemaining: '0',
            minutes: 0,
            startTime: ""
        },
        {
            id: '3', timeRemaining: '3',
            minutes: 0,
            startTime: ""
        }, 
        ],
      });
      instance.startReducingTimer();
      jest.advanceTimersByTime(6000);
    })
    then("I can able to show the new order", () => {
      const flatlist = SellerDashboardWrapper.findWhere(
        (node) => node.prop("testID") === "new_order_list"
      );
      const item = NewOrderMockData.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      flatlist.renderProp("keyExtractor")("3");
      flatlist.renderProp("ListEmptyComponent")({});


      expect(renderItem.exists()).toBe(true);

    })
    then('I can able to click the accept order', () => {
      const flatlist = SellerDashboardWrapper.findWhere(
        (node) => node.prop("testID") === "new_order_list"
      );

      const item = NewOrderMockData.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      const virualizedList = renderItem.findWhere(
        (node) => node.prop("testID") === "virualizedList"
      )
      const renderVirutalizedList = virualizedList.renderProp("ListFooterComponent")();


      const acceptOrderBtn = renderVirutalizedList.findWhere(
        (node) => node.prop("testID") === "AcceptOrderBtn"
      )
      acceptOrderBtn.simulate("press")
      virualizedList.renderProp("ListHeaderComponent")();
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationAcceptOrderMessage" }),
        ])
      );
    })
    then("I can able to click the reject order", () => {
      const flatlist = SellerDashboardWrapper.findWhere(
        (node) => node.prop("testID") === "new_order_list"
      );

      const item = NewOrderMockData.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      const virualizedList = renderItem.findWhere(
        (node) => node.prop("testID") === "virualizedList"
      )
      const renderVirutalizedList = virualizedList.renderProp("ListFooterComponent")();


      const acceptOrderBtn = renderVirutalizedList.findWhere(
        (node) => node.prop("testID") === "RejectOrderBtn"
      )
      acceptOrderBtn.simulate("press")
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationRejectOrderMessage" }),
        ])
      );
    })

    when("I can able to click the view all button", () => {
      const item = NewOrderMockData.data[0];
      const flatlist = SellerDashboardWrapper.findWhere(
        (node) => node.prop("testID") === "new_order_list"
      );
      const header = flatlist.renderProp("ListHeaderComponent")({
        item: item,
        index: 0,
      });

      const ViewAllBtn = header.findWhere(
        (node) => node.prop("testID") === "ViewAllBtn"
      )
      ViewAllBtn.simulate("press")
    })

    then("I can leave the screen with out errors", () => {
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "OrderSummaryNavaigationMessage" }),
        ])
      );


    });




  });
});
