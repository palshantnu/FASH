import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Contactus from "../../src/Contactus";
import AddContactUs from "../../src/AddContactus";
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
  id: "Contactus",
};

const itemObject = {
  id:1,
  "attributes":{
    "id":1,
    "title":"Payment/Refund",
    "answer":"Payment/Refund",
    "status":false
  }
}

const feature = loadFeature("./__tests__/features/contactus-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to contactus", ({ given, when, then }) => {
    let ContactUsWrapper: ShallowWrapper;
    let instance: Contactus;

    given("I am a User loading contactus", () => {
      ContactUsWrapper = shallow(<Contactus {...screenProps} />);
    });

    when("I navigate to the contactus", () => {
      instance = ContactUsWrapper.instance() as Contactus;
    });

    then("contactus will load with out errors", () => {
      const backButton = ContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackContactUs")
      backButton.simulate("press")
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show query with out errors", () => {
      let render_item = ContactUsWrapper.findWhere(node=>node.prop("testID") === 'query_flat_data')
      let render_data = render_item.renderProp("renderItem")({item:itemObject,index:0})
      expect(render_data).toBeTruthy();
      render_item.renderProp("ItemSeparatorComponent")({})

      const buttonNavigate = render_data.findWhere(
        (node) => node.prop("testID") == "select_faq_btn"
      )
      buttonNavigate.simulate("press")
    });

    then("I can show query answer with out errors", () => {
      let render_item = ContactUsWrapper.findWhere(node=>node.prop("testID") === 'query_flat_data')
      itemObject.attributes.status = true
      let render_data = render_item.renderProp("renderItem")({item:itemObject,index:0})
      expect(render_data).toBeTruthy();
      render_item.renderProp("ItemSeparatorComponent")({})

      const buttonNavigate = render_data.findWhere(
        (node) => node.prop("testID") == "select_faq_btn"
      )
      buttonNavigate.simulate("press")
    });

    then("I can click contact button with out errors", () => {
      const redirectBtn = ContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "btnContactSupport")
      redirectBtn.simulate("press")
      expect(redirectBtn.exists()).toBe(true);
    });
  });

  test("User navigates to addContactus", ({ given, when, then }) => {
    let AddContactUsWrapper: ShallowWrapper;
    let instance: AddContactUs;

    given("I am a User loading addContactus", () => {
      AddContactUsWrapper = shallow(<AddContactUs {...screenProps} />);
    });

    when("I navigate to the addContactus", () => {
      instance = AddContactUsWrapper.instance() as AddContactUs;

      let buttonComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "btnSubmit"
      );
      buttonComponent.simulate("press");

      let textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtName"
      );
      textInputComponent.simulate("changeText", "FIRST");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtEmail"
      );
      textInputComponent.simulate("changeText", "a@b.com");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtPhoneNumber"
      );
      textInputComponent.simulate("changeText", "13105551212");

      textInputComponent = AddContactUsWrapper.findWhere(
        (node) => node.prop("testID") === "txtComments"
      );
      textInputComponent.simulate("changeText", "N/A");

      buttonComponent.simulate("press");
    });

    then("addContactus will load with out errors", () => {
      expect(AddContactUsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AddContactUsWrapper).toBeTruthy();
    });
  });
});
