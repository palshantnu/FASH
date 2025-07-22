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
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
const windowHeight = Dimensions.get("window").height;
import { backIcon,cameraIcon } from "./assets";

import CustomformDriverCivilPassportController, { Props } from "./CustomformDriverCivilPassportController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformDriverCivilPassport extends CustomformDriverCivilPassportController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerVehicle}>
        <SafeAreaView style={styles.safeViewContainerVehicle}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewCivilUpload,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewCivilUpload,{flexDirection: FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackDriverCivilUpload" style={styles.backTouchCivilUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconCivilBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleCivilUpload}>{i18n.t('civilIdAndPassportText')}</Text>
              </View>
              <View style={styles.extraViewUploadCivil}>
              </View>
          </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>

                <View style={styles.mainViewMarginCivil}>
                    <Text style={[styles.exportTextCivil,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('civilIDText')}</Text>
                    {
                    this.state.selectCivilIdFrontImage != '' ?
                    <View>
                        <View style={styles.uploadCivilImageViewSelectedCivil}>
                            <Image testID="uploadImageTestCivilFront" source={{uri:this.state.selectCivilIdFrontImage}} style={styles.uploadCivilImageViewSelectedCivil}></Image>
                            <View style={styles.manageMarginCivil}>
                                <TouchableOpacity testID="btnRetakePhotoCivilFront" style={styles.btnRetakeButtonCivil} onPress={()=>{this.openCameraGallery('first')}}>
                                    <Text style={styles.retakeButtonTextCivil}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.uploadCivilImageView}>
                            <Text style={styles.exportTextCivil}>{i18n.t('civilIdFrontPhotoText')}</Text>
                            <Text style={styles.subTitleTextCivil}>{i18n.t('uploadCivilFrontPhoto')}</Text>
                            <TouchableOpacity testID="btnUploadPhotoRegistration" style={[styles.btnTakePhotoCivil,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.openCameraGallery('first')}}>
                                <Image source={cameraIcon} style={styles.backIconCivilBack}></Image>
                                <Text style={[styles.takePhotoButtonTextCivil,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                            </TouchableOpacity>
                    </TouchableOpacity>
                    }
                    {
                    this.state.selectCivilIdFrontImageError &&
                    <View style={styles.errorViewCivil}>
                    <Text style={[styles.errorTextCivil,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.photoErrorMessage}</Text>
                    </View>
                    }
                </View>

                <View style={styles.mainViewMarginCivil}>
                    {
                    this.state.selectCivilIdBackImage != '' ?
                    <View>
                        <View style={styles.uploadCivilImageViewSelectedCivil}>
                            <Image testID="uploadImageCivilBack" source={{uri:this.state.selectCivilIdBackImage}} style={styles.uploadCivilImageViewSelectedCivil}></Image>
                            <View style={styles.manageMarginCivil}>
                                <TouchableOpacity testID="btnRetakePhotoCivilBack" style={styles.btnRetakeButtonCivil} onPress={()=>{this.openCameraGallery('second')}}>
                                    <Text style={styles.retakeButtonTextCivil}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.uploadCivilImageView}>
                            <Text style={styles.exportTextCivil}>{i18n.t('civilIdBackPhotoText')}</Text>
                            <Text style={styles.subTitleTextCivil}>{i18n.t('uploadCivilBackPhoto')}</Text>
                            <TouchableOpacity testID="btnUploadPhotoCivilBack" style={[styles.btnTakePhotoCivil,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.openCameraGallery('second')}}>
                                <Image source={cameraIcon} style={styles.backIconCivilBack}></Image>
                                <Text style={[styles.takePhotoButtonTextCivil,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                            </TouchableOpacity>
                    </TouchableOpacity>
                    }
                    {
                    this.state.selectCivilIdBackImageError &&
                    <View style={styles.errorViewCivil}>
                    <Text style={[styles.errorTextCivil,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.selectCivilIdBackImageErrorMsg}</Text>
                    </View>
                    }
                </View>

                <View style={styles.mainViewMarginCivil}>
                    <Text style={[styles.exportTextCivil,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('passportText')}</Text>
                    {
                    this.state.selectPassportFrontImage != '' ?
                    <View>
                        <View style={styles.uploadCivilImageViewSelectedCivil}>
                            <Image testID="uploadImageTestPassportFront" source={{uri:this.state.selectPassportFrontImage}} style={styles.uploadCivilImageViewSelectedCivil}></Image>
                            <View style={styles.manageMarginCivil}>
                                <TouchableOpacity testID="btnRetakePhotoPassportFront" style={styles.btnRetakeButtonCivil} onPress={()=>{this.openCameraGallery('third')}}>
                                    <Text style={styles.retakeButtonTextCivil}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.uploadCivilImageView}>
                            <Text style={styles.exportTextCivil}>{i18n.t('passportFrontPhotoText')}</Text>
                            <Text style={styles.subTitleTextCivil}>{i18n.t('uploadPassportFrontPhoto')}</Text>
                            <TouchableOpacity testID="btnUploadPhotoPassportFront" style={[styles.btnTakePhotoCivil,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.openCameraGallery('third')}}>
                                <Image source={cameraIcon} style={styles.backIconCivilBack}></Image>
                                <Text style={[styles.takePhotoButtonTextCivil,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                            </TouchableOpacity>
                    </TouchableOpacity>
                    }
                </View>

                <View style={styles.mainViewMarginCivil}>
                    {
                    this.state.selectPassportBackImage != '' ?
                    <View>
                        <View style={styles.uploadCivilImageViewSelectedCivil}>
                            <Image testID="uploadImageTestPassportBack" source={{uri:this.state.selectPassportBackImage}} style={styles.uploadCivilImageViewSelectedCivil}></Image>
                            <View style={styles.manageMarginCivil}>
                                <TouchableOpacity testID="btnRetakePhotoPassportBack" style={styles.btnRetakeButtonCivil} onPress={()=>{this.openCameraGallery('fourth')}}>
                                    <Text style={styles.retakeButtonTextCivil}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.uploadCivilImageView}>
                            <Text style={styles.exportTextCivil}>{i18n.t('passportBackPhotoText')}</Text>
                            <Text style={styles.subTitleTextCivil}>{i18n.t('uploadPassportBackPhoto')}</Text>
                            <TouchableOpacity testID="btnUploadPhotoPassportBack" style={[styles.btnTakePhotoCivil,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.openCameraGallery('fourth')}}>
                                <Image source={cameraIcon} style={styles.backIconCivilBack}></Image>
                                <Text style={[styles.takePhotoButtonTextCivil,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                            </TouchableOpacity>
                    </TouchableOpacity>
                    }
                </View>

                <View style={styles.btnContactMarginVehicle}>
                <TouchableOpacity testID="btnUploadDriverCivilPassport" style={styles.btnSubmitButton} onPress={()=>{this.btnUploadCivilPassport()}}>
                <Text style={styles.submitButtonText}>{i18n.t('Submit')}</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

          <Modal
            animationType="slide"
            transparent={true}
            testID="cameraModalCheck"
            visible={this.state.mediamodal}>
            <View style={styles.modalMainViewCivil}>
                    <SafeAreaView style={styles.modalSafeCivil}></SafeAreaView>
                    <View style={styles.cameraModalMainViewCivilAdd}>
                  <View style={styles.modalSecondViewCivil}>
                    <TouchableOpacity  
                    testID={"btn_camera"}
                    style={styles.cameraModalTouchAddCivil} activeOpacity={0.9} onPress={()=>{this.Camerapopen()}}>
                      <View style={styles.cameraModalViewAddCivil}>
                          <Text style={styles.cameraModalTextAddCivil}>{i18n.t('cameraText')}</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity  
                      testID={"btn_gallery"}
                      style={[styles.cameraModalTouchAddCivil,{marginTop:10}]} onPress={()=>{this.Galleryopen()}}>
                      <View style={styles.cameraModalViewAddCivil}>
                          <Text style={styles.cameraModalTextAddCivil}>{i18n.t('galleryText')}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.cameraModalCancelViewAddCivil}>
                      <TouchableOpacity 
                      testID={"btn_cancelMedia"}
                      onPress={() => {this.closeCameraGallery() }} style={styles.cameraModalCancelTouchCivil}>
                          <Text style={styles.cameraModalCancelTextAddCivil}>{i18n.t('cancelText')}</Text>
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
  mainContainerVehicle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeViewContainerVehicle:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerViewCivilUpload:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewCivilUpload:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchCivilUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCivilBack:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleCivilUpload:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewUploadCivil:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  uploadStoreHeaderActiveView:{
    width:windowWidth*90/100,
    height:windowHeight*10/100
  },
  uploadCivilImageViewSelectedCivil:{
    width:windowWidth*90/100,
    height:windowHeight*40/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  uploadCivilImageView:{
    width:windowWidth*90/100,
    height:windowHeight*20/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  exportIcon:{
    width:windowWidth*10/100,
    height:windowWidth*10/100
  },
  exportTextCivil:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    marginTop:windowWidth*3/100
  },
  subTitleTextCivil:{
    color:'#94A3B8',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.5/100,
    marginTop:windowWidth*3/100
  },
  btnContactMarginVehicle:{
    width:windowWidth*90/100,
    marginTop:windowWidth*8/100,
    alignSelf:'center'
  },
  btnSubmitButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center'
  },
  submitButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  btnTakePhotoCivil:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*50/100,
    height:windowHeight*5/100,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    marginTop:windowWidth*7/100
  },
  takePhotoButtonTextCivil:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
  },
  storeCreateMainViewVehicle:{
    marginTop:windowWidth*4/100
  },
  labelTextVehicle:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  registartionInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorViewCivil:{
    marginTop:windowWidth*1/100
  },
  errorTextCivil:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  storeDesMainView:{
    marginTop:windowWidth*5/100
  },
  cameraModalTouchAddCivil:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalViewAddCivil:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalTextAddCivil:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelViewAddCivil:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouchCivil:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelTextAddCivil:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainViewCivil:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  cameraModalMainViewCivilAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondViewCivil:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafeCivil:{
    flex:0
  },
  btnRetakeButtonCivil:{
    width:windowWidth*80/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  retakeButtonTextCivil:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  manageMarginCivil:{
    position:'absolute',
    bottom:15
  },
  mainViewMarginCivil:{
    marginTop:windowWidth*4/100
  },
  scrollPadding:{
    paddingBottom:100
  }
});
// Customizable Area End