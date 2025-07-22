import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  VirtualizedList,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomTextInput from "../../../components/src/CustomTextInput";
import CustomLoader from "../../../components/src/CustomLoader";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import Scale from "../../../components/src/Scale";
import globalStyle from "../../../components/src/GlobalStyle";

import {
  profileSetup,
  contactAndPayment,
  portfolio,
  uploadProfilePhoto,
  arrowRight,
  gpsIcon,
  uploadMultiplePhotos,
  deleteIcon,
  profileSetupArab,
  contactAndPaymentArab,
  portfolioArab,
  arabUpload,
  uploadMultiplePhotosArab,
} from "./assets";
const { width, height } = Dimensions.get("window");
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
// Customizable Area End

import StylistCreateProfileController, {
  Props,
  configJSON,
} from "./StylistCreateProfileController";
import i18n from "../../../components/src/i18n/i18n.config";

export default class StylistCreateProfile extends StylistCreateProfileController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  RenderTopImage = ({ step }: { step: number }) => {
    let images
    if(i18n.language=="en")
      {
         images = [profileSetup, contactAndPayment, portfolio];
      }
      else{
        images = [profileSetupArab, contactAndPaymentArab, portfolioArab];
      }
    return (
      <View style={styles.imgWrap}>
        <Image
          source={images[step]}
          resizeMode="contain"
          style={styles.stepImage}
        />
      </View>
    );
  };

  renderDropDownIcon = (visible?: boolean) => {
    return <Image source={arrowRight} style={styles.dropdownIcon} />;
  };

  renderStepOne = ({ step }: { step: number }) => {
    if (step === 0) {
      return (
        <View style={styles.mb12} testID="step1">
         <Text style={globalStyle.inputLabel}>{i18n.t('profilePicture')}</Text>
          <View style={styles.pfpWrapper}>
            {this.state.profilePhoto.uri ? (
              <View testID="profilePicture">
                <Image
                  source={{ uri: this.state.profilePhoto.uri }}
                  style={styles.pfpWrapper}
                />
                <View style={styles.btnWrapper}>
                  <CustomButton
                    title={i18n.t("ReplaceImage_")}
                    onPress={this.openModal}
                    testID="replaceImage"
                    style={styles.replaceButton}
                    textStyle={styles.replaceImageText}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.pfpDeleteIconWrapper,{right:ManageDynamicMargin(i18n.language,undefined,Scale(12)),left:ManageDynamicMargin(i18n.language,Scale(12),undefined)}]}
                  onPress={this.removePfp}
                  testID="removePfp"
                >
                  <Image source={deleteIcon} style={styles.pfpDeleteIcon} />
                </TouchableOpacity>
              </View>
            ) : (
              <Pressable onPress={this.openModal} testID="selectPfp">
                <Image
                 source={i18n.language=="en"?  uploadProfilePhoto:arabUpload}
                  style={styles.pfpWrapper}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </View>

          <View style={styles.storeDesMainView}>
            <Text style={[globalStyle.inputLabel,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("ProfileBio*")}</Text>
            <TextInput
                testID={"profileBio"}
                onChangeText={(txt) => {
                    this.setState({ profileBio: txt,error: "" });
                }}
                keyboardType="default"
                maxLength={250}
                returnKeyLabel="done"
                returnKeyType="done"
                multiline={true}
                textAlignVertical={"top"}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
                style={[{
                    textAlign:TextAlignManage(i18n.language)},styles.storeDescriptionInput]}
                value={this.state.profileBio}
            />
            {
                this.state.errorKey === "profileBio" &&
                <View style={globalStyle.errContainer}>
                <Text style={[{textAlign:TextAlignManage(i18n.language)},globalStyle.errorText]}>{this.state.error}</Text>
                </View>
            }
        </View>
          <View style={styles.manageMargin}>
            <CustomTextInput
              testID="areaOfExpertise"
              label={i18n.t("AreaofExpertise*")}
              language={i18n.language}
              value={this.state.areaOfExpertise}
              onChangeText={this.onAreaOfExperiseChange}
              hasError={this.state.errorKey === "areaOfExpertise"}
              errorString={this.state.error}
              multiline
            />
          </View>
          <CustomTextInput
            testID="yoe"
            label={i18n.t("YearsofExperience*")}
            placeholder="0 Years"
            value={this.state.yoe}
            onChangeText={this.onYoeChange}
            keyboardType="numeric"
            hasError={this.state.errorKey === "yoe"}
            errorString={this.state.error}
            language={i18n.language}
          />
          <CustomTextInput
            testID="insta"
            label={i18n.t("Social_Media_Links")}
            placeholder="www.instagram.com"
            value={this.state.instagram}
            onChangeText={this.onInstaChange}
            language={i18n.language}
          />
          <CustomTextInput
            testID="facebook"
            placeholder="www.facebook.com"
            value={this.state.facebook}
            onChangeText={this.onFbChange}
            language={i18n.language}
          />
          <CustomTextInput
            testID="tiktok"
            placeholder="www.tiktok.com"
            value={this.state.tiktok}
            onChangeText={this.onTiktokChange}
            language={i18n.language}
          />
          <CustomTextInput
            testID="pinterest"
            placeholder="www.pinterest.com"
            value={this.state.pinterest}
            onChangeText={this.onPinterestChange}
            language={i18n.language}
          />
          <View style={globalStyle.inputWrapper}>
          <Text style={[globalStyle.inputLabel,{textAlign:this.returnAlignment()}]}>{i18n.t("Preferred_Language*")}</Text>
            <Dropdown
              data={this.languages}
              testID="selectLanguage"
              valueField={"value"}
              labelField={"display"}
              onChange={this.onLanguageChange}
              value={this.state.language}
              maxHeight={200}
              style={[styles.dropdown]}
              placeholder={i18n.t('selectLanguageText')}
              placeholderStyle={[styles.dropDownText, styles.dropdownSelected,{textAlign:this.returnAlignment()}]}
              dropdownPosition="top"
              selectedTextStyle={[styles.dropDownText,{textAlign:this.returnAlignment()}]}
              itemTextStyle={[styles.dropDownText]}
              renderRightIcon={this.state.selectedlanguage=="en"? this.renderDropDownIcon:()=><View></View>}
              renderLeftIcon={this.state.selectedlanguage=="ar"? this.renderDropDownIcon:()=><View></View>}
            />
            {this.state.errorKey === "language" ? (
              <View style={globalStyle.errContainer}>
                <Text testID="errorText" style={globalStyle.errorText}>
                  {this.state.error}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      );
    }
    return null;
  };

  renderStepTwo = ({ step }: { step: number }) => {
    if (step === 1) {
      return (
        <View testID="step2">
          <View style={globalStyle.inputWrapper}>
            <Text style={[globalStyle.inputLabel,{textAlign:this.returnAlignment()}]}>{i18n.t ("Address*")}</Text>
            <View style={{width:'100%',flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between'}}>
              <TextInput
                testID="address"
                value={this.state.address}
                onChangeText={this.onAddressChange}
                placeholderTextColor={"#385380"}
                style={[globalStyle.textInput, styles.gpsInput,{textAlign:this.returnAlignment(),width:'100%',paddingLeft:this.returnPaddingForAddress()}]}
              />
              <TouchableOpacity
                testID="btnRedirectGps"
                style={styles.gpsTouch}
                onPress={this.btnRedirectGps}
              >
                <Image source={gpsIcon} style={styles.gpsIcon}></Image>
              </TouchableOpacity>
            </View>
            {this.state.errorKey === "address" ? (
              <View style={globalStyle.errContainer}>
                <Text testID="errorText" style={globalStyle.errorText}>
                  {this.state.error}
                </Text>
              </View>
            ) : null}
          </View>
          <CustomTextInput
            label={i18n.t("Area")}
            testID="area"
            value={this.state.area}
            onChangeText={this.onAreaChange}
            language={i18n.language}
          />
          <CustomTextInput
          label={i18n.t("Block")}
            testID="block"
            value={this.state.block}
            onChangeText={this.onBlockChange}
            language={i18n.language}
          />
          <CustomTextInput
          label={i18n.t("Mall_Name_(Optional)")}
            testID="mallName"
            value={this.state.mallName}
            onChangeText={this.onMallChange}
            language={i18n.language}
          />
          <CustomTextInput
            label={i18n.t("Floor_(Optional)")}
            testID="floor"
            value={this.state.floor}
            onChangeText={this.onFloorChange}
            language={i18n.language}
          />
          <CustomTextInput
           label={i18n.t("Unit_Number_(Optional)")}
            testID="unitNumber"
            value={this.state.unitNumber}
            onChangeText={this.onUnitChange}
            language={i18n.language}
          />
          <CustomTextInput
           label={i18n.t("City")}
            testID="city"
            value={this.state.city}
            onChangeText={this.onCityChange}
            language={i18n.language}
          />
          <CustomTextInput
           label={i18n.t("Zip_Code")}
            testID="zip"
            value={this.state.zip}
            onChangeText={this.onZipChange}
            language={i18n.language}
          />
          <View style={styles.mt8}>
            <Text style={[globalStyle.inputLabel,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("Contact_Number")}*</Text>
          </View>
          <MobileWithCountryCodesInput
            optionsList={this.state.countries}
            inputValue={this.state.phoneNumber}
            onSelect={this.onCountrySelect}
            onValueChange={this.onPhoneChange}
            open={this.state.isCountryOpen}
            toggleOpen={this.toggleCountry}
            selectedIndex={this.state.selectedCountryCodeIndex}
            inputTestId="mobilePhone"
          />
          <View style={[styles.mt8, styles.mb12]}>
            <Text style={[globalStyle.inputLabel, styles.f18,{textAlign:this.returnAlignment()}]}>
            {i18n.t ("Bank_Account")}
            </Text>
          </View>
          <CustomTextInput
            label={i18n.t("Account_Name*")}
            testID="accName"
            value={this.state.accName}
            onChangeText={this.onAccountNameChange}
            hasError={this.state.errorKey === "accName"}
            errorString={this.state.error}
            language={i18n.language}
          />
          <CustomTextInput
            label={i18n.t("IBAN_Number*")+'*'}
            testID="iban"
            value={this.state.iban}
            onChangeText={this.onIbanChange}
            hasError={this.state.errorKey === "iban"}
            errorString={this.state.error}
            language={i18n.language}
          />
          <CustomTextInput
            label={i18n.t("Account_Number*")}
            testID="accNumber"
            value={this.state.accNumber}
            onChangeText={this.onAccountNumberChange}
            hasError={this.state.errorKey === "accNumber"}
            errorString={this.state.error}
            language={i18n.language}
          />
        </View>
      );
    }
    return null;
  };

  renderStepThree = ({ step }: { step: number }) => {
    if (step === 2) {
      return (
        <View testID="step3">
          <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={[globalStyle.inputLabel, styles.f18]}>
             {i18n.t("uploadPortfolio")}
            </Text>
            <Text
              style={[globalStyle.inputLabel, styles.skip]}
              onPress={this.skipPortfolio}
            >
               {i18n.t ("Skip_")}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.mt8,
              this.state.errorKey === "portfolio"
                ? styles.error
                : styles.noError,
            ]}
            testID="uploadMultiplePhotos"
            onPress={this.openMultiModal}
          >
            <Image
              source={ i18n.language=="en" ? uploadMultiplePhotos:uploadMultiplePhotosArab}
              style={styles.multiplePhotos}
            />
          </TouchableOpacity>
          {this.state.errorKey === "portfolio" ? (
            <View style={globalStyle.errContainer}>
              <Text testID="errorText" style={globalStyle.errorText}>
                {this.state.error}
              </Text>
            </View>
          ) : null}
          {this.state.portfolio.length ? (
            <View style={[styles.listWrap, styles.mt8]} testID="portfolioBlock">
              <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
                <View style={styles.photoArea}>
                  <Text style={globalStyle.inputLabel}>{i18n.t('photos')}</Text>
                </View>
                <Text style={globalStyle.inputLabel}>{i18n.t('descriptionText')}</Text>
              </View>
              <VirtualizedList
                data={this.state.portfolio}
                getItemCount={this.getPortfolioCount}
                getItem={this.getPortfolio}
                keyExtractor={({ name }, pIndex) => `image-${name}-${pIndex}`}
                renderItem={({ item, index }) => (
                  <View style={[styles.row, styles.mt8,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <View>
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.portfolio}
                      />
                      <TouchableOpacity
                        style={[styles.portfolioDeleteIconWrapper,{right:ManageDynamicMargin(i18n.language,undefined,Scale(6)),left:ManageDynamicMargin(i18n.language,Scale(6),undefined)}]}
                        onPress={() => this.deletePortfolioItem(index)}
                        testID="removePortfolio"
                      >
                        <Image
                          source={deleteIcon}
                          style={styles.portfolioDeleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.inputFlexWrap,{marginLeft:ManageDynamicMargin(i18n.language,Scale(15),undefined),paddingRight:ManageDynamicMargin(i18n.language,undefined,Scale(12))}]}>
                      <CustomTextInput
                        testID={`port-desc-${index}`}
                        style={styles.input}
                        multiline
                        value={item.description}
                        textAlignVertical={"top"}
                        language={i18n.language}
                        onChangeText={(text) =>
                          this.updatePortfolioDesc(text, index)
                        }
                      />
                    </View>
                  </View>
                )}
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
        </View>
      );
    }
    return null;
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylistcreateprofile">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <CustomHeader
            title={i18n.t("CreateProfile_")}
            onLeftPress={this.goBackStep}
          />
          <this.RenderTopImage step={this.state.step} />
          <ScrollView
            ref={this.scrollRef}
            style={styles.main}
            keyboardShouldPersistTaps="never"
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:width*10/100}}
          >
            <this.renderStepOne step={this.state.step} />
            <this.renderStepTwo step={this.state.step} />
            <this.renderStepThree step={this.state.step} />
          </ScrollView>
          <View style={[styles.btnRow,{flexDirection:FlexConditionManage(i18n.language)}]}>
            {this.state.step !== 2 ? (
              <CustomButton
                testID="goBack"
                title={i18n.t("Back")}
                style={styles.backBtn}
                textStyle={styles.rejText}
                onPress={this.goBackStep}
              />
            ) : null}
            <CustomButton
              testID="nextBtn"
              title={this.state.step !== 2 ? i18n.t("Next")  :  i18n.t("Create_and_Verify") }
              style={styles.nextButton}
              onPress={this.next}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.mediaModal}
            onDismiss={this.closeModal}
          >
            <View style={styles.modalMainView}>
              <SafeAreaView style={styles.modalSafe}></SafeAreaView>
              <View style={styles.cameraModalMainViewAdd}>
                <View style={styles.modalSecondView}>
                  <TouchableOpacity
                    testID={"btn_camera"}
                    style={styles.cameraModalTouchAdd}
                    activeOpacity={0.9}
                    onPress={this.capturePhoto}
                  >
                    <View style={styles.cameraModalViewAdd}>
                      <Text style={styles.cameraModalTextAdd}>{i18n.t('cameraText')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    testID={"btn_gallery"}
                    style={[styles.cameraModalTouchAdd, { marginTop: 10 }]}
                    onPress={this.choosePhoto}
                  >
                    <View style={styles.cameraModalViewAdd}>
                      <Text style={styles.cameraModalTextAdd}>{i18n.t('galleryText')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.cameraModalCancelViewAdd}>
                  <TouchableOpacity
                    testID={"btn_cancelMedia"}
                    onPress={this.closeModal}
                    style={styles.cameraModalCancelTouch}
                  >
                    <Text style={styles.cameraModalCancelTextAdd}>{i18n.t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {this.state.loading && <CustomLoader />}
        </KeyboardAvoidingView>
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
  imgWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Scale(20),
  },
  main: {
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
  },
  stepImage: {
    height: Scale(60),
    width: "100%",
  },
  pfpWrapper: {
    height: width - Scale(40),
    width: width - Scale(40),
    backgroundColor: "#F8F8F8",
  },
  multiplePhotos: {
    height: (width - Scale(40)) * (185 / 380),
    width: width - Scale(44),
    backgroundColor: "#F8F8F8",
    resizeMode: "cover",
  },
  cameraModalTouchAdd: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardPadding: { flex: 1 },
  cameraModalViewAdd: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: (width * 3.5) / 100,
  },
  cameraModalTextAdd: {
    textAlign: "center",
    fontSize: (width * 4) / 100,
    color: "#000000",
  },
  cameraModalCancelViewAdd: {
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#0061A7",
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraModalCancelTouch: {
    alignSelf: "center",
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: (width * 3.5) / 100,
  },
  cameraModalCancelTextAdd: {
    fontSize: (width * 4) / 100,
    color: "#FFFFFF",
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000030",
    alignItems: "center",
  },
  cameraModalMainViewAdd: {
    position: "absolute",
    bottom: (height * 3) / 100,
    width: width,
  },
  modalSecondView: {
    alignSelf: "center",
    width: "100%",
  },
  modalSafe: {
    flex: 0,
  },
  btnWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: Scale(12),
    width: "100%",
  },
  replaceButton: {
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    fontWeight: "500",
  },
  replaceImageText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropdown: {
    height: Scale(48),
    backgroundColor: "#f8f8f8",
    marginVertical: Scale(8),
    paddingHorizontal: Scale(4),
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
  },
  nextButton: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  rejText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropDownText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 15,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropdownSelected: {
    fontWeight: "700",
  },
  dropdownIcon: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(16),
    transform: [{ rotate: "90deg" }],
  },
  dropdownVisibleIcon: {
    transform: [{ rotate: "270deg" }],
  },
  gpsTouch: {
    right: Scale(12),
    top: Scale(12),
    position: "absolute",
  },
  gpsIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  shadow: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: Scale(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  mb12: { marginBottom: Scale(12) },
  mt8: { marginTop: Scale(8) },
  cardBox: {
    height: Scale(60),
    paddingHorizontal: Scale(16),
    marginVertical: Scale(10),
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: Scale(2),
  },
  ccn: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    color: "#375280",
  },
  ccbrand: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(12),
  },
  f18: {
    fontSize: 18,
  },
  sb: {
    justifyContent: "space-between",
  },
  skip: {
    textDecorationLine: "underline",
  },
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
    paddingLeft: Scale(12),
    width:width*62/100,
    height: Scale(96),
  },
  input: {
    flex: 1,
    height: Scale(96),
    marginTop: -Scale(8),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#E2E8F0"
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
  pfpDeleteIconWrapper: {
    position: "absolute",
    top: Scale(16),
    right: Scale(12),
    height: Scale(40),
    width: Scale(40),
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pfpDeleteIcon: {
    height: Scale(24),
    width: Scale(24),
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
  error: {
    borderWidth: Scale(2),
    borderColor: "#F87171",
  },
  noError: {
    borderWidth: Scale(2),
    borderColor: "#F8F8F8",
  },
  gpsInput: {
    paddingRight: Scale(40),
  },
  storeDesMainView:{
    marginTop:width*5/100,
  },
  storeDescriptionInput:{
    width: (width * 90) / 100,
    height: (height * 15) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  manageMargin:{
    marginTop:width*1/100
  }
});
// Customizable Area End
