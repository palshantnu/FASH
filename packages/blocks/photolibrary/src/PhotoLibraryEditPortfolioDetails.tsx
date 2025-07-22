import React from "react";

import {
  // Customizable Area Start
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  ImageBackground,
  Platform,
  KeyboardAvoidingView
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import Scale, { verticalScale } from "../../../components/src/Scale";
import PhotoLibraryController, { Props, configJSON } from "./PhotoLibraryController";
import CustomHeader from "../../../components/src/CustomHeader";
import { deleteIcon } from "./assets";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../components/src/i18n/i18n.config'
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width } = Dimensions.get("window");
// Customizable Area End

export default class PhotoLibraryEditPortfolioDetails extends PhotoLibraryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  ImagePickerModal = () => {
    return (
 <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.detailsMediaModal}>
            <View style={styles.portfolioDetailsMediaModalMainView}>
              <SafeAreaView style={styles.portfolioDetailsMediaModalFlexManage}>
              <View style={styles.portfolioDetailsCameraModalMainViewDriver}>
                <View style={styles.portfolioDetailsMediaModalAfterView}>
                  <TouchableOpacity
                    style={styles.portfolioDetailsCameraModalTouchDriver}
                    onPress={() => { this.openCamera() }}
                    testID="OpenCamera"
                  >
                    <View style={styles.portfolioDetailsCameraModalViewDriver}>
                      <Text style={styles.portfolioDetailsCameraModalTextDriver}>{i18n.t('cameraText')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.portfolioDetailsCameraModalTouchDriver, { marginTop: 10 }]}
                    onPress={() => { this.openGallery() }}
                    testID="OpenGallery"
                  >
                    <View style={styles.portfolioDetailsCameraModalViewDriver}>
                      <Text style={styles.portfolioDetailsCameraModalTextDriver}>{i18n.t('galleryText')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.portfolioDetailsCameraModalCancelViewDriver}>
                  <TouchableOpacity
                    onPress={() => { this.closeDetailsPickerModal() }}
                    style={styles.portfolioDetailsCameraModalCancelTouchDriver}
                    testID="CloseDetailsPickerModal">
                    <Text style={styles.portfolioDetailsCameraModalCancelTextDriver}>{i18n.t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </SafeAreaView>
            </View>
          </Modal> 
    )
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.mainContainer}>
         <CustomHeader
            title={i18n.t('portfolioText')}
            onLeftPress={() => { this.backBtnClick() }}
            leftTestId="BackBtnClick"
          />
         {this.ImagePickerModal()}
        <KeyboardAwareScrollView
  style={styles.bodyView}
  contentContainerStyle={{ flexGrow: 1 }}
  enableOnAndroid={true}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  extraScrollHeight={Platform.OS === "ios" ? 80 : 0} // adjust as needed
