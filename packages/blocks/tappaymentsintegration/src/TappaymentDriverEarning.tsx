import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  FlatList,
  ListRenderItemInfo,
  Modal
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Logo, notification, refreshIcon,downArrow,bank,customerService,crossIcon } from "./assets";
import TappaymentDriverEarningController, {
    Props,
  } from "./TappaymentDriverEarningController";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlatlistArabicManage from '../../../components/src/FlatlistArabicManage'
import { EarningProps } from "./types/types";
import CalendarPicker from "react-native-calendar-picker"
import CustomLoader from "../../../components/src/CustomLoader";
import PriceConvertValueNumber from "../../../components/src/PriceConvertValueNumber";
// Customizable Area End

export default class TappaymentDriverEarning extends TappaymentDriverEarningController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getEarningList = (item: ListRenderItemInfo<EarningProps>) => {
    let value = item.item;
    return (
      <TouchableOpacity
        testID="btn_selected_earning_filter"
        style={[
          {
            backgroundColor:
              this.state.categorySelectStatus == value.earningName
                ? "#CCBEB1"
                : "#F4F4F4",
          },
          styles.categoryFlatTouchSubCate,
        ]}
        onPress={() => {
          this.selectStatus(value);
        }}
      >
        <Text
          style={[
            {
              color:
                this.state.categorySelectStatus == value.earningName
                  ? "#ffffff"
                  : "#375280",
            },
            styles.fontSetup,
          ]}
        >
          {value.showEarning}
        </Text>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainSafeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.manageWidth}>
          <View style={[styles.mainHeaderView,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <View>
              <Image
                resizeMode="contain"
                source={Logo}
                style={styles.mainLogo}
              />
            </View>
            <View style={styles.notificationMainView}>

                <TouchableOpacity testID="refreshDriverEarning" style={styles.refreshTouch} onPress={()=>{this.getDriverEarning()}}>
                    <Image
                    resizeMode="contain"
                    source={refreshIcon}
                    style={styles.refreshIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.notificationTouch}>
                    <Image
                    resizeMode="contain"
                    source={notification}
                    style={styles.notificationIcon}
                    />
                </TouchableOpacity>
            </View>
          </View>

            <View style={styles.mainCateSubCateView}>
                <View style={styles.categoryButtonFlatView}>
                <FlatList
                    testID={"earning_data_show"}
                    horizontal={true}
                    bounces={false}
                    data={this.state.filterArr}
                    showsHorizontalScrollIndicator={false}
                    inverted={FlatlistArabicManage(i18n.language)}
                    contentContainerStyle={styles.flatContainer}
                    ItemSeparatorComponent={() => (
                    <View style={styles.itemSeprator} />
                    )}
                    renderItem={(item) => this.getEarningList(item)}
                    keyExtractor={(item, index) => item.earningName}
                />
                </View>
            </View>

            <View style={styles.dateMainView}>
                <TouchableOpacity testID="btnCalendarOpenEarning" style={styles.dateTextView} onPress={()=>{this.calendarEarningOpen()}}>
                    <Text style={styles.dateText}>{this.state.dateShowTitleManage}</Text>
                    <Image resizeMode="contain" source={downArrow} style={styles.downIconCss}></Image>
                </TouchableOpacity>
            </View>

            <View style={styles.marginManage}>
                <Text style={[styles.weeklyText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.earningDataManageT}</Text>
                <Text style={[styles.priceText,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValueNumber(this.state.earningData.total_earning,this.state.localLanguage)}</Text>
            </View>

            <View style={[styles.loginTimeMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.loginTimeText}>{i18n.t('loginTimeText')}</Text>
                <Text style={styles.loginTimeText}>{this.state.earningData.login_time}</Text>
            </View>

            <View style={[styles.deliveryMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.loginTimeText}>{i18n.t('deliveriesText')}</Text>
                <Text style={styles.loginTimeText}>{this.state.earningData.deliveries}</Text>
            </View>

            <TouchableOpacity testID="btnSeeDetails" style={styles.btnCancelBackButtonAdd} onPress={()=>{this.btnRedirectSeeDetail()}}>
                <Text style={styles.cancelBackButtonTextAdd}>{i18n.t('seeDetailsText')}</Text>
            </TouchableOpacity>

            <TouchableOpacity testID="btnPaymentMethodRedirect" style={[styles.paymentTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectPaymentMethod()}}>
                <Image source={bank} resizeMode="contain" style={styles.linkingIconCss}></Image>
                <Text style={[styles.paymentText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('paymentMethodsText')}</Text>
            </TouchableOpacity>

            <View style={styles.borderMainView}></View>

            <TouchableOpacity testID="btnHelpSupportRedirect" style={[styles.helpTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectHelpSupport()}}>
                <Image source={customerService} resizeMode="contain" style={styles.linkingIconCss}></Image>
                <Text style={[styles.paymentText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('helpSupportText')}</Text>
            </TouchableOpacity>
        </View>

            <Modal
                testID="btnCalendarModal"
                animationType="slide"
                transparent={true}
                visible={this.state.calendarModalEarning}>

                <View style={styles.modalMainView}>
                    <SafeAreaView style={styles.modalSafeArea} />

                    <View style={styles.modalButtonMainView}>
                        <TouchableOpacity testID="btnCalendarCloseEarning" style={styles.calendarTouch} onPress={()=>{this.calendarEarningClose()}}>
                            <Image source={crossIcon} style={styles.backIconCss}></Image>
                        </TouchableOpacity>
                        <View style={styles.calendarMarginManage}>
                            {
                                this.state.categorySelectStatus === 'Daily' ?
                                <CalendarPicker 
                                // @ts-expect-error component has wrong type support
                                testID="calendarTestWorkEarning"
                                onDateChange={this.onDateChangeDailyEarning} 
                                maxDate={new Date()}
                                previousTitle={i18n.t('previousText')}
                                nextTitle={i18n.t('next')}
                                months ={[i18n.t('janShortText'), i18n.t('febShortText'), i18n.t('marShortText'), i18n.t('aprShortText'), i18n.t('mayText'), i18n.t('juneShortText'), i18n.t('julyShortText'),i18n.t('augShortText'), i18n.t('sepShortText'), i18n.t('octShortText'), i18n.t('novShortText'), i18n.t('decShortText')]}
                                weekdays={[i18n.t('monShortText'), i18n.t('tueShortText'), i18n.t('wedShortText'), i18n.t('thuShortText'), i18n.t('friShortText'), i18n.t('satShortText'), i18n.t('sunShortText')]}
                                textStyle={styles.calendarTodayColor}
                                todayTextStyle={styles.calendarTodayColor}
                                />
                                :
                                <CalendarPicker 
                                // @ts-expect-error component has wrong type support
                                testID="calendarTestWorkRangeEarning"
                                onDateChange={this.onDateChangeEarning} 
                                maxDate={new Date()}
                                allowRangeSelection
                                minRangeDuration={1}
                                textStyle={styles.calendarTodayColor}
                                todayTextStyle={styles.calendarTodayColor}
                                months ={[i18n.t('janShortText'), i18n.t('febShortText'), i18n.t('marShortText'), i18n.t('aprShortText'), i18n.t('mayText'), i18n.t('juneShortText'), i18n.t('julyShortText'),i18n.t('augShortText'), i18n.t('sepShortText'), i18n.t('octShortText'), i18n.t('novShortText'), i18n.t('decShortText')]}
                                weekdays={[i18n.t('monShortText'), i18n.t('tueShortText'), i18n.t('wedShortText'), i18n.t('thuShortText'), i18n.t('friShortText'), i18n.t('satShortText'), i18n.t('sunShortText')]}
                                previousTitle={i18n.t('previousText')}
                                nextTitle={i18n.t('next')}
                                maxRangeDuration={this.state.maxDateRangeNumber}
                                selectedRangeStartStyle={styles.calendarStart}
                                selectedRangeStartTextStyle={styles.calendarStartText}
                                selectedRangeEndStyle={styles.calendarStart}
                                selectedRangeEndTextStyle={styles.calendarStartText}
                                />
                            }
                        </View>
                    </View>
                </View>
            </Modal>
       
    </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainSafeContainer: {
    backgroundColor: "#FFFFFF",
  },
  notificationIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize:windowWidth*4.2/100,
    textAlign:'center'
  },
  manageWidth: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  mainHeaderView: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainLogo: {
    width: (windowWidth * 18) / 100,
    height: (windowHeight * 5) / 100,
  },
  notificationMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: (windowWidth * 15) / 100,
    alignItems: "center",
    alignSelf:'center'
  },
  notificationTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 5) / 100,
  },
  container: {
    backgroundColor: "#FFFFFF",
  },
  refreshIcon: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  refreshTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  mainCateSubCateView: {
    backgroundColor: "#F4F4F4",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    width: (windowWidth * 90) / 100,
    borderRadius: 3,
    justifyContent: "center",
  },
  categoryButtonFlatView: {
    justifyContent: "center",
    width: (windowWidth * 85) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  categoryFlatTouchSubCate: {
    borderRadius: 3,
    padding: 7,
    width:windowWidth*27/100,
  },
  itemSeprator: {
    width: (windowWidth * 2) / 100,
  },
  btnCancelBackButtonAdd:{
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1,
    marginTop:windowWidth*8/100
  },
  cancelBackButtonTextAdd:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4.5/100,
  },
  linkingIconCss:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  flatContainer:{
    flex: 1,
    paddingRight: (windowWidth * 28) / 100,
  },
  dateMainView:{
    marginTop:windowWidth*5/100,
    width:windowWidth*90/100,
    alignItems:'center'
  },
  dateTextView:{
    flexDirection:'row',
    alignItems:'center'
  },
  dateText:{
    fontFamily:'Lato-Regular',
    fontWeight:'600',
    fontSize:windowWidth*4/100,
    color:'#375280'
  },
  marginManage:{
    marginTop:windowWidth*7/100
  },
  weeklyText:{
    fontSize:windowWidth*6/100,
    color:'#375280',
    fontFamily:'Lato-Black'
  },
  priceText:{
    fontSize:windowWidth*9/100,
    color:'#375280',
    fontFamily:'Lato-Black',
    marginTop:windowWidth*2/100
  },
  loginTimeMainView:{
    justifyContent:'space-between',
    marginTop:windowWidth*7/100
  },
  loginTimeText:{
    fontFamily:'Lato-Regular',
    fontWeight:'600',
    fontSize:windowWidth*4/100,
    color:'#375280'
  },
  deliveryMainView:{
    justifyContent:'space-between',
    marginTop:windowWidth*7/100
  },
  paymentTouch:{
    marginTop:windowWidth*7/100,
    alignItems:'center'
  },
  paymentText:{
    fontFamily:'Lato-Bold',
    color:'#375280',
    fontSize:windowWidth*4/100
  },
  borderMainView:{
    borderWidth:0.6,
    borderColor:'#CCBEB1',
    marginTop:windowWidth*6/100
  },
  helpTouch:{
    marginTop:windowWidth*6/100,
    alignItems:'center'
  },
  backIconCss:{
    width:windowWidth*4/100,
    height:windowWidth*4/100
  },
  downIconCss:{
    width:windowWidth*3.5/100,
    height:windowWidth*3.5/100,
    marginLeft:windowWidth*1/100
  },
  modalMainView:{
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    },
    modalSafeArea:{
        flex: 0, 
        backgroundColor: "#00000080"
    },
    modalButtonMainView:{
        height: (windowHeight * 45) / 100,
        width: (windowWidth * 97) / 100,
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderRadius: 5, 
        padding: (windowWidth * 7) / 100,
        justifyContent: "space-between",
    },
    widthManage:{
        width:windowWidth*27/100
    },
    statsViewManage:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:windowWidth*5/100
    },
    marginManageTop:{
        marginTop:windowWidth*10/100
    },
    calendarStart:{
        backgroundColor:'#CCBEB1'
    },
    calendarStartText:{
        color:'#FFFFFF'
    },
    calendarTouch:{
        right:10,
        position:'absolute',
        marginTop:windowWidth*3/100
    },
    calendarMarginManage:{
        marginTop:windowWidth*4/100
    },
    calendarTodayColor:{
      color:'#375280'
    }
});
// Customizable Area End
