import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale, { verticalScale } from "../../../components/src/Scale";
import { backIcon } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

import StylistPortfolioSingleImageController, {
  Props,
} from "./StylistPortfolioSingleImageController";
import ImageReverseManage from "../../../components/src/ImageReverseManage";

export default class StylistPortfolioSingleImage extends StylistPortfolioSingleImageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerContainer, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backBtn, { 
            transform: [{ scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) } ]
          }]}
        />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{i18n.t("stylistPortfolioImages")}</Text>
      <View />
    </View>
  );

  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
        <SafeAreaView style={styles.container} testID="StylistPortfolioSingleImage">
        <this.Header />
        {this.state.loading ? <CustomLoader /> : null}
        <ScrollView style={styles.bodyView} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: this.state.stylistPortfolioDetailProfile }} 
          onLoadEnd={() => this.setState({ loading: false })}
          style={{ width: 430, height: 462 }} />
          <View style={styles.mainView}>
            <Text style={[styles.exploreTxt, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("explorePortfolios")}</Text>
            <Text style={[styles.descTxt, { 
              width: windowWidth * 90 / 100, 
              textAlign: TextAlignManage(i18n.language),
            }]}>
              {this.state.stylistPortfolioDetailDesc}
            </Text>
          </View>
        </ScrollView>

      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
  },
  headerTxt: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    color: "#375280",
    lineHeight: 26,
    fontWeight: '800'
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  exploreTxt: {
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    fontSize: 16,
    color: '#375280',
    marginTop: verticalScale(18),
  },
  mainView: {
    marginHorizontal: Scale(24),
  },
  descTxt: {
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    fontSize: 18,
    tintColor: '#375280',
    lineHeight: 26,
    marginTop: verticalScale(10),
    backgroundColor: "#F8F8F8",
    padding: Scale(10)
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  backIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginVertical: verticalScale(25),
    marginHorizontal: Scale(24),
    justifyContent: 'space-between'
  },
  backBtn: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  bodyView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 90) / 100,
    alignSelf: "center",
  },
});
// Customizable Area End