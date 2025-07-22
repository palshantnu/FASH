import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import ClientsAndChatTab from "../../src/ClientsAndChatTab";
import ClientsTabScreen from "../../src/ClientsTabScreen";


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
    }),
  },
  id: "ClientsAndChatTab",
};
const feature = loadFeature("./__tests__/features/ClientAndChatTab-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
  });

  test("User navigates to clients tab", ({ given, when, then }) => {
    let ClientsAndChatTabWrapper: ShallowWrapper;
    let instance: ClientsAndChatTab;

    given("I am a User loading clients tab", () => {
      ClientsAndChatTabWrapper = shallow(<ClientsAndChatTab {...screenProps} />);
    });
    when("I click on back button", () => {
      instance = ClientsAndChatTabWrapper.instance() as ClientsAndChatTab;
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackClientsAndchat"
      );
      btnSubmitOTP.simulate("press");
      instance.renderTabBar(screenProps);
      instance.renderTabLable(true, {title: "Clients"});
      instance.renderTabLable(false, {title: "Chat"});
    });

    then("I will navigate to landing page", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(8);
    });
    when("I click on tab button", () => {
      console.log("Value!!!!!!!", ClientsAndChatTabWrapper.debug());
      
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.prop("onIndexChange")();
    });

    then("swiper will be true", () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      expect(btnSubmitOTP.prop("swipeEnabled")).toEqual(false)

    });
    when('I click on the tab button with key first', () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.props().renderScene({ route: { key: 'first' } })

    });

    then("the scene should be null", () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.props().renderScene({ route: { key: 'first' } });

    });

    when('I click on the tab button with key second', () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.props().renderScene({ route: { key: 'second' } })

    });

    then("the scene should be null", () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.props().renderScene({ route: { key: 'second' } })
      const scene = btnSubmitOTP.props().renderScene({ route: { key: 'second' } })
      const renderedScene = shallow(scene);
      expect(renderedScene.find(ClientsTabScreen).exists()).toBe(false);
    });
    when('I click on the tab button without any key', () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      btnSubmitOTP.props().renderScene({ route: { key: '' } })

    });

    then("the scene should be null", () => {
      let btnSubmitOTP = ClientsAndChatTabWrapper.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
      );
      expect(btnSubmitOTP.props().renderScene({ route: { key: '' } })).toBeNull();

    });
  });

})

