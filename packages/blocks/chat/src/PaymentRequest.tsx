import React from "react";

// Customizable Area Start
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomHeader from "../../../components/src/CustomHeader";
import Scale, { verticalScale } from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
const windowHeight = Dimensions.get("window").height;
 
// Customizable Area End

import PaymentRequestController, {
    Props
} from "./PaymentRequestController";

export default class PaymentRequest extends PaymentRequestController {
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
                <CustomHeader title={i18n.t("newPayment")} onLeftPress={() => this.leftBtnClick()} />
                {/* <KeyboardAvoidingView
                          behavior={Platform.OS == "ios" ? "padding" : "height"}
                          style={{ flex: 1 }}
                        > */}
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={Platform.OS === "ios" ? 80 : 0} // adjust as needed
                    >

                         
               <View style={{flex: 1, backgroundColor: 'white'}}>
               <View style={styles.inputMainContainer}>
                    <Text style={[styles.otherDetails, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("reasonForRequest")}</Text>
                    <View style={[styles.inputContainer, {flexDirection: FlexConditionManage(i18n.language)}]}>
                        <TextInput
                            placeholder={i18n.t("writeReason")}
                            placeholderTextColor="#375280"
                            style={[styles.inputStyles, {textAlign: TextAlignManage(i18n.language)}]}
                            testID="textInputReason"
                            onChangeText={(value: string) => this.onReasonText(value)}
                            value={this.state.reason}
                        />
                    </View>
                </View>

                <View style={styles.inputMainContainer}>
                    <Text style={[styles.otherDetails, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("requestingAmount")}</Text>
                    <View style={[styles.inputContainer, {flexDirection: FlexConditionManage(i18n.language)}]}>
                        <TextInput
                            placeholder={i18n.t("amount")}
                            placeholderTextColor="#375280"
                            style={[styles.inputStyles, {textAlign: TextAlignManage(i18n.language)}]}
                            testID="textInputAmount"
                            keyboardType="number-pad"
                            onChangeText={(value: string) => this.updateAmount(value)}
                            value={this.manageCurrencyValue()}
                        />
                    </View>
                </View>
               </View>

                <TouchableOpacity
                    style={{justifyContent: "flex-end", marginBottom: windowHeight * 0.05,}}
                    onPress={() => { this.sendMessageRequest() }}
                    testID="sendMessageRequest"
                >
                    <View style={styles.btnView}>
                        <Text style={styles.btnTxt}>{i18n.t("sendRequest")}</Text>
                    </View>
                </TouchableOpacity>
              
                        </KeyboardAwareScrollView>


                {/* </KeyboardAvoidingView> */}
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
    otherDetails: {
        fontSize: Scale(16),
        fontFamily: "Lato-Bold",
        fontWeight: '900',
        color: "#375280",
    },
    inputStyles: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '400',
        color: "#375280",
        marginLeft: Scale(5),
        width:'100%'
    },
    inputContainer: {
        borderWidth: 0.5,
        backgroundColor: "#F8F8F8",
        padding: Scale(12),
        borderColor: "#F8F8F8",
        marginTop: verticalScale(10)
    },
    btnView: {
        marginHorizontal: Scale(24),
        backgroundColor: "#C7B9AD",
        padding: 20,
        marginBottom: verticalScale(24)
    },
    btnTxt: {
        fontSize: 18,
        fontFamily: "Lato-Regular",
        fontWeight: '800',
        color: "#FFFFFF",
        textAlign: "center"
    },
    inputMainContainer: { marginTop: verticalScale(24), marginHorizontal: Scale(24) }
});
// Customizable Area End
