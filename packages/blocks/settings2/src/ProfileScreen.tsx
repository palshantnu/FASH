import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
// Merge Engine - import assets - Start
import * as IMG_CONST from "./assets";
// Merge Engine - import assets - End
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

import ProfileScreenController, { Props } from "./profileScreenController";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

export default class PofileScreen extends ProfileScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderFullName = () => {
    return (
      <View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("firstName")}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isFirstName ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="txtInputFirstName"
              placeholder={i18n.t("enterFirstName")}
              placeholderTextColor="#375280"
              style={[styles.textinputStyle, { textAlign: TextAlignManage(i18n.language)}]}
              value={this.state.firstName}
              maxLength={20}
              onChangeText={this.handleFirstName}
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              keyboardType="default"
            />
          </View>
          {this.state.isFirstName && (
            <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>
              {i18n.t("firstNameValidation")}
            </Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("lastName")}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isLastName ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="txtInputLastName"
              placeholder={i18n.t("enterLastName")}
              placeholderTextColor="#375280"
              style={[styles.textinputStyle, { textAlign: TextAlignManage(i18n.language)}]}
              value={this.state.lastName}
              maxLength={20}
              onChangeText={this.handleLastName}
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              keyboardType="default"
            />
          </View>
          {this.state.isLastName && (
            <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>
              {i18n.t("lastNameValidation")}
            </Text>
          )}
        </View>
      </View>
    );
  };

  renderEmailPass = () => {
    return (
      <>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("emailAddress")}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isEmail ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="txtInputEmail"
              placeholder={i18n.t("enterEmail")}
              placeholderTextColor="#375280"
              style={[styles.textinputStyle, { textAlign: TextAlignManage(i18n.language)}]}
              value={this.state.email}
              maxLength={30}
              onChangeText={this.handleEmail}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          {this.state.isEmail && (
            <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
          )}
        </View>
      </>
    );
  };

  renderPhonenumber = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("enterPhoneNumber")}</Text>
        <MobileWithCountryCodesInput
          optionsList={this.state.countryList}
          inputValue={this.state.phoneNumber}
          onValueChange={this.handlePhoneNumber}
          onSelect={this.handleCountrySelect}
          selectedIndex={this.state.selectedCountryIndex}
          open={this.state.dropdownOpen}
          toggleOpen={this.handleDropdownToggle}
          inputTestId="txtInputPhoneNumber"
        />
        {this.state.isPhone && (
          <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  };

  renderPassField = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("oldPassword")}</Text>
        <View
          style={[
            styles.passViewContainer,
            {flexDirection:FlexConditionManage(i18n.language)},
            { borderColor: this.state.isOldPassowrd ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtOldPassword"
            placeholder={i18n.t("enterYourOldPassword")}
            placeholderTextColor="#375280"
            style={[styles.passTextInput, { textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.oldPassword}
            onChangeText={this.handleOldPassword}
            autoCapitalize="none"
            maxLength={20}
            secureTextEntry={!this.state.isOldHidePassword}
            keyboardType="default"
          />
          <TouchableOpacity
            testID="btnoldPasswordHide"
            style={styles.btnPasdHid}
            onPress={this.toggleOldPassword}
          >
            <Image
              source={
                this.state.isOldHidePassword
                  ? IMG_CONST.VisibleIcon
                  : IMG_CONST.InVisibleIcon
              }
              style={styles.passIcon}
            />
          </TouchableOpacity>
        </View>
        {this.state.isOldPassowrd && (
          <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  };

  renderNewPassField = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("newPassword")}</Text>
        <View
          style={[
            styles.passViewContainer,
            {
              flexDirection: FlexConditionManage(i18n.language),
              borderColor:
                this.state.isNewPassowrd || this.state.isComPass
                  ? "#F87171"
                  : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtNewPassword"
            placeholder={i18n.t("enterYourNewPassword")}
            placeholderTextColor="#375280"
            style={[styles.passTextInput, { textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.newPassword}
            onChangeText={this.handleNewPassword}
            autoCapitalize="none"
            maxLength={20}
            secureTextEntry={!this.state.isHidePassword}
            keyboardType="default"
          />
          <TouchableOpacity
            testID="btnNewPasswordHide"
            style={styles.btnPasdHid}
            onPress={this.toggleNewPassword}
          >
            <Image
              source={
                this.state.isHidePassword
                  ? IMG_CONST.VisibleIcon
                  : IMG_CONST.InVisibleIcon
              }
              style={styles.passIcon}
            />
          </TouchableOpacity>
        </View>
        {this.state.isNewPassowrd && (
          <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
        )}
        {this.state.isComPass && (
          <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  };

  renderNewConPassField = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t('repeatNewPassword')} </Text>
        <View
          style={[
            styles.passViewContainer,
            { borderColor: this.state.isComPassword ? "#F87171" : "#F8F8F8", flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <TextInput
            testID="txtInputConfirmPassword"
            placeholder={i18n.t('enterYourRepeatNewPassword')}
            placeholderTextColor="#375280"
            style={[styles.passTextInput, { textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.comPassword}
            onChangeText={this.handleConfirmPassword}
            autoCapitalize="none"
            maxLength={20}
            secureTextEntry={!this.state.isHideComPassword}
            keyboardType="default"
          />
          <TouchableOpacity
            testID="btnRePasswordHide"
            style={styles.btnPasdHid}
            onPress={this.toggleConfirmPassword}
          >
            <Image
              source={
                this.state.isHideComPassword
                  ? IMG_CONST.VisibleIcon
                  : IMG_CONST.InVisibleIcon
              }
              style={styles.passIcon}
            />
          </TouchableOpacity>
        </View>
        {this.state.isComPassword && (
          <Text style={[styles.profileerror, { textAlign: TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        {this.state.isLoading && <CustomLoader />}
          <View style={styles.container}>
            <View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity
                testID="backButtonID"
                onPress={() => this.props.navigation.goBack()}
              >
                <Image resizeMode="contain" source={IMG_CONST.backUpdateIcon} style={[styles.backIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </TouchableOpacity>
              <Text style={styles.headertext}>{i18n.t("myProfile")}</Text>
              <View />
            </View>
            <KeyboardAvoidingView
            behavior={this.isPlatformiOS() ? "padding" : undefined}
            style={{ flex: 1 }}>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: Scale(30) }}>
                {this.renderFullName()}
                {this.renderEmailPass()}
                {this.renderPhonenumber()}
                <View style={styles.fieldContainer}>
                  <TouchableOpacity
                    testID="btnCreateAccount"
                    style={styles.buttonView}
                    onPress={this.onPressSaveChnages}
                  >
                    <Text style={styles.createText}>{i18n.t('saveChanges')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.chnageText}>{i18n.t('changePassword')}</Text>
                </View>
                {this.renderPassField()}
                {this.renderNewPassField()}
                {this.renderNewConPassField()}
                <View style={styles.fieldContainer}>
                  <TouchableOpacity
                    testID="btnChangepass"
                    style={styles.buttonView}
                    onPress={this.onPressChangePass}
                  >
                    <Text style={styles.createText}>{i18n.t('changePassword')}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  backIconImg: {
    width:windowWidth*5/100,
    height:windowWidth*5/100
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
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
    borderRadius: Scale(8),
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  textinputStyle: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    paddingVertical: Scale(14),
    paddingHorizontal: Scale(8),
  },
  profileerror: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  passViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    justifyContent: "space-between",
    borderColor: "#F8F8F8",
    marginTop: Scale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  passTextInput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    letterSpacing: Scale(0.44),
    width: "90%",
    justifyContent: "center",
  },
  btnPasdHid: {
    width: Scale(22),
    height: Scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  passIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  buttonView: {
    width: "100%",
    height: Scale(50),
    backgroundColor: "#CCBEB1",
    borderRadius: Scale(4),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 12,
  },
  createText: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(20),
    lineHeight: Scale(26),
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: Scale(0.2),
  },
  chnageText: {
    fontFamily: "Avenir-Heavy",
    fontSize: 22,
    fontWeight: "800",
    color: "#375280",
    textAlign: "center",
    letterSpacing: -0.4,
  },
});
// Customizable Area End
