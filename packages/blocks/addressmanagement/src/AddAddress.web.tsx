import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// Customizable Area End
//@ts-ignore
import Select from "react-select";
// import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/AntDesign";

import AddressManagementController, {
  Props,
  configJSON,
  AdressTypeData,
} from "./AddressManagementController";

export default class AddAddress extends AddressManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  render() {
    return (
      //Merge Engine DefaultContainer
      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.txtLabelLat}</Text>
                <TextInput
                  testID="txtLat" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.txtLabelLat} //UI Engine::From Sketch
                />
              </View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.txtLabelLng}</Text>
                <TextInput
                  testID="txtLng" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.txtLabelLng} //UI Engine::From Sketch
                />
              </View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>
                  {configJSON.txtLabelAddress}
                </Text>
                <TextInput
                  testID="txtAddress" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.txtLabelAddress} //UI Engine::From Sketch
                />
              </View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>
                  {configJSON.txtLabelAddressType}
                </Text>
                <View style={styles.dropdownView}>
                
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewBtn}
                testID="btnSubmit" //Merge Engine::From BDS
                onPress={this.handleSavePressed.bind(this)}
              >
                <Text style={styles.viewBtnText}>{configJSON.btnAdd}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
    width:"75%" ,
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  goBack: {
    marginLeft: 16,
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue",
    zIndex: -1
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  titleInput: {
    color: "#000",
  },
  bgInputContainer: {
    marginBottom: 25,
  },
  bgMobileInput: {
    height: 45,
    borderBottomWidth:  0 ,
    borderColor: "#c9c9c9",
  },
  bgMobileInputMessage: {
    borderWidth: 0 ,
    borderColor: "#c9c9c9",
    height: 100,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  dropdownView: {
    marginBottom: 10, 
    zIndex: 99
  },
  dropdownContainer: {
    height: "4.2%",
    justifyContent: "center",
    marginBottom: "4%",
    marginHorizontal: "1%",
  },
  dropdownInputContainer: {
    borderBottomColor: "transparent",
  },
  dropdownAccessory: {
    marginTop: "1.5%",
    justifyContent: "center",
  },
});
// Customizable Area End
