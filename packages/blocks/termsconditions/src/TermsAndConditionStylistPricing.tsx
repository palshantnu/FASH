import React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as IMG_CONST from './assets';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config'
import HTMLView from 'react-native-htmlview';
// Customizable Area End


import TermsAndConditionStylistPricingController, {
    Props
  } from "./TermsAndConditionStylistPricingController";

export default class TermsAndConditionStylistPricing extends TermsAndConditionStylistPricingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start    
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.tncContainerPricing} testID="TermsAndConditionStylistPricing">
        {this.state.loading &&<CustomLoader />}

        <View style={styles.containerPricing}>
          <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerContainerPricing]}>
            <TouchableOpacity
              testID='backTermsButtonID'
              onPress={() => this.props.navigation.goBack()}>
              <Image source={IMG_CONST.BackIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconImgPricing]} />
            </TouchableOpacity>
            <Text style={styles.tncTextPricing}>{i18n.t('termsConditionsText')}</Text>
            <View/>
          </View>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.htmlCodeConPricing}>
              <HTMLView
                value={this.state.htmlCode}
                stylesheet={tnchtmlrenderstylesPricing}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  tncContainerPricing: {
    height: "100%",
    width: "100%",
    backgroundColor: '#fff'
  },
  containerPricing: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainerPricing: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  backIconImgPricing: {
    width: Scale(32),
    height: Scale(32),
    tintColor: '#475569',
    marginLeft: Scale(-5)
  },
  tncTextPricing: {
    fontSize: Scale(20),
    fontWeight: "700",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -35
  },
  htmlCodeConPricing: {
    paddingHorizontal: 5,
    marginVertical: 20
  }
});

const tnchtmlrenderstylesPricing =StyleSheet.create({
  body: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
  h2: {
    fontSize: 18,
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontWeight: '600'
  },
  p: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
  a: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
});
// Customizable Area End