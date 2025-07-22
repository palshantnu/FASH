import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent} from '@testing-library/react-native';

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 

import ContactUsAddContact from "../../src/ContactUsAddContact"
import { jest, test, expect,describe } from '@jest/globals';

const navigation = require("react-navigation")
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
    id: "ContactUsAddContact"
}

const storeObect = {
    "data": [
        {
            "id": "1",
            "type": "business_info",
            "attributes": {
                "store_name": " C Sykmbcfdedefg",
                "full_address": ", , , , dgdfg, , dgd, ",
                "status": false
            }
        },
        {
            "id": "2",
            "type": "business_info",
            "attributes": {
                "store_name": "store 1",
                "full_address": ", , , , dgdfg, , dgd, ",
                "status": false
            }
        },
        {
            "id": "3",
            "type": "business_info",
            "attributes": {
                "store_name": "store 1111",
                "full_address": ", , , , dgdfg, , dgd, ",
                "status": false
            }
        }
    ]
}

global.FormData = require("react-native/Libraries/Network/FormData");
let ContactUsAddContactData = <ContactUsAddContact {...screenProps}/>

describe('ContactUsAddContact page',()=>{

    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<ContactUsAddContact {...screenProps}/>)
    let instance:ContactUsAddContact; 

    instance = splashWrapper.instance() as ContactUsAddContact

    test('should render other terms page show drawing screen without crashing',async()=>{
        const rendered=render(ContactUsAddContactData);
        expect(rendered).toBeTruthy();
    })  

    test('should find the testId btnBackAddContact',()=>{
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackAddContact")
        signUp.simulate("press")
    }) 

    test('when i reach end and get token and navigation playload',async()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ContactUsTypeMessage), "store");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPITitle = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPITitle.addData(getName(MessageEnum.ContactUsHeaderTitleMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPITitle)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.ContactUsTokenMessage), "User-Token");
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
    }) 

    test("i can select state of user and call all state", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            storeObect
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getAllStoreCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
    })

    test("I am trying to add contact with empty name", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_name"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
    });

    test("I can enter a name with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.name).toBe("Test");
    });

    test("I am trying to add contact with empty email", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_email"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")

    });

    test("I can enter a email with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_email"
        );
        textInputComponent.simulate("changeText", "Test@mail.com");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.email).toBe("Test@mail.com");
    });

    test("I am trying to add contact with empty subject", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_subject"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")

    });

    test("I can enter a subject with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_subject"
        );
        textInputComponent.simulate("changeText", "subject");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.subject).toBe("subject");
    });

    test("I am trying to add contact with empty description", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_description"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")

    });

    test("I can enter a description with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_description"
        );
        textInputComponent.simulate("changeText", "message");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.description).toBe("message");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnContactSupport")
        signUp.simulate("press")
    });

    test("Update profile Should Pass and update data", () => {

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
        instance.addContactUscallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
    
    }) 

    test("Update profile Should Pass and update data with errors", () => {

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
        instance.addContactUscallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
    
    }) 

})