import React from "react";
// Customizable Area Start
import { useMemo } from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
// Customizable Area Start

export interface CustomRadioButtonProps {
  // Customizable Area Start
  selected: boolean;
  onSelect?: () => unknown;
  size?: number;
  testID?: string;
  // Customizable Area Start
}

export default function CustomRadioButton(props: CustomRadioButtonProps) {
  // Customizable Area Start
  const { selected, onSelect = () => { }, size = 20 } = props;

  const defaultStyle: StyleProp<ViewStyle> = useMemo(() => ({
    height: size * 1,
    width: size * 1,
    borderWidth: size * 0.1,
    borderRadius: size,
  }), [size]);

  const activeStyle: StyleProp<ViewStyle> = useMemo(() => ({
    height: size * 1,
    width: size * 1,
    borderWidth: size * 0.28,
    borderRadius: size,
  }), [size])

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.default,
        selected ? activeStyle : defaultStyle
      ]}
      testID={props.testID}
    />
  )
  // Customizable Area Start
}

// Customizable Area Start
const styles = StyleSheet.create({
  default: {
    overflow: 'hidden',
    borderColor: '#324B74',
  },
})
// Customizable Area Start