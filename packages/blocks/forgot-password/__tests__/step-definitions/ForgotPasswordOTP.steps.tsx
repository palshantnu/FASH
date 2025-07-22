import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPasswordOTP from "../../src/ForgotPasswordOTP"

const navigation = require("react-navigation");

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
                followings: true
            }
        }
    },
    id: "ForgotPasswordOTP"
};

const feature = loadFeature("./__tests__/features/ForgotPasswordOTP-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to ForgotPasswordOTP", ({ given, when, then }) => {
        let ForgotPasswordOTPWrapper: ShallowWrapper;
        let instanceForgotPasswordOTP: ForgotPasswordOTP;

        given("I am a User loading ForgotPasswordOTP", () => {
            ForgotPasswordOTPWrapper = shallow(<ForgotPasswordOTP {...screenProps} />);
            instanceForgotPasswordOTP = ForgotPasswordOTPWrapper.instance() as ForgotPasswordOTP;
        });
        when('I navigate to the Registration Screen', () => {
            instanceForgotPasswordOTP = ForgotPasswordOTPWrapper.instance() as ForgotPasswordOTP;
            instanceForgotPasswordOTP.hideKeyboard();
            
            let otpInputBtn = ForgotPasswordOTPWrapper.findWhere((node) => node.prop('testID') === 'txtMobilePhoneOTP');
            otpInputBtn.simulate('changeText','');

            let submitBtn = ForgotPasswordOTPWrapper.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
            submitBtn.simulate('press');

        });

       
});

})
