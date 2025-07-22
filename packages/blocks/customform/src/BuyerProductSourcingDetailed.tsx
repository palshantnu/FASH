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
  StatusBar,
  FlatList,
  RefreshControl,
  Modal,
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon, msgIcon } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config'
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import BuyerProductSourcingDetailedController, {
  Props,
} from "./BuyerProductSourcingDetailedController";

export default class BuyerProductSourcingDetailed extends BuyerProductSourcingDetailedController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.header, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouch}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image resizeMode="contain" source={backIcon} style={[styles.backIcon, { transform : [ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>{i18n.t('productQuotes')}</Text>
      </View>
      <View style={styles.extraView} />
    </View>
  );

  BuyerProductSourcingBody = () => (
    <View>
      <View style={styles.upperBodyView}>
        <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
          <Image
            style={styles.productImage}
            source={{
              uri:
                this.state.data.attributes.images[0].url ||
                "https://i.ibb.co/8Nb9QHL/image.png",
            }}
          />
          <View style={styles.productDetails}>
            <View style={styles.productDetails}>
              <Text style={[styles.title, {textAlign: TextAlignManage(i18n.language)}]}>
                {this.state.data.attributes.product_name}
              </Text>
            </View>
            <View style={styles.productDetails}>
              <Text style={[styles.productPrice, { textAlign: TextAlignManage(i18n.language)}]}>
                {this.state.localCurrency}{this.formatNumber(this.state.data.attributes.min_price)} - {this.state.localCurrency}
                {this.formatNumber(this.state.data.attributes.max_price)}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.productDataRow, {flexDirection: FlexConditionManage(i18n.language)}]}>
          <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
            <Text style={[styles.title,{ textAlign: TextAlignManage(i18n.language)}]}>
              {i18n.t('Sizes')} - 
            </Text>
            <Text
              style={[
                styles.productPrice,
                {textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {" "}{this.state.data.attributes.sizes.join(", ")}
            </Text>
          </View>
          <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
            <Text style={[styles.title,{ textAlign: TextAlignManage(i18n.language)}]}>
              {i18n.t('Quantity')} - 
            </Text>
            <Text
              style={[
                styles.productPrice,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {" "}{this.state.data.attributes.quantity}
            </Text>
          </View>
        </View>
        <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
            <Text style={[{ textAlign: TextAlignManage(i18n.language)},styles.title]}>{i18n.t('Colours')} - </Text>
            <Text
              style={[
                styles.productPrice,
                {textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {" "}{this.state.data.attributes.colours.join(", ")}
            </Text>
          </View>
          <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
            <Text style={[{ textAlign: TextAlignManage(i18n.language)},styles.title]}>{i18n.t('Gender')} - </Text>
            <Text
              style={[
                styles.productPrice,
                {textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {this.state.data.attributes.gender}
            </Text>
          </View>
        </View>
        <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={[styles.title, { textAlign: TextAlignManage(i18n.language)}]}>
            {this.state.data.attributes.description}
          </Text>
        </View>
      </View>
      <FlatList
        data={this.state.data.attributes.product_sourcing_stylist_prices}
        bounces={false}
        testID={"Quotes_data_flatlist_list"}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={styles.flatContainerBottom}
        onEndReachedThreshold={1}
        ListEmptyComponent={() => (
          <View style={styles.listEmptymainView} testID="emptyComp">
            <Text style={styles.listEmptyTitleText}>
              {i18n.t('There are no bids on your product quote yet.')}
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => this.getList(item, index)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  getList = (item: any, index: number) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          borderBottomColor: "#CBD5E1",
          borderBottomWidth: 1,
          width: "100%",
        }}
      >
        <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={[styles.QuoteTitel, { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t('Quote')} {index + 1}</Text>
          {item.request_status === "accepted" && (
            <View style={styles.acceptedBox}>
              <Text style={styles.acceptedText}>{i18n.t('Accepted')}</Text>
            </View>
          )}
          {item.request_status === "rejected" && (
            <View style={styles.rejectedBox}>
              <Text style={styles.rejectedText}>{i18n.t('Rejected')}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: FlexConditionManage(i18n.language),
            flexWrap: "wrap",
            paddingVertical: 10,
          }}
        >
          {item.images.map((image: any, imgIndex: number) => (
            <Image
              key={imgIndex}
              style={styles.productImage}
              source={{
                uri: image.url || "https://i.ibb.co/8Nb9QHL/image.png",
              }}
            />
          ))}
        </View>
        <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={[styles.fullName, { textAlign : TextAlignManage(i18n.language) }]}>{item.full_name}</Text>
          <Text style={[styles.fullName, { textAlign: TextAlignManage(i18n.language) }]}>
            {PriceConvertValue(item.quote_price,this.state.localCurrency)}
          </Text>
        </View>
        <View>
          <Text style={[styles.quoteDiscription, { textAlign: TextAlignManage(i18n.language) }]}>
            {item.product_description}
          </Text>
        </View>
        {item.request_status === "accepted" && (
          <View style={[styles.productDataRow, { flexDirection : FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              testID={`orderDetailText` + item.id}
              style={styles.orderDetailButton}
              disabled={true}
              onPress={() => this.navigateToOrderDetails()}
            >
              <Text style={styles.orderDetailText}>{i18n.t('orderDetails')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`acceptChatText` + item.id}
              style={styles.acceptChatButton}
              onPress={() => this.navigateToChat(item.account_id)}
            >
              <Text style={styles.acceptChatText}>{i18n.t('chatWithStylist')}</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.request_status === "waiting" && (
          <View style={[styles.productDataRow, { flexDirection : FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              testID={`rejectButton` + item.id}
              style={styles.rejectButton}
              onPress={() => this.handelRejectModal(item.id)}
            >
              <Text style={styles.rejectText}>{i18n.t('reject')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`acceptButton` + item.id}
              style={styles.acceptButton}
              onPress={() => this.handelAcceptModal(item.id)}
            >
              <Text style={styles.acceptText}>{i18n.t('accept')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`chatButton` + item.id}
              style={styles.chatButton}
              onPress={() => this.navigateToChat(item.account_id)}
            >
              <Image style={styles.backIcon} source={msgIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  AcceptOrRejectModel = (Action: string) => (
    <Modal
      testID={`${Action}Modal`}
      animationType="slide"
      transparent={true}
      visible={
        Action === "accept"
          ? this.state.acceptModalVisible
          : this.state.rejectModalVisible
      }
    >
      <View style={styles.modalMainView}>
        <SafeAreaView style={styles.modalSafeArea} />
        <View style={styles.modalButtonMainView}>
          <Text style={styles.cancelOrderText}>
            {i18n.t('areYouSureYouWantTo')} {i18n.t(Action)} {i18n.t('thisProductQuote')}?
          </Text>

          <View style={[styles.modalTwoBtnView, {flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID={`btnCancelRequestNo${Action}`}
              style={styles.cancelTouch}
              onPress={() => {
                this.closeModals();
              }}
            >
              <Text style={styles.noText}>{i18n.t('No')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID={`btnAcceptOrReject${Action}`}
              style={styles.yesTouch}
              onPress={() => {
                this.acceptOrRejectQuote(Action);
              }}
            >
              <Text style={styles.yesText}>{i18n.t('Yes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="BuyerProductSourcingView">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={[styles.bodyView, globalStyle.headerMarginManage]}>
          <this.Header />
          <ScrollView
            bounces={false}
            testID="product_sourcing_scrollview"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshData}
              />
            }
          >
            {this.state.data && <this.BuyerProductSourcingBody />}
          </ScrollView>
          {this.AcceptOrRejectModel("accept")}
          {this.AcceptOrRejectModel("reject")}
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
  },
  upperBodyView: {
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    width: "100%",
    paddingBottom: 10,
    marginTop: 10,
  },
  productImage: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 25) / 100,
    borderRadius: 2,
  },
  productDetails: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal : 10,
    justifyContent: "space-between", 
  },
  productDataRow: {
    justifyContent : 'space-between',
    marginVertical: 10,
    width: windowWidth* 0.9,
  },
  productPrice: {
    fontWeight: "700",
    fontFamily: "Lato-Bold",
    color: "#375280",
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
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
  flatContainerBottom: {
    paddingBottom: (windowHeight * 20) / 100,
  },
  QuoteTitel: {
    fontWeight: "700",
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 16,
  },
  fullName: {
    fontWeight: "700",
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 26,
  },
  quoteDiscription: {
    fontWeight: "500",
    fontFamily: "Lato",
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
  },
  rejectButton: {
    width: (windowWidth * 35) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  acceptedBox: {
    backgroundColor: "#D1FAE5",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptedText: {
    color: "#059669",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3) / 100,
    fontWeight: "500",
    lineHeight: 18,
  },
  rejectedBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  rejectedText: {
    color: "#DC2626",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3) / 100,
    fontWeight: "500",
    lineHeight: 18,
  },
  rejectText: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
  acceptButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 35) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  acceptText: {
    color: "#ffffff",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
  acceptChatButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 43) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  orderDetailButton: {
    backgroundColor: "#fff",
    width: (windowWidth * 43) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
    borderColor: "#CCBEB1",
    borderWidth: 1,
    opacity:0
  },
  acceptChatText: {
    color: "#ffffff",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "700",
    lineHeight: 26,
  },
  orderDetailText: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    lineHeight: 26,
  },
  chatButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 10) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelOrderText: {
    fontSize: (windowWidth * 4.3) / 100,
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Bold",
  },
  modalTwoBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelTouch: {
    backgroundColor: "#FFFFFF",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  yesText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: "500",
    fontFamily: "Lato-Regular",
  },
  modalButtonMainView: {
    height: (windowHeight * 22) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: (windowWidth * 7) / 100,
    justifyContent: "space-between",
  },
  modalSafeArea: {
    flex: 0,
    backgroundColor: "#00000080",
  },
  noText: {
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  yesTouch: {
    backgroundColor: "#CCBEB1",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
  },
});
// Customizable Area End
