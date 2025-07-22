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
import { backIcon, bodyStyle, boyGetup, degree, hairStyle, manAvatar, poseStyle, skinTone, upperBody, womanAvatar } from "./assets";
// Customizable Area End

import TryonitController, {
    Props,
    configJSON,
} from "./TryonitController";


export default class Tryonit extends TryonitController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderItem = (item: any) => {
        return (
            <TouchableOpacity
                testID="selectColour"
                activeOpacity={0.8}
                onPress={() => this.selectColour(item.item)}
                style={item.item.id === this.state.colourId ? [styles.unSelectedColour] : [styles.selectedColour]}>
                <View
                    style={[styles.colourView, { backgroundColor: item.item.colorName }]}
                ></View>
            </TouchableOpacity>
        )
    }

    renderItemForSize = (item: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                testID="selectSize"
                onPress={() => this.selectSize(item.item)}
                style={item.item.id === this.state.sizeId ? [styles.unSizeSelectedColour] : [styles.sizeSelectedColour]}>
                <Text style={{ fontSize: windowWidth * 3.5 / 100, color: '#000000' }}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }

    stylingRender = (item: any) => {
        return (
            <TouchableOpacity
                testID="stylingRender"
                style={{
                    backgroundColor: '#ffffff',
                    alignItems: 'center', justifyContent: 'space-between', marginRight: windowWidth * 4 / 100,
                    paddingHorizontal: windowWidth * 1 / 100, paddingVertical: windowWidth * 2 / 100,
                    elevation: 2, borderWidth: 1, borderColor: '#CCBEB1', marginTop: 10
                }}>
                <Image
                    source={backIcon}
                    resizeMode="contain"
                    style={styles.bodyShapeStyle}
                />
                <Text style={{ fontSize: windowWidth * 3.5 / 100, color: '#000000' }}>{item.item.name}</Text>
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
                        <Text style={styles.headerTitleCatalogue}>{`Try It On`}</Text>
                    </View>
                    <TouchableOpacity
                        testID="handleNavigationNextPage"
                        onPress={() => this.onPressNext()}
                        style={{ justifyContent: "center" }}
                    >
                        <Text style={styles.clear}>Save</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    <Image
                        source={boyGetup}
                        resizeMode='contain'
                        style={styles.personImage}
                    />
                    <View
                        style={styles.colourStyle}>
                        <FlatList
                            bounces={false}
                            testID={"Assignstore_show_flatlist_color"}
                            data={this.state.colorName}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => this.renderItem(item)}
                        />
                    </View>

                    <View
                        style={styles.colourStyle1}>
                        <FlatList
                            bounces={false}
                            testID={"Assignstore_show_flatlist_size"}
                            data={this.state.SizeArray}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => this.renderItemForSize(item)}
                        />
                    </View>

                    <View style={styles.stylingDesignMainView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            testID="personBodyType"
                            onPress={() => this.setstylingtype('bodyType')}
                            style={styles.stylingMainHeadView}>
                            <View
                                style={this.state.stylingShow === 'bodyType' ? [styles.stylingMainView] : [styles.unselectedstylingMainView]}>
                                <Image
                                    source={bodyStyle}
                                    resizeMode="contain"
                                    style={styles.stylingImages}
                                />
                            </View>
                            <Text style={styles.StyleTxt}>Body Type</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            testID="personHairs"
                            onPress={() => this.setstylingtype('hairStyle')}
                            style={styles.stylingMainHeadView}>
                            <View
                                style={this.state.stylingShow === 'hairStyle' ? [styles.stylingMainView] : [styles.unselectedstylingMainView]}>
                                <Image
                                    source={hairStyle}
                                    resizeMode="contain"
                                    style={styles.stylingImages}
                                />
                            </View>
                            <Text style={styles.StyleTxt}>Hair Style</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            testID="handleNavigationon3dPress"
                            onPress={() => this.onPressNext()}
                            style={styles.stylingMainHeadView}>
                            <View
                                style={this.state.stylingShow === '3dView' ? [styles.stylingMainView] : [styles.unselectedstylingMainView]}>
                                <Image
                                    source={degree}
                                    resizeMode="contain"
                                    style={styles.stylingImages}
                                />
                            </View>
                            <Text style={styles.StyleTxt}>3D View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            testID="personPose"
                            onPress={() => this.setstylingtype('pose')}
                            style={styles.stylingMainHeadView}>
                            <View
                                style={this.state.stylingShow === 'pose' ? [styles.stylingMainView] : [styles.unselectedstylingMainView]}>
                                <Image
                                    source={poseStyle}
                                    resizeMode="contain"
                                    style={styles.stylingImages}
                                />
                            </View>
                            <Text style={styles.StyleTxt}>Pose</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            testID="personSkinTone"
                            onPress={() => this.setstylingtype('skinTone')}
                            style={styles.stylingMainHeadView}>
                            <View
                                style={this.state.stylingShow === 'skinTone' ? [styles.stylingMainView] : [styles.unselectedstylingMainView]}>
                                <Image
                                    source={skinTone}
                                    resizeMode="contain"
                                    style={styles.stylingImages}
                                />
                            </View>
                            <Text style={styles.StyleTxt}>Skin Tone</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.StylingArrayMainView}>
                        <FlatList
                            bounces={false}
                            testID={"Assignstore_show_flatlist_styles"}
                            horizontal
                            data={this.state.StylingArray}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => this.stylingRender(item)}
                        />
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
        // borderWidth: 0.8,
        // borderColor: 'grey',
        // elevation: 2
    },
    unSelectedColour: {
        height: windowWidth * 9.5 / 100,
        width: windowWidth * 9.5 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
        elevation: 2,
        borderColor: '#375280',
        borderWidth: 1,
        backgroundColor: "#ffffff",
    },
    sizeSelectedColour: {
        height: windowWidth * 9.5 / 100,
        width: windowWidth * 9.5 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 25,
        backgroundColor: "#ffffff",
        elevation: 2,
        borderColor: 'grey',
        borderWidth: 0.2,
    },
    unSizeSelectedColour: {
        height: windowWidth * 9.5 / 100,
        width: windowWidth * 9.5 / 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 2,
        borderColor: '#375280',
        borderWidth: 1,
        backgroundColor: "#ffffff",
        marginTop: 25
    },
    colourView: {
        backgroundColor: 'yellow',
        height: windowWidth * 5.5 / 100,
        width: windowWidth * 5.5 / 100
    },
    personImage: {
        width: '100%',
        height: windowHeight * 60 / 100
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
        borderColor: '#375280',
        borderWidth: windowWidth * 0.4 / 100
    },
    unselectedstylingMainView: {
        width: (windowWidth * 12) / 100,
        height: (windowWidth * 12) / 100,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E1E8F0',
        borderWidth: windowWidth * 0.2 / 100
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
    StylingArrayMainView: {
        width: windowWidth,
        marginTop: windowWidth * 4 / 100,
        paddingHorizontal: windowWidth * 4 / 100,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: windowWidth * 3 / 100,
        elevation: 24,
        bottom: 0,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.9,
        shadowRadius: 3,
    }
});
// Customizable Area End
