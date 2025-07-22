import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, gps } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import CustomSwitch from "../../../components/src/CustomSwitch";
import Scale from "../../../components/src/Scale";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End
//@ts-ignore
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/AntDesign";

import AddressManagementController, {
  Props,
  configJSON,
  AdressTypeData,
} from "./AddressManagementController";

export default class AddAddress extends AddressManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderFullName = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language),}]}>{i18n.t('FullName')} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isName ? 1.4 : 0,
              borderColor: this.state.isName ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputFirstName"
            placeholderTextColor="#375280"
            placeholder=""
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            maxLength={40}
            value={this.state.name}
            onChangeText={this.firstNameChange}
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize="none"
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isName && (
          <Text style={styles.errorName}>
            {i18n.t("fullNameValidate")}
          </Text>
        )}
      </View>
    );
  };

  renderArea = () => {
    return (
      <View style={{ ...styles.fieldContainer, width: "48%"}}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Area")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isArea ? 1.4 : 0,
              borderColor: this.state.isArea ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            placeholderTextColor="#375280"
            placeholder=""
            testID="txtInputArea"
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.area}
            maxLength={40}
            onChangeText={this.areaChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isArea && (
          <Text style={styles.errorName}>{i18n.t("areaValidate")}</Text>
        )}
      </View>
    );
  };

  renderBlock = () => {
    return (
      <View style={{ ...styles.fieldContainer, width: "48%", marginLeft: 8 }}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Block")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isBlock ? 1 : 0,
              borderColor: this.state.isBlock ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputBlock"
            placeholder=""
            placeholderTextColor="#375280"
            value={this.state.block}
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            maxLength={40}
            onChangeText={this.blockChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isBlock && (
          <Text style={styles.errorName}>{i18n.t("blockValidate")}</Text>
        )}
      </View>
    );
  };

  renderAddress = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Street")} *</Text>
        <View
          style={[
            styles.inputViewContainerForStreet,
            {
              borderWidth: this.state.isAddress ? 1 : 0,
              borderColor: this.state.isAddress ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputAddress"
            placeholder=""
            style={[styles.buildingTextInputForStreet, { paddingRight: 38 }]}
            placeholderTextColor="#375280"
            value={this.state.address}
            maxLength={80}
            multiline
            editable={false}
            onChangeText={this.addressChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
          <TouchableOpacity
            testID="btnRedirectGps"
            style={styles.gpsTouchInAdd}
            onPress={this.btnRedirectGpsInAdd}
          >
            <Image source={gps} style={styles.gpsIconInAdd}></Image>
          </TouchableOpacity>
        </View>
        {this.state.isAddress && (
          <Text style={styles.errorName}>
            {i18n.t("addressValidate")}
          </Text>
        )}
      </View>
    );
  };

  renderHouseNumber = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("House / Building Number")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isHouseNumber ? 1 : 0,
              borderColor: this.state.isHouseNumber ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputHouseNumber"
            placeholder=""
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.houseNumber}
            maxLength={10}
            onChangeText={this.hnChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isHouseNumber && (
          <Text style={styles.errorName}>
            {i18n.t("houseNumberValidate")}
          </Text>
        )}
      </View>
    );
  };

  renderZipCode = () => {
    return (
      <View style={{ ...styles.fieldContainer }}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Zip Code (Optional)")}</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isZipCode ? 1 : 0,
              borderColor: this.state.isZipCode ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputZipCode"
            placeholder=""
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.zipCode}
            maxLength={6}
            onChangeText={this.zipChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="number-pad"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isZipCode && (
          <Text style={styles.errorName}>
            {i18n.t("zipCodeValidate")}
          </Text>
        )}
      </View>
    );
  };

  renderAddressName = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Address Name")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            {
              borderWidth: this.state.isAddressName ? 1 : 0,
              borderColor: this.state.isAddressName ? "#F87171" : "#F8F8F8",
            },
          ]}
        >
          <TextInput
            testID="txtInputAddressname"
            placeholder=""
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput,{ textAlign: TextAlignManage(i18n.language)}]}
            value={this.state.addressName}
            maxLength={50}
            onChangeText={this.addressNameChange}
            autoCapitalize="none"
            onSubmitEditing={Keyboard.dismiss}
            keyboardType="default"
            onFocus={this.closeDropDown}
          />
        </View>
        {this.state.isAddressName && (
          <Text style={styles.errorName}>
            {i18n.t("addressNameValidate")}
          </Text>
        )}
      </View>
    );
  };

  renderContactNumber = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{ textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("Contact Number")} *</Text>
        <MobileWithCountryCodesInput
          // inputTestId="txtInputPhoneNumber"
          optionsList={this.state.countryList}
          selectedIndex={this.state.selectedCodeIndex}
          onSelect={this.updateCountry}
          inputValue={this.state.contactNumber}
          onValueChange={this.updatePhoneNumber}
          open={this.state.dropdownOpen}
          toggleOpen={this.toggleCountryDropdown}
          hasError={this.state.isContactNumber}
          placeHolderInput={i18n.t("Enter_contactNumber")}
          onFocusChange={this.closeDropDown}
        />
        {this.state.isContactNumber && (
          <Text style={styles.errorName}>
            {i18n.t("contactNumberValidate")}
          </Text>
        )}
      </View>
    );
  };

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={[styles.headerViewMainCatalogue, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <TouchableOpacity
            testID="btnBackAddAddress"
            style={styles.backTouchCatalogue}
            onPress={this.goToBackInAddAddress}
          >
            <Image
              resizeMode="contain"
              source={backIcon}
              style={[styles.backIconCssCatalogue , { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}
            ></Image>
          </TouchableOpacity>
          <View>
            <Text
              style={styles.headerTitleCatalogue}
            >{i18n.t(`${this.state.header} Address`)}</Text>
          </View>
          <View style={styles.filterTouch}></View>
        </View>
        <KeyboardAvoidingView
          behavior={this.isPlatformiOS() ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            bounces={false}
            contentContainerStyle={{ marginTop: 12, paddingBottom: Scale(140) }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              testID={"Background"}
              onPress={() => {
                this.hideKeyboard();
                this.closeDropDown()
              }}
            >
              <View>
                {this.renderFullName()}
                <View style={[styles.flexRow, {flexDirection: FlexConditionManage(i18n.language), justifyContent: "space-between" }]}>
                  {this.renderArea()}
                  {this.renderBlock()}
                </View>

                {this.renderAddress()}
                {this.renderHouseNumber()}

                {this.renderZipCode()}

                {this.renderContactNumber()}
                {this.renderAddressName()}

                <View style={[styles.toggleButton, {flexDirection: FlexConditionManage(i18n.language) }]}>
                  <CustomSwitch
                    size={16}
                    testID="defaultAddressBtn"
                    value={this.state.isDeafultAddress}
                    onValueChange={this.toggleDefaultSwitch}
                  />

                  <Text style={styles.toggleText}>
                    {i18n.t("Make_it_default_delivery_address")}
                  </Text>
                </View>

                <TouchableOpacity
                  testID="btnSaveAdress"
                  style={styles.addAdressButton}
                  onPress={this.addNewAddress}
                >
                  <Text style={styles.addNewButtonText}>
                    {this.state.isEditAdddress ? i18n.t("Update Address") : i18n.t("Save")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerViewMainCatalogue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
    alignContent: "center",
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
  filterTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(16),
    color: "#375280",
    paddingBottom: 6
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    // paddingHorizontal: 16,
    height: Scale(50),
  },
  inputViewContainerForStreet: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  gpsTouchInAdd: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
    right: 5,
    position: "absolute",
    marginTop: (windowWidth * 6.5) / 100,
  },
  gpsIconInAdd: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  buildingTextInput: {
    fontFamily: "Lato-Bold",
    color: "#375280",
    fontSize: Scale(16),
    paddingBottom: 6,
  },
  buildingTextInputForStreet: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    backgroundColor: "#F8F8F8",
    paddingLeft: 16,
    minHeight: 47,
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  flexRow: {
    flexDirection: "row",
  },
  addAdressButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    marginBottom: 32,
  },
  addNewButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
  toggleButton: {
    flexDirection: "row",
    marginTop: (windowWidth * 4) / 100,
    alignItems: "center",
  },
  toggleText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 20,
    color: "#375280",
  },
});
// Customizable Area End
