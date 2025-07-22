import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  Dimensions,
  Pressable,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import Productdescription3Controller from "./Productdescription3Controller";

import CustomLoader from "../../../components/src/CustomLoader";
import CustomSwitch from "../../../components/src/CustomSwitch";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import globalStyle from "../../../components/src/GlobalStyle";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import { editIcon,backIcon,rightArroww } from "./assets";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
const { width: windowWidth } = Dimensions.get("window");
// Customizable Area End

import MyStoreDetailsController, { Props } from "./MyStoreDetailsController";

export default class MyStoreDetailsScreen extends MyStoreDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  open = () => (
    <View style={[globalStyle.status, globalStyle.open]}>
      <Text style={[globalStyle.statusText, globalStyle.open]}>{i18n.t('openText')}</Text>
    </View>
  );

  close = () => (
    <View style={[globalStyle.status, globalStyle.close]}>
      <Text style={[globalStyle.statusText, globalStyle.close]}>{i18n.t('closeText')}</Text>
    </View>
  );

  item = ({
    title,
    onPress,
    testID,
  }: {
    title: string;
    onPress: () => unknown;
    testID: string;
  }) => (
    <Pressable
      onPress={onPress}
      style={[styles.row, styles.justifyBetween, styles.goToItem,{flexDirection:FlexConditionManage(i18n.language)}]}
      testID={testID}
    >
      <Text style={styles.goToText}>{i18n.t(title)}</Text>
      <Image source={rightArroww} style={[styles.arrow, {transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
    </Pressable>
  );

  renderInfo = ({ header, data }: { header: string; data: string }) => (
    <View style={styles.infoItem}>
      <Text style={[styles.infoHeader,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t(header)}</Text>
      <Text style={[styles.infoDesc,{textAlign:TextAlignManage(i18n.language)}]}>{data}</Text>
    </View>
  );
  // Customizable Area End

  render() {
    if (this.state.loading && !("store_name" in this.state.storeInfo)) {
      return (
        <SafeAreaView style={styles.storecontainer} testID="loaderUi">
          <CustomLoader />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.storecontainer} testID="storeDetails">
        <View style={[styles.headerViewMainAssignStoreMY, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchAssignstore}
            onPress={() => { this.props.navigation.goBack() }}
          >
            <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstore, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}></Image>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitleAssignstoreMY}>{i18n.t('storeProfile')}</Text>
          </View>
          <TouchableOpacity style={styles.filterIconTouchMY}>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.main} 
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshData} />
        }
        >
          <View>
            <Image
              source={{
                uri:
                  this.state.storeInfo.image ||
                  "https://i.ibb.co/287QdQZ/image.png",
              }}
              style={styles.profileBannerImg}
            />
            <Pressable
              onPress={this.editStoreDetailRedirection}
              style={[styles.editIconWrapper,{right:ManageDynamicMargin(i18n.language,undefined,Scale(10)),left:ManageDynamicMargin(i18n.language,Scale(10),undefined)}]}
              testID="pencilEdit"
            >
              <Image source={editIcon} style={styles.editIcon} />
            </Pressable>
          </View>
          <Text style={[styles.shopTitle,{textAlign:TextAlignManage(i18n.language)}]}>
            {this.state.storeInfo.store_name}
          </Text>
          <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
            {this.state.storeInfo.is_open ? this.open() : this.close()}
            <View style={{ margin: Scale(12) }}>
              <CustomSwitch
                size={16}
                value={this.state.storeInfo.is_open}
                onValueChange={() => {
                  this.toggleStoreStatus(
                    this.state.storeId,
                    this.state.storeInfo.is_open
                  );
                }}
                testID="toggleOpenStatus"
              />
            </View>
          </View>
          {this.item({
            title: "viewCatasBuyer",
            onPress: this.goToCategoriesScreen,
            testID: "viewCatalogueAsBuyer",
          })}
          <View style={styles.goToItemSeparator} />
          {this.item({
            testID: "analyticsAndInsights",
            title: "analyticsInsightsText",
            onPress: this.yetToBeDeveloped,
          })}
          <View style={styles.goToItemSeparator} />
          {this.item({
            title: "revenue",
            testID: "revenue",
            onPress: this.yetToBeDeveloped,
          })}
          <View style={styles.goToItemSeparator} />
          {this.item({
            title: "inventoryMangement",
            onPress: this.goToInventoryManagementScreen,
            testID: "inventoryManagement",
          })}
          <View style={styles.goToItemSeparator} />
          {this.item({
            testID: "offersAndDiscounts",
            title: "offersAndDiscounts",
            onPress: this.goToOffersAndDiscounts,
          })}
          <View style={styles.goToItemSeparator} />
          {this.renderInfo({
            header: "storeDescription",
            data: this.state.storeInfo.description ?? i18n.t('noDescriptionPro'),
          })}
          {this.renderInfo({
            header: "address",
            data: Productdescription3Controller.getStoreAddress(
              this.state.storeInfo
            ),
          })}
          {this.renderInfo({
            header: "contactNumber",
            data: [
              this.state.storeInfo.contact_number?.country_code,
              this.state.storeInfo.contact_number?.phone_number,
            ].join(" "),
          })}
          {this.renderInfo({
            header: "emailText",
            data: this.state.storeInfo.email,
          })}
          {this.renderInfo({
            header: "instructionDriver",
            data: this.state.storeInfo.driver_instruction,
          })}
          {this.renderInfo({
            header: "storeHours",
            data: this.parseStoreTime(
              this.state.storeInfo.store_operating_hours
            ),
          })}
          <View style={[styles.row, styles.btns,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <CustomButton
              title={i18n.t('manageTimings')}
              style={styles.secButton}
              textStyle={styles.secTxt}
              onPress={this.manageTimingRedirection}
              testID="manageTiming"
            />
            <CustomButton
              title={i18n.t('editDetails')}
              style={styles.priButton}
              textStyle={styles.priTxt}
              onPress={this.editStoreDetailRedirection}
              testID="editDetails"
            />
          </View>
        </ScrollView>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  storecontainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  main: {
    flex: 1,
    paddingHorizontal: Scale(20),
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
  },
  profileBannerImg: {
    resizeMode: "cover",
    width: windowWidth - Scale(40),
    height: (windowWidth - Scale(40)) / (95 / 42),
    aspectRatio: 95 / 42,
    borderRadius: Scale(4),
  },
  editIconWrapper: {
    position: "absolute",
    top: Scale(10),
    right: Scale(10),
  },
  editIcon: {
    height: Scale(44),
    width: Scale(44),
  },
  shopTitle: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginTop: Scale(12),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  goToItem: {
    paddingVertical: Scale(14),
  },
  goToItemSeparator: {
    flex: 1,
    height: Scale(1),
    backgroundColor: "#EEEEEE",
  },
  goToText: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
  },
  arrow: {
    height: Scale(24),
    width: Scale(24),
    resizeMode: "contain",
  },
  infoItem: {
    marginTop: Scale(12),
    marginBottom: Scale(12),
  },
  infoHeader: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
  },
  infoDesc: {
    marginTop: Scale(4),
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: 17,
    color: "#375280",
    lineHeight: 26,
  },
  btns: {
    paddingVertical: Scale(20),
  },
  secButton: {
    flex: 1,
    marginRight: Scale(10),
    borderRadius: Scale(2),
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CCBEB1",
  },
  secTxt: {
    color: "#375280",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
  priButton: {
    flex: 1,
    borderRadius: Scale(2),
  },
  priTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Lato",
  },
  backTouchAssignstore: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
  },
  filterIconTouchMY: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
  },
  headerViewMainAssignStoreMY: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal:15
  },
  backIconCssAssignstore: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  headerTitleAssignstoreMY: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
  }
});
// Customizable Area End
