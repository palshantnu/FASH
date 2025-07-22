import React from "react";
// more core import statements

// Customizable Area Start
// custom import statements

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import { backIcon, manAvatar, upperBody, womanAvatar } from "./assets";
// Customizable Area End

import MeasurementsController, {
    Props,
    configJSON,
} from "./MeasurementsController";


export default class Measurements extends MeasurementsController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <View style={styles.container}>
                {/* <SafeAreaView style={styles.safeContainer} /> */}
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ffffff"
                    translucent={false}
                    hidden={true}
                    networkActivityIndicatorVisible={false}
                />

                <View style={[styles.headerViewMainCatalogue]}>
                    <TouchableOpacity
                        style={styles.backTouchCatalogue}
                        testID="btnBackAddAddress"
                        onPress={() => this.goToBack()}
                    >
                        <Image
                            source={backIcon}
                            resizeMode="contain"
                            style={styles.backIconCssCatalogue}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleCatalogue}>{`Measurements`}</Text>
                    </View>
                    <TouchableOpacity
                        testID="handleNavigationNextPage"
                        style={{ justifyContent: "center" }}
                        onPress={() => this.onPressNext()}
                    >
                        <Text style={styles.clear}>Next</Text>
                    </TouchableOpacity>
                </View>
                    <ScrollView
                        // contentContainerStyle={{ paddingBottom: 20 }}
                        style={{height:windowHeight*500/100}}
                        >
                        <Image
                            source={upperBody}
                            resizeMode='contain'
                            style={{ width: '100%', height: windowWidth * 75 / 100 }}
                        />
                        <View style={styles.upperBodyMeTxt}>
                            <Text style={styles.headerTitleCatalogue}>{`Upper Body Measurements (In cms.)`}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Neck Base`}</Text>
                                <TextInput
                                    testID={"NeckBase"}
                                    onChangeText={(txt) => {
                                        this.setState({ neckBase: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter neck Base'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Across Shoulder Front`}</Text>
                                <TextInput
                                    testID={"AcrossShoulderFront"}
                                    onChangeText={(txt) => {
                                        this.setState({ acrossShoulderFront: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter across shoulder front'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Across Shoulder Back`}</Text>
                                <TextInput
                                    testID={"AcrossShoulderBack"}
                                    onChangeText={(txt) => {
                                        this.setState({ acrossShoulderBack: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter across shoulder back'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Chest`}</Text>
                                <TextInput
                                    testID={"Chest"}
                                    onChangeText={(txt) => {
                                        this.setState({ chest: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter your chest'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Bicep`}</Text>
                                <TextInput
                                    testID={"Bicep"}
                                    onChangeText={(txt) => {
                                        this.setState({ bicep: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter your bicep'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`Waist`}</Text>
                                <TextInput
                                    testID={"Waist"}
                                    onChangeText={(txt) => {
                                        this.setState({ waist: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter your waist'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.yourAvHeading}>
                                <Text style={styles.yourAvatarTxt}>{`High Hip`}</Text>
                                <TextInput
                                    testID={"HighHip"}
                                    onChangeText={(txt) => {
                                        this.setState({ highHip: txt });
                                    }}
                                    keyboardType="email-address"
                                    maxLength={70}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    placeholder={'Enter your high hip'}
                                    placeholderTextColor={'#9A9A9A'}
                                    style={styles.emailTextInput}
                                    // value={this.state.email}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                    </ScrollView>
            </View>
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
        backgroundColor: '#ffffff'
    },
    backTouchCatalogue: {
        width: (windowWidth * 12) / 100,
        height: (windowWidth * 12) / 100,
    },
    backIconCssCatalogue: {
        width: (windowWidth * 12) / 100,
        height: (windowWidth * 12) / 100,
    },
    body: {
        marginBottom: 32,
        textAlign: "left",
        marginVertical: 8,
        padding: 10,
    },
    bgPasswordContainer: {
        marginBottom: 16,
        padding: 10,
    },
    bgMobileInput: {
        flex: 1,
    },
    showHide: {
        backgroundColor: "transparent",
        marginRight: -10,
    },
    headerViewMainCatalogue: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
        alignContent: "center",
        padding: 20,
        alignItems: 'center',
    },
    safeContainer: {
        flex: 0,
        backgroundColor: "#ffffff",
    },
    upperBodyMeTxt: {
        marginTop: 12
    },
    headerTitleCatalogue: {
        color: "#375280",
        fontSize: (windowWidth * 4) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
    },
    clear: {
        color: "#375280",
        fontSize: 16,
        fontWeight: "500",
        textDecorationLine: 'underline'
    },
    line: {
        borderWidth: 0.8,
        borderColor: "#F1F5F9",
    },
    yourAvHeading: {
        paddingHorizontal: (windowWidth * 6) / 100,
        paddingVertical: (windowHeight * 1.5) / 100
    },
    yourAvatarTxt: {
        color: "#375280",
        fontSize: (windowWidth * 3.8) / 100,
        // fontFamily: "Avenir-Heavy",
        fontWeight: '600'
    },
    avatarBaseView: {
        paddingHorizontal: (windowHeight * 1) / 100,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10
    },
    avatarImage: {
        width: (windowWidth * 35) / 100,
        height: (windowWidth * 45) / 100,
    },
    avatarBackView: {
        width: (windowWidth * 38) / 100,
        height: (windowHeight * 30) / 100,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CCBEB1',
        borderWidth: (windowWidth * 0.3) / 100,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        // shadowOffset: { width: 0 },
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
    },
    rowModeConfirm: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnsModeConfirm: {
        paddingVertical: Scale(15),
    },
    accButtonModeConfirm: {
        flex: 1,
        borderRadius: Scale(2),
    },
    accTxtModeConfirm: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    stockAvatarButton: {
        flex: 1,
        borderRadius: Scale(2),
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: "#CCBEB1"
    },
    stockAvatarTxt: {
        color: "#375280",
        fontWeight: "700",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    button: {
        backgroundColor: "#CCBEB1",
        justifyContent: "center",
        alignItems: "center",
        minHeight: Scale(56),
        borderRadius: Scale(5),
        overflow: "hidden",
    },
    text: {
        fontFamily: "Lato-Bold",
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 26,
        color: "#FFFFFF",
    },
    orTxt: {
        color: "#375280",
        fontSize: (windowWidth * 4) / 100,
        fontFamily: "Avenir-Heavy",
        textAlign: 'center'
    },
    nameTxt: {
        marginTop: (windowWidth * 2) / 100,
        color: "#375280",
        fontSize: (windowWidth * 4) / 100,
        fontFamily: "Avenir-Heavy",
        textAlign: 'center'
    },
    emailAddressMainView: {
        marginTop: windowWidth * 10 / 100
    },
    emailTextInput: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 6.5) / 100,
        padding: 7,
        marginTop: 12,
        borderRadius: 5,
        backgroundColor: '#F8F8F8',
        fontFamily: 'Lato-Regular',
        color: '#375280'
    },
});
// Customizable Area End
