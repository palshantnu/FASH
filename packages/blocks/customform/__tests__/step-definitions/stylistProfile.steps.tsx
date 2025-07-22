import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, beforeEach, expect } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import StylistProfile from "../../src/StylistProfile";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    // goBack: jest.fn(),

    addListener: jest.fn((event: string, callback: (payload?: any) => void) => {
      if (["willFocus", "didFocus", "willBlur", "didBlur"].includes(event)) {
        callback();
      }
    }),
  },
  id: "Analytics",
};
const feature = loadFeature(
  "./__tests__/features/stylistProfile-scenario.feature"
);
const sendMessage = jest.spyOn(runEngine, "sendMessage");

const res = {
  data: [
    {
      id: "1",
      type: "account",
      attributes: {
        activated: true,
        country_code: "91",
        email: "test@gmail.com",
        profile_picture: null,
        first_name: null,
        full_phone_number: "918826798616",
        last_name: null,
        full_name: "tester",
        phone_number: "8826798616",
        type: "EmailAccount",
        created_at: "2023-09-06T03:45:26.179Z",
        updated_at: "2023-11-30T09:06:07.739Z",
        device_id: null,
        unique_auth_id: "kV01AIkbeHRakYxzvpOz4Att",
        driver_status: "offline",
        id_proof: {
          name: "id_proof",
          record: {
            id: 1,
            first_name: null,
            last_name: null,
            full_phone_number: "918826798616",
            country_code: 91,
            phone_number: 8826798616,
            email: "test@gmail.com",
            activated: true,
            device_id: null,
            unique_auth_id: "kV01AIkbeHRakYxzvpOz4Att",
            password_digest:
              "$2a$12$7MU6IVONeSahGrTkzQx7/e1BWpiauWoCvLIVbRQSIvlrUz/ukIAky",
            created_at: "2023-09-06T03:45:26.179Z",
            updated_at: "2023-11-30T09:06:07.739Z",
            user_name: null,
            platform: null,
            user_type: null,
            app_language_id: null,
            last_visit_at: null,
            is_blacklisted: false,
            suspend_until: null,
            status: "regular",
            gender: null,
            date_of_birth: "2023-09-05",
            age: null,
            stripe_id: null,
            stripe_subscription_id: null,
            stripe_subscription_date: null,
            role: "buyer",
            full_name: "tester",
            is_verified: null,
            share_token: null,
            approve_status: "Pending",
            seller_status: "Signup",
            notification: {},
            customer_id: null,
            wallet_amount: "0.0",
            withdrawable_amount: "0.0",
            latitude: null,
            longitude: null,
            driver_status: "offline",
            language: "English",
            currency: "Dollar",
            driver_redirect_flag: null,
            stylist_redirect_flag: null,
          },
        },
        license: {
          name: "license",
          record: {
            id: 1,
            first_name: null,
            last_name: null,
            full_phone_number: "918826798616",
            country_code: 91,
            phone_number: 8826798616,
            email: "test@gmail.com",
            activated: true,
            device_id: null,
            unique_auth_id: "kV01AIkbeHRakYxzvpOz4Att",
            password_digest:
              "$2a$12$7MU6IVONeSahGrTkzQx7/e1BWpiauWoCvLIVbRQSIvlrUz/ukIAky",
            created_at: "2023-09-06T03:45:26.179Z",
            updated_at: "2023-11-30T09:06:07.739Z",
            user_name: null,
            platform: null,
            user_type: null,
            app_language_id: null,
            last_visit_at: null,
            is_blacklisted: false,
            suspend_until: null,
            status: "regular",
            gender: null,
            date_of_birth: "2023-09-05",
            age: null,
            stripe_id: null,
            stripe_subscription_id: null,
            stripe_subscription_date: null,
            role: "buyer",
            full_name: "tester",
            is_verified: null,
            share_token: null,
            approve_status: "Pending",
            seller_status: "Signup",
            notification: {},
            customer_id: null,
            wallet_amount: "0.0",
            withdrawable_amount: "0.0",
            latitude: null,
            longitude: null,
            driver_status: "offline",
            language: "English",
            currency: "Dollar",
            driver_redirect_flag: null,
            stylist_redirect_flag: null,
          },
        },
        seller_status: "Signup",
        approve_status: "Pending",
        language: "English",
        currency: "Dollar",
        hire_status: "accepted",
      },
    },
  ],
};

const res1 = { data: [
  {
    id: "1",
    type: "account",
    attributes: {
      "id": 1,
      "stylist_id": 1,
      "profile_picture": null,
    }}]}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User opens up StylistViewProductSourcingPage", ({
    given,
    when,
    then,
  }) => {
    let stylistBlock: ShallowWrapper;
    let instance: StylistProfile;

    given("User is on StylistViewProductSourcingPage screen", () => {
      stylistBlock = shallow(<StylistProfile {...screenProps} />);
    });

    when("The page loads completely", () => {
      instance = stylistBlock.instance() as StylistProfile;
    });

    then("User can see the page without errors", () => {
      let saveButton = stylistBlock.findWhere(
        (node) => node.prop("testID") === "stylistId"
      );
      saveButton.simulate("press");
      expect(stylistBlock).toBeTruthy();

      let Button = stylistBlock.findWhere(
        (node) => node.prop("testID") === "ProductId"
      );
      Button.simulate("press");

      let Button1 = stylistBlock.findWhere(
        (node) => node.prop("testID") === "SeeAll"
      );
      Button1.simulate("press");

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

    then("User can press the Back Button", () => {
      const msgTokenAPI2 = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgTokenAPI2.addData(getName(MessageEnum.PlayLoadSignupId), "User-Token");
      runEngine.sendMessage("Unit Test", msgTokenAPI2);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationPayLoadMessage" }),
        ])
      );

      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.getHiredStylistListId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(stylistBlock.length).toBeGreaterThan(0);
    });

    then("user can press the View Button", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.getPortfolioId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
      const flatlistWrapper5 = stylistBlock.findWhere(
        (node) => node.prop("testID") === "portfolioListId"
     );

      let render_item5 = flatlistWrapper5.renderProp("renderItem")({item: res,index: 0,});

      let buttonRedirect = render_item5.findWhere(
        (node) => node.prop("testID") === "btnRedirectStylistProfile"
      );
      buttonRedirect.simulate("press");
      flatlistWrapper5.renderProp("ListEmptyComponent")({})
      
      const render_item = flatlistWrapper5.renderProp("keyExtractor")({id:1},1);
      const flatlistWrapper6 = stylistBlock.findWhere(
        (node) => node.prop("testID") === "profileList"
     );
      const render_item6 = flatlistWrapper6.renderProp("renderItem")({item: res1,index: 0,});
      const render_item1 = flatlistWrapper6.renderProp("keyExtractor")({id:1},1);
      let chatID = render_item6.findWhere(
        (node) => node.prop("testID") === "chatId"
      );
      chatID.simulate("press");
      let firstStylistCard = render_item6.findWhere(
        (node) => node.prop("testID") === "stylistCard"
      );
      firstStylistCard.simulate("press");

      flatlistWrapper6.renderProp("ListEmptyComponent")({})
      instance.getAllImages
      expect(stylistBlock).toBeTruthy();

      let BackButton = stylistBlock.findWhere(
        (node) => node.prop("testID") === "btnBack"
      )
      BackButton.simulate("press");

     let wrapper: any;
    const invalidURL = 'tiktok.com/invalid';
    // expect(wrapper.state('tiktok')).toBe(invalidURL);
    // expect(wrapper.state('error')).toBe('Invalid TikTok URL');
    // expect(wrapper.state('errorKey')).toBe('tiktok');
    // wrapper.setState({ errorKey: 'tiktok', error: 'Invalid TikTok URL' });
    // expect(wrapper.find(Text).someWhere(('Invalid TikTok URL'))).toBe(true);
    
    const validURL = 'https://www.tiktok.com/@username';
    expect(wrapper.state('tiktok')).toBe(validURL);
    expect(wrapper.state('error')).toBe('');
    expect(wrapper.state('errorKey')).toBe('');

    const invalidURLinstagram = 'instagram/test';
    expect(wrapper.state('instagram')).toBe(invalidURLinstagram);
    expect(wrapper.state('error')).toBe('Invalid Instagram URL');
    expect(wrapper.state('errorKey')).toBe('instagram')
    const validURLinstagram = 'https://www.instagram.com/testuser/';
    expect(wrapper.state('instagram')).toBe(validURLinstagram);
    expect(wrapper.state('error')).toBe('');
    expect(wrapper.state('errorKey')).toBe('');

    const invalidURLfacebook = 'facebook.com/!wrong'
    expect(wrapper.state('facebook')).toBe(invalidURLfacebook);
    expect(wrapper.state('error')).toBe('Invalid Facebook URL');
    expect(wrapper.state('errorKey')).toBe('facebook');

    const validURLfacebook = 'https://www.facebook.com/testuser';
    expect(wrapper.state('facebook')).toBe(validURLfacebook);
    expect(wrapper.state('error')).toBe('');
    expect(wrapper.state('errorKey')).toBe('');

    const invalidURLPinterest = 'invalid-link';
    expect(wrapper.state('pinterest')).toBe(invalidURLPinterest);
    expect(wrapper.state('error')).toBe('Invalid Pinterest URL');
    expect(wrapper.state('errorKey')).toBe('pinterest');
    wrapper.setState({ errorKey: 'pinterest', error: 'Invalid Pinterest URL' });
    expect(wrapper.find(Text).someWhere(('Invalid Pinterest URL'))).toBe(true);

    const validURLpinterest = 'https://www.tiktok.com/@username';
    expect(wrapper.state('pinterest')).toBe(validURLpinterest);
    expect(wrapper.state('error')).toBe('');
    expect(wrapper.state('errorKey')).toBe('');
    });
  });
});
