import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../components/src/CustomButton";
import CustomTextInput from "../../../components/src/CustomTextInput";
import CustomLoader from "../../../components/src/CustomLoader";
import { Dropdown } from "react-native-element-dropdown";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale from "../../../components/src/Scale";
import globalStyle from "../../../components/src/GlobalStyle";

import { uploadProfilePhoto, arrowRight, deleteIcon, arabUpload } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
const { width, height } = Dimensions.get("window");
const t=i18n.t
// Customizable Area End

import StylistEditProfileController, {
  Props,
  configJSON,
} from "./StylistEditProfileController";

export default class StylistEditProfile extends StylistEditProfileController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start

  dropDownIcon = () => {
    return <Image source={arrowRight} style={styles.dropdownIconStyle} />;
  }; // istanbul ignore next
  renderProfileForm = () => {
    return (
      <View style={styles.mainViewFormStyle} testID="step1">
       <Text style={[globalStyle.inputLabel,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('profilePicture')}</Text>
        <View style={styles.pfpWrapperStyle}>
          {this.state.profilePhoto.uri ? (
            <View testID="profilePicture">
              <Image
                source={{ uri: this.state.profilePhoto.uri }}
                style={styles.pfpWrapperStyle}
              />
              {this.state.editStatus && (
                <>
                  <View style={styles.btnWrapperStyle}>
                    <CustomButton
                      title={t("ReplaceImage_")}
                      onPress={this.openImageModal}
                      testID="replaceImage"
                      style={styles.replaceButtonStyle}
                      textStyle={styles.replaceImageTextStyle}
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.pfpDeleteIconWrapperStyel,{right:ManageDynamicMargin(i18n.language,undefined,Scale(12)),left:ManageDynamicMargin(i18n.language,Scale(12),undefined)}]}
                    onPress={this.removeProfilePic}
                    testID="removePfp"
                  >
                    <Image
                      source={deleteIcon}
                      style={styles.pfpDeleteIconStyle}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <Pressable onPress={this.openImageModal} testID="selectPfp">
              <Image
                source={i18n.language =="en"?  uploadProfilePhoto:arabUpload}
                style={styles.pfpWrapperStyle}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
        <CustomTextInput
          testID="profileBio"
          label={t("ProfileBio*")}
          editable={this.state.editStatus}
          value={this.state.profileBio}
          onChangeText={this.onProfileDataBioChange}
          hasError={this.state.errorKey === "profileBio"}
          errorString={this.state.error}
          multiline
          language={i18n.language}
        />
        <CustomTextInput
          testID="areaOfExpertise"
          label={t("AreaofExpertise*")}
          editable={this.state.editStatus}
          value={this.state.areaOfExpertise}
          onChangeText={this.onExperiseChange}
          hasError={this.state.errorKey === "areaOfExpertise"}
          errorString={this.state.error}
          multiline
          language={i18n.language}
        />
        <CustomTextInput
          testID="yoe"
          label={t("Years_of_Experience*")}
          placeholder="0 Years"
          value={this.state.yoe}
          onChangeText={this.onExperiseYearsChange}
          keyboardType="numeric"
          editable={this.state.editStatus}
          hasError={this.state.errorKey === "yoe"}
          errorString={this.state.error}
          language={i18n.language}
        />
        <CustomTextInput
          testID="instagram"
          label={t("Social_Media_Links")}
          placeholder="www.instagram.com"
          editable={this.state.editStatus}
          value={this.state.instagram}
          onChangeText={this.onInstraChange}
          hasError={this.state.errorKey === "instagram"}
          language={i18n.language}
        />
          {this.state.errorKey === "instagram" && this.state.error ? (
        <Text style={styles.errorText}>{this.state.error}</Text>
         ) : null}
        <CustomTextInput
          testID="facebook"
          placeholder="www.facebook.com"
          editable={this.state.editStatus}
          value={this.state.facebook}
          onChangeText={this.onFacebookChange}
          hasError={this.state.errorKey === "facebook"}
          language={i18n.language}
        />
          {this.state.errorKey === "facebook" && this.state.error ? (
        <Text style={styles.errorText}>{this.state.error}</Text>
         ) : null}
        <CustomTextInput
          testID="tiktok"
          placeholder="www.tiktok.com"
          editable={this.state.editStatus}
          value={this.state.tiktok}
          onChangeText={this.onTiktokLinkChange}
          hasError={this.state.errorKey === "tiktok"}
          language={i18n.language}
        />   
           {this.state.errorKey === "tiktok" && this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
          ) : null}
        <CustomTextInput
          testID="pinterest"
          placeholder="www.pinterest.com"
          value={this.state.pinterest}
          editable={this.state.editStatus}
          onChangeText={this.onPinterestLinkChange}
          hasError={this.state.errorKey === "pinterest"}
          language={i18n.language}
        />
          {this.state.errorKey === "pinterest" && this.state.error ? (
        <Text style={styles.errorText}>{this.state.error}</Text>
         ) : null}
        <View style={globalStyle.inputWrapper}>
          <Text style={[globalStyle.inputLabel,{textAlign:TextAlignManage(i18n.language)}]}>{t("Preferred_Language*")}</Text>
          <Dropdown
            data={this.languageType}
            testID="selectLanguage"
            valueField={"value"}
            labelField={"display"}
            onChange={this.onSelectLanguageChange}
            value={this.state.language}
            maxHeight={200}
            style={styles.dropdownStyle}
            placeholder={i18n.t('selectLanguageText')}
            placeholderStyle={[
              styles.dropDownTextStyle,
              styles.dropdownSelectedStyle,
            ]}
            selectedTextStyle={[styles.dropDownTextStyle,{textAlign:TextAlignManage(i18n.language)}]}
            itemTextStyle={[styles.dropDownTextStyle,{textAlign:TextAlignManage(i18n.language)}]}
            renderRightIcon={i18n.language == "en"? this.dropDownIcon:()=><View></View>}
            renderLeftIcon={i18n.language == "ar"? this.dropDownIcon:()=><View></View>}
            dropdownPosition="top"
            disable={!this.state.editStatus}
          />
          {this.state.errorKey === "language" ? (
            <View style={globalStyle.errContainer}>
              <Text testID="errorText" style={globalStyle.errorText}>
                {this.state.error}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylisteditprofile">
        <CustomHeader
          title={t("stylistProfileText")}
          onLeftPress={()=>{this.props.navigation.goBack()}}
          onRightPress={()=>{}}
        />
        <ScrollView
          ref={this.scrollRef}
          style={styles.mainStyle}
          keyboardShouldPersistTaps="never"
        >
          <this.renderProfileForm />
        </ScrollView>
        <View style={[styles.btnRowStyle,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <CustomButton
            testID="goBack"
            title={this.state.editStatus ? t("Back") : t("Edit")}
            style={styles.backBtnStyle}
            textStyle={styles.rejectText}
            onPress={this.goBackTo}
          />

          <CustomButton
            testID="nextBtn"
            title={t("Update")}
            style={
              this.state.editStatus
                ? styles.nextButtonStyle
                : styles.nextNewButton
            }
            onPress={()=>this.state.editStatus &&this.nextBtn()}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.mediaModal}
          onDismiss={this.closeImageModal}
        >
          <View style={styles.modalMainViewStyle}>
            <SafeAreaView style={styles.modalSafeAreaStyle} />
            <View style={styles.cameraModalMainViewStyle}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  testID={"btn_camera"}
                  style={styles.cameraModalBtn}
                  activeOpacity={0.9}
                  onPress={this.captureImage}
                >
                  <View style={styles.cameraModalViewAddStyle}>
                    <Text style={styles.cameraModalTextAddStyle}>{i18n.t('cameraText')}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  testID={"btn_gallery"}
                  style={[styles.cameraModalBtn, { marginTop: 10 }]}
                  onPress={this.chooseImage}
                >
                  <View style={styles.cameraModalViewAddStyle}>
                    <Text style={styles.cameraModalTextAddStyle}>{i18n.t('galleryText')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.cameraModalCancelViewStyle}>
                <TouchableOpacity
                  testID={"btn_cancelMedia"}
                  onPress={this.closeImageModal}
                  style={styles.cameraModalCancelBtn}
                >
                  <Text style={styles.cameraModalCancelTextStyle}>{i18n.t('cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  mainStyle: {
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
  },

  pfpWrapperStyle: {
    height: width - Scale(40),
    width: width - Scale(40),
    backgroundColor: "#F8F8F8",
  },

  cameraModalBtn: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraModalViewAddStyle: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: (width * 3.5) / 100,
  },
  cameraModalTextAddStyle: {
    textAlign: "center",
    fontSize: (width * 4) / 100,
    color: "#000000",
  },
  cameraModalCancelViewStyle: {
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#0061A7",
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraModalCancelBtn: {
    alignSelf: "center",
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: (width * 3.5) / 100,
  },
  cameraModalCancelTextStyle: {
    fontSize: (width * 4) / 100,
    color: "#FFFFFF",
  },
  modalMainViewStyle: {
    flex: 1,
    backgroundColor: "#00000030",
    alignItems: "center",
  },
  cameraModalMainViewStyle: {
    position: "absolute",
    bottom: (height * 3) / 100,
    width: width,
  },
  modalView: {
    alignSelf: "center",
    width: "100%",
  },
  modalSafeAreaStyle: {
    flex: 0,
  },
  btnWrapperStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: Scale(12),
    width: "100%",
  },
  replaceButtonStyle: {
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    fontWeight: "500",
  },
  replaceImageTextStyle: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropdownStyle: {
    height: Scale(48),
    backgroundColor: "#f8f8f8",
    marginVertical: Scale(8),
    paddingHorizontal: Scale(4),
  },
  btnRowStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
    backgroundColor: "#FFFFFF",
  },
  backBtnStyle: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  nextNewButton: {
    backgroundColor: "#CBD5E1",
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  nextButtonStyle: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  rejectText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropDownTextStyle: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 15,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropdownSelectedStyle: {
    fontWeight: "700",
  },
  dropdownIconStyle: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(16),
    transform: [{ rotate: "90deg" }],
  },

  mainViewFormStyle: { marginBottom: Scale(12) },

  pfpDeleteIconWrapperStyel: {
    position: "absolute",
    top: Scale(16),
    right: Scale(12),
    height: Scale(40),
    width: Scale(40),
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pfpDeleteIconStyle: {
    height: Scale(24),
    width: Scale(24),
  },
  
   errorText:{
    color: 'red',
    fontSize: 11,
    marginTop: 4,
    paddingHorizontal: 4,
    lineHeight: 16,
    maxWidth: '100%',
    flexWrap: 'wrap',
   }
});
// Customizable Area End
