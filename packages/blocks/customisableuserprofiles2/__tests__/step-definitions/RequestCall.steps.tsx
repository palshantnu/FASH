import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import RequestCall from "../../src/RequestCall";
import RequestCallWeb from "../../src/RequestCall.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "RequestCall",
};

const feature = loadFeature(
  "./__tests__/features/requestcall-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up RequestCall", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on RequestCall screen", () => {
      screen = render(<RequestCall {...screenProps} />);
      render(<RequestCallWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const stylistMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      stylistMsg.addData(getName(MessageEnum.RequestCall), {stylistId: "STYLIST_ID"});
      runEngine.sendMessage("UNIT TEST", stylistMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("RequestCall")).not.toBe(null);
    });

    then("Buyer can press submit button", () => {
      const submitButton = screen.getByTestId("StylishButton");
      fireEvent.press(submitButton);
      const backButton = screen.getByTestId("backButtonID");
      fireEvent.press(backButton);
    });

    then("Buyer can add values to reason, hours and minutes", () => {
      const reasonInput = screen.getByTestId(`reason-input`);
      const hoursInput = screen.getByTestId(`hours-input`);
      const minutesInput = screen.getByTestId(`minutes-input`);
      fireEvent.changeText(reasonInput, "REASON");
      fireEvent.changeText(hoursInput, "-1");
      fireEvent.changeText(minutesInput, "-7");
    });

    then("Buyer can press submit button", () => {
      const submitButton = screen.getByTestId("StylishButton");
      fireEvent.press(submitButton);
    });

    then("Buyer can modify values to reason, hours and minutes", () => {
      const reasonInput = screen.getByTestId(`reason-input`);
      const hoursInput = screen.getByTestId(`hours-input`);
      const minutesInput = screen.getByTestId(`minutes-input`);
      fireEvent.changeText(reasonInput, "REASON");
      fireEvent.changeText(hoursInput, "25");
      fireEvent.changeText(minutesInput, "61");
    });

    then("Buyer can press submit button", () => {
      const submitButton = screen.getByTestId("StylishButton");
      fireEvent.press(submitButton);
    });

    then("Buyer can modify values to reason, hours and minutes", () => {
      const reasonInput = screen.getByTestId(`reason-input`);
      const hoursInput = screen.getByTestId(`hours-input`);
      const minutesInput = screen.getByTestId(`minutes-input`);
      fireEvent.changeText(reasonInput, "REASON");
      fireEvent.changeText(hoursInput, "1");
      fireEvent.changeText(minutesInput, "14");
    });

    then("Buyer can press submit button", () => {
      const submitButton = screen.getByTestId("StylishButton");
      fireEvent.press(submitButton);
      const apiresponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiresponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        apiresponseMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        {data : {}},
      });
      screen.container.instance.requestCallApiCallID = apiresponseMessage.messageId;
      runEngine.sendMessage("UNIT TEST", apiresponseMessage);
    });
    
  });
});