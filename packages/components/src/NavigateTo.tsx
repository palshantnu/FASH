import React from "react";
import { Pressable, Image, Text, View, StyleSheet } from "react-native";
import i18n from './i18n/i18n.config'
import FlexConditionManage from './FlexConditionManage'
import ImageReverseManage from "./ImageReverseManage";
import Scale from "./Scale";
import { rightSideArrow } from "./assets";

export default function NavigateTo({
  title,
  onPress,
  testID,
  showBottomBorder = false,
}: {
  title: string;
  onPress: () => unknown;
  testID?: string;
  showBottomBorder?: boolean;
}) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={[styles.row, styles.justifyBetween, styles.goToItem,{flexDirection:FlexConditionManage(i18n.language)}]}
        testID={testID}
      >
        <Text style={styles.goToText}>{title}</Text>
        <Image source={rightSideArrow} style={[styles.arrow,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
      </Pressable>
      {showBottomBorder && <View style={styles.goToItemSeparator} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  goToItem: {
    paddingVertical: Scale(14),
  },
  goToText: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 16,
    color: "#375280",
  },
  arrow: {
    height: Scale(22),
    width: Scale(22),
    marginVertical: Scale(1),
    resizeMode: "contain",
  },
  goToItemSeparator: {
    flex: 1,
    height: Scale(1),
    backgroundColor: "#EEEEEE",
  },
});
