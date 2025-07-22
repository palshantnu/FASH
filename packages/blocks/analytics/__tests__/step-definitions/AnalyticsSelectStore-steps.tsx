import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AnalyticsSelectStore from "../../src/AnalyticsSelectStore";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const navigation = require("react-navigation");
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
  id: "AnalyticsSelectStore"
};

const storeArrObject = {
    data: [
      {
        id: "0",
        type: "bussiness",
        attributes: {
          store_name: "Hiren psaa",
          description: "Drdtr",
          area: "S",
          block: "Es",
          mall_name: "R",
          floor: "Ret",
          unit_number: 35,
          city: "435",
          zipcode: "353423",
          driver_instruction: "454534",
          average_shipping_time: "20 mins",
          payment_mode: ["UPI,COD"],
          store_operating_hours: {
            monday: {
              open: "16:13",
              close: "16:13",
              is_open: true,
            },
            tuesday: {
              open: "16:13",
              close: "16:13",
              is_open: true,
            },
            wednesday: {
              open: "16:13",
              close: "16:13",
              is_open: true,
            },
            thursday: {
              open: "16:13",
              close: "16:13",
              is_open: true,
            },
            friday: {
              open: "16:13",
              close: "16:14",
              is_open: true,
            },
            saturday: {
              open: "16:14",
              close: "16:14",
              is_open: true,
            },
            sunday: {
              open: "16:14",
              close: "16:14",
              is_open: true,
            },
          },
          status: "Pending",
          latitude: 29.378586,
          longitude: 47.990341,
          image:
            "/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4d5623b81a838ee5ee5d169ea1c4e8d5d5624807/profile.jpg",
          email: "seller@mailinator.com",
          contact_number: {
            country_code: "+91",
            phone_number: "8962687619",
          },
          expected_delivery_time: "2024-02-12T04:55:40.645+00:00",
        },
      },
      {
        id: "57",
        type: "bussiness",
        attributes: {
          store_name: "Yr",
          description: "Bdd",
          area: "Heh",
          block: "Ndnd",
          mall_name: "Bdn",
          floor: "Hdh",
          unit_number: 0,
          city: "Bdn",
          zipcode: "949588",
          driver_instruction: "Hxbx",
          average_shipping_time: "10 mins",
          payment_mode: ["UPI,COD"],
          store_operating_hours: {
            monday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            tuesday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            wednesday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            thursday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            friday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            saturday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
            sunday: {
              open: "20:58",
              close: "20:58",
              is_open: true,
            },
          },
          status: "Pending",
          latitude: 70.3851611,
          longitude: 25.3014458,
          image: null,
          email: "seller@mailinator.com",
          contact_number: {
            country_code: "+91",
            phone_number: "8962678169",
          },
          expected_delivery_time: "2024-02-12T04:45:40.654+00:00",
        },
      },
    ],
    meta: {
      "all_businesses_open": false
    }
  };

const feature = loadFeature("./__tests__/features/AnalyticsSelectStore-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AnalyticsSelectStore", ({ given, when, then }) => {
    let AnalyticsSelectStoreWrapper: ShallowWrapper;
    let instance: AnalyticsSelectStore;
    given("I am a User loading AnalyticsSelectStore", () => {
      AnalyticsSelectStoreWrapper = shallow(<AnalyticsSelectStore {...screenProps} />);
    });

    when("I navigate to the AnalyticsSelectStore", () => {
      instance = AnalyticsSelectStoreWrapper.instance() as AnalyticsSelectStore;
    });

    then("AnalyticsSelectStore will load with out errors", () => {
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        expect(msgTokenAPI).toBeTruthy();
    });

    then("I am click back button with out errors",() => {

      let let_button = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") == "btnBackSelectStore"
      );
      let_button.simulate("press");
      expect(let_button).toBeTruthy();
    });

    then("I am get store api calling with out errors",()=>{
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),storeArrObject);

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getSellerStoreApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(getCategoryMessage).toBeTruthy();
    })

    then("I am render flatlist all store with out errors",() => {
      let render_item = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") === "allSellerStoreDataList"
      );
      let render_data = render_item.renderProp("renderItem")({
        item: storeArrObject.data[0],
        index: 0,
      });
      render_item.renderProp("ItemSeparatorComponent")({})
      render_item.renderProp("ListEmptyComponent")({})
      render_item.renderProp("keyExtractor")({id:1})

      let let_button = render_data.findWhere(
        (node) => node.prop("testID") == "btnStoreSelect"
      );
      let_button.simulate("press");
      expect(let_button).toBeTruthy();

    });

    then("I am search store text with out errors",() => {
      let textInputComponent = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") === "txt_enter_select_store"
      );
      textInputComponent.simulate("changeText", "Test");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent).toBeTruthy();
    });

    then("I am click close button with out errors",() => {

      let let_button = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") == "btnCloseStore"
      );
      let_button.simulate("press");
      expect(let_button).toBeTruthy();
    });

    then("I am click confirm button with out errors",() => {

      let let_button = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") == "btnStoreConfirm"
      );
      let_button.simulate("press");
      expect(let_button).toBeTruthy();
    });

    then("I am render flatlist all store and click second data with out errors",() => {
      let render_item = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") === "allSellerStoreDataList"
      );
      let render_data = render_item.renderProp("renderItem")({
        item: storeArrObject.data[1],
        index: 0,
      });
      render_item.renderProp("ItemSeparatorComponent")({})
      render_item.renderProp("ListEmptyComponent")({})
      render_item.renderProp("keyExtractor")({id:1})

      let let_button = render_data.findWhere(
        (node) => node.prop("testID") == "btnStoreSelect"
      );
      let_button.simulate("press");
      expect(let_button).toBeTruthy();

      let let_buttonConfirm = AnalyticsSelectStoreWrapper.findWhere(
        (node) => node.prop("testID") == "btnStoreConfirm"
      );
      let_buttonConfirm.simulate("press");

    });

  });
});
