import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AnalyticsFilter from "../../src/AnalyticsFilter";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Analytics",
};

const feature = loadFeature(
  "./__tests__/features/AnalyticsFilter-scenario.feature"
);
const sendMessage = jest.spyOn(runEngine, "sendMessage");

const propsObj = {
  data:{
    fromDate:"test",
    filter:"this week",
    toDate:"test",
  }
}

const propsObj2 = {
  data:{
    fromDate:"test",
    filter:"this month",
    toDate:"test",
  }
}

const propsObj3 = {
  data:{
    fromDate:"test",
    filter:"this year",
    toDate:"test",
  }
}

const propsObj4 = {
  data:{
    fromDate:"test",
    filter:"manually",
    toDate:"test",
  }
}

const propsObj5 = {
  data:{
    fromDate:"test",
    filter:"",
    toDate:"test",
  }
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Analytics Filter", ({ given, when, then }) => {
    let analyticsBlock: ShallowWrapper;
    let instance: AnalyticsFilter;

    given("I am a User loading Analytics", () => {
      analyticsBlock = shallow(<AnalyticsFilter {...screenProps} />);
    });

    when("I navigate to the Analytics", () => {
      instance = analyticsBlock.instance() as AnalyticsFilter;
    });

    then("Analytics will load with out errors", () => {

      const msggetCreds = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msggetCreds.addData(getName(MessageEnum.NavigationPayLoadMessage),propsObj.data)
      runEngine.sendMessage("Unit Test", msggetCreds)

      const msggetCreds1 = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msggetCreds1.addData(getName(MessageEnum.NavigationPayLoadMessage),propsObj2.data)
      runEngine.sendMessage("Unit Test", msggetCreds1)

      const msggetCreds2 = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msggetCreds2.addData(getName(MessageEnum.NavigationPayLoadMessage),propsObj3.data)
      runEngine.sendMessage("Unit Test", msggetCreds2)

      const msggetCreds3 = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msggetCreds3.addData(getName(MessageEnum.NavigationPayLoadMessage),propsObj4.data)
      runEngine.sendMessage("Unit Test", msggetCreds3)

      const msggetCreds4 = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msggetCreds4.addData(getName(MessageEnum.NavigationPayLoadMessage),propsObj5.data)
      runEngine.sendMessage("Unit Test", msggetCreds4)

      analyticsBlock.setState({selectFromDate: false ,visibleFromDate: false})

      analyticsBlock.setState({selectToDate: false ,visibleToDate: false})

      let let_button_dates = analyticsBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEdit"
      );
      let_button_dates.prop("onConfirm")("");

      let let_button_dates1 = analyticsBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEdit"
      );
      let_button_dates1.prop("onCancel")("");

      let saveButton = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "clearId"
      );
      saveButton.simulate("press");

      let saveButton1 = analyticsBlock.findWhere(
        (node) => node.prop("data-test-id") === "radioBtn"
      );
      saveButton1.props().onValueChange();

      let btn1 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "btn"
      );
      btn1.props().onPress();

      let btn = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "btn1"
      );
      btn.props().onPress();

      let btn2 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "btn2"
      );
      btn2.props().onPress();

      let btn3 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "btn3"
      );
      btn3.props().onPress();

      analyticsBlock.setState({ selectFromDate: true, selectToDate: true });
      let performAction = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "editProductBtn"
      );
      performAction.simulate("press");

      analyticsBlock.setState({ selectedValue: "this week" });
      let performAction1 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "editProductBtn"
      );
      performAction1.simulate("press");

      analyticsBlock.setState({ selectedValue: "this month" });
      let performAction2 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "editProductBtn"
      );
      performAction2.simulate("press");

      analyticsBlock.setState({ selectedValue: "this year" });
      let performAction3 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "editProductBtn"
      );
      performAction3.simulate("press");
      expect(analyticsBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let let_button_dates = analyticsBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEdit1"
      );
      let_button_dates.prop("onConfirm")("");

      let let_button_dates1 = analyticsBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEdit1"
      );
      let_button_dates1.prop("onCancel")("");

      analyticsBlock.setState({ selectedValue: "manually" });
      const openModel1 = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "openModel"
      );
      openModel1.simulate("press");

      analyticsBlock.setState({ selectedValue: "manually" });
      const openModel = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "openModel1"
      );
      openModel.simulate("press");

      analyticsBlock.setState({ selectFromDate: false, selectToDate: false });
      let performAction = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "editProductBtn"
      );
      performAction.simulate("press");

      let saveButton = analyticsBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAddAddress"
      );
      saveButton.simulate("press");

      const msgTokenAPI2 = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgTokenAPI2.addData(getName(MessageEnum.PlayLoadSignupId), "User-Token");
      runEngine.sendMessage("Unit Test", msgTokenAPI2);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationPayLoadMessage" }),
        ])
      );
      instance.componentWillUnmount();
      expect(analyticsBlock).toBeTruthy();
    });
  });
});
