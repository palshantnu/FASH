import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import PairItWithDescription from "../../src/PairItWithDescription";

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
    id: "PairItWithDescription",
};



const pairItWithMockData={
    "formattedVariantList": [
        {"id": 42, "sku": "hhcrg"},
        {"id": 43, "sku": "ggfg"},
        {"id": 44, "sku": "fgvvh"},
        {"id": 45, "sku": "fdfd"},
        {"id": 49, "sku": "fhfg"}
    ],
    "variant": {
        "attributes": {
            "brand_name": "bhjj",
            "catalogue_id": 43,
            "colour": "Black",
            "front_image": "https://fashionaggregator-326157-ruby.b326157.stage.eastus.az.svc.builder.ai/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBaUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f9e944219ae3b8a362fe04f089d0cc271267d413/profile.jpg",
            "gender": "male",
            "id": 41,
            "is_listed": true,
            "low_stock_threshold": 0,
            "price": "2.0",
            "product_description": "uu",
            "product_name": "hjj",
            "size": "Small",
            "sku": "yhi",
            "stock_qty": 2
        },
        "id": "41",
        "type": "inventory_management"
    }
}


const variantMockData={
    "data": [
        {
            "id": "42",
            "type": "inventory_management",
            "attributes": {
                "id": 42,
                "catalogue_id": 148,
                "product_name": "Brand128b",
                "product_description": "Lorem Ipsum",
                "sku": "hhcrg",
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
            "id": "43",
            "type": "inventory_management",
            "attributes": {
                "id": 43,
                "catalogue_id": 150,
                "product_name": "ipl",
                "product_description": "ggfg",
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
       
        ,]
}

const pairedMockData={
    "data": [
        {
            "id": "42",
            "type": "inventory_management",
            "attributes": {
                "id": 42,
                "catalogue_id": 148,
                "product_name": "Brand128b",
                "product_description": "Lorem Ipsum",
                "sku": "hhcrg",
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
            "id": "43",
            "type": "inventory_management",
            "attributes": {
                "id": 43,
                "catalogue_id": 150,
                "product_name": "ipl",
                "product_description": "ggfg",
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
       
        ,],
    "meta": {
        "message": "Catalogue paired successfully."
    }
}




const feature = loadFeature(
    "./__tests__/features/pairitwithdescription-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.spyOn(runEngine, "sendMessage");
    });

    test("User navigates to PairItWithDescription", ({ given, when, then }) => {
        let PairItWithDescriptionWrapper: ShallowWrapper;
        let instance: PairItWithDescription;

        given("I am a User loading PairItWithDescription", () => {
            PairItWithDescriptionWrapper = shallow(<PairItWithDescription {...screenProps} />);
        });

        when("I navigate to the PairItWithDescription", () => {
            instance = PairItWithDescriptionWrapper.instance() as PairItWithDescription;
        });

        then("PairItWithDescription will load with out errors", () => {
            expect(PairItWithDescriptionWrapper).toBeTruthy();
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
        then("set recived varinat details from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.PairItWithDataPayloadMessage),
                pairItWithMockData
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            expect(PairItWithDescriptionWrapper.state("pairWithDropDownList")).toStrictEqual(pairItWithMockData.formattedVariantList)
            expect(PairItWithDescriptionWrapper.state("selectedVarinatData")).toStrictEqual(pairItWithMockData.variant)
        })
       
        then('load the paired variant details', () => {
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
            instance.getPairedVariantLIstApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(PairItWithDescriptionWrapper.state("pairedVariantList")).toStrictEqual(variantMockData.data)
        })

        then("I can select the sku via drop down", () => {
            jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
            jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
            
            const dropDown = PairItWithDescriptionWrapper.findWhere(
                (node) => node.prop("testID") === "firstSku"
            )
            dropDown.simulate("change", { sku: "hhcrg", id: 42 })
            const secondDropDown = PairItWithDescriptionWrapper.findWhere(
                (node) => node.prop("testID") === "secondSku"
            )
            secondDropDown.simulate("change", { sku: "hhcrg", id: 42 })
            
            secondDropDown.props().renderInputSearch();
            
        });

      

        then("I can able to paired the variants", () => {
            const saveBtn = PairItWithDescriptionWrapper.findWhere(
                (node) => node.prop("testID") === "saveBtn"
            )
            saveBtn.simulate("press")
           

            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                pairItWithMockData
            );
            instance.putPairedVariantApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
           
        })

       

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(PairItWithDescriptionWrapper).toBeTruthy();
        });




    });
});
