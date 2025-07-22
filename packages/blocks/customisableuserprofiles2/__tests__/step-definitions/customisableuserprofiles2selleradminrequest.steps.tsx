import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import Customisableuserprofiles2selleradminrequest from "../../src/Customisableuserprofiles2selleradminrequest"
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
    id: "Customisableuserprofiles2selleradminrequest"
}

const adminRequestArrObject = {
    data:[
        {
            "id": "0",
            "type": "bussiness",
            "attributes": {
                "store_name": "Hiren psaa",
                "description": "Drdtr",
                "area": "S",
                "block": "Es",
                "mall_name": "R",
                "floor": "Ret",
                "unit_number": 35,
                "city": "435",
                "zipcode": "353423",
                "driver_instruction": "454534",
                "average_shipping_time": "20 mins",
                "payment_mode": [
                    "UPI,COD"
                ],
                "store_operating_hours": {
                    "monday": {
                        "open": "16:13",
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
                        "open": "16:14",
                        "close": "16:14",
                        "is_open": true
                    },
                    "sunday": {
                        "open": "16:14",
                        "close": "16:14",
                        "is_open": true
                    }
                },
                "status": "Pending",
                "latitude": 29.378586,
                "longitude": 47.990341,
                "image": "profile.jpg",
                "email": "seller@mailinator.com",
                "contact_number": {
                    "country_code": "+91",
                    "phone_number": "8962687619"
                },
                "expected_delivery_time": "2024-02-12T04:55:40.645+00:00"
            }
        },
        {
            "id": "57",
            "type": "bussiness",
            "attributes": {
                "store_name": "Yr",
                "description": "Bdd",
                "area": "Heh",
                "block": "Ndnd",
                "mall_name": "Bdn",
                "floor": "Hdh",
                "unit_number": 0,
                "city": "Bdn",
                "zipcode": "949588",
                "driver_instruction": "Hxbx",
                "average_shipping_time": "10 mins",
                "payment_mode": [
                    "UPI,COD"
                ],
                "store_operating_hours": {
                    "monday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "tuesday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "wednesday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "thursday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "friday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "saturday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    },
                    "sunday": {
                        "open": "20:58",
                        "close": "20:58",
                        "is_open": true
                    }
                },
                "status": "Pending",
                "latitude": 70.3851611,
                "longitude": 25.3014458,
                "image": null,
                "email": "seller@mailinator.com",
                "contact_number": {
                    "country_code": "+91",
                    "phone_number": "8962678169"
                },
                "expected_delivery_time": "2024-02-12T04:45:40.654+00:00"
            }
        },
    ]
}

const feature = loadFeature("./__tests__/features/customisableuserprofiles2selleradminrequest-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to customisableuserprofiles2selleradminrequest", ({ given, when, then }) => {
      let Customisableuserprofiles2selleradminrequestBlock: ShallowWrapper;
      let instance: Customisableuserprofiles2selleradminrequest;
  
      given("I am a User loading customisableuserprofiles2selleradminrequest", () => {
        Customisableuserprofiles2selleradminrequestBlock = shallow(<Customisableuserprofiles2selleradminrequest {...screenProps} />);
      });
  
      when("I navigate to the customisableuserprofiles2selleradminrequest", () => {
        instance = Customisableuserprofiles2selleradminrequestBlock.instance() as Customisableuserprofiles2selleradminrequest;
      });
  
      then("customisableuserprofiles2selleradminrequest will load with out errors", () => {
        expect(Customisableuserprofiles2selleradminrequestBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can click back admin request with out errors", () => {
        let buttonComponent = Customisableuserprofiles2selleradminrequestBlock.findWhere(
          (node) => node.prop("testID") === "btnBackAdminRequest"
        );
        buttonComponent.simulate("press");
      });

      then("I should render show admin request api with out errors", () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        adminRequestArrObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getAdminRequestApiCallID = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
      
      });

      then('I should render admin request data in flatlist and pending status with out errors',()=>{
        let render_item = Customisableuserprofiles2selleradminrequestBlock.findWhere(node=>node.prop("testID") === 'adminRequestFlatData')
        let render_data = render_item.renderProp("renderItem")({item:adminRequestArrObject.data[0],index:0})
        expect(render_data).toBeTruthy();
      }) 

      then('I should render admin request data in flatlist and approved status with out errors',()=>{
        let dataSet = adminRequestArrObject.data[1]
        dataSet.attributes.status = 'Approved'
        let render_item = Customisableuserprofiles2selleradminrequestBlock.findWhere(node=>node.prop("testID") === 'adminRequestFlatData')
        let render_data = render_item.renderProp("renderItem")({item:dataSet,index:0})
        expect(render_data).toBeTruthy();
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("ListEmptyComponent")({})
      }) 

      then("I should render show admin request api with errors", () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        {
            'errors':'Invalid Token'
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getAdminRequestApiCallID = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
      
      });

      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(Customisableuserprofiles2selleradminrequestBlock).toBeTruthy();
      });
    });
  });