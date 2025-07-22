import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Modal,
  ListRenderItem,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  backIcon,
  searchIcon,
  groupLogo,
  bell,
  heart,
  storeBox,
  categoryBox,
  box1,
  box2,
  box3,
  box4,
  mycart,
  storeBoxArabic,
  categoryBoxArabic,
} from "./assets";
import DashboardAsBuyerController, {
  Itemtype,
  Props,
  WishlistType,
} from "./DashboardAsBuyerController";
import AntDesign from "react-native-vector-icons/AntDesign";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { deviceWidth } from "framework/src/Utilities";
import CheckBox from "@react-native-community/checkbox";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const oneUnit = windowWidth / 428;
const heightUnit = windowHeight / 926;
let ModalContent = [
  "Personal Wishlist",
  "Theresa Webb",
  "Dianne Russell",
  "Wade Warren",
  "Jenny Wilson",
  "Robert Fox",
  "Darrell Steward",
];
// Customizable Area End

export default class DashboardAsBuyer extends DashboardAsBuyerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  Myorders = () => {
    return (
      <View
        style={{
          width: 390 * oneUnit,
          alignSelf: "center",
          borderStartColor: "green",
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={[styles.textHeadingOrder, { textAlign : TextAlignManage(i18n.language) }]}>{i18n.t("myOrderText")}</Text>
        </View>

        <View style={[styles.orderContainer, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <TouchableOpacity testID="Processing" onPress={()=>{this.orderPageRedirection("Processing")}} style={{ alignItems: "center" }}>
            <Image source={box1} style={styles.smallBox} />
            <Text style={styles.textsOrder}>{i18n.t("processingText")}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="Delivered" onPress={()=>{this.orderPageRedirection("Delivered")}} style={{ alignItems: "center" }}>
            <Image source={box2} style={styles.smallBox} />
            <Text style={styles.textsOrder}>{i18n.t("deliveredText")}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="Returns" onPress={()=>{this.orderPageRedirection("Returns")}} style={{ alignItems: "center" }}>
            <Image source={box3} style={styles.smallBox} />
            <Text style={styles.textsOrder}>{i18n.t("returnsText")}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="all_orders" onPress={()=>{this.goToAllOrderRedirection()}}>
            <Image source={box4} style={styles.smallBox} />
            <Text style={styles.textsOrder}>{i18n.t("allOrdersText")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  SelectLine = () => {
    return (
      <View>
        <View
          style={{
            width: 380 * oneUnit,
            height: 46 * oneUnit,
            alignSelf: "center",
            marginTop: 20,
            flexDirection: FlexConditionManage(i18n.language),
          }}
        >
          <TouchableWithoutFeedback
            testID="selectOne"
            onPress={() => {
              this.selectLine(1);
            }}
          >
            <View
              style={[
                styles.myView,
                {
                  borderBottomColor:
                    this.state.selected == 1 ? "#375280" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.categorytext,
                  {
                    color: this.state.selected == 1 ? "#375280" : "#94A3B8",
                  },
                ]}
              >
                {i18n.t("trendingtabtitle")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            testID="selectTwo"
            onPress={() => {
              this.selectLine(2);
            }}
          >
            <View
              style={[
                styles.myView,
                {
                  borderBottomColor:
                    this.state.selected == 2 ? "#375280" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.categorytext,
                  {
                    color: this.state.selected == 2 ? "#375280" : "#94A3B8",
                  },
                ]}
              >
                {i18n.t("newLaunchestabtitle")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            testID="selectThree"
            onPress={() => {
              this.selectLine(3);
            }}
          >
            <View
              style={[
                styles.myView,
                {
                  borderBottomColor:
                    this.state.selected == 3 ? "#375280" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.categorytext,
                  {
                    color: this.state.selected == 3 ? "#375280" : "#94A3B8",
                  },
                ]}
              >
                {i18n.t("recommededtabtitle")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            height: 1,
            width: 380 * oneUnit,
            backgroundColor: "#CBD5E1",
            alignSelf: "center",
          }}
        />
      </View>
    );
  };

  GridiLine: ListRenderItem<Itemtype> = ({ item, index }) => {
    let object = item?.attributes
    return (
      <View style={styles.flItem} testID="wishlistedItem">
        <Pressable onPress={()=>{this.catalogueDetailRedirection(item.id)}} testID="navigateToProduct">
          <View>
            <Image
              source={{
                uri:
                  object?.primary_image ||
                  "https://images.pexels.com/photos/3056647/pexels-photo-3056647.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
              }}
              style={styles.productImage}
            />
            <TouchableOpacity
              style={styles.icon}
              testID="removeWishlist"
              onPress={()=>this.makeModalTrueFalse(object?.is_wishlist,item.id)}
            >
              <AntDesign name={object.is_wishlist?"heart":"hearto"} size={14} color={"#375280"} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.prodBrand]} numberOfLines={1}>
            {object?.name ?? "None"}
          </Text>
          <Text style={[styles.prodName]} numberOfLines={2}>
            {object?.description}
          </Text>
          <Text style={[styles.prodPrice]}>
            {this.parsePrice(object?.primary_price)}
          </Text>
        </Pressable>
      </View>
    );
  };
  FlatlistSection = () => {
    return (
      <FlatList
        style={styles.fl2}
        contentContainerStyle={[styles.fl3, {direction : FlatListRowManage(i18n.language)}]}
        data={this.state.productsArray}
        keyExtractor={(item) => item.id + "-item"}
        renderItem={this.GridiLine}
        numColumns={2}
        ListEmptyComponent={() => (!this.state.loading?
          <View style={styles.listEmptymainView}>
            <Text style={styles.listEmptyTitleText}>{i18n.t("noRecordFoundText")}</Text>
          </View>
          : null)}
onEndReached={this.fetchSomeMoreProductData}
onEndReachedThreshold={0.5}
      />
    );
  };
  ModalWishlist = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.modalTrue}
      >
        <TouchableWithoutFeedback
          testID="ModalOutside"
          style={{ height: "100%" }}
          onPress={this.makeModalFalse}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalsub}
              >
                <View style={styles.modalSearch}>
                  <View
                    style={[
                      styles.searchbarContainerStyle,
                      { width: oneUnit * 340 , direction: FlatListRowManage(i18n.language)},
                    ]}
                  >
                    <Image
                      source={searchIcon}
                      style={styles.searchbarIconStyle}
                    />
                    <TextInput
                      placeholderTextColor={"#94A3B8"}
                      style={styles.ModalTextinputStyle}
                      placeholder={i18n.t("searchClient")}
                      value={this.state.ModalSearchValue}
                      onChangeText={(text)=>{this.ModalSearchTextChange(text)}}
                      testID="Modalsearchbar"
                    />
                  </View>
                </View>
                {this.TabcheckboxMap()}
                {this.WishListButton()}
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  TabCheckbox = (item:WishlistType, indx: number, ar: WishlistType[]) => {
    let arr = [...this.state.ischeked];
    arr[indx] = !this.state.ischeked[indx];
    return (
      <View
        key={indx}
        style={[
          styles.TabCheckboxContainer,
          {
            borderBottomColor:
              indx !== ar.length - 1 ? "#E2E8F0" : "transparent",
            flexDirection: FlexConditionManage(i18n.language)
          },
        ]}
      >
        <View style={{ marginLeft: Scale(15) }}>
          <Text style={styles.modalText}>{item.attributes.shareable_name}</Text>
        </View>

        <CheckBox
         testID={"checkbox"}
          value={this.state.ischeked[indx]}
          // disabled={item.attributes.is_default}
          onChange={() => {
            this.setState({ ischeked: arr });
          }}
          boxType="square"
          tintColor="#FFFFFF"
          onCheckColor="#FFFFFF"
          onFillColor="#CCBEB1"
          onTintColor="#FFFFFF"
          animationDuration={0}
          tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
          style={styles.checkBox}
        />
      </View>
    );
  };
  TabcheckboxMap = () => {
   const wishlistArray=this.arrayForModalSearch()
    return (
      <View>
        {wishlistArray .map((ele:WishlistType, i:number, arr:WishlistType[]) => {
          return this.TabCheckbox(ele, i, arr);
        })}
      </View>
    );
  };
  WishListButton = () => {
    return (
      <TouchableOpacity
        testID="goTocategory"
        onPress={() => {this.addtoWishlist()}}
        style={styles.wishListButtonStyle}
      >
        <Text style={styles.wishListButtonText}>{i18n.t("addToWishlist")}</Text>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView
        style={[
          styles.safeAreaViewStyle,
          { opacity: this.state.modalTrue ? 0.5 : 1 },
        ]}
      >
          {this.state.loading&& <CustomLoader />}
        <ScrollView>
          <View>
            <View style={[styles.flexContainer, { direction : FlatListRowManage(i18n.language)}]}>
              <View style={styles.firstFlex}>
                <View>
                  <TouchableOpacity
                    testID="backButtonId"
                    style={[styles.backTouchOrder, {
                      transform : [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]
                    }]}
                    onPress={() => {this.goBack()}}
                  >
                    <Image
                      resizeMode="contain"
                      source={backIcon}
                      style={styles.backIconOrder}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Image
                    resizeMode="contain"
                    source={groupLogo}
                    style={styles.groupLogoStyle}
                  />
                </View>
              </View>

              <View style={styles.secondContainerFlex}>
                <TouchableOpacity
                  testID="btnBackSelectStore"
                  style={styles.backTouchOrder}
                  onPress={() => {this.btnNotificationRedirection()}}
                >
                  <Image
                    resizeMode="contain"
                    source={bell}
                    style={styles.boxImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="wishlistbutton"
                  style={styles.backTouchOrder}
                  onPress={() => {this.navigateTowishlist()}}
                >
                  <Image
                    resizeMode="contain"
                    source={heart}
                    style={styles.boxImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btnBackSelectStore"
                  onPress={this.navigateToCart}
                  style={styles.backTouchOrder}
                >
                  <Image
                    resizeMode="contain"
                    source={mycart}
                    style={styles.boxImage}
                  />
                  {this.state.cartItemCount ? (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartText}>{this.state.cartItemCount}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.searchbarContainerStyle, {direction : FlatListRowManage(i18n.language)}]}>
              <Image source={searchIcon} style={styles.searchbarIconStyle} />
              <TextInput
                placeholderTextColor="#94A3B8"
                placeholder={i18n.t("search_for_a_product")}
                onFocus={this.navigateToCatalogueHomeSearch}
                style={{
                  fontSize: 16,
                  fontFamily: "Lato-Regular",
                  fontWeight: "400",
                }}
              />
            </View>

            <View style={styles.categoryImage}>
              <TouchableOpacity testID="storeImage" onPress={()=>this.redirectToCategoryCatalogue('store')}>
                <Image source={i18n.language === "ar" ? storeBoxArabic : storeBox} style={styles.boxImagestyle} />
              </TouchableOpacity>
              <TouchableOpacity testID="categoryImage" onPress={()=>this.redirectToCategoryCatalogue('category')}>
                <Image source={i18n.language === "ar" ? categoryBoxArabic : categoryBox} style={styles.boxImagestyle} />
              </TouchableOpacity>
            </View>
          </View>
          {this.Myorders()}
          {this.SelectLine()}
          <this.FlatlistSection />
          {this.ModalWishlist()}
        </ScrollView>
      </SafeAreaView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff",
  },
  checkBox: {
    margin: Scale(2),
    marginTop: Scale(8),
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    ...Platform.select({
      ios: {
        height: Scale(24),
        width: Scale(24),
      },
    }),
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -2,
    backgroundColor: '#CCBEB1',
    height: 14,
    width: 14,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartText: {
    color: '#375280',
    fontSize: 8,
    fontWeight: 'bold'
  },
  ModalTextinputStyle: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#94A3B8",
  },
  wishListButtonStyle: {
    height: Scale(56),
    width: Scale(320),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    marginBottom: verticalScale(20),
    marginTop: verticalScale(30),
  },
  listEmptymainView: {
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: windowWidth * 20 / 100
  },
  listEmptyTitleText: {
    fontSize: windowWidth * 5 / 100,
    fontFamily: 'Avenir-Heavy',
    color: '#375280'
  },
  smallBox: {
    height: oneUnit * 54,
    width: oneUnit * 54,
  },
  modalsub: {
    height: 760 * heightUnit,
    width: oneUnit * 380,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: Scale(18),
    lineHeight: Scale(24),
    color: "#375280",
  },
  TabCheckboxContainer: {
    width: 340 * oneUnit,
    height: 60 * heightUnit,
    marginTop: heightUnit * 16,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wishListButtonText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
  checkboxView: { marginRight: Scale(-20), height: 55, marginTop: 5 },
  modalSearch: {
    height: heightUnit * 56,
    width: oneUnit * 340,
    borderColor: "#E2E8F0",
    marginTop: heightUnit * 20,
    marginBottom: heightUnit * 20,
  },
  flItem: {
    width: (deviceWidth - Scale(60)) / 2,
    marginHorizontal: Scale(10),
    marginVertical: Scale(12),
  },
  icon: {
    height: Scale(24),
    width: Scale(24),
    borderRadius: Scale(24),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    margin: Scale(6),
    position: "absolute",
    top: Scale(4),
    right: Scale(4),
  },
  linestyle: {
    flex: 1,
    height: 2,
    backgroundColor: "#CBD5E1",
  },
  prodBrand: {
    marginTop: Scale(10),
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 16,
    color: "#375280",
    textAlign : "left"
  },
  prodName: {
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
    textAlign : "left"
  },
  moveToCardButton: {
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(4),
    borderColor: "#CCBEB1",
    fontWeight: "500",
    color: "#375280",
    height: Scale(36),
    marginTop: Scale(8),
    marginBottom: Scale(12),
    overflow: "hidden",
  },
  moveToCardButtonText: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#375280",
  },
  prodPrice: {
    marginTop: Scale(10),
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 18,
    color: "#375280",
    textAlign : "left"
  },
  categorytext: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    color: "#375280",
  },
  myView: {
    height: "100%",
    // width:"30%",
    marginRight: oneUnit * 32,
    borderBottomColor: "red",

    borderBottomWidth: 2,
  },
  productImage: {
    resizeMode: "cover",
    aspectRatio: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  textsOrder: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: oneUnit * 14,
    color: "#375280",
  },
  textHeadingOrder: {
    fontFamily: "Lato-bold",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    marginTop: 20,
    color: "#375280",
    marginLeft: 5,
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: oneUnit * 380,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  boxImagestyle: {
    height: oneUnit * 178,
    width: oneUnit * 178,
  },
  fl2: {
    paddingHorizontal: Scale(10),
    flex: 1,
    height:Scale(600)
  },
  fl3: {
    flexGrow: 1,
  },
  categoryImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (178 * 2 + 24) * oneUnit,
    alignSelf: "center",
    marginTop: oneUnit * 16,
  },
  backIconOrder: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backTouchOrder: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  groupLogoStyle: {
    width: (windowWidth / 428) * 63,
    height: (windowWidth / 428) * 15,
    marginLeft: (windowWidth / 428) * 16,
  },
  firstFlex: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  secondContainerFlex: {
    flexDirection: "row",
    width: oneUnit * 48 * 3,
    justifyContent: "space-evenly",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: oneUnit * 10,
  },
  boxImage: {
    width: oneUnit * 24,
    height: oneUnit * 24,
  },
  searchbarContainerStyle: {
    width: oneUnit * 380,
    height: oneUnit * 56,
    borderColor: "#CBD5E1",
    alignSelf: "center",
    marginTop: oneUnit * 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: oneUnit * 13,
    borderWidth: 1,
    borderRadius: 2,
  },
  searchbarContainer: {
    width: "70%",
    height: "20%",
    borderColor: "black",
    borderWidth: 1 * oneUnit,
  },
  searchbarIconStyle: {
    width: oneUnit * 20,
    height: oneUnit * 20,
    marginLeft: oneUnit * 12,
    marginRight: oneUnit * 8,
  },
});
// Customizable Area End
