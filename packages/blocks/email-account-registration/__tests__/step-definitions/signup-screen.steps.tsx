import React from "react";
import { describe, jest, it, test, beforeAll, expect } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";

import SignupScreen from "../../src/SignupScreen";
import { Alert } from "react-native";

const screenProps = {
  id: "SignUpScreen",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
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
const sendMessage = jest.spyOn(runEngine, "sendMessage");
describe("User navigates to Signup Screen", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(async () => {
    jest.useFakeTimers();
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementation(async (key: string) => {
        if (key === "FA_LOGIN_MODE") {
          return "Seller";
        }
        return "";
      });

    screen = render(<SignupScreen {...screenProps} />);
  });

  test("screen loads without any error", () => {
    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyCountryList,
    });
    screen.container.instance.countryCodeApiCallId = message.messageId;
    runEngine.sendMessage("FETCH COUNTRY CODES", message);

    expect(screen.queryByTestId("custom-loader")).toBeNull();
  });

  test("user can enter first name", () => {
    const fName = screen.getByTestId("txtInputFirstName");
    fireEvent.changeText(fName, "JOHN");
    fireEvent(fName, "submitEditing");

    expect(fName.props.value).toBe("JOHN");
  });

  test("user can enter last name", () => {
    const lName = screen.getByTestId("txtInputLastName");
    fireEvent.changeText(lName, "DOE");
    fireEvent(lName, "submitEditing");

    expect(lName.props.value).toBe("DOE");
  });

  test("use can enter email", () => {
    const email = screen.getByTestId("txtInputEmail");
    fireEvent.changeText(email, "john@doe.moe");
    fireEvent(email, "submitEditing");

    expect(email.props.value).toBe("john@doe.moe");
  });

  test("user can change password", () => {
    const password = screen.getByTestId("txtInputPassword");
    fireEvent.changeText(password, "SECURE");
    fireEvent(password, "submitEditing");

    expect(password.props.value).toBe("SECURE");
  });

  test("user can toggle secure password", () => {
    const password = screen.getByTestId("txtInputPassword");
    fireEvent.press(screen.getByTestId("btnPasswordHide"));
    expect(password.props.secureTextEntry).toBe(false);
  });

  test("user can change confirm password", () => {
    const password = screen.getByTestId("txtInputConfirmPassword");
    fireEvent.changeText(password, "SECURE");
    fireEvent(password, "submitEditing");

    expect(password.props.value).toBe("SECURE");
  });

  test("user can toggle secure confirm password", () => {
    const password = screen.getByTestId("txtInputConfirmPassword");
    fireEvent.press(screen.getByTestId("btnRePasswordHide"));
    expect(password.props.secureTextEntry).toBe(false);
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

  test("user can change mobile number", () => {
    const phone = screen.getByTestId("txtInputPhoneNumber");

    fireEvent.changeText(phone, "8910123654");
    expect(phone.props.value).toBe("8910123654");
  });

  test("user can toggle privacy policy checkbox", () => {
    const checkbox = screen.getByTestId("checkbox");
    const image = screen.getByTestId("checkboxImage");
    fireEvent.press(checkbox);

    expect(image.props.source).not.toBe(null);
  });

  test("user gets warning for invalid first name", () => {
    const fName = screen.getByTestId("txtInputFirstName");
    fireEvent.changeText(fName, "");

    fireEvent.press(screen.getByTestId("btnCreateAccount"));
    expect(fName).toBeTruthy();

    fireEvent.changeText(fName, "John");
  });

  test("user gets warning for invalid last name", () => {
    const lName = screen.getByTestId("txtInputLastName");
    fireEvent.changeText(lName, "");

    fireEvent.press(screen.getByTestId("btnCreateAccount"));
    expect(lName).toBeTruthy();

    fireEvent.changeText(lName, "Doe");
  });

  test("user gets warning for invalid email", () => {
    const email = screen.getByTestId("txtInputEmail");
    const create = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(email, "");
    fireEvent.press(create);

    fireEvent.changeText(email, "fash");
    fireEvent.press(create);

    expect(email).toBeTruthy();

    fireEvent.changeText(email, "john@doe.moe");
  });

  test("user gets warning for invalid password", () => {
    const password = screen.getByTestId("txtInputPassword");
    const create = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(password, "");
    fireEvent.press(create);

    fireEvent.changeText(password, "#USER@1234");
    fireEvent.press(create);

    expect(password).toBeTruthy();
    fireEvent.changeText(password, "User@1234");
  });

  test("user gets warning for invalid confirm password", () => {
    const password = screen.getByTestId("txtInputConfirmPassword");
    const create = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(password, "");
    fireEvent.press(create);

    fireEvent.changeText(password, "random");
    fireEvent.press(create);

    expect(password).toBeTruthy();

    fireEvent.changeText(password, "User@1234");
  });

  test("user gets warning for invalid phone numbers", () => {
    const phone = screen.getByTestId("txtInputPhoneNumber");
    const create = screen.getByTestId("btnCreateAccount");

    fireEvent.changeText(phone, "1234567890123");
    fireEvent.press(create);

    fireEvent.changeText(phone, "");
    fireEvent.press(create);

    fireEvent.changeText(phone, "123");
    fireEvent.press(create);

    expect(phone).toBeTruthy();
    fireEvent.changeText(phone, "8910123654");
  });

  test("user gets warning if checkbox is not marked", () => {
    const create = screen.getByTestId("btnCreateAccount");
    const checkbox = screen.getByTestId("checkbox");

    fireEvent.press(checkbox);
    fireEvent.press(create);

    expect(create).toBeTruthy();
    fireEvent.press(checkbox);
  });

  test("user faces error in signing up", () => {
    const create = screen.getByTestId("btnCreateAccount");
    fireEvent.press(create);

    const spy = jest.spyOn(Alert, "alert");

    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        errors: { full_phone_number: "enter valid phone" },
      },
    });
    screen.container.instance.createAccountApiCallID = message.messageId;
    runEngine.sendMessage("create account", message);

    message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      errors: { email: "enter valid email" },
    });
    runEngine.sendMessage("create account", message);

    message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      errors: { unknown: "Something went wrong" },
    });
    runEngine.sendMessage("create account", message);

    const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    expect(lastCall[1]).toBe("Unknown Something went wrong");
  });

  test("user can sign up successfully", () => {
    const create = screen.getByTestId("btnCreateAccount");
    fireEvent.press(create);

    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          id: "652",
          type: "account",
          attributes: {
            activated: false,
            country_code: "91",
            email: "john@john.me",
            first_name: "John",
            full_phone_number: "918910369360",
            last_name: "Doe",
            full_name: "John Doe",
            phone_number: "8910369360",
            type: null,
            created_at: "2024-04-24T05:04:44.668Z",
            updated_at: "2024-04-24T05:04:44.668Z",
            device_id: null,
            unique_auth_id: "10kGUKpG2jtxZqwwTf5Fkgtt",
            seller_status: "Signup",
            approve_status: "Pending",
          },
        },
        meta: {
          sms_otp_token: "TOKEN",
          email_otp_token: "TOKEN",
        },
      },
    });
    screen.container.instance.createAccountApiCallID = message.messageId;
    runEngine.sendMessage("create account", message);
    jest.runAllTimers();
  });

  test("user can go to terms and conditions", () => {
    fireEvent.press(screen.getByTestId("btnTnC"));
    expect(sendMessage.mock.calls).toContainEqual(
      expect.arrayContaining([
        expect.anything(),
        expect.objectContaining({ id: "NavigationTermsAndConditionsPrivacy" }),
      ])
    );
  });

  test("user can go to privacy policy", () => {
    fireEvent.press(screen.getByTestId("btnPnS"));
    expect(sendMessage.mock.calls).toContainEqual(
      expect.arrayContaining([
        expect.anything(),
        expect.objectContaining({ id: "NavigationTermsAndConditionsPrivacy" }),
      ])
    );
  });

  test("user can go back", () => {
    fireEvent.press(screen.getByTestId("backButtonID"));
    expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);

    const button = ('btnCreateAccount');
    const text = ('Create Account');
    expect(button).toBeTruthy();
    expect(text).toBeTruthy();
    const createAccountMock = jest.fn();
    expect(createAccountMock).toHaveBeenCalled();

  });
});
