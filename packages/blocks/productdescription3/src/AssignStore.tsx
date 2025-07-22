import React from "react";
// more core import statements

// Customizable Area Start
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    Text,
    FlatList,
    TextInput,
    Keyboard
} from "react-native"
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, search, selectedCheckBox, unSelectedCheckBox, errorIcon } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import { CatalogueItem } from './response';
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

import AssignStoreConroller, {
    Props
} from "./AssignStoreConroller";

export default class AssignStore extends AssignStoreConroller {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    renderItem = ({ item }: { item: CatalogueItem }) => {
        const { store_name, image } = item.attributes;
        const isSelected = this.state.selectedItem.includes(item.id);
        return (
            <View>
                <View style={[styles.renderContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <View style={[styles.renderSubLeftContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>

                        <Image style={styles.renderItemImage} source={ImageNotFound(image)} />


                        <Text style={[styles.renderItemText,{marginRight:i18n.language=='ar'?10:0}]}>{store_name}</Text>
                    </View>
                    <TouchableOpacity testID="selectCheckBox" onPress={() => this.toggleItemSelection(item.id)}>
                        <Image
                            style={styles.checkBoxImage}
                            source={isSelected ? selectedCheckBox : unSelectedCheckBox}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.seperator} />
            </View>
        );
    };




    renderAssignStoreItem = () => {
        const { errorMsg, assignStoreSearchText, assignStore, isSelectAll } = this.state
        return (<View style={styles.marginCategoryManage}>
            <View style={[styles.shopMainViewContainer, { marginTop: windowWidth * 3 / 100,flexDirection:FlexConditionManage(i18n.language)}]}>
                <View style={styles.searchIconCss}>
                    <Image source={search} style={styles.backIconCssAssignstore}></Image>
                </View>
                <View>
                    <TextInput
                        testID={"searchInputBox"}
                        onChangeText={this.updateTheSearchText}
                        keyboardType="default"
                        maxLength={30}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            this.searchAssignStore()
                        }}
                        placeholder={i18n.t('searchStore')}
                        placeholderTextColor="#9A9A9A"
                        style={[styles.searchTextinput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={assignStoreSearchText}
                    />
                </View>
            </View>
            {errorMsg.errorHeader.length > 1 && <View style={[styles.errorMsgContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Image source={errorIcon} style={i18n.language=='en'?styles.errorIcon:{...styles.errorIcon,marginRight:0,marginLeft:10}} />
                <View style={styles.errorTextContainer}>
                    <Text style={[styles.errorHeading,{textAlign:TextAlignManage(i18n.language)}]}>{errorMsg.errorHeader}</Text>
                    <Text style={[styles.errorDescription,{textAlign:TextAlignManage(i18n.language)}]}>{errorMsg.errorTitle}</Text>
                </View>
            </View>}
            {assignStore.length > 0 && <View style={[styles.selectAllContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.selectAllItemText}>{i18n.t('selectAllStore')} ({this.state.assignStore.length})</Text>
                <TouchableOpacity testID="allBtnCheckBox" onPress={this.toggleSelectAll}>
                    <Image
                        style={styles.checkBoxImage}
                        source={isSelectAll ? selectedCheckBox : unSelectedCheckBox}
                    />
                </TouchableOpacity>
            </View>
            }

            <View style={styles.subCateListMainView}>


                <FlatList
                    bounces={false}
                    testID={"Assignstore_show_flatlist_list"}
                    data={assignStore}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        !this.state.loading ? (
                            <View style={styles.listEmptyContainer}>
                                <Text style={[styles.listEmptyContainerTitleText,{textAlign:TextAlignManage(i18n.language)}]}>
                                    {this.state.assignStoreSearchText ? `${i18n.t('noStoreFoundNamed')} '${this.state.assignStoreSearchText}'` : i18n.t('noStoreFound')}
                                </Text>
                                <Text style={[{ fontSize: windowWidth * 4 / 100, color: '#75838D',textAlign:TextAlignManage(i18n.language)}, styles.noAssignstoreText]}>
                                    {this.state.assignStoreSearchText ? `${i18n.t('noStoreName')} '${this.state.assignStoreSearchText}'` : i18n.t('pleaseCreateStore')}
                                </Text>
                            </View>
                        ) : null
                    )}
                    
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={[styles.buttonsContainerAddProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity
                        testID="btnBack"
                        style={styles.backButtonAddProducts}
                        onPress={() => { this.props.navigation.goBack() }}

                    >
                        <Text style={styles.backText}>{i18n.t('Back')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        testID="btnConfirm"
                        style={styles.nextButtonAddproducts}
                        onPress={this.postCreateCatalogue}
                    >
                        <Text style={styles.nextButtonText}>{i18n.t('confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
    }




    // Customizable Area End

    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerAssignStore}>

                        <View style={[styles.headerViewMainAssignStore,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchAssignstore}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstore,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleAssignstore}>{i18n.t('assignStore')}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouch}>

                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 1 }}>
                            {this.renderAssignStoreItem()}

                        </View>



                    </View>


                </View>
            </SafeAreaView>
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


    },
    safeContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainAssignStore: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    viewContainerAssignStore: {
        flex: 1,
        alignSelf: 'center',
        width: windowWidth * 90 / 100,
    },
    backTouchAssignstore: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssAssignstore: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100
    },
    headerTitleAssignstore: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },
    addProductButton: {
        backgroundColor: "#CCBEB1",
        width: '48%',
        height: (windowHeight * 6.5) / 100,
        borderRadius: 2,
        marginTop: (windowWidth * 4) / 100,
        justifyContent: "center"
    },
    addProductButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Lato-Bold",
        fontSize: (windowWidth * 5) / 100,
        fontWeight: "800"
    },



    marginCategoryManage: {
        flex: 1,
        marginTop: windowWidth * 4 / 100
    },


    subCateListMainView: {
        flex: 1,

        width: windowWidth * 90 / 100,
        alignSelf: 'center'
    },


    noAssignstoreText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '500'
    },
    listEmptyContainer: {
        flex: 1,
        width: windowWidth * 90 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: "70%",
        justifyContent: "center"
    },
    emptyContainerView: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center"
    },

    listEmptyContainerTitleText: {
        fontSize: windowWidth * 5 / 100,
        fontFamily: 'Avenir-Heavy',
        color: '#375280'
    },
    shopMainViewContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 3,
        width: windowWidth * 90 / 100,
        alignSelf: 'center',
        paddingHorizontal:10
    },
    searchIconCss: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
        marginTop: windowWidth * 4 / 100,
    },
    searchTextinput: {
        width: windowWidth * 80 / 100,
        height: windowHeight * 6 / 100,
        padding: 10,
        color: '#375280',

    },




    checkBoxImage: {
        width: Scale(22),
        height: Scale(22),

    },
    selectAllContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Scale(20)
    },
    selectAllItemText: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "600",
    },
    renderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: "center"
    },
    renderSubLeftContainer: {
        flexDirection: "row",
        flex: 2,
    }
    , renderItemText: {
        marginLeft: Scale(15),
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(18),
        lineHeight: Scale(24),
        fontWeight: "600",
        marginTop: 3
    },
    renderItemImage: {
        height: Scale(32),
        width: Scale(32),
        borderRadius: Scale(16)
    },
    seperator: {
        height: 1,
        backgroundColor: "#D9D9D9",
        opacity: 1,
        marginVertical: Scale(22)
    },
    buttonsContainerAddProducts: {

        marginTop: Scale(40),
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: 20,
        alignItems: "center",



    },
    backButtonAddProducts: {
        width: "48%",
        backgroundColor: "#fff",
        height: (windowHeight * 6.5) / 100,

        borderRadius: 2,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#CCBEB1",
    },
    backText: {
        color: "#375280",
        textAlign: "center",
        fontFamily: "Lato-Regular",
        fontSize: (windowWidth * 5) / 100,
        fontWeight: "500",
    },
    nextButtonAddproducts: {
        backgroundColor: "#CCBEB1",
        height: (windowHeight * 6.5) / 100,
        width: "48%",
        borderRadius: 2,
        justifyContent: "center",

    },
    nextButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Lato-Bold",
        fontSize: (windowWidth * 5) / 100,
        fontWeight: "800",
    },
    errorMsgContainer: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 8) / 100,
        marginTop: (windowWidth * 4) / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderColor: 'rgba(220, 38, 38, 0.30)',
        backgroundColor: 'rgba(254, 226, 226, 0.30)',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: Scale(15),
    },
    errorIcon: {
        marginRight: 10,
        width: Scale(27),
        height: Scale(27),
        backgroundColor: "white"
    },
    errorTextContainer: {
        flex: 1,
        marginLeft: Scale(5)
    },
    errorHeading: {
        lineHeight: 24,
        fontSize: Scale(16),
        fontWeight: "700",
        color: "#DC2626",
        fontFamily: "Lato",
    },
    errorDescription: {
        fontSize: Scale(16),
        fontWeight: "400",
        color: "#DC2626",
        fontFamily: "Lato",
        lineHeight: 24,
    },

});
// Customizable Area End
