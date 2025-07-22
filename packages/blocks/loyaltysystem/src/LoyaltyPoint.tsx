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
  Modal
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, downArrow,completeIcon,unSelectIcon,activeStatus, refundIcon, starIcon, infoIcon } from "./assets";

import LoyaltyPointController, { Props, EarningSellerTra } from "./LoyaltyPointController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import TextAlignManage from '../../../components/src/TextAlignManage'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class LoyaltyPoint extends LoyaltyPointController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getTransactionView = (itemEarning:EarningSellerTra,indexOrder:number)=>{
        let value = itemEarning;
        return (
            <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
                <View style={styles.flatWidthManage}>
                    <Image source={value?.transaction_type === 'debit' ? refundIcon:completeIcon} style={styles.flatListIcon}></Image>
                </View>
                <View style={styles.flatOrderView}>
                    <Text numberOfLines={3} style={[styles.flatOrderNumberText,{textAlign:TextAlignManage(i18n.language)}]}>{value?.message!==null?value?.message:'N/A'}</Text>
                    <Text numberOfLines={1} style={[styles.flatDateTimeText,{textAlign:TextAlignManage(i18n.language)}]}>{this.convertDateEarning(value?.debited_on)}</Text>
                </View>
                <View style={styles.flatWidthAmountManage}>
                    <Text style={[styles.flatAmountText,{textAlign:this.state.languageGet === 'en' ? 'right':'left'}]}>{this.state.languagueIcon + value?.point}</Text>
                </View>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerBuyer}>
            <SafeAreaView style={styles.safeContainerBuyer}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerBuyerView,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewBuyer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackEarningSeller" style={styles.backTouchBuyer} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssBuyer,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleBuyer}>{i18n.t('loyaltyPointsText')}</Text>
                </View>
                <View style={styles.filterExtraTouchBuyer}>
                </View>
              </View>

            </View>
            

            <View style={styles.marginManageMain}>

                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.loyaltyPointMainView]}>
                    <Image resizeMode="contain" source={starIcon} style={styles.starIcon}></Image>
                    <Text style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)},styles.loyaltyPointText]}>{this.state.loyaltyPointstoShow}</Text>
                </View>
                <Text style={styles.availablePointText}>{i18n.t('availablePointsText')}</Text>

                <TouchableOpacity testID="btnUseLoyaltyRedirect" style={styles.btnLoyalTyButton} onPress={()=>{this.btnRedirectLoyaltyRedeem()}}>
                    <Text style={styles.useLoyaltyButtonText}>{i18n.t("useLoyaltyPointsText")}</Text>
                </TouchableOpacity>

                <Text style={styles.redeemLoyaltyText}>{i18n.t("redeemYourPoinyText")}</Text>

                <View style={styles.borderView}> 
                </View>

                <View style={[styles.transMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.transText}>{i18n.t('transactionsText')}</Text>
                    <TouchableOpacity testID="btnFilterOpen" style={[styles.filterMainView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.filterModalOpen()}}>
                        <Text style={styles.filterText}>{this.state.filterSelectStatusShow}</Text>
                        <Image resizeMode="contain" source={downArrow} style={styles.filterImageDownArrow}></Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.loyaltyMainViewBuyer, { height : windowHeight * 0.6 }]}>
                    <FlatList
                        testID={"earningSellerFlatlist"}
                        bounces={false}
                        data={this.state.filteredData}
                        contentContainerStyle={styles.scrollPaddingManageBuyer}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=>{return(<View style={styles.flatlistItemSepView}>

                        </View>)}}
                        ListEmptyComponent={() =>
                            !this.state.loading ? (
                            <View style={styles.emptyLisyViewLoyalty}>
                                <Text style={styles.emptyFlatlistTextLoyalty}>
                                {i18n.t('noTransactionEmptyText')}
                                </Text>
                            </View>
                            ) : null
                        }
                        renderItem={({item,index}) => this.getTransactionView(item,index)}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>

            <Modal
            animationType="slide"
            transparent={true}
            testID="filterModal"
            visible={this.state.filterModal}>
                <View style={styles.modalMainViewDriver}>
                    <SafeAreaView style={styles.modalSafeDriver}></SafeAreaView>
                    <View style={styles.filterModalMainView}>
                        <View style={styles.filterModalView}>
                            <View style={styles.filterBorderView}></View>
                            <View style={styles.transModalView}>
                                <Text style={styles.transModalText}>{i18n.t('transactionsText')}</Text>
                            </View>
                            <View style={styles.filterStatusMainView}>
                               <TouchableOpacity testID="btnFilterStatusAll" style={{flexDirection:FlexConditionManage(i18n.language)}} onPress={()=>{this.selectFilterStatus('all',i18n.t('allText'))}}>
                                    <Image source={this.state.filterSelectStatus === 'all' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                                    <Text style={[styles.modalFilterText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('allText')}</Text>
                               </TouchableOpacity>
                               <TouchableOpacity testID="btnFilterStatusSold" style={[styles.modalFilterView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectFilterStatus('sold',i18n.t('soldText'))}}>
                                    <Image source={this.state.filterSelectStatus === 'sold' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                                    <Text style={[styles.modalFilterText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('soldText')}</Text>
                               </TouchableOpacity>
                               <TouchableOpacity testID="btnFilterStatusRefunded" style={[styles.modalFilterView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectFilterStatus('refunded',i18n.t('refundedText'))}}>
                                    <Image source={this.state.filterSelectStatus === 'refunded' ?activeStatus:unSelectIcon} style={styles.modalImageCss}></Image>
                                    <Text style={[styles.modalFilterText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('refundedText')}</Text>
                               </TouchableOpacity>
                            </View>
                            <View style={styles.confirmBtnMainView}>
                                <TouchableOpacity testID="btnCancelFilterModal" style={styles.filterBtnCancelTouch} onPress={()=>{this.filterModalClose()}}>
                                    <Text style={styles.filterBtnCancelTouchText}>{i18n.t('cancelText')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity testID="btnConfirmFilterModal" style={styles.confirmTouchBtn} onPress={()=>{this.btnConfirmFilter()}}>
                                    <Text style={styles.confirmBtnTouchText}>{i18n.t('confirm')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerBuyer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerBuyer:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerBuyerView:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewBuyer:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchBuyer:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssBuyer:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleBuyer:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchBuyer:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    loyaltyMainViewBuyer:{
        marginTop:windowWidth*5/100
    },
    scrollPaddingManageBuyer:{
        paddingBottom:windowWidth*50/100
    },
    emptyLisyViewLoyalty: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 20) / 100,
    },
    emptyFlatlistTextLoyalty: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    marginManageMain:{
        marginTop:windowWidth*5/100,
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    flatlistItemSepView:{
        paddingBottom:windowWidth*5/100
    },
    flatlistFlexManage:{
        flexDirection:'row'
    },
    flatWidthManage:{
        width:windowWidth*10/100
    },
    flatWidthAmountManage:{
        width:windowWidth*27/100
    },
    flatListIcon:{
        width:windowWidth*8/100,
        height:windowWidth*8/100
    },
    flatOrderView:{
        width:windowWidth*53/100
    },
    flatOrderNumberText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        color:'#375280',
        fontSize:windowWidth*4.2/100
    },
    flatDateTimeText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        color:'#94A3B8',
        fontSize:windowWidth*3.8/100
    },
    flatAmountText:{
        fontFamily:'Lato-Bold',
        color:'#059669',
        fontSize:windowWidth*3.8/100
    },
    transMainView:{
        justifyContent:'space-between',
        marginTop:windowWidth*5/100
    },
    transText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4/100,
        color:'#375280'
    },
    filterMainView:{
        borderWidth:1,
        borderColor:'#CCBEB1',
        width:windowWidth*23/100,
        padding:5,
        alignItems:'center',
        justifyContent:'space-between',
    },
    filterText:{
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4/100,
        color:'#375280'
    },
    filterImageDownArrow:{
        width:windowWidth*3.5/100,
        height:windowWidth*3.5/100,
        marginTop:windowWidth*0.5/100
    },
    modalMainViewDriver:{
        flex: 1, 
        backgroundColor: '#00000030', 
        alignItems: 'center'
      },
    filterModalMainView:{
        position: 'absolute', 
        bottom:0,
        width:windowWidth
    },
    modalSecondView:{
        alignSelf: 'center',
        width:'100%'
    },
    modalSafeDriver:{
        flex:0
    },
    filterModalView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*35/100
    },
    filterBorderView:{
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
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        marginTop:windowWidth*5/100,
        padding:5,
        alignSelf:'center',
        width:windowWidth*90/100,
        height:windowHeight*13/100
    },
    confirmBtnMainView:{
        width:windowWidth*90/100,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        marginTop:windowWidth*4/100
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
        height:windowWidth*5/100
    },
    modalFilterText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.8/100,
        color:'#375280'
    },
    modalFilterView:{
        alignItems:'center',
        marginTop:windowWidth*3/100
    },
    btnLoyalTyButton:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*90/100,
        height:windowHeight*6/100,
        borderRadius:2,
        marginTop:windowWidth*8/100,
        justifyContent:'center'
    },
    useLoyaltyButtonText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*5/100
    },
    loyaltyPointMainView:{
        justifyContent:'center',
        alignItems:'center'
    },
    starIcon:{
        width:windowWidth*8.5/100,
        height:windowWidth*8.5/100
    },
    loyaltyPointText:{
        fontFamily:'Avenir-Heavy',
        color:'#CCBEB1',
        fontSize:windowWidth*11/100
    },
    availablePointText:{
        textAlign:'center',
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.6/100
    },
    redeemLoyaltyText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.6/100,
        marginTop:windowWidth*3/100
    },
    borderView:{
        borderTopWidth:1,
        borderColor:'#CBD5E1',
        marginTop:windowWidth*5/100
    }
});
