import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, beforeEach, expect } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";

import { Listener } from "../../__mock__/eventlistener";
import StylistWeeklyPlan from "../../src/StylistWeeklyPlan";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import i18n from "../../../../components/src/i18n/i18n.config";

const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: listener.addEventListener,
  },
  id: "StylistCatalogue",
};

const feature = loadFeature(
  "./__tests__/features/stylistWeeklyPlan-scenario.feature"
);
const sendMessage = jest.spyOn(runEngine, "sendMessage");
const res = {
  data: {
    id: "20",
    type: "service",
    attributes: {
      name: "weekly_plan",
      styling_per_week: 5,
      discussion_time: "30",
      voice_call_facility: true,
      video_call_facility: true,
      service_charges: 300.0,
    },
  },
};
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: StylistWeeklyPlan;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<StylistWeeklyPlan {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as StylistWeeklyPlan;
    });

    then("catalogue will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click back Icon with out errors", () => {
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );

      const msgTokenAPI1 = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgTokenAPI1.addData(
        getName(MessageEnum.LoginOptionsNavigationDataMessage),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI1);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationPayLoadMessage" }),
        ])
      );

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
    });

    then("I can call api catalogue with out errors", async () => {
      exampleBlockA.setState({ selectedPlan: true, name: true });
      exampleBlockA.setState({
        styling_per_week: 5,
        discussion_time: "7 hours",
        voice_call_facility: true,
        service_charges: 9,
      });
      let saveButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "productDetailsSaveBtn"
      );
      saveButton.simulate("press");
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.getPlanId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(exampleBlockA.length).toBeGreaterThan(0);
    });

    then("I can show all catalogue with list view and with out errors", () => {
      exampleBlockA.setState({
        styling_per_week: 0,
        discussion_time: "",
        voice_call_facility: "",
        service_charges: "00",
      });
      instance.handleValidation();

      exampleBlockA.setState({
        styling_per_week: 0,
        discussion_time: "",
        voice_call_facility: "",
        service_charges: "",
      });
      instance.handleValidation();

      let buttonComp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnBackAssignstore"
      );
      buttonComp.simulate("press");
    });

    then("I can call api catalogue with errors", async () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.updatePlanId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(exampleBlockA.length).toBeGreaterThan(0);
    });

    then("I can enter a catalogue name with out errors", () => {
      exampleBlockA.setState({ selectedPlan: i18n.t("weeklyPlan") });
      exampleBlockA.setState({ selectedPlan: i18n.t("monthlyPlan") });
      exampleBlockA.setState({ selectedPlan: i18n.t("quarterlyPlan") });

      instance.convertNameFormat("weekly_plan");
      instance.convertNameFormat("monthly_plan");
      instance.convertNameFormat("quarterly_plan");
      instance.convertNameFormat("Quarterly Plan");
      instance.originalNameFormat(i18n.t("weeklyPlan"))
      instance.originalNameFormat(i18n.t("monthlyPlan"))
      instance.originalNameFormat(i18n.t("quarterlyPlan"))
      instance.originalNameFormat("Quarterly Plan")

      let txtInputMaterial = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInputMaterial"
      );
      txtInputMaterial.simulate("changeText", "cotten");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
