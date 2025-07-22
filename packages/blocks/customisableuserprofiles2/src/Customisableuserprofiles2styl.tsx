import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Modal
} from "react-native";

import { profile,arrowRight,wallet,bank,languageSquare,notification,portfolioIcon,support,message,termsUse,logout,paymentMethodIcon,paymentHistoryIcon,addressIcon } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import Customisableuserprofiles2stylController, {
  Props
} from "./Customisableuserprofiles2stylController";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import globalStyle from "../../../components/src/GlobalStyle"
import TextAlignManage from '../../../components/src/TextAlignManage'
// Customizable Area End

export default class Customisableuserprofiles2styl extends Customisableuserprofiles2stylController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaMainViewFlex}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[styles.headerViewStylist,globalStyle.headerMarginManage]}>
                <View style={styles.headerTextViewStylist}>
                    <Text style={styles.headerTitleStylist}>{i18n.t('profileText')}</Text>
                </View>
            </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.mainViewContainerStylist}>
                    <View style={styles.profileMainViewStylist}>
                        <TouchableOpacity testID="btnEditProfileRedirection" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnEditProfileRedirection()}}>
                            <Image resizeMode="contain" source={profile} style={styles.listFirstIconStylist} />
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('stylistProfileText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnPortfolioRedirect" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnPortfolioRedirection()}}>
                            <Image resizeMode="contain" source={portfolioIcon} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('portfolioText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnEarningStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnStylistEarningRedirection()}}>
                            <Image resizeMode="contain" source={wallet} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('earningText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnBankDetailsStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnStylistBankRedirection()}}>
                            <Image resizeMode="contain" source={bank} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('bankDetailsText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnStylistLanguage" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.goToStylistLanguageRedirection()}}>
                            <Image resizeMode="contain" source={languageSquare} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('languageCurrencyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnNotifcationSetRedirection" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnNotSettingRedirection()}}>
                            <Image resizeMode="contain" source={notification} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('notificationSettingText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.buyerTextMainView}>
                        <Text style={[styles.buyerText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('buyerText')}</Text>
                    </View>

                    <View style={styles.profileMainViewStylist}>
                        <TouchableOpacity testID="btnStylistAddress" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnStylistAddress()}}>
                            <Image resizeMode="contain" source={addressIcon} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('AddressesText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnStylistPayment" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnStylistPaymentHistory()}}>
                            <Image resizeMode="contain" source={paymentHistoryIcon} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('paymentHistoryText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileMainViewStylist}>
                        <TouchableOpacity testID="btnGetHelpStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.getHelpRedirectionStylist()}}>
                            <Image resizeMode="contain" source={support} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('getHelpText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnFaqRedirectStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnFaqRedirection()}}>
                            <Image resizeMode="contain" source={message} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('faqText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileMainViewStylist}>
                        <TouchableOpacity testID="btnTermsOfUseStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.termsUseRedirectionStylist()}}>
                            <Image resizeMode="contain" source={termsUse} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('termsConditionsText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnPrivacyPolicyStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.privacyPolicyRedirectionStylist()}}>
                            <Image resizeMode="contain" source={termsUse} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('privacyPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnShippingPolicy" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.shippingPolicyRedirection()}}>
                            <Image resizeMode="contain" source={termsUse} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('shippingPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnReturnPolicyStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.returnPolicyRedirectionStylist()}}>
                            <Image resizeMode="contain" source={termsUse} style={styles.listFirstIconStylist}/>
                            <Text style={[styles.listViewTextStylist,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('returnPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.listViewRightIconStylist]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileMainViewStylist}>
                    <TouchableOpacity style={[styles.listViewTouchStylist, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                    testID="deleteBtn"
                    onPress={()=>{
                        this.deleteStylistModalOpen()
                    }}>
                        <Image source={profile} style={[styles.listFirstIconStylist,{ tintColor:'#F87171'}]} />
                        <Text style={styles.logoutIconStylist}>
                        {i18n.t('deleteTextWithOutSpace')}
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.profileMainViewStylist}>
                        <TouchableOpacity testID="btnLogOutStylist" style={[styles.listViewTouchStylist,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.logoutModalOpen()}}>
                            <Image resizeMode="contain" source={logout} style={styles.listFirstIconStylist}/>
                            <Text style={styles.logoutIconStylist}>{i18n.t('logOutText')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <Modal
            animationType="slide"
            transparent={true}
            testID="logoutModal"
            visible={this.state.logoutModal}>
            <View style={styles.modalMainViewStylist}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={styles.cameraModalMainViewStylistAdd}>
                    <View style={styles.modalLogoutMainView}>
                        <View style={styles.modalViewBorder}></View>
                        <View style={styles.modalLogoutView}>
                            <Text style={styles.modalLogoutText}>{i18n.t('logOutText')}</Text>
                        </View>
                        <View style={styles.modalAreYouMainView}>
                            <Text style={styles.modalAreYouSureText}>{i18n.t('areYouSureLogoutText')}</Text>
                        </View>
                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.modalBtnMainView]}>
                            <TouchableOpacity testID="btnLogoutModalStylist" style={styles.modalLogoutTouch} onPress={()=>{this.btnLogoutAndRedirectionStylist()}}>
                                <Text style={styles.modalLogoutBtnText}>{i18n.t('logoutTextWithOutSpace')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelModalStylist" style={styles.modalCancelTouch} onPress={()=>{this.logoutModalClose()}}>
                                <Text style={styles.modalCancelBtnText}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </Modal>
            <Modal
            animationType="slide"
            visible={this.state.deleteStylistModal}
            transparent={true}
           >
            <View style={styles.modalMainViewStylist}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={styles.cameraModalMainViewStylistAdd}>
                    <View style={styles.modelViewShow}>
                        <View style={styles.modelViewContent}></View>
                        <View style={styles.modelViewContentHeader}>
                            <Text style={styles.modelViewContentHeaderText}>{i18n.t('deleteTextWithOutSpace')}</Text>
                        </View>
                        <View style={styles.modelTextView}>
                            <Text style={styles.modelTextViewTitle}>{i18n.t('areYouSureDeleteText')}</Text>
                        </View>
                        <View style={{width:windowWidth*90/100,flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',alignSelf:'center',marginTop:windowWidth*4/100}}>
                            <TouchableOpacity testID="btnDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnStylistDeleteConfirm()}}>
                                <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('deleteTextBtn')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.deleteStylistModalClose()}}>
                                <Text style={{color:'#375280',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
          </Modal>
        </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}


// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },
    headerViewStylist:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerTextViewStylist:{
        backgroundColor:'#fff',
        height:windowWidth*9/100,
        alignSelf:'center',
        width:windowWidth*90/100
    },
    headerTitleStylist:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    mainViewContainerStylist:{
      width:windowWidth*90/100,
      alignSelf:'center',
      marginTop:windowWidth*3/100
    },
    
    modelTextViewTitle:{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'},
  modelTextView:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth},
  modelViewContentHeaderText:{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'},
  modelViewShow:{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100},
  modelViewContentHeader:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100},
  modelViewContent:{
    borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100
  },
    profileMainViewStylist: {
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
    },
    listViewTouchStylist:{
        height:windowHeight*7/100,
        borderBottomWidth:1,
        borderBottomColor:'#E2E8F0',
        alignItems:'center',
        paddingLeft:windowWidth*3/100
    },
    listFirstIconStylist:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    listViewTextStylist:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        marginLeft:windowWidth*4/100
    },
    listViewRightIconStylist:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        position:'absolute',
        right:10
    },
    logoutIconStylist:{
        fontSize:windowWidth*4.5/100,
        color:'#F87171',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        marginLeft:windowWidth*4/100
    },
    modalMainViewStylist:{
        flex: 1, 
        backgroundColor: '#00000030', 
        alignItems: 'center'
    },
    cameraModalMainViewStylistAdd:{
        position: 'absolute', 
        bottom:0,
        width:windowWidth
    },
    modalSecondView:{
        alignSelf: 'center',
        width:'100%'
    },
    modalSafe:{
        flex:0
    },
    modalLogoutMainView:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*28/100
    },
    modalViewBorder:{
        borderWidth:2,
        borderColor:'#F2F3F5',
        width:windowWidth*20/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
    },
    modalLogoutView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*4/100,
        marginTop:windowWidth*4/100
    },
    modalLogoutText:{
        textAlign:'center',
        fontSize:windowWidth*5.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold'
    },
    modalAreYouMainView:{
        borderBottomWidth:1,
        borderBottomColor:'#E3E4E5',
        height:windowHeight*8/100,
        marginTop:windowWidth*5/100,
        padding:5,
        alignSelf:'center',
        width:windowWidth
    },
    modalAreYouSureText:{
        textAlign:'center',
        color:'#375280',
        fontSize:windowWidth*4.7/100,
        fontFamily:'Lato-Regular',
        width:windowWidth*70/100,
        alignSelf:'center'
    },
    modalBtnMainView:{
        width:windowWidth*90/100,
        justifyContent:'space-between',
        alignSelf:'center',
        marginTop:windowWidth*4/100
    },
    modalLogoutTouch:{
        width:windowWidth*42/100,
        backgroundColor:'#F87171',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center'
    },
    modalLogoutBtnText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
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
    modalCancelBtnText:{
        color:'#375280',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    buyerTextMainView:{
        marginBottom:windowWidth*3/100,
        marginLeft:windowWidth*1/100
    },
    buyerText:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.8/100
    },
    safeAreaMainViewFlex:{
        flex:0
    }
});
// Customizable Area End
