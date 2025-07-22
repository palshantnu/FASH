import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  RefreshControl,
  Modal
} from "react-native";
import { backIcon } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from "../../../components/src/Scale";
import globalStyle from "../../../components/src/GlobalStyle";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import CustomformProductSourceListingController, {
  Props,
} from "./CustomformProductSourceListingController";

export default class CustomformProductSourceListing extends CustomformProductSourceListingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.header, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="btnBackDriverVehicleUpload"
        style={styles.backTouchFormSourceProduct}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backIcon, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitleFormSourceProduct}>
          {i18n.t("Product Sourcing")}
        </Text>
      </View>
      <View style={styles.extraViewFormSourceProduct} />
    </View>
  );


  Footer = () => (
    <View style={styles.footer}>
      <TouchableOpacity
        testID="addButton"
        style={styles.addButton}
        onPress={this.navigateToSourceProduct}
      >
        <Text style={styles.addText}>{i18n.t("Source a Product")}</Text>
      </TouchableOpacity>
    </View>
  );

  getList = (item: any) => {
    return (
      <View style={styles.card}>
        <View style={[{ flexDirection: FlexConditionManage(i18n.language) }]}>
          <Image
            style={styles.image}
            source={{
              uri:
                item.item.attributes.images[0].url ||
                "https://i.ibb.co/8Nb9QHL/image.png",
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: windowWidth * 0.03
            }}
          >
            <View style={[styles.details, { flexDirection: FlexConditionManage(i18n.language) }]}>
              <View style={{ width: (windowWidth * 30) / 100 }}>
                <Text style={[styles.title, { textAlign: TextAlignManage(i18n.language) }]}>
                  {item.item.attributes.product_name}
                </Text>
              </View>
              <View>
                <View style={styles.quotesContainer}>
                  <Text style={[styles.quotes, {textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("Quotes")} - {item.item.attributes.total_stylist_offer_requests}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.details, { flexDirection: FlexConditionManage(i18n.language) }]}>
              <Text style={styles.price}>
                {this.state.localCurrency}{this.formatNumber(item.item.attributes.min_price)} - {this.state.localCurrency}
                {this.formatNumber(item.item.attributes.max_price)}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cardFooter, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <TouchableOpacity
            testID={`deleteButton` + item.item.id}
            style={[styles.deleteButton , (item.item.attributes.request_status === "accepted") && styles.disabledButton]}
            onPress={() => this.handelDeleteModal(item.item.id)}
            disabled={item.item.attributes.request_status === "accepted"}
          >
            <Text style={styles.deleteText}>{i18n.t("Delete")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={`viewButton` + item.item.id}
            style={styles.viewButton}
            onPress={() => this.navigateToDetailProduct(item.item.id)}
          >
            <Text style={styles.viewText}>{i18n.t("View")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="productSourceListing">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={[
            styles.containerViewCustomformSourceProduct,
            globalStyle.headerMarginManage,
          ]}
        >
          <this.Header />
          <View style={styles.subCateListMainView}>
            <FlatList
              bounces={false}
              testID={"product_sourcing_flatlist_list"}
              data={this.state.apiData.data}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              contentContainerStyle={styles.flatContainerBottom}
              onEndReachedThreshold={1}
              ListEmptyComponent={() =>
                !this.state.loading ? (
                  <View style={styles.listEmptymainView} testID="emptyComp">
                    <Text style={styles.listEmptyTitleText}>
                      {i18n.t("EmptyProductSourcingListForm")}
                    </Text>
                  </View>
                ) : null
              }
              renderItem={(item) => this.getList(item)}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshData}
                />
              }
            />
          </View>
          <this.Footer />
        </View>
        <Modal
          testID="DeleteModal"
          animationType="slide"
          transparent={true}
          visible={this.state.deleteModal}>

          <View style={styles.modalMainView}>
            <SafeAreaView style={styles.modalSafeArea} />

            <View style={styles.modalButtonMainView}>
              <Text style={styles.cancelOrderText}>
                {i18n.t("deleteProductSourcingRequest")}
              </Text>

              <View style={[styles.modalTwoBtnView, { flexDirection: FlexConditionManage(i18n.language) }]}>
                <TouchableOpacity
                  testID={"btnCancelRequestNo"}
                  style={styles.cancelTouch}
                  onPress={() => {
                    this.handleDeleteModalClose()
                  }}>
                  <Text style={styles.noText}>{i18n.t("No")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  testID="btnDeleteRequestYes"
                  style={styles.yesTouch}
                  onPress={() => {
                    this.deleteRequestConfirm()
                  }}>
                  <Text style={styles.yesText}>{i18n.t("Yes")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  sb: {
    justifyContent: "space-between",
  },
  body: {
    padding: Scale(20),
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSafeArea: {
    flex: 0,
    backgroundColor: "#00000080"
  },
  modalButtonMainView: {
    height: (windowHeight * 22) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: (windowWidth * 7) / 100,
    justifyContent: "space-between",
  },
  menuBtn: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  cancelOrderText: {
    fontSize: (windowWidth * 4.3) / 100,
    color: "#375280",
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  },
  modalTwoBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelTouch: {
    backgroundColor: "#FFFFFF",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  noText: {
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
    color: '#375280'
  },
  yesTouch: {
    backgroundColor: "#CCBEB1",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
  },
  yesText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  headerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "700",
    color: "#375280",
    lineHeight: 26,
    marginHorizontal: Scale(12),
  },
  bell: {
    margin: Scale(4),
    height: Scale(18),
    width: Scale(18),
    resizeMode: "contain",
  },
  subCateListMainView: {
    flex: 2,
    marginTop: (windowWidth * 2) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  underReview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.05,
  },
  reviewTxt: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato",
    textAlign: "center",
  },
  storeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(16),
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 1,
  },
  selectStoreText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 26,
    fontFamily: "Lato",
    color: "#375280",
  },
  nextIcon: {
    height: Scale(24),
    marginTop: Scale(2),
    width: Scale(26),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: (windowWidth * 3) / 100,
  },
  headerTitleFormSourceProduct: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  extraViewFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  containerViewCustomformSourceProduct: {
    width: (windowWidth * 90) / 100,
    flex: 1,
    alignSelf: "center",
  },
  backTouchFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  flatContainerBottom: {
    paddingBottom: (windowHeight * 20) / 100,
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
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#75838D",
  },
  renderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
  },
  renderSubLeftContainer: {
    flexDirection: "row",
    width: (windowWidth * 40) / 100,
    marginTop: (windowWidth * 2) / 100,
  },
  renderItemImage: {
    height: (windowWidth * 32) / 100,
    width: (windowWidth * 32) / 100,
    borderRadius: Scale(24),
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  renderItemText: {
    marginLeft: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#375280",
    marginTop: 3,
  },
  renderItemTextStylish: {
    marginLeft: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#375280",
    marginTop: 3,
  },
  renderSubRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (windowWidth * 90) / 100,
    marginTop: (windowWidth * 2) / 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    marginVertical: 10,
    width: (windowWidth * 90) / 100,
  },
  image: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 25) / 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    // marginHorizontal: windowWidth * 0.03,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    textAlign: "left",
    marginHorizontal: 10
  },
  quotesContainer: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    width: (windowWidth * 20) / 100,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quotes: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: (windowWidth * 3) / 100,
  },
  price: {
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    textAlign: "right",
    alignSelf: "flex-end",
    marginHorizontal: 10
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (windowWidth * 90) / 100,
    marginTop: (windowWidth * 2) / 100,
  },
  disabledButton: {
    opacity: 0.5,
},
  deleteButton: {
    width: (windowWidth * 43) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#F87171",
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
    left:3
  },
  deleteText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
  viewButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 43) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  viewText: {
    color: "#ffffff",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
    padding: 16,
  },
  addText: {
    color: "#ffffff",
    fontFamily: "Lato-Bold",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  footer: {
    width: windowWidth,
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});
// Customizable Area End
