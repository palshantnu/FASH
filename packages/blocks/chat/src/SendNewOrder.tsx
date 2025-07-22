import React from "react";

// Customizable Area Start
import {
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomTextInput from "../../../components/src/CustomTextInput";
import { Dropdown } from "react-native-element-dropdown";
import { uploadPhotos } from "./assets";
const { width } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import i18n from "../../../components/src/i18n/i18n.config";
import { t } from "i18next";
// Customizable Area End

import SendNewOrderController, {
    Props
} from "./SendNewOrderController";
import { upload } from "../../email-account-registration/src/assets";

export default class SendNewOrder extends SendNewOrderController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderInputComponents = (item: any) => {
        return (
            <View>
                <View style={{ marginTop: verticalScale(14) }}>
                    <CustomTextInput
                        label={item.heading}
                        placeholderTextColor="#375280"
                        placeholder={item.inputTxt}
                        onChangeText={(value) => this.onChangeInputValues(value, item.key)}
                        value={this.state.productData[item.key] || ''}
                        style={styles.productTxtinput}
                        testID="changeInputValue"
                        language={i18n.language}
                    />
                </View>
            </View>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={this.isPlatformiOS() ? "padding" : undefined}>
                    <CustomHeader
                        title={i18n.t("newOrderRequest")}
                        onLeftPress={() => { this.goBackBtn() }}
                        leftTestId="goBackButton"
                    />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginHorizontal: Scale(24), marginTop: verticalScale(14) }}
                    >
                        <CustomTextInput
                            label={t("productName")}
                            placeholderTextColor="#375280"
                            placeholder={t("productNameHere")}
                            onChangeText={(value: string) => { this.onProductNameChange(value) }}
                            value={this.state.productName}
                            style={styles.productTxtinput}
                            testID="productName"
                            language={i18n.language}
                        />

                        <CustomTextInput
                            label={t("productDescription")}
                            placeholderTextColor="#375280"
                            placeholder={t("productDescriptionHere")}
                            onChangeText={(value: string) => { this.onProductDescriptionChange(value) }}
                            value={this.state.productDescription}
                            style={[styles.productTxtinput, {height: (windowHeight * 15) / 100,}]}
                            testID="productDescription"
                            multiline={true}
                            numberOfLines={10}
                            language={i18n.language}
                        />

                        <View style={{ marginTop: (windowHeight * 12) / 100 }}>
                            <Text style={styles.selectRsn}>{i18n.t("gender")}</Text>

                        <Dropdown
                            testID="dropDown"
                            style={[
                                styles.dropdown, 
                                this.state.isFocus && { borderColor: '#F7F7F7' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={[
                                styles.iconStyle, 
                                i18n.language === 'ar' && { position: 'absolute', left: 10, right: 'auto' }
                            ]}
                            data={this.gender}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            itemTextStyle={styles.inputTxtStyle}
                            itemContainerStyle={{ backgroundColor: "#F7F7F7" }}
                            placeholder={this.state.value === null ? i18n.t("selectGender") : this.state.value}
                            value={this.state.value}
                            onFocus={() => { this.onFocusBtn() }}
                            onBlur={() => { this.onBlurBtn() }}
                            onChange={item => { this.onChangeDropBtn(item) }}
                        />
                        </View>

                        <FlatList
                            data={this.inputComponent}
                            renderItem={({ item }) => this.renderInputComponents(item)}
                            keyExtractor={(item) => item.key.toString()}
                            testID="renderInputComp"
                        />

                        <View style={{ marginTop: verticalScale(16) }}>
                            <Text style={styles.photoTxt}>
                                {i18n.t("productDisplayImage")}
                            </Text>

                            <TouchableOpacity
                                onPress={() => { this.mediaUploadPortfolio() }}
                                style={styles.emptyImagePortfolioContainer}
                                activeOpacity={0.8}
                                testID="MediaUploadPortfolio">
                                {this.state.profilePhotoDetails.uri === "" ?
                                <>
                                    <Image
                                    source={upload}
                                    style={styles.multiplePhotos}
                                    resizeMode="contain"
                                />
                                <Text style={styles.uploadImage}>{i18n.t("onlyPNGAndJPEG")}</Text>
                                </>
                                :
                                <Image
                                    source={{uri: this.state.profilePhotoDetails.uri}}
                                    style={styles.emptyImagePortfolioContainer}
                                    resizeMode="cover"
                                />
                            }
                                                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity  disabled={this.shouldDisableButton()} onPress={() => { this.sendNewRequest() }} testID="sendRequest">
                            <View style={styles.btnView}>
                                <Text style={styles.btnTxt}>{i18n.t("sendRequest")}</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.mediaModal}>
                    <View style={styles.portfolioDetailsMediaModalMainView}>
                        <SafeAreaView style={styles.portfolioDetailsMediaModalFlexManage}></SafeAreaView>
                        <View style={styles.portfolioDetailsCameraModalMainViewDriver}>
                            <View style={styles.portfolioDetailsMediaModalAfterView}>
                                <TouchableOpacity
                                    style={styles.portfolioDetailsCameraModalTouchDriver}
                                    onPress={() => { this.openCamera() }}
                                    testID="OpenCamera"
                                >
                                    <View style={styles.portfolioDetailsCameraModalViewDriver}>
                                        <Text style={styles.portfolioDetailsCameraModalTextDriver}>{i18n.t("cameraText")}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.portfolioDetailsCameraModalTouchDriver, { marginTop: 10 }]}
                                    onPress={() => { this.openGallery() }}
                                    testID="OpenGallery"
                                >
                                    <View style={styles.portfolioDetailsCameraModalViewDriver}>
                                        <Text style={styles.portfolioDetailsCameraModalTextDriver}>{i18n.t("galleryText")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.portfolioDetailsCameraModalCancelViewDriver}>
                                <TouchableOpacity
                                    onPress={() => { this.closeDetailsPickerModal() }}
                                    style={styles.portfolioDetailsCameraModalCancelTouchDriver}
                                    testID="CloseDetailsPickerModal">
                                    <Text style={styles.portfolioDetailsCameraModalCancelTextDriver}>{i18n.t("cancelText")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    productTxtinput: {
        backgroundColor: "#F7F7F7",
        fontSize: 18,
        fontWeight: "400",
        fontFamily: "Lato",
        color: "#375280"
    },
    selectRsn: {
        fontSize: Scale(16),
        fontFamily: "Lato-Bold",
        fontWeight: '900',
        color: "#375280",
    },
    uploadImage: {
        fontSize: Scale(15),
        fontWeight: '300',
        color: "#375280",
        marginTop:8
    },
    dropdown: {
        height: 50,
        borderColor: '#F7F7F7',
        borderWidth: 0.5,
        borderRadius: 2,
        paddingHorizontal: 8,
        marginTop: verticalScale(10),
        backgroundColor: "#F7F7F7"
    },
    icon: {
        marginRight: Scale(10),
    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '400',
        color: "#375280",
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '400',
        color: "#375280",
    },
    iconStyle: {
        width: 24,
        height: 24,
        tintColor: "#375280"
    },
    inputTxtStyle: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '400',
        color: "#375280",
    },
    emptyImagePortfolioContainer: {
        borderRadius: 2,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        width: Scale(380),
        height: Scale(185),
        marginTop: 20
    },
    multiplePhotos: {
        backgroundColor: "#F7F7F7",
        width:windowWidth*8/100,
        height:windowWidth*8/100
    },
    photoTxt: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
        color: "#375280"
    },
    portfolioDetailsMediaModalMainView: {
        flex: 1,
        backgroundColor: '#00000030',
        alignItems: 'center'
    },
    portfolioDetailsMediaModalAfterView: {
        alignSelf: 'center',
        width: '100%'
    },
    portfolioDetailsMediaModalFlexManage: {
        flex: 0
    },
    portfolioDetailsCameraModalTouchDriver: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    portfolioDetailsCameraModalViewDriver: {
        width: '94%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingVertical: windowWidth * 3.5 / 100
    },
    portfolioDetailsCameraModalTextDriver: {
        textAlign: 'center',
        fontSize: windowWidth * 4 / 100,
        color: '#000000'
    },
    portfolioDetailsCameraModalCancelViewDriver: {
        marginTop: 15,
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: '#0061A7',
        width: '94%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    portfolioDetailsCameraModalCancelTouchDriver: {
        alignSelf: 'center',
        width: '94%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: windowWidth * 3.5 / 100
    },
    portfolioDetailsCameraModalCancelTextDriver: {
        fontSize: windowWidth * 4 / 100,
        color: '#FFFFFF'
    },
    portfolioDetailsCameraModalMainViewDriver: {
        position: 'absolute',
        bottom: windowHeight * 3 / 100,
        width: windowWidth
    },
    btnView: {
        backgroundColor: "#C7B9AD",
        padding: 20,
        marginBottom: verticalScale(24),
        marginTop: verticalScale(24)
    },
    btnTxt: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '800',
        color: "#FFFFFF",
        textAlign: "center"
    },
});
// Customizable Area End
