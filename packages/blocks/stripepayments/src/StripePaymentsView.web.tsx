import * as React from "react";
// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MaskedInput from "./MaskedInput";
import { IPaymentMethod } from "./types";
// Customizable Area End
import { ViewProps, configJSON } from "./StripePayments";

const StripePaymentsView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  isPaymentMethodsLoading,
  paymentMethods,
  infoText,
  modalProps,
  errorModalProps,
  orderIdInputProps,
  cardNumberInputProps,
  expiryDateInputProps,
  cvcInputProps,
  btnCreatePaymentMethodProps,
  btnCancelProps,
  btnAddPaymentMethodProps,
  btnConfirmPaymentProps,
  btnOkProps,
  radioGroupProps,
  formControlLabelProps,
  // Customizable Area End
}) => {
  return (
    // Customizable Area Start
    <ThemeProvider theme={theme}>
      <Container data-testid={testID} maxWidth={"sm"}>
        <Box sx={webStyle.mainWrapper}>
          <TextField
            variant="outlined"
            label={configJSON.orderId}
            disabled={orderIdInputProps.disabled}
            value={orderIdInputProps.value}
            onChange={orderIdInputProps.onChange}
          />
          <Box>
            {isPaymentMethodsLoading ? (
              <Typography>{configJSON.loading}</Typography>
            ) : paymentMethods.length ? (
              <FormControl fullWidth>
                <RadioGroup
                  data-testid="radioGroup"
                  name="payment-methods"
                  value={radioGroupProps.value}
                  onChange={radioGroupProps.onChange}
                >
                  {paymentMethods.map((item: IPaymentMethod) => {
                    const label = (
                      <Box sx={webStyle.paymentMethodLabel}>
                        <Typography>
                          {item.attributes.card.brand}{" "}
                          {item.attributes.card.last4}
                        </Typography>
                        <Typography style={webStyle.expiryDate}>
                          {item.attributes.card.exp_month} /{" "}
                          {item.attributes.card.exp_year}
                        </Typography>
                      </Box>
                    );

                    return (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio />}
                        label={label}
                        disabled={formControlLabelProps.disabled}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            ) : (
              <Typography style={webStyle.infoText}>{infoText}</Typography>
            )}
          </Box>
          <Box display="flex">
            <Button
              style={webStyle.addPaymentMethodButton}
              variant="text"
              disabled={btnAddPaymentMethodProps.disabled}
              onClick={btnAddPaymentMethodProps.onClick}
            >
              {configJSON.addPaymentMethod}
            </Button>
          </Box>
          <Button
            variant="contained"
            style={webStyle.confirmPaymentButton}
            disabled={btnConfirmPaymentProps.disabled}
            onClick={btnConfirmPaymentProps.onClick}
          >
            {configJSON.completePayment}
          </Button>
        </Box>
        <Dialog
          data-testid="NewPaymentMethodModal"
          maxWidth={"md"}
          open={modalProps.open}
          onClose={modalProps.onClose}
        >
          <DialogContent style={webStyle.dialogContent}>
            <MaskedInput
              label={configJSON.cardNumberLabel}
              placeholder={configJSON.cardNumberPlaceholder}
              options={{ creditCard: true }}
              fullWidth
              style={webStyle.cardNumberInput}
              value={cardNumberInputProps.value}
              onChange={cardNumberInputProps.onChange}
            />
            <MaskedInput
              label={configJSON.expiryDateLabel}
              placeholder={configJSON.expiryDatePlaceholder}
              options={{ date: true, datePattern: ["m", "Y"] }}
              value={expiryDateInputProps.value}
              onChange={expiryDateInputProps.onChange}
            />
            <MaskedInput
              label={configJSON.cvcLabel}
              placeholder={configJSON.cvcPlaceholder}
              options={{
                blocks: [3],
                numericOnly: true,
              }}
              value={cvcInputProps.value}
              onChange={cvcInputProps.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              style={webStyle.submitButton}
              disabled={btnCreatePaymentMethodProps.disabled}
              onClick={btnCreatePaymentMethodProps.onClick}
            >
              {configJSON.submitText}
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={webStyle.cancelButton}
              disabled={btnCancelProps.disabled}
              onClick={btnCancelProps.onClick}
            >
              {configJSON.cancelText}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          data-testid="ErrorModal"
          maxWidth={"sm"}
          open={errorModalProps.open}
          onClose={errorModalProps.onClose}
        >
          <DialogContent>
            <Typography>{errorModalProps.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              style={webStyle.submitButton}
              onClick={btnOkProps.onClick}
            >
              {configJSON.ok}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
    // Customizable Area End
  );
};

// Customizable Area Start
const theme = createTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        width: "100%",
      },
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    paddingTop: "32px",
    paddingBottom: "32px",
    background: "#fff",
  },
  paymentMethodLabel: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  dialogContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
  },
  cardNumberInput: {
    gridColumn: "1 / -1",
  },
  expiryDate: {
    color: "#9e9e9e",
  },
  infoText: {
    marginTop: "1rem",
  },
  addPaymentMethodButton: {
    marginLeft: "auto",
    marginBottom: "1rem",
  },
  confirmPaymentButton: {
    backgroundColor: "#6200EE",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#6200EE",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#FF0000",
  },
};
// Customizable Area End

export default StripePaymentsView;
