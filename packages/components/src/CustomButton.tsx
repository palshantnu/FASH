import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleProp,
  TextStyle,
} from "react-native";
import Scale from "./Scale";
// Customizable Area Start

export interface CustomButtonProps extends TouchableOpacityProps {
  // Customizable Area Start
  title: string;
  textStyle?: StyleProp<TextStyle>;
  // Customizable Area Start
}

export default function CustomButton(props: CustomButtonProps) {
  // Customizable Area Start
  const { title, textStyle, style, disabled, ...rest } = props;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.8}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {disabled ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(255,255,255,0.3)" },
          ]}
        />
      ) : null}
    </TouchableOpacity>
  );
  // Customizable Area Start
}

// Customizable Area Start
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    minHeight: Scale(56),
    borderRadius: Scale(5),
    overflow: "hidden",
  },
  text: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    color: "#FFFFFF",
  },
});
// Customizable Area Start
