import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  ColorValue,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import AnalyticsFilterController, { Props } from "./AnalyticsFilterController";
import { backIcon } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { RadioButton } from "react-native-paper";
import Scale from "../../../components/src/Scale";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { calender } from "../../promocodes/src/assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'

export default class AnalyticsFilter extends AnalyticsFilterController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderCustomRadioButton = (value: string, color: ColorValue | undefined) => {
    const { selectedValue } = this.state;
    let isSelected = selectedValue === value;

    if (selectedValue === 'this week' && value === 'this week') {
      isSelected = true;
    }
    if ((selectedValue === "this week" && value === "this week") ||
      (selectedValue === "this month" && value === "this month") ||
      (selectedValue === "this year" && value === "this year") ||
      (selectedValue === "manually" && value === "manually")) {
      isSelected = true;
    }
    return (
      <TouchableOpacity
      testID="radioId"
        onPress={() => this.handleRadioButtonPress(value)}
        style={[
          styles.radioButton,
          {
            borderColor: isSelected ? color : "#C7B9AD",
            borderWidth: 1,
            marginVertical: Scale(10),
          },
        ]}
      >
        {isSelected && (
          <View style={[styles.radioButtonInner, { backgroundColor: color }]} />
        )}
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={false}
          hidden={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewMainCatalogue]}>
          <TouchableOpacity
            style={styles.backTouchCatalogue}
            testID="btnBackAddAddress"
            onPress={this.goToBackInAddAddress}
          >
            <Image
              source={backIcon}
              resizeMode="contain"
              style={[styles.backIconCssCatalogue,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitleCatalogue}>{i18n.t('filter')}</Text>
          </View>
          <TouchableOpacity
            testID="clearId"
            style={{ justifyContent: "center" }}
            onPress={this.clearAll}
          >
            <Text style={styles.clear}>{i18n.t('clearAll')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={{ padding: 20 }}>
          <RadioButton.Group
          data-test-id={'radioBtn'}
            onValueChange={(value) => this.handleRadioButtonPress(value)}
            value={this.state.selectedValue }
          >
            <TouchableOpacity testID='btn' style={{ flexDirection:FlexConditionManage(i18n.language), alignItems: "center"}} onPress={()=> this.handleRadioButtonPress('this week')}>
              {this.renderCustomRadioButton("this week", "#C7B9AD")}
              <Text
                style={[
                  styles.radioTxt,
                  {
                    fontWeight:
                      this.state.selectedValue === "this week" ? "700" : "400",
                  },
                ]}
              >
                {i18n.t('thisWeek')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity testID="btn1" style={{ flexDirection:FlexConditionManage(i18n.language), alignItems: "center" }} onPress={()=> this.handleRadioButtonPress('this month')}>
              {this.renderCustomRadioButton("this month", "#C7B9AD")}
              <Text
                style={[
                  styles.radioTxt,
                  {
                    fontWeight: this.state.selectedValue === "this month" ? "700" : "400",
                  },
                ]}
              >
                {i18n.t('thisMonth')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity testID="btn2" style={{ flexDirection:FlexConditionManage(i18n.language), alignItems: "center" }} onPress={()=> this.handleRadioButtonPress('this year')}>
              {this.renderCustomRadioButton("this year", "#C7B9AD")}
              <Text
                style={[
                  styles.radioTxt,
                  {
                    fontWeight:
                      this.state.selectedValue === "this year" ? "700" : "400",
                  },
                ]}
              >
                {i18n.t('thisYear')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity testID="btn3" style={{ flexDirection:FlexConditionManage(i18n.language), alignItems: "center" }} onPress={()=> this.handleRadioButtonPress('manually')}>
              {this.renderCustomRadioButton("manually", "#C7B9AD")}
              <Text
                style={[
                  styles.radioTxt,
                  {
                    fontWeight:
                      this.state.selectedValue === "manually" ? "700" : "400",
                  },
                ]}
              >
                {i18n.t('selectDateRange')}
              </Text>
            </TouchableOpacity>
          </RadioButton.Group>
        </View>
        {this.state.selectedValue === "manually" ? (
          <View style={[styles.mainDatePickerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              style={[
                styles.datePickerBox,
                this.state.errorFrom && {
                  borderColor: "#F87171",
                  borderWidth: 1,
                },
              ]}
            >
              <Pressable
                style={[styles.dateRowss,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="openModel"
                onPress={this.openDobModal}
              >
                {!this.state.visibleFromDate && (
                <Text style={styles.dateText}>
                  {this.state.selectFromDate
                    ? this.formatDate(this.state.selectDate)
                    : i18n.t('from')}
                </Text>
                )}
                {this.state.visibleFromDate && (
                <Text style={styles.dateText}>
                  {this.formatDate(this.state.selectDate)}
                </Text>
                )}
                <Image source={calender} style={styles.icon} />
              </Pressable>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.datePickerBox,
                this.state.errorTo && {
                  borderColor: "#F87171",
                  borderWidth: 1,
                },
              ]}
            >
              <Pressable
                style={[styles.dateRowss,{flexDirection:FlexConditionManage(i18n.language)}]}
                testID="openModel1"
                onPress={this.openToDobModal}
              >
                {!this.state.visibleFromDate && (
                <Text style={styles.dateText}>
                  {this.state.selectToDate
                    ? this.formatDate(this.state.selectedToDate)
                    : i18n.t('to')}
                </Text>
                )}
                {this.state.visibleToDate && (
                  <Text style={styles.dateText}>
                     {this.formatDate(this.state.selectedToDate)}
                  </Text>
                )}
                <Image source={calender} style={styles.icon} />
              </Pressable>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.datePickerContainerss}>
          <DateTimePickerModal
            testID="dateTimePickerEdit"
            isVisible={this.state.isStartDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirmDate}
            onCancel={this.hideDatePicker}
            maximumDate={this.state.campaingStartDate}
            locale={i18n.language}
            
          />
          <DateTimePickerModal
            testID="dateTimePickerEdit1"
            isVisible={this.state.isToStartDatePickerVisible}
            mode="date"
            onConfirm={this.handleToConfirmDate}
            onCancel={this.hideToDatePicker}
            locale={i18n.language}
            maximumDate={this.state.campaingStartDate}
          />
        </View>
        <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.buttonsContainerAddProducts]}>
          <TouchableOpacity
            activeOpacity={0.6}
            testID="btnBack"
            style={styles.backButtonAddProducts}
            onPress={this.goToBackInAddAddress}
          >
            <Text style={styles.backText}>{i18n.t('cancelText')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            testID="editProductBtn"
            style={styles.nextButtonAddproducts}
            onPress={() => this.performAction()}
          >
            <Text style={styles.nextButtonText}>{i18n.t('apply')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  dateRowss: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "400",
  },
  icon: {
    width: Scale(24),
    height: Scale(24),
    tintColor: "#94A3B8",
  },
  headerViewMainCatalogue: {
    justifyContent: "space-between",
    marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
    alignContent: "center",
    padding: 20,
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  clear: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
  },
  line: {
    borderWidth: 0.8,
    borderColor: "#F1F5F9",
  },
  radioTxt: {
    color: "#375280",
    fontSize: 16,
  },
  datePickerContainerss: {
    padding: 10,
    borderRadius: 4,
  },
  datePickerBox: {
    width: Scale(182),
    height: Scale(56),
    borderRadius: 5,
    backgroundColor: "#F8F8F8F8",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  mainDatePickerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonsContainerAddProducts: {
    width:windowWidth*90/100,
    alignSelf:'center',
    justifyContent: "space-between",
    bottom: 20,
    position: "absolute",
  },
  backButtonAddProducts: {
    width: windowWidth*42/100,
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  backText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500",
  },
  nextButtonAddproducts: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: windowWidth*42/100,
    borderRadius: 2,
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
});
// Customizable Area End
