import React from "react";
import { View } from "react-native";
import { act, render, waitFor } from "@testing-library/react-native";
const navigation = require("react-navigation");

import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

import StripePayments, { ViewProps } from "../src/StripePayments";
import { IPaymentMethod } from "../src/types";

const MOCK_PAYMENT_METHOD: IPaymentMethod = {
  id: "pm_1M6KyaLfuYWprfy5avQk9eA3",
  type: "payment_method",
  attributes: {
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: null,
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    card: {
      brand: "visa",
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: "pass",
      },
      country: "US",
      exp_month: 7,
      exp_year: 2027,
      fingerprint: "oGSMWKL5XKokYq4h",
      funding: "credit",
      generated_from: undefined,
      last4: "4242",
      networks: {
        available: ["visa"],
        preferred: undefined,
      },
      three_d_secure_usage: {
        supported: true,
      },
      wallet: undefined,
    },
    customer: "cus_Mo4hjNpvIP4cSx",
    created: 1668979377,
  },
};

const MOCK_PAYMENT_INTENT = {
  id: "pi_3M6teMLfuYWprfy53UszD36S",
  type: "payment_intent",
  attributes: {
    id: "pi_3M6teMLfuYWprfy53UszD36S",
    amount: 6962,
    amount_capturable: 0,
    amount_details: {
      tip: {},
    },
    amount_received: 0,
    charges: {
      object: "list",
      data: [],
      has_more: false,
      total_count: 0,
      url: "/v1/charges?payment_intent=pi_3M6teMLfuYWprfy53UszD36S",
    },
    client_secret:
      "pi_3M6teMLfuYWprfy53UszD36S_secret_fAhx60kQNC2cFYxdTSmS7q8Uh",
    confirmation_method: "automatic",
    created: 1669112662,
    currency: "usd",
    customer: "cus_Mo4hjNpvIP4cSx",
    payment_method: MOCK_PAYMENT_METHOD.id,
    payment_method_types: ["card"],
  },
};

jest.mock("../src/StripePaymentsView.tsx", () => (props: ViewProps) => (
  <View {...props} />
));

let apiCallId: string = "";

let receiveCallback: (from: string, message: Message) => void = () => {};
const sendNetworkRequestMock = jest.fn(
  (callIdRef: React.MutableRefObject<string>) => {
    apiCallId = require("uuid/v4")();
    callIdRef.current = apiCallId;
  }
);
const sendBlockMessageMock = jest.fn();
jest.mock("../../utilities/src/hooks/useRunEngine.ts", () => ({
  useRunEngine: () => ({
    sendMessage: jest.fn(),
    subscribe: jest.fn(),
    debugLog: jest.fn(),
    sendBlockMessage: sendBlockMessageMock,
    sendNetworkRequest: sendNetworkRequestMock,
    setReceiveCallback: jest.fn((callback) => (receiveCallback = callback)),
    unsubscribeFromMessage: jest.fn(),
  }),
}));

const screenProps = {
  navigation: navigation,
  id: "StripePayments",
};

describe("StripePayments", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should pass through the correct intial state values", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    expect(view?.props.isPaymentMethodsLoading).toBe(false);
    expect(view?.props.paymentMethods).toStrictEqual([]);
    expect(view?.props.infoText).toBe("Please login to see payment methods.");
  });

  it("should select the payment method when radioGroupProps.onSelect is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.radioGroupProps.onSelect(MOCK_PAYMENT_METHOD);
    });

    expect(view?.props.radioGroupProps.selectedId).toBe(MOCK_PAYMENT_METHOD.id);
  });

  it("should select the payment method when radioGroupProps.onChange is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.radioGroupProps.onChange({
        target: { value: MOCK_PAYMENT_METHOD.id },
      });
    });

    expect(view?.props.radioGroupProps.value).toBe(MOCK_PAYMENT_METHOD.id);
  });

  it("should open the modal when btnAddPaymentMethodProps.onPress is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.btnAddPaymentMethodProps.onPress();
    });

    expect(view?.props.modalProps.visible).toBe(true);
  });

  it("should close the modal when btnCancelProps.onPress is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.btnCancelProps.onPress();
    });

    expect(view?.props.modalProps.visible).toBe(false);
  });

  it("should close the modal when modalProps.onRequestClose is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.modalProps.onRequestClose();
    });

    expect(view?.props.modalProps.visible).toBe(false);
  });

  it("should close the modal when modalProps.onClose is called", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    act(() => {
      view?.props.modalProps.onClose();
    });

    expect(view?.props.modalProps.visible).toBe(false);
  });

  it("should send the correct network request when btnCreatePaymentMethodProps.onPress is called if card details are set", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      view?.props.cardNumberInputProps.onChangeText("4242424242424242");
      view?.props.expiryDateInputProps.onChangeText("12/2026");
      view?.props.cvcInputProps.onChangeText("123");
      view?.props.btnCreatePaymentMethodProps.onPress();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "stripe_payments/payment_methods",
        { "Content-Type": "application/json", token: "" },
        {
          number: "4242424242424242",
          exp_month: "12",
          exp_year: "2026",
          cvc: "123",
        }
      );
    });
  });

  it("should send the correct network request when btnConfirmPaymentProps.onPress is called if order id and payment method are set", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      view?.props.orderIdInputProps.onChangeText("27");
      view?.props.radioGroupProps.onSelect(MOCK_PAYMENT_METHOD);
      view?.props.btnConfirmPaymentProps.onPress();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "stripe_payments/payments",
        { "Content-Type": "application/json", token: "" },
        {
          order_id: "27",
          payment_method_id: MOCK_PAYMENT_METHOD.id,
        }
      );
    });
  });

  it("should handle the SessionResponseMessage response", async () => {
    render(<StripePayments {...screenProps} />);

    await waitFor(() => {
      const sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionResponseMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: "test token",
      });
      receiveCallback("Unit Test", sessionResponseMessage);

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "GET",
        "stripe_payments/payment_methods",
        { "Content-Type": "application/json", token: "test token" }
      );
    });
  });

  it("should handle the RestAPIResponseMessage response for the payment methods GET", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      const sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionResponseMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: "test token",
      });

      receiveCallback("Unit Test", sessionResponseMessage);

      const networkResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      networkResponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: [MOCK_PAYMENT_METHOD],
        },
      });

      receiveCallback("Unit Test", networkResponseMessage);

      expect(view?.props.paymentMethods).toStrictEqual([MOCK_PAYMENT_METHOD]);
    });
  });

  it("should handle the RestAPIResponseMessage response for the create payment method POST", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      view?.props.btnAddPaymentMethodProps.onPress();

      expect(view?.props.modalProps.visible).toBe(true);

      view?.props.cardNumberInputProps.onChangeText("4242424242424242");
      view?.props.expiryDateInputProps.onChangeText("12/2026");
      view?.props.cvcInputProps.onChangeText("123");
      view?.props.btnCreatePaymentMethodProps.onPress();

      expect(view?.props.radioGroupProps.selectedId).toBe("");
      expect(view?.props.btnCreatePaymentMethodProps.disabled).toBe(true);

      const networkRequestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      networkRequestMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          "stripe_payments/payment_methods",
        [getName(MessageEnum.RestAPIRequestMethodMessage)]: "POST",
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
          "Content-Type": "application/json",
          token: "test token",
        },
        [getName(MessageEnum.RestAPIRequestBodyMessage)]: {
          number: "4242424242424242",
          exp_month: "12",
          exp_year: "2026",
          cvc: "123",
        },
      });

      receiveCallback("Unit Test", networkRequestMessage);

      const networkResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      networkResponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: MOCK_PAYMENT_METHOD,
        },
      });

      receiveCallback("Unit Test", networkResponseMessage);

      expect(view?.props.modalProps.visible).toBe(false);
      expect(view?.props.btnCreatePaymentMethodProps.disabled).toBe(false);
      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "GET",
        "stripe_payments/payment_methods",
        { "Content-Type": "application/json", token: "" }
      );
    });
  });

  it("should handle the RestAPIResponseMessage response for the create payment POST", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      view?.props.orderIdInputProps.onChangeText("27");
      view?.props.radioGroupProps.onSelect(MOCK_PAYMENT_METHOD);
      view?.props.btnConfirmPaymentProps.onPress();

      const networkRequestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      networkRequestMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          "stripe_payments/payments",
        [getName(MessageEnum.RestAPIRequestMethodMessage)]: "POST",
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
          "Content-Type": "application/json",
          token: "test token",
        },
        [getName(MessageEnum.RestAPIRequestBodyMessage)]: {
          order_id: "27",
          payment_method_id: MOCK_PAYMENT_METHOD.id,
        },
      });

      receiveCallback("Unit Test", networkRequestMessage);

      const networkResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      networkResponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: MOCK_PAYMENT_INTENT,
        },
      });

      receiveCallback("Unit Test", networkResponseMessage);

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "stripe_payments/payments/confirm",
        { "Content-Type": "application/json", token: "" },
        {
          payment_intent_id: MOCK_PAYMENT_INTENT.id,
          payment_method_id: MOCK_PAYMENT_METHOD.id,
        }
      );
    });
  });

  it("should handle the RestAPIResponseMessage response for the confirm payment POST", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      const sessionResponseMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionResponseMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: "test token",
      });
      receiveCallback("Unit Test", sessionResponseMessage);

      view?.props.orderIdInputProps.onChangeText("27");
      view?.props.radioGroupProps.onSelect(MOCK_PAYMENT_METHOD);
      view?.props.btnConfirmPaymentProps.onPress();

      const createPaymentRequestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      createPaymentRequestMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          "stripe_payments/payments",
        [getName(MessageEnum.RestAPIRequestMethodMessage)]: "POST",
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
          "Content-Type": "application/json",
          token: "test token",
        },
        [getName(MessageEnum.RestAPIRequestBodyMessage)]: {
          order_id: "27",
          payment_method_id: MOCK_PAYMENT_METHOD.id,
        },
      });

      receiveCallback("Unit Test", createPaymentRequestMessage);

      const createPaymentResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      createPaymentResponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: MOCK_PAYMENT_INTENT,
        },
      });

      receiveCallback("Unit Test", createPaymentResponseMessage);

      const confirmPaymentRequestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      confirmPaymentRequestMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
          "stripe_payments/payments/confirm",
        [getName(MessageEnum.RestAPIRequestMethodMessage)]: "POST",
        [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
          "Content-Type": "application/json",
          token: "test token",
        },
        [getName(MessageEnum.RestAPIRequestBodyMessage)]: {
          payment_intent_id: MOCK_PAYMENT_INTENT.id,
          payment_method_id: MOCK_PAYMENT_METHOD.id,
        },
      });

      receiveCallback("Unit Test", confirmPaymentRequestMessage);

      const confirmPaymentResponseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      confirmPaymentResponseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: "mock payment confirmation",
        },
      });

      receiveCallback("Unit Test", confirmPaymentResponseMessage);

      expect(sendBlockMessageMock).toBeCalled();
      expect(view?.props.btnAddPaymentMethodProps.disabled).toBe(false);
      expect(view?.props.btnConfirmPaymentProps.disabled).toBe(false);
    });
  });

  it("should handle the RestAPIResponseMessage response for the errors", async () => {
    const { queryByTestId } = render(<StripePayments {...screenProps} />);
    const view = queryByTestId("StripePaymentsView");

    await waitFor(() => {
      const errorResponse = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      errorResponse.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          errors: [
            {
              stripe: "mock error",
            },
          ],
        },
      });

      receiveCallback("Unit Test", errorResponse);

      expect(view?.props.btnCreatePaymentMethodProps.disabled).toBe(false);
      expect(view?.props.errorModalProps.message).toBe("mock error");
    });
  });

  describe("Web", () => {
    beforeAll(() => {
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "web",
      }));
    });

    it("should call the correct handlers on the web", async () => {
      const { queryByTestId } = render(<StripePayments {...screenProps} />);
      const view = queryByTestId("StripePaymentsView");

      await waitFor(() => {
        view?.props.orderIdInputProps.onChange({ target: { value: "10" } });
        view?.props.cardNumberInputProps.onChange({
          target: { rawValue: "4242424242424242" },
        });
        view?.props.expiryDateInputProps.onChange({
          target: { value: "12/2024" },
        });
        view?.props.cvcInputProps.onChange({ target: { value: "123" } });

        expect(view?.props.orderIdInputProps.value).toBe("10");
        expect(view?.props.cardNumberInputProps.value).toBe("4242424242424242");
        expect(view?.props.expiryDateInputProps.value).toBe("122024");
        expect(view?.props.cvcInputProps.value).toBe("123");
      });
    });
  });
});
