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
    ScrollView
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";
import { MultiSelect } from "react-native-element-dropdown";
import CheckBox from "@react-native-community/checkbox";
const { width } = Dimensions.get("window");
import { close, down } from "./assets";
// Customizable Area End

import InventoryFilterController, { ColorAttributes, Props } from "./InventoryFilterController";

export default class InventoryFilter extends InventoryFilterController {
    constructor(props: Props) {
        super(props);
    }

    // Customizable Area Start
    renderFilterList: ListRenderItem<[string, string]> = ({ item }) => (
        <Pressable
            style={[
                styles.filterItemWrapper,
                item[0] === this.state.selectedFilter ? styles.selected : {},
            ]}
            onPress={() => this.selectFilter(item[0])}
            testID={`${item[0]}-button`}
        >
            <Text
                style={
                    item[0] === this.state.selectedFilter
                        ? styles.filterItemTextSelected
                        : styles.filterItemText
                }
            >
                {item[1]}
            </Text>
        </Pressable>
    );

    renderColor: ListRenderItem<ColorAttributes> = ({ item, index }) => (
        <View style={styles.radio}>
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
            <Text style={item.selected ? styles.sizeSelected : styles.size}>{item.name}</Text>
        </View>
    );

    renderDropDown = (
        data: { label: string; value: string }[],
        placeholder: string,
        selected: string[] | null,
        dropDownpUpdatedValue: (item: string[]) => void,
        handleRemoveItem: (item: string) => void,
        fetchData?: () => void
    ) => {
        const renderSelectedItem = (item: { label: string; value: string }) => {
            return (
                <View style={styles.selectedItemContainer}>
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
                    testID={`${placeholder}-dropdown`}
                    itemTestIDField="label"
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    renderRightIcon={() => <Image style={styles.closeIcon} source={down} />}
                    itemTextStyle={styles.selectedTextStyle}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    iconStyle={styles.iconStyle}
                    iconColor="#375280"
                    value={selected}
                    onChange={(item) => dropDownpUpdatedValue(item)}
                    onFocus={fetchData}
                    visibleSelectedItem={false}
                />
                <View style={styles.selectedItemsContainer}>
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
                <Text style={styles.nameText}>Category</Text>

                {this.renderDropDown(
                    this.state.categories,
                    "Select Category",
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
                <Text style={styles.nameText}>Sub Category</Text>

                {this.renderDropDown(
                    this.state.subCategories,
                    "Select Sub-Category",
                    this.state.subCategory,
                    this.handleSubCategorySelect,
                    this.handleSubCategoryRemoveItem,
                    this.getSubCategoriesList
                )}
            </View>
        );
    };

    renderSubSubCategoryBlock = () => {
        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.nameText}>Sub Sub Category</Text>

                {this.renderDropDown(
                    this.state.subSubCategories,
                    "Select Sub-Sub-Category",
                    this.state.subSubCategory,
                    this.handleSubSubCategorySelect,
                    this.handleSubSubCategoryRemoveItem,
                    this.getSubSubCategoriesList
                )}
            </View>
        );
    };

    renderFilterView = ({ filter }: { filter: string }) => {
        if (filter === "price") {
            return (
                <View style={{ flex: 1, marginTop: 10, marginLeft: 10, paddingHorizontal: 20 }} testID="price-block">
                    <Text style={styles.priceLabel}>Selected price range</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: Scale(12) }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.para}>Minimum price</Text>
                            <TextInput
                                value={`$${this.state.minPrice}`}
                                onChangeText={this.updateMinPrice}
                                testID="minPriceInput"
                                style={styles.input}
                                placeholder="10"
                                placeholderTextColor={"#94A3B8"}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.para}>Maximum price</Text>
                            <TextInput
                                value={`$${this.state.maxPrice}`}
                                onChangeText={this.updateMaxPrice}
                                testID="maxPriceInput"
                                style={styles.input}
                                placeholder="100"
                                placeholderTextColor={"#94A3B8"}
                            />
                        </View>
                    </View>
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
        } else if (filter === "gender") {
            return (
                <ScrollView testID="gender-block">
                    <View testID="category-block">{this.renderCategoryBlock()}</View>
                    {this.state.category.length > 0 ? (
                        <View testID="subCategory-block">
                            {this.renderSubCategoryBlock()}
                        </View>
                    ) : null}
                    {this.state.subCategory.length > 0 ? (
                        <View testID="subSubCategory-block">
                            {this.renderSubSubCategoryBlock()}
                        </View>
                    ) : null}
                </ScrollView>
            );
        }
        return <View />;
    };
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.container} testID="InventoryFilter">
                <CustomHeader
                    title="Filters"
                    onLeftPress={this.goBack}
                    right={
                        <View>
                            <Text style={styles.filterClearText}>Clear all</Text>
                        </View>
                    }
                    onRightPress={this.clearAllFilter}
                    rightTestId="clearAll"
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.main}>
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
                        title="Cancel"
                        style={styles.cancelBtn}
                        textStyle={styles.rejText}
                        onPress={this.goBack}
                    />
                    <CustomButton
                        testID="apply"
                        title="Apply"
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
        fontFamily: "Lato-Regular",
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
        borderColor: "#CBD5E1",
        borderRadius: Scale(4),
        paddingHorizontal: Scale(10),
        marginVertical: Scale(12),
        marginHorizontal: Scale(18),
    },
    input: {
        height: Scale(48),
        width: width * 0.35,
        color: "#375280",
        paddingLeft: Scale(10),
    },
    para: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 22,
        color: "#375280",
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
    priceLabel: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        lineHeight: 24,
    },
    size: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        marginLeft: Scale(8),
    },
    sizeSelected: {
        fontFamily: "Lato-Bold",
        fontSize: 16,
        color: "#375280",
        marginLeft: Scale(8),
    },
    sortBy: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: 16,
        color: "#375280",
        marginLeft: Scale(8),
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
        marginLeft: Scale(16),
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
