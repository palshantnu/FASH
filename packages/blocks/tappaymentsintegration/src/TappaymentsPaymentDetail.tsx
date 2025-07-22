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
  Dimensions
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import PriceConvertValueNumber from "../../../components/src/PriceConvertValueNumber";
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'

import TappaymentsPaymentDetailController, { Props } from "./TappaymentsPaymentDetailController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class TappaymentsPaymentDetail extends TappaymentsPaymentDetailController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerTransaction}>
            <SafeAreaView style={styles.safeViewContainerTransaction}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewTransaction,globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewTransaction,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackTransaction" style={styles.backTouchTransaction} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconTransaction,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleTransaction}>{i18n.t('transactionText')}</Text>
                    </View>
                    <View style={styles.extraViewTransaction}>
                    </View>
                </View>
            </View>

            <View style={styles.transactionMainView}>
                <View style={styles.paymentMainViewTransaction}>
                    <View style={styles.flatSecondViewTransaction}>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('transactionIDText')}</Text>
                            <Text style={[styles.flatTransactionText,styles.firstWidthManage]}>{this.state.paymentDetailData.charge_id}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('priceText')}</Text>
                            <Text style={styles.flatTransactionText}>{PriceConvertValueNumber(this.state.paymentDetailData.amount,this.state.localCurrencyIcon)}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('paymentMethodTextS')}</Text>
                            <Text style={styles.flatTransactionText}>**** **** **** {this.state.paymentDetailData.last_four_card_digit}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('paymentStatusText')}</Text>
                            <Text style={styles.flatTransactionText}>{i18n.t('confirmedText')}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('orderConfirmationNumberText')}</Text>
                            <Text style={styles.flatTransactionText}>{this.state.paymentDetailData.order_id}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('dateText')}</Text>
                            <Text style={styles.flatTransactionText}>{this.dateFormatChange(this.state.paymentDetailData.created_at)}</Text>
                        </View>
                        <View style={[styles.flatTransactionMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.flatTransactionNumberText}>{i18n.t('timeText')}</Text>
                            <Text style={styles.flatTransactionText}>{this.timeFormatChange(this.state.paymentDetailData.created_at)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity testID="btnDownloadPdf" style={styles.btnDownloadButtonTransaction} onPress={()=>{this.downloadPdf()}}>
                <Text style={styles.downloadButtonTextTransaction}>{i18n.t('downloadReceiptText')}</Text>
            </TouchableOpacity>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerTransaction:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerTransaction: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewTransaction:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewTransaction:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchTransaction:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconTransaction:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleTransaction:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewTransaction:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    paymentMainViewTransaction: {
        margin: 2,
        marginBottom: 20,
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
    btnDownloadButtonTransaction:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*83/100,
        height:windowHeight*6/100,
        borderRadius:2,
        marginTop:windowWidth*5/100,
        justifyContent:'center',
        alignSelf:'center',
        position:'absolute',
        bottom:windowWidth*8/100
    },
    downloadButtonTextTransaction:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*4.5/100
    },
    flatSecondViewTransaction:{
        width:windowWidth*83/100,
        alignSelf:'center',
        paddingBottom:windowWidth*5/100
    },
    flatTransactionMainView:{
        justifyContent:'space-between',
        marginTop:windowWidth*4.5/100
    },
    flatTransactionNumberText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.7/100
    },
    flatTransactionText:{
        color:'#94A3B8',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.7/100
    },
    transactionMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*6/100
    },
    firstWidthManage:{
        width:windowWidth*40/100
    }
});
// Customizable Area End