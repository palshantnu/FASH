import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import React from "react";
import StylingDetails from "../../src/StlyingRequestDetails";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    state: {
      params: {
        param1: '1',
        type: 'ClientTab',
        callBack: () => { return "test" }
      }
    },
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },
  id: "StylingDetails",
}


const stylishDataPending = {
  data: {
    attributes: {
      stylist_id: "string",
      gender: "string",
      colour: "string",
      detail: "string",
      min_price: 12,
      max_price: 12,
      status: "pending",
      buyer_name: "string",
      buyer_profile: "string",
      stylist_name: "string",
      created_at: "string",
    }
  }
}

const stylishDataAccepted = {
  data: {

    attributes: {
      stylist_id: "string",
      gender: "string",
      colour: "string",
      detail: "string",
      min_price: 12,
      max_price: 12,
      status: "accepted",
      buyer_name: "string",
      buyer_profile: "string",
      stylist_name: "string",
      created_at: "string",
    }
  }
}

const stylishDataRejected = {
  data: {
    attributes: {
      stylist_id: "string",
      gender: "string",
      colour: "string",
      detail: "string",
      min_price: 12,
      max_price: 12,
      status: "rejected",
      buyer_name: "string",
      buyer_profile: "string",
      stylist_name: "string",
      created_at: "string",
    }
  }
}

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
const feature = loadFeature("./__tests__/features/stlyingRequestDetails-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to styling details", ({ given, when, then }) => {
    let StylingDetailsWrapper: ShallowWrapper;
    let instance: StylingDetails;

    given("I am a User loading styling details", () => {
      StylingDetailsWrapper = shallow(<StylingDetails {...screenProps} />);
      instance = StylingDetailsWrapper.instance() as StylingDetails
    });

    when("I click on stylist request details button with pending data", () => {
      mockApiCall(instance, "stylingDetailsApiCallID", stylishDataPending);
      instance.setState({ screenType: 'StylingList' })
      expect(instance.getScreenName()).toBe('StylingRequestList');
    });

    then("I will navigate to request details page with pending data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on accept button", () => {
      StylingDetailsWrapper.findWhere(
        (node) => node.prop("data-test-id") === "goBackBtn"
      ).prop('onLeftPress')();

      let btnSubmitOTP = StylingDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "acceptBtnTestId"
      );
      btnSubmitOTP.simulate("press");
    });

    then("Tab will be change", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });

    when("The status api call", () => {
      mockApiCall(instance, "stylishStatusApiCallID", stylishDataPending);
    });

    then("Data will render on the screen", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on reject button", () => {
      let btnSubmitOTP = StylingDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "isRejectTestID"
      );
      btnSubmitOTP.simulate("press");
    });

    then("Tab will be change", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });

    when("The status api call", () => {
      let data = {
        errors: { message: "something went wrong" }
      }
      mockApiCall(instance, "stylishStatusApiCallID", data);
    });

    then("Data will not render on the screen", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on stylist request details button", () => {
      mockApiCall(instance, "stylingDetailsApiCallID", stylishDataAccepted);
    });

    then("I will navigate to request details page", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
      let btnSubmitOTP = StylingDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "chatBtnTestId"
      );
      btnSubmitOTP.simulate("press");
    });

    when("I click on stylist request details button with rejected data", () => {
      mockApiCall(instance, "stylingDetailsApiCallID", stylishDataRejected);
    });

    then("I will navigate to request details page with rejected data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);

    });
    when("I click on stylist request details button with pending data", () => {
      let data = {
        errors: { message: "something went wrong" }
      }
      mockApiCall(instance, "stylingDetailsApiCallID", data);
    });

    then("I will not navigate to request details page with pending data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
      instance.goBack()
      instance.setState({ screenType: 'Dashboard' })
      expect(instance.getScreenName()).toBe('stylistDashboard');
      instance.goBack()
      instance.setState({ screenType: 'ClientTab' })
      expect(instance.getScreenName()).toBe('ClientsAndChatTab');


    });

  });
})
