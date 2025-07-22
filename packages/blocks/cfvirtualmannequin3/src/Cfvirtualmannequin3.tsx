import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  Modal,
} from "react-native";

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// import { Input, Button, Typography} from '@builder/component-library';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
import { TouchableOpacity } from "react-native";
import { activeButton, backIcon, inActiveButton, manAvatar, womanAvatar } from "./assets";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
// Customizable Area End

import Cfvirtualmannequin3Controller, {
  Props,
  configJSON,
} from "./Cfvirtualmannequin3Controller";

export default class Cfvirtualmannequin3 extends Cfvirtualmannequin3Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  modalView = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.mediaModal}
      >
        <View style={styles.modalBaseView}>
          <SafeAreaView style={styles.safeContainer} />
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ffffff"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />
          <View style={styles.modalWhiteView}>
            <View
              style={styles.upperVerticalLine}
            ></View>
            <View style={styles.beforeTxtView}>
              <Text style={styles.headerTitleCatalogue}>{`Create Avatar`}</Text>
            </View>
            <View style={styles.fullBottomLine} />
            <View style={styles.mediaMainView}>
              <TouchableOpacity
                activeOpacity={0.8}
                testID="selectMediaImage"
                onPress={() => this.setMediaType(false)}
                style={styles.mediaButton}>
                <Image
                  source={this.state.mediaType === false ? activeButton : inActiveButton}
                  resizeMode="contain"
                  style={styles.activeInactiveImage}
                />
                <Text
                  style={[styles.mediaTxt,
                  {
                    fontWeight: this.state.mediaType === false ? '700' : '200'

                  }]}>{`Upload Images`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                testID="selectMediaVideo"
                onPress={() => this.setMediaType(true)}
                style={styles.mediaButton}
              >
                <Image
                  source={this.state.mediaType ? activeButton : inActiveButton}
                  resizeMode="contain"
                  style={styles.activeInactiveImage}
                />
                <Text
                  style={[styles.mediaTxt,
                  {
                    fontWeight: this.state.mediaType ? '700' : '200'

                  }]}>{`Record Video`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fullBottomLine} />
            <View style={[styles.row, styles.btns]} testID="buyCartBtns">
              <CustomButton
                title="Cancel"
                onPress={() => this.setMediaModal()}
                style={styles.cartButton}
                textStyle={styles.addToCartText}
                testID="CancelButton"
              />
              <CustomButton
                title="Confirm"
                testID="ConfirmButton"
                style={styles.buyNowButton}
                onPress={() => this.onConfirmPress()}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={false}
          hidden={false}
          networkActivityIndicatorVisible={false}
        />
        {this.modalView()}
        <View style={styles.headerViewMainCatalogue}>
          <TouchableOpacity
            style={styles.backTouchCatalogue}
            testID="btnBackAddAddress"
            onPress={() => this.goToBack()}
          >
            <Image
              source={backIcon}
              resizeMode="contain"
              style={styles.backIconCssCatalogue}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitleCatalogue}>{`Select Avatar`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.onPressNext()}
            testID="handleNavigationNextPage"
            style={{ justifyContent: "center" }}
          >
            <Text style={styles.clear}>Next</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.yourAvHeading}>
            <Text style={styles.yourAvatarTxt}>{`Your Avatar`}</Text>
          </View>

          <View style={styles.avatarBaseView}>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.avatarBackView, {
                  borderColor: this.state.selectGender === 'male' ? '#CCBEB1' : "",
                  borderWidth: this.state.selectGender === 'male' ? (windowWidth * 0.3) / 100 : 0,
                }]}
                testID="maleAvatar"
                onPress={() => this.btnChangeGender('male')}
              >
                <Image
                  source={manAvatar}
                  resizeMode='contain'
                  style={styles.avatarImage}
                />
              </TouchableOpacity>
              <Text style={styles.nameTxt}>{`Tom's Avatar`}</Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.avatarBackView, {
                  borderColor: this.state.selectGender === 'female' ? '#CCBEB1' : "",
                  borderWidth: this.state.selectGender === 'female' ? (windowWidth * 0.3) / 100 : 0,
                }]}
                testID="femaleAvatar"
                onPress={() => this.btnChangeGender('female')}
              >
                <Image
                  source={womanAvatar}
                  resizeMode='contain'
                  style={styles.avatarImage}
                />
              </TouchableOpacity>
              <Text style={styles.nameTxt}>{`Lucy's Avatar`}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: (windowHeight * 20) / 100 }}>
          <View style={[styles.rowModeConfirm, styles.btnsModeConfirm, { paddingHorizontal: Scale(20) }]}>
            <CustomButton
              testID="handleNavigationNextPageafterClickImage"
              title="Use Stock Avata"
              style={styles.stockAvatarButton}
              textStyle={styles.stockAvatarTxt}
              onPress={() => this.onPressNext()}
            />
          </View>
          <Text style={styles.orTxt}>{`Or`}</Text>
          <View style={[styles.rowModeConfirm, styles.btnsModeConfirm, { paddingHorizontal: Scale(20) }]}>
            <CustomButton
              testID="confirmBtn"
              title="Create New Avatar"
              onPress={() => this.setMediaModal()}
              style={styles.accButtonModeConfirm}
              textStyle={styles.accTxtModeConfirm}
            />
          </View>
        </View>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  backTouchCatalogue: {
    width: (windowWidth * 12) / 100,
    height: (windowWidth * 12) / 100,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 12) / 100,
    height: (windowWidth * 12) / 100,
  },
  body: {
    marginBottom: 32,
    textAlign: "left",
    marginVertical: 8,
    padding: 10,
  },
  bgPasswordContainer: {
    marginBottom: 16,
    padding: 10,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    backgroundColor: "transparent",
    marginRight: -10,
  },
  headerViewMainCatalogue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
    alignContent: "center",
    padding: 20,
    alignItems: 'center'
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
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
    textDecorationLine: 'underline'
  },
  line: {
    borderWidth: 0.8,
    borderColor: "#F1F5F9",
  },
  yourAvHeading: {
    paddingHorizontal: (windowWidth * 6) / 100,
    paddingVertical: (windowHeight * 2) / 100
  },
  yourAvatarTxt: {
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    fontFamily: "Avenir-Heavy",
  },
  avatarBaseView: {
    paddingHorizontal: (windowHeight * 1) / 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10
  },
  avatarImage: {
    width: (windowWidth * 35) / 100,
    height: (windowWidth * 45) / 100,
  },
  avatarBackView: {
    width: (windowWidth * 38) / 100,
    height: (windowHeight * 30) / 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    // shadowOffset: { width: 0 },
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
  },
  rowModeConfirm: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnsModeConfirm: {
    paddingVertical: Scale(15),
  },
  accButtonModeConfirm: {
    flex: 1,
    borderRadius: Scale(2),
  },
  accTxtModeConfirm: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
  stockAvatarButton: {
    flex: 1,
    borderRadius: Scale(2),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: "#CCBEB1"
  },
  stockAvatarTxt: {
    color: "#375280",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Lato-Bold",
  },
  button: {
    backgroundColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    minHeight: Scale(56),
    borderRadius: Scale(5),
    overflow: "hidden",
  },
  text: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    color: "#FFFFFF",
  },
  orTxt: {
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    fontFamily: "Avenir-Heavy",
    textAlign: 'center'
  },
  nameTxt: {
    marginTop: (windowWidth * 2) / 100,
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    fontFamily: "Avenir-Heavy",
    textAlign: 'center'
  },
  activeInactiveImage: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  row: {
    flexDirection: "row",
    marginTop: 20
  },
  btns: {
    paddingHorizontal: Scale(15),
    paddingBottom: Scale(20),
  },
  cartButton: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#CCBEB1",
    marginHorizontal: Scale(5),
  },
  buyNowButton: {
    flex: 1,
    marginHorizontal: Scale(5),
  },
  addToCartText: {
    color: "#375280",
  },
  modalBaseView: {
    flex: 1,
    backgroundColor: "#00000070",
  },
  modalWhiteView: {
    backgroundColor: "#ffffff",
    width: windowWidth,
    bottom: 0,
    position: 'absolute',
    paddingVertical: windowHeight * 0.5 / 100
  },
  upperVerticalLine: {
    alignSelf: 'center',
    width: windowWidth * 16 / 100,
    height: windowWidth * 1 / 100,
    backgroundColor: '#F2F4F5',
    marginTop: windowWidth * 2 / 100,
    borderRadius: windowWidth * 2 / 100
  },
  beforeTxtView: {
    marginTop: windowWidth * 3 / 100
  },
  mediaMainView: {
    paddingVertical: windowWidth * 4 / 100
  },
  fullBottomLine: {
    alignSelf: 'center',
    width: windowWidth,
    height: windowWidth * 0.2 / 100,
    backgroundColor: '#F2F4F5',
    marginTop: windowWidth * 3 / 100,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 6 / 100,
    paddingVertical: windowWidth * 3 / 100,
  },
  mediaTxt: {
    color: '#375280',
    left: windowWidth * 4 / 100,
    fontSize: windowWidth * 3.5 / 100,
  }
});
// Customizable Area End
