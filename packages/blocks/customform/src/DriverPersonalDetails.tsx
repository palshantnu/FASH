import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage'
import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

import { headPhoneIcon, calendar } from "./assets";

const { width: windowWidth } = Dimensions.get("window");
// Customizable Area End

import DriverPersonalDetailsController, {
  Props,
} from "./DriverPersonalDetailsController";

export default class DriverPersonalDetails extends DriverPersonalDetailsController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  Input = ({
    label,
    style,
    hasError,
    ...props
  }: TextInputProps & { label: string; hasError: boolean }) => (
    <View style={styles.wrapper}>
      <Text style={[styles.label,{textAlign:TextAlignManage(i18n.language)}]}>{label}</Text>
      <TextInput {...props} style={[styles.textInput, style,{textAlign:TextAlignManage(i18n.language)}]} />
      <View style={styles.errContainer}>
        {hasError ? (
          <Text testID="errorText" style={[styles.errorText,{textAlign:TextAlignManage(i18n.language)}]}>
            {this.state.error}
          </Text>
        ) : null}
      </View>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="searchCity">
        <CustomHeader
          title={i18n.t('personalDetailsText')}
          leftTestId="backBtn"
          rightTestId="ccBtn"
          onLeftPress={this.goBack}
          right={<Image source={headPhoneIcon} style={styles.icon} />}
          onRightPress={this.onCustomerCarePress}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={40}
        >
        <ScrollView bounces={false} 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <View style={styles.wrapper}>
              <Text style={[styles.label,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('dateOfBirthText')}</Text>
              <View style={[styles.textInput, styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.dob}>{this.state.dob}</Text>
                <Pressable onPress={this.openDobModal} testID="dobModal">
                  <Image source={calendar} style={styles.icon} />
                </Pressable>
              </View>
            </View>
            <this.Input
              label={i18n.t('addressStarText')}
              value={this.state.address}
              onChangeText={this.onAddressChange}
              testID="address"
              hasError={this.state.errorKey === "address"}
            />
            <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <this.Input
                label={i18n.t('areaStarText')}
                value={this.state.area}
                onChangeText={this.onAreaChange}
                style={styles.f1}
                testID="area"
                hasError={this.state.errorKey === "area"}
              />
              <this.Input
                label={i18n.t('blockStarText')}
                value={this.state.block}
                onChangeText={this.onBlockChange}
                style={styles.f1}
                testID="block"
                hasError={this.state.errorKey === "block"}
              />
            </View>
            <this.Input
              label={i18n.t('hourseBuildingStarText')}
              testID="hob"
              value={this.state.house_or_building}
              onChangeText={this.onHouseChange}
              hasError={this.state.errorKey === "house_or_building"}
            />
            <this.Input
              label={i18n.t('zipcodeText')}
              testID="zip"
              value={this.state.zipcode}
              onChangeText={this.onZipCodeChange}
              hasError={this.state.errorKey === "zipcode"}
            />
          </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
        <DateTimePickerModal
          mode="date"
          testID="dobPicker"
          date={this.state.dobDate}
          isVisible={this.state.dobModalVisible}
          onConfirm={this.confirmDob}
          onHide={this.hideDobModal}
          onCancel={this.hideDobModal}
          maximumDate={this.maxDate}
          locale={i18n.language}
        />
        <CustomButton
          title={i18n.t('Next')}
          testID="btnNext"
          style={styles.btn}
          onPress={this.validate}
        />
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  main: {
    padding: Scale(20),
    flex: 1,
  },
  wrapper: {
    marginTop: Scale(8),
  },
  label: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: Scale(16),
    color: "#375280",
    marginBottom: Scale(6),
  },
  btn: {
    marginBottom: Scale(20),
    marginHorizontal: Scale(20),
  },
  icon: {
    width: (windowWidth * 4) / 100,
    height: (windowWidth * 5) / 100,
  },
  textInput: {
    height: Scale(48),
    padding: Scale(8),
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
    color: "#375280",
    fontFamily: "Lato",
  },
  dob: {
    color: "#375280",
    fontFamily: "Lato",
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  f1: { width: windowWidth / 2 - Scale(30), marginHorizontal: 0 },
  errContainer: {
    height: Scale(24),
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "Lato",
    color: "#EF4444",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
  },
});
