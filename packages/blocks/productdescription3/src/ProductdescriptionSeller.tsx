import React from "react";
// more core import statements

// Customizable Area Start
import {
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    ListRenderItem,
    ImageBackground

} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, trueSwitch, falseSwitch } from "./assets";
import Scale from "../../../components/src/Scale";
import { Dropdown } from "react-native-element-dropdown";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ProductdescriptionSellerController, {
    Props,
} from "./ProductdescriptionSellerController";
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { responsiveWidth } from "react-native-responsive-dimensions";
// Customizable Area End
export default class ProductdescriptionSeller extends ProductdescriptionSellerController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderImages: ListRenderItem<{
        id: string;
        uri: string;
    }> = ({ item }) => (
        <ImageBackground
            key={item.id}
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
            testID="images"
        />
    )

    // Customizable Area End

    render() {
        // Customizable Area Start

        const { sku, loading, productName, productPrice,productPrimaryPrice,primaryDiscountedPercentage,categoryname, subCategoryName } = this.state
        if (loading) {
            return (
                <SafeAreaView style={styles.safeContainerAddProducts}>
                    <CustomLoader />
                </SafeAreaView>
            );
        }
        // Merge Engine - render - Start
        return (
            <SafeAreaView style={styles.safeContainerAddProducts}>
                <ScrollView bounces={false} keyboardShouldPersistTaps="always" style={styles.containerAddProducts} showsVerticalScrollIndicator={false}>
                    <StatusBar
                        backgroundColor="#ffffff"
                        barStyle="dark-content"
                        hidden={false}
                        translucent={false}
                        networkActivityIndicatorVisible={false}
                    />

                    <View>
                        <View>
                            <FlatList
                                testID="product-images"
                                data={this.state.productImages}
                                keyExtractor={({ id }) => id}
                                renderItem={this.renderImages}
                                pagingEnabled={true}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                viewabilityConfig={this.viewabilityConfig}
                                onViewableItemsChanged={this.onViewableItemsChanged}
                            />
                            <View style={i18n.language=='en'?styles.btnRowLeft:styles.btnRowRight}>
                                <TouchableOpacity
                                    testID="goBack"
                                    style={styles.icon}
                                    onPress={() => this.props.navigation.pop()}
                                >
                                    <Image source={backIcon} style={[styles.backIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                                </TouchableOpacity>
                            </View>

                            {this.state.productImages.length > 1 ?
                                <View testID="swiperDots" style={[styles.row, styles.swiperDotsContainer]}>
                                    {this.state.productImages.map((item, index) => (
                                        <View
                                            testID="dots"
                                            key={item.id + '-dot'}
                                            style={
                                                index === this.state.productImageIndex
                                                    ? styles.activeDot
                                                    : styles.inactiveDot}
                                        />
                                    ))}
                                </View>
                                : null}
                        </View>

                        <View style={styles.topViewContainer}>
                            <TouchableOpacity style={styles.viewAsBuyerButton} testID="viewAsBuyerBtn" onPress={this.catalogueDetailRedirection}>
                                <Text style={styles.viewAsBuyerText}>{i18n.t('viewBuyer')}</Text>
                            </TouchableOpacity>
                            <View style={[styles.productContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <View style={{maxWidth:responsiveWidth(72)}}>
                                    <Text style={[styles.productNameTxt,{textAlign:TextAlignManage(i18n.language)}]}>{productName}</Text>
                                    <Text style={[styles.productDescriptionText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.productDescription}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={[styles.priceTxt,{textAlign:TextAlignManage(i18n.language)}]}>{PriceConvertValue(productPrice,this.state.localCurrency)}</Text>
                                    {primaryDiscountedPercentage != '0'?<Text style={[{ textAlign: TextAlignManage(i18n.language) }, styles.scratchedPriceTextDesSell]}>
                                    {PriceConvertValue(productPrimaryPrice, this.state.localCurrency)}</Text>:<View/>}
                                </View>
                            </View>


                            <View style={[styles.statusContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Dropdown
                                    testID={"color"}
                                    style={[styles.dropdown,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}
                                    placeholderStyle={[styles.placeholderStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    selectedTextStyle={[styles.selectedTextStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    data={this.state.colorlist}
                                    itemTextStyle={[styles.selectedTextStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={i18n.t('color')}
                                    iconStyle={[styles.iconStyle,{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)}]}
                                    iconColor="#375280"
                                    value={this.state.selectedColor}
                                    onChange={this.dropDownpUpdatedColorValue}
                                />
                                <Dropdown
                                    testID={"size"}
                                    style={[styles.dropdown,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}
                                    placeholderStyle={[styles.placeholderStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    selectedTextStyle={[styles.selectedTextStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    data={this.state.sizeList}
                                    itemTextStyle={[styles.selectedTextStyle,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100) }]}
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="id"
                                    placeholder={i18n.t('size')}
                                    iconStyle={[styles.iconStyle,{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)}]}
                                    iconColor="#375280"
                                    value={this.state.selectedSize}
                                    onChange={this.dropDownpUpdatedSizeValue}

                                />
                            </View>

                        </View>

                        <View style={styles.bodyViewContainer}>
                            <View style={[styles.bodyViewItmesContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.bodyViewItmesText}>{i18n.t('productCode')} :</Text>
                                <Text style={[styles.bodyViewItmesText, styles.bodyViewRightContainerTextColor]}>{sku}</Text>
                            </View>

                            <View style={[styles.bodyViewItmesContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.bodyViewItmesText}>{i18n.t('price')} :</Text>
                                <Text style={[styles.bodyViewItmesText, styles.bodyViewRightContainerTextColor]}>{PriceConvertValue(productPrimaryPrice,this.state.localCurrency)}</Text>
                            </View>

                            <View style={[styles.bodyViewItmesContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.bodyViewItmesText}>{i18n.t('discountPrice')} :</Text>
                                <Text style={[styles.bodyViewItmesText, styles.bodyViewRightContainerTextColor]}>{PriceConvertValue(productPrice,this.state.localCurrency)}</Text>
                            </View>

                            <View style={[styles.bodyViewItmesContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.bodyViewItmesText}>{i18n.t('category')} :</Text>
                                <Text style={[styles.bodyViewItmesText, styles.bodyViewRightContainerTextColor]}>{categoryname}</Text>
                            </View>

                            <View style={[styles.bodyViewItmesContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.bodyViewItmesText}>{i18n.t('subCategory')} :</Text>
                                <Text style={[styles.bodyViewItmesText, styles.bodyViewRightContainerTextColor]}>{subCategoryName}</Text>
                            </View>


                            <View style={styles.seperator} />
                        </View>

                        <View style={[styles.buttonsContainerAddProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity
                                testID="btnBack"
                                style={styles.backButtonAddProducts}
onPress={this.handleProduct}
                            >
                                <Text style={styles.backText}>{i18n.t('viewAnalytics')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                testID="editProductBtn"
                                style={styles.nextButtonAddproducts}
onPress={this.navigatesToEditProductPage}
                            >
                                <Text style={styles.nextButtonText}>{i18n.t('editProduct')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>
            </SafeAreaView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerAddProducts: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerAddProducts: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnRowLeft: {
        position: 'absolute',
        top: Scale(8),
        left: Scale(8)
    },
    btnRowRight: {
        position: 'absolute',
        top: Scale(8),
        right: Scale(8)
    },
    icon: {
        height: Scale(40),
        width: Scale(40),
        borderRadius: Scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: Scale(6)
    },
    backIcon: {
        height: Scale(20),
        width: Scale(20),
        resizeMode: 'contain',
    },
    image: {
        width: windowWidth,
        height: Scale(555)
    },
    row: {
        flexDirection: 'row',
    },
    swiperDotsContainer: {
        position: "absolute",

        bottom: Scale(25),
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },

    activeDot: {
        height: Scale(12),
        width: Scale(12),
        borderRadius: Scale(6),
        overflow: 'hidden',
        marginHorizontal: Scale(4),
        backgroundColor: '#375280'
    },
    inactiveDot: {
        height: Scale(8),
        width: Scale(8),
        borderRadius: Scale(4),
        overflow: 'hidden',
        marginHorizontal: Scale(4),
        backgroundColor: '#A4BCE5'
    },
    topViewContainer: {
        width:windowWidth*90/100,
        alignSelf:'center',
        backgroundColor: '#fff',
    },
    viewAsBuyerButton: {
        height: Scale(39),
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#CCBEB1',
        marginBottom: Scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:windowWidth*3/100
    },
    viewAsBuyerText: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(28),
        fontWeight: "700",
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Scale(17),
        alignSelf:'center',
        width:responsiveWidth(90)
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productNameTxt: {
        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: 22,
        lineHeight: Scale(32),
        fontWeight: "700",
    },
    productDescriptionText: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(18),
        lineHeight: Scale(26),
        fontWeight: "500",
    },
    priceTxt: {
        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: Scale(24),
        lineHeight: Scale(32),
        fontWeight: "700",
    },
    unavailableTxt: {
        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "700",
    },
    outOfStockTxt: {
        fontFamily: "Lato-Bold",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "700",
    },
    seperator: {
        height: 1,
        backgroundColor: "#E2E8F0",
        opacity: 1
    },
    bodyViewContainer: {
        width:windowWidth*90/100,
        alignSelf:'center',
        backgroundColor: '#fff',
    },
    bodyViewItmesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Scale(20)
    },
    bodyViewItmesText: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        lineHeight: Scale(24),
        fontWeight: "600",
    },
    bodyViewRightContainerTextColor: {
        color: "#94A3B8"
    },
    buttonsContainerAddProducts: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        alignItems: "center",

        marginHorizontal: Scale(23),
    },
    backButtonAddProducts: {
        width: "48%",
        backgroundColor: "#fff",
        height: (windowHeight * 6.5) / 100,
        marginTop: (windowWidth * 4) / 100,
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
        marginTop: (windowWidth * 4) / 100,
    },
    nextButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Lato-Bold",
        fontSize: (windowWidth * 5) / 100,
        fontWeight: "800",
    },
    switchSubContainer: {
        flexDirection: "row",


    },
    switchIcon: {
        width: Scale(48),
        height: Scale(24),
        marginLeft: Scale(9),
        marginTop: Scale(3)
    },
    placeholderStyle: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        fontWeight: "400",
    },
    selectedTextStyle: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        paddingRight: 10,
        fontWeight: "500",
    },
    iconStyle: {
        position:'absolute',
        width: 30,
        height: 30,

    },
    dropdown: {
        marginVertical: Scale(20),
        justifyContent: "center",
        width: (windowWidth * 42) / 100,

        height: Scale(50),
        borderWidth: 1,


        borderLeftColor: "#fff",
        borderRightColor: "#fff",
        borderTopColor: "#E2E8F0",
        borderBottomColor: "#E2E8F0"

    },
    scratchedPriceTextDesSell: {
        color: '#94A3B8',
        fontSize: windowWidth * 4.3 / 100,
        fontFamily: "Lato",
        fontWeight:'600',
        textDecorationLine:'line-through',
        alignSelf:'flex-end',
        marginTop:7
      },



});
// Customizable Area End
