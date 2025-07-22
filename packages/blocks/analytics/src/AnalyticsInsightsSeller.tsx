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
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
import { backIcon,rightArrow } from "./assets";

import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'

import AnalyticsInsightsSellerController, { Props } from "./AnalyticsInsightsSellerController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

export default class AnalyticsInsightsSeller extends AnalyticsInsightsSellerController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerSeller}>
            <SafeAreaView style={styles.safeContainerBank}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerSellerViewAnalytics,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewAnIn,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackAnalyticInsights" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAnIn,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAnIn}>{i18n.t('analyticsInsightsText')}</Text>
                </View>
                <View style={styles.filterExtraTouchAnIn}>
                </View>
              </View>
            </View>

            <ScrollView bounces={false} style={styles.containerSellerViewAnalytics} showsVerticalScrollIndicator={false}>

                <View style={styles.sellerAnalyticsInMainView}>
                    
                    <View style={styles.manageMainAlgin}>
                        <Text numberOfLines={1} style={styles.totalAmountText}>{PriceConvertValue(Number(this.state.totalRevenue).toLocaleString(undefined,{minimumFractionDigits: 2,maximumFractionDigits: 2 }),this.state.getCurrency)}</Text>
                        <Text style={styles.totalRevenueText}>{i18n.t('totalRevenue')}</Text>
                    </View>

                    <View style={styles.borderViewFirst}></View>

                    <TouchableOpacity testID="btnSalesRevenueReport" style={[styles.reportLableTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectSalesRevenue()}}>
                        <Text style={styles.reportlableText}>{i18n.t('salesRevenueReportText')}</Text>
                        <Image resizeMode="contain" source={rightArrow} style={[styles.reportLableIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>

                    <View style={styles.borderView}></View>

                    {
                        this.state.roleType !== 'Stylist' &&
                        <>
                            <TouchableOpacity testID="btnSalesVolumeStore" style={[styles.reportLableTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnSalesVolumeStore('store')}}>
                                <Text style={styles.reportlableText}>{i18n.t('salesVolumeReportStoreText')}</Text>
                                <Image resizeMode="contain" source={rightArrow} style={[styles.reportLableIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                            </TouchableOpacity>
                            <View style={styles.borderView}></View>
                        </>
                    }

                    <TouchableOpacity testID="btnSalesProduct" style={[styles.reportLableTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnSalesVolumeStore('product')}}>
                        <Text style={styles.reportlableText}>{i18n.t('salesVolumeReportProductText')}</Text>
                        <Image resizeMode="contain" source={rightArrow} style={[styles.reportLableIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>

                    <View style={styles.borderView}></View>

                    <TouchableOpacity testID="btnGrowth" style={[styles.reportLableTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectSalesGrowthReport()}}>
                        <Text style={styles.reportlableText}>{i18n.t('salesGrowthReportText')}</Text>
                        <Image resizeMode="contain" source={rightArrow} style={[styles.reportLableIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>
      //Merge Engine End DefaultContainerSeller
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerSeller: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerBank:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerSellerViewAnalytics:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewAnIn:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchAddBankDriver:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssAnIn:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAnIn:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchAnIn:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    scrollPaddingManage:{
        paddingBottom:150
    },
    sellerAnalyticsInMainView: {
        marginTop: (windowWidth * 12) / 100,
        width: (windowWidth * 90) / 100,
        justifyContent: "center",
    },
    marginManage:{
        marginTop:windowWidth*7/100
    },
    manageMainAlgin:{
        alignSelf:'center'
    },
    totalAmountText:{
        fontFamily:'Lato-Bold',
        fontWeight:'800',
        fontSize:windowWidth*9/100,
        color:'#059669',
        textAlign:'center'
    },
    totalRevenueText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.8/100,
        color:'#375280',
        textAlign:'center',
        marginTop:windowWidth*2/100
    },
    borderViewFirst:{
        borderTopWidth:0.8,
        borderTopColor:'#E3E4E5',
        marginTop:windowWidth*10/100
    },
    borderView:{
        borderTopWidth:0.8,
        borderTopColor:'#E3E4E5',
        marginTop:windowWidth*5/100
    },
    reportLableTouch:{
        marginTop:windowWidth*5/100,
        justifyContent:'space-between'
    },
    reportlableText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.2/100,
        color:'#375280'
    },
    reportLableIcon:{
        width:windowWidth*5/100,
        height:windowWidth*5/100,
        marginTop:windowWidth*0.4/100
    }
});
