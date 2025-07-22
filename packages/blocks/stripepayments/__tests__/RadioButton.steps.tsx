import * as React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import RadioButton from "../src/RadioButton";
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

const screenProps = {
  item: MOCK_PAYMENT_METHOD,
  selectedId: "",
  onSelect: jest.fn(),
};

describe("RadioButton", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should set the correct id when onSelect is called", async () => {
    const { queryByTestId } = render(<RadioButton {...screenProps} />);
    const radioButton = queryByTestId("RadioButton");

    radioButton && fireEvent.press(radioButton);

    await waitFor(() => {
      expect(screenProps.onSelect).toHaveBeenCalledWith(MOCK_PAYMENT_METHOD);
    });
  });

  it("should render the selected view when selectedId and item.id matches", async () => {
    const { queryByTestId } = render(
      <RadioButton {...screenProps} selectedId={MOCK_PAYMENT_METHOD.id} />
    );
    const selectedView = queryByTestId("selectedView");

    await waitFor(() => {
      expect(selectedView).toBeTruthy();
    });
  });
});
