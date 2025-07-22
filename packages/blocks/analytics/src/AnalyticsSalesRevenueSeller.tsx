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
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,activeStatus,rightArrow, download,unSelectIcon, pdfIcon, docIcon, jpgIcon } from "./assets";

import AnalyticsSalesRevenueSellerController, { Props } from "./AnalyticsSalesRevenueSellerController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import { BarChart } from "react-native-gifted-charts";
import ImageNotFound from "../../../components/src/ImageNotFound";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import { Dropdown } from "react-native-element-dropdown";

  const lineData2 = [
    {value: 1000,label:'Apr',frontColor:'rgba(55, 82, 128, 0.15)',},
    {value: 2000,label:'May',frontColor:'rgba(55, 82, 128, 0.15)'},
    {value: 1800,label:'June',frontColor:'rgba(55, 82, 128, 0.15)'},
    {value: 4000,label:'July',frontColor:'rgba(55, 82, 128, 1)'},
    {value: 3600,label:'Aug',frontColor:'rgba(55, 82, 128, 0.15)'},
    {value: 5000,label:'Sep',frontColor:'rgba(55, 82, 128, 0.15)'},
  ];
// Customizable Area End

export default class AnalyticsSalesRevenueSeller extends AnalyticsSalesRevenueSellerController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
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
                <TouchableOpacity testID="btnBackSalesRevenue" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddBankDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddBankDriver}>{i18n.t('salesRevenueText')}</Text>
                </View>
                <View style={styles.filterExtraTouchBank}>
                    {
                        this.state.chartFilterData.length > 0 &&
                        <TouchableOpacity testID="btnDownloadModal" onPress={()=>{this.downloadModalOpen()}}>
                            <Image resizeMode="contain" source={download} style={styles.filterExtraTouchBank}></Image>
                        </TouchableOpacity>
                    }
                </View>
              </View>
            </View>

                <ScrollView bounces={false} style={styles.containerDriverViewAddBank} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContain}>

                    {
                        this.state.roleTypeManage != 'Stylist' &&
                        <View style={styles.marginManage}>
                            <View style={[styles.storeMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <TouchableOpacity testID="btnStoreSales" style={[styles.storeReachTouch,{borderBottomWidth:this.state.analyticsType === 'store'? 2:0}]} onPress={()=>{this.activeAnalytics('store')}}>
                                    <Text style={[styles.storeReachText,{color:this.state.analyticsType === 'store' ?'#375280':'#94A3B8'}]}>{i18n.t('salesByStoreText')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity testID="btnProductSales" style={[styles.storeReachTouch,{borderBottomWidth:this.state.analyticsType === 'product'? 2:0}]} onPress={()=>{this.activeAnalytics('product')}}>
                                    <Text style={[styles.storeReachText,{color:this.state.analyticsType === 'product' ?'#375280':'#94A3B8'}]}>{i18n.t('salesByProductText')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                    

                    <View style={styles.mainCateSubCateView}>
                        <TouchableOpacity testID="btnRedirectStoreSelect" style={styles.allStoreMainView} onPress={()=>{this.btnRedirectSelectStore()}}>
                            <View style={[styles.allStoreView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text numberOfLines={1} style={[{textAlign:TextAlignManage(i18n.language)},styles.allStoreText]}>{this.state.storeProductText}</Text>
                                <Image source={rightArrow} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.rightArrowCss]}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.analyticsType != 'store' && this.state.salesRevenueAnalyticsData.name != undefined &&
                        <View style={[styles.productMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Image source={ImageNotFound(this.state.salesRevenueAnalyticsData.image_url)} style={styles.productImage}></Image>
                            <View style={[{marginRight:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginLeft:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                                <View style={{flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',width:windowWidth*75/100}}>
                                    <Text numberOfLines={1} style={[styles.productText,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*1/100)}]}>{this.state.salesRevenueAnalyticsData.name}</Text>
                                    <Text style={[styles.productAmountText,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValue(parseFloat(this.state.salesRevenueAnalyticsData.price).toFixed(0),this.state.currencyLocalGet)}</Text>
                                </View>
                                <View style={[styles.productSoldMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <View style={[styles.productSoldView,{marginRight:ManageDynamicMargin(i18n.language,3,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,3)}]}>
                                        <Text style={styles.productSoldText}>{this.state.salesRevenueAnalyticsData.sold_units} {i18n.t('soldUnit')}</Text>
                                    </View>
                                    <View style={[styles.productReturnView,{marginRight:ManageDynamicMargin(i18n.language,3,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,3)}]}>
                                        <Text style={styles.productReturnText}>{this.state.salesRevenueAnalyticsData.returned_units} {i18n.t('returnUnit')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }

                    <View style={styles.borderMainView}></View>
                    <View style={styles.marginManage}>
                        <View style={[styles.totalSaleMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <View style={styles.totalCardView}>
                                <Text style={styles.cardTitleText}>{this.state.firstCard}</Text>
                                <Text style={styles.cardSubtitleText}>{this.state.analyticsType === 'store' ?PriceConvertValue(parseFloat(this.state.salesRevenueAnalyticsData.average_order_value).toFixed(0),this.state.currencyLocalGet) : PriceConvertValue(parseFloat(this.state.salesRevenueAnalyticsData.average_unit_price).toFixed(0),this.state.currencyLocalGet)}</Text>
                            </View>
                            <View style={styles.totalCardView}>
                                <Text style={styles.cardTitleText}>{this.state.secondCard}</Text>
                                <Text style={styles.cardSubtitleText}>{this.state.salesRevenueAnalyticsData.sales_volume}</Text>
                            </View>
                        </View>
                        
                    </View>

                    {
                        this.state.chartFilterData.length > 0 &&
                        <View style={styles.marginManageTop}>
                            <View style={[styles.chartSaleRevenueView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <View style={styles.chartSalesRevMarginView}>
                                    <Text style={[styles.chartTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('salesRevenueText')}</Text>
                                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.chartAmountText]}>{PriceConvertValue(parseFloat(this.state.salesRevenueAnalyticsData.max_value).toFixed(0),this.state.currencyLocalGet)}</Text>
                                </View>
                                <View style={[styles.periodView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Text style={[styles.periodText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('periodText')}: </Text>
                                <Dropdown
                                    testID="avgTimeDropdownEdit"
                                    data={this.state.filterArrDropdown}
                                    placeholder="Select period"
                                    maxHeight={200}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.filterSelected}
                                    itemTextStyle={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) },styles.blueThemeColorEdit]}
                                    placeholderStyle={styles.dropdownPlaceholderEdit}
                                    selectedTextStyle={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) },styles.blueThemeColorEdit]}
                                    style={[styles.dropDownTextInputEdit,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}
                                    onChange={(item)=>{
                                        this.selectFilterUpdate(item.value)
                                        }}
                                    iconStyle={[styles.dropdownIconCssEdit,{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)}]}
                                    iconColor={'#475569'}
                                    />
                                </View>
                            </View>
                            <View style={styles.marginManage}>
                                <BarChart 
                                // @ts-expect-error component has wrong type support
                                testID = "barChartSalesRevenue"
                                data = {this.state.chartFilterData} 
                                width={windowWidth*82/100}
                                yAxisColor={'#FFFFFF'}
                                frontColor="rgba(55, 82, 128, 0.15)"
                                xAxisColor={'#FFFFFF'}
                                yAxisLabelWidth={windowWidth*17/100}
                                leftShiftForTooltip={20}
                                leftShiftForLastIndexTooltip={40}
                                yAxisTextStyle={styles.chartYLable}
                                rulesType="solid"
                                rulesColor={'rgba(255, 255, 255, 1)'}
                                xAxisLabelTextStyle={styles.chartXLable}
                                isAnimated
                                barWidth={30}
                                initialSpacing={10}
                                spacing={14}
                                barBorderRadius={2}
                                formatYLabel={(item)=>{
                                    let value= this.convertValue(item);
                                    return value
                                }}
                                height={windowHeight*30/100}
                                maxValue={parseInt(this.state.salesRevenueAnalyticsData.max_value)+5000}
                                onPress={this.barClick}
                                scrollToIndex={10}
                                // @ts-expect-error component has wrong type support
                                renderTooltip={(item, index) => {
                                    return (
                                    <View style={styles.chartTooltipView}>
                                        <Text style={styles.chartTooltipText}>{PriceConvertValue(parseFloat(item.value).toFixed(0),this.state.currencyLocalGet)}</Text>
                                    </View>
                        
                                    );
                                }}
                                />
                            </View>
                        </View>
                    }

                </ScrollView>

                <Modal
                animationType="slide"
                transparent={true}
                testID="filterModal"
                visible={this.state.downloadModal}>
                <View style={styles.modalMainViewDriver}>
                    <SafeAreaView style={styles.modalSafeDriver}></SafeAreaView>
                    <View style={styles.cameraModalMainViewDriverAdd}>
                        <View style={styles.logOutMainView}>
                            <View style={styles.logoutBorderView}></View>
                            <View style={styles.transModalView}>
                                <Text style={styles.transModalText}>{i18n.t('exportReportText')}</Text>
                            </View>
                            <View style={styles.filterStatusMainView}>
                               <TouchableOpacity testID="btnDownloadPdf" style={[styles.flatlistFlexManage,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('pdf')}}>
                                <View style={[styles.pdfMainViewModal,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Image resizeMode="contain" source={pdfIcon} style={styles.pdfDwonloadIconCss}></Image>
                                    <Text style={styles.modalFilterText}>{i18n.t('pdfText')}</Text>
                                </View>
                                    <Image source={this.state.donwloadSelectStatus === 'pdf' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderView}></View>
                               <TouchableOpacity testID="btnDownloadDoc" style={[styles.modalFilterView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('doc')}}>
                                    <View style={[styles.pdfMainViewModal,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <Image resizeMode="contain" source={docIcon} style={styles.pdfDwonloadIconCss}></Image>
                                        <Text style={styles.modalFilterText}>{i18n.t('docFileText')}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'doc' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderView}></View>
                               <TouchableOpacity testID="btnDownloadJpg" style={[styles.modalFilterView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('jpg')}}>
                                    <View style={[styles.pdfMainViewModal,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <Image resizeMode="contain" source={jpgIcon} style={styles.pdfDwonloadIconCss}></Image>
                                        <Text style={styles.modalFilterText}>{i18n.t('jpgText')}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'jpg' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                            </View>
                            <View style={[styles.confirmBtnMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <TouchableOpacity testID="btnCancelFilterModal" style={styles.filterBtnCancelTouch} onPress={()=>{this.downloadModalClose()}}>
                                    <Text style={styles.filterBtnCancelTouchText}>{i18n.t('cancelText')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity testID="btnConfirmFilterModal" style={styles.confirmTouchBtn} onPress={()=>{this.btnConfirmDownload()}}>
                                    <Text style={styles.confirmBtnTouchText}>{i18n.t('confirm')}</Text>
                                </TouchableOpacity>
                            </View>
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
        height: (windowHeight * 6.5) / 100,
        marginTop: (windowWidth * 7) / 100,
        width: (windowWidth * 90) / 100,
        borderRadius: 3,
        justifyContent: "center",
    },
    allStoreMainView:{
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
        padding:5,
        alignContent:'center'
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
    marginManage:{
        marginTop:windowWidth*6/100
    },
    backIconCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
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
    marginManageTop:{
        marginTop:windowWidth*1/100
    },
    chartYLable:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100,
    },
    chartXLable:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100,
    },
    themeColor:{
        color:'#375280'
    },
    allStoreView:{
        justifyContent:'space-between',
        padding:8
    },
    allStoreText:{
        width:windowWidth*75/100,
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4/100
    },
    storeMainView:{
        borderBottomColor:'#94A3B8',
        borderBottomWidth:0.5
    },
    storeReachTouch:{
        width:windowWidth*45/100,
        borderBottomColor:'#375280',
        justifyContent:'center',
        alignItems:'center',
        height:windowHeight*5/100
    },
    storeReachText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.8/100
    },
    totalSaleMainView:{
        justifyContent:'space-between'
    },
    totalCardView:{
        backgroundColor:'#F8F8F8',
        width:windowWidth*42/100,
        height:windowHeight*9/100,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center'
    },
    cardTitleText:{
        color:'#334155',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.8/100
    },
    cardSubtitleText:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*5.2/100,
        marginTop:windowWidth*1/100
    },
    chartTitleText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500'
    },
    chartAmountText:{
        color:'#059669',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.5/100,
        marginTop:windowWidth*3/100
    },
    chartActiveView:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    chartFirstAvtiveView:{
        width: windowWidth*5/100, 
        height: windowWidth*5/100, 
        backgroundColor: '#F59E0B', 
        borderRadius: 2
    },
    chartActiveText:{
        color:'#375280', 
        fontSize: windowWidth*3.8/100, 
        marginLeft:windowWidth*2/100,
        fontFamily:'Lato-Regular'
    },
    chartActiveSecondView:{
        width: windowWidth*5/100, 
        height: windowWidth*5/100, 
        backgroundColor: '#34D399', 
        borderRadius: 2,
        marginLeft:windowWidth*6/100
    },
    lineChartMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*4/100
    },
    lineChartAxisView:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100
    },
    barChartFirstAvtiveView:{
        width: windowWidth*5/100, 
        height: windowWidth*5/100, 
        backgroundColor: '#375280', 
        borderRadius: 2,
    },
    barChartSecondAvtiveView:{
        width: windowWidth*5/100, 
        height: windowWidth*5/100, 
        backgroundColor: '#F59E0B', 
        borderRadius: 2,
        marginLeft:windowWidth*6/100
    },
    modalMainViewDriver:{
        flex: 1, 
        backgroundColor: '#00000030', 
        alignItems: 'center'
      },
    cameraModalMainViewDriverAdd:{
        position: 'absolute', 
        bottom:0,
        width:windowWidth
    },
    modalSafeDriver:{
        flex:0
    },
    logOutMainView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*52/100
    },
    logoutBorderView:{
        borderWidth:2,
        borderColor:'#F2F3F5',
        width:windowWidth*20/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
    },
    transModalView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*4/100,
        marginTop:windowWidth*4/100
    },
    transModalText:{
        textAlign:'center',
        fontSize:windowWidth*5.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold'
    },
    filterStatusMainView:{
        marginTop:windowWidth*5/100,
        padding:5,
        alignSelf:'center',
        width:windowWidth*90/100
    },
    confirmBtnMainView:{
        width:windowWidth*90/100,
        justifyContent:'space-between',
        alignSelf:'center',
        marginTop:windowWidth*8/100
    },
    confirmTouchBtn:{
        width:windowWidth*42/100,
        backgroundColor:'#CCBEB1',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center'
    },
    confirmBtnTouchText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    filterBtnCancelTouch:{
        width:windowWidth*42/100,
        backgroundColor:'#ffffff',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    filterBtnCancelTouchText:{
        color:'#375280',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    modalImageCss:{
        width:windowWidth*5/100,
        height:windowWidth*5/100,
        alignSelf:'center'
    },
    modalFilterText:{
        marginLeft:windowWidth*2/100,
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.8/100,
        color:'#375280'
    },
    modalFilterView:{
        alignItems:'center',
        marginTop:windowWidth*3/100,
        justifyContent:'space-between'
    },
    flatlistFlexManage:{
        justifyContent:'space-between'
    },
    pdfMainViewModal:{
        alignItems:'center'
    },
    modalBorderView:{
        borderWidth:0.7,
        borderColor:'#E3E4E5',
        marginTop:windowWidth*4/100
    },
    pdfDwonloadIconCss:{
        width:windowWidth*15/100,
        height:windowWidth*15/100
    },
    productMainView:{
        marginTop:windowWidth*4/100
    },
    productImage:{
        width:windowWidth*15/100,
        height:windowWidth*15/100
    },
    productTextView:{
        width:windowWidth*55/100,
    },
    productText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.6/100,
        width:windowWidth*55/100
    },
    productSoldMainView:{
        marginTop:windowWidth*2/100,
    },
    productSoldView:{
        backgroundColor:'#E2E8F0',
        padding:5,
        borderRadius:5,
        width:windowWidth*30/100,
        alignItems:'center'
    },
    productSoldText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    productReturnView:{
        backgroundColor:'#FEE2E2',
        padding:5,
        borderRadius:5,
        width:windowWidth*40/100,
        alignItems:'center'
    },
    productReturnText:{
        color:'#DC2626',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    productAmountText:{
        color:'#059669',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.6/100,
        width:windowWidth*24/100
    },
    scrollContain:{
        paddingBottom:windowWidth*20/100
    },
    blueThemeColorEdit:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular',
        marginLeft:windowWidth*2/100
    },
    dropdownPlaceholderEdit:{
        color:'#9A9A9A',
        padding:5
    },
    dropDownTextInputEdit:{
        width: (windowWidth * 27) / 100,
        height: (windowHeight * 3.5) / 100,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        fontFamily:'Lato-Regular',
        color:'#000000',
        borderWidth: 1,
        borderColor: "#CCBEB1",
    },
    dropdownIconCssEdit:{
        position:'absolute',
        width:windowWidth*6/100,
        height:windowWidth*6/100,
    },
    rightArrowCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
    },
    chartSaleRevenueView:{
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
    },
    chartSalesRevMarginView:{
        marginTop:windowWidth*9/100,
        width:windowWidth*48/100,
    },
    periodView:{
        alignItems:'center',
        width:windowWidth*50/100
    },
    periodText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.8/100
    },
    chartTooltipView:{
        marginBottom: 20,        
        marginLeft: -6,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 3,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    chartTooltipText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.8/100
    },
    borderMainView:{
        borderTopWidth:0.8,
        borderTopColor:'#B1B1B1',
        marginTop:windowWidth*3/100
    }

});
