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
  Modal,
  FlatList,
  ListRenderItemInfo,
  Keyboard,
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import CustomSearch from "../../../components/src/CustomSearch";
import ImageNotFound from "../../../components/src/ImageNotFound";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { backIcon, cancel, plus } from "./assets";
import { CatalogueItem } from "./CatalogueSellerController";

import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Customizable Area End

import CatalogueSellerController, {
  Props
} from "./CatalogueSellerController";
import ImageReverseManage from "../../../components/src/ImageReverseManage";

export default class CatalogueSeller extends CatalogueSellerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  getList(item: ListRenderItemInfo<CatalogueItem>) {
    const type = item.item.type;

    if (type !== "addProduct") {
      const value = item.item.attributes;
      return (
        <TouchableOpacity
          testID="btnCatalogueListRedirection"
          style={styles.subCateListViewMainTouch}
          onPress={() => this.redirectToProductdetails(item.item.id)}
        >
          <View>
            <Image
              source={ImageNotFound(value.primary_image)}
              style={styles.subCatalogueListViewImage}
            />
          </View>
          <View>
            <Text numberOfLines={1} style={styles.subCatalogueText}>
              {value.name}
            </Text>
            <Text numberOfLines={1} style={styles.subCatalogueDesText}>
              {value.description}
            </Text>
            <Text style={styles.subCatalogueListViewPriceText}>
              {PriceConvertValue(value.primary_price,this.state.currencyLocal)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.flItem}
          testID="btnAddProducts"
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <View style={styles.addItem}>
            <Image source={plus} style={styles.plusIcon} />
            <Text style={styles.addStore}>{i18n.t("addNewProduct")}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  emptyCatalougeListRender = () => {
    return (
      <View style={styles.noProductsContainer}>
        <Text style={styles.noProductText}>{i18n.t("noAddProduct")}</Text>
        <TouchableOpacity
          testID="btnNext"
          style={styles.addProductButton}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Text style={styles.addProductButtonText}>
            {i18n.t("addProduct")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  catalougeListRender = () => {
    return (
      <View style={styles.marginCategoryManage}>
        <CustomSearch
          containerStyle={[
            styles.shopMainViewContainer,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
          testID={"searchInputBox"}
          onChangeText={this.updateTheSearchText}
          keyboardType="default"
          maxLength={30}
          returnKeyLabel="done"
          returnKeyType="done"
          onSubmitEditing={() => {
            Keyboard.dismiss();
            this.searchCatalogue();
          }}
          placeholder={i18n.t("search")}
          value={this.state.catalogueSearchTxt}
        />

        <View style={styles.subCateListMainView}>
          <FlatList
            bounces={false}
            testID={"catalogue_show_flatlist_list"}
            data={this.state.catalougeList}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            contentContainerStyle={{ paddingBottom: (windowHeight * 30) / 100 }}
            columnWrapperStyle={styles.wrapperstyle}
            numColumns={2}
            onEndReachedThreshold={1}
            onEndReached={() => this.getListRequest("more")}
            ListEmptyComponent={() =>
              !this.state.loading ? (
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.listEmptyContainerTitleText}>
                    No catalogue found named '{this.state.searchEmptyMessage}'
                  </Text>
                  <Text
                    style={[
                      styles.noCatalogueText
                    ]}
                  >
                    There are no catalogue named {this.state.searchEmptyMessage}
                    .
                  </Text>
                </View>
              ) : null
            }
            renderItem={(item) => this.getList(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />

          {this.state.loading && <CustomLoader />}
          <View style={styles.viewContainerCatalogueSeller}>
            <View style={styles.headerViewMainCatalogueSeller}>
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
                  style={[
                    styles.backIconCssCatalogue,
                    {
                      transform: [
                        { scaleX: ImageReverseManage(i18n.language) },
                        { scaleY: ImageReverseManage(i18n.language) },
                      ],
                    },
                  ]}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitleCatalogue}>
                  {i18n.t("catalogues")}
                </Text>
              </View>
              <View style={styles.filterIconTouch} />
            </View>

            {this.state.isProductList
              ? this.catalougeListRender()
              : !this.state.loading && this.emptyCatalougeListRender()}
          </View>
          <Modal
            animationType="slide"
            testID="modal"
            transparent={true}
            visible={this.state.modalVisible}
            statusBarTranslucent
            onRequestClose={() =>
              this.setState({ modalVisible: !this.state.modalVisible })
            }
          >
            <TouchableOpacity
              testID="closeBtn"
              style={styles.centeredView}
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  testID="cancelBtn"
                  onPress={() =>
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }
                  style={styles.crossContainer}
                >
                  <Image style={styles.crossIcon} source={cancel} />
                </TouchableOpacity>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>{i18n.t("addProduct")}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    testID="manualBtn"
                    style={styles.textStyleContainer}
                    onPress={() => this.navigationHandler("AddProduct")}
                  >
                    <Text style={styles.textStyle}>{i18n.t("manually")}</Text>
                  </TouchableOpacity>
                  <View style={styles.textStyleContainer}>
                    <TouchableOpacity
                      testID="excelsheetbtn"
                      onPress={() => this.navigationHandler("CsvFileUpload")}
                    >
                      <Text style={styles.textStyle}>
                        {i18n.t("excelSheet")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
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
    backgroundColor: "#ffffff",
  },
  safeContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  wrapperstyle: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: FlexConditionManage(i18n.language),
  },
  headerViewMainCatalogueSeller: {
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    alignContent: "center",
  },
  viewContainerCatalogueSeller: {
    flex: 1,
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
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
  addProductButton: {
    backgroundColor: "#CCBEB1",
    width: "48%",
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
  },
  addProductButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
  noProductText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    textAlign: "center",
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    paddingBottom: 5,
  },
  textStyle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
  },
  textStyleContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 15,
    borderBottomColor: "#E3E4E5",
  },
  apiTextStyleContainer: {
    marginHorizontal: 12,
  },
  crossContainer: {
    alignItems: "flex-end",
    paddingRight: 8,
    paddingTop: 5,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    fontWeight: "800",
    color: "#375280",
  },
  modalTextContainer: {
    paddingBottom: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "#E3E4E5",
  },
  crossIcon: {
    width: Scale(25),
    height: Scale(25),
  },

  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  subCatalogueHeartTouch: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  subCatalogueHeartIcon: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  subCatePriceText: {
    alignItems: "flex-start",
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    marginTop: (windowWidth * 5) / 100,
    fontFamily: "lato-Bold",
  },
  subCatalogueText: {
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    alignItems: "flex-start",
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  subCatalogueDesText: {
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 2) / 100,
    textAlign: "left",
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  subCatalogueListViewPriceText: {
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  subCateListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  subCatalogueListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  subCateListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 32) / 100,
  },
  subCateListViewMainAddProduct: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 29.5) / 100,
  },
  noCatalogueText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",fontSize: (windowWidth * 4) / 100, color: "#75838D"
  },
  listEmptyContainer: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 50) / 100,
  },
  listEmptyContainerTitleText: {
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  shopMainViewContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  searchIconCss: {
    position: "absolute",
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
    marginTop: (windowWidth * 4) / 100,
    left: (windowWidth * 3) / 100,
  },
  searchTextinput: {
    marginLeft: (windowWidth * 7) / 100,
    width: (windowWidth * 80) / 100,
    height: (windowHeight * 6) / 100,
    padding: 10,
    color: "#375280",
  },
  addButtonContainer: {
    alignItems: "center",
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
  },
  plusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Scale(5),
  },

  addedProductText: {
    color: "#375280",
    fontSize: 18,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "400",
  },
  flItem: {
    width: (windowWidth - Scale(60)) / 2,
    height: (windowHeight * 29.6) / 100,
    justifyContent: "space-between",
  },
  addItem: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: Scale(220),
  },
  plusIcon: {
    height: Scale(48),
    width: Scale(48),
  },
  addStore: {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 16,
    marginVertical: Scale(10),
    color: "#375280",
  },
});
// Customizable Area End
