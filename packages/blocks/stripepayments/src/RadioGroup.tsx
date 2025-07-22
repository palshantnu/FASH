import React from "react";
// Customizable Area Start
import { View, FlatList } from "react-native";
import RadioButton from "./RadioButton";
import { IPaymentMethod } from "./types";

export type RadioGroupProps = {
  items: IPaymentMethod[];
  selectedId: string;
  onSelect(item: IPaymentMethod): void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  items,
  selectedId,
  onSelect,
}) => {
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RadioButton
            item={item}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        )}
      />
    </View>
  );
};

export default RadioGroup;
// Customizable Area End
