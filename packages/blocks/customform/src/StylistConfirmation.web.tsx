import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView } from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import Scale from "../../../components/src/Scale";
// Customizable Area End

import StylistConfirmationController, {
  Props,
} from "./StylistConfirmationController";

export default class StylistConfirmationWeb extends StylistConfirmationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylistConfirmation">
        <CustomHeader title="Confirmation" left={null} />
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  main: { flex: 1, padding: Scale(20) },
});
