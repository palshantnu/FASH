import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ResetPasswordOTP from "../../src/ResetPasswordOTP";
import { Alert } from 'react-native';

const navigation = require("react-navigation");

const screenProps = {
    navigation: {
        addListener: (param: string, callback: any) => {
            callback()
        },
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
            params: {
                item: {
                    emailORnumber: '91231321313231',
                    token: '',
                    loginType: '',
                    verifyEmail: 'test@mail.com',
                    verifyPhone: '45678',
                    emailAddress:'test@gmail.com'
                }
            }
        }
    },
    id: "ResetPasswordOTP"
};

const feature = loadFeature("./__tests__/features/ResetPasswordOTP-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.spyOn(Alert, 'alert');
    });

    test("User navigates to ResetPasswordOTP", ({ given, when, then }) => {
        let ResetPasswordOTPWrapper: ShallowWrapper;
        let instanceResetPasswordOTP: ResetPasswordOTP;

        given("I am a User loading ResetPasswordOTP", () => {
            ResetPasswordOTPWrapper = shallow(<ResetPasswordOTP {...screenProps} />);
            instanceResetPasswordOTP = ResetPasswordOTPWrapper.instance() as ResetPasswordOTP;
        });
        when('I navigate to the Registration Screen', () => {
            instanceResetPasswordOTP = ResetPasswordOTPWrapper.instance() as ResetPasswordOTP
        });

        then("check mask email", () => {
            instanceResetPasswordOTP.componentDidMount();
            instanceResetPasswordOTP.maskEmail();
            instanceResetPasswordOTP.setState({ emailVerified: false })
            if (instanceResetPasswordOTP.props.navigation.state.params.item.emailAddress) {
                instanceResetPasswordOTP.setState({ emailVerified: false })
            }

            const { verifyEmail } = instanceResetPasswordOTP.state;
            if (verifyEmail) {
                const [username, domain] = verifyEmail?.split('@');
                const maskedUsername = username?.slice(0, 1) + '*'.repeat(username.length - 2) + username?.split('').reverse()?.join('')?.slice(0, 1);
                return maskedUsername + '@' + domain;
            }
        });

        then('I can press a navigate to back', () => {
            let backButtonComponent = ResetPasswordOTPWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
            backButtonComponent.simulate('press');

            let btnResendComponent = ResetPasswordOTPWrapper.findWhere((node) => node.prop('testID') === 'btnResendApi');
            btnResendComponent.simulate('press');
            instanceResetPasswordOTP.resendOtp();

            let btnVerifyComponent = ResetPasswordOTPWrapper.findWhere((node) => node.prop('testID') === 'btnverifyAccount');
            btnVerifyComponent.simulate('press');
            instanceResetPasswordOTP.verifyAccount();



            const data = {}
            instanceResetPasswordOTP.apiCall(data)
            let message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            instanceResetPasswordOTP.receive("from", message);
            let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instanceResetPasswordOTP.resendOTPApiCallID = magLogInSucessRestAPI
            instanceResetPasswordOTP.verifyOTPApiCallID = magLogInSucessRestAPI

            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            const key = {}
            const index = {}
            instanceResetPasswordOTP.resetprevoiusFocus(key, 0)
            instanceResetPasswordOTP.resetchangeFocus(key, 0)
            instanceResetPasswordOTP.resendOTPFailureCallBack('')
        });

        then('RestAPI will return an error', () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instanceResetPasswordOTP.resendOTPApiCallID = msgRegistrationErrorRestAPI
            instanceResetPasswordOTP.verifyOTPApiCallID = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
            const apiRequestCallId = {}
            const responseJson = {}
            const errorReponse = {}
            instanceResetPasswordOTP.failureResponseJson(responseJson, apiRequestCallId)
            instanceResetPasswordOTP.parseApiCatchErrorResponse(errorReponse)
        });
        then('check all function', () => {
            instanceResetPasswordOTP = ResetPasswordOTPWrapper.instance() as ResetPasswordOTP
            instanceResetPasswordOTP.componentDidMount()
            expect(instanceResetPasswordOTP.renderOtpCodeBlock()).toBeTruthy();
            expect(instanceResetPasswordOTP.renderResetButton()).toBeTruthy();

            if (instanceResetPasswordOTP.props.navigation?.state?.params?.item?.emailAddress) {
                instanceResetPasswordOTP.setState({ emailVerified: false })
            }
        })

    });
});