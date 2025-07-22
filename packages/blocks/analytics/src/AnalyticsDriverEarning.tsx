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
  FlatList,
  ListRenderItemInfo,
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,downArrow,crossIcon } from "./assets";

import AnalyticsDriverEarningController, { Props,EarningProps } from "./AnalyticsDriverEarningController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import CalendarPicker from "react-native-calendar-picker";
import { BarChart } from "react-native-gifted-charts";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlatlistArabicManage from '../../../components/src/FlatlistArabicManage'
import PriceConvertValueNumber from "../../../components/src/PriceConvertValueNumber";
// Customizable Area End

export default class AnalyticsDriverEarning extends AnalyticsDriverEarningController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getEarningList = (item: ListRenderItemInfo<EarningProps>) => {
        let value = item.item;
        return (
        <TouchableOpacity
            testID="btn_selected_earning"
            style={[
            {
                backgroundColor:
                this.state.filterSelectStatus === value.earningName
                    ? "#CCBEB1"
                    : "#F4F4F4",
            },
            styles.categoryFlatTouchSubCate,
            ]}
            onPress={() => {
            this.selectStatus(value);
            }}>
            <Text
            style={[
                {
                color:
                    this.state.filterSelectStatus === value.earningName
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
        <View style={styles.containerDriver}>
            <SafeAreaView style={styles.safeContainerBank}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerDriverViewAddBank,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewAddBankDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackEarningAnyt" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddBankDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddBankDriver}>{i18n.t('earningAnalyticsText')}</Text>
                </View>
                <View style={styles.filterExtraTouchBank}>
                </View>
              </View>
            </View>

                <ScrollView bounces={false} style={styles.containerDriverViewAddBank} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainCateSubCateView}>
                        <View style={styles.categoryButtonFlatView}>
                        <FlatList
                            testID={"earning_data_show"}
                            horizontal={true}
                            bounces={false}
                            data={this.state.filterArr}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatContainer}
                            ItemSeparatorComponent={() => (
                            <View style={styles.itemSeprator} />
                            )}
                            inverted={FlatlistArabicManage(i18n.language)}
                            renderItem={(item) => this.getEarningList(item)}
                            keyExtractor={(item, index) => item.earningName}
                        />
                        </View>
                    </View>

                    <View style={styles.dateMainView}>
                        <TouchableOpacity testID="btnCalendarOpen" style={styles.dateTextView} onPress={()=>{this.calendarOpen()}}>
                            <Text style={styles.dateText}>{this.state.dateShowManage}</Text>
                            <Image resizeMode="contain" source={downArrow} style={styles.downIconCss}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.marginManage}>
                        <Text style={[styles.weeklyText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.earningDataManage}</Text>
                        <Text style={[styles.priceText,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValueNumber(this.state.earningAnalyticsData.total_earning,this.state.currencyUpdate)}</Text>
                    </View>

                    <View style={styles.marginManageTop}>
                        <BarChart 
                        data = {this.state.chartFilterData} 
                        width={windowWidth*90/100}
                        hideYAxisText
                        yAxisColor={'#FFFFFF'}
                        frontColor="#CCBEB1"
                        xAxisColor={'#D5D5D5'}
                        xAxisLabelTextStyle={styles.chartXLable}
                        isAnimated
                        />
                    </View>


                    <View style={styles.containerDriverViewAddBank}>
                        <Text style={[styles.weeklyText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('statsText')}</Text>
                        <View style={[styles.statsViewManage,{flexDirection:FlexConditionManage(i18n.language)}]}>    
                            <View>
                                <Text style={styles.loginTimeText}>{i18n.t('loginTimeText')}</Text>
                                <Text style={[styles.loginTimeTextSecond,{textAlign: TextAlignManage(i18n.language)}]}>{this.state.earningAnalyticsData.login_time}</Text>
                            </View>

                            <View>
                                <Text style={styles.loginTimeText}>{i18n.t('deliveriesText')}</Text>
                                <Text style={[styles.loginTimeTextSecond,{textAlign: TextAlignManage(i18n.language)}]}>{this.state.earningAnalyticsData.deliveries}</Text>
                            </View>
                        </View>

                        <TouchableOpacity testID="btnSeeEarningActiv" style={styles.btnCancelBackButtonAdd} onPress={()=>{this.btnSeeEarningActivity()}}>
                            <Text style={styles.cancelBackButtonTextAdd}>{i18n.t('seeEarningsActivityText')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    testID="btnCalendarModal"
                    animationType="slide"
                    transparent={true}
                    visible={this.state.calendarModal}>

                    <View style={styles.modalMainView}>
                        <SafeAreaView style={styles.modalSafeArea} />

                        <View style={styles.modalButtonMainView}>
                            <TouchableOpacity testID="btnCalendarClose" style={styles.calendarTouch} onPress={()=>{this.calendarClose()}}>
                                <Image source={crossIcon} style={styles.backIconCss}></Image>
                            </TouchableOpacity>
                            <View style={{marginTop:windowWidth*4/100}}>
                                {
                                    this.state.filterSelectStatus === 'Daily' ?
                                    <CalendarPicker 
                                    // @ts-expect-error component has wrong type support
                                    testID="calendarTestWork"
                                    textStyle={styles.themeColor}
                                    todayTextStyle={styles.themeColor}
                                    onDateChange={this.onDateChangeDaily} 
                                    maxDate={new Date()}
                                    previousTitle={i18n.t('previousText')}
                                    nextTitle={i18n.t('next')}
                                    months ={[i18n.t('janShortText'), i18n.t('febShortText'), i18n.t('marShortText'), i18n.t('aprShortText'), i18n.t('mayText'), i18n.t('juneShortText'), i18n.t('julyShortText'),i18n.t('augShortText'), i18n.t('sepShortText'), i18n.t('octShortText'), i18n.t('novShortText'), i18n.t('decShortText')]}
                                    weekdays={[i18n.t('monShortText'), i18n.t('tueShortText'), i18n.t('wedShortText'), i18n.t('thuShortText'), i18n.t('friShortText'), i18n.t('satShortText'), i18n.t('sunShortText')]}
                                    />
                                    :
                                    <CalendarPicker 
                                    // @ts-expect-error component has wrong type support
                                    testID="calendarTestWorkRange"
                                    onDateChange={this.onDateChange} 
                                    textStyle={styles.themeColor}
                                    todayTextStyle={styles.themeColor}
                                    maxDate={new Date()}
                                    allowRangeSelection
                                    minRangeDuration={1}
                                    maxRangeDuration={this.state.maxDateRangeNumber}
                                    selectedRangeStartStyle={styles.calendarStart}
                                    selectedRangeStartTextStyle={styles.calendarStartText}
                                    selectedRangeEndStyle={styles.calendarStart}
                                    selectedRangeEndTextStyle={styles.calendarStartText}
                                    months ={[i18n.t('janShortText'), i18n.t('febShortText'), i18n.t('marShortText'), i18n.t('aprShortText'), i18n.t('mayText'), i18n.t('juneShortText'), i18n.t('julyShortText'),i18n.t('augShortText'), i18n.t('sepShortText'), i18n.t('octShortText'), i18n.t('novShortText'), i18n.t('decShortText')]}
                                    weekdays={[i18n.t('monShortText'), i18n.t('tueShortText'), i18n.t('wedShortText'), i18n.t('thuShortText'), i18n.t('friShortText'), i18n.t('satShortText'), i18n.t('sunShortText')]}
                                    previousTitle={i18n.t('previousText')}
                                    nextTitle={i18n.t('next')}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </Modal>

        </View>
      //Merge Engine End DefaultContainerDriver
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerDriver: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerBank:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerDriverViewAddBank:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewAddBankDriver:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchAddBankDriver:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssAddBankDriver:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAddBankDriver:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchBank:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    scrollPaddingManage:{
        paddingBottom:150
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
        fontFamily:'Lato-Bold',
        textAlign:'center',
        fontSize:windowWidth*4.5/100
    },
    flatContainer:{
        flex: 1,
        paddingRight: (windowWidth * 28) / 100,
    },
    dateMainView:{
        marginTop:windowWidth*5/100,
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    dateTextView:{
        flexDirection:'row',
        justifyContent:'center',
    },
    dateText:{
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*4/100,
        color:'#375280',
        textAlign:'center'
    },
    marginManage:{
        marginTop:windowWidth*7/100
    },
    weeklyText:{
        fontSize:windowWidth*6/100,
        color:'#375280',
        fontFamily:'Lato-Black'
    },
    loginTimeTextSecond:{
        fontSize:windowWidth*6/100,
        color:'#375280',
        fontFamily:'Lato-Black',
    },
    priceText:{
        fontSize:windowWidth*9/100,
        color:'#375280',
        fontFamily:'Lato-Black',
        marginTop:windowWidth*2/100
    },
    loginTimeText:{
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*4.2/100,
        color:'#375280'
    },
    backIconCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
    },
    rightIconCss:{
        width:windowWidth*5/100,
        height:windowWidth*5/100,
        position:'absolute',
        right:10,
    },
    downIconCss:{
        width:windowWidth*3.5/100,
        height:windowWidth*3.5/100,
        marginLeft:windowWidth*1/100,
        marginTop:windowWidth*0.8/100
    },
    fontSetup: {
        fontFamily: "Lato-Regular",
        fontWeight: "500",
        fontSize:windowWidth*4.2/100,
        textAlign:'center'
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
        justifyContent:'space-between',
        marginTop:windowWidth*5/100
    },
    marginManageTop:{
        marginTop:windowWidth*10/100
    },
    calendarTouch:{
        right:10,
        position:'absolute',
        marginTop:windowWidth*3/100
    },
    chartXLable:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100
    },
    calendarStart:{
        backgroundColor:'#CCBEB1'
    },
    calendarStartText:{
        color:'#FFFFFF'
    },
    themeColor:{
        color:'#375280'
    }
});
