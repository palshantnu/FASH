import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import {
  mainLogo,
  emailLogo,
  googleIcon,
  facebookIcon,
  appleIcon,
  imageDivider
} from "./assets";

import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import MobileAccountLoginController, {
  Props
} from "./MobileAccountLoginController";

export default class MobileAccountLoginBlock extends MobileAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    const { navigation } = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        bounces={false}
      >
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"#fff"}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {this.state.loading && <CustomLoader />}
        <TouchableWithoutFeedback
          testID={"BackgroundTouch"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={styles.maniViewContainerPhone}>
            <View style={styles.mainLogoViewPhone}>
              <Image
                resizeMode="contain"
                source={mainLogo}
                style={styles.mainLogoIconPhone}
              />
            </View>

            <View style={styles.headingViewPhone}>
              <Text style={styles.welcomeTextPhone}>{i18n.t("Welcome_Back")}</Text>
              <Text style={styles.loginSubHeadingTextPhone}>
                {i18n.t("login_and_see_our_latest_fashion_style")}
              </Text>
            </View>

            <View style={styles.phoneAddressMainView}>
              <Text style={[styles.phoneAddressText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("Phone_Number")}</Text>
              <MobileWithCountryCodesInput
                // inputTestId="txtInputPhoneNumber"
                optionsList={this.state.countryList}
                selectedIndex={this.state.selectedCodeIndex}
                onSelect={(index, { numeric_code }) =>
                  this.setState({
                    selectedCodeIndex: index,
                    dropdownOpen: false,
                    countryCodeSelected: numeric_code,
                  })
                }
                inputValue={this.state.mobileNo}
                onValueChange={(txt) =>
                  this.setState({ mobileNo: txt, mobileNoError: false })
                }
                open={this.state.dropdownOpen}
                toggleOpen={(c) => this.setState({ dropdownOpen: !c })}
                hasError={this.state.mobileNoError}
              />
              {this.state.mobileNoError && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>
                    * {i18n.t("Please_enter_phonenumber")}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              testID="btnMobileLogIn"
              style={styles.btnPhoneButton}
              onPress={() => {
                this.doMobileLogIn();
              }}
            >
              <Text style={styles.phoneButtonText}>{i18n.t("Send_OTP")}</Text>
            </TouchableOpacity>

            <View style={styles.continueWithMainViewPhone}>
              <View style={styles.dividerViewPhone}>
                <Image source={imageDivider} style={styles.dividerImagePhone} />
              </View>
              <View>
                <Text style={styles.continueTextPhone}>{i18n.t('or_continue_with')}</Text>
              </View>
              <View style={styles.dividerViewPhone}>
                <Image source={imageDivider} style={styles.dividerImagePhone} />
              </View>
            </View>

            {this.state.emailOnly ? (
              <TouchableOpacity
                style={[styles.btnPhoneButton, styles.emailLoginBox]}
                testID="signInWithMobile"
                onPress={this.btnEmailLoginRedirection}
              >
                <View style={styles.emailRow}>
                  <Image
                    resizeMode="contain"
                    source={emailLogo}
                    style={styles.emailIconImage}
                  />
                  <Text style={[styles.phoneButtonText, styles.emailText]}>
                    {i18n.t("Log_In_with_Email")}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={[styles.socialIconMainViewPhone,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity
                  testID="btnEmailLogin"
                  style={styles.socialIconTouchPhone}
                  onPress={() => {
                    this.btnEmailLoginRedirection();
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={emailLogo}
                    style={styles.emailIconImage}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialIconTouchPhone}>
                  <Image source={facebookIcon} style={styles.socialIconImage} />
                </TouchableOpacity>

                {
                  Platform.OS === 'ios' &&
                  <TouchableOpacity testID="btnAppleLoginMobile" style={styles.socialIconTouchPhone} onPress={() => {
                      this.appleLoginPhone();
                    }}>
                    <Image source={appleIcon} style={styles.socialIconImage} />
                  </TouchableOpacity>
                }

                <TouchableOpacity
                  testID="googleLoginPhoneBtn"
                  onPress={() => {
                    this.googleLoginPhone();
                  }}
                  style={styles.socialIconTouchPhone}
                >
                  <Image source={googleIcon} style={styles.googleIconImage} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.registerNowMainViewPhone}>
              <Text style={styles.dontHaveTextPhone}>
               {i18n.t("don't_have_an_account_or_want_to_become_a_seller_or_stylist")}
              </Text>
              <TouchableOpacity
                testID="btnSignupRedirection"
                style={styles.singupTouchPhone}
                onPress={() => {
                  this.signupRedirection();
                }}
              >
                <Text style={styles.registerNowTextPhone}>{i18n.t('Register_Here')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  safeContainer: {
    flex: 0
  },
  maniViewContainerPhone: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center"
  },
  mainLogoViewPhone: {
    alignItems: "center",
    marginTop: (windowWidth * 8) / 100
  },
  mainLogoIconPhone: {
    width: (windowWidth * 50) / 100,
    height: (windowHeight * 7) / 100
  },
  headingViewPhone: {
    marginTop: (windowHeight * 5) / 100
  },
  welcomeTextPhone: {
    fontSize: (windowWidth * 4.3) / 100,
    textAlign: "center",
    color: "#375280",
    fontFamily: "Avenir-Heavy"
  },
  loginSubHeadingTextPhone: {
    fontSize: (windowWidth * 3.9) / 100,
    textAlign: "center",
    color: "#375280",
    fontFamily: "Lato-Regular",
    marginTop: (windowWidth * 2.5) / 100
  },
  phoneAddressMainView: {
    marginTop: (windowWidth * 10) / 100
  },
  phoneAddressText: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.9) / 100
  },
  phoneTextInput: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#000000"
  },
  errorView: {
    marginTop: (windowWidth * 1) / 100
  },
  errorText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100
  },
  btnPhoneButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 8) / 100,
    justifyContent: "center"
  },
  phoneButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100
  },
  continueWithMainViewPhone: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 10) / 100
  },
  dividerViewPhone: {
    width: (windowWidth * 28) / 100,
    marginTop: (windowWidth * 2) / 100
  },
  dividerImagePhone: {
    width: (windowWidth * 28) / 100,
    height: (windowHeight * 0.2) / 100
  },
  continueTextPhone: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100
  },
  socialIconMainViewPhone: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 8) / 100,
    width: (windowWidth * 70) / 100,
    alignSelf: "center"
  },
  socialIconTouchPhone: {
    width: (windowWidth * 11) / 100,
    height: (windowWidth * 11) / 100
  },
  socialIconImage: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100
  },
  emailIconImage: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 7) / 100
  },
  googleIconImage: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100
  },
  registerNowMainViewPhone: {
    marginTop: (windowHeight * 20) / 100
  },
  dontHaveTextPhone: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.5) / 100
  },
  singupTouchPhone: {
    width: (windowWidth * 30) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 2.5) / 100
  },
  registerNowTextPhone: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.7) / 100
  },
  emailLoginBox: {
    marginTop: Scale(28),
    borderColor: "#CCBEB1",
    borderWidth: Scale(1),
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  emailRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  emailText: {
    color: "#375280",
    marginLeft: Scale(8),
    fontSize: Scale(16)
  },
  // Customizable Area End
});
