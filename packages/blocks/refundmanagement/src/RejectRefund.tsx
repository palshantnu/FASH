import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomTextInput from "../../../components/src/CustomTextInput";
import Scale from "../../../components/src/Scale";
import globalStyle from "../../../components/src/GlobalStyle";
import i18n from '../../../components/src/i18n/i18n.config'
import {exportIcon } from "../../photolibrary/src/assets";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { deviceHeight, deviceWidth } from "../../../framework/src/Utilities";

import { upload } from "./assets";
// Customizable Area End

import RejectRefundController, {
  Props,
  configJSON,
} from "./RejectRefundController";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";

export default class RejectRefund extends RejectRefundController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title={
            this.state.mode === "return"
              ? `${i18n.t('rejectReturnOrder')}`
              : `${i18n.t('rejectRefundText')}`
          }
          onLeftPress={this.goBack}
          leftTestId="goBackButton"
        />
        <View style={styles.main}>
          {this.state.mode === "return" ? (
            <Text style={[styles.confirmText]}>
              {i18n.t('sureRejectReturnOrder')}
            </Text>
          ) : null}
          <View style={[globalStyle.inputWrapper,{marginBottom:10}]}>
            <Text style={[globalStyle.inputLabel, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('reasonOfRejection')}*</Text>
            <Dropdown
              testID="reasonDd"
              data={this.reasons}
              labelField={"label"}
              valueField={"label"}
              value={this.reasons[this.state.rejectReason]}
              onChange={this.onReasonChange}
              placeholder={i18n.t('selectReasonText')}
              style={[
                styles.dropdown,
                this.state.error === "rejectReason"
                  ? {
                      borderColor: "#DC2626",
                    }
                  : {},
              ]}
              itemTextStyle={[styles.ddText,{ textAlign: TextAlignManage(i18n.language) }]}
              placeholderStyle={[styles.ddText, styles.ddPlaceholder,{ textAlign: TextAlignManage(i18n.language) }]}
              selectedTextStyle={[styles.ddText, styles.ddSelectedText,{ textAlign: TextAlignManage(i18n.language) }]}
            />
            <View style={globalStyle.errContainer}>
              {this.state.error === "rejectReason" ? (
                <Text style={[globalStyle.errorText,{height:Scale(30),marginTop:6},{ textAlign: TextAlignManage(i18n.language) }]}>
                  * {i18n.t('selectReasonReject')}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{ marginTop: Scale(-12) }}>
            {this.state.mode === "return" ? (
              <View>
                <Text style={[styles.detailtext,{ textAlign: TextAlignManage(i18n.language) }]}>{`${i18n.t('rejectionDetail')}*`}</Text>
                <View style={styles.inputboxstyle}>
                <TextInput
                    testID="rejDetailsInput"
                    value={this.state.rejectDescription}
                    onChangeText={this.onReasonUpdate}
                    multiline={true}
                    // numberOfLines={4}
                    placeholder={i18n.t('enterTheReason')}
                    style={[styles.detailTextInput,{ textAlign: TextAlignManage(i18n.language) }]}
                    placeholderTextColor={'#94A3B8'}
                />
                </View>
                
                <Text style={[styles.discriptiontext,{ textAlign: TextAlignManage(i18n.language) }]}>{this.state.error=== "rejectDescription"?`* ${i18n.t('pleaseEnterRejectionDetail')}`:null}</Text>
              </View>
            ) : (
              <>
                <Text style={[globalStyle.inputLabel,{fontWeight:'100'},{ textAlign: TextAlignManage(i18n.language) }]}>
                  {i18n.t('uploadTheItemIamge')}*
                </Text>
                  {this.state.rejectDoc.uri ? (
                    <Image
                      style={styles.img}
                      resizeMode="contain"
                      source={
                        { uri: this.state.rejectDoc.uri }
                      }
                      testID="uploadImage"
                    />
                  ) : (
                    <View
                      style={styles.emptyImagePortfolioContainerRefund}
                      testID="MediaUploadPortfolio">
                      <Image
                        source={exportIcon}
                        style={styles.multiplePhotos}
                      />
                      <Text style={styles.uploadPhoto}>{i18n.t('uploadImg')}</Text>
                      <Text style={styles.uploadPhotoDes}>{i18n.t('onlyPngAccepted')}</Text>
                    </View>
                  )}
                {this.state.error === "rejectDoc" ? (
                  <View style={globalStyle.errContainer}>
                    <Text style={globalStyle.errorText}>
                      * {i18n.t('pleaseSelectImage')}
                    </Text>
                  </View>
                ) : null}
                <CustomButton
                  style={styles.uploadButton}
                  textStyle={styles.closeText}
                  title={i18n.t('uploadPic')}
                  testID="uploadPhoto"
                  onPress={this.openModal}
                />
              </>
            )}
          </View>
        </View>
        <View style={[styles.buttonRow, {flexDirection:FlexConditionManage(i18n.language)}]}>
          <CustomButton
            testID="closeBtn"
            title={i18n.t('close')}
            style={styles.closeButton}
            textStyle={styles.closeText}
            onPress={this.goBack}
          />
          <CustomButton
            testID="confirmBtn"
            title={i18n.t('reject')}
            style={styles.confirmButton}
            onPress={this.reject}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onDismiss={this.dismissModal}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.safeModal} />
            <View style={styles.modalButtonsArea}>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  testID={"btnCamera"}
                  style={styles.photoButtons}
                  activeOpacity={0.9}
                  onPress={this.capturePhoto}
                >
                  <View style={styles.photoButton}>
                    <Text style={styles.modalButtonText}>{i18n.t('cameraText')}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  testID={"btnGallery"}
                  style={[styles.photoButtons, { marginTop: 10 }]}
                  onPress={this.selectPhoto}
                >
                  <View style={styles.photoButton}>
                    <Text style={styles.modalButtonText}>{i18n.t('galleryText')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCancelArea}>
                <TouchableOpacity
                  testID={"btnCancelMedia"}
                  onPress={this.dismissModal}
                  style={styles.modalCancelButton}
                >
                  <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  main: { flex: 1, margin: Scale(20) },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000030",
    alignItems: "center",
  },
  safeModal: {
    flex: 0,
  },
  inputboxstyle:{
    height:Scale(120), marginTop: Scale(1),padding:5,
   
    backgroundColor:"#f5f3f3"
  },
  emptyImagePortfolioContainerRefund: {
    borderRadius: 2,
    backgroundColor:'#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    width: Scale(380),
    height: Scale(185),
    marginTop: 20
  },
  multiplePhotos: {
    height:responsiveHeight(5),
    width:responsiveHeight(5),
    marginBottom:15,
    resizeMode: "cover",
  },
  uploadPhoto:{
    fontFamily: "Lato-Regular",
    fontSize: Scale(17),
    fontWeight: "600",
    color: "#375280",
    marginBottom:7
  },
  uploadPhotoDes:{
    fontFamily: "Lato-Regular",
    fontSize: Scale(15),
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom:5,
    paddingBottom:10,
  },
  detailTextInput:{ 
    height:Scale(100), 
    marginTop: Scale(1),
    textAlignVertical:'top',
    padding:5,
    color:"#94A3B8"
  },
  modalButtonsArea: {
    position: "absolute",
    bottom: (deviceHeight * 3) / 100,
    width: deviceWidth,
  },
  modalButtons: {
    alignSelf: "center",
    width: "100%",
  },
  photoButtons: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  photoButton: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: (deviceWidth * 3.5) / 100,
  },
  modalButtonText: {
    textAlign: "center",
    fontSize: (deviceWidth * 4) / 100,
    color: "#000000",
  },
  confirmText: {
    textAlign: "center",
    margin: Scale(5),
    color: "#375280",
  },
  textArea: {
    height: Scale(160),
  },
  modalCancelArea: {
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#0061A7",
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelButton: {
    alignSelf: "center",
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: (deviceWidth * 3.5) / 100,
  },
  cancelText: {
    fontSize: (deviceWidth * 4) / 100,
    color: "#FFFFFF",
  },
  dropdown: {
    height: Scale(48),
    marginTop: Scale(5),
    justifyContent: "center",
    paddingHorizontal: Scale(16),
    backgroundColor: "#f5f3f3",
    borderWidth: 1,
    borderColor: "#F8F8F8",
  },
  ddText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: "#375280",
    paddingRight: 10,
    fontWeight: "500",
  },
  ddPlaceholder: {
    color: "#94A3B8",
  },
  ddSelectedText: {
    fontWeight: "700",
  },
  imageLabel: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: "#375280",
    paddingRight: 10,
    fontWeight: "400",
  },
  img: {
    width: deviceWidth - Scale(40),
    height: (185 / 380) * (deviceWidth - Scale(40)),
    borderRadius: Scale(4),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
    backgroundColor: "#FFFFFF",
  },
  uploadButton: {
    marginTop: Scale(20),
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  closeButton: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  confirmButton: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  closeText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  detailtext:{
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: Scale(16),
    color: "#375280",
    marginBottom: Scale(6),
    marginTop:5
  },
  discriptiontext:{
    color:'#DC2626'
  }
});
// Customizable Area End
