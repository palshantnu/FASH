import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AssignStores from "../../src/AssignStores"

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {
            callback()
            }
        }),
        state: {
            params: {
                storeId: 122,
            }
         },
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "AssignStores"
  }


const storeMockData = {
    "data": [
        {
            "id": "100",
            "type": "bussiness",
            "attributes": {
                "store_name": "Nyk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },
        {
            "id": "99",
            "type": "bussiness",
            "attributes": {
                "store_name": "puma",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },
        {
            "id": "87",
            "type": "bussiness",
            "attributes": {
                "store_name": "kk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        }]
}


const storeSearchMockData = {
    "data": [
        {
            "id": "100",
            "type": "bussiness",
            "attributes": {
                "store_name": "Nyk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },]
}



const feature = loadFeature('./__tests__/features/assignstores-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to AssignStores", ({ given, when, then }) => {
        let AssignStoreWrapper: ShallowWrapper;
        let instance: AssignStores;

        given("I am a User loading AssignStores", () => {
            AssignStoreWrapper = shallow(<AssignStores {...screenProps} />);
        });

        when("I navigate to the AssignStores", () => {
            instance = AssignStoreWrapper.instance() as AssignStores;
        });

        then("AssignStores will load with out errors", () => {
            expect(AssignStoreWrapper).toBeTruthy();
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
            expect(AssignStoreWrapper).toBeTruthy();
        });

        then('load the product details', () => {
            const searchInputBox = AssignStoreWrapper.findWhere(
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
            instance.getAllStoreApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(AssignStoreWrapper.state("assignStore")).toStrictEqual(storeMockData.data)
        })

        then("I can show all stores list", () => {
            const flatlist = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "Assignstores_data_flatlist_list"
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
            const searchInputBox = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "nyk")
           
            flatlist.props().ListEmptyComponent();
            expect(AssignStoreWrapper).toBeTruthy();
        });

        then("I can select the all store checkbox", () => {

            const btnConfirm = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackAssignstore"
            )
            btnConfirm.simulate("press")

            const allBtnCheckBox = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "allBtnCheckBox"
            )
            allBtnCheckBox.simulate("press")
            expect(AssignStoreWrapper.state("selectedItem")).toStrictEqual(["100","99","87"])
        })

        then("I can able to search the store", () => {
            const searchInputBox = AssignStoreWrapper.findWhere(
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
                storeSearchMockData
            );
            instance.getAllStoreApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(AssignStoreWrapper.state("assignStore")).toStrictEqual(storeSearchMockData.data)
        })

        then("I can able to create the catalogue via confirm button", () => {
            const btnConfirm = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            )
            btnConfirm.simulate("press")
            

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
                    "data": [],
                    "meta": {
                        "message": "Assigned catalogues to stores"
                    }
                }
            );
            instance.postAssignStoreId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(AssignStoreWrapper).toBeTruthy();
        })

        then("I can able to fail to create the catalogue via confirm button", () => {
            const btnConfirm = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            )
            btnConfirm.simulate("press")
            

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
                    "errors": "Please pass only your created stores"
                }
            );
            instance.postAssignStoreId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(AssignStoreWrapper).toBeTruthy();
        })

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(AssignStoreWrapper).toBeTruthy();
        });

    });
});
