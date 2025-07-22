import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { FlatList } from 'react-native';

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import ClientTab from "../../src/ClientsTabScreen";
import i18n from "../../../../components/src/i18n/i18n.config";

const mockNavigate = jest.fn();

const screenProps = {
  navigation: {
    navigation: {
      navigate: mockNavigate,
    },
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },

  id: "ClientTab",
};
const feature = loadFeature("./__tests__/features/ClientTab.scenario.feature");
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
      stylist_name: "string"
    }
  }
}


let data2 = {
  data: [
    {
      id: 1,
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
    },
    {
      id: 2,
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
    },
    {
      id: 3,
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

  ]
}



const stylishBlankData = {
  data: {
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
}


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
  });

  test("User navigates to clients tab", ({ given, when, then }) => {
    let ClientTabWrapper: ShallowWrapper;
    let instance: ClientTab;

    given("I am a User loading clients tab", () => {
      ClientTabWrapper = shallow(<ClientTab {...screenProps} />);
      instance = ClientTabWrapper.instance() as ClientTab
    });

    when("show over All data list on report screen", () => {
      let flatList = ClientTabWrapper.findWhere(
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
      let flatList = ClientTabWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      expect(flatList.prop("testID")).toEqual("flatlistTestID")
    });

    when("I click on stylist request details button", () => {
      mockApiCall(instance, "stylishListApiCallID", stylishDataAccepted);
      let data = {
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
          stylist_name: "string"
        }
      }
      expect(instance.getReqStatus(data.attributes.status)).toBe(i18n.t('accepted'))
      expect(instance.getStatusTextColor(data.attributes.status)).toBe('#BE5B00')
      expect(instance.getStatusBgColor(data.attributes.status)).toBe('#FFE7D0')

    });

    then("I will navigate to request details page", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });

    when("I click on stylist request details button with pending data", () => {
      mockApiCall(instance, "stylishListApiCallID", data2);


      const listArr = data2.data // listArr is an array
      const limitedData = listArr.slice(0, 2); // Use slice to get first 2 items
      expect(instance.state.requestArr).toEqual(limitedData)

      const flatlists = ClientTabWrapper.findWhere(
        (node) => node.prop("testID") === "requestFlatlistTestID"
      )
      const flatList = ClientTabWrapper.find(FlatList);
      expect(flatList.length).toBe(2); // Check FlatList exists
      const renderItem = flatList.at(0).prop('renderItem') as (info: { item: any }) => JSX.Element;

      const renderedItem = renderItem({ item: data2.data[0] });
      expect(instance.getReqStatus(instance.state.requestArr[0].attributes.status)).toBe(i18n.t('requested'))
      expect(instance.getStatusTextColor(instance.state.requestArr[0].attributes.status)).toBe('#059669')
      expect(instance.getStatusBgColor(instance.state.requestArr[0].attributes.status)).toBe('#D1FAE5')
      // Find the button with the testID
      const btnNextMonth2 = ClientTabWrapper.findWhere(
        (node) => node.prop("testID") === "navigationRequestTestID"
      );

      // Check if the button is found
      expect(btnNextMonth2.exists()).toBe(false);

      // Ensure only one button is found
      expect(btnNextMonth2.length).toBe(0);



      expect(renderedItem).toBeTruthy();

    });

    then("I will navigate to request details page with pending data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });


    when("I click on stylist request details button with rejected data", () => {
      mockApiCall(instance, "stylingListApiCallID", data2);
      const listArr = data2.data // listArr is an array
      const limitedData = listArr.slice(0, 2); // Use slice to get first 2 items
      expect(instance.state.requestArr).toEqual(limitedData)

      const flatlists = ClientTabWrapper.findWhere(
        (node) => node.prop("testID") === "requestFlatlistTestID"
      )
      const flatList = ClientTabWrapper.find(FlatList);
      expect(flatList.length).toBe(2); // Check FlatList exists
      const renderItem = flatList.at(1).prop('renderItem') as (info: { item: any }) => JSX.Element;

      const renderedItem = renderItem({ item: data2.data[1] });
      expect(instance.getReqStatus(instance.state.requestArr[1].attributes.status)).toBe(i18n.t('rejected'))
      expect(instance.getStatusTextColor(instance.state.requestArr[1].attributes.status)).toBe('#de1212')
      expect(instance.getStatusBgColor(instance.state.requestArr[1].attributes.status)).toBe('#eb9696')
      const btnNextMonth2 = ClientTabWrapper.findWhere(
        (node) => node.prop("testID") === "navigationRequestTestID"
      );
      // Check if the button is found
      expect(btnNextMonth2.exists()).toBe(false);

      // Ensure only one button is found
      expect(btnNextMonth2.length).toBe(0);



      expect(renderedItem).toBeTruthy();
    });

    then("I will navigate to request details page with rejected data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on stylist request details button with blank data", () => {
      mockApiCall(instance, "stylingListApiCallID", stylishBlankData);
      let data = {
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
      expect(instance.getReqStatus(data.attributes.status)).toBe('')
      expect(instance.getStatusTextColor(data.attributes.status)).toBe('#ffffff')
      expect(instance.getStatusBgColor(data.attributes.status)).toBe('#ffffff')

      //instance.renderRequestListContainer()

    });

    then("I will navigate to request details page with blank data", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    })


  });
})

