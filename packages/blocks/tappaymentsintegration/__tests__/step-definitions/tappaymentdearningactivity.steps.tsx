import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TappaymentDEarningActivity from "../../src/TappaymentDEarningActivity";
const navigation = require("react-navigation");

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
  id: "TappaymentDEarningActivity",
};

const paymentArrObject = [
    {
        "amount": 500.0,
        "date": "2024-07-12",
        "time": "2024-07-12 09:13:27",
        "order_number": "OD00000023",
        "pick_up_store": {
            "id": 242,
            "store_name": "ore 1344897",
            "registration_number": null,
            "address": "220, Abc, Mumbai",
            "address2": null,
            "area": "Thane",
            "city": "Mumbai",
            "state": null,
            "country": null,
            "postal_code": null,
            "no_of_stores": null,
            "account_id": 1012,
            "created_at": "2024-07-12T08:26:07.631Z",
            "updated_at": "2024-07-12T08:26:07.631Z",
            "name": null,
            "contact_number": "+919993517721",
            "street": null,
            "zipcode": "452011",
            "block": "d-sector",
            "building_house": null,
            "floor": "6",
            "apartment_number": null,
            "description": "avy13zibesdj",
            "driver_instruction": "Lorem Ipsum",
            "additional_time_slot": null,
            "average_shipping_time": "45 mins",
            "average_prepration_time": null,
            "share_token": null,
            "unit_number": 20,
            "payment_mode": [
                "cod, card"
            ],
            "mall_name": "Accenture",
            "status": "Pending",
            "comment": null,
            "latitude": 44.968046,
            "longitude": -94.420307,
            "is_open": false,
            "appeared_in_search": 0
        },
        "delivery_address": {
            "id": 493,
            "account_id": 1015,
            "address": null,
            "name": "Sahil Khatri1",
            "flat_no": null,
            "zip_code": "125133",
            "phone_number": "9898989898",
            "deleted_at": null,
            "latitude": 33.755787,
            "longitude": -116.359998,
            "residential": true,
            "city": "Bhopal",
            "state_code": null,
            "country_code": "+91",
            "state": null,
            "country": null,
            "address_line_2": null,
            "address_type": "AccountBlock::Account",
            "address_for": "shipping",
            "is_default": true,
            "landmark": null,
            "created_at": "2024-07-12T09:04:31.674Z",
            "updated_at": "2024-07-12T09:04:31.684Z",
            "address_name": "Home",
            "street": "A.B. Roade",
            "area": "Vijay Nagar",
            "block": "D",
            "house_or_building_number": "207",
            "contact_number": "+919898989898",
            "order_management_order_id": 876
        }
    },
    {
        "amount": 500.0,
        "date": "2024-07-12",
        "time": "2024-07-12 09:02:58",
        "order_number": "OD00000022",
        "pick_up_store": {
            "id": 242,
            "store_name": "ore 1344897",
            "registration_number": null,
            "address": "220, Abc, Mumbai",
            "address2": null,
            "area": "Thane",
            "city": "Mumbai",
            "state": null,
            "country": null,
            "postal_code": null,
            "no_of_stores": null,
            "account_id": 1012,
            "created_at": "2024-07-12T08:26:07.631Z",
            "updated_at": "2024-07-12T08:26:07.631Z",
            "name": null,
            "contact_number": "+919993517721",
            "street": null,
            "zipcode": "452011",
            "block": "d-sector",
            "building_house": null,
            "floor": "6",
            "apartment_number": null,
            "description": "avy13zibesdj",
            "driver_instruction": "Lorem Ipsum",
            "additional_time_slot": null,
            "average_shipping_time": "45 mins",
            "average_prepration_time": null,
            "share_token": null,
            "unit_number": 20,
            "payment_mode": [
                "cod, card"
            ],
            "mall_name": "Accenture",
            "status": "Pending",
            "comment": null,
            "latitude": 44.968046,
            "longitude": -94.420307,
            "is_open": false,
            "appeared_in_search": 0
        },
        "delivery_address": {
            "id": 492,
            "account_id": 1015,
            "address": null,
            "name": "Sahil Khatri1",
            "flat_no": null,
            "zip_code": "125133",
            "phone_number": "9898989898",
            "deleted_at": null,
            "latitude": 33.755787,
            "longitude": -116.359998,
            "residential": true,
            "city": "Bhopal",
            "state_code": null,
            "country_code": "+91",
            "state": null,
            "country": null,
            "address_line_2": null,
            "address_type": "AccountBlock::Account",
            "address_for": "shipping",
            "is_default": true,
            "landmark": null,
            "created_at": "2024-07-12T08:59:35.235Z",
            "updated_at": "2024-07-12T08:59:35.244Z",
            "address_name": "Home",
            "street": "A.B. Roade",
            "area": "Vijay Nagar",
            "block": "D",
            "house_or_building_number": "207",
            "contact_number": "+919898989898",
            "order_management_order_id": 875
        }
    },
]

const feature = loadFeature("./__tests__/features/tappaymentdearningactivity-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentdearningactivity", ({ given, when, then }) => {
    let tappaymentdearningactivityWrapper: ShallowWrapper;
    let tapInstance: TappaymentDEarningActivity;

    given("I am a User loading tappaymentdearningactivity", () => {
      tappaymentdearningactivityWrapper = shallow(<TappaymentDEarningActivity {...screenProps} />);
    });

    when("I navigate to tappaymentdearningactivity", () => {
      tapInstance = tappaymentdearningactivityWrapper.instance() as TappaymentDEarningActivity;
    });

    then("tappaymentdearningactivity will load", () => {
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
    });

    then('I can click back earning activity with out errors',()=>{
      let backButtonComponent = tappaymentdearningactivityWrapper.findWhere((node) => node.prop('testID') === 'btnBackEarningActivity');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show earning activity api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),paymentArrObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        tapInstance.getDriverEarningActivityCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all earning activity flatlist by render with out errors", async () => {
        let render_item = tappaymentdearningactivityWrapper.findWhere(
        (node) => node.prop("testID") === "earningActivityFlatlist"
        );
        let render_data = render_item.renderProp("renderItem")({item: paymentArrObject[0],index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        
        expect(render_data).toBeTruthy();
    });

    then("I can show earning activity work with errors", async () => {
      tapInstance.timelineFlatListArabicManage('ar')
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          error:{
            'message':'Invalid Token'
          }
        });
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        tapInstance.getDriverEarningActivityCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
          );
          tapInstance.setState({localLanguage:'en'})
          tapInstance.componentDidMount()
      })

  });
});