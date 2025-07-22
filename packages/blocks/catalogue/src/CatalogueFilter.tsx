import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  VirtualizedList,
  ListRenderItem,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import i18n from "../../../components/src/i18n/i18n.config";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomRadioButton from "../../../components/src/CustomRadioButton";
import Scale from "../../../components/src/Scale";
import { MultiSelect } from "react-native-element-dropdown";
import CheckBox from "@react-native-community/checkbox";
import {
  ColorAttributes,
  FilterType,
  SizeAttributes,
  SortByAttributes,
  StoreAttributes,
} from "./response";
const { width } = Dimensions.get("window");
import { close, down } from "./assets";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import CatalogueFilterController, { Props } from "./CatalogueFilterController";

export default class CatalogueFilter extends CatalogueFilterController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderFilterList: ListRenderItem<[FilterType, string]> = ({ item }) => (
    <Pressable
      style={[
        styles.filterItemWrapper,
        item[0] === this.state.selectedFilter ? styles.selected : {},
        { flexDirection: FlexConditionManage(i18n.language) },
      ]}
      onPress={() => this.selectFilter(item[0])}
      testID={`${item[0]}-button`}
    >
      <Text
        style={
          [item[0] === this.state.selectedFilter
            ? styles.filterItemTextSelected
            : styles.filterItemText,
          {
            textAlign: TextAlignManage(i18n.language)
          }]
        }
      >
        {item[1]}
      </Text>
    </Pressable>
  );

  renderSize: ListRenderItem<SizeAttributes> = ({ item, index }) => (
    <View style={[styles.radio, {flexDirection : FlexConditionManage(i18n.language)}]}>
      <CheckBox
        testID={`size-button-${index}`}
        value={item.selected}
        onValueChange={() => this.toggleSize(index)}
        boxType="square"
        tintColor="#FFFFFF"
        onCheckColor="#FFFFFF"
        onFillColor="#CCBEB1"
        onTintColor="#FFFFFF"
        animationDuration={0}
        tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
        style={styles.checkBox}
      />
      <Text style={styles.size}>{item.name}</Text>
    </View>
  );

  renderColor: ListRenderItem<ColorAttributes> = ({ item, index }) => (
    <View style={[styles.radio, { flexDirection : FlexConditionManage(i18n.language)}]}>
      <CheckBox
        testID={`color-button-${index}`}
        value={item.selected}
        onValueChange={() => this.toggleColor(index)}
        boxType="square"
        tintColor="#FFFFFF"
        onCheckColor="#FFFFFF"
        onFillColor="#CCBEB1"
        onTintColor="#FFFFFF"
        animationDuration={0}
        tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
        style={styles.checkBox}
      />
      <Text style={styles.size}>{item.name}</Text>
    </View>
  );

  renderSort: ListRenderItem<SortByAttributes> = ({ item, index }) => (
    <View style={[styles.radio, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <CustomRadioButton
        selected={item.selected}
        size={24}
        onSelect={() => this.toggleSort(index)}
        testID={`sort-button-${index}`}
      />
      <Text style={styles.sortBy}>{item.name}</Text>
    </View>
  );

  renderStore: ListRenderItem<StoreAttributes> = ({ item, index }) => (
    <View style={[styles.radio, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <CheckBox
        testID={`store-button-${index}`}
        value={item.selected}
        onValueChange={() => this.toggleStore(index)}
        boxType="square"
        tintColor="#FFFFFF"
        onCheckColor="#FFFFFF"
        onFillColor="#CCBEB1"
        onTintColor="#FFFFFF"
        animationDuration={0}
        tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
        style={styles.checkBox}
      />
      <Text style={styles.size}>{item.store_name}</Text>
    </View>
  );

  renderDropDown = (
    data: { label: string; value: string }[],
    placeholder: string,
    testIDGet:string,
    selected: string[] | null,
    dropDownpUpdatedValue: (item: string[]) => void,
    handleRemoveItem: (item: string) => void,
    fetchData?: () => void
  ) => {
    const renderSelectedItem = (item: { label: string; value: string }) => {
      return (
        <View style={[styles.selectedItemContainer, { flexDirection : FlexConditionManage(i18n.language)}]}>
          <Text style={styles.selectedItemText}>{item.label}</Text>
          <TouchableOpacity testID={`remove-item-${item.label}`} onPress={() => handleRemoveItem(item.value)}>
            <Image style={styles.closeIcon} source={close} />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View>
        <MultiSelect
          testID={`${testIDGet}-dropdown`}
          itemTestIDField="label"
          style={[styles.dropdown]}
          placeholderStyle={[styles.placeholderStyle,{ textAlign: TextAlignManage(i18n.language) }]}
          selectedTextStyle={[styles.selectedTextStyle, { textAlign: TextAlignManage(i18n.language) }]}
          data={data}
          renderRightIcon={ ()=> <Image style={styles.closeIcon} source={down} />}
          itemTextStyle={[styles.selectedTextStyle, { textAlign: TextAlignManage(i18n.language) }]}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          iconStyle={[styles.iconStyle]}
          iconColor="#375280"
          value={selected}
          onChange={(item) => dropDownpUpdatedValue(item)}
          onFocus={fetchData}
          visibleSelectedItem={false}
        />
        <View style={[styles.selectedItemsContainer, {flexDirection : FlexConditionManage(i18n.language)}]}>
          {selected &&
            selected.map((value) => {
              const selectedItem = data.find((item) => item.value === value);
              return selectedItem ? renderSelectedItem(selectedItem) : null;
            })}
        </View>
      </View>
    );
  };

  renderCategoryBlock = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, {textAlign : TextAlignManage(i18n.language)}]}>{i18n.t("category")}</Text>

        {this.renderDropDown(
          this.state.categories,
          i18n.t("category"),
          "Category",
          this.state.category,
          this.handleCategorySelect,
          this.handleCategoryRemoveItem,
          this.getCategoriesList
        )}
      </View>
    );
  };

  renderSubCategoryBlock = () => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.nameText, {textAlign : TextAlignManage(i18n.language)}]}>{i18n.t("subCategory")}</Text>

        {this.renderDropDown(
          this.state.subCategories,
          i18n.t("subCategory"),
          "Sub-Category",
          this.state.subCategory,
          this.handleSubCategorySelect,
          this.handleSubCategoryRemoveItem,
          this.getSubCategoriesList
        )}
      </View>
    );
  };

  renderFilterView = ({ filter }: { filter: FilterType }) => {
    if (filter === "price") {
      return (
        <View style={{ flex: 1 }} testID="price-block">
          <View style={[styles.inputWrapper, {flexDirection: FlexConditionManage(i18n.language)}]}>
            <TextInput
              value={this.state.minPrice}
              onChangeText={this.updateMinPrice}
              testID="minPriceInput"
              style={[styles.input, { textAlign : TextAlignManage(i18n.language) }]}
              placeholder={i18n.t("minPrice")}
              placeholderTextColor={"#94A3B8"}
            />
          </View>
          <View style={[styles.inputWrapper, {flexDirection: FlexConditionManage(i18n.language)}]}>
            <TextInput
              value={this.state.maxPrice}
              onChangeText={this.updateMaxPrice}
              testID="maxPriceInput"
              style={[styles.input, { textAlign : TextAlignManage(i18n.language) }]}
              placeholder={i18n.t("maxPrice")}
              placeholderTextColor={"#94A3B8"}
            />
          </View>
        </View>
      );
    } else if (filter === "size") {
      return (
        <View testID="size-block">
          <VirtualizedList
            data={this.state.sizes}
            keyExtractor={(item) => `size-${item.id}`}
            renderItem={this.renderSize}
            getItem={this.getSize}
            getItemCount={this.sizesCount}
            scrollEnabled={false}
            bounces={false}
          />
        </View>
      );
    } else if (filter === "color") {
      return (
        <View testID="color-block">
          <VirtualizedList
            data={this.state.colors}
            keyExtractor={(item) => `colors-${item.id}`}
            getItem={this.getColor}
            getItemCount={this.colorsCount}
            renderItem={this.renderColor}
            scrollEnabled={false}
            bounces={false}
          />
        </View>
      );
    } else if (filter === "sort") {
      return (
        <View testID="sortBy-block">
          <VirtualizedList
            data={this.state.sortBy}
            keyExtractor={(item) => `sortBy-${item.id}`}
            renderItem={this.renderSort}
            getItem={this.getSortBy}
            getItemCount={this.sortBYCount}
            scrollEnabled={false}
            bounces={false}
          />
        </View>
      );
    } else if (filter === "category") {
      return (
        <View>
          <View testID="category-block">{this.renderCategoryBlock()}</View>
          {this.state.category.length > 0 ? (
            <View testID="subCategory-block">
              {this.renderSubCategoryBlock()}
            </View>
          ) : null}
        </View>
      );
    } else if (filter === "stores") {
      return (
        <View testID="store-block">
          <VirtualizedList
            data={this.state.stores}
            keyExtractor={(item) => `stores-${item.id}`}
            renderItem={this.renderStore}
            getItem={this.getStore}
            getItemCount={this.storesCount}
            scrollEnabled={true}
            bounces={false}
          />
        </View>
      );
    }

    return <View />;
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="catalogueFilter">
        <CustomHeader
          title={i18n.t("filters")}
          onLeftPress={this.goBack}
          right={
            <View>
              <Text style={styles.filterClearText}>{i18n.t("clearAll")}</Text>
            </View>
          }
          onRightPress={this.clearAllFilter}
          rightTestId="clearAll"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.main, { flexDirection: FlexConditionManage(i18n.language)}]}>
            <View testID="filter-main">
              <VirtualizedList
                data={this.filters}
                keyExtractor={(item) => `${item}-filter`}
                renderItem={this.renderFilterList}
                getItemCount={this.filtersLength}
                getItem={this.getFilter}
                contentContainerStyle={styles.filtersList}
                scrollEnabled={false}
                bounces={false}
              />
            </View>
            <this.renderFilterView filter={this.state.selectedFilter} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.btnRow}>
          <CustomButton
            testID="cancel"
            title={i18n.t("cancelText")}
            style={styles.cancelBtn}
            textStyle={styles.rejText}
            onPress={this.goBack}
          />
          <CustomButton
            testID="apply"
            title={i18n.t("apply")}
            style={styles.filterApplyButton}
            onPress={this.applyFilter}
          />
        </View>
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
  filterClearText: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "#375280",
    marginRight: Scale(4),
    fontSize: 16,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderTopColor: "#F1F5F9",
    borderTopWidth: Scale(1),
  },
  filtersList: {
    width: width * 0.35,
    borderRightColor: "#F1F5F9",
    borderRightWidth: Scale(1),
  },
  filterItemWrapper: {
    paddingVertical: Scale(16),
    paddingHorizontal: Scale(24),
    borderColor: "#F1F5F9",
    borderWidth: Scale(1),
    borderRadius: Scale(1),
  },
  filterItemText: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
  },
  filterItemTextSelected: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 16,
    color: "#FFFFFF",
  },
  selected: {
    backgroundColor: "#CCBEB1",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CBD5E1",
    borderRadius: Scale(4),
    paddingHorizontal: Scale(10),
    marginVertical: Scale(12),
    marginHorizontal: Scale(18),
  },
  input: {
    height: Scale(48),
    color: "#375280",
    flex: 1,
  },
  para: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    marginLeft: Scale(8),
  },
  gender: {
    paddingVertical: Scale(12),
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Scale(8),
    paddingHorizontal: Scale(24),
  },
  size: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    marginHorizontal: Scale(8),
    textTransform: "uppercase",
  },
  sortBy: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    marginHorizontal: Scale(8),
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Scale(15),
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    backgroundColor: "#FFFFFF",
  },
  cancelBtn: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    color: "#375280",
    fontWeight: "500",
  },
  filterApplyButton: {
    flex: 1,
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    marginHorizontal: Scale(5),
  },
  rejText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    marginRight: Scale(4),
  },
  dropdown: {
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
    width: width * 0.6,
    borderRadius: 4,
  },
  placeholderStyle: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#375280",
    paddingRight: 10,
  },
  iconStyle: {
    width: 35,
    height: 35,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  fieldContainer: {
    paddingTop: 16,
    marginHorizontal: Scale(16),
  },
  nameText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 6,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    margin: 2,
    borderWidth: 1,
    borderColor: "#CCBEB1",
  },
  selectedItemText: {
    color: "#375280",
    fontWeight: "bold",
  },
  selectedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    width: width * 0.6,
  },
  closeIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginLeft: 10,
  },
  checkBox: {
    borderWidth: Scale(2),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    ...Platform.select({
      ios: {
        height: Scale(24),
        width: Scale(24),
      },
    }),
  },
});
