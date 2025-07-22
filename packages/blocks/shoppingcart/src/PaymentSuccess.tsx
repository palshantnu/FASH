import React from "react";
// Customizable Area Start
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";

import { reward } from "./assets";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
// Customizable Area End

import PaymentSuccessController, {
  Props,
  configJSON,
} from "./PaymentSuccessController";

export default class PaymentSuccess extends PaymentSuccessController {
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
      <SafeAreaView style={styles.container} testID="confirmation">
        <CustomHeader
          title={i18n.t('Confirmation')}
          onLeftPress={() => this.props.navigation.pop(2)}
        />
        <View style={styles.center}>
          <Text style={styles.congrats}>{i18n.t("congratulations")}</Text>
          <Text style={[styles.info, styles.mb]}>
          {i18n.t("Yourorderplaced.")}
          </Text>
          <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Image style={styles.reward} source={reward} />
            <Text style={styles.info}>{this.state.loyaltyPoints + " " +i18n.t("Loyaltypoints")}</Text>
          </View>
        </View>
        <CustomButton
          title={i18n.t("allOrdersText")}
          onPress={this.goToOrders}
          style={styles.btn}
          testID="allOrders"
        />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Scale(24),
  },
  btn: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(16),
    marginTop: Scale(20),
  },
  congrats: {
    fontFamily: "Avenir-Heavy",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: Scale(16),
    color: "#375280",
    textAlign: "center",
  },
  info: {
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "500",
    color: "#375280",
    textAlign: "center",
  },
  bold: {
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  reward: {
    height: Scale(28),
    width: Scale(28),
    marginRight: Scale(12),
  },
  mb: {
    marginBottom: Scale(16),
  },
});
// Customizable Area End
