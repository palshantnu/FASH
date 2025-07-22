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
  TextInput,
  FlatList,
  Keyboard,
  Modal
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,searchIcon } from "./assets";
import { BuyerPaymentResponseProps } from "./types/types";
import TappaymentsBuyerHistoryController, { Props } from "./TappaymentsBuyerHistoryController";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import globalStyle from "../../../components/src/GlobalStyle"
import PriceConvertValueNumber from "../../../components/src/PriceConvertValueNumber";
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class TappaymentsBuyerHistory extends TappaymentsBuyerHistoryController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllPaymentHistory = (itemAllOrder:BuyerPaymentResponseProps,indexOrder:number)=>{
        let value = itemAllOrder;
        return (
            <View style={styles.paymentMainView}>
                <View style={styles.flatSecondView}>
                    <View style={[styles.flatOrderMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.flatOrderNumberText}>#{value.order_id}</Text>
                        <Text style={styles.flatPaymentText}>{PriceConvertValueNumber(value.amount,this.state.localLanguageGet)}</Text>
                    </View>
                    <Text style={[styles.flatCompleteText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('completed')}</Text>
                    <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.flatOrderMainView]}>
                        <View style={styles.flatDateView}>
                            <Text style={[styles.flatDateText,{textAlign:TextAlignManage(i18n.language)}]}>{this.dateFormatChangeOrder(value.created_at)}</Text>
                        </View>
                        <View style={[styles.flatButtonMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnPaymentDetailRedirect" onPress={()=>{this.paymentDetailRedirect(value)}}>
                                <Text style={styles.flatViewText}>{i18n.t('viewCapitalText')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnPaymentDelete" onPress={()=>{this.deleteModalOpen(value.id)}}>
                                <Text style={styles.flatDeleteText}>{i18n.t('deleteCapitalText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity testID="btnDownloadReceipt" style={styles.btnDownloadButton} onPress={()=>{this.downloadReceipt(value.url)}}>
                        <Text style={styles.downloadButtonText}>{i18n.t('downloadReceiptText')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerPayment}>
            <SafeAreaView style={styles.safeViewContainerPayment}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewPayment,globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewPayment,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackPaymentHistory" style={styles.backTouchPayment} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconPayment,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitlePayment}>{i18n.t('paymentHistoryText')}</Text>
                    </View>
                    <View style={styles.extraViewPayment}>
                    </View>
                </View>
            </View>

            <View
              style={[
                styles.allPaymentViewContainer,
                { marginTop: (windowWidth * 3) / 100,flexDirection:FlexConditionManage(i18n.language) }
              ]}>
              <View style={[styles.searchIconCssPayment,{right:ManageDynamicMargin(i18n.language,(windowWidth * 3) / 100,undefined),left:ManageDynamicMargin(i18n.language,undefined,(windowWidth * 3) / 100)}]}>
                <Image
                  source={searchIcon}
                  style={styles.backIconPayment}
                ></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_payment"}
                  onChangeText={(txtSearch) => {
                    this.checkSpecialCharacter(txtSearch);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.searchBuyerOrder()
                  }}
                  placeholder={i18n.t('search')}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinputPayment,{textAlign:TextAlignManage(i18n.language)}]}
                  value={this.state.orderSearchTxt}
                />
              </View>
            </View>

            <View style={styles.storeCreateMainViewPayment}>
                <FlatList
                testID={"paymentAllStatusDataList"}
                bounces={false}
                data={this.state.allPaymentHistoryArr}
                contentContainerStyle={styles.flatContainerPayment}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyViewPayment}>
                        <Text style={styles.emptyFlatlistTextPayment}>
                        {i18n.t('noPaymentHistoryFoundText')}
                        </Text>
                      </View>
                    ) : null
                }
                renderItem={({item,index}) => this.getAllPaymentHistory(item,index)}
                keyExtractor={(item) => item.id}
                />
                
            </View>

            <Modal
            testID="btnCancelModal"
            animationType="slide"
            transparent={true}
            visible={this.state.deletePaymentModal}>

            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafeArea} />

                <View style={styles.modalButtonMainView}>
                <Text style={styles.cancelOrderText}>
                {i18n.t('areYouSureDeleteModalText')}
                </Text>

                <View style={[styles.modalTwoBtnView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity
                    testID={"btnCancelPaymentNo"}
                    style={styles.cancelTouch}
                    onPress={() => {
                        this.deleteModalClose()
                    }}>
                    <Text style={styles.noText}>{i18n.t('No')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    testID="btnDeletePaymentYes"
                    style={styles.yesTouch}
                    onPress={() => {
                        this.deletepaymentConfirm()
                    }}>
                    <Text style={styles.yesText}>{i18n.t('Yes')}</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerPayment:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerPayment: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewPayment:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewPayment:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchPayment:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconPayment:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitlePayment:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewPayment:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewPayment:{
        marginTop:windowWidth*4/100,
        width:windowWidth*90/100,
        alignSelf:'center',
    },
    flatContainerPayment:{
        paddingBottom:windowWidth*50/100
    },
    searchIconCssPayment: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
        position: "absolute",
        marginTop: (windowWidth * 4) / 100,
    },
    searchTextinputPayment: {
        width: (windowWidth * 80) / 100,
        height: (windowHeight * 6) / 100,
        padding: 10,
        color: "#375280",
        marginLeft: (windowWidth * 7) / 100,
    },
    allPaymentViewContainer: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
    },
    emptyLisyViewPayment: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistTextPayment: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    paymentMainView: {
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
    btnDownloadButton:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*83/100,
        height:windowHeight*6/100,
        borderRadius:2,
        marginTop:windowWidth*5/100,
        justifyContent:'center',
        alignSelf:'center',
    },
    downloadButtonText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*4.5/100
    },
    flatSecondView:{
        width:windowWidth*83/100,
        alignSelf:'center',
        paddingBottom:windowWidth*5/100
    },
    flatOrderMainView:{
        justifyContent:'space-between',
        marginTop:windowWidth*3/100
    },
    flatOrderNumberText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*4/100
    },
    flatPaymentText:{
        color:'#059669',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.3/100
    },
    flatCompleteText:{
        color:'#059669',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.5/100,
        marginTop:windowWidth*3/100
    },
    flatDateView:{
        width:windowWidth*42/100
    },
    flatDateText:{
        color:'#94A3B8',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.5/100
    },
    flatButtonMainView:{
        justifyContent:'space-between',
        width:windowWidth*30/100
    },
    flatViewText:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.9/100
    },
    flatDeleteText:{
        color:'#DC2626',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.9/100
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
        height: (windowHeight * 22) / 100,
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: (windowWidth * 7) / 100,
        justifyContent: "space-between",
    },
    cancelOrderText:{
        fontSize: (windowWidth * 4.3) / 100,
        color: "#375280",
        textAlign:'center',
        fontFamily:'Lato-Bold'
    },
    modalTwoBtnView:{
        justifyContent: "space-between",
    },
    cancelTouch:{
        backgroundColor: "#FFFFFF",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
        borderWidth:1,
        borderColor:'#CCBEB1'
    },
    noText:{
        textAlign: "center",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
        color:'#375280'
    },
    yesTouch:{
        backgroundColor: "#CCBEB1",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
    },
    yesText:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
    }
});
// Customizable Area End