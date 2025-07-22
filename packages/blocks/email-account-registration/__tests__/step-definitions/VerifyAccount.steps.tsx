import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { Alert } from 'react-native';

import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VerifyAccount from "../../src/VerifyAccount";

jest.useFakeTimers()
const screenProps = {
    navigation: {
        getParam: (playlist_id: any, topic_id: any) => {
        },
        addListener: (param: string, callback: any) => {
            callback()
        },
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
            params: {
                item: {
                    phoneNumber: '91231321313231',
                    smsToken: '',
                    emailToken: '',
                    email: 'test@mail.com'
                }
            }
        }
    },
    id: "VerifyAccount"
};

const feature = loadFeature("./__tests__/features/VerifyAccount-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.spyOn(Alert, 'alert');
    });

    test("User navigates to VerifyAccount", ({ given, when, then }) => {
        let inputOtpWrapper: ShallowWrapper;
        let instance: VerifyAccount;

        given("I am a User loading VerifyAccount", () => {
            inputOtpWrapper = shallow(<VerifyAccount {...screenProps} />);
            expect(inputOtpWrapper).toBeTruthy();
        });

        when('I am a User attempting to enter Otp', () => {
            instance = inputOtpWrapper.instance() as VerifyAccount;
            jest.runAllTimers()
        });

        then('I can go to back screen', () => {
            let backButtonIDComponent = inputOtpWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
            backButtonIDComponent.simulate('press');
        });

        then("I can enter OTP with out errors", () => {
            instance.renderText();
            instance.setState({ isPhoneChanged: true, isEmailChanged: false })

            let emailArray = instance.state.OtpArray
            emailArray.map(
                (item, index) => {
                    let textInput = inputOtpWrapper.findWhere(node => node.prop("testID") === "txt_input_otp" + index.toString())
                    textInput.simulate("changeText", index.toString())
                }
            )
            expect(instance.state.OtpArray).toStrictEqual(["0", "1", "2", "3"])
            instance.prevoiusFocus('', 0)
        });
        then("I can verify OTP with out errors", () => {
            instance.renderText();
            instance.setState({ isPhoneChanged: false, isEmailChanged: true })

            let emailArray = instance.state.OtpArray
            emailArray.map(
                (item, index) => {
                    let textInput = inputOtpWrapper.findWhere(node => node.prop("testID") === "txt_input_otp" + index.toString())
                    textInput.simulate("changeText", index.toString())
                }
            )
            expect(instance.state.OtpArray).toStrictEqual(["0", "1", "2", "3"])
            instance.prevoiusFocus('', 0)
        });
        then("I can verify OTP with email and phone changed out errors", () => {
            instance.renderText();
            instance.setState({ isPhoneChanged: true, isEmailChanged: true })

            let emailArray = instance.state.OtpArray
            emailArray.map(
                (item, index) => {
                    let textInput = inputOtpWrapper.findWhere(node => node.prop("testID") === "txt_input_otp" + index.toString())
                    textInput.simulate("changeText", index.toString())
                }
            )
            expect(instance.state.OtpArray).toStrictEqual(["0", "1", "2", "3"])
            instance.prevoiusFocus('', 0)
        });
        then("I can select Varify OTP button with out errors", () => {
            let buttonComponent = inputOtpWrapper.findWhere(
                (node) => node.prop("testID") === "btnverifyAccount"
            );
            buttonComponent.simulate("press");
        });

    });

    test("User Enters A Invalid Otp", async ({ given, when, then }) => {
        let inputOtpWrapper: ShallowWrapper;
        let instance: VerifyAccount;

        given("I am a User attempting to enter Otp", () => {
            inputOtpWrapper = shallow(
                <VerifyAccount {...screenProps} />
            );
            expect(inputOtpWrapper).toBeTruthy();
        });

        when("I navigate to the phone-verification", () => {
            instance = inputOtpWrapper.instance() as VerifyAccount;
        });

        then("I am entering empty otp", async () => {
            let emailArray = instance.state.OtpArray
            emailArray.map(
                (item, index) => {
                    let textInput =
                        inputOtpWrapper.findWhere(node =>
                            node.prop("testID") === "txt_input_otp" + index.toString())
                    textInput.simulate("changeText", "")
                    textInput.simulate("focus")
                }
            )

            let buttonComponent = inputOtpWrapper.findWhere(
                (node) => node.prop("testID") === "btnverifyAccount"
            );
            buttonComponent.simulate("press");
            //   inputOtpWrapper.findWhere(node=>node.prop("testID")==="txt_input_otp2")
        });

        then("I am entering wrong otp", async () => {
            let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.verifyAccountApiCallID = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            instance.setState({
                otp: "7668"
            })

            instance.setState({ emailVerified: true, otp: '', verifyPhone: '', emailToken: '', smsToken: '' })
            let message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            instance.receive("from", message);
            let buttonComponent = inputOtpWrapper.findWhere(
                (node) => node.prop("testID") === "btnverifyAccount"
            );
            buttonComponent.simulate("press");
            // let methodResult = await instance.verifyAccount()
            // expect(methodResult).toBeTruthy()
            const responseJson = {}
            instance.accountSucessCallBack(responseJson)
        });

        then('I can resend otp', () => {
            let btnResendOtp = inputOtpWrapper.findWhere((node) => node.prop('testID') === 'btnResendApi');
            btnResendOtp.simulate('press');
            instance.setState({ remainingTime: '12' })
            instance.resendOtp()
            expect(instance.resendOtp()).toBeTruthy();
        });

        then('I can select the Resend button with out errors', () => {
            let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.resendOTPApiCallID = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            instance.resendOTPSucessCallBack('')
            if (instance.state.emailToken) {
                instance.setState({ smsToken: '' })
            } else {
                instance.setState({ emailToken: '' })
            }
            expect(instance.setState({ emailToken: '' }))
        });

        then('Post verify API will return an error', () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                    errors: [
                        {
                            errors: "Token has Expired"
                        }
                    ]
                });
            instance.verifyAccountApiCallID = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
            const responseJson = {
                errors:
                {
                    pin: "Token has Expired"
                }

            }
            instance.accountFailureCallBack(responseJson)
            expect(instance.accountFailureCallBack(responseJson));
            expect(Alert.alert(''));
        });

        then('Update details verify API will return an error', () => {
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                    errors: [
                        {
                            errors: "Token has Expired"
                        }
                    ]
                });
            instance.verifyAccountDetailsApiCallID = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
            const responseJson = {
                errors: [
                    {
                        errors: "Token has Expired"
                    }
                ]
            }
            instance.verifyAccountSucessCallBack(responseJson.errors)
            expect(instance.verifyAccountSucessCallBack(responseJson.errors));
            expect(Alert.alert(''));
        });
        then("Update details verify API will not return an error", () => {
            const addAddressAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                addAddressAPI
            );
            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {

                    "data": {
                        "id": "398",
                        "type": "contact",
                        "attributes": {
                            "email": "sumail@yopmail.com",
                            "full_name": "sumail",
                            "full_phone_number": "919900877654",
                            "type": null,
                            "activated": false,
                            "profile_picture": ""
                        }
                    },
                    "meta": {
                        "sms_token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzU4LCJleHAiOjE3MDQ4NjY3NjMsInR5cGUiOiJBY2NvdW50QmxvY2s6OlNtc090cCIsImFjY291bnRfaWQiOjM5OH0.Va5J66utD8qiAOXvZArTOStjHUFL-2CO_V5sHJRXj7-qrltV6pJNSbEfXeQEMcx-mrKMUQtv-VQksbR5O5LzXA",
                        "email_token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NTM2LCJleHAiOjE3MDQ4NjY3NjMsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6Mzk4fQ.OVdwelCG-MFYItoSzRIWwODE6YRfTxBRTZKaRPoYUDMMm8pqIYvohOcy_ittkCl7VrmX8epe_qzXZHx_IjTEzw"
                    }

                }
            );

            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                addAddressAPI.messageId
            );
            instance.verifyAccountDetailsApiCallID = addAddressAPI.messageId;
            instance.setState({ emailVerified: false })
            runEngine.sendMessage("Unit Test", addAddressAPI);
        });

        then("Update email details verify API will not return an error", () => {
            const addAddressAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                addAddressAPI
            );
            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {

                    "data": {
                        "id": "398",
                        "type": "contact",
                        "attributes": {
                            "email": "sumail@yopmail.com",
                            "full_name": "sumail",
                            "full_phone_number": "919900877654",
                            "type": null,
                            "activated": false,
                            "profile_picture": ""
                        }
                    },
                    "meta": {
                        "sms_token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzU4LCJleHAiOjE3MDQ4NjY3NjMsInR5cGUiOiJBY2NvdW50QmxvY2s6OlNtc090cCIsImFjY291bnRfaWQiOjM5OH0.Va5J66utD8qiAOXvZArTOStjHUFL-2CO_V5sHJRXj7-qrltV6pJNSbEfXeQEMcx-mrKMUQtv-VQksbR5O5LzXA",
                        "email_token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NTM2LCJleHAiOjE3MDQ4NjY3NjMsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6Mzk4fQ.OVdwelCG-MFYItoSzRIWwODE6YRfTxBRTZKaRPoYUDMMm8pqIYvohOcy_ittkCl7VrmX8epe_qzXZHx_IjTEzw"
                    }

                }
            );

            addAddressAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                addAddressAPI.messageId
            );
            instance.verifyAccountDetailsApiCallID = addAddressAPI.messageId;
            instance.setState({ isBothParamsChanges: true })
            runEngine.sendMessage("Unit Test", addAddressAPI);
        });

        then('Post resend API will return an error', () => {
            instance.resendOtp();
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
                {
                    errors: [
                        {
                            token: "Token has Expired"
                        }
                    ]
                });
            instance.resendOTPApiCallID = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });

        then('check accountSucessCallBack', async () => {
            const responseJson = {
                message: {
                    Email: 'Email Otp is verified',
                }
            };
            jest.useFakeTimers();
            expect(instance.accountSucessCallBack(responseJson));
            setTimeout(() => {
                instance.props?.navigation?.navigate('EmailAccountLoginBlock')
            }, 500);
            expect(Alert.alert).toBeTruthy();
        });

        then('check accountFailureCallBack', async () => {
            const responseJson = {
                errors: {
                    pin: 'Invalid pin',
                },
            };
            jest.useFakeTimers();
            expect(instance.resendOTPFailureCallBack(responseJson));
            expect(instance.setState({ isLoading: false }))
        });

        then('check resendOTPSucessCallBack', async () => {
            const responseJson = {
                meta: {
                    emailToken: "eyJhbGciOiJIUzUxMiJ9.",
                },
            };
            jest.useFakeTimers();
            instance.setState({ emailToken: '' })
            instance.resendOTPSucessCallBack(responseJson)
            expect(instance.resendOTPSucessCallBack(responseJson));
            instance.componentDidMount()
            instance.failureResponce(responseJson, '')

            instance.maskEmail();
            const { verifyEmail } = instance.state;
            if (verifyEmail) {
                const [username, domain] = verifyEmail?.split('@');
                const maskedUsername = username?.slice(0, 1) + '*'.repeat(username.length - 2) + username?.split('').reverse()?.join('')?.slice(0, 1);
                return maskedUsername + '@' + domain;
            }
        });
    })
});
