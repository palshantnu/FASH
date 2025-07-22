import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import React from "react";
import StylingRequestsList from "../../src/StylingRequestsList";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },
  id: "stylingRequestList",
};

const feature = loadFeature("./__tests__/features/stylingRequestList-scenario.feature");

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

let data2 ={data:[
  {
      id:1,
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
    }},
  { id:2,
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
    }},
    { id:3,
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
    }},
    { id:'4',
      attributes: {
        stylist_id: "string",
        gender: "string",
        colour: "string",
        detail: "string",
        min_price: 12,
        max_price: 12,
        status: "",
        buyer_name: "string",
        buyer_profile: "string",
        stylist_name: "string",
        created_at: "string",
      }
    }
    

]}




defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to styling request list", ({ given, when, then }) => {
    let StylingListWrapper: ShallowWrapper;
    let instance: StylingRequestsList;

    given("I am a User loading styling request list", () => {
      StylingListWrapper = shallow(<StylingRequestsList {...screenProps} />);
      instance = StylingListWrapper.instance() as StylingRequestsList
    });

  
    when("I click on back button", () => {
      let btnSubmitOTP = StylingListWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackStyling"
      );
      btnSubmitOTP.simulate("press");
    });

    then("I will navigate to landing page", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });

    when("I click on stylist request details button", () => {
      mockApiCall(instance, "stylingListApiCallID", data2);

      let flatList = StylingListWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: data2.data[0],
        index: 0,
      });
      let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "navigationHandlerTestId").first()
      buttonComponent.simulate("press");
    });

    then("I will navigate to request details page", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });

    when("I click on stylist request details button with pending data", () => {
      mockApiCall(instance, "stylingListApiCallID", data2);

      let flatList = StylingListWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: data2.data[1],
        index: 0,
      });
      let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "navigationHandlerTestId").first()
      buttonComponent.simulate("press");
    });

    then("I will navigate to request details page with pending data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });


    when("I click on stylist request details button with rejected data", () => {
      mockApiCall(instance, "stylingListApiCallID", data2);

      let flatList = StylingListWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: data2.data[2],
        index: 0,
      });
      let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "navigationHandlerTestId").first()
      buttonComponent.simulate("press");
    });

    then("I will navigate to request details page with rejected data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on stylist request details button with blank data", () => {
      mockApiCall(instance, "stylingListApiCallID", data2);

      let flatList = StylingListWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: data2.data[3],
        index: 0,
      });
      let buttonComponent = render_item.findWhere((node) => node.prop("testID") === "navigationHandlerTestId").first()
      buttonComponent.simulate("press");
    });

    then("I will navigate to request details page with blank data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
  });
})
