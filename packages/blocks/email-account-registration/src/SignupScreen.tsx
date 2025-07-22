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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import SignupScreenController, { Props } from "./SignupScreenController";
import * as IMG_CONST from "./assets";
import { rightArrow } from "./../../email-account-login/src/assets"
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import { imageDivider } from "../../mobile-account-login/src/assets";
// Customizable Area End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class SignupScreen extends SignupScreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  renderFullName = () => {
    return (
      <View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('Full Name')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isFirstName ? "#D0D5DD" : "#D0D5DD" },
            ]}
          >
            <TextInput
              testID="txtInputFirstName"
              placeholder={i18n.t('e.g. John Deo')}
              placeholderTextColor="#667085"
              style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
              value={this.state.firstName}
              maxLength={20}
              onChangeText={this.handleFirstName}
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              keyboardType="default"
            />
          </View>
          {this.state.isFirstName && (
            <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>
              {i18n.t('FirstNameError')}
            </Text>
          )}
        </View>
        {/* <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('LastName')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isLastName ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="txtInputLastName"
              placeholder={i18n.t('LastNamePlaceholder')}
              placeholderTextColor="#667085"
              style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
              value={this.state.lastName}
              maxLength={40}
              onChangeText={this.handleLastName}
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              keyboardType="default"
            />
          </View>
          {this.state.isLastName && (
            <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>
              {i18n.t('LastNameError')}
            </Text>
          )}
        </View> */}
      </View>
    );
  };

  renderEmailPass = () => {
    return (
      <>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('EmailAddress')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: this.state.isEmail ? "#D0D5DD" : "#D0D5DD" ,   borderWidth: 1,},
            ]}
          >
            <TextInput
              testID="txtInputEmail"
              placeholder={i18n.t("e.g. johndeo@gmailcom")}
              placeholderTextColor="#667085"
              style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
              value={this.state.email}
              maxLength={80}
              onChangeText={this.handleEmailChange}
              onSubmitEditing={Keyboard.dismiss}
              autoCapitalize="none"
              keyboardType="default"
              autoCorrect={false}
            />
          </View>
          {this.state.isEmail && (
            <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('Password')}</Text>
          <View
            style={[
              styles.passwordViewContainer,
              { borderColor: this.state.isPassowrd ? "#D0D5DD" : "#D0D5DD" }, { flexDirection: FlexConditionManage(i18n.language) }
            ]}
          >
            <TextInput
              testID="txtInputPassword"
              placeholder={i18n.t('Create password')}
              placeholderTextColor="#667085"
              style={[styles.passwordTextInput, { textAlign: TextAlignManage(i18n.language) }]}
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              autoCapitalize="none"
              maxLength={20}
              secureTextEntry={!this.state.isHidePassword}
              onSubmitEditing={Keyboard.dismiss}
              keyboardType="default"
            />
            <TouchableOpacity
              testID="btnPasswordHide"
              style={styles.btnPasswordHide}
              onPress={this.togglePasswordHide}
            >
              <Image
                source={
                  this.state.isHidePassword
                    ? IMG_CONST.VisibleIcon
                    : IMG_CONST.UnVisibleIcon
                }
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          {this.state.isPassowrd && (
            <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.errorMessage}</Text>
          )}
          <View style={styles.passwordRules}>
            <Text style={styles.ruleText}>• Minimum 8 characters</Text>
            <Text style={styles.ruleText}>• At least 1 number</Text>
            <Text style={styles.ruleText}>• At least 1 special character</Text>
          </View>
        </View>
        {/* <View style={styles.fieldContainer}>
          <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('ConfirmReenterPassword')} </Text>
          <View
            style={[
              styles.passwordViewContainer,
              { borderColor: this.state.isComPass ? "#F87171" : "#F8F8F8" }, { flexDirection: FlexConditionManage(i18n.language) }
            ]}
          >
            <TextInput
              testID="txtInputConfirmPassword"
              placeholder={i18n.t('ReenterPasswordYour')}
              placeholderTextColor="#667085"
              style={[styles.passwordTextInput, { textAlign: TextAlignManage(i18n.language) }]}
              value={this.state.comPassword}
              onChangeText={this.handleConfirmPasswordChange}
              autoCapitalize="none"
              maxLength={20}
              secureTextEntry={!this.state.isHideComPassword}
              keyboardType="default"
            />
            <TouchableOpacity
              testID="btnRePasswordHide"
              style={styles.btnPasswordHide}
              onPress={this.toggleConfirmPasswordHide}
            >
              <Image
                source={
                  this.state.isHideComPassword
                    ? IMG_CONST.VisibleIcon
                    : IMG_CONST.UnVisibleIcon
                }
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          {this.state.isComPass && (
            <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.errorMessage}</Text>
          )}
        </View> */}
      </>
    );
  };

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.header} />
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />

          <View style={styles.container}>
            <View
              style={{
                width: 40,
                height: 10,
                backgroundColor: "#D1D5DB",
                borderRadius: 10,
                alignSelf: "center",
              }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.mainLogoView}>
                    <Image
                      resizeMode="contain"
                      source={IMG_CONST.FashLogo}
                      style={styles.mainLogoIcon}
                    />
                  </View>

                  <View style={styles.headingView}>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <Text style={styles.loginSubHeadingText}>
                      Your personal style destination
                    </Text>
                  </View>
                  {/* Social Buttons */}
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={IMG_CONST.Google} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Continue with Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={IMG_CONST.Facebook} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Continue with Facebook</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <Image source={IMG_CONST.Apple} style={styles.socialIcon} />
                    <Text style={styles.socialText}>Continue with Apple</Text>
                  </TouchableOpacity>

                  <View style={styles.continueWithMainView}>
                    <View style={styles.dividerView}>
                      <Image source={imageDivider} style={styles.dividerImage} />
                    </View>
                    <Text style={styles.continueText}>or</Text>
                    <View style={styles.dividerView}>
                      <Image source={imageDivider} style={styles.dividerImage} />
                    </View>
                  </View>

                  {this.renderFullName()}
                  {this.renderEmailPass()}
                  <View style={styles.fieldContainer}>
                    <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('enterPhoneNumber')}</Text>
                    <MobileWithCountryCodesInput
                      testID="mobileNumberInputComp"
                      optionsList={this.state.countryList}
                      inputValue={this.state.phoneNumber}
                      onValueChange={this.handleMobileChange}
                      open={this.state.dropdownOpen}
                      toggleOpen={this.toggleCountryDropdown}
                      selectedIndex={this.state.selectedCodeIndex}
                      onSelect={this.handleCountrySelect}
                      hasError={this.state.isPhone}
                    />
                    {this.state.isPhone && (
                      <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>
                        {this.state.errorMessage}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.tncContainer, { flexDirection: FlexConditionManage(i18n.language),marginTop:10 }]}>
                    <View style={[styles.checkboxCon, { marginRight: i18n.language === "ar" ? 0 : 5, marginLeft: i18n.language === "ar" ? 5 : 0 }]}>
                      <TouchableOpacity
                        testID="checkbox"
                        style={[
                          styles.checkboxstyle,
                          {
                            borderColor: this.state.isvalidCheck
                              ? "#F87171"
                              : "#375280",
                          },
                        ]}
                        onPress={this.handleCheckboxChange}
                      >
                        {this.state.isChecked && (
                          <Image
                            testID="checkboxImage"
                            source={IMG_CONST.check}
                            style={styles.passwordIcon}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.tncContainerdes, { flexDirection: FlexConditionManage(i18n.language), marginTop: 3 }]}>
                      <Text style={styles.trmtext}>
                      I agree to the 
                      </Text>
                      <TouchableOpacity
                        style={styles.ppBtn}
                        testID="btnTnC"
                        onPress={this.nevigateToTermNdCondition}
                      >
                        <Text style={styles.trmtextbtn}>
                          {i18n.t('TermsConditions')}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.trmtext}>{i18n.t('and')}</Text>
                      <TouchableOpacity
                        style={styles.ppBtn}
                        testID="btnPnS"
                        onPress={this.nevigateToPrivacyStatement}
                      >
                        <Text style={styles.trmtextbtn}>
                          {i18n.t('Privacy Policy')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.isvalidCheck && (
                      <Text style={[styles.errorName, { textAlign: TextAlignManage(i18n.language) }]}>
                        {this.state.errorMessage}
                      </Text>
                    )}
                  </View>
                  <View style={styles.fieldContainer}>
                    <TouchableOpacity
                      testID="btnCreateAccount"
                      style={styles.buttonView}
                      onPress={this.createAccount}
                    >
                      <Text style={styles.createText}>{i18n.t('CreateAccount')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.tncContainerdes, { flexDirection: FlexConditionManage(i18n.language), marginTop: 3,justifyContent:'center' }]}>
                      <Text style={styles.trmtext}>
                      Already have an account?
                      </Text>
                      <TouchableOpacity
                        style={styles.ppBtn}
                        testID="btnTnC"
                        onPress={this.nevigateToTermNdCondition}
                      >
                        <Text style={styles.trmtextbtn}>
                          {i18n.t('Log_In')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        {this.state.isLoading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: "#fff" },
  container: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 80, height: 40, resizeMode: "contain" },

  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  socialIcon: { width: 20, height: 20, marginRight: 12 },
  socialText: { fontSize: 16, color: "#1E293B", fontWeight: "500" },

  orDivider: {
    textAlign: "center",
    marginVertical: 16,
    fontSize: 14,
    color: "#94A3B8",
  },
  continueWithMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowWidth * 5 / 100
  },
  dividerView: {
    width: windowWidth * 28 / 100,
    marginTop: windowWidth * 2 / 100
  },
  dividerImage: {
    width: windowWidth * 28 / 100,
    height: windowHeight * 0.2 / 100
  },
  header: {
    height: Scale(90),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#324B74",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backIconImg: {
    width: Scale(32),
    height: Scale(32),
    tintColor: "#475569",
    marginLeft: Scale(-5),
  },
  signupText: {
    fontFamily: "Avenir-Heavy",
    fontSize: Scale(20),
    fontWeight: "800",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
    marginLeft: -35,
  },
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(16),
    color: "#1E2D46",
    paddingBottom: 6,
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    // backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    borderColor:'#D0D5DD'
  },
  buildingTextInput: {
    fontFamily: "Lato-Regular",
    color: "#1E2D46",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  passwordViewContainer: {
    borderWidth: 1,
    borderRadius: 8,
    // backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    justifyContent: "space-between",
    borderColor: "#F8F8F8",
    marginTop: Scale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  passwordTextInput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    letterSpacing: Scale(0.44),
    width: "90%",
    justifyContent: "center",
  },
  btnPasswordHide: {
    width: Scale(22),
    height: Scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  passwordIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  openIocn: {
    width: Scale(24),
    height: Scale(24),
    transform: [{ rotate: "180deg" }],
  },
  validationText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(12),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(18),
    paddingTop: 4,
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  roleViewContainer: {
    width: "100%",
    height: Scale(50),
    borderWidth: Scale(1),
    borderRadius: 4,
    justifyContent: "space-between",
    borderColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    marginTop: Scale(5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  downArrowView: {
    width: Scale(22),
    height: Scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  selectRoleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(24),
  },
  roleModalView: {
    borderBottomLeftRadius: Scale(4),
    borderBottomRightRadius: Scale(4),
    paddingBottom: Scale(8),
    backgroundColor: "#F8F8F8",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    elevation: 3,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  roleView: {
    marginVertical: Scale(6),
  },
  roleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(24),
  },
  isRoleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "700",
    color: "#375280",
    lineHeight: Scale(26),
  },
  buttonView: {
    width: "100%",
    height: Scale(50),
    backgroundColor: "#324B74",
    borderRadius: Scale(10),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 12,
  },
  createText: {
    fontFamily: "Lato-Black",
    fontSize: Scale(20),
    lineHeight: Scale(26),
    color: "#FFFFFF",
    letterSpacing: Scale(0.2),
  },
  tncContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: -8,
  },
  tncContainerdes: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  trmtext: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    lineHeight: Scale(20),
    color: "#94A3B8",
  },
  ppBtn: {
    marginHorizontal: 2,
  },
  trmtextbtn: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(14),
    fontWeight: "500",
    lineHeight: Scale(20),
    flexWrap: "wrap",
  },
  checkboxCon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  checkboxstyle: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 3.2,
  },
  mainLogoView: {

    marginTop: windowWidth * 4 / 100
  },
  mainLogoIcon: {
    width: 140,
    height: 34,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 10
  },
  headingView: {
    marginBottom: 20
  },
  welcomeText: {
    fontSize: windowWidth * 6.3 / 100,
    color: '#375280',
    fontFamily: 'Avenir-Heavy'
  },
  loginSubHeadingText: {
    fontSize: windowWidth * 3.9 / 100,
    color: '#4B5563',
    fontFamily: 'Lato-Regular',
    marginTop: windowWidth * 2.5 / 100
  },
  passwordRules: { marginTop: 6 },
  ruleText: { fontSize: 12, color: "#6B7280", lineHeight: 18, marginLeft: 4, marginTop: 10 },
});
// Customizable Area End
