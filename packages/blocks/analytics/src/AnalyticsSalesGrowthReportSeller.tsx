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
import { backIcon,activeStatus,up_arrow,left_arrow,right_arrow,down_arrow, download,unSelectIcon, pdfIcon, docIcon, jpgIcon } from "./assets";

import AnalyticsSalesGrowthReportSellerController, { Props } from "./AnalyticsSalesGrowthReportSellerController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import { LineChart } from "react-native-gifted-charts";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { Dropdown } from "react-native-element-dropdown";

// Customizable Area End

export default class AnalyticsSalesGrowthReportSeller extends AnalyticsSalesGrowthReportSellerController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerSellerGw}>
            <SafeAreaView style={styles.safeContainerSellerGw}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerSellerGwViewAddBank,globalStyle.headerMarginManage]}>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewSellerGwReport]}>
                <TouchableOpacity testID="btnBackSalesRevenue" style={styles.backTouchSellerGwReport} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconCssSellerGwReport]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleSellerGwReport}>{i18n.t('salesGrowthReportText').toString()}</Text>
                </View>
                <View style={styles.filterExtraTouchSellerGw}>
                    <TouchableOpacity testID="btnDownloadModal" onPress={()=>{this.downloadModalOpen()}}>
                        <Image resizeMode="contain" source={download} style={styles.filterExtraTouchSellerGw}></Image>
                    </TouchableOpacity>
                </View>
              </View>
            </View>

                <ScrollView bounces={false} style={styles.containerSellerGwViewAddBank} showsVerticalScrollIndicator={true} contentContainerStyle={styles.scrollContainGw}>

                 
                    <View style={styles.marginManageTop}>
                        <View style={[styles.chartSaleRevenueView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <View style={styles.chartSalesRevMarginView}>
                                <Text style={[styles.chartTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('salesRevenueText').toString()}</Text>
                                <Text style={[styles.chartAmountText,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValue(this.state.salesRevenue,this.state.currencyLocal)}</Text>
                               {!this.state.showLesser?
                                <View style={{flexDirection:FlexConditionManage(i18n.language),alignItems:'center',marginTop:5}}>
                                    <Image source={up_arrow} style={{width:24,height:24}}></Image>
                                    <Text style={{fontFamily:'Lato-Regular',fontSize:14,color:'#059669',textAlign:TextAlignManage(i18n.language)}}>{this.state.profitPercentage} {i18n.t('higherThanLastPeriodText').toString()}</Text>
                                </View>
                                :
                                <View style={{flexDirection:FlexConditionManage(i18n.language),alignItems:'center',marginTop:5,marginLeft:-2,alignSelf:'center'}}>
                                    <Image source={down_arrow} style={{width:24,height:24}}></Image>
                                    <Text style={{fontFamily:'Lato-Regular',fontSize:14,color:'#F87171',textAlign:TextAlignManage(i18n.language)}}>{this.state.lossPercentage} {i18n.t('lesserThanLastPeriodText').toString()}</Text>
                                </View>
                                }
                            </View>
                            <View style={[styles.periodView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.periodText}>{i18n.t('periodText').toString()}:  </Text>
                            <Dropdown
                                testID="avgTimeDropdownEdit"
                                data={this.state.filterArrDropdown}
                                placeholder="Select period"
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                value={this.state.filterSelected}
                                itemTextStyle={[styles.blueThemeColorEdit,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                placeholderStyle={styles.dropdownPlaceholderEdit}
                                selectedTextStyle={[styles.blueThemeColorEdit,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)},styles.dropDownTextInputEdit]}
                                onChange={(item)=>{
                                    this.selectFilterUpdate(item.value)
                                    }}
                                iconStyle={[{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)},styles.dropdownIconCssEdit]}
                                iconColor={'#475569'}
                                />
                            </View>
                        </View>
                        <View style={styles.modalBorderView}></View>
                        {this.state.filterSelected==="Monthly"&&
                        <View style={[styles.marginManage,{flexDirection:"row",justifyContent:'space-between',alignItems:'center',width:'100%'}]}>
                        <TouchableOpacity
                         testID="btnBackMonth"
                        onPress={this.backPress}
                            style={{
                                margin:4,
                                borderRadius: 2,
                            }}
                            >
                            <Image source={right_arrow}  style={{width:32,height:32}}/>
                            </TouchableOpacity>
                        <FlatList
                        testID={"orderStatusDataList"}
                        bounces={false}
                        ref={this.flatListRef}
                        horizontal={true}
                        scrollEnabled={false}
                        data={this.state.months}
                        nestedScrollEnabled={false}
                        renderItem={({item,index}) => {
                        return (
                            <TouchableOpacity
                            testID={"allBtnCheckBox"+index}
                            onPress={()=>this.setMonthName(index)}
                            key={index}
                            style={{
                                width:(windowWidth * 12.5) / 100,
                                height:33,
                                marginHorizontal:4,
                                backgroundColor: this.state.monthName===index?"#375280":'#E2E8F0',
                                borderRadius: 2,
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            >
                            <Text style={{fontSize:16,color:this.state.monthName===index?"#fff":"#375280",fontFamily:'lato-Regular'}}>{item}</Text>
                            </TouchableOpacity>
                        );
                        }}
                        />
                         <TouchableOpacity
                          testID="btnNextMonth"
                          onPress={this.nextPress}
                           style={{
                            margin:4,
                            borderRadius: 2,
                        }}
                           >
                           <Image source={left_arrow} style={{width:32,height:32}}/>
                           </TouchableOpacity>
                        </View>
                        }
                        <View style={[styles.marginManage,{width:'100%'}]}>
                        <LineChart data={this.state.lineData}
                        data-test-id={"lineChartSalesGrouwth"}
                        formatYLabel={(item)=>{
                           let value= this.convertValue(item);
                           return value
                        }}
                        dashGap={0}
                        yAxisColor="#FFFFFF"
                        yAxisLabelWidth={60}
                        xAxisColor="#CCBEB1"
                        xAxisLabelTextStyle={styles.chartXLable}
                        yAxisTextStyle={styles.chartYLable}
                        data2={this.state.lineData2}
                        height={280}
                        maxValue={this.state.maxValue}
                        initialSpacing={15}
                        color1="#059669"
                        color2="#F87171"
                        textColor1="#059669"
                        dataPointsHeight={6}
                        dataPointsWidth={6}
                        dataPointsColor1="#059669"
                        dataPointsColor2="#F87171"
                        textFontSize={13}
                        />
                        </View>
                        <View style={[styles.marginManage,{flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',marginTop:20,width:'100%'}]}>
<View style={{flexDirection:FlexConditionManage(i18n.language),justifyContent:'center',alignItems:'center'}}><View style={{height:10,width:10,borderRadius:20,backgroundColor:'#059669'}}></View><Text style={{marginHorizontal:5,fontSize:14,color:'#059669',fontFamily:'lato-Regular'}}>{i18n.t('currentPeriodText').toString()}</Text></View>
<View  style={{flexDirection:FlexConditionManage(i18n.language),justifyContent:'center',alignItems:'center'}}><View style={{height:10,width:10,borderRadius:20,backgroundColor:'#F87171'}}></View><Text style={{marginLeft:5,fontSize:14,color:'#F87171',fontFamily:'lato-Regular'}}>{i18n.t('lastPeriodText').toString()}</Text></View>
                        </View>
                    </View>


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
                                <Text style={styles.transGrowthModalText}>{i18n.t('exportReportText').toString()}</Text>
                            </View>
                            <View style={styles.filterStatusMainView}>
                               <TouchableOpacity testID="btnDownloadPdf" style={styles.flatlistFlexManage} onPress={()=>{this.selectDownloadStatus('pdf')}}>
                                <View style={styles.pdfMainViewModal}>
                                    <Image resizeMode="contain" source={pdfIcon} style={styles.pdfDwonloadIconCss}></Image>
                                    <Text style={styles.modalFilterText}>{i18n.t('pdfText').toString()}</Text>
                                </View>
                                    <Image source={this.state.donwloadSelectStatus === 'pdf' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderView}></View>
                               <TouchableOpacity testID="btnDownloadDoc" style={styles.modalFilterView} onPress={()=>{this.selectDownloadStatus('doc')}}>
                                    <View style={styles.pdfMainViewModal}>
                                        <Image resizeMode="contain" source={docIcon} style={styles.pdfDwonloadIconCss}></Image>
                                        <Text style={styles.modalFilterText}>{i18n.t('docFileText').toString()}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'doc' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                               <View style={styles.modalBorderView}></View>
                               <TouchableOpacity testID="btnDownloadJpg" style={styles.modalFilterView} onPress={()=>{this.selectDownloadStatus('jpg')}}>
                                    <View style={styles.pdfMainViewModal}>
                                        <Image resizeMode="contain" source={jpgIcon} style={styles.pdfDwonloadIconCss}></Image>
                                        <Text style={styles.modalFilterText}>{i18n.t('jpgText').toString()}</Text>
                                    </View>
                                    <Image source={this.state.donwloadSelectStatus === 'jpg' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                               </TouchableOpacity>
                            </View>
                            <View style={styles.confirmBtnMainView}>
                                <TouchableOpacity testID="btnCancelFilterModal" style={styles.filterBtnCancelTouch} onPress={()=>{this.downloadModalClose()}}>
                                    <Text style={styles.filterBtnCancelTouchText}>{i18n.t('cancelText').toString()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity testID="btnConfirmFilterModal" style={styles.confirmTouchBtn} onPress={()=>{this.btnConfirmDownload()}}>
                                    <Text style={styles.confirmBtnTouchText}>{i18n.t('confirm').toString()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
      //Merge Engine End DefaultContainerSellerGw
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerSellerGw: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerSellerGw:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerSellerGwViewAddBank:{
        width:windowWidth*95/100,
        alignSelf:'center',
    },
    headerViewSellerGwReport:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchSellerGwReport:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssSellerGwReport:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleSellerGwReport:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchSellerGw:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    scrollPaddingManage:{
        paddingBottom:150
    },
    marginManage:{
        marginTop:windowWidth*4/100
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
        marginTop:windowWidth*1/100,
    },
    chartXLable:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100,
        marginTop:1,
        alignItems:'center',
        alignSelf:'center',
        textAlign:'center',
        
    },
    chartYLable:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100,
        marginTop:1,
        alignSelf:'center',
        alignItems:'center'
    },
    themeColor:{
        color:'#375280'
    },
    allStoreView:{
        flexDirection:'row',
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
        flexDirection:'row',
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
        flexDirection:'row',
        justifyContent:'space-between'
    },
    totalCardView:{
        backgroundColor:'#F8F8F8',
        width:windowWidth*42/100,
        height:windowHeight*8/100,
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
        fontSize:16,
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
        paddingVertical:windowWidth*4/100
    },
    transGrowthModalText:{
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
        flexDirection:'row',
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
        flexDirection:'row',
        alignItems:'center',
        marginTop:windowWidth*3/100,
        justifyContent:'space-between'
    },
    flatlistFlexManage:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pdfMainViewModal:{
        flexDirection:'row',
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
        flexDirection:'row',
        marginTop:windowWidth*4/100
    },
    productImage:{
        width:windowWidth*15/100,
        height:windowWidth*15/100
    },
    productTextView:{
        marginLeft:windowWidth*4/100,
        width:windowWidth*60/100
    },
    productText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.6/100,
        width:windowWidth*55/100,
    },
    productSoldMainView:{
        flexDirection:'row',
        marginTop:windowWidth*2/100
    },
    productSoldView:{
        backgroundColor:'#E2E8F0',
        padding:5,
        borderRadius:5,
        width:windowWidth*25/100,
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
        marginLeft:windowWidth*3/100,
        width:windowWidth*30/100,
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
        width:windowWidth*20/100
    },
    scrollContainGw:{
        paddingBottom:windowWidth*20/100
    },
    blueThemeColorEdit:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular'
    },
    dropdownPlaceholderEdit:{
        color:'#9A9A9A',
        padding:5
    },
    dropDownTextInputEdit:{
        width: (windowWidth * 26) / 100,
        height: (windowHeight * 3.9) / 100,
        borderRadius: 3,
      
        fontFamily:'Lato-Regular',
        borderWidth: 1,
        borderColor: "#CCBEB1",
        right:7
    },
    dropdownIconCssEdit:{
        position:'absolute',
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        right:5
    },
    rightArrowCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
    },
    chartSaleRevenueView:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    chartSalesRevMarginView:{
        marginTop:windowWidth*7/100,
        width:windowWidth*57/100,
    },
    periodView:{
        alignItems:'center',
        right:10,
        width:windowWidth*40/100,
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
    }

});
