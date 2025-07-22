import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView, Text } from "react-native";

import Scale from "../../../components/src/Scale";
// Customizable Area End

import DashboardController, {
  Props,
  configJSON,
} from "./DashboardController";

export default class DashboardWeb extends DashboardController {
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
      <SafeAreaView style={styles.container} testID="stylistDashboard">
        <Text>{configJSON.labelTitleText}</Text>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  body: {
    padding: Scale(20),
  },
});
// Customizable Area End
