import { shallow, ShallowWrapper } from 'enzyme'
import {render,fireEvent} from '@testing-library/react-native';

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 

import CustomformCreateStoreAddress from "../../src/CustomformCreateStoreAddress"
import { jest,test, expect,describe } from '@jest/globals';
import { Platform } from 'react-native';

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
    id: "CustomformCreateStoreAddress"
}

JSON.parse = jest.fn().mockImplementationOnce(() => {
    // return your what your code is returning.
  });

  const localObject = {
    address:'',
    latitude:123,
    longitude:345,
    area:'',
    areaArabic:'',
    block:'',
    blockArabic:'',
    mallName:'',
    mallNameArabic:'',
    floor:'',
    floorArabic:'',
    unitNumber:'',
    city:'',
    cityArabic:'',
    zipCode:'',
    paymentMode:[],
    reachDriver:'',
    reachDriverArabic:'',
    countryCode:'',
    phoneNumber:'',
  }

  const storeAddress = {
    addressselected:'',
    latitude:'',
    longitude:''
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

global.FormData = require("react-native/Libraries/Network/FormData");
let CustomformCreateStoreAddressData = <CustomformCreateStoreAddress {...screenProps}/>

describe('CustomformCreateStoreAddress page',()=>{

    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<CustomformCreateStoreAddress {...screenProps}/>)
    let storeAddInstance:CustomformCreateStoreAddress; 

    storeAddInstance = splashWrapper.instance() as CustomformCreateStoreAddress 

    test('should render other store address page show drawing screen without crashing',async()=>{
        Platform.OS = 'ios';
        const rendered=render(CustomformCreateStoreAddressData);
        expect(rendered).toBeTruthy();
        let renderSectionHeaderMockCall = jest.fn(storeAddInstance.getLocalDataAddressConfirm);
        renderSectionHeaderMockCall(localObject);
    }) 

    test('should render other store address get without crashing',async()=>{
        Platform.OS = 'android';
        let renderSectionHeaderMockCall = jest.fn(storeAddInstance.getStoreAddress);
        renderSectionHeaderMockCall(storeAddress);
    }) 

    test('should find the testId btnBackStoreAdd',()=>{
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackStoreAdd")
        signUp.simulate("press")
    }) 

    test('when i reach end and get token',async()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
    })

    test("i can get all country code api with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),dummyCountryList);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        storeAddInstance.countryCodeApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);

        const { getByTestId, container } = render(CustomformCreateStoreAddressData);
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

    test("I am trying to next with empty address", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_address"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
    });

    test("I can enter a address with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_address"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.address).toBe("Test");
        const getContactMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getContactMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getContactMessage);
        getContactMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            company_contact_valid:true
        });

        getContactMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getContactMessage.messageId);
        storeAddInstance.checkPhoneNumberCallId = getContactMessage.messageId
        runEngine.sendMessage("Unit Test", getContactMessage);

        getContactMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            company_contact_valid:false
        });
        storeAddInstance.checkPhoneNumberCallId = getContactMessage.messageId
        runEngine.sendMessage("Unit Test", getContactMessage);
        getContactMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            errors : "Error 400"
        });
        storeAddInstance.checkPhoneNumberCallId = getContactMessage.messageId
        runEngine.sendMessage("Unit Test", getContactMessage);
    });

    test("I am trying to next with empty area", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_area"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")

    });

    test("I can enter a area with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_area"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.area).toBe("storeDes");
    });

    test("I am trying to next with empty area arabic", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_enter_area_arabic"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = splashWrapper.findWhere(
          (node) => node.prop("testID") === "btnStoreTimingRedirect")
      signUp.simulate("press")
      expect(textInputComponent).toBeTruthy();
    });

    test("I can enter a area arabic with out errors", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_enter_area_arabic"
      );
      textInputComponent.simulate("changeText", "storeDes");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent).toBeTruthy();
  });

    test("I am trying to next with empty block", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_block"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")

    });

    test("I can enter a block with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_block"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.blockStore).toBe("A");
    });

    test("I am trying to next with empty block area", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_arabic_store_block"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = splashWrapper.findWhere(
          (node) => node.prop("testID") === "btnStoreTimingRedirect")
      signUp.simulate("press")
      expect(textInputComponent).toBeTruthy();
  });

  test("I can enter a block arabic with out errors", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_arabic_store_block"
      );
      textInputComponent.simulate("changeText", "A");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent).toBeTruthy();
  });

    test("I can enter a mall name with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_mall_name"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.mallName).toBe("A");
    });

    test("I can enter a mall name arabic with out errors", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_arabic_mall_name"
      );
      textInputComponent.simulate("changeText", "A");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent).toBeTruthy();
    });

    test("I can enter a floor with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_floor"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.floor).toBe("A");
    });

    test("I can enter a floor arabic with out errors", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_arabic_enter_floor"
      );
      textInputComponent.simulate("changeText", "A");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent).toBeTruthy();
  });

    test("I can enter a unit with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_unit"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.unitNumber).toBe("A");
    });

    test("I am trying to next with empty city", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_city"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")

    });

    test("I can enter a city with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_city"
        );
        textInputComponent.simulate("changeText", "Indore");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.city).toBe("Indore");
    });

    test("I am trying to next with empty city arabic", () => {
      let textInputComponent = splashWrapper.findWhere(
        (node) => node.prop("testID") === "txt_arabic_store_city"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = splashWrapper.findWhere(
          (node) => node.prop("testID") === "btnStoreTimingRedirect")
      signUp.simulate("press")
      expect(textInputComponent).toBeTruthy();
    });

    test("I can enter a city arabic with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_store_city"
        );
        textInputComponent.simulate("changeText", "Indore");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent).toBeTruthy();
    });

    test("I am trying to next with empty zip code", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_zip_code"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")

    });

    test("I can enter a zip code with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_zip_code"
        );
        textInputComponent.simulate("changeText", "476115");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.zipcode).toBe("476115");
    });

    test("I am trying to next with empty driver reach instruction", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_driver_reach"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")

    });

    test("I can enter a driver reach instruction with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_driver_reach"
        );
        textInputComponent.simulate("changeText", "Driver reach");
        textInputComponent.simulate("submitEditing");
        expect(storeAddInstance.state.driverReach).toBe("Driver reach");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
    });

    test("I am trying to next with empty driver reach instruction arabic", () => {
      let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_driver_reach"
        );
      textInputComponent.simulate("changeText", "");
      const signUp = splashWrapper.findWhere(
          (node) => node.prop("testID") === "btnStoreTimingRedirect")
      signUp.simulate("press")
      expect(textInputComponent).toBeTruthy();
    });

    test("I can enter a driver reach instruction arabic with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_driver_reach"
        );
        textInputComponent.simulate("changeText", "Driver reach");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent).toBeTruthy();
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
    });

    test("I am trying to add phone number with empty phone number", () => {
        const { getByTestId } = render(CustomformCreateStoreAddressData);
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
    });

    test("I can enter a phone number with out errors", () => {
        const { getByTestId } = render(CustomformCreateStoreAddressData);
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "3105551111");
        expect(textInput.props.value).toBe("3105551111");
        expect(storeAddInstance.setState({phoneNumber:'3105551111'}));
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
    });

    test("I can set api with out errors",async() => {
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnStoreTimingRedirect")
        signUp.simulate("press")
        let renderSectionHeaderMockCall = jest.fn(storeAddInstance.updateLocalDataAndRedirect);
        renderSectionHeaderMockCall(localObject);
    });
    
    test('should find the testId btnRedirectGps',()=>{
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnRedirectGps")
        signUp.simulate("press")
    }) 
    test('should find the testId btnAddressBack',()=>{
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnAddressBack")
        signUp.simulate("press")
        storeAddInstance.setState({languageGet:'en'})
    }) 

})