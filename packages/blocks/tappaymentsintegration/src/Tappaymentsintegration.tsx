import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
// Customizable Area End

import TappaymentsintegrationController, {
  Props,
  configJSON,
} from "./TappaymentsintegrationController";

export default class Tappaymentsintegration extends TappaymentsintegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          <TextInput
            testID="txtInputAmount"
            value={this.state.amount}
            style={styles.txtInputStyle}
            placeholder="Amount"
            textContentType="telephoneNumber"
            onChangeText={(amount: string) => {
              this.addAmount(amount);
            }}
            maxLength={5}
            keyboardType="numeric"
          />
          <Dropdown
            testID="selectCurrency"
            dropdownPosition="bottom"
            style={styles.txtInputStyle}
            data={this.state.currencyList}
            placeholder="Select Currency"
            maxHeight={600}
            labelField="code"
            valueField="code"
            value={this.state.selectedCurrency}
            onChange={(item: { code: string; currency: string }) => {
              this.setCurrency(item);
            }}
            selectedTextStyle={styles.androidBlack}
            itemTextStyle={styles.androidBlack}
            placeholderStyle={styles.placeholderStyle}
          />
          <TextInput
            testID="txtInputRefId"
            value={this.state.refTransactionId}
            style={styles.txtInputStyle}
            placeholder="Reference Transaction Id"
            onChangeText={(transactionId: string) => {
              this.addTransactionId(transactionId);
            }}
          />
          <TextInput
            testID="txtInputOrderId"
            value={this.state.refOrderId}
            style={styles.txtInputStyle}
            placeholder="Reference Order Id"
            onChangeText={(orderId: string) => {
              this.addReferenceId(orderId);
            }}
          />
          <TouchableOpacity
            testID="touchValidate"
            style={styles.buttonTouch}
            onPress={this.validateData}
          >
            {this.state.isLoading ? (
              <ActivityIndicator size={"small"} color="#FFFFFF" />
            ) : (
              <Text>{configJSON.labelPayTap}</Text>
            )}
          </TouchableOpacity>
          {this.state.isLoadingWebhook && (
            <View style={styles.indicator}>
              <ActivityIndicator size={"large"} color="#2196F3" />
            </View>
          )}
        </View>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  indicator: {
    position: "absolute",
    top: deviceHeight / 2 - 100,
    left: deviceWidth / 2 - 16,
  },
  txtInputStyle: {
    borderBottomWidth: 0.5,
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 16,
  },
  buttonTouch: {
    marginTop: 15,
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0, 187, 242)",
    borderRadius: 5,
    alignSelf: "center",
    padding: 15,
  },
  androidBlack: {
    color: "black",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
// Customizable Area End
