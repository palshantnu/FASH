import React from "react";
// Customizable Area Start
import { StyleSheet, View } from "react-native";

// Customizable Area End

import StylistCreateProfileController, {
  Props,
} from "./StylistCreateProfileController";

export default class StylistCreateProfileWeb extends StylistCreateProfileController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return <View style={styles.container}></View>;
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
// Customizable Area End