>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: this.state.profilePhotoDetails.uri === "" ? this.state.editPortfolioDetailProfile : this.state.profilePhotoDetails.uri }}
                style={styles.image}
              >
                <TouchableOpacity style={styles.deleteIconContainer} onPress={() => { this.deleteIconBtn() }} testID="DeleteIconBtn">
                  <Image source={deleteIcon} style={{ height: 48, width: 48 }} resizeMode="contain" />
                </TouchableOpacity>

                <View style={{
                  flex: 1,
                  justifyContent: "flex-end"
                }}>
                  <TouchableOpacity style={styles.replaceView} onPress={() => { this.replaceImageBtn() }} testID="ReplaceImageBtn">
                    <Text style={styles.cancelTxt}>{i18n.t('ReplaceImage_')}</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={[styles.mainView, { marginHorizontal: Scale(24) }]}>
              <Text style={styles.exploreTxt}>{i18n.t('descriptionText')}</Text>
              <TextInput
                placeholderTextColor="#375280"
                onChangeText={(text: string) => { this.onEditDetailsInputChange(text) }}
                style={[styles.descTxt, { textAlign: TextAlignManage(i18n.language) }]}
                multiline={true}
                value={this.state.editPortfolioDetailDesc}
                testID="OnEditDetailsInputChange"
              />
            </View>
            <View style={[styles.stylistView, { marginHorizontal: Scale(24), flexDirection: FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity style={[styles.cancelView, { marginRight: ManageDynamicMargin(i18n.language, undefined, Scale(5),), marginLeft: ManageDynamicMargin(i18n.language, Scale(5), undefined) }]} onPress={() => { this.cancelDetailsView() }} testID="cancleDetails">
                <View>
                  <Text style={styles.cancelTxt}>{i18n.t('cancel')}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.updateView, { marginRight: ManageDynamicMargin(i18n.language, Scale(10), undefined,), marginLeft: ManageDynamicMargin(i18n.language, undefined, Scale(10)) }]}
                onPress={() => { this.updateDetailsView() }}
                testID="UpdatedetailsView"
              >
                <View>
                  <Text style={styles.updateTxt}>{i18n.t('updateText')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    height: 24,
    width: 24
  },
  bodyView: {
    flex: 1,
  },
  exploreTxt: {
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    fontSize: 16,
    color: '#375280',
    marginTop: verticalScale(18),
  },
  mainView: {
    marginTop: verticalScale(10)
  },
  descTxt: {
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    fontSize: 18,
    tintColor: '#375280',
    lineHeight: 26,
    marginTop: verticalScale(10),
    backgroundColor: "#F8F8F8",
    padding: Scale(10)
  },
  stylistView: {
    marginTop: verticalScale(40),
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: Scale(24)
  },
  detailsView: {
    marginLeft: Scale(20),
    marginTop: verticalScale(10),
  },
  cancelView: {
    borderColor: '#CCBEB1',
    borderRadius: 2,
    marginBottom: verticalScale(20),
    padding: Scale(16),
    flex: 1,
    borderWidth: 1,
    marginRight: Scale(5)
  },
  updateView: {
    borderColor: '#CCBEB1',
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    marginBottom: verticalScale(20),
    padding: Scale(16),
    flex: 1,
    marginLeft: Scale(5)
  },
  imageContainer: {
    width: "100%",
    height: 462,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  replaceView: {
    borderColor: '#CCBEB1',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    padding: 16,
    borderWidth: 1,
    marginBottom: verticalScale(20),
    marginHorizontal: Scale(24),
  },
  cancelTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: '800',
    color: '#375280',
    textAlign: "center"
  },
  updateTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: "center"
  },
  portfolioDetailsMediaModalMainView: {
    flex: 1,
    backgroundColor: '#00000030',
    alignItems: 'center'
  },
  portfolioDetailsMediaModalAfterView: {
    alignSelf: 'center',
    width: '100%'
  },
  portfolioDetailsMediaModalFlexManage: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  portfolioDetailsCameraModalTouchDriver: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioDetailsCameraModalViewDriver: {
    width: '94%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: windowWidth * 3.5 / 100
  },
  portfolioDetailsCameraModalTextDriver: {
    textAlign: 'center',
    fontSize: windowWidth * 4 / 100,
    color: '#000000'
  },
  portfolioDetailsCameraModalCancelViewDriver: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#0061A7',
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  portfolioDetailsCameraModalCancelTouchDriver: {
    alignSelf: 'center',
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth * 3.5 / 100
  },
  portfolioDetailsCameraModalCancelTextDriver: {
    fontSize: windowWidth * 4 / 100,
    color: '#FFFFFF'
  },
  portfolioDetailsCameraModalMainViewDriver: {
    position: 'absolute',
    bottom: windowHeight * 3 / 100,
    width: windowWidth
  },
  deleteIconContainer: {
    alignSelf: "flex-end",
    marginTop: verticalScale(24),
    marginHorizontal: Scale(24)
  }
});
// Customizable Area End
