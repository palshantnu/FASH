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
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, plusIcon, minusIcon } from "./assets";

import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import CustomButton from "../../../components/src/CustomButton";

import AcceptOrderController, {
    Props,
} from "./AcceptOrderController";


// Customizable Area End

export default class AcceptOrder extends AcceptOrderController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start






    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.safecontainerInAcceptOrder}>
                <View style={styles.containerInAcceptOrder}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerAcceptOrder}>

                        <View style={[styles.headerViewMainAcceptOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackAcceptOrder" style={styles.backTouchAcceptOrder}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAcceptOrder,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleAcceptOrder}>{i18n.t('acceptOrder')}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouch}>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.div} />
                        <View style={[{ flex: 1, }, { paddingHorizontal: Scale(20) }]}>


                            <Text style={styles.areYouSureText}>{i18n.t('areYouSureWantAcceptOrder')}</Text>
                            <Text style={[styles.DropdownLableText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('setOrderProcessingTime')}</Text>
                            <View style={styles.timerContainer}>
                                <TouchableOpacity testID="minusBtn" onPress={this.decreaseTiming} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                                    <Image style={styles.plusIcon} source={minusIcon} />
                                </TouchableOpacity>
                                <Text style={styles.timerText}>{this.state.timing} mins</Text>
                                <TouchableOpacity testID="plusBtn" onPress={this.increaseTiming} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                                    <Image style={styles.plusIcon} source={plusIcon} />
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={[styles.row, styles.btns, { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) }]}>
                            <CustomButton
                                testID="closeBtn"
                                title={i18n.t('close')}
                                style={styles.confirmBtn}
                                textStyle={styles.rejTxt}
                                onPress={this.goBackToOrderSummaryScreen}
                            />
                            <CustomButton
                            testID="confirmBtn"
                                title={i18n.t('confirm')}
                                style={styles.accButton}
                                textStyle={styles.accTxt}
                                onPress={this.updateTheStatus}
                            />
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
    containerInAcceptOrder: {
        flex: 1,
    },
    safecontainerInAcceptOrder: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainAcceptOrder: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: Scale(20)
    },
    viewContainerAcceptOrder: {
        flex: 1,

    },
    backTouchAcceptOrder: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssAcceptOrder: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleAcceptOrder: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },



    errorMsgcontainerInAcceptOrder: {
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

    errorTextcontainerInAcceptOrder: {
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
    errorIcon: {
        marginRight: 10,
        width: Scale(27),
        height: Scale(27),
        backgroundColor: "white"
    },
    errorDescription: {
        fontSize: Scale(16),
        fontWeight: "400",
        color: "#DC2626",
        fontFamily: "Lato",
        lineHeight: 24,
    },

    timerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 16,
        height: Scale(50),
        alignItems: "center",
        borderRadius: 4,
        marginVertical: 10

    },

    placeholderStyle: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        fontWeight: "400",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
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

    btns: {
        paddingVertical: Scale(35),

    },
    accTxt: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },

    confirmBtn: {
        flex: 1,
        marginRight: Scale(10),
        borderRadius: Scale(2),
        backgroundColor: "#FFFFFF",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#CCBEB1",
    },
    accButton: {
        flex: 1,
        borderRadius: Scale(2),
    },
    div: {
        height: Scale(1),
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 0,
        marginTop: Scale(25)
    },
    rejTxt: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },

    areYouSureText: {
        color: "#375280",
        fontWeight: "400",
        fontSize: 16,
        fontFamily: "Lato-Regular",
        marginVertical: Scale(25),
        textAlign: "center"
    },
    DropdownLableText: {
        color: "#375280",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Bold",
        textAlign: "left"
    },
    timerText: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 18,
        fontFamily: "Lato-Regular"
    },
    plusIcon: {
        height: Scale(20),
        width: Scale(20),
        resizeMode: "contain"
    },


});
// Customizable Area End
