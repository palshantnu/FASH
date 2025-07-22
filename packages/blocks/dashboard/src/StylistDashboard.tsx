import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";

import Scale from "../../../components/src/Scale";
import { bell, arrowNext, chartBarIcon } from "./assets";
const windowWidth = Dimensions.get("window").width;
const { width } = Dimensions.get("window");
import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import StylistDashboardController, {
  Props,
  configJSON,
} from "./StylistDashboardController";

export default class StylistDashboard extends StylistDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View
      style={[
        styles.body,
        styles.row,
        { direction: FlatListRowManage(i18n.language) },
        styles.sb,
      ]}
      testID="headerArea"
    >
      <View style={styles.row}>
        <Text style={styles.headerText}>{i18n.t("Dashboard")}</Text>
      </View>
      <View style={styles.mainHeaderIcon}>
        <TouchableOpacity
          testID="btnRedirectAnalytics"
          style={styles.bellTouch}
          onPress={() => {
            this.btnRedirectAnalytics();
          }}
        >
          <Image source={chartBarIcon} style={styles.bellIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bellTouch}
          onPress={() => this.btnNotificationRedirection()}
        >
          <Image resizeMode="contain" source={bell} style={styles.bellIcon} />
          {this.state.hasNewNotification && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );

  UnderReview = () => (
    <View style={styles.underReview}>
      <Text style={styles.reviewTxt}>{configJSON.waitingForApprovalText}</Text>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylistDashboard">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <this.Header />
        {this.state.loading && <CustomLoader />}
        {this.state.isUnderReview ? (
          <>
            <TouchableOpacity
              style={[
                { flexDirection: FlexConditionManage(i18n.language) },
                styles.storeSelector,
              ]}
              onPress={this.navigateToStlistAsBuyer}
            >
              <Text style={styles.selectStoreText}>
                {i18n.t("exploreBuyerText")}
              </Text>
              <Image
                source={arrowNext}
                style={[
                  {
                    transform: [
                      { scaleY: ImageReverseManage(i18n.language) },

                      { scaleX: ImageReverseManage(i18n.language) },
                    ],
                  },
                  styles.nextIcon,
                ]}
              />
            </TouchableOpacity>
            <this.UnderReview />
          </>
        ) : (
          <ScrollView
            testID="scrollView-stylist-dashboard"
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshData}
              />
            }
          >
            <TouchableOpacity
              onPress={this.navigateToStlistAsBuyer}
              style={[
                styles.storeSelector,
                { flexDirection: FlexConditionManage(i18n.language) },
              ]}
            >
              <Text style={styles.selectStoreText}>
                {i18n.t("exploreBuyerText")}
              </Text>
              <Image
                source={arrowNext}
                style={[
                  styles.nextIcon,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            {!this.state.loading && this.state.newRequestData && (
              <View>
                <View
                  style={[
                    styles.row,
                    styles.sb,
                    styles.ordersH1,
                    { flexDirection: FlexConditionManage(i18n.language) },
                  ]}
                >
                  <Text style={styles.hh1}>
                    {i18n.t("newStylingRequests")} (
                    {this.state.newRequestData.slice(0, 2).length})
                  </Text>
                  <TouchableOpacity
                    onPress={this.navigateToStylistRequests}
                    style={styles.hh2Wrapper}
                    testID="ViewAllBtn"
                  >
                    <Text style={styles.hh2}>{i18n.t("viewAllBtn")}</Text>
                  </TouchableOpacity>
                </View>

                {this.state.newRequestData.length > 0
                  ? this.state.newRequestData.slice(0, 2).map((item: any) => {
                      const { created_at } = item.attributes;
                      const orderNumber = `${item.attributes.stylist_id}-${
                        item.id
                      } | ${this.formatTime(created_at)}`;
                      return (
                        <View key={item.id}>
                          <View
                            style={[
                              styles.row,
                              styles.sb,
                              {
                                flexDirection: FlexConditionManage(
                                  i18n.language
                                ),
                              },
                              styles.ordersH2,
                            ]}
                          >
                            <View style={styles.orhh2Wrapper}>
                              <Text style={styles.price}>
                                {i18n.t("new_request")}
                              </Text>
                            </View>
                            <Text style={styles.orhh1}>#{orderNumber}</Text>
                          </View>

                          <View
                            style={[
                              styles.row,
                              styles.sb,
                              { direction: FlatListRowManage(i18n.language) },
                              styles.ordersH2,
                            ]}
                          >
                            <View
                              style={[
                                {
                                  width: (windowWidth * 75) / 100,
                                  alignItems: "flex-start",
                                },
                              ]}
                            >
                              <Text style={styles.prodName}>
                                {item.attributes.buyer_name}
                              </Text>
                              <View
                                style={[styles.row, { alignSelf: "flex-end" }]}
                              >
                                <Text style={styles.quantity}>
                                  {i18n.t("gender")} -{" "}
                                  {this.getGender(item.attributes.gender)}
                                </Text>
                              </View>
                            </View>
                            <Image
                              source={ImageNotFound(
                                item.attributes.images[0].url
                              )}
                              style={styles.orderThumb}
                            />
                          </View>

                          <View
                            style={[
                              styles.row,
                              styles.ordersH2,
                              styles.sb,
                              {
                                flexDirection: FlexConditionManage(
                                  i18n.language
                                ),
                              },
                            ]}
                          >
                            <Text style={styles.prodName}>
                              {i18n.t("budget")}
                            </Text>
                            <Text style={styles.price}>
                              ${item.attributes.min_price} - $
                              {item.attributes.max_price}
                            </Text>
                          </View>

                          <View style={[styles.row, styles.btns]}>
                            <CustomButton
                              testID="ViewRequestBtn"
                              title={i18n.t("view_request")}
                              style={styles.accButton}
                              textStyle={styles.accTxt}
                              onPress={() => this.navigationHandler(item.id)}
                            />
                          </View>
                        </View>
                      );
                    })
                  : !this.state.loading && (
                      <View style={styles.listEmptyContainer}>
                        <Text
                          style={[
                            {
                              fontSize: (windowWidth * 5) / 100,
                              color: "#375280",
                            },
                            styles.noCatalogueText,
                          ]}
                        >
                          {i18n.t("noNewStylingRequests")}
                        </Text>
                      </View>
                    )}
                <View style={styles.bottom} />
                <View
                  style={[
                    styles.row,
                    styles.sb,
                    { flexDirection: FlexConditionManage(i18n.language) },
                    styles.ordersH1,
                  ]}
                >
                  <Text style={styles.hh1}>
                    {i18n.t("newOrdersText")} (
                    {this.state.newOrderData.slice(0, 2).length})
                  </Text>
                  <TouchableOpacity
                    onPress={this.navigateToOrders}
                    style={styles.hh2Wrapper}
                    testID="ViewAllBtn"
                  >
                    <Text style={styles.hh2}>{i18n.t("viewAllBtn")}</Text>
                  </TouchableOpacity>
                </View>

                {this.state.newOrderData.length > 0
                  ? this.state.newOrderData.slice(0, 2).map((item: any) => {
                      const { order_management_order, id, order_items } =
                        item.attributes;
                      const orderNumber = `${
                        order_management_order.attributes.order_number
                      } | ${this.getTimeInCorrectFormat(
                        order_management_order.attributes.placed_at
                      )}`;
                      const totalPrice = this.getTheTotalPrice(order_items);
                      const time = this.findTimeRemainingForId(`${item.id}`);
                      return (
                        <View key={id}>
                          <View
                            style={[
                              styles.row,
                              styles.sb,
                              styles.ordersH2,
                              { direction: FlatListRowManage(i18n.language) },
                            ]}
                          >
                            <Text style={styles.orhh1}>#{orderNumber}</Text>
                            <View style={styles.orhh2Wrapper}>
                              <Text style={styles.orhh2}>
                                {i18n.t("newOrdersText")}
                              </Text>
                            </View>
                          </View>

                          {order_items.length > 0 ? (
                            order_items.slice(0, 2).map((item: any) => {
                              const {
                                catalogue_name,
                                quantity,
                                catalogue_variant_front_image,
                              } = item.attributes;

                              return (
                                <View
                                  key={item.id}
                                  style={[
                                    styles.row,
                                    styles.ordersH2,
                                    {
                                      direction: FlatListRowManage(
                                        i18n.language
                                      ),
                                    },
                                  ]}
                                >
                                  <Image
                                    source={ImageNotFound(
                                      catalogue_variant_front_image
                                    )}
                                    style={styles.orderThumb}
                                  />
                                  <View style={styles.orderInfo}>
                                    <Text style={styles.prodName}>
                                      {catalogue_name}
                                    </Text>
                                    <Text style={styles.quantity}>
                                      {`${i18n.t("Quantity")} : ` + quantity}
                                    </Text>
                                  </View>
                                </View>
                              );
                            })
                          ) : (
                            <Text>{i18n.t("no_items_found")}</Text>
                          )}

                          <View
                            style={[
                              styles.row,
                              {
                                flexDirection: FlexConditionManage(
                                  i18n.language
                                ),
                              },
                              styles.sb,
                              styles.orderFh,
                            ]}
                          >
                            <Text style={styles.prodName}>
                              {i18n.t("paymentMode")}
                            </Text>
                            <Text style={styles.orhh1}>
                              <Text style={styles.prodName}>
                                ${this.formatThePrice(totalPrice)}
                              </Text>{" "}
                              ({i18n.t("paidViaCard")})
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.row,
                              styles.btns,
                              { direction: FlatListRowManage(i18n.language) },
                            ]}
                          >
                            <CustomButton
                              testID="RejectOrderBtn"
                              title={i18n.t("reject")}
                              style={styles.rejButton}
                              textStyle={styles.rejTxt}
                              onPress={() => this.navigationToRejectOrder(id)}
                            />
                            <CustomButton
                              testID="AcceptOrderBtn"
                              title={`${i18n.t("acceptOrder")} (${time})`}
                              style={styles.accButton}
                              textStyle={styles.accTxt}
                              onPress={() => this.navigationToAcceptOrder(id)}
                            />
                          </View>
                        </View>
                      );
                    })
                  : !this.state.loading && (
                      <View style={styles.listEmptyContainer}>
                        <Text
                          style={[
                            {
                              fontSize: (windowWidth * 5) / 100,
                              color: "#375280",
                            },
                            styles.noCatalogueText,
                          ]}
                        >
                          {i18n.t("noNewOrder")}
                        </Text>
                      </View>
                    )}
                <View style={styles.bottom} />
              </View>
            )}
          </ScrollView>
        )}
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
    alignItems: "center",
    flexDirection: "row",
  },
  sb: {
    justifyContent: "space-between",
  },
  body: {
    padding: Scale(20),
  },
  menuBtn: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  noCatalogueText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  div: {
    height: Scale(2),
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: Scale(20),
    marginBottom: Scale(20),
  },
  listEmptyContainer: {
    width: (windowWidth * 100) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 15) / 100,
    marginBottom: (windowWidth * 15) / 100,
  },
  bottom: {
    paddingBottom: Scale(20),
  },
  ordersH1: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(12),
  },
  hh1: {
    fontSize: 18,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  headerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "700",
    color: "#375280",
    lineHeight: 26,
    marginHorizontal: Scale(12),
  },
  hh2Wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#375280",
  },
  hh2: {
    fontSize: 14,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  bell: {
    margin: Scale(4),
    height: Scale(18),
    width: Scale(18),
    resizeMode: "contain",
  },
  btns: {
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(20),
  },
  underReview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  reviewTxt: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato",
    textAlign: "center",
  },
  ordersH2: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(16),
  },
  orhh1: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  orhh2: {
    color: "#059669",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  orhh2Wrapper: {
    backgroundColor: "#D1FAE5",
    borderRadius: Scale(5),
    overflow: "hidden",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(4),
  },
  orderThumb: {
    height: Scale(48),
    width: Scale(48),
    borderRadius: Scale(4),
    resizeMode: "cover",
  },
  orderInfo: {
    marginHorizontal: Scale(12),
  },
  orderFh: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(5),
  },
  prodName: {
    fontSize: 14,
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  quantity: {
    fontSize: 12,
    textAlign: "left",
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  price: {
    fontSize: 14,
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  rejButton: {
    width: Scale(width * 0.35),
    marginRight: Scale(10),
    borderRadius: Scale(2),
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CCBEB1",
  },
  rejTxt: {
    color: "#375280",
    fontWeight: "500",
    fontSize: 16,
  },
  accButton: {
    flex: 1,
    borderRadius: Scale(2),
  },
  accTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  storeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(16),
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 1,
  },
  selectStoreText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 26,
    fontFamily: "Lato",
    color: "#375280",
  },
  redDot: {
    position: "absolute",
    top: 2,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  nextIcon: {
    height: Scale(24),
    marginTop: Scale(2),
    width: Scale(26),
  },
  bellTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  bellIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  mainHeaderIcon: {
    flexDirection: "row",
    width: (windowWidth * 15) / 100,
    justifyContent: "space-between",
  },
});
// Customizable Area End
