import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { beforeAll, jest, expect } from "@jest/globals";
import { loadFeature, defineFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import i18n from '../../../../components/src/i18n/i18n.config';
import React from "react";
import { ViewStyle } from "react-native";
import Settings2Language from "../../src/Settings2Language";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

const feature = loadFeature('./__tests__/features/settings2language-scenario.feature')

const navigationProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "Settings2Language",
};

const sendMessage = jest.spyOn(runEngine, "sendMessage");

let LogiOptionsScreenInstance: ReturnType<typeof render>;
const map = new Map();

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Settings2Language", ({ given, when, then }) => {
    let languageScreenBlock:ShallowWrapper;
    let settingInstance:Settings2Language; 
    given("I am a User loading Settings2Language", async () => {
      LogiOptionsScreenInstance = render(<Settings2Language {...navigationProps} />);
      languageScreenBlock = shallow(<Settings2Language {...navigationProps}/>)
    })

    when("I navigate to the Settings2Language", () => {
      settingInstance = languageScreenBlock.instance() as Settings2Language
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:{
            "id": "1123",
            "type": "language",
            "attributes": {
                "id": 1123,
                "language": "English",
                "currency": "Dollar"
            }
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.getLanguageCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    });

    then("Settings2Language will load with out errors", async () => {
      const screen = await LogiOptionsScreenInstance.findByTestId(
        "Settings2Language"
      );
      expect(screen).toBeTruthy();

        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
    });

    then("I can click back button with out errors", async () => {
        const navigateBtn = await LogiOptionsScreenInstance.findByTestId(
          "btnBackLanguageCurrency"
        );
  
        fireEvent(navigateBtn, "onPress");
    })

    then("I can change app language", async () => {
      // Given user can see languages
      const items = await LogiOptionsScreenInstance.findAllByTestId("language");
      expect(items.length).not.toBeNaN();
      expect(items.length).toBeGreaterThan(0);

      // When user clicks on language
      const lastItem = items[items.length - 1];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style).toBeTruthy();
      expect(style.borderColor).toBe("#CCBEB1");
    });

    then("I can change currency", async () => {
      // Given user can see languages
      const items = await LogiOptionsScreenInstance.findAllByTestId("currency");
      expect(items.length).not.toBeNaN();
      expect(items.length).toBeGreaterThan(0);

      // When user clicks on language
      const lastItem = items[items.length - 1];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style).toBeTruthy();
      expect(style.borderColor).toBe("#CCBEB1");
    });

    then("I can update language and currency api with out errors", () => {
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:{
            "id": "1123",
            "type": "language",
            "attributes": {
                "id": 1123,
                "language": "English",
                "currency": "Dollar"
            }
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.updateLanguageAndCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    });

    then("I can update language and currency api with errors", () => {
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "error":{
            "message":"Invalid Token"
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.updateLanguageAndCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    });

    then("I can leave the screen with out errors", async () => {
      const navigateBtn = await LogiOptionsScreenInstance.findByTestId(
        "continueBtnLanguage"
      );

      fireEvent(navigateBtn, "onPress");
    })

    then("I can call get language api arabic language with out errors", () => {
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:{
            "id": "1123",
            "type": "language",
            "attributes": {
                "id": 1123,
                "language": "Arabic",
                "currency": "Dollar"
            }
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.getLanguageCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
      settingInstance.updateLocalLanguage(1)
    });

    then("I can change currency dollar and update", () => {
      // Given user can see languages
      const items = LogiOptionsScreenInstance.getAllByTestId("currency");

      // When user clicks on language
      const lastItem = items[items.length - 2];
      fireEvent(lastItem, "onPress");

      // Then language should get updated
      const style = lastItem.props.style as ViewStyle;
      expect(style.borderColor).toBe("#CCBEB1");

      const navigateBtn = LogiOptionsScreenInstance.getByTestId("continueBtnLanguage");
      fireEvent(navigateBtn, "onPress");
      settingInstance.setState({selectedCurrencyIndex:1})
      settingInstance.setCurrencyUpdate()
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:{
            "id": "1123",
            "type": "language",
            "attributes": {
                "id": 1123,
                "language": "Arabic",
                "currency": "Dinar"
            }
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.getLanguageCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
    });
  });

  test("User navigates to Settings2Language for currency update", ({ given, when, then }) => {
    let languageScreenBlock:ShallowWrapper;
    let settingInstance:Settings2Language; 
    given("I am a User loading Settings2Language for currency update", async () => {
      LogiOptionsScreenInstance = render(<Settings2Language {...navigationProps} />);
      languageScreenBlock = shallow(<Settings2Language {...navigationProps}/>)
    })

    when("I navigate to the Settings2Language for currency update", () => {
      settingInstance = languageScreenBlock.instance() as Settings2Language
      const getCategoryMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage
      );
      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:{
            "id": "1123",
            "type": "language",
            "attributes": {
                "id": 1123,
                "language": "English",
                "currency": "Dollar"
            }
          }
        }
      );

      getCategoryMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoryMessage.messageId
      );
      settingInstance.getLanguageCurrencyApiCallID = getCategoryMessage.messageId;
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      );
    });

    then("I can click back button with out errors for currency update", async () => {
        const navigateBtn = await LogiOptionsScreenInstance.findByTestId(
          "btnBackLanguageCurrency"
        );
  
        fireEvent(navigateBtn, "onPress");
    })
  });
  jest.mock("../../../../framework/src/Utilities", () => {
    return {
      getStorageData: jest.fn().mockImplementation((keys) => {
        if (keys === "token") {
          return null;
        }
       return null;
      }),
      setStorageData: jest.fn(),
      removeStorageData: jest.fn()
    };
  });
  test("User navigates to Settings2Language for currency update with out token", ({ given, when, then }) => {
    let languageScreenBlock:ShallowWrapper;
    let settingInstance:Settings2Language; 
    i18n.language = 'en';
    given("I am a User loading Settings2Language for currency update with out token", async () => {
      languageScreenBlock = shallow(<Settings2Language {...navigationProps}/>)
    })
  })
  test("User navigates to Settings2Language for currency update with out token with ar lang", ({ given, when, then }) => {
    let languageScreenBlock:ShallowWrapper;
    let settingInstance:Settings2Language; 
    given("I am a User loading Settings2Language for currency update with out token", async () => {
      i18n.language = 'ar';
      languageScreenBlock = shallow(<Settings2Language {...navigationProps}/>)
    })
  })
});



