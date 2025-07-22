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


import { profile,arrowRight,wallet,bank,languageSquare,notification,adminRequest,support,message,termsUse,shipping,returnIcon, lock, logout } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Customisableuserprofiles2sellerprofileController, {
  Props
} from "./Customisableuserprofiles2sellerprofileController";
import globalStyle from "../../../components/src/GlobalStyle"
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class Customisableuserprofiles2sellerprofile extends Customisableuserprofiles2sellerprofileController {
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
            <SafeAreaView style={{flex:0}}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[styles.headerView,globalStyle.headerMarginManage]}>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerTitle}>{i18n.t('profileText')}</Text>
                </View>
            </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.mainViewContainer}>
                    <View style={styles.profileMainView}>
                        <TouchableOpacity testID="myProfileBtn" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.profileScreenRedirection()}}>
                            <Image resizeMode="contain" source={profile} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('myProfileText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnEarningRedirection" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnEarningRedirection()}}>
                            <Image resizeMode="contain" source={wallet} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('earningText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnBankRedirection" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnBankRedirection()}}>
                            <Image resizeMode="contain" source={bank} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('bankDetailsText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnLanguageRedirect" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnLanguageRedirection()}}>
                            <Image resizeMode="contain" source={languageSquare} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('languageCurrencyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnNotificationStatusRedirection" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.notificationStatusRedirection()}}>
                            <Image resizeMode="contain" source={notification} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('notificationsText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnAdminRequest" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.adminRequestRedirection()}}>
                            <Image resizeMode="contain" source={adminRequest} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('adminRequestText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileMainView}>
                        <TouchableOpacity testID="btnGetHelp" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.getHelpRedirection()}}>
                            <Image resizeMode="contain" source={support} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('getHelpText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnFaqRedirect" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.faqRedirection()}}>
                            <Image resizeMode="contain" source={message} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('faqText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileMainView}>
                        <TouchableOpacity testID="btnTermsOfUse" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.termsUseRedirection()}}>
                            <Image resizeMode="contain" source={termsUse} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('termsConditionsText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnPrivacyPolicy" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.privacyPolicyRedirection()}}>
                            <Image resizeMode="contain" source={lock} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('privacyPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnShippingPolicy" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.shippingPolicyRedirection()}}>
                            <Image resizeMode="contain" source={shipping} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('shippingPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnReturnPolicy" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.returnPolicyRedirection()}}>
                            <Image resizeMode="contain" source={returnIcon} style={styles.listFirstIcon}/>
                            <Text style={[styles.listViewText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('returnPolicyText')}</Text>
                            <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileMainView}>
                        <TouchableOpacity style={[styles.listViewTouch, { borderBottomWidth: 0,flexDirection:FlexConditionManage(i18n.language) }]}
                        testID="deleteBtn"
                        onPress={()=>{
                            this.deleteSellerModalOpen()
                        }}>
                            <Image source={profile} style={[styles.listFirstIcon,{ tintColor:'#F87171'}]} />
                            <Text style={[styles.logoutIcon,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>
                            {i18n.t('deleteTextWithOutSpace')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileMainView}>
                        <TouchableOpacity testID="btnLogOutWork" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.setState({logoutModal:true})}}>
                            <Image resizeMode="contain" source={logout} style={styles.listFirstIcon}/>
                            <Text style={[styles.logoutIcon,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{i18n.t('logOutText')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>

          
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.logoutModal}>
            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                <View style={styles.cameraModalMainViewAdd}>
                    <View style={styles.modalMainViewLogount}>
                        <View style={styles.modalLogoutBorder}></View>
                        <View style={styles.modalLogoutTextView}>
                            <Text style={styles.modalLogoutText}>{i18n.t('logOutText')}</Text>
                        </View>
                        <View style={styles.modalAreYouSureView}>
                            <Text style={styles.modalAreYouSureText}>{i18n.t('areYouSureLogoutText')}</Text>
                        </View>
                        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.modalMainButtonBothView]}>
                            <TouchableOpacity testID="btnLogoutModal" style={styles.modalLogoutBtnTouch} onPress={()=>{this.btnLogoutAndRedirection()}}>
                                <Text style={styles.logounBtnText}>{i18n.t('logoutTextWithOutSpace')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelLogoutModal" style={styles.modalCancelBtnTouch} onPress={()=>{this.setState({logoutModal:false})}}>
                                <Text style={styles.modalCancelBtnText}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <Modal
            animationType="slide"
            visible={this.state.deleteSellerModal}
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
                            <TouchableOpacity testID="btnDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnSellerDeleteConfirm()}}>
                                <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>{i18n.t('deleteTextBtn')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCancelDeleteModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.deleteSellerModalClose()}}>
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
    headerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerTextView:{
        backgroundColor:'#fff',
        height:windowWidth*9/100,
        alignSelf:'center',
        width:windowWidth*90/100
    },
    headerTitle:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    mainViewContainer:{
      width:windowWidth*90/100,
      alignSelf:'center',
      marginTop:windowWidth*3/100
    },
    profileMainView: {
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
    listViewTouch:{
        height:windowHeight*7/100,
        borderBottomWidth:1,
        borderBottomColor:'#E2E8F0',
        alignItems:'center',
        paddingLeft:windowWidth*3/100
    },
    listFirstIcon:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    listViewText:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
    },
    listViewRightIcon:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        position:'absolute',
        right:10
    },
    logoutIcon:{
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
    modelTextViewTitle:{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'},
  modelTextView:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth},
  modelViewContentHeaderText:{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'},
  modelViewShow:{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100},
  modelViewContentHeader:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100},
  modelViewContent:{
    borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100
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
    modalMainViewLogount:{
        backgroundColor:'#fff',
        width:'100%',
        alignSelf:'center',
        height:windowHeight*28/100
    },
    modalLogoutBorder:{
        borderWidth:2,
        borderColor:'#F2F3F5',
        width:windowWidth*20/100,
        alignSelf:'center',
        marginTop:windowWidth*3/100
    },
    modalLogoutTextView:{
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
    modalAreYouSureView:{
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
    modalLogoutBtnTouch:{
        width:windowWidth*42/100,
        backgroundColor:'#F87171',
        height:windowHeight*5.5/100,
        alignItems:'center',
        justifyContent:'center'
    },
    logounBtnText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*4.5/100,
        fontFamily:'Lato-Bold'
    },
    modalCancelBtnTouch:{
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
    modalMainButtonBothView:{
        width:windowWidth*90/100,
        justifyContent:'space-between',
        alignSelf:'center',
        marginTop:windowWidth*4/100
    }
});
// Customizable Area End
