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
import { backIcon,oneIcon,twoIcon,thirdIcon,profileDemoIcon } from "./assets";

import CustomformDriverProfilePhotoController, { Props } from "./CustomformDriverProfilePhotoController";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformDriverProfilePhoto extends CustomformDriverProfilePhotoController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewStoreUpload,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackDriverPhotoUpload" style={styles.backTouchStoreUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconStoreBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleStoreUpload}>{i18n.t('profilePhotoText')}</Text>
              </View>
              <View style={styles.extraViewStoreUpload}>
              </View>
          </View>

            <View style={styles.mainViewMargin}>
                {
                    this.state.selectImage === '' ?
                    <View style={styles.afterImageMarginView}>
                        <View style={styles.profileIconView}>
                            <Image source={profileDemoIcon} style={styles.profileImageIcon}></Image>
                        </View>
                        <View style={styles.photoTextView}>
                            <Text style={styles.photoText}>{i18n.t('driverPhotoSubTitleText')}</Text>
                        </View>
                        <View style={styles.numberMainView}>
                            <View style={[styles.numberView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Image source={oneIcon} style={styles.numberIcon}></Image>
                                <View style={{marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100)}}>
                                    <Text style={[styles.numberTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('goodLightText')}</Text>
                                    <Text style={[styles.numberSubTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('makeSureEarsUncoveredText')}</Text>
                                </View>
                            </View>
                            <View style={[styles.numberView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Image source={twoIcon} style={styles.numberIcon}></Image>
                                <View style={{marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100)}}>
                                    <Text style={[styles.numberTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('lookStraightText')}</Text>
                                    <Text style={[styles.numberSubTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('holdPhoneEyeStraightText')}</Text>
                                </View>
                            </View>
                            <View style={[styles.numberView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Image source={thirdIcon} style={styles.numberIcon}></Image>
                                <View style={{marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100)}}>
                                    <Text style={[styles.numberTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('faceText')}</Text>
                                    <Text style={[styles.numberSubTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('makeSureFaceText')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View>
                        <View testID="btnAttachmentOpen" style={styles.uploadStoreImageView}>
                            <Image source={{uri:this.state.selectImage}} style={styles.uploadStoreImageView}></Image>
                        </View>
                        <View style={styles.manageMarginTop}>
                            <TouchableOpacity testID="btnRetakePhoto" style={styles.btnCancelButton} onPress={()=>{this.Camerapopen()}}>
                                <Text style={styles.cancelButtonText}>{i18n.t('Retake Photo')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View>
        <View style={styles.btnContactMargin}>
            {
                this.state.selectImage === '' ?
                <TouchableOpacity testID="btnOpenCamera" style={styles.btnNextButton} onPress={()=>{this.Camerapopen()}}>
                    <Text style={styles.nextButtonText}>{i18n.t('openCameraText')}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity testID="btnSubmitPhoto" style={styles.btnNextButton} onPress={()=>{this.uploadProfilePhoto()}}>
                    <Text style={styles.nextButtonText}>{i18n.t('submitText')}</Text>
                </TouchableOpacity>
            }
        </View>

      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeViewContainer:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerViewStoreUpload:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewStoreUpload:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchStoreUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconStoreBack:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleStoreUpload:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewStoreUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  uploadStoreHeaderActiveView:{
    width:windowWidth*90/100,
    height:windowHeight*10/100
  },
  uploadStoreImageView:{
    width:windowWidth*90/100,
    height:windowHeight*40/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  btnContactMargin:{
    width:windowWidth*90/100,
    marginTop:windowWidth*8/100,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
    bottom:windowWidth*10/100,
    alignSelf:'center'
  },
  btnCancelButton:{
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  cancelButtonText:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  btnNextButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center'
  },
  nextButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  storeCreateMainView:{
    marginTop:windowWidth*10/100
  },
  labelText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  emailTextInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  storeDescriptionInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 15) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorView:{
    marginTop:windowWidth*1/100
  },
  errorText:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  mainViewMargin:{
    marginTop:windowWidth*5/100
  },
  afterImageMarginView:{
    marginTop:windowHeight*6/100
  },
  profileIconView:{
    width:windowWidth*89/100,
    height:windowWidth*35/100,
    alignItems:'center'
  },
  profileImageIcon:{
    width:windowWidth*35/100,
    height:windowWidth*35/100
  },
  photoTextView:{
    width:windowWidth*80/100,
    alignSelf:'center',
    marginTop:windowWidth*4/100
  },
  photoText:{
    textAlign:'center',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    color:'#375280'
  },
  numberMainView:{
    width:windowWidth*70/100,
    alignSelf:'center'
  },
  numberView:{
    marginTop:windowWidth*10/100
  },
  numberIcon:{
    width:windowWidth*10/100,
    height:windowWidth*10/100
  },
  numberMarginManage:{
    marginLeft:windowWidth*3/100
  },
  numberTitleText:{
    fontFamily:'Lato-Bold',
    color:'#375280',
    fontSize:windowWidth*4/100
  },
  numberSubTitleText:{
    fontFamily:'Lato-Regular',
    color:'#94A3B8',
    fontSize:windowWidth*3.5/100,
    width:windowWidth*60/100,
    marginTop:windowWidth*2/100
  },
  manageMarginTop:{
    marginTop:windowWidth*6/100
  }
});
// Customizable Area End