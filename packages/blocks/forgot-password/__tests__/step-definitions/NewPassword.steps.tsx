import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NewPassword from "../../src/NewPassword"

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
    id: "NewPassword"
};

const feature = loadFeature("./__tests__/features/NewPassword-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to NewPassword", ({ given, when, then }) => {
        let NewPasswordWrapper: ShallowWrapper;
        let instanceNewPassword: NewPassword;

        given("I am a User loading NewPassword", () => {
            NewPasswordWrapper = shallow(<NewPassword {...screenProps} />);
            instanceNewPassword = NewPasswordWrapper.instance() as NewPassword;
        });
        when('I navigate to the Registration Screen', () => {
            instanceNewPassword = NewPasswordWrapper.instance() as NewPassword
            const msgsuccessrRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgsuccessrRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgsuccessrRestAPI);
            msgsuccessrRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),'');

            const item:any = {}
            instanceNewPassword.goToConfirmationAfterPasswordChange(item)
            instanceNewPassword.goToHome()
            instanceNewPassword.goToLogin()
        });

});

})
