import React from "react";

// Customizable Area Start
import {
  Dimensions,
  FlatList,
  View,
  Image,
  ImageBackground,
  Text,
  ListRenderItem,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

import { CardData } from "./responses";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

// Merge Engine - import assets - Start
import { cardArabic, cardBg, deleteIcon, mastercard } from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const { width, height } = Dimensions.get("window");
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlatlistArabicManage from "../../../components/src/FlatlistArabicManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

import SavedcardsController, {
  Props,
  configJSON,
} from "./SavedcardsController";

export default class Savedcards extends SavedcardsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderCard: ListRenderItem<CardData> = ({ item, }) => (
    <ImageBackground source={i18n.language === 'ar' ? cardArabic : cardBg} style={styles.cardBg} testID="card">
      <View style={[styles.row, styles.sb, { flexDirection : FlexConditionManage(i18n.language)}]}>
        <Image source={mastercard} style={styles.cardBrand} />
        <Pressable
          style={styles.deleteWrap}
          android_ripple={{ color: "#DDDDDD", radius: 20 }}
          testID={`delete-${item.id}`}
          onPress={() => this.askDeleteConfirmation(item.id)}
        >
          <Image source={deleteIcon} style={styles.delete} />
        </Pressable>
      </View>
      <Text style={[styles.ccn, { textAlign: TextAlignManage(i18n.language) }]}>{"**** **** ****"}</Text>
      <Text style={[styles.ccn, { textAlign: TextAlignManage(i18n.language) }]}>{item.last_four}</Text>
      <Text style={[styles.ccHolder, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("cardHolder")}</Text>
      <Text style={[styles.ccHolderName, { textAlign: TextAlignManage(i18n.language) }]}>{item.name}</Text>
    </ImageBackground>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container} testID="savedCards">
        <CustomHeader
          title={i18n.t("savedCards")}
          leftTestId="goBack"
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <View style={[styles.container, styles.sb]}>
          <View>
            <View style={styles.head}>
              <Text style={[styles.headTxt, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("savedCards")}</Text>
            </View>
            <FlatList
              ref={this.cardsRef}
              testID="cardsFl"
              data={this.state.cards}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              bounces={false}
              showsHorizontalScrollIndicator={false}
              style={styles.fl}
              inverted={FlatlistArabicManage(i18n.language)}
              contentContainerStyle={[styles.flContianer]}
              renderItem={this.renderCard}
              viewabilityConfig={this.viewabilityConfig}
              onViewableItemsChanged={this.onViewableItemsChanged}
              ListEmptyComponent={
                this.state.loading ? null : (
                  <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                      {i18n.t("noCardsAdded")}
                    </Text>
                  </View>
                )
              }
            />
            {this.state.cards?.length > 1 ? (
              <View testID="swiperDots" style={[styles.row, styles.swiperDots, { flexDirection : FlexConditionManage(i18n.language)}]}>
                {this.state.cards.map((item, index) => (
                  <View
                    testID="dots"
                    key={item.id + "-dot"}
                    style={
                      index === this.state.cardIndex
                        ? styles.activeDot
                        : styles.inactiveDot
                    }
                  />
                ))}
              </View>
            ) : null}
          </View>
          <CustomButton
            title={i18n.t("addNewCard")}
            onPress={this.addCard}
            testID="newCardButton"
            style={styles.btn}
          />
        </View>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  head: {
    marginVertical: Scale(12),
    marginHorizontal: Scale(20),
  },
  headTxt: {
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 26,
    color: "#375280",
  },
  cardBg: {
    height: Scale(186),
    width: Scale(348),
    paddingVertical: Scale(16),
    paddingHorizontal: Scale(20),
    borderRadius: Scale(2),
  },
  cardBrand: {
    height: Scale(40),
    width: Scale(40),
    resizeMode: "contain",
  },
  deleteWrap: {
    height: Scale(40),
    width: Scale(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Scale(40),
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  delete: {
    height: Scale(24),
    width: Scale(24),
  },
  ccn: {
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 32,
    color: "#FFFFFF",
  },
  ccHolder: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: "#FFFFFF",
  },
  ccHolderName: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  fl: {
    marginTop: Scale(8),
    marginHorizontal: (width - Scale(348)) / 2,
  },
  flContianer: {
    flexGrow: 1,
  },
  swiperDots: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  inactiveDot: {
    height: Scale(8),
    width: Scale(8),
    borderRadius: Scale(4),
    overflow: "hidden",
    marginHorizontal: Scale(4),
    backgroundColor: "#CBD5E1",
  },
  activeDot: {
    height: Scale(12),
    width: Scale(12),
    borderRadius: Scale(6),
    overflow: "hidden",
    marginHorizontal: Scale(4),
    backgroundColor: "#375280",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 2 - Scale(140),
  },
  emptyText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
    color: "#375280",
  },
  btn: {
    margin: Scale(20),
  },
});
// Customizable Area End
