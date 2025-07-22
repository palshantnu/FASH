import React from "react";
// Customizable Area Start
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Scale from "../../../components/src/Scale";
import * as IMG_CONST from "./assets";
import ResetPasswordController from "./ResetPasswordController";
import CustomLoader from "../../../components/src/CustomLoader";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End
export default class ResetPassword extends ResetPasswordController {
  // Customizable Area Start
  renderInputEmail = () => {
    return (
      <View>
        <Text style={[styles.emailText, { textAlign: this.returnAlignment() }]}>
          {i18n.t("Enter_the_email")}
        </Text>
        <View
          style={[
            styles.emailInputView,
            { borderColor: this.state.isEmail ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="emailId"
            placeholder={i18n.t("Enter_your_email")}
            placeholderTextColor="#375280"
            autoCapitalize="none"
            keyboardType="default"
            value={this.state.email}
            maxLength={80}
            //@ts-ignore
            onChangeText={(text) => {
              this.setState({
                email: text.replace(/\s/g, ""),
                isEmail: false,
                isPhone: false,
                phoneNumber: "",
              });
            }}
            style={[
              styles.inputEmailField,
              { textAlign: this.returnAlignment() },
            ]}
          />
        </View>
        {this.state.isEmail && (
          <Text style={[styles.errorName,{textAlign: this.returnAlignment()}]}>{i18n.t("Please_enter_email")}</Text>
        )}
      </View>
    );
  };
  renderPhonenumber = () => {
    return (
      <View>
        <Text style={[styles.nameText, { textAlign: this.returnAlignment() }]}>
          {i18n.t("enterPhoneNumberText")}
        </Text>
        <MobileWithCountryCodesInput
          testID="txtInputPhoneNumber"
          optionsList={this.state.countryList}
          selectedIndex={this.state.selectedCountryCodeIndex}
          onSelect={(i, { numeric_code }) =>
            this.setState({
              selectedCountryCode: numeric_code,
              selectedCountryCodeIndex: i,
              dropdownOpen: false,
            })
          }
          open={this.state.dropdownOpen}
          toggleOpen={(c) => this.setState({ dropdownOpen: !c })}
          inputValue={this.state.phoneNumber}
          onValueChange={(text) =>
            this.setState({
              phoneNumber: text.replace(/\D/g, ""),
              isPhone: false,
              isEmail: false,
              email: "",
            })
          }
          hasError={this.state.isPhone}
          inputTestId={"txtInputPhoneNumber"}
        />
        {this.state.isPhone && (
          <Text style={[styles.errorName,{textAlign: this.returnAlignment()}]}>
            {i18n.t("pleaseEnterPhoneNumber")}
          </Text>
        )}
      </View>
    );
  };
  renderResetButton = () => {
    return (
      <View style={styles.resetbuttonView}>
        <TouchableOpacity
          testID="resetID"
          style={styles.touchabbleResetButton}
          onPress={() => this.reSetPassword()}
        >
          <Text style={styles.restText}>{i18n.t("Reset_Password")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End

  render = () => {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.resetAreaContainer}>
        {this.state.isLoading && <CustomLoader />}
        <TouchableWithoutFeedback
          style={styles.containerStyle}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.containerStyle}>
            <View
              style={[
                styles.headerContainer,
                { flexDirection: this.returnFlexDirection() },
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
                    { transform: [{ rotate: this.returnTransform() }] },
                  ]}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.headertext,
                  { marginLeft: this.myLanguage == "ar" ? 15 : 0 },
                ]}
              >
                {i18n.t("ForgotPassword")}
              </Text>
              <View />
            </View>
            <View style={styles.centerContainer}>
              {this.renderInputEmail()}
              {<Text style={styles.nameTextOr}> {this.orReturn()}</Text>}
              {this.renderPhonenumber()}
            </View>
            {this.renderResetButton()}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
    // Customizable Area End
  };
}

// Customizable Area Start
const styles = StyleSheet.create({
  resetAreaContainer: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
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
  emailText: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(18),
    fontWeight: "700",
    textAlign: "left",
    lineHeight: 24,
    width: "100%",
    paddingBottom: 8,
  },
  emailInputView: {
    height: Scale(50),
    width: "100%",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    borderRadius: Scale(5),
    marginTop: Scale(4),
    borderWidth: Scale(1),
  },
  inputEmailField: {
    fontFamily: "Lato-Regular",
    fontWeight: "400",
    fontSize: Scale(16),
    color: "#375280",
    width: "100%",
    paddingHorizontal: Scale(10),
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
    marginTop: Scale(5),
  },
  headerView: {
    flexDirection: "row",
    marginTop: Scale(8),
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Scale(20),
  },

  backImage: {
    width: Scale(32),
    height: Scale(32),
  },
  verifyText: {
    fontSize: Scale(20),
    fontWeight: "800",
    lineHeight: Scale(26),
    color: "#375280",
    marginLeft: -20,
  },
  resetbuttonView: {
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 20,
  },
  touchabbleResetButton: {
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
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
  nameTextOr: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingVertical: 20,
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    marginTop: 20,
  },
});
// Customizable Area End
