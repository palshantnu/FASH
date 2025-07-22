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
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,exportIcon,storeDetailsActive,editIcon,storeFirstStepAr } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import CustomformCreateStoreUploadController, { Props } from "./CustomformCreateStoreUploadController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformCreateStoreUpload extends CustomformCreateStoreUploadController {
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
          <KeyboardAvoidingView behavior={this.isPlatformiOS() ? "padding" : undefined} style={styles.keyboardPadding}>
          <View style={[styles.containerViewStoreUpload,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackStoreUpload" style={styles.backTouchStoreUpload} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconStoreBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleStoreUpload}>{i18n.t('createAStoreText')}</Text>
                </View>
                <View style={styles.extraViewStoreUpload}>
                </View>
            </View>

            <View style={styles.uploadStoreHeaderActiveView}>
                <Image source={this.state.languageManage === 'ar' ? storeFirstStepAr : storeDetailsActive} resizeMode="contain" style={styles.uploadStoreHeaderActiveView}></Image>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={styles.paddingManageScroll}>
              <View>
                {
                  this.state.selectImage != '' ?
                  <View style={styles.uploadStoreImageView}>
                    <Image source={{uri:this.state.selectImage}} style={styles.uploadStoreImageView}></Image>
                    <TouchableOpacity onPress={()=>{this.setState({mediamodal:true})}} style={styles.selectImageTouchEdit}>
                      <Image source={editIcon} style={styles.editIconCss}></Image>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity testID="btnAttachmentOpen" style={styles.uploadStoreImageView} onPress={()=>{this.setState({mediamodal:true})}}>
                      <Image source={exportIcon} style={styles.exportIcon}></Image>
                      <Text style={styles.exportText}>{i18n.t('uploadStoreProfileImageText')}</Text>
                  </TouchableOpacity>
                }
                {
                  this.state.selectImageError &&
                  <View style={styles.errorView}>
                  <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorText]}>{i18n.t('pleaseSelectStoreImage')}</Text>
                  </View>
                }
              </View>

              <View style={styles.storeCreateMainView}>
                  <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('storeNameStarText')}</Text>
                  <TextInput
                      testID={"txt_enter_store_name"}
                      onChangeText={(txt) => {
                          this.setState({ storeName: txt,storeError:false });
                      }}
                      keyboardType="default"
                      maxLength={70}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                          Keyboard.dismiss();
                      }}
                      placeholder={i18n.t('enterYourStoreName')}
                      placeholderTextColor={'#9A9A9A'}
                      style={[{
                          borderWidth: this.state.storeError ? 1 : 0,
                          borderColor: this.checkBoarderColor(this.state.storeError),textAlign:TextAlignManage(i18n.language)},styles.emailTextInput]}
                      value={this.state.storeName}
                  />
                  {
                      this.state.storeError &&
                      <View style={styles.errorView}>
                      <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorText]}>{this.state.storeNameErrorMessage}</Text>
                      </View>
                  }
              </View>

              <View style={styles.storeCreateMainView}>
                  <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('storeNameArabicText')}</Text>
                  <TextInput
                      testID={"txt_arabic_store_name"}
                      onChangeText={(txt) => {
                          this.setState({ storeNameArabic: txt,storeArabicError:false });
                      }}
                      keyboardType="default"
                      maxLength={70}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      onSubmitEditing={() => {
                          Keyboard.dismiss();
                      }}
                      placeholder={i18n.t('enterYourStoreName')}
                      placeholderTextColor={'#9A9A9A'}
                      style={[{
                          borderWidth: this.state.storeArabicError ? 1 : 0,
                          borderColor: this.checkBoarderColor(this.state.storeArabicError),textAlign:TextAlignManage(i18n.language)},styles.emailTextInput]}
                      value={this.state.storeNameArabic}
                  />
                  {
                      this.state.storeArabicError &&
                      <View style={styles.errorView}>
                      <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorText]}>{this.state.storeNameErrorMessage}</Text>
                      </View>
                  }
              </View>

              <View style={styles.storeDesMainView}>
                  <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('storeDescriptionStarText')}</Text>
                  <TextInput
                      testID={"txt_enter_store_description"}
                      onChangeText={(txt) => {
                          this.setState({ storeDescription: txt,storeDescriptionError:false });
                      }}
                      keyboardType="default"
                      maxLength={250}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      multiline={true}
                      textAlignVertical={"top"}
                      onSubmitEditing={() => {
                          Keyboard.dismiss();
                      }}
                      placeholder={i18n.t('enterYourStoreDesText')}
                      placeholderTextColor={'#9A9A9A'}
                      style={[{
                          borderWidth: this.state.storeDescriptionError ? 1 : 0,
                          borderColor: this.checkBoarderColor(this.state.storeDescriptionError),textAlign:TextAlignManage(i18n.language)},styles.storeDescriptionInput]}
                      value={this.state.storeDescription}
                  />
                  {
                      this.state.storeDescriptionError &&
                      <View style={styles.errorView}>
                      <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorText]}>{i18n.t('pleaseEnterStoreDesText')}</Text>
                      </View>
                  }
              </View>

              <View style={styles.storeDesMainView}>
                  <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('storeDescriptionArabicStarText')}</Text>
                  <TextInput
                      testID={"txt_arabic_store_description"}
                      onChangeText={(txt) => {
                          this.setState({ storeArabicDescription: txt,storeArabicDescriptionError:false });
                      }}
                      keyboardType="default"
                      maxLength={250}
                      returnKeyLabel="done"
                      returnKeyType="done"
                      multiline={true}
                      textAlignVertical={"top"}
                      onSubmitEditing={() => {
                          Keyboard.dismiss();
                      }}
                      placeholder={i18n.t('enterYourStoreDesText')}
                      placeholderTextColor={'#9A9A9A'}
                      style={[{
                          borderWidth: this.state.storeArabicDescriptionError ? 1 : 0,
                          borderColor: this.checkBoarderColor(this.state.storeArabicDescriptionError),textAlign:TextAlignManage(i18n.language)},styles.storeDescriptionInput]}
                      value={this.state.storeArabicDescription}
                  />
                  {
                      this.state.storeArabicDescriptionError &&
                      <View style={styles.errorView}>
                      <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorText]}>{i18n.t('pleaseEnterStoreDesText')}</Text>
                      </View>
                  }
              </View>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.btnContactMargin]}>
                <TouchableOpacity testID="btnCancelStore" style={styles.btnCancelButton} onPress={()=>{this.cancelBtnRedirection()}}>
                    <Text style={styles.cancelButtonText}>{i18n.t('Back')}</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="btnNextAddress" style={styles.btnNextButton} onPress={()=>{this.nextBtnAddressRedirection()}}>
                <Text style={styles.nextButtonText}>{i18n.t('Next')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
            </KeyboardAvoidingView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.mediamodal}>
              <View style={styles.modalMainViewStore}>
                      <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                      <View style={styles.cameraModalMainViewStoreAdd}>
                    <View style={styles.modalSecondViewStore}>
                      <TouchableOpacity  
                      testID={"btn_camera"}
                      style={styles.cameraModalTouchAddStore} activeOpacity={0.9} onPress={()=>{this.Camerapopen()}}>
                        <View style={styles.cameraModalViewAddStore}>
                            <Text style={styles.cameraModalTextAddStore}>{i18n.t('cameraText')}</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity  
                        testID={"btn_gallery"}
                        style={[styles.cameraModalTouchAddStore,{marginTop:10}]} onPress={()=>{this.Galleryopen()}}>
                        <View style={styles.cameraModalViewAddStore}>
                            <Text style={styles.cameraModalTextAddStore}>{i18n.t('galleryText')}</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cameraModalCancelViewAddStore}>
                        <TouchableOpacity 
                        testID={"btn_cancelMedia"}
                        onPress={() => {this.setState({mediamodal:false}) }} style={styles.cameraModalCancelTouchSt}>
                            <Text style={styles.cameraModalCancelTextAddSt}>{i18n.t('cancelText')}</Text>
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
  btnContactMargin:{
    width:windowWidth*90/100,
    marginTop:windowWidth*8/100,
    justifyContent:'space-between',
    alignSelf:'center'
  },
  btnCancelButton:{
    width:windowWidth*42/100,
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
    width:windowWidth*42/100,
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
  storeDesMainView:{
    marginTop:windowWidth*5/100
  },
  cameraModalTouchAddStore:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalViewAddStore:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalTextAddStore:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelViewAddStore:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouchSt:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelTextAddSt:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainViewStore:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  cameraModalMainViewStoreAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondViewStore:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafe:{
    flex:0
  },
  keyboardPadding: { 
    flex: 1 
  },
  paddingManageScroll:{
    paddingBottom:windowWidth*60/100
  },
  selectImageTouchEdit:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    borderRadius:windowWidth*6/100,
    backgroundColor:'#ffffff',
    position:'absolute',
    top:windowWidth*3/100,
    right:windowWidth*5/100,
    alignItems:'center'
  },
  editIconCss:{
    width:windowWidth*4/100,
    height:windowWidth*4/100,
    marginTop:windowWidth*1/100
  }
});
// Customizable Area End