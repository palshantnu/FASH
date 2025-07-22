import React from "react";
import {
  View,
  Image,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import Scale from "./Scale";
import { search } from "./assets";
import i18n from './i18n/i18n.config'
import TextAlignManage from './TextAlignManage'
import FlexConditionManage from './FlexConditionManage'
import ManageDynamicMargin from './ManageDynamicMargin'
export interface CustomSearchProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CustomSearch({
  containerStyle,
  ...props
}: CustomSearchProps) {
  return (
    <View style={[styles.searchBox, containerStyle,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <Image source={search} style={[styles.searchIcon,{marginRight:ManageDynamicMargin(i18n.language,undefined,Scale(12)),marginLeft:ManageDynamicMargin(i18n.language,Scale(12),undefined)}]} />
      <TextInput
        testID="searchStore"
        placeholderTextColor={"#94A3B8"}
        style={[styles.searchInput,{textAlign:TextAlignManage(i18n.language)}]}
        keyboardType="default"
        maxLength={30}
        returnKeyLabel="search"
        returnKeyType="search"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    height: Scale(20),
    width: Scale(20),
    resizeMode: "contain",
    marginRight: Scale(12),
  },
  searchInput: {
    height: Scale(48),
    flex: 1,
    color: "#375280",
  },
  searchBox: {
    marginBottom: Scale(20),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CBD5E1",
    borderRadius: Scale(4),
    paddingHorizontal: Scale(10),
  },
});
