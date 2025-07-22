import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import Scale from "../../../components/src/Scale";
// Customizable Area End

import StylistPortfolioSingleImageController, {
    Props,
    configJSON  
  } from "./StylistPortfolioSingleImageController";

export default class StylistPortfolioSingleImageWeb extends StylistPortfolioSingleImageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.body, styles.sb, styles.row]} testID="headerArea">
      <View style={styles.row}>
        <Text>{configJSON.labelTitleText}</Text>
      </View>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="StylistPortfolioSingleImage">
        <this.Header />
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