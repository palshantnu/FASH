import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import OrderManagementBuyerConfirmation from "../../src/OrderManagementBuyerConfirmation"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
const navigation = require("react-navigation")
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
    id: "OrderManagementBuyerConfirmation"
}

const feature = loadFeature("./__tests__/features/ordermanagementbuyerconfirmation-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to OrderManagementBuyerConfirmation", ({ given, when, then }) => {
      let OrderManagementBuyerConfirmationBlock: ShallowWrapper;
      let instance: OrderManagementBuyerConfirmation;
  
      given("I am a User loading OrderManagementBuyerConfirmation", () => {
        OrderManagementBuyerConfirmationBlock = shallow(<OrderManagementBuyerConfirmation {...screenProps} />);
      });
  
      when("I navigate to the OrderManagementBuyerConfirmation", () => {
        instance = OrderManagementBuyerConfirmationBlock.instance() as OrderManagementBuyerConfirmation;
      });
  
      then("OrderManagementBuyerConfirmation will load with out errors", () => {
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
        expect(OrderManagementBuyerConfirmationBlock).toBeTruthy();      
      });

      then("Navigation to Chat with order management ID", () => {
        let chatNavigation = OrderManagementBuyerConfirmationBlock.findWhere((node) => node.prop('testID') === 'ChatNavigation');
        chatNavigation.simulate('press') 
      })
  
      then("I can click back button with with out errors", async () => {
        const msgTokenAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgTokenAPI.addData(
          getName(MessageEnum.RestAPIResponceMessage),
          "User-Token"
        );
        runEngine.sendMessage("Unit Test", msgTokenAPI);
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        );

        let mapComponent1 = OrderManagementBuyerConfirmationBlock.findWhere(
          (node) => node.prop("testID") === "mapViewShowForm"
        );
        let render_data1 = mapComponent1.renderProp("onLayout")({});
        expect(render_data1.exists()).toBe(true);

        let mapComponent2 = OrderManagementBuyerConfirmationBlock.findWhere(
          (node) => node.prop("testID") === "mapViewShowForm"
        );
        let render_data2 = mapComponent2.renderProp("onLayout")({});
        expect(render_data2.exists()).toBe(true);

        const msgTokenAPI1 = new Message(
          getName(MessageEnum.NavigationPayLoadMessage)
        );
        msgTokenAPI.addData(
          getName(MessageEnum.NavigationPayLoadMessage),
          "User-Token"
        );
        runEngine.sendMessage("Unit Test", msgTokenAPI1);
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationPayLoadMessage" }),
          ])
        );

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.LoginOptionsNavigationDataMessage), {orderId: 1, trackId: 1});
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)
      expect(msgPlayloadAPI).toBeTruthy();

      instance.setState({
        trackId:1530
      })
      

      const response = {
        "data": {
            "id": "1156",
            "type": "order_seller",
            "attributes": {
                "order_number": "OD00000279",
                "account": "Ashish Jain",
                "order_item_count": 1,
                "sub_total": "1000.0",
                "total": "1180.0",
                "status": "in_transit",
                "placed_at": "2024-07-25T13:24:01.662Z",
                "confirmed_at": "2024-07-25T13:24:33.207Z",
                "in_transit_at": "2024-07-26T07:35:11.264Z",
                "delivered_at": null,
                "process_at": "2024-07-25T13:28:07.506Z",
                "shipped_at": "2024-07-26T07:35:04.218Z",
                "return_at": null,
                "return_cancel_at": null,
                "return_pick_at": null,
                "cancelled_at": null,
                "cancellation_reason": null,
                "rejected_at": null,
                "refunded_at": null,
                "returned_at": null,
                "deliver_by": null,
                "order_status_id": 2,
                "created_at": "2024-07-25T13:23:00.544Z",
                "updated_at": "2024-07-26T07:35:11.269Z",
                "order_deliver_date": "09-12-2024",
                "order_deliver_time": "2PM",
                "delivery_addresses": {
                    "id": "656",
                    "type": "delivery_address",
                    "attributes": {
                        "name": "Ashish jain",
                        "country_code": "+965",
                        "phone_number": "22678801",
                        "contact_number": "+96522678801",
                        "street": "34/331",
                        "zip_code": "302033",
                        "area": "partap nager",
                        "block": "sector3",
                        "city": "Jaipur",
                        "house_or_building_number": "331",
                        "address_name": "34/331",
                        "is_default": true,
                        "latitude": 33.755787,
                        "longitude": -116.359998
                    }
                },
                "order_return_date": null,
                "order_return_time": null,
                "return_placed_at": null,
                "return_confirmed_at": null,
                "return_reject_at": null,
                "returned_assign_at": null,
                "refunded_cancel_at": null,
                "order_items": [
                    {
                        "id": "1530",
                        "type": "order_item_seller",
                        "attributes": {
                            "status": "in_transit",
                            "placed_at": "2024-07-25T13:24:01.789Z",
                            "confirmed_at": "2024-07-25T13:24:33.174Z",
                            "in_transit_at": "2024-07-26T07:35:11.228Z",
                            "delivered_at": null,
                            "cancelled_at": null,
                            "rejected_at": null,
                            "process_at": "2024-07-25T13:28:07.417Z",
                            "shipped_at": "2024-07-26T07:35:04.200Z",
                            "return_at": null,
                            "return_cancel_at": null,
                            "return_pick_at": null,
                            "return_placed_at": null,
                            "return_confirmed_at": null,
                            "return_reject_at": null,
                            "returned_assign_at": null,
                            "quantity": 1,
                            "unit_price": "1000.0",
                            "total_price": "1000.0",
                            "reason_of_rejection": null,
                            "reason_of_return": null,
                            "refunded_cancel_at": null,
                            "reason_refunded_cancel": null,
                            "refunded_at": null,
                            "catalogue_name": "monsoon_Shirt",
                            "brand_name": "Raymond",
                            "catalogue_variant_color": "Whiteee",
                            "catalogue_variant_sku": "d1",
                            "store_name": "Neon",
                            "catalogue_variant_size": "L",
                            "catalogue_variant_front_image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaG9QIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f465aebf4966fc5ccb8d3bbc88bce637d7dcb314/profile.jpg",
                            "catalogue_variant_back_image": "",
                            "catalogue_variant_side_image": "",
                            "driver_name": "driver jio",
                            "driver_latitude": 22.9798736572266,
                            "driver_longitude": 72.5968477081598,
                            "driver_phone_number": "96522001515",
                            "otp": null
                        }
                    }
                ],
                "payment_detail": null,
                "buyer_latitude": null,
                "estimated_delivery_time": "2024-08-01T06:43:20.060+00:00",
                "buyer_longitude": null
            }
        }
    }
            const Type = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
               );
               Type.addData(
                  getName(MessageEnum.RestAPIResponceDataMessage),
                  Type.messageId
                );
                instance.getBuyerOrderDetailApiCallId = Type.messageId;
              Type.addData(
                  getName(MessageEnum.RestAPIResponceSuccessMessage),
                  response
              );
                runEngine.sendMessage(Type.id, Type);

      });
    });
  });