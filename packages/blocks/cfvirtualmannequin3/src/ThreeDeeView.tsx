import React from "react";
// more core import statements

// Customizable Area Start
// custom import statements

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import { Dimensions, FlatList, Image, Keyboard, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import { background1, background2, background3, backgroundImage, backIcon, bodyStyle, boyGetup, degree, fullGetupImage, hairStyle, manAvatar, poseStyle, skinTone, upperBody, womanAvatar } from "./assets";
// Customizable Area End

import ThreeDeeViewController, {
    Props,
    configJSON,
} from "./ThreeDeeViewController";


export default class ThreeDeeView extends ThreeDeeViewController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    stylingRender = (item: any) => {
        return (
            <TouchableOpacity
            testID="stylingRender"
                onPress={() => this.onBackImagePress(item.item)}
                style={[styles.viewStyling, {
                    borderWidth: this.state.imageId === item.item.id ? windowWidth * 2 / 100 : 0,
                }]}>
                <Image
                    source={item.item.image}
                    resizeMode='cover'
                    style={styles.bodyShapeStyle}
                />
            </TouchableOpacity>
        )
    }
    // Customizable Area End


    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeContainer} />
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ffffff"
                    translucent={false}
                    hidden={false}
                    networkActivityIndicatorVisible={false}
                />
                <Image
                    source={this.state.backImage == "" ? backgroundImage : this.state.backImage}
                    resizeMode='cover'
                    style={styles.bagroundImage}
                />

                <View style={styles.headerViewMainCatalogue}>
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
                        <Text style={styles.headerTitleCatalogue}>{`360 View`}</Text>
                    </View>
                    <View
                        style={{ width: windowWidth * 10 / 100 }} />
                </View>

                <Image
                    source={fullGetupImage}
                    resizeMode='contain'
                    style={styles.personImage}
                />

                <View style={styles.bottomImageMainView}>
                    <FlatList
                        bounces={false}
                        testID={"Assignstore_show_flatlist_styles"}                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={[
                            { id: 1, image: backgroundImage },
                            { id: 2, image: background1 },
                            { id: 3, image: background2 },
                            { id: 4, image: background3 },
                            { id: 5, image: backgroundImage },
                            { id: 6, image: background1 },
                            { id: 7, image: background2 },
                            { id: 8, image: background3 },
                        ]}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.stylingRender}
                    />
                </View>
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
    headerViewMainCatalogue: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
        alignContent: "center",
        padding: 20,
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth
    },
    safeContainer: {
        flex: 0,
        backgroundColor: "#ffffff",
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
    colourStyle: {
        position: 'absolute',
        width: windowWidth * 15 / 100,
        height: windowHeight * 50 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        right: windowWidth * 0.3 / 10,
        marginTop: windowWidth * 1 / 10
    },
    colourStyle1: {
        position: 'absolute',
        width: windowWidth * 15 / 100,
        height: windowHeight * 50 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        left: windowWidth * 0.3 / 10,
        marginTop: windowWidth * 1 / 10
    },
    selectedColour: {
        height: windowWidth * 9.5 / 100,
        width: windowWidth * 9.5 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
        borderWidth: 0.8,
        borderColor: 'grey',
        backgroundColor: "#ffffff",
        elevation: 2
    },
    colourView: {
        backgroundColor: 'yellow',
        height: windowWidth * 5.5 / 100,
        width: windowWidth * 5.5 / 100
    },
    bagroundImage: {
        width: windowWidth,
        height: windowHeight
    },
    personImage: {
        width: (windowWidth * 15) / 10,
        height: (windowWidth * 15) / 10,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: (windowWidth * 3) / 10
    },
    bottomImageMainView: {
        width: windowWidth,
        marginTop: windowWidth * 2 / 100,
        paddingHorizontal: windowWidth * 4 / 100,
        alignSelf: 'center',
        paddingVertical: windowWidth * 3 / 100,
        elevation: 24,
        bottom: 0,
        position: 'absolute'
    },
    stylingDesignMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: windowHeight * 1 / 100,
    },
    stylingMainHeadView: { alignItems: 'center' },
    stylingMainView: {
        width: (windowWidth * 12) / 100,
        height: (windowWidth * 12) / 100,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CCBEB1',
        borderWidth: 1
    },
    stylingImages: {
        width: (windowWidth * 10) / 100,
        height: (windowWidth * 10) / 100,
    },
    StyleTxt: {
        color: "#375280",
        fontSize: 13,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: 8
    },
    bodyShapeStyle: {
        width: (windowWidth * 18) / 100,
        height: (windowWidth * 18) / 100,
    },
    viewStyling: {
        marginRight: windowWidth * 4 / 100,
        borderColor: '#ffffff',
        alignSelf: 'center'
    }
});
// Customizable Area End
