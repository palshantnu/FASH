import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import ResetPassword from "../../src/ResetPassword";

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
  id: "ResetPassword",
};

const feature = loadFeature(
  "./__tests__/features/ResetPassword-scenario.feature"
);

// defineFeature(feature, test => {
//     beforeEach(() => {
//         jest.resetModules();
//         jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
//         jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
//     });

//     test("User navigates to ResetPassword", ({ given, when, then }) => {
//         let ResetPasswordWrapper: ShallowWrapper;
//         let instanceResetPassword: ResetPassword;

//         given("I am a User loading ResetPassword", () => {
//             ResetPasswordWrapper = shallow(<ResetPassword {...screenProps} />);
//             instanceResetPassword = ResetPasswordWrapper.instance() as ResetPassword;
//         });
//         when('I navigate to the Registration Screen', () => {
//             instanceResetPassword = ResetPasswordWrapper.instance() as ResetPassword
//         });

//         then('I can press a navigate to back', () => {
//             let goBackButton = ResetPasswordWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
//             goBackButton.simulate('press');
//             expect(ResetPasswordWrapper).toBeTruthy();

//             instanceResetPassword.renderInputEmail();
//             let textInputComponent = ResetPasswordWrapper.findWhere((node) => node.prop('testID') === 'emailId');
//             textInputComponent.simulate('changeText', 'test@gmail.com');

//             instanceResetPassword.setState({ isEmail: true })
//             expect(instanceResetPassword.state.isEmail).toBe(true)
//             expect(ResetPasswordWrapper).toBeTruthy();

//             // instanceResetPassword.renderPhonenumber();
//             // let phoneNumberInput = ResetPasswordWrapper.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumber');
//             // phoneNumberInput.simulate('changeText', '0123456789');
//             // phoneNumberInput.simulate("submitEditing")
//             // instanceResetPassword.setState({ isPhone: true })
//             // expect(instanceResetPassword.state.isPhone).toBe(true)
//             // expect(ResetPasswordWrapper).toBeTruthy();
//             const { getByTestId, container } = render(<ResetPassword {...screenProps} />);
//             const phoneNumberInput = getByTestId('txtInputPhoneNumber');
//             fireEvent(phoneNumberInput, 'onChangeText', '0123456789');
//             fireEvent(phoneNumberInput, 'submitEditing');
//             expect(container.instance.state.isPhone).toBeFalsy();

//             const fl = getByTestId("phoneCodesFlatList");
//             const toggle = getByTestId("phoneCodeDisplayToggle");
//             const item = fl.props.renderItem({
//                 item: dummyCountryList[2],
//                 index: 2
//             }) as typeof fl;
//             fireEvent(toggle, "onPress");
//             expect(container.instance.state.dropdownOpen).toBeTruthy();

//             fireEvent(item, 'onPress');
//             expect(container.instance.state.selectedCountryCodeIndex).toBe(2);
//             expect(container.instance.state.selectedCountryCode).toBe(dummyCountryList[2].numeric_code);

//             instanceResetPassword.renderResetButton();
//             let btnResetPass = ResetPasswordWrapper.findWhere((node) => node.prop('testID') === 'resetID');
//             btnResetPass.simulate('press');
//             expect(ResetPasswordWrapper).toBeTruthy();

//             const data = {}
//             instanceResetPassword.apiCall(data)
//             let message = new Message(getName(MessageEnum.RestAPIResponceMessage));
//             instanceResetPassword.receive("from", message);
//             let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
//             magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
//             magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
//                 "meta": {
//                     "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
//                 }
//             });
//             instanceResetPassword.forgotPasswordSendOTPApiCallID = magLogInSucessRestAPI
//             runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)

//             const successResponseJson = {
//                 data: {
//                     attributes: {
//                         full_phone_number: '1234567890',
//                         email: ''
//                     },
//                     type: 'user',
//                 },
//                 meta: {
//                     token: 'yourToken',
//                 },
//             };

//             ResetPasswordWrapper = shallow(<ResetPassword {...screenProps} />);

//             instanceResetPassword.sendOTPSucessCallBack(successResponseJson)
//             if (successResponseJson?.data?.attributes?.full_phone_number) {
//                 let data = {
//                     email_or_full_phone_number: successResponseJson?.data?.attributes?.full_phone_number,
//                     type: successResponseJson?.data?.type,
//                     token: successResponseJson.meta.token,
//                     phoneNumber: successResponseJson?.data?.attributes?.full_phone_number,
//                 }
//                 instanceResetPassword.props?.navigation?.navigate('ResetPasswordOTP', { item: data })
//             } else {
//                 let data = {
//                     email_or_full_phone_number: successResponseJson?.data?.attributes?.email,
//                     emailAddress: successResponseJson?.data?.attributes?.email,
//                     type: successResponseJson?.data?.type,
//                     token: successResponseJson?.meta?.token,
//                 }
//                 instanceResetPassword.props?.navigation?.navigate('ResetPasswordOTP', { item: data })
//             }
//             expect(ResetPasswordWrapper).toBeTruthy();

//             instanceResetPassword.parseApiCatchErrorResponse('')
//             expect(ResetPasswordWrapper).toBeTruthy();

//             const responseJson = {
//                 errors: [
//                     { otp: "fail" },
//                     { error: "y" }
//                 ]
//             };
//             instanceResetPassword.sendOTPFailureCallBack(responseJson);

//         });
//     });

