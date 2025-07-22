import React from "react";
// more core import statements

// Customizable Area Start
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback
} from "react-native"
import Scale from '../../../components/src/Scale'
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, upload ,errorIcon,deleteIcon} from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import {Variant } from "./VarientsController";
// Customizable Area End

import VarientsController, {
  Props
} from "./VarientsController";

export default class VariantImages extends VarientsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderImageUplaodColorVarient = () => {
    const uniqueColorsSetImage = new Set();

    
    const uniqueVariantsImage = this.state.catalougeDetails.variants?.filter((variant: Variant) => {
      const { variant_color } = variant;
      if (uniqueColorsSetImage.has(variant_color)) {
        return false; 
      } else {
        uniqueColorsSetImage.add(variant_color);
        return true; 
      }
    });

    return (
      <>
        {uniqueVariantsImage?.map((variant:  any, index: number) => {
           let variantImageAvailable = this.checkImageUriAvailability(variant[`remove_${variant.focusedView}_image`]);
         return(
          <React.Fragment key={index}>
            <Text style={[styles.variantText,{textAlign:TextAlignManage(i18n.language)}]}>{variant.variant_color} {i18n.t('varient')}</Text>
            <View style={styles.imageContainer}>
              {variantImageAvailable ? (
                <Image
                  style={styles.uploadedImagesStyle}
                  source={{ uri: (variant[`remove_${variant.focusedView}_image`]).uri }}
                />
              ) : (
                <View style={styles.emptyImageContainer}>
                  <Image style={styles.uploadImgIconView} source={upload} />
                  <Text style={styles.uploadVariantText}>{i18n.t('uploadImg')}</Text>
                  <Text style={styles.uploadVariantSubText}>{i18n.t('onlyPNGAndJPEG')}</Text>
                </View>
              )}
              {variantImageAvailable &&    <TouchableOpacity testID={`deletebtn${index}`} style={styles.deleteImageButtonContainer}  onPress={() => this.handleViewSelection(variant.variant_color, variant.focusedView,true)}>
    <View style={styles.deleteImageButton}>
      <Image source={deleteIcon} style={styles.deleteIconView} />
    </View>
  </TouchableOpacity>}
          
            </View>
            <TouchableOpacity testID="uploadImgbtn" style={styles.button} activeOpacity={0.8} onPress={() => { this.handleUpdateStateForVarient(variant.focusedView, variant.variant_color) }}>
              <Text style={styles.text}>{variantImageAvailable ?i18n.t('replacePic'):i18n.t('uploadPic')}</Text>
            </TouchableOpacity>

            <View style={[styles.viewsContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity
              testID={`front${index}`}
                style={[styles.singleViewFrontContainer, variant.focusedView === 'front' && { borderColor: '#375280', borderWidth: 1, borderRadius: 2 }]}
                onPress={() => this.handleViewSelection(variant.variant_color, 'front')}
              >
                {this.checkImageUriAvailability(variant.remove_front_image) ? (
                  <Image style={styles.frontViewImageContainer} source={{ uri: variant.remove_front_image.uri }} />
                ) : (
                  <View style={styles.photoViewContainer}></View>
                )}

                <Text style={[styles.photoViewVarianttext, variant.focusedView === 'front' && { color: '#375280' }]}>{i18n.t('frontView')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
               testID={`back${index}`}
                style={[styles.singleViewFrontContainer, variant.focusedView === 'back' && { borderColor: '#375280', borderWidth: 1, borderRadius: 2 }]}
                onPress={() => this.handleViewSelection(variant.variant_color, 'back')}
              >

                {this.checkImageUriAvailability(variant.remove_back_image) ? (
                  <Image style={styles.frontViewImageContainer} source={{ uri: variant.remove_back_image.uri }} />
                ) : (
                  <View style={styles.photoViewContainer}></View>
                )}
                <Text style={[styles.photoViewVarianttext, variant.focusedView === 'back' && { color: '#375280' }]}>{i18n.t('backView')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
               testID={`side${index}`}
                style={[styles.singleViewFrontContainer, variant.focusedView === 'side' && { borderColor: '#375280', borderWidth: 1, borderRadius: 2 }]}
                onPress={() => this.handleViewSelection(variant.variant_color, 'side')}
              >
                {this.checkImageUriAvailability(variant.remove_side_image) ? (
                  <Image style={styles.frontViewImageContainer} source={{ uri: variant.remove_side_image.uri }} />

                ) : (
                  <View style={styles.photoViewContainer}></View>
                )}
                <Text style={[styles.photoViewVarianttext, variant.focusedView === 'side' && { color: '#375280' }]}>{i18n.t('sideView')}</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
  )})}
      </>
    );
  }




  // Customizable Area End

  render() {
    // Customizable Area Start
    const {errorMsg}=this.state
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
          {this.state.loading && <CustomLoader />}
          <View style={styles.viewContainerVarient}>
            <View style={styles.headerViewMainVarientImages}>
              <TouchableOpacity testID="btnBackVariantImage" style={styles.backTouchVarientImages} onPress={this.navigationBackToVariantscreen}>
                <Image resizeMode="contain" source={backIcon} style={styles.backIconCssVarient}></Image>
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitleCatalogue}>{i18n.t('images')}</Text>
              </View>
              <TouchableOpacity style={styles.filterIconTouch}>
              </TouchableOpacity>
            </View>

            <ScrollView bounces={false} keyboardShouldPersistTaps="always">
            
            
              {this.renderImageUplaodColorVarient()}
              {errorMsg.errorHeader.length>1 &&<View style={styles.errorMsgContainer}>
  <Image source={errorIcon} style={styles.errorIcon} />
  <View style={styles.errorTextContainer}>
    <Text style={styles.errorHeading}>{errorMsg.errorHeader}</Text>
    <Text style={styles.errorDescription}>{errorMsg.errorTitle}</Text>
  </View>
</View>}
              <View style={[styles.buttonsContainer,{marginTop:this.state.variants?.length>1?50:Scale(200),flexDirection: FlexConditionManage(i18n.language)}]}>
                
                <TouchableOpacity
                  testID="btnBack"
                  style={styles.backButtonVarient}
                  onPress={this.navigationBackToVariantscreen}>
                  <Text style={styles.backText}>{i18n.t('back')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btnNext"
                  style={styles.nextButtonVarient}
                  onPress={() => { this.handleCreateButton()}}>
                  <Text style={styles.confirmButtonText}>{i18n.t('next')}</Text>
                </TouchableOpacity>
              </View>


            </ScrollView>
            <Modal
              animationType="slide"
              testID="modal"
              transparent={true}
              visible={this.state.modalVisible}
              statusBarTranslucent
              onRequestClose={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }>
              <View testID="closeBtn" style={styles.centeredModalView} >
                <View style={styles.modalView}>
                  <View style={styles.uploadModalTextContainer}>
                    <Text style={styles.uploadModalText}>{i18n.t('uploadImageVia')}</Text>
                  </View >
                  <View style={styles.modalBodyConatiner}>
                    <TouchableOpacity style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => {this.showGaleryModel()  }}>
                      <View

                        testID="listRadioBtn"
                        style={[
                          styles.wraperList,
                          {
                            borderRadius: 20,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.defaultIconStyle,
                            { borderColor: this.state.isGalary ? "#CCBEB1" : "#FFFFFF" },
                          ]}
                        />
                      </View>
                      <Text style={[styles.modalBodayText, { fontWeight: this.state.isGalary ? "700" : "400", }]}>{i18n.t('gallery')}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity testID="cameraBtn" style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => { this.hideGaleryModel()}}>
                      <View
                        testID="listRadioBtn"
                        style={[
                          styles.wraperList,
                          {
                            borderRadius: 20,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.defaultIconStyle,
                            { borderColor: this.state.isGalary ? "#fff" : "#CCBEB1" },
                          ]}
                        />
                      </View>
                      <Text style={[styles.modalBodayText, { fontWeight: this.state.isGalary ? "400" : "700", }]}>{i18n.t('cameraText')}</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={[styles.buttonsContainerVariantAddProducts,{flexDirection: FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity
                      testID="btnCancel"
                      style={styles.backButtonVariantAddProducts}
                      onPress={this.closeImageModal}
                    >
                      <Text style={styles.backText}>{i18n.t('cancel')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      testID="btnConfirm"
                      style={styles.nextButtonVariantAddproducts}
                      onPress={() => this.state.isGalary ? this.handleImageOperation(false) : this.handleImageOperation(true)}
                    >
                      <Text style={styles.confirmButtonText}>{i18n.t('confirm')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View>

                  </View>
                </View>
              </View>
            </Modal>

            

          </View>

        </View >

      </SafeAreaView >
    );

    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  safeContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff'
  },
  viewContainerVarient: {
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
  },
  headerViewMainVarientImages: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    alignContent: 'center'
  },
  backTouchVarientImages: {
    height: windowWidth * 6 / 100,
    width: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
  },
  backIconCssVarient: {
    height: windowWidth * 5 / 100,
    width: windowWidth * 5 / 100,
  },
  filterIconTouch: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
  },
  headerTitleCatalogue: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
  },
  button: {
    backgroundColor: "#fff",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center'
  },
  imageContainer: {
    borderRadius: 2,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    width: Scale(380),
    height: Scale(190),
    marginTop: 16
  },
  uploadedImagesStyle: {
    width: Scale(380),
    height: Scale(189),
   
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  emptyImageContainer: {

    alignItems: "center",
    justifyContent: 'center',

  },
  uploadImgIconView: {
    width: Scale(40),
    height: Scale(40)
  },
  uploadVariantText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(18),
    fontWeight: "700",
    color: '#375280',
    marginTop: 16
  },
  uploadVariantSubText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: "400",
    color: '#94A3B8',
    alignItems: "center",
    textAlign: "center",
    paddingVertical: Scale(10)
    ,
  },
  deleteImageButtonContainer: {
    position: 'absolute',
    bottom: Scale(13), 
    right: Scale(20),
    left:ManageDynamicMargin(i18n.language,20,undefined) 
  },
  deleteImageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconView: {
    width: 20,
    height: 20,
  },
  variantText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(18),
    fontWeight: "700",
    color: '#375280',
    marginTop: 16
  },
  photoViewContainer: {
    height: 80,
    width: 80,
  },
  photoViewVarianttext: {
    paddingVertical: 5,
    backgroundColor: '#E2E8F0',
    fontFamily: 'Lato-Regular',
    fontSize: Scale(12),
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center'
  },
  viewsContainer: {
    flexDirection: 'row',
  },
  singleViewFrontContainer: {
    width: 80,
    marginTop: 16,
    marginRight: 9,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',

  },
  confirmButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800"
  },
  nextButtonVarient: {
    backgroundColor: "#CCBEB1",
    width: '48%',
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center"
  },
  backButtonVarient: {
    backgroundColor: "#fff",
    width: '48%',
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:60,
  },
  backText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500"
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    height: '30%',
    backgroundColor: 'white',
    paddingBottom: 25,
    justifyContent: "space-between"
  },
  textStyle: {
    fontWeight: "500",
    color: '#375280',
    paddingVertical: 22,
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
  },
  apiTextStyleContainer: {
    marginHorizontal: 12,
  },
  textStyleContainer: {
    marginHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#E3E4E5',
  },
 
  crossContainer: {
    paddingRight: 8,
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  uploadModalTextContainer: {
    padding: 10
  },
  uploadModalText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
    color: '#375280',

  },
  modalBodyConatiner: {
    display: "flex",
    flexGrow: 1,
    padding: 10,

    paddingHorizontal: 25,
    borderColor: "#E3E4E5",
    borderWidth: 1,
    borderStyle: "solid"
  },
  modalFooterConatiner: {
    padding: 15
  },
  row: {
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  txt: {
    marginLeft: 8,
    color: "#375280",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "400",
  },
  defaultIconStyle: {
    height: 20 * 0.8,
    width: 20 * 0.8,
    borderWidth: 20 * 0.25,
    borderRadius: 20,
  },
  wraperList: {
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#CCBEB1",
  },
  modalBodayText: {
    marginLeft: 8,
    color: "#375280",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "400",
    marginRight:ManageDynamicMargin(i18n.language,15,5)
  },
  buttonsContainerVariantAddProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",

  },
  backButtonVariantAddProducts: {
    width: "48%",
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  nextButtonVariantAddproducts: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: "48%",
    borderRadius: 2,
    justifyContent: "center",
    marginTop: (windowWidth * 4) / 100,
  },
  frontViewImageContainer: {
    height: 80,
    width: 78,
    alignSelf: "center",

  },
  errorMsgContainer: {
    paddingHorizontal:Scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 8) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(220, 38, 38, 0.30)',
    backgroundColor: 'rgba(254, 226, 226, 0.30)'
  },
  errorIcon: {
    width: Scale(27),
    height: Scale(27),
    marginRight: 10,
    backgroundColor:"white"
  },
  errorTextContainer: {
    flex: 1,
    marginLeft:Scale(5)
  },
  errorHeading: {
   
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "700",
  },
  errorDescription: {
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "400",
  },
 
});
// Customizable Area End
