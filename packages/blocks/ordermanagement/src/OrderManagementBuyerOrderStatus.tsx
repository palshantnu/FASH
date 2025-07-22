import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import OrderManagementBuyerOrderStatusController, {
  Props,
} from "./OrderManagementBuyerOrderStatusController";
import globalStyle from "../../../components/src/GlobalStyle";
import CustomLoader from "../../../components/src/CustomLoader";
import Timeline from "react-native-timeline-flatlist";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
// Customizable Area End

export default class OrderManagementBuyerOrderStatus extends OrderManagementBuyerOrderStatusController {
  constructor(props: Props) {
    super(props);
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start
    const { orderStatusList } = this.state;
    const apiResponseDate = orderStatusList?.attributes?.placed_at;
    const dateObj = new Date(apiResponseDate);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthIndex];
    const year = dateObj.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return (
      <View style={styles.mainContainerStatus}>
        <SafeAreaView style={styles.safeViewContainerStatus} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={[
            styles.containerViewOrderStatus,
            globalStyle.headerMarginManage,
          ]}
        >
          <View style={[styles.headerViewOrderStatus,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackOrderStatus"
              style={styles.backTouchOrderStatus}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconOrderStatus,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleOrderStatus}>{i18n.t('order_status')}</Text>
            </View>
            <View style={styles.extraViewOrderStatus}></View>
          </View>
        </View>

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.manageScrollPadding}
        >
          <View style={styles.timelineView}>
            <Timeline
            columnFormat={i18n.language==="ar"?'single-column-right':'single-column-left'}
              data={this.state.timeStatusArr}
              circleSize={15}
              circleColor="rgba(204, 190, 177, 1)"
              lineColor="rgba(204, 190, 177, 1)"
              descriptionStyle={[styles.descriptionText,{textAlign:TextAlignManage(i18n.language)}]}
              titleStyle={[styles.textStyleText,{textAlign:TextAlignManage(i18n.language)}]}
              showTime={false}
              innerCircle={"icon"}
              options={{
                bounces: false,
              }}
            />

            <View style={{ marginTop: (windowWidth * 1) / 100 }}>
              <View style={styles.orderDetailViewStatus}>
                <View style={[styles.orderIDView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Text style={styles.orderDateLabelText}>{i18n.t("OrderID")}:</Text>
                  <Text style={styles.orderDateText}>
                    #{this.state.orderNo}
                  </Text>
                </View>
                <View style={[styles.orderDateView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Text style={styles.orderDateLabelText}>{i18n.t("PurchaseDate")}:</Text>
                  <Text style={styles.orderDateText}>{formattedDate}</Text>
                </View>
              </View>
            </View>

            {this.state.status === "rejected" ? (
              <Text></Text>
            ) : (
              <TouchableOpacity
                testID="btnTrackOrder"
                style={[
                  styles.btnTrackOrder,
                  this.state.isTrackOrderDisabled && styles.disabledButton,
                ]}
                onPress={this.btnTrackOrder}
                disabled={this.state.isTrackOrderDisabled}
              >
                <Text style={styles.trackButtonText}>{i18n.t("TrackOrder")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeViewContainerStatus: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainerStatus: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewOrderStatus: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerViewOrderStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchOrderStatus: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  disabledButton: {
    opacity: 0.5,
  },
  backIconOrderStatus: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleOrderStatus: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  extraViewOrderStatus: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  orderDetailViewStatus: {
    margin: 2,
    marginBottom: 30,
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
    padding: 20,
  },
  btnTrackOrder: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 2) / 100,
    justifyContent: "center",
  },
  trackButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100,
  },
  timelineView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 5) / 100,
  },
  manageScrollPadding: {
    paddingBottom: (windowWidth * 10) / 100,
  },
  descriptionText: {
    color: "#94A3B8",
    fontSize: (windowWidth * 3.8) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    marginTop: (windowWidth * 1) / 100,
    paddingBottom: (windowWidth * 10) / 100,
  },
  textStyleText: {
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    fontFamily: "Lato-Bold",
    marginTop: (-windowWidth * 3) / 100,
  },
  orderDateLabelText: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.8) / 100,
  },
  orderDateText: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.8) / 100,
    fontWeight: "500",
  },
  orderIDView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 4) / 100,
  },
});
// Customizable Area End
