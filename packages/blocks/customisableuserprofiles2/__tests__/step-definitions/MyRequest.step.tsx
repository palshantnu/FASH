import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
    getName,
} from "framework/src/Messages/MessageEnum";
import MyRequests from "../../src/MyRequests";

const mockNavigate = jest.fn();

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
    id: "MyRequests",
};
const feature = loadFeature("./__tests__/features/MyRequests.feature");

const requestListData = [
    {
        id: 11,
        attributes: {
            stylist_id: 11,
            gender: "male",
            colour: "black",
            min_price: 100,
            max_price: 200,
            status: "pending",
            buyer_name: "John Doe",
            buyer_profile: "https://profilepic.url",
            stylist_name: "Jane Smith",
            stylist_profile: "https://stylistpic.url",
            chat_id:'299'
        }
    },
    {
        id: 12,
        attributes: {
            stylist_id: 12,
            gender: "female",
            colour: "red",
            min_price: 200,
            max_price: 300,
            status: "approved",
            buyer_name: "Alice Cooper",
            buyer_profile: "https://profilepic.url",
            stylist_name: "Olivia Brown",
            stylist_profile: "https://stylistpic.url",
            chat_id:'298'
        }
    }
];

const requestListDataApi = 
    {
        data:[
            {
                id: 11,
                attributes: {
                    stylist_id: 11,
                    gender: "male",
                    colour: "black",
                    min_price: 100,
                    max_price: 200,
                    status: "accepted",
                    buyer_name: "John Doe",
                    buyer_profile: "https://profilepic.url",
                    stylist_name: "Jane Smith",
                    stylist_profile: "https://stylistpic.url",
                    chat_id:'299'
                }
            },
            {
                id: 12,
                attributes: {
                    stylist_id: 12,
                    gender: "female",
                    colour: "red",
                    min_price: 200,
                    max_price: 300,
                    status: "approved",
                    buyer_name: "Alice Cooper",
                    buyer_profile: "https://profilepic.url",
                    stylist_name: "Olivia Brown",
                    stylist_profile: "https://stylistpic.url",
                    chat_id:'298'
                }
            }
        ]
    }

interface InstanceData {
    [getSaveReportApiCallId: string]: string;
};
const custoFormSuccessData = {

    message: { object: "string" },
    data: { object: "string" },
    stylist: { object: "string" }
}

const mockApiCall = jest
    .fn()
    .mockImplementation(
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

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.useFakeTimers();
        jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
    });

    test("User navigates to MyRequests", ({ given, when, then }) => {
        let MyRequestsWrapper: ShallowWrapper;
        let instance: MyRequests;


        given("I am a User loading MyRequests", () => {
            MyRequestsWrapper = shallow(<MyRequests {...screenProps} />);
           const mockState = {
             requestListArr : requestListData,
             isLoading:false
            }

            MyRequestsWrapper.setState(mockState)
        });

        when("I click on request page", () => {
            instance = MyRequestsWrapper.instance() as MyRequests
            let btnSubmitOTP = MyRequestsWrapper.findWhere(
                (node) => node.prop("testID") === "navigateToStylishProfileTxtId"
            );
            btnSubmitOTP.simulate("press");
        });

        then("I will navigate to request page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });


        when("I click on reqirment page", () => {

            const getCategoryMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getCategoryMessage
            );
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            
            requestListDataApi

            );
    
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getCategoryMessage.messageId
            );
            instance.myRequestListApiCallId = getCategoryMessage.messageId;
            runEngine.sendMessage("Unit Test", getCategoryMessage);

            let flatList = MyRequestsWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            flatList.renderProp("renderItem")({item: requestListData[0],index: 0,});
            flatList.renderProp("keyExtractor")({id:0})
    
        });

        then("I will navigate to reqirment page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });

        when("I click on delete button", () => {
            mockApiCall(instance, "deleteApiCallId", requestListData);
            let flatList = MyRequestsWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: requestListData[0],
                index: 0,
            });
            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "deleteBtnTextId")
            buttonComponent.simulate("press");

            let buttonComponentEdit = render_item.findWhere((node) => node.prop("testID") === "onNavigateRequirementTextId")
            buttonComponentEdit.simulate("press");

            let buttonComponetChat = render_item.findWhere((node) => node.prop("testID") === "navigateToChat")
            buttonComponetChat.simulate("press");
            instance.navigateFromHiredStylish('299')
        });

        then("Data will be delete", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });

        then("Call api with empty data with out errors", () => {

            const getCategoryMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getCategoryMessage
            );
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),[]);
    
            getCategoryMessage.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            getCategoryMessage.messageId
            );
            instance.myRequestListApiCallId = getCategoryMessage.messageId;
            runEngine.sendMessage("Unit Test", getCategoryMessage);
    
        });
    });
})