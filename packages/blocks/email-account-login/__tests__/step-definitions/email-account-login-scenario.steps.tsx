import { defineFeature, loadFeature} from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme';
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock"
import StorageProvider from "../../../../framework/src/StorageProvider";
import * as utils from "../../../../framework/src/Utilities";
import { jest, beforeEach, expect } from '@jest/globals';
import { Platform } from "react-native"

const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener: jest.fn().mockImplementation((event, callback:any) => {
            callback();
            //returning value for `navigationSubscription`
            return {
               remove: jest.fn()
            }
        }),
      },
    id: "EmailAccountLoginBlock"
  }

const feature = loadFeature('./__tests__/features/email-account-login-scenario.feature');
const map = new Map();
map.set("FA_LOGIN_MODE", "buyer")

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.mock("../../../../framework/src/StorageProvider");
        StorageProvider.get = (k: string) => map.get(k);
        jest.spyOn(utils, 'getStorageData').mockImplementation(async () => '0')
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let emailLoginInstance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>)
            expect(mobileAccountLogInWrapper).toBeTruthy()  

            emailLoginInstance= mobileAccountLogInWrapper.instance()as EmailAccountLoginBlock;

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": [
                    {
                        "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                        "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                        "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                    }
                ]
            });
            emailLoginInstance.validationApiCallId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

        });

        when('I navigate to the Log In Screen', () => {
            emailLoginInstance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
        });
        
        then('I can select the Log In button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnEmailLogIn');
            buttonComponent.simulate('press');
        });

        then('I can select the Forgot Password button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnForgotPassword');
            buttonComponent.simulate('press');
            emailLoginInstance.setState({ LoginType : "apple" });
            emailLoginInstance.displaySuccessMessage();

            emailLoginInstance.setState({ LoginType : "google" });
            emailLoginInstance.displaySuccessMessage();
        });


        then('I can enter a email address with out errors', () => {
            let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'txt_enter_email');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            textInputComponent.simulate("submitEditing")
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'Background');
            buttonComponent.simulate('press');
        });

        then('I can enter a password with out errors', () => {
            let textInputComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'txt_enter_password');
            textInputComponent.simulate('changeText', 'passWord1!');
            textInputComponent.simulate("submitEditing")
        });

        then('I can select the Password eye button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btn_togglePassword');
            buttonComponent.simulate('press');
        });

        then('I can select the Password eye button false condition with out errors', () => {
            emailLoginInstance.setState({enablePasswordField:false})
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btn_togglePassword');
            buttonComponent.simulate('press');
        });``

        then('I can select the Signup button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnSignupRedirection');
            buttonComponent.simulate('press');
        });

        then('I can select the phone button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnPhoneLoginRedirection');
            buttonComponent.simulate('press');
        });

        then('I can select the google login button with out errors', async() => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnGoogleLogin');
            buttonComponent.simulate('press');
        });

        then('I can select the google login button api calling with errors', () => {

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.LoginOptionsNavigationDataMessage), "store");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)

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
            emailLoginInstance.socialLoginApiCallId = msgLogInErrorRestAPI.messageId
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
            emailLoginInstance.socialLoginApiCallId = msgLogInErrorRestAPI.messageId
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
            emailLoginInstance.socialLoginApiCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

        then('I can select the apple login button with out errors', async() => {
            Platform.OS = 'ios'
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnAppleLogin');
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
            emailLoginInstance.appleLoginApi(localObject)
        });

        then('I can click the facebook login button with out errors', async() => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnFacebookWork');
            buttonComponent.simulate('press');
        });

        then('I can back button with out errors', () => {
            let localObject = {
                fullName:{
                    familyName:null,
                    givenName:'himanshu'
                },
                email:'test@apple.com',
                identityToken:'123345gfghfghgh'
            }
            emailLoginInstance.appleLoginApi(localObject)
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnBackManageEmail');
            buttonComponent.simulate('press');
            expect(buttonComponent).toBeTruthy()
        });

        then('I can leave the screen with out errors', () => {
            emailLoginInstance.componentWillUnmount();
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

    });

    test('Empty Email Address', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with an empty Email Address', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
             instance.setState({email: "", password: "password!"});
        });

        then('Log In Should Fail',() => {
        
            expect(instance.doEmailLogIn()).toBe(false);

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
            instance.apiEmailLoginCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

    });

    test('Email Address and Empty Password', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with a Email Address and empty Password', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
             instance.setState({ email: "test@aol.com", password: ""})
        });

        then('Log In Should Fail',() => {
            expect(instance.doEmailLogIn()).toBe(false);
        });
    });

    test('Password and Empty Email Address', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with a Password and empty Email Address', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
             instance.setState({email: "", password: "password"})
        });

        then('Log In Should Fail',() => {
         expect(instance.doEmailLogIn()).toBe(false);
        });
    });
 
    test('Email Address and Password', ({ given, when, then, and }) => {
       
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a Registed User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with Email Address and Password', () => {
             instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
             instance.setState({email: "abc@aol.com", password: "password"})
        });

        then('I can see login errors', async () => {
            map.set("FA_LOGIN_MODE", "Seller");
            const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
                    "account": {"role": "buyer"}
                }
            });
            instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)
        });

        and('Log In Should Succeed', () => {
            map.set("FA_LOGIN_MODE", "Buyer");
            const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
                    "account": {"role": "buyer"}
                }
            });
            instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)

            map.set("FA_LOGIN_MODE", "Seller");
            const msg2 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msg2.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg2.messageId);
            msg2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "token",
                    "account": {"role": "seller", "approve_status": "Pending"}
                }
            });
            instance.apiEmailLoginCallId = msg2.messageId;
            runEngine.sendMessage("Unit Test", msg2);

            const msg3 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msg3.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg3.messageId);
            msg3.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "token",
                    "account": {"role": "seller", "approve_status": "approved"},
                    "custom_account": {"account_type": "Driver"}
                }
            });
            instance.apiEmailLoginCallId = msg3.messageId;
            runEngine.sendMessage("Unit Test", msg3);

            map.set("FA_LOGIN_MODE", "Delivery Partner");
            const msg4 = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msg4.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg4.messageId);
            msg4.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "token",
                    "account": {"role": "driver", "  driver_redirect_flag": null},
                    "custom_account": {"account_type": "Agency"}
                }
            });
            instance.apiEmailLoginCallId = msg4.messageId;
            runEngine.sendMessage("Unit Test", msg4);

            const msg5 = new Message(getName(MessageEnum.RestAPIResponceMessage));
            msg5.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg5.messageId);
            msg5.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "token",
                    "account": {"role": "driver", "  driver_redirect_flag": "landingpage"},
                    "custom_account": {"account_type": "Driver"}
                }
            });
            instance.apiEmailLoginCallId = msg5.messageId;
            runEngine.sendMessage("Unit Test", msg5);
        });

        then('RestAPI will return token', () => {
            const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)

        });
    });

    test('Remember Me - Email Address Account Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper:ShallowWrapper;
        let instance:EmailAccountLoginBlock; 

        given('I am a Registed User who has already Logged In and selected Remember Me', () => {
             //Force ios to render mobile layout once.
            jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps}/>);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I navigate to Email Address Account Log In', () => {
            
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock

            const msgRestoreCreds = new Message(getName(MessageEnum.ReciveUserCredentials))
            msgRestoreCreds.addData( getName(MessageEnum.LoginPassword), "passWord1!")
            msgRestoreCreds.addData( getName(MessageEnum.LoginUserName), "test@aol.com")
            runEngine.sendMessage("Unit Test", msgRestoreCreds)

        });

        then('The Country Code, Email Address and Password will be restored', () => {
            expect(mobileAccountLogInWrapper).toBeTruthy();   
        });
    });
    
    test('I am a stylist trying to sign In', ({
        given,
        when,
        then
    }) => {
        let screen: ReturnType<typeof render>;
        const spyMessage = jest.spyOn(runEngine, "sendMessage");
        jest.spyOn(utils, 'getStorageData').mockImplementation(async () => '2')

        given('I have filled up correct credentials', () => {
            screen = render(<EmailAccountLoginBlock {...screenProps} />);
            fireEvent.changeText(screen.getByTestId("txt_enter_email"), "udit@narayan.com");
            fireEvent.changeText(screen.getByTestId("txt_enter_email"), "txt_enter_password");
        });
      
        when('I click on sign In', () => {
            map.set("FA_LOGIN_MODE", "Stylist");
            fireEvent.press(screen.getByTestId("btnEmailLogIn"));

            const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            message.addData(getName(MessageEnum.RestAPIResponceDataMessage), message.messageId);
            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                meta: {
                    account: {
                        driver_redirect_flag: "driver_landing_page", 
                        role: "stylist"
                    },
                    token: "token"
                }
            })
            
            screen.container.instance.apiEmailLoginCallId = message.messageId;
            runEngine.sendMessage("UNIT TEST", message);

            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                meta: {
                    account: {
                        stylist_redirect_flag: "stylist_document_submission_page", 
                        role: "stylist"
                    },
                    token: "token"
                }
            })
            runEngine.sendMessage("UNIT TEST", message);

            message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                meta: {
                    account: {
                        stylist_redirect_flag: null, 
                        role: "stylist"
                    },
                    token: "token"
                }
            })
            runEngine.sendMessage("UNIT TEST", message);
        });
      
        then('I go to expected screen', () => {
            const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
            expect(lastCall[1]).toMatchObject({id: "RestAPIResponceMessage"})
        });
      });
});
