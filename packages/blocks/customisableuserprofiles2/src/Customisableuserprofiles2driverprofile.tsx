import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal
} from "react-native";

// Merge Engine - import assets - Start
import * as IMG_CONST from './assets'
// Merge Engine - import assets - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

import Customisableuserprofiles2driverprofileController, {
  Props
} from "./Customisableuserprofiles2driverprofileController";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

export default class Customisableuserprofiles2driverprofile extends Customisableuserprofiles2driverprofileController {
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
      <SafeAreaView style={styles.profileAreaContainerProfile}>
        {this.state.loading &&
          <CustomLoader />
        }
        <View style={styles.con}>
          <View style={styles.headerconProfile}>
            <Text style={styles.headertextProfile}>{i18n.t('profileText')}</Text>
            <View />
          </View>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.orderconProfile} >
              <Text style={[styles.headTextProfile,{textAlign:TextAlignManage(i18n.language)}]}>
              {i18n.t('myDetailsText')}
              </Text>
              <View style={[styles.tabconProfile,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity style={styles.tabButtonProfile} testID="btnAddVehicleRedirection" onPress={()=>{this.btnAddVehicleRedirection()}}>
                  <View style={styles.imgconProfile}>
                    <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                    <Image source={IMG_CONST.vehicleIcon} style={styles.tabCenterIconProfile} />
                  </View>
                  <Text style={styles.tabTextProfile}>
                  {i18n.t('vehiclesText')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity testID="btnRedirectionDocuments" style={[styles.tabButtonProfile,styles.manageMarginLeft]} onPress={()=>{this.goToDocumentsRedirection()}}>
                  <View style={styles.imgconProfile}>
                    <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                    <Image source={IMG_CONST.documentIcon} style={styles.tabCenterIconProfile} />
                  </View>
                  <Text style={styles.tabTextProfile}>
                  {i18n.t('documentsText')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity testID="btnEarningRedirect" style={styles.tabButtonProfile} onPress={()=>{this.btnRedirectEarningActivity()}}>
                  <View style={styles.imgconProfile}>
                    <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                    <Image source={IMG_CONST.earningIcon} style={styles.tabCenterIconProfile} />
                  </View>
                  <Text style={styles.tabTextProfile}>
                  {i18n.t('earningActivityText')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonconProfile}>
              <TouchableOpacity style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]}
              testID="myProfileBtnRedirection" onPress={()=>{this.driverProfileRedirection()}}>
                <Image source={IMG_CONST.profile} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('myProfileText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity testID="btnPaymentMethodRedirect" 
                style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectPaymentMethodDriver()}}>
                <Image source={IMG_CONST.bank} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('paymentMethodsText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity testID="btnEditAddress" style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]}onPress={()=>{this.btnEditAddressRedirection()}}>
                <Image source={IMG_CONST.addressIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('editAddressesText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchButtonStyleProfile, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
              testID="languageCurrencyBtn" onPress={() => this.goToLanguageRedirection()}>
                <Image source={IMG_CONST.earningIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('languageCurrencyText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonconProfile}>
              <TouchableOpacity style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]} testID="contactUsRedirectionBtn"
               onPress={() => this.btnContactUsRedirection()}>
                <Image source={IMG_CONST.customerService} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('customerSupportText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchButtonStyleProfile, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]} testID="faqRedirectionBtn"
               onPress={() => this.btnFAQRedirection()}>
                <Image source={IMG_CONST.faqIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('faqText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonconProfile}>
              <TouchableOpacity style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]} 
               testID="termAndConditionBtn"
               onPress={() => this.btnTermConditionRedirection()}
              >
                <Image source={IMG_CONST.termsUse} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('termsConditionsText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="btnPrivacyPolicy"
              onPress={() => this.btnPrivacyPolicyRedirection()}>
                <Image source={IMG_CONST.termsUse} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('privacyStatementText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity testID="productPolicyBtnRedirection" style={[styles.touchButtonStyleProfile,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.driverPolicyRedirection('Product Delivered Policy')}}>
                <Image source={IMG_CONST.termsUse} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('productPolicyText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity testID="payoutPolicyBtnRedirection" style={[styles.touchButtonStyleProfile, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]} onPress={()=>{this.driverPolicyRedirection('Payout Policy')}}>
                <Image source={IMG_CONST.termsUse} style={styles.buttonIconCon} />
                <Text style={[styles.buttonTextProfile,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                {i18n.t('payoutPolicyText')}
                </Text>
                <Image source={IMG_CONST.arrowRight} style={[styles.profileIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonconProfile}>
              <TouchableOpacity style={[styles.touchButtonStyleProfile, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
              testID="deleteBtn"
              onPress={()=>{
                this.deleteDriverModalOpen()
              }}>
                <Image source={IMG_CONST.profile} style={[styles.buttonIconCon,{ tintColor:'#F87171'}]} />
                <Text style={styles.logoutText}>
                {i18n.t('deleteTextWithOutSpace')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonconProfile}>
              <TouchableOpacity style={[styles.touchButtonStyleProfile, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
              testID="logoutBtnDriver"
              onPress={()=>{
                this.logOutModalOpen()
              }}>
                <Image source={IMG_CONST.logout} style={styles.buttonIconCon} />
                <Text style={styles.logoutText}>
                {i18n.t('logOutText')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            testID="logoutModal"
            visible={this.state.logoutModal}>
            <View style={styles.modalMainViewDriver}>
                <SafeAreaView style={styles.modalSafeDriver}></SafeAreaView>
                <View style={styles.cameraModalMainViewDriverAdd}>
                    <View style={styles.logOutMainView}>
                        <View style={styles.logoutBorderView}></View>
                        <View style={styles.logoutView}>
                            <Text style={styles.logoutModalText}>{i18n.t('logOutText')}</Text>
                        </View>
                        <View style={styles.areYouSureView}>
                            <Text style={styles.areYouSureText}>{i18n.t('areYouSureLogoutText')}</Text>
                        </View>
                        <View style={[styles.logoutBtnMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnLogoutModal" style={styles.logoutTouchBtn} onPress={()=>{this.btnLogoutConfirmDriver()}}>
                                <Text style={styles.logoutBtnTouchText}>{i18n.t('logoutTextWithOutSpace')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelLogoutModal" style={styles.logoutBtnCancelTouch} onPress={()=>{this.logOutModalClose()}}>
                                <Text style={styles.logoutBtnCancelTouchText}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={this.state.deleteDriverModal}
            transparent={true}
           >
            <View style={styles.modalMainViewDriver}>
                <SafeAreaView style={styles.modalSafeDriver}></SafeAreaView>
                <View style={styles.cameraModalMainViewDriverAdd}>
                    <View style={styles.modelViewShow}>
                        <View style={styles.modelViewContent}></View>
                        <View style={styles.modelViewContentHeader}>
                            <Text style={styles.modelViewContentHeaderText}>{i18n.t('deleteTextWithOutSpace')}</Text>
                        </View>
                        <View style={styles.modelTextView}>
                            <Text style={styles.modelTextViewTitle}>{i18n.t('areYouSureDeleteText')}</Text>
                        </View>
                        <View style={{width:windowWidth*90/100,flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',alignSelf:'center',marginTop:windowWidth*4/100}}>
                            <TouchableOpacity testID="btnDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnDriverDeleteConfirm()}}>
                                <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('deleteTextBtn')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.deleteDriverModalClose()}}>
                                <Text style={{color:'#375280',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  profileAreaContainerProfile: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1
  },
  con: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerconProfile: {
    alignItems: 'center',
    marginBottom: 15,
    width: windowWidth
  },
  headertextProfile: {
    fontFamily: 'Avenir-Heavy',
    fontSize: Scale(20),
    fontWeight: '800',
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -30
  },
  orderconProfile: {
    paddingBottom: 4,
    width: '100%',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 2,
    marginBottom: 30
  },
  headTextProfile: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: '700',
    color: '#375280',
  },
  tabconProfile: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tabButtonProfile: {
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  imgconProfile: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgTabBG: {
    width: 60,
    height: 60,
  },
  tabCenterIconProfile: {
    position: 'absolute',
    width: 24,
    height: 24,
  },
  tabTextProfile: {
    fontSize: 14,
    fontWeight: '500',
    color: '#375280',
    paddingTop: 14,
  },
  buttonconProfile: {
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
  touchButtonStyleProfile: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 2,
  },
  buttonIconCon: {
    width: 24,
    height: 24,
  },
  loIconCon:{
    width: 23,
    height: 23,
  },
  buttonTextProfile: {
    fontSize:windowWidth*4.5/100,
    color:'#375280',
    fontFamily:'Lato-Regular',
    fontWeight:'500'
  },
  profileIconImg: {
    width: 24,
    height: 24,
    position:'absolute',
    right:10,
  },
  logoutText:{
    fontSize:windowWidth*4.5/100,
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    marginLeft:windowWidth*4/100
  },
  modelTextViewTitle:{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'},
  modelTextView:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth},
  modelViewContentHeaderText:{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'},
  modelViewShow:{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100},
  modelViewContentHeader:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100},
  modelViewContent:{
    borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100
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
    height:windowHeight*28/100
  },
  logoutBorderView:{
    borderWidth:2,
    borderColor:'#F2F3F5',
    width:windowWidth*20/100,
    alignSelf:'center',
    marginTop:windowWidth*3/100
  },
  logoutView:{
    borderBottomWidth:1,
    borderBottomColor:'#E3E4E5',
    height:windowHeight*4/100,
    marginTop:windowWidth*4/100
  },
  logoutModalText:{
    textAlign:'center',
    fontSize:windowWidth*5.5/100,
    color:'#375280',
    fontFamily:'Lato-Bold'
  },
  areYouSureView:{
    borderBottomWidth:1,
    borderBottomColor:'#E3E4E5',
    height:windowHeight*8/100,
    marginTop:windowWidth*5/100,
    padding:5,
    alignSelf:'center',
    width:windowWidth
  },
  areYouSureText:{
    textAlign:'center',
    color:'#375280',
    fontSize:windowWidth*4.7/100,
    fontFamily:'Lato-Regular',
    width:windowWidth*70/100,
    alignSelf:'center'
  },
  logoutBtnMainView:{
    width:windowWidth*90/100,
    justifyContent:'space-between',
    alignSelf:'center',
    marginTop:windowWidth*4/100
  },
  logoutTouchBtn:{
    width:windowWidth*42/100,
    backgroundColor:'#F87171',
    height:windowHeight*5.5/100,
    alignItems:'center',
    justifyContent:'center'
  },
  logoutBtnTouchText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:windowWidth*4.5/100,
    fontFamily:'Lato-Bold'
  },
  logoutBtnCancelTouch:{
    width:windowWidth*42/100,
    backgroundColor:'#ffffff',
    height:windowHeight*5.5/100,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  logoutBtnCancelTouchText:{
    color:'#375280',
    textAlign:'center',
    fontSize:windowWidth*4.5/100,
    fontFamily:'Lato-Bold'
  },
  manageMarginLeft:{
    marginLeft:windowWidth*4/100
  }
});
// Customizable Area End
