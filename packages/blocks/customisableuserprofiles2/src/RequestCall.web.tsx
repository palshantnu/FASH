import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView} from "react-native";

// Customizable Area End

import RequestCallController, {
    Props,
  } from "./RequestCallController";

export default class RequestCallWeb extends RequestCallController {
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
      <SafeAreaView style={styles.container} testID="RequestCall"></SafeAreaView>
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
});
// Customizable Area End