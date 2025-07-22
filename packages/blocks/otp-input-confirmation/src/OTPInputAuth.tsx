import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";

import OTPInputAuthController, { Props } from "./OTPInputAuthController";
// Customizable Area End

export default class OTPInputAuth extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Merge Engine UI Engine Code */}
          <View>
            <Text
              style={styles.titleWhySignUp} //UI Engine::From Sketch
            >
              {this.state.labelInfo} {/*UI Engine::From Sketch*/}
            </Text>

            <TextInput
              testID="txtMobilePhoneOTP" //Merge Engine::From BDS of Parent <See Forgot Password and Mobile Account Regitration>
              style={
                Platform.OS === "web"
                  ? styles.phoneInputWeb //UI Engine::From Sketch
                  : styles.phoneInputMobile //UI Engine::From Sketch
              }
              placeholder={this.placeHolderOtp} //UI Engine::From Sketch
              {...this.txtMobilePhoneOTPProps}
            />

            <Button
              testID="btnSubmitOTP" //Merge Engine::From BDS <See Forgot Password and Mobile Account Regitration>
              title={this.btnTxtSubmitOtp} //UI Engine::From Sketch
              color={this.submitButtonColor} //UI Engine::From Sketch
              {...this.btnSubmitOTPProps}
            />
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },

  container: {
    flex: 1,
    padding: 16,
    width: Platform.OS === "web" ? "75%" : "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
 

  phoneInputWeb: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 64,
    fontSize: 18,padding: 10,
    borderBottomColor: "#767676",
    borderBottomWidth: 1
  },

  bgRectBorder: {
    borderWidth: 1, borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10,padding: 10
  },
  phoneInputMobile: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginBottom: 64,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10
  }
});
// Customizable Area End
