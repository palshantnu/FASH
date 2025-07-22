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
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, search } from "./assets";
import CategoriesController, { Props } from "./CategoriesController";
import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class Categories extends CategoriesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.container}>
          <View style={[styles.headerView,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackCategory"
              style={styles.backTouch}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCss,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>{this.state.headerMessage}</Text>
            </View>
            <View style={styles.filterTouch}>
            </View>
          </View>
        </View>

        {this.state.selectedTopCategory == 1 && (
          <View style={styles.marginCategoryManage}>
            <View style={styles.subCateListMainView}>
              <FlatList
                bounces={false}
                testID={"cate_show_flatlist_list"}
                data={this.state.categoryArr}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                columnWrapperStyle={{
                  flex: 1,
                  justifyContent: "space-between",
                }}
                numColumns={2}
                contentContainerStyle={{
                  paddingBottom: (windowHeight * 35) / 100,
                }}
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View
                      style={styles.flatListEmptyView}>
                      <Text style={styles.flatListEmptyText}>
                      {i18n.t('noRecordFoundText')}
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      testID="btnSubCateRedirectListView"
                      style={styles.cateListViewMainTouch}
                      onPress={() => {
                        this.subCategoryRedirection(item);
                      }}
                    >
                      <View>
                        <Image
                          source={ImageNotFound(item.attributes.image)}
                          style={styles.cateListViewImage}
                        ></Image>
                      </View>
                      <View style={styles.cateListOverlayView}></View>
                      <View style={styles.cateListNameView}>
                        <Text
                          numberOfLines={4}
                          style={[styles.cateText, styles.fontSetup,{ textAlign: TextAlignManage(i18n.language)}]}
                        >
                          {item.attributes.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.id}
              />
            </View>
          </View>
        )}

        {this.state.selectedTopCategory == 2 && (
          <View style={styles.shopMainView}>
            <View style={styles.shopMainViewContainer}>
              <View style={styles.searchIconCss}>
                <Image source={search} style={styles.backIconCss}></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_shippment_shipper"}
                  onChangeText={(txt) => {
                    this.setState({ shopSearchTxt: txt.trimStart() });
                    this.searchShops(txt);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('searchForAStoreText')}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinput,{ textAlign: TextAlignManage(i18n.language)}]}
                  value={this.state.shopSearchTxt.trimStart()}
                />
              </View>
            </View>

            <View style={styles.subCateListMainView}>
              <FlatList
                bounces={false}
                testID={"shopShowFlatlist"}
                data={this.state.shopArr}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                columnWrapperStyle={{
                  flex: 1,
                  justifyContent: "space-between",
                }}
                numColumns={2}
                onEndReachedThreshold={1}
                onEndReached={() =>
                  this.getAllShops("more", this.state.shopSearchTxt)
                }
                contentContainerStyle={{
                  paddingBottom: (windowHeight * 50) / 100,
                }}
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View
                    style={styles.flatListEmptyView}>
                      <Text style={styles.flatListEmptyText}>
                      {i18n.t('noStoresFoundNamedText')} '{this.state.shopSearchTxt}'
                      </Text>
                      <Text
                        style={[
                          {
                            fontSize: (windowWidth * 4) / 100,
                            color: "#75838D",
                          },
                          styles.fontSetup,
                        ]}
                      >
                        {i18n.t('thereNoStoresNamedText')} {this.state.shopSearchTxt}.
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      testID="btnShopDetailRedirect"
                      style={styles.shopListViewMainTouch}
                      onPress={() => this.shopDetailRedirect(item.id)}
                    >
                      <View>
                        <Image
                          source={ImageNotFound(item.attributes.image)}
                          style={styles.brandImage}
                        ></Image>
                      </View>
                      <View
                        style={{
                          marginTop: (windowWidth * 3) / 100,
                          width: (windowWidth * 40) / 100,
                        }}
                      >
                        <Text
                          numberOfLines={2}
                          style={[styles.brandText, styles.fontSetup,{ textAlign: TextAlignManage(i18n.language)}]}
                        >
                          {item.attributes.store_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  searchTextinput: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    color: "#375280",
    marginLeft: (windowWidth * 7) / 100,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerView: {
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCss: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  filterIconCss: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  mainButtonView: {
    backgroundColor: "#F4F4F4",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    width: (windowWidth * 90) / 100,
    borderRadius: 3,
  },
  categoryButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: (windowWidth * 85) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowHeight * 0.8) / 100,
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
  cateText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 4.5) / 100,
  },
  subCateListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  cateListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 22) / 100,
  },
  cateListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  cateListOverlayView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: (windowHeight * 20) / 100,
  },
  cateListNameView: {
    position: "absolute",
    marginTop: (windowHeight * 8.5) / 100,
    alignSelf: "center",
  },
  shopMainView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 4) / 100,
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
  brandImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  brandText: {
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
  },
  shopListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 27) / 100,
  },
  flatListEmptyText:{
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  flatListEmptyView:{
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 50) / 100,
  }
});
// Customizable Area End
