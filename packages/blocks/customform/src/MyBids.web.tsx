import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView } from "react-native";

// Customizable Area End

import MyBidsController, {
  Props,
} from "./MyBidsController";

export default class MyBidsWeb extends MyBidsController {
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
      <SafeAreaView style={styles.container} testID="MyBids">
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
  }
});
// Customizable Area End