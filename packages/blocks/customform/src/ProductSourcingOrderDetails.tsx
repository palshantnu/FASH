import React from "react";
// Customizable Area Start
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";


const { width } = Dimensions.get("window");
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageNotFound from "../../../components/src/ImageNotFound";
// Customizable Area End

import ProductSourcingOrderDetailsController, {
  Props,
} from "./ProductSourcingOrderDetailsController";

export default class ProductSourcingOrderDetails extends ProductSourcingOrderDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderInfoRow(label: string, value: string) {
    return (
      <View style={[styles.infoRow, { direction : FlatListRowManage(i18n.language) }]}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <SafeAreaView style={styles.container} testID="ProductSourcingOrderDetails">
        <CustomHeader
          title={"Product Sourcing Order"}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {this.state.loading && <CustomLoader />}
        {!this.state.loading && this.state.apiData.data &&
        <ScrollView style={[styles.container, { direction: FlatListRowManage(i18n.language) }]}>
          <View style={styles.content}>
            <Text style={[styles.orderIdText, { textAlign: TextAlignManage(i18n.language) }]}>
              {i18n.t("OrderID")} : {this.state.apiData.data.id}
            </Text>
            
            <View style={styles.productContainer}>
              <Image
                source={ImageNotFound(this.state.apiData.data.attributes.product_display_image)}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={[styles.productTitle, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.apiData.data.attributes.product_name}</Text>
                <View style={{ flexDirection : FlexConditionManage(i18n.language) }}>
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("size")} : {this.state.apiData.data.attributes.size}</Text>
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("color")} : </Text>
                  <View style={[styles.colorCircle, { backgroundColor: this.state.apiData.data.attributes.color.toLowerCase() }]} />
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("quantity")} : {this.state.apiData.data.attributes.quantity}</Text>
                </View>
              </View>
            </View>

            {this.renderInfoRow(`${i18n.t("CustomerName")} :`, this.state.apiData.data.attributes.buyer)}
            {this.renderInfoRow(`${i18n.t("order_status")} :`, this.state.apiData.data.attributes.status)}
            {this.renderInfoRow(`${i18n.t("shippingAddress")} :`, this.extractShippingAddress(this.state.apiData.data.attributes.shipping_address[0]))}
            {this.state.apiData.data.attributes.payment_method && this.renderInfoRow(`${i18n.t("paymentMethodTextS")} :`, this.state.apiData.data.attributes.payment_method)}
            {this.renderInfoRow(`${i18n.t("pricePerUnit")} :`, PriceConvertValue(this.state.apiData.data.attributes.price_per_unit,this.state.localCurrency))}
            {this.renderInfoRow(`${i18n.t("shippingCost")} :`, PriceConvertValue(this.state.apiData.data.attributes.shipping_cost,this.state.localCurrency))}
            {this.renderInfoRow(`${i18n.t("deliveryServiceProvider")} :`, "DHL Couriers")}
            {this.renderInfoRow(`${i18n.t("trackingNumber")} :`, "OY657HAFG3FAG")}
          </View>
        </ScrollView>}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      content: {
        padding: Scale(20),
      },
      orderIdText: {
        fontSize: 16,
        color: "#94A3B8",
        marginBottom: Scale(20),
        lineHeight: 24,
        fontFamily : "Lato-Regular",
      },
      productContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: Scale(20),
        borderBottomColor: "#CBD5E1",
        width: "100%",
      },
      productImage: {
        width: Scale(100),
        height: Scale(100),
        borderRadius: Scale(8),
      },
      colorCircle: {
        width: 15,
        height: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignSelf : "center"
      },
      productDetails: {
        marginLeft: Scale(16),
        justifyContent: 'center',
      },
      productTitle: {
        fontSize: 18,
        color: "#375280",
        marginBottom: Scale(8),
        lineHeight: 24,
        fontFamily : "Lato-Regular",
      },
      productInfo: {
        fontSize: 14,
        color: "#94A3B8",
        lineHeight: 18,
        fontFamily : "Lato-Regular",
        marginHorizontal : 5
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Scale(16),
      },
      infoLabel: {
        fontSize: 16,
        color: "#375280",
        lineHeight: 24,
        fontFamily : "Lato-Regular",
        flex: 1,
        textAlign: 'left',
      },
      infoValue: {
        fontSize: 16,
        color: "#94A3B8",
        flex: 1,
        textAlign: 'right',
        lineHeight: 24,
        fontFamily : "Lato-Regular",
      },
});
// Customizable Area End
