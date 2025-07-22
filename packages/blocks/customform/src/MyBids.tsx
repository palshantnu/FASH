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
    StatusBar
} from "react-native";
import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import Scale from "../../../components/src/Scale";
import ImageReverseManage from "../../../components/src/ImageReverseManage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Customizable Area End

import MyBidsController, {
    Props
} from "./MyBidsController";

export default class MyBids extends MyBidsController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    Header = () => (
        <View style={[styles.headerMyBids, {flexDirection: FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
                testID="backButton"
                style={styles.backIconStyle}
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            >
                <Image
                    resizeMode="contain"
                    source={backIcon}
                    style={[styles.backIconMyBids, {transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.header}>
                    {i18n.t("My Bids")}
                </Text>
            </View>
            <View style={styles.extraViewMyBids} />
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
                                item.item.attributes.product_sourcing_request.images[0].url ||
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
                        <View style={[styles.productDetails,{ flexDirection: FlexConditionManage(i18n.language) }]}>
                            <Text style={[styles.title, { textAlign: TextAlignManage(i18n.language) }]}>
                                {item.item.attributes.product_sourcing_request.product_name}
                            </Text>
                            {
                                item.item.attributes.request_status === "waiting" &&
                                <View style={styles.waitingBox}>
                                    <Text style={styles.waitingText}>
                                        {i18n.t("Waiting")}
                                    </Text>
                                </View>
                            }
                            {
                               item.item.attributes.request_status === "rejected" &&
                                <View style={styles.rejectedBox}>
                                    <Text style={styles.rejectedText}>
                                        {i18n.t("Rejected")}
                                    </Text>
                                </View>
                            }
                            {
                                item.item.attributes.request_status === "accepted" &&
                                <View style={styles.acceptedBox}>
                                    <Text style={styles.acceptedText}>
                                        {i18n.t("Accepted")}
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={[styles.productDetails, { flexDirection: FlexConditionManage(i18n.language) }]}>
                            <Text style={[styles.productPrice, { textAlign: TextAlignManage(i18n.language) }]}>
                                {this.state.localCurrency}{this.formatNumber(item.item.attributes.product_sourcing_request.min_price)} - {this.state.localCurrency}
                                {this.formatNumber(item.item.attributes.product_sourcing_request.max_price)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
                  <Text style={styles.fullName}>
                    {i18n.t("Quote Price")}
                  </Text>
                  <Text style={[styles.fullName, { textAlign: 'right' }]}>
                  {this.state.localCurrency}{item.item.attributes.quote_price}
                  </Text>
                </View>
                <View style={styles.productCardFooter}>
                    <TouchableOpacity
                        testID={`viewButton` + item.item.id}
                        style={styles.viewButton}
                        onPress={() => this.navigateToViewProductSourcing(item.item.attributes.product_sourcing_request.id)}
                    >
                        <Text style={styles.viewText}>{i18n.t("View")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container} testID="MyBids">
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ffffff"
                    translucent={false}
                    networkActivityIndicatorVisible={false}
                    hidden={false}
                />
                {this.state.loading && <CustomLoader />}
                <View
                    style={[
                        globalStyle.headerMarginManage,
                        styles.containerView,
                    ]}
                >
                    <this.Header />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <FlatList
                            bounces={false}
                            data={this.state.apiData.data}
                            testID={"product_sourcing_flatlist_list"}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.flatContainerBottom}
                            renderItem={(item) => this.getList(item)}
                            horizontal={false}
                            onEndReachedThreshold={1}
                            ListEmptyComponent={() =>
                                !this.state.loading ? (
                                    <View style={styles.listEmptymainView} testID="emptyComp">
                                        <Text style={styles.listEmptyTitleText}>
                                            You have not bid on any product quote yet.
                                        </Text>
                                    </View>
                                ) : null
                            }
                            onEndReached={() =>
                                this.getMyBidsList(
                                    this.state.token,
                                    "more"
                                )
                              }
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({

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
    productDataRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      },
      fullName: {
        fontWeight: "700",
        fontFamily: "Lato",
        color: "#375280",
        fontSize: 18,
        textAlign: "left",
        lineHeight: 26,
      },
    viewText: {
        color: "#ffffff",
        fontFamily: "Lato-Regular",
        fontSize: (windowWidth * 4) / 100,
        fontWeight: "500",
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    waitingBox: {
        backgroundColor: "#FFE7D0",
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 27,
        width: 76,
      },
      waitingText: {
        color: "#BE5B00",
        fontFamily: "Lato-Regular",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 18,
      },
    acceptedBox: {
        backgroundColor: "#D1FAE5",
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 27,
        width: 76,
    },
    acceptedText: {
        color: "#059669",
        fontFamily: "Lato-Regular",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 18,
    },
    rejectedBox: {
        backgroundColor: "#FEE2E2",
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 27,
        width: 76,
    },
    rejectedText: {
        color: "#DC2626",
        fontFamily: "Lato-Regular",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 18,
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

    containerView: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
    },
    headerMyBids: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: (windowWidth * 3) / 100,
        marginBottom: (windowWidth * 3) / 100,
    },
    header: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        fontWeight: "800",
    },
    productPrice: {
        fontWeight: "700",
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: (windowWidth * 4) / 100,
        textAlign: "right",
        alignSelf: "flex-end",
        marginHorizontal : 10
    },
    productCardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: (windowWidth * 90) / 100,
        marginTop: (windowWidth * 2) / 100,
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
    backIconStyle: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
    },
    backIconMyBids: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
    },
    title: {
        fontWeight: "500",
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: 18,
        textAlign: "left",
        lineHeight: 24,
        width: windowWidth * 40 / 100,
        marginHorizontal : 10
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
    extraViewMyBids: {
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

});
// Customizable Area End