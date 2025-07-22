import React, { PropsWithChildren } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle
} from "react-native";
import { arrowDown } from "./assets";
import Scale from "./Scale";

import i18n from './i18n/i18n.config'
import FlexConditionManage from './FlexConditionManage'
export interface AccordionProps {
  open: boolean;
  setOpen: (o: boolean) => unknown;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  labelTestID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  cardContainerStyle?:StyleProp<ViewStyle>
  containerTestID?: string;
  toggleTestID?: string;
  childTestID?: string;
}

export default function Accordion({
  children,
  open,
  setOpen,
  label,
  labelStyle,
  containerStyle,
  cardContainerStyle,
  labelTestID = "acc-label",
  containerTestID = "acc-container",
  toggleTestID = "toggle-btn",
  childTestID = "acc-child"
}: PropsWithChildren<AccordionProps>) {
  return (
    <View style={[styles.container, containerStyle]} testID={containerTestID}>
      <TouchableOpacity style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => setOpen(!open)} testID={toggleTestID}>
        <Text style={[styles.label, labelStyle]} testID={labelTestID}>{label}</Text>
        <Image source={arrowDown} style={[styles.arrow, { transform: [{ rotate: open ? "180deg" : "0deg" }] }]} />
      </TouchableOpacity>
      <View style={{ display: open ? 'flex' : 'none' }} testID={childTestID}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: Scale(6)
  },
  label: {
    fontFamily: 'Lato',
    color: '#375280',
    flexShrink: 1,
    fontWeight: '700',
    fontSize: 16
  },
  arrow: {
    height: Scale(24),
    width: Scale(24),
  }
})