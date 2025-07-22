import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
    getName,
} from "framework/src/Messages/MessageEnum";
import MyClients from "../../src/MyClients";
import { fireEvent } from "@testing-library/react-native";

const mockNavigate = jest.fn();

const screenProps = {
    navigation: {
        navigate: mockNavigate,
        goBack:jest.fn()
    },

    id: "MyClients",
};
const feature = loadFeature("./__tests__/features/MyClient.scenario.feature");

interface InstanceData {
    [getSaveReportApiCallId: string]: string;
};

const mockApiCall = jest.fn().mockImplementation(
    (
        instance: InstanceData,
        getSaveReportApiCallId: string,
        mockData: object = {}
    ) => {
        const messageRestApiCall = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
        messageRestApiCall.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            messageRestApiCall.messageId
        );
        messageRestApiCall.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), mockData);
        instance[getSaveReportApiCallId] = messageRestApiCall.messageId;
        const { receive: mockResponse } = instance as InstanceData as unknown as { receive: Function };
        mockResponse("test", messageRestApiCall);
    }
);

const succeessData ={
    id: "string",
    attributes: "ClientAttributes"
}

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.useFakeTimers();
        jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
    });

    test("User navigates to clients tab", ({ given, when, then }) => {
        let MyClientsWrapper: ShallowWrapper;
        let instance: MyClients;

        given("I am a User loading clients tab", () => {
            MyClientsWrapper = shallow(<MyClients {...screenProps} />);
            instance = MyClientsWrapper.instance() as MyClients
        });


        when("Show over All data list on report screen", () => {
            let flatList = MyClientsWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: { name: 'My Clients', screenName: 'MyClients' },
                index: 0,
            });
            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "btnScreen").first()
            buttonComponent.simulate("press");
        }
        );

        then('Showing over all data list in user', () => {
            let flatList = MyClientsWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            expect(flatList.prop("testID")).toEqual("flatlistTestID")
        });
        then('clicking on the user section', () => {
            const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
            const createwishlistapi= new Message(getName(MessageEnum.RestAPIResponceMessage));
            let instance=  MyClientsWrapper.instance() as MyClients
            instance.createWishlistApiCallId=createwishlistapi.messageId;
            createwishlistapi.initializeFromObject({
                [getName(MessageEnum.RestAPIResponceDataMessage)]: createwishlistapi.messageId,
                [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
                    "data": {
                        "id": "57",
                        "type": "wishlist",
                        "attributes": {
                            "id": 57,
                            "account_id": 1198,
                            "name": "myname",
                            "shareable_id": 1197,
                            "shareable_name": "walson godwin",
                            "wishlist_items": [
                                {
                                    "id": 830,
                                    "created_at": "2024-09-23T03:30:25.176Z",
                                    "updated_at": "2024-09-23T03:30:25.176Z",
                                    "favouriteable_id": 443,
                                    "favouriteable_type": "BxBlockCatalogue::Catalogue",
                                    "user_id": null,
                                    "wishlist_id": 57,
                                    "notes": null
                                },
                               
                            ]
                        }
                    },
                    "meta": {
                        "message": "Wishlist Already present."
                    }
                }
              });
              runEngine.sendMessage("stores message", createwishlistapi);

            let flatList = MyClientsWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            let backbutton = MyClientsWrapper.findWhere(
                (node) => node.prop("testID") === "btnBackClientsAndchat"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: { name: 'My Clients', screenName: 'MyClients' },
                index: 0,
            });
            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "btnScreen")
            console.log(buttonComponent.debug(),"pppp")
            buttonComponent.simulate("press");
            backbutton.simulate("press")
            // instance.navigateTowishlist(1)
          
          instance.createWishlist({id:"1",attributes:{full_name:"gane",service_status:"current"}});
          instance.setState({clientList:[{id:"1",attributes:{full_name:"gane",service_status:"current"}}],first_name:'any name'})

instance.navigateTowishlist(1)
        });

        when("I click on the clientListApiCallID button", () => {
            mockApiCall(instance, "clientListApiCallID", succeessData);
            // let flatList = MyClientsWrapper.findWhere(
            //     (node) => node.prop("testID") === "flatlistTestID"
            // );
            // const render_item = flatList.renderProp("renderItem")({
            //     item: acceptedData,
            //     index: 0,
            // });

            // let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "onMakeCallTestId").first();

            // if (buttonComponent.exists()) {
            //     buttonComponent.simulate("press");
            // }
        });

        then("The client API call ID is displayed", async () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
    });
})