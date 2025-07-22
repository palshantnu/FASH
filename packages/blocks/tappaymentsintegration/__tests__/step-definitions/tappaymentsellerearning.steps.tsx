import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TappaymentSellerEarning from "../../src/TappaymentSellerEarning";
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
  id: "TappaymentSellerEarning",
};

const earningApiObject = {
  "earning_details": [
    {
        "transaction": {
            "id": 418,
            "account_id": 1051,
            "amount": "500.0",
            "driver_order_id": null,
            "status": "refunded",
            "created_at": "2024-07-18T13:55:56.851Z",
            "updated_at": "2024-07-18T13:55:56.851Z",
            "seller_order_id": 749,
            "order_number": "OD00000198"
        },
        "order_items": [
            {
                "catalogue": {
                    "id": 314,
                    "category_id": 65,
                    "sub_category_id": 435,
                    "brand_id": null,
                    "name": "Br12211234431",
                    "sku": null,
                    "description": "Lorem Ipsum",
                    "manufacture_date": null,
                    "length": null,
                    "breadth": null,
                    "height": null,
                    "availability": null,
                    "stock_qty": null,
                    "weight": null,
                    "price": null,
                    "recommended": null,
                    "on_sale": null,
                    "sale_price": null,
                    "discount": null,
                    "created_at": "2024-07-18T11:38:44.560Z",
                    "updated_at": "2024-07-18T11:38:44.560Z",
                    "block_qty": null,
                    "account_id": 1051,
                    "product_number": null,
                    "service_information_id": null,
                    "sub_sub_category_id": 1,
                    "share_token": null,
                    "gender": "male",
                    "brand_name": "jara",
                    "material": "Cotton",
                    "fit": "Slim Fit",
                    "prodcut_care": "Machine Wash",
                    "list_the_product": "listed",
                    "fit_discription": "Lorem Ipsum",
                    "appeared_in_search": 0,
                    "filter_range": "this week",
                    "is_published": false
                }
            }
        ]
    },
    {
        "transaction": {
            "id": 415,
            "account_id": 1051,
            "amount": "500.0",
            "driver_order_id": null,
            "status": "credit",
            "created_at": "2024-07-18T12:17:27.293Z",
            "updated_at": "2024-07-18T12:17:27.293Z",
            "seller_order_id": 747,
            "order_number": "OD00000198"
        },
        "order_items": []
    }
]
}

const feature = loadFeature("./__tests__/features/tappaymentsellerearning-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentsellerearning", ({ given, when, then }) => {
    let tappaymentsellerearningWrapper: ShallowWrapper;
    let instance: TappaymentSellerEarning;

    given("I am a User loading tappaymentsellerearning", () => {
      tappaymentsellerearningWrapper = shallow(<TappaymentSellerEarning {...screenProps} />);
    });

    when("I navigate to tappaymentsellerearning", () => {
      instance = tappaymentsellerearningWrapper.instance() as TappaymentSellerEarning;
    });

    then("tappaymentsellerearning will load", () => {
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
    });

    then('I can click back seller earning with out errors',()=>{
      let backButtonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnBackEarningSeller');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all earning method api work with out errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getSellerEarningCallApiId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    })


    then("I can show all seller earning flatlist by render with out errors", async () => {
        let render_item = tappaymentsellerearningWrapper.findWhere(
        (node) => node.prop("testID") === "earningSellerFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: earningApiObject.earning_details[0],index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then('I can click open filter earning with out errors',()=>{
        let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnFilterOpen');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter all btn earning with out errors',()=>{
      let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusAll');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter sold btn earning with out errors',()=>{
      let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusSold');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter returned btn earning with out errors',()=>{
      let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusRefunded');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click close filter earning with out errors',()=>{
        let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnCancelFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click confirm filter earning with out errors',()=>{
        let buttonComponent = tappaymentsellerearningWrapper.findWhere((node) => node.prop('testID') === 'btnConfirmFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can show all earning method api work with errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
        error:{
          'message':'Invalid Token'
        }
      });

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getSellerEarningCallApiId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    })

  });
});