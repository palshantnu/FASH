import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPassword from "../../src/ForgotPassword";
import { handleInputChange } from "react-select/src/utils";

const navigation = require("react-navigation");
jest.mock("react-native-elements");
const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      if (event === "willFocus") {
        callback();
      }
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        forumDetailId: 1,
        follower: true,
        followings: true,
      },
    },
  },
  id: "ForgotPassword",
};

const feature = loadFeature(
  "./__tests__/features/ForgotPassword-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ForgotPassword", ({ given, when, then }) => {
    let ForgotPasswordWrapper: ShallowWrapper;
    let instanceForgotPassword: ForgotPassword;

    given("I am a User loading ForgotPassword", () => {
      ForgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instanceForgotPassword =
        ForgotPasswordWrapper.instance() as ForgotPassword;
    });
    when("I navigate to the Registration Screen", () => {
      instanceForgotPassword =
        ForgotPasswordWrapper.instance() as ForgotPassword;
    });

    then("I can press a navigate to back", () => {
      let magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta: {
            token:
              "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
          },
        }
      );
      instanceForgotPassword.requestEmailOtpCallId = magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      const value: any = {};
      instanceForgotPassword.hideKeyboard();
      instanceForgotPassword.goToOtpAfterEmailValidation(value);
      instanceForgotPassword.goToOtpAfterPhoneValidation(value);
      instanceForgotPassword.goToChangePasswordAfterOtp(value);
      instanceForgotPassword.startForgotPassword("");
      instanceForgotPassword.goToHome();
      instanceForgotPassword.goToLogin();
      instanceForgotPassword.startForgotPassword("");
      instanceForgotPassword.validationRulesRequest();
      instanceForgotPassword.componentDidMount();
    });
  });
});
