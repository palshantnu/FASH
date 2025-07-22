import React from "react";

import {
    // Customizable Area Start
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
    // Customizable Area End
} from "react-native";
// Customizable Area Start
import StylishProfileDashboardController, { Props } from "./StylishProfileDashboardController";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomHeader from "../../../components/src/CustomHeader";
import i18n from "../../../components/src/i18n/i18n.config";
import FastImage from 'react-native-fast-image'
// Customizable Area End

export default class StylishProfileDashboard extends StylishProfileDashboardController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    view1 = (item: any, index: number) => {
        return (
            <View style={{ flexDirection: "row", width: "50%" }} key={index}>
                {item.map((subItem: any, ind1: any) => (
                    ind1 === 0 ?
                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[0] })}
                            testID="image01"
                        >
                            <FastImage source={{ uri: item[0]?.url }} style={{ width: 250, height: 269 }} resizeMode="cover" />
                        </TouchableOpacity>
                        :
                        ind1 === 1 &&
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={() => this.navigateTo({ item: item[1] })}
                                testID="image11"
                            >
                                <FastImage source={{ uri: item[1]?.url }} style={{ width: 177, height: 134 }} resizeMode="cover" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.navigateTo({ item: item[2] })}
                                testID="image12"
                            >
                                <FastImage source={{ uri: item[2]?.url }} style={{ width: 177, height: 134 }} resizeMode="cover" />
                            </TouchableOpacity>
                        </View>
                ))}
            </View>
        );
    };
    view2 = (item: any, index: number) => {
        return (
            <View style={{ flexDirection: "row", }} key={index}>
                {item.map((subItem: any) => (
                    <TouchableOpacity
                        onPress={() => this.navigateTo({ item: subItem })}
                        testID="image20"
                    >
                        <FastImage source={{ uri: subItem.url }} style={{ width: 141, height: 141 }} resizeMode="cover" />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    view3 = (item: any, index: number) => {
        return (
            <View style={{ flexDirection: "row", width: "50%" }} key={index}>
                {item.map((subItem: any, ind1: any) => (
                    ind1 === 0 ?
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity
                                onPress={() => this.navigateTo({ item: item[0] })}
                                testID="image30"
                            >
                                <FastImage source={{ uri: item[0]?.url }} style={{ width: 177, height: 134 }} resizeMode="cover" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.navigateTo({ item: item[1] })}
                                testID="image31"
                            >
                                <FastImage source={{ uri: item[1]?.url }} style={{ width: 177, height: 134 }} resizeMode="cover" />
                            </TouchableOpacity>
                        </View>
                        :
                        ind1 === 2 &&
                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[2] })}
                            testID="image32"
                        >
                            <FastImage source={{ uri: item[2]?.url }} style={{ width: 250, height: 269 }} resizeMode="cover" />
                        </TouchableOpacity>
                ))}
            </View>
        );
    };
    renderImages = (item: any, index: number) => {
        if (index % 3 === 0) {
            return this.view1(item, index);
        } else if (index % 3 === 1) {
            return this.view2(item, index);
        } else {
            return this.view3(item, index);
        }
    };
    // Customizable Area End

    render() {
        return (
            // Customizable Area Start
            <SafeAreaView style={styles.coverer}>
                <CustomHeader
                    title={i18n.t('stylistsPortfolios')}
                    leftTestId="backBtn"
                    onLeftPress={() => this.goBack()}
                />

                <View style={styles.footercoverer}>
                    {this.state.loader ? (
                        <ActivityIndicator size="large" animating style={{ alignSelf: "center" }} />
                    ) : (
                        <FlatList
                            testID="imageList"
                            data={this.state.chunkedArray}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }: any) => this.renderImages(item, index)}
                        />
                    )}
                </View>
            </SafeAreaView>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    coverer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    headercoverer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        marginVertical: verticalScale(25),
        marginHorizontal: Scale(24),
        justifyContent: 'space-between'
    },
    backBtn: {
        height: 24,
        width: 24
    },
    headerTxt: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        color: "#375280",
        lineHeight: 26,
        fontWeight: '800'
    },
    footercoverer: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
});
// Customizable Area End
