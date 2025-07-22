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
  Modal
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,exportIcon } from "./assets";

import CustomformCreateUploadDocumentController, { Props } from "./CustomformCreateUploadDocumentController";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import globalStyle from "../../../components/src/GlobalStyle";
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformCreateUploadDocument extends CustomformCreateUploadDocumentController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerStore}>
            <SafeAreaView style={styles.safeContainerViewStore}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[globalStyle.headerMarginManage,styles.containerViewStore]}>
                <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackDocUpload" style={styles.backTouchStoreUpl} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconUpl,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleStoreUpload}>{i18n.t('uploadDocsText')}</Text>
                    </View>
                    <View style={styles.filterTouchUpload}>
                    </View>
                </View>

                <View style={{marginTop:windowWidth*5/100}}>
                    <TouchableOpacity testID="btnAttachmentIdOpen" style={styles.uploadStoreImageView} onPress={()=>{this.openModalAndSetValue('id')}}>
                        <Image source={exportIcon} style={styles.exportIcon}></Image>
                        <Text numberOfLines={3} style={styles.exportText}>{this.state.documentFileIdProof === ''? i18n.t('uploadYourIDProofText'):this.state.docIdRes.name}</Text>
                    </TouchableOpacity>
                    {
                    this.state.documentIdProofError &&
                    <View style={styles.errorView}>
                    <Text style={[styles.errorTextUploadDoc,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseUploadIdProofError')}</Text>
                    </View>
                    }
                </View>

                <View style={{marginTop:windowWidth*5/100}}>
                    <TouchableOpacity testID="btnAttachmentLicenseOpen" style={styles.uploadStoreImageView} onPress={()=>{this.openModalAndSetValue('license')}}>
                        <Image source={exportIcon} style={styles.exportIcon}></Image>
                        <Text numberOfLines={3} style={styles.exportText}>{this.state.documentFileIdLicense === ''? i18n.t('uploadYourLicenseText'):this.state.docLicenseRes.name}</Text>
                    </TouchableOpacity>
                    {
                    this.state.documentLicenseError &&
                    <View style={styles.errorView}>
                    <Text style={[styles.errorTextUploadDoc,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseUploadLicenseError')}</Text>
                    </View>
                    }
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.documentPickerModal}>
                    <View style={styles.modalMainViewDoc}>
                            <SafeAreaView style={styles.modalSafeDoc}></SafeAreaView>
                            <View style={styles.docModalMainViewAdd}>
                        <View style={styles.modalSecondViewDoc}>
                            <TouchableOpacity  
                            testID={"btn_camera"}
                            style={styles.optionModalTouchAdd} activeOpacity={0.9} onPress={()=>{this.CameraDocOpen()}}>
                            <View style={styles.optionModalViewAdd}>
                                <Text style={styles.optionModalTextAdd}>{i18n.t('cameraText')}</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity  
                            testID={"btn_gallery"}
                            style={[styles.optionModalTouchAdd,{marginTop:10}]} onPress={()=>{this.openImageFile()}}>
                            <View style={styles.optionModalViewAdd}>
                                <Text style={styles.optionModalTextAdd}>{i18n.t('Attachment')}</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.optionModalCancelViewAdd}>
                            <TouchableOpacity 
                            testID={"btn_cancelMedia"}
                            onPress={() => {this.setState({documentPickerModal:false}) }} style={styles.docModalCancelTouch}>
                                <Text style={styles.docModalCancelTextAdd}>{i18n.t('cancelText')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
               
            </View>
            <TouchableOpacity testID="btnStoreUpload" style={styles.btnUploadButton} onPress={()=>{this.uploadDocument()}}>
              <Text style={styles.uploadButtonText}>{i18n.t('Upload')}</Text>
            </TouchableOpacity>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainerViewStore:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  mainContainerStore: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewStore:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewStoreUpload:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchStoreUpl:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconUpl:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleStoreUpload:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterTouchUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  uploadButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  btnUploadButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    bottom:windowWidth*8/100
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
  errorView:{
    marginTop:windowWidth*1/100
  },
  errorTextUploadDoc:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  optionModalTouchAdd:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  optionModalViewAdd:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  optionModalTextAdd:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  optionModalCancelViewAdd:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  docModalCancelTouch:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  docModalCancelTextAdd:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainViewDoc:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  docModalMainViewAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondViewDoc:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafeDoc:{
    flex:0
  },
});
