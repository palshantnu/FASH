import React from "react";
// Customizable Area Start
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import i18n from "../../../components/src/i18n/i18n.config";

const { width } = Dimensions.get("window");

interface ProductItem {
  image: string | null;
  name: string;
  quantity: number;
  primary_image:string|null;
}

import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { PSOrderRequest } from "./types";
import { accepted, other } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";

// Customizable Area End

import ProductSourcingOrdersController, {
  Props,
} from "./ProductSourcingOrdersController";

export default class ProductSourcingOrders extends ProductSourcingOrdersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderProductItem = (product: ProductItem) => {
    return (
      <View style={styles.productRow}>
        <Image 
          source={ImageNotFound(product.primary_image)}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.quantity}>{i18n.t("quantity")} : {product.quantity}</Text>
        </View>
      </View>
    );
  };

  renderOrderItem = ({ item }: { item: PSOrderRequest }) => {
    return (
      <View style={[styles.orderCard, { direction: FlatListRowManage(i18n.language) }]}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>{item.id} | {item.attributes.accept_through}</Text>
          <View style={[styles.statusTag , { backgroundColor: item.attributes.status == 'accepted' ? "#E2F8F0" : '#FFE7D0' }]}>
            <Text style={[styles.statusText, {
              color: item.attributes.status === 'accepted' ? '#10B981' : '#BE5B00'
            }]}>{this.capitalizeFirstLetter(item.attributes.status)}</Text>
            <Image source={item.attributes.status === 'accepted' ? accepted : other} style={styles.checkIcon} />
          </View>
        </View>
        <View>
            {this.renderProductItem({
              image: item.attributes.product_display_image,
              name: item.attributes.product_name,
              quantity: item.attributes.quantity,
              primary_image:item.attributes.primary_image
            })}
          </View>
       
        
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>{i18n.t("paymentMode")}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.paymentAmount}>{PriceConvertValue((parseInt(item.attributes.price_per_unit) * item.attributes.quantity).toString(),this.state.localCurrency)}</Text>
          <Text style={styles.paymentLabel}> ({i18n.t("paidViaCard")})</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.viewOrderButton}
          onPress={() => this.navigateToDetailedProductSourcingOrder({ id: item.id })}
        >
          <Text style={styles.viewOrderText}>{i18n.t("viewOrder")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <SafeAreaView style={styles.container} testID="ProductSourcingOrders">
        <CustomHeader
          title={i18n.t("productSourcingOrders")}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.apiData.data}
          renderItem={this.renderOrderItem}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeprator} />}
          ListEmptyComponent={() =>
            <View style={styles.listEmptymainView} testID="emptyComp">
              <Text  style={[
                  { fontSize: (width * 5) / 100, color: "#375280" },
                  styles.noCatalogueText,
                ]}>{i18n.t("thereAreNoOrder")}</Text>
            </View>
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
    backgroundColor: "#ffffff",
  },
  listContainer: {
    padding: Scale(16),
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: Scale(8),
    marginBottom: Scale(16),
    paddingHorizontal: Scale(16),
    paddingVertical: Scale(12),
  },
  noCatalogueText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Scale(12),
  },
  itemSeprator : {
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  orderId: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Lato-Regular',
  },
  statusTag: {
    backgroundColor: '#E2F8F0',
    paddingHorizontal: 10,
    marginHorizontal : 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: width * 0.24
  },
  statusText: {
    color: '#10B981',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginRight: Scale(4),
  },
  checkIcon: {
    marginLeft: Scale(2),
    height: Scale(14),
    width: Scale(14),
  },
  productRow: {
    flexDirection: 'row',
    paddingVertical: Scale(8),
  },
  productImage: {
    width: Scale(48),
    height: Scale(48),
    borderRadius: Scale(4),
    backgroundColor: '#F8FAFC',
  },
  productInfo: {
    flex: 1,
    marginLeft: Scale(12),
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Bold',
    marginBottom: Scale(4),
  },
  quantity: {
    fontSize: 13,
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
  productDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: Scale(4),
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Scale(8),
    marginBottom: Scale(12),
  },
  paymentLabel: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Lato-Regular',
  },
  paymentAmount: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Bold',
  },
  viewOrderButton: {
    borderWidth: 1,
    borderColor: '#CCBEB1',
    borderRadius: Scale(4),
    padding: Scale(12),
    alignItems: 'center',
  },
  viewOrderText: {
    color: '#375280',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  listEmptymainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * .8,
  },
});
// Customizable Area End