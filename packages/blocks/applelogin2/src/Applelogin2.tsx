import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Platform,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Applelogin2Controller, {
  Props,
  configJSON,
} from "./Applelogin2Controller";

export default class Applelogin2 extends Applelogin2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
        testID="btnTouchFeedback"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
              <Text
                testID="labelTitle" //Merge Engine::From BDS
                style={styles.title} //UI Engine::From Sketch
              >
                {configJSON.labelTitleText}
              </Text>
    

            <Text
              testID="labelBody" //Merge Engine::From BDS
              style={styles.body} //UI Engine::From Sketch
            >
              {" "}
              {configJSON.labelBodyText} 
            </Text>

            <Text testID="txtSaved">
              This is the reviced value:
              {this.state.txtSavedValue}{" "}
            </Text>

            <View style={styles.bgPasswordContainer}>
              <TextInput
                testID="txtInput" //Merge Engine::From BDS
                style={styles.bgMobileInput} //UI Engine::From Sketch
                placeholder={configJSON.txtInputPlaceholder} //UI Engine::From Sketch
                {...this.txtInputProps} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <TouchableOpacity
                testID={"btnShowHide"} //Merge Engine::From BDS
                style={styles.showHide} //UI Engine::From Sketch
                {...this.btnShowHideProps} //Merge Engine::From BDS - {...this.testIDProps}
              >
                <Image
                  testID={"btnShowHideImage"} //Merge Engine::From BDS - testIDImage
                  style={styles.imgShowhide} //UI Engine::From Sketch
                  {...this.btnShowHideImageProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </TouchableOpacity>
            </View>

            <Button
              testID={"btnExample"} //Merge Engine::From BDS
              title={configJSON.btnExampleTitle} //UI Engine::From Sketch
              {...this.btnExampleProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: {},
});
// Customizable Area End
