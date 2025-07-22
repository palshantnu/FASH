import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import {
  jest,
  expect,
  describe,
  test,
  beforeAll,
  beforeEach,
} from "@jest/globals";

import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import * as flash from "react-native-flash-message";
import { Alert,Platform } from "react-native";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

import PofileScreen from "../../src/ProfileScreen";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "ProfileScreen",
};

const dummyCountryList = [
  {
    numeric_code: "+992",
    country_full_name: "Tajikistan",
    country_code: "TJ",
    country_flag: "🇹🇯",
  },
  {
    numeric_code: "+1",
    country_full_name: "Jamaica",
    country_code: "JM",
    country_flag: "🇯🇲",
  },
  {
    numeric_code: "+509",
    country_full_name: "Haiti",
    country_code: "HT",
    country_flag: "🇭🇹",
  },
  {
    numeric_code: "+965",
    country_full_name: "Kuwait",
    country_code: "KW",
    country_flag: "🇰🇼",
  },
];

const dummyProfile = {
  data: {
    id: "655",
    type: "account",
    attributes: {
      activated: true,
      country_code: "965",
      email: "john@arnabxd.me",
      first_name: "John",
      full_phone_number: "96522658535",
      last_name: "Doe",
      full_name: "John Doe",
      phone_number: "22658535",
      type: null,
      created_at: "2024-04-24T05:29:46.442Z",
      updated_at: "2024-04-24T05:30:25.134Z",
      device_id: null,
      unique_auth_id: "G524B75o6AODmme2ujGBQgtt",
      seller_status: "Signup",
      approve_status: "Pending",
    },
  },
};

describe("User navigates to Profile Screen", () => {
  let screen: ReturnType<typeof render>;
  const spy = jest.spyOn(flash, "showMessage");
  const alert = jest.spyOn(Alert, "alert");

  beforeAll(() => {
    screen = render(<PofileScreen {...screenProps} />);
  });

  beforeEach(() => {
    spy.mockReset();
    alert.mockReset();
  });

  test("user gets to see a loader", () => {
    Platform.OS = 'android';
    const sessionMessage = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    sessionMessage.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("TOKEN", sessionMessage);

    expect(screen.queryByTestId("custom-loader")).not.toBeNull();
  });

  test("screen loads without any error", () => {
    Platform.OS = 'ios';
    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyCountryList,
    });

    screen.container.instance.countryCodeApiCallId = message.messageId;
    runEngine.sendMessage("UNIT TEST", message);

    const profileResponse = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    profileResponse.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        profileResponse.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyProfile,
    });
    screen.container.instance.getUserInfoApiCallID = profileResponse.messageId;
    runEngine.sendMessage("Profile Response", profileResponse);

    expect(screen.queryByTestId("custom-loader")).toBeNull();
  });

  test("user gets warning if first name is invalid", () => {
    const fNmame = screen.getByTestId("txtInputFirstName");
    const save = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(fNmame, "");
    fireEvent.press(save);

    expect(fNmame).toBeTruthy();
    fireEvent.changeText(fNmame, dummyProfile.data.attributes.first_name);
  });

  test("user gets warning if last name is invalid", () => {
    const lName = screen.getByTestId("txtInputLastName");
    const save = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(lName, "");
    fireEvent.press(save);

    expect(lName).toBeTruthy();
    fireEvent.changeText(lName, dummyProfile.data.attributes.last_name);
  });

  test("user gets warning if email is invalid", () => {
    const email = screen.getByTestId("txtInputEmail");
    const save = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(email, "");
    fireEvent.press(save);

    fireEvent.changeText(email, "john.xyz");
    fireEvent.press(save);

    expect(email).toBeTruthy();
    fireEvent.changeText(email, dummyProfile.data.attributes.email);
  });

  test("user gets warning if mobile number is invalid", () => {
    const phone = screen.getByTestId("txtInputPhoneNumber");
    const save = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(phone, "89898989898989");
    fireEvent.press(save);

    fireEvent.changeText(phone, "8989");
    fireEvent.press(save);

    expect(phone).toBeTruthy();
    fireEvent.changeText(phone, dummyProfile.data.attributes.phone_number);
  });

  test("user can open country dropdown", () => {
    const toggle = screen.getByTestId("phoneCodeDisplayToggle");
    fireEvent.press(toggle);

    const list = screen.getByTestId("phoneCodesFlatList");
    expect(list.props.style[1].display).toBe("flex");
  });

  test("user can choose country", () => {
    fireEvent.press(screen.getByTestId("country-0"));

    const list = screen.getByTestId("phoneCodesFlatList");
    expect(list.props.style[1].display).toBe("none");
  });

  test("user can see profile update errors", () => {
    const spy = jest.spyOn(flash, "showMessage");
    const save = screen.getByTestId("btnCreateAccount");
    fireEvent.press(save);

    const updateError = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    updateError.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: updateError.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        errors: [
          {
            full_phone_number: "error",
          },
        ],
      },
    });
    screen.container.instance.updateProfileApiCallID = updateError.messageId;
    runEngine.sendMessage("UNIT TEST", updateError);

    updateError.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      errors: {
        full_phone_number: "error",
      },
    });
    runEngine.sendMessage("UNIT TEST", updateError);

    expect(spy.mock.calls[0][0].type).toBe("warning");
  });

  test("user can save profile successfully", () => {
    const phone = screen.getByTestId("txtInputPhoneNumber");
    const email = screen.getByTestId("txtInputEmail");

    const updateSuccess = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    updateSuccess.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        updateSuccess.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        ...dummyProfile,
        meta: {
          email_token: "email",
          sms_token: "sms",
        },
      },
    });
    screen.container.instance.updateProfileApiCallID = updateSuccess.messageId;
    runEngine.sendMessage("UNIT TEST", updateSuccess);

    fireEvent.changeText(phone, "8989585856");
    fireEvent.changeText(email, "arnab@arnabxd.me");
    runEngine.sendMessage("UNIT TEST", updateSuccess);

    expect(spy.mock.calls[0][0].type).toBe("success");
  });

  test("user can type old password", () => {
    const oldPass = screen.getByTestId("txtOldPassword");
    fireEvent.changeText(oldPass, "ARNAB");
    expect(oldPass.props.value).toBe("ARNAB");
  });

  test("user can toggle old password secure text", () => {
    const oldPass = screen.getByTestId("txtOldPassword");
    fireEvent.press(screen.getByTestId("btnoldPasswordHide"));
    expect(oldPass.props.secureTextEntry).toBe(false);
    const lName = screen.getByTestId("txtInputLastName");
    const save = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(lName, "");
    fireEvent.press(save);

    expect(lName).toBeTruthy();
    fireEvent.changeText(lName, dummyProfile.data.attributes.last_name);
  });

  test("user gets error if old password is empty", () => {
    const oldPass = screen.getByTestId("txtOldPassword");
    fireEvent.changeText(oldPass, "");
    fireEvent.press(screen.getByTestId("btnChangepass"));
    expect(oldPass).toBeTruthy();
  });

  test("user can type new password", () => {
    const newPass = screen.getByTestId("txtNewPassword");
    fireEvent.changeText(newPass, "ARNAB");
    expect(newPass.props.value).toBe("ARNAB");
  });

  test("user can toggle new password secure text", () => {
    const newPass = screen.getByTestId("txtNewPassword");
    fireEvent.press(screen.getByTestId("btnNewPasswordHide"));
    expect(newPass.props.secureTextEntry).toBe(false);
  });

  test("user gets error if new pass is invalid", () => {
    const newPass = screen.getByTestId("txtNewPassword");
    const button = screen.getByTestId("btnChangepass");

    fireEvent.changeText(screen.getByTestId("txtOldPassword"), "ARNAB");

    fireEvent.changeText(newPass, "");
    fireEvent.press(button);

    fireEvent.changeText(newPass, "ARNAB");
    fireEvent.press(button);

    fireEvent.changeText(newPass, "LessSecurePass");
    fireEvent.press(button);

    expect(newPass).toBeTruthy();
  });

  test("user can type confirm new password", () => {
    const confirmNewPass = screen.getByTestId("txtInputConfirmPassword");
    fireEvent.changeText(confirmNewPass, "confirm");
    expect(confirmNewPass.props.value).toBe("confirm");
  });

  test("user can toggle confirm new password secure text", () => {
    const confirmNewPass = screen.getByTestId("txtInputConfirmPassword");
    fireEvent.press(screen.getByTestId("btnRePasswordHide"));
    expect(confirmNewPass.props.secureTextEntry).toBe(false);
  });

  test("user gets error if confirm pass is invalid", () => {
    const confirmPass = screen.getByTestId("txtInputConfirmPassword");
    const button = screen.getByTestId("btnChangepass");

    fireEvent.changeText(screen.getByTestId("txtOldPassword"), "ARNAB");
    fireEvent.changeText(screen.getByTestId("txtNewPassword"), "Arnab@123");

    fireEvent.changeText(confirmPass, "");
    fireEvent.press(button);

    fireEvent.changeText(confirmPass, "ARNAB");
    fireEvent.press(button);

    expect(confirmPass).toBeTruthy();
  });

  test("user gets error in change password response", () => {
    const updateButton = screen.getByTestId("btnChangepass");

    fireEvent.changeText(screen.getByTestId("txtOldPassword"), "ARNAB");
    fireEvent.changeText(screen.getByTestId("txtNewPassword"), "Arnab@123");
    fireEvent.changeText(
      screen.getByTestId("txtInputConfirmPassword"),
      "Arnab@123"
    );

    fireEvent.press(updateButton);

    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        errors: "Something went wrong",
      },
    });

    screen.container.instance.resetNewPasswordApiCallID = message.messageId;
    runEngine.sendMessage("UNIT TEST", message);

    expect(alert).toBeCalledTimes(1);
  });

  test("use can update password successfully", () => {
    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        meta: { message: "Password updated successsfully" },
      },
    });

    screen.container.instance.resetNewPasswordApiCallID = message.messageId;
    runEngine.sendMessage("UNIT TEST", message);

    expect(alert.mock.calls[0][0]).toBe("Success");

    const ok = alert.mock.calls[0][2]![0].onPress!
    ok();
  });
});
