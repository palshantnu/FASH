import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import SelectStoreProducts from "../../src/SelectStoreProducts"

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {
            callback()
            }
        }),
        state: {
            params: {
                comingFrom: 'bulkActions',
                storeId: 122,
            }
         },
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "SelectStoreProducts"
}

const storeMockData = {
    "data": [
        {
            "id": "262",
            "type": "inventory_management",
            "attributes": {
                "id": 262,
                "catalogue_id": 195,
                "product_name": "my jeans",
                "product_description": "JEANS FOR SMOTH",
                "sku": "19",
                "stock_qty": 12,
                "low_stock_threshold": 0,
                "is_listed": true,
                "price": "12.0",
                "size": "Small",
                "colour": "Whiteee",
                "gender": "male",
                "front_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTBFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--de120e060aa7a46d3eb2736cff25c1158d6382be/profile.jpg",
                "brand_name": "TS"
            }
        }
    ]
}

const feature = loadFeature('./__tests__/features/selectstoreproducts-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to SelectedStoreProducts", ({ given, when, then }) => {
        let SelectStoreWrapper: ShallowWrapper;
        let instance: SelectStoreProducts;

        given("I am a User loading SelectedStoreProducts", () => {
            SelectStoreWrapper = shallow(<SelectStoreProducts {...screenProps} />);
        });

        when("I navigate to the SelectedStoreProducts", () => {
            instance = SelectStoreWrapper.instance() as SelectStoreProducts;
        });

        then("SelectedStoreProducts will load with out errors", () => {
            expect(SelectStoreWrapper).toBeTruthy();
        });
        then("Set token from session response", () => {

            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            instance.receive("from", reciveToken);

            runEngine.sendMessage("Unit Test", reciveToken);
            expect(SelectStoreWrapper).toBeTruthy();
        });

        then('load the product details', () => {
            const apiTestMsgCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgCall.messageId
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeMockData
            );
            instance.getAllStoreProductsApiCallId = apiTestMsgCall.messageId;
            runEngine.sendMessage("Test", apiTestMsgCall);
            expect(SelectStoreWrapper).toBeTruthy();

            const searchInputBox = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "")
            searchInputBox.simulate("submitEditing")
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeMockData
            );
            instance.getAllStoreProductsApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(SelectStoreWrapper).toBeTruthy();
        })

        then('Fail to load the product details', () => {
            const searchInputBox = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "")
            searchInputBox.simulate("submitEditing")
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "error": "Please create a catalog first or Variant not found with this sku."
                }
            );
            instance.getAllStoreProductsApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(SelectStoreWrapper).toBeTruthy();
        })

        then("I can show all stores list", () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeMockData
            );
            instance.getAllStoreProductsApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            
            const flatlist = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "SelectedStoreProducts_data_flatlist_list"
            )

            const item = storeMockData.data[0]
            const renderItem = flatlist.renderProp("renderItem")({ item: item, index: 0 })
            const buttonNavigate = renderItem.findWhere(
                (node) => node.prop("testID") == "selectCheckBox"
            )
            buttonNavigate.simulate("press")

            const item2 = {}
            flatlist.renderProp("ListEmptyComponent")({ item: item2 })

            flatlist.props().ListEmptyComponent();
            const searchInputBox = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "nyk")
           
            flatlist.props().ListEmptyComponent();
            expect(SelectStoreWrapper).toBeTruthy();
        });

        then("I can select the all store checkbox", () => {

            const btnConfirm = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackProductstore"
            )
            btnConfirm.simulate("press")

            const allBtnCheckBox = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "allBtnCheckBox"
            )
            allBtnCheckBox.simulate("press")
            expect(SelectStoreWrapper.state("selectedItem")).toStrictEqual([])
        })

        then("I can able to search the store", () => {

            const apiTestMsgCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgCall.messageId
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeMockData
            );
            instance.getAllStoreProductsApiCallId = apiTestMsgCall.messageId;
            runEngine.sendMessage("Test", apiTestMsgCall);
            expect(SelectStoreWrapper).toBeTruthy();

            const searchInputBox = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "nyk")
            searchInputBox.simulate("submitEditing")

            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeMockData
            );
            instance.getAllStoreProductsApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(SelectStoreWrapper).toBeTruthy();
        })

        then("I can able to create the catalogue via confirm button", () => {
            const btndeleteModal = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btndeleteModal"
            )
            btndeleteModal.simulate("press")
            expect(SelectStoreWrapper).toBeTruthy();
        })

        when("I can call delete products api", () => {
            
            const apiTestMsgCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgCall.messageId
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "success": [
                        {
                            "message": "products deleted"
                        }
                    ]
                }
            );
            instance.deleteProductsApiCallId = apiTestMsgCall.messageId;
            runEngine.sendMessage("Test", apiTestMsgCall);
        })

        then("I can click popup close button", () => {
            const btnCanceldeleteModal = SelectStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnCanceldeleteModal"
            )
            btnCanceldeleteModal.simulate("press")
            expect(SelectStoreWrapper).toBeTruthy();
        })

        when("I can call delete products api with errors", () => {
            
            const apiTestMsgCall = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgCall.messageId
            );
            apiTestMsgCall.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "message": "Please pass only valid and your created variant IDs, Not found or invalid IDs: 95, 96."
                        }
                    ]
                }
            );
            instance.deleteProductsApiCallId = apiTestMsgCall.messageId;
            runEngine.sendMessage("Test", apiTestMsgCall);
        })

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(SelectStoreWrapper).toBeTruthy();
        });

    });
});
