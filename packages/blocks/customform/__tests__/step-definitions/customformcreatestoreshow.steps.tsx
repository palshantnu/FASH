import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import * as utilies from "../../../../framework/src/Utilities";

import React from "react";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import CustomformStoreShow from "../../src/CustomformStoreShow";
import { jest, expect, beforeEach } from "@jest/globals";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any, topic_id: any) => {},
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  id: "CustomformStoreShow",
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
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHdEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4d5623b81a838ee5ee5d169ea1c4e8d5d5624807/profile.jpg",
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
};

let CustomformStoreShowData = <CustomformStoreShow {...screenProps} />;
const feature = loadFeature(
  "./__tests__/features/customformcreatestoreshow-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformstoreshhow", ({ given, when, then }) => {
    let CustomformStoreShowBlock: ShallowWrapper;
    let instance: CustomformStoreShow;

    given("I am a User loading customformstoreshhow", () => {
      CustomformStoreShowBlock = shallow(
        <CustomformStoreShow {...screenProps} />
      );
    });

    when("I navigate to the customformstoreshhow", () => {
      instance = CustomformStoreShowBlock.instance() as CustomformStoreShow;
    });

    then("customformstoreshhow will load with out errors", () => {
      expect(CustomformStoreShowBlock).toBeTruthy();
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
    });

    then("I can click on back button store with out errors", () => {
      let buttonComponent = CustomformStoreShowBlock.findWhere(
        (node) => node.prop("testID") === "btnBackMyStore"
      );
      buttonComponent.simulate("press");
    });

    then("I should render show store api with out errors", () => {
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        storeArrObject
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      instance.getStoreApiCallId = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
    });

    then(
      "I should render store data in flatlist zero index with out errors",
      () => {
        let render_item = CustomformStoreShowBlock.findWhere(
          (node) => node.prop("testID") === "store_show_flatlist_list"
        );
        let render_data = render_item.renderProp("renderItem")({
          item: storeArrObject.data[0],
          index: 0,
        });
        expect(render_data).toBeTruthy();

        let let_button = render_data.findWhere(
          (node) => node.prop("testID") == "btnNewStoreRedirection"
        );
        expect(let_button).toBeTruthy();
        let_button.simulate("press");
      }
    );

    then(
      "I should render store data in flatlist first index pending status with out errors",
      () => {
        let render_item = CustomformStoreShowBlock.findWhere(
          (node) => node.prop("testID") === "store_show_flatlist_list"
        );
        let render_data = render_item.renderProp("renderItem")({
          item: storeArrObject.data[1],
          index: 0,
        });
        expect(render_data).toBeTruthy();
      }
    );

    then(
      "I should render store data in flatlist first index approved status with out errors",
      () => {
        let render_item = CustomformStoreShowBlock.findWhere(
          (node) => node.prop("testID") === "store_show_flatlist_list"
        );
        let dataSet = storeArrObject.data[1];
        dataSet.attributes.status = "Approved";
        let render_data = render_item.renderProp("renderItem")({
          item: dataSet,
          index: 0,
        });
        expect(render_data).toBeTruthy();
        render_item.renderProp("ListEmptyComponent")({});
      }
    );

    then("I can enter a store search with out errors", () => {
      let textInputComponent = CustomformStoreShowBlock.findWhere(
        (node) => node.prop("testID") === "txt_enter_store"
      );
      textInputComponent.simulate("changeText", "ABC");
      textInputComponent.simulate("submitEditing");
      expect(instance.state.storeSearchTxt).toBe("ABC");
    });

    then("I can click on continue button with out errors", () => {
      let buttonComponent = CustomformStoreShowBlock.findWhere(
        (node) => node.prop("testID") === "btnStoreContinue"
      );

      jest
        .spyOn(utilies, "getStorageData")
        .mockImplementation(async () => "Store_created");
      buttonComponent.simulate("press");

      jest
        .spyOn(utilies, "getStorageData")
        .mockImplementation(async () => "Document_uploaded");
      buttonComponent.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(CustomformStoreShowBlock).toBeTruthy();
    });
  });
});
