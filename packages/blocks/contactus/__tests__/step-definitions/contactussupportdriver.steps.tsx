import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ContactUsSupportDriver from "../../src/ContactUsSupportDriver";
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");
import { _ } from "../../../../framework/src/IBlock";
import { jest, beforeEach, expect } from '@jest/globals';

const screenProps = {
  navigation: {
    navigate:jest.fn(),
    goBack:jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "ContactUsSupportDriver",
};

const feature = loadFeature("./__tests__/features/contactussupportdriver-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactussupportdriver", ({ given, when, then }) => {
    let ContactUsSupportDriverWrapper: ShallowWrapper;
    let instance: ContactUsSupportDriver;

    given("I am a User loading contactussupportdriver", () => {
      ContactUsSupportDriverWrapper = shallow(<ContactUsSupportDriver {...screenProps} />);
    });

    when("I navigate to the contactussupportdriver", () => {
      instance = ContactUsSupportDriverWrapper.instance() as ContactUsSupportDriver;
    });

    then("contactussupportdriver will load with out errors", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
    });

    then("I can click back icon with out errors", () => {
      const backButton = ContactUsSupportDriverWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackContactSupportDriver")
      backButton.simulate("press")
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can click admin call button with out errors", () => {
        const redirectBtn = ContactUsSupportDriverWrapper.findWhere(
          (node) => node.prop("testID") === "btnContactCallRedirectionDriver")
        redirectBtn.simulate("press")
        expect(redirectBtn.exists()).toBe(true);
    });

    then("I can click payout specific button with out errors", () => {
        const redirectBtn = ContactUsSupportDriverWrapper.findWhere(
        (node) => node.prop("testID") === "btnContactFormPayoutRedirection")
        redirectBtn.simulate("press")
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationContactUsAddContactDriverMessage" }),
            ])
        );
    });

    then("I can click delivered order specific button with out errors", () => {
        const redirectBtn = ContactUsSupportDriverWrapper.findWhere(
          (node) => node.prop("testID") === "btnContactFormDeliveredRedirection")
        redirectBtn.simulate("press")
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationContactUsAddContactDriverMessage" }),
            ])
        );
      });
  });
});