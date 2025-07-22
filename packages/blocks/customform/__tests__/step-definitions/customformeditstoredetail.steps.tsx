import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";
import {render,fireEvent} from '@testing-library/react-native';
import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import CustomformEditStoreDetails from "../../src/CustomformEditStoreDetails"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
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
    id: "CustomformEditStoreDetails"
}

const localObject = {
    "store_name": "Hiren ps",
    "store_name_arabic": "متجر عربي",
    "description": "Qwew",
    "description_arabic": "وصف",
    "address": "Rajasthan, India",
    "area": "Sqw",
    "area_arabic": "منطقة",
    "block": "Esqw",
    "block_arabic": "حاجز",
    "mall_name": "Rqw",
    "mall_name_arabic": "الأدميرال",
    "floor": "Retweets",
    "floor_arabic": "إثنا عشر",
    "unit_number": '35',
    "city": "Por",
    "city_arabic": "الكويت",
    "zipcode": "353423",
    "driver_instruction": "454534",
    "driver_instruction_arabic": "عيد ميلاد سعيد",
    "average_shipping_time": "60 mins",
    "payment_mode": [
        "COD,DEBIT CARD"
    ],
    "store_operating_hours": {
        "monday": {
            "open": "15:22",
            "close": "16:13",
            "is_open": true
        },
        "tuesday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "wednesday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "thursday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "friday": {
            "open": "16:13",
            "close": "16:14",
            "is_open": true
        },
        "saturday": {
            "open": "15:20",
            "close": "16:14",
            "is_open": true
        },
        "sunday": {
            "open": "17:20",
            "close": "18:20",
            "is_open": true
        }
    },
    "status": "Pending",
    "latitude": 27.0238036,
    "longitude": 74.2179326,
    "is_open": false,
    "available_variants": [],
    "image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3dGIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b4ecc414756fb7c1e5b49aa7abd9604fe9c6dc07/profile.jpg",
    "email": "seller@mailinator.com",
    "contact_number": {
        "country_code": "+91",
        "phone_number": "8962687619"
    },
    "expected_delivery_time": "2024-03-15T13:46:17.668+00:00"
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

  const storeAddress = {
    addressselected:'',
    latitude:'',
    longitude:''
  }

global.FormData = require("react-native/Libraries/Network/FormData");
const feature = loadFeature("./__tests__/features/customformeditstoredetails-scenario.feature");

let CustomformEditStoreDetailsData = <CustomformEditStoreDetails {...screenProps}/>


defineFeature(feature, (test) => {
    let screen: ReturnType<typeof render>;
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });

    beforeAll(()=>{
        screen = render(CustomformEditStoreDetailsData)
    })
  
    test("User navigates to customformeditstoredetails", ({ given, when, then }) => {
      let CustomformEditStoreDetailsBlock: ShallowWrapper;
      let instance: CustomformEditStoreDetails;
  
      given("I am a User loading customformeditstoredetails", () => {
        CustomformEditStoreDetailsBlock = shallow(<CustomformEditStoreDetails {...screenProps} />);
      });
  
      when("I navigate to the customformeditstoredetails", () => {
        instance = CustomformEditStoreDetailsBlock.instance() as CustomformEditStoreDetails;
      });
  
      then("customformeditstoredetails will load with out errors", () => {
        expect(CustomformEditStoreDetailsBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can click on back button edit store with out errors", () => {
        let buttonComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnBackEditStore"
        );
        buttonComponent.simulate("press");
      });

      then("I can get navigation payload with out errors", () => {
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ManageTimingStoreIdPayloadMessage), "1");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.StoreDetailsPayloadMessage), {localObject});
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
      
    });

      then("I can click on store detail with out errors", () => {
        let buttonComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnStoreDetails"
        );
        buttonComponent.simulate("press");
      });

      then("I can click on edit image with out errors", () => {
        let buttonComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnEditIcon"
        );
        buttonComponent.simulate("press");
      });

    then('I am find the testId btn_camera',()=>{
        const camera_btn = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
        expect(instance.setState({selectImage:'url'})).toBeTruthy()
    }) 

    then('I am find the testId btn_gallery',()=>{
        const galleryBtn = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_cancelMedia',()=>{
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btn_cancelMedia")
        signUp.simulate("press")
        expect(signUp).toBeTruthy();
    }) 

    then("I am trying to next with empty store name", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_name"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I can enter a store name with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeName).toBe("Test");
    });

    then("I am trying to next with empty store name arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_store_name"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);
    });

    then("I can enter a store name arabic with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_edit_ar_store_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I am trying to next with empty store description", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_description"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a store description with out errors", async() => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_description"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeDescription).toBe("storeDes");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I am trying to next with empty store description arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_store_description"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);

  });

  then("I can enter a store description arabic with out errors", async() => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_store_description"
      );
      textInputComponent.simulate("changeText", "storeDes");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent.exists()).toBe(true);
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
  });

    then("I am Update store detail and image api with out errors", () => {
        const msgLogInErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            data: [
              {
                failed_login: "Data send",
              },
            ],
          }
        );
    
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI.messageId
        );
        instance.updateStoreCallApiId = msgLogInErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      });

    then("I can click on address detail with out errors", () => {
       
        const testTestName = 'btnStoreAddress'
        const {getByTestId} = screen
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();

        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnStoreAddress")
        signUp.simulate("press")
      });

      then("I can get all country code api with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),dummyCountryList);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.countryCodeApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);

        const { getByTestId, container } = screen;
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

    then("I am trying to next with empty address", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_address"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I can enter a address with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_address"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.address).toBe("Test");
    });

    then("I am trying to next with empty area", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_area"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a area with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_area"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.area).toBe("storeDes");
    });

    then("I am trying to next with empty area arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_area"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);

    });

    then("I can enter a area arabic with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_edit_ar_area"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I am trying to next with empty block", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_block"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a block with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_block"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.blockStore).toBe("A");
    });

    then("I am trying to next with empty block arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_store_block"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);

    });

    then("I can enter a block arabic with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_edit_ar_store_block"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I can enter a mall name with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_mall_name"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.mallName).toBe("A");
    });

    then("I can enter a mall name arabic with out errors", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_mall_name"
      );
      textInputComponent.simulate("changeText", "A");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent.exists()).toBe(true);
    });

    then("I can enter a floor with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_floor"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.floor).toBe("A");
    });

    then("I can enter a floor arabic with out errors", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_floor"
      );
      textInputComponent.simulate("changeText", "A");
      textInputComponent.simulate("submitEditing");
      expect(textInputComponent.exists()).toBe(true);
    });

    then("I can enter a unit with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_unit"
        );
        textInputComponent.simulate("changeText", "A");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.unitNumber).toBe("A");
    });

    then("I am trying to next with empty city", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_city"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a city with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_city"
        );
        textInputComponent.simulate("changeText", "Indore");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.city).toBe("Indore");
    });

    then("I am trying to next with empty city arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_store_city"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);
    });

    then("I can enter a city arabic with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_edit_ar_store_city"
        );
        textInputComponent.simulate("changeText", "Indore");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I am trying to next with empty zip code", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_zip_code"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a zip code with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_zip_code"
        );
        textInputComponent.simulate("changeText", "476115");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.zipcode).toBe("476115");
    });

    then("I am trying to next with empty payment mode", () => {
        const genderDropDown = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "paymentModeDropdown")
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    })

    then("I can select payment mode with out errors", () => {
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    })

    then("I am trying to next with empty driver reach instruction", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_driver_reach"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")

    });

    then("I can enter a driver reach instruction with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_driver_reach"
        );
        textInputComponent.simulate("changeText", "Driver reach");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.driverReach).toBe("Driver reach");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I am trying to next with empty driver reach instruction for arabic", () => {
      let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
        (node) => node.prop("testID") === "txt_edit_ar_driver_reach"
      );
      textInputComponent.simulate("changeText", "");
      const signUp = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "btnUpdateStoreTimings")
      signUp.simulate("press")
      expect(signUp.exists()).toBe(true);
    });

    then("I can enter a driver reach instruction for arabic with out errors", () => {
        let textInputComponent = CustomformEditStoreDetailsBlock.findWhere(
          (node) => node.prop("testID") === "txt_edit_ar_driver_reach"
        );
        textInputComponent.simulate("changeText", "Driver reach");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I am trying to add phone number with empty phone number", () => {
        const { getByTestId } = screen;
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "");
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });

    then("I can enter a phone number with out errors", () => {
        const { getByTestId } = screen;
        const textInput = getByTestId("txtInputPhoneNumber");
        fireEvent(textInput, "onChangeText", "3105551111");
        expect(textInput.props.value).toBe("3105551111");
        expect(instance.setState({phoneNumber:'3105551111'}));
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings")
        signUp.simulate("press")
    });
    
    then('I should find the testId btnRedirectGps',()=>{
        const signUp = CustomformEditStoreDetailsBlock.findWhere(
            (node) => node.prop("testID") === "btnRedirectGps")
        signUp.simulate("press")

        let renderSectionHeaderMockCall = jest.fn(instance.getStoreAddress);
        renderSectionHeaderMockCall(storeAddress);
    }) 

    then('I am get api call for check store name with out errors',()=>{
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            exists:true
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getStoreNameApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
    }) 

    then('I am get api call for check store name with errors',()=>{
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            exists:false
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getStoreNameApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        
        const getContactMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getContactMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getContactMessage);
        getContactMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            company_contact_valid:true
        });

        getContactMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getContactMessage.messageId);
        instance.checkContactNumberCallId = getContactMessage.messageId
        runEngine.sendMessage("Unit Test", getContactMessage);

        getContactMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            company_contact_valid:false
        });
        instance.checkContactNumberCallId = getContactMessage.messageId
        runEngine.sendMessage("Unit Test", getContactMessage);
    }) 

    then("I am Update store detail api with out errors", () => {
        const msgLogInErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            data: [
              {
                failed_login: "Data send",
              },
            ],
          }
        );
    
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI.messageId
        );
        instance.updateStoreCallApiId = msgLogInErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      });

      then("I am Update store detail api with contact errors", () => {
        const msgLogInErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            errors: [
              {
                contact_number: "Data send",
              },
            ],
          }
        );
    
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI.messageId
        );
        instance.updateStoreCallApiId = msgLogInErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      });

      then("I am Update store detail api with zipcode errors", () => {
        const msgLogInErrorRestAPI = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI
        );
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            errors: [
              {
                zipcode: "Data send",
              },
            ],
          }
        );
    
        msgLogInErrorRestAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPI.messageId
        );
        instance.updateStoreCallApiId = msgLogInErrorRestAPI.messageId;
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      });
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(CustomformEditStoreDetailsBlock).toBeTruthy();
      });
    });
  });