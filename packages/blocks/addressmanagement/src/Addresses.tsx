import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  FlatList,
  Platform,
  ListRenderItem,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import CustomButton from "../../../components/src/CustomButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon, home, other } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import AddressManagementController, {
  Props,
  AddressType,
} from "./AddressManagementController";

export default class Addresses extends AddressManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAdressList: ListRenderItem<AddressType> = ({ item }) => {
    return (
      <View style={[styles.addressContainer]} testID="addressItem">
        <View
          style={[ styles.flexRow, { flexDirection: FlexConditionManage(i18n.language)}]}>
          <Image
            source={ item.attributes.address_name && item.attributes.address_name.toLowerCase() === "home" ? home : other }
            resizeMode="contain"
            style={styles.imageStyle}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={[styles.addressContentHeader,{ textAlign: TextAlignManage(i18n.language) }]}>
              {item.attributes.address_name}
              {item.attributes.is_default && (
                <Text style={[styles.defaultAddress,{ textAlign: TextAlignManage(i18n.language) },]}>{` (${i18n.t("default")})`}</Text>
              )}
            </Text>
            <Text
              style={[ styles.addressText, { marginTop: 8 },{ textAlign: TextAlignManage(i18n.language) },]}>{item.attributes.name}</Text>
            <Text
              numberOfLines={3}
              style={[ styles.addressText,{ textAlign: TextAlignManage(i18n.language) },]}
            >
              {item.attributes.house_or_building_number},{" "}
              {item.attributes.street}, {item.attributes.block},{" "}
              {item.attributes.area}, {item.attributes.zipcode}
            </Text>

            <View
              style={{...styles.flexRow,flexDirection: FlexConditionManage(i18n.language),}}>
              <TouchableOpacity
                testID="editAddressBtn"
                onPress={() =>this.editAddress(item.id, item.attributes.country_code)}>
                <Text
                  style={[styles.editText,{ textAlign: TextAlignManage(i18n.language) },]}
                >
                  {i18n.t("Edit")}
                </Text>
              </TouchableOpacity>

              {!item.attributes.is_default && (
              <TouchableOpacity
                onPress={()=>this.deleteAddress(item.id)}
                testID="deleteAddressBtn">
                <Text style={[ styles.deletText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Delete")}</Text>
              </TouchableOpacity>
            )}
            </View>
          </View>
          {this.state.addressList!.length > 1 ? (
            <View style={styles.checkBoxContainer}>
              <CheckBox
                testID={item.id + "-checkbox"}
                value={item.attributes.is_default_1}
                disabled={item.attributes.is_default_1}
                onChange={() => this.toggleAssignAddress(item.id)}
                boxType="square"
                tintColor="#FFFFFF"
                onCheckColor="#FFFFFF"
                onFillColor="#CCBEB1"
                onTintColor="#FFFFFF"
                animationDuration={0}
                tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
                style={styles.checkBox}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        <SafeAreaView />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View style={styles.viewContainer}>
          <View
            style={[
              styles.headerViewMainCatalogue,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="btnBackAddress"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[
                  styles.backIconCssCatalogue,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCatalogue}>
                {i18n.t("Addresses")}
              </Text>
            </View>
            <View style={styles.filterTouch} />
          </View>

          <FlatList
            data={this.state.addressList}
            testID={"address_flatlist_list"}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.flContainer}
            keyExtractor={(item: { id: string }) => item.id}
            ListEmptyComponent={() => {
              return !this.state.loading ? (
                <View
                  style={[
                    styles.noProductsContainerInAdd,
                    { marginTop: (windowHeight * 30) / 100 },
                  ]}
                >
                  <Text style={styles.noProductTextInAdd}>
                    {i18n.t("No addresses added here")}
                  </Text>
                  <TouchableOpacity
                    testID="btnAddAddress"
                    style={styles.addProductButtonInAdd}
                    onPress={() => this.goToAddAddress()}
                  >
                    <Text style={styles.addProductButtonTextInAdd}>
                      {"+ " + i18n.t("Add Address")}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null;
            }}
            renderItem={this.renderAdressList}
            ListFooterComponent={(() => {
              if (
                !this.state.loading &&
                this.state.checkoutId &&
                this.state.addressList &&
                this.state.addressList.length > 0
              ) {
                return (
                  <CustomButton
                    testID="btnNext"
                    style={styles.addAddress}
                    textStyle={styles.noProductTextInAdd}
                    onPress={() => this.goToAddAddress()}
                    title={i18n.t("Add New Address")}
                  />
                );
              }
              return null;
            })()}
          />
          {(() => {
            if (
              !this.state.loading &&
              this.state.addressList &&
              this.state.addressList.length > 0
            ) {
              if (this.state.checkoutId) {
                return (
                  <View style={styles.bottomView}>
                    <CustomButton
                      title="Checkout"
                      testID="checkout"
                      onPress={() => this.props.navigation.goBack()}
                    />
                  </View>
                );
              }
              return (
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    testID="btnAddAdress"
                    style={styles.addAdressButton}
                    onPress={() => this.goToAddAddress()}
                  >
                    <Text style={styles.addNewButtonText}>
                      {i18n.t("Add New Address")}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })()}
        </View>
      </View>
      //Merge Engine End DefaultContainer
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignSelf: "center",
    width: (windowWidth * 90) / 100,
  },
  headerViewMainCatalogue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchCatalogue: {
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
    width: (windowWidth * 6) / 100,
  },
  imageStyle:{ alignItems: "center",height: 24, width: 24, },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    textAlign: "center",
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
  },
  safeContainer: {
    // flex: 1,
    backgroundColor: "#ffffff",
  },
  filterTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  checkBoxContainer: {
    alignItems: "center",
    position: "absolute",
    right: 2,
    width: Scale(22),
    height: Scale(22),
  },
  checkBox: {
    margin: Scale(2),
    borderWidth: Scale(2),
    ...Platform.select({
      ios: {
        height: Scale(24),
        width: Scale(24),
      },
    }),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
  },
  addressHeader: {
    color: "#375280",
    fontFamily: "Avenir-Heavy",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontWeight: "800",
  },
  bottomView: {
    height: "10%",
    backgroundColor: "#FFFFFF",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  addAdressButton: {
    marginLeft: "2%",
    justifyContent: "center",
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 86) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: 24,
    position: "absolute",
    bottom: 20,
  },
  addAdressBtn: {
    marginTop: (windowWidth * 80) / 100,
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    backgroundColor: "white",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  addNewButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 4) / 100,
  },
  addressSubHeader: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: (windowHeight * 2) / 100,
    textAlign: "center",
    marginTop: (windowHeight * 2) / 100,
  },
  addressContainer: {
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: Platform.OS == "android" ? 10 : 2,
    marginTop: 24,
    margin: 8,
  },
  addressText: {
    paddingRight: Scale(12),
    fontFamily: "Lato-Regular",
    color: "#475569",
    fontSize: (windowWidth * 3.8) / 100,
  },
  addressContentHeader: {
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    fontFamily: "Lato-Bold",
    textTransform: "capitalize",
  },
  flexRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  defaultAddress: {
    fontWeight: "500",
    color: "#475569",
    textTransform: "none",
  },
  editText: {
    fontFamily: "Lato-Bold",
    fontWeight: "700",
    fontSize: (windowHeight * 2) / 100,
    marginBottom: 5,
    color: "#375280",
  },
  deletText: {
    fontFamily: "Lato-Bold",
    fontWeight: "700",
    marginBottom: 5,
    marginHorizontal: 20,
    fontSize: (windowHeight * 2) / 100,
    color: "#F97171",
  },
  noProductTextInAdd: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    textAlign: "center",
  },
  noProductsContainerInAdd: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: "5%",
  },
  addProductButtonInAdd: {
    backgroundColor: "#CCBEB1",
    width: "48%",
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
  },
  addAddress: {
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 2,
    marginTop: Scale(16),
    borderColor: "#CCBEB1",
    marginHorizontal: Scale(6),
  },
  addProductButtonTextInAdd: {
    color: "#fff",
    textAlign: "center",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
    fontFamily: "Lato-Bold",
  },
  flContainer: { paddingBottom: 100 },
});
// Customizable Area End
