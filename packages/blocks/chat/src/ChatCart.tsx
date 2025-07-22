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
  StatusBar,
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backBtn } from "./assets";
// Customizable Area End

import ChatCartController, {
  Props
} from "./ChatCartController";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageNotFound from "../../../components/src/ImageNotFound";

export default class ChatCart extends ChatCartController {
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
          source={backBtn}
          style={[styles.backIcon, {
            transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }],
          }]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>
            {i18n.t("Cart")}
        </Text>
      </View>
      <View style={styles.extraView} />
    </View>
  );

  CartItem = () => {
    let total = Number(this.state.cartData.price_per_unit) * this.state.cartData.product_quantity;
    return (
    <View>
        <Text style={{ fontSize:18,
            lineHeight: 24,
            color: "#375280",
            marginBottom: 8,
            fontFamily : "Lato",
            fontWeight: "bold",
            textAlign : TextAlignManage(i18n.language),
            }}
        >
        {this.state.cartData.product_quantity} {i18n.t("items")}
        </Text>
        <View style={[styles.cartItemContainer, { flexDirection: FlexConditionManage(i18n.language) }]}>
        
        <Image
            source={ImageNotFound(this.state.cartData.primary_display_image)}
            style={styles.productImage}
            resizeMode="cover"
        />
        <View style={[styles.productDetails, { marginLeft : i18n.language == "ar" ? 0 : 16, marginRight : i18n.language == "ar" ? 16 : 0 }]}>
            <Text style={[styles.productName, { textAlign : TextAlignManage(i18n.language)}]}>{this.state.cartData.product_name}</Text>
            <Text style={[styles.productDesc,{ textAlign : TextAlignManage(i18n.language)}]}>{this.state.cartData.product_desc}</Text>
            <View style ={{flexDirection : FlexConditionManage(i18n.language) , justifyContent : 'space-between'}}>
                <Text style={[styles.productSpecs, { textAlign : TextAlignManage(i18n.language)}]}>
                    {i18n.t("size")}: {this.state.cartData.size} {i18n.t("colour")}: {this.state.cartData.color}
                </Text>
                <Text style={[styles.productSpecs, { textAlign : TextAlignManage(i18n.language)}]}>
                    {this.state.cartData.product_quantity} {i18n.t("Units")}
                </Text>
            </View>
            <Text style={[styles.price, { textAlign : TextAlignManage(i18n.language)}]}>
                {PriceConvertValue(total.toString(),this.state.localCurrency)}
            </Text>
        </View>
        
        </View>
        <Text style={{ fontSize:14,
            lineHeight: 24,
            color: "#375280",
            marginTop: 8,
            fontFamily : "Lato",
            fontWeight: "500",
            textAlign : TextAlignManage(i18n.language),
            }}
        >
        {i18n.t("edt")} : {this.state.cartData.estimated_arrival_time}
        </Text>
    </View>)
  };

  PriceDetails = () => (
    <View style={styles.priceDetailsContainer}>
      <View style={[styles.priceRow, { flexDirection : FlexConditionManage(i18n.language) }]}>
        <Text style={styles.priceLabel}>{i18n.t("Itemtotal")}</Text>
        <Text style={styles.priceValue}>
        {PriceConvertValue((Number(this.state.cartData.price_per_unit) * this.state.cartData.product_quantity).toString(),this.state.localCurrency)}
        </Text>
      </View>
      <View style={[styles.priceRow, { flexDirection : FlexConditionManage(i18n.language) }]}>
        <Text style={styles.priceLabel}>{i18n.t("Shippingfee")}</Text>
        <Text style={styles.priceValue}>{PriceConvertValue(this.state.cartData.shipping_cost,this.state.localCurrency)}</Text>
      </View>
      <View style={[styles.totalRow,  { flexDirection : FlexConditionManage(i18n.language) }]}>
        <Text style={styles.totalLabel}>{i18n.t("totalCost")}</Text>
        <Text style={styles.price}>{PriceConvertValue(this.state.cartData.total_amount,this.state.localCurrency)}</Text>
      </View>
    </View>
  );

  CheckoutButton = () => (
    <TouchableOpacity 
      style={styles.checkoutButton}
      testID="checkoutButtonID"
      onPress={this.handleCheckout}
    >
      <Text style={styles.checkoutButtonText}>{i18n.t("Checkout")}</Text>
    </TouchableOpacity>
  );
  
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
        <SafeAreaView style={styles.container} testID="ChatCart">
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
                {!!this.state.cartData.product_name &&
                  <View style={{flex:1}}>
                    <View style={{flex :1}}>
                        <this.CartItem />
                    </View>
                    <this.PriceDetails />
                    <this.CheckoutButton />
                  </View>
                }
                
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
      bodyView: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 90) / 100,
        alignSelf: "center",
        flex: 1
      },
    scrollContent: {
      paddingBottom: 100,
    },
    cartItemContainer: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
    },
    productImage: {
      width: (windowWidth * 25) / 100,
      height: (windowWidth * 34) / 100,
      borderRadius: 8,
    },
    productDetails: {
      flex: 1,
    },
    productName: {
        fontSize:18,
        lineHeight: 24,
        color: "#375280",
        marginBottom: 4,
        fontFamily : "Lato",
        fontWeight: "bold",
    },
    productDesc: {
        fontSize:16,
        lineHeight: 24,
        color: "#375280",
        marginBottom: 4,
        fontFamily : "Lato",
        fontWeight: "500"
    },
    productSpecs: {
      fontSize: 14,
      lineHeight : 22,
      color: "#94A3B8",
      marginBottom: 4,
    },
    quantity: {
      fontSize: (windowWidth * 3.5) / 100,
      color: "#666666",
      marginBottom: 4,
    },
    price: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "bold",
      fontFamily: "Lato",
      color: "#375280",
    },
    priceDetailsContainer: {
      backgroundColor: "#FFFFFF",
      padding: 16,
      marginTop: 16,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    priceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    priceLabel: {
      fontSize: 16,
      lineHeight:24,
      color: "#94A3B8",
      fontFamily: "Lato",
      fontWeight: "500",    
    },
    priceValue: {
        fontSize: 16,
        lineHeight:24,
        color: "#375280",
        fontFamily: "Lato",
        fontWeight: "500", 
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#EEEEEE",
    },
    totalLabel: {
        fontSize: 24,
        lineHeight:32,
        color: "#375280",
        fontFamily: "Lato",
        fontWeight: "bold", 
    },
    checkoutButton: {
      backgroundColor: "#CCBEB1",
      borderRadius: 8,
      padding: 16,
      marginTop: 24,
      marginBottom: 32,
      alignItems: "center",
    },
    checkoutButtonText: {
      color: "#FFFFFF",
      fontSize: 20,
      lineHeight: 26,
      fontFamily: "Lato",
      fontWeight: "bold",
    },
  });
// Customizable Area End