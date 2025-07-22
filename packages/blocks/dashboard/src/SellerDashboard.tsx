import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  VirtualizedList,
  TouchableOpacity,
  StatusBar,
  RefreshControl
} from "react-native";

import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/CustomButton";
import {
  bell,
  arrowNext,
  cubeBox,
  timer,
  bag,
  cart,
  chartBarIcon
} from "./assets";
const windowWidth = Dimensions.get("window").width;
import CustomLoader from "../../../components/src/CustomLoader";
const { width } = Dimensions.get("window");
import ImageNotFound from "../../../components/src/ImageNotFound";
import {  OrderItemSellerNew, SellerOrderSellerNew} from "../../ordermanagement/src/types"
// Customizable Area End

import SellerDashboardController, { Props } from "./SellerDashboardController";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";

export default class SellerDashboard extends SellerDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  headerComponent=()=>( <View>
    <View
      style={[styles.row, styles.sb, styles.body ,{flexDirection: FlexConditionManage(i18n.language)}]}
      testID="header"
    >
      <View style={[styles.row, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <Text style={styles.headerText}>{i18n.t("allStoresText")}</Text>
      </View>
      <View style={[styles.row,styles.sb,{width:windowWidth*15/100 ,flexDirection: FlexConditionManage(i18n.language)}]}>
        <TouchableOpacity testID="btnRedirectDashboard" style={{width:windowWidth*6/100,height:windowWidth*6/100}} onPress={()=>{this.btnRedirectDashboard()}} >
          <Image resizeMode="contain" source={chartBarIcon} style={{width:windowWidth*5.5/100,height:windowWidth*5.5/100}}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{width:windowWidth*6/100,height:windowWidth*6/100}} onPress={()=>this.btnNotificationRedirection()}>
          <Image resizeMode="contain" source={bell} style={{width:windowWidth*5/100,height:windowWidth*5.1/100}} />
          {this.state.hasNewNotification && <View style={styles.redDot} />}
        </TouchableOpacity>
      </View>
    </View>

    <TouchableOpacity style={[styles.storeSelector, { flexDirection: FlexConditionManage(i18n.language) }]} onPress={this.navigationSelectStore}>
      <Text style={styles.selectStoreText}>{i18n.t("selectStoresText")}</Text>
      <Image source={arrowNext} style={[styles.nextIcon, {
        transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]
      }]} />
    </TouchableOpacity>

    <View style={[styles.statGroup, {direction : FlatListRowManage(i18n.language)}]}>
      <View style={[styles.row, styles.sb]}>
        <View style={styles.statItem}>
          <View style={styles.statImg}>
            <Image source={cubeBox} style={styles.statIcon} />
          </View>
          <View>
            <Text style={styles.statH}>{i18n.t("totalProducts")}</Text>
            <Text style={styles.statD}>{this.state.totalCount}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statImg}>
            <Image source={timer} style={styles.statIcon} />
          </View>
          <View>
            <Text style={styles.statH}>{i18n.t("pending")}</Text>
            <Text style={styles.statD}>{this.state.totalPending}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.row, styles.sb]}>
        <View style={styles.statItem}>
          <View style={styles.statImg}>
            <Image source={bag} style={styles.statIcon} />
          </View>
          <View>
            <Text style={styles.statH}>{i18n.t("inProgress")}</Text>
            <Text style={styles.statD}>{this.state.totalProgress}</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statImg}>
            <Image source={cart} style={styles.statIcon} />
          </View>
          <View>
            <Text style={styles.statH}>{i18n.t("accepted")}</Text>
            <Text style={styles.statD}>{this.state.totalDelivered}</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={[styles.row, styles.sb, styles.ordersH1, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <Text style={styles.hh1}>{i18n.t("newOrdersText")}</Text>
      <TouchableOpacity onPress={this.handleNavigateToOrdersTab} style={styles.hh2Wrapper} testID="ViewAllBtn">
        <Text style={styles.hh2}>{i18n.t("viewAllBtn")}</Text>
      </TouchableOpacity>
    </View>
  </View>)
  // Customizable Area End

  render() {
    // Customizable Area Start
    
    return (
      //Merge Engine DefaultContainer
      <SafeAreaView style={styles.container} testID="seller-db">
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <FlatList
          style={styles.container}
          testID="new_order_list"
          ListHeaderComponent={
           this.headerComponent
          } 
          ItemSeparatorComponent={() => <View style={styles.div} />}
          data={this.state.newOrders}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
          }
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() =>
            !this.state.loading ? (
                <View style={styles.listEmptyContainer}>

                    <Text
                        style={[
                            { fontSize: (windowWidth * 5) / 100, color: "#375280" },
                            styles.noCatalogueText,
                        ]}
                    >
                        {i18n.t("noNewOrder")}
                    </Text>
                </View>
            ) : null
        }
          renderItem={({ item }: { item: SellerOrderSellerNew }) => {
            const { order_management_order, id, order_items } = item.attributes;

            const totalPrice = this.getTheTotalPrice(order_items)
            const orderId = id.toString();
            const orderText = i18n.t('acceptOrder');
            const timeRemaining = this.findTimeRemainingForId(orderId);
            const title = `${orderText} (${timeRemaining})`;
            
            return (
              <View>
                <VirtualizedList
                  testID="virualizedList"
                  initialNumToRender={3}
                  getItemCount={() => order_items.length}
                  getItem={(getItem, itemlist) => order_items[itemlist]}
                  keyExtractor={(item: OrderItemSellerNew, index: number) => item.id}
                  ListHeaderComponent={() => {
                    const orderNumber = `${order_management_order.attributes.order_number} | ${this.getTimeInCorrectFormat(order_management_order.attributes.placed_at)}`;
                    return (
                      <View style={[ {direction : FlatListRowManage(i18n.language)}, styles.row, styles.sb, styles.ordersH2]}>
                        <Text style={styles.orhh1}>#{orderNumber}</Text>
                        <View style={styles.orhh2Wrapper}>
                          <Text style={styles.orhh2}>{i18n.t("new_order")}</Text>
                        </View>
                      </View>
                    );
                  }}
                  renderItem={({ item }: { item: OrderItemSellerNew }) => {
                    const { catalogue_name, quantity ,catalogue_variant_front_image} = item.attributes;
                   
                    return (
                      <View style={[styles.row, styles.ordersH2, { direction : FlatListRowManage(i18n.language)}]}>
                        <Image
                          source={ImageNotFound(catalogue_variant_front_image)}
                          style={styles.orderThumb}
                        />
                        <View style={styles.orderInfo}>
                        <Text style={styles.prodName}>{catalogue_name}</Text>
                          <Text style={styles.quantity}>
                          {i18n.t("Quantity")+ " : " + quantity}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  ListFooterComponent={() => (
                    <>
                      <View style={[styles.row,{ direction : FlatListRowManage(i18n.language)}, styles.sb, styles.orderFh]}>
                        <Text style={styles.prodName}>{this.getStoreName(order_items[0].attributes.store_name)}</Text>
                        <Text style={styles.orhh1}>
                          <Text style={styles.prodName}>${this.formatThePrice(totalPrice)}</Text> ({i18n.t("paidViaCard")})
                        </Text>
                      </View>
                      <View style={[styles.row,{ flexDirection: FlexConditionManage(i18n.language)}, styles.btns]}>
                        <CustomButton
                        testID="RejectOrderBtn"
                        style={styles.rejButton}
                        textStyle={styles.rejTxt}
                        title={i18n.t("reject")}
                          onPress={()=>this.navigationToRejectOrder(id)}
                        />
                        <CustomButton
                          testID="AcceptOrderBtn"
                          style={styles.accButton}
                          title={title}
                          textStyle={styles.accTxt}
                          onPress={()=>this.navigationToAcceptOrder(id)}
                        />
                      </View>
                    </>
                  )}
                />
              </View>
            );
          }}
          
          ListFooterComponent={<View style={styles.bottom} />}
        />
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
    backgroundColor: "#FFFFFF",
  },
  bottom: {
    paddingBottom: Scale(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 8,
    height: 8,
    borderRadius:4,
    backgroundColor: 'red',
   },
  sb: {
    justifyContent: "space-between",
  },
  body: {
    padding: Scale(20),
  },
  btns: {
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(20),
  },
  menuBtn: {
    height: Scale(24),
    width: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  headerText: {
    fontFamily: "Avenir",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#375280",
    marginHorizontal: Scale(12),
  },
  bell: {
    height: Scale(18),
    width: Scale(18),
    margin: Scale(4),
    resizeMode: "contain",
  },
  storeSelector: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
    paddingHorizontal: Scale(16),
    paddingVertical: Scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
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
    lineHeight: 26,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato",
  },
  nextIcon: {
    marginTop: Scale(2),
    height: Scale(24),
    width: Scale(26),
  },
  statGroup: {
    marginHorizontal: Scale(14),
  },
  statItem: {
    flex: 1,
    margin: Scale(6),
    padding: Scale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
  },
  statImg: {
    height: Scale(50),
    width: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: Scale(2),
  },
  statIcon: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  statH: {
    fontSize: 14,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Regular",
    marginHorizontal: Scale(12),
  },
  statD: {
    fontSize: 20,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
    textAlign : 'left',
    marginHorizontal: Scale(12),
  },
  hh1: {
    fontSize: 18,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  hh2Wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#375280",
  },
  hh2: {
    fontSize: 14,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  ordersH1: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(12),
  },
  ordersH2: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(16),
  },
  orhh1: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  orhh2: {
    color: "#059669",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  orhh2Wrapper: {
    backgroundColor: "#D1FAE5",
    borderRadius: Scale(5),
    overflow: "hidden",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(4),
  },
  orderThumb: {
    height: Scale(48),
    width: Scale(48),
    borderRadius: Scale(4),
    resizeMode: "cover",
  },
  orderInfo: {
    marginHorizontal: Scale(12),
  },
  orderFh: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(5),
},
  prodName: {
    fontSize: 14,
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  quantity: {
    fontSize: 12,
    lineHeight: 22,
    textAlign : 'left',
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  rejButton: {
    width: Scale(width * 0.35),
    marginRight: Scale(10),
    borderRadius: Scale(2),
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CCBEB1",
  },
  rejTxt: {
    color: "#375280",
    fontWeight: "500",
    fontSize: 16,
  },
  accButton: {
    flex: 1,
    borderRadius: Scale(2),
  },
  accTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  div: {
    height: Scale(2),
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: Scale(20),
    marginBottom: Scale(20),
  },
  listEmptyContainer: {
    width: (windowWidth * 100) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 40) / 100,
   
},
noCatalogueText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
},
});
// Customizable Area End
