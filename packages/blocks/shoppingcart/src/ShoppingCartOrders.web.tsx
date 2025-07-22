import React from "react";
// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
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

export default class ShoppingCartOrders extends ShoppingCartOrdersController {
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
          <Paper style={{ width: "100%", overflow: "hidden" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Total Fees</TableCell>
                    <TableCell>Total Items</TableCell>
                    <TableCell>Total Tax</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderList &&
                    this.state.orderList.map((item: any, index: number) => {
                      const value = item.attributes;
                      const order_id = item.id;

                      return (
                        <TableRow key={index}>
                          <TableCell scope="row">{order_id}</TableCell>
                          <TableCell>{value?.total_fees}</TableCell>
                          <TableCell>{value?.total_items}</TableCell>
                          <TableCell>{value?.total_tax}</TableCell>
                          <TableCell>
                            {value?.customer?.data?.attributes?.first_name +
                              " " +
                              value?.customer?.data?.attributes?.last_name}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              data-test-id={"showOrderItems"}
                              variant="text"
                              color="primary"
                              onClick={() => {
                                this.setState({ order_id: order_id });
                                this.showOrder(order_id);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Modal
            open={this.state.isVisible}
            onClose={this.hideModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  data-test-id="btnNavigateToAddOrderItem"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ isVisible: false });
                    this.navigateToAddShoppingCartOrderItem();
                  }}
                >
                  Add
                </Button>
              </Box>

              <Paper style={{ width: "100%", overflow: "hidden" }}>
                <TableContainer style={{ maxHeight: 440 }}>
                  <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Taxable</TableCell>
                        <TableCell>Taxable Value</TableCell>
                        <TableCell>Catalogue</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.orderItems &&
                        this.state.orderItems.map(
                          (item: any, index: number) => {
                            const value = item.attributes;
                            const order_item_id = item.id;

                            return (
                              <TableRow key={index}>
                                <TableCell scope="row">
                                  {order_item_id}
                                </TableCell>
                                <TableCell>{value?.price}</TableCell>
                                <TableCell>{value?.quantity}</TableCell>
                                <TableCell>
                                  {value?.taxable ? "true" : "false"}
                                </TableCell>
                                <TableCell>{value?.taxable_value}</TableCell>
                                <TableCell>
                                  {value?.catalogue?.data?.attributes?.name}
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    data-test-id={"deleteOrderItem"}
                                    variant="text"
                                    color="primary"
                                    onClick={() => {
                                      this.deleteOrderItem(
                                        this.state.order_id,
                                        order_item_id
                                      );
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px 0px",
                }}
              >
                <Button
                  data-test-id="closeModal"
                  variant="contained"
                  onClick={() => this.hideModal()}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
          {/* Customizable End Start */}
        </Container>
      </ThemeProvider>
      //Merge Engine End DefaultContainer
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// Customizable Area End
