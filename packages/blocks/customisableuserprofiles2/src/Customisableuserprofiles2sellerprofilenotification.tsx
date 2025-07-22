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
  Switch
} from "react-native";

import { backIcon } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Customisableuserprofiles2sellerprofilenotificationController, {
  Props
} from "./Customisableuserprofiles2sellerprofilenotificationController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
import CustomSwitch from "../../../components/src/CustomSwitch";
// Customizable Area End

export default class Customisableuserprofiles2sellerprofilenotification extends Customisableuserprofiles2sellerprofilenotificationController {
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
        {this.state.loading && <CustomLoader/>}
            <SafeAreaView style={styles.safeViewFlex}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[styles.headerViewSlNotification,globalStyle.headerMarginManage,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackPushNotification" style={styles.backTouchSlNotification} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={styles.backIconCssSlNotification}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleSlNotification}>{i18n.t('notificationsText')}</Text>
                </View>
                <View style={styles.filterTouchSlNotification}>
                </View>
            </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.mainViewContainerNoti}>
                    <View style={styles.profileNotificationMainView}>
                        <View style={styles.labelTextCss}>
                            <Text style={[styles.listLableText,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0)}]}>{i18n.t('pushNotificationText')}</Text>
                        </View>
                        <View style={[styles.listViewTouchNoti,styles.manageMarginNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('orderInvoicesText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="orderInvoicePushSwitch"
                                    size={16}
                                    activeBGColor="#375280"
                                    onValueChange={(value) => {this.notificationStatusUpdate('orderInvoicesPush',value,'push_notification','order_invoices')}}
                                    value={this.state.orderInvoicesPush}
                                />
                            </View>
                        </View>
                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('orderConfirmationText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="orderConfirmationPushSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('orderConfirmationPush',value,'push_notification','order_confirmations')}}
                                    value={this.state.orderConfirmationPush}
                                    size={16}
                                    activeBGColor="#375280"
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('deliveryConfirmationText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="deliveryConfirmationPushSwitch"
                                    size={16}
                                    activeBGColor="#375280"
                                    onValueChange={(value) => {this.notificationStatusUpdate('deliveryConfirmationPush',value,'push_notification','delivery_confirmation')}}
                                    value={this.state.deliveryConfirmationPush}
                                />
                            </View>
                        </View>

                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('reviewsFeedbackText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    size={16}
                                    activeBGColor="#375280"
                                    testID="reviewsFeedbackPushSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('reviewsFeedbackPush',value,'push_notification','reviews_and_feedback_requests')}}
                                    value={this.state.reviewsFeedbackPush}
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('refundPaymentCompleteText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="refundPaymentPushSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('refundPaymentPush',value,'push_notification','refund_or_payment_complete')}}
                                    size={16}
                                    activeBGColor="#375280"
                                    value={this.state.refundPaymentPush}
                                />
                            </View>
                        </View>

                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('marketingEmailsText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="marketEmailsPushSwitch"
                                    activeBGColor="#375280"
                                    size={16}
                                    onValueChange={(value) => {this.notificationStatusUpdate('marketingEmailsPush',value,'push_notification','marketing_emails')}}
                                    value={this.state.marketingEmailsPush}
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('productStockUpdatesText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    activeBGColor="#375280"
                                    size={16}
                                    testID="productStockPushSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('productStockPush',value,'push_notification','product_stock_updates')}}
                                    value={this.state.productStockPush}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.profileNotificationMainView}>
                        <View style={styles.labelTextCss}>
                            <Text style={[{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0)},styles.listLableText]}>{i18n.t('emailNotificationsText')}</Text>
                        </View>
                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti,styles.manageMarginNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('orderInvoicesText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="orderInvoiceEmailSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('orderInvoicesEmail',value,'email_notification','order_invoices')}}
                                    value={this.state.orderInvoicesEmail}
                                    activeBGColor="#375280"
                                    size={16}
                                />
                            </View>
                        </View>

                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('orderConfirmationText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="orderConfirmationEmailSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('orderConfirmationEmail',value,'email_notification','order_confirmations')}}
                                    value={this.state.orderConfirmationEmail}
                                    size={16}
                                    activeBGColor="#375280"
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('deliveryConfirmationText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="deliveryConfirmationEmailSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('deliveryConfirmationEmail',value,'email_notification','delivery_confirmation')}}
                                    activeBGColor="#375280"
                                    size={16}
                                    value={this.state.deliveryConfirmationEmail}
                                />
                            </View>
                        </View>

                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('reviewsFeedbackText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="reviewsFeedbackEmailSwitch"
                                    activeBGColor="#375280"
                                    size={16}
                                    onValueChange={(value) => {this.notificationStatusUpdate('reviewsFeedbackEmail',value,'email_notification','reviews_and_feedback_requests')}}
                                    value={this.state.reviewsFeedbackEmail}
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('refundPaymentCompleteText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="refundPaymentEmailSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('refundPaymentEmail',value,'email_notification','refund_or_payment_complete')}}
                                    value={this.state.refundPaymentEmail}
                                    activeBGColor="#375280"
                                    size={16}
                                />
                            </View>
                        </View>

                        <View style={[styles.listViewTouchNoti,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('marketingEmailsText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="marketingEmailsEmailSwitch"
                                    onValueChange={(value) => {this.notificationStatusUpdate('marketingEmailsEmail',value,'email_notification','marketing_emails')}}
                                    activeBGColor="#375280"
                                    size={16}
                                    value={this.state.marketingEmailsEmail}
                                />
                            </View>
                        </View>

                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.listViewTouchNoti]}>
                            <Text style={styles.listViewTextNoti}>{i18n.t('productStockUpdatesText')}</Text>
                            <View style={styles.switchView}>
                                <CustomSwitch
                                    testID="productStockEmailSwitch"
                                    activeBGColor="#375280"
                                    size={16}
                                    onValueChange={(value) => {this.notificationStatusUpdate('productStockEmail',value,'email_notification','product_stock_updates')}}
                                    value={this.state.productStockEmail}
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
        flex:1,
        backgroundColor:'#ffffff'
    },
    headerViewSlNotification:{
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    backTouchSlNotification:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssSlNotification:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleSlNotification:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterTouchSlNotification:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    mainViewContainerNoti:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
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
    listViewTouchNoti:{
        height:windowHeight*7/100,
        borderBottomWidth:1,
        borderBottomColor:'#E2E8F0',
        alignItems:'center',
        paddingLeft:windowWidth*3/100
    },
    listViewTextNoti:{
        fontSize:windowWidth*4/100,
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        marginLeft:windowWidth*1/100
    },
    listLableText:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold'
    },
    manageMarginNoti:{
        marginTop:windowWidth*2/100
    },
    labelTextCss:{
        marginTop:windowWidth*4/100,
        paddingLeft:windowWidth*3/100
    },
    switchView:{
        position:'absolute',
        right:windowWidth*3/100
    },
    safeViewFlex:{
        flex:0
    }
});
// Customizable Area End
