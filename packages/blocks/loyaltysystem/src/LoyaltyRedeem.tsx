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
import { backIcon,starIcon, infoIcon } from "./assets";

import LoyaltyRedeemController, { Props,LoyaltyRedeemProps } from "./LoyaltyRedeemController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class LoyaltyRedeem extends LoyaltyRedeemController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getLoyaltyRedeemView = (itemRedeem:LoyaltyRedeemProps,indexOrder:number)=>{
        let value = itemRedeem;
        return (
                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.flatlistLoyaltyRenderMainView]}>
                    <View style={styles.flatOrderView}>
                        <Text numberOfLines={1} style={[styles.flatOrderNumberText,{textAlign:TextAlignManage(i18n.language)}]}>{value.attributes.perk_code}</Text>
                        <View style={{flexDirection:FlexConditionManage(i18n.language),width:windowWidth*50/100}}>
                            <Text style={[styles.flatDateTimeText,{textAlign:TextAlignManage(i18n.language)}]}>{value.attributes.description}</Text>
                            <Image source={starIcon} style={styles.backIconCssBuyerLoyalty}></Image>
                            <Text  style={[styles.flatDateTimeText,{textAlign:TextAlignManage(i18n.language)}]}> {value.attributes.points_needed}{i18n.t('pointsText')}</Text>
                        </View>
                    </View>
                    <TouchableOpacity testID="btnRedeemModal" disabled={!value.attributes.is_redem} style={[styles.btnLoyalTyButton,{backgroundColor:value.attributes.is_redem ? '#CCBEB1':'#CBD5E1'}]} onPress={()=>{this.redeemModalOpen(value.attributes.is_redem,value.attributes.perk_code)}}>
                        <Text style={styles.useLoyaltyButtonText}>{i18n.t("apply")}</Text>
                    </TouchableOpacity>
                </View>

        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerBuyerLoyalty}>
            <SafeAreaView style={styles.safeContainerBuyerLoyalty}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerBuyerLoyaltyView,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewBuyerLoyalty,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackLoyaltyRedeem" style={styles.backTouchBuyerLoyalty} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssBuyerLoyalty,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleBuyer}>{i18n.t('loyaltyPointsText')}</Text>
                </View>
                <View style={styles.filterExtraTouchBuyer}>
                </View>
              </View>

            </View>
            

            <View style={styles.marginManageMainBuyer}>

                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.LoyaltyRedeemMainView]}>
                    <Image resizeMode="contain" source={starIcon} style={styles.starIcon}></Image>
                    <Text style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)},styles.LoyaltyRedeemText]}>{this.state.loyaltyPoints}</Text>
                </View>
                <Text style={styles.availablePointTextRedeem}>{i18n.t('availablePointsText')}</Text>

                <View style={styles.borderView}> 
                </View>

                <View style={styles.loyaltyMainViewRedeem}>
                    <FlatList
                        testID={"loyatyRedeemFlatlist"}
                        bounces={false}
                        data={this.state.loyaltyRedeemArr}
                        contentContainerStyle={styles.scrollPaddingManageRedeem}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() =>
                            !this.state.loading ? (
                            <View style={styles.emptyLisyViewLoyaltyRedeem}>
                                <Text style={styles.emptyFlatlistTextLoyaltyRedeem}>
                                {i18n.t('noTransactionEmptyText')}
                                </Text>
                            </View>
                            ) : null
                        }
                        renderItem={({item,index}) => this.getLoyaltyRedeemView(item,index)}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>

            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.redeemModal}>
            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={styles.modalRedeemView}>
                    <View style={styles.modalRedeemTextMainView}>
                        <View style={styles.modalRedeemBorderView}></View>
                        <View style={styles.modalReedemTextView}>
                            <Text style={styles.modalReedemText}>{i18n.t('redeemPointsText')}</Text>
                        </View>
                        <View style={styles.modalReedemConfimationMainView}>
                            <Text style={styles.modalTapYesText}>{i18n.t('tapYesCollectRewardText')}</Text>
                        </View>
                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.modalButtonMainView]}>
                            <TouchableOpacity testID="btnCancelRedeemModal" style={styles.modalCancelTouch} onPress={()=>{this.redeemModalClose()}}>
                                <Text style={styles.modalCancelText}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnRedeemConfirm" style={styles.modalRedeemBtnTouch} onPress={()=>{this.btnRedeemConfirm()}}>
                                <Text style={styles.modalRedeemBtnText}>{i18n.t('redeemText')}</Text>
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
    containerBuyerLoyalty: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerBuyerLoyalty:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerBuyerLoyaltyView:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewBuyerLoyalty:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchBuyerLoyalty:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssBuyerLoyalty:{
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
    loyaltyMainViewRedeem:{
        marginTop:windowWidth*5/100
    },
    scrollPaddingManageRedeem:{
        paddingBottom:windowWidth*50/100
    },
    emptyLisyViewLoyaltyRedeem: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistTextLoyaltyRedeem: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    marginManageMainBuyer:{
        marginTop:windowWidth*5/100,
        width:windowWidth*90/100,
        alignSelf:'center'
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
        width:windowWidth*60/100
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
        width:windowWidth*22/100,
        height:windowHeight*4.5/100,
        borderRadius:2,
        justifyContent:'center'
    },
    btnLoyaltyDisabledButton:{
        backgroundColor:'#CBD5E1',
        width:windowWidth*22/100,
        height:windowHeight*4.5/100,
        borderRadius:2,
        justifyContent:'center'
    },
    useLoyaltyButtonText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4/100,
        fontWeight:'500'
    },
    LoyaltyRedeemMainView:{
        justifyContent:'center',
        alignItems:'center'
    },
    starIcon:{
        width:windowWidth*8.5/100,
        height:windowWidth*8.5/100
    },
    LoyaltyRedeemText:{
        fontFamily:'Avenir-Heavy',
        color:'#CCBEB1',
        fontSize:windowWidth*11/100
    },
    availablePointTextRedeem:{
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
    },
    modalMainView:{
        flex: 1, 
        backgroundColor: '#00000030', 
        alignItems: 'center'
    },
    modalSafe:{
        flex:0
    },
    modalRedeemView:{
        position: 'absolute',  
        bottom:0, 
        width:windowWidth
    },
    modalRedeemTextMainView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*28/100
    },
    modalRedeemBorderView:{
        borderWidth:2,
        borderColor:'#F2F3F5',
        width:windowWidth*20/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
    },
    modalReedemTextView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*4/100,
        marginTop:windowWidth*4/100
    },
    modalReedemText:{
        textAlign:'center',
        fontSize:windowWidth*5.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold'
    },
    modalReedemConfimationMainView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*8/100,
        marginTop:windowWidth*5/100,
        padding:5,
        alignSelf:'center',
        width:windowWidth
    },
    modalTapYesText:{
        textAlign:'center',
        color:'#375280',
        fontSize:windowWidth*4.7/100,
        fontFamily:'Lato-Regular',
        width:windowWidth*70/100,
        alignSelf:'center'
    },
    modalButtonMainView:{
        width:windowWidth*90/100,
        justifyContent:'space-between',
        alignSelf:'center',
        marginTop:windowWidth*4/100
    },
    modalCancelTouch:{
        width:windowWidth*42/100,
        backgroundColor:'#ffffff',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    modalCancelText:{
        color:'#375280',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    modalRedeemBtnTouch:{
        width:windowWidth*42/100,
        backgroundColor:'#F87171',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center'
    },
    modalRedeemBtnText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    flatlistLoyaltyRenderMainView:{
        width:windowWidth*89/100,
        justifyContent:'space-between',
        alignItems:'center', 
        marginTop: windowWidth*4/100,
        marginBottom: 30,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor:"#FFFFFF",
        elevation: 5,
        padding:10,
        alignSelf:'center',
    }
});
