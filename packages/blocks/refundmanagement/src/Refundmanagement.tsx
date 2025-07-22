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
  Modal,
  TextInput
} from "react-native";
import moment from "moment";
import { selectedCheckBox, unSelectedCheckBox } from "./../../catalogue/src/assets";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import { backIcon } from "./assets";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config'
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

import RefundmanagementController, {
  Props,
  configJSON,
} from "./RefundmanagementController";
import PriceConvertValue from "../../../components/src/PriceConvertValue";

export default class Refundmanagement extends RefundmanagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderErrorMsg = (errorMsg: string) => (
    <Text style={styles.errorName}>* {errorMsg}</Text>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.defaultContainer} testID="shoppingCartOrders">
        <View style={styles.innerContainer}>
          <View style={styles.headerViewMainCatalogue}>
            <TouchableOpacity
              testID="btnBackCatalogue"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.backRedirection();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={styles.backIconCssCatalogue}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCatalogue}>{i18n.t('returnOrderText')}</Text>
            </View>
            <View style={styles.filterIconTouch} />
          </View>
          <View style={[styles.orderIdViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={styles.orderIDTextSum}>{i18n.t('orderID')} : #{this.state.orderList.attributes.order_number}</Text>
            <TouchableOpacity testID="allBtnCheckBox"
              onPress={() => this.selectAll()}
            >
              <Image
                style={styles.checkBoxImage}
                source={this.state.isSelectAll ? selectedCheckBox : unSelectedCheckBox}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.cartItems}
            bounces={false}
            keyExtractor={({ id }) => "order_item_" + id}
            contentContainerStyle={styles.flContainer}
            testID="cartItemsFlatList"
            renderItem={({ item, index }) => {
              const color = item.attributes.catalogue_variant_color;
              const size = item.attributes.catalogue_variant_size;
              const variant = `${i18n.t('size')}: ${size}  ${i18n.t('colour')}: ${color}`;
              moment.locale('en');      
              const momentDate =
                item.attributes.estimated_delivery_time ??
                moment().add({ days: 2 }); 
              const etaDate = moment(momentDate).format("DD MMM YYYY");
              return (
                <View style={[styles.flItem, index !== this.state.cartItems.length && {
                  borderBottomColor: "#CBD5E1",
                  borderBottomWidth: 2 * StyleSheet.hairlineWidth,
                }]} testID="cartItem">
                  <View style={[styles.flInnerItem,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Image
                      source={{
                        uri:
                          item.attributes.catalogue_variant_front_image ||
                          "https://i.ibb.co/8Nb9QHL/image.png",
                      }}
                      style={[styles.thumbnail,{marginRight:ManageDynamicMargin(i18n.language,0,Scale(16)),marginLeft:ManageDynamicMargin(i18n.language,Scale(16),0)}]}
                    />
                    <View style={styles.itemInfo}>
                      <View>
                        <Text style={[styles.itemShop,{textAlign:TextAlignManage(i18n.language)}]}>
                          {`${i18n.t('stores')} : ` + (item.attributes.store_name || "N/A")}
                        </Text>
                        <Text style={[styles.title,{textAlign:TextAlignManage(i18n.language)}]}>
                          {item.attributes.catalogue_name}
                        </Text>
                        <Text style={[styles.variantText,{textAlign:TextAlignManage(i18n.language)}]}>{variant}</Text>
                      </View>

                      
                        <Text style={[styles.price,{textAlign:TextAlignManage(i18n.language)}]}>
                          {this.state.currencyIcon + item.attributes.total_price}
                        </Text>

                      
                    </View>

                    <TouchableOpacity testID={"allBtnCheckBox" + index}
                      onPress={() => item.attributes.status === "delivered" && this.itemSelected(item.id)}
                    >
                      <Image
                        style={styles.checkBoxImage}
                        source={this.itemShowSelected(item.id) ? selectedCheckBox : unSelectedCheckBox}
                      />
                    </TouchableOpacity>

                  </View>
                  <Text style={styles.deliveryETA}>
                    {i18n.t('pickUpDate')} : {etaDate}
                  </Text>
                </View>
              );
            }}

            ListFooterComponentStyle={styles.flFooterStyle}
            ListFooterComponent={
              this.state.cartItems?.length ? (
                <>
                  <View style={styles.flFooterContainer}>
                    <View style={styles.flFooterInnerContainer}>
                      <View style={[styles.spaceBetween,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.subLabel}>{i18n.t('totalRefund')}</Text>
                        <Text style={styles.subCost}>{PriceConvertValue(this.state.subTotal, this.state.currencyIcon)}</Text>
                      </View>
                      <View
                        style={[styles.spaceBetween, styles.totalContainer,{flexDirection:FlexConditionManage(i18n.language)}]}
                      >
                        <Text style={styles.totalText}>{i18n.t('totalRefund')}</Text>
                        <Text style={styles.totalPrice}>{PriceConvertValue(this.state.total, this.state.currencyIcon)}</Text>
                      </View>
                    </View>
                  </View>
                  {this.state.selectItem.length > 0 ?
                    <CustomButton
                      title={i18n.t('submitRequest')}
                      testID="checkout"
                      onPress={() => this.showOrderConfirm()}
                      style={[styles.btn]}
                    />
                    : <CustomButton
                      title={i18n.t('submitRequest')}
                      testID="checkout"

                      style={[styles.btn, { backgroundColor: '#E7E2DE', }]}
                    />
                  }
                </>
              ) : null
            }
          />
        </View>
        {this.state.loading && <CustomLoader />}
        <Modal
          testID="btnCancelModal"
          animationType="slide"
          transparent={true}
          visible={this.state.cancelOrderModal}>

          <View style={styles.modalMainView}>
            <SafeAreaView style={styles.modalSafeArea} />

            <View style={styles.modalButtonMainView}>
              <View style={{ ...styles.fieldContainer }}>
                <Text style={styles.nameText}>{i18n.t('refundReason')} *</Text>
                <View
                  style={[
                    styles.inputDescriptionViewContainer,
                    { borderColor: this.state.errorMsg ? "#F87171" : "#F8F8F8" },
                  ]}
                >
                  <TextInput
                    testID="txtInputProductDescription"
                    placeholder={i18n.t('enterRefundReason')}
                    placeholderTextColor="#375280"
                    style={{
                      ...styles.buildingTextInput,
                      height: Scale(120),
                    }}
                    value={this.state.reason}
                    multiline={true}
                    onChangeText={this.handleChangetheReason}
                    textAlignVertical="top"
                    autoCapitalize="none"
                    keyboardType="default"
                  />
                </View>
                {this.state.errorMsg && this.renderErrorMsg(`${i18n.t('pleaseEnterRefundReason')}`)}
              </View>

              <View style={styles.modalTwoBtnView}>
                <TouchableOpacity
                  testID={"btnCancelOrderNo"}
                  style={styles.cancelTouch}
                  onPress={() => {
                    this.cancelModalClose()
                  }}>
                  <Text style={styles.noText}> {i18n.t('cancel')} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID="btnCancelOrderYes"
                  style={styles.yesTouch}
                  onPress={() => {
                    this.cancelOrderConfirm()
                  }}>
                  <Text style={styles.yesText}>{i18n.t('Submit')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    fontSize: 17,
    fontWeight: "700",
  },
  flContainer: {
    paddingHorizontal: Scale(24),
    flexGrow: 1,
    marginTop: 15,
  },
  flItem: {
    marginBottom: Scale(21),
    paddingBottom: Scale(15),
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
  orderIdViewSum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#CBD5E1",
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingVertical: 15,
    marginHorizontal: Scale(24),
  },

  orderIDTextSum: {
    color: '#94A3B8',
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    fontSize: windowWidth * 3.3 / 100
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
  checkBoxImage: {
    width: Scale(22),
    height: Scale(22),

  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSafeArea: {
    flex: 0,
    backgroundColor: "#00000080"
  },
  modalButtonMainView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: (windowWidth * 7) / 100,
    justifyContent: "space-between",
  },
  cancelOrderText: {
    fontSize: (windowWidth * 4.3) / 100,
    color: "#375280",
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  },
  modalTwoBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelTouch: {
    backgroundColor: "#FFFFFF",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  noText: {
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
    color: '#375280'
  },
  yesTouch: {
    backgroundColor: "#CCBEB1",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
  },
  yesText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    height: Scale(50),
  },
  inputDescriptionViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
  },
  buildingTextInput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
    marginTop: 5
  },
  fieldContainer: {
    paddingTop: 5,
    marginBottom: 10,
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
});
// Customizable Area End
