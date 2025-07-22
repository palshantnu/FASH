import React from "react";
// Customizable Area Start
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { IPaymentMethod } from "./types";

export type RadioButtonProps = {
  item: IPaymentMethod;
  selectedId?: string;
  onSelect(item: IPaymentMethod): void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  item,
  selectedId,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      testID="RadioButton"
      style={styles.radioButton}
      onPress={() => onSelect(item)}
    >
      <View style={styles.button}>
        {selectedId === item.id && (
          <View testID="selectedView" style={styles.selectedButton} />
        )}
      </View>
      <View style={styles.label}>
        <Text>
          {item.attributes.card.brand} {item.attributes.card.last4}
        </Text>
        <Text style={styles.date}>
          {item.attributes.card.exp_month} / {item.attributes.card.exp_year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    marginRight: 12,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: "#6200EE",
  },
  label: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#999",
  },
});

export default RadioButton;
// Customizable Area End
