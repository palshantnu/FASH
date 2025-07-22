import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text,
    FlatList,
    StatusBar,
    TextInput,
    ScrollView,
    Keyboard,
    Dimensions
} from "react-native";
import * as IMG_CONST from './assets';
const windowWidth = Dimensions.get("window").width;
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import i18n from '../../../components/src/i18n/i18n.config'
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import StoreProfileController, { Props } from "./StoreProfileController";

export default class StoreProfile extends StoreProfileController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start
    renderProduct(item: any) {
        let itemValue = item.item
        return (
            <TouchableOpacity
                testID="productListBtn"
                style={styles.productBtnContainer} onPress={()=>{this.storeCatalogueDetailRedirection(itemValue.id)}}>
                <View style={styles.productImgConStyle}>
                    <Image source={ImageNotFound(itemValue.attributes.primary_image)} style={styles.productImgStyle} />
                    <View style={[styles.subCateHeartTouchStore,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        {itemValue.attributes.primary_discounted_percentage !='0' ?<Text style={styles.discountTextStore}>{itemValue.attributes.primary_discounted_percentage}% {i18n.t('offText')}</Text>:<View/>}
                        <TouchableOpacity
                            testID='productwishBtnID'
                            onPress={() => this.toggleWishlistItem(itemValue)}>
                            <Image source={itemValue.attributes.is_wishlist ? IMG_CONST.wishlistselect : IMG_CONST.wishlistUnselect} style={styles.wishListIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.desContainer}>
                    <Text style={[styles.productName,{textAlign:TextAlignManage(i18n.language)}]}>
                        {itemValue.attributes.name}
                    </Text>
                    <Text numberOfLines={1} style={[styles.productDes,{textAlign:TextAlignManage(i18n.language)}]}>
                        {itemValue.attributes.description}
                    </Text>
                    <View style={[styles.priceContainerStore,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,undefined,6),marginLeft:ManageDynamicMargin(i18n.language,6,undefined)},styles.subCateListViewPriceTextStore]}> 
                        {PriceConvertValue(itemValue.attributes.primary_price,this.state.localCurrency)}
                        </Text>
                       {itemValue.attributes.primary_discounted_percentage !='0' ? <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.scratchedPriceTextStore]}>
                        {PriceConvertValue(itemValue.attributes.primary_main_price,this.state.localCurrency)}</Text>:<View/>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    // Customizable Area End

    render() {
        return (
            //Merge Engine DefaultContainer
            <View style={styles.mainConatiner}>
                {/* Customizable Area Start */}
                {this.state.isloading && <CustomLoader />}
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
                <SafeAreaView style={styles.safeAreaContainer}>
                    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                        <ImageBackground
                            testID="bgImgID"
                            source={this.state.storeOneBgImg ? { uri: this.state.storeOneBgImg } : IMG_CONST.bgImg}
                            style={styles.bannerImgStyle}>
                            <View style={styles.overlay}></View>
                            <View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <TouchableOpacity
                                    testID='goBckID'
                                    style={styles.backBtnStyle}
                                    onPress={() => this.props.navigation.goBack()}
                                >
                                    <Image source={IMG_CONST.backIconWBG} style={[styles.backIconImg,{ transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]} />
                                </TouchableOpacity>
                                <View />
                            </View>
                        </ImageBackground>
                        <View style={styles.ProductAreaContainer}>
                            <View style={styles.desContainer}>
                                <Text style={[styles.storeNameStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                                    {this.state.storeName}
                                </Text>
                                <Text style={[styles.storeAddresStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                                    {this.state.storeAddress}
                                </Text>
                                <TouchableOpacity testID="storeInfoBtnID"
                                    onPress={() => {
                                        this.goToStoreDetailScreen()
                                    }}
                                >
                                    <Text style={[styles.storeinfoTextStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                                        {i18n.t('storeInfoContact')}
                                    </Text>
                                </TouchableOpacity>
                                <View style={[styles.searchNFContainer,{marginRight:ManageDynamicMargin(i18n.language,16,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,undefined), flexDirection : FlexConditionManage(i18n.language)}]}>
                                    <View style={[styles.searchContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <Image source={IMG_CONST.search} style={styles.searchIcon} />
                                        <TextInput
                                            testID="searchTextID"
                                            style={[styles.searchInputStyle,{textAlign:TextAlignManage(i18n.language)}]}
                                            placeholder={i18n.t('searchProductText')}
                                            placeholderTextColor="#94A3B8"
                                            onChangeText={txt => {
                                                this.setState({ storeSearchTxt: txt.trimStart() })
                                            }}
                                            onSubmitEditing={() => {
                                                Keyboard.dismiss();
                                                this.searchstoreCatalog(this.state.storeSearchTxt)
                                            }}
                                            value={this.state.storeSearchTxt.trimStart()}
                                        />
                                    </View>
                                    <View style={styles.filterContainer}>
                                        <TouchableOpacity testID="filterBtnID" onPress={this.goToFilter}>
                                            <Image source={IMG_CONST.filtern} style={styles.filterIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.productNameStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                                {i18n.t('products')}
                            </Text>
                            <FlatList
                                testID="productListId"
                                data={this.state.catalogArray}
                                style={styles.productListContainer}
                                numColumns={2}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={item => this.renderProduct(item)}
                                ListEmptyComponent={(!this.state.isloading ?
                                    <View style={styles.listEmptymainView}>
                                        <Text style={styles.listEmptyTitleText}>
                                            {i18n.t('noRecordFoundText')}
                                        </Text>
                                    </View>
                                    : null)}
                                keyExtractor={(item: any) => item.id}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
                {/* Customizable Area End */}
            </View>
            //Merge Engine End DefaultContainer
        );
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    mainConatiner: {
        flex: 1,
    },
    safeAreaContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    bannerImgStyle: {
        resizeMode: 'center',
        width: '100%',
        height: 255
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop:20
    },
    backIconImg: {
        width: 44,
        height: 44,
    },
    backBtnStyle: {
        width: 44,
        height: 44,
    },
    wishListBtnStyle: {
        right: 16,
        top: 20,
        position: 'absolute',
    },
    wishIconImg: {
        width: 38,
        height: 38,
    },
    bannerTextStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        marginBottom: 63,
    },
    bannerTextImg: {
        width: 142,
        height: 69
    },
    ProductAreaContainer: {
        padding: 16,
        backgroundColor: '#fff'
    },
    desContainer: {
        padding: 0,
        paddingBottom: 14
    },
    storeNameStyle: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        color: '#375280',
        letterSpacing: 0.24,
        paddingBottom: 10,
        textTransform: 'capitalize'
    },
    storeAddresStyle: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        fontWeight: '500',
        color: '#94A3B8',
        paddingBottom: 15
    },
    storeinfoTextStyle: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        color: '#375280',
        textDecorationLine: 'underline',
        paddingBottom: 4,
        paddingVertical: 2
    },
    searchNFContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    searchContainer: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '82%',
        marginRight: 16,
        height: 50
    },
    searchIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 4
    },
    searchInputStyle: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        fontWeight: '400',
        color: '#375280',
        width: '90%',
    },
    filterContainer: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50
    },
    filterIcon: {
        width: 32,
        height: 32,
        tintColor: '#375280'
    },
    productContainer: {
        paddingHorizontal: 16,
        backgroundColor: 'red',
        marginBottom: 50,
    },
    productNameStyle: {
        fontSize: 18,
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        color: '#375280',
        paddingBottom: 10
    },
    productListContainer: {
        marginBottom: 200,
    },
    productBtnContainer: {
        width: '48%',
        marginRight: 16,
    },
    productImgConStyle: {
        width: '100%',
        height: 192,
        borderRadius: 4,
    },
    productImgStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    wishBtnStyle: {
        position:'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
    },
    wishListIcon: {
        width: 28,
        height: 28,
        resizeMode: 'cover',
    },
    productDes: {
        color: '#375280',
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        fontWeight: 'normal',
    },
    productName: {
        color: '#375280',
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        fontWeight: '500',
        paddingVertical: 4
    },
    productPrice: {
        fontFamily: 'Lato-Regular',
        color: '#375280',
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 6
    },
    overlay: {
        opacity: 0.4,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    listEmptymainView: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    listEmptyTitleText: {
        fontSize: 16,
        fontFamily: 'Avenir-Heavy',
        color: '#375280'
    },
    discountTextStore:{
        backgroundColor:'#F1F5F9CC',
        paddingHorizontal:6,
        fontSize:windowWidth * 3 / 100,
        alignSelf:'center',
        paddingVertical:4,
        borderRadius:2,
        fontFamily: 'Lato-Regular',
        fontWeight: '800',
        color:'#375280'
      },
      subCateHeartTouchStore: {
        position: 'absolute',
        top: 7,
        flexDirection:"row",
        justifyContent:"space-between",
        alignSelf:'center',
        width:'90%'
      },
      priceContainerStore:{
        flexDirection:'row',
        alignItems:'flex-end', 
        marginTop: windowWidth * 2 / 100,
        flexWrap:'wrap',
      },
      scratchedPriceTextStore: {
        color: '#94A3B8',
        fontSize: windowWidth * 3.7 / 100,
        fontFamily: 'Lato-Bold',
        textDecorationLine:'line-through',
        marginBottom:2
      },
      subCateListViewPriceTextStore: {
        color: '#375280',
        fontSize: windowWidth * 4.2 / 100,
        fontFamily: 'Lato-Bold',
      },
});
// Customizable Area End
