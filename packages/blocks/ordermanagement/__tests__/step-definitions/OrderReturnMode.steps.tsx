import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import OrderReturnMode from "../../src/OrderReturnMode";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: jest.fn().mockReturnValueOnce("request_delivery_partner").mockReturnValue(""),
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
    id: "OrderReturnMode",
};


const InProcessNavigationMockData=  { data:{
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
                    status:"return_confirmed",
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
                    "returnType":"self_drop_off",
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
}

const sendMessage = jest.spyOn(runEngine, "sendMessage");



const feature = loadFeature(
    "./__tests__/features/OrderReturnMode-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to OrderReturnMode", ({ given, when, then }) => {
        let AcceptOrderWrapper: ShallowWrapper;
        let instance: OrderReturnMode;

        given("I am a User loading OrderReturnMode", () => {
            AcceptOrderWrapper = shallow(<OrderReturnMode {...screenProps} />);
        });

        when("I navigate to the OrderReturnMode", () => {
            instance = AcceptOrderWrapper.instance() as OrderReturnMode;
            const raiseMessage: Message = new Message(
              getName(MessageEnum.NavigationPayLoadMessage)
            );
            raiseMessage.addData(getName(MessageEnum.SessionResponseData),'request_delivery_partner');
            runEngine.sendMessage("Unit Test", raiseMessage);
        });

        then("OrderReturnMode will load with out errors", () => {
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
            instance.getReturnModeDetailApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const language1 = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "language"
            )
            language1.simulate("press")
            const language2 = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "language1"
            )
            language2.simulate("press")
            const confirmBtn = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "confirmBtn"
            )
            const btnCancelOrderNo = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "btnCancelOrderNo"
            )
            const btnCancelOrderYes = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "btnCancelOrderYes"
            )
            btnCancelOrderYes.simulate('press')
            btnCancelOrderNo.simulate('press')
            confirmBtn.simulate("press")
            const apiTestMsgs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgs.messageId
            );
            apiTestMsgs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                InProcessNavigationMockData
            );
            instance.setReturnModeApiCallId = apiTestMsgs.messageId;
            runEngine.sendMessage("Test", apiTestMsgs);
            const minusButton = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackAcceptOrder"
            )
            minusButton.simulate("press")
            const confirmBtnClick = AcceptOrderWrapper.findWhere(
                (node) => node.prop("testID") === "confirmBtn"
            )
            confirmBtnClick.simulate("press")
        });
     

    });
});
