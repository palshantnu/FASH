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
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

import Settings2Controller, {
  Props
} from "./Settings2Controller";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

export default class Settings2 extends Settings2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // console.log("languageUpdate",i18n.getLanguage())
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.profileAreaContainer}>
        {this.state.isLoading &&
          <CustomLoader />
        }
        <View style={styles.con}>
          <View style={styles.headercon}>
            <Text style={styles.headertext}>{i18n.t('profileText')}</Text>
            <View />
          </View>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {
              this.state.token !== '' &&
              <View style={styles.ordercon} >
                <Text style={[styles.headText,{textAlign:TextAlignManage(i18n.language)}]}>
                {i18n.t('myOrderText')}
                </Text>
                <View style={[styles.tabcon,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <TouchableOpacity style={styles.tabButton}
                  testID='processingID' onPress={()=>{this.orderPageRedirection('Processing')}}>
                    <View style={styles.imgcon}>
                      <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                      <Image source={IMG_CONST.allOrderIcon} style={styles.tabCenterIcon} />
                    </View>
                    <Text style={styles.tabText}>
                    {i18n.t('processingText')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabButton}
                    testID='deliveredID' onPress={()=>{this.orderPageRedirection('Delivered')}}>
                    <View style={styles.imgcon}>
                      <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                      <Image source={IMG_CONST.deliveryIcon} style={styles.tabCenterIcon} />
                    </View>
                    <Text style={styles.tabText}>
                    {i18n.t('deliveredText')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabButton}
                  testID='returnsID' onPress={()=>{this.orderPageRedirection('Returned')}}>
                    <View style={styles.imgcon}>
                      <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                      <Image source={IMG_CONST.returnIcon} style={styles.tabCenterIcon} />
                    </View>
                    <Text style={styles.tabText}>
                    {i18n.t('returnsText')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tabButton}
                  testID='allOrdersID' onPress={()=>{this.goToAllOrderRedirection()}}>
                    <View style={styles.imgcon}>
                      <Image source={IMG_CONST.tabBg} style={styles.imgTabBG} />
                      <Image source={IMG_CONST.allOrderIcon} style={styles.tabCenterIcon} />
                    </View>
                    <Text style={styles.tabText}>
                    {i18n.t('allOrdersText')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            <View style={styles.buttoncon}>
              {
                this.state.token !== '' && 
                <>
                <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="myProfileBtnId"
                onPress={() => this.myProfileNav()}
                >
                  <Image source={IMG_CONST.profile} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('myProfileText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                  testID="savedCardsID"
                  onPress={this.goToSavedCards}
                >
                  <Image source={IMG_CONST.card} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('savedCardsText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{this.loyatyRedirection()}} style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                  testID="loyaltyPointsId">
                  <Image source={IMG_CONST.loyaltyPoint}  style={[styles.loIconCon,{padding:3,resizeMode:'contain'}]} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('loyaltyPointsText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="stylistID" onPress={()=>{this.btnRedirectFavStylist()}}>
                  <Image source={IMG_CONST.stylish} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('favStylistText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="addressesID"
                onPress={() => this.goToAdress()}
                >
                  <Image source={IMG_CONST.address} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('AddressesText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]} testID="paymentHistoryID" onPress={()=>{this.goToPaymentHistory()}}>
                  <Image source={IMG_CONST.paymentIcon} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('paymentHistoryText')}
                  </Text>
                  <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </TouchableOpacity>
                </>
              }

              <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
              testID="languageCurrencyBtn"
              onPress={() => this.goToLanguageRedirection()}>
                <Image source={IMG_CONST.languageCurrencyIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('languageCurrencyText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttoncon}>
              <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
              testID="customerServiceID"
              onPress={()=>{this.nevContactus()}} >
                <Image source={IMG_CONST.customerService} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('customerServiceText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
              testID="faqID"
              onPress={()=>{
                this.nevFAQ()
              }
              } >
                <Image source={IMG_CONST.faq} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('faqText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>

            <View style={styles.buttoncon}>
              <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]} 
               testID="goToTNCId"
               onPress={() => this.goToTNC()}
              >
                <Image source={IMG_CONST.policyIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('termsConditionsText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="goToPnCId"
              onPress={() => this.goToPnc()}>
                <Image source={IMG_CONST.policyIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('privacyStatementText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchButtonStyle,{flexDirection:FlexConditionManage(i18n.language)}]} 
                testID="goToShippingPlcyID"
              onPress={() => this.goToShippingPlcy()}>
                <Image source={IMG_CONST.policyIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('shippingPolicyText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                testID="goToReturnPlcyId"
              onPress={() => this.goToReturnPlcy()}>
                <Image source={IMG_CONST.policyIcon} style={styles.buttonIconCon} />
                <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                {i18n.t('returnPolicyText')}
                </Text>
                <Image source={IMG_CONST.BackIcon} style={[styles.forIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
            </View>
            {
              this.state.token !== '' ?
              <>
                <View style={styles.buttoncon}>
                  <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                  testID="deleteBtn"
                  onPress={()=>{
                    this.deleteModalOpen()
                  }}>
                    <Image source={IMG_CONST.profile} style={[styles.buttonIconCon,{ tintColor:'#F87171'}]} />
                    <Text style={[styles.logoutText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                    {i18n.t('deleteTextWithOutSpace')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttoncon}>
                  <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                  testID="logoutBtn"
                  onPress={()=>{
                    this.logOutModalOpen()
                  }}>
                    <Image source={IMG_CONST.logoutIcon} style={styles.buttonIconCon} />
                    <Text style={[styles.logoutText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                    {i18n.t('logOutText')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </> :
              <View style={styles.buttoncon}>
                <TouchableOpacity style={[styles.touchButtonStyle, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                testID="loginBtn"
                onPress={this.loginAction}>
                  <Image source={IMG_CONST.loginIcon} style={styles.buttonIconCon} />
                  <Text style={[styles.buttonText,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
                  {i18n.t('login')}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.logoutModal}>
            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={{ position: 'absolute',  bottom:0, width:windowWidth}}>
                    <View style={{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100}}>
                        <View style={{borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100}}></View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100}}>
                            <Text style={{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'}}>{i18n.t('logoutTextWithOutSpace')}</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth}}>
                            <Text style={{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'}}>{i18n.t('areYouSureLogoutText')}</Text>
                        </View>
                        <View style={{width:windowWidth*90/100,flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',alignSelf:'center',marginTop:windowWidth*4/100}}>
                            <TouchableOpacity testID="btnLogoutModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnLogoutConfirm()}}>
                                <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('logoutTextWithOutSpace')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelLogoutModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.logOutModalClose()}}>
                                <Text style={{color:'#375280',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={this.state.deleteModal}
            transparent={true}
           >
            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={styles.cameraModalMainViewAdd}>
                    <View style={styles.modelViewShow}>
                        <View style={styles.modelViewContent}></View>
                        <View style={styles.modelViewContentHeader}>
                            <Text style={styles.modelViewContentHeaderText}>{i18n.t('deleteTextWithOutSpace')}</Text>
                        </View>
                        <View style={styles.modelTextView}>
                            <Text style={styles.modelTextViewTitle}>{i18n.t('areYouSureDeleteText')}</Text>
                        </View>
                        <View style={{width:windowWidth*90/100,flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',alignSelf:'center',marginTop:windowWidth*4/100}}>
                            <TouchableOpacity testID="btnDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnDeleteConfirm()}}>
                                <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('deleteTextBtn')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.deleteModalClose()}}>
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
  profileAreaContainer: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1
  },
  con: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headercon: {
    alignItems: 'center',
    marginBottom: 15,
    width: '100%'
  },
  modelTextViewTitle:{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'},
  modelTextView:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth},
  modelViewContentHeaderText:{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'},
  modelViewShow:{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100},
  modelViewContentHeader:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100},
  modelViewContent:{
    borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100
  },
  backIconImg: {
    width: Scale(32),
    height: Scale(32),
    tintColor: '#475569',
    marginLeft: Scale(-5),
    transform: [{ rotate: '180deg' }],
  },
  headertext: {
    fontFamily: 'Avenir-Heavy',
    fontSize: Scale(20),
    fontWeight: '800',
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -30
  },
  ordercon: {
    paddingBottom: 4,
    width: '100%',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 2,
    marginBottom: 30
  },
  headText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: '700',
    color: '#375280',
  },
  tabcon: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tabButton: {
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  imgcon: {
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
  tabCenterIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#375280',
    paddingTop: 14,
  },
  buttoncon: {
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
  touchButtonStyle: {
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
  buttonText: {
    fontSize:windowWidth*4.5/100,
    color:'#375280',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    marginLeft:windowWidth*4/100
  },
  forIconImg: {
    width: 24,
    height: 24,
    position:'absolute',
    right:10,
  },
  logoutText:{
    fontSize:windowWidth*4.5/100,
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontWeight:'500'
  },
  modalMainView:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  cameraModalMainViewAdd:{
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
});
// Customizable Area End
