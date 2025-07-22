import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config';
import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
// Customizable Area End

import StylistConfirmationController, {
  Props,
} from "./StylistConfirmationController";

export default class StylistConfirmation extends StylistConfirmationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylistConfirmation">
        <CustomHeader title={i18n.t('Confirmation')} left={null} />
        <View style={styles.main}>
          <Text style={styles.h1}>{i18n.t('greatText')}</Text>
          <Text style={styles.text}>
          {i18n.t('stylistConfirmationMessage')}
          </Text>
        </View>
        <CustomButton
          title={i18n.t('dashboardText')}
          onPress={this.goToDashboard}
          testID="goToDashboard"
          style={styles.btn}
        />
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", flexGrow: 1 },
  main: {
    flex: 1,
    padding: Scale(20),
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: Scale(24),
    color: "#375280",
    lineHeight: 32,
    marginBottom: Scale(8),
  },
  text: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: Scale(16),
    color: "#375280",
    lineHeight: 32,
    marginBottom: Scale(8),
    textAlign: "center"
  },
  btn: { margin: Scale(20) },
});
