import React from "react";

// Customizable Area Start
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { search } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

import ChatListController, {
    Props
} from "./ChatListController";
import CustomSearch from "../../../components/src/CustomSearch";

export default class ChatList extends ChatListController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderChatList = (item: any) => {
        const items = item?.attributes
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => { this.navigateToChat(item?.id) }} testID="NavigateToFunc">
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={styles.name}>{items.candidate_name}</Text>
                            <Text style={styles.description}>{items.last_message_type}</Text>
                        </View>
                        {
                            items?.unread_message_count !== 0 ?
                                <View style={styles.unreadCount} />
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderItemSeperator() {
        return (
            <View style={styles.borderLine} />
        )
    }

    renderFlatlist = () => {
        return (
            <FlatList
                data={this.state.chatListData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => this.renderChatList(item)}
                ItemSeparatorComponent={this.renderItemSeperator}
                showsVerticalScrollIndicator={false}
                testID="RenderChatList"
            />
        )
    }

    renderErrorMessage = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                <Text style={styles.errorMsg}>{i18n.t("noDataFound")}</Text>
            </View>
        )
    }

    renderChatComponent = () => {
        return (
            this.state.errorMessage === true ?
                this.renderErrorMessage()
                :
                this.renderFlatlist()
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <View style={styles.container}>
                <CustomSearch
                    containerStyle={styles.shopMainViewContainer}
                    testID={"searchInput"}
                    keyboardType="default"
                    maxLength={30}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    placeholder={i18n.t('searchClient')}
                    value={this.state.searchTxt}
                    onChangeText={(value: string) => this.onChangeSearchBar(value)}
                />
                <View style={styles.bodyContainer}>
                    {
                        this.state.loader === true ?
                            <ActivityIndicator size={"large"} color={"#375280"} style={{ alignSelf: "center", justifyContent: "center", flex: 1 }} />
                            :
                            this.renderChatComponent()
                    }
                </View>
            </View>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchIcon: {
        height: 20,
        width: 20
    },
    searchContainer: {
        marginHorizontal: Scale(24),
        flexDirection: "row",
        marginTop: verticalScale(10),
        padding: Scale(16),
        backgroundColor: "#FFFFFF",
        borderColor: "#CBD5E1",
        borderWidth: 1
    },
    searchTxt: {
        marginLeft: Scale(8),
        fontFamily: "Lato",
        fontSize: 16,
        fontWeight: "400",
        color: "#94A3B8"
    },
    bodyContainer: {
        flex: 1,
        marginHorizontal: Scale(24)
    },
    listContainer: {
        marginTop: verticalScale(16),
    },
    name: {
        fontFamily: "Lato-Bold",
        fontSize: 18,
        color: "#375280"
    },
    description: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontWeight: "400",
        color: "#94A3B8",
        marginTop: verticalScale(5)
    },
    borderLine: {
        marginTop: verticalScale(16),
        borderColor: "#CBD5E1",
        borderBottomWidth : 1
        
    },
    errorMsg: {
        fontFamily: "Lato-Regular",
        fontSize: Scale(24),
        color: "#94A3B8",
        textAlign: "center",
        fontWeight: "500"
    },
    unreadCount: {
        borderColor: "#ff0000",
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "#ff0000",
        padding: 5,
        width: 10,
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    shopMainViewContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
        marginHorizontal: Scale(20),
        alignSelf: "center",
        marginVertical: Scale(20),
      }
});
// Customizable Area End
