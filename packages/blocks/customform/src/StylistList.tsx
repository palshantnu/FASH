import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  View,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
import CustomSearch from "../../../components/src/CustomSearch";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import i18n from '../../../components/src/i18n/i18n.config';
import CustomHeader from "../../../components/src/CustomHeader";
import Scale from "../../../components/src/Scale";
import { heartEmpty, heartFilled } from "./assets";

import { deviceWidth } from "../../../framework/src/Utilities";

import { Stylist } from "../__tests__/__mocks__/types";
// Customizable Area End

import StylistListController, {
  Props,
  configJSON,
} from "./StylistListController";

export default class StylistList extends StylistListController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderItem = ({ item }: ListRenderItemInfo<Stylist>) => (
    <View style={[styles.card,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <TouchableOpacity testID="StylistProducts" onPress={() => {this.goToStylistPortfolio(item.id)}}>
      {item.attributes.profile_picture ? (
        <Image
          source={{ uri: item.attributes.profile_picture }}
          style={styles.img}
        />
      ) : (
        <View style={[styles.img, styles.avatar]}>
          <Text style={styles.avatarText}>{item.attributes.full_name[0]}</Text>
        </View>
      )}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.stylistInfo,{marginRight:ManageDynamicMargin(i18n.language,Scale(4),undefined)}]} testID="StylistProductsName" onPress={() => {this.goToStylistPortfolio(item.id)}}>
        <Text style={[styles.name,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.full_name}</Text>
        <Text numberOfLines={1} style={[styles.bio,{textAlign:TextAlignManage(i18n.language)}]}>
          {item.attributes.bio || ""}
        </Text>
      </TouchableOpacity>
      <Pressable
        testID="favouriteButton"
        onPress={() => this.toggleFavourite(item.id)}
      >
        <Image
          source={this.state.favouriteList[item.id] ? heartFilled : heartEmpty}
          style={styles.icon}
          testID={this.state.favouriteList[item.id] ? "heart" : "hearto"}
        />
      </Pressable>
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="stylisteditprofile">
        <CustomHeader
          title={i18n.t('stylistsText')}
          onLeftPress={this.goBack}
          leftTestId="goBackIcon"
        />
        <CustomSearch
          testID="search"
          placeholder={i18n.t('searchStylistText')}
          value={this.state.search}
          onChangeText={this.onSearchKeyChange}
          returnKeyType="search"
          returnKeyLabel="Search"
          onSubmitEditing={this.searchStylist}
          containerStyle={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FlatList
          testID="fl"
          data={this.state.stylists}
          keyExtractor={(item) => `stylist-${item.id}`}
          renderItem={this.renderItem}
          initialNumToRender={20}
          contentContainerStyle={styles.fl}
          onEndReached={this.loadMore}
          ListEmptyComponent={
            this.state.loading ? null : (
              <View style={styles.emptyContainer} testID="empty">
                <Text style={styles.emptyList}>{this.state.emptyMessage}</Text>
              </View>
            )
          }
        />
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    height: Scale(50),
    alignItems: "center",
    marginBottom: Scale(20),
  },
  img: {
    height: Scale(52),
    width: Scale(52),
    marginRight: Scale(16),
    borderRadius: Scale(52),
  },
  fl: {
    flexGrow: 1,
    paddingHorizontal: Scale(20),
    // paddingTop: Scale(20),
  },
  name: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: Scale(16),
    marginTop: Scale(5),
    marginBottom: Scale(4),
  },
  bio: {
    color: "#94A3B8",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: Scale(14),
    marginBottom: Scale(9),
  },
  stylistInfo: {
    flex: 1,
  },
  icon: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    margin: Scale(6),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyList: {
    fontSize: deviceWidth * 0.05,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
    margin: Scale(20),
  },
  search: {
    marginTop: Scale(12),
    marginHorizontal: Scale(20),
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(204, 190, 177, 0.2)",
  },
  avatarText: {
    fontSize: Scale(24),
    fontFamily: "Avenir-Heavy",
    color: "#CCBEB1",
    textTransform: "capitalize",
  },
});
// Customizable Area End
