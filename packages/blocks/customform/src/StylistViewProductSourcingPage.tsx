import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Modal
} from "react-native";
import { backIcon } from "./assets";
import Scale from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import StylistViewProductSourcingPageController, {
  Props,
  configJSON,
} from "./StylistViewProductSourcingPageController";

export default class StylistViewProductSourcingPage extends StylistViewProductSourcingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerStylistViewProductSourcing, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouchFormSourceProduct}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backIconStylistViewProductSourcing, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitleFormSourceProduct}>
          {i18n.t("Product Sourcing Request")}
        </Text>
      </View>
      <View style={styles.extraViewFormSourceProduct} />
    </View>
  );

  ProductSourcingRequest = () => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CBD5E1', width: '100%', paddingBottom: 10, marginTop: 10 }}>
      <View style={[styles.productCardContent, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <Image
          style={styles.productImage}
          source={{
            uri:
              this.state.apiData.data.attributes.images[0].url ||
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
          <View style={[styles.productDetails, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <Text style={[styles.title, { width: windowWidth * 40 / 100, textAlign: TextAlignManage(i18n.language) }]}>
              {this.state.apiData.data.attributes.product_name}
            </Text>
            {
              this.state.apiData.data.attributes.product_sourcing_stylist_prices.length > 0 && this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].request_status === "waiting" &&
              <View style={styles.waitingBox}>
                <Text style={styles.waitingText}>
                   {i18n.t('Waiting')}
                </Text>
              </View>
            }
            {
              this.state.apiData.data.attributes.product_sourcing_stylist_prices.length > 0 && this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].request_status === "rejected" &&
              <View style={styles.rejectedBox}>
                <Text style={styles.rejectedText}>
                  {i18n.t('Rejected')}
                </Text>
              </View>
            }
            {
              this.state.apiData.data.attributes.product_sourcing_stylist_prices.length > 0 && this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].request_status === "accepted" &&
              <View style={styles.acceptedBox}>
                <Text style={styles.acceptedText}>
                  {i18n.t('Accepted')}
                </Text>
              </View>
            }
          </View>
          <View style={[styles.productDetails, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <Text style={[styles.productPrice, { textAlign: TextAlignManage(i18n.language) }]}>
              {this.state.localCurrency}{this.formatNumber(this.state.apiData.data.attributes.min_price)} - {this.state.localCurrency}
              {this.formatNumber(this.state.apiData.data.attributes.max_price)}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.sb, { marginVertical: 10, flexDirection: FlexConditionManage(i18n.language) }]}>
        <View style={[styles.row, { flexDirection: FlexConditionManage(i18n.language), width: windowWidth * 0.40 }]}>
          <Text style={[styles.title, { alignSelf: 'flex-start', textAlign: TextAlignManage(i18n.language) }]}>
            {i18n.t('Sizes')} - {" "}
          </Text>
          <Text style={[styles.productPrice, { width: windowWidth * 0.30, textAlign: TextAlignManage(i18n.language) }]}>
            {this.state.apiData.data.attributes.sizes.join(", ")}
          </Text>
        </View>
        <View style={[styles.row, { alignSelf: 'flex-start', flexDirection: FlexConditionManage(i18n.language), width: windowWidth * 0.45 }]}>
          <Text style={[styles.title, { alignSelf: 'flex-start',textAlign: TextAlignManage(i18n.language) }]}>
            {i18n.t('Quantity')} - {" "}
          </Text>
          <Text style={styles.productPrice}>
            {this.state.apiData.data.attributes.quantity} Units
          </Text>
        </View>
      </View>
      <View style={[styles.row, styles.sb, { marginVertical: 10 }]}>
        <View style={[styles.row, { alignSelf: 'flex-start', flexDirection: FlexConditionManage(i18n.language), width: windowWidth * 0.40 }]}>
          <Text style={[styles.title, { alignSelf: 'flex-start', textAlign: TextAlignManage(i18n.language) }]}>
            {i18n.t('Colours')} - {" "}
          </Text>
          <Text style={[styles.productPrice, { width: windowWidth * 0.30, textAlign: TextAlignManage(i18n.language) }]}>
            {this.state.apiData.data.attributes.colours.join(", ")}
          </Text>
        </View>
        <View style={[styles.row, { alignSelf: 'flex-start', flexDirection: FlexConditionManage(i18n.language), width: windowWidth * 0.40 }]}>
          <Text style={[styles.title, { alignSelf: 'flex-start', textAlign: TextAlignManage(i18n.language) }]}>
            {i18n.t('Gender')} - {" "}
          </Text>
          <Text style={[styles.productPrice, { width: windowWidth * 0.30, textAlign: TextAlignManage(i18n.language) }]}>
            {this.state.apiData.data.attributes.gender}
          </Text>
        </View>
      </View>
      <View style={[styles.row, styles.sb, { marginVertical: 10, flexDirection: FlexConditionManage(i18n.language) }]}>
        <Text style={[styles.title, {textAlign: TextAlignManage(i18n.language)}]}>
          {this.state.apiData.data.attributes.description}
        </Text>
      </View>
    </View>
  );

  DeleteModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      testID="deleteModal"
      visible={this.state.deleteModal}>
      <View style={styles.modalMainView}>
        <SafeAreaView style={styles.modalSafeArea}></SafeAreaView>
        <View style={styles.modalButtonMainView}>
          <View style={styles.logOutMainView}>
            <View style={styles.logoutBorderView}></View>
            <View style={styles.logoutView}>
              <Text style={styles.logoutModalText}>{i18n.t('Delete Your Bid')}</Text>
            </View>
            <View style={styles.areYouSureView}>
              <Text style={styles.areYouSureText}>{i18n.t('You bid will be permanently deleted.')}</Text>
            </View>
            <View style={[styles.logoutBtnMainView, { flexDirection: FlexConditionManage(i18n.language) }]}>
              <TouchableOpacity testID="btnAcceptOrReject" style={styles.logoutTouchBtn} onPress={() => {
                this.handleDelete()
              }}>
                <Text style={styles.logoutBtnTouchText}>{i18n.t('Delete')}</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="btnCancelRequestNo" style={styles.logoutBtnCancelTouch} onPress={() => {
                this.setState({ deleteModal: false })
              }}>
                <Text style={styles.logoutBtnCancelTouchText}>{i18n.t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )

  UnderReview = () => (
    <View style={styles.underReview}>
      <Text style={styles.reviewTxt}>{configJSON.waitingForApprovalText}</Text>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="MyBidsTabComp">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View
          style={[
            styles.containerView,
            globalStyle.headerMarginManage,
          ]}
          >
          <this.Header />
          {this.state.loading && <CustomLoader />}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {
              this.state.apiData != null && this.state.apiData.data != null &&
              <this.ProductSourcingRequest />
            }
            {
              this.state.apiData != null && this.state.apiData.data != null && this.state.apiData.data.attributes.product_sourcing_stylist_prices.length > 0 &&
              <View style={{ paddingVertical: 10, borderBottomColor: '#CBD5E1', borderBottomWidth: 1, width: '100%' }}>
                <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
                  <Text style={[styles.BidTitel, { textAlign: TextAlignManage(i18n.language) }]}>
                      {i18n.t("My Bid")}
                  </Text>
                </View>
                <View style={{ flexWrap: 'wrap', paddingVertical: 10 , flexDirection: FlexConditionManage(i18n.language) }}>
                  {this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].images.map((image: any, imgIndex: number) => (
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
                  <Text style={[styles.fullName, { textAlign: TextAlignManage(i18n.language) }]}>
                    {this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].full_name}
                  </Text>
                  <Text style={[styles.fullName, { textAlign: 'right' }]}>
                    {this.state.localCurrency}{this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].quote_price}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.quoteDiscription,{textAlign:TextAlignManage(i18n.language)}]}>
                    {this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].product_description}
                  </Text>
                </View>
                {
                  this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].request_status === "accepted" && (
                    <View>
                      <TouchableOpacity
                        testID={`chatButton`}
                        style={styles.chatwithCustomer}
                        onPress={() => this.navigationToChatWithCustomer(this.state.apiData.data.attributes.buyer_id.toString())}
                      >
                        <Text style={styles.acceptText}>{i18n.t("Chat with Customer")}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
                {
                  this.state.apiData.data.attributes.product_sourcing_stylist_prices[0].request_status === "waiting" && (
                    <View style={[styles.productDataRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
                      <TouchableOpacity
                        testID={`deleteButton`}
                        style={styles.deleteButton}
                        onPress={() => this.handleDeleteModel()}
                      >
                        <Text style={styles.deleteText}>{i18n.t("Delete")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID={`editButton`}
                        style={styles.acceptButton}
                        onPress={() => this.navigateToBidYourQuoteEdit()}
                      >
                        <Text style={styles.acceptText}>{i18n.t("Edit Bid")}</Text>
                      </TouchableOpacity>
                    </View>)
                }
              </View>
            }
          </ScrollView>
          <this.UnderReview />
          {
            this.state.apiData != null && this.state.apiData.data != null && this.state.apiData.data.attributes.product_sourcing_stylist_prices.length === 0 &&
            <TouchableOpacity
              testID={`viewButton`}
              style={styles.viewButton}
              onPress={() => this.navigateToBidYourQuote()}
            >
              <Text style={styles.viewText}>{i18n.t("Bid Your Quote")}</Text>
            </TouchableOpacity>
          }
          {this.DeleteModal()}
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
  quoteDiscription: {
    fontWeight: "500",
    fontFamily: "Lato",
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  sb: {
    justifyContent: "space-between",
  },
  logOutMainView: {
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    height: windowHeight * 28 / 100
  },
  areYouSureView: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E4E5',
    height: windowHeight * 8 / 100,
    marginTop: windowWidth * 5 / 100,
    padding: 5,
    alignSelf: 'center',
    width: windowWidth
  },
  logoutBtnTouchText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: windowWidth * 4.5 / 100,
    fontFamily: 'Lato-Bold'
  },
  logoutBtnCancelTouch: {
    width: windowWidth * 42 / 100,
    backgroundColor: '#ffffff',
    height: windowHeight * 5.5 / 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#CCBEB1',
    borderWidth: 1
  },

  logoutTouchBtn: {
    width: windowWidth * 42 / 100,
    backgroundColor: '#F87171',
    height: windowHeight * 5.5 / 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoutBtnCancelTouchText: {
    color: '#375280',
    textAlign: 'center',
    fontSize: windowWidth * 4.5 / 100,
    fontFamily: 'Lato-Bold'
  },
  logoutView: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E4E5',
    height: windowHeight * 4 / 100,
    marginTop: windowWidth * 4 / 100
  },
  logoutBorderView: {
    borderWidth: 2,
    borderColor: '#F2F3F5',
    width: windowWidth * 20 / 100,
    alignSelf: 'center',
    marginTop: windowWidth * 3 / 100
  },
  areYouSureText: {
    textAlign: 'center',
    color: '#375280',
    fontSize:16,
    fontFamily: 'Lato-Regular',
    alignSelf: 'center',
    lineHeight: 24,
  },
  logoutBtnMainView: {
    width: windowWidth * 90 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: windowWidth * 4 / 100
  },
  logoutModalText: {
    textAlign: 'center',
    fontSize: windowWidth * 5.5 / 100,
    color: '#375280',
    fontFamily: 'Lato-Bold'
  },
  deleteButton: {
    width: (windowWidth * 42) / 100,
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
    height: 27,
    width: 76,
  },
  waitingBox: {
    backgroundColor: "#FFE7D0",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 27,
    width: 76,
  },
  waitingText: {
    color: "#BE5B00",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
  acceptedText: {
    color: "#059669",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
  yesTouch: {
    backgroundColor: "#CCBEB1",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
  },
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000080",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  noText: {
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
    color: '#375280'
  },
  cancelOrderText: {
    fontSize: (windowWidth * 4.3) / 100,
    color: "#375280",
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  },

  modalButtonMainView: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth
  },

  modalSafeArea: {
    flex: 0,
  },
  fullName: {
    fontWeight: "700",
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 18,
    textAlign: "left",
    lineHeight: 26,
  },
  deleteText: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "500",
  },
  chatwithCustomer: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  acceptButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 42) / 100,
    height: (windowWidth * 10) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
  },
  acceptText: {
    color: "#ffffff",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "700",
  },
  modalTwoBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  yesText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily: 'Lato-Regular',
  },
  containerView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 90) / 100,
    alignSelf: "center",
  },
  cancelTouch: {
    backgroundColor: "#FFFFFF",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  body: {
    padding: Scale(20),
  },
  productDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  BidTitel: {
    fontWeight: "700",
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 16,
  },
  productPrice: {
    fontWeight: "700",
    fontFamily: "Lato-Bold",
    color: "#375280",
    fontSize: 16,
    textAlign: "right",
    alignSelf: "flex-end",
    lineHeight: 24,
    marginHorizontal: 10
  },
  productCardContent: {
    flexDirection: "row",
  },
  productImage: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 25) / 100,
    borderRadius: 2,
  },
  viewButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (windowWidth * 2) / 100,
    padding: 16,
    alignSelf: "flex-end",
    alignContent: 'flex-end'
  },
  viewText: {
    color: "#ffffff",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
    fontWeight: "800",
  },
  headerTitleFormSourceProduct: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  productDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rejectedBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 27,
    width: 76,
  },
  rejectedText: {
    color: "#DC2626",
    fontFamily: "Lato-Regular",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },
  headerStylistViewProductSourcing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
  },
  backTouchFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  extraViewFormSourceProduct: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  backIconStylistViewProductSourcing: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  title: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
    marginHorizontal :10
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
  reviewTxt: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato",
    textAlign: "center",
  },

});
// Customizable Area End