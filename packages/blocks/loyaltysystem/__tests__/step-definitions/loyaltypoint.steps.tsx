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
import LoyaltyPoint from "../../src/LoyaltyPoint";
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
  id: "LoyaltyPoint",
};

const earningApiObject = {data: [{
  credited_on: '2024-07-18T13:55:56.851Z',
  debited_on: '2024-07-18T13:55:56.851Z',
  id: 23,
  loyalty_point_id: 232,
  message:'',
  order_management_order_id: 3343,
  order_number: '34343434',
  point: 343,
  temp_order_id: '345334',
  transaction_for: 'testing',
  transaction_type: 'credit'
},{
  credited_on: '2024-07-18T13:55:56.851Z',
  debited_on: '2024-07-18T13:55:56.851Z',
  id: 23,
  loyalty_point_id: 232,
  message:'',
  order_management_order_id: 3343,
  order_number: '34343434',
  point: 343,
  temp_order_id: '345334',
  transaction_for: 'testing',
  transaction_type: 'credit'
}]}

const earningApiObjectDebit ={data: [{
  credited_on: '2024-07-18T13:55:56.851Z',
  debited_on: '2024-07-18T13:55:56.851Z',
  id: 23,
  loyalty_point_id: 232,
  message:'',
  order_management_order_id: 3343,
  order_number: '34343434',
  point: 343,
  temp_order_id: '345334',
  transaction_for: 'testing',
  transaction_type: 'debit'
}]}

const feature = loadFeature("./__tests__/features/loyaltypoint-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to LoyaltyPoint", ({ given, when, then }) => {
    let LoyaltyPointWrapper: ShallowWrapper;
    let instance: LoyaltyPoint;

    given("I am a User loading LoyaltyPoint", () => {
      LoyaltyPointWrapper = shallow(<LoyaltyPoint {...screenProps} />);
    });

    when("I navigate to LoyaltyPoint", () => {
      instance = LoyaltyPointWrapper.instance() as LoyaltyPoint;
    });

    then("LoyaltyPoint will load", () => {
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

    then('I can click back buyer loyalty point with out errors',()=>{
      let backButtonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnBackEarningSeller');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all loyaty transaction method api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerLoyaltyPointsCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all loyaty transaction for points method api work with out errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerLoyaltyTransc = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
  })


    then("I can show all buyer loyalty point flatlist by render with out errors", async () => {
        let render_item = LoyaltyPointWrapper.findWhere(
        (node) => node.prop("testID") === "earningSellerFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: earningApiObject,index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then('I can click open filter earning with out errors',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterOpen');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter all btn earning with out errors',()=>{
      let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusAll');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click close filter earning with out errors',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnCancelFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click confirm filter earning with out errors',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnConfirmFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click buyer use loyalty point with out errors',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnUseLoyaltyRedirect');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
      });

  });

  test("User navigates to LoyaltyPoint for credit", ({ given, when, then }) => {
    let LoyaltyPointWrapper: ShallowWrapper;
    let instance: LoyaltyPoint;

    given("I am a User loading LoyaltyPoint for credit", () => {
      LoyaltyPointWrapper = shallow(<LoyaltyPoint {...screenProps} />);
    });

    when("I navigate to LoyaltyPoint for credit", () => {
      instance = LoyaltyPointWrapper.instance() as LoyaltyPoint;
    });

    then("LoyaltyPoint will load for credit", () => {
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

    then('I can click back buyer loyalty point with out errors for credit',()=>{
      let backButtonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnBackEarningSeller');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all loyaty transaction method api work with out errors for credit", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerLoyaltyPointsCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all loyaty transaction for points method api work with out errors for credit", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObjectDebit);

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerLoyaltyTransc = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
  })


    then("I can show all buyer loyalty point flatlist by render with out errors for credit", async () => {
        let render_item = LoyaltyPointWrapper.findWhere(
        (node) => node.prop("testID") === "earningSellerFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: earningApiObjectDebit,index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then('I can click open filter earning with out errors for credit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterOpen');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter sold btn earning with out errors for credit',()=>{
      let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusSold');
      buttonComponent.simulate('press');
      const filteredData = earningApiObjectDebit.data.filter((item: any) => item.transaction_type === 'debit');
       let render_item = LoyaltyPointWrapper.findWhere(
          (node) => node.prop("testID") === "earningSellerFlatlist"
      );
        let render_data = render_item.renderProp("renderItem")({
          item: filteredData[0],
          index: 0,
      });
      render_item.renderProp("ListEmptyComponent")({});
      render_item.renderProp("ItemSeparatorComponent")({});
      render_item.renderProp("keyExtractor")({ id: 0 });
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click close filter earning with out errors for credit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnCancelFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click confirm filter earning with out errors for credit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnConfirmFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can show all buyer loyalty points in FlatList without errors for credit", async () => {
       const filteredData = earningApiObjectDebit.data.filter((item: any) => item.transaction_type === 'credit');
       let render_item = LoyaltyPointWrapper.findWhere(
          (node) => node.prop("testID") === "earningSellerFlatlist"
      );
        let render_data = render_item.renderProp("renderItem")({
          item: filteredData[0],
          index: 0,
      });
      render_item.renderProp("ListEmptyComponent")({});
      render_item.renderProp("ItemSeparatorComponent")({});
      render_item.renderProp("keyExtractor")({ id: 0 });
      expect(render_data).toBeTruthy();
  });
  

    then('I can click buyer use loyalty point with out errors for credit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnUseLoyaltyRedirect');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
      });

  });

  test("User navigates to LoyaltyPoint for debit", ({ given, when, then }) => {
    let LoyaltyPointWrapper: ShallowWrapper;
    let instance: LoyaltyPoint;

    given("I am a User loading LoyaltyPoint for debit", () => {
      LoyaltyPointWrapper = shallow(<LoyaltyPoint {...screenProps} />);
    });

    when("I navigate to LoyaltyPoint for debit", () => {
      instance = LoyaltyPointWrapper.instance() as LoyaltyPoint;
    });

    then("LoyaltyPoint will load for debit", () => {
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

    then('I can click back buyer loyalty point with out errors for debit',()=>{
      let backButtonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnBackEarningSeller');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all loyaty transaction method api work with out errors for debit", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerLoyaltyPointsCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all loyaty transaction for points method api work with out errors for debit", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),earningApiObject);

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerLoyaltyTransc = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
  })


    then("I can show all buyer loyalty point flatlist by render with out errors for debit", async () => {
        let render_item = LoyaltyPointWrapper.findWhere(
        (node) => node.prop("testID") === "earningSellerFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: earningApiObject,index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then('I can click open filter earning with out errors for debit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterOpen');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click filter sold btn earning with out errors for debit',()=>{
      let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnFilterStatusRefunded');
      buttonComponent.simulate('press');
      const filteredData = earningApiObjectDebit.data.filter((item: any) => item.transaction_type === 'debit');
       let render_item = LoyaltyPointWrapper.findWhere(
          (node) => node.prop("testID") === "earningSellerFlatlist"
      );
        let render_data = render_item.renderProp("renderItem")({
          item: filteredData[0],
          index: 0,
      });
      render_item.renderProp("ListEmptyComponent")({});
      render_item.renderProp("ItemSeparatorComponent")({});
      render_item.renderProp("keyExtractor")({ id: 0 });
      expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click close filter earning with out errors for debit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnCancelFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then('I can click confirm filter earning with out errors for debit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnConfirmFilterModal');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can show all buyer loyalty points in FlatList without errors for debit", async () => {
       const filteredData = earningApiObject.data.filter((item: any) => item.transaction_type === 'debit');
       let render_item = LoyaltyPointWrapper.findWhere(
          (node) => node.prop("testID") === "earningSellerFlatlist"
      );
        let render_data = render_item.renderProp("renderItem")({
          item: filteredData[0],
          index: 0,
      });
      render_item.renderProp("ListEmptyComponent")({});
      render_item.renderProp("ItemSeparatorComponent")({});
      render_item.renderProp("keyExtractor")({ id: 0 });
      expect(render_data).toBeTruthy();
  });
  

    then('I can click buyer use loyalty point with out errors for debit',()=>{
        let buttonComponent = LoyaltyPointWrapper.findWhere((node) => node.prop('testID') === 'btnUseLoyaltyRedirect');
        buttonComponent.simulate('press');
        expect(buttonComponent.exists()).toBe(true);
      });

  });

  test("User navigates to LoyaltyPoint to show on screen", ({ given, when, then }) => {
    let LoyaltyPointWrapper: ShallowWrapper;
    let instance: LoyaltyPoint;

    given("I am a User loading LoyaltyPoint to show on screen", () => {
      LoyaltyPointWrapper = shallow(<LoyaltyPoint {...screenProps} />);
    });

    when("I navigate to LoyaltyPoint to show on screen", () => {
      instance = LoyaltyPointWrapper.instance() as LoyaltyPoint;
    });
    
    then('I can click close filter earning with out errors to show on screen',()=>{
         
    });
  });
});