import React from "react";

import {
  Container,
  // Customizable Area Start
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
// Customizable Area End

import TappaymentsintegrationController, {
  Props,
  configJSON,
} from "./TappaymentsintegrationController.web";

export default class Tappaymentsintegration extends TappaymentsintegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <>
        <Container
          maxWidth={"sm"}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <TextField
            required
            InputProps={{ inputProps: { min: 1, max: 10000 } }}
            label={configJSON.labelAmount}
            type="number"
            margin="normal"
            data-test-id="amount"
            value={this.state.amount}
            onChange={(event) => this.setAmountValue(event.target.value)}
            error={this.state.amount <= 0 || this.state.amount > 10000}
            helperText={
              this.state.amount <= 0 || this.state.amount > 10000
                ? configJSON.amountLimit
                : ""
            }
          />
          <FormControl required error={this.state.currency == ""}>
            <InputLabel htmlFor="age-simple">Currency</InputLabel>
            <Select
              data-test-id="currency"
              value={this.state.currency}
              onChange={(event) => this.setCurrency(event.target.value)}
            >
              <MenuItem value="AED">{configJSON.menuAED}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            label={configJSON.labelRefIdTransaction}
            margin="normal"
            data-test-id="transaction"
            value={this.state.transaction}
            onChange={(event) => this.setTransactionValue(event.target.value)}
            error={this.state.transaction == ""}
            helperText={
              this.state.transaction == ""
                ? configJSON.requireRefIdTransaction
                : ""
            }
          />
          <TextField
            required
            label={configJSON.labelRefIdOrder}
            margin="normal"
            data-test-id="order"
            value={this.state.order}
            onChange={(event) => this.setOrderValue(event.target.value)}
            error={this.state.order == ""}
            helperText={
              this.state.order == "" ? configJSON.requireRefIdOrder : ""
            }
          />
          {this.state.amount != 0 &&
            this.state.amount <= 10000 &&
            this.state.currency &&
            this.state.transaction &&
            this.state.order && (
              <Button
                color="secondary"
                data-test-id="submit"
                onClick={this.requestCharge}
              >
                {configJSON.labelPayTap}
              </Button>
            )}
        </Container>

        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!this.state.redirectResult}
          onClose={this.handleClose}
        >
          <DialogTitle>{this.getAlertText()}</DialogTitle>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
              data-test-id="close-alert"
            >
              {configJSON.labelClose}
            </Button>
          </DialogActions>
        </Dialog>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
// Customizable Area End
