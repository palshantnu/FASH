import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import Scale from "../../../components/src/Scale";
const windowWidth = Dimensions.get("window").width;
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
// Customizable Area End

import StylistProfileController, { Props } from "./StylistProfileController";
import { backIcon, msgs, rightArrow } from "./assets";
import FastImage from "react-native-fast-image";

export default class StylistProfile extends StylistProfileController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  Item = ({ title }: any) => (
    <View style={styles.item}>
      <Text style={styles.listTitle}>{title}</Text>
      <Image
        resizeMode="contain"
        style={styles.arrowIcon}
        source={rightArrow}
      />
    </View>
  );
  stylistItem = ({ item }: any) => (
    <TouchableOpacity
      testID="btnRedirectStylistProfile"
      style={styles.stylishImgStyle}
      onPress={() => {
        this.btnRedirectStylist({ item: item });
      }}
    >
      <FastImage
        resizeMode="cover"
        style={styles.stylishImgStyle}
        source={{ uri: item.url }}
      />
    </TouchableOpacity>
  );
  ListEmptyComponent = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        alignSelf: "center",
      }}
    >
      <Text style={styles.portfolioTxt}>{i18n.t("noPortfolioFound")}</Text>
    </View>
  );
  getAllImages = () => {
    const { portfolioList } = this.state;
    if (!Array.isArray(portfolioList)) {
      return [];
    }

    return portfolioList
      .flatMap(
        (portfolio) =>
          portfolio.attributes?.images?.filter(
            (image: { url: string }) => !image.url.endsWith(".mp4")
          ) || []
      )
      .slice(0, 9);
  };

  renderListItem = ({ item }: any) => {
    const imageUrl = item.attributes?.profile_picture;
    return (
      <TouchableOpacity
        style={{
          flexDirection: FlexConditionManage(i18n.language),
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginVertical: 4,
        }}
        testID={`stylistCard`}
        onPress={() => this.goToStylistProfile(item.id)}
      >
        <View
          style={[
            styles.headerDetailContainer,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <FastImage
            resizeMode="cover"
            style={styles.tinyLogo}
            source={ImageNotFound(imageUrl)}
          />
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.nametitle}>{item?.attributes?.full_name}</Text>
            <Text style={styles.positionTitle}>{i18n.t("hired")}</Text>
          </View>
        </View>
        <TouchableOpacity
          testID="chatId"
          activeOpacity={0.7}
          onPress={() => {
            this.navigateFromHiredStylish(item.id);
          }}
        >
          <Image resizeMode="contain" style={styles.chatIcon} source={msgs} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  renderEmptyComponent = () => (
    <View
      style={{
        height: "100%",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#94A3B8",
          fontSize: 16,
          textAlign: "center",
          marginTop: Scale(15),
          fontFamily: "Lato-Bold",
        }}
      >
        {i18n.t("noStylistHired")}
      </Text>
    </View>
  );

  renderEmptyPortfolio = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "#94A3B8",
            fontSize: 16,
            fontFamily: "Lato-Bold",
          }}
        >
          {i18n.t("noPortfolioFound")}
        </Text>
      </View>
    );
  };

  // Customizable Area End
  render() {
    // Customizable Area Start
    const images = this.getAllImages();
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={false}
          hidden={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={[
            styles.headerViewMainCatalogue,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <TouchableOpacity
            style={styles.backTouchCatalogue}
            testID="btnBack"
            onPress={this.goBacktolanding}
          >
            <Image
              source={backIcon}
              resizeMode="contain"
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
            <Text style={styles.headerTitleCatalogue}>{i18n.t("stylist")}</Text>
          </View>
          <TouchableOpacity
            testID="clearId"
            style={{ justifyContent: "center" }}
          />
        </View>
        <Text
          style={[styles.title, { textAlign: TextAlignManage(i18n.language) }]}
        >
          {i18n.t("hiredStylist")}
        </Text>
        <ScrollView
          style={{ height: this.state.stylistList?.length > 0 ? "50%" : "15%" }}
        >
          <FlatList
            testID="profileList"
            showsVerticalScrollIndicator
            data={this.state.stylistList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderListItem}
            ListEmptyComponent={this.renderEmptyComponent}
          />
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={this.navigateProductSourcing}
            style={[
              styles.item,
              {
                paddingHorizontal: 15,
                flexDirection: FlexConditionManage(i18n.language),
              },
            ]}
            activeOpacity={0.7}
            testID="ProductId"
          >
            <Text style={styles.listTitle}>
              {i18n.t("productSourcingText")}
            </Text>
            <Image
              resizeMode="contain"
              style={[
                styles.arrowIcon,
                {
                  transform: [
                    { scaleX: ImageReverseManage(i18n.language) },
                    { scaleY: ImageReverseManage(i18n.language) },
                  ],
                },
              ]}
              source={rightArrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.item,
              {
                paddingHorizontal: 15,
                flexDirection: FlexConditionManage(i18n.language),
              },
            ]}
            onPress={this.goToStylist}
            testID="stylistId"
          >
            <Text style={styles.listTitle}>{i18n.t("stylists")}</Text>
            <Image
              resizeMode="contain"
              style={[
                styles.arrowIcon,
                {
                  transform: [
                    { scaleX: ImageReverseManage(i18n.language) },
                    { scaleY: ImageReverseManage(i18n.language) },
                  ],
                },
              ]}
              source={rightArrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.navigateToMyRequest()}
            style={[
              styles.item,
              {
                paddingHorizontal: 15,
                flexDirection: FlexConditionManage(i18n.language),
              },
            ]}
          >
            <Text style={styles.listTitle}>{i18n.t("requestStylists")}</Text>
            <Image
              resizeMode="contain"
              style={[
                styles.arrowIcon,
                {
                  transform: [
                    { scaleX: ImageReverseManage(i18n.language) },
                    { scaleY: ImageReverseManage(i18n.language) },
                  ],
                },
              ]}
              source={rightArrow}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.exportItemContainer,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <Text style={styles.listTitle}>{i18n.t("explorePortfolios")}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            testID="SeeAll"
            onPress={this.handlePortfolio}
          >
            <Text style={styles.listTitle}>{i18n.t("sellAll")}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <FlatList
            testID="portfolioListId"
            numColumns={3}
            style={styles.stylistImgflatlist}
            data={images}
            renderItem={this.stylistItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.ListEmptyComponent}
          />
        </ScrollView>
      </View>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  safeContainer: {
    backgroundColor: "#ffffff",
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  headerViewMainCatalogue: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    fontSize: (windowWidth * 5) / 100,
    color: "#375280",
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },
  title: {
    color: "#375280",
    fontSize: Scale(18),
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontFamily: "Lato-Bold",
  },
  portfolioTxt: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Lato-Bold",
  },
  nametitle: {
    color: "#375280",
    fontSize: Scale(20),
    textTransform: "capitalize",
    textAlign: "center",
    fontFamily: "Lato-Bold",
  },
  positionTitle: {
    color: "green",
    fontSize: Scale(16),
    paddingVertical: 5,
    fontFamily: "Lato-Bold",
  },
  headerDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tinyLogo: {
    width: Scale(70),
    height: Scale(70),
    marginHorizontal: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#375280",
  },
  arrowIcon: {
    width: Scale(8.6),
    height: Scale(17.3),
  },
  chatIcon: {
    width: Scale(28.75),
    height: Scale(28.75),
  },
  flatlist: {
    marginTop: "10%",
  },
  stylistImgflatlist: {
    marginTop: "5%",
  },
  item: {
    marginVertical: 5,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  exportItemContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  listTitle: {
    fontSize: Scale(18),
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  stylishImgStyle: {
    width: Scale(136),
    height: Scale(136),
    margin: 0.8,
    borderRadius: 2,
  },
  circle: {
    width: Scale(80),
    height: Scale(80),
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
});
