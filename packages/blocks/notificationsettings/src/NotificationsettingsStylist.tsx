import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";

import { backIcon } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import NotificationsettingsStylistController, {
  Props,
} from "./NotificationsettingsStylistController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import CustomSwitch from "../../../components/src/CustomSwitch";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class NotificationsettingsStylist extends NotificationsettingsStylistController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {this.state.loading && <CustomLoader />}
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewAdmin, globalStyle.headerMarginManage]}>
          <TouchableOpacity
            testID="btnBackNotificationSetting"
            style={styles.backTouchAdmin}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Image
              resizeMode="contain"
              source={backIcon}
              style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconCssAdmin]}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitleAdmin}>{i18n.t('notificationsText')}</Text>
          </View>
          <View style={styles.filterTouchAdmin} />
        </View>

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.mainViewContainerNoti}>
            <View style={styles.profileNotificationMainView}>
              <View style={styles.labelTextCss}>
                <Text style={[{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0)},styles.listLableText]}>{i18n.t('pushNotificationText')}</Text>
              </View>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti, styles.manageMarginNoti]}>
                <Text style={styles.listViewTextNoti}>{i18n.t('newOrdersText')}</Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    size={16}
                    value={this.state.orderNewPush}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "orderNewPush",
                        value,
                        "push_notification",
                        "new_orders"
                      );
                    }}
                    testID="orderNewPushSwitch"
                    activeBGColor="#375280"
                  />
                </View>
              </View>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>{i18n.t('orderConfirmationText')}</Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    size={16}
                    value={this.state.orderConfirmationPush}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "orderConfirmationPush",
                        value,
                        "push_notification",
                        "order_confirmations"
                      );
                    }}
                    testID="orderConfirmationPushSwitch"
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('deliveryConfirmationText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    size={16}
                    testID="deliveryConfirmationPushSwitch"
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "deliveryConfirmationPush",
                        value,
                        "push_notification",
                        "delivery_confirmation"
                      );
                    }}
                    value={this.state.deliveryConfirmationPush}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('reviewsFeedbackText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="reviewsFeedbackPushSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "reviewsFeedbackPush",
                        value,
                        "push_notification",
                        "reviews_and_feedback_requests"
                      );
                    }}
                    value={this.state.reviewsFeedbackPush}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('refundPaymentCompleteText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="refundPaymentPushSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "refundPaymentPush",
                        value,
                        "push_notification",
                        "refund_or_payment_complete"
                      );
                    }}
                    value={this.state.refundPaymentPush}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('messageFromClientText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="messageClientPushSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "messageClientPush",
                        value,
                        "push_notification",
                        "messages_from_client"
                      );
                    }}
                    value={this.state.messageClientPush}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('productSourcingUpdatesText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="productSourcingPushSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "productSourcingPush",
                        value,
                        "push_notification",
                        "product_sourcing_updates"
                      );
                    }}
                    value={this.state.productSourcingPush}
                    activeBGColor="#375280"
                  />
                </View>
              </View>
            </View>

            <View style={styles.profileNotificationMainView}>
              <View style={styles.labelTextCss}>
                <Text style={[styles.listLableText,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0)}]}>{i18n.t('emailNotificationsText')}</Text>
              </View>
              <View style={[styles.listViewTouchNoti, styles.manageMarginNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.listViewTextNoti}>{i18n.t('orderInvoicesText')}</Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="orderInvoicesEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "orderInvoicesEmail",
                        value,
                        "email_notification",
                        "order_invoices"
                      );
                    }}
                    value={this.state.orderInvoicesEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>{i18n.t('orderConfirmationText')}</Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="orderConfirmationEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "orderConfirmationEmail",
                        value,
                        "email_notification",
                        "order_confirmations"
                      );
                    }}
                    value={this.state.orderConfirmationEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('deliveryConfirmationText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="deliveryConfirmationEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "deliveryConfirmationEmail",
                        value,
                        "email_notification",
                        "delivery_confirmation"
                      );
                    }}
                    value={this.state.deliveryConfirmationEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('reviewsFeedbackText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="reviewsFeedbackEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "reviewsFeedbackEmail",
                        value,
                        "email_notification",
                        "reviews_and_feedback_requests"
                      );
                    }}
                    value={this.state.reviewsFeedbackEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('refundPaymentCompleteText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="refundPaymentEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "refundPaymentEmail",
                        value,
                        "email_notification",
                        "refund_or_payment_complete"
                      );
                    }}
                    value={this.state.refundPaymentEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>
                {i18n.t('productStockUpdatesText')}
                </Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="productStockUpdateSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "productStockUpdate",
                        value,
                        "email_notification",
                        "product_stock_updates"
                      );
                    }}
                    value={this.state.productStockUpdate}
                    activeBGColor="#375280"
                  />
                </View>
              </View>

              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                <Text style={styles.listViewTextNoti}>{i18n.t('marketingEmailsText')}</Text>
                <View style={styles.switchView}>
                  <CustomSwitch
                    testID="marketingEmlEmailSwitch"
                    size={16}
                    onValueChange={(value) => {
                      this.notificationStatusUpdate(
                        "marketingEmlEmail",
                        value,
                        "email_notification",
                        "marketing_emails"
                      );
                    }}
                    value={this.state.marketingEmlEmail}
                    activeBGColor="#375280"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainer: {
    flex: 0,
  },
  headerViewAdmin: {
    justifyContent: "space-between",
    alignContent: "center",
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  backTouchAdmin: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssAdmin: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleAdmin: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterTouchAdmin: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  mainViewContainerNoti: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 3) / 100,
  },
  profileNotificationMainView: {
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
  },
  listViewTouchNoti: {
    height: (windowHeight * 7) / 100,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    alignItems: "center",
    paddingLeft: (windowWidth * 3) / 100,
  },
  listViewTextNoti: {
    fontSize: (windowWidth * 4) / 100,
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    marginLeft: (windowWidth * 1) / 100,
  },
  listLableText: {
    fontSize: (windowWidth * 4.5) / 100,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  manageMarginNoti: {
    marginTop: (windowWidth * 2) / 100,
  },
  labelTextCss: {
    marginTop: (windowWidth * 4) / 100,
    paddingLeft: (windowWidth * 3) / 100,
  },
  switchView: {
    position: "absolute",
    right: (windowWidth * 3) / 100,
  },
});
// Customizable Area End
