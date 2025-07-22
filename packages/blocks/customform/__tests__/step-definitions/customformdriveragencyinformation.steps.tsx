import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {render,fireEvent} from '@testing-library/react-native';

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import CustomformDriverAgencyInfo from "../../src/CustomformDriverAgencyInfo";
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
  id: "CustomformDriverAgencyInfo",
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

const dummyCountryList = [
    {
      numeric_code: "+992",
      country_full_name: "Tajikistan",
      country_code: "TJ",
      country_flag: "🇹🇯"
    },
    {
      numeric_code: "+1",
      country_full_name: "Jamaica",
      country_code: "JM",
      country_flag: "🇯🇲"
    },
    {
      numeric_code: "+509",
      country_full_name: "Haiti",
      country_code: "HT",
      country_flag: "🇭🇹"
    }
  ];

const feature = loadFeature("./__tests__/features/customformdriveragencyinformation-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");
let CustomformDriverAgencyInformationData = <CustomformDriverAgencyInfo {...screenProps}/>

defineFeature(feature, (test) => {
    let screen: ReturnType<typeof render>;
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to customformdriveragencyinformation", ({ given, when, then }) => {
    let customformdriveragencyinformationWrapper: ShallowWrapper;
    let instance: CustomformDriverAgencyInfo;

    given("I am a User loading customformdriveragencyinformation", () => {
    screen = render(<CustomformDriverAgencyInfo {...screenProps} />);
      customformdriveragencyinformationWrapper = shallow(<CustomformDriverAgencyInfo {...screenProps} />);
    });

    when("I navigate to the customformdriveragencyinformation", () => {
      instance = customformdriveragencyinformationWrapper.instance() as CustomformDriverAgencyInfo;
    });

    then('customformdriveragencyinformation will load with out errors',()=>{
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
        const signUp = customformdriveragencyinformationWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackAddDriverContact")
        signUp.simulate("press")
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    }) 

    then("I can get all country code api with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),dummyCountryList);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.countryCodeApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);

        const { getByTestId, container } = render(CustomformDriverAgencyInformationData);
        const fl = getByTestId("phoneCodesFlatList");
        const toggle = getByTestId("phoneCodeDisplayToggle");
        const item = fl.props.renderItem({
        item: dummyCountryList[2],
        index: 2
        }) as typeof fl;
        fireEvent(toggle, "onPress");
        fireEvent(item, "onPress");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
        
    })

    then("I am trying to add agenecy with empty agenecy name", () => {
        const textInput = screen.getByTestId("txt_enter_agenecy_name");
        fireEvent(textInput, "onChangeText", "");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_agenecy_name").props.value).toBe("");
    });

    then("I can enter a agency name with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_agenecy_name");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_agenecy_name").props.value).toBe("Kuwait");
    });

    then("I am trying to add phone number with empty phone number", () => {
        const textInput = screen.getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txtInputPhoneNumber").props.value).toBe("");
    });

    then("I can enter a phone number with out errors", () => {
        const textInput = screen.getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "3105551111");
        expect(textInput.props.value).toBe("3105551111");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
    });

    then("I am trying to add agency with empty address", () => {
        const textInput = screen.getByTestId("txt_enter_agency_address");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_agency_address").props.value).toBe("");

    });

    then("I can enter a address with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_agency_address");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_agency_address").props.value).toBe("Kuwait");
    });

    then("I am trying to add agency with empty area", () => {
        const textInput = screen.getByTestId("txt_enter_area_agency");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_area_agency").props.value).toBe("");

    });

    then("I can enter a area with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_area_agency");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_area_agency").props.value).toBe("Kuwait");
    });

    then("I am trying to add agency with empty block", () => {
        const textInput = screen.getByTestId("txt_enter_block_agency");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_block_agency").props.value).toBe("");

    });

    then("I can enter a block with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_block_agency");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_block_agency").props.value).toBe("Kuwait");
    });

    then("I am trying to add agency with empty house number", () => {
        const textInput = screen.getByTestId("txt_enter_house_number_agency");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_house_number_agency").props.value).toBe("");

    });

    then("I can enter a house number with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_house_number_agency");
        fireEvent(textInput, "onChangeText", "1");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_house_number_agency").props.value).toBe("1");
    });

    then("I am trying to add agency with empty zipcode", () => {
        const textInput = screen.getByTestId("txt_enter_zipcode");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_zipcode").props.value).toBe("");
    });

    then("I can enter a zipcode with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_zipcode");
        fireEvent(textInput, "onChangeText", "123456");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAgencyInformation'))
        expect(screen.getByTestId("txt_enter_zipcode").props.value).toBe("123456");
    });

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
  });
});
