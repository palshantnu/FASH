import React from "react";

// Customizable Area Start
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomTextInput from "../../../components/src/CustomTextInput";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import InitiateRefundController, {
  Props,
  configJSON,
} from "./InitiateRefundController";

export default class InitiateRefund extends InitiateRefundController {
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
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title={i18n.t('initiateRefund')}
          onLeftPress={this.goBack}
          leftTestId="goBackIcon"
        />
        <View style={[styles.container, styles.main]}>
          <Text style={styles.confirmMessage}>
            {i18n.t('initiateRefundReturnedProduct')}
          </Text>
          <Text style={styles.refundtext}>{i18n.t('refundAmount')}</Text>
          <View style={[styles.amountbox, {
            borderColor: (this.state.refund_amount_price < this.state.refundAmount) ? '#DC2626' : 'rgba(255, 255, 255, .4)'
          }]}>
            <Text style={[styles.pricetext,{textAlign:this.state.languageType === 'ar'?'right':'left'}]}>{PriceConvertValue(this.state.refundAmount, this.state.currencyIcon)}</Text>
          </View>
          <View style={styles.amounttext}>
            <Text style={[styles.amountpricetext, {
              color: (this.state.refund_amount_price > this.state.refundAmount) ? '#DC2626' : 'rgba(255, 255, 255, .4)'
            }]}>{(this.state.refund_amount_price < this.state.refundAmount) ? `*${i18n.t('refundAmountCannotMoreSaleAmount')}` : null}</Text>
          </View>
          {
            this.state.refund_error_message ? (
              <View>
                <Text style={styles.errormessage}>*{this.state.refund_error_message}</Text>
              </View>
            ) : null
          }
        </View>

        <View style={[styles.btnRow, {flexDirection: FlexConditionManage(i18n.language)}]}>
          <CustomButton
            testID="closeBtn"
            title={i18n.t('close')}
            style={styles.closeBtn}
            textStyle={styles.closeText}
            onPress={this.goBack}
          />
          <CustomButton
            testID="confirm"
            title={i18n.t('confirm')}
            style={styles.confirmBtn}
            onPress={this.initateRefund}
          />
        </View>
        {this.state.loading && <CustomLoader />}
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
  confirmMessage: {
    textAlign: "center",
    margin: Scale(20),
    marginTop: 0,
    color: "#375280",
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
    backgroundColor: "#FFFFFF",
  },
  closeBtn: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  confirmBtn: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  closeText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  main: {
    margin: Scale(20),
  },
  amountbox: {
    height: 50,
    width: "97%",
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: "#f5f3f3",
    borderColor: "#f5f3f3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  amounttext: {
    marginTop: 5
  },
  amountpricetext: {
    marginLeft: 5,
    fontSize: 14
  },
  refundtext: {
    color: '#375280',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 15
  },
  pricetext: {
    fontSize: 16,
    marginTop: 12,
    marginLeft: 10,
    color: '#375280',
  },
  errormessage: {
    color: "#dc2626",
    left: 5
  }
});
// Customizable Area End
