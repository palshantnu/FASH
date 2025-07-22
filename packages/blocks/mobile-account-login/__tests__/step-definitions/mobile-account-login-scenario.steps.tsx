import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, beforeEach, expect } from '@jest/globals';

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MobileAccountLoginBlock from "../../src/MobileAccountLoginBlock";
import storage from "../../../../framework/src/StorageProvider";
import * as utils from "../../../../framework/src/Utilities";
import { Platform } from "react-native";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn()
  },
  id: "MobileAccountLoginBlock"
};

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
  },
  {
    numeric_code: "+965",
    country_full_name: "Kuwait",
    country_code: "KW",
    country_flag: "🇰🇼"
  }
];

const feature = loadFeature(
  "./__tests__/features/mobile-account-login-scenario.feature"
);

const MobileAccountLoginBlockData = <MobileAccountLoginBlock {...screenProps} />
const map = new Map();

defineFeature(feature, test => {
  beforeEach(() => {
    // jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.mock("../../../../framework/src/StorageProvider");
    storage.get = (k: string) => map.get(k);
    jest.spyOn(utils,'setStorageData').mockImplementation( async () => undefined)
    map.set("FA_LOGIN_MODE", "Buyer");
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementationOnce(async () => "0")
      .mockImplementationOnce(async () => "0")
      .mockImplementation(async () => "1");
  });

  test("User navigates to Mobile Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let mobileInstance: MobileAccountLoginBlock;

    given("I am a User attempting to Log In with a Mobile Phone", () => {
      Platform.OS = 'ios'
      mobileAccountLogInWrapper = shallow(
        <MobileAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I navigate to the Log In Screen", () => {
      mobileInstance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock;
    });

    then("I can select Log In with Soical Media Account", () => {
      let btnSocialLogin = mobileAccountLogInWrapper.findWhere(
        node => node.prop("testID") === "btnSignupRedirection"
      );
      btnSocialLogin.simulate("press");
      mobileInstance.goToSocialLogin();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    then("I can select Log In with Email Account", () => {
      let btnEmailLogin = mobileAccountLogInWrapper.findWhere(
        node => node.prop("testID") === "btnEmailLogin"
      );
      btnEmailLogin.simulate("press");
      mobileInstance.goToEmailLogin();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    then("I can select the Log In button with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        node => node.prop("testID") === "btnMobileLogIn"
      );
      buttonComponent.simulate("press");
    });

    then("I can update country code", () => {
      const getCountryCodeMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCountryCodeMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCountryCodeMsg);
      getCountryCodeMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyCountryList
      );

      getCountryCodeMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCountryCodeMsg.messageId);
      mobileInstance.countryCodeApiCallId = getCountryCodeMsg.messageId
      runEngine.sendMessage("Unit Test", getCountryCodeMsg);

      const { getByTestId, container } = render(MobileAccountLoginBlockData);
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
    });

    then("I can enter a phone number with out errors", () => {
      const { getByTestId } = render(MobileAccountLoginBlockData);
      const textInput = getByTestId("txtInputPhoneNumber");
      fireEvent(textInput, "onChangeText", "3105551111");
      expect(textInput.props.value).toBe("3105551111");
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        node => node.prop("testID") === "BackgroundTouch"
      );
      buttonComponent.simulate("press");
    });

    then('I can select the google login button with out errors', async () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'googleLoginPhoneBtn');
      // Error Case 1
      buttonComponent.simulate('press');
      // Error Case 2
      buttonComponent.simulate('press');
      // Error Case 3
      buttonComponent.simulate('press');
      // Error Case 4
      buttonComponent.simulate('press');
      // Success
      buttonComponent.simulate('press');
    });

    then('I can select the google login button api calling with errors', () => {

      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": [
            {
              "failed_login": "Login Failed"
            }
          ]
        });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      mobileInstance.socialLoginPhoneApiCallId = msgLogInErrorRestAPI.messageId
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    });

    then('I can select the google login button api calling with out errors', () => {

      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "442",
            "type": "social_account",
            "attributes": {
              "first_name": null,
              "last_name": null,
              "full_phone_number": null,
              "country_code": null,
              "phone_number": null,
              "email": "himanshu.gupta@protonshub.in",
              "activated": false
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDQyLCJleHAiOjE3MDUxMzkwNzl9.ii1TzDe4Cfwy-QMC0ESw4o6UM2gj7VzfI6P-CAh6zvvGBhQnPV19y5y66bMJXxA1O4KGEHYjQwssCFlIjZrXUQ"
          }
        });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      mobileInstance.socialLoginPhoneApiCallId = msgLogInErrorRestAPI.messageId
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    });

    then('I can select the google login button api calling and redirection with out errors', () => {

      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "account": {
            "id": "442",
            "type": "social_account",
            "attributes": {
              "first_name": null,
              "last_name": null,
              "full_phone_number": null,
              "country_code": null,
              "phone_number": null,
              "email": "himanshu.gupta@protonshub.in",
              "activated": false
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDQyLCJleHAiOjE3MDUxMzkwNzl9.ii1TzDe4Cfwy-QMC0ESw4o6UM2gj7VzfI6P-CAh6zvvGBhQnPV19y5y66bMJXxA1O4KGEHYjQwssCFlIjZrXUQ"
          }
        });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      mobileInstance.socialLoginPhoneApiCallId = msgLogInErrorRestAPI.messageId
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    });

    then('I can select the google login button api calling and redirection with out errors checkout', () => {
      mobileInstance.setState({guestRedirectKeyMobile:''})
      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "account": {
            "id": "442",
            "type": "social_account",
            "attributes": {
              "first_name": null,
              "last_name": null,
              "full_phone_number": null,
              "country_code": null,
              "phone_number": null,
              "email": "himanshu.gupta@protonshub.in",
              "activated": false
            }
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDQyLCJleHAiOjE3MDUxMzkwNzl9.ii1TzDe4Cfwy-QMC0ESw4o6UM2gj7VzfI6P-CAh6zvvGBhQnPV19y5y66bMJXxA1O4KGEHYjQwssCFlIjZrXUQ"
          }
        });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      mobileInstance.socialLoginPhoneApiCallId = msgLogInErrorRestAPI.messageId
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    });

    then('I can select the apple login button with out errors', async() => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnAppleLoginMobile');
      buttonComponent.simulate('press');
      expect(buttonComponent.exists()).toBe(true)
      let localObject = {
          fullName:{
              familyName:'gupta',
              givenName:'himanshu'
          },
          email:'test@apple.com',
          identityToken:'123345gfghfghgh'
      }
      mobileInstance.appleLoginPhoneApi(localObject)
    });

    then("I can leave the screen with out errors", () => {
        let localObject = {
          fullName:{
              familyName:null,
              givenName:'himanshu'
          },
          email:'test@apple.com',
          identityToken:'123345gfghfghgh'
      }
      mobileInstance.appleLoginPhoneApi(localObject)
      mobileInstance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });
  });

  test("Empty Mobile Phone Number", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: MobileAccountLoginBlock;

    given("I am a User attempting to Log In with a Mobile Phone", () => {
      Platform.OS = 'android'
      mobileAccountLogInWrapper = shallow(
        <MobileAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with an empty Mobile Phone Number", () => {
      instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock;
      instance.setState({ countryCodeSelected: "+91", mobileNo: "" });
    });

    then("Log In Should Fail", () => {
      expect(instance.doMobileLogIn()).toBe(false);
    });
  });

  test("Mobile Phone Number", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: MobileAccountLoginBlock;

    given(
      "I am a Registed User attempting to Log In with a Mobile Phone",
      () => {
        mobileAccountLogInWrapper = shallow(
          <MobileAccountLoginBlock {...screenProps} />
        );
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );

    when("I Log In with Mobile Phone Number, and have a Country Code", () => {
      instance = mobileAccountLogInWrapper.instance() as MobileAccountLoginBlock;
      instance.setState({ countryCodeSelected: "+91", mobileNo: "3105551212" });
    });

    then("Log In Should Succeed", () => {
      let empty: any;
      instance.saveLoggedInUserDataPhone(empty);
      expect(instance.doMobileLogIn()).toBe(true);
      instance.setState({ loginProvider : "apple" });
      instance.handleSucceessMsgMobile();
    });

    then("RestAPI will return token", () => {
      const loginResponseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      loginResponseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginResponseMessage);
      loginResponseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "927",
            "type": "sms_otp"
          },
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6OTI3LCJleHAiOjE3MDcxOTk3MTMsInR5cGUiOiJBY2NvdW50QmxvY2s6OlNtc090cCIsImFjY291bnRfaWQiOjQyM30.i5P24CJT8kZUU6NATZ9pKOQyjUmx5toom1lQXXRq1sy-DfyljjPPM4CH28YNKpJUPubUGKVNA8nFBNvWHkkE_A",
            "account": {
              "id": 423,
              "first_name": null,
              "last_name": null,
              "full_phone_number": "918989141516",
              "country_code": 91,
              "phone_number": 8989141516,
              "email": "setia.shirley@yopmail.com",
              "activated": true,
              "device_id": null,
              "unique_auth_id": "6Oyp8heMqMaevmxyFL9LcAtt",
              "password_digest": "$2a$12$f8WWjN47tbVxm0H1kwMQZOoglm8lO1D.SAfFA1AOuW9T4Hw6JPZZC",
              "created_at": "2024-01-09T07:05:49.172Z",
              "updated_at": "2024-01-30T04:57:22.343Z",
              "user_name": null,
              "platform": null,
              "user_type": null,
              "app_language_id": null,
              "last_visit_at": null,
              "is_blacklisted": false,
              "suspend_until": null,
              "status": "regular",
              "gender": null,
              "date_of_birth": null,
              "age": null,
              "stripe_id": null,
              "stripe_subscription_id": null,
              "stripe_subscription_date": null,
              "role": "buyer",
              "full_name": "Shirley Setia",
              "is_verified": null,
              "share_token": null,
              "approve_status": "Pending",
              "seller_status": "Signup"
            }
          }
        }
      );

      loginResponseMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginResponseMessage.messageId);
      instance.apiPhoneLoginCallId = loginResponseMessage.messageId
      runEngine.sendMessage("Unit Test", loginResponseMessage);

      const loginErrorMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      loginErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginErrorMessage);
      loginErrorMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": [
            {
              "failed_login": "Login Failed"
            }
          ]
        }
      );

      loginErrorMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginErrorMessage.messageId);
      instance.apiPhoneLoginCallId = loginErrorMessage.messageId
      runEngine.sendMessage("Unit Test", loginErrorMessage);

      storage.set("FA_LOGIN_MODE", "Seller");
      const loginWithDifferentMode = new Message(getName(MessageEnum.RestAPIResponceMessage))
      loginWithDifferentMode.addData(getName(MessageEnum.RestAPIResponceDataMessage), loginWithDifferentMode);
      loginWithDifferentMode.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "meta": {
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6OTI3LCJleHAiOjE3MDcxOTk3MTMsInR5cGUiOiJBY2NvdW50QmxvY2s6OlNtc090cCIsImFjY291bnRfaWQiOjQyM30.i5P24CJT8kZUU6NATZ9pKOQyjUmx5toom1lQXXRq1sy-DfyljjPPM4CH28YNKpJUPubUGKVNA8nFBNvWHkkE_A",
            "account": {
              "role": "buyer",
            }
          }
        }
      );
      instance.apiPhoneLoginCallId = loginWithDifferentMode.messageId;
      runEngine.sendMessage("Unit Test", loginWithDifferentMode)
    });
  });
});
