import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import LandingPageDriver from "../../src/LandingPageDriver";
import { jest, expect, beforeEach } from "@jest/globals";
import { Platform } from "react-native";
jest.useFakeTimers();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
      if (event === 'willBlur') {
        callback();
      }
    }),
  },
  id: "LandingPageDriver",
};
const feature = loadFeature(
  "./__tests__/features/LandingPageDriver-scenario.feature"
);
const sendMessage = jest.spyOn(runEngine, "sendMessage");
// jest.useFakeTimers();
(global as any).setTimeout = jest.fn((cb:any) => cb());
(global as any).setInterval = jest.fn((cb:any) => cb());
jest.spyOn(global, 'clearTimeout');
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to LandingPageDriver", ({ given, when, then }) => {
    let LandingPageDriverBlock: ShallowWrapper;
    let instance: LandingPageDriver;

    given("I am a User loading LandingPageDriver", () => {
      LandingPageDriverBlock = shallow(<LandingPageDriver {...screenProps} />);
    });

    when("I navigate to the LandingPageDriver", () => {
      instance = LandingPageDriverBlock.instance() as LandingPageDriver;
    });

    then("LandingPageDriver will load with out errors", () => {
      Platform.OS="ios"
      let redirectPage = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "redirectPage"
      );
      redirectPage.simulate("press");
      let buttonComponent5 = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "redirectPage2"
      );
      buttonComponent5.simulate("press");
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
    });

    then("I can change status online offile with out errors", async() => {
      jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
      await instance.componentDidMount()
      Platform.OS="android"
      instance.handleOrderInfo1()
      jest.useFakeTimers();
      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage(sessionMessage.messageId, sessionMessage);
      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {"data": {"id": "491","type": "near_by_seller_order","attributes": {"id": 491,"status": "processed","accept_order_upload_time": null,"driver_id": null,"driver_order_status": "in_progress","order_number": "OD00000630","order_placed_at": "2024-07-05T10:30:36.418Z","business_information": {"id": 130,"store_name": "Pentaloons 102","registration_number": null,"address": "PRH5+M42, Depalpur Rd, Devi Ahillyabai Holkar Airport Area, Indore, Madhya Pradesh 452005, India","address2": null,"area": "Ksksjw","city": "Hshs","state": null,"country": null,"postal_code": null,"no_of_stores": null,"account_id": 501,"created_at": "2024-03-15T07:47:59.778Z","updated_at": "2024-07-04T07:27:17.108Z","name": null,"contact_number": "+96522145632","street": null,"zipcode": "64964","block": "ER","building_house": null,"floor": "5th","apartment_number": null,"description": "HS jwjs djidd jwod dkrkiyoy qqtte ncncnc djhfkd ajwiow ddjwoos didesj","driver_instruction": "Huisos","store_operating_hours": {"monday": {"open": "08:00","close": "13:19","is_open": true},"tuesday": {"open": "08:45","close": "13:17","is_open": true},"wednesday": {"open": "09:30","close": "13:17","is_open": true},"thursday": {"open": "09:50","close": "13:17","is_open": true},"friday": {"open": "10:30","close": "13:17","is_open": true},"saturday": {"open": "11:30","close": "13:17","is_open": true},"sunday": {"open": "15:00","close": "22:11","is_open": true}},"additional_time_slot": null,"average_shipping_time": "60 mins","average_prepration_time": null,"share_token": null,"unit_number": 0,"payment_mode": ["cod,UPI"],"mall_name": "UK'S Mall","status": "Approved","comment": null,"latitude": 22.7287381,"longitude": 75.8075993,"is_open": true},"order_item_count": 1,"seller_name": "myntra new","seller_phone_number": "96522659696","order_status": "confirmed","customer_information": {"id": 906,"first_name": "buyer","last_name": "tim","full_phone_number": "96522114400","country_code": 965,"phone_number": 22114400,"email": "buyertim@yopmail.com","activated": true,"device_id": null,"unique_auth_id": "5Ik7Q1Ee0FAuJop6lQHwqQtt","password_digest": "$2a$12$d08Uv.HxMu6Hs/4ClPJDqOPgWF0g95VMz1kU2w6zPJMYOT5dCxrZy","created_at": "2024-06-28T04:22:36.523Z","updated_at": "2024-06-28T04:39:50.553Z","user_name": null,"platform": null,"user_type": null,"app_language_id": null,"last_visit_at": null,"is_blacklisted": false,"suspend_until": null,"status": "regular","gender": null,"date_of_birth": null,"age": null,"stripe_id": null,"stripe_subscription_id": null,"stripe_subscription_date": null,"role": "buyer","full_name": "buyer tim","is_verified": null,"share_token": null,"approve_status": "Pending","seller_status": "Signup","notification": {"push_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true},"email_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true}},"customer_id": "cus_TS07A3620240739s6FQ2806558","wallet_amount": "0.0","withdrawable_amount": "0.0","latitude": null,"longitude": null,"driver_status": "offline","language": "English","currency": "Dollar","driver_redirect_flag": null,"stylist_redirect_flag": null},"delivery_address": {"id": 355,"account_id": 906,"address": null,"name": "buyertim","flat_no": null,"zip_code": "380008","phone_number": "22114400","deleted_at": null,"latitude": 22.6410167,"longitude": 75.8889769,"residential": true,"city": "ahemdabad ","state_code": null,"country_code": "+965","state": null,"country": null,"address_line_2": null,"address_type": "AccountBlock::Account","address_for": "shipping","is_default": true,"landmark": null,"created_at": "2024-07-05T10:29:48.549Z","updated_at": "2024-07-05T10:29:48.558Z","address_name": "Home","street": "Tejaji Nagar, Mirjapur, Indore, Madhya Pradesh 452020, India","area": "new","block": "A","house_or_building_number": "12","contact_number": "+96522114400","order_management_order_id": 724}}}}},
      );
     instance.getOnlineOfflineId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);
      let buttonComponent = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "onlineOfflineStatusSwitch"
      );
      buttonComponent.prop("onValueChange")(true);

      expect(buttonComponent.exists()).toBe(true);
      Platform.OS='android'
      await instance.componentDidMount()
    });

    then("I can load google map with out errors", () => {
     
      let buttonComponent = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "onlineOfflineStatusSwitch"
      );
      buttonComponent.prop("onValueChange");
      expect(buttonComponent.exists()).toBe(true);
      const tokenMsgs: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsgs.addData(getName(MessageEnum.LoginOptionsNavigationDataMessage),null);
      runEngine.sendMessage("Unit Test", tokenMsgs);
      const countryMessages = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessages.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessages.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {"data": {"id": "491","type": "near_by_seller_order","attributes": {"id": 491,"status": "processed","accept_order_upload_time": null,"driver_id": null,"driver_order_status": "in_progress","order_number": "OD00000630","order_placed_at": "2024-07-05T10:30:36.418Z","business_information": {"id": 130,"store_name": "Pentaloons 102","registration_number": null,"address": "PRH5+M42, Depalpur Rd, Devi Ahillyabai Holkar Airport Area, Indore, Madhya Pradesh 452005, India","address2": null,"area": "Ksksjw","city": "Hshs","state": null,"country": null,"postal_code": null,"no_of_stores": null,"account_id": 501,"created_at": "2024-03-15T07:47:59.778Z","updated_at": "2024-07-04T07:27:17.108Z","name": null,"contact_number": "+96522145632","street": null,"zipcode": "64964","block": "ER","building_house": null,"floor": "5th","apartment_number": null,"description": "HS jwjs djidd jwod dkrkiyoy qqtte ncncnc djhfkd ajwiow ddjwoos didesj","driver_instruction": "Huisos","store_operating_hours": {"monday": {"open": "08:00","close": "13:19","is_open": true},"tuesday": {"open": "08:45","close": "13:17","is_open": true},"wednesday": {"open": "09:30","close": "13:17","is_open": true},"thursday": {"open": "09:50","close": "13:17","is_open": true},"friday": {"open": "10:30","close": "13:17","is_open": true},"saturday": {"open": "11:30","close": "13:17","is_open": true},"sunday": {"open": "15:00","close": "22:11","is_open": true}},"additional_time_slot": null,"average_shipping_time": "60 mins","average_prepration_time": null,"share_token": null,"unit_number": 0,"payment_mode": ["cod,UPI"],"mall_name": "UK'S Mall","status": "Approved","comment": null,"latitude": 22.7287381,"longitude": 75.8075993,"is_open": true},"order_item_count": 1,"seller_name": "myntra new","seller_phone_number": "96522659696","order_status": "confirmed","customer_information": {"id": 906,"first_name": "buyer","last_name": "tim","full_phone_number": "96522114400","country_code": 965,"phone_number": 22114400,"email": "buyertim@yopmail.com","activated": true,"device_id": null,"unique_auth_id": "5Ik7Q1Ee0FAuJop6lQHwqQtt","password_digest": "$2a$12$d08Uv.HxMu6Hs/4ClPJDqOPgWF0g95VMz1kU2w6zPJMYOT5dCxrZy","created_at": "2024-06-28T04:22:36.523Z","updated_at": "2024-06-28T04:39:50.553Z","user_name": null,"platform": null,"user_type": null,"app_language_id": null,"last_visit_at": null,"is_blacklisted": false,"suspend_until": null,"status": "regular","gender": null,"date_of_birth": null,"age": null,"stripe_id": null,"stripe_subscription_id": null,"stripe_subscription_date": null,"role": "buyer","full_name": "buyer tim","is_verified": null,"share_token": null,"approve_status": "Pending","seller_status": "Signup","notification": {"push_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true},"email_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true}},"customer_id": "cus_TS07A3620240739s6FQ2806558","wallet_amount": "0.0","withdrawable_amount": "0.0","latitude": null,"longitude": null,"driver_status": "offline","language": "English","currency": "Dollar","driver_redirect_flag": null,"stylist_redirect_flag": null},"delivery_address": {"id": 355,"account_id": 906,"address": null,"name": "buyertim","flat_no": null,"zip_code": "380008","phone_number": "22114400","deleted_at": null,"latitude": 22.6410167,"longitude": 75.8889769,"residential": true,"city": "ahemdabad ","state_code": null,"country_code": "+965","state": null,"country": null,"address_line_2": null,"address_type": "AccountBlock::Account","address_for": "shipping","is_default": true,"landmark": null,"created_at": "2024-07-05T10:29:48.549Z","updated_at": "2024-07-05T10:29:48.558Z","address_name": "Home","street": "Tejaji Nagar, Mirjapur, Indore, Madhya Pradesh 452020, India","area": "new","block": "A","house_or_building_number": "12","contact_number": "+96522114400","order_management_order_id": 724}}}}},
      );
     instance.getOnlineOfflineId =
     countryMessages.messageId;
      runEngine.sendMessage(countryMessages.messageId, countryMessages);
      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {"data": {"id": "491","type": "near_by_seller_order","attributes": {"id": 491,"status": "processed","accept_order_upload_time": null,"driver_id": null,"driver_order_status": "in_progress","order_number": "OD00000630","order_placed_at": "2024-07-05T10:30:36.418Z","business_information": {"id": 130,"store_name": "Pentaloons 102","registration_number": null,"address": "PRH5+M42, Depalpur Rd, Devi Ahillyabai Holkar Airport Area, Indore, Madhya Pradesh 452005, India","address2": null,"area": "Ksksjw","city": "Hshs","state": null,"country": null,"postal_code": null,"no_of_stores": null,"account_id": 501,"created_at": "2024-03-15T07:47:59.778Z","updated_at": "2024-07-04T07:27:17.108Z","name": null,"contact_number": "+96522145632","street": null,"zipcode": "64964","block": "ER","building_house": null,"floor": "5th","apartment_number": null,"description": "HS jwjs djidd jwod dkrkiyoy qqtte ncncnc djhfkd ajwiow ddjwoos didesj","driver_instruction": "Huisos","store_operating_hours": {"monday": {"open": "08:00","close": "13:19","is_open": true},"tuesday": {"open": "08:45","close": "13:17","is_open": true},"wednesday": {"open": "09:30","close": "13:17","is_open": true},"thursday": {"open": "09:50","close": "13:17","is_open": true},"friday": {"open": "10:30","close": "13:17","is_open": true},"saturday": {"open": "11:30","close": "13:17","is_open": true},"sunday": {"open": "15:00","close": "22:11","is_open": true}},"additional_time_slot": null,"average_shipping_time": "60 mins","average_prepration_time": null,"share_token": null,"unit_number": 0,"payment_mode": ["cod,UPI"],"mall_name": "UK'S Mall","status": "Approved","comment": null,"latitude": 22.7287381,"longitude": 75.8075993,"is_open": true},"order_item_count": 1,"seller_name": "myntra new","seller_phone_number": "96522659696","order_status": "confirmed","customer_information": {"id": 906,"first_name": "buyer","last_name": "tim","full_phone_number": "96522114400","country_code": 965,"phone_number": 22114400,"email": "buyertim@yopmail.com","activated": true,"device_id": null,"unique_auth_id": "5Ik7Q1Ee0FAuJop6lQHwqQtt","password_digest": "$2a$12$d08Uv.HxMu6Hs/4ClPJDqOPgWF0g95VMz1kU2w6zPJMYOT5dCxrZy","created_at": "2024-06-28T04:22:36.523Z","updated_at": "2024-06-28T04:39:50.553Z","user_name": null,"platform": null,"user_type": null,"app_language_id": null,"last_visit_at": null,"is_blacklisted": false,"suspend_until": null,"status": "regular","gender": null,"date_of_birth": null,"age": null,"stripe_id": null,"stripe_subscription_id": null,"stripe_subscription_date": null,"role": "buyer","full_name": "buyer tim","is_verified": null,"share_token": null,"approve_status": "Pending","seller_status": "Signup","notification": {"push_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true},"email_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true}},"customer_id": "cus_TS07A3620240739s6FQ2806558","wallet_amount": "0.0","withdrawable_amount": "0.0","latitude": null,"longitude": null,"driver_status": "offline","language": "English","currency": "Dollar","driver_redirect_flag": null,"stylist_redirect_flag": null},"delivery_address": {"id": 355,"account_id": 906,"address": null,"name": "buyertim","flat_no": null,"zip_code": "380008","phone_number": "22114400","deleted_at": null,"latitude": 22.6410167,"longitude": 75.8889769,"residential": true,"city": "ahemdabad ","state_code": null,"country_code": "+965","state": null,"country": null,"address_line_2": null,"address_type": "AccountBlock::Account","address_for": "shipping","is_default": true,"landmark": null,"created_at": "2024-07-05T10:29:48.549Z","updated_at": "2024-07-05T10:29:48.558Z","address_name": "Home","street": "Tejaji Nagar, Mirjapur, Indore, Madhya Pradesh 452020, India","area": "new","block": "A","house_or_building_number": "12","contact_number": "+96522114400","order_management_order_id": 724}}}}},
      );
     instance.getNewOrderId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);
      const countryMessagess = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessagess.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessagess.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {"data": {"id": "491","type": "near_by_seller_order","attributes": {"id": 491,"status": "processed","accept_order_upload_time": null,"driver_id": '10',"driver_order_status": "in_progress","order_number": "OD00000630","order_placed_at": "2024-07-05T10:30:36.418Z","business_information": {"id": 130,"store_name": "Pentaloons 102","registration_number": null,"address": "PRH5+M42, Depalpur Rd, Devi Ahillyabai Holkar Airport Area, Indore, Madhya Pradesh 452005, India","address2": null,"area": "Ksksjw","city": "Hshs","state": null,"country": null,"postal_code": null,"no_of_stores": null,"account_id": 501,"created_at": "2024-03-15T07:47:59.778Z","updated_at": "2024-07-04T07:27:17.108Z","name": null,"contact_number": "+96522145632","street": null,"zipcode": "64964","block": "ER","building_house": null,"floor": "5th","apartment_number": null,"description": "HS jwjs djidd jwod dkrkiyoy qqtte ncncnc djhfkd ajwiow ddjwoos didesj","driver_instruction": "Huisos","store_operating_hours": {"monday": {"open": "08:00","close": "13:19","is_open": true},"tuesday": {"open": "08:45","close": "13:17","is_open": true},"wednesday": {"open": "09:30","close": "13:17","is_open": true},"thursday": {"open": "09:50","close": "13:17","is_open": true},"friday": {"open": "10:30","close": "13:17","is_open": true},"saturday": {"open": "11:30","close": "13:17","is_open": true},"sunday": {"open": "15:00","close": "22:11","is_open": true}},"additional_time_slot": null,"average_shipping_time": "60 mins","average_prepration_time": null,"share_token": null,"unit_number": 0,"payment_mode": ["cod,UPI"],"mall_name": "UK'S Mall","status": "Approved","comment": null,"latitude": 22.7287381,"longitude": 75.8075993,"is_open": true},"order_item_count": 1,"seller_name": "myntra new","seller_phone_number": "96522659696","order_status": "confirmed","customer_information": {"id": 906,"first_name": "buyer","last_name": "tim","full_phone_number": "96522114400","country_code": 965,"phone_number": 22114400,"email": "buyertim@yopmail.com","activated": true,"device_id": null,"unique_auth_id": "5Ik7Q1Ee0FAuJop6lQHwqQtt","password_digest": "$2a$12$d08Uv.HxMu6Hs/4ClPJDqOPgWF0g95VMz1kU2w6zPJMYOT5dCxrZy","created_at": "2024-06-28T04:22:36.523Z","updated_at": "2024-06-28T04:39:50.553Z","user_name": null,"platform": null,"user_type": null,"app_language_id": null,"last_visit_at": null,"is_blacklisted": false,"suspend_until": null,"status": "regular","gender": null,"date_of_birth": null,"age": null,"stripe_id": null,"stripe_subscription_id": null,"stripe_subscription_date": null,"role": "buyer","full_name": "buyer tim","is_verified": null,"share_token": null,"approve_status": "Pending","seller_status": "Signup","notification": {"push_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true},"email_notification": {"order_invoices": true,"order_confirmations": true,"delivery_confirmation": true,"reviews_and_feedback_requests": true,"refund_or_payment_complete": true,"marketing_emails": true,"product_stock_updates": true}},"customer_id": "cus_TS07A3620240739s6FQ2806558","wallet_amount": "0.0","withdrawable_amount": "0.0","latitude": null,"longitude": null,"driver_status": "offline","language": "English","currency": "Dollar","driver_redirect_flag": null,"stylist_redirect_flag": null},"delivery_address": {"id": 355,"account_id": 906,"address": null,"name": "buyertim","flat_no": null,"zip_code": "380008","phone_number": "22114400","deleted_at": null,"latitude": 22.6410167,"longitude": 75.8889769,"residential": true,"city": "ahemdabad ","state_code": null,"country_code": "+965","state": null,"country": null,"address_line_2": null,"address_type": "AccountBlock::Account","address_for": "shipping","is_default": true,"landmark": null,"created_at": "2024-07-05T10:29:48.549Z","updated_at": "2024-07-05T10:29:48.558Z","address_name": "Home","street": "Tejaji Nagar, Mirjapur, Indore, Madhya Pradesh 452020, India","area": "new","block": "A","house_or_building_number": "12","contact_number": "+96522114400","order_management_order_id": 724}}}}},
      );
     instance.getNewOrderId =
     countryMessagess.messageId;
      runEngine.sendMessage(countryMessagess.messageId, countryMessagess);
      LandingPageDriverBlock.setState({ orderOngoing: false });
      let mapComponent = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "mapViewShowForm"
      );
      expect(mapComponent.exists()).toBe(false);

      LandingPageDriverBlock.setState({ orderOngoing: true });
      let mapComponent1 = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "mapViewShowForm1"
      );
      let render_data1 = mapComponent1.renderProp("onMapReady")({});
      expect(render_data1.exists()).toBe(true);
    });

    then("I can load google map marker with out errors", () => {
      LandingPageDriverBlock.setState({driverOnlineOffline:true})
      let buttonComponent5 = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "orderId3"
      );
      buttonComponent5.simulate("press");

      let mapComponent = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "googleMapMarker"
      );
      expect(mapComponent.exists()).toBe(true);
      let buttonComponent = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "onlineOfflineStatusSwitch"
      );
      buttonComponent.props().onValueChange();
      let buttonComponents = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "onlineOfflineStatusSwitch"
      );
      buttonComponents.props().onValueChange();
     
      let buttonComponentss = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "onlineOfflineStatusSwitch"
      );
      buttonComponentss.props().onValueChange();
    
    });
  });


  test("User navigates to LandingPageDriver navigation issue", ({ given, when, then }) => {
    let LandingPageDriverBlock: ShallowWrapper;
    let instance: LandingPageDriver;

    given("I am a User loading LandingPageDriver navigation issue", () => {
      LandingPageDriverBlock = shallow(<LandingPageDriver {...screenProps} />);
    });

    when("I navigate to the LandingPageDriver navigation issue", () => {
      instance = LandingPageDriverBlock.instance() as LandingPageDriver;
    });

    then("I can load google map marker with out errors navigation issue", () => {
      Platform.OS="ios"
      let redirectPage = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "redirectPage"
      );
      redirectPage.simulate("press");
      let buttonComponent5 = LandingPageDriverBlock.findWhere(
        (node) => node.prop("testID") === "redirectPage2"
      );
      buttonComponent5.simulate("press");
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
    });
  });
});
