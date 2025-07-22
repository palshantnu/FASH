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
    Modal,
    TextInput,
    Keyboard
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon, deleteButton, uploadIcon } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import BidYourQuoteController, {
    Props,
} from "./BidYourQuoteController";
export default class BidYourQuote extends BidYourQuoteController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    Header = () => (
        <View style={[styles.header, { flexDirection: FlexConditionManage(i18n.language) }]} testID="headerArea">
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
                    style={[styles.backIcon, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] },]}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerTitle}>
                    {i18n.t("Bid Your Quote")}
                </Text>
            </View>
            <View style={styles.extraView} />
        </View>
    );

    renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                testID="cameraModalCheck"
                visible={this.state.camModal}
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
                                    this.OpenCamera();
                                }}
                            >
                                <View style={styles.cameraModalViewAdd}>
                                    <Text style={styles.cameraModalTextAdd}>{i18n.t("Camera")}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                testID={"btn_gallery"}
                                style={[styles.cameraModalTouchAdd, { marginTop: 10 }]}
                                onPress={() => {
                                    this.OpenGallery();
                                }}
                            >
                                <View style={styles.cameraModalViewAdd}>
                                    <Text style={styles.cameraModalTextAdd}>{i18n.t("Gallery")}</Text>
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
                                <Text style={styles.cameraModalCancelTextAdd}>{i18n.t("Cancel")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    renderDescriptionInput = () => {
        return (
            <>
                <Text style={[styles.exportTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Product Description")} *</Text>
                <TextInput
                    testID={`Description-input`}
                    onChangeText={this.updateProductDescription}
                    keyboardType={"default"}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    // onSubmitEditing={() => {
                    //     Keyboard.dismiss();
                    // }}
                    placeholder={i18n.t("Enter Product Description")}
                    placeholderTextColor={"#9A9A9A"}
                    multiline={true}
                    numberOfLines={10}
                    style={[
                        {
                            textAlign: TextAlignManage(i18n.language),
                            borderWidth: this.state.productDescriptionError ? 1 : 0,
                            borderColor: this.state.productDescriptionError ? "red" : "#A9A9A9",
                            width: (windowWidth * 90) / 100,
                            textAlignVertical: "top",
                        },
                        styles.Input,
                        styles.storeDescriptionInput,
                    ]}
                    value={this.state.productDescription}
                />
                {this.state.productDescriptionError && (
                    <View style={styles.errorView} testID={`Description-Error`}>
                        <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language), }]}>{this.state.productDescriptionErrorMessage}</Text>
                    </View>
                )}
            </>
        )
    }

    renderQuotePriceInput = () => {
        return (
            <>
                <Text style={[styles.exportTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Quote Price")} *</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Text style={styles.priceText}>
                    $
                </Text> */}
                    <TextInput
                        testID={`Price-input`}
                        onChangeText={this.updateQuotePrice}
                        keyboardType={"numeric"}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        // onSubmitEditing={() => {
                        //     Keyboard.dismiss();
                        // }}
                        placeholder={i18n.t("Enter quote price")}
                        placeholderTextColor={"#9A9A9A"}
                        style={[
                            {
                                textAlign: TextAlignManage(i18n.language),
                                borderWidth: this.state.quotePriceError ? 1 : 0,
                                borderColor: this.state.quotePriceError ? "red" : "#A9A9A9",
                                width: (windowWidth * 90) / 100,
                            },
                            styles.Input,
                        ]}
                        value={this.state.quotePrice==="" ? this.state.localCurrency : `${this.manageCurrencyValue(this.state.quotePrice, this.state.localCurrency)}`}
                    />
                </View>
                {this.state.quotePriceError && (
                    <View style={styles.errorView} testID={`Price-Error`}>
                        <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language), }]}>{this.state.quotePriceErrorMessage}</Text>
                    </View>
                )}
            </>
        )
    }

    renderImageUploader() {
        return (
            <View style={styles.storeCreateMainViewSourceProduct}>
                <View>
                    <Text style={[styles.exportTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Attachments")} *</Text>
                    <View
                        testID="btnAttachmentOpen"
                        style={styles.uploadStoreImageView}
                    >
                        <TouchableOpacity
                            testID="btnUploadProductImage"
                            onPress={() => {
                                this.openCameraGallery();
                            }}
                            style={this.state.images.length >= 5 && styles.disabledButton}
                            disabled={this.state.images.length >= 5}
                        >
                            <Image
                                source={uploadIcon}
                                style={[
                                    styles.backIcon,
                                    { alignSelf: "center" },
                                ]}
                            />
                            <Text style={[styles.exportTextVehicle, { textAlign: TextAlignManage(i18n.language) }]}>
                                {i18n.t("Upload png, jpg, jpeg")}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.contentText}>
                            {i18n.t("You can attach up to 5 images.")}
                        </Text>
                    </View>
                </View>
                {
                    this.state.imageError &&
                    <View style={styles.errorView} testID={`image-error`}>
                        <Text style={[styles.errorText, { textAlign: TextAlignManage(i18n.language), }]}>{this.state.imageErrorMessage}</Text>
                    </View>
                }
                {
                    this.state.selectedImage.length > 0 &&
                    <View style={{ flexDirection: FlexConditionManage(i18n.language), marginTop: 10, flexWrap: 'wrap' }}>
                        {
                            this.state.selectedImage.map((image, index) => (
                                <View>
                                    <Image
                                        key={index}
                                        style={{ width: 80, height: 80, marginRight: 10, marginBottom: 10 }}
                                        source={{ uri: image }}
                                    />
                                    <TouchableOpacity
                                        testID="btnDeleteImage"
                                        onPress={() => {
                                            this.removeImage(index);
                                        }}
                                        style={{ position: 'absolute', right: 4 }}
                                    >
                                        <Image
                                            source={deleteButton}
                                            style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                }
            </View>
        );
    }

    // Customizable Area End
    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container} testID="BidYourQuote">
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
                        styles.bodyView,
                        globalStyle.headerMarginManage,
                    ]}
                >
                    <this.Header />
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        {this.renderDescriptionInput()}
                        {this.renderQuotePriceInput()}
                        {this.renderImageUploader()}
                    </ScrollView>
                    <TouchableOpacity
                        testID={`submitButton`}
                        style={styles.submitButton}
                        onPress={() => this.handleSubmit()}
                    >
                        <Text style={styles.submitText}> {i18n.t("Submit")}</Text>
                    </TouchableOpacity>
                </View>
                {this.renderModal()}
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
    modalSafe: {
        flex: 0,
    },
    backTouch: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
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
    contentText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: '#94A3B8',
        paddingBottom: 6,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "flex-end",
    },
    errorText: {
        color: "#F87171",
        fontFamily: "Lato-Regular",
        fontSize: (windowWidth * 3.9) / 100,
    },
    errorView: {
        marginTop: (windowWidth * 1) / 100,
    },
    disabledButton: {
        opacity: 0.5,
    },
    cameraModalViewAdd: {
        width: "94%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingVertical: (windowWidth * 3.5) / 100,
    },
    cameraModalTouchAdd: {
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
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
    Input: {
        height: (windowHeight * 6.5) / 100,
        padding: 7,
        marginTop: 7,
        borderRadius: 5,
        backgroundColor: "#F8F8F8",
        fontFamily: "Lato-Regular",
        color: "#375280",
    },
    cameraModalTextAdd: {
        textAlign: "center",
        fontSize: (windowWidth * 4) / 100,
        color: "#000000",
    },
    cameraModalCancelTouch: {
        alignSelf: "center",
        width: "94%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: (windowWidth * 3.5) / 100,
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: (windowWidth * 3) / 100,
        marginBottom: (windowWidth * 3) / 100,
    },
    extraView: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
    },
    backIcon: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
    },
    cameraModalCancelTextAdd: {
        fontSize: (windowWidth * 4) / 100,
        color: "#FFFFFF",
    },
    retakeButtonTextVehicle: {
        color: "#375280",
        textAlign: "center",
        fontFamily: "Lato-Regular",
        fontSize: (windowWidth * 4.5) / 100,
        fontWeight: "500",
    },

    modalMainView: {
        flex: 1,
        backgroundColor: "#00000030",
        alignItems: "center",
    },
    headerTitle: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        fontWeight: "800",
    },
    bodyView: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 90) / 100,
        alignSelf: "center",
    },
    storeCreateMainViewSourceProduct: {
        marginTop: (windowWidth * 4) / 100,
    },
    exportTextVehicle: {
        color: "#375280",
        fontFamily: "Lato-Bold",
        fontSize: (windowWidth * 4) / 100,
        marginTop: (windowWidth * 3) / 100,
    },
    uploadStoreImageView: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 20) / 100,
        backgroundColor: "#F8F8F8",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    priceText: {
        fontSize: 18,
        marginTop: 7,
        fontWeight: "500",
        color: "#375280",
    },
    submitButton: {
        position: "absolute",
        bottom: 10,
        backgroundColor: "#CCBEB1",
        width: (windowWidth * 90) / 100,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: (windowWidth * 2) / 100,
        padding: 16,
        alignSelf: "flex-end",
        alignContent: 'flex-end'
    },
    submitText: {
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 26,
    },
});
// Customizable Area End