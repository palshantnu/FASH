import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistViewProductSourcingPage from "../../src/StylistViewProductSourcingPage";
import StylistViewProductSourcingPageWeb from "../../src/StylistViewProductSourcingPage.web";
import { sourceProductResponse6Data, sourceProductResponse7Data, sourceProductResponse9Data } from "../__mocks__/responses";
import { fireEvent } from "@testing-library/react-native";

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return '181'
      }
      return null;
    }),
    setStorageData: jest.fn(),
  };
});

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
  id: "StylistViewProductSourcingPage",
};

const feature = loadFeature(
  "./__tests__/features/stylistviewproductsourcingpage-scenario.feature"
);

defineFeature(feature, (test) => {
  test("User opens up StylistViewProductSourcingPage when bid is there and not accepted", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on StylistViewProductSourcingPage screen", () => {
      screen = render(<StylistViewProductSourcingPage {...screenProps} />);
      render(<StylistViewProductSourcingPageWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const requestmsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      requestmsg.addData(getName(MessageEnum.StylistViewProductSourcingPage), { requestId: 6 });
      screen.container.instance.setState({
        _id: 6,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);
      screen.container.instance.getProductData();
      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          sourceProductResponse6Data,
      });
      screen.container.instance.getProductApiCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

    });

    then("User can see the page without errors", () => {
      expect(screen.queryByTestId("MyBidsTabComp")).not.toBe(null);
    });

    then("User can press the Back Button", () => {
      let buttonComponent = screen.getByTestId("backButtonID");
      fireEvent.press(buttonComponent);
    });

    then("user can press the delete Button", () => {
      let buttonComponent = screen.getByTestId("deleteButton");
      fireEvent.press(buttonComponent);
      expect(screen.getByTestId("deleteModal")).toBeTruthy();
    });

    then("user can press the btnCancelRequestNo", () => {
      let buttonComponent = screen.getByTestId("btnCancelRequestNo");
      fireEvent.press(buttonComponent);
    });

    then("user can press the btnAcceptOrReject", () => {
      let buttonComponent = screen.getByTestId("btnAcceptOrReject");
      fireEvent.press(buttonComponent);
      const deleteMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          deleteMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          sourceProductResponse6Data,
      });
      screen.container.instance.deleteProductApiCallId = deleteMessage.messageId;
      runEngine.sendMessage("UNIT TEST", deleteMessage);
    });

    then("user can press the editButton", () => {
      let buttonComponent = screen.getByTestId("editButton");
      fireEvent.press(buttonComponent);
    });
  });

  test("User opens up StylistViewProductSourcingPage when bid is not placed", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on StylistViewProductSourcingPage screen", () => {
      screen = render(<StylistViewProductSourcingPage {...screenProps} />);
      render(<StylistViewProductSourcingPageWeb {...screenProps} />);
    });
    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      const requestmsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.StylistViewProductSourcingPage), { requestId: 6 });
      screen.container.instance.setState({
        _id: 6,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);

      screen.container.instance.getProductData();
      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          sourceProductResponse7Data,
      });
      screen.container.instance.getProductApiCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

    });

    then("User can see the page without errors", () => {
      expect(screen.queryByTestId("MyBidsTabComp")).not.toBe(null);
    });

    then("User can see and press the viewButton", () => {
      const viewButton = screen.getByTestId("viewButton");
      fireEvent.press(viewButton);
    });
  });

  test("User opens up StylistViewProductSourcingPage when bid is accepted", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("User is on StylistViewProductSourcingPage screen", () => {
      screen = render(<StylistViewProductSourcingPage {...screenProps} />);
      render(<StylistViewProductSourcingPageWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const requestmsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      requestmsg.addData(getName(MessageEnum.StylistViewProductSourcingPage), { requestId: 6 });
      screen.container.instance.setState({
        _id: 6,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);
      screen.container.instance.getProductData();
      const sourceProductMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sourceProductMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sourceProductMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        sourceProductResponse9Data,
      });
      screen.container.instance.getProductApiCallId = sourceProductMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sourceProductMessage);

    });

    then("User can see the page without errors", () => {
      expect(screen.queryByTestId("MyBidsTabComp")).not.toBe(null);
      let buttonComponent = screen.getByTestId("chatButton");
      fireEvent.press(buttonComponent);
    });

  })
});