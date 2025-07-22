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
import OrderManagementBuyerSummary from "../../src/OrderManagementBuyerSummary";

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
  id: "OrderManagementBuyerSummary",
};
const returnDataArr={"data":{"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"Delivered","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{reason_of_return:"dsfsfds","status":"returned","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}}
const cancelOrderObj={"data":{"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"return_order","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}}
const deliverdOrderData={"data":{"id":"1112","type":"order_seller","attributes":{"order_number":"OD00000243","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"return_order","placed_at":"2024-07-22T10:03:35.116Z","confirmed_at":"2024-07-22T10:04:14.437Z","in_transit_at":"2024-07-22T10:05:27.803Z","delivered_at":"2024-07-22T10:05:59.026Z","process_at":"2024-07-22T10:04:28.971Z","shipped_at":"2024-07-22T10:05:21.479Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-22T10:02:42.555Z","updated_at":"2024-07-22T10:48:34.352Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"620","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":"23-07-2024","order_return_time":"5 AM","return_placed_at":"2024-07-22T10:48:34.350Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1480","type":"order_item_seller","attributes":{reason_of_return:"fdgfd","status":"return_placed","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"null","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}},{"id":"1480","type":"order_item_seller","attributes":{"status":"return_placed","placed_at":"2024-07-22T10:03:35.143Z","confirmed_at":"2024-07-22T10:04:14.402Z","in_transit_at":"2024-07-22T10:05:27.786Z","delivered_at":"2024-07-22T10:05:58.855Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-22T10:04:28.924Z","shipped_at":"2024-07-22T10:05:21.439Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":"2024-07-22T10:48:34.313Z","return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","stylist_full_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":null,"catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":null,"driver_latitude":null,"driver_longitude":null,"driver_phone_number":null,"otp":null}}],"payment_detail":{"id":287,"status":"CAPTURED","created_at":"2024-07-22T10:03:35.103Z","updated_at":"2024-07-22T10:03:35.183Z","charge_id":"chg_TS06A2920241302w1M92207787","merchant_id":null,"order_id":"OD00000243","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1112,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"estimated_delivery_time":null,"buyer_longitude":null}}}


const feature = loadFeature("./__tests__/features/ordermanagementbuyersummary-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to ordermanagementbuyersummary", ({ given, when, then }) => {
    let ordermanagementbuyersummaryBlock: ShallowWrapper;
    let instance: OrderManagementBuyerSummary;

    given("I am a User loading ordermanagementbuyersummary", () => {
      ordermanagementbuyersummaryBlock = shallow(<OrderManagementBuyerSummary {...screenProps} />);
    });

    when("I navigate to the ordermanagementbuyersummary", () => {
      instance = ordermanagementbuyersummaryBlock.instance() as OrderManagementBuyerSummary;
    });

    then("ordermanagementbuyersummary will load with out errors", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        expect(tokenMsg).toBeTruthy()
    });

    then("I can back button with out errors", () => {
      let btnBackOrderSummary = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnBackOrderSummary"
      );
      btnBackOrderSummary.simulate("press");
      expect(btnBackOrderSummary).toBeTruthy();

      const flatlistWrapper = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "orderDetailItemDataList"
     );
      const renderItem = flatlistWrapper.renderProp("renderItem")({item: deliverdOrderData.data.attributes.order_items[0],index: 0,});
      let btnOrderStatus = renderItem.findWhere((node) => node.prop("testID") === "btnOrderStatus");
      btnOrderStatus.simulate("press");
    flatlistWrapper.props().ItemSeparatorComponent()
    flatlistWrapper.renderProp("keyExtractor")("3");
        expect(renderItem).toBeTruthy();
    });

    then("I can navigation payload with out errors", async () => {
        const navigationPlayloadResponcse = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        navigationPlayloadResponcse.addData(getName(MessageEnum.OrderIdNavigationPayloadMessage), "1");
        runEngine.sendMessage("Unit Test", navigationPlayloadResponcse)

        const getToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        getToken.addData(getName(MessageEnum.navigationTokenMessage), 'token');
        runEngine.sendMessage("Unit Test", getToken)
        expect(getToken).toBeTruthy()
    })

    then("I can show all order api work with out errors", async () => {
        const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),deliverdOrderData);

        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
        instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
        runEngine.sendMessage("Unit Test", getApiResponce);
        expect(getApiResponce).toBeTruthy()
    })

    then("I can show all order flatlist by render with out errors", async () => {
      let btnCancel = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnCancelOrder"
      );
      btnCancel.simulate("press");
      let btnCancelOrderYes = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnCancelOrderYes"
      );
      btnCancelOrderYes.simulate("press");
      let btnCancelOrderNo = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnCancelOrderNo"
      );
      btnCancelOrderNo.simulate("press");
      
   

    });
    then("I can show return order flatlist by render with out errors", async () => {
       const cancelRefundApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
      cancelRefundApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), cancelRefundApiResponce);
      cancelRefundApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),deliverdOrderData);

      cancelRefundApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), cancelRefundApiResponce.messageId);
      instance.cancelRefundApiCallId = cancelRefundApiResponce.messageId
      runEngine.sendMessage("Unit Test", cancelRefundApiResponce);
      const getBuyerOrderDetailApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBuyerOrderDetailApiResponce);
      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),cancelOrderObj);

      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBuyerOrderDetailApiResponce.messageId);
      instance.getBuyerOrderDetailApiCallId = getBuyerOrderDetailApiResponce.messageId
      runEngine.sendMessage("Unit Test", getBuyerOrderDetailApiResponce);
      const flatlistWrapper = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "orderDetailItemDataList2"
     );
       
      const renderItem = flatlistWrapper.renderProp("renderItem")({item: cancelOrderObj.data.attributes.order_items[0],index: 0,});
      let btnOrderStatus = renderItem.findWhere((node) => node.prop("testID") === "btnOrderStatus");
      btnOrderStatus.simulate("press");
    flatlistWrapper.props().ItemSeparatorComponent()
    flatlistWrapper.renderProp("keyExtractor")("3");
      let btnCancelOrder = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnCancelOrder"
      );
      btnCancelOrder.simulate("press");
      let btnCancelOrders = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "btnCancelOrder"
      );
      btnCancelOrders.simulate("press");
     expect(btnOrderStatus).toBeTruthy();
    })
    then("I can show all order stylist flatlist by render with out errors", async () => {
      const flatlistWrapper = ordermanagementbuyersummaryBlock.findWhere(
        (node) => node.prop("testID") === "orderDetailItemDataList"
     );
     flatlistWrapper.renderProp("renderItem")({item: deliverdOrderData.data.attributes.order_items[1],index: 0,});

      expect(flatlistWrapper).toBeTruthy();
      const getBuyerOrderDetailApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBuyerOrderDetailApiResponce);
      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),returnDataArr);

      getBuyerOrderDetailApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getBuyerOrderDetailApiResponce.messageId);
      instance.getBuyerOrderDetailApiCallId = getBuyerOrderDetailApiResponce.messageId
      runEngine.sendMessage("Unit Test", getBuyerOrderDetailApiResponce);

    });
  });
});
