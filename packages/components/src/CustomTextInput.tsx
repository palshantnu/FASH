import React from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from "react-native";
import globalStyle from "./GlobalStyle";

export interface CustomTextInputProps extends TextInputProps {
  prefix?: string;
  hasError?: boolean;
  label?: string;
  errorString?: string;
  containerStyle?: StyleProp<ViewStyle>;
  language?:string
}

export default function CustomTextInput({
  label = "",
  prefix,
  errorString = "",
  hasError = false,
  style,
  containerStyle,
  language,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={[globalStyle.inputWrapper, containerStyle]}>
      <View style={{alignSelf: language=="ar" ?'flex-end':"flex-start"}}>
      {label ? <Text style={globalStyle.inputLabel}>{label}</Text> : null}
      </View>
      <View
        style={{
          flexDirection: "row",
          height: globalStyle.textInput.height,
        }}
      >
        {prefix ? (
          <Text
            style={{
              textAlign: "center",
              height: globalStyle.textInput.height,
              textAlignVertical: "center",
              color: globalStyle.textInput.color,
              padding: globalStyle.textInput.padding,
              paddingRight: 0,
            }}
          >
            {prefix}
          </Text>
        ) : null}
        <TextInput
          {...props}
          placeholderTextColor={"#385380"}
          style={[globalStyle.textInput, { flex: 1,textAlign:language=="en"?"left":"right" }, style]}
        />
      </View>
      {hasError ? (
        <View style={globalStyle.errContainer}>
          <Text testID="errorText" style={globalStyle.errorText}>
            {errorString}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
