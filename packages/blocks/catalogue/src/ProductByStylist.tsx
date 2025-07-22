import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { backIcon, filledHeart,  heartWishlist } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import Scale from "../../../components/src/Scale";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
// Customizable Area End

import ProductByStylistController, {
  Props,
} from "./ProductByStylistController";

export default class ProductByStylist extends ProductByStylistController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.header, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouch}
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
        <Text style={styles.headerTitle}>
            {i18n.t("productByStylist")}
        </Text>
      </View>
      <View style={styles.extraView} />
    </View>
  );

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
          activeOpacity={0.8}
          style={[styles.subCateHeartTouch,{ left : ManageDynamicMargin(i18n.language,5,undefined),right:ManageDynamicMargin(i18n.language,undefined,5)}]} 
          testID={"wishlist-" + item.index}
          onPress={() => this.toggleWishlistProduct(item.item)}
        >
          <Image
            source={value.is_wishlist ? filledHeart : heartWishlist}
            style={styles.subCateHeartIcon}
            testID={value.is_wishlist ? "filled" : "emptyHeart"}
          />
        </TouchableOpacity>

        <View>
          <Text numberOfLines={1} style={[styles.subCateTextProduct, { textAlign: TextAlignManage(i18n.language) }]}>
            {value.name}
          </Text>
          <Text numberOfLines={1} style={[styles.subCateDesTextProduct, { textAlign: TextAlignManage(i18n.language) }]}>
            {value.description}
          </Text>
          <Text style={[styles.subCateListViewPriceTextProduct, { textAlign: TextAlignManage(i18n.language) }]}>
            {PriceConvertValue(value.primary_price,this.state.localCurrencyGet)}
          </Text>
        </View>
      </TouchableOpacity>
      // Customizable Area End
    );
  }

  // Customizable Area End
  render() {
    // Customizable Area Start    
    return (
      <SafeAreaView style={styles.container} testID="ProductByStylist">
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
            styles.bodyView,
            globalStyle.headerMarginManage,
          ]}
        >
        <this.Header />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
            <View style={styles.subCateListMainView}>
              <FlatList
                bounces={false}
                testID={"catalogue_show_flatlist_list"}
                data={this.state.catalogueArr}
                showsVerticalScrollIndicator={false}
                horizontal={false}

                contentContainerStyle={[styles.flatContainerBottom,{alignItems:i18n.language ==='en'?'flex-start':'flex-end'}]}
                columnWrapperStyle={styles.flatColumWrapper}
                numColumns={2}
                onEndReachedThreshold={1}
                onEndReached={() =>
                    this.getProductByStylist(this.state.token, 'more')
                }
                ListEmptyComponent={() =>
                  !this.state.loading ? (
                    <View style={styles.listEmptymainView} testID="emptyComp">
                      <Text style={styles.listEmptyTitleText}>
                        {i18n.t("noProductFound")}
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={(item) => this.getList(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
        </ScrollView>
        </View>
        
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  backIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  subCateListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 32) / 100,
    marginHorizontal: (windowWidth * 2) / 100,
    backgroundColor:'#fff'
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
  subCateListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  flatContainerBottom: {
    paddingBottom: Scale(20)
  },
  subCateTextProduct: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateDesTextProduct: {
    color: "#375280",
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowWidth * 4) / 100,
    color: "#75838D",
  },
  subCateListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  subCateListViewPriceTextProduct: {
    color: "#375280",
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    fontFamily: "Lato-Bold",
  },
  subCateHeartTouch: {
    position: "absolute",
    top: 5,
  },
  bodyView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 90) / 100,
    alignSelf: "center",
  },
  subCateHeartIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  flatColumWrapper: {
    marginTop:Scale(10),
    justifyContent: "space-between",
  },
});
// Customizable Area End