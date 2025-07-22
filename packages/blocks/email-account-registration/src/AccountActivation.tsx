import React from "react";

// Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Keyboard,
  Modal

} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, firstactivate, secondactivate, thirdactivate, gpsIcon, upload, deleteBtn } from "./assets";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

import AccountActivationController, {
  Props,
} from "./AccountActivationController";
import Scale from "../../../components/src/Scale";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
import {rightArrow} from "./../../email-account-login/src/assets"
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";

// Customizable Area End

export default class AccountActivation extends AccountActivationController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start


  renderOwnerAddress = () => {
    return (<>
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("FullAddress")}</Text>
        <View style={[styles.addressView, {
          borderColor: !this.isEmpty(this.state.ownerFullAddressError) ? "#F87171" : "#F8F8F8",flexDirection:FlexConditionManage(i18n.language)
        }]}>
          <TextInput
            testID={"ownerAddress"}
            onChangeText={this.handleOnChangeTheAdress}
            keyboardType="default"
            returnKeyLabel="done"
            returnKeyType="done"
            editable={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder={i18n.t("EnterFullAddress")}
            placeholderTextColor="#375280"
            autoFocus={true}
            style={[styles.addressTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            value={this.state.ownerFullAddress}
          />
          <TouchableOpacity testID="btnRedirectGps" style={styles.gpsTouch} onPress={() => { this.btnRedirectGps("own") }}>
            <Image source={gpsIcon} style={styles.gpsIcon}></Image>
          </TouchableOpacity>
        </View>
        {!this.isEmpty(this.state.ownerFullAddressError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.ownerFullAddressError}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("ZipCode")} </Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor:  "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="ownerzipcode"
            placeholder={i18n.t("EnterZipCode")}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            placeholderTextColor="#375280"
            maxLength={50}
            value={this.state.ownerZipCode}
            onChangeText={this.updateOwnerZipCode}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </View>
       
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}> {i18n.t("ContactNumber")}</Text>
        <MobileWithCountryCodesInput
          testID="ownerMobileInput"
          optionsList={this.state.countryList}
          selectedIndex={this.state.selectedCodeIndex}
          onSelect={(index, { numeric_code }) =>
            this.handleSelectOwnerCountryCode(index, { numeric_code })
          }
          inputValue={this.state.ownerContactNumber}
          placeHolderInput={i18n.t("Enter_contactNumber")}
          placeHolderInputColor='#9A9A9A'
          onValueChange={changTxt =>
            this.updateTheOwnerPhoneNumb(changTxt)
          }
          open={this.state.dropdownOpen}
          toggleOpen={currentState => this.updateOwnnertoggleDropDown(currentState)}
          hasError={!this.isEmpty(this.state.ownerContactNumberError)}
        />
        {!this.isEmpty(this.state.ownerContactNumberError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.ownerContactNumberError}</Text>}
      </View>
    </>)
  }


  renderCompanyAddress = () => {
    return (<>
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("FullAddress")}</Text>
        <View style={[styles.addressView, {
          borderColor: !this.isEmpty(this.state.companyFullAddressError) ? "#F87171" : "#F8F8F8",flexDirection:FlexConditionManage(i18n.language)
        }]}>
          <TextInput
            testID={"companyAddress"}
            onChangeText={this.handleOnChangeTheCompanyAdress}
            keyboardType="default"
            returnKeyLabel="done"
            returnKeyType="done"
            editable={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            placeholder={i18n.t("EnterCompanyAddress")}
            placeholderTextColor="#375280"
            autoFocus={true}
            style={[styles.addressTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            value={this.state.companyFullAddress}
          />
          <TouchableOpacity testID="btnRedirectGps" style={styles.gpsTouch} onPress={() => { this.btnRedirectGps("company") }}>
            <Image source={gpsIcon} style={styles.gpsIcon}></Image>
          </TouchableOpacity>
        </View>
        {!this.isEmpty(this.state.companyFullAddressError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.companyFullAddressError}</Text>}
      </View>
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("ZipCode")}  </Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="companyZipCode"
            placeholder={i18n.t("EnterCompanyZipCode")}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            placeholderTextColor="#375280"
            maxLength={50}
            value={this.state.companyZipCode}
            onChangeText={this.updateCompanyZipCode}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="numeric"
          />
        </View>
        
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("ContactNumber")}</Text>
        <MobileWithCountryCodesInput
        testID="companyMobileNumber"
          optionsList={this.state.countryList}
          selectedIndex={this.state.companySelectedCodeIndex}
          onSelect={(index, { numeric_code }) =>
            this.handleSelectCompanyCountryCode(index, { numeric_code })
          }
          inputValue={this.state.companyPhoneNum}
          placeHolderInput="Enter your company contact number"
          placeHolderInputColor='#9A9A9A'
          onValueChange={changTxt =>
            this.updateTheCompanyPhoneNumb(changTxt)
          }
          open={this.state.companyPnDropDown}
          toggleOpen={currentState => this.updateCompanytoggleDropDown(currentState)}
          hasError={!this.isEmpty(this.state.companyPhoneNumberError)}
        />
        {!this.isEmpty(this.state.companyPhoneNumberError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.companyPhoneNumberError}</Text>}
      </View>
    </>)
  }

  renderFirstPage = () => {
    return (
      <>

        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('bankName')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.fullNameErrorMsg) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputFullName"
              placeholder={i18n.t("EnterBankName")}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={50}
              value={this.state.fullName}
              onChangeText={this.updateOnChangeFullNametxt}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          {!this.isEmpty(this.state.fullNameErrorMsg) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.fullNameErrorMsg}</Text>}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.nameText}>{i18n.t('bankEmail')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.emailErrorMsg) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputEmail"
              placeholder={i18n.t('EnterBankEmail')}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={40}
              value={this.state.emailAddress}
              onChangeText={this.handleEmailChange}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          {!this.isEmpty(this.state.emailErrorMsg) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.emailErrorMsg}</Text>}
        </View>
        {this.state.userRole!=="1" &&
        <View style={styles.fieldContainer}>
          <Text style={styles.nameText}>{i18n.t("SocialMediaAccount")}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.socialMediaAccountError) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputFirstSocial"
              placeholder={i18n.t("EnterSocialMediaAccount")}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={40}
              value={this.state.firstSocialMediaAccount}
              onChangeText={this.updateFirstSocialMediaAccount}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>

          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.socialMediaAccountError) ? "#F87171" : "#F8F8F8", marginVertical: 10 },
            ]}
          >
            <TextInput
              testID="inputSecondSocial"
              placeholder={i18n.t("EnterSocialMediaAccount")}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={40}
              value={this.state.secondSocialMediaAccount}
              onChangeText={this.updateSecondSocialMediaAccount}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>

          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.socialMediaAccountError) ? "#F87171" : "#F8F8F8", marginBottom: 10 },
            ]}
          >
            <TextInput
              testID="inputThirdSocial"
              placeholder={i18n.t("EnterSocialMediaAccount")}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={40}
              value={this.state.thirdSocialMediaAccount}
              onChangeText={this.updateThirdSocialMediaAccount}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>

          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.socialMediaAccountError) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputFourthSocial"
              placeholder={i18n.t("EnterSocialMediaAccount")}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={40}
              value={this.state.fourthSocialMediaAccount}
              onChangeText={this.updateFourthSocialMediaAccount}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          {!this.isEmpty(this.state.socialMediaAccountError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.socialMediaAccountError}</Text>}
        </View>}

        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('IBANNumber')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.ibanErrorMsg) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputIbanNum"
              placeholder={i18n.t('EnterIBANNumber')}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={30}
              value={this.state.ibanNumber}
              onChangeText={this.updateIbanNumber}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}

              autoCapitalize="characters"

            />
          </View>
          {!this.isEmpty(this.state.ibanErrorMsg) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.ibanErrorMsg}</Text>}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('BankAccountName')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.bankAccountNameErrorMsg) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputBankName"
              placeholder={i18n.t('EnterBankAccountName')}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={50}
              value={this.state.bankAccountName}
              onChangeText={this.updateAccountName}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="none"
              keyboardType="default"
            />
          </View>
          {!this.isEmpty(this.state.bankAccountNameErrorMsg) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.bankAccountNameErrorMsg}</Text>}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('BankAccountNumber')}</Text>
          <View
            style={[
              styles.inputViewContainer,
              { borderColor: !this.isEmpty(this.state.bankAccountNumberError) ? "#F87171" : "#F8F8F8" },
            ]}
          >
            <TextInput
              testID="inputBankAccNum"
              placeholder={i18n.t('EnterBankAccountNumber')}
              style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
              placeholderTextColor="#375280"
              maxLength={50}
              value={this.state.bankAccountNumber}
              onChangeText={this.updateAccountNumber}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              autoCapitalize="characters"
              keyboardType="default"
            />
          </View>
          {!this.isEmpty(this.state.bankAccountNumberError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.bankAccountNumberError}</Text>}
        </View>

      </>
    )
  }

  renderSecondPage = () => {
    return (<>
      <Text style={[styles.titleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("OwnerAddress")}</Text>
      {this.renderOwnerAddress()}
      <Text style={[styles.titleText, { paddingTop: 8 },{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("CompanyAddress")}</Text>
      {this.renderCompanyAddress()}
    </>)
  }

  renderThirdPage = () => {
    const { civilId, commercialLicense, authorizedSignatures, MoaOrAoa, BusinessAccountBank, civilIdError, commercialLicenseError, authorizedSignatureError, moaOrAoaError, businessBankAccountError, } = this.state
    return (<>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("CivilPassport")}</Text>
        <TouchableOpacity testID="civilidUploadBtn" onPress={() => this.updateTheModal("civilId")} style={styles.emptyImageContainer}>
          <Image style={styles.uploadImgIconView} source={upload} />
          <Text style={[styles.titleText]}>{i18n.t("imageType")}</Text>

        </TouchableOpacity>
        <Text style={[styles.bottomContainerText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("CivilPassportDescription")}</Text>
        {this.handleUploadImageAvailable(civilId) && <TouchableOpacity onPress={this.deleteTheCivilId} style={styles.uploadImageContainer}>
          <Image style={styles.uploadImageStyle} source={this.handleReturnTheImageAccordingToType(civilId.type)} />
          <Image style={styles.deleteButton} source={deleteBtn} />
          <Text numberOfLines={1} style={[styles.uploadImageTextStyle]}>{civilId.name}</Text>
        </TouchableOpacity>}

        {!this.isEmpty(civilIdError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{civilIdError}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("CommercialLicense")}</Text>
        <TouchableOpacity testID="commercialLicUploadBtn" style={styles.emptyImageContainer} onPress={() => this.updateTheModal("commercialLicense")}>
          <Image style={styles.uploadImgIconView} source={upload} />
          <Text style={styles.titleText}>{i18n.t("imageType")}</Text>

        </TouchableOpacity>
        {this.handleUploadImageAvailable(commercialLicense) && <TouchableOpacity onPress={this.deleteThecommercialLicense} style={styles.uploadImageContainer}>
          <Image style={styles.uploadImageStyle} source={this.handleReturnTheImageAccordingToType(commercialLicense.type)} />
          <Image style={styles.deleteButton} source={deleteBtn} />
          <Text numberOfLines={1} style={[styles.uploadImageTextStyle]}>{commercialLicense.name}</Text>
        </TouchableOpacity>}
        {!this.isEmpty(commercialLicenseError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{commercialLicenseError}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("AuthorizedSignatures")}</Text>
        <TouchableOpacity testID="authSignUploadBtn" onPress={() => this.updateTheModal("authorizedSignatures")} style={styles.emptyImageContainer}>
          <Image style={styles.uploadImgIconView} source={upload} />
          <Text style={styles.titleText}>{i18n.t("imageType")}</Text>

        </TouchableOpacity>
        {this.handleUploadImageAvailable(authorizedSignatures) && <TouchableOpacity onPress={this.deleteTheauthorizedSignatures} style={styles.uploadImageContainer}>
          <Image style={styles.uploadImageStyle} source={this.handleReturnTheImageAccordingToType(authorizedSignatures.type)} />
          <Image style={styles.deleteButton} source={deleteBtn} />
          <Text numberOfLines={1} style={styles.uploadImageTextStyle}>{authorizedSignatures.name}</Text>
        </TouchableOpacity>}
        {!this.isEmpty(authorizedSignatureError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{authorizedSignatureError}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("MOA")}</Text>
        <TouchableOpacity testID="moaUploadBtn" onPress={() => this.updateTheModal("MoaOrAoa")} style={styles.emptyImageContainer}>
          <Image style={styles.uploadImgIconView} source={upload} />
          <Text style={styles.titleText}>{i18n.t("imageType")}</Text>

        </TouchableOpacity>
        <Text style={[styles.bottomContainerText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("MOADescriiption")}</Text>
        {this.handleUploadImageAvailable(MoaOrAoa) && <TouchableOpacity onPress={this.deleteTheMoaOrAoa} style={styles.uploadImageContainer}>
          <Image style={styles.uploadImageStyle} source={this.handleReturnTheImageAccordingToType(MoaOrAoa.type)} />
          <Image style={styles.deleteButton} source={deleteBtn} />
          <Text numberOfLines={1} style={styles.uploadImageTextStyle}>{MoaOrAoa.name}</Text>
        </TouchableOpacity>}
        {!this.isEmpty(moaOrAoaError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{moaOrAoaError}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('BussnessAccountDoc')}</Text>
        <TouchableOpacity testID="businessBankAccUploadBtn" onPress={() => this.updateTheModal("BusinessAccountBank")} style={styles.emptyImageContainer}>
          <Image style={styles.uploadImgIconView} source={upload} />
          <Text style={styles.titleText}>{i18n.t("imageType")}</Text>

        </TouchableOpacity>
        <Text style={[styles.bottomContainerText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("BussnessAccountDocDescriiption")}</Text>
        {this.handleUploadImageAvailable(BusinessAccountBank) && <TouchableOpacity onPress={this.deleteTheBusinessAccountBank} style={styles.uploadImageContainer}>
          <Image style={styles.uploadImageStyle} source={this.handleReturnTheImageAccordingToType(BusinessAccountBank.type)} />
          <Image style={styles.deleteButton} source={deleteBtn} />
          <Text numberOfLines={1} style={styles.uploadImageTextStyle}>{BusinessAccountBank.name}</Text>
        </TouchableOpacity>}
        {!this.isEmpty(businessBankAccountError) && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]}>{businessBankAccountError}</Text>}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.documentPickerModal}>
        <View style={styles.modalMainViewDoc}>
          <SafeAreaView style={styles.modalSafeDoc}></SafeAreaView>
          <View style={styles.docModalMainViewAdd}>
            <View style={styles.modalSecondViewDoc}>
              <TouchableOpacity
                testID={"btn_camera"}
                style={styles.optionModalTouchAdd} activeOpacity={0.9} onPress={() => { this.CameraDocOpen() }}>
                <View style={styles.optionModalViewAdd}>
                  <Text style={styles.optionModalTextAdd}>{i18n.t("Camera")}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                testID={"btn_gallery"}
                style={[styles.optionModalTouchAdd, { marginTop: 10 }]} onPress={() => { this.openImageFile() }}>
                <View style={styles.optionModalViewAdd}>
                  <Text style={styles.optionModalTextAdd}>{i18n.t("Attachment")}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.optionModalCancelViewAdd}>
              <TouchableOpacity
                testID={"btn_cancelMedia"}
                onPress={this.handleCloseTheImagePicker} style={styles.docModalCancelTouch}>
                <Text style={styles.docModalCancelTextAdd}>{i18n.t("cancelText")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </>)
  }

  // Customizable Area End

    render() {
        // Customizable Area Start
        const { activePage, loading } = this.state;
    let imageSource;

    switch (activePage) {
      case 'first':
        imageSource = firstactivate;
        break;
      case 'second':
        imageSource = secondactivate;
        break;
      case 'third':
        imageSource = thirdactivate;
        break;
      default:
        imageSource = null;
    }

    const renderActivePage = () => {
      switch (activePage) {
        case 'first':
          return this.renderFirstPage();
        case 'second':
          return this.renderSecondPage();
        case 'third':
          return this.renderThirdPage();
        default:
          return null;
      }
    }

    return (
      <SafeAreaView style={styles.safeContainerAddProducts}>
        <View style={styles.containerAddProducts}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={false}
          />
          {loading && <CustomLoader />}

          <View style={styles.addProductviewContainer}>
            <View style={[styles.headerViewMainProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity
                testID="btnBackCatalogue"
                style={styles.backTouchProducts}
                onPress={() => {this.handleTheBackButton()}}
              >
                <Image source={i18n.language==="ar"?rightArrow:backIcon}
                  resizeMode="contain"
                  style={styles.backIconCssProducts}
                />
              </TouchableOpacity>

              <View>
                <Text style={styles.headerTitleCatalogue}>{i18n.t('AccountActivation')}</Text>
              </View>
              <TouchableOpacity style={styles.filterIconTouch} />
            </View>

            <View style={{ width: windowWidth * 0.9, height: windowHeight * 0.1 }}>
              <Image
                source={imageSource}
                resizeMode="contain"
                style={{ width: windowWidth * 0.9, height: windowHeight * 0.1 }}
              />
            </View>

            <KeyboardAvoidingView
              behavior={this.isPlatformiOS() ? "padding" : undefined}
              style={styles.keyboardPadding}
              keyboardVerticalOffset={64}
            >
              <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={this.hideKeyboard}>
                  <View>
                    {renderActivePage()}
                    <View style={styles.buttonsContainerAddProducts}>
                      <TouchableOpacity
                        testID="btnBack"
                        style={styles.backButtonAddProducts}
                        onPress={this.handleTheBackButton}
                      >
                        <Text style={styles.backText}>{i18n.t("Back")}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        testID="btnNext"
                        style={styles.nextButtonAddproducts}
                        onPress={this.handleTheNextButton}
                      >
                        <Text style={styles.nextButtonText}>{this.handleReturnTheText()}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerAddProducts: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainerAddProducts: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerViewMainProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  addProductviewContainer: {
    flex: 1,
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  keyboardPadding: { flex: 1 },
  backTouchProducts: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  backIconCssProducts: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  buttonsContainerAddProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
    marginTop: 50,
  },
  backButtonAddProducts: {
    width: "48%",
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  backText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500",
  },
  nextButtonAddproducts: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: "48%",
    borderRadius: 2,
    justifyContent: "center",
    marginTop: (windowWidth * 4) / 100,
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily:'Lato-Bold',
    fontSize: Scale(16),
    color: "#375280",
    paddingBottom: 6,
  },
  titleText: {
    fontFamily:'Lato-Bold',
    fontSize: Scale(18),
    color: "#375280",
    paddingBottom: 6,
  },
  inputViewContainer: {

    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    height: Scale(50),
  },
  buildingTextInput: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  gpsIcon: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
    marginTop: windowWidth * 1 / 100
  },
  gpsTouch: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
    right: 5,
    position: 'absolute',
    marginTop: windowWidth * 6.5 / 100
  },
  addressView: {
    flexDirection: 'row',
    width: windowWidth * 90 / 100,
    backgroundColor: '#F8F8F8',
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1
  },
  addressTextInput: {
    width: (windowWidth * 80) / 100,
    fontFamily: 'Lato-Regular',
    color: '#375280',
    fontSize: Scale(16),
  },
  emptyImageContainer: {

    borderRadius: 2,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    width: Scale(380),
    height: Scale(128),
    marginTop: 10

  },
  uploadImgIconView: {
    width: Scale(40),
    height: Scale(40),
    marginBottom: Scale(5)
  },
  bottomContainerText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    lineHeight: Scale(22),
    color: "#94A3B8",
    marginTop: Scale(2)
  },
  optionModalTouchAdd: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionModalViewAdd: {
    width: '94%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: windowWidth * 3.5 / 100
  },
  optionModalTextAdd: {
    textAlign: 'center',
    fontSize: windowWidth * 4 / 100,
    color: '#000000'
  },
  optionModalCancelViewAdd: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#0061A7',
    width: '94%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  docModalCancelTouch: {
    alignSelf: 'center',
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth * 3.5 / 100
  },
  docModalCancelTextAdd: {
    fontSize: windowWidth * 4 / 100,
    color: '#FFFFFF'
  },
  modalMainViewDoc: {
    flex: 1,
    backgroundColor: '#00000030',
    alignItems: 'center'
  },
  docModalMainViewAdd: {
    position: 'absolute',
    bottom: windowHeight * 3 / 100,
    width: windowWidth
  },
  modalSecondViewDoc: {
    alignSelf: 'center',
    width: '100%'
  },
  modalSafeDoc: {
    flex: 0
  },
  uploadImageStyle: {
    width: 40,
    height: 40
  },
  deleteButton: {
    position: "absolute",
    width: 25,
    height: 22,
    top: 0,
    right: Scale(2),
    resizeMode: "contain"
  },
  uploadImageContainer: {
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: "center",
    borderColor: "#E2E8F0",
    width: Scale(65),
    alignItems: "center",
    padding: 5,
    marginTop: 5,
  },
  uploadImageTextStyle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(12),
    fontWeight: "400",
    color: "#375280",
    paddingTop: 5
  }
});
// Customizable Area End
