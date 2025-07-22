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
  ImageBackground
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
import { imgSplash, imgloader } from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SplashscreenController, { Props } from "./SplashscreenController";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", e => {
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
    const styles = StyleSheet.create({
      Splash_screenView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        flex: 1,
        alignItems: "flex-start"
      },

      view_bg_splash: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(667, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          0,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          0,
          false,
          1
        ),
        opacity: 1,
        backgroundColor: "rgba(38, 38, 38, 1)",
        borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
          0,
          true,
          1
        ),
        borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(
          0,
          true,
          1
        )
      },
      image_logoImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(232, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          74,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          156,
          false,
          1
        ),
        opacity: 1,
        resizeMode: "contain"
      },

      image_loaderImage: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(136, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(137, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          120,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          301,
          false,
          1
        ),
        opacity: 1,
        resizeMode: "contain"
      },

      textlabel_percentageText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(51, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(33, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          164,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          355,
          false,
          1
        ),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1)
      },

      attrbuted_textlabel_percentageText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(51, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(33, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          164,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          355,
          false,
          1
        ),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1)
      },

      textlabel_bottomlineText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(330, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          22,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          556,
          false,
          1
        ),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1)
      },

      attrbuted_textlabel_bottomlineText: {
        position: "absolute",
        width: MergeEngineUtilities.deviceBasedDynamicDimension(330, true, 1),
        height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
        marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
          22,
          true,
          1
        ),
        marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
          556,
          false,
          1
        ),
        opacity: 1,
        backgroundColor: "transparent",
        fontStyle: "normal",
        fontWeight: "normal",
        includeFontPadding: false,
        padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        textAlignVertical: "top",
        fontFamily: "Roboto-Regular",
        fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1)
      }
    });

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.Splash_screenView}>
          <View
            style={[
              styles.view_bg_splash,
              { flex: 1 },
              { flexWrap: "nowrap" },
              { flexDirection: "row" }
            ]}
          />
          <Image style={styles.image_logoImage} source={imgSplash} />
          <Image style={styles.image_loaderImage} source={imgloader} />
          <Text style={styles.textlabel_percentageText}>20%</Text>
          <Text style={styles.textlabel_bottomlineText}>
            Lorem ipsum dolor sit amet, consectetur adispiscing.{"\n"}Turpis
            mauris euismod posuere scelerisque
          </Text>
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
