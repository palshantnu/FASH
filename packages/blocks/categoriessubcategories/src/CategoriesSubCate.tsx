import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  ListRenderItemInfo,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, search } from "./assets";

import { Category, SubCategory } from "./response";

import CategoriesSubCateController, {
  Props,
} from "./CategoriesSubCateController";
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import FlatlistArabicManage from "../../../components/src/FlatlistArabicManage";
// Customizable Area End

export default class CategoriesSubCate extends CategoriesSubCateController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getCategoryList = (item: ListRenderItemInfo<Category>) => {
    let value = item.item.attributes;
    return (
      <TouchableOpacity
        testID="btn_selected_category"
        style={[
          {
            backgroundColor:
              this.state.selectedCategoryId == value.id
                ? "#CCBEB1"
                : "#F4F4F4",
          },
          styles.categoryFlatTouchSubCate,
        ]}
        onPress={() => {
          this.selectStatus(value);
        }}
      >
        <Text
          style={[
            {
              color:
                this.state.selectedCategoryId == value.id
                  ? "#ffffff"
                  : "#375280",
            },
            styles.fontSetup,
          ]}
        >
          {value.name}
        </Text>
      </TouchableOpacity>
    );
  };

  getSubCategoryListView = (item: ListRenderItemInfo<SubCategory>) => {
    let value = item.item.attributes;
    return (
      <TouchableOpacity
        testID="btn_select_subCategory"
        style={[
          {
            backgroundColor:
              this.state.selectedSubCategoryId == value.id
                ? "#CCBEB1"
                : "#ffffff",
          },
          styles.listViewCategoryTouch,
        ]}
        onPress={() => {
          this.selectSubSubCategoryStatus(value);
        }}
      >
        <View>
          <Text
            style={[
              {
                color:
                  this.state.selectedSubCategoryId == value.id
                    ? "#ffffff"
                    : "#375280",
                textAlign: TextAlignManage(i18n.language)
              },
              styles.marginLeftManage,
              styles.fontSetup
            ]}
          >
            {value.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerSubSub}>
        <SafeAreaView style={styles.safeContainerSub} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.container}>
          <View style={[styles.headerViewCateSub,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackSubSubCategory"
              style={styles.backTouchSubCate}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCssSubCate,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleSubCate}>{i18n.t('categoriesText')}</Text>
            </View>
            <View style={styles.extraViewTouch}>
            </View>
          </View>

          <View style={styles.mainCateSubCateView}>
            <View style={styles.categoryButtonFlatView}>
              <FlatList
                testID={"category_data_show"}
                horizontal={true}
                bounces={false}
                data={this.state.categoryArr}
                inverted={FlatlistArabicManage(i18n.language)}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: (windowWidth * 12) / 100,
                }}
                scrollEnabled={true}
                automaticallyAdjustContentInsets={true}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeprator} />
                )}
                renderItem={(item) => this.getCategoryList(item)}
                keyExtractor={(item, index) => item.id}
              />
            </View>
          </View>
        </View>

        <View style={styles.marginCategoryManage}>
          <View
            style={[
              styles.shopMainViewContainer,
              { marginTop: (windowWidth * 3) / 100,
              flexDirection:FlexConditionManage(i18n.language)
             },
            ]}
          >
            <View style={styles.searchIconCss}>
              <Image source={search} style={styles.backIconCssSubCate}></Image>
            </View>
            <View>
              <TextInput
                testID={"txt_enter_sub_subcategory"}
                onChangeText={(txt) => {
                  this.setState({ subCategorySearchTxt: txt.trimStart() });
                  this.searchSubSubCategory(txt.trimStart());
                }}
                keyboardType="default"
                maxLength={30}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholder={i18n.t('search')}
                placeholderTextColor="#9A9A9A"
                style={[styles.searchTextinputCate,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*7/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*7/100)}]}
                value={this.state.subCategorySearchTxt}
              />
            </View>
          </View>

          <View style={styles.shopProductMainVIew}>
            <Text style={[styles.shopProductText,{ textAlign: TextAlignManage(i18n.language) }]}>{i18n.t('shopByProductText')}</Text>
          </View>

          <View style={[styles.categoryListMainView,{ flexDirection: FlexConditionManage(i18n.language) }]}>
            <View style={styles.categoryListSecondView}>
              <FlatList
                bounces={false}
                testID={"subcategory_list_show"}
                data={this.state.subCategoryArr}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 400 }}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeprator} />
                )}
                renderItem={(item) => this.getSubCategoryListView(item)}
                keyExtractor={(item, index) => item.id}
              />
            </View>
            <View style={styles.subCategoryFlatListMainView}>
              <FlatList
                testID={"sub_sub_cate_show_flatlist"}
                data={this.state.subSubCategoryArr}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                bounces={false}
                contentContainerStyle={styles.subCateContainer}
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View style={styles.emptyLisyView}>
                      <Text style={styles.emptyFlatlistText}>
                      {i18n.t('noRecordFoundText')}
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      testID="btnSubCateCatalogueRedirect"
                      style={styles.subCategoryFlatlistTouch}
                      onPress={() => {
                        this.subCategoryRedirection(item);
                      }}
                    >
                      <Text numberOfLines={2} style={[styles.subCateText,{textAlign: TextAlignManage(i18n.language)}]}>
                        {item.attributes.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.id}
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
  searchTextinputCate: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    color: "#375280",
    // marginLeft: (windowWidth * 7) / 100,
  },
  mainContainerSubSub: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  safeContainerSub: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  headerViewCateSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchSubCate: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssSubCate: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  filterIconCssSubCate: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitleSubCate: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  extraViewTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  mainCateSubCateView: {
    backgroundColor: "#F4F4F4",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    width: (windowWidth * 90) / 100,
    borderRadius: 3,
    justifyContent: "center",
  },
  categoryButtonFlatView: {
    justifyContent: "center",
    width: (windowWidth * 85) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  categoryFlatTouchSubCate: {
    borderRadius: 3,
    padding: 7,
  },
  categoryTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 4.8) / 100,
    borderRadius: 3,
    justifyContent: "center",
  },
  categoryText: {
    textAlign: "center",
    fontSize: (windowWidth * 4.5) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  categoryListView: {
    flexDirection: "row",
    width: (windowWidth * 20) / 100,
    borderRadius: 3,
  },
  categoryListMainView: {
    marginTop: (windowWidth * 5) / 100,
    flexDirection: "row",
    width: windowWidth,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#F2F3F5",
  },
  categoryListSecondView: {
    width: (windowWidth * 35) / 100,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderColor: "#F2F3F5",
    borderTopWidth: 1,
    borderTopColor: "#F2F3F5",
  },
  listViewCategoryTouch: {
    borderRadius: 3,
    padding: 5,
    minHeight: (windowHeight * 7) / 100,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F5",
    justifyContent: "center",
  },
  itemSeprator: {
    width: (windowWidth * 2) / 100,
  },
  marginLeftManage: {
    marginLeft: (windowWidth * 4) / 100,
  },
  subCategoryFlatListMainView: {
    width: (windowWidth * 65) / 100,
    marginLeft: (windowWidth * 2) / 100,
  },
  subCategoryFlatlistTouch: {
    width: (windowWidth * 60) / 100,
    padding: (windowWidth * 3) / 100,
  },
  subCateText: {
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    fontFamily: "Lato-Regular",
  },
  shopMainViewContainer: {
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
  shopProductMainVIew: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 3) / 100,
  },
  shopProductText: {
    fontSize: (windowWidth * 4.5) / 100,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  emptyLisyView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 50) / 100,
  },
  emptyFlatlistText: {
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  subCateContainer: {
    paddingBottom: (windowHeight * 50) / 100,
  },
});
// Customizable Area End
