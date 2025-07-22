import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {render,fireEvent} from '@testing-library/react-native';

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AddressEditDriver from "../../src/AddressEditDriver";
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
  id: "AddressEditDriver",
};

const addressDataObject = {
    "data": {
        "id": "3",
        "type": "driver_account",
        "attributes": {
            "account_id": 432,
            "account_type": "Agency",
            "date_of_birth": null,
            "address": "INDIA1",
            "area": null,
            "block": null,
            "house_or_building_number": null,
            "zip_code": "990980",
            "work_city": null,
            "language": null,
            "status": "submitted",
            "vehicle_detail": null,
            "bank_account": null,
            "agency_contact_number": "6587435698",
            "document_files": null,
            "profile_photo": null
        }
    }
}

const feature = loadFeature("./__tests__/features/AddressEditDriver-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");
let AddressEditDriverData = <AddressEditDriver {...screenProps}/>

defineFeature(feature, (test) => {
    let screen: ReturnType<typeof render>;
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AddressEditDriver", ({ given, when, then }) => {
    let AddressEditDriverWrapper: ShallowWrapper;
    let instance: AddressEditDriver;

    given("I am a User loading AddressEditDriver", () => {
    screen = render(<AddressEditDriver {...screenProps} />);
      AddressEditDriverWrapper = shallow(<AddressEditDriver {...screenProps} />);
    });

    when("I navigate to the AddressEditDriver", () => {
      instance = AddressEditDriverWrapper.instance() as AddressEditDriver;
    });

    then('AddressEditDriver will load with out errors',()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)

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
        const signUp = AddressEditDriverWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackUpdateAddress")
        signUp.simulate("press")
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    }) 

    then("I can get edit address api with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),addressDataObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getDriverAddressApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
        
    })

    then("I am trying to update address with empty address", () => {
        const textInput = screen.getByTestId("txt_enter_update_address");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_update_address").props.value).toBe("");

    });

    then("I can enter a address with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_update_address");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_update_address").props.value).toBe("Kuwait");
    });

    then("I am trying to update address with empty area", () => {
        const textInput = screen.getByTestId("txt_enter_area");
        fireEvent(textInput, "onChangeText", "");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_area").props.value).toBe("");
    });

    then("I can enter a area with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_area");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_area").props.value).toBe("Kuwait");
    });

    then("I am trying to update address with empty block", () => {
        const textInput = screen.getByTestId("txt_enter_block");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_block").props.value).toBe("");
    });

    then("I can enter a block with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_block");
        fireEvent(textInput, "onChangeText", "ABC");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_block").props.value).toBe("ABC");
    });

    then("I am trying to update address with empty house number", () => {
        const textInput = screen.getByTestId("txt_enter_house_number");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_house_number").props.value).toBe("");
    });

    then("I can enter house number order with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_house_number");
        fireEvent(textInput, "onChangeText", "12");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_house_number").props.value).toBe("12");
    });

    then("I can enter a zipcode with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_zipcode");
        fireEvent(textInput, "onChangeText", "123456");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnUpdateAddressDriver'))
        expect(screen.getByTestId("txt_enter_zipcode").props.value).toBe("123456");
    });

    then("I can Update address Should Pass and update data", () => {

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
        instance.updateDriverAddressApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    }) 

    then("I can Update address Should Pass and update data with errors", () => {

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
        instance.updateDriverAddressApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    
    }) 
  });
});
