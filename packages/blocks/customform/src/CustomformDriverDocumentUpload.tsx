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
  Modal
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import { backIcon,cameraIcon } from "./assets";

import CustomformDriverDocumentUploadController, { Props } from "./CustomformDriverDocumentUploadController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformDriverDocumentUpload extends CustomformDriverDocumentUploadController {
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
              <TouchableOpacity testID="btnBackDriverDocumentUpload" style={styles.backTouchStoreUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconStoreBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleStoreUpload}>{this.state.showHeaderTitleText}</Text>
              </View>
              <View style={styles.extraViewStoreUpload}>
              </View>
          </View>

          {
            this.state.inputFieldShow &&
            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.inputLabel} *</Text>
                <TextInput
                    testID={"txt_enter_license_data"}
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
                    placeholder={this.state.inputPlaceholderLabel}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.state.licenseDataError ? 1 : 0,
                        borderColor: this.checkBoarderColor(this.state.licenseDataError),textAlign:TextAlignManage(i18n.language)},styles.emailTextInput]}
                    value={this.state.licenseData}
                />
                {
                    this.state.licenseDataError &&
                    <View style={styles.errorView} testID="licenseError">
                    <Text style={[styles.errorTextDriverDoc,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.licenseDataErrorMessage}</Text>
                    </View>
                }
            </View>
          }

          <View style={styles.mainViewMarginManage}>
            {
              this.state.selectImage != '' ?
              <View>
                <View style={styles.uploadStoreImageViewSelected}>
                  <Image testID="uploadImageTest" source={{uri:this.state.selectImage}} style={styles.uploadStoreImageViewSelected}></Image>
                </View>

                <View style={styles.manageMarginSix}>
                    <TouchableOpacity testID="btnRetakePhoto" style={styles.btnRetakeButton} onPress={()=>{this.openCameraGallery()}}>
                        <Text style={styles.retakeButtonText}>{i18n.t('Retake Photo')}</Text>
                    </TouchableOpacity>
                </View>

              </View>
              
              :
              <TouchableOpacity testID="btnAttachmentOpen" style={styles.uploadStoreImageView}>
                    <Text style={styles.exportText}>{this.state.photoBoxTitle}</Text>
                    <Text style={styles.subTitleText}>{this.state.photoSubTitle}</Text>
                    <TouchableOpacity testID="btnUploadPhoto" style={[styles.btnTakePhoto,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.openCameraGallery()}}>
                        <Image source={cameraIcon} style={styles.backIconStoreBack}></Image>
                        <Text style={[styles.takePhotoButtonText,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{i18n.t('uploadPic')}</Text>
                    </TouchableOpacity>
              </TouchableOpacity>
            }
            {
              this.state.selectImageError &&
              <View style={styles.errorView}>
              <Text style={[styles.errorTextDriverDoc,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.photoErrorMessage}</Text>
              </View>
            }
          </View>

          
        </View>
        <View style={styles.btnContactMargin}>
          <TouchableOpacity testID="btnUploadDriverDocument" style={styles.btnNextButton} onPress={()=>{this.uploadDriverDocuments()}}>
          <Text style={styles.nextButtonText}>{i18n.t('Submit')}</Text>
          </TouchableOpacity>
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
  uploadStoreImageViewSelected:{
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
  exportText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    marginTop:windowWidth*3/100
  },
  subTitleText:{
    color:'#94A3B8',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.5/100,
    marginTop:windowWidth*3/100
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
  btnTakePhoto:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*50/100,
    height:windowHeight*5/100,
    borderRadius:2,
    justifyContent:'center',
    alignItems:'center',
    marginTop:windowWidth*7/100
  },
  takePhotoButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
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
  errorView:{
    marginTop:windowWidth*1/100
  },
  errorTextDriverDoc:{
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
  btnRetakeButton:{
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  retakeButtonText:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  manageMarginSix:{
    marginTop:windowWidth*6/100
  },
  mainViewMarginManage:{
    marginTop:windowWidth*4/100
  }
});
// Customizable Area End