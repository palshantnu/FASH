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
import LoyaltyRedeem from "../../src/LoyaltyRedeem";
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
  id: "LoyaltyRedeem",
};

const earningApiObject = {
    "data": [
      {
        "id": "1",
        "type": "loyalty_point_perk",
        "attributes": {
            "id": 1,
            "perk_code": "Test123",
            "points_needed": 10,
            "description": "get 10 % of discount",
            "perk_type": "discount",
            "discount_percentage": 10.0,
            "created_at": "2025-03-03T11:32:06.348Z",
            "updated_at": "2025-03-03T11:32:06.348Z",
            "is_redem": false
        }
    }
    ]
}

const feature = loadFeature("./__tests__/features/loyaltyredeem-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to LoyaltyRedeem", ({ given, when, then }) => {
    let LoyaltyRedeemWrapper: ShallowWrapper;
    let instance: LoyaltyRedeem;

    given("I am a User loading LoyaltyRedeem", () => {
      LoyaltyRedeemWrapper = shallow(<LoyaltyRedeem {...screenProps} />);
    });

    when("I navigate to LoyaltyRedeem", () => {
      instance = LoyaltyRedeemWrapper.instance() as LoyaltyRedeem;
    });

    then("LoyaltyRedeem will load", () => {
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );

        const msgTokenAPI1 = new Message(
          getName(MessageEnum.NavigationPayLoadMessage)
        );
        msgTokenAPI1.addData(
          getName(MessageEnum.LoginOptionsNavigationDataMessage),
          "User-Token"
        );
        runEngine.sendMessage("Unit Test", msgTokenAPI1);
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationPayLoadMessage" }),
          ])
        );
    });

    then('I can click back loyalty redeem with out errors',()=>{
      let backButtonComponent = LoyaltyRedeemWrapper.findWhere((node) => node.prop('testID') === 'btnBackLoyaltyRedeem');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all loyaty points method api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerLoyaltyPointsPromoCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);

        let msgValidationAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgValidationAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgValidationAPI.messageId
        );
        msgValidationAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {error : "error"}
        );
        instance.redeemLoyaltyPointCallApiId = msgValidationAPI.messageId;
        const { receive: mockReceive1 } = instance;

        mockReceive1("unit test", msgValidationAPI)

        msgValidationAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {data : {}}
        );
        instance.redeemLoyaltyPointCallApiId = msgValidationAPI.messageId;
        const { receive: mockReceive } = instance;

        mockReceive("unit test", msgValidationAPI)

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })


    then("I can show all loyalty point redeem flatlist by render with out errors", async () => {
        let render_item = LoyaltyRedeemWrapper.findWhere(
        (node) => node.prop("testID") === "loyatyRedeemFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: earningApiObject.data[0],index: 0,});
        let buttonComponent = render_data.findWhere((node) => node.prop('testID') === 'btnRedeemModal');
        buttonComponent.simulate('press');
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then('I can click on confirm redeem with out errors',()=>{
      let buttonComponent = LoyaltyRedeemWrapper.findWhere((node) => node.prop('testID') === 'btnRedeemConfirm');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click close redeem with out errors',()=>{
        let buttonComponent = LoyaltyRedeemWrapper.findWhere((node) => node.prop('testID') === 'btnCancelRedeemModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });
    

  });

  test("User navigates to LoyaltyRedeem to show loyalty points", ({ given, when, then }) => {
    let LoyaltyRedeemWrapper: ShallowWrapper;
    let instance: LoyaltyRedeem;

    given("I am a User loading LoyaltyRedeem to show loyalty points", () => {
      LoyaltyRedeemWrapper = shallow(<LoyaltyRedeem {...screenProps} />);
    });

    when("I navigate to LoyaltyRedeem to show loyalty points", () => {
      instance = LoyaltyRedeemWrapper.instance() as LoyaltyRedeem;
    });

    then('I can click close redeem with out errors to show loyalty points',()=>{
        let buttonComponent = LoyaltyRedeemWrapper.findWhere((node) => node.prop('testID') === 'btnCancelRedeemModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });
    

  });
});