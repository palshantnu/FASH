import React from "react";
import { jest, beforeAll, expect } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { loadFeature, defineFeature } from "jest-cucumber";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as alert from "../../../../components/src/CustomAlert";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import { goSellSDK } from "@tap-payments/gosell-sdk-react-native";
import Savedcards from "../../src/Savedcards";

class Listener {
  listeners: Map<string, Array<(...args: unknown[]) => unknown>>;
  constructor() {
    this.listeners = new Map();
  }

  addEventListener = (event: string, func: (...args: unknown[]) => unknown) => {
    const callbacks = this.listeners.get(event);
    this.listeners.set(event, callbacks ? [...callbacks, func] : [func]);

    return {
      remove: () => {
        this.listeners.delete(event);
      },
    };
  };

  simulateListener = async (event: string, args: unknown[] = []) => {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      for (const callback of callbacks) {
        await callback(...args);
      }
    }
  };
}

const listener = new Listener();

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: listener.addEventListener
  },
  id: "Savedcards",
};

const feature = loadFeature("./__tests__/features/savedcards.scenario.feature");

const cardsResponse = {
  object: "list",
  has_more: false,
  live_mode: false,
  data: [
    {
      id: "card_HRbr1624740KpUE16I248998",
      created: 1715845216995,
      object: "card",
      address: {},
      customer: "cus_TS06A3420241333u6Z31505392",
      funding: "DEBIT",
      fingerprint: "NCDLWKZVTgPvqRwfjHT2CuHSOcRDOufcTx5ObNzig6Q%3D",
      brand: "MASTERCARD",
      scheme: "MASTERCARD",
      name: "ARNAB FASH",
      exp_month: 2,
      exp_year: 29,
      last_four: "0008",
      first_six: "512345",
      first_eight: "51234500",
    },
    {
      id: "card_XKBv25241613OT3d16ov4i35",
      created: 1715876005030,
      object: "card",
      address: {},
      customer: "cus_TS06A3420241333u6Z31505392",
      funding: "DEBIT",
      fingerprint: "Z2PQcznjES%2BL63crKEKycE1lmh83Tjq7SexMv3wET08%3D",
      brand: "VISA",
      scheme: "VISA",
      name: "ARNAB FASH",
      exp_month: 1,
      exp_year: 39,
      last_four: "1019",
      first_six: "450875",
      first_eight: "45087500",
    },
  ],
};

defineFeature(feature, (test) => {
  const alertSpy = jest.spyOn(alert, "showAlert");
  beforeAll(() => {
    jest
      .spyOn(goSellSDK, "startPayment")
      .mockImplementationOnce((_a, _b, handler) => {
        handler(new Error("something went wrong"), {});
      })
      .mockImplementationOnce((_a, _b, handler) => {
        handler(null, { sdk_result: "FAILED" });
      })
      .mockImplementationOnce((_a, _b, handler) => {
        handler(null, { sdk_result: "NOT_IMPLEMENTED" });
      })
      .mockImplementationOnce((_a, _b, handler) => {
        handler(null, { sdk_result: "SUCCESS", token: "" });
      });
  });

  test("User navigates to savedcards", ({ given, when, then, and }) => {
    let screen: ReturnType<typeof render>;
    const runEngineSpy = jest.spyOn(runEngine, "sendMessage");

    given("I am a User loading savedcards", () => {
      screen = render(<Savedcards {...screenProps} />);
    });

    when("I navigate to the savedcards", () => {
      const message = new Message(getName(MessageEnum.SessionResponseMessage));
      message.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", message);

      const retrive = new Message(getName(MessageEnum.RestAPIResponceMessage));
      retrive.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: retrive.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "customer not found",
        },
      });
      screen.container.instance.retriveCustomerApiCallId = retrive.messageId;
      runEngine.sendMessage("UNIT TEST", retrive);

      const createCust = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createCust.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: createCust.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: "cust_007",
        },
      });
      screen.container.instance.createCustomerApiCallId = createCust.messageId;
      runEngine.sendMessage("UNIT TEST", createCust);
      createCust.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: createCust.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          customer_id: "cust_007",
        },
      });
      screen.container.instance.createCustomerApiCallId = createCust.messageId;
      runEngine.sendMessage("UNIT TEST", createCust);

      const retrive2 = new Message(getName(MessageEnum.RestAPIResponceMessage));
      retrive2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: retrive2.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          object: "customer",
          live_mode: false,
          created: "1715780014392",
          merchant_id: "",
          cards: [
            {
              default: false,
              id: "card_HRbr1624740KpUE16I248998",
              fingerprint: "NCDLWKZVTgPvqRwfjHT2CuHSOcRDOufcTx5ObNzig6Q%3D",
              object: "card",
              last_four: "0008",
              brand: "MASTERCARD",
              name: "ARNAB FASH",
              first_six: "512345",
              currency: "",
              expiry: {
                month: "2",
                year: "29",
              },
              order_by: 0,
              funding: "DEBIT",
            },
            {
              default: false,
              id: "card_XKBv25241613OT3d16ov4i35",
              fingerprint: "Z2PQcznjES%2BL63crKEKycE1lmh83Tjq7SexMv3wET08%3D",
              object: "card",
              last_four: "1019",
              brand: "VISA",
              name: "ARNAB FASH",
              first_six: "450875",
              currency: "",
              expiry: {
                month: "1",
                year: "39",
              },
              order_by: 1,
              funding: "DEBIT",
            },
          ],
          id: "cus_TS06A3420241333u6Z31505392",
          first_name: "Arnab Fash",
          email: "new.user@yopmail.com",
        },
      });
      screen.container.instance.retriveCustomerApiCallId = retrive2.messageId;
      runEngine.sendMessage("UNIT TEST", retrive2);

      const errorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      errorMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          errorMessage.messageId,
        [getName(MessageEnum.RestAPIResponceErrorMessage)]: {},
      });
      runEngine.sendMessage("UNIT TEST", errorMessage);

      const listCard = new Message(getName(MessageEnum.RestAPIResponceMessage));
      listCard.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: listCard.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: cardsResponse,
      });
      screen.container.instance.listCardsApiCallId = listCard.messageId;
      runEngine.sendMessage("UNIT TEST", listCard);
    });

    then("savedcards will load with out errors", () => {
      expect(screen.getByTestId("cardsFl").props.data.length).toBeGreaterThan(
        0
      );
    });

    when("I click on deletecard", () => {
      fireEvent.press(
        screen.getByTestId("delete-card_HRbr1624740KpUE16I248998")
      );
    });

    then("I get pop up", () => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
    });

    when("I accept pop up", () => {
      alertSpy.mock.calls[0][0].okButton.onPress!();
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "Failed",
        },
      });
      screen.container.instance.deleteCardApiCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        deleted: true,
        id: "card_HRbr1624740KpUE16I248998",
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("Card gets removed", () => {
      expect(screen.getByTestId("cardsFl").props.data.length).toBe(
        cardsResponse.data.length - 1
      );
    });

    when("I click on add card", () => {
      fireEvent.press(screen.getByTestId("newCardButton"));
      fireEvent.press(screen.getByTestId("newCardButton"));
      fireEvent.press(screen.getByTestId("newCardButton"));
      fireEvent.press(screen.getByTestId("newCardButton"));

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { error: "xyz" },
      });
      screen.container.instance.authorizeCardApiCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "VALID",
      });
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        status: "INVALID",
      });
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        transaction: { url: "https://tap.company" },
      });
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("I can add card", () => {
      const lastCall =
        runEngineSpy.mock.calls[runEngineSpy.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationTapWebView");
      listener.simulateListener("willFocus")
    });

    and("I can leave the screen with out errors", () => {
      fireEvent.press(screen.getByTestId("goBack"));
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
