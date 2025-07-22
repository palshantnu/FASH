import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { jest,beforeEach, expect } from '@jest/globals';
import OrderManagementBuyerOrderStatus from "../../src/OrderManagementBuyerOrderStatus";
import * as utils from "../../../../framework/src/Utilities";
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
  id: "OrderManagementBuyerOrderStatus",
};



const feature = loadFeature("./__tests__/features/ordermanagementbuyerorderstatus-scenario.feature");
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to ordermanagementbuyerorderstatus", ({ given, when, then }) => {
    let ordermanagementbuyerorderstatusBlock: ShallowWrapper;
    let instance: OrderManagementBuyerOrderStatus;

    given("I am a User loading ordermanagementbuyerorderstatus", () => {
      ordermanagementbuyerorderstatusBlock = shallow(<OrderManagementBuyerOrderStatus {...screenProps} />);
    });

    when("I navigate to the ordermanagementbuyerorderstatus", () => {
      instance = ordermanagementbuyerorderstatusBlock.instance() as OrderManagementBuyerOrderStatus;
    });

    then("ordermanagementbuyerorderstatus will load with out errors", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          "data":{
            "id":"1112","type":"order_seller","attributes":
            {"order_items":[
              {"id":"1480","type":"order_item_seller","attributes":
                {
                  "status":"delivered",
                  "placed_at":"2024-07-22T10:03:35.143Z"
                  ,"confirmed_at":"2024-07-22T10:04:14.402Z",
                  "in_transit_at":"2024-07-22T10:05:27.786Z",
                  "delivered_at":"2024-07-22T10:05:58.855Z",
                  "cancelled_at":null,
                  "rejected_at":null,
                  "process_at":"2024-07-22T10:04:28.924Z",
                  "shipped_at":"2024-07-22T10:05:21.439Z"
        }}]}}});

        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
        instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
        runEngine.sendMessage("Unit Test", getApiResponce);
        let btnTrackOrder = ordermanagementbuyerorderstatusBlock.findWhere(
          (node) => node.prop("testID") === "btnTrackOrder"
        );
        btnTrackOrder.simulate("press");
        let btnBackOrderStatus = ordermanagementbuyerorderstatusBlock.findWhere(
          (node) => node.prop("testID") === "btnBackOrderStatus"
        );
        btnBackOrderStatus.simulate("press");
        expect(getApiResponce).toBeTruthy()
    });
    when("I can set order status cancelelled", async() => {
     await instance.componentDidMount()
      jest.spyOn(utils, "getStorageData").mockImplementation((key):any => {
       
        if (key === "orderStatus") {
         
          return "return_confirmed";
        }
        if (key === "orderId") {
          return "1480";
        }
    })
    
     
    })
    then("I can check order status cancel with out errors", async() => {
      
     
      const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
      "data":{
        "id":"1112","type":"order_seller","attributes":
        {"order_items":[
          {"id":"1480","type":"order_item_seller","attributes":
            {
              "status":"delivered",
              "placed_at":"2024-07-22T10:03:35.143Z"
              ,"confirmed_at":"2024-07-22T10:04:14.402Z",
              "in_transit_at":"2024-07-22T10:05:27.786Z",
              "delivered_at":"2024-07-22T10:05:58.855Z",
              "cancelled_at":null,
              "rejected_at":null,
              "process_at":"2024-07-22T10:04:28.924Z",
              "shipped_at":"2024-07-22T10:05:21.439Z"
    }}]}}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()
     
    });
    when("I can set order status retrun place", async() => {
     await instance.componentDidMount()
      jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
        if(key==="orderStatus"){
         return "return_confirmed"
       }
       if (key === "orderId") {
        return "1480";
      }
    })
    
   
    })
    then("I can check order status retrun place order with out errors", async() => {
     
     
     const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{"data":
      {"id":"1112","type":"order_seller","attributes":
        {"order_number":"OD00000243",
          "order_items":[
            {"id":"1480","type":"order_item_seller","attributes":
              {
                "status":"returned",
                "return_at":null,
                "return_cancel_at":null,
                "return_pick_at":null,
                "return_placed_at":"2024-07-22T10:48:34.313Z",
                "return_confirmed_at":null,
                "return_reject_at":null,
                "returned_assign_at":'2024-07-22T10:04:28.924Z'
              }}]
            }}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()
    })
    when("I can set order status retrun cancelled", async() => {
     
     
      jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
        if(key==="orderStatus"){
         return "cancelled"
       }
       if (key === "orderId") {
        return "1480";
      }
    })
     
    })
    then("I can check order status retrun cancelled order with out errors", () => {
    
     const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{"data":
      {"id":"1112","type":"order_seller","attributes":
        {"order_number":"OD00000243",
          "order_items":[
            {"id":"1480","type":"order_item_seller","attributes":
              {
                "status":"returned",
                "return_at":null,
                "return_cancel_at":null,
                "return_pick_at":'2024-07-22T10:04:28.924Z',
                "return_placed_at":'2024-07-22T10:04:28.924Z',
                "return_confirmed_at":null,
                "return_reject_at":null,
                "returned_assign_at":'2024-07-22T10:04:28.924Z'
              }}]
            }}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()
    })
  });

  test("User navigates to ordermanagementbuyerorderstatus for order status", ({ given, when, then }) => {
    let ordermanagementbuyerorderstatusBlock: ShallowWrapper;
    let instance: OrderManagementBuyerOrderStatus;

    given("I am a User loading ordermanagementbuyerorderstatus for order status", () => {
      ordermanagementbuyerorderstatusBlock = shallow(<OrderManagementBuyerOrderStatus {...screenProps} />);
    });

    when("I navigate to the ordermanagementbuyerorderstatus for order status", () => {
      instance = ordermanagementbuyerorderstatusBlock.instance() as OrderManagementBuyerOrderStatus;
    });

    then("ordermanagementbuyerorderstatus will load with out errors for order status", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
        getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          "data":{
            "id":"1112","type":"order_seller","attributes":
            {"order_items":[
              {"id":"1480","type":"order_item_seller","attributes":
                {
                  "status":"delivered",
                  "placed_at":"2024-07-22T10:03:35.143Z"
                  ,"confirmed_at":"2024-07-22T10:04:14.402Z",
                  "in_transit_at":"2024-07-22T10:05:27.786Z",
                  "delivered_at":"2024-07-22T10:05:58.855Z",
                  "cancelled_at":null,
                  "rejected_at":null,
                  "process_at":"2024-07-22T10:04:28.924Z",
                  "shipped_at":"2024-07-22T10:05:21.439Z"
        }}]}}});

        getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
        instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
        runEngine.sendMessage("Unit Test", getApiResponce);
        let btnTrackOrder = ordermanagementbuyerorderstatusBlock.findWhere(
          (node) => node.prop("testID") === "btnTrackOrder"
        );
        btnTrackOrder.simulate("press");
        let btnBackOrderStatus = ordermanagementbuyerorderstatusBlock.findWhere(
          (node) => node.prop("testID") === "btnBackOrderStatus"
        );
        btnBackOrderStatus.simulate("press");
        expect(getApiResponce).toBeTruthy()
    });
    when("I can set order status cancelelled for order status", async() => {
     await instance.componentDidMount()
      jest.spyOn(utils, "getStorageData").mockImplementation((key):any => {
       
        if (key === "orderStatus") {
         
          return "return_confirmed";
        }
        if (key === "orderId") {
          return "1480";
        }
    })
    
     
    })
    then("I can check order status cancel with out errors for order status", async() => {
      
     
      const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
      "data":{
        "id":"1112","type":"order_seller","attributes":
        {"order_items":[
          {"id":"1480","type":"order_item_seller","attributes":
            {
              "status":"delivered",
              "placed_at":"2024-07-22T10:03:35.143Z"
              ,"confirmed_at":"2024-07-22T10:04:14.402Z",
              "in_transit_at":"2024-07-22T10:05:27.786Z",
              "delivered_at":"2024-07-22T10:05:58.855Z",
              "cancelled_at":null,
              "rejected_at":null,
              "process_at":"2024-07-22T10:04:28.924Z",
              "shipped_at":"2024-07-22T10:05:21.439Z"
    }}]}}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()
     
    });
    when("I can set order status retrun place for order status", async() => {
     await instance.componentDidMount()
      jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
        if(key==="orderStatus"){
         return "return_confirmed"
       }
       if (key === "orderId") {
        return "1480";
      }
    })
    
   
    })
    then("I can check order status retrun place order with out errors for order status", async() => {
     
     
     const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{"data":
      {"id":"1112","type":"order_seller","attributes":
        {"order_number":"OD00000243",
          "order_items":[
            {"id":"1480","type":"order_item_seller","attributes":
              {
                "status":"returned",
                "return_at":null,
                "return_cancel_at":null,
                "return_pick_at":null,
                "return_placed_at":"2024-07-22T10:48:34.313Z",
                "return_confirmed_at":null,
                "return_reject_at":null,
                "returned_assign_at":'2024-07-22T10:04:28.924Z'
              }}]
            }}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()
    })
    when("I can set order status retrun cancelled for order status", async() => {
     
     
      jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
        if(key==="orderStatus"){
         return "cancelled"
       }
       if (key === "orderId") {
        return "1480";
      }
    })
     
    })
    then("I can check order status retrun cancelled order with out errors for order status", () => {
    
     const getApiResponce = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponce.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{"data":
      {"id":"1112","type":"order_seller","attributes":
        {"order_number":"OD00000243",
          "order_items":[
            {"id":"1480","type":"order_item_seller","attributes":
              {
                "status":"returned",
                "return_at":null,
                "return_cancel_at":null,
                "return_pick_at":'2024-07-22T10:04:28.924Z',
                "return_placed_at":'2024-07-22T10:04:28.924Z',
                "return_confirmed_at":null,
                "return_reject_at":null,
                "returned_assign_at":'2024-07-22T10:04:28.924Z'
              }}]
            }}});

     getApiResponce.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce.messageId);
     instance.getBuyerOrderDetailApiCallId = getApiResponce.messageId
     runEngine.sendMessage("Unit Test", getApiResponce);
     expect(getApiResponce).toBeTruthy()

     const getApiResponceforSeller = new Message(getName(MessageEnum.RestAPIResponceMessage))
     getApiResponceforSeller.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponce);
     getApiResponceforSeller.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          "data":{
            "id":"1112","type":"order_seller","attributes":
            {"order_items":[
              {"id":"1480","type":"order_item_seller","attributes":
                {
                  "status":"delivered",
                  "placed_at":"2024-07-22T10:03:35.143Z"
                  ,"confirmed_at":"2024-07-22T10:04:14.402Z",
                  "in_transit_at":"2024-07-22T10:05:27.786Z",
                  "delivered_at":"2024-07-22T10:05:58.855Z",
                  "cancelled_at":null,
                  "rejected_at":null,
                  "process_at":"2024-07-22T10:04:28.924Z",
                  "shipped_at":"2024-07-22T10:05:21.439Z"
        }}]}}});

        getApiResponceforSeller.addData(getName(MessageEnum.RestAPIResponceDataMessage), getApiResponceforSeller.messageId);
        instance.getSellerOrderDetailApiCallId = getApiResponceforSeller.messageId
        runEngine.sendMessage("Unit Test", getApiResponceforSeller);

        instance.afterGetSelectedMode("Seller", 1);
    })
  });
});
