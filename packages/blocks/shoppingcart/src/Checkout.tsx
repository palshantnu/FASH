import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions
} from "react-native";

import {
  locationIcon,
  coupon,
  truckSpeed,
  person,
  home,
  phone,
} from "./assets";
import { AddressAttributes } from "./response";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

import CheckoutController, { Props } from "./CheckoutController";

export default class Checkout extends CheckoutController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderRightText = (editable: boolean, error: string) => {
    if (error) {
      return (
        <Text style={styles.removeCoupon} testID="promoError">
          {error}
        </Text>
      );
    }
    if (editable) {
      return (
        <Text
          style={styles.addTxt}
          testID="applyCoupon"
          onPress={this.onSubmit}
        >
           {i18n.t("apply")}
        </Text>
      );
    }
    return (
      <Text
        style={styles.removeCoupon}
        testID="removeCoupon"
        onPress={this.removeCoupon}
      >
        {i18n.t("Remove")}
      </Text>
    );
  };

  renderShipping = (estimated: string) => (
    <View style={styles.shipping}>
      <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
        <Text style={[styles.descText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{i18n.t("EstimatedDeliverytime")}</Text>
        <Text style={styles.descText}>{estimated}</Text>
      </View>
    </View>
  );

  renderAddressButton = (address: AddressAttributes) => {
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
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.container} testID="loader">
          <CustomLoader />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container} testID="checkout">
        <CustomHeader
          title={i18n.t("Checkout")}
          onLeftPress={() => this.props.navigation.goBack()}
        />
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
                  !!this.state.address.name && 
                  <View>
                    <View style={[styles.row, styles.desc, { flexDirection: FlexConditionManage(i18n.language) }]}>
                      <Image source={person} style={styles.miniIcon} />
                      <Text style={[styles.descText, { marginLeft: ManageDynamicMargin(i18n.language, 0, windowWidth * 3 / 100,), marginRight: ManageDynamicMargin(i18n.language, windowWidth * 3 / 100, 0) }]}>
                        {this.state.address.name || ""}
                      </Text>
                    </View>
                    <View style={[styles.row, styles.desc, { flexDirection: FlexConditionManage(i18n.language) }]}>
                      <Image source={phone} style={styles.miniIcon} />
                      <Text style={[styles.descText, { marginLeft: ManageDynamicMargin(i18n.language, 0, windowWidth * 3 / 100,), marginRight: ManageDynamicMargin(i18n.language, windowWidth * 3 / 100, 0) }]}>
                        {this.state.address.contact_number || ""}
                      </Text>
                    </View>
                    <View style={[styles.row, styles.desc, { flexDirection: FlexConditionManage(i18n.language) }]}>
                      <Image source={home} style={styles.miniIcon} />
                      <Text style={[styles.descText, styles.fl1, { textAlign: TextAlignManage(i18n.language), marginLeft: ManageDynamicMargin(i18n.language, 0, windowWidth * 3 / 100,), marginRight: ManageDynamicMargin(i18n.language, windowWidth * 3 / 100, 0) }]}>
                        {this.parseAddress(this.state.address)}
                      </Text>
                    </View>
                  </View>
                }
              </View>
              <View
                style={[
                  styles.shadowBox,
                  this.state.errorCoupon ? styles.errorBox : {},
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={this.focus}
                  testID="focusArea"
                  style={{ backgroundColor: "red", flex: 1 }}
                >
                  <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]} pointerEvents="none">
                      <Image source={coupon} style={styles.iconHeader} />
                      <TextInput
                        testID="couponInput"
                        value={this.state.coupon}
                        style={[styles.headerTxt, styles.input,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}
                        placeholderTextColor={"#375280"}
                        maxLength={16}
                        editable={this.state.editable}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onChangeText={this.handlePormoChange}
                        onFocus={this.resetPromoPlaceholder}
                        onBlur={this.onPromoBlur}
                        onSubmitEditing={this.onSubmit}
                        ref={this.inputRef}
                      />
                    </View>
                    {this.renderRightText(
                      this.state.editable,
                      this.state.errorCoupon
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.shadowBox, styles.ship]}>
                <View style={styles.innerPadding}>
                  <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <Image source={truckSpeed} style={[styles.iconHeader,{transform:[ { scaleX: ImageReverseManage(i18n.language) }]}]} />
                      <Text style={[styles.headerTxt,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{i18n.t("ExpressDelivery")}</Text>
                    </View>
                  </View>
                  {this.renderShipping(
                    this.state.cart.estimated_delivery_time
                  )}
                </View>
              </View>
              <View style={styles.shadowBox}>
                <View style={styles.flFooterInnerContainer}>
                  <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.subLabel}>{i18n.t("Itemtotal")}</Text>
                    <Text style={styles.subCost}>
                      {this.priceConvert(this.state.cart.sub_total)}
                    </Text>
                  </View>
                  {
                    (!!this.state.address.name || !!this.state.cart.shipping_charge) &&
                    <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <Text style={styles.subLabel}>{i18n.t("DeliveryCharges")}</Text>
                      <Text style={styles.subCost}>
                        {this.priceConvert(this.state.cart.shipping_charge.toString())}
                      </Text>
                    </View>
                  }
                 {parseInt(this.state.cart.applied_discount)>0 && <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={[styles.subLabel, styles.voucher]}>
                      {i18n.t("Voucher")}
                    </Text>
                    <Text style={[styles.subCost, styles.voucher]}>
                      {this.priceConvert(
                        this.state.cart.applied_discount,
                        true
                      )}
                    </Text>
                  </View>}
                  {this.state.loyalty_points > 0 &&
                  <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={[styles.subLabel, styles.voucher]}>
                      {i18n.t("loyaltyPointsText")}
                    </Text>
                    <Text style={[styles.subCost, styles.voucher]}>
                      {this.priceConvert(
                        this.state.loyalty_points,
                        true
                      )}
                    </Text>
                  </View>}
                  <View style={[styles.row, styles.sb, styles.totalContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.totalText}> {i18n.t("totalCost")}</Text>
                    <Text style={styles.totalPrice}>
                      {this.priceConvert(this.state.cart.total_payable_amount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <CustomButton
            title={i18n.t("Checkout")}
            disabled={this.state.address.name ? false : true}
            onPress={this.placeOrder}
            style={[styles.btn, { backgroundColor: this.state.address.name ? "#CCBEB1" :"#CBD5E1"  }]}
            testID="checkoutBtn"
          />
        </ScrollView>
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
