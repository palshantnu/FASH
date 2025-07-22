import React from "react";
// Customizable Area Start
import Scale from "../../../components/src/Scale";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import ResetPasswordOTPController, {
  Props,
} from "./ResetPasswordOTPController";
import * as IMG_CONST from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End
export default class ResetPasswordOTP extends ResetPasswordOTPController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderOtpCodeBlock = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.emailVerified ? (
          <Text style={styles.verifyTextEmailStyle}>
            {i18n.t("phoneVerify")}
            {this.state.verifyPhone?.replace(/\d(?=\d{4})/g, "*")}
          </Text>
        ) : (
          <Text style={styles.verifyTextEmailStyle}>
            {i18n.t("emailVerify")}
            {this.state.maskedEmail}
          </Text>
        )}
        <View style={styles.otpMainTextInputView}>
          <View>
            <View style={styles.otpTextInputContainer}>
              {this.state.OtpArray.map((item, index) => (
                <TextInput
                  testID={"txt_input_otp" + index.toString()}
                  key={index.toString()}
                  maxLength={1}
                  ref={(ref) => (this.otpTextInput[index] = ref)}
                  onFocus={() => this.setState({ showOtpErrorMess: false })}
                  textContentType="oneTimeCode"
                  value={item}
                  keyboardType="numeric"
                  onKeyPress={(e) =>
                    this.resetprevoiusFocus(e.nativeEvent.key, index)
                  }
                  onChangeText={(text) =>
                    this.resetchangeFocus(text?.replace(/\D/g, ""), index)
                  }
                  style={styles.txtotpinput}
                />
              ))}
            </View>
          </View>
        </View>
        {this.state.showOtpErrorMess && (
          <Text style={styles.errorName}>* Enter 4 digit OTP</Text>
        )}
        <View style={styles.timeremainstyle}>
          <Text style={styles.notrectext}>{i18n.t("notReceivedCode")}</Text>
          <TouchableOpacity
            testID="btnResendApi"
            onPress={() => this.resendOtp()}
          >
            <Text style={styles.resendTextStyle}>{i18n.t("ResendCode")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderResetButton = () => {
    return (
      <View style={styles.resetbuttonView}>
        <TouchableOpacity
          testID="btnverifyAccount"
          style={styles.touchabbleResetButtonstyle}
          onPress={() => this.verifyAccount()}
        >
          <Text style={styles.restText}>{i18n.t("Reset_Password")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.mainContainerStyle}>
        {this.state.isLoading && <CustomLoader />}
        <View style={styles.container}>
          <View
            style={[
              styles.headContainer,
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
            <Text style={styles.veryText}>{i18n.t("Verify_Account_")}</Text>
            <View />
          </View>
          <View style={styles.otpViewContainerStyle}>
            {this.renderOtpCodeBlock()}
            {this.renderResetButton()}
          </View>
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headContainer: {
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
  veryText: {
    fontFamily: "Avenir-Heavy",
    fontSize: Scale(20),
    fontWeight: "800",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
    marginLeft: -30,
  },
  otpViewContainerStyle: {
    justifyContent: "center",
    flex: 1,
  },
  verifyTextEmailStyle: {
    fontFamily: "Avenir-Heavy",
    color: "#375280",
    fontWeight: "800",
    fontSize: Scale(20),
    textAlign: "center",
    lineHeight: Scale(26),
    width: "100%",
    paddingBottom: 8,
    marginBottom: 30,
  },
  resendTextStyle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "500",
    color: "#375280",
    lineHeight: Scale(24),
    paddingLeft: 4,
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
    marginTop: Scale(25),
    alignSelf: "flex-start",
    textAlign: "left",
    paddingLeft: 20,
  },
  resetbuttonView: {
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: -200,
  },
  touchabbleResetButtonstyle: {
    width: "100%",
    height: Scale(56),
    backgroundColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Scale(5),
  },
  restText: {
    fontFamily: "Lato-Black",
    color: "#FFFFFF",
    fontSize: Scale(20),
    lineHeight: Scale(26),
    letterSpacing: Scale(0.02),
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
  txtotpinput: {
    fontFamily: "Lato-Regular",
    width: 60,
    borderRadius: 5,
    height: 60,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F8F8F8",
    fontSize: Scale(30),
    fontWeight: "500",
    lineHeight: Scale(40),
    letterSpacing: Scale(0.5),
    color: "#375280",
  },
  timeremainstyle: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 30,
  },
  notrectext: {
    fontFamily: "Lato-Regular",
    flexWrap: "wrap",
    fontSize: Scale(16),
    color: "#8C8C8C",
    lineHeight: Scale(24),
    fontWeight: "500",
  },
});
// Customizable Area End
