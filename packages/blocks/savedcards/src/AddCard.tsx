import React from "react";

// Customizable Area Start
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomSwitch from "../../../components/src/CustomSwitch";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

const { width } = Dimensions.get("window");

interface InputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
}
// Customizable Area End

import AddCardController, { Props, configJSON } from "./AddCardController";

export default class AddCard extends AddCardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderInput = ({ label, containerStyle, ...rest }: InputProps) => (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="addCardPage">
        <CustomHeader
          title={configJSON.addCardTitle}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <TouchableWithoutFeedback
          testID="iosIsWeird"
          onPress={Keyboard.dismiss}
        >
          <View style={[styles.container, styles.sb]}>
            <View style={styles.m20}>
              <View>
                <this.renderInput
                  label={"Name on card"}
                  testID={"name"}
                  value={this.state.name}
                  onChangeText={this.handleNameChange}
                  maxLength={32}
                />
                <this.renderInput
                  label={"Card number"}
                  testID={"ccn"}
                  value={this.state.ccn}
                  onChangeText={this.handleCCN}
                  maxLength={19}
                  keyboardType={"numeric"}
                />
                <View style={[styles.row, styles.sb]}>
                  <this.renderInput
                    label={"Expire Date"}
                    testID={"expiry"}
                    keyboardType={"numeric"}
                    value={this.state.exipry}
                    containerStyle={styles.halfBox}
                    onChangeText={this.handleExpiry}
                    maxLength={5}
                  />
                  <this.renderInput
                    label={"CVV"}
                    testID={"cvv"}
                    value={this.state.cvv}
                    onChangeText={this.handleCVV}
                    maxLength={3}
                    containerStyle={styles.halfBox}
                    keyboardType={"numeric"}
                  />
                </View>
                <View style={[styles.row, styles.toggle]}>
                  <CustomSwitch
                    testID="saveCard"
                    value={this.state.saveCard}
                    onValueChange={this.toggleSave}
                    size={16}
                  />
                  <Text style={styles.saveCard}>
                    Save this card for future payment
                  </Text>
                </View>
              </View>
            </View>
            <CustomButton
              testID="addCard"
              title="Add Card"
              onPress={this.addCard}
              style={styles.btn}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  btn: {
    margin: Scale(20),
  },
  m20: {
    margin: Scale(20),
  },
  input: {
    height: Scale(56),
    color: "#375280",
    padding: Scale(16),
    backgroundColor: "#F8F8F8",
    marginTop: Scale(4),
    marginBottom: Scale(8),
    borderRadius: Scale(2),
  },
  label: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
  },
  halfBox: {
    width: (width - Scale(60)) / 2,
  },
  toggle: {
    marginVertical: Scale(8),
    alignItems: "center",
  },
  saveCard: {
    color: "#375280",
    marginLeft: Scale(16),
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
  },
});
// Customizable Area End
