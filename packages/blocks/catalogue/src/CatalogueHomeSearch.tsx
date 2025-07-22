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
import { backIcon, filledHeart, filter, heartWishlist, search } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController";

export default class CatalogueHomeSearch extends CatalogueController {
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
        testID="btnCatalogueListRedirection"
        style={styles.subCateListViewMainTouch}
        onPress={() => {
          this.catalogueDetailRedirection(item.item.id);
        }}
      >
        <View>
          <Image
            source={ImageNotFound(value.primary_image)}
            style={styles.subCateListViewImage}
          />
        </View>
        <TouchableOpacity 
          style={[styles.subCateHeartTouchHome, { left : i18n.language == "ar" ? 5 : 0 }]}
          activeOpacity={0.8}
          onPress={() => this.toggleWishlist(item.item)}
          testID={"wishlist" + item.index}
        >
          <Image
            testID={value.is_wishlist ? "filled" : "emptyHeart"}
            style={styles.subCateHeartIcon}
            source={value.is_wishlist ? filledHeart : heartWishlist}
          />
        </TouchableOpacity>
        <View>
          <Text numberOfLines={1} style={[styles.subCateTextHome, {textAlign : TextAlignManage(i18n.language)}]}>
            {value.name}
          </Text>
          <Text numberOfLines={1} style={[styles.subCateDesTextHome, { textAlign: TextAlignManage(i18n.language) }]}>
            {value.description}
          </Text>
          <Text style={[styles.subCateListViewPriceTextHome, [{ textAlign: TextAlignManage(i18n.language) }]]}>
            {PriceConvertValue(value.primary_price,this.state.localCurrency)}
          </Text>
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
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.viewContainer}>
          <View style={[styles.headerHomeSearch, { flexDirection : FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              testID="btnBackCatalogue"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconHome, {  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]  }]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleHome}>{i18n.t("search")}</Text>
            </View>
            <TouchableOpacity
              style={styles.filterIconHome}
              onPress={this.goToFilterFromHome}
            >
              <Image
                resizeMode="contain"
                source={filter}
                style={[styles.filterIconHome,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]  }]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.marginCategoryManage}>
            <View
              style={[
                styles.shopMainViewContainer,
                {flexDirection : FlexConditionManage(i18n.language)},
                { marginTop: (windowWidth * 3) / 100},
              ]}
            >
              <View style={styles.searchIconCss}>
                <Image source={search} style={styles.backIconHome} />
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_catalogue"}
                  onChangeText={this.checkSpecialCharacter}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  style={[styles.searchTextinput, { textAlign : TextAlignManage(i18n.language) }]}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.searchCatalogue();
                  }}
                  placeholderTextColor="#9A9A9A"
                  placeholder={i18n.t("searchHome")}
                  value={this.state.catalogueSearchTxt}
                />

              </View>
            </View>

            <View style={styles.subCateListMainView}>
              <FlatList
                bounces={false}
                testID={"catalogue_show_flatlist_list"}
                contentContainerStyle={styles.flatContainerBottom}
                data={this.state.catalogueArr}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={1}
                columnWrapperStyle={styles.flatColumWrapper}
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View style={styles.listEmptymainView} testID="emptyComp">
                      <Text style={styles.listEmptyTitleText}>
                      {i18n.t("noMatchText")}
                      </Text>
                      <Text style={styles.fontSetup}>
                      {i18n.t("tryDiffText")}
                      </Text>
                    </View>
                  ) : null
                }
                onEndReached={() =>
                  this.getListRequest(
                    "more",
                    this.state.subCategoryId,
                    this.state.token
                  )
                }
                renderItem={(item) => this.getList(item)}
                keyExtractor={(item, index) => index.toString()}
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
  headerHomeSearch: {
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
  backIconHome: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleHome: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterIconHome: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  viewContainer: {
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  subCateHeartTouchHome: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  subCateHeartIcon: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  subCatePriceText: {
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    marginTop: (windowWidth * 5) / 100,
    fontFamily: "lato-Bold",
  },
  subCateTextHome: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateDesTextHome: {
    color: "#375280",
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  subCateListViewPriceTextHome: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#75838D",
    textAlign:'center'
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
    textAlign:'center'
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
  searchTextinput: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    color: "#375280",
    marginHorizontal: (windowWidth * 7) / 100,
  },
  flatContainerBottom: {
    paddingBottom: (windowHeight * 60) / 100,
  },
  flatColumWrapper: {
    flex: 1,
    justifyContent: "space-between",
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
});
// Customizable Area End
