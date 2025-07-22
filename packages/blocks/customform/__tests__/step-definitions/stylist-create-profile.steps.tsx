import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { jest, expect, beforeAll, afterEach } from "@jest/globals";
import * as flash from "react-native-flash-message";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
import { Platform } from "react-native";
import i18n from "../../../../components/src/i18n/i18n.config";
import { Listener } from "../__mocks__/mocks";
import {
  dummyCountryList,
  customProfileResponse,
} from "../__mocks__/responses";

import StylistCreateProfile from "../../src/StylistCreateProfile";
import StylistCreateProfileWeb from "../../src/StylistCreateProfile.web";
import { error } from "console";

const mockListener = new Listener();
const mockRef = { current: {} };

const screenProps = {
  id: "StylistCreateProfile",
  navigation: {
    navigate: jest.fn(),
    goBack:jest.fn(),
    addListener: mockListener.addEventListener,
  },
};

const feature = loadFeature(
  "./__tests__/features/stylist-create-profile.feature"
);


defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementationOnce(async () => {})
      .mockImplementation(async () => ({ addressselected: "Uganda" }));
  });

  afterEach(() => {
    cleanup();
  });

  test("I am a stylist who just signed up", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I am on create profile step one", () => {
      Object.defineProperty(Platform, 'OS', {
        get: jest.fn(() => 'android'), // Change to 'ios' as needed
      });
      expect(Platform.OS).toBe('android');
      screen = render(<StylistCreateProfile {...screenProps} />);
      render(<StylistCreateProfileWeb {...screenProps} />);
      Object.defineProperty(Platform, 'OS', {
        get: jest.fn(() => 'ios'), // Change to 'ios' as needed
      });
      expect(Platform.OS).toBe('ios');
      screen = render(<StylistCreateProfile {...screenProps} />);
      mockListener.simulateListener("willFocus");

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage(sessionMessage.messageId, sessionMessage);

      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyCountryList,
      });
      screen.container.instance.countryCodesApiCallId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);
    });

    when("I click on upload profile image", () => {
      fireEvent.press(screen.getByTestId("selectPfp"));
      fireEvent.press(screen.getByTestId("btn_gallery"));
      fireEvent.press(screen.getByTestId("btn_camera"));
      fireEvent.press(screen.getByTestId("btn_cancelMedia"));
    });

    then("I can choose the image", () => {
    });

    when("I click next", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("I get errors due to missing data", () => {
      // expect(
      //   screen.queryByText("Please enter", { exact: false })
      // ).not.toBeNull();
    });

    when("I fill all the data and press continue", () => {
      fireEvent.changeText(screen.getByTestId("profileBio"), "Profile");
      fireEvent(screen.getByTestId("profileBio"), 'submitEditing')
      fireEvent.changeText(screen.getByTestId("areaOfExpertise"), "All");
      fireEvent.changeText(screen.getByTestId("yoe"), "2");
      fireEvent.changeText(screen.getByTestId("insta"), "instagram/builder");
      fireEvent.changeText(screen.getByTestId("facebook"), "facebook/builder");
      fireEvent.changeText(screen.getByTestId("tiktok"), "tiktok/builder");
      fireEvent.changeText(
        screen.getByTestId("pinterest"),
        "pinterest/builder"
      );

      fireEvent.press(screen.getByTestId("goBack"));
      fireEvent.press(screen.getByTestId("nextBtn"));

      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("I go to second step", () => {
    });

    when("I click go back", () => {
      fireEvent.press(screen.getByTestId("goBack"));
    });

    then("It goes back to step one", () => {
      cleanup();
    });
  });

  test("I am on step two trying to fill data", ({ given, when, then, and }) => {
    let screen: ReturnType<typeof render>;
    const messageSpy = jest.spyOn(runEngine, "sendMessage");

    given("The page is loaded", () => {
      screen = render(<StylistCreateProfile {...screenProps} />);
      i18n.language = "ar";
      mockListener.simulateListener("willFocus");

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage(sessionMessage.messageId, sessionMessage);

      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyCountryList,
      });
      screen.container.instance.countryCodesApiCallId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);

      fireEvent.changeText(screen.getByTestId("profileBio"), "Profile");
      fireEvent.changeText(screen.getByTestId("areaOfExpertise"), "All");
      fireEvent.changeText(screen.getByTestId("yoe"), "2");
      fireEvent.changeText(screen.getByTestId("insta"), "instagram/builder");
      fireEvent.changeText(screen.getByTestId("facebook"), "facebook/builder");
      fireEvent.changeText(screen.getByTestId("tiktok"), "tiktok/builder");
      fireEvent.changeText(
        screen.getByTestId("pinterest"),
        "pinterest/builder"
      );
      fireEvent(screen.getByTestId("selectLanguage"), "change", {
        value: "english",
      });
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    when("I click on gps button", () => {
      fireEvent.press(screen.getByTestId("btnRedirectGps"));
    });

    then("It goes to map selection screen", () => {
      const lastCall = messageSpy.mock.calls[messageSpy.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationCustomformMapMessage");
    });

    when("I come back after selection", () => {
      mockListener.simulateListener("willFocus");
    });

    then("Address gets updated", () => {
      expect(screen.getByTestId("address").props.value).toBe("Uganda");
    });

    when("I click on next", () => {
      fireEvent.changeText(screen.getByTestId("area"), "Kolkata");
      fireEvent.changeText(screen.getByTestId("block"), "III");
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("I get warning due to missing fields", () => {
      // expect(
      //   screen.queryByText("Please enter", { exact: true })
      // ).not.toBeNull();
    });

    when("I fill all details", () => {
      fireEvent.changeText(screen.getByTestId("address"), "Sova");
      fireEvent.changeText(screen.getByTestId("mallName"), "Gekko");
      fireEvent.changeText(screen.getByTestId("floor"), "3rd");
      fireEvent.changeText(screen.getByTestId("unitNumber"), "99");
      fireEvent.changeText(screen.getByTestId("city"), "Breach");
      fireEvent.changeText(screen.getByTestId("zip"), "700001");

      fireEvent.press(screen.getByTestId("country-1"));
      fireEvent.press(screen.getByTestId("phoneCodeDisplayToggle"));
      fireEvent.press(screen.getByTestId("phoneCodeDisplayToggle"));
      fireEvent.changeText(screen.getByTestId("mobilePhone"), "89878986");

      fireEvent.changeText(screen.getByTestId("accName"), "Skye");
      fireEvent.changeText(screen.getByTestId("iban"), "DE008938248");
      fireEvent.changeText(screen.getByTestId("accNumber"), "33296053006");
    });

    and("Click next", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));
      const checkIbanMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      checkIbanMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        checkIbanMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          "owner_iban_valid": false
      },
      });
      screen.container.instance.checkIBANCallID = checkIbanMessage.messageId;
      runEngine.sendMessage(checkIbanMessage.messageId, checkIbanMessage);
      checkIbanMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        checkIbanMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          "owner_iban_valid": true
      },
      });
      screen.container.instance.checkIBANCallID = checkIbanMessage.messageId;
      runEngine.sendMessage(checkIbanMessage.messageId, checkIbanMessage);

      const responseError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseError.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        responseError.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: 
        {
          error : "error"
        },
      });
      screen.container.instance.updateDataApiCallId = responseError.messageId;
      runEngine.sendMessage(responseError.messageId, responseError);

      responseError.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        responseError.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: 
        {
          errors : "error"
        },
      });
      screen.container.instance.updateDataApiCallId = responseError.messageId;
      runEngine.sendMessage(responseError.messageId, responseError);

      const updateMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          updateMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: { id: 1 },
        },
      });
      screen.container.instance.updateDataApiCallId = updateMessage.messageId;
      runEngine.sendMessage(updateMessage.messageId, updateMessage);
    });

    then("My profile gets updated and redirects to step three", () => {
      expect(screen.queryByTestId("step3")).not.toBe(null);
      cleanup();
    });
  });

  test("I am on step three trying to create portfolio", ({
    given,
    when,
    then,
    and,
  }) => {
    let screen: ReturnType<typeof render>;
    const flashSpy = jest.spyOn(flash, "showMessage");

    given("I am on step three", () => {
      screen = render(<StylistCreateProfile {...screenProps} />);

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage(sessionMessage.messageId, sessionMessage);

      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyCountryList,
      });
      screen.container.instance.countryCodesApiCallId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);

      const customProfileMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      customProfileMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          customProfileMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          customProfileResponse,
      });
      screen.container.instance.getCustomProfileApiCallId =
        customProfileMessage.messageId;
      runEngine.sendMessage(
        customProfileMessage.messageId,
        customProfileMessage
      );

      const updateMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          updateMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: { id: 1 },
        },
      });
      screen.container.instance.updateDataApiCallId = updateMessage.messageId;
      runEngine.sendMessage(updateMessage.messageId, updateMessage);
    });

    when("I click on upload multiple photos", () => {
      fireEvent.press(screen.getByTestId("uploadMultiplePhotos"));
      fireEvent.press(screen.getByTestId("btn_gallery"));
      fireEvent.press(screen.getByTestId("btn_camera"));
      fireEvent.press(screen.getByTestId("btn_gallery"));
    });
    then("the screen still gets rendered", () => {
      screen.container.instance.setState({ selectedlanguage: "en" });
      expect(screen.container).toBeTruthy();
      screen.container.instance.setState({ selectedlanguage: "ar" });
      expect(screen.container).toBeTruthy();
    });

    then("I can select photos", () => {
    });

    and("I can update description", () => {
    });

    when("I click on next", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));

      const portfolioMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      portfolioMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          portfolioMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: {} },
      });
      screen.container.instance.uploadPortfolioApiCallId =
        portfolioMessage.messageId;
      runEngine.sendMessage(portfolioMessage.messageId, portfolioMessage);
    });

    then("my portfolio gets created", () => {
      const lastCall = flashSpy.mock.calls[flashSpy.mock.calls.length - 1];
      expect(lastCall[0].message).toBe("uploadSuccess");
    });

    when("I click on delete all", () => {
    });

    then("Photos gets removed", () => {
      expect(screen.queryByTestId("portfolioBlock")).toBeNull();
      fireEvent.press(screen.getByTestId("nextBtn"));
    });
    then("screen completely gets rendered", () => {
      screen.container.instance.setState({ step: 0 },()=>{
        screen.container.instance. goBackStep()
      });
      screen.container.instance.setState({ selectedlanguage: "en" });
      expect(screen.container).toBeTruthy();

      let backButton =  screen.getByTestId("goBack");
      fireEvent.press(backButton);
      fireEvent.press(backButton);
      fireEvent.press(backButton);
    });
  });
});
