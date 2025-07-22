import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Pressable,
  Image,
  ListRenderItem,
} from "react-native";

import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import CustomSwitch from "../../../components/src/CustomSwitch";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage'
import CustomSearch from "../../../components/src/CustomSearch";
import globalStyle from "../../../components/src/GlobalStyle";
import { ResponseStore } from "./responseStore";
import { plus, searchIcon } from "./assets";

const windowWidth = Dimensions.get("window").width;
// Customizable Area End

import MyStoresListController, { Props } from "./MyStoresListController";
import CustomHeader from "../../../components/src/CustomHeader";

export default class MyStoresList extends MyStoresListController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  emptyComponent = () => (
    <View style={styles.empty} testID="empty">
      <Text style={styles.emptyStore}>{i18n.t('noStoreFound')}</Text>
    </View>
  );

  _renderItem: ListRenderItem<ResponseStore | { id: null }> = ({
    item,
    index,
  }) => {
    return item.id ? (
      <View style={styles.flItem}>
        <Pressable
          testID={"store-" + index}
          onPress={() => this.goToStore(item.id)}
        >
          <Image
            source={ImageNotFound(item.attributes.image)}
            style={styles.storeImage}
          />
        </Pressable>
        <Text style={[styles.addStore,{textAlign:TextAlignManage(i18n.language)}]} numberOfLines={1}>
          {item.attributes.store_name}
        </Text>
        <View style={[styles.statusRow,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <View
            style={[
              globalStyle.status,
              item.attributes.is_open ? globalStyle.open : globalStyle.close,
            ]}
          >
            <Text
              style={[
                globalStyle.statusText,
                item.attributes.is_open ? globalStyle.open : globalStyle.close,
              ]}
            >
              {item.attributes.is_open ? i18n.t('openText') : i18n.t('closeText')}
            </Text>
          </View>
          <View>
            <CustomSwitch
              size={16}
              value={item.attributes.is_open}
              onValueChange={() => {
                this.toggleStoreStatus(item.id, item.attributes.is_open);
              }}
              testID="toggleOpenStatus"
            />
          </View>
        </View>
      </View>
    ) : (
      <Pressable
        style={styles.flItem}
        testID="addNewStore"
        onPress={this.addNewStore}
      >
        <View style={styles.addItem}>
          <Image source={plus} style={styles.plusIcon} />
          <Text style={styles.addStore}>{i18n.t('addNewStoreText')}</Text>
        </View>
      </Pressable>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    if (this.state.loading && !this.state.storeArr.length) {
      return (
        <SafeAreaView style={styles.mainContainerStore} testID="loader-ui">
          <CustomLoader />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.mainContainerStore} testID="stores-list">
        {this.state.loading && <CustomLoader />}
        {
          this.state.toInventoryManagement ? 
          <CustomHeader
            title={i18n.t('myStoresText')}
            onLeftPress={() => this.props.navigation.goBack()}
          /> :
          <Text style={styles.headerText}>{i18n.t('myStoresText')}</Text>
        }
        <View style={styles.body}>
          <CustomSearch
            value={this.state.storeSearchTxt}
            onChangeText={this.updateSearchText}
            testID="searchStore"
            placeholder={i18n.t('searchStore')}
            onSubmitEditing={this.searchStore}
          />
        </View>
        <FlatList
          testID="storesFl"
          data={this.state.storeArr}
          keyExtractor={({ id }) => `store-${id}`}
          numColumns={2}
          style={styles.mainContainerStore}
          contentContainerStyle={styles.fl}
          bounces={false}
          ListEmptyComponent={this.emptyComponent}
          renderItem={this._renderItem}
        />
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainerStore: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  body: {
    paddingHorizontal: Scale(20),
  },
  headerText: {
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
    fontSize: windowWidth * 0.05,
    marginVertical: Scale(20),
    color: "#375280",
    textAlign: "center",
  },
  fl: {
    padding: Scale(5),
    flexGrow: 1,
  },
  addItem: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: Scale(220),
  },
  flItem: {
    margin: Scale(10),
    width: (windowWidth - Scale(60)) / 2,
    height: Scale(220),
    justifyContent: "space-between",
  },
  storeImage: {
    width: (windowWidth - Scale(60)) / 2,
    height: (7 / 9) * ((windowWidth - Scale(60)) / 2),
    resizeMode: "cover",
    borderRadius: Scale(2),
  },
  plusIcon: {
    height: Scale(48),
    width: Scale(48),
  },
  addStore: {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 16,
    marginVertical: Scale(10),
    color: "#375280",
  },
  statusRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusImg: {
    width: Scale(64),
    height: Scale(32),
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStore: {
    fontSize: windowWidth * 0.05,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
  none: { display: "none" },
});
