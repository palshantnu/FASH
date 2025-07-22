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
  buttonMenu,
  cubeBox,
  timer,
  bag,
  cart,
  backIcon,
  crossIcon
} from "./assets";

const windowWidth = Dimensions.get("window").width;
import CustomLoader from "../../../components/src/CustomLoader";
const { width } = Dimensions.get("window");
import ImageNotFound from "../../../components/src/ImageNotFound";
import {  OrderItemSeller, SellerOrderSellerSeller} from "../../ordermanagement/src/types"
import CustomSwitch from "../../../components/src/CustomSwitch";
// Customizable Area End

import DashboardSpecificStoreController, { Props } from "./DashboardSpecificStoreController";
import { fashionIcon } from "../../navigationmenu/src/assets";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";

export default class DashboardSpecificStore extends DashboardSpecificStoreController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  flatlistHeaderComponent=()=>(
    <View>
    <View
      style={[styles.row, styles.sb, styles.bodyStore, { direction: FlatListRowManage(i18n.language) }]}
      testID="header"
    >
      <View style={styles.row}>
        <View style={styles.storeNameMainView}>
          <Image style={styles.storeImage}  source={ImageNotFound(this.state.storeImageUrl)}></Image>
          <Text numberOfLines={1} style={styles.headerTextStore}>{this.state.storeName}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={this.navigationToNaviagtioMenu}>
        <Image source={crossIcon} style={styles.menuBtnStore} />
        </TouchableOpacity>
    </View>

      <View style={[styles.allStoreMainView, { direction: FlatListRowManage(i18n.language) }]}>
          <Text style={styles.allStoreMainText}>{this.state.storeLabelText}</Text>
          <CustomSwitch
          size={16}
          value={this.state.storeOpenCloseStatus}
          onValueChange={this.toggleStatus}
          testID="toggleAllOpenStatus"
          />
      </View>

    <View style={[styles.statGroupStore, { direction: FlatListRowManage(i18n.language) }]}>
      <View style={[styles.row, styles.sb]}>
        <View style={styles.statItemStore}>
          <View style={styles.statImgStore}>
            <Image source={cubeBox} style={styles.statIconStore} />
          </View>
          <View>
            <Text style={styles.statHStore}>{i18n.t("totalProducts")}</Text>
            <Text style={styles.statDStore}>{this.state.totalCount}</Text>
          </View>
        </View>

        <View style={styles.statItemStore}>
          <View style={styles.statImgStore}>
            <Image source={timer} style={styles.statIconStore} />
          </View>
          <View>
            <Text style={styles.statHStore}>{i18n.t("pending")}</Text>
            <Text style={styles.statDStore}>{this.state.totalPending}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.row, styles.sb]}>
        <View style={styles.statItemStore}>
          <View style={styles.statImgStore}>
            <Image source={bag} style={styles.statIconStore} />
          </View>
          <View>
            <Text style={styles.statHStore}>{i18n.t("inProgress")}</Text>
            <Text style={styles.statDStore}>{this.state.totalProgress}</Text>
          </View>
        </View>

        <View style={styles.statItemStore}>
          <View style={styles.statImgStore}>
            <Image source={cart} style={styles.statIconStore} />
          </View>
          <View>
            <Text style={styles.statHStore}>{i18n.t("accepted")}</Text>
            <Text style={styles.statDStore}>{this.state.totalDelivered}</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={[styles.row, styles.sb, styles.ordersH1, { direction : FlatListRowManage(i18n.language) }]}>
      <Text style={styles.hh1Store}>{i18n.t("newOrdersText")}</Text>
      <TouchableOpacity style={styles.hh2StoreWrapperStore} onPress={this.handleNavigateToOrdersTab}  testID="ViewAllBtn">
        <Text style={styles.hh2Store}>{i18n.t("viewAllBtn")}</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainerStore
      <SafeAreaView style={styles.containerStore} testID="seller-store-db">
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <FlatList
          style={styles.containerStore}
          testID="new_order_list_flatlist"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
           this.flatlistHeaderComponent
          }
          ItemSeparatorComponent={() => <View style={styles.divStore} />}
          data={this.state.newOrders}
          refreshControl={
            <RefreshControl refreshing={this.state.isLoading} onRefresh={this.onLoading} />
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
                    > {
                      i18n.t("noNewOrderForStore")
                    }
                        
                    </Text>
                </View>
            ) : null
        }
        renderItem={({ item }: { item: SellerOrderSellerSeller }) => {
          const { order_management_order, id, order_items } = item.attributes;

          const totalPrice = this.getTheTotalPrice(order_items)
          
          return (
            <View>
              <VirtualizedList
                testID="virualizedList"
                initialNumToRender={3}
                getItemCount={() => order_items.length}
                getItem={(getItem, itemlist) => order_items[itemlist]}
                keyExtractor={(item: OrderItemSeller, index: number) => item.id}
                ListHeaderComponent={() => {
                  const orderNumber = `${order_management_order.attributes.order_number} | ${this.getTimeInCorrectFormat(order_management_order.attributes.placed_at)}`;
                  return (
                    <View style={[styles.row, styles.sb,{
                      direction : FlatListRowManage(i18n.language)
                    }, styles.ordersH2]}>
                      <Text style={styles.orhh1Store}>#{orderNumber}</Text>
                      <View style={styles.orhh2StoreWrapperStore}>
                        <Text style={styles.orhh2Store}>{i18n.t("new_order")}</Text>
                      </View>
                    </View>
                  );
                }}
                renderItem={({ item }: { item: OrderItemSeller }) => {
                  const { catalogue_name, quantity ,catalogue_variant_front_image} = item.attributes;
                 
                  return (
                    <View style={[{  direction : FlatListRowManage(i18n.language)},styles.row, styles.ordersH2]}>
                      <Image
                        source={ImageNotFound(catalogue_variant_front_image)}
                        style={styles.orderThumbStore}
                      />
                      <View style={styles.orderInfoStore}>
                      <Text style={styles.prodName}>{catalogue_name}</Text>
                        <Text style={styles.quantity}>
                        {"Quantity : " + quantity}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                ListFooterComponent={() => (
                  <>
                  <View style={[styles.row,{  direction : FlatListRowManage(i18n.language)}, styles.sb, styles.orderFh]}>
                    <Text style={styles.prodName}>{this.getStoreName(order_items[0].attributes.store_name)}</Text>
                    <Text style={styles.orhh1Store}>
                      <Text style={styles.prodName}>${this.formatThePrice(totalPrice)}</Text> (Paid Via Card)
                    </Text>
                  </View>
                  <View style={[styles.row, styles.btns, { flexDirection: FlexConditionManage(i18n.language) }]}>
                    <CustomButton
                    testID="RejectOrderBtn"
                      title={i18n.t("reject")}
                      style={styles.rejButtonStore}
                      textStyle={styles.rejTxtStore}
                      onPress={()=>this.navigationToRejectOrder(id)}
                    />
                    <CustomButton
                      testID="AcceptOrderBtn"
                      title={`${i18n.t("accept")} (0:29)`}
                      style={styles.accButtonStore}
                      textStyle={styles.accTxtStore}
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
      //Merge Engine End DefaultContainerStore
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerStore: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
    bottom: {
        paddingBottom: Scale(20),
    },
    sb: {
      justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    btns: {
      paddingVertical: Scale(12),
      paddingHorizontal: Scale(20),
    },
    bodyStore: {
        padding: Scale(20),
    },
  menuBtnStore: {
    height: Scale(24),
    width: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  headerTextStore: {
    fontFamily: "Avenir",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#375280",
    marginHorizontal: Scale(8),
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
    fontFamily: "Lato-Regular",
  },
  nextIconStore: {
    marginTop: Scale(2),
    height: Scale(24),
    width: Scale(26),
  },
  statGroupStore: {
    marginHorizontal: Scale(14),
    marginTop:width*3/100
  },
  statItemStore: {
    flex: 1,
    margin: Scale(6),
    padding: Scale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
  },
  statImgStore: {
    height: Scale(50),
    width: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: Scale(2),
  },
  statIconStore: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  statHStore: {
    fontSize: 14,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Regular",
    marginHorizontal: Scale(12),
  },
  statDStore: {
    fontSize: 20,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
    marginHorizontal: Scale(12),
    textAlign : 'left'
  },
  hh1Store: {
    fontSize: 18,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  hh2StoreWrapperStore: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#375280",
  },
  hh2Store: {
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
  orhh1Store: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  orhh2Store: {
    color: "#059669",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  orhh2StoreWrapperStore: {
    backgroundColor: "#D1FAE5",
    borderRadius: Scale(5),
    overflow: "hidden",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(4),
  },
  orderThumbStore: {
    height: Scale(48),
    width: Scale(48),
    borderRadius: Scale(4),
    resizeMode: "cover",
  },
  orderInfoStore: {
    marginHorizontal: Scale(12),
  },
  prodName: {
    fontSize: 14,
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Bold",
    textAlign : 'left'
  },
  orderFh: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(5),
},
  quantity: {
    fontSize: 12,
    lineHeight: 22,
    color: "#375280",
    fontFamily: "Lato-Regular",
    textAlign : 'left'
  },
  rejButtonStore: {
    width: Scale(width * 0.35),
    marginRight: Scale(10),
    borderRadius: Scale(2),
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CCBEB1",
  },
  rejTxtStore: {
    color: "#375280",
    fontWeight: "500",
    fontSize: 16,
  },
  accButtonStore: {
    flex: 1,
    borderRadius: Scale(2),
  },
  accTxtStore: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  divStore: {
    height: Scale(2),
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: Scale(20),
    marginBottom: Scale(20),
  },
    allStoreMainView:{
        width:width*90/100,
        alignSelf:'center',
        flexDirection:'row',
        marginTop:width*1/100,
        alignItems:'center'
    },
    allStoreMainText:{
        fontSize:width*4/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        color:'#375280',
        marginRight:width*3/100
    },
    storeNameMainView:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:width*2/100
    },
    storeImage:{
        width:width*10/100,
        height:width*10/100,
        borderRadius:width*10/100
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
