import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import OrderReturnConfirm from "../../src/OrderReturnConfirm";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {

            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "OrderReturnConfirm",
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
    "./__tests__/features/OrderReturnConfirm-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to OrderReturnConfirm", ({ given, when, then }) => {
        let AcceptOrderWrapper: ShallowWrapper;
        let instance: OrderReturnConfirm;

        given("I am a User loading OrderReturnConfirm", () => {
            AcceptOrderWrapper = shallow(<OrderReturnConfirm {...screenProps} />);
        });

        when("I navigate to the OrderReturnConfirm", () => {
            instance = AcceptOrderWrapper.instance() as OrderReturnConfirm;
        });

        then("OrderReturnConfirm will load with out errors", () => {
            
            const confirmBtn = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "confirmBtn"
            )
            confirmBtn.simulate("press")
           
            const btnBackRetrrnOrder = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackRetrrnOrder"
            )
            btnBackRetrrnOrder.simulate("press")
           
        });
    
    });
});
