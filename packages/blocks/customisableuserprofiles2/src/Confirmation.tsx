import React from "react";
import {
    // Customizable Area Start
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    // Customizable Area End
} from "react-native";
// Customizable Area Start
import RequirementFormController, { Props } from "./RequirementFormController";
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

export default class Confirmation extends RequirementFormController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start
    headerContainer() {
        return (
            <View style={[styles.containerView, globalStyle.headerMarginManage]}>
                <View style={[styles.headerView, { flexDirection: FlexConditionManage(i18n.language) }]}>
                    <TouchableOpacity testID="btnConfirm" style={styles.backTouch} onPress={this.navigateToStylishProfile} >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIcon, {
                            transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]
                        }]}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAll}>{i18n.t("confirmation")}</Text>
                    </View>
                    <View style={styles.extraSpaceView} />
                </View>
            </View>
        )
    }

    confirmationContainer() {
        return (
            <View style={styles.confirmView}>
                <Text style={styles.congratulaText}>{i18n.t("congratulations")}</Text>
                <Text style={styles.descriptText}>{i18n.t("confirmationMsg")}</Text>
            </View>
        )
    }

    btnContainer() {
        return (
            <TouchableOpacity
                onPress={this.navigateToMyRequest}
                testID="requestButton"
                style={styles.addButton}>
                <Text style={styles.addText}>{i18n.t("myRequests")}</Text>
            </TouchableOpacity>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <View style={styles.mainContainer}>
                <SafeAreaView style={styles.safeViewContainer} />
                <StatusBar barStyle="dark-content" />
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
                {this.headerContainer()}
                {this.confirmationContainer()}
                {this.btnContainer()}
            </View>
        );
        // Customizable Area End
    }

}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainer: {
        backgroundColor: '#ffffff',
        flex: 0,
    },
    mainContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    containerView: {
        alignSelf: 'center',
        width: windowWidth * 90 / 100,
    },
    headerView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center'
    },
    backTouch: {
        width: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100,
        height: windowWidth * 6 / 100,
    },
    backIcon: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100
    },
    extraSpaceView: {
        justifyContent: 'center',
    },
    headerTitleAll: {
        color: '#375280',
        textAlign: 'center',
        fontSize: windowWidth * 5 / 100,
        fontFamily: 'Avenir-Heavy'
    },
    congratulaText: {
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        textAlign: 'center',
        color: '#375280',
        fontFamily: 'Lato-Bold',
        lineHeight: 24
    },
    descriptText: {
        textAlign: 'center',
        color: '#375280',
        fontFamily: 'Lato-regular',
        lineHeight: 24,
        fontSize: 16,
        fontWeight: '400',
        marginTop: verticalScale(14)
    },
    addButton: {
        backgroundColor: "#CCBEB1",
        height: verticalScale(62),
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: verticalScale(12),
        marginHorizontal: Scale(17)
    },
    addText: {
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '800'
    },
    confirmView: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        marginHorizontal: Scale(8)
    }
});
// Customizable Area End
