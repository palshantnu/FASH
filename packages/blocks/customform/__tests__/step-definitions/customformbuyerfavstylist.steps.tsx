import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import FlatList from "../../../customform/src/CustomformBuyerfavStylist"

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformBuyerfavStylist from "../../src/CustomformBuyerfavStylist";

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
    id: "CustomformBuyerfavStylist",
};

const FavStylistObject = {
    "data": [
        {
            "id": "188",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "stylist@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "Stylist",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-11-01T06:58:13.713Z",
                "updated_at": "2023-11-01T06:58:13.713Z",
                "device_id": null,
                "unique_auth_id": "12345765",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "79",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": "91",
                "email": "stylist1@yopmail.com",
                "first_name": null,
                "full_phone_number": "919998055446",
                "last_name": null,
                "full_name": "stylist1",
                "phone_number": "9998055446",
                "type": "SocialAccount",
                "created_at": "2023-10-04T09:21:40.777Z",
                "updated_at": "2024-02-08T10:14:39.977Z",
                "device_id": null,
                "unique_auth_id": "12345765",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": "nn",
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "80",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "chandni1@gmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "chandni",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-04T09:58:36.026Z",
                "updated_at": "2023-10-04T10:59:00.920Z",
                "device_id": null,
                "unique_auth_id": "12345765",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "83",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "stylist041a0@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "stylist",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-04T12:08:04.414Z",
                "updated_at": "2023-10-04T12:08:04.414Z",
                "device_id": null,
                "unique_auth_id": "12345445",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "84",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "stylist0410@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "stylist",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-04T12:10:50.830Z",
                "updated_at": "2023-10-04T12:10:50.830Z",
                "device_id": null,
                "unique_auth_id": "12345445",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "94",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "sfdfhdller@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "stylist",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-05T12:54:14.238Z",
                "updated_at": "2023-10-05T12:54:14.238Z",
                "device_id": null,
                "unique_auth_id": "12345765",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "74",
            "type": "stylist",
            "attributes": {
                "activated": false,
                "country_code": null,
                "email": "tett1222@yopmail.com",
                "first_name": null,
                "full_phone_number": "91",
                "last_name": null,
                "full_name": "Test QA MINE",
                "phone_number": null,
                "type": null,
                "created_at": "2023-09-21T11:29:24.697Z",
                "updated_at": "2023-10-17T09:00:33.684Z",
                "device_id": null,
                "unique_auth_id": "KMi8nT7RzfR82eHqHg0ktgtt",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "95",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "stylist13@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "stylist1",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-06T07:20:13.726Z",
                "updated_at": "2023-10-06T07:20:13.726Z",
                "device_id": null,
                "unique_auth_id": "12345445",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "92",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "chandnii1@gmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "ch1",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-05T10:45:34.828Z",
                "updated_at": "2023-10-05T11:58:34.730Z",
                "device_id": null,
                "unique_auth_id": "12345445",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        },
        {
            "id": "97",
            "type": "stylist",
            "attributes": {
                "activated": true,
                "country_code": null,
                "email": "1stylist@yopmail.com",
                "first_name": null,
                "full_phone_number": "",
                "last_name": null,
                "full_name": "stylist",
                "phone_number": null,
                "type": "SocialAccount",
                "created_at": "2023-10-06T09:44:42.631Z",
                "updated_at": "2023-10-06T09:44:42.631Z",
                "device_id": null,
                "unique_auth_id": "12345765",
                "driver_status": "offline",
                "seller_status": "Signup",
                "approve_status": "Pending",
                "language": "English",
                "currency": "Dollar",
                "bio": null,
                "profile_picture": null,
                "is_favorite": false
            }
        }
    ],
    "meta": {
        "total_pages": 9,
        "current_page": 1,
        "total_record": 88,
        "prev_page": null,
        "next_page": 2
    }
}

jest.mock("../../../../framework/src/Utilities", () => {
    return {
      getStorageData: jest.fn().mockImplementation((keys) => {
        if (keys === "token") {
          return '181'
        }
       return null;
      }),
      setStorageData: jest.fn(),
    };
  });

const feature = loadFeature("./__tests__/features/customformbuyerfavstylist-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformbuyerfavstylist", ({ given, when, then }) => {
    let CustomformBuyerfavStylistBlock: ShallowWrapper;
    let instance: CustomformBuyerfavStylist;

    given("I am a User loading customformbuyerfavstylist", () => {
        CustomformBuyerfavStylistBlock = shallow(<CustomformBuyerfavStylist {...screenProps} />);
    });

    when("I navigate to the customformbuyerfavstylist", () => {
      instance = CustomformBuyerfavStylistBlock.instance() as CustomformBuyerfavStylist;
    });

    then("customformbuyerfavstylist will load with out errors", () => {
      
        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),FavStylistObject);
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.getBuyerAllFavStylistApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        ); 
    
    });

    then("I can click on back button fav stylist with out errors", () => {
        let buttonComponent = CustomformBuyerfavStylistBlock.findWhere(
          (node) => node.prop("testID") === "btnBackAllFavStylist"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can load vehicle api with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "data": [
                {
                    "failed_login": "Invalid Token"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.buyerFavStylistRemoveApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        ); 
    }) 

    then('I can render vehicle flatlist with out errors',async()=>{
        const flatlist = CustomformBuyerfavStylistBlock.findWhere(
            (node)=>node.prop("testID") === "allStylistFav"
        )
        const item = FavStylistObject.data[0]
        let renderData = flatlist.renderProp("renderItem")({item:item,index:0})
        flatlist.renderProp("ListEmptyComponent")({})
        flatlist.renderProp("ItemSeparatorComponent")({})
        flatlist.renderProp("keyExtractor")({id:'1'})
        let buttonRedirect = renderData.findWhere(
            (node) => node.prop("testID") === "btnStylistRedirection"
          );
        buttonRedirect.simulate("press");

        let buttonComponent = renderData.findWhere(
          (node) => node.prop("testID") === "btnRemoveFav"
        );
      buttonComponent.simulate("press");

        expect(flatlist.exists()).toBe(true)
    })

    then("I can enter text stylist for empty search with out errors", () => {
        let textInputComponent = CustomformBuyerfavStylistBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_stylist"
        );
        textInputComponent.simulate("changeText", "");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent).toBeTruthy();
    });

    then("I can enter text stylist for search with out errors", () => {
        let textInputComponent = CustomformBuyerfavStylistBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_stylist"
        );
        textInputComponent.simulate("changeText", "0000000123");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent).toBeTruthy();
    });

    describe('Header Title Style - AllFavStylist', () => {
      it('should apply correct styles to the header title text', () => {
        const wrapper = shallow(< FlatList navigation={undefined} id={""}/>);
        const textElement = wrapper.findWhere(
          node => node.prop('testID') === 'headerTitle'
        );
    
        expect(textElement.exists()).toBe(true);
    
        const style = textElement.prop('style');
        const finalStyle = Array.isArray(style)
          ? Object.assign({}, ...style)
          : style;
    
        expect(finalStyle.fontSize).toBe(20);
        expect(finalStyle.fontWeight).toBe('600');
        expect(finalStyle.color).toBe('#1A1A1A');
        expect(finalStyle.textAlign).toBe('center');
        expect(finalStyle.marginVertical).toBe(12);
        const mockUri = '/images/profile1.jpg';
        const fullUrl = 'https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe' + mockUri;

      });
    });
    

    then("I can call fav stylist api with errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "errors":  "Data send"
            
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.getBuyerAllFavStylistApiCallId = msgLogInErrorRestAPI.messageId
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
