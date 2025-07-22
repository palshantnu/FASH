import React from "react";
// more core import statements

// Customizable Area Start
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";
import Scale from "../../../components/src/Scale";
import { Dropdown } from "react-native-element-dropdown";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import AddProductController, {
  Props,
} from "./AddProductController";

export default class AddProduct extends AddProductController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderProductErrorMsg = (errorMsg: string) => (
    <Text style={[styles.errorName,{alignSelf:this.state.languageType === "en" ?'flex-start' : 'flex-end'}]}>* {errorMsg}</Text>
  );

  renderProductDropDown = (
    testID:string,
    data: { label: string; value: string }[],
    placeholderValue: string,
    genderValue: string | null,
    dropDownpUpdatedValueChange: (item: { label: string; value: string }) => void,
    isErrorMsgValue: boolean,
    fetchData?: () => void,
  ) => {
    return (
      <Dropdown
        testID={testID}
        style={[
          styles.dropdown,
          { borderColor: isErrorMsgValue ? "#F87171" : "#F8F8F8" },
        ]}
        placeholderStyle={[styles.placeholderStyle,{ textAlign: TextAlignManage(i18n.language) }]}
        selectedTextStyle={[styles.selectedTextStyle,{ textAlign: TextAlignManage(i18n.language) }]}
        data={data}
        itemTextStyle={[styles.selectedTextStyle,{ textAlign: TextAlignManage(i18n.language) }]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholderValue}
        iconStyle={styles.iconStyle}
        iconColor="#375280"
        value={genderValue}
        onChange={dropDownpUpdatedValueChange}
        onFocus={fetchData}
      />
    );
  };

  renderAddProductName = () => {
    let errorProductMsg = !this.isEmpty(this.state.productNameErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productName')}*</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorProductMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductName"
            placeholderTextColor="#375280"
            placeholder={i18n.t('enterProductName')}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            maxLength={40}
            value={this.state.productName}
            autoCapitalize="none"
            onChangeText={this.handleChangetheProductName}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorProductMsg && this.renderProductErrorMsg(this.state.productNameErrorMsg)}
      </View>
    );
  };

  renderArabicAddProductName= () =>{
    let errorProductMsg = !this.isEmpty(this.state.productNameArabicErrorMsg);

    return(
      <View style={styles.mainFieldContainer}>
          <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productNameArabic')}*</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorProductMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductNameArabic"
            placeholderTextColor="#375280"
            placeholder={i18n.t('enterProductName')}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            maxLength={40}
            value={this.state.productNameArabic}
            autoCapitalize="none"
            onChangeText={this.handleChangetheProductNameArabic}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorProductMsg && this.renderProductErrorMsg(this.state.productNameArabicErrorMsg)}
      </View>
    )
  }

  renderAddGenderBlock = () => {
    const data = [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" },
    ];
    let genderErrorMsg = !this.isEmpty(this.state.genderErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('gender')} *</Text>
        {this.renderProductDropDown(
          'selectGender',
          data,
          i18n.t('selectGender'),
          this.state.gender,
          this.handleSelctGender,
          genderErrorMsg,
        )}
        {genderErrorMsg && this.renderProductErrorMsg(this.state.genderErrorMsg)}
      </View>
    );
  };

  renderAddGenderArabicBlock = () => {
    const data = [
      { label: "آخر", value: "1" },
      { label: "أنثى", value: "2" },
    ];
    let genderErrorMsg = !this.isEmpty(this.state.genderArabicErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('genderArabic')} *</Text>
        {this.renderProductDropDown(
          'selectGenderArabic',
          data,
          i18n.t('selectGender'),
          this.state.genderArabic,
          this.handleSelctGenderArabic,
          genderErrorMsg,
          
        )}
        {genderErrorMsg && this.renderProductErrorMsg(this.state.genderArabicErrorMsg)}
      </View>
    );
  };

  renderAddBrandName = () => {
   
    let errorBrandMsg = !this.isEmpty(this.state.brandErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectBrand')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorBrandMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputBrand"
            placeholder={i18n.t("enterBrandName")}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.brand}
            onChangeText={this.handleBrandSelect}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorBrandMsg && this.renderProductErrorMsg(this.state.brandErrorMsg)}
      </View>
    );
  };

  renderArabicBrandName = () =>{
    let errorBrandMsg = !this.isEmpty(this.state.brandArabicErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectArabicBrand')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorBrandMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputBrandArabic"
            placeholder={i18n.t("enterBrandName")}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.brandArabic}
            onChangeText={this.handleBrandArabicSelect}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorBrandMsg && this.renderProductErrorMsg(this.state.brandArabicErrorMsg)}
      </View>
    );
  } 

  renderAddCategoryBlock = () => {
    let errorCategoryMsg = !this.isEmpty(this.state.categoryErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectCategory')} *</Text>

        {this.renderProductDropDown(
          "selectCategory",
          this.state.categories,
          i18n.t('selectCategory'),
          this.state.category,
          this.handleCategorySelect,
          errorCategoryMsg,
          this.fetchTheCategories
        )}
        {errorCategoryMsg && this.renderProductErrorMsg(this.state.categoryErrorMsg)}
      </View>
    );
  };

  renderAddSubCategoryBlock = () => {
    let errorSubCatMsg = !this.isEmpty(this.state.subCategoryErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectSubCategory')} *</Text>
        {this.renderProductDropDown(
          "selectSubCategory",
          this.state.subCategories,
          i18n.t('selectSubCategory'),
          this.state.subCategory,
          this.handleSubCategorySelect,
          errorSubCatMsg,
          this.fetchTheSubCategories
        )}
        {errorSubCatMsg && this.renderProductErrorMsg(this.state.subCategoryErrorMsg)}
      </View>
    );
  };

  renderAddSubSubCategoryBlock = () => {
    let errorMsg1 = !this.isEmpty(this.state.subSubCategoryError);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectSubSubCategory')} *</Text>
        {this.renderProductDropDown(
          "selectSubSubCategory",
          this.state.subSubCategoryList,
          i18n.t('selectSubSubCategory'),
          this.state.subSubCategory,
          this.handleSubSubCategorySelect,
          errorMsg1,
          this.fetchTheSubSubCategories
        )}
        {errorMsg1 && this.renderProductErrorMsg(this.state.subSubCategoryError)}
      </View>
    );
  };

  renderAddMaterial = () => {
    let errorMaterialMsg = !this.isEmpty(this.state.meterialErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('material')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorMaterialMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputMaterial"
            placeholder={i18n.t('enterMaterialName')}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.material}
            onChangeText={this.handleChangetheMaterial}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMaterialMsg && this.renderProductErrorMsg(this.state.meterialErrorMsg)}
      </View>
    );
  };

  renderAddMaterialArabic = () => {
    let errorMaterialMsg = !this.isEmpty(this.state.meterialArabicErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('material_arabic')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorMaterialMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputMaterialArabic"
            placeholder={i18n.t('enterMaterialName')}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.materialArabic}
            onChangeText={this.handleChangetheArabicMaterial}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMaterialMsg && this.renderProductErrorMsg(this.state.meterialArabicErrorMsg)}
      </View>
    );
  };

  renderAddFit = () => {
    let errorFitMsg = !this.isEmpty(this.state.fitErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('fit')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorFitMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            placeholder={i18n.t('enterFitName')}
            testID="txtInputFit"
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.fit}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            onChangeText={this.handleChangetheFit}
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorFitMsg && this.renderProductErrorMsg(this.state.fitErrorMsg)}
      </View>
    );
  };

  renderAddArabicFit = () => {
    let errorFitMsg = !this.isEmpty(this.state.fitArabicErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('fitArabic')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorFitMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            placeholder={i18n.t('enterFitName')}
            testID="txtInputFitArabic"
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.fitArabic}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            onChangeText={this.handleChangetheArabicFit}
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorFitMsg && this.renderProductErrorMsg(this.state.fitArabicErrorMsg)}
      </View>
    );
  };

  renderAddProductCare = () => {
    let errorCareMsg = !this.isEmpty(this.state.productCareErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productCare')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorCareMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductCare"
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            value={this.state.productCare}
            placeholder={i18n.t('enterProductCare')}
            maxLength={40}
            autoCapitalize="none"
            onChangeText={this.handleChangetheProductCare}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorCareMsg && this.renderProductErrorMsg(this.state.productCareErrorMsg)}
      </View>
    );
  };

  renderAddArabicProductCare = () => {
    let errorCareMsg = !this.isEmpty(this.state.productCareArabicErrorMsg);
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productCareArabic')} *</Text>
        <View
          style={[
            styles.mainInputViewContainer,
            { borderColor: errorCareMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductCareArabic"
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            value={this.state.productCareArabic}
            placeholder={i18n.t('enterProductCare')}
            maxLength={40}
            autoCapitalize="none"
            onChangeText={this.handleChangetheArabicProductCare}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorCareMsg && this.renderProductErrorMsg(this.state.productCareArabicErrorMsg)}
      </View>
    );
  };

  renderAddListProducts = () => {
    return (
      <View style={styles.mainFieldContainer}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('listProduct')} *</Text>
        <View style={{ flexDirection:FlexConditionManage(i18n.language) }}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={this.listRadioBoxHandler}
              testID="listRadioBtn"
              style={[
                styles.wraper,
                {
                  borderRadius: 20,
                },
              ]}
            >
              <View
                style={[
                  styles.defaultStyle,
                  { borderColor: this.state.isListed ? "#CCBEB1" : "#FFFFFF" },
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>{i18n.t('listed')}</Text>
          </View>
          <View style={{ ...styles.row, marginLeft: 24 }}>
            <TouchableOpacity
              onPress={this.unListRadioBoxHandler}
              testID="unlistRadioBtn"
              style={[
                styles.wraper,
                {
                  borderRadius: 20,
                },
              ]}
            >
              <View
                style={[
                  styles.defaultStyle,
                  {
                    borderColor: this.state.isUnlisted ? "#CCBEB1" : "#FFFFFF",
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>{i18n.t('unlist')}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderAddProductDescription = () => {
    let errorDisMsg = !this.isEmpty(this.state.productDescriptionErrorMsg);
    return (
      <View style={{ ...styles.mainFieldContainer }}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productDiscri')} *</Text>
        <View
          style={[
            styles.inputDescriptionViewContainer,
            { borderColor: errorDisMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductDescription"
            placeholder={i18n.t('enterProductDiscription')}
            placeholderTextColor="#375280"
            style={{
              ...styles.buildingTextInput,
              height: Scale(120),
              textAlign: TextAlignManage(i18n.language)
            }}
            value={this.state.productDescription}
            multiline={true}
            onChangeText={this.handleChangetheDescription}
            textAlignVertical="top"
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorDisMsg && this.renderProductErrorMsg(this.state.productDescriptionErrorMsg)}
      </View>
    );
  };

  renderAddArabicProductDescription = () => {
    let errorDisMsg = !this.isEmpty(this.state.productDescriptionArabicErrorMsg);
    return (
      <View style={{ ...styles.mainFieldContainer }}>
        <Text style={[styles.productNameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productDiscriArabic')} *</Text>
        <View
          style={[
            styles.inputDescriptionViewContainer,
            { borderColor: errorDisMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductDescriptionArabic"
            placeholder={i18n.t('enterProductDiscription')}
            placeholderTextColor="#375280"
            style={{
              ...styles.buildingTextInput,
              height: Scale(120),
              textAlign: TextAlignManage(i18n.language)
            }}
            value={this.state.productDescriptionArabic}
            multiline={true}
            onChangeText={this.handleChangetheArabicDescription}
            textAlignVertical="top"
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorDisMsg && this.renderProductErrorMsg(this.state.productDescriptionArabicErrorMsg)}
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
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
          {this.state.loading && <CustomLoader />}

          <View style={styles.addProductviewContainer}>
            <View style={[styles.headerViewMainProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity
                testID="btnBackCatalogue"
                style={styles.backTouchProducts}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Image
                  resizeMode="contain"
                  source={backIcon}
                  style={[styles.backIconCssProducts,{transform: [{rotate: i18n.language === 'ar'? '180deg':"0deg"}]}]}
                />
              </TouchableOpacity>

              <View>
                <Text style={styles.headerTitleCatalogue}>{i18n.t('productDetails')}</Text>
              </View>
              <TouchableOpacity style={styles.filterIconTouch} />
            </View>
            <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
        keyboardVerticalOffset={64}
      >
            <ScrollView bounces={false} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
              <TouchableWithoutFeedback testID="touchWithoutFeed" onPress={() => this.hideKeyboard()}>
                <View>
                  {this.renderAddProductName()}
                  {this.renderArabicAddProductName()}
                  {this.renderAddGenderBlock()}
                  {this.renderAddGenderArabicBlock()}
                  {this.renderAddBrandName()}
                  {this.renderArabicBrandName()}
                  {this.renderAddCategoryBlock()}
                  {this.renderAddSubCategoryBlock()}
                  {this.renderAddSubSubCategoryBlock()}
                  {this.renderAddMaterial()}
                  {this.renderAddMaterialArabic()}
                  {this.renderAddFit()}
                  {this.renderAddArabicFit()}
                  {this.renderAddProductCare()}
                  {this.renderAddArabicProductCare()}
                  {this.renderAddListProducts()}
                  {this.renderAddProductDescription()}
                  {this.renderAddArabicProductDescription()}

                  <View style={[styles.buttonsContainerAddProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity
                      testID="btnBack"
                      style={styles.backButtonAddProducts}
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    >
                      <Text style={styles.backText}>{i18n.t('back')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      testID="Nextbutton"
                      style={styles.nextButtonAddproducts}
                      onPress={this.handleTheNextButton}
                    >
                      <Text style={styles.nextButtonText}>{i18n.t('next')}</Text>
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
    // Merge Engine - render - End
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
  mainFieldContainer: {
    paddingTop: 16,
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  backIconCssProducts: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  productNameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
  mainInputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    height: Scale(50),
  },
  inputDescriptionViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
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
  roleViewContainer: {
    width: "100%",
    height: Scale(50),
    borderWidth: Scale(1),
    borderRadius: 4,
    justifyContent: "space-between",
    borderColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  downArrowView: {
    width: Scale(22),
    height: Scale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  selectRoleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(24),
  },
  roleView: {
    marginVertical: Scale(6),
  },
  roleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(24),
  },
  isRoleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "700",
    color: "#375280",
    lineHeight: Scale(26),
  },
  roleModalView: {
    borderBottomLeftRadius: Scale(4),
    borderBottomRightRadius: Scale(4),
    paddingBottom: Scale(8),
    backgroundColor: "#F8F8F8",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    elevation: 3,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  passwordIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  openIocn: {
    width: Scale(24),
    height: Scale(24),
    transform: [{ rotate: "180deg" }],
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  txt: {
    marginLeft: 8,
    color: "#375280",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "400",
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
  wraper: {
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#CCBEB1",
  },
  backText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500",
  },
  defaultStyle: {
    height: 20 * 0.8,
    width: 20 * 0.8,
    borderWidth: 20 * 0.25,
    borderRadius: 20,
  },
  dropdown: {
    justifyContent: 'space-between',
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    borderWidth: 1,
    borderRadius: 4,
    paddingTop:Scale(6)
  },

  placeholderStyle: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#375280",
    paddingRight: 10,
    paddingBottom:5
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
// Customizable Area End
