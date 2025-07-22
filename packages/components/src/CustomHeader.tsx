import React, { ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { backIcon } from "./assets";
import Scale from "./Scale";
import i18n from './i18n/i18n.config';
import FlexConditionManage from './FlexConditionManage'
import ImageReverseManage from './ImageReverseManage'
const { width: windowWidth } = Dimensions.get("window");

export interface CustomHeaderProps {
  title: string;
  left?: ReactNode;
  leftTestId?: string;
  language?: string;
  onLeftPress?: () => unknown;
  right?: ReactNode;
  rightTestId?: string;
  onRightPress?: () => unknown;
}

export default function CustomHeader({
  title,
  left = (
    <Image
      resizeMode="contain"
      source={backIcon}
      style={[styles.backIconCssCatalogue,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
    />
  ),
  leftTestId = "btn-navigation-left",
  onLeftPress = () => {},
  right = <View style={styles.filterIconTouch} />,
  rightTestId = "btn-navigation-right",
  onRightPress = () => {},
}: CustomHeaderProps) {
  return (
    <View style={styles.headerViewMainCatalogue}>
      <View style={[styles.justify,{flexDirection: FlexConditionManage(i18n.language)}]}>
        <TouchableOpacity
          testID={leftTestId}
          style={styles.backTouchCatalogue}
          onPress={onLeftPress}
        >
          {left}
        </TouchableOpacity>
        <Text style={styles.headerTitleCatalogue}>{title}</Text>
        <View style={styles.filterIconTouch} />
      </View>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <View
          style={{
            flex: 1,
            flexDirection: FlexConditionManage(i18n.language),
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            testID={rightTestId}
            style={styles.headerRight}
            onPress={onRightPress}
          >
            {right}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerViewMainCatalogue: {
    marginHorizontal: Scale(16),
    paddingVertical: Scale(9),
  },
  justify: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterIconTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerRight: {
    height: (windowWidth * 6) / 100,
  },
  contain:{flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center"}
});
