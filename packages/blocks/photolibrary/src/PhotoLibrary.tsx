import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CheckBox from "@react-native-community/checkbox";
import CustomButton from "../../../components/src/CustomButton";
import CustomTextInput from "../../../components/src/CustomTextInput";
import globalStyle from "../../../components/src/GlobalStyle";
import { deleteIcon,exportIcon } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config'
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import { responsiveHeight } from "react-native-responsive-dimensions";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width } = Dimensions.get("window");
// Customizable Area End

import PhotoLibraryController, {
  Props,
  configJSON
} from "./PhotoLibraryController";
import CustomLoader from "../../../components/src/CustomLoader";

export default class PhotoLibrary extends PhotoLibraryController {
    constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  uploadPortfolio = () => {
    return (
      <View style={{ marginHorizontal: Scale(15), flex: 1, }}>
        <KeyboardAvoidingView
          behavior={this.isPlatformiOS() ? "padding" : undefined}
          style={{ marginHorizontal: Scale(15), flex: 1, }}
          keyboardVerticalOffset={64}
        >
          <ScrollView style={{ flex: 1, }}>
            <TouchableOpacity
              onPress={() => { this.mediaUploadPortfolio() }}
              testID="MediaUploadPortfolio">
              {this.state.profilePhoto.uri !== "" ?
                <Image
                    source={{ uri: this.state.profilePhoto?.uri }}
                    style={styles.multiplePhotos1} />
                :
                <View style={styles.emptyImagePortfolioContainer}>
                  <Image
                    source={exportIcon}
                    style={styles.multiplePhotos} />
                  <Text style={styles.uploadPhoto}>{i18n.t('uploadPhoto')}</Text>
                  <Text style={styles.uploadPhotoDes}>{i18n.t('onlyPngAccepted')}</Text>
                </View>
              }
            </TouchableOpacity>
            <View style={{ marginTop: verticalScale(15) }}>
              <Text style={styles.photoDesc}>{i18n.t('photoDescription')}</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder={i18n.t('writePhotoDescription')}
                  placeholderTextColor="#375280"
                  onChangeText={(text: string) => this.onChangeSinglePhotoUpload(text)}
                  value={this.state.onChangeTxt}
                  testID={"txt_enter_description"}
                  style={[styles.inputSingleContainer, { textAlign: TextAlignManage(i18n.language) }]}
                />
              </View>
            </View>
            <Text style={styles.orTxt}>{i18n.t('OR')}</Text>
            <TouchableOpacity
              style={[styles.emptyImagePortfolioContainer,
              styles.mt8,
              this.state.errorKey === "portfolio"
                ? styles.error
                : styles.noError,
              ]}
              testID="uploadMultiplePhotos"
              onPress={() => { this.openMultiModal() }}
            >
              <Image
                source={exportIcon}
                style={styles.multiplePhotos}
              />
              <Text style={styles.uploadPhoto}>{i18n.t('uploadMultiple')}</Text>
              <Text style={styles.uploadPhotoDes}>{i18n.t('onlyPngAccepted')}</Text>
            </TouchableOpacity>
            {this.state.portfolio?.length > 0 ? (
              <View style={[styles.listWrap, styles.mt8]} testID="portfolioBlock">
                <View style={[styles.row, styles.mt8,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <View style={styles.photoArea}>
                    <Text style={globalStyle.inputLabel}>{i18n.t('photo')}</Text>
                  </View>
                  <Text style={globalStyle.inputLabel}>{i18n.t('descriptionText')}</Text>
                </View>
                <FlatList
                  data={this.state.portfolio}
                  keyExtractor={(name, pIndex) => `image-${name}-${pIndex}`}
                  testID="portfolioFlatlist"
                  renderItem={({ item, index }) => {
                    return (
                      <View style={[styles.row, styles.mt8,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <View>
                          <Image
                            source={{ uri: item.uri }}
                            style={styles.portfolio}
                          />
                          <TouchableOpacity
                            style={[styles.portfolioDeleteIconWrapper,{right:ManageDynamicMargin(i18n.language,undefined,Scale(6)),left:ManageDynamicMargin(i18n.language,Scale(6),undefined)}]}
                            onPress={() => this.deletePortfolioItem(index)}
                            testID={`deleteButton${index}`}
                          >
                            <Image
                              source={deleteIcon}
                              style={styles.portfolioDeleteIcon}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={[styles.inputFlexWrap,{paddingLeft:ManageDynamicMargin(i18n.language,undefined,Scale(12)),paddingRight:ManageDynamicMargin(i18n.language,Scale(12),undefined)}]}>
                          <CustomTextInput
                            testID={`port-desc-${index}`}
                            style={[styles.inputContainer, { textAlign: TextAlignManage(i18n.language)}]}
                            multiline
                            value={item.description}
                            textAlignVertical={"top"}
                            onChangeText={(text) =>
                              this.updatePortfolioDesc(text, index)
                            }
                          />
                        </View>
                      </View>
                    )
                  }}
                />
                <CustomButton
                  title={i18n.t('deleteAll')}
                  testID="deletePortfolio"
                  onPress={this.deleteAllPortfolio}
                  style={styles.deleteAllButton}
                  textStyle={styles.deleteText}
                />
              </View>
            ) : null}
          </ScrollView>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={() => this.uploadPortfolioApi()}
            testID="UploadPortfolioApi"
          >
            <View style={styles.uploadContainer}>
              <Text style={styles.uploadPortfolioTxt}>
                {i18n.t('uploadPortfolio')}
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }

  editPortfolio = () => {
    return (
      <View style={{ marginLeft: Scale(10), marginRight: Scale(10), flex: 1 }}>
        <View style={[styles.checkBoxContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <Text style={styles.selectedProductTxt}>{i18n.t('selectAllImages')}</Text>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={() => { this.checkBoxValueChange()}}
            boxType='square'
            style={{ height: 20, width: 20, }}
            tintColor="#FFFFFF"
            onCheckColor="#FFFFFF"
            onFillColor="#CCBEB1"
            onTintColor="#FFFFFF"
            animationDuration={0}
            tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
            testID="CheckBoxValues"
          />
        </View>
        <View style={{ marginTop: verticalScale(10), flex: 1 }}>
          {this.state.loader ? (
            <ActivityIndicator size="large" animating style={{ alignSelf: "center" }} />
          ) : (
            this.listView()
          )}
        </View>
        {this.state.photoData.length > 0 || this.state.photoData !== undefined ?
          <TouchableOpacity
            style={[
              styles.deleteAllContainer,
              {
                borderColor: this.state.checked ? "#F87171" : "#CBD5E1",
                backgroundColor: this.state.checked ? "#F87171" : "#CBD5E1",
              }
            ]}
            disabled={!this.state.checked}
            onPress={() => { this.deleteAllEditPortfolio() }}
            testID="DeleteAllEditPortfolio"
          >
            <View
              style={[
                styles.deleteAllContainer,
                {
                  borderColor: this.state.checked ? "#F87171" : "#CBD5E1",
                  backgroundColor: this.state.checked ? "#F87171" : "#CBD5E1",
                }
              ]}
            >
              <Text style={styles.deleteAllTxt}>
                {i18n.t('deleteAll')}
              </Text>
            </View>
          </TouchableOpacity>
          : null}
      </View>
    )
  }
  renderEditImages = (item: any) => {
    return (
      <View style={{ height : windowWidth * 0.3, width : windowWidth * 0.3}}>
        <TouchableOpacity  onPress={() => { this.onEditImageClick(item) }} onLongPress={()=> this.checkBoxItemChange(item) } testID="onEditImagePress">
          <Image source={{ uri: item?.url }} style={{ height: windowWidth * 0.3, width: windowWidth * 0.3}} />
        </TouchableOpacity>
        {
          this.state.checked  &&
          (
            <View style={styles.checkBoxListContainer}>
              <CheckBox
                value={item.isSelected}
                onValueChange={()=> this.checkBoxItemChange(item)}
                boxType='square'
                style={{ height: 20, width: 20, }}
                tintColor="#FFFFFF"
                onCheckColor="#FFFFFF"
                onFillColor="#CCBEB1"
                onTintColor="#FFFFFF"
                animationDuration={0}
                tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
              />
            </View>
          )
        }
      </View>
    )
  }
  listView = () => {
    return (
      this.state.errorMessage ?
        <Text style={styles.noDataFound}>{i18n.t('no_data_found')}!</Text>
        :
        <FlatList
          data={this.state.photoData}
          renderItem={({ item }) => this.renderEditImages(item)}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          testID="renderEditImage"
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
        />
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container} testID="PhotoLibraryView">
        <KeyboardAvoidingView
          style={styles.container}
          behavior={this.isPlatformiOS() ? "padding" : undefined}>
          <CustomHeader
            title={i18n.t('portfolioText')}
            leftTestId="backBtn"
            onLeftPress={() => this.backBtnClick()}
          />
          {this.state.loading && <CustomLoader />}
          <View style={styles.headerView}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.shiftEditPortfolio()}
              testID="EditPortfolio">
              <View style={[
                styles.editPortfolio, {
                  borderColor: this.state.profileShift === true ? "#CBD5E1" : "#375280"
                }
              ]}
              >
                <Text style={[styles.editTxt,
                {
                  color: this.state.profileShift === true ? "#94A3B8" : "#375280"
                }
                ]}
                >
                  {i18n.t('editPortfolio')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.shiftUploadPortfolio()}
              testID="UploadPortfolio">
              <View style={[
                styles.uploadPortfolio, {
                  borderColor: this.state.profileShift === true ? "#375280" : "#CBD5E1"
                }
              ]}
              >
                <Text style={[styles.uploadTxt,
                {
                  color: this.state.profileShift === true ? "#375280" : "#94A3B8"
                }
                ]}
                >
                  {i18n.t('uploadPortfolioSwitch')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            this.state.profileShift ?
              this.uploadPortfolio()
              :
              this.editPortfolio()
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.mediaModal}>
            <View style={styles.portfolioMediaModalMainView}>
              <SafeAreaView style={styles.portfolioMediaModalFlexManage}></SafeAreaView>
              <View style={styles.portfolioCameraModalMainViewDriver}>
                <View style={styles.portfolioMediaModalAfterView}>
                  <TouchableOpacity
                    style={styles.portfolioCameraModalTouchDriver}
                    onPress={() => { this.capturePhoto() }}
                    testID="CapturePhoto"
                  >
                    <View style={styles.portfolioCameraModalViewDriver}>
                      <Text style={styles.portfolioCameraModalTextDriver}>{i18n.t('cameraText')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.portfolioCameraModalTouchDriver, { marginTop: 10 }]}
                    onPress={() => { this.choosePhoto() }}
                    testID="ChoosePhoto"
                  >
                    <View style={styles.portfolioCameraModalViewDriver}>
                      <Text style={styles.portfolioCameraModalTextDriver}>{i18n.t('galleryText')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.portfolioCameraModalCancelViewDriver}>
                  <TouchableOpacity
                    onPress={() => { this.closePickerModal() }}
                    style={styles.portfolioCameraModalCancelTouchDriver}
                    testID="CloseModal">
                    <Text style={styles.portfolioCameraModalCancelTextDriver}>{i18n.t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
    // Customizable Area End
    // Merge Engine - render - End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editPortfolio: {
    borderBottomWidth: 1.5,
  },
  uploadPortfolio: {
    borderBottomWidth: 1.5,
  },
  editTxt: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    lineHeight: 24,
    fontWeight: '900',
    color: "#94A3B8",
    marginVertical: verticalScale(10),
    textAlign: "center"
  },
  uploadTxt: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    lineHeight: 24,
    fontWeight: '900',
    color: "#375280",
    marginVertical: verticalScale(10),
    textAlign: "center"
  },
  portfolioMediaModalMainView: {
    flex: 1,
    backgroundColor: '#00000030',
    alignItems: 'center'
  },
  portfolioMediaModalAfterView: {
    alignSelf: 'center',
    width: '100%'
  },
  portfolioMediaModalFlexManage: {
    flex: 0
  },
  portfolioCameraModalTouchDriver: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioCameraModalViewDriver: {
    width: '94%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: windowWidth * 3.5 / 100
  },
  portfolioCameraModalTextDriver: {
    textAlign: 'center',
    fontSize: windowWidth * 4 / 100,
    color: '#000000'
  },
  portfolioCameraModalCancelViewDriver: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#0061A7',
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  portfolioCameraModalCancelTouchDriver: {
    alignSelf: 'center',
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth * 3.5 / 100
  },
  portfolioCameraModalCancelTextDriver: {
    fontSize: windowWidth * 4 / 100,
    color: '#FFFFFF'
  },
  portfolioCameraModalMainViewDriver: {
    position: 'absolute',
    bottom: windowHeight * 3 / 100,
    width: windowWidth
  },
  emptyImagePortfolioContainer: {
    borderRadius: 2,
    backgroundColor:'#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    width: Scale(380),
    height: Scale(185),
    marginTop: 20
  },
  photoDesc: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
  },
  uploadPhoto:{
    fontFamily: "Lato-Regular",
    fontSize: Scale(17),
    fontWeight: "600",
    color: "#375280",
    marginBottom:7
  },
  uploadPhotoDes:{
    fontFamily: "Lato-Regular",
    fontSize: Scale(15),
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom:5
  },
  input: {
    marginTop: verticalScale(7),
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#F8F8F8",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    fontSize: 14,
    fontFamily: "Lato-Medium",
    fontWeight: "500",
    color: "#94A3B8",
  },
  inputSingleContainer: {
    fontSize: 18,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#375280"
  },
  orTxt: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "400",
    color: "#375280",
    marginTop: verticalScale(15),
    textAlign: "center",
    textTransform:'capitalize'
  },
  checkBoxContainer: {
    marginTop: verticalScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Scale(9)
  },
  selectedProductTxt: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "500",
    color: "#375280",
  },
  checkBoxListContainer: {
    alignItems: "flex-end",
    position: "absolute",
    top: 20,
    bottom: 0,
    left: 0,
    zIndex:999,
    right: 5
  },
  deleteAllContainer: {
    borderWidth: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  deleteAllTxt: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(20),
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center"
  },
  mt8: { marginTop: Scale(8) },
  listWrap: {
    padding: Scale(8),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#E2E8F0",
  },
  photoArea: {
    width: Scale(108),
  },
  portfolio: {
    width: Scale(96),
    height: Scale(96),
  },
  inputFlexWrap: {
    flex: 1,
    paddingLeft: Scale(12),
  },
  deleteAllButton: {
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#F87171",
    fontWeight: "500",
    color: "#375280",
    marginTop: Scale(12),
    marginBottom: Scale(4),
  },
  deleteText: {
    color: "#F87171",
  },
  error: {
    borderWidth: Scale(2),
    borderColor: "#F87171",
  },
  noError: {
    borderWidth: Scale(2),
    borderColor: "#F8F8F8",
  },
  multiplePhotos: {
    height:responsiveHeight(5),
    width:responsiveHeight(5),
    marginBottom:15,
    resizeMode: "cover",
  },
  multiplePhotos1: {
    height: 185,
    width: 380,
    marginBottom: 15,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  portfolioDeleteIconWrapper: {
    position: "absolute",
    top: Scale(8),
    right: Scale(6),
    height: Scale(22),
    width: Scale(22),
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  portfolioDeleteIcon: {
    height: Scale(14),
    width: Scale(14),
  },
  noDataFound: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#375280",
    alignSelf: "center",
    textTransform:'capitalize'
  },
  uploadContainer: {
    borderColor: "#CCBEB1",
    backgroundColor: "#CCBEB1",
    borderWidth: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  uploadPortfolioTxt: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(20),
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center"
  }
});
// Customizable Area End
