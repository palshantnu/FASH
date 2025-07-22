import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import PairItWith from "../../src/PairItWith";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {

            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "PairItWith",
};





const variantMockData={
    "data": [
        {
            "id": "199",
            "type": "inventory_management",
            "attributes": {
                "id": 199,
                "catalogue_id": 148,
                "product_name": "Brand128b",
                "product_description": "Lorem Ipsum",
                "sku": "ABCD2229v",
                "stock_qty": 20,
                "low_stock_threshold": 0,
                "is_listed": true,
                "price": "1000.0",
                "size": "Small",
                "colour": "Grey",
                "gender": "male",
                "front_image": "",
                "brand_name": "H&M"
            }
        },
        {
            "id": "202",
            "type": "inventory_management",
            "attributes": {
                "id": 202,
                "catalogue_id": 150,
                "product_name": "ipl",
                "product_description": "chhh",
                "sku": "ghjufv",
                "stock_qty": 23,
                "low_stock_threshold": 0,
                "is_listed": true,
                "price": "56.0",
                "size": "Small",
                "colour": "Grey",
                "gender": "male",
                "front_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4f5216897f2124a568b149f55e669c01fdd53fae/profile.jpg",
                "brand_name": "njk"
            }
        },
        {
            "id": "204",
            "type": "inventory_management",
            "attributes": {
                "id": 204,
                "catalogue_id": 152,
                "product_name": "njk",
                "product_description": "hjj",
                "sku": "hhjjj",
                "stock_qty": 12,
                "low_stock_threshold": 0,
                "is_listed": true,
                "price": "66.0",
                "size": "Small",
                "colour": "Grey",
                "gender": "male",
                "front_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0FFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--209679ab124055d223c71728c7e319b3d5d25f02/profile.jpg",
                "brand_name": "hh"
            }
        },]
}

const searchedMockData={
    "data": [
        {
            "id": "199",
            "type": "inventory_management",
            "attributes": {
                "id": 199,
                "catalogue_id": 148,
                "product_name": "Brand128b",
                "product_description": "Lorem Ipsum",
                "sku": "ABCD2229v",
                "stock_qty": 20,
                "low_stock_threshold": 0,
                "is_listed": true,
                "price": "1000.0",
                "size": "Small",
                "colour": "Grey",
                "gender": "male",
                "front_image": "",
                "brand_name": "H&M"
            }
        },
    ]
       
}




const feature = loadFeature(
    "./__tests__/features/pairitwith-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to PairItWith", ({ given, when, then }) => {
        let PairItWithWrapper: ShallowWrapper;
        let instance: PairItWith;

        given("I am a User loading PairItWith", () => {
            PairItWithWrapper = shallow(<PairItWith {...screenProps} />);
        });

        when("I navigate to the PairItWith", () => {
            instance = PairItWithWrapper.instance() as PairItWith;
        });

        then("PairItWith will load with out errors", () => {
            expect(PairItWithWrapper).toBeTruthy();
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
        });

       
        then('load the variant details', () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                variantMockData
            );
            instance.getPairWithListApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(PairItWithWrapper.state("PairItWithList")).toStrictEqual(variantMockData.data)
        })

        then("I can show all variant list", () => {
            const flatlist = PairItWithWrapper.findWhere(
                (node) => node.prop("testID") === "PairItWith_data_flatlist_list"
            )

            const item = variantMockData.data[0]
            const renderItem = flatlist.renderProp("renderItem")({ item: item, index: 0 })
          

            const item2 = {}
            flatlist.renderProp("ListEmptyComponent")({ item: item2 })

            flatlist.props().ListEmptyComponent();
          
           
            

        });

      

        then("I can able to search the variant", () => {
            const searchInputBox = PairItWithWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "Lorem Ipsum")
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
                searchedMockData
            );
            instance.getPairWithListApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(PairItWithWrapper.state("PairItWithList")).toStrictEqual(searchedMockData.data)
        })

        then("I can able to click variant to navigate next screen", () => {
            const flatlist = PairItWithWrapper.findWhere(
                (node) => node.prop("testID") === "PairItWith_data_flatlist_list"
            )

            const item = variantMockData.data[0]
            const renderItem = flatlist.renderProp("renderItem")({ item: item, index: 0 })
            const buttonNavigate = renderItem.findWhere(
                (node) => node.prop("testID") == "varinatItem"
            )
            buttonNavigate.simulate("press")
        })

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(PairItWithWrapper).toBeTruthy();
        });




    });
});
