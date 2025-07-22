import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  RefreshControl
} from "react-native";
import { arrowRight, leftArrow } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import HeaderIconRight from "../../../components/src/HeaderIconRight";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import ProductSourcingTabCompController, {
  Props,
  configJSON,
} from "./ProductSourcingTabCompController";

export default class ProductSourcingTabComp extends ProductSourcingTabCompController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <TouchableOpacity testID="myBidsButton" onPress={() => this.navigateToMyBids()}>
      <View style={[styles.body, styles.row, styles.sb, { borderBottomWidth: 1, borderBottomColor: '#CBD5E1', width: '90%', flexDirection: FlexConditionManage(i18n.language) }]} testID="headerArea">
        <View style={[styles.row, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={styles.headerText}>{i18n.t('My Bids')}</Text>
          <Image source={HeaderIconRight(i18n.language) ? arrowRight : leftArrow} style={styles.nextIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  UnderReview = () => (
    <View style={styles.underReview}>
      <Text style={styles.reviewTxt}>{configJSON.waitingForApprovalText}</Text>
    </View>
  );

  getList = (item: any) => {
    return (
      <View style={styles.card}>
        <View style={[styles.cardContent, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Image
            style={styles.image}
            source={{
              uri:
                item.item.attributes.images[0].url ||
                "https://i.ibb.co/8Nb9QHL/image.png",
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: windowWidth * 0.03,
            }}
          >
            <View style={[styles.details, { flexDirection: FlexConditionManage(i18n.language) }]}>
              <Text style={[styles.title, { textAlign: TextAlignManage(i18n.language) }]}>
                {item.item.attributes.product_name}
              </Text>
            </View>
            <View style={[styles.details, { flexDirection: FlexConditionManage(i18n.language) }]}>
              <Text style={[styles.price, { textAlign: TextAlignManage(i18n.language) }]}>
                {this.state.localCurrency}{this.formatNumber(item.item.attributes.min_price)} - {this.state.localCurrency}
                {this.formatNumber(item.item.attributes.max_price)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity
            testID={`viewButton` + item.item.id}
            style={styles.viewButton}
            onPress={() => this.navigateToViewProductSourcing(item.item.id)}
          >
            <Text style={styles.viewText}>{i18n.t('View')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="ProductSourcingTabComp">
        <this.Header />
        {this.state.loading && <CustomLoader />}
        <View style={styles.containerView}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View style={{ flex: 1, flexDirection: FlexConditionManage(i18n.language), alignSelf: 'center', justifyContent: "space-between", width: '100%', marginTop: windowHeight * 0.02, marginBottom: windowHeight * 0.02 }}>
              <Text style={styles.headerText}>{i18n.t('Product Sourcing Requests')}</Text>
              <TouchableOpacity testID="seeAllButton" onPress={() => this.navigateToSeeAllProductSourcing()}>
                <Text style={styles.headerText}>{i18n.t('See all')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              bounces={false}
              data={this.state.apiData.data.slice(0, 4)}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatContainerBottom}
              testID={"product_sourcing_flatlist_list"}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshData}
                />
              }
              ListEmptyComponent={() =>
                !this.state.loading ? (
                  <View style={styles.listEmptymainView} testID="emptyComp">
                    <Text style={styles.listEmptyTitleText}>
                      {i18n.t('ProductSourcing.flatList.empty')}
                    </Text>
                  </View>
                ) : null
              }
              onEndReachedThreshold={1}
              keyExtractor={(item) => item.id}
              renderItem={(item) => this.getList(item)}
            />
          </ScrollView>
        </View>
        <this.UnderReview />
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
  row: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: Scale(10),
  },
  sb: {
    justifyContent: "space-between",
  },
  containerView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  body: {
    paddingVertical: Scale(20),
  },
  menuBtn: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    marginBottom: Scale(2),
  },
  headerText: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "700",
    color: "#375280",
    lineHeight: 26,
  },
  bell: {
    margin: Scale(4),
    height: Scale(18),
    width: Scale(18),
    resizeMode: "contain",
  },
  underReview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.05,
  },
  flatContainerBottom: {
    paddingBottom: (windowHeight * 20) / 100,
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
  reviewTxt: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato",
    textAlign: "center",
  },
  storeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(16),
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
    fontWeight: "500",
    lineHeight: 26,
    fontFamily: "Lato",
    color: "#375280",
  },
  nextIcon: {
    height: Scale(24),
    marginTop: Scale(2),
    width: Scale(26),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    marginVertical: 10,
    width: (windowWidth * 90) / 100,
  },
  cardContent: {
    flexDirection: "row",
  },
  image: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 25) / 100,
    borderRadius: 2,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    // marginHorizontal: windowWidth * 0.03,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 24,
    marginHorizontal: 10
  },
  price: {
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: (windowWidth * 4) / 100,
    textAlign: "right",
    alignSelf: "flex-end",
    marginHorizontal: 10
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: (windowWidth * 90) / 100,
    marginTop: (windowWidth * 2) / 100,
  },
  viewButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  viewText: {
    color: "#ffffff",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
});
// Customizable Area End