import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import { Message } from "framework/src/Message";

import MessageEnum, {
    getName,
} from "framework/src/Messages/MessageEnum";
import CallRequestList from "../../src/CallRequestList"
const mockNavigate = jest.fn();

const screenProps = {
    navigation: {
        navigate: mockNavigate,
    },

    id: "CallRequestList",
};
const feature = loadFeature("./__tests__/features/CallRequestList.scenario.feature");

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
const callList = {
    data: [
        {
            id: "string",
            type: "string",
            attributes: {
                stylist_id: 123456789,
                reason: "test",
                hour: 6,
                minute: 30,
                status: "pending",
                buyer_name: "Anurag Rai",
                stylist_name: "stylist Rai"
            },
        },
        {
            id: "string",
            type: "string",
            attributes: {
                stylist_id: 1048,
                reason: "Need to Reject it",
                hour: 6,
                minute: 30,
                status: "rejected",
                buyer_name: "Anurag Rai",
                stylist_name: "stylist Rai"
            }
        },
        {
            id: "string",
            type: "string",
            attributes: {
                stylist_id: 987654321,
                reason: "test",
                hour: 6,
                minute: 30,
                status: "completed",
                buyer_name: "Anurag Rai",
                stylist_name: "stylist Rai"
            }
        },
        {
            id: "string",
            type: "string",
            attributes: {
                stylist_id: 1048,
                reason: "Need to Reject it",
                hour: 6,
                minute: 30,
                status: "accepted",
                buyer_name: "Anurag Rai",
                stylist_name: "stylist Rai"
            }
        }

    ]
}
const rejectedData = {
    id: "string",
    type: "string",
    attributes: {
        stylist_id: 1048,
        reason: "Need to Reject it",
        hour: 6,
        minute: 30,
        status: "rejected",
        buyer_name: "Anurag Rai",
        stylist_name: "stylist Rai"
    }
}
const completedData = {
    id: "string",
    type: "string",
    attributes: {
        stylist_id: 1048,
        reason: "Need to Reject it",
        hour: 6,
        minute: 30,
        status: "completed",
        buyer_name: "Anurag Rai",
        stylist_name: "stylist Rai"
    }
}
const acceptedData = {
    id: "string",
    type: "string",
    attributes: {
        stylist_id: 1048,
        reason: "Need to Reject it",
        hour: 6,
        minute: 30,
        status: "accepted",
        buyer_name: "Anurag Rai",
        stylist_name: "stylist Rai"
    }
}
const pendingData = {
    id: "string",
    type: "string",
    attributes: {
        stylist_id: 987654321,
        reason: "test",
        hour: 6,
        minute: 30,
        status: "pending",
        buyer_name: "Anurag Rai",
        stylist_name: "stylist Rai"
    }
}
defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.useFakeTimers();
        jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
    });

    test("User navigates to CallRequestList screen", ({ given, when, then }) => {

        let CallRequestListWrapper: ShallowWrapper;
        let instance: CallRequestList;

        given("I am a User loading CallRequestList screen", () => {
            CallRequestListWrapper = shallow(<CallRequestList {...screenProps} />);
            instance = CallRequestListWrapper.instance() as CallRequestList
        });
        when("I click on back button", () => {
            let btnSubmitOTP = CallRequestListWrapper.findWhere(
              (node) => node.prop("testID") === "btnBackClientsAndchat"
            );
            btnSubmitOTP.simulate("press");
          });
      
          then("I will navigate to landing page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
          });
        when("I click on the onMakeCall button", () => {
            mockApiCall(instance, "callBackListApiCallId", callList);
            let flatList = CallRequestListWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: acceptedData,
                index: 0,
            });

            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "onMakeCallTestId").first();

            if (buttonComponent.exists()) {
                buttonComponent.simulate("press");
            }
        });

        then("The API call request will be made", async () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });

        when("I click on the updateCallStatus button", () => {
            mockApiCall(instance, "callBackStatusApiCallId", pendingData);
            let flatList = CallRequestListWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: pendingData,
                index: 0,
            });

            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "updateCallStatusTestID").first();

            if (buttonComponent.exists()) {
                buttonComponent.simulate("press");
            }
        });

        then("The API call request will be made", async () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
        when("I click on the reject button", () => {
            mockApiCall(instance, "callBackStatusApiCallId", rejectedData);
            let flatList = CallRequestListWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: rejectedData,
                index: 0,
            });

            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "rejectedID").first();

            if (buttonComponent.exists()) {
                buttonComponent.simulate("press");
            }
        });

        then("The API call request will be made", async () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
        when("I click on the complete button", () => {
            mockApiCall(instance, "callBackStatusApiCallId", completedData);
            let flatList = CallRequestListWrapper.findWhere(
                (node) => node.prop("testID") === "flatlistTestID"
            );
            const render_item = flatList.renderProp("renderItem")({
                item: completedData,
                index: 0,
            });

            let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "completedId").first();

            if (buttonComponent.exists()) {
                buttonComponent.simulate("press");
            }
        });

        then("The API call request will be made", async () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
    });
})