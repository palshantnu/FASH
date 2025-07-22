import React from "react";

// Customizable Area Start
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { Dropdown } from "react-native-element-dropdown";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

import ChatViewController, {
  Props,
  configJSON,
  IMessage,
} from "./ChatViewController";
import { insertPhoto } from "./assets";

export default class ChatView extends ChatViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={this.isPlatformiOS() ? "padding" : undefined}>
            <CustomHeader title={i18n.t("reportPerson")} onLeftPress={() => { this.goBackBtn() }} leftTestId="goBackButton" />

          <TouchableWithoutFeedback style={styles.bodyView} onPress={() => { this.hideKeyboard() }} testID="HideKeyboard">
            <View style={styles.bodyView}>
              <View>
                <Text style={styles.selectRsn}>{i18n.t("selectReason")}</Text>
                <Dropdown
                  testID="dropDown"
                  style={[styles.dropdown, this.state.isFocus && { borderColor: '#F8F8F8' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={this.state.reasons}
                  maxHeight={300}
                  labelField="reason"
                  valueField="id"
                  itemTextStyle={styles.inputTxtStyle}
                  itemContainerStyle={{ backgroundColor: "#F8F8F8" }}
                  placeholder={this.state.value === null ? i18n.t("selectReportReason") : this.state.value}
                  value={this.state.value}
                  onFocus={() => {this.onFocusBtn()}}
                  onBlur={() => {this.onBlurBtn()}}
                  onChange={item => {this.onChangeDropBtn(item)}}
                />
              </View>

              <View style={{ marginTop: verticalScale(14) }}>
                <Text style={styles.otherDetails}>{i18n.t("otherDetail")}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={i18n.t("whatHappned")}
                    placeholderTextColor="#375280"
                    style={styles.inputStyles}
                    multiline
                    onChangeText={(text: string) => this.onChangeInputText(text)}
                    testID="textInput"
                  />
                </View>
              </View>
            </View>


          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => {this.reportPersonApi()}} testID="ReportPersonApi">
            <View style={styles.btnView}>
              <Text style={styles.btnTxt}>{i18n.t("report")}</Text>
            </View>
          </TouchableOpacity>


        </KeyboardAvoidingView>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bodyView: {
    flex: 1,
    marginHorizontal: Scale(24),
    marginTop: verticalScale(12)
  },
  btnView: {
    marginHorizontal: Scale(24),
    backgroundColor: "#C7B9AD",
    padding: 20,
    marginBottom: verticalScale(24)
  },
  btnTxt: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '800',
    color: "#FFFFFF",
    textAlign: "center"
  },
  selectRsn: {
    fontSize: Scale(16),
    fontFamily: "Lato-Bold",
    fontWeight: '900',
    color: "#375280",
  },

  dropdown: {
    height: 50,
    borderColor: '#F8F8F8',
    borderWidth: 0.5,
    borderRadius: 2,
    paddingHorizontal: 8,
    marginTop: verticalScale(10),
    backgroundColor: "#F8F8F8"
  },
  icon: {
    marginRight: Scale(10),
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '400',
    color: "#375280",
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '400',
    color: "#375280",
  },
  iconStyle: {
    width: 24,
    height: 24,
    tintColor: "#375280"
  },
  inputTxtStyle: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '400',
    color: "#375280",
  },
  otherDetails: {
    fontSize: Scale(16),
    fontFamily: "Lato-Bold",
    fontWeight: '900',
    color: "#375280",
  },
  inputStyles: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '400',
    color: "#375280",
    marginLeft: Scale(5),
  },
  inputContainer: {
    borderWidth: 0.5,
    backgroundColor: "#F8F8F8",
    padding: Scale(12),
    borderColor: "#F8F8F8",
    marginTop: verticalScale(10)
  }
});
// Customizable Area End
