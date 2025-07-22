import React from "react";

// Customizable Area Start
import { ScrollView, View, StyleSheet, StatusBar } from "react-native";
import WebView from "react-native-webview";

import CustomLoader from "../../../components/src/CustomLoader";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

import TapWebViewForStylistPlanController, {
  Props,
  configJSON,
} from "./TapWebViewForStylistPlanController";
// Customizable Area End

export default class TapWebViewForStylistPlan extends TapWebViewForStylistPlanController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView style={styles.container} ref={this.scrollRef} testID="TapWebViewForStylistPlan">
        <View style={styles.fullScreen}>
          {!this.state.loading ? (
            <WebView
            testID="webView"
            source={{ uri: this.state.webUrl }}
            onLoadEnd={this.scrollToEnd}
            onNavigationStateChange={this.onNavigationStateChangeHandler}
            startInLoadingState={true}
            originWhitelist={["*"]}
            style={styles.webView}
            />
          ) : (
            <CustomLoader />
          )}
        </View>
        <View
          style={{ height: this.state.emptyheight, backgroundColor: "#222222" }}
        />
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
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  
  heading: {
    textAlign: "center",
    color: "blue",
    fontSize: 32,
    fontWeight: "500",
    textDecorationColor: "#000",
    textDecorationLine: "underline",
  },
  flexOne: {
    flex: 1,
  },
  
  tableHeaders: {
    color: "blue",
    fontSize: 14,
  },
  tableHeader: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  tableCell: {
    color: "black",
    fontSize: 13,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  
  indicator: {
    position: "absolute",
    top: deviceHeight / 2 - 100,
    left: deviceWidth / 2 - 16,
  },
  colStyle: {
    paddingRight: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  
  fullScreen: {
    height: deviceHeight,
    width: deviceWidth,
  },
  webView: {
    width: deviceWidth,
    height: deviceHeight - (StatusBar.currentHeight ?? 0),
    flex: 1,
  },
});
// Customizable Area End
