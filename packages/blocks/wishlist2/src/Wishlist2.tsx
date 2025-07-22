import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ListRenderItem,
  Image,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomButton from "../../../components/src/CustomButton";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { deviceWidth } from "framework/src/Utilities";
import { addnewImage, addnewImageArab } from "./assets"
import { WishListItem, YouMayAlsoLike } from "../__tests__/__mocks__/types";
// Customizable Area End

import Wishlist2Controller, {
  Props,
  configJSON,
} from "./Wishlist2Controller";
import i18n from "../../../components/src/i18n/i18n.config";
import PriceConvertValue from "../../../components/src/PriceConvertValue";

export default class Wishlist2 extends Wishlist2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  _renderItem: ListRenderItem<WishListItem> = ({ item, index }) => {
    if(!item.attributes)
      {
        return <TouchableOpacity testID="renderCondition" onPress={this.navigateToCategory}>
         <View>
        <Image
            source={
             this.state.selectedLanguage=="en"? addnewImage:addnewImageArab
            }
            style={styles.renderCondition}
          />
        </View>
        </TouchableOpacity>
      }
      else{
  return  <View style={styles.flItem} testID="wishlistedItem">
      <Pressable
        testID="navigateToProduct"
        onPress={() => this.goToProduct(item.attributes.favouriteable_id)}
      >
        <View>
          <Image
            source={{
              uri:
                item.attributes.favouriteable.data.attributes.primary_image ||
                "https://i.ibb.co/8Nb9QHL/image.png",
            }}
            style={styles.productImage}
          />
          <TouchableOpacity
            style={styles.icon}
            testID="removeWishlist"
            onPress={() =>
             {
              this.removeWishlist(item?.attributes["favouriteable_id"])
            }
            }
          >
            <AntDesign name="heart" size={14} color="#375280" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.prodBrand,{textAlign:this.returntextAlign()}]} numberOfLines={1}>
          {item.attributes.favouriteable.data.attributes.brand_name ?? "None"}
        </Text>
        <Text style={[styles.prodName,{textAlign:this.returntextAlign()}]} numberOfLines={1}>
          {item.attributes.favouriteable.data.attributes.name}
        </Text>
        <Text style={[styles.prodPrice,{textAlign:this.returntextAlign()}]}>
        {PriceConvertValue(item.attributes.favouriteable.data.attributes.primary_price,this.state.localCurrency)}
        </Text>
      </Pressable>
     {!this.state.fromWishlist&& <CustomButton
        testID={"move-to-cart-" + index}
        title={i18n.t("Movetocart")}
        onPress={() => this.goToProduct(item.attributes.favouriteable_id)}
        style={styles.moveToCardButton}
        textStyle={styles.moveToCardButtonText}
      />}
    </View>
      }
  };

  _renderYouMayAlsoLike = ({ item }: { item?: YouMayAlsoLike }) => {
    if (!item) {
      return null;
    }
    return (
      <View style={styles.flItem}>
        <Pressable
          testID="navigateToProduct"
          onPress={() => this.goToProduct(item.id)}
        >
          <View>
            <Image
              source={{
                uri:
                  item.attributes.primary_image ||
                  "https://i.ibb.co/8Nb9QHL/image.png",
              }}
              style={styles.productImage}
            />
            <TouchableOpacity
              style={styles.icon}
              testID="addWishlist"
              onPress={() => this.addWishlist(item.id)}
            >
              <AntDesign
                name={item.attributes.is_wishlist ? "heart" : "hearto"}
                size={14}
                color="#375280"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.prodBrand} numberOfLines={1}>
            {item.attributes.name ?? "None"}
          </Text>
          <Text style={styles.prodName} numberOfLines={1}>
            {item.attributes.description}
          </Text>
          <Text style={styles.prodPrice}>
          {PriceConvertValue(item.attributes.primary_price,this.state.localCurrency)}
          </Text>
        </Pressable>
      </View>
    );
  };
  WishListButton=()=>{
   return <View  testID="fromstylist" style={styles. wishContainer}>
      <Text style={styles.descrptionTxt}>
     {i18n.t("Noproductsaddedhere")}
      </Text>
      <TouchableOpacity testID="goTocategory" onPress={this.navigateToCategory} style={styles.wishListButtonStyle}>
      <Text style={styles.wishListButtonText}>
       {i18n.t("WishlistProducts")}
      </Text>
      </TouchableOpacity>
    </View>
  }
  Empty=()=>{
  if(this.state.loading)
    {
      return <></>
    }
    else{
      if(!this.state.fromWishlist)
        {
          return  <View  style={styles.emptyFlex} testID="emptyWishList">
               <Text style={styles.emptyMessage}>{i18n.t("YourWishlistAwaits")}</Text>
                <Text style={styles.caption}>
               {i18n.t("Startaddingitemsand")}
                 </Text>
              </View>
        }
        else{
          return this.WishListButton()
        }
    }
  }

  
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="paired-products">
         <CustomHeader
              title={this.returnHeading()}
              onLeftPress={this.goBacktolanding}
              leftTestId="goBackIcon"
            />
        <FlatList
          style={styles.fl2}
          contentContainerStyle={[styles.fl3,{alignItems:this.state.languageType==='en'?'flex-start':'flex-end'}]}
          data={this.state.wishlist?.data}
          keyExtractor={(item) => item.id + "-item"}
          renderItem={this._renderItem}
          numColumns={2}
          ListEmptyComponent={
           this.Empty()
          }
          ListFooterComponent={
            this.state.youMayAlsoLike.length > 0 ? (
              <View>
                <Text style={[styles.prodPrice, styles.ml8]}>
                {i18n.t("YouMayAlsoLike")}
                </Text>
                <View style={styles.row}>
                  <this._renderYouMayAlsoLike
                    item={this.state.youMayAlsoLike[0]}
                  />
                  <this._renderYouMayAlsoLike
                    item={this.state.youMayAlsoLike[1]}
                  />
                </View>
              </View>
            ) : null
          }
        />
        {this.state.loading && <CustomLoader />}
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
  fl2: {
    paddingHorizontal: Scale(10),
    flex: 1,
  },
  flItem: {
    width: (deviceWidth - Scale(60)) / 2,
    marginHorizontal: Scale(10),
    marginVertical: Scale(12),
  },
  renderCondition:{
    width:Scale(178),
    height:Scale(178),
    marginLeft:Scale(10),
    marginTop:Scale(10)},
  productImage: {
    resizeMode: "cover",
    aspectRatio: 1,
    borderRadius: 4,
    overflow: "hidden",
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
  prodBrand: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 16,
    color: "#375280",
  },
  prodName: {
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
  },
  prodPrice: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 18,
    color: "#375280",
  },
  emptyFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
  },
  emptyMessage: {
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: 20,
    color: "#375280",
    textAlign: "center",
  },
  caption: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    textAlign: "center",
  },
  fl3: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  ml8: {
    marginLeft: 8,
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
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
  },
  filter: {
    width: Scale(24),
    height: Scale(24),
  },
  wishContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  },
  descrptionTxt: {
    fontSize: 18,
    color: "#375280",
    marginBottom: 10,
    lineHeight: 26,
    textAlign: "justify",
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Lato",
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
    marginTop: verticalScale(10),
  },
  wishListButtonText: {
    fontFamily: "Lato",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
});
// Customizable Area End
