import React from "react";
// Customizable Area Start
import { StyleSheet, View } from "react-native";
// Customizable Area End

import StylistVerificationController, {
  Props,
} from "./StylistVerificationController";

export default class StylistVerificationWeb extends StylistVerificationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return <View style={styles.container} testID="stylistDocs"></View>;
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
});
