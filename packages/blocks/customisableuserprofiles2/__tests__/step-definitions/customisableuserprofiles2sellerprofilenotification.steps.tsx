import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import Customisableuserprofiles2sellerprofilenotification from "../../src/Customisableuserprofiles2sellerprofilenotification"
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
    id: "Customisableuserprofiles2sellerprofilenotification"
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
                    "order_invoices": false,
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
const feature = loadFeature("./__tests__/features/customisableuserprofiles2sellerprofilenotification-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to customisableuserprofiles2sellerprofilenotification", ({ given, when, then }) => {
      let Customisableuserprofiles2sellerprofilenotificationBlock: ShallowWrapper;
      let instance: Customisableuserprofiles2sellerprofilenotification;
  
      given("I am a User loading customisableuserprofiles2sellerprofilenotification", () => {
        Customisableuserprofiles2sellerprofilenotificationBlock = shallow(<Customisableuserprofiles2sellerprofilenotification {...screenProps} />);
      });
  
      when("I navigate to the customisableuserprofiles2sellerprofilenotification", () => {
        instance = Customisableuserprofiles2sellerprofilenotificationBlock.instance() as Customisableuserprofiles2sellerprofilenotification;
      });
  
      then("customisableuserprofiles2sellerprofilenotification will load with out errors", () => {
        expect(Customisableuserprofiles2sellerprofilenotificationBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

    then('I reach end it should go for lazy loading in notification status',()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        notificationDataObject);

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.getNotificationStatusApiCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    }) 

      then("I can click back notification page with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "btnBackPushNotification");
        buttonComponent.simulate("press")
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order invoices push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "orderInvoicePushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order confirmations push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "orderConfirmationPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change delivery confirmations push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "deliveryConfirmationPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change reviews and feedback push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "reviewsFeedbackPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change refund or payment push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "refundPaymentPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change marketing emails push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "marketEmailsPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change product stock updates push with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "productStockPushSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order invoices email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "orderInvoiceEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change order confirmations email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "orderConfirmationEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change delivery confirmations email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "deliveryConfirmationEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change reviews and feedback email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "reviewsFeedbackEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change refund or payment email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "refundPaymentEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change marketing emails email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "marketingEmailsEmailSwitch");
        buttonComponent.at(0).prop("onValueChange")(true)
    
        expect(buttonComponent).toBeTruthy();

      });

      then("I can change product stock updates email with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofilenotificationBlock.findWhere(node => node.prop("testID") === "productStockEmailSwitch");
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
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(Customisableuserprofiles2sellerprofilenotificationBlock).toBeTruthy();
      });
    });
  });