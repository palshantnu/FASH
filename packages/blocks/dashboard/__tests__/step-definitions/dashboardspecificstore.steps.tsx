import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { jest, expect, test, describe, beforeAll } from "@jest/globals";
import { render } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import DashboardSpecificStore from "../../src/DashboardSpecificStore";

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
  id: "DashboardSpecificStore",
};

const navigationPropsMock={
  "id": "123",
  "type": "bussiness",
  "attributes": {
    "address": "Kuwait",
    "area": "Hz",
    "available_variants": [
      {"variant1": "value1"},
      {"variant2": "value2"},
      {"variant3": "value3"},
      {"variant4": "value4"},
      {"variant5": "value5"},
      {"variant6": "value6"},
      {"variant7": "value7"},
      {"variant8": "value8"},
      {"variant9": "value9"},
      {"variant10": "value10"},
      {"variant11": "value11"},
      {"variant12": "value12"},
      {"variant13": "value13"},
      {"variant14": "value14"},
      {"variant15": "value15"},
      {"variant16": "value16"}
    ],
    "average_shipping_time": "50 mins",
    "block": "Znsj",
    "city": "Zhzh",
    "contact_number": {
      "country_code": "+91",
      "phone_number": "9148538896"
    },
    "description": "Znjzbzn",
    "driver_instruction": "Zjzh",
    "email": "nishanthnishu118@gmail.com",
    "expected_delivery_time": "2024-05-15T10:51:42.176+00:00",
    "floor": "Nzzh",
    "image": "image.png",
    "is_open": false,
    "latitude": 29.378586,
    "longitude": 47.990341,
    "mall_name": "Zjzj",
    "payment_mode": ["UPI"],
    "status": "Approved",
    "store_name": "Kli",
    "store_operating_hours": {
      "friday": {"start": "8:00 AM", "end": "5:00 PM"},
      "monday": {"start": "8:00 AM", "end": "5:00 PM"},
      "saturday": {"start": "8:00 AM", "end": "5:00 PM"},
      "sunday": {"start": "8:00 AM", "end": "5:00 PM"},
      "thursday": {"start": "8:00 AM", "end": "5:00 PM"},
      "tuesday": {"start": "8:00 AM", "end": "5:00 PM"},
      "wednesday": {"start": "8:00 AM", "end": "5:00 PM"}
    },
    "unit_number": 7676,
    "zipcode": "571101"
  }
}

const NewOrderMockData=  {"data": [
  {
      "id": "155",
      "type": "seller_order_seller",
      "attributes": {
          "id": 155,
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
]}
const sendMessage = jest.spyOn(runEngine, "sendMessage");

const feature = loadFeature("./__tests__/features/dashboardspecificstore-scenario.feature");

defineFeature(feature, test => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.useFakeTimers();
    screen = render(<DashboardSpecificStore {...screenProps} />);
  });

  test("User navigates to DashboardSpecificStore", ({ given, when, then }) => {
    let DashboardSpecificStoreWrapper: ShallowWrapper;
    let instance: DashboardSpecificStore;
    given("I am a User loading DashboardSpecificStore", () => {
      DashboardSpecificStoreWrapper = shallow(<DashboardSpecificStore {...screenProps} />);
    });

    when("I navigate to the DashboardSpecificStore", () => {
      instance = DashboardSpecificStoreWrapper.instance() as DashboardSpecificStore;
    });

    then("DashboardSpecificStore will load with out errors", () => {
      
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
          expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
    );
    });
    then("set recived store information from navigation", () => {
      const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      payloadMsg.addData(
          getName(MessageEnum.ManageTimingStoreIdPayloadMessage),
          navigationPropsMock
      );
      runEngine.sendMessage("Unit Test", payloadMsg);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationPayLoadMessage" }),
        ])
    );
     
  })

  then("I can able to change opne close status",() => {
    const flatlist = DashboardSpecificStoreWrapper.findWhere(
      (node) => node.prop("testID") === "new_order_list_flatlist"
    );
    const renderItem = flatlist.renderProp("ListHeaderComponent")({});
    let let_button = renderItem.findWhere(
      (node) => node.prop("testID") == "toggleAllOpenStatus"
    );
    let_button.at(0).prop("onValueChange")(true);
    flatlist.renderProp("ItemSeparatorComponent")({});
    expect(let_button).toBeTruthy();



  });


  then('I can able to fetch the new order',()=>{
    const apiTestMsgs = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
  );
  apiTestMsgs.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      apiTestMsgs.messageId
  );
  apiTestMsgs.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {total_orders:"10",total_delivered_orders:"10",total_in_process_orders:"10",
        total_new_orders:"10",}
  );
  instance.getOrderCountMsgId = apiTestMsgs.messageId;
  
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
    {total_orders:"10",total_delivered_orders:"10",total_in_process_orders:"10",
      total_new_orders:"10",}
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
    instance.getOrderListOfStoreMsgId = apiTestMsg.messageId;
    
    instance.onLoading();
    jest.advanceTimersByTime(4000);

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
})

then("I can able to show the new order",()=>{
  const flatlist = DashboardSpecificStoreWrapper.findWhere(
      (node) => node.prop("testID") === "new_order_list_flatlist"
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


then('I can able to click the accept order',()=>{
const flatlist = DashboardSpecificStoreWrapper.findWhere(
  (node) => node.prop("testID") === "new_order_list_flatlist"
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
then("I can able to click the reject order",()=>{
const flatlist = DashboardSpecificStoreWrapper.findWhere(
  (node) => node.prop("testID") === "new_order_list_flatlist"
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
  const flatlist = DashboardSpecificStoreWrapper.findWhere(
      (node) => node.prop("testID") === "new_order_list_flatlist"
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
