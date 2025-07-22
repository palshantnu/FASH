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
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { deviceWidth } from "framework/src/Utilities";
import { WishListItem } from "../__tests__/__mocks__/types";
// Customizable Area End

import ExploreWishlistController, {
  Props,
} from "./ExploreWishlistController";
import i18n from "../../../components/src/i18n/i18n.config";
import PriceConvertValue from "../../../components/src/PriceConvertValue";

export default class ExploreWishlist extends ExploreWishlistController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  _renderExploreItem: ListRenderItem<WishListItem> = ({ item }) => {
    
  return ( <View style={styles.flItem} testID="wishlistedItem">
      <Pressable
        testID="navigateToProduct"
        onPress={() => this.goToExploreProduct(item.attributes.favouriteable_id)}
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
          <View
            style={styles.icon}
            testID="removeWishlist"
          >
            <AntDesign name="heart" size={14} color="#375280" />
          </View>
        </View>
        <Text style={[styles.prodBrand,{textAlign:this.returntextExploreAlign()}]} numberOfLines={1}>
          {item.attributes.favouriteable.data.attributes.brand_name ?? "None"}
        </Text>
        <Text style={[styles.prodName,{textAlign:this.returntextExploreAlign()}]} numberOfLines={1}>
          {item.attributes.favouriteable.data.attributes.name}
        </Text>
        <Text style={[styles.prodPrice,{textAlign:this.returntextExploreAlign()}]}>
        {PriceConvertValue(item.attributes.favouriteable.data.attributes.primary_price,this.state.localCurrency)}
        </Text>
      </Pressable>
      
    </View>
      )
  };


  EmptyExplore=()=>{
  if(this.state.loading)
    {
      return <></>
    }
    else{
     
          
          return  <View  style={styles.emptyFlex} testID="emptyWishList">
               <Text style={styles.emptyMessage}>{i18n.t("YourWishlistAwaits")}</Text>
                <Text style={styles.caption}>
               {   i18n.t("Startaddingitemsand")}
                 </Text>
              </View>
        
        
    }
  }

  
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="paired-products">
        <FlatList
          style={styles.fl2}
          contentContainerStyle={styles.fl3}
          data={this.state.wishlist?.data}
          keyExtractor={(item) => item.id + "-item"}
          renderItem={this._renderExploreItem}
          numColumns={2}
          ListHeaderComponent={
            <CustomHeader
              title={i18n.t("exploreWishlist")}
              onLeftPress={this.goBackExplore}
              leftTestId="goBackIcon"
            />
          }
          ListEmptyComponent={
           this. EmptyExplore()
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
  productImage: {
    resizeMode: "cover",
    aspectRatio: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
  renderCondition:{
    width:Scale(178),
    height:Scale(178),
    marginLeft:Scale(10),
    marginTop:Scale(10)},
 
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
 
  prodName: {
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
  },
  prodBrand: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 16,
    color: "#375280",
  },
  emptyFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  prodPrice: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 18,
    color: "#375280",
  },
  caption: {
    marginTop: Scale(10),
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    textAlign: "center",
  },
  emptyMessage: {
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: 20,
    color: "#375280",
    textAlign: "center",
  },
  
  fl3: {
    flexGrow: 1,
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
  row: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  ml8: {
    marginLeft: 8,
  },
  
  moveToCardButtonText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
  },
  wishContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  filter: {
    width: Scale(24),
    height: Scale(24),
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
  
  wishListButtonText: {
    fontFamily: "Lato",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
});
// Customizable Area End
