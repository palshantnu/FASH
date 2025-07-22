import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from "react-native";
import CustomButton from "../../../components/src/CustomButton";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
// Customizable Area End

import YetToBeDevelopedController, {
  Props,
} from "./YetToBeDevelopedController";

export default class YetToBeDeveloped extends YetToBeDevelopedController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      // Required for all blocks
      <SafeAreaView style={styles.container} testID="yetToBeDeveeloped">
        <View>
          <Text style={styles.text}>This screen is under devlopment</Text>
          <CustomButton title="Go Back" style={styles.btn} onPress={this.goBack} testID="goBackButton" />
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color:'#375280',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 40
  },
  btn: {}
});
// Customizable Area End
