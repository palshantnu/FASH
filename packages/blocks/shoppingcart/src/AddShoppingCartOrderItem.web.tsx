import React from "react";
// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
  Input,
  Checkbox,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

import ShoppingCartOrdersController, {
  Props,
} from "./ShoppingCartOrdersController";

export default class AddShoppingCartOrderItem extends ShoppingCartOrdersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              data-test-id="btnNavigateToShoppingCartOrders"
              variant="contained"
              color="primary"
              onClick={() => this.navigateToShoppingCartOrders()}
            >
              View all orders
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Quantity: </Typography>
              <Input
                data-test-id={"inputCatalogueId"}
                placeholder="Catalogue Id"
                onChange={(e) =>
                  this.setState({ catalogue_id: Number(e.target.value) || 0 })
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Quantity: </Typography>
              <Input
                data-test-id={"inputQuantity"}
                placeholder="Quantity"
                onChange={(e) =>
                  this.setState({ quantity: Number(e.target.value) || 0 })
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Taxable: </Typography>
              <Checkbox
                data-test-id={"btnTaxable"}
                checked={this.state.taxable}
                onClick={() => this.setState({ taxable: !this.state.taxable })}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Taxable Value: </Typography>
              <Input
                data-test-id={"inputTaxableValue"}
                placeholder="Taxable Value"
                onChange={(e) =>
                  this.setState({ taxable_value: Number(e.target.value) || 0 })
                }
              />
            </Box>
            <Button
              data-test-id="btnAddOrderItem"
              variant="contained"
              color="primary"
              onClick={() => this.createOrderItem(this.state.token)}
            >
              Add Order Item
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}
