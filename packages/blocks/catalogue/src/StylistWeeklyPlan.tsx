import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
import Scale from "../../../components/src/Scale";
import { backIcon, downArrow } from "./assets";
import { Dropdown } from "react-native-element-dropdown";
import StylistWeeklyPlanController, {
  Props,
} from "./StylistWeeklyPlanController";
import i18n from "../../../components/src/i18n/i18n.config";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

export default class StylistWeeklyPlan extends StylistWeeklyPlanController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderErrorMsg = (errorMsg: string) => (
    <Text style={styles.errorName}>{errorMsg}</Text>
  );

  renderDropDown = (
    data: { label: string; value: any }[],
    placeholder: string,
    info: any | null,
    dropDownpUpdatedValue: (item: { label: string; value: any }) => void,
    // isErrorMsg: boolean,
    fetchData?: () => void
  ) => {
    return (
      <Dropdown
        testID={placeholder}
        style={[styles.dropdown, { borderColor: "#F8F8F8", direction: FlatListRowManage(i18n.language) }]}
        placeholderStyle={[styles.placeholderStyle, { textAlign : "left"}]}
        selectedTextStyle={[styles.selectedTextStyle,  { textAlign : "left"}]}
        data={data}
        itemTextStyle={[styles.selectedTextStyle, { textAlign : "left"}]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconColor="#375280"
        value={info}
        onChange={dropDownpUpdatedValue}
        onFocus={fetchData}
        renderRightIcon={() => (
          <Image source={downArrow} style={styles.iconStyle} />
        )}
      />
    );
  };
  getStylingLabel = () => {
    const { selectedPlan, name_plan } = this.state;
    if (selectedPlan === i18n.t("weeklyPlan") || name_plan === i18n.t("weeklyPlan")) {
      return `${i18n.t("stylingsPerWeek")} *`;
    } else if (
      selectedPlan === i18n.t("monthlyPlan") ||
      name_plan === i18n.t("monthlyPlan")
    ) {
      return `${i18n.t("stylingsPerMonth")} *`;
    } else if (
      selectedPlan ===i18n.t("quarterlyPlan") ||
      name_plan === i18n.t("quarterlyPlan")
    ) {
      return `${i18n.t("stylingsPerQuarter")} *`;
    } else {
      return "";
    }
  };

  renderGenderBlock = () => {
    let data: { label: string; value: number }[] = [];
    switch (this.state.selectedPlan || this.state.name_plan) {
      case i18n.t("weeklyPlan"):
        data = [
          { label: "1", value: 1 },
          { label: "2 ", value: 2 },
          { label: "3 ", value: 3 },
          { label: "4 ", value: 4 },
          { label: "5 ", value: 5 },
          { label: "6 ", value: 6 },
          { label: "7 ", value: 7 },
        ];
        break;
      case i18n.t("monthlyPlan"):
        data = [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
          { label: "7", value: 7 },
          { label: "8", value: 8 },
          { label: "9", value: 9 },
          { label: "10", value: 10 },
          { label: "11", value: 11 },
          { label: "12", value: 12 },
        ];
        break;
      case i18n.t("quarterlyPlan"):
        data = [
          { label: "1 ", value: 1 },
          { label: "2 ", value: 2 },
          { label: "3 ", value: 3 },
          { label: "4 ", value: 4 },
        ];
        break;
    }
    let errorMsg = !this.isEmpty(this.state.stylingsErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{this.getStylingLabel()}</Text>
        {this.renderDropDown(
          data,
          i18n.t("select"),
          this.state.styling_per_week,
          this.handleSelctGender
        )}
        {errorMsg && this.renderErrorMsg(this.state.stylingsErrorMsg)}
      </View>
    );
  };

  renderCategoryBlock = () => {
    const data = Array.from({ length: 12 }, (_, index) => {
      const value = (index + 1).toString();
      return {
        label: `${value} ${i18n.t(value === "1" ? "hour" : "hours")}`,
        value: value,
      };
    });
    let errorMsg = !this.isEmpty(this.state.categoryErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("discussionTime")} *</Text>

        {this.renderDropDown(
          data,
          i18n.t("select"),
          this.state.discussion_time,
          this.handleCategorySelect
        )}
        {errorMsg && this.renderErrorMsg(this.state.categoryErrorMsg)}
      </View>
    );
  };

  renderSubCategoryBlock = () => {
    const data = [
      { label: i18n.t("Yes"), value: true },
      { label: i18n.t("No"), value: false },
    ];
    let errorMsg = !this.isEmpty(this.state.subCategoryErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("voiceCallFacility")} *</Text>
        {this.renderDropDown(
          data,
          i18n.t("select"),
          this.state.voice_call_facility,
          this.handleSubCategorySelect
        )}
        {errorMsg && this.renderErrorMsg(this.state.subCategoryErrorMsg)}
      </View>
    );
  };

  renderMaterial = () => {
    let errorMsg = !this.isEmpty(this.state.meterialErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("serviceCharges")} *</Text>
        <View style={[styles.inputViewContainer, { borderColor: "#F8F8F8" }]}>
          <TextInput
            testID="txtInputMaterial"
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            placeholder={i18n.t("enterCharges")}
            placeholderTextColor="#375280"
            maxLength={40}
            value={`$${this.state.service_charges}`}
            onChangeText={this.handleChangetheMaterial}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="decimal-pad"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.meterialErrorMsg)}
      </View>
    );
  };

  renderProductDetails = () => {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
        keyboardVerticalOffset={64}
      >
        <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
          <View style={styles.weeklyContainer}>
            <View>
              {this.renderGenderBlock()}
              {this.renderCategoryBlock()}
              {this.renderSubCategoryBlock()}
              {this.renderMaterial()}
            </View>
            <TouchableOpacity
              style={styles.saveButtonStyle}
              activeOpacity={0.8}
              testID="productDetailsSaveBtn"
              onPress={this.handleSaveButton}
            >
              <Text style={styles.saveButtonText}>{this.state.name_plan? i18n.t("updatePlan"): i18n.t("createPlan")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  getPlanName = () => {
    const { selectedPlan, name } = this.state;
    if (selectedPlan === i18n.t("weeklyPlan")) {
      return i18n.t("weeklyPlan");
    } else if (selectedPlan === i18n.t("monthlyPlan")) {
      return i18n.t("monthlyPlan");
    } else if (selectedPlan === i18n.t("quarterlyPlan")) {
      return  i18n.t("quarterlyPlan");
    } else {
      return name;
    }
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />

          {this.state.loading && <CustomLoader />}
          <View style={styles.viewContainerAssignStore}>
            <View style={styles.headerViewMainAssignStore}>
              <TouchableOpacity
                testID="btnBackAssignstore"
                style={styles.backTouchAssignstore}
                onPress={this.handleBack}
              >
                <Image
                  resizeMode="contain"
                  source={backIcon}
                  style={styles.backIconCssAssignstore}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitleAssignstore}>
                  {this.getPlanName()}
                </Text>
              </View>
              <TouchableOpacity />
            </View>

            <View style={{ flex: 1, paddingBottom: Scale(24) }}>
              {this.renderProductDetails()}
            </View>
          </View>
        </View>
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
  },
  selectedTextStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#375280",
    paddingRight: 10,
  },
  iconStyle: {
    width: Scale(27.34),
    height: Scale(26.6),
  },
  safeContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  headerViewMainAssignStore: {
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    alignContent: "center",
  },
  viewContainerAssignStore: {
    flex: 1,
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  backTouchAssignstore: {
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssAssignstore: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleAssignstore: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  weeklyContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: Scale(10),
  },
  saveButtonStyle: {
    height: Scale(56),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
  },
  saveButtonText: {
    fontFamily: "Lato",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
  keyboardPadding: {
    flex: 1,
  },
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    height: Scale(56),
  },
  buildingTextInput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  dropdown: {
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    borderRadius: 4,
  },
  placeholderStyle: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
});
// Customizable Area End
