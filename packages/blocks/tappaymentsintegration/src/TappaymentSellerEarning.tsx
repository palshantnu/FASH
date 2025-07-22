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
import { backIcon, downArrow,completeIcon,unSelectIcon,activeStatus, refundIcon } from "./assets";

import TappaymentSellerEarningController, { Props,EarningSellerProps } from "./TappaymentSellerEarningController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import TextAlignManage from '../../../components/src/TextAlignManage'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class TappaymentSellerEarning extends TappaymentSellerEarningController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getEarningTransactionView = (itemEarning:EarningSellerProps,indexOrder:number)=>{
        let value = itemEarning;
        return (
            <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
                <View style={styles.flatWidthManage}>
                    <Image source={value.status === 'refunded' ? refundIcon:completeIcon} style={styles.flatListIcon}></Image>
                </View>
                <View style={styles.flatOrderView}>
                    <Text numberOfLines={1} style={[styles.flatOrderNumberText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('OrderText')}{value.order_number}</Text>
                    <Text numberOfLines={1} style={[styles.flatDateTimeText,{textAlign:TextAlignManage(i18n.language)}]}>{this.convertDateEarning(value.created_at)} | {value.catalogue_name}</Text>
                </View>
                <View style={styles.flatWidthAmountManage}>
                    <Text style={[styles.flatAmountText,{textAlign:this.state.languageGet === 'en' ? 'right':'left'}]}>{PriceConvertValue(value.amount,this.state.languagueIcon)}</Text>
                </View>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerSeller}>
            <SafeAreaView style={styles.safeContainerSeller}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerSellerView,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewSeller,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackEarningSeller" style={styles.backTouchSeller} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssSeller,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleSeller}>{i18n.t('earningText')}</Text>
                </View>
                <View style={styles.filterExtraTouchSeller}>
                </View>
              </View>

            </View>

            <View style={styles.marginTenManage}>
                <View style={[styles.transMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.transText}>{i18n.t('transactionsText')}</Text>
                    <TouchableOpacity testID="btnFilterOpen" style={[styles.filterMainView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.filterModalOpen()}}>
                        <Text style={styles.filterText}>{this.state.filterSelectStatusShow}</Text>
                        <Image resizeMode="contain" source={downArrow} style={styles.filterImageDownArrow}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.bankAddMainViewDriver}>
                    <FlatList
                        testID={"earningSellerFlatlist"}
                        bounces={false}
                        data={this.state.earningArrSeller}
                        contentContainerStyle={styles.scrollPaddingManage}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=>{return(<View style={styles.flatlistItemSepView}>

                        </View>)}}
                        ListEmptyComponent={() =>
                            !this.state.loading ? (
                            <View style={styles.emptyLisyViewEarning}>
                                <Text style={styles.emptyFlatlistTextEarning}>
                                {i18n.t('noTransactionEmptyText')}
                                </Text>
                            </View>
                            ) : null
                        }
                        renderItem={({item,index}) => this.getEarningTransactionView(item,index)}
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
                    <View style={styles.cameraModalMainViewDriverAdd}>
                        <View style={styles.logOutMainView}>
                            <View style={styles.logoutBorderView}></View>
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
    safeContainerSeller:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerSellerView:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewSeller:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchSeller:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssSeller:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleSeller:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchSeller:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    bankAddMainViewDriver:{
        marginTop:windowWidth*5/100
    },
    scrollPaddingManage:{
        paddingBottom:windowWidth*50/100
    },
    emptyLisyViewEarning: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistTextEarning: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    marginTenManage:{
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
        justifyContent:'space-between'
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
    cameraModalMainViewDriverAdd:{
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
    logOutMainView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*35/100
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
    }
});
