import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";
import StripePaymentsView from "../src/StripePaymentsView";
import { IPaymentMethod } from "../src/types";
import { ViewProps } from "../src/StripePayments";

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

const screenProps: ViewProps = {
  testID: "StripePaymentsView",
  isPaymentMethodsLoading: false,
  paymentMethods: [],
  infoText: "mockInfoText",
  modalProps: {
    open: false,
    visible: false,
    onClose: jest.fn(),
    onRequestClose: jest.fn(),
  },
  errorModalProps: {
    message: null,
    open: false,
    visible: false,
    onClose: jest.fn(),
    onRequestClose: jest.fn(),
  },
  orderIdInputProps: {
    value: "",
    disabled: false,
    editable: true,
    onChange: jest.fn(),
    onChangeText: jest.fn(),
  },
  cardNumberInputProps: {
    value: "",
    onChange: jest.fn(),
    onChangeText: jest.fn(),
  },
  expiryDateInputProps: {
    value: "",
    onChange: jest.fn(),
    onChangeText: jest.fn(),
  },
  cvcInputProps: {
    value: "",
    onChange: jest.fn(),
    onChangeText: jest.fn(),
  },
  btnCreatePaymentMethodProps: {
    disabled: false,
    onClick: jest.fn(),
    onPress: jest.fn(),
  },
  btnCancelProps: {
    disabled: false,
    onClick: jest.fn(),
    onPress: jest.fn(),
  },
  btnAddPaymentMethodProps: {
    disabled: false,
    onClick: jest.fn(),
    onPress: jest.fn(),
  },
  btnConfirmPaymentProps: {
    disabled: false,
    onClick: jest.fn(),
    onPress: jest.fn(),
  },
  btnOkProps: {
    onClick: jest.fn(),
    onPress: jest.fn(),
  },
  radioGroupProps: {
    value: "",
    selectedId: "",
    onChange: jest.fn(),
    onSelect: jest.fn(),
  },
  formControlLabelProps: {
    disabled: false,
  },
};

describe("StripePaymentsView", () => {
  beforeEach(() => {
  });

  it("should render the no data message if there isn't any data", async () => {
    const { queryByText } = render(<StripePaymentsView {...screenProps} />);

    const noDataMessage = queryByText(/mockInfoText/i);

    await waitFor(() => {
      expect(noDataMessage).toBeTruthy();
    });
  });

  it("should render the payment methods correctly", async () => {
    const { queryByText } = render(
      <StripePaymentsView
        {...screenProps}
        paymentMethods={[MOCK_PAYMENT_METHOD]}
      />
    );

    const paymentMethodItem = queryByText(/visa/i);

    await waitFor(() => {
      expect(paymentMethodItem).toBeTruthy();
    });
  });

  it("should show loading text when isPaymentMethodsLoading prop is true", async () => {
    const { queryByText } = render(
      <StripePaymentsView {...screenProps} isPaymentMethodsLoading />
    );

    const loadingText = queryByText(/loading/i);

    await waitFor(() => {
      expect(loadingText).toBeTruthy();
    });
  });
});
