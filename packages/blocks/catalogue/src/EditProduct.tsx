import React from "react";
// more core import statements

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from "../../../components/src/Scale";
import {
  backIcon,
  cancel,
  errorIcon,
  deleteIcon,
  upload,
  search,
  selectedCheckBox,
  unSelectedCheckBox,
} from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { CatalogueItem } from "../../productdescription3/src/response";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import FlexConditionManage from "../../../components/src/FlexConditionManage";
interface TypesOfMultiselect {
  testID: string;
  data: { label: string; value: string }[];
  selectedValue: string[];
  placeholder: string;
  fetchList: () => void;
  onChange: (item: string[]) => void;
}

// Customizable Area End

import EditProductController, { Props, Variant } from "./EditProductController";

export default class EditProduct extends EditProductController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderErrorMsg = (errorMsg: string) => (
    <Text style={styles.errorName}>* {errorMsg}</Text>
  );

  renderDropDown = (
    testID:string,
    data: { label: string; value: string }[],
    placeholder: string,
    gender: string | null,
    dropDownpUpdatedValue: (item: { label: string; value: string }) => void,
    isErrorMsg: boolean,
    fetchData?: () => void
  ) => {
    return (
      <Dropdown
        testID={testID}
        style={[
          styles.dropdown,
          { borderColor: isErrorMsg ? "#F87171" : "#F8F8F8" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle,{textAlign:TextAlignManage(i18n.language)}]}
        data={data}
        itemTextStyle={styles.selectedTextStyle}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconStyle={[styles.iconStyle,{
          
            position:"absolute",
            right:ManageDynamicMargin(i18n.language,undefined,0),
            left:ManageDynamicMargin(i18n.language,0,undefined)
          
        }]}
        iconColor="#375280"
        value={gender}
        onChange={dropDownpUpdatedValue}
        onFocus={fetchData}
      />
    );
  };

  renderProductName = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editProductNameErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("productName")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductName"
            placeholderTextColor="#375280"
            placeholder={i18n.t("enterProductName")}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            maxLength={40}
            value={this.state.productName}
            autoCapitalize="none"
            onChangeText={this.handleEditChangetheProductName}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.editProductNameErrorMsg)}
      </View>
    );
  };

  renderArabicAddProductName = () => {
    let errorProductMsg = !this.checkIsEmpty(this.state.editProductNameArabicErrorMsg);

    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productNameArabic')}*</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorProductMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductNameArabic"
            placeholderTextColor="#375280"
            placeholder={i18n.t('enterProductName')}
            style={[styles.buildingTextInput, { textAlign: TextAlignManage(i18n.language) }]}
            maxLength={40}
            value={this.state.productArabicName}
            autoCapitalize="none"
            onChangeText={this.handleEditChangetheArabicProductName}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorProductMsg && this.renderErrorMsg(this.state.editProductNameArabicErrorMsg)}
      </View>
    )
  }

  renderGenderBlock = () => {
    const data = [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" },
    ];
    let errorMsg = !this.checkIsEmpty(this.state.editGenderErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("gender")} *</Text>
        {this.renderDropDown(
          "selectGender",
          data,
          i18n.t("selectGender"),
          this.state.gender,
          this.handleEditSelctGender,
          errorMsg
        )}
        {errorMsg && this.renderErrorMsg(this.state.editGenderErrorMsg)}
      </View>
    );
  };

  renderAddGenderArabicBlock = () => {
    const data = [
      { label: "آخر", value: "1" },
      { label: "أنثى", value: "2" },
    ];
    let genderErrorMsg = !this.checkIsEmpty(this.state.editGenderArabicErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('genderArabic')} *</Text>
        {this.renderDropDown(
          "selectGenderArabic",
          data,
          i18n.t('selectGender'),
          this.state.genderArabic,
          this.handleEditSelctGenderArabic,
          genderErrorMsg,
          
        )}
        {genderErrorMsg && this.renderErrorMsg(this.state.editGenderArabicErrorMsg)}
      </View>
    );
  };

  renderBrandName = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editBrandErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("selectBrand")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputBrand"
            placeholder={i18n.t("enterBrandName")}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.brand}
            onChangeText={this.handleEditBrandSelect}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.editBrandErrorMsg)}
      </View>
    );
  };

  renderArabicBrandName = () =>{
    let errorBrandMsg = !this.checkIsEmpty(this.state.editbrandArabicErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('selectArabicBrand')} *</Text>
        <View
          style={[
            styles.inputViewContainer,
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
            onChangeText={this.handleEditBrandArabicSelect}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorBrandMsg && this.renderErrorMsg(this.state.editbrandArabicErrorMsg)}
      </View>
    );
  } 

  renderCategoryBlock = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editCategoryErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("selectCategory")} *</Text>

        {this.renderDropDown(
          "selectCategory",
          this.state.categories,
          i18n.t("selectCategory"),
          this.state.category,
          this.handleEditCategorySelect,
          errorMsg,
          this.fetchTheProductCategories
        )}
        {errorMsg && this.renderErrorMsg(this.state.editCategoryErrorMsg)}
      </View>
    );
  };

  renderSubCategoryBlock = () => {
    let errorMsg = !this.checkIsEmpty(this.state.subCategoryErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("selectSubCategory")} *</Text>
        {this.renderDropDown(
          "selectSubCategory",
          this.state.subCategories,
          i18n.t("selectSubCategory"),
          this.state.subCategory,
          this.handleEditSubCategorySelect,
          errorMsg,
          this.fetchTheProductSubCategories
        )}
        {errorMsg && this.renderErrorMsg(this.state.subCategoryErrorMsg)}
      </View>
    );
  };

  renderSubSubCategoryBlock = () => {
    let errorMsg = !this.checkIsEmpty(this.state.subSubCategoryError);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("selectSubSubCategory")} *</Text>
        {this.renderDropDown(
          "selectSubSubCategory",
          this.state.subSubCategoryList,
          i18n.t("selectSubSubCategory"),
          this.state.subSubCategory,
          this.handleEditSubSubCategorySelect,
          errorMsg,
          this.fetchTheSubSubCategoriesProduct
        )}
        {errorMsg && this.renderErrorMsg(this.state.subSubCategoryError)}
      </View>
    );
  };

  renderMaterial = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editMeterialErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("material")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputMaterial"
            placeholder={i18n.t("enterMaterialName")}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.material}
            onChangeText={this.handleEditChangetheMaterial}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.editMeterialErrorMsg)}
      </View>
    );
  };

  renderAddMaterialArabic = () => {
    let errorMaterialMsg = !this.checkIsEmpty(this.state.editMeterialArabicErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('material_arabic')} *</Text>
        <View
          style={[
            styles.inputViewContainer,
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
            onChangeText={this.handleEditChangetheArabicMaterial}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMaterialMsg && this.renderErrorMsg(this.state.editMeterialArabicErrorMsg)}
      </View>
    );
  };

  renderFit = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editFitErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("fit")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            placeholder={i18n.t("enterFitName")}
            testID="txtInputFit"
            placeholderTextColor="#375280"
            maxLength={40}
            value={this.state.fit}
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            onChangeText={this.handleEditChangetheFit}
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.editFitErrorMsg)}
      </View>
    );
  };

  renderAddArabicFit = () => {
    let errorFitMsg = !this.checkIsEmpty(this.state.editFitArabicErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('fitArabic')} *</Text>
        <View
          style={[
            styles.inputViewContainer,
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
            onChangeText={this.handleEditChangetheArabicFit}
            autoCapitalize="none"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorFitMsg && this.renderErrorMsg(this.state.editFitArabicErrorMsg)}
      </View>
    );
  };

  renderProductCare = () => {
    let errorMsg = !this.checkIsEmpty(this.state.editProductCareErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("productCare")} *</Text>
        <View
          style={[
            styles.inputViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductCare"
            placeholderTextColor="#375280"
            style={[styles.buildingTextInput,{textAlign:TextAlignManage(i18n.language)}]}
            value={this.state.productCare}
            placeholder={i18n.t("enterProductCare")}
            maxLength={40}
            autoCapitalize="none"
            onChangeText={this.handleEditChangetheProductCare}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorMsg && this.renderErrorMsg(this.state.editProductCareErrorMsg)}
      </View>
    );
  };

  renderAddArabicProductCare = () => {
    let errorCareMsg = !this.checkIsEmpty(this.state.editProductCareArabicErrorMsg);
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productCareArabic')} *</Text>
        <View
          style={[
            styles.inputViewContainer,
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
            onChangeText={this.handleEditChangetheArabicProductCare}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            keyboardType="default"
          />
        </View>
        {errorCareMsg && this.renderErrorMsg(this.state.editProductCareArabicErrorMsg)}
      </View>
    );
  };

  renderListProducts = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameText}>{i18n.t("listProduct")} *</Text>
        <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
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
            <Text style={styles.txt}>{i18n.t("listed")}</Text>
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
                    borderColor: !this.state.isListed ? "#CCBEB1" : "#FFFFFF",
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>{i18n.t("unlist")}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderProductDescription = () => {
    let errorMsg = !this.checkIsEmpty(
      this.state.editProductDescriptionErrorMsg
    );
    return (
      <View style={{ ...styles.fieldContainer }}>
        <Text style={styles.nameText}>{i18n.t("productDiscri")} *</Text>
        <View
          style={[
            styles.inputDescriptionViewContainer,
            { borderColor: errorMsg ? "#F87171" : "#F8F8F8" },
          ]}
        >
          <TextInput
            testID="txtInputProductDescription"
            placeholder={i18n.t("enterProductDiscription")}
            placeholderTextColor="#375280"
            style={{
              ...styles.buildingTextInput,
              height: Scale(120),
            }}
            value={this.state.productDescription}
            multiline={true}
            onChangeText={this.handleEditChangetheDescription}
            textAlignVertical="top"
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorMsg &&
          this.renderErrorMsg(this.state.editProductDescriptionErrorMsg)}
      </View>
    );
  };

  renderAddArabicProductDescription = () => {
    let errorDisMsg = !this.checkIsEmpty(this.state.editProductDescriptionArabicErrorMsg);
    return (
      <View style={{ ...styles.fieldContainer }}>
        <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('productDiscriArabic')} *</Text>
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
            onChangeText={this.handleEditChangetheArabicDescription}
            textAlignVertical="top"
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        {errorDisMsg && this.renderErrorMsg(this.state.editProductDescriptionArabicErrorMsg)}
      </View>
    );
  };

  renderProductDetails = () => {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
        keyboardVerticalOffset={64}
      >
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback testID="hideKeyboard" onPress={() => this.hideKeyboard()}>
            <View>
              {this.renderProductName()}
              {this.renderArabicAddProductName()}
              {this.renderGenderBlock()}
              {this.renderAddGenderArabicBlock()}
              {this.renderBrandName()}
              {this.renderArabicBrandName()}
              {this.renderCategoryBlock()}
              {this.renderSubCategoryBlock()}
              {this.renderSubSubCategoryBlock()}
              {this.renderMaterial()}
              {this.renderAddMaterialArabic()}
              {this.renderFit()}
              {this.renderAddArabicFit()}
              {this.renderProductCare()}
              {this.renderAddArabicProductCare()}
              {this.renderListProducts()}
              {this.renderProductDescription()}
              {this.renderAddArabicProductDescription()}

              <TouchableOpacity
                onPress={this.handleProductDetailsSaveButton}
                style={styles.saveButtonStyle}
                testID="productDetailsSaveBtn"
              >
                <Text style={styles.saveButtonText}>
                  {i18n.t("saveDetails")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  renderTextInput = (
    testid: string,
    value: string,
    moblKeyboard: any,
    onChangeText: any,
    isSku?: boolean
  ) => {
    const handleTextChange = (text: string) => {
      const filteredText = text.replace(/[^a-zA-Z0-9]/g, "");
      onChangeText(filteredText);
    };
    return (
      <TextInput
        testID={testid}
        placeholder="-"
        placeholderTextColor="#375280"
        style={[
          styles.blockSunContent,
          { width: isSku ? Scale(80) : Scale(58),marginRight:20 },
        ]}
        value={value}
        maxLength={40}
        autoCapitalize="none"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        onChangeText={handleTextChange}
        keyboardType={moblKeyboard}
      />
    );
  };

  renderPriceInput = (
    testid: string,
    value: string,
    moblKeyboard: any,
    onChangeText: any,
    isSku?: boolean
  ) => {
    const handlePriceChange = (text: string) => {
      // Allow only digits and decimal points
      const filteredText = text.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = filteredText.split(".");

      // If there's a decimal point, limit the digits after it to a maximum of 2
      const validText =
        parts.length > 1
          ? parts[0] + "." + parts[1].slice(0, 2) // Keep only the first two digits after the decimal
          : filteredText;

      onChangeText(validText);
    };

    return (
      <TextInput
        testID={testid}
        placeholder="-"
        placeholderTextColor="#375280"
        style={[
          styles.blockSunContent,
          { width: isSku ? Scale(80) : Scale(58),marginRight:ManageDynamicMargin(i18n.language,15,undefined) },
        ]}
        value={value}
        maxLength={40}
        autoCapitalize="none"
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={handlePriceChange}
        keyboardType={moblKeyboard}
      />
    );
  };

  renderEmptyTextInput = (testid: string, value: string, isSku?: boolean) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={this.handleTextEmptyInputBox}
      >
        <TextInput
          testID={testid}
          editable={false}
          placeholder="-"
          placeholderTextColor="#375280"
          style={[
            styles.blockSunContent,
            { width: isSku ? Scale(80) : Scale(58) },
          ]}
          value={value}
          autoCapitalize="none"
        />
      </TouchableOpacity>
    );
  };

  renderVariantListContainer = () => {
    return this.state.variants.map((item: Variant, index: number) => (
      <View
        key={index}
        style={[
          styles.variantBodyContainer,
          { flexDirection: FlexConditionManage(i18n.language) },
        ]}
      >
        <View style={{}}>
          <Text
            style={[
              styles.numberings,
              { textAlign: TextAlignManage(i18n.language) },
            ]}
          >
            {index + 1}. {item.variant_size} / {item.variant_color}
          </Text>
        </View>
        <View style={{  }}>
          {this.renderTextInput(
            `txtInputQuantity${index}`,
            item.stock_qty ? item.stock_qty.toString() : "",
            "number-pad",
            (text: string) =>
              this.updateVariantProperty(index, "stock_qty", text)
          )}
        </View>
        <View style={{  }}>
          {this.renderPriceInput(
            `txtInputPrice${index}`,
            item.price ? item.price.toString() : "",
            "decimal-pad",
            (text: string) => this.updateVariantProperty(index, "price", text)
          )}
        </View>
        <View style={{ }}>
          {this.renderTextInput(
            `txtInputsku${index}`,
            item.sku ? item.sku.toString() : "",
            "default",
            (text: string) => this.updateVariantProperty(index, "sku", text),
            true
          )}
        </View>
      </View>
    ));
  };

  renderEmptyVarientContainer = () => (
    <View
      style={[
        styles.variantBodyContainer,
        { flexDirection: FlexConditionManage(i18n.language) },
      ]}
    >
      <View>
        <Text
          style={[
            styles.numberings,
            { textAlign: TextAlignManage(i18n.language) },
          ]}
        >
          1. -
        </Text>
      </View>
      <View style={{ marginLeft: Scale(15) }}>
        {this.renderEmptyTextInput("txtInputQuantity", "")}
      </View>
      <View style={{ marginLeft: Scale(19) }}>
        {this.renderEmptyTextInput("txtInputPrice", "")}
      </View>
      <View style={{ marginLeft: Scale(22) }}>
        {this.renderEmptyTextInput("txtInputsku", "", true)}
      </View>
    </View>
  );

  renderMultiSelect = ({
    testID,
    data,
    selectedValue,
    placeholder,
    onChange,
  }: TypesOfMultiselect) => {
    return (
      <MultiSelect
        testID={testID}
        style={[styles.dropdown, { borderColor: "#F8F8F8" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="#375280"
        data={data}
        itemTextStyle={styles.selectedTextStyle}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={onChange}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.selectedTextStyle}>{item.label}</Text>
              <Image style={{ height: 16, width: 16 }} source={cancel} />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  renderUpdateVariants = () => {
    const { errorMsg } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
      >
        <ScrollView bounces={false} keyboardShouldPersistTaps="always">
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            <View>
              <View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.nameText}>{i18n.t("varientSize")}</Text>
                  {this.renderMultiSelect({
                    testID: "btnVariantSize",
                    data: this.state.sizeList,
                    selectedValue: this.state.sizeSelected,
                    placeholder: i18n.t("selectSize"),
                    fetchList: this.fetchTheSizeList,
                    onChange: (item) => {
                      this.setState({ sizeSelected: item }, () => {
                        this.checkCreateVariantButtonStatus();
                      });
                    },
                  })}
                  <Text style={styles.multitext}>
                    {i18n.t("seperateValue")}
                  </Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.nameText}>{i18n.t("varientColor")}</Text>
                  {this.renderMultiSelect({
                    testID: "btnVariantColor",
                    data: this.state.colorList,
                    selectedValue: this.state.colorSelected,
                    placeholder: i18n.t("selectVarientColor"),
                    fetchList: this.fetchTheColorList,
                    onChange: (item) => {
                      this.setState({ colorSelected: item }, () => {
                        this.checkCreateVariantButtonStatus();
                      });
                    },
                  })}
                  <Text style={styles.multitext}>
                    {i18n.t("seperateValue")}
                  </Text>
                </View>
                {errorMsg.errorHeader.length > 1 && (
                  <View style={styles.errorMsgContainer}>
                    <Image source={errorIcon} style={styles.errorIcon} />
                    <View style={styles.errorTextContainer}>
                      <Text style={styles.errorHeading}>
                        {errorMsg.errorHeader}
                      </Text>
                      <Text style={styles.errorDescription}>
                        {errorMsg.errorTitle}
                      </Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  testID="createBtn"
                  disabled={this.state.isVariantButtonDisabled}
                  style={styles.variantButton}
                  activeOpacity={0.8}
                  onPress={this.handleCreateTheVariantls}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color: this.state.isVariantButtonDisabled
                          ? "#94A3B8"
                          : "#375280",
                      },
                    ]}
                  >
                    {this.state.variants.length > 0
                      ? i18n.t("updateVariant")
                      : i18n.t("createVariant")}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.contentText}>{i18n.t("youCanCretae")}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.variantsTextContainer}>
            <View
              style={[
                styles.variantBox,
                { flexDirection: FlexConditionManage(i18n.language) },
              ]}
            >
              <Text style={styles.blockTitle}>{i18n.t("varientdetail")}</Text>
              <Text style={styles.blockTitle}>
                {this.state.variants.length}/30
              </Text>
            </View>
            <View style={styles.seperator} />

            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.variantContainer}
            >
              <View style={styles.VarientSubcontainer}>
                <View
                  style={[
                    styles.headerContainer,
                    { flexDirection: FlexConditionManage(i18n.language) },
                  ]}
                >
                  <Text
                    style={[
                      styles.blockSubTitle,
                      { marginLeft: 0, marginRight: ManageDynamicMargin(i18n.language,20,undefined) },
                    ]}
                  >
                    {i18n.t("varient")}
                  </Text>
                  <Text style={[styles.blockSubTitle,{marginRight:ManageDynamicMargin(i18n.language,30,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,40)}]}>{i18n.t("quantity")}</Text>
                  <Text style={styles.blockSubTitle}>{i18n.t("price")}</Text>
                  <Text style={styles.blockSubTitle}>{i18n.t("sku")}</Text>
                </View>

                {this.state.variants.length > 0
                  ? this.renderVariantListContainer()
                  : this.renderEmptyVarientContainer()}
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={this.handleUpdateVariantSaveDetailsButton}
            style={[
              styles.saveButtonStyle,
              {
                marginTop:
                  this.state.variants.length > 1 ? Scale(25) : Scale(120),
              },
            ]}
            testID="updateVariantSaveBtn"
          >
            <Text style={styles.saveButtonText}>{i18n.t("saveDetails")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  renderImageUplaodColorVarient = () => {
    const uniqueColorsSet = new Set();

    const uniqueVariants = this.state.variants?.filter((variant: Variant) => {
      const { variant_color } = variant;
      if (uniqueColorsSet.has(variant_color)) {
        return false;
      } else {
        uniqueColorsSet.add(variant_color);
        return true;
      }
    });

    return (
      <>
        {uniqueVariants?.map((variant: any, index: number) => {
          let imageAvailable = this.checkImageUriAvailability(
            variant[`${variant.focusedView}_image`]
          );
          const isArabic = i18n.language === 'ar'
          return (
            <React.Fragment key={index}>
              <Text style={[styles.variantText,{textAlign:TextAlignManage(i18n.language)}]}>
                {variant.variant_color} {i18n.t("varient")}
              </Text>
              <View style={styles.imageContainer}>
                {imageAvailable ? (
                  <Image
                    style={styles.uploadedImagesStyle}
                    source={{
                      uri: variant[`${variant.focusedView}_image`].uri
                        ? variant[`${variant.focusedView}_image`].uri
                        : variant[`${variant.focusedView}_image`],
                    }}
                  />
                ) : (
                  <View style={styles.emptyImageContainer}>
                    <Image style={styles.uploadImgIconView} source={upload} />
                    <Text style={styles.uploadText}>{i18n.t("uploadImg")}</Text>
                    <Text style={styles.uploadSubText}>
                      {i18n.t("onlyPNGAndJPEG")}
                    </Text>
                  </View>
                )}
                {imageAvailable && (
                  <TouchableOpacity
                    testID={`deletebtn${index}`}
                    style={[styles.deleteButtonContainer,isArabic ? {left:Scale(20)}:{right:Scale(20)}]}
                    onPress={() =>
                      this.handleViewSelection(
                        variant.variant_color,
                        variant.focusedView,
                        true
                      )
                    }
                  >
                    <View style={styles.deleteButton}>
                      <Image source={deleteIcon} style={styles.deleteIcon} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                testID={"uploadImgbtn" + index}
                style={styles.uploadImageButton}
                activeOpacity={0.8}
                onPress={() => {
                  this.handleUpdateStateForVarient(
                    variant.focusedView,
                    variant.variant_color
                  );
                }}
              >
                <Text style={styles.text}>
                  {imageAvailable ? i18n.t("replacePic") : i18n.t("uploadPic")}
                </Text>
              </TouchableOpacity>

              <View style={[styles.viewsContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity
                  testID={`front${index}`}
                  onPress={() =>
                    this.handleViewSelection(variant.variant_color, "front")
                  }
                  style={[
                    styles.singleViewEditProductContainer,
                    variant.focusedView === "front" && {
                      borderColor: "#375280",
                      borderWidth: 1,
                      borderRadius: 2,
                    },
                  ]}
                >
                  {this.checkImageUriAvailability(variant.front_image) ? (
                    <Image
                      style={styles.frontViewImageContainer}
                      source={{ uri: this.getImageUri(variant.front_image) }}
                    />
                  ) : (
                    <View style={styles.frontPhotoViewContainer} />
                  )}

                  <Text
                    style={[
                      styles.frontPhotoEditProductViewtext,
                      variant.focusedView === "front" && { color: "#375280" },
                    ]}
                  >
                    {i18n.t("frontView")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID={`back${index}`}
                  style={[
                    styles.backSideViewEditProductContainer,
                    variant.focusedView === "back" && {
                      borderColor: "#375280",
                      borderWidth: 1,
                      borderRadius: 2,
                    },
                  ]}
                  onPress={() =>
                    this.handleViewSelection(variant.variant_color, "back")
                  }
                >
                  {this.checkImageUriAvailability(variant.back_image) ? (
                    <Image
                      style={styles.frontViewImageContainer}
                      source={{ uri: this.getImageUri(variant.back_image) }}
                    />
                  ) : (
                    <View style={styles.photoViewEditContainer} />
                  )}
                  <Text
                    style={[
                      styles.photoEditProductViewtext,
                      variant.focusedView === "back" && { color: "#375280" },
                    ]}
                  >
                    {i18n.t("backView")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID={`side${index}`}
                  style={[
                    styles.singleViewEditProductContainer,
                    variant.focusedView === "side" && {
                      borderColor: "#375280",
                      borderWidth: 1,
                      borderRadius: 2,
                    },
                  ]}
                  onPress={() =>
                    this.handleViewSelection(variant.variant_color, "side")
                  }
                >
                  {this.checkImageUriAvailability(variant.side_image) ? (
                    <Image
                      style={styles.frontViewImageContainer}
                      source={{ uri: this.getImageUri(variant.side_image) }}
                    />
                  ) : (
                    <View style={styles.photoViewEditContainer} />
                  )}
                  <Text
                    style={[
                      styles.photoEditProductViewtext,
                      variant.focusedView === "side" && { color: "#375280" },
                    ]}
                  >
                    {i18n.t("sideView")}
                  </Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  renderUploadImages = () => {
    const { errorMsg } = this.state;
    return (
      <>
        <ScrollView bounces={false} keyboardShouldPersistTaps="always">
          {this.renderImageUplaodColorVarient()}

          {errorMsg.errorHeader.length > 1 && (
            <View
              style={[
                styles.errorMsgContainer,
                { height: (windowHeight * 10) / 100 },
              ]}
            >
              <Image source={errorIcon} style={styles.errorIcon} />
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorHeading}>{errorMsg.errorHeader}</Text>
                <Text style={styles.errorDescription}>
                  {errorMsg.errorTitle}
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={this.handleUpdateVariantSaveDetailsButton}
            style={[styles.saveButtonStyle, { marginTop: Scale(190) }]}
            testID="uploadImageSaveBtn"
          >
            <Text style={styles.saveButtonText}>{i18n.t("saveDetails")}</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="slide"
          testID="modal"
          transparent={true}
          visible={this.state.modalVisible}
          statusBarTranslucent
          onRequestClose={() =>
            this.setState({ modalVisible: !this.state.modalVisible })
          }
        >
          <View testID="closeBtn" style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalText}>{i18n.t("uploadImageVia")}</Text>
              </View>
              <View style={styles.modalBodyConatiner}>
                <TouchableOpacity
                  style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}
                  onPress={() => {
                    this.setState({ isGalary: true });
                  }}
                >
                  <View
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
                        {
                          borderColor: this.state.isGalary
                            ? "#CCBEB1"
                            : "#FFFFFF",
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.modalBodayText,
                      { fontWeight: this.state.isGalary ? "700" : "400" },
                    ]}
                  >
                    {i18n.t("gallery")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID="cameraBtn"
                  style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}
                  onPress={() => {
                    this.setState({ isGalary: false });
                  }}
                >
                  <View
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
                        {
                          borderColor: this.state.isGalary ? "#fff" : "#CCBEB1",
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.modalBodayText,
                      { fontWeight: this.state.isGalary ? "400" : "700" },
                    ]}
                  >
                    {i18n.t("cameraText")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.buttonsContainerAddProducts,
                  { flexDirection: FlexConditionManage(i18n.language) },
                ]}
              >
                <TouchableOpacity
                  testID="btnCancel"
                  style={styles.backButtonAddProducts}
                  onPress={this.closeImageModal}
                >
                  <Text style={styles.backText}>{i18n.t("Cancel")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID="btnConfirm"
                  style={styles.nextButtonAddproducts}
                  onPress={() =>
                    this.state.isGalary
                      ? this.handleImageOperation(false)
                      : this.handleImageOperation(true)
                  }
                >
                  <Text style={styles.nextButtonText}>{i18n.t("confirm")}</Text>
                </TouchableOpacity>
              </View>

              <View />
            </View>
          </View>
        </Modal>
      </>
    );
  };

  renderItem = ({ item }: { item: CatalogueItem }) => {
    const { store_name, image } = item.attributes;
    const isSelected = this.state.selectedItem.includes(item.id);
    return (
      <View>
        <View
          style={[
            styles.renderContainer,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <View
            style={[
              styles.renderSubLeftContainer,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <Image
              style={styles.renderItemImage}
              source={ImageNotFound(image)}
            />

            <Text style={styles.renderItemText}>{store_name}</Text>
          </View>
          <TouchableOpacity
            testID="selectCheckBox"
            onPress={() => this.toggleItemSelection(item.id)}
          >
            <Image
              style={styles.checkBoxImage}
              source={isSelected ? selectedCheckBox : unSelectedCheckBox}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.assignStoreSeperator} />
      </View>
    );
  };

  renderAssignStoreItem = () => {
    const { errorMsg, assignStoreSearchText, assignStore, isSelectAll } =
      this.state;
    return (
      <View style={styles.marginCategoryManage}>
        <View
          style={[
            styles.shopMainViewContainer,
            {
              marginTop: (windowWidth * 3) / 100,
              flexDirection: FlexConditionManage(i18n.language),
            },
          ]}
        >
          <View style={styles.searchIconCss}>
            <Image source={search} style={styles.backIconCssAssignstore} />
          </View>
          <View>
            <TextInput
              testID={"searchInputBox"}
              onChangeText={this.updateTheSearchText}
              keyboardType="default"
              maxLength={30}
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                this.searchAssignStore();
              }}
              placeholder={i18n.t("searchStore")}
              placeholderTextColor="#9A9A9A"
              style={[styles.searchTextinput,{marginRight:ManageDynamicMargin(i18n.language,40,undefined)}]}
              value={assignStoreSearchText}
            />
          </View>
        </View>
        {errorMsg.errorHeader.length > 1 && (
          <View style={styles.errorMsgContainer}>
            <Image source={errorIcon} style={styles.errorIcon} />
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorHeading}>{errorMsg.errorHeader}</Text>
              <Text style={styles.errorDescription}>{errorMsg.errorTitle}</Text>
            </View>
          </View>
        )}
        {assignStore.length > 0 && (
          <View
            style={[
              styles.selectAllContainer,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <Text style={styles.selectAllItemText}>
              {i18n.t("selectAllStore")} ({this.state.assignStore.length})
            </Text>
            <TouchableOpacity
              testID="allBtnCheckBox"
              onPress={this.toggleSelectAll}
            >
              <Image
                style={styles.checkBoxImage}
                source={isSelectAll ? selectedCheckBox : unSelectedCheckBox}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.subCateListMainView}>
          <FlatList
            bounces={false}
            testID={"Assignstore_show_flatlist_list"}
            data={assignStore}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() =>
              !this.state.loading ? (
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.listEmptyContainerTitleText}>
                    {this.state.assignStoreSearchText
                      ? `'${i18n.t("noStoreFoundNamed")}'${
                          this.state.assignStoreSearchText
                        }'`
                      : i18n.t("noStoreFound")}
                  </Text>
                  <Text
                    style={[
                      { fontSize: (windowWidth * 4) / 100, color: "#75838D" },
                      styles.noAssignstoreText,
                    ]}
                  >
                    {this.state.assignStoreSearchText
                      ? `'${i18n.t("noStoreName")}'${
                          this.state.assignStoreSearchText
                        }'`
                      : i18n.t("pleaseCreateStore")}
                  </Text>
                </View>
              ) : null
            }
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            onPress={this.handleAssignStoreSaveButton}
            style={[styles.saveButtonStyle]}
            testID="assignStoreSaveBtn"
          >
            <Text style={styles.saveButtonText}>{i18n.t("saveDetails")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderAssignStore = () => {
    return <View style={{ flex: 1 }}>{this.renderAssignStoreItem()}</View>;
  };

  // Customizable Area End

  render() {
    // Customizable Area Start

    const buttons =
      this.state.userType !== "stylist_account"
        ? [
            i18n.t("productDetails"),
            i18n.t("updateVarient"),
            i18n.t("uploadImages"),
            i18n.t("assignStore"),
          ]
        : ["Product Details", "Update Variants", "Upload Images"];
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />

          {this.state.loading && <CustomLoader />}
          <View style={styles.viewContainerAssignStore}>
            <View
              style={[
                styles.headerViewMainAssignStore,
                { flexDirection: FlexConditionManage(i18n.language) },
              ]}
            >
              <TouchableOpacity
                testID="btnBackAssignstore"
                style={styles.backTouchAssignstore}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Image
                  resizeMode="contain"
                  source={backIcon}
                  style={[
                    styles.backIconCssAssignstore,
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
                <Text style={styles.headerTitleAssignstore}>
                  {i18n.t("editProduct")}
                </Text>
              </View>
              <TouchableOpacity style={styles.filterIconTouch} />
            </View>

            <View style={styles.topHorizontalScrollingStyle}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection:FlexConditionManage(i18n.language) }}>
                {buttons.map((buttonText, index) => (
                  <TouchableOpacity
                    testID={buttonText}
                    key={index}
                    style={[
                      styles.button,
                      index === this.state.focusedButtonIndex &&
                        styles.focusedButtonstyle,
                    ]}
                    onPress={() => this.handleFocusSelectedView(index)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        index === this.state.focusedButtonIndex && {
                          color: "#375280",
                        },
                      ]}
                    >
                      {buttonText}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View
              style={{
                flex: 1,
                paddingHorizontal: Scale(24),
                paddingBottom: Scale(24),
              }}
            >
              {this.state.focusedButtonIndex === 0 &&
                this.renderProductDetails()}
              {this.state.focusedButtonIndex === 1 &&
                this.renderUpdateVariants()}
              {this.state.focusedButtonIndex === 2 && this.renderUploadImages()}
              {this.state.focusedButtonIndex === 3 && this.renderAssignStore()}
            </View>
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
  // custom style definitions
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  headerViewMainAssignStore: {
    marginHorizontal: Scale(24),
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    alignContent: "center",
  },
  viewContainerAssignStore: {
    flex: 1,
    alignSelf: "center",
    // width: windowWidth * 90 / 100,
  },
  backTouchAssignstore: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  backIconCssAssignstore: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleAssignstore: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },

  button: {
    height: Scale(49),

    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#fff",

    paddingHorizontal: Scale(10),
  },
  uploadImageButton: {
    backgroundColor: "#fff",

    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  buttonText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "600",
    color: "#94A3B8",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(10),
    lineHeight: Scale(18),
  },
  topHorizontalScrollingStyle: {
    marginTop: Scale(7),
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    justifyContent: "center",
    height: Scale(49),
  },
  focusedButtonstyle: {
    borderBottomWidth: 4,
    borderBottomColor: "#375280",
  },
  saveButtonStyle: {
    height: Scale(56),

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    marginTop: Scale(25),
  },
  saveButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(20),
    fontWeight: "800",
    color: "#FFFFFF",

    lineHeight: Scale(26),
  },

  keyboardPadding: { flex: 1 },
  fieldContainer: {
    paddingTop: 16,
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
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

  roleText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#375280",
    lineHeight: Scale(24),
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

  wraper: {
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#CCBEB1",
  },

  defaultStyle: {
    height: 20 * 0.8,
    width: 20 * 0.8,
    borderWidth: 20 * 0.25,
    borderRadius: 20,
  },
  dropdown: {
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    borderRadius: 4,
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
    paddingBottom: 5,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },

  contentText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    color: "#94A3B8",
    paddingBottom: 6,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: Scale(28),
  },

  variantButton: {
    backgroundColor: "#fff",

    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },

  text: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    color: "#375280",
    textAlign: "center",
  },
  blockTitle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "600",
    color: "#375280",
    paddingBottom: 6,
  },
  blockSubTitle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "700",
    color: "#375280",
    marginVertical: 20,
    width: 70,
    marginLeft: Scale(4),
  },
  numberings: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    alignItems: "center",
    justifyContent: "center",
    width: Scale(120),
    height: Scale(40),
    paddingTop: 6,
    color: "#375280",
  },
  blockSunContent: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#E2E8F0",
    width: Scale(54),
    height: Scale(34),

    textAlign: "center",
    color: "#375280",
  },

  variantContainer: {
    flexDirection: "row",
  },
  VarientSubcontainer: {
    flex: 1,
  },

  scrollHorizontal: {
    justifyContent: "space-between",
  },
  insideCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  variantBox: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
  },
  variantsTextContainer: {
    shadowColor: "#E2E8F0",
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#FFF",
    marginVertical: 5,

    borderRadius: 2,
    borderColor: "#E2E8F0",
  },
  seperator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    opacity: 1,
  },

  multitext: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    color: "#94A3B8",
    marginTop: 8,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  variantBodyContainer: {
    flexDirection: "row",

    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  errorMsgContainer: {
    height: (windowHeight * 8) / 100,
    marginTop: (windowWidth * 4) / 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(220, 38, 38, 0.30)",
    backgroundColor: "rgba(254, 226, 226, 0.30)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: Scale(15),
  },
  errorIcon: {
    marginRight: 10,
    width: Scale(27),
    height: Scale(27),
    backgroundColor: "white",
  },
  errorTextContainer: {
    flex: 1,
    marginLeft: Scale(5),
  },
  errorHeading: {
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#DC2626",
    fontFamily: "Lato",
  },
  errorDescription: {
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: "30%",
    backgroundColor: "white",
    paddingBottom: 25,
    justifyContent: "space-between",
  },
  modalTextContainer: {
    padding: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
    color: "#375280",
  },
  modalBodyConatiner: {
    display: "flex",
    flexGrow: 1,
    padding: 10,

    paddingHorizontal: 25,
    borderColor: "#E3E4E5",
    borderWidth: 1,
    borderStyle: "solid",
  },
  modalBodayText: {
    marginLeft: 8,
    color: "#375280",
    fontFamily: "Lato",
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "400",
  },
  buttonsContainerAddProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
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
  variantText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "700",
    color: "#375280",
    marginTop: 16,
  },
  imageContainer: {
    borderRadius: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: Scale(380),
    height: Scale(190),
    marginTop: 16,
    
  },
  uploadedImagesStyle: {
    width: Scale(380),
    height: Scale(189),

    resizeMode: "contain",
    alignSelf: "center",
  },
  emptyImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImgIconView: {
    width: Scale(40),
    height: Scale(40),
  },
  uploadText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "700",
    color: "#375280",
    marginTop: 16,
  },
  uploadSubText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    color: "#94A3B8",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: Scale(10),
  },
  deleteButtonContainer: {
    position: "absolute",
    bottom: Scale(13),

  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  viewsContainer: {
    flexDirection: "row",
  },
  singleViewEditProductContainer: {
    width: 80,
    marginTop: 16,
    marginRight: 9,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  backSideViewEditProductContainer: {
    width: 80,
    marginTop: 16,
    marginRight: 9,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  frontViewImageContainer: {
    height: 80,
    width: 78,
    alignSelf: "center",
  },
  photoViewEditContainer: {
    height: 80,
    width: 80,
  },
  frontPhotoViewContainer: {
    height: 80,
    width: 80,
  },
  photoEditProductViewtext: {
    paddingVertical: 5,
    backgroundColor: "#E2E8F0",
    fontFamily: "Lato-Regular",
    fontSize: Scale(12),
    fontWeight: "500",
    color: "#94A3B8",
    textAlign: "center",
  },
  frontPhotoEditProductViewtext: {
    paddingVertical: 5,
    backgroundColor: "#E2E8F0",
    fontFamily: "Lato-Regular",
    fontSize: Scale(12),
    fontWeight: "500",
    color: "#94A3B8",
    textAlign: "center",
  },

  marginCategoryManage: {
    flex: 1,
    marginTop: (windowWidth * 2) / 100,
  },

  subCateListMainView: {
    flex: 1,

    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },

  noAssignstoreText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  listEmptyContainer: {
    flex: 1,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "70%",
    justifyContent: "center",
  },
  emptyContainerView: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  listEmptyContainerTitleText: {
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  shopMainViewContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  searchIconCss: {
    position: "absolute",
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
    marginTop: (windowWidth * 4) / 100,
    left: (windowWidth * 3) / 100,
  },
  searchTextinput: {
    marginLeft: (windowWidth * 7) / 100,
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    paddingRight: i18n.language === "ar" ? 40 : 0,
    color: "#375280",
  },

  checkBoxImage: {
    width: Scale(22),
    height: Scale(22),
  },
  selectAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Scale(20),
  },
  selectAllItemText: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    lineHeight: Scale(24),
    fontWeight: "600",
  },
  renderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  renderSubLeftContainer: {
    flexDirection: "row",
    flex: 2,
  },
  renderItemText: {
    marginLeft: Scale(15),
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(18),
    lineHeight: Scale(24),
    fontWeight: "600",
    marginTop: 3,
    marginRight: i18n.language === "ar" ? 20 : 0,
  },
  renderItemImage: {
    height: Scale(32),
    width: Scale(32),
    borderRadius: Scale(16),
  },
  assignStoreSeperator: {
    height: 1,
    backgroundColor: "#D9D9D9",
    opacity: 1,
    marginVertical: Scale(22),
  },
});
// Customizable Area End
