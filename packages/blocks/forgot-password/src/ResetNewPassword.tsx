import React from "react";
// Customizable Area Start
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Scale from "../../../components/src/Scale";
import * as IMG_CONST from "./assets";
import ResetNewPasswordController from "./ResetNewPasswordController";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class ResetNewPassword extends ResetNewPasswordController {
  // Customizable Area Star

  renderUserLogin = () => {
    return (
      <View style={styles.inputContainers}>
        <Text style={styles.passwordText}>{i18n.t("enterNewPassword")}</Text>
        <View
          style={[
            styles.passwordInput,
            {
              flexDirection: FlexConditionManage(i18n.language),
              borderColor: this.state.isPassword ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="passwordID"
            style={[
              styles.usenameTextinput,
              { textAlign: TextAlignManage(i18n.language) },
            ]}
            placeholder={i18n.t("enterYourNewPassword")}
            placeholderTextColor="#375280"
            value={this.state.password}
            onChangeText={(text) =>
              this.setState({ password: text, isPassword: false })
            }
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry={!this.state.hidePassword}
          />
          <TouchableOpacity
            testID="eyeImageID"
            style={styles.eyeImage}
            onPress={() =>
              this.setState({ hidePassword: !this.state.hidePassword })
            }
          >
            <Image
              source={
                this.state.hidePassword
                  ? IMG_CONST.VisibleIcon
                  : IMG_CONST.InVisibleIcon
              }
              style={styles.eyeImg}
            />
          </TouchableOpacity>
        </View>
        {this.state.isPassword && (
          <Text style={styles.errorName}>{this.state.errorMessage}</Text>
        )}
        <Text style={[styles.passwordText, { marginTop: 20 }]}>
          {i18n.t("confirm_new_password")}
        </Text>
        <View
          style={[
            styles.passwordInput,
            {
              flexDirection: FlexConditionManage(i18n.language),
              borderColor: this.state.isComPassword ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="CnfPasswordID"
            style={[
              styles.usenameTextinput,
              { textAlign: TextAlignManage(i18n.language) },
            ]}
            placeholder={i18n.t("enter_your_confirm_password")}
            placeholderTextColor="#375280"
            value={this.state.confirmPassword}
            onChangeText={(text) =>
              this.setState({ confirmPassword: text, isComPassword: false })
            }
            autoCapitalize="none"
            keyboardType="default"
            maxLength={20}
            secureTextEntry={!this.state.hidePasswordConfirm}
          />
          <TouchableOpacity
            testID="ConeyeImagesID"
            style={styles.eyeImage}
            onPress={() =>
              this.setState({
                hidePasswordConfirm: !this.state.hidePasswordConfirm,
              })
            }
          >
            <Image
              source={
                this.state.hidePasswordConfirm
                  ? IMG_CONST.VisibleIcon
                  : IMG_CONST.InVisibleIcon
              }
              style={styles.eyeImg}
            />
          </TouchableOpacity>
        </View>
        {this.state.isComPassword && (
          <Text style={styles.errorName}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  };
  rendersignUpButton = () => {
    return (
      <View style={styles.resetbuttonView}>
        <TouchableOpacity
          testID="resetpasswordID"
          style={styles.resetPasswordButton}
          onPress={() => this.handleContinue()}
        >
          <Text style={styles.resetPasswordTextBtn}>
            {i18n.t("Reset_Password")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End
  render = () => {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        {this.state.isLoading && <CustomLoader />}
        <View style={styles.container}>
          <View
            style={[
              styles.headerContainer,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="backButtonID"
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                source={IMG_CONST.BackIcon}
                style={[
                  styles.backIconImg,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.headertext}>{i18n.t("Reset_Password")}</Text>
            <View />
          </View>
          <ScrollView bounces={false} keyboardShouldPersistTaps="always">
            {this.renderUserLogin()}
          </ScrollView>
          <View style={styles.bottomContainer}>
            {this.rendersignUpButton()}
          </View>
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  };
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  backIconImg: {
    width: Scale(32),
    height: Scale(32),
    tintColor: "#475569",
    marginLeft: Scale(-5),
  },
  headertext: {
    fontFamily: "Avenir-Heavy",
    fontSize: Scale(20),
    fontWeight: "800",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
    marginLeft: -30,
  },
  inputContainers: {
    paddingTop: 16,
  },
  passwordText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
  passwordInput: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#f8f8f8",
    height: Scale(50),
    justifyContent: "space-between",
    borderColor: "#F8F8F8",
    marginTop: Scale(5),
    alignSelf: "center",
    alignItems: "center",
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
    marginBottom: 10,
  },
  usenameTextinput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    letterSpacing: Scale(0.44),
    width: "90%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  eyeImage: {
    width: Scale(22),
    height: Scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  eyeImg: {
    width: Scale(24),
    height: Scale(24),
  },
  bottomContainer: {
    bottom: 20,
  },
  resetbuttonView: {
    marginTop: 10,
  },
  resetPasswordButton: {
    width: "100%",
    height: Scale(56),
    backgroundColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Scale(5),
  },
  resetPasswordTextBtn: {
    fontFamily: "Lato-Black",
    color: "#FFFFFF",
    fontSize: Scale(20),
    lineHeight: Scale(26),
    letterSpacing: Scale(0.02),
  },
});
// Customizable Area End
