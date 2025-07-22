import React from "react";

import {
  // Customizable Area Start
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import StylishProfileDashboardController, { Props } from "./StylishProfileDashboardController";
import { filledheart, heart, image3 } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomHeader from "../../../components/src/CustomHeader";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageNotFound from "../../../components/src/ImageNotFound";
// Customizable Area End

export default class StylishProfileDetails extends StylishProfileDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.mainContainer}>
        <CustomHeader
          leftTestId="backBtn"
          title={i18n.t("stylistsPortfolios")}
          onLeftPress={() => this.goBack() }
        />

        <ScrollView style={styles.bodyView} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: this.state.stylistPortfolioDetailProfile }} style={{ width: 430, height: 462 }} />
          <View style={styles.mainView}>
            <Text style={[styles.exploreTxt, { textAlign : TextAlignManage(i18n.language) }]}>{i18n.t("explorePortfolios")}</Text> 
            <Text style={[styles.descTxt, { textAlign : TextAlignManage(i18n.language) }]}>
              {this.state.stylistPortfolioDetailDesc}
            </Text>
            <View style={[styles.stylistView, { flexDirection: FlexConditionManage(i18n.language)}]}>
              <View style={[styles.row, { flexDirection: FlexConditionManage(i18n.language)}]}>
                <Image source={ImageNotFound(this.state.stylistPortfolioProfilePic)} style={styles.imageView} />
                <View style={styles.detailsView}>
                  <Text style={styles.nameTxt}>{this.state.stylistPortfolioName}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => { this.favoriteFunc() }} testID="HeartFunc">
                <Image source={this.state.stylistPortfolioIsFav ? filledheart : heart} style={styles.heart} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
        testID="StylishButton"
         onPress={() => {this.stylistProfileBtn()}}>
          <View style={styles.bottomView}>
            <Text style={styles.bottomTxt}>{i18n.t("stylistsProfile")}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginVertical: verticalScale(25),
    marginHorizontal: Scale(24),
    justifyContent: 'space-between'
  },
  backBtn: {
    height: 24,
    width: 24
  },
  headerTxt: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    color: "#375280",
    lineHeight: 26,
    fontWeight: '800'
  },
  bottomView: {
    justifyContent: 'flex-end',
    backgroundColor: '#CCBEB1',
    borderRadius: 2,
    paddingVertical: verticalScale(15),
    paddingHorizontal: Scale(16),
    marginHorizontal: Scale(24),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  bodyView: {
    flex: 1,
  },
  bottomTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#FFFFFF',
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
    fontWeight: '500',
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
    marginTop: verticalScale(10),
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  stylistView: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  row: {
    flexDirection: 'row',
  },
  nameTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: '700',
    color: '#375280',
  },
  detailsView: {
    marginHorizontal: Scale(20),
    marginTop: verticalScale(10),
  },
  availableTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#059669',
    marginTop: verticalScale(4),
  },
  heart: {
    height: 30,
    width: 30
  }
});
// Customizable Area End
