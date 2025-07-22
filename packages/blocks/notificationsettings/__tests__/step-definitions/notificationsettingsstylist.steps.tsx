import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import NotificationsettingsStylist from "../../src/NotificationsettingsStylist"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
const navigation = require("react-navigation")
const mockNavigate = jest.fn();
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
    id: "NotificationsettingsStylist"
}

const notificationDataObject = {
    "data": {
        "id": "462",
        "type": "notification",
        "attributes": {
            "id": 462,
            "email": "seller@mailinator.com",
            "full_name": "Seller Me",
            "notification": {
                "push_notification": {
                    "order_new": false,
                    "order_confirmations": true,
                    "delivery_confirmation": true,
                    "reviews_and_feedback_requests": true,
                    "refund_or_payment_complete": true,
                    "marketing_emails": true,
                    "product_stock_updates": true
                },
                "email_notification": {
                    "order_invoices": true,
                    "order_confirmations": true,
                    "delivery_confirmation": true,
                    "reviews_and_feedback_requests": true,
                    "refund_or_payment_complete": true,
                    "marketing_emails": true,
                    "product_stock_updates": true
                }
            }
        }
    }
}

global.FormData = require("react-native/Libraries/Network/FormData");
const feature = loadFeature("./__tests__/features/notificationsettingsstylist-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to notificationsettingsstylist", ({ given, when, then }) => {
      let notificationsettingsstylistBlock: ShallowWrapper;
      let instance: NotificationsettingsStylist;
  
      given("I am a User loading notificationsettingsstylist", () => {
        notificationsettingsstylistBlock = shallow(<NotificationsettingsStylist {...screenProps} />);
      });
  
      when("I navigate to the notificationsettingsstylist", () => {
        instance = notificationsettingsstylistBlock.instance() as NotificationsettingsStylist;
      });
  
      then("notificationsettingsstylist will load with out errors", () => {
        expect(notificationsettingsstylistBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

    then('I reach end it should go for lazy loading in notification status',()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),notificationDataObject);

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.getNotificationStatusApiCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    }) 

      then("I can click back notification page with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "btnBackNotificationSetting");
        buttonComponent.simulate("press")
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order new push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "orderNewPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order confirmations push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "orderConfirmationPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change delivery confirmations push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "deliveryConfirmationPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change reviews and feedback push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "reviewsFeedbackPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change refund or payment push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "refundPaymentPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change marketing emails push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "messageClientPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change product stock updates push with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "productSourcingPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order invoices email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "orderInvoicesEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order confirmations email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "orderConfirmationEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change delivery confirmations email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "deliveryConfirmationEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change reviews and feedback email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "reviewsFeedbackEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change refund or payment email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "refundPaymentEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change marketing emails email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "marketingEmlEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change product stock updates email with out errors", () => {
        let buttonComponent = notificationsettingsstylistBlock.findWhere(node => node.prop("testID") === "productStockUpdateSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then('I am change status according to condition calling api without errors',()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "message":"Notification settings updated successfully."
        });

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.notificationStatusUpdateCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    }) 

    then('I am change status according to condition calling api with errors',()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        {
            "errors":"Invalid Token"
        });

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.notificationStatusUpdateCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    }) 
    });
  });