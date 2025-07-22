import React, { useCallback } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  StyleProp,
  FlatList,
  Dimensions
} from "react-native";

const windowWidth = Dimensions.get("window").width;
import { arrowDown } from "./assets";
import Scale from "./Scale";
import i18n from "./i18n/i18n.config";
import FlexConditionManage from "./FlexConditionManage";
import TextAlignManage from "./TextAlignManage";
import ManageDynamicMargin from './ManageDynamicMargin'

export interface CountryData {
  numeric_code: string;
  country_full_name: string;
  country_code: string;
  country_flag: string;
}

export interface MobileWithCountryCodesInputProps {
  open: boolean;
  toggleOpen: (current: boolean) => void;
  selectedIndex: number;
  onSelect: (sindex: number, data: CountryData) => void;
  optionsList: Array<CountryData>;
  inputValue: string;
  onValueChange: (value: string) => void;
  hasError?: boolean;
  style?: StyleProp<ViewStyle>;
  inputTestId?: string;
  toggleTestId?: string;
  testID?: string;
  placeHolderInput?:string;
  placeHolderInputColor?:string;
  onFocusChange?:()=>void
}

const MobileWithCountryCodesInput = ({
  open,
  toggleOpen,
  style,
  selectedIndex,
  onSelect,
  optionsList,
  inputValue,
  onValueChange,
  hasError,
  testID,
  inputTestId = "txtInputPhoneNumber",
  placeHolderInput = i18n.t("Enter_phoneNumber"),
  placeHolderInputColor = '#667085',
  onFocusChange,
}: MobileWithCountryCodesInputProps) => {
  const getRenderText = useCallback(
    (index: number) => {
      const data = optionsList[index];
      if (i18n.language === 'en') {
        return data ? `${data.country_flag} ${data.numeric_code}` : '';
      } else {
        return data ? `${data.numeric_code} ${data.country_flag}` : ''; 
      }
    },
    [optionsList]
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={[styles.row, styles.mh, {flexDirection:FlexConditionManage(i18n.language)}]}>
        <TouchableOpacity
          style={[
            styles.row,
            styles.box,
            styles.selector,
            styles.mh,
            { borderColor: hasError ? "#D0D5DD" : "#D0D5DD" },
            {flexDirection:FlexConditionManage(i18n.language)}
          ]}
          activeOpacity={0.9}
          onPress={() => toggleOpen(open)}
          testID="phoneCodeDisplayToggle"
        >
          <Text style={[styles.text, {textAlign: TextAlignManage(i18n.language) }]}>{getRenderText(selectedIndex)}</Text>
          <Image
            source={arrowDown}
            style={[
              styles.icon,{marginRight:ManageDynamicMargin(i18n.language,8,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,8)},
              open ? { transform: [{ rotate: `180deg` }] } : undefined
            ]}
          />
        </TouchableOpacity>
        <View style={{ width: Scale(12) }} />
        <TextInput
          value={inputValue}
          style={[
            styles.box,
            styles.input,
            styles.text,
            { textAlign: TextAlignManage(i18n.language)},
            { borderColor: hasError ? "#D0D5DD" : "#D0D5DD" }
          ]}
          onChangeText={(text) => {
            if (/^\d{0,12}$/.test(text)) {
              onValueChange(text)
            }
          }}
          returnKeyLabel="done"
          returnKeyType="done"
          placeholderTextColor={placeHolderInputColor}
          placeholder={placeHolderInput}
          keyboardType="phone-pad"
          testID={inputTestId}
          onFocus={onFocusChange}
        />
      </View>
      <FlatList
        testID="phoneCodesFlatList"
        nestedScrollEnabled={true}
        data={optionsList}
        keyExtractor={(item) => item.country_code}
        style={[styles.flContainer, { display: open ? "flex" : "none" }]}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        initialNumToRender={10}
        ListFooterComponent={<View style={{ height: 32 }} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.country}
            onPress={() => onSelect(index, item)}
            testID={"country-" + index}
          >
            <Text
              style={
                index === selectedIndex
                  ? styles.countryTextActive
                  : styles.countryTextNormal
              }
            >{`${item.country_flag}  ${item.country_full_name} (${item.numeric_code
              })`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mh: {
    maxHeight: Scale(56)
  },
  selector: {
    width: Scale(130),
    justifyContent: "space-between"
  },
  icon: {
    marginLeft: 8,
    height: Scale(24),
    width: Scale(24)
  },
  box: {
    // backgroundColor: "#F8F8F8",
    padding: Scale(15),
    color: "#375280",
    borderRadius: Scale(2),
    overflow: "hidden",
    borderWidth: 1,
    borderRadius:8
    // backgroundColor: 'green'
  },
  text: {
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#667085",
    lineHeight: 22
  },
  input: {
    color: "#667085",
    flex: 1,
    lineHeight: 18,
    paddingVertical: Scale(15)
  },
  flContainer: {
    marginVertical: Scale(6),
    height: Scale(24 * 6 + 16 * 7),
    padding: 16,
    backgroundColor: "#F8F8F8"
    // backgroundColor: 'green'
    
  },
  country: {
    // backgroundColor: 'red'
  },
  countryTextNormal: {
    fontSize: 16,
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "400"
  },
  countryTextActive: {
    fontSize: 16,
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "700"
  }
});

export default MobileWithCountryCodesInput;
