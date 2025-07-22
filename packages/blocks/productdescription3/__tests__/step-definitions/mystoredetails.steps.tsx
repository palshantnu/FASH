import React from "react";
import { jest, describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { shallow, ShallowWrapper } from 'enzyme'
import MyStoreDetailsScreen from "../../src/MyStoreDetailsScreen";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
jest.useFakeTimers()
const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn(),
};

const screenProps = {
  navigation,
  id: "MyStoreDetails",
};

const dummyStoreInfo = {
  data: {
    id: "84",
    type: "bussiness",
    attributes: {
      store_name: "Marvel",
      description: "Get Marvel Merchandised products",
      area: "5640 - Saar 13057",
      block: "Kuwait City",
      mall_name: "Marvel Mall",
      floor: "",
      unit_number: null,
      city: "Kuwait City",
      zipcode: "242217",
      driver_instruction: "N/A",
      average_shipping_time: "20 mins",
      payment_mode: ["CREDIT CARD,DEBIT CARD,COD"],
      store_operating_hours: {
        monday: {
          open: "10:00",
          close: "21:30",
          is_open: true,
        },
        tuesday: {
          open: "10:00",
          close: "21:30",
          is_open: true,
        },
        wednesday: {
          open: "10:00",
          close: "21:30",
          is_open: true,
        },
        thursday: {
          open: "10:00",
          close: "21:30",
          is_open: true,
        },
        friday: {
          open: "10:00",
          close: "21:30",
          is_open: true,
        },
        saturday: {
          open: "10:00",
          close: "17:30",
          is_open: true,
        },
        sunday: {
          open: "08:00",
          close: "22:00",
          is_open: true,
        },
      },
      status: "Pending",
      latitude: 29.378586,
      longitude: 47.990341,
      is_open: false,
      available_variants: [],
      image:
        "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdndEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3a986420b3b3d8dee17633f137893a0668b99b38/profile.jpg",
      email: "lee.stan.seller@yopmail.com",
      contact_number: {
        country_code: "+965",
        phone_number: "25533011",
      },
      expected_delivery_time: "2024-03-04T06:54:15.130+00:00",
    },
  },
};

describe("Seller can load MyStoreDetails Screen", () => {

  let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<MyStoreDetailsScreen {...screenProps}/>)
    let detailInstance:MyStoreDetailsScreen; 

    detailInstance = splashWrapper.instance() as MyStoreDetailsScreen

  test("Initially seller sees loading screen", () => {
    const { getByTestId, container } = render(
      <MyStoreDetailsScreen {...screenProps} />
    );

    expect(getByTestId("loaderUi")).toBeDefined();
  });

  test("Then seller stores gets listed", () => {
    const { getByTestId, container } = render(
      <MyStoreDetailsScreen {...screenProps} />
    );

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.initializeFromObject({
      [getName(MessageEnum.SessionResponseToken)]: "TOKEN",
    });
    runEngine.sendMessage("TokenMsg", tokenMsg);

    const navPayLoadMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    navPayLoadMessage.addData(
      getName(MessageEnum.NavigationPayloadMyStoreIdMessage),
      "84"
    );
    runEngine.sendMessage("navigationPayload", navPayLoadMessage);

    const storeDetailsMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    container.instance.getStoreInfoApiId = storeDetailsMsg.messageId;
    storeDetailsMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        storeDetailsMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoreInfo,
    });
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsg);

    // render uncovered conditions
    storeDetailsMsg.addData(
      [getName(MessageEnum.RestAPIResponceSuccessMessage)],
      {
        data: {
          ...dummyStoreInfo.data,
          attributes: {
            ...dummyStoreInfo.data.attributes,
            image: null,
            is_open: true,
            description: null
          },
        },
      } // satisfies typeof dummyStoreInfo
    );
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsg);

    const storeDetailsMsgAll = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    container.instance.getStoreInfoAllApiId = storeDetailsMsgAll.messageId;
    storeDetailsMsgAll.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        storeDetailsMsgAll.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoreInfo,
    });
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsgAll);

    // render uncovered conditions
    storeDetailsMsgAll.addData(
      [getName(MessageEnum.RestAPIResponceSuccessMessage)],
      {
        data: {
          ...dummyStoreInfo.data,
          attributes: {
            ...dummyStoreInfo.data.attributes,
            image: null,
            is_open: true,
            description: null
          },
        },
      } // satisfies typeof dummyStoreInfo
    );
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsgAll);

    expect(getByTestId("storeDetails")).toBeDefined();
  });

  test("Seller can toggle store open status", () => {
    const { getByTestId, container } = render(
      <MyStoreDetailsScreen {...screenProps} />
    );

    const navPayLoadMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    navPayLoadMessage.addData(
      getName(MessageEnum.NavigationPayloadMyStoreIdMessage),
      "84"
    );
    runEngine.sendMessage("navigationPayload", navPayLoadMessage);

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.initializeFromObject({
      [getName(MessageEnum.SessionResponseToken)]: "TOKEN",
    });
    runEngine.sendMessage("TokenMsg", tokenMsg);

    const storeDetailsMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    container.instance.getStoreInfoApiId = storeDetailsMsg.messageId;
    storeDetailsMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        storeDetailsMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoreInfo,
    });
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsg);

    const toggleBtn = getByTestId("toggleOpenStatus");
    fireEvent.press(toggleBtn);

    // Handle Success
    const storeStatusUpdateMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    container.instance.updateStoreStatusApiCallId =
      storeStatusUpdateMsg.messageId;
    storeStatusUpdateMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        storeStatusUpdateMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: {} },
    });
    runEngine.sendMessage("StoreDetailsResponse", storeStatusUpdateMsg);

    // Handle Error
    storeStatusUpdateMsg.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      { error: "Store must be approved." }
    );
    runEngine.sendMessage("StoreDetailsResponse", storeStatusUpdateMsg);
  });

  test("Seller can navigate to other screens", () => {
    const { getByTestId, container } = render(
      <MyStoreDetailsScreen {...screenProps} />
    );

    const navPayLoadMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    navPayLoadMessage.addData(
      getName(MessageEnum.NavigationPayloadMyStoreIdMessage),
      "84"
    );
    runEngine.sendMessage("navigationPayload", navPayLoadMessage);

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.initializeFromObject({
      [getName(MessageEnum.SessionResponseToken)]: "TOKEN",
    });
    runEngine.sendMessage("TokenMsg", tokenMsg);

    const storeDetailsMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    container.instance.getStoreInfoApiId = storeDetailsMsg.messageId;
    storeDetailsMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        storeDetailsMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyStoreInfo,
    });
    runEngine.sendMessage("StoreDetailsResponse", storeDetailsMsg);
    
    fireEvent.press(getByTestId("pencilEdit"));
    fireEvent.press(getByTestId("viewCatalogueAsBuyer"));
    fireEvent.press(getByTestId("analyticsAndInsights"));
    fireEvent.press(getByTestId("revenue"));
    fireEvent.press(getByTestId("inventoryManagement"));
    fireEvent.press(getByTestId("offersAndDiscounts"));
    fireEvent.press(getByTestId("manageTiming"));
    fireEvent.press(getByTestId("editDetails"));
    expect(detailInstance.refreshData()).toBe(undefined)
    detailInstance.setState({languageUpdate:'en'})
    detailInstance.getStoreInfo(1,'343434bfdvdf')
    jest.runAllTimers()
  });
});
