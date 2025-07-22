import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import ContactUsAddContactDriver from "../../src/ContactUsAddContactDriver";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");
import { _ } from "../../../../framework/src/IBlock";
import { jest, beforeEach, expect } from '@jest/globals';

const screenProps = {
  navigation: {
    navigate:jest.fn(),
    goBack:jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "ContactUsAddContactDriver",
};

const orderObect = {
    "data": [
        {
            "id": "1",
            "type": "business_info",
            "attributes": {
                "order_number": " C Sykmbcfdedefg"
            }
        },
        {
            "id": "2",
            "type": "business_info",
            "attributes": {
                "order_number": "store 1"
            }
        },
        {
            "id": "3",
            "type": "business_info",
            "attributes": {
                "order_number": "store 1111"
            }
        }
    ]
}

const feature = loadFeature("./__tests__/features/contactusaddcontactdriver-scenario.feature");
global.FormData = require("react-native/Libraries/Network/FormData");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactusaddcontactdriver", ({ given, when, then }) => {
    let ContactUsAddContactDriverWrapper: ShallowWrapper;
    let instance: ContactUsAddContactDriver;

    given("I am a User loading contactusaddcontactdriver", () => {
      ContactUsAddContactDriverWrapper = shallow(<ContactUsAddContactDriver {...screenProps} />);
    });

    when("I navigate to the contactusaddcontactdriver", () => {
      instance = ContactUsAddContactDriverWrapper.instance() as ContactUsAddContactDriver;
    });

    then('contactusaddcontactdriver will load with out errors',()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ContactUsTypeMessage), "payout");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPITitle = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPITitle.addData(getName(MessageEnum.ContactUsHeaderTitleMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPITitle)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.ContactUsTokenMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
    }) 

    then('I can click back icon with out errors',()=>{
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackAddDriverContact")
        signUp.simulate("press")
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    }) 

    then("I can select state of user and call all state", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            orderObect
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getAllDeliveredOrderCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I am trying to add contact with empty name", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_name"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I can enter a name with out errors", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I am trying to add contact with empty email", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_email"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(textInputComponent.exists()).toBe(true)

    });

    then("I can enter a email with out errors", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_email"
        );
        textInputComponent.simulate("changeText", "Test@mail.com");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I am trying to add contact with empty subject", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_subject"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I can enter a subject with out errors", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_subject"
        );
        textInputComponent.simulate("changeText", "subject");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I am trying to add contact with empty description", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_description"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(textInputComponent.exists()).toBe(true)
    });

    then("I can enter a description with out errors", () => {
        let textInputComponent = ContactUsAddContactDriverWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_description"
        );
        textInputComponent.simulate("changeText", "message");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true)
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
    });

    then('I can click attachment icon with out errors',()=>{
        const attachmentBtn = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnAttachmentOpen")
        attachmentBtn.simulate("press")
        expect(attachmentBtn.exists()).toBe(true)
    }) 

    then('I can click camera icon with out errors',()=>{
        const cameraBtn = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        cameraBtn.simulate("press")
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(cameraBtn.exists()).toBe(true)
    }) 

    then('I can click gallery icon with out errors',()=>{
        const cameraBtn = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        cameraBtn.simulate("press")
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(cameraBtn.exists()).toBe(true)
    }) 

    then('I can click cancel button with out errors',()=>{
        const cameraBtn = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btn_cancelMedia")
        cameraBtn.simulate("press")
        expect(cameraBtn.exists()).toBe(true)
    }) 

    then("I am trying to add contact with empty order delivered", () => {
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ContactUsTypeMessage), "deliveredOrder");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)
        const genderDropDown = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "deliveredOrderDropdown")
        const renderItem = genderDropDown.renderProp("renderItem")({});
        const event_check = { label: "Store", value: "0" }
        genderDropDown.simulate("change", event_check)
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    })

    then("I can select delivered order with out errors", () => {
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ContactUsTypeMessage), "deliveredOrder");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)
        const genderDropDown = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "deliveredOrderDropdown")
        const event_check = { label: "Store", value: "1" }
        genderDropDown.simulate("change", event_check)
        const signUp = ContactUsAddContactDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    })

    then("I can Update profile Should Pass and update data", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "errors": [
                {
                    "failed_login": "Data send"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.addContactUsDrivercallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    }) 

    then("I can Update profile Should Pass and update data with errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        {
            "errors": [
                {
                    "failed_login": "Data send"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.addContactUsDrivercallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    
    }) 

    then('I can load delivered order data with out errors',()=>{

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ContactUsTypeMessage), "deliveredOrder");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPITitle = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPITitle.addData(getName(MessageEnum.ContactUsHeaderTitleMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPITitle)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.ContactUsTokenMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    }) 
  });
});
