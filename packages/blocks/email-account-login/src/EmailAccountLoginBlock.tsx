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
  TextInput,
  Keyboard,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { mainLogo, rightArrow, phoneLogo, googleIcon, facebookIcon, appleIcon, unVisibleIcon, visibleIcon, imageDivider, backIcon, googleIcon2 } from "./assets";
//@ts-ignore
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import Material from "react-native-vector-icons/MaterialIcons"
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        bounces={false}
      >
        <SafeAreaView style={{ flex: 0 }} />
        <View style={styles.header} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        {this.state.loading && <CustomLoader />}

        <TouchableWithoutFeedback onPress={this.hideKeyboard}>
          <View style={styles.maniViewContainer}>
            <View
              style={{
                width: 40,
                height: 10,
                backgroundColor: "#D1D5DB",
                borderRadius: 10,
                alignSelf: "center",
              }}
            />
            <View style={styles.mainLogoView}>
              <Image
                resizeMode="contain"
                source={mainLogo}
                style={styles.mainLogoIcon}
              />
            </View>

            <View style={styles.headingView}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.loginSubHeadingText}>
                Login and see our latest fashion style
              </Text>
            </View>

            {/* Email Field */}
            <View style={styles.emailAddressMainView}>
              <Text style={styles.emailAddressText}>Email Address</Text>
              <TextInput
                testID={"txt_enter_email"}
                onChangeText={(txt) =>
                  this.setState({ email: txt, email_error: false })
                }
                keyboardType="email-address"
                maxLength={70}
                placeholder="e.g. johndeo@gmailcom"
                placeholderTextColor={"#9A9A9A"}
                style={[
                  styles.emailTextInput,
                  {
                    borderWidth: this.state.email_error ? 1 : 0,
                    borderColor: this.checkBoarderColor(this.state.email_error),
                  },
                ]}
                value={this.state.email}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                autoCorrect={false}
              />
              {this.state.email_error && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>
                    Please enter a valid email address
                  </Text>
                </View>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.passwordView}>
              <Text style={styles.emailAddressText}>Password</Text>
              <View style={styles.passwordFlex}>
                <TextInput
                  testID={"txt_enter_password"}
                  onChangeText={(txt) =>
                    this.setState({ password: txt, password_error: false })
                  }
                  placeholder="*********"
                  placeholderTextColor={"#9A9A9A"}
                  secureTextEntry={this.state.enablePasswordField}
                  maxLength={16}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  style={[
                    styles.emailTextInput,
                    {
                      borderWidth: this.state.password_error ? 1 : 0,
                      borderColor: this.checkBoarderColor(
                        this.state.password_error
                      ),
                    },
                  ]}
                  value={this.state.password}
                />
                <TouchableOpacity
                  style={styles.eyeTouch}
                  onPress={this.passwordHideShow}
                >
                  <Image
                    style={styles.eyeIconCss}
                    source={
                      !this.state.enablePasswordField
                        ? visibleIcon
                        : unVisibleIcon
                    }
                  />
                </TouchableOpacity>
              </View>
              {this.state.password_error && (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>Please enter your password</Text>
                </View>
              )}
            </View>

            {/* Remember & Forgot Row */}
            <View style={styles.rememberRow}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View style={styles.checkbox} />
                <Text style={styles.rememberText}>Remember for 30 days</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.goToForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              testID="btnEmailLogIn"
              style={[styles.btnEmailButton, { backgroundColor: "#000" }]}
              onPress={this.doEmailLogIn}
            >
              <Text style={styles.emailButtonText}>Login</Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.continueWithMainView}>
              <View style={styles.dividerView}>
                <Image source={imageDivider} style={styles.dividerImage} />
              </View>
              <Text style={styles.continueText}>or</Text>
              <View style={styles.dividerView}>
                <Image source={imageDivider} style={styles.dividerImage} />
              </View>
            </View>

            {/* Google Login */}
            <TouchableOpacity style={[styles.socialFullWidthButton, { marginTop: 10 }]} onPress={this.googleLogin}>
              <View style={styles.socialRow}>
                <Image source={googleIcon2} style={styles.googleIconImage} />
                <Text style={styles.socialBtnText}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Phone Login */}
            <TouchableOpacity style={[styles.socialFullWidthButton, { marginTop: 15 }]} onPress={this.phoneLoginRedirection}>
              <View style={styles.socialRow}>
                <Material name="call" color="#000" size={20} />
                <Text style={styles.socialBtnText}>Login with Phone</Text>
              </View>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerNowMainView}>
              <Text style={styles.dontHaveText}>
                Don’t have an account or want to become a seller, or stylist?
              </Text>
              <TouchableOpacity
                testID="btnSignupRedirection"
                onPress={this.signupRedirection}
                style={styles.singupTouch}
              >
                <Text style={styles.registerNowText}>Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }

}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  header: {
    height: Scale(90),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#324B74",
  },
  maniViewContainer: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 10,
    paddingHorizontal: 20
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
    marginTop: 0
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
  emailAddressMainView: {
    marginTop: windowWidth * 10 / 100
  },
  emailAddressText: {
    color: '#1E2D46',
    fontFamily: 'Lato-Bold',
    fontSize: windowWidth * 3.9 / 100
  },
  emailTextInput: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 5.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily: 'Lato-Regular',
    color: '#375280'
  },
  errorView: {
    marginTop: windowWidth * 1 / 100
  },
  errorText: {
    color: '#F87171',
    fontFamily: 'Lato-Regular',
    fontSize: windowWidth * 3.9 / 100
  },
  passwordView: {
    marginTop: windowWidth * 3 / 100
  },
  passwordFlex: {
    flexDirection: 'row'
  },
  eyeTouch: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
    right: 5,
    position: 'absolute',
    marginTop: windowWidth * 6.5 / 100
  },
  eyeIconCss: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 5) / 100,
  },
  forgotPasswordView: {
    alignSelf: 'flex-end',
    marginTop: windowWidth * 3 / 100
  },
  forgotPasswordText: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontSize: windowWidth * 3.8 / 100
  },
  btnEmailButton: {
    backgroundColor: '#CCBEB1',
    width: windowWidth * 90 / 100,
    height: windowHeight * 5 / 100,
    borderRadius: 6,
    marginTop: windowWidth * 8 / 100,
    justifyContent: 'center'
  },
  emailButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lato-Black',
    fontSize: windowWidth * 4.5 / 100
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
  continueText: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontSize: windowWidth * 3.9 / 100
  },
  socialIconMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowWidth * 8 / 100,
    width: windowWidth * 70 / 100,
    alignSelf: 'center'
  },
  socialIconTouch: {
    width: windowWidth * 11 / 100,
    height: windowWidth * 11 / 100,
    borderWidth: 1,
    borderRadius: windowWidth * 2 / 100,
    borderColor: '#CCBEB1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  socialIconImage: {
    width: windowWidth * 7 / 100,
    height: windowWidth * 7 / 100
  },
  googleIconImage: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
  },
  registerNowMainView: {
    marginTop: windowWidth * 10 / 100
  },
  dontHaveText: {
    color: '#475467',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: windowWidth * 3.5 / 100
  },
  singupTouch: {
    width: windowWidth * 30 / 100,
    alignSelf: 'center',
    marginTop: windowWidth * 2.5 / 100
  },
  registerNowText: {
    color: '#375280',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: windowWidth * 3.5 / 100
  },
  phoneLoginBox: {
    marginTop: Scale(28),
    borderColor: "#CCBEB1",
    borderWidth: Scale(1),
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  phoneText: {
    color: "#375280",
    marginLeft: Scale(8),
    fontSize: Scale(16)
  },
  backIconCss: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  rightIcon: {
    width: windowWidth * 7.5 / 100,
    height: windowWidth * 7.5 / 100
  },
  backIconTouch: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 3 / 100
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: "#111827",
    fontFamily: "Lato-Regular",
  },
  socialFullWidthButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: windowWidth * 0.9,
    backgroundColor: '#fff',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnText: {
    color: '#111827',
    fontSize: windowWidth * 4 / 100,
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
  },

});
// Customizable Area End
