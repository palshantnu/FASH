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
  ScrollView,
  FlatList
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,activeStatus,rightArrow, download,unSelectIcon, pdfIcon, docIcon, jpgIcon,right_arrow,left_arrow } from "./assets";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import AnalyticsSalesVolumeController, { Props } from "./AnalyticsSalesVolumeController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import { PieChart } from "react-native-gifted-charts";
import ImageNotFound from "../../../components/src/ImageNotFound";
import { Dropdown } from "react-native-element-dropdown";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlatlistArabicManage from "../../../components/src/FlatlistArabicManage";
// Customizable Area End

export default class AnalyticsSalesVolume extends AnalyticsSalesVolumeController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerSellerReport}>
            <SafeAreaView style={styles.safeContainerReport}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerSellerReportView,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewSalesReport,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackSalesVolume" style={styles.backTouchSalesVolume} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconCssSalesVolume]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleSalesVolume}>{i18n.t('salesVolumeReportText').toString()}</Text>
                </View>
                <View style={styles.filterExtraTouchSales}>
                    {
                        this.state.chartPieFilterData.length > 0 &&
                        <TouchableOpacity testID="btnDownloadModal" onPress={()=>{this.downloadModalOpen()}}>
                            <Image resizeMode="contain" source={download} style={styles.filterExtraTouchSales}></Image>
                        </TouchableOpacity>
                    }
                </View>
              </View>
            </View>

                <ScrollView bounces={false} style={styles.containerSellerReportView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainSales}>

                    <View style={styles.mainCateSubCateViewSales}>
                        <TouchableOpacity testID="btnRedirectStoreSelect" style={styles.allStoreSalesMainView} onPress={()=>{this.btnRedirectSelectStore()}}>
                            <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.allStoreView]}>
                                <Text numberOfLines={1} style={[styles.allStoreSalesText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.storeProductText}</Text>
                                <Image source={rightArrow} style={[styles.rightArrowCss,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.analyticsType != 'store' && this.state.salesVolumeAnalyticsData.products.name != '' &&
                        <View style={[styles.productMainViewSales,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Image source={ImageNotFound(this.state.salesVolumeAnalyticsData.products.image_url)} style={styles.productImage}></Image>
                            <View style={[styles.productTextViewSales,{marginRight:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginLeft:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.productMainFlexView]}>
                                    <Text numberOfLines={1} style={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*1/100)},styles.productText]}>{this.state.salesVolumeAnalyticsData.products.name}</Text>
                                    <Text style={[styles.productAmountTextSales,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValue(parseFloat(this.state.salesVolumeAnalyticsData.products.price).toFixed(0),this.state.currencyLocalIcon)}</Text>
                                </View>
                                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.productSoldMainView]}>
                                    <View style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*1/100)},styles.productSoldView]}>
                                        <Text style={styles.productSoldTextSales}>{this.state.salesVolumeAnalyticsData.products.sold_units} {i18n.t('soldUnit').toString()}</Text>
                                    </View>
                                    <View style={[styles.productReturnViewSales,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100)}]}>
                                        <Text style={styles.productReturnText}>{this.state.salesVolumeAnalyticsData.products.returned_units} {i18n.t('returnUnit').toString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    {
                    this.state.showData && 
                        <View style={styles.marginManageTop}>
                            <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.chartPieSaleRevenueView]}>
                                <View style={styles.chartPieSalesRevMarginView}>
                                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.chartTitleTextPie]}>{i18n.t('salesVolumeReportText').toString()}</Text>
                                </View>
                                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.periodViewPie]}>
                                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.periodTextPie]}>{i18n.t('periodText').toString()}: </Text>
                                <Dropdown
                                    testID="selectPeriodChange"
                                    data={this.state.filterArrDropdown}
                                    placeholder="Select period"
                                    maxHeight={200}
                                    labelField="label"
                                    valueField="value"
                                    value={this.state.filterSelectedPie}
                                    itemTextStyle={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) },styles.blueThemeColorPie]}
                                    placeholderStyle={styles.dropdownPlaceholderPie}
                                    selectedTextStyle={[styles.blueThemeColorPie,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    style={[styles.dropDownTextInputPie,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}
                                    onChange={(item)=>{
                                        this.selectFilterUpdate(item.value)
                                        }}
                                    iconStyle={[styles.dropdownIconCssPie,{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)}]}
                                    iconColor={'#475569'}
                                    />
                                </View>
                            </View>
                            {this.state.filterSelectedPie==="monthly"&&
                                <View style={[styles.marginManage,styles.flatlistMonthMainView]}>
                                <TouchableOpacity testID="btnMonthBack" onPress={()=>{this.backPress()}}
                                    style={styles.monthBackTouch}>
                                    <Image resizeMode="contain" source={right_arrow}  style={styles.monthBackImage}/>
                                    </TouchableOpacity>
                                    <FlatList
                                    testID={"monthFlatRender"}
                                    bounces={false}
                                    ref={this.flatListRefPie}
                                    horizontal={true}
                                    scrollEnabled={false}
                                    data={this.state.months}
                                    nestedScrollEnabled={false}
                                    renderItem={({item,index}) => {
                                    return (
                                        <TouchableOpacity testID="btnSetMonthName" onPress={()=>this.setMonthName(index)}
                                        key={index}
                                        style={[styles.flatlistMonthTouch,{backgroundColor: this.state.monthName===index?"#375280":'#E2E8F0',}]}
                                        >
                                        <Text style={[styles.flatMonthText,{color:this.state.monthName===index?"#fff":"#375280"}]}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                    }}
                                    />
                                    <TouchableOpacity testID="btnMonthNext" onPress={()=>{this.nextPress()}}
                                    style={styles.monthBackTouch}>
                                    <Image source={left_arrow} style={styles.monthBackImage}/>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={styles.pieChartView}>
                                    <PieChart
                                        // @ts-expect-error component has wrong type support
                                        testID = "pieChartSalesVolume"
                                        data={this.state.chartPieFilterData}
                                        donut
                                        sectionAutoFocus
                                        radius={120}
                                        innerRadius={90}
                                        innerCircleColor={'#FFFFFF'}
                                        centerLabelComponent={() => {
                                        return (
                                            <View style={styles.pieCenterMainView}>
                                                <Text style={styles.totalUnitSoldText}>{i18n.t('totalUnitsSoldText').toString()}</Text>
                                                <Text style={styles.totalAmountTextPie}>{this.state.salesVolumeAnalyticsData.total_sold_units}</Text>

                                            </View>

                                        );

                                        }}
                                    />
                            </View>
                            <View style={styles.marginManage}>
                                <View style={styles.chartActiveView}>
                                    <View style={[styles.unitSoldMainTouch,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <View style={styles.barChartFirstAvtiveView} />
                                            <Text style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100)},styles.unitSoldText]}>{this.state.salesVolumeAnalyticsData.sold_units}</Text>
                                            <Text style={[styles.chartActiveText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*1/100)}]}>{i18n.t('soldUnit').toString()}</Text>
                                    </View>
                                    <View style={[styles.unitSoldMainTouch,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <View style={styles.barChartSecondAvtiveView}/>
                                            <Text style={[{marginRight:ManageDynamicMargin(i18n.language,-windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)},styles.unitSoldText]}>{this.state.salesVolumeAnalyticsData.returned_units}</Text>
                                            <Text style={[styles.chartActiveText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*1/100)}]}>{i18n.t('returnUnit').toString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }

                </ScrollView>

                <Modal
                animationType="slide"
                transparent={true}
                testID="filterModal"
                visible={this.state.downloadModal}>
                <View style={styles.modalMainViewChart}>
                    <SafeAreaView style={styles.modalSafeseller}></SafeAreaView>
                    <View style={styles.cameraModalMainViewChartAdd}>
                        <View style={styles.exportMainView}>
                            <View style={styles.exportBorderView}></View>
                            <View style={styles.exportModalView}>
                                <Text style={styles.exportModalText}>{i18n.t('exportReportText').toString()}</Text>
                            </View>
                            <View style={styles.exportStatusMainView}>
                               <TouchableOpacity testID="btnDownloadPdf" style={[styles.flatlistFlexManageExport,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('pdf')}}>
                                <View style={[styles.pdfMainViewModalPie,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Image resizeMode="contain" source={pdfIcon} style={styles.pdfDwonloadIconCssPie}></Image>
                                    <Text style={styles.modalFilterTextPie}>{i18n.t('pdfText').toString()}</Text>
                                </View>
                                    <Image source={this.state.donwloadSelectStatus === 'pdf' ?activeStatus:unSelectIcon} style={styles.modalImageCssPie}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderViewPie}></View>
                               <TouchableOpacity testID="btnDownloadDoc" style={[styles.modalFilterViewPie,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('doc')}}>
                                    <View style={[styles.pdfMainViewModalPie,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <Image resizeMode="contain" source={docIcon} style={styles.pdfDwonloadIconCssPie}></Image>
                                        <Text style={styles.modalFilterTextPie}>{i18n.t('docFileText').toString()}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'doc' ?activeStatus:unSelectIcon} style={styles.modalImageCssPie}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderViewPie}></View>
                               <TouchableOpacity testID="btnDownloadJpg" style={[styles.modalFilterViewPie,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectDownloadStatus('jpg')}}>
                                    <View style={[styles.pdfMainViewModalPie,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <Image resizeMode="contain" source={jpgIcon} style={styles.pdfDwonloadIconCssPie}></Image>
                                        <Text style={styles.modalFilterTextPie}>{i18n.t('jpgText').toString()}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'jpg' ?activeStatus:unSelectIcon} style={styles.modalImageCssPie}></Image>
                               </TouchableOpacity>
                            </View>
                            <View style={[styles.confirmBtnMainViewPie,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <TouchableOpacity testID="btnCancelFilterModal" style={styles.filterBtnCancelTouchPie} onPress={()=>{this.downloadModalClose()}}>
                                    <Text style={styles.filterBtnCancelTouchPieText}>{i18n.t('cancelText').toString()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity testID="btnConfirmFilterModal" style={styles.confirmTouchBtn} onPress={()=>{this.btnConfirmDownload()}}>
                                    <Text style={styles.confirmBtnTouchTextPie}>{i18n.t('confirm').toString()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
      //Merge Engine End DefaultContainerSellerReport
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerSellerReport: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerReport:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerSellerReportView:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewSalesReport:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchSalesVolume:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssSalesVolume:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleSalesVolume:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchSales:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    scrollPaddingManage:{
        paddingBottom:150
    },
    mainCateSubCateViewSales: {
        height: (windowHeight * 6.5) / 100,
        marginTop: (windowWidth * 7) / 100,
        width: (windowWidth * 90) / 100,
        borderRadius: 3,
        justifyContent: "center",
    },
    allStoreSalesMainView:{
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
        marginTop:windowWidth*6/100,
    },
    pieChartView:{
        marginTop:windowWidth*6/100,
        width:windowWidth*90/100,
        alignItems:'center',
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
        marginTop:windowWidth*3/100
    },
    themeColor:{
        color:'#375280'
    },
    allStoreView:{
        justifyContent:'space-between',
        padding:8
    },
    allStoreSalesText:{
        width:windowWidth*75/100,
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4/100
    },
    chartTitleTextPie:{
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
        alignItems: 'center',
        justifyContent:'space-between'
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
        marginLeft:windowWidth*1/100,
        fontFamily:'Lato-Regular'
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
    modalMainViewChart:{
        flex: 1, 
        backgroundColor: '#00000030', 
        alignItems: 'center'
      },
    cameraModalMainViewChartAdd:{
        position: 'absolute', 
        bottom:0,
        width:windowWidth
    },
    modalSafeseller:{
        flex:0
    },
    exportMainView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*52/100
    },
    exportBorderView:{
        borderWidth:2,
        borderColor:'#F2F3F5',
        width:windowWidth*20/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
    },
    exportModalView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*4/100,
        marginTop:windowWidth*4/100
    },
    exportModalText:{
        textAlign:'center',
        fontSize:windowWidth*5.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold'
    },
    exportStatusMainView:{
        marginTop:windowWidth*5/100,
        padding:5,
        alignSelf:'center',
        width:windowWidth*90/100
    },
    confirmBtnMainViewPie:{
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
    confirmBtnTouchTextPie:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    filterBtnCancelTouchPie:{
        width:windowWidth*42/100,
        backgroundColor:'#ffffff',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    filterBtnCancelTouchPieText:{
        color:'#375280',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    modalImageCssPie:{
        width:windowWidth*5/100,
        height:windowWidth*5/100,
        alignSelf:'center'
    },
    modalFilterTextPie:{
        marginLeft:windowWidth*2/100,
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.8/100,
        color:'#375280'
    },
    modalFilterViewPie:{
        alignItems:'center',
        marginTop:windowWidth*3/100,
        justifyContent:'space-between'
    },
    flatlistFlexManageExport:{
        justifyContent:'space-between'
    },
    pdfMainViewModalPie:{
        alignItems:'center'
    },
    modalBorderViewPie:{
        borderWidth:0.7,
        borderColor:'#E3E4E5',
        marginTop:windowWidth*4/100
    },
    pdfDwonloadIconCssPie:{
        width:windowWidth*15/100,
        height:windowWidth*15/100
    },
    productMainViewSales:{
        marginTop:windowWidth*4/100
    },
    productImage:{
        width:windowWidth*15/100,
        height:windowWidth*15/100
    },
    productTextViewSales:{
    },
    productText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.6/100,
        width:windowWidth*55/100,
    },
    productSoldMainView:{
        marginTop:windowWidth*2/100
    },
    productSoldView:{
        backgroundColor:'#E2E8F0',
        padding:5,
        borderRadius:5,
        width:windowWidth*25/100,
        alignItems:'center'
    },
    productSoldTextSales:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    productReturnViewSales:{
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
    productAmountTextSales:{
        color:'#059669',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.6/100,
        width:windowWidth*24/100
    },
    scrollContainSales:{
        paddingBottom:windowWidth*20/100
    },
    blueThemeColorPie:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular'
    },
    dropdownPlaceholderPie:{
        color:'#9A9A9A',
        padding:5
    },
    dropDownTextInputPie:{
        width: (windowWidth * 27) / 100,
        height: (windowHeight * 3.5) / 100,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        fontFamily:'Lato-Regular',
        color:'#000000',
        borderWidth: 1,
        borderColor: "#CCBEB1"
    },
    dropdownIconCssPie:{
        position:'absolute',
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        right:5
    },
    rightArrowCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
    },
    chartPieSaleRevenueView:{
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
    },
    chartPieSalesRevMarginView:{
        marginTop:windowWidth*1.8/100,
        width:windowWidth*48/100,
    },
    periodViewPie:{
        alignItems:'center',
        width:windowWidth*50/100
    },
    periodTextPie:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.8/100
    },
    totalUnitSoldText:{
        fontSize: windowWidth*3.3/100, 
        color: '#375280', 
        fontFamily:'Lato-Regular'
    },
    totalAmountTextPie:{
        fontSize: windowWidth*8/100, 
        color: '#375280',
        fontFamily:'Lato-Bold'
    },
    pieCenterMainView:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    monthBackTouch:{
        margin:4,
        borderRadius: 2,
    },
    monthBackImage:{
        width:windowWidth*9/100,
        height:windowWidth*9/100
    },
    flatlistMonthTouch:{
        padding: 8,
        marginHorizontal:4,
        borderRadius: 2,
    },
    flatMonthText:{
        fontSize:windowWidth*3.8/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500'
    },
    unitSoldMainTouch:{
        alignItems:'center',
        justifyContent:'center'
    },
    unitSoldText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*5/100,
        color:'#375280'
    },
    flatlistMonthMainView:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'
    },
    productMainFlexView:{
        justifyContent:'space-between',
        width:windowWidth*75/100
    }

});
