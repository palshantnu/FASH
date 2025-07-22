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
    StatusBar,
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
// Customizable Area End

import StylistPlanSuccessController, {
    Props,
} from "./StylistPlanSuccessController";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";

export default class StylistPlanSuccess extends StylistPlanSuccessController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    // Header
    Header = () => (
        <View style={[styles.headerPlanSuccess, {flexDirection : FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
                testID="backButtonID"
                style={styles.backTouch}
                onPress={() => {
                    this.props.navigation.pop(2);
                }}
            >
                <Image
                    resizeMode="contain"
                    source={backIcon}
                    style={[styles.backIconPS, { transform: [{ scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) } ] }]}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerTitle}>
                    {i18n.t("confirmation")}
                </Text>
            </View>
            <View style={styles.extraView} />
        </View>
    );

    // Customizable Area End
    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container} testID="StylistPlanSuccess">
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
                    <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                        <Text style={styles.TitleFont}>
                            {i18n.t("congratulations")}
                        </Text>
                        <Text style={styles.descFont}>
                            {i18n.t("confirmationMsg")}
                        </Text>
                    </View>
                    <TouchableOpacity
                        testID="nextButton"
                        style={styles.addButton}
                        onPress={this.navigateToYetToDevelop}
                    >
                        <Text style={styles.addText}>{i18n.t("myRequests")}</Text>
                    </TouchableOpacity>
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
    TitleFont: {
        fontFamily: "Avenir-Heavy",
        fontSize: 24,
        marginBottom: 16,
        color: "#375280",
        textAlign: "center",
    },
    addButton: {
        justifyContent: 'flex-end',
        backgroundColor: '#CCBEB1',
        borderRadius: 2,
        paddingVertical: verticalScale(15),
        paddingHorizontal: Scale(16),
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    addText: {
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize: 20,
        lineHeight: 26,
    },
    descFont: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        textAlign: "center",
        lineHeight: 24,
    },
    headerPlanSuccess: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: (windowWidth * 3) / 100,
        marginBottom: (windowWidth * 3) / 100,
    },
    backTouch: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
    },
    extraView: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
    },
    headerTitle: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        fontWeight: "800",
    },
    backIconPS: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
    },
    bodyView: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 90) / 100,
        alignSelf: "center",
    },
});
// Customizable Area End