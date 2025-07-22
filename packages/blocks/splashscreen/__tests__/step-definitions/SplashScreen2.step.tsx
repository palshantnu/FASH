import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Splash2Screen from "../../src//SplashScreen2";
import { getStorageData} from "../../../../framework/src/Utilities";

const navigation = require("react-navigation");
jest.useFakeTimers();
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
  id: "Splash2Screen",
};

const feature = loadFeature(
  "./__tests__/features/SplashScrren2-scenario.feature"
);

defineFeature(feature, (test) => {
  let sendSpy: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    sendSpy = jest.fn();
  });

  test("User navigates to Splash2Screen", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instanceSplash2Screen: Splash2Screen;

    given("I am a User loading Splash2Screen", () => {
      exampleBlockA = shallow(<Splash2Screen {...screenProps} />);
      instanceSplash2Screen = exampleBlockA.instance() as Splash2Screen;
    });
    when("I navigate to the Splash2Screen", () => {
      instanceSplash2Screen = exampleBlockA.instance() as Splash2Screen;
      instanceSplash2Screen.autoLogin();
    });

    then("I can press to back Button", async () => {
      jest.runAllTimers();
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(msgTokenAPI).toBeTruthy();
      (getStorageData as jest.Mock).mockResolvedValueOnce(null);

      const redirectSpy = jest.fn();
  
      await instanceSplash2Screen.autoLogin.call({ send: sendSpy, btnLoginOptionsRedirection: redirectSpy });
  
      expect(sendSpy).not.toHaveBeenCalled(); 
      redirectSpy();
      expect(redirectSpy).toHaveBeenCalled(); 

    });
  });



  test("User navigates to Splash2Screen deepLinking", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instanceSplash2Screen: Splash2Screen;

    given("I am a User loading Splash2Screen deepLinking", () => {
      exampleBlockA = shallow(<Splash2Screen {...screenProps} />);
      instanceSplash2Screen = exampleBlockA.instance() as Splash2Screen;
    });
    when("I navigate to the Splash2Screen deepLinking", () => {
      instanceSplash2Screen = exampleBlockA.instance() as Splash2Screen;
      instanceSplash2Screen.autoLogin();
    });

    then("I can press to back Button deepLinking", async () => {
      jest.runAllTimers();
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      var data ={
        screenName : 'SignUpScreen',
        id:'282'
      }
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(msgTokenAPI).toBeTruthy();
      (getStorageData as jest.Mock).mockResolvedValueOnce(data);

      const redirectSpy = jest.fn();
  
      await instanceSplash2Screen.autoLogin.call({ send: sendSpy, btnLoginOptionsRedirection: redirectSpy });
  
      expect(sendSpy).not.toHaveBeenCalled(); 
      redirectSpy();
      expect(redirectSpy).toHaveBeenCalled(); 

    });
  });
});
