import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    FlatList,
    RefreshControl,
    StatusBar
} from "react-native";
import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";

import Scale from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import ProductSourcingTabCompController, {
    Props,
    configJSON,
} from "./ProductSourcingTabCompController";

export default class SeeAllProductSourcing extends ProductSourcingTabCompController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    Header = () => (
        <View style={[styles.headerSeeAllProductSourcing, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
                testID="btnBackDriverVehicleUpload"
                style={styles.backTouchFormSourceProduct}
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            >
                <Image
                    resizeMode="contain"
                    source={backIcon}
                    style={[styles.backIconSeeAllProductSourcing, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerTitleFormSourceProduct}>
                    {i18n.t('Product Sourcing Requests')}
                </Text>
            </View>
            <View style={styles.extraViewFormSourceProduct} />
        </View>
    );

    getList = (item: any) => {
        return (
            <View style={styles.productCard}>
                <View style={[styles.productCardContent, { flexDirection: FlexConditionManage(i18n.language) }]}>
                    <Image
                        style={styles.productImage}
                        source={{
                            uri:
                                item.item.attributes.images[0].url ||
                                "https://i.ibb.co/8Nb9QHL/image.png",
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginLeft: windowWidth * 0.03,
                        }}
                    >
                        <View style={[styles.productDetails, { flexDirection: FlexConditionManage(i18n.language) }]}>
                            <Text style={styles.title}>
                                {item.item.attributes.product_name}
                            </Text>
                        </View>
                        <View style={[styles.productDetails, { flexDirection: FlexConditionManage(i18n.language) }]}>
                            <Text style={styles.productPrice}>
                                {this.state.localCurrency}{this.formatNumber(item.item.attributes.min_price)} - {this.state.localCurrency}
                                {this.formatNumber(item.item.attributes.max_price)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productCardFooter}>
                    <TouchableOpacity
                        testID={`viewButton` + item.item.id}
                        style={styles.viewButton}
                    onPress={() => this.navigateToViewProductSourcing(item.item.id)}
                    >
                        <Text style={styles.viewText}>{i18n.t('View')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    UnderReview = () => (
        <View style={styles.underReview}>
            <Text style={styles.reviewTxt}>{configJSON.waitingForApprovalText}</Text>
        </View>
    );

    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container} testID="SeeAllProductSourcing">
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
                        styles.containerView,
                        globalStyle.headerMarginManage,
                    ]}
                >
                    <this.Header />
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <FlatList
                            bounces={false}
                            testID={"product_sourcing_flatlist_list"}
                            data={this.state.apiData.data}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            keyExtractor={(item) => item.id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshData}
                                />
                            }
                            contentContainerStyle={styles.flatContainerBottom}
                            onEndReachedThreshold={1}
                            renderItem={(item) => this.getList(item)}
                            ListEmptyComponent={() =>
                                !this.state.loading ? (
                                    <View style={styles.listEmptymainView} testID="emptyComp">
                                        <Text style={styles.listEmptyTitleText}>
                                            {i18n.t("EmptyProductSourcingListAll")}
                                        </Text>
                                    </View>
                                ) : null
                            }
                        />
                    </ScrollView>
                </View>
                
                <this.UnderReview />
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
    listEmptymainView: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowWidth * 50) / 100,
    },
    listEmptyTitleText: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    reviewTxt: {
        color: "#375280",
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Lato",
        textAlign: "center",
    },
    underReview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: windowWidth * 0.05,
    },
    flatContainerBottom: {
        paddingBottom: (windowHeight * 20) / 100,
    },
    row: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: Scale(10),
    },
    sb: {
        justifyContent: "space-between",
    },
    containerView: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
    },
    headerSeeAllProductSourcing: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: (windowWidth * 3) / 100,
        marginBottom: (windowWidth * 3) / 100,
    },
    headerTitleFormSourceProduct: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        fontWeight: "800",
    },
    backTouchFormSourceProduct: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
    },
    backIconSeeAllProductSourcing: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
    },
    title: {
        fontWeight: "500",
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: 18,
        textAlign: "left",
        marginHorizontal: 10,
        lineHeight: 24,
    },
    productPrice: {
        fontWeight: "700",
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: (windowWidth * 4) / 100,
        textAlign: "right",
        marginHorizontal: 10,
        alignSelf: "flex-end",
    },
    productCardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: (windowWidth * 90) / 100,
        marginTop: (windowWidth * 2) / 100,
    },
    viewButton: {
        backgroundColor: "#CCBEB1",
        width: (windowWidth * 90) / 100,
        height: (windowWidth * 10) / 100,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: (windowWidth * 2) / 100,
    },
    extraViewFormSourceProduct: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
    },
    selectStoreText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 26,
        fontFamily: "Lato",
        color: "#375280",
    },
    nextIcon: {
        height: Scale(24),
        marginTop: Scale(2),
        width: Scale(26),
    },
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 2,
        marginVertical: 10,
        width: (windowWidth * 90) / 100,
    },
    productCardContent: {
        flexDirection: "row",
    },
    productImage: {
        width: (windowWidth * 20) / 100,
        height: (windowWidth * 25) / 100,
        borderRadius: 2,
    },
    productDetails: {
        flex: 1,
        flexDirection: "row",
        // marginHorizontal: windowWidth * 0.03,
        justifyContent: "space-between",
    },
    viewText: {
        color: "#ffffff",
        fontFamily: "Lato-Regular",
        fontSize: (windowWidth * 4) / 100,
        fontWeight: "500",
    },
});
// Customizable Area End