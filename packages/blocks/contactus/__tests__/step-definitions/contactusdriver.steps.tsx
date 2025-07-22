import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ContactusDriver from "../../src/ContactusDriver";
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
  id: "ContactusDriver",
};

const itemObject = {
  id:1,
  "attributes":{
    "id":1,
    "title":"Payout",
    "answer":"Payment/Refund",
    "status":false
  }
}

const feature = loadFeature("./__tests__/features/contactusdriver-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactusdriver", ({ given, when, then }) => {
    let ContactusDriverWrapper: ShallowWrapper;
    let instance: ContactusDriver;

    given("I am a User loading contactusdriver", () => {
      ContactusDriverWrapper = shallow(<ContactusDriver {...screenProps} />);
    });

    when("I navigate to the contactusdriver", () => {
      instance = ContactusDriverWrapper.instance() as ContactusDriver;
    });

    then("contactusdriver will load with out errors", () => {
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
      const backButton = ContactusDriverWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackContactUs")
      backButton.simulate("press")
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show query with out errors", () => {
      let render_item = ContactusDriverWrapper.findWhere(node=>node.prop("testID") === 'contactQuery_flat_data')
      let render_data = render_item.renderProp("renderItem")({item:itemObject,index:0})
      expect(render_data.exists()).toBe(true);
      render_item.renderProp("ItemSeparatorComponent")({})

      const buttonNavigate = render_data.findWhere(
        (node) => node.prop("testID") == "select_contact_btn"
      )
      buttonNavigate.simulate("press")
    });

    then("I can show contact data answer with out errors", () => {
      let render_item = ContactusDriverWrapper.findWhere(node=>node.prop("testID") === 'contactQuery_flat_data')
      itemObject.attributes.status = true
      let render_data = render_item.renderProp("renderItem")({item:itemObject,index:0})
      expect(render_data).toBeTruthy();
      render_item.renderProp("ItemSeparatorComponent")({})

      const buttonNavigate = render_data.findWhere(
        (node) => node.prop("testID") == "select_contact_btn"
      )
      buttonNavigate.simulate("press")
    });

    then("I can click contact button with out errors", () => {
      const redirectBtn = ContactusDriverWrapper.findWhere(
        (node) => node.prop("testID") === "btnContactSupportDriver")
      redirectBtn.simulate("press")
      expect(redirectBtn.exists()).toBe(true);
    });
  });
});