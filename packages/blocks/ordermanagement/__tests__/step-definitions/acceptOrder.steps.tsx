import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import AcceptOrder from "../../src/AcceptOrder";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {

            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "AcceptOrder",
};


const InProcessNavigationMockData=   {
    "id": "105",
    "type": "seller_order_seller",
    "attributes": {
        "id": 105,
        "status": "in_process",
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
    "./__tests__/features/acceptorder-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to AcceptOrder", ({ given, when, then }) => {
        let AcceptOrderWrapper: ShallowWrapper;
        let instance: AcceptOrder;

        given("I am a User loading AcceptOrder", () => {
            AcceptOrderWrapper = shallow(<AcceptOrder {...screenProps} />);
        });

        when("I navigate to the AcceptOrder", () => {
            instance = AcceptOrderWrapper.instance() as AcceptOrder;
        });

        then("AcceptOrder will load with out errors", () => {
            const statusTxt = AcceptOrderWrapper.findWhere(node => node.text() === "Accept Order");
            expect(statusTxt.exists()).toBe(false);
           
        });
      then('I can able to increase and decreasing the timmings',()=>{
        const plusButton = AcceptOrderWrapper.findWhere(
            (node) => node.prop("testID") === "plusBtn"
        )
        plusButton.simulate("press")
        const minusButton = AcceptOrderWrapper.findWhere(
            (node) => node.prop("testID") === "minusBtn"
        )
        minusButton.simulate("press")
        const statusTxt = AcceptOrderWrapper.findWhere(node => node.text() === "30");
        expect(statusTxt.exists()).toBe(true);
      })
      then("I can able to accept the Order",()=>{
        const button = AcceptOrderWrapper.findWhere(
            (node) => node.prop("testID") === "confirmBtn"
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
            InProcessNavigationMockData
        );
        instance.updateTheAcceptStatusMsgId = apiTestMsg.messageId;
        runEngine.sendMessage("Test", apiTestMsg);
       
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "OrderSummaryNavaigationMessage" }),
            ])
        );

      })

        when("I can able to click close button to navigate previous screen", () => {
            const closeBtn = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "closeBtn"
            )
            closeBtn.simulate("press")
        })

        then("I can leave the screen with out errors", () => {
          
            expect(screenProps.navigation.goBack).toBeCalled()
          
        });




    });
});
