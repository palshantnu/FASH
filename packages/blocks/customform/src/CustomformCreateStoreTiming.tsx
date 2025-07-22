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
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, timingActive, storeThirdStepAr } from "./assets";

import CustomformCreateStoreTimingController, {
  Props,
  WeekDayArrProps,
} from "./CustomformCreateStoreTimingController";
import globalStyle from "../../../components/src/GlobalStyle";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class CustomformCreateStoreTiming extends CustomformCreateStoreTimingController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  getWeekDayList = (item: WeekDayArrProps, index: number) => {
    let value = item;
    return (
      <View>
        <View
          style={[
            styles.dayFlatlistMainView,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <Text style={styles.dayTimingText}>{value.showDayValue} *</Text>
          <TouchableOpacity
            style={styles.textInputTouch}
            testID="btnShowTimeFrom"
            onPress={() => {
              this.showTimepicker("from", item, index);
            }}
          >
            <TextInput
              testID={"txt_enter_from_time"}
              keyboardType="default"
              returnKeyLabel="done"
              returnKeyType="done"
              editable={false}
              pointerEvents="none"
              placeholder={i18n.t("from")}
              placeholderTextColor={"#9A9A9A"}
              style={[
                {
                  textAlign: TextAlignManage(i18n.language),
                  borderWidth: this.checkBoarderWidth(value.dayFromError),
                  borderColor: this.checkBoarderColor(value.dayFromError),
                },
                styles.emailTextInput,
              ]}
              value={value.startTime}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textInputTouch}
            testID="btnShowTimePickerTo"
            onPress={() => {
              this.showTimepicker("to", item, index);
            }}
          >
            <TextInput
              testID={"txt_enter_to_time"}
              keyboardType="default"
              returnKeyLabel="done"
              returnKeyType="done"
              editable={false}
              pointerEvents="none"
              placeholder={i18n.t("to")}
              placeholderTextColor={"#9A9A9A"}
              style={[
                {
                  textAlign: TextAlignManage(i18n.language),
                  borderWidth: this.checkBoarderWidth(value.dayToError),
                  borderColor: this.checkBoarderColor(value.dayToError),
                },
                styles.emailTextInput,
              ]}
              value={value.endTime}
            />
          </TouchableOpacity>
        </View>
        {(value.dayFromError || value.dayToError) && (
          <View
            style={[
              styles.errorView,
              {
                marginRight: ManageDynamicMargin(
                  i18n.language,
                  (windowWidth * 18) / 100,
                  undefined
                ),
                marginLeft: ManageDynamicMargin(
                  i18n.language,
                  undefined,
                  (windowWidth * 18) / 100
                ),
              },
            ]}
          >
            <Text
              style={[
                { textAlign: TextAlignManage(i18n.language) },
                styles.errorText,
              ]}
            >
              {value.errorMsg}
            </Text>
          </View>
        )}
      </View>
    );
  };
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
        {this.state.loading && <CustomLoader />}
        <View
          style={[
            styles.containerViewStoreTiming,
            globalStyle.headerMarginManage,
          ]}
        >
          <View
            style={[
              styles.headerViewStoreTime,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="btnBackStoreTiming"
              style={styles.backTouchStoreTime}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[
                  styles.backIconStoreTime,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleStoreTime}>
                {i18n.t("createAStoreText")}
              </Text>
            </View>
            <View style={styles.extraViewStoreTime} />
          </View>

          <View style={styles.timingActiveView}>
            <Image
              source={
                this.state.languageUpdate === "ar"
                  ? storeThirdStepAr
                  : timingActive
              }
              resizeMode="contain"
              style={styles.timingActiveView}
            />
          </View>
        </View>

        <ScrollView
          style={styles.timingCenterView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.storeCreateMainView}>
            <FlatList
              testID={"weekday_data_show"}
              bounces={false}
              data={this.state.weekDayArr}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeprator} />
              )}
              renderItem={({ item, index }) => this.getWeekDayList(item, index)}
              keyExtractor={(item) => item.id}
            />
          </View>

          <View style={styles.storeCreateMainView}>
            <Text
              style={[
                styles.labelText,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {i18n.t("averageTimeOrderText")}
            </Text>
            <Dropdown
              testID="avgTimeDropdown"
              data={this.state.timingArrDropdown}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={i18n.t("selectAverageTimeText")}
              value={this.state.orderAvgTiming}
              itemTextStyle={[
                styles.blueThemeColor,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
              placeholderStyle={[
                styles.dropdownPlaceholder,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
              selectedTextStyle={[
                styles.blueThemeColor,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
              style={[
                {
                  borderWidth: this.checkBoarderWidth(this.state.avgTimeError),
                  borderColor: this.checkBoarderColor(this.state.avgTimeError),
                },
                styles.dropDownTextInput,
              ]}
              onChange={(item) => {
                this.selectAvgTime(item.value);
              }}
              iconStyle={[
                styles.dropdownIconCss,
                {
                  right: ManageDynamicMargin(i18n.language, undefined, 5),
                  left: ManageDynamicMargin(i18n.language, 5, undefined),
                },
              ]}
              iconColor={"#475569"}
            />
            {this.state.avgTimeError && (
              <View style={styles.errorViewDrop}>
                <Text
                  style={[
                    { textAlign: TextAlignManage(i18n.language) },
                    styles.errorText,
                  ]}
                >
                  {i18n.t("pleaseEnterAverageTimeError")}
                </Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.btnNextMargin,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="btnTimingBack"
              style={styles.btnCancelBackButton}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={styles.cancelBackButtonText}>{i18n.t("Back")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="btnCreateStore"
              style={styles.btnNextButtonAdd}
              onPress={() => {
                this.createStoreBtn();
              }}
            >
              <Text style={styles.createButtonText}>
                {i18n.t("createText")}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            date={new Date()}
            testID="dateTimePicker"
            onHide={this.hideDatePicker}
            isVisible={this.state.isDatePickerVisible}
            mode="time"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
          />
        </ScrollView>
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewStoreTiming: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerViewStoreTime: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchStoreTime: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconStoreTime: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleStoreTime: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  extraViewStoreTime: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  btnNextMargin: {
    marginTop: (windowWidth * 8) / 100,
    justifyContent: "space-between",
    paddingBottom: (windowWidth * 8) / 100,
  },
  btnAddAnotherTimeSlot: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6) / 100,
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#CCBEB1",
    borderWidth: 1,
    marginTop: (windowWidth * 3) / 100,
  },
  btnCancelBackButton: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 6) / 100,
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#CCBEB1",
    borderWidth: 1,
  },
  cancelBackButtonText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4.5) / 100,
    fontWeight: "500",
  },
  btnNextButtonAdd: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 6) / 100,
    borderRadius: 2,
    justifyContent: "center",
  },
  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 4.5) / 100,
  },
  storeCreateMainView: {
    marginTop: (windowWidth * 2) / 100,
  },
  labelText: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.9) / 100,
  },
  textInputTouch: {
    width: (windowWidth * 34) / 100,
    height: (windowHeight * 6.5) / 100,
  },
  emailTextInput: {
    width: (windowWidth * 34) / 100,
    height: (windowHeight * 5.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  errorView: {
    marginTop: (windowWidth * 1) / 100,
  },
  errorText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
  },
  dropDownTextInput: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 5.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#000000",
  },
  errorViewDrop: {
    marginTop: (windowWidth * 1) / 100,
  },
  blueThemeColor: {
    color: "#375280",
  },
  itemSeprator: {
    height: (windowWidth * 2) / 100,
  },
  categoryFlatTouchSubCate: {
    borderRadius: 3,
    padding: 7,
  },
  dropdownIconCss: {
    position: "absolute",
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    right: 5,
  },
  dropdownPlaceholder: {
    color: "#9A9A9A",
    padding: 5,
  },
  timingActiveView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 10) / 100,
  },
  timingCenterView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  dayTimingText: {
    fontSize: (windowWidth * 4) / 100,
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    width: (windowWidth * 15) / 100,
  },
  dayFlatlistMainView: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
// Customizable Area End
