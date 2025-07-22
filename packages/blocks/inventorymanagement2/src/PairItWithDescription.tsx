import React from "react";

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
    KeyboardAvoidingView,
  
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, errorIcon } from "./assets";
import { Dropdown } from "react-native-element-dropdown";

import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomSearch from "../../../components/src/CustomSearch";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import PairItWithDescriptionController, {
    Props,
} from "./PairItWithDescriptionController";


// Customizable Area End

export default class PairItWithDescription extends PairItWithDescriptionController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start

    renderDropDown = (
        testId: string,
        value: null | string,
        dropDownpUpdatedValue: (item: { sku: string; id: string }) => void,
        dropdownPosition: "auto" | "bottom" | "top" | undefined,
        dropDownData:any
    ) => {
        return (
            <Dropdown
                testID={testId}
                style={[
                    styles.dropdown,
                    { borderColor: "#F8F8F8" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={dropDownData}
                itemTextStyle={styles.selectedTextStyle}
                
                labelField="sku"
                valueField="id"
                placeholder={i18n.t('selectTheSku')}
                iconStyle={styles.iconStyle}
                iconColor="#375280"
                value={value}
                onChange={dropDownpUpdatedValue}
                inverted={dropdownPosition !== "auto"}
                dropdownPosition={dropdownPosition}
                search
                renderInputSearch={(onSearch) => (
                    <CustomSearch
                        onChangeText={text => {

                            onSearch(text);
                        }}

                        containerStyle={styles.shopMainViewContainer}
                        testID={"searchInputBox"}
                        keyboardType="default"
                        maxLength={30}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        placeholder={i18n.t('searchSku')}
                    />
                )}

            />
        );
    };



    renderPairItWithItem = () => {
        const { errorMsg, firstSelectedSku, secondSelectedSku, thirdSelectedSku, fourthSelectedSku, fifthSelectedSku, selectedVarinatData } = this.state
        return (<View style={styles.marginCategoryManage}>


            <View style={styles.subCateListMainView}>
                <KeyboardAvoidingView
                    behavior={this.isPlatformiOS() ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={10}
                >
                    <ScrollView>


                        <Image style={styles.renderItemImage} source={ImageNotFound(selectedVarinatData?.attributes.front_image)} />
                        <Text style={styles.variantNameHeaderText}>{selectedVarinatData?.attributes.product_name}</Text>
                        <Text style={styles.variantNameDescriptionText}>{selectedVarinatData?.attributes.product_description}</Text>
                        <View>
                            <Text style={styles.addSkuText}>{i18n.t('addSKU')}</Text>
                            {errorMsg.errorHeader.length > 1 && <View style={styles.errorMsgcontainerInPairItWith}>
                                <Image source={errorIcon} style={styles.errorIcon} />
                                <View style={styles.errorTextcontainerInPairItWith}>
                                    <Text style={styles.errorHeading}>{errorMsg.errorHeader}</Text>
                                    <Text style={styles.errorDescription}>{errorMsg.errorTitle}</Text>
                                </View>
                            </View>
                            }


                            <>
                                {this.renderDropDown("firstSku", firstSelectedSku, this.handleSelectFirstSku, "auto",this.fiterTheDropDown([secondSelectedSku,thirdSelectedSku,fourthSelectedSku,fifthSelectedSku]))}
                                {this.renderDropDown("secondSku", secondSelectedSku, this.handleSelectSecondSku, "auto",this.fiterTheDropDown([firstSelectedSku,thirdSelectedSku,fourthSelectedSku,fifthSelectedSku]))}
                                {this.renderDropDown("thirdSku", thirdSelectedSku, this.handleSelectThirdSku, "auto",this.fiterTheDropDown([secondSelectedSku,firstSelectedSku,fourthSelectedSku,fifthSelectedSku]))}
                                {this.renderDropDown("fourthSku", fourthSelectedSku, this.handleSelectFourthSku, "auto",this.fiterTheDropDown([secondSelectedSku,thirdSelectedSku,firstSelectedSku,fifthSelectedSku]))}
                                {this.renderDropDown("fifthSku", fifthSelectedSku, this.handleSelectFifthSku, "auto",this.fiterTheDropDown([secondSelectedSku,thirdSelectedSku,fourthSelectedSku,firstSelectedSku]))}

                            </>
                            </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    testID="saveBtn"
                    style={styles.nextButtonAddproducts}
                    onPress={this.handleSaveButton}
                >
                    <Text style={styles.nextButtonText}>{i18n.t('Save')}</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.safecontainerInPairItWith}>
                <View style={styles.containerInPairItWith}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerPairItWith}>

                        <View style={[styles.headerViewMainPairItWith,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackPairItWith" style={styles.backTouchPairItWith}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssPairItWith,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitlePairItWith}>{i18n.t('pairItWith')}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouch}>

                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1 }}>
                            {this.renderPairItWithItem()}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerInPairItWith: {
        flex: 1,


    },
    safecontainerInPairItWith: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainPairItWith: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    viewContainerPairItWith: {
        flex: 1,
        alignSelf: 'center',
        width: windowWidth * 90 / 100,
    },
    backTouchPairItWith: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssPairItWith: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitlePairItWith: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },





    marginCategoryManage: {
        flex: 1,
        marginTop: windowWidth * 4 / 100
    },


    subCateListMainView: {
        flex: 1,

        width: windowWidth * 90 / 100,
        alignSelf: 'center',
        marginTop: 8,

    },


    noPairItWithText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '500'
    },
    listEmptycontainerInPairItWith: {
        flex: 1,
        width: windowWidth * 90 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: "70%",
        justifyContent: "center"
    },


    listEmptyContainerTitleText: {
        fontSize: windowWidth * 5 / 100,
        fontFamily: 'Avenir-Heavy',
        color: '#375280'
    },
    shopMainViewcontainerInPairItWith: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 3,
        width: windowWidth * 90 / 100,
        alignSelf: 'center',
    },
    searchIconCss: {
        position: 'absolute',
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
        marginTop: windowWidth * 2.8 / 100,
        left: windowWidth * 3 / 100
    },
    searchTextinput: {
        marginLeft: windowWidth * 7 / 100,
        width: windowWidth * 80 / 100,
        height: windowHeight * 6 / 100,
        padding: 10,
        color: '#375280',

    },




    rendercontainerInPairItWith: {
        marginTop: Scale(20),
        flexDirection: 'row',



    },


    renderItemRightContainer: {
        marginLeft: Scale(10),
    }
    , variantNameHeaderText: {

        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: Scale(24),
        lineHeight: Scale(32),
        fontWeight: "700",
        marginVertical: Scale(20),
        alignSelf: "center"
    },
    variantNameDescriptionText: {

        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "400",
        marginBottom: Scale(10),

    },
    addSkuText: {
        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "700",
        marginTop: 3
    },
    renderItemImage: {
        height: Scale(317),
        width: Scale(245),
        borderRadius: Scale(2),
        alignSelf: "center"
    },






    errorMsgcontainerInPairItWith: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 8) / 100,
        marginVertical: (windowWidth * 4) / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderColor: 'rgba(220, 38, 38, 0.30)',
        backgroundColor: 'rgba(254, 226, 226, 0.30)',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: Scale(15),
    },
    errorIcon: {
        marginRight: 10,
        width: Scale(27),
        height: Scale(27),
        backgroundColor: "white"
    },
    errorTextcontainerInPairItWith: {
        flex: 1,
        marginLeft: Scale(5)
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

    dropdown: {
        justifyContent: "center",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 16,
        height: Scale(50),
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10
    },

    placeholderStyle: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        fontWeight: "400",
    },
    selectedTextStyle: {
        flex: 1,
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        paddingRight: 10,
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    nextButtonAddproducts: {
        backgroundColor: "#CCBEB1",
        height: (windowHeight * 6.5) / 100,
        width: "100%",
        borderRadius: 2,
        justifyContent: "center",
        marginBottom: 12
    },
    nextButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Lato-Bold",
        fontSize: (windowWidth * 5) / 100,
        fontWeight: "800",
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#375280',
        fontFamily: 'Lato-Regular',
        fontWeight: '500'
    },
    shopMainViewContainer: {
        marginTop: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
        width: (windowWidth * 80) / 100,
        alignSelf: "center",
    },
});
// Customizable Area End
