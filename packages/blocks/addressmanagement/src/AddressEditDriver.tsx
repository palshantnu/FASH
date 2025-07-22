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
  Keyboard,
  ScrollView,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import AddressEditDriverController, {
  Props,
} from "./AddressEditDriverController";
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import globalStyle from "../../../components/src/GlobalStyle";
// Customizable Area End

export default class AddressEditDriver extends AddressEditDriverController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.containerAddE}>
        <SafeAreaView style={styles.safeContainerAddE} />
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
            styles.containerEditAddressView,
            globalStyle.headerMarginManage,
          ]}
        >
          <View
            style={[
              styles.headerViewEditAddress,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="btnBackUpdateAddress"
              style={styles.backTouchEditAddress}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[
                  styles.backIconCssEditAddress,
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
              <Text style={styles.headerTitleEditAddress}>
                {i18n.t("Edit Address")}
              </Text>
            </View>
            <View style={styles.filterExtraTouchEditAdd} />
          </View>

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollPaddingManageEdit}
          >
            <View style={styles.editAddressMainView}>
              <Text
                style={[
                  styles.editAddressLableText,
                  { textAlign: TextAlignManage(i18n.language) },
                ]}
              >
                {i18n.t("addressStarText")}
              </Text>
              <TextInput
                testID={"txt_enter_update_address"}
                onChangeText={(txtAddress) => {
                  this.onAddressChange(txtAddress);
                }}
                keyboardType="default"
                maxLength={100}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholder={i18n.t("addressPlaceholderText")}
                placeholderTextColor={"#9A9A9A"}
                style={[
                  {
                    borderWidth: this.state.addressError ? 1 : 0,
                    borderColor: this.checkBoarderColor(
                      this.state.addressError
                    ),
                    textAlign: TextAlignManage(i18n.language),
                  },
                  styles.editAddressTextInputDriver,
                ]}
                value={this.state.address}
              />
              {this.state.addressError && (
                <View style={styles.errorViewEditAddress}>
                  <Text
                    style={[
                      styles.errorTextEditAddress,
                      { textAlign: TextAlignManage(i18n.language) },
                    ]}
                  >
                    {i18n.t("pleaseEnterAddressErrorText")}
                  </Text>
                </View>
              )}
            </View>

            <View style={[styles.viewFlexManage,{ flexDirection: FlexConditionManage(i18n.language) }]}>
              <View style={styles.editAddressMainView}>
                <Text
                  style={[
                    { textAlign: TextAlignManage(i18n.language) },
                    styles.editAddressLableText,
                  ]}
                >
                  {i18n.t("areaStarText")}
                </Text>
                <TextInput
                  testID={"txt_enter_area"}
                  onChangeText={(txtArea) => {
                    this.onAreaChange(txtArea);
                  }}
                  keyboardType="default"
                  maxLength={50}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder={i18n.t("areaPlaceholderText")}
                  placeholderTextColor={"#9A9A9A"}
                  style={[
                    {
                      textAlign: TextAlignManage(i18n.language),
                      borderWidth: this.state.areaError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.areaError),
                    },
                    styles.agencySplitTextInputDriver,
                  ]}
                  value={this.state.area}
                />
                {this.state.areaError && (
                  <View style={styles.errorViewEditAddress}>
                    <Text
                      style={[
                        styles.errorTextEditAddress,
                        { textAlign: TextAlignManage(i18n.language) },
                      ]}
                    >
                      {i18n.t("pleaseEnterAreaErrorText")}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.editAddressMainView}>
                <Text
                  style={[
                    styles.editAddressLableText,
                    { textAlign: TextAlignManage(i18n.language) },
                  ]}
                >
                  {i18n.t("blockStarText")}
                </Text>
                <TextInput
                  testID={"txt_enter_block"}
                  onChangeText={(txtBlock) => {
                    this.onBlockChange(txtBlock);
                  }}
                  keyboardType="default"
                  maxLength={50}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder={i18n.t("blockPlaceholderText")}
                  placeholderTextColor={"#9A9A9A"}
                  style={[
                    {
                      borderWidth: this.state.blockError ? 1 : 0,
                      borderColor: this.checkBoarderColor(
                        this.state.blockError
                      ),
                      textAlign: TextAlignManage(i18n.language),
                    },
                    styles.agencySplitTextInputDriver,
                  ]}
                  value={this.state.block}
                />
                {this.state.blockError && (
                  <View style={styles.errorViewEditAddress}>
                    <Text
                      style={[
                        { textAlign: TextAlignManage(i18n.language) },
                        styles.errorTextEditAddress,
                      ]}
                    >
                      {i18n.t("pleaseEnterBlockErrorText")}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.editAddressMainView}>
              <Text
                style={[
                  styles.editAddressLableText,
                  { textAlign: TextAlignManage(i18n.language) },
                ]}
              >
                {i18n.t("hourseBuildingStarText")}
              </Text>
              <TextInput
                testID={"txt_enter_house_number"}
                onChangeText={(txtHouseNumber) => {
                  this.onHouseNumberChange(txtHouseNumber);
                }}
                keyboardType="default"
                maxLength={100}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholder={i18n.t("housePlaceholderText")}
                placeholderTextColor={"#9A9A9A"}
                style={[
                  {
                    borderWidth: this.state.houseNumberError ? 1 : 0,
                    borderColor: this.checkBoarderColor(
                      this.state.houseNumberError
                    ),
                    textAlign: TextAlignManage(i18n.language),
                  },
                  styles.editAddressTextInputDriver,
                ]}
                value={this.state.houseNumber}
              />
              {this.state.houseNumberError && (
                <View style={styles.errorViewEditAddress}>
                  <Text
                    style={[
                      styles.errorTextEditAddress,
                      { textAlign: TextAlignManage(i18n.language) },
                    ]}
                  >
                    {i18n.t("pleaseEnterHouseErrorText")}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.editAddressMainView}>
              <Text
                style={[
                  { textAlign: TextAlignManage(i18n.language) },
                  styles.editAddressLableText,
                ]}
              >
                {i18n.t("zipcodeText")}
              </Text>
              <TextInput
                testID={"txt_enter_zipcode"}
                onChangeText={(txtZipcode) => {
                  this.onzipcodeChange(txtZipcode);
                }}
                keyboardType="default"
                maxLength={6}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholder={i18n.t("zipcodePlaceholderText")}
                placeholderTextColor={"#9A9A9A"}
                style={[
                  styles.editAddressTextInputDriver,
                  { textAlign: TextAlignManage(i18n.language) },
                ]}
                value={this.state.zipcode}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnEditAddressMargin}>
          <TouchableOpacity
            testID="btnUpdateAddressDriver"
            style={styles.btnSaveButtonDriver}
            onPress={() => {
              this.updateDriverAddress();
            }}
          >
            <Text style={styles.saveButtonTextDriver}>
              {i18n.t("saveChanges")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      //Merge Engine End DefaultContainerAddE
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerAddE: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainerAddE: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  containerEditAddressView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerViewEditAddress: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchEditAddress: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssEditAddress: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleEditAddress: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterExtraTouchEditAdd: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  editAddressMainView: {
    marginTop: (windowWidth * 5) / 100,
  },
  editAddressLableText: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.9) / 100,
  },
  editAddressTextInputDriver: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  agencySplitTextInputDriver: {
    width: (windowWidth * 43) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  errorViewEditAddress: {
    marginTop: (windowWidth * 1) / 100,
  },
  errorTextEditAddress: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
  },
  btnEditAddressMargin: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    position: "absolute",
    bottom: (windowWidth * 7) / 100,
  },
  btnSaveButtonDriver: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 8) / 100,
    justifyContent: "center",
  },
  saveButtonTextDriver: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 4.5) / 100,
  },
  dropDownRenderMainViewEditD: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D5D5D5",
    width: (windowWidth * 90) / 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDownLabelTextEditA: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
  },
  dropDownAddresTextDriver: {
    color: "#94A3B8",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
  },
  dropDownContainerEditAWidth: {
    width: (windowWidth * 80) / 100,
  },
  imageNameColorDriver: {
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  dropdownIconCss: {
    position: "absolute",
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    right: 5,
  },
  scrollPaddingManageEdit: {
    paddingBottom: 150,
  },
  dropdownPlaceholder: {
    color: "#9A9A9A",
    padding: 5,
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.5) / 100,
  },
  viewFlexManage: {
    justifyContent: "space-between",
  },
});
