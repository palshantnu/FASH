import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import PhoneVerificationController, {
  Props,
} from "./PhoneVerificationController";

export default class PhoneVerification extends PhoneVerificationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0 }} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"#fff"}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {this.state.loading && <CustomLoader />}
        <ScrollView bounces={false} keyboardShouldPersistTaps="always">
          <View
            style={[
              styles.header,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="button_go_back"
              style={styles.headerBackTouch}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                style={[
                  styles.headerBackImage,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
                source={backIcon}
              />
            </TouchableOpacity>

            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitleText}>
                {i18n.t("otp_verification")}
              </Text>
            </View>
          </View>

          <View style={styles.otpMainView}>
            <Text style={styles.otpMainText}>
              {i18n.t(
                "please_enter_the_4_digit_code_sent_to_your_mobile_number"
              )}{" "}
              {this.replaceNumber(this.state.contact_number)}
            </Text>
          </View>

          <View style={styles.otpMainTextInputView}>
            <View>
              <View style={styles.otpTextInputContainer}>
                {this.state.OtpArray.map((item, index) => {
                  return (
                    <TextInput
                      testID={"txt_input_otp" + index.toString()}
                      key={index.toString()}
                      maxLength={1}
                      ref={(ref) => (this.otpTextInput[index] = ref)}
                      onFocus={() => this.setState({ showErrorMessage: false })}
                      textContentType="oneTimeCode"
                      value={item}
                      keyboardType="numeric"
                      onKeyPress={(e) =>
                        this.prevoiusFocus(e.nativeEvent.key, index)
                      }
                      onChangeText={(text) => this.changeFocus(text, index)}
                      style={styles.txt_otp_input}
                    />
                  );
                })}
              </View>
              <View style={styles.errorContainer}>
                {this.state.showErrorMessage && (
                  <Text style={styles.txt_ErrorMsg}>
                    * {this.state.showErroMessageString}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.timeRemainingMainView}>
              <Text style={styles.timeRemainingText}>
                {i18n.t("TimeRemaining")} {this.state.remainingTime}
              </Text>

              <Text style={styles.didnotReceivedText}>
                {i18n.t("notReceivedCode")}{" "}
                <Text
                  testID="btn_resendOtp"
                  onPress={() => this.resendOTP()}
                  style={[
                    this.state.remainingTime == "0:00"
                      ? styles.resendButtonAfter
                      : styles.resendButtonBefore,
                  ]}
                >
                  {i18n.t("ResendCode")}
                </Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            testID="btn_VarifyOTP"
            style={styles.btnEmailButton}
            onPress={() => {
              this.submitOtp();
            }}
          >
            <Text style={styles.emailButtonText}>{i18n.t("login")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn_backArrow: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
    alignSelf: "center",
    padding: 5,
  },
  img_backArrow: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  btnEmailButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 54) / 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  emailButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100,
  },
  txt_otp_input: {
    width: 60,
    borderRadius: 5,
    height: 60,
    fontFamily: "Lato-Bold",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F8F8F8",
    color: "#375280",
    fontSize: (windowWidth * 5.5) / 100,
  },
  errorContainer: {
    width: 280,
    paddingHorizontal: 0,
    alignSelf: "center",
  },
  txt_ErrorMsg: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  txtRemainingTime: {
    alignSelf: "flex-end",
    marginVertical: 10,
    textAlignVertical: "center",
  },
  btn_resend: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  txt_resendOTP: {
    textAlignVertical: "center",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  login_btn_after: {
    backgroundColor: "#0061A7",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    position: "absolute",
    bottom: (windowWidth * 10) / 100,
  },
  resendButtonBefore: {
    color: "#8C8C8C",
  },
  resendButtonAfter: {
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  header: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 5) / 100,
  },
  headerBackTouch: {
    width: (windowWidth * 9) / 100,
    height: (windowWidth * 9) / 100,
  },
  headerBackImage: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  headerTitleView: {
    marginLeft: (windowWidth * 20) / 100,
  },
  headerTitleText: {
    color: "#375280",
    fontFamily: "Avenir-Heavy",
    fontSize: (windowWidth * 5) / 100,
  },
  otpMainView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowHeight * 22) / 100,
  },
  otpMainText: {
    color: "#375280",
    fontFamily: "Avenir-Heavy",
    fontSize: (windowWidth * 4.2) / 100,
    textAlign: "center",
  },
  otpMainTextInputView: {
    flex: 1,
    padding: 20,
  },
  otpTextInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  timeRemainingMainView: {
    alignSelf: "center",
    marginTop: (windowWidth * 3) / 100,
  },
  timeRemainingText: {
    color: "#0061A7",
    fontWeight: "bold",
    fontSize: (windowWidth * 3.7) / 100,
    textAlign: "center",
  },
  didnotReceivedText: {
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    color: "#8C8C8C",
    marginTop: (windowWidth * 1) / 100,
  },
});
// Customizable Area End
