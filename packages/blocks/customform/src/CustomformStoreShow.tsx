import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";

import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import AlignSelfManage from '../../../components/src/AlignSelfManage'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { backIcon } from "./assets";
import globalStyle from "../../../components/src/GlobalStyle";
import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomSearch from "../../../components/src/CustomSearch";

import CustomformStoreShowController, {
  Props,
} from "./CustomformStoreShowController";
// Customizable Area End

export default class CustomformStoreShow extends CustomformStoreShowController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  getList(item: any) {
    let value = item.item;
    return (
      // Customizable Area Start
      <View>
        {value.id === "0" ? (
          <TouchableOpacity
            testID="btnNewStoreRedirection"
            style={styles.storeShowListViewMainTouch}
            onPress={() => {
              this.addNewStore();
            }}
          >
            <View>
              <Image
                source={value.attributes.image}
                style={styles.storeShowListViewImage}
              ></Image>
            </View>
            <View>
              <Text numberOfLines={1} style={[styles.subCateText]}>
                {value.store_name}
              </Text>
              <View style={styles.flatlistStoreStatus}>
                <Text numberOfLines={1} style={styles.subCateDesText}>
                  {value.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.storeShowListViewMainTouch}>
            <View>
              <Image
                source={ImageNotFound(value.attributes.image)}
                style={styles.storeShowListViewImage}
              ></Image>
            </View>
            <View>
              <Text numberOfLines={1} style={[styles.subCateText,{textAlign:TextAlignManage(i18n.language)}]}>
                {value.attributes.store_name}
              </Text>
              <View
                style={[
                  value.attributes.status === "Pending"
                    ? styles.statusPendingView
                    : styles.statusApprovedView
                ,{alignSelf:AlignSelfManage(i18n.language)}]}
              >
                <Text
                  numberOfLines={1}
                  style={
                    value.attributes.status === "Pending"
                      ? styles.subCateDesPendingText
                      : styles.subCateDesText
                  }
                >
                  {value.attributes.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      // Customizable Area End
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerStore}>
        <SafeAreaView style={styles.safeContainerViewStore} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={[globalStyle.headerMarginManage, styles.containerViewStore]}
        >
          <View style={[styles.headerViewStore,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackMyStore"
              style={styles.backTouchStore}
              onPress={() => {
                this.manageBackStore();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconSty,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
              ></Image>
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleStore}>{i18n.t('myStoresText')}</Text>
            </View>
            <View style={styles.filterTouchStore}></View>
          </View>

          <View style={styles.marginCategoryManage}>
            <CustomSearch
              testID={"txt_enter_store"}
              value={this.state.storeSearchTxt}
              onChangeText={(txt) => {
                this.setState({ storeSearchTxt: txt.trimStart() });
              }}
              keyboardType="default"
              maxLength={30}
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                this.searchStore();
              }}
              placeholder={i18n.t('searchStore')}
              containerStyle={[styles.shopMainViewContainerStoreShow]}
            />

            <View style={styles.storeShowListMainView}>
              <FlatList
                bounces={false}
                testID={"store_show_flatlist_list"}
                data={this.state.storeArr}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                contentContainerStyle={styles.flatlistContainer}
                columnWrapperStyle={styles.flatlistColumnWrap}
                numColumns={2}
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View style={styles.listEmptymainViewStoreShow}>
                      <Text style={styles.listEmptyTitleTextStoreShow}>
                      {i18n.t('noStoreFound')}
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={(item) => this.getList(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnCtnViewButton}>
          <TouchableOpacity
            testID="btnStoreContinue"
            style={styles.btnCtnButton}
            onPress={() => {
              this.uploadDocumentRedirection();
            }}
          >
            <Text style={styles.ctnButtonText}>{i18n.t('continueText')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainerViewStore: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainerStore: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewStore: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  headerViewStore: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  backTouchStore: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconSty: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleStore: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterTouchStore: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  subCateText: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateDesText: {
    color: "#059669",
    fontSize: (windowWidth * 3.5) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  subCateDesPendingText: {
    color: "#D97706",
    fontSize: (windowWidth * 3.5) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  storeShowListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  storeShowListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 29) / 100,
  },
  storeShowListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  listEmptymainViewStoreShow: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 50) / 100,
  },
  listEmptyTitleTextStoreShow: {
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  shopMainViewContainerStoreShow: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
  },
  searchIconCssStoreShow: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
    position: "absolute",
    marginTop: (windowWidth * 4) / 100,
    left: (windowWidth * 3) / 100,
  },
  searchTextinputStoreShow: {
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    color: "#000000",
    marginLeft: (windowWidth * 7) / 100,
  },
  ctnButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100,
  },
  btnCtnViewButton: {
    backgroundColor: "#fff",
    width: windowWidth,
    height: (windowHeight * 9) / 100,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0.8,
    borderTopColor: "#CCBEB1",
  },
  btnCtnButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignSelf: "center",
    bottom: 5,
  },
  flatlistContainer: {
    paddingBottom: (windowHeight * 60) / 100,
  },
  flatlistColumnWrap: {
    flex: 1,
    justifyContent: "space-between",
  },
  flatlistStoreStatus: {
    width: (windowWidth * 25) / 100,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  statusPendingView: {
    backgroundColor: "#FEF3C7",
    width: (windowWidth * 20) / 100,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  statusApprovedView: {
    backgroundColor: "#D1FAE5",
    width: (windowWidth * 20) / 100,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
});
