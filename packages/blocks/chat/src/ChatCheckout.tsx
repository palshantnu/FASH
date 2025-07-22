import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { ShippingAddress } from "./types";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
import CustomHeader from "../../../components/src/CustomHeader";
import i18n from "../../../components/src/i18n/i18n.config";
import Scale from "../../../components/src/Scale";
import { locationIcon, person, home, phone } from "./assets";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
import TextAlignManage from "../../../components/src/TextAlignManage";
import CustomButton from "../../../components/src/CustomButton";

// Customizable Area End

import ChatCheckoutController, {
  Props,
} from "./ChatCheckoutController";

export default class ChatCheckout extends ChatCheckoutController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddressButton = (address: ShippingAddress) => {
    if (address && address.name) {
      return (
        <Text
          style={styles.addTxt}
          onPress={this.goToAddressSelection}
          testID="editAddress"
        >
          {i18n.t("Edit")}
        </Text>
      );
    }
    return (
      <Text
        style={styles.addTxt}
        testID="addAddress"
        onPress={this.goToAddressSelection}
      >
        {i18n.t("Add")} 
      </Text>
    );
  };
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="ChatCheckout">
        <CustomHeader
          title={i18n.t("Checkout")}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {this.state.loading && <CustomLoader />}
        {
          !!this.state.cart.product_name && 
            <ScrollView style={styles.container} bounces={false}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                testID="keyboardDismiss"
              >
                <View>
                  <View style={styles.shadowBox}>
                    <View style={[styles.row, styles.sb, styles.head,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Image source={locationIcon} style={styles.iconHeader} />
                        <Text style={[styles.headerTxt,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{i18n.t("ShippingInformation")}</Text>
                      </View>
                      {this.renderAddressButton(this.state.address)}
                    </View>
                    {
                      !!(this.state.address?.name) && 
                      <>
                      <View style={[styles.row, styles.desc,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Image source={person} style={styles.miniIcon} />
                        <Text style={[styles.descText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                          {this.state.address.name || ""}
                        </Text>
                      </View>
                      <View style={[styles.row, styles.desc,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Image source={phone} style={styles.miniIcon} />
                        <Text style={[styles.descText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                          {this.state.address.contact_number || ""}
                        </Text>
                      </View>
                      <View style={[styles.row, styles.desc,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Image source={home} style={styles.miniIcon} />
                        <Text style={[styles.descText, styles.fl1,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                          {this.parseAddress(this.state.address)}
                        </Text>
                      </View>
                      </>
                    }
                  </View>
                  
                  <View style={styles.shadowBox}>
                    <View style={styles.flFooterInnerContainer}>
                      <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.subLabel}>{i18n.t("Itemtotal")}</Text>
                        <Text style={styles.subCost}>
                          {this.priceConvert((Number(this.state.cart.price_per_unit) * this.state.cart.product_quantity).toString())}
                        </Text>
                      </View>
                      <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.subLabel}>{i18n.t("DeliveryCharges")}</Text>
                        <Text style={styles.subCost}>
                          {this.priceConvert(this.state.cart.shipping_cost)}
                        </Text>
                      </View>
                      <View style={[styles.row, styles.sb, styles.totalContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.totalText}> {i18n.t("totalCost")}</Text>
                        <Text style={styles.totalPrice}>
                          {this.priceConvert(this.state.cart.total_amount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <CustomButton
                title={i18n.t("Checkout")}
                onPress={this.placeOrder}
                style={styles.btn}
                testID="checkoutBtn"
              />
            </ScrollView>
        }
        
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
  fl1: {
    flex: 1,
  },
  shadowBox: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
    padding: Scale(16),
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: Scale(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  head: {
    marginBottom: Scale(8),
  },
  iconHeader: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(12),
    resizeMode: "contain",
  },
  miniIcon: {
    height: Scale(16),
    width: Scale(16),
    marginRight: Scale(16),
    resizeMode: "contain",
  },
  headerTxt: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 22,
  },
  descText: {
    color: "#94A3B8",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 22,
  },
  addTxt: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 22,
  },
  desc: {
    marginHorizontal: Scale(4),
  },
  removeCoupon: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 22,
  },
  errorBox: {
    borderWidth: 1,
    borderColor: "#F87171",
  },
  checkbox: {
    margin: Scale(2),
    borderWidth: Scale(2),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    ...Platform.select({
      ios: {
        height: Scale(24),
        width: Scale(24),
      },
    }),
  },
  flFooterInnerContainer: {
    paddingVertical: Scale(24),
  },
  subLabel: {
    fontSize: 14,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom: Scale(10),
  },
  totalContainer: {
    marginTop: Scale(14),
    paddingTop: Scale(12),
    borderTopColor: "#CBD5E1",
    borderTopWidth: 2 * StyleSheet.hairlineWidth,
  },
  subCost: {
    fontSize: 14,
    fontFamily: "Lato",
    fontWeight: "700",
    color: "#375280",
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: "Lato",
    fontWeight: "700",
    color: "#375280",
  },
  totalText: {
    fontSize: 24,
    fontFamily: "Lato",
    fontWeight: "700",
    color: "#375280",
  },
  input: {
    padding: 0,
    height: Scale(24),
    minWidth: Scale(120),
  },
  voucher: {
    color: "#059669",
  },
  ship: {
    paddingHorizontal: 0,
  },
  innerPadding: {
    paddingHorizontal: Scale(16),
  },
  shipping: {
    marginLeft: Scale(24 + 12),
    marginRight: Scale(8),
  },
  divider: {
    height: 2 * StyleSheet.hairlineWidth,
    backgroundColor: "#CBD5E1",
    marginVertical: Scale(12),
  },
  btn: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(16),
    marginTop: Scale(20),
  },
});
// Customizable Area End