import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  TextInput,
  Keyboard,
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import RequestCallController, {
  Props
} from "./RequestCallController";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";

export default class RequestCall extends RequestCallController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerRequestCall, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouch}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backIconRC, { transform: [{ scaleY: ImageReverseManage(i18n.language) }, { scaleX: ImageReverseManage(i18n.language) }] }]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>
          {i18n.t("requestCall")}
        </Text>
      </View>
      <View style={styles.extraView} />
    </View>
  );

  renderReasonInput = () => {
    return (
      <>
        <Text style={[styles.exportTextVehicle, { textAlign : TextAlignManage(i18n.language) }]}>
            {i18n.t('reasonForCall')} *
        </Text>
        <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: "center" }}>
          <TextInput
            testID={`reason-input`}
            onChangeText={this.updateReason}
            keyboardType={"default"}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder={i18n.t("enterReasonForCall")}
            multiline={true}
            numberOfLines={10}
            placeholderTextColor={"#9A9A9A"}
            style={[
              {
                borderWidth: this.state.reasonError ? 1 : 0,
                borderColor: this.state.reasonError ? "red" : "#A9A9A9",
                width: (windowWidth * 90) / 100,
                textAlignVertical: "top",
                textAlign:  TextAlignManage(i18n.language)
              },
              styles.storeDescriptionInput,
              styles.Input,
            ]}
            value={this.state.reason}
          />
        </View>
        {this.state.reasonError && (
          <View style={styles.errorView} testID={`Reason-Error`}>
            <Text style={[styles.errorText , {textAlign:  TextAlignManage(i18n.language)}, {width: windowWidth*0.90 }]}>{this.state.reasonErrorMessage}</Text>
          </View>
        )}
      </>
    )
  }

  renderHoursInput = () => {
    return (
      <>
        <Text  style={[styles.exportTextVehicle, { textAlign : TextAlignManage(i18n.language) }]}>
          {i18n.t("24Hours")} *
        </Text>
        <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: "center" }}>
          <TextInput
            testID={`hours-input`}
            onChangeText={this.updateHours}
            keyboardType={"numeric"}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder={i18n.t("enterHours")}
            placeholderTextColor={"#9A9A9A"}
            style={[
              {
                borderWidth: this.state.hoursError ? 1 : 0,
                borderColor: this.state.hoursError ? "red" : "#A9A9A9",
                width: (windowWidth * 42) / 100,
                textAlign: TextAlignManage(i18n.language)
              },
              styles.Input,
            ]}
            value={this.state.hours}
          />
        </View>
        {this.state.hoursError && (
          <View style={[styles.errorView, { width: (windowWidth * 42) / 100 }]} testID={`Hours-Error`}>
            <Text style={[styles.errorText , {textAlign:  TextAlignManage(i18n.language)}, {width: windowWidth*0.42 }]}>{this.state.hoursErrorMessage}</Text>
          </View>
        )}
      </>
    )
  }

  renderMinutesInput = () => {
    return (
      <>
        <Text  style={[styles.exportTextVehicle, { textAlign : TextAlignManage(i18n.language) }]}>
          {i18n.t("minutes")} *
        </Text>
        <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: "center"}}>
          <TextInput
            testID={`minutes-input`}
            onChangeText={this.updateMinutes}
            keyboardType={"numeric"}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder={i18n.t("enterMinutes")}
            placeholderTextColor={"#9A9A9A"}
            style={[
              {
                borderWidth: this.state.minutesError ? 1 : 0,
                borderColor: this.state.minutesError ? "red" : "#A9A9A9",
                width: (windowWidth * 42) / 100,
                textAlign: TextAlignManage(i18n.language)
              },
              styles.Input,
            ]}
            value={this.state.minutes}
          />
        </View>
        {this.state.minutesError && (
          <View style={[styles.errorView, { width: (windowWidth * 42) / 100 }]} testID={`Minutes-Error`}>
            <Text style={[styles.errorText , {textAlign:  TextAlignManage(i18n.language)}, {width: windowWidth*0.42 }]}>{this.state.minutesErrorMessage}</Text>
          </View>
        )}
      </>
    )
  }
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="RequestCall">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
          <this.Header />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{  alignSelf: "center" }}
          >
            {this.renderReasonInput()}
            <View style={{ marginTop: (windowWidth * 4) / 100, flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                {this.renderHoursInput()}
              </View>
              <View>
                {this.renderMinutesInput()}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            testID="StylishButton"
            onPress={() => { this.requestCall() }}>
            <View style={styles.bottomView}>
              <Text style={styles.bottomTxt}>{i18n.t("Submit")}</Text>
            </View>
          </TouchableOpacity>

      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRequestCall: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
  },
  bottomView: {
    justifyContent: 'flex-end',
    backgroundColor: '#CCBEB1',
    borderRadius: 2,
    paddingVertical: verticalScale(15),
    paddingHorizontal: Scale(16),
    marginHorizontal: Scale(24),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  bottomTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  bodyView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  exportTextVehicle: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
    marginTop: (windowWidth * 3) / 100,
  },
  Input: {
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  backIconRC: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  storeDescriptionInput: {
    height: (windowHeight * 15) / 100,
    width: (windowWidth * 90) / 100,
    marginTop: 7,
    padding: 7,
    borderRadius: 5,
    fontFamily: 'Lato-Regular',
    color: '#375280',
    backgroundColor: '#F8F8F8',
  },
  errorText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
    flexWrap: 'wrap', 
  },
  errorView: {
    marginTop: (windowWidth * 1) / 100,
    width: (windowWidth * 90) / 100,
    flexWrap: 'wrap',
  },
});
// Customizable Area End