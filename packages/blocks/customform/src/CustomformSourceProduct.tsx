import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
  Keyboard,
  Modal,
} from "react-native";

import Scale from "../../../components/src/Scale";

import { backIcon, uploadIcon } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Dropdown } from "react-native-element-dropdown";
import globalStyle from "../../../components/src/GlobalStyle";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import CustomformSourceProductController, {
  Props,
} from "./CustomformSourceProductController";

export default class CustomformSourceProduct extends CustomformSourceProductController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerSourceProduct, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="btnBackDriverVehicleUpload"
        style={styles.backTouchFormSourceProduct}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[{ transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }, styles.backIconFormSourceProductBack]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitleFormSourceProduct}>{i18n.t("Source Product")}</Text>
      </View>
      <View style={styles.extraViewFormSourceProduct} />
    </View>
  );

  renderDropDown = (
    data: { label: string; value: string }[],
    placeholder: string,
    gender: string | null,
    dropDownpUpdatedValue: (item: { label: string; value: string }) => void,
    isErrorMsg: boolean,
    fetchData?: () => void
  ) => {
    return (
      <Dropdown
        testID={placeholder}
        itemTestIDField="label"
        style={[
          {
            borderWidth: this.state.productDescriptionError ? 1 : 0,
            borderColor: this.checkBoarderColor(
              this.state.productDescriptionError
            ),
          },
          styles.Input,
        ]}
        placeholderStyle={[styles.placeholderStyle, { textAlign: TextAlignManage(i18n.language) }]}
        selectedTextStyle={[styles.selectedTextStyle, { textAlign: TextAlignManage(i18n.language) }]}
        data={data}
        itemTextStyle={[styles.selectedTextStyle, { textAlign: TextAlignManage(i18n.language) }]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconColor="#375280"
        value={gender}
        onChange={dropDownpUpdatedValue}
        onFocus={fetchData}
      />
    );
  };

  renderGenderBlock = () => {
    const data = [
      { label: i18n.t("Male"), value: "Male" },
      { label: i18n.t("Female"), value: "Female" },
      { label: i18n.t("Other"), value: "Other" },
    ];
    let errorMsg = !this.isEmpty(this.state.genderErrorMsg);
    return (
      <View style={styles.storeCreateMainViewSourceProduct}>
        <Text style={[styles.labelTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Gender")} *</Text>
        {this.renderDropDown(
          data,
          i18n.t("Select Gender"),
          this.state.gender,
          this.handleSelctGender,
          errorMsg
        )}
        {errorMsg && (
          <View style={styles.errorView} testID="genderError">
            <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.genderErrorMsg}</Text>
          </View>
        )}
      </View>
    );
  };


  renderInputField(
    label: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    error: boolean,
    errorMessage: string,
    value: string,
    keyboardType: "default" | "numeric" = "default"
  ) {
    return (
      <>
        <Text style={[styles.labelTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{label}</Text>
        <TextInput
          testID={`${label}-input`}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          returnKeyLabel="done"
          returnKeyType="done"
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          placeholder={placeholder}
          placeholderTextColor={"#9A9A9A"}
          multiline={label === `${i18n.t("Product Description")} *`}
          numberOfLines={label === `${i18n.t("Product Description")} *` ? 10 : 1}
          style={[
            {
              textAlign: TextAlignManage(i18n.language),
              borderWidth: error ? 1 : 0,
              borderColor: this.checkBoarderColor(error),
              width:
                label === `${i18n.t("Min Price")} *` || label === `${i18n.t("Max Price")} *`
                  ? (windowWidth * 40) / 100
                  : (windowWidth * 90) / 100,
              textAlignVertical:
                label === `${i18n.t("Product Description")} *` ? "top" : "center",
            },
            styles.Input,
            label === `${i18n.t("Product Description")} *` && styles.storeDescriptionInput,
          ]}
          value={value}
        />
        {error && (
          <View style={styles.errorView} testID={`${label}-Error`}>
            <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language) }]}>{errorMessage}</Text>
          </View>
        )}
      </>
    );
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        testID="cameraModalCheck"
        visible={this.state.mediamodal}
      >
        <View style={styles.modalMainView}>
          <SafeAreaView style={styles.modalSafe} />
          <View style={styles.cameraModalMainViewAdd}>
            <View style={styles.modalSecondView}>
              <TouchableOpacity
                testID={"btn_camera"}
                style={styles.cameraModalTouchAdd}
                activeOpacity={0.9}
                onPress={() => {
                  this.Camerapopen();
                }}
              >
                <View style={styles.cameraModalViewAdd}>
                  <Text style={styles.cameraModalTextAdd}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btn_gallery"}
                style={[styles.cameraModalTouchAdd, { marginTop: 10 }]}
                onPress={() => {
                  this.Galleryopen();
                }}
              >
                <View style={styles.cameraModalViewAdd}>
                  <Text style={styles.cameraModalTextAdd}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cameraModalCancelViewAdd}>
              <TouchableOpacity
                testID={"btn_cancelMedia"}
                onPress={() => {
                  this.closeCameraGallery();
                }}
                style={styles.cameraModalCancelTouch}
              >
                <Text style={styles.cameraModalCancelTextAdd}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderImageUploader() {
    return (
      <View style={styles.storeCreateMainViewSourceProduct}>
        {this.state.selectImage !== "" ? (
          <View>
            <View style={styles.uploadStoreImageViewSelectedVehicle}>
              <Image
                testID="uploadImageTest"
                source={{ uri: this.state.selectImage }}
                style={styles.uploadStoreImageViewSelectedVehicle}
              />
              <View style={styles.manageMarginVehicle}>
                <TouchableOpacity
                  testID="btnRetakePhoto"
                  style={styles.btnRetakeButtonVehicle}
                  onPress={() => {
                    this.openCameraGallery("first");
                  }}
                >
                  <Text style={styles.retakeButtonTextVehicle}>
                    {i18n.t('Retake Photo')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={[styles.exportTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Attachments")} *</Text>
            <TouchableOpacity
              testID="btnAttachmentOpen"
              style={styles.uploadStoreImageView}
            >
              <TouchableOpacity
                testID="btnUploadProductImage"
                onPress={() => {
                  this.openCameraGallery("first");
                }}
              >
                <Image
                  source={uploadIcon}
                  style={[
                    styles.backIconFormSourceProductBack,
                    { alignSelf: "center" },
                  ]}
                />
                <Text style={styles.exportTextVehicle}>
                  {i18n.t("Upload png, jpg, jpeg")}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
        {this.state.selectImageError && (
          <View style={styles.errorView}>
            <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.photoErrorMessage}</Text>
          </View>
        )}
      </View>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="customformSourceProduct">
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
            styles.containerViewCustomformSourceProduct,
            globalStyle.headerMarginManage,
          ]}
        >
          <this.Header />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={styles.storeCreateMainViewSourceProduct}>
              {this.renderInputField(
                `${i18n.t("Product Name")} *`,
                this.updateProductName,
                i18n.t("Enter Product Name"),
                this.state.productNameError,
                this.state.productNameErrorMessage,
                this.state.productName
              )}
              {this.renderInputField(
                `${i18n.t("Product Description")} *`,
                this.updateProductDescription,
                i18n.t("Enter Product Description"),
                this.state.productDescriptionError,
                this.state.productDescriptionErrorMessage,
                this.state.productDescription
              )}
              {this.renderInputField(
                `${i18n.t("Product Colour")} *`,
                this.updateProductColor,
                i18n.t("Black, Blue, Red, White"),
                this.state.productColorError,
                this.state.productColorErrorMessage,
                this.state.productColor
              )}
              {this.renderInputField(
                `${i18n.t("Product Sizes")} *`,
                this.updateProductSizes,
                i18n.t("Medium , Large"),
                this.state.productSizesError,
                this.state.productSizesErrorMessage,
                this.state.productSizes
              )}
              <View style={[styles.row, { flexDirection: FlexConditionManage(i18n.language) }]}>
                <View style={{ flex: 1, marginRight: (windowWidth * 5) / 100 }}>
                  {this.renderInputField(
                    `${i18n.t("Min Price")} *`,
                    this.updateMinPrice,
                    i18n.t("Enter Min Price"),
                    this.state.minPriceError,
                    this.state.minPriceErrorMessage,
                    // `${PriceConvertValue(this.state.minPrice, this.state.localCurrency)}`,
                    this.manageCurrencyValue(),
                    "numeric"
                  )}
                </View>
                <View style={{ flex: 1, marginLeft: (windowWidth * 5) / 100 }}>
                  {this.renderInputField(
                    `${i18n.t("Max Price")} *`,
                    this.updateMaxPrice,
                    i18n.t("Enter Max Price"),
                    this.state.maxPriceError,
                    this.state.maxPriceErrorMessage,
                    this.manageCurrencyValueMax(),
                    "numeric"
                  )}
                </View>
              </View>
              {this.renderInputField(
                `${i18n.t("Product Quantity")} *`,
                this.updateQuantity,
                i18n.t("Enter Product Quantity"),
                this.state.quanntityError,
                this.state.quanntityErrorMessage,
                this.state.quantity,
                "numeric"
              )}
              {this.renderGenderBlock()}
              {this.renderImageUploader()}

              <TouchableOpacity
                testID="btnSubmitButton"
                style={styles.submitbutton}
                onPress={() => this.sendDataToAPI()}
              >
                <Text style={styles.submitButtonText}>{i18n.t('Submit')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {this.renderModal()}
        </View>
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
  containerViewCustomformSourceProduct: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sb: {
    justifyContent: "space-between",
  },
  body: {
    padding: Scale(20),
  },
  menuBtn: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  priceText: {
    fontSize: 18,
    marginTop: 7,
    fontWeight: "500",
    color: "#375280",
  },
  headerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "700",
    color: "#375280",
    lineHeight: 26,
    marginHorizontal: Scale(12),
  },
  storeDescriptionInput: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 15) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily: 'Lato-Regular',
    color: '#375280'
  },
  subTitleTextVehicle: {
    color: "#94A3B8",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 3) / 100,
  },
  bell: {
    margin: Scale(4),
    height: Scale(18),
    width: Scale(18),
    resizeMode: "contain",
  },
  reviewTxt: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato",
    textAlign: "center",
  },
  storeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(16),
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 1,
  },
  selectStoreText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 26,
    fontFamily: "Lato",
    color: "#375280",
  },
  nextIcon: {
    height: Scale(24),
    marginTop: Scale(2),
    width: Scale(26),
  },
  headerSourceProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconFormSourceProductBack: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleFormSourceProduct: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  extraViewFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  storeCreateMainViewSourceProduct: {
    marginTop: (windowWidth * 4) / 100,
  },
  labelTextVehicle: {
    marginTop: (windowWidth * 4) / 100,
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 3.9) / 100,
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
  errorView: {
    marginTop: (windowWidth * 1) / 100,
  },
  errorText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
  },
  submitbutton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 5) / 100,
    borderRadius: 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: (windowWidth * 7) / 100,
  },
  cameraModalTouchAdd: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraModalViewAdd: {
    width: "94%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: (windowWidth * 3.5) / 100,
  },
  cameraModalTextAdd: {
    textAlign: "center",
    fontSize: (windowWidth * 4) / 100,
    color: "#000000",
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
    paddingVertical: (windowWidth * 3.5) / 100,
  },
  retakeButtonTextVehicle: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4.5) / 100,
    fontWeight: "500",
  },
  cameraModalCancelTextAdd: {
    fontSize: (windowWidth * 4) / 100,
    color: "#FFFFFF",
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000030",
    alignItems: "center",
  },
  cameraModalMainViewAdd: {
    position: "absolute",
    bottom: (windowHeight * 3) / 100,
    width: windowWidth,
  },
  modalSecondView: {
    alignSelf: "center",
    width: "100%",
  },
  modalSafe: {
    flex: 0,
  },
  btnRetakeButtonVehicle: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#CCBEB1",
    borderWidth: 1,
  },
  uploadStoreImageViewSelectedVehicle: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 40) / 100,
    backgroundColor: "#F8F8F8",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadStoreImageView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 20) / 100,
    backgroundColor: "#F8F8F8",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  exportIcon: {
    width: (windowWidth * 10) / 100,
    height: (windowWidth * 10) / 100,
  },
  manageMarginVehicle: {
    position: "absolute",
    bottom: 15,
  },
  mainViewMarginVehicle: {
    marginTop: (windowWidth * 4) / 100,
  },
  exportTextVehicle: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
    marginTop: (windowWidth * 3) / 100,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 4.5) / 100,
    marginLeft: (windowWidth * 2) / 100,
  },
});
// Customizable Area End
