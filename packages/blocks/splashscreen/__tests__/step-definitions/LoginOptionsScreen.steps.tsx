import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { beforeAll, jest, expect } from "@jest/globals";
import { loadFeature, defineFeature } from "jest-cucumber";

import React from "react";
import { ViewStyle } from "react-native";
import LoginOptionsScreen from "../../src/LoginOptionsScreen";
import * as helpers from "../../../../framework/src/Helpers";

import storage from "../../../../framework/src/StorageProvider";
import * as utils from "framework/src/Utilities";
import i18n from "../../../../components/src/i18n/i18n.config";

const feature = loadFeature(
  "./__tests__/features/loginoptionsscreen-scenario.feature"
);

const navigationProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
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
  id: "LoginOptionsScreen",
};

let LogiOptionsScreenInstance: ReturnType<typeof render>;
const map = new Map();

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    jest.mock("../../../../framework/src/StorageProvider");
    const setData = jest.spyOn(utils, "setStorageData");

    // storage.set = (k: string, v: string) => map.set(k, v);
    storage.get = (k: string) => map.get(k);
    setData.mockImplementation(async (key, value) => {
      // console
      map.set(key, value);
    });
  });

  test("User navigates to LoginOptionsScreen", ({ given, when, then }) => {
    given("I am a User loading LoginOptionsScreen", () => {
      i18n.language = "ar";
      LogiOptionsScreenInstance = render(
        <LoginOptionsScreen {...navigationProps} />
      );
    });

    when("I navigate to the LoginOptionsScreen", () => {
      expect(LogiOptionsScreenInstance).toBeDefined();
    });

    then("LoginOptionsScreen will load with out errors", () => {
      const screen =
        LogiOptionsScreenInstance.getByTestId("loginOptionsScreen");
      expect(screen).toBeTruthy();
    });

    then("I can change login mode", () => {
      // Given user can see login modes
      const items = LogiOptionsScreenInstance.getAllByTestId("mode");

      // When user clicks on login mode
      const lastItem = items[items.length - 1];
      fireEvent(lastItem, "onPress");

      // Then login mode should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");
    });

    then("I can change app language", () => {
      // Given user can see languages
      const items = LogiOptionsScreenInstance.getAllByTestId("language");

      // When user clicks on language
      const lastItem = items[items.length - 1];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");
    });

    then("I can change app language arabic", () => {
      // Given user can see languages
      const items = LogiOptionsScreenInstance.getAllByTestId("language");

      // When user clicks on language
      const lastItem = items[items.length - 2];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");
    });

    then("I can change currency", () => {
      // Given user can see languages
      const items = LogiOptionsScreenInstance.getAllByTestId("currency");

      // When user clicks on language
      const lastItem = items[items.length - 1];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");
    });

    when("I chose buyer mode", () => {
      fireEvent.press(LogiOptionsScreenInstance.getAllByTestId("mode")[0]);
      fireEvent.press(LogiOptionsScreenInstance.getByTestId("continueBtn"));
    });

    then("I do not see login screen", () => {
      expect(map.get("autoLogin")).toBeDefined();
    });

    when("I click on other modes", () => {
      fireEvent.press(LogiOptionsScreenInstance.getAllByTestId("mode")[1]);
      const navigateBtn = LogiOptionsScreenInstance.getByTestId("continueBtn");
      fireEvent(navigateBtn, "onPress");

      fireEvent.press(LogiOptionsScreenInstance.getAllByTestId("mode")[2]);
      fireEvent(navigateBtn, "onPress");

      fireEvent.press(LogiOptionsScreenInstance.getAllByTestId("mode")[3]);
      fireEvent(navigateBtn, "onPress");
    });

    then("I can change currency dollar", () => {
      // Given user can see languages
      const items = LogiOptionsScreenInstance.getAllByTestId("currency");

      // When user clicks on language
      const lastItem = items[items.length - 2];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");

      const navigateBtn = LogiOptionsScreenInstance.getByTestId("continueBtn");
      fireEvent(navigateBtn, "onPress");
    });

    then("I can leave the screen with out errors", () => {
      const screen =
        LogiOptionsScreenInstance.getByTestId("loginOptionsScreen");
      expect(screen).toBeTruthy();
    });
  });
});
