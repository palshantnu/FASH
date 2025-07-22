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
  Keyboard,
  TextInput,
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,cameraIcon } from "./assets";

import CustomformAddVehicleController, { Props } from "./CustomformAddVehicleController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class CustomformAddVehicle extends CustomformAddVehicleController {
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
        <View style={[styles.containerViewVehicleUpload,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackDriverVehicleUpload" style={styles.backTouchVehicleUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconVehicleBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleVehicleUpload}>{i18n.t('addVehicleText')}</Text>
              </View>
              <View style={styles.extraViewUploadVehicle}>
              </View>
          </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>

                <View style={styles.storeCreateMainViewVehicle}>
                    <Text style={[styles.labelTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('vehicleRegistrationNumberText')}</Text>
                    <TextInput
                        testID={"txt_enter_registration_number"}
                        onChangeText={(txtD) => {
                            this.updateSearchState(txtD)
                        }}
                        keyboardType="default"
                        maxLength={70}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('vehiclePlaceholderText')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.state.licenseDataError ? 1 : 0,
                            borderColor: this.checkBoarderColor(this.state.licenseDataError),textAlign:TextAlignManage(i18n.language)},styles.registartionInput]}
                        value={this.state.licenseData}
                    />
                    {
                        this.state.licenseDataError &&
                        <View style={styles.errorViewVehicle} testID="licenseError">
                        <Text style={[styles.errorTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.licenseDataErrorMessage}</Text>
                        </View>
                    }
                </View>

                <View style={styles.mainViewMarginVehicle}>
                    {
                    this.state.selectImage != '' ?
                    <View>
                        <View style={styles.uploadStoreImageViewSelectedVehicle}>
                            <Image testID="uploadImageTest" source={{uri:this.state.selectImage}} style={styles.uploadStoreImageViewSelectedVehicle}></Image>
                            <View style={styles.manageMarginVehicle}>
                                <TouchableOpacity testID="btnRetakePhoto" style={styles.btnRetakeButtonVehicle} onPress={()=>{this.openCameraGallery('first')}}>
                                    <Text style={styles.retakeButtonTextVehicle}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                    :
                    <View>
                        <Text style={[styles.exportTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('vehicleRegistrationUploadText')}</Text>
                        <TouchableOpacity testID="btnAttachmentOpen" style={styles.uploadStoreImageView}>
                                <Text style={styles.exportTextVehicle}>{i18n.t('vehicleRegistrationPhotoText')}</Text>
                                <Text style={styles.subTitleTextVehicle}>{i18n.t('uploadFrontVehicleRegistrationText')}</Text>
                                <TouchableOpacity testID="btnUploadPhotoRegistration" style={[{flexDirection:FlexConditionManage(i18n.language)},styles.btnTakePhotoVehicle]} onPress={()=>{this.openCameraGallery('first')}}>
                                    <Image source={cameraIcon} style={styles.backIconVehicleBack}></Image>
                                    <Text style={[styles.takePhotoButtonTextVehicle,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                                </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    }
                    {
                    this.state.selectImageError &&
                    <View style={styles.errorViewVehicle}>
                    <Text style={[styles.errorTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.photoErrorMessage}</Text>
                    </View>
                    }
                </View>

                <View style={styles.mainViewMarginVehicle}>
                    {
                    this.state.selectInsuranceImage != '' ?
                    <View>
                        <View style={styles.uploadStoreImageViewSelectedVehicle}>
                            <Image testID="uploadImageTestInsurance" source={{uri:this.state.selectInsuranceImage}} style={styles.uploadStoreImageViewSelectedVehicle}></Image>
                            <View style={styles.manageMarginVehicle}>
                                <TouchableOpacity testID="btnRetakePhotoInsurance" style={styles.btnRetakeButtonVehicle} onPress={()=>{this.openCameraGallery('second')}}>
                                    <Text style={styles.retakeButtonTextVehicle}>{i18n.t('Retake Photo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                    :
                    <View>
                        <Text style={styles.exportTextVehicle}><Text style={[styles.exportTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('vehicleInsuranceUploadText')}</Text></Text>
                        <TouchableOpacity testID="btnAttachmentOpen" style={styles.uploadStoreImageView}>
                                <Text style={styles.exportTextVehicle}>{i18n.t('vehicleInsurancePhotoText')}</Text>
                                <Text style={styles.subTitleTextVehicle}>{i18n.t('uploadFrontVehicleInsurance')}</Text>
                                <TouchableOpacity testID="btnUploadPhotoInsurance" style={[{flexDirection:FlexConditionManage(i18n.language)},styles.btnTakePhotoVehicle]} onPress={()=>{this.openCameraGallery('second')}}>
                                    <Image source={cameraIcon} style={styles.backIconVehicleBack}></Image>
                                    <Text style={[{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)},styles.takePhotoButtonTextVehicle]}>{i18n.t('uploadPic')}</Text>
                                </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    }
                    {
                    this.state.selectInsuranceImageError &&
                    <View style={styles.errorViewVehicle}>
                    <Text style={[styles.errorTextVehicle,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.selectInsuranceImageErrorMsg}</Text>
                    </View>
                    }
                </View>

                <View style={styles.btnContactMarginVehicle}>
                <TouchableOpacity testID="btnUploadDriverDocument" style={styles.btnSubmitButton} onPress={()=>{this.btnAddVehicle()}}>
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
            <View style={styles.modalMainView}>
                    <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                    <View style={styles.cameraModalMainViewAdd}>
                  <View style={styles.modalSecondView}>
                    <TouchableOpacity  
                    testID={"btn_camera"}
                    style={styles.cameraModalTouchAdd} activeOpacity={0.9} onPress={()=>{this.Camerapopen()}}>
                      <View style={styles.cameraModalViewAdd}>
                          <Text style={styles.cameraModalTextAdd}>{i18n.t('cameraText')}</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity  
                      testID={"btn_gallery"}
                      style={[styles.cameraModalTouchAdd,{marginTop:10}]} onPress={()=>{this.Galleryopen()}}>
                      <View style={styles.cameraModalViewAdd}>
                          <Text style={styles.cameraModalTextAdd}>{i18n.t('galleryText')}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.cameraModalCancelViewAdd}>
                      <TouchableOpacity 
                      testID={"btn_cancelMedia"}
                      onPress={() => {this.closeCameraGallery() }} style={styles.cameraModalCancelTouch}>
                          <Text style={styles.cameraModalCancelTextAdd}>{i18n.t('cancelText')}</Text>
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
  containerViewVehicleUpload:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewStoreUpload:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchVehicleUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconVehicleBack:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleVehicleUpload:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewUploadVehicle:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  uploadStoreHeaderActiveView:{
    width:windowWidth*90/100,
    height:windowHeight*10/100
  },
  uploadStoreImageViewSelectedVehicle:{
    width:windowWidth*90/100,
    height:windowHeight*40/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  uploadStoreImageView:{
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
  exportTextVehicle:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    marginTop:windowWidth*3/100
  },
  subTitleTextVehicle:{
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
  btnTakePhotoVehicle:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*50/100,
    height:windowHeight*5/100,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    marginTop:windowWidth*7/100
  },
  takePhotoButtonTextVehicle:{
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
  errorViewVehicle:{
    marginTop:windowWidth*1/100
  },
  errorTextVehicle:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  storeDesMainView:{
    marginTop:windowWidth*5/100
  },
  cameraModalTouchAdd:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalViewAdd:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalTextAdd:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelViewAdd:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouch:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelTextAdd:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainView:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  cameraModalMainViewAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondView:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafe:{
    flex:0
  },
  btnRetakeButtonVehicle:{
    width:windowWidth*80/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  retakeButtonTextVehicle:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  manageMarginVehicle:{
    position:'absolute',
    bottom:15
  },
  mainViewMarginVehicle:{
    marginTop:windowWidth*4/100
  }
});
// Customizable Area End