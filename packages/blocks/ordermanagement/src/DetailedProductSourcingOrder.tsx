import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions 
  } from "react-native";
  
  const { width,height } = Dimensions.get("window");
  import CustomHeader from "../../../components/src/CustomHeader";
  import CustomLoader from "../../../components/src/CustomLoader";
  import Scale from "../../../components/src/Scale";
  import i18n from "../../../components/src/i18n/i18n.config";
  import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import DetailedProductSourcingOrderController, {
    ORDER_STATUSES,
  Props,
} from "./DetailedProductSourcingOrderController";
import { accepted, other } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";

export default class DetailedProductSourcingOrder extends DetailedProductSourcingOrderController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  renderInfoRow = (label: string, value: string) => {
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    );
  };

  renderInCol = (label: string, value: string) => {
    return (
      <View style={styles.providerContainer}>
        <Text style={[styles.headerText]}>{label}:</Text>
        <View style={{backgroundColor:'#F8F8F8',width:'100%',paddingVertical:10}}>
        <Text style={[styles.providerText]}>{value}</Text>
      </View>
      </View>
    );
  };

  renderStatusSelector = () => {
    const { selectedStatus, showStatusDropdown } = this.state;
    
    return (
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: selectedStatus.backgroundColor }]}
          onPress={() => this.setState({ showStatusDropdown: true })}
        >
          <Text style={[styles.statusText, { color: selectedStatus.color }]}>
            {selectedStatus.label}
          </Text>
          <Image source={selectedStatus.value === 'in_process' ?  other: accepted} style={styles.checkIcon} />
        </TouchableOpacity>
        
        <Modal
          visible={showStatusDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => this.setState({ showStatusDropdown: false })}
        >
          <SafeAreaView style={{flex:1}}>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => this.setState({ showStatusDropdown: false })}
          >
            <View style={[styles.dropdown]}>
              {ORDER_STATUSES.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[styles.dropdownItem, 
                    { backgroundColor: status.value === selectedStatus.value ? status.backgroundColor : 'transparent' }
                  ]}
                  onPress={() => {
                    this.setState({ 
                      selectedStatus: status, 
                      showStatusDropdown: false 
                    });
                  }}
                >
                  <Text style={[styles.dropdownText, { color: "#000000" }]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="DetailedProductSourcingOrder">
        <CustomHeader
          title={i18n.t("productSourcingOrders")}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {
          this.state.apiData && this.state.apiData.data &&
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.orderId}>#{this.state.apiData.data[0].id} | 3:00 PM</Text>
            {this.renderStatusSelector()}
          </View>

          <View style={styles.productCard}>
            <Image
              source={ImageNotFound(this.state.apiData.data[0].attributes.product_display_image)}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productDetails}>
                <Text style={[styles.productTitle, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.apiData.data[0].attributes.product_name}</Text>
                <View style={{ flexDirection : FlexConditionManage(i18n.language) }}>
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("size")} : {this.state.apiData.data[0].attributes.size}</Text>
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("color")} : </Text>
                  <View style={[styles.colorCircle, { backgroundColor: this.state.apiData.data[0].attributes.color.toLowerCase() }]} />
                  <Text style={[styles.productInfo, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("quantity")} : {this.state.apiData.data[0].attributes.quantity}</Text>
                </View>
              </View>
          </View>

          <View style={styles.detailsContainer}>
            {this.renderInfoRow(`${i18n.t("price")} :`, `${PriceConvertValue((parseInt(this.state.apiData.data[0].attributes.price_per_unit )* this.state.apiData.data[0].attributes.quantity).toString(), this.state.localCurrency)}`)}
            {this.renderInfoRow(`${i18n.t("CustomerName")} :`, this.state.apiData.data[0].attributes.buyer)}
            {this.renderInfoRow(`${i18n.t("shippingAddress")} :`, this.extractShippingAddress(this.state.apiData.data[0].attributes.shipping_address[0]))}
            {this.state.apiData.data[0].attributes.payment_method && this.renderInfoRow(`${i18n.t("paymentMethodTextS")} :`, this.state.apiData.data[0].attributes.payment_method)}
            {this.renderInCol(`${i18n.t("deliveryServiceProvider")}`, "DHL")}
            {this.renderInCol(`${i18n.t("trackingID")}`, "OD4567829TR98374")}
          </View>
        </ScrollView>
        }
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: Scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 14,
    color: "#64748B",
    fontFamily: "Lato-Regular",
  },
  statusContainer: {
    position: "relative",
  },
  checkIcon: {
    marginLeft: Scale(2),
    height: Scale(14),
    width: Scale(14),
  },
  statusButton: {
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
  colorCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignSelf : "center"
  },
  providerContainer: {
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    color: '#375280',
    marginBottom: 8,
  },
  providerText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    color: '#375280',
    marginHorizontal : 10,
  },
  chevron: {
    marginLeft: Scale(2),
  },
  modalOverlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: Scale(8),
    padding: Scale(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: Scale(160),
    right: width*6/100,
    top:height*11/100
  },
  dropdownItem: {
    paddingHorizontal: Scale(12),
    paddingVertical: Scale(8),
    borderRadius: Scale(6),
    marginVertical: Scale(2),
  },
  dropdownText: {
    fontSize: 12,
    fontFamily: "Lato-Regular",
    textAlign: "right"
  },
  productCard: {
    flexDirection: "row",
    padding: Scale(16),
  },
  productImage: {
    width: Scale(80),
    height: Scale(80),
    borderRadius: Scale(8),
    backgroundColor: "#F8FAFC",
  },
  productTitle: {
    fontSize: 18,
    color: "#375280",
    marginBottom: Scale(8),
    lineHeight: 24,
    fontFamily : "Lato-Bold",
  },
  productInfo: {
    fontSize: 14,
    color: "#94A3B8",
    lineHeight: 18,
    fontFamily : "Lato-Regular",
    marginHorizontal : 5
  },
  productName: {
    fontSize: 16,
    color: "#375280",
    fontFamily: "Lato-Regular",
    marginBottom: Scale(4),
  },
  productDetails: {
    marginLeft: Scale(16),
    justifyContent: 'center',
  },
  detailsContainer: {
    padding: Scale(16),
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: Scale(16),
  },
  infoLabel: {
    width: Scale(160),
    fontSize: 14.5,
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: "#94A3B8",
    fontFamily: "Lato-Regular",
    textAlign: 'right',
  },
});
// Customizable Area End