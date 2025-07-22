import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Tasks from "../../src/Tasks";

export const configJSON = require("../../config.json");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Tasks",
};

const feature = loadFeature("./__tests__/features/tasks-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Tasks", ({ given, when, then }) => {
    let taskWrapper: ShallowWrapper;
    let instance: Tasks;

    given("I am a User loading Tasks", () => {
      taskWrapper = shallow(<Tasks {...screenProps} />);
    });

    when("I navigate to the Tasks", () => {
      instance = taskWrapper.instance() as Tasks;
    });

    then("I can click the buttons", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateToTaskList"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnNavigateToTask"
      );
      buttonComponent.simulate("press");
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(taskWrapper).toBeTruthy();
    });
  });
});
