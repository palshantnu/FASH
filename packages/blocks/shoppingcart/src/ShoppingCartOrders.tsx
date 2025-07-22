import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import { backIcon } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Customizable Area End

import ShoppingCartOrdersController, {
  Props,
} from "./ShoppingCartOrdersController";

export default class ShoppingCartOrders extends ShoppingCartOrdersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  counter({
    count,
    increment,
    decrement,
  }: {
    count: number;
    increment: () => unknown;
    decrement: () => unknown;
  }) {
    return (
      <View style={[styles.row, styles.buttonsContainer]} testID="quantity">
        <AntDesign
          name="minuscircleo"
          size={16}
          color={"#375280"}
          onPress={decrement}
          testID="decrementBtn"
        />
        <Text style={styles.count} testID="quantityValue">
          {count}
        </Text>
        <AntDesign
          name="pluscircleo"
          size={16}
          color={"#375280"}
          onPress={increment}
          testID="incrementBtn"
        />
      </View>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.defaultContainer} testID="shoppingCartOrders">
        <View style={styles.innerContainer}>
          <View style={[styles.headerViewMainCatalogue,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackCatalogue"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCssCatalogue,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCatalogue}>{i18n.t("Cart")}</Text>
            </View>
            <View style={styles.filterIconTouch} />
          </View>
          {this.state.cartItems?.length ? (
            <Text style={[styles.flHeader,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*8/100,0)}]} testID="countHeaderText">
              {this.state.cartItems.length.toString()} {i18n.t("items")}
            </Text>
          ) : null}
          <FlatList
            data={this.state.cartItems}
            bounces={false}
            keyExtractor={({ id }) => "order_item_" + id}
            contentContainerStyle={styles.flContainer}
            testID="cartItemsFlatList"
            renderItem={({ item, index }) => {
              const color = item.attributes.catalogue_variant_color;
              const size = item.attributes.catalogue_variant_size;
              const variant = i18n.t('Sizes')+`: ${size}  ${i18n.t("color")}: ${color}`;
              const etaDate = this.dateConvertMoment(this.state.cartMeta.estimated_delivery_time)

              return (
                <View style={styles.flItem} testID="cartItem">
                  <View style={[styles.flInnerItem,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity 
                    testID={`catalogueItem_${index}`}
                    onPress={() => {
                      this.goToCatalogueDetails(item.attributes.catalogue_id);
                    }}
                    >
                    <Image
                      source={{
                        uri:
                        item.attributes.catalogue_variant_front_image ||
                        "https://i.ibb.co/8Nb9QHL/image.png",
                      }}
                      style={styles.thumbnail}
                      />
                    </TouchableOpacity>
                    <View style={styles.itemInfo}>
                      <View>
                        <Text style={[styles.itemShop,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                        {this.getDataStoreAndStylist(item.attributes.store_name,item.attributes.stylist_full_name)}
                        </Text>
                        <Text style={[styles.title,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                          {item.attributes.catalogue_name}
                        </Text>
                        <Text style={[styles.variantText,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{variant}</Text>
                      </View>
                      <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={[styles.price,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                        {PriceConvertValue(item.attributes.total_price.toString(),this.state.localCurrency)}
                        </Text>
                        {this.counter({
                          count: item.attributes.quantity,
                          increment: () =>
                            this.updateQuantity(
                              item.id,
                              item.attributes.quantity,
                              "increment"
                            ),
                          decrement: () =>
                            this.updateQuantity(
                              item.id,
                              item.attributes.quantity,
                              "decrement"
                            ),
                        })}
                      </View>
                    </View>
                  </View>
                  <Text style={[styles.deliveryETA,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                    {i18n.t("EstimatedDeliverytime")} : {this.state.cartMeta.estimated_delivery_time}
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={
              this.state.loading ? null : (
                <View style={styles.empty} testID="emptyView">
                  <Text style={styles.emptyHeader}>{i18n.t("cartEmpty")}</Text>
                  <Text style={styles.emptyDesc}>
                  {i18n.t("StartItem")}
                  </Text>
                </View>
              )
            }
            ListFooterComponentStyle={styles.flFooterStyle}
            ListFooterComponent={
              this.state.cartItems?.length ? (
                <>
                  <View style={styles.flFooterContainer}>
                    <View style={styles.flFooterInnerContainer}>
                      <View style={[styles.spaceBetween,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.subLabel}>{i18n.t("Itemtotal")}</Text>
                        <Text style={styles.subCost}>
                        {PriceConvertValue(this.state.subTotal.toString(),this.state.localCurrency)}
                        </Text>
                      </View>
                      <View style={[styles.spaceBetween,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.subLabel}>{i18n.t("Shippingfee")}</Text>
                        <Text style={styles.subCost}>
                        {PriceConvertValue(this.state.shipping.toString(),this.state.localCurrency)}
                        </Text>
                      </View>
                      {this.state.cartMeta.applied_copon_code ? (
                        <View style={[styles.spaceBetween,{flexDirection:FlexConditionManage(i18n.language)}]}>
                          <Text style={[styles.subLabel, styles.voucher]}>
                            {i18n.t("Voucher")}
                          </Text>
                          <Text style={[styles.subCost, styles.voucher]}>
                          {PriceConvertValue( parseFloat(
                                this.state.cartMeta.applied_discount
                              ).toFixed(2),this.state.localCurrency)}
                            
                          </Text>
                        </View>
                      ) : null}
                      <View
                        style={[styles.spaceBetween, styles.totalContainer,{flexDirection:FlexConditionManage(i18n.language)}]}
                      >
                        <Text style={styles.totalText}>{i18n.t("totalCost")}</Text>
                        <Text style={styles.totalPrice}>
                        {PriceConvertValue( this.state.total.toString(),this.state.localCurrency)}
                        
                        </Text>
                      </View>
                    </View>
                  </View>
                  <CustomButton
                    title={i18n.t("Checkout")}
                    testID="checkout"
                    onPress={this.goToCheckout}
                    style={styles.btn}
                  />
                </>
              ) : null
            }
          />
        </View>
        {this.state.loading && <CustomLoader />}
        {this.state.isAddressUpdated && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
  },
  headerViewMainCatalogue: {
    marginHorizontal: Scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Scale(9),
    alignContent: "center",
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  voucher: {
    color: "#059669",
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  flHeader: {
    marginHorizontal: Scale(24),
    paddingVertical: Scale(16),
    color: "#375280",
    fontWeight: "700",
    fontSize: 17,
  },
  flContainer: {
    flexGrow: 1,
    paddingHorizontal: Scale(24),
  },
  flItem: {
    marginBottom: Scale(21),
  },
  flFooterStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flInnerItem: {
    flexDirection: "row",
  },
  thumbnail: {
    width: Scale(112),
    height: Scale(140),
    marginRight: Scale(16),
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemShop: {
    color: "#375280",
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "700",
    marginVertical: Scale(4),
  },
  title: {
    color: "#375280",
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: Scale(4),
  },
  variantText: {
    fontFamily: "Lato",
    fontSize: 13,
    fontWeight: "400",
    color: "#94A3B8",
  },
  deliveryETA: {
    marginTop: Scale(12),
    color: "#375280",
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    // fontFamily: 'Gotham',
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "700",
    color: "#375280",
  },
  count: {
    fontFamily: "Lato",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#375280",
    marginHorizontal: Scale(8),
  },
  flFooterContainer: {
    marginTop: Scale(2),
    marginBottom: Scale(18),
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flFooterInnerContainer: {
    paddingVertical: Scale(24),
  },
  priceInfoContainer: {
    paddingHorizontal: Scale(24),
    marginBottom: Scale(12),
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Scale(24),
  },
  totalContainer: {
    marginTop: Scale(14),
    paddingTop: Scale(12),
    borderTopColor: "#CBD5E1",
    borderTopWidth: 2 * StyleSheet.hairlineWidth,
  },
  subLabel: {
    fontSize: 14,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom: Scale(10),
  },
  subCost: {
    fontSize: 14,
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
  totalPrice: {
    fontSize: 24,
    fontFamily: "Lato",
    fontWeight: "700",
    color: "#375280",
  },
  buttonsContainer: {
    marginHorizontal: Scale(8),
  },
  btn: {
    // marginHorizontal: Scale(24),
    marginBottom: Scale(16),
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHeader: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "700",
    color: "#375280",
  },
  emptyDesc: {
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "500",
    color: "#94A3B8",
  },
});
// Customizable Area End
