import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import Scale from "../../../components/src/Scale";

import { exportIcon, deleteIcon } from "./assets";

const { width, height } = Dimensions.get("window");
// Customizable Area End

import StylistVerificationController, {
  Props,
} from "./StylistVerificationController";
import i18n from "../../../components/src/i18n/i18n.config";

export default class StylistVerification extends StylistVerificationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderUploadBlock = ({
    label,
    text,
    stateName,
    testID,
  }: {
    label: string;
    stateName:
      | "passport"
      | "commercial_license"
      | "moa"
      | "authorized_signature"
      | "business_bank_account";
    text?: string;
    testID?: string;
  }) => (
    <View style={globalStyle.inputWrapper}>
      <Text style={[globalStyle.inputLabel,{textAlign:this.returnAlignment()}]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.block,
          this.state.errorKey === stateName ? styles.error : {},
        ]}
        activeOpacity={0.9}
        onPress={() => this.openModal(stateName)}
        testID={testID}
      >
        <Image source={exportIcon} style={styles.exportIcon} />
        <Text style={styles.exportText}>{i18n.t("Upload png, jpg, jpeg")}</Text>
      </TouchableOpacity>
      {text ? <Text  style={[styles.subtext,{textAlign:this.returnAlignment()}]}>{text}</Text> : null}
      {this.state[stateName].uri ? (
        <View style={styles.thumbs}>
          <Image
            source={{ uri: this.state[stateName].uri }}
            style={styles.exportIcon}
          />
          <Text numberOfLines={1} style={styles.filename}>
            {this.state[stateName].backupFileName}
          </Text>
          <TouchableOpacity
            style={styles.deleteWrapper}
            testID={`delete-${stateName}`}
            onPress={() => this.removeDoc(stateName)}
          >
            <Image source={deleteIcon} style={styles.delete} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylistDocs">
        <CustomHeader leftTestId={"customHeaderId"} title= {i18n.t("Verify_Account_")} onLeftPress={() => {this.props.navigation.goBack()}} />
        <ScrollView style={styles.main}>
          <this.renderUploadBlock
            testID="passport"
            label={i18n.t("Civil_ID/Passport")}
            stateName="passport"
            text={
             i18n.t("Passport_is_accepted")
            }
          />
          <this.renderUploadBlock
            testID="commercial_license"
            label={i18n.t("Commercial_License")}
            stateName="commercial_license"
          />
          <this.renderUploadBlock
            testID="authorized_signature"
            label={i18n.t("Authorized_Signatures")}
            stateName="authorized_signature"
          />
          <this.renderUploadBlock
            testID="moa"
            label={i18n.t("MOAorAOA")}
            stateName="moa"
            text={i18n.t("CopyoftheMemorandum")}
          />
          <this.renderUploadBlock
            testID="business_bank_account"
            label={i18n.t("BusinessBankAccount")}
            stateName="business_bank_account"
            text={i18n.t ("The_above_info_must")}
          />
          <View style={[styles.buttonRow,{flexDirection:this.returnFlexDirection()}]}>
            <CustomButton
              testID="goBack"
              title={i18n.t( "Back")}
              style={styles.backButton}
              textStyle={styles.backtext}
              onPress={this.goBack}
            />
            <CustomButton
              testID="nextBtn"
              title={i18n.t("Upload")}
              style={styles.uploadButton}
              onPress={this.uploadDocs}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.mediaModal}
          onDismiss={this.closeModal}
        >
          <View style={styles.modalMainView}>
            <SafeAreaView style={styles.modalSafe}></SafeAreaView>
            <View style={styles.uploadButtonsModal}>
              <View style={styles.modalSecondView}>
                <TouchableOpacity
                  style={styles.cameraModalPressable}
                  onPress={this.capturePhoto}
                  activeOpacity={0.9}
                  testID={"btnCamera"}
                >
                  <View style={styles.modalOptionWrapper}>
                    <Text style={styles.modalOptionsText}>Camera</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.choosePhoto}
                  testID={"btnGallery"}
                  activeOpacity={0.9}
                  style={[styles.cameraModalPressable, { marginTop: 10 }]}
                >
                  <View style={styles.modalOptionWrapper}>
                    <Text style={styles.modalOptionsText}>Gallery</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCancelOptionView}>
                <TouchableOpacity
                  testID={"btnCancelMedia"}
                  onPress={this.closeModal}
                  style={styles.cameraModalCancel}
                >
                  <Text style={styles.cameraModalCancelTextAdd}>Cancel</Text>
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
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  main: { flex: 1, padding: Scale(20) },
  block: {
    marginTop: Scale(12),
    backgroundColor: "#F8F8F8",
    width: width - Scale(40),
    height: (width - Scale(40)) * (140 / 380),
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Scale(20),
    paddingHorizontal: Scale(12),
    borderRadius: Scale(2),
    overflow: "hidden",
    marginBottom: Scale(8),
  },
  exportIcon: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(4),
  },
  exportText: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: Scale(18),
    marginBottom: Scale(8),
  },
  subtext: {
    color: "#94A3B8",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: Scale(14),
    marginBottom: Scale(8),
    lineHeight: 22,
  },
  thumbs: {
    height: Scale(80),
    width: Scale(80),
    alignItems: "center",
    borderColor: "#E2E8F0",
    borderWidth: Scale(1),
    borderRadius: Scale(2),
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingHorizontal: Scale(10),
    marginRight: Scale(8),
    marginVertical: Scale(8),
  },
  filename: {
    color: "#94A3B8",
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: Scale(12),
    marginBottom: Scale(8),
    lineHeight: 18,
  },
  deleteWrapper: {
    position: "absolute",
    top: Scale(4),
    right: Scale(4),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(24),
    height: Scale(24),
    width: Scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    height: Scale(16),
    width: Scale(16),
  },
  btn: {
    marginVertical: Scale(20),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Scale(10),
    paddingBottom: Scale(40),
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  uploadButton: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  backtext: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  error: {
    borderWidth: Scale(2),
    borderColor: "#F87171",
  },
  cameraModalPressable: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOptionWrapper: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: (width * 3.5) / 100,
  },
  modalOptionsText: {
    textAlign: "center",
    fontSize: (width * 4) / 100,
    color: "#000000",
  },
  modalCancelOptionView: {
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#0061A7",
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraModalCancel: {
    alignSelf: "center",
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: (width * 3.5) / 100,
  },
  cameraModalCancelTextAdd: {
    fontSize: (width * 4) / 100,
    color: "#FFFFFF",
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000030",
    alignItems: "center",
  },
  uploadButtonsModal: {
    position: "absolute",
    bottom: (height * 3) / 100,
    width: width,
  },
  modalSecondView: {
    alignSelf: "center",
    width: "100%",
  },
  modalSafe: {
    flex: 0,
  },
});
