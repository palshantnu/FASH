import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import SocialMediaAccountPhoneScreenController, {
  Props,
} from "./SocialMediaAccountPhoneScreenController";
import globalStyle from "../../../components/src/GlobalStyle";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class SocialMediaAccountPhoneScreen extends SocialMediaAccountPhoneScreenController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View
          style={[styles.containerViewContact, globalStyle.headerMarginManage]}
        >
          <View style={[styles.headerViewContact,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackSocialLoginPhone"
              style={styles.backTouchContact}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconContactCss,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]  }]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleContact}>{i18n.t('Signup')}</Text>
            </View>
            <View style={styles.extraView} />
          </View>

          <View style={styles.phoneAddressMainView}>
            <Text style={[styles.phoneAddressText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Phone_Number')}*</Text>
            <MobileWithCountryCodesInput
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
                  {this.state.mobileNoErrorMsg}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.btnContactMargin}>
          <TouchableOpacity
            testID="btnOtpSocialLogin"
            style={styles.btnContactButton}
            onPress={() => {
              this.sendOtpSocialLogin();
            }}
          >
            <Text style={styles.contactButtonText}>{i18n.t('Send_OTP')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeViewContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  containerViewContact: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerViewContact: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchContact: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconContactCss: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleContact: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  marginTopManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  btnContactMargin: {
    width: (windowWidth * 90) / 100,
    position: "absolute",
    bottom: (windowWidth * 10) / 100,
    alignSelf: "center",
  },
  btnContactButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 8) / 100,
    justifyContent: "center",
  },
  contactButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100,
  },
  phoneAddressMainView: {
    marginTop: (windowWidth * 10) / 100,
  },
  phoneAddressText: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.9) / 100,
  },
  errorView: {
    marginTop: (windowWidth * 1) / 100,
  },
  errorText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
  },
});
// Customizable Area End
