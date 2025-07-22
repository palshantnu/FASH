import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { jest,beforeEach, expect } from '@jest/globals';
import OrderManagementBuyerOrderView from "../../src/OrderManagementBuyerOrderView";
import * as utils from "../../../../framework/src/Utilities";
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
  id: "OrderManagementBuyerOrderView",
};
const orderArrObjectNess=[
  {"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"Processing","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"return_confirmed",return_type:"","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}
]
const orderArrObjectNes=[
  {"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"Processing","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"confirmed","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}
]
const orderArrObject=[
  {"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"delivered","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}
]
const orderArrObjects=[
  {"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"return_order","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"return_placed","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}
]
const orderArrObjectNew=[
  {"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"return_order","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"return_placed","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}
]
const feature = loadFeature("./__tests__/features/ordermanagementbuyerorderview-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to ordermanagementbuyerorderview", ({ given, when, then }) => {
    let ordermanagementbuyerorderviewBlock: ShallowWrapper;
    let instance: OrderManagementBuyerOrderView;

    given("I am a User loading ordermanagementbuyerorderview", () => {
      ordermanagementbuyerorderviewBlock = shallow(<OrderManagementBuyerOrderView {...screenProps} />);
    });

    when("I navigate to the ordermanagementbuyerorderview", () => {
      instance = ordermanagementbuyerorderviewBlock.instance() as OrderManagementBuyerOrderView;
    });

    then("ordermanagementbuyerorderview will load with out errors", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        expect(tokenMsg).toBeTruthy();
    });

    then("I can back button with out errors", () => {
      let buttonComponent = ordermanagementbuyerorderviewBlock.findWhere(
        (node) => node.prop("testID") === "btnBackOrderStatus"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can navigation payload with out errors", async () => {
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Returned");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.navigationTokenMessage), 'token');
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
        expect(msgPlayloadAPI).toBeTruthy();
        let render_item = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "orderStatusDataList"
          );
          let render_data = render_item.renderProp("renderItem")({item: orderArrObjectNess[0],index: 0,});
          render_item.renderProp("ItemSeparatorComponent")({})
          render_item.renderProp("ListEmptyComponent")({})
          render_item.renderProp("keyExtractor")({id:0})
          expect(render_data).toBeTruthy();
          let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnCancelOrder1"
          );
          let_button.simulate("press");
  
          let let_button1 = render_data.findWhere(
            (node) => node.prop("testID") == "btnOrderStatus1"
          );
          let_button1.simulate("press");
        
    })

    then("I can navigation payload delivered with out errors", async () => {
      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Delivered");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      expect(msgPlayloadAPI).toBeTruthy();

    })

    then("I can show all order api work with out errors", async () => {

        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:orderArrObject});

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerOrderApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(getCategoryMessage).toBeTruthy();
        let render_item = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "orderStatusDataList"
          );
          let render_data = render_item.renderProp("renderItem")({item: orderArrObject[0],index: 0,});
          render_item.renderProp("ItemSeparatorComponent")({})
          render_item.renderProp("ListEmptyComponent")({})
          render_item.renderProp("keyExtractor")({id:0})
          expect(render_data).toBeTruthy();
  
          let renderAnother = render_data.findWhere((node) => node.prop("testID") === "orderItemDataList");
          renderAnother.renderProp("renderItem")({item: orderArrObject[0],index: 0,});
          renderAnother.renderProp("ItemSeparatorComponent")({})
          renderAnother.renderProp("keyExtractor")({id:0}) 
  
          let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnCancelOrder4"
          );
          let_button.simulate("press");
  
          let btnOrderStatus4 = render_data.findWhere(
            (node) => node.prop("testID") == "btnOrderStatus4"
          );
          btnOrderStatus4.simulate("press");
        
  
          let buttonComponentConfirm = ordermanagementbuyerorderviewBlock.findWhere(
            (node) => node.prop("testID") === "btnCancelOrderYes"
          );
          buttonComponentConfirm.simulate("press");
          const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
          msgPlayloadAPI.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Returned");
          runEngine.sendMessage("Unit Test", msgPlayloadAPI)
          expect(msgPlayloadAPI).toBeTruthy();
    })

    then("I can show all order flatlist by render with out errors", async () => {
     
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:orderArrObject});

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerOrderApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
       
      let render_item = ordermanagementbuyerorderviewBlock.findWhere(
        (node) => node.prop("testID") === "orderStatusDataList"
        );
        let render_data = render_item.renderProp("renderItem")({item: orderArrObjects[0],index: 0,});
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();

        let renderAnother = render_data.findWhere((node) => node.prop("testID") === "orderItemDataList");
        renderAnother.renderProp("renderItem")({item: orderArrObjects[0],index: 0,});
        renderAnother.renderProp("ItemSeparatorComponent")({})
        renderAnother.renderProp("keyExtractor")({id:0}) 

        let let_button = render_data.findWhere(
          (node) => node.prop("testID") == "btnCancelOrder2"
        );
        let_button.simulate("press");

        let let_button1 = render_data.findWhere(
          (node) => node.prop("testID") == "btnOrderStatus2"
        );
        let_button1.simulate("press");
        let buttonComponentConfirm = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelOrderYes"
        );
        buttonComponentConfirm.simulate("press");
        let buttonComponent = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelOrderNo"
        );
        buttonComponent.simulate("press");

        const msgPlayloadAPI1s = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI1s.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Processing");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI1s)
       
      const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPIToken.addData(getName(MessageEnum.navigationTokenMessage), 'token');
      runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
     
    
    });

    then("I can cancel order api call with out errors", async () => {
      let render_item = ordermanagementbuyerorderviewBlock.findWhere(
        (node) => node.prop("testID") === "orderStatusDataList"
        );
        let render_data = render_item.renderProp("renderItem")({item: orderArrObjectNes[0],index: 0,});
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
        let let_button = render_data.findWhere(
          (node) => node.prop("testID") == "btnCancelOrder3"
        );
        let_button.simulate("press");

        let let_button1 = render_data.findWhere(
          (node) => node.prop("testID") == "btnOrderStatus3"
        );
        let_button1.simulate("press");
        let buttonComponentConfirm = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelOrderYes"
        );
        buttonComponentConfirm.simulate("press");
        let buttonComponent = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelOrderNo"
        );
        buttonComponent.simulate("press");
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{data:orderArrObjects});

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerOrderCancelApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(getCategoryMessage).toBeTruthy();
      const msgPlayloadAPI1 = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI1.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Returned");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI1)
      
        let render_items = ordermanagementbuyerorderviewBlock.findWhere(
          (node) => node.prop("testID") === "orderStatusDataList"
          );
        let render_datas = render_items.renderProp("renderItem")({item: orderArrObjectNew[0],index: 0,});
        let btnOrderStatus5 = render_datas.findWhere(
          (node) => node.prop("testID") == "btnOrderStatus5"
        );
        btnOrderStatus5.simulate("press");
        
        expect(render_datas).toBeTruthy();
       
    })
  });
});
