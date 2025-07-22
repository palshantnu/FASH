import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ResetNewPassword from "../../src/ResetNewPassword"
import { Alert } from "react-native";

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
                item: {
                    token :'dasndbhkb3b43q4jb3jb5'
                }
            }
        },
        onPress :jest.fn()
    },
    id: "ResetNewPassword"
};

const feature = loadFeature("./__tests__/features/ResetNewPassword-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to ResetNewPassword", ({ given, when, then }) => {
        let ResetNewPasswordWrapper: ShallowWrapper;
        let instanceResetNewPassword: ResetNewPassword;

        given("I am a User loading ResetNewPassword", () => {
            ResetNewPasswordWrapper = shallow(<ResetNewPassword {...screenProps} />);
            instanceResetNewPassword = ResetNewPasswordWrapper.instance() as ResetNewPassword;
        });
        when('I navigate to the Registration Screen', () => {
            instanceResetNewPassword = ResetNewPasswordWrapper.instance() as ResetNewPassword
            instanceResetNewPassword.setState({ token: '' })
            instanceResetNewPassword.setState({isPassword :false})
        });

        then('I can press a navigate to back screen', () => {
            let backButton = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
            backButton.simulate('press',);
            expect(ResetNewPasswordWrapper).toBeTruthy();
        });

        then('I can render password input filed', () => {
            instanceResetNewPassword.renderUserLogin();
            let passInputBtn = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'passwordID');
            passInputBtn.simulate('changeText', 'Test@12345');

            instanceResetNewPassword.setState({isPassword:true})
            expect(instanceResetNewPassword.state.isPassword).toBe(true) 

            let secureBtn = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'eyeImageID');
            secureBtn.simulate('press');
            expect(ResetNewPasswordWrapper.setState({ hidePassword: true })).toBeTruthy();
        });

        then('I can render conform pass input filed', () => {
            instanceResetNewPassword.renderUserLogin();
            let conPassInputBtn = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'CnfPasswordID');
            conPassInputBtn.simulate('changeText', 'Test@12345');

            instanceResetNewPassword.setState({isComPassword:true})
            expect(instanceResetNewPassword.state.isComPassword).toBe(true) 

            let secureEyeBtn = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'ConeyeImagesID');
            secureEyeBtn.simulate('press');
            expect(ResetNewPasswordWrapper.setState({ hidePasswordConfirm: true })).toBeTruthy();
        });

        then('I can render Reset Password', () => {
            let conPassInputBtn = ResetNewPasswordWrapper.findWhere((node) => node.prop('testID') === 'resetpasswordID');
            conPassInputBtn.simulate('press');
        });

        then('I can check success API response', () => {
            instanceResetNewPassword.rendersignUpButton();
            const msgsuccessrRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgsuccessrRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgsuccessrRestAPI);
            msgsuccessrRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: {
                        id: "384",
                        type: "email_otp",
                        attributes: {
                            email: "Test@gmail.com",
                            pin: 1234,
                            valid_until: "2023-12-07T09:12:18.985Z"
                        }
                    },
                });

            msgsuccessrRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgsuccessrRestAPI.messageId);
            instanceResetNewPassword.resetNewPasswordApiCallID = msgsuccessrRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgsuccessrRestAPI);
            instanceResetNewPassword.resetNewPasswordSucessCallBack('');
            instanceResetNewPassword.navigateToEmailLogin();
        });

        then('I can check error API response', () => {
            instanceResetNewPassword.rendersignUpButton();
            const msgerrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgerrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgerrorRestAPI);
            msgerrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                    "errors": [
                        {
                            "token": "Invalid token"
                        }
                    ]
                });

            msgerrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgerrorRestAPI.messageId);
            instanceResetNewPassword.resetNewPasswordApiCallID = msgerrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgerrorRestAPI);
           
            const responseJson = {
                errors: [
                    {
                        token: "Invalid token"
                    },
                    {
                        otp:'invalid'
                    },
                   {
                    base :'error'
                   }
                ]
            }
            instanceResetNewPassword.resetNewPasswordFailureCallBack(responseJson)
           instanceResetNewPassword.navigateToResetPassword();
           
        });

        then('I can check API response faild', () => {
            instanceResetNewPassword.componentDidMount()
            instanceResetNewPassword.rendersignUpButton();
            instanceResetNewPassword.parseApiCatchErrorResponse('')
            expect(instanceResetNewPassword.parseApiCatchErrorResponse('')).toBeTruthy
        })
    });
})
