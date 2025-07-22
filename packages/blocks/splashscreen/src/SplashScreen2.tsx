import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Dimensions
} from "react-native";
import * as IMG_CONST from "./assets";
import SplashScreenController2 from "./SplashScreenController2";
import { COLORS } from "../../../framework/src/Globals";
// Customizable Area End
export default class Splashscreen2 extends SplashScreenController2 {
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.splash_screenView}>
      <Image style={styles.fullImage} resizeMode="contain"  source={IMG_CONST.SplashLogo2} />

      </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}
const { width, height } = Dimensions.get("window");
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  splash_screenView: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width,
    height: height,
  },  
});
// Customizable Area End
