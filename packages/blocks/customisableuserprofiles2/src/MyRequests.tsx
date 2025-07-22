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
    FlatList,
    // Customizable Area End
} from "react-native";
// Customizable Area Start
import MyRequestController, { Props } from "./MyRequestController";
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon, chat } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

export default class MyRequest extends MyRequestController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start
    headerContainer() {
        return (
            <View style={[styles.containerView, globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewMR, { flexDirection: FlexConditionManage(i18n.language) }]}>
                    <TouchableOpacity testID="navigateToStylishProfileTxtId" style={styles.backTouch} onPress={this.navigateToStylishProfile} >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconMR, 
                            { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}
                        ]}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAll}>{i18n.t('myRequests')}</Text>
                    </View>
                    <View style={styles.extraSpaceView} />
                </View>
            </View>
        )
    }
    renderPendingBox =(item :{id: number })=>{
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: verticalScale(15) }}>
        <TouchableOpacity style={styles.deleteButton} testID="deleteBtnTextId"
            onPress={() => { this.onDelete(item.id) }}>
            <Text style={styles.deleText}>{i18n.t("deleteTextBtn")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} testID="onNavigateRequirementTextId" onPress={() => this.onNavigateRequirements(item.id)}>
            <Text style={styles.editText}>{i18n.t("editRequest")}</Text>
        </TouchableOpacity>
    </View>
    )
}
    renderListContainer() {
        return (
            <FlatList

                testID="flatlistTestID"
                showsVerticalScrollIndicator={false}
                data={this.state.requestListArr}
                style={{ marginHorizontal: Scale(24), marginBottom: verticalScale(24), marginTop: verticalScale(15), }}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item, }) => {
                    const status = item?.attributes?.status;
                    let statusText;
                    let statusStyle;
                    if (status === 'pending') {
                        statusText = i18n.t("requested");
                        statusStyle = styles.requested;
                      } else if (status === 'accepted') {
                        statusText = i18n.t("accepted");
                        statusStyle = styles.accepted;
                      } else {
                        statusText = i18n.t("rejected");
                        statusStyle = styles.rejectedStyle;
                      }                      
                    return (
                        <View style={styles.listStyle}>
                            <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
                                <Image source={{ uri: item?.attributes?.stylist_profile }} style={styles.profileImage} />
                                <View style={styles.textContainer}>
                                    <Text style={[styles.nameText, { textAlign: TextAlignManage(i18n.language) }]}>{item?.attributes?.stylist_name}</Text>
                                    <Text style={[styles.statusText, statusStyle, { textAlign: TextAlignManage(i18n.language) }]}>
                                        {statusText}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                testID={"navigateToChat"}
                                onPress={()=>this.navigateFromHiredStylish(item?.attributes?.chat_id)}
                                style={{ paddingBottom: verticalScale(10) }}>
                                    <Image source={chat} style={styles.chatStyle} />
                                </TouchableOpacity>
                            </View>
                            {item?.attributes?.status === 'pending' && this.renderPendingBox(item)}
                            {item?.attributes?.status === 'accepted' && this.btnContainer()}
                            {!['pending', 'accepted'].includes(item?.attributes?.status) && <View />}

                        </View>
                    )
                }}
            />
        )
    }

    btnContainer() {
        return (
            <TouchableOpacity
                testID="nextButton"
                style={styles.StylistButton}>
                <Text style={styles.stylistText}>{i18n.t("chatWithStylist")}</Text>
            </TouchableOpacity>
        )
    }

    emptyListContainer() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.emptyText}>
                    {i18n.t('noRecordFoundText')}
                </Text>

            </View>
        )
    }
    // Customizable Area End
    render() {
        // Customizable Area Start
        return (
            <View style={styles.mainContainer}>
                <SafeAreaView style={styles.safeViewContainer} />
                {this.state.isLoading && <CustomLoader />}
                <StatusBar barStyle="dark-content" />
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
                {this.headerContainer()}
                {this.state.requestListArr.length === 0 && !this.state.isLoading && this.emptyListContainer()}
                {this.state.requestListArr.length > 0 && this.renderListContainer()}
            </View>
        );
        // Customizable Area End
    }

}

// Customizable Area Start
const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    backTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerView: {
        width: windowWidth * 90 / 100,
        alignSelf: 'center',
    },
    backIconMR: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100
    },
    headerTitleAll: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },
    extraSpaceView: {
        justifyContent: 'center',
    },
    StylistButton: {
        marginTop: verticalScale(15),
        backgroundColor: "#CCBEB1",
        height: verticalScale(42),
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    headerViewMR: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    stylistText: {
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '800'
    },
    listStyle: {
        flex: 1,
        marginTop: verticalScale(24)
    },
    profileImage: {
        width: Scale(80),
        height: Scale(80),
        borderRadius: 80 / 2,
        borderWidth: 5,
        borderColor: '#94A3B8',
        marginHorizontal: 12,
    },
    nameText: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Lato-bold',
        lineHeight: 28,
        color:'#375280'
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        fontFamily: 'Lato-bold',
    },
    safeViewContainer: {
        flex: 0,
        backgroundColor: '#ffffff'
    },
    accepted: {
        color: '#059669'
    },
    requested: {
        color: '#F59E0B'
    },
    chatStyle: {
        width: Scale(32),
        height: verticalScale(32)
    },
    rejectedStyle: {
        color: 'red'
    },
    deleteButton: {
        height: verticalScale(40),
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: '#F87171',
        width: Scale(175)
    },
    deleText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: 24,
        color: '#F87171',
        textAlign: 'center',
    },
    editButton: {
        height: verticalScale(40),
        backgroundColor: '#CCBEB1',
        borderRadius: 1,
        alignItems: 'center',
        borderColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'center',
        width: Scale(175)
    },
    editText: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: 24,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        color: '#375280'
    }

});
// Customizable Area End
