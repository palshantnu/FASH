import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import RejectOrder from "../../src/RejectOrder";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {

            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "RejectOrder",
};

const rejectedMockdata =   {
    "id": "105",
    "type": "seller_order_seller",
    "attributes": {
        "id": 105,
        "status": "rejected",
        "accept_order_upload_time": null,
        "order_items": [
            {
                "id": "216",
                "type": "order_item_seller",
                "attributes": {
                    "quantity": 3,
                    "unit_price": "700.0",
                    "total_price": "2100.0",
                    "estimated_delivery_time": "2024-04-24T11:24:00.765Z",
                    "reason_of_rejection": null,
                    "catalogue_name": "winter best t shirt",
                    "brand_name": "bjk",
                    "catalogue_variant_color": "Grey",
                    "catalogue_variant_sku": "x1",
                    "store_name": null,
                    "catalogue_variant_size": "Small",
                    "catalogue_variant_front_image": "example.jpg",
                    "catalogue_variant_back_image": "example.jpg",
                    "catalogue_variant_side_image": "example.jpg"
                }
            }
        ],
        "order_management_order": {
            "id": "150",
            "type": "order_seller_side",
            "attributes": {
                "order_number": "OD00000131",
                "account": "Nishanth",
                "sub_total": "2100.0",
                "total": "2478.0",
                "status": "confirmed",
                "placed_at": "2024-04-22T11:21:07.400Z",
                "confirmed_at": "2024-04-22T11:21:41.570Z",
                "in_transit_at": null,
                "delivered_at": null,
                "cancelled_at": null,
                "refunded_at": null,
                "returned_at": null,
                "deliver_by": null,
                "order_status_id": 2,
                "created_at": "2024-04-22T11:19:58.934Z",
                "updated_at": "2024-04-22T11:21:41.575Z",
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



const sendMessage = jest.spyOn(runEngine, "sendMessage");



const feature = loadFeature(
    "./__tests__/features/rejectorder-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to RejectOrder", ({ given, when, then }) => {
        let RejectOrderWrapper: ShallowWrapper;
        let instance: RejectOrder;

        given("I am a User loading RejectOrder", () => {
            RejectOrderWrapper = shallow(<RejectOrder {...screenProps} />);
        });

        when("I navigate to the RejectOrder", () => {
            instance = RejectOrderWrapper.instance() as RejectOrder;
        });

        then("RejectOrder will load with out errors", () => {
          
            const statusTxt = RejectOrderWrapper.findWhere(node => node.text() === "Reject Order");
            expect(statusTxt.exists()).toBe(false);
        });
        then("Set token from session response", () => {

            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            runEngine.sendMessage("Unit Test", reciveToken);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );
        });

        then("I can select reject reason in drop down",()=>{
            const button = RejectOrderWrapper.findWhere(
                (node) => node.prop("testID") === "rejectBtn"
            )
            button.simulate("press")
            const dropDown = RejectOrderWrapper.findWhere(
                (node) => node.prop("testID") === "reject-drop-down"
            )
            const onChangeMockSelectData= { reason: 'Payment Processing Issue', id: '4' }
            dropDown.simulate("change", onChangeMockSelectData);
            
            expect(dropDown.prop("value")).toBe(null);
        })
      
        then("I can able to reject the Order",()=>{
            const button = RejectOrderWrapper.findWhere(
                (node) => node.prop("testID") === "rejectBtn"
            )
            button.simulate("press")
    
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                rejectedMockdata
            );
            instance.updateTheRejectStatusMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "OrderSummaryNavaigationMessage" }),
                ])
            );
           
    
          })
        when("I can able to click close button to navigate previous screen", () => {
            const closeBtn = RejectOrderWrapper.findWhere(
                (node) => node.prop("testID") === "closeBtn"
            )
            closeBtn.simulate("press")
        })

        then("I can leave the screen with out errors", () => {
            expect(screenProps.navigation.goBack).toBeCalled()
          
        });




    });
});
