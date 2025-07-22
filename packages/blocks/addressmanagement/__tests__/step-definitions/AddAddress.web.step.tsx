import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AddAddress from "../../src/AddAddress.web";
// const navigation = require("react-navigation");

const screenProps = {
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
  id: "AddAddress",
};

const feature = loadFeature(
  "./__tests__/features/addaddress-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to addaddress", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AddAddress;

    given("I am a User loading addaddress", () => {
      exampleBlockA = shallow(<AddAddress {...screenProps} />);
    });

    when("I navigate to the addaddress", () => {
      instance = exampleBlockA.instance() as AddAddress;
    });

    then("addaddress will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtLat"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can select the button with with out errors", () => {
        let buttonComponent = exampleBlockA.findWhere(
          node => node.prop("testID") === "Background"
        );
        buttonComponent.simulate("press");
        expect(exampleBlockA).toBeTruthy();
        buttonComponent = exampleBlockA.findWhere(
          node => node.prop("testID") === "btnSubmit"
        );
        buttonComponent.simulate("press");
      });
    

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
