import React from "react";

// Customizable Area Start
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale, { verticalScale } from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

import ReportPersonController, { Props } from "./ReportPersonController";

export default class ReportPerson extends ReportPersonController {
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
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={this.isPlatformiOS() ? "padding" : undefined}>
                    <CustomHeader title={i18n.t("reportPerson")} onLeftPress={() => { this.leftBtnClick() }} leftTestId="goBackBtn" />

                    <View style={styles.bodyView}>
                        <Text style={styles.reportHeading}>{i18n.t("reportHeading")}</Text>
                        <Text style={styles.reportBody}>{this.state.reportReason} {i18n.t("reportBody")}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.clientNavigationBtn() }} testID="ClientnavigationBtn">
                        <View style={styles.btnView}>
                            <Text style={styles.btnTxt}>{i18n.t("clients")}</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
    bodyView: {
        flex: 1,
        marginHorizontal: Scale(24),
        marginTop: verticalScale(12),
        justifyContent: "center",
        alignItems: "center"
    },
    btnView: {
        marginHorizontal: Scale(24),
        backgroundColor: "#C7B9AD",
        padding: 20,
        marginBottom: verticalScale(24),
        justifyContent: "flex-end",
    },
    btnTxt: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '800',
        color: "#FFFFFF",
        textAlign: "center"
    },
    reportHeading: {
        color: "#375280",
        fontSize: Scale(24),
        fontFamily: "Lato-Regular",
        fontWeight: "800"
    },
    reportBody: {
        color: "#375280",
        fontSize: Scale(18),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        textAlign: "center",
        marginTop: verticalScale(16)
    }
});
// Customizable Area End
