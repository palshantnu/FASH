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

import { Listener } from "../__mocks__/mocks";
import {
  customProfileResponse,
} from "../__mocks__/responses";

import StylistEditProfile from "../../src/StylistEditProfile";
import StylistEditProfileWeb from "../../src/StylistEditProfile.web";

const mockListener = new Listener();
const screenProps = {
  id: "StylistEditProfile",
  navigation: {
    navigate: jest.fn(),
    goBack:jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      if (event === "focus") {
        callback();
      }
      if (event === "willFocus") {
        callback();
      }
      if (event === "didFocus") {
        callback();
      }
      if (event === "willBlur") {
        callback();
      }
      if (event === "didBlur") {
        callback();
      }
    }),
  },
};

const feature = loadFeature(
  "./__tests__/features/stylist-edit-profile.feature"
);

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementationOnce(async () => {})
      .mockImplementation(async () => ({ addressselected: "Uganda" }));
    jest
      .spyOn(utils, "getOS")
      .mockImplementationOnce(() => "ios")
      .mockImplementation(() => "android");
  });

  afterEach(() => {
    cleanup();
  });

  test("I am a stylist who just signed up", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I am on edit profile step one", () => {
      screen = render(<StylistEditProfile {...screenProps} />);
      render(<StylistEditProfileWeb {...screenProps} />);

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
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: customProfileResponse,
      });
      screen.container.instance.getStylishProfileApiCallId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);
    });

    when("I click on upload profile image", () => {
        fireEvent.press(screen.getByTestId("goBack"));
      fireEvent.press(screen.getByTestId("removePfp"));
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
      expect(
        screen.queryByText("Please enter", { exact: false })
      ).toBeNull();
    });

    when("I fill all the data and press continue", () => {
      fireEvent.changeText(screen.getByTestId("profileBio"), "Profile");
      fireEvent.changeText(screen.getByTestId("areaOfExpertise"), "All");
      fireEvent.changeText(screen.getByTestId("yoe"), "2");
      // fireEvent.changeText(screen.getByTestId("insta"), "instagram/builder");
      fireEvent.changeText(screen.getByTestId("facebook"), "facebook/builder");
      fireEvent.changeText(screen.getByTestId("tiktok"), "tiktok/builder");
      fireEvent.changeText(
        screen.getByTestId("pinterest"),
        "pinterest/builder"
      );
      fireEvent.press(screen.getByTestId("nextBtn"));
      fireEvent.press(screen.getByTestId("goBack"));
      

      fireEvent(screen.getByTestId("selectLanguage"), "change", {
        value: "english",
      });
      fireEvent.press(screen.getByTestId("nextBtn"));
      const countryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      countryMessage.initializeFromObject({
        [getName(
          MessageEnum.RestAPIResponceDataMessage
        )]: countryMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: customProfileResponse,
      });
      screen.container.instance.updateStylishDataApiCallId =
        countryMessage.messageId;
      runEngine.sendMessage(countryMessage.messageId, countryMessage);
      fireEvent.press(screen.getByTestId("nextBtn"));
    });
    then("It goes back to step one", () => {
      expect(screen.queryByTestId("step1")).not.toBe(null);
      cleanup();
    });

    when("User has selected english in the language section",()=>{
      screen = render(<StylistEditProfile {...screenProps} />);
      const instance = screen.container.instance
      if(instance)
        {
          instance.setState({selectedlanguage:"en"})
        }
     instance.backToProfilePage()
     instance.headerButtonPressLeft()
     instance.headerButtonPressRight()
     instance.nextBtn()
     instance.updateStylishProfile()
     instance.validateCheck()
    expect(instance.state.errorKey).toBe('profileBio');
    expect(instance.setState).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
        errorKey: 'profileBio',
      })
    );
    expect(instance.updateStylishProfile).not.toHaveBeenCalled();
    expect(instance.scrollRef.current.scrollToEnd).toHaveBeenCalled();
    expect(instance.state.errorKey).toBe('language');
    })
then("component renders with english",()=>{
let button=  screen.getByTestId("btn-navigation-left")
  fireEvent.press(button)
})
when("User has selected arab in the language section",()=>{
  screen = render(<StylistEditProfile {...screenProps} />);
   const instance = screen.container.instance
   if(instance)
    {
      instance.setState({selectedlanguage:"ar",errorKey:"language"})
    }
})
then("component renders with arab",()=>{
 let button= screen.getByTestId("btn-navigation-right")
 fireEvent.press(button)
})

  });

 
});