// })

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ResetPassword", ({ given, when, then }) => {
    let ResetPasswordWrapper: ShallowWrapper;
    let instanceResetPassword: ResetPassword;
    given("I am a User loading ResetPassword", () => {
      ResetPasswordWrapper = shallow(<ResetPassword {...screenProps} />);
      instanceResetPassword = ResetPasswordWrapper.instance() as ResetPassword;
    });
    when("I navigate to the Registration Screen", () => {
      instanceResetPassword = ResetPasswordWrapper.instance() as ResetPassword;
      instanceResetPassword.myLanguage = "en";
    });
    then("I can press a navigate to back", () => {
      let goBackButton = ResetPasswordWrapper.findWhere(
        (node) => node.prop("testID") === "backButtonID"
      );
      goBackButton.simulate("press");
      expect(ResetPasswordWrapper).toBeTruthy();

      instanceResetPassword.renderInputEmail();
      let textInputComponent = ResetPasswordWrapper.findWhere(
        (node) => node.prop("testID") === "emailId"
      );
      textInputComponent.simulate("changeText", "test@gmail.com");

      instanceResetPassword.setState({ isEmail: true });
      expect(instanceResetPassword.state.isEmail).toBe(true);
      expect(ResetPasswordWrapper).toBeTruthy();

      // const { getByTestId, container } = render(<ResetPassword {...screenProps} />);
      const phoneNumberInput = ResetPasswordWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPhoneNumber"
      );
      console.log("phoneNumberInputa", phoneNumberInput);
      phoneNumberInput.simulate("changeText", "1234567890");
      expect(ResetPasswordWrapper.state("isPhone")).toBeFalsy();

      instanceResetPassword.renderResetButton();
      let btnResetPass = ResetPasswordWrapper.findWhere(
        (node) => node.prop("testID") === "resetID"
      );
      btnResetPass.simulate("press");
      expect(ResetPasswordWrapper).toBeTruthy();

      const data = {};
      instanceResetPassword.apiCall(data);
      let message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      instanceResetPassword.receive("from", message);
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
      instanceResetPassword.forgotPasswordSendOTPApiCallID =
        magLogInSucessRestAPI;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);

      const successResponseJson = {
        data: {
          attributes: {
            full_phone_number: "1234567890",
            email: "",
          },
          type: "user",
        },
        meta: {
          token: "yourToken",
        },
      };

      ResetPasswordWrapper = shallow(<ResetPassword {...screenProps} />);

      instanceResetPassword.sendOTPSucessCallBack(successResponseJson);
      if (successResponseJson?.data?.attributes?.full_phone_number) {
        let data = {
          email_or_full_phone_number:
            successResponseJson?.data?.attributes?.full_phone_number,
          type: successResponseJson?.data?.type,
          token: successResponseJson.meta.token,
          phoneNumber: successResponseJson?.data?.attributes?.full_phone_number,
        };
        instanceResetPassword.props?.navigation?.navigate("ResetPasswordOTP", {
          item: data,
        });
      } else {
        let data = {
          email_or_full_phone_number:
            successResponseJson?.data?.attributes?.email,
          emailAddress: successResponseJson?.data?.attributes?.email,
          type: successResponseJson?.data?.type,
          token: successResponseJson?.meta?.token,
        };
        instanceResetPassword.props?.navigation?.navigate("ResetPasswordOTP", {
          item: data,
        });
      }
      expect(ResetPasswordWrapper).toBeTruthy();

      instanceResetPassword.parseApiCatchErrorResponse("");
      expect(ResetPasswordWrapper).toBeTruthy();

      const responseJson = {
        errors: [{ otp: "fail" }, { error: "y" }],
      };
      const responseJsonOther = {
        errors: "",
      };
      instanceResetPassword.sendOTPFailureCallBack(responseJson);
      instanceResetPassword.sendOTPFailureCallBack(responseJsonOther);
    });
    then("user gets error response", () => {
      const Forgotpasswordmessege = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      Forgotpasswordmessege.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          Forgotpasswordmessege.messageId,
        [getName(MessageEnum.RestAPIResponceErrorMessage)]: { errors: "" },
        // [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {errors:""},
      });
      instanceResetPassword.forgotPasswordSendOTPApiCallID =
        Forgotpasswordmessege.messageId;
      runEngine.sendMessage("UNIT TEST", Forgotpasswordmessege);

      const ForgotpasswordmessegeSucess = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ForgotpasswordmessegeSucess.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          ForgotpasswordmessegeSucess.messageId,
        // [getName(MessageEnum.RestAPIResponceErrorMessage)]: { errors: "" },
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { errors: true },
      });
      instanceResetPassword.forgotPasswordSendOTPApiCallID =
        ForgotpasswordmessegeSucess.messageId;
      runEngine.sendMessage("UNIT TEST", ForgotpasswordmessegeSucess);

      const countrycodeMesseage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countrycodeMesseage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          countrycodeMesseage.messageId,
        // [getName(MessageEnum.RestAPIResponceErrorMessage)]: { errors: "" },
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            attributes: { full_phone_number: "98332122" },
            type: "sms_account",
            meta: { token: "anytokenstring" },
          },
        },
      });
      instanceResetPassword.countryCodesApiCallId =
        countrycodeMesseage.messageId;
      runEngine.sendMessage("UNIT TEST", countrycodeMesseage);
      const successResponseJson = {
        data: {
          attributes: {
            full_phone_number: "1234567890",
            email: "",
          },
          type: "user",
        },
        meta: {
          token: "yourToken",
        },
      };
      instanceResetPassword.sendOTPSucessCallBack(successResponseJson);
    });
  });
});
