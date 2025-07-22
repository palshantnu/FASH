import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent} from '@testing-library/react-native';

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 

import SocialMediaAccountPhoneScreen from "../../src/SocialMediaAccountPhoneScreen"
import { jest, test, expect,describe } from '@jest/globals';

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
    id: "SocialMediaAccountPhoneScreen"
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

const dummyCountryList = [
    {
      numeric_code: "+935",
      country_full_name: "Kuwait",
      country_code: "KW",
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

global.FormData = require("react-native/Libraries/Network/FormData");
let SocialMediaAccountPhoneScreenData = <SocialMediaAccountPhoneScreen {...screenProps}/>

describe('SocialMediaAccountPhoneScreen page',()=>{

    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<SocialMediaAccountPhoneScreen {...screenProps}/>)
    let instance:SocialMediaAccountPhoneScreen; 

    instance = splashWrapper.instance() as SocialMediaAccountPhoneScreen

    test('should render other terms page show drawing screen without crashing',async()=>{
        const rendered=render(SocialMediaAccountPhoneScreenData);
        expect(rendered).toBeTruthy();
    })  

    test('should find the testId btnBackSocialLoginPhone',()=>{
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackSocialLoginPhone")
        signUp.simulate("press")
    }) 

    test('when i reach end and get navigation playload',async()=>{
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.accountIdMessage), "123");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)
    }) 

    test("i can get all country code api with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            dummyCountryList
        );

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.countryCodeApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);

        const { getByTestId, container } = render(SocialMediaAccountPhoneScreenData);
        const fl = getByTestId("phoneCodesFlatList");
        const toggle = getByTestId("phoneCodeDisplayToggle");
        const item = fl.props.renderItem({
        item: dummyCountryList[2],
        index: 2
        }) as typeof fl;
        fireEvent(toggle, "onPress");
        expect(container.instance.state.dropdownOpen).toBeTruthy();

        fireEvent(item, "onPress");
        expect(container.instance.state.selectedCodeIndex).toBe(2);
    })

    test("I am trying to add phone number with empty phone number", () => {
        const { getByTestId } = render(SocialMediaAccountPhoneScreenData);
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnOtpSocialLogin")
        signUp.simulate("press")
    });

    test("I can enter a phone number with out errors", () => {
        const { getByTestId } = render(SocialMediaAccountPhoneScreenData);
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "3105551111");
        expect(textInput.props.value).toBe("3105551111");
        expect(instance.setState({mobileNo:'3105551111'}));
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnOtpSocialLogin")
        signUp.simulate("press")
    });

    test("Update profile Should Pass and update data with errors", () => {

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
        instance.addPhonenumberCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
    
    }) 

    test("Update profile Should Pass and update data with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "meta": 
                {
                    "token": "token",
                },
            data:{
                attributes:{
                    full_name:'test'
                  },
                id:'1'
            }
            
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.addPhonenumberCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
    
    }) 

})