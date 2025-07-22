import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from "react-native";
import CustomCheckBox from "../../../components/src/CustomCheckBox";
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
      <SafeAreaView style={styles.defaultContainer}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID="hideKeyboard"
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={styles.innerContainer}>
              <View style={styles.buttonContent}>
                <TouchableOpacity
                  style={styles.viewAllButton}
                  testID="btnNavigateToShoppingCartOrders"
                  onPress={() => this.navigateToShoppingCartOrders()}
                >
                  <Text style={styles.viewAllButtonText}>View all orders</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formContent}>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Catalogue Id:</Text>
                  <TextInput
                    testID={"inputCatalogueId"}
                    style={styles.textInput}
                    placeholder="Catalogue Id"
                    onChangeText={(text: string) => {
                      this.setState({ catalogue_id: Number(text) || 0 });
                    }}
                  />
                  <Text style={styles.inputLabel}>Quantity:</Text>
                  <TextInput
                    testID={"inputQuantity"}
                    style={styles.textInput}
                    placeholder="Quantity"
                    onChangeText={(text: string) => {
                      this.setState({ quantity: Number(text) || 0 });
                    }}
                  />
                </View>
                <View style={styles.checkBoxContainerView}>
                  <Text style={styles.inputLabel}>Taxable:{"  "}</Text>
                  <CustomCheckBox
                    testID={"btnTaxable"}
                    isChecked={this.state.taxable}
                    onChangeValue={(value) => this.setState({ taxable: value })}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Taxable Value:</Text>
                  <TextInput
                    testID={"inputTaxableValue"}
                    style={styles.textInput}
                    placeholder="Taxable Value"
                    onChangeText={(text: string) => {
                      this.setState({ taxable_value: Number(text) || 0 });
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.createButton}
                  testID="btnAddOrderItem"
                  onPress={() => this.createOrderItem(this.state.token)}
                >
                  <Text style={styles.createButtonText}>Add Order Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  defaultContainer: {
    height: "99%",
    width: "100%",
  },
  createButton: {
    backgroundColor: "blue",
    borderRadius: 4,
    paddingVertical: 15,
    marginVertical: 12,
  },
  innerContainer: {
    marginBottom: 30,
  },
  createButtonText: {
    textAlign: "center",
    color: "#fff",
    lineHeight: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  inputBox: {
    marginVertical: 10,
  },
  inputLabel: {
    marginBottom: 6,
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  buttonContent: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  viewAllButton: {
    borderRadius: 4,
    marginVertical: 12,
  },
  viewAllButtonText: {
    textAlign: "center",
    color: "blue",
    lineHeight: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  width100: {
    width: "100%",
  },
  textInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    flex: 1,
    width: "100%",
  },
  formContent: {
    marginTop: 30,
  },
  checkBoxContainerView: {
    flexDirection: "row",
    marginVertical: 4,
    zIndex: -1,
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
});
// Customizable Area End
