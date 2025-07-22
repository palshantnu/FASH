import React from "react";
import {
  // Customizable Area Start
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  // Customizable Area End
} from "react-native";

// Customizable Area Start
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from "../../../components/src/Scale";
import { backIcon, upload, csvfile } from "./assets";

import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import CsvFileUploadController, { Props } from "./CsvFileUploadController";
// Customizable Area End

export default class CsvFileUpload extends CsvFileUploadController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.safeInUploadCSVContainer}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />
          {this.state.loading && <CustomLoader />}
          <View style={styles.viewAssignStoreContainer}>
            <View style={[styles.headerMapView,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity
                testID="btnBack"
                style={[styles.backAssignStore,{transform: [{rotate: i18n.language === 'ar'? '180deg':"0deg"}]}]}
                onPress={() => { this.goBack() }}
              >
                <Image
                  resizeMode="contain"
                  source={backIcon}
                  style={styles.backIconCss}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitle}>
                  {i18n.t('headerTilecsv')}
                </Text>
              </View>
              <View style={styles.filterIcon} />
            </View>

            <View style={styles.imageContainer}>
              {this.state.fileURLcsv == "" ? (
                <TouchableOpacity
                  style={styles.emptyImageContainer}
                  testID="pickCSVfile"
                  onPress={() => this.pickFileCSV()}
                >
                  <Image style={styles.uploadIconView} source={upload} />
                  <Text style={styles.textUpload}>{i18n.t('uploadProduct')}</Text>
                  <Text style={styles.subTextUpload}>
                    {i18n.t('csvFile')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{ justifyContent: "center", width: "92%" }}>
                  <View style={{ alignItems: "center" }}>
                    <Image style={styles.imageCsvIcon} source={csvfile} />
                    <Text style={styles.successMessage}>
                      {this.state.percentagecsv} {i18n.t('completed')}
                    </Text>
                  </View>
                  {this.state.percentagecsv == '0%' &&
                    this.loadProgress('0%')
                  }
                  {this.state.percentagecsv == '30%' &&
                    this.loadProgress('30%')
                  }
                  {this.state.percentagecsv == '70%' &&
                    this.loadProgress('70%')
                  }
                  {this.state.percentagecsv == '100%' &&
                    this.loadProgress('100%')
                  }
                </View>
              )}
            </View>

            {this.state.fileURLcsv !== "" && (
              <TouchableOpacity
                testID="reUploadCSV"
                style={styles.clickBtn}
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({
                    filenamecsv: "",
                    fileURLcsv: "",
                    percentagecsv: "0%",
                  });
                  this.pickFileCSV();
                }}
              >
                <Text style={styles.textCsv}>{i18n.t('reuploadCSV')}</Text>
              </TouchableOpacity>
            )}
            {this.state.percentagecsv == "100%" && (
              <Text style={styles.successMessage}>
                {i18n.t('csvUploadComplete')}
              </Text>
            )}
          </View>

          {this.state.fileURLcsv !== "" && (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                testID="btnBackFileUpload"
                style={styles.backBtn}
                onPress={() => { this.goBack() }}
              >
                <Text style={styles.backTxtInput}>{i18n.t('back')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                testID="btnConfirm"
                style={styles.nextBtn}
                onPress={this.uploadFileCSV}
              >
                <Text style={styles.nextBtnTextInput}>{i18n.t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeInUploadCSVContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  headerMapView: {
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    alignContent: "center",
  },
  viewAssignStoreContainer: {
    flex: 1,
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  backAssignStore: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  filterIcon: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  backIconCss: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },

  emptyImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIconView: {
    width: Scale(40),
    height: Scale(40),
  },
  imageCsvIcon: {
    width: Scale(52),
    height: Scale(52),
  },
  textUpload: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "700",
    color: "#375280",
    marginTop: 16,
  },
  subTextUpload: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    color: "#94A3B8",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: Scale(10),
  },
  clickBtn: {
    backgroundColor: "#fff",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  textCsv: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
  },
  successMessage: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
    marginTop: 8,
  },
  imageContainer: {
    borderRadius: 2,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Scale(190),
    marginTop: 32,
  },

  btnContainer: {
    marginTop: Scale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
  },
  backBtn: {
    width: "48%",
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,

    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  backTxtInput: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500",
  },
  nextBtn: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: "48%",
    borderRadius: 2,
    justifyContent: "center",
  },
  nextBtnTextInput: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
});
// Customizable Area End
