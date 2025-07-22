import React, { useMemo } from "react";
import { ColorValue, Pressable, View } from "react-native";

import Scale from "./Scale";

export interface CustomSwitchProps {
  value: boolean;
  onValueChange: (v: boolean) => unknown;
  disabled?: boolean;
  rtl?: boolean;
  size?: number;
  thumbColor?: ColorValue;
  activeBGColor?: ColorValue;
  inactiveBGColor?: ColorValue;
  testID?: string;
}

export default function CustomSwitch({
  value,
  onValueChange,
  rtl = false,
  disabled = false,
  size = 18,
  thumbColor = "#FFFFFF",
  activeBGColor = "#375280",
  inactiveBGColor = "#E2E8F0",
  testID = "customSwitch",
}: CustomSwitchProps) {
  const _size = Scale(size);
  const innerRadius = _size / 2;
  const d = _size / 3;
  const outerRadius = innerRadius + d;

  const alignItems = useMemo(() => {
    if (rtl) {
      return value ? "flex-start" : "flex-end";
    } else {
      return value ? "flex-end" : "flex-start";
    }
  }, [value, rtl]);

  return (
    <Pressable
      style={{
        backgroundColor: value ? activeBGColor : inactiveBGColor,
        borderRadius: outerRadius,
        padding: d,
        maxWidth: _size * 2 + 3 * d,
        opacity: disabled ? 0.8 : 1
      }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      testID={testID}
    >
      <View style={{ width: _size * 2 + d, alignItems }}>
        <View
          style={{
            width: _size,
            height: _size,
            borderRadius: innerRadius,
            backgroundColor: thumbColor,
          }}
        />
      </View>
    </Pressable>
  );
}
