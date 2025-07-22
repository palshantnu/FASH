import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
import { backIcon, filledHeart, filter, heartWishlist, search } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import Scale from "../../../components/src/Scale";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController";

export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  
  getList(item: any) {
    let value = item.item.attributes;
    return (
      // Customizable Area Start
      <TouchableOpacity
      style={styles.subCateListViewMainTouch}
        testID="btnCatalogueListRedirection"
        onPress={() => {
          this.catalogueDetailRedirection(item.item.id);
        }}
      >
        <View>
          <Image
            style={styles.subCateListViewImage}
            source={ImageNotFound(value.primary_image)}
          />
        </View>
        <View style={[styles.subCateHeartTouch,{flexDirection:FlexConditionManage(i18n.language)}]}>
          { 
           item.item.attributes.primary_discounted_percentage!= 0 &&
            <Text style={styles.discountText}>{item.item.attributes.primary_discounted_percentage}% {i18n.t('offText')}</Text>
          }
                      <TouchableOpacity
                        activeOpacity={0.8}
                        testID={"wishlist-" + item.index}
                        onPress={() => this.toggleWishlist(item.item)}
                      >
                        <Image
                          source={
                            item.item.attributes.is_wishlist ? filledHeart : heartWishlist
                          }
                          style={styles.subCateHeartIcon}
                          testID={item.item.attributes.is_wishlist ? "filled" : "empty"}
                        ></Image>
                      </TouchableOpacity>
                    </View>
        <View>
          <Text numberOfLines={1} style={[styles.subCateText, {textAlign: TextAlignManage(i18n.language)}]}>
            {value.name}
          </Text>
          <Text numberOfLines={1} style={[styles.subCateDesText,  {textAlign: TextAlignManage(i18n.language)}]}>
            {value.primary_store_name}
          </Text>
          <View style={[styles.priceContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,undefined,6),marginLeft:ManageDynamicMargin(i18n.language,6,undefined)},styles.subCateListViewPriceText]}> 
              {PriceConvertValue(item.item.attributes.primary_price,this.state.localCurrency)}
            </Text>
            <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.scratchedPriceText]}>
              {PriceConvertValue(item.item.attributes.primary_main_price,this.state.localCurrency)}</Text>
            </View>    
        </View>
      </TouchableOpacity>
      // Customizable Area End
    );
  }
  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          networkActivityIndicatorVisible={false}
          translucent={false}
          hidden={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.viewContainer}>
          <View style={[styles.headerViewMainCatalogue, { flexDirection : FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              testID="btnBackCatalogue"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                style={[styles.backIconCssCatalogue,  {  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]  }]}
                source={backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCatalogue}>
                {this.state.subCategoryName}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.filterIconTouch}
              onPress={this.goToFilter}
            >
              <Image
                resizeMode="contain"
                source={filter}
                style={styles.filterIconTouch}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.marginCategoryManage}>
            <View
              style={[
                styles.shopMainViewContainer,
                { marginTop: (windowWidth * 3) / 100, flexDirection : FlexConditionManage(i18n.language) },
              ]}
            >
              <View style={styles.searchIconCss}>
                <Image source={search} style={styles.backIconCssCatalogue} />
              </View>
              <View>
                <TextInput
                  onChangeText={this.checkSpecialCharacter}
                  testID={"txt_enter_catalogue"}
                  maxLength={30}
                  keyboardType="default"
                  returnKeyType="done"
                  returnKeyLabel="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.searchCatalogue();
                  }}
                  placeholderTextColor="#9A9A9A"
                  placeholder={i18n.t("search")}
                  value={this.state.catalogueSearchTxt}
                  style={[styles.searchTextinput, { textAlign : TextAlignManage(i18n.language) }]}
                />
              </View>
            </View>

            <View style={styles.subCateListMainView}>
              <FlatList
                data={this.state.catalogueArr}
                testID={"catalogue_show_flatlist_list"}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.flatColumWrapper}
                bounces={false}
                contentContainerStyle={styles.flatContainerBottom}
                onEndReachedThreshold={1}
                numColumns={2}
                onEndReached={() =>
                  this.getListRequest(
                    "more",
                    this.state.subCategoryId,
                    this.state.token
                  )
                }
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View style={styles.listEmptymainView} testID="emptyComp">
                      <Text style={styles.listEmptyTitleText}>
                        {i18n.t("noCatalogueFound")}
                      </Text>
                      <Text style={styles.fontSetup}>
                        {i18n.t("noCatalogueFoundMessage")}
                        {this.state.searchEmptyMessage}.
                      </Text>
                    </View>
                  ) : null
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => this.getList(item)}
              />
            </View>
          </View>
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
    backgroundColor: "#ffffff",
  },
  viewContainer: {
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  headerViewMainCatalogue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  subCateHeartTouchCat: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  scratchedPriceText: {
    color: '#94A3B8',
    fontSize: windowWidth * 3.7 / 100,
    fontFamily: 'Lato-Bold',
    textDecorationLine:'line-through'
  },
  subCateHeartIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  subCatePriceText: {
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    marginTop: (windowWidth * 5) / 100,
    fontFamily: "lato-Bold",
  },
  subCateText: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateDesText: {
    color: "#375280",
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  discountText:{
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
  subCateListViewPriceText: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  subCateListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 32) / 100,
  },
  subCateListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#75838D",
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
  subCateHeartTouch: {
    position: 'absolute',
    top: 7,
    flexDirection:"row",
    justifyContent:"space-between",
    alignSelf:'center',
    width:'90%'
  },
  shopMainViewContainer: {
    flexDirection: "row",
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
  },
  searchIconCss: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
    position: "absolute",
    marginTop: (windowWidth * 4) / 100,
    left: (windowWidth * 3) / 100,
  },
  searchTextinput: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    marginHorizontal: (windowWidth * 7) / 100,
    color: "#000000",
  },
  flatContainerBottom: {
    paddingBottom: (windowHeight * 60) / 100,
  },
  priceContainer:{
    flexDirection:'row',
    alignItems:'flex-end', 
    marginTop: windowWidth * 2 / 100,
    flexWrap:'wrap',
  },
  flatColumWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
});
// Customizable Area End
