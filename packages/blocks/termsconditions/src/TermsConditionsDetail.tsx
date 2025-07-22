import React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as IMG_CONST from './assets';
import Scale from "../../../components/src/Scale";
import HTMLView from 'react-native-htmlview';
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage';
import ImageReverseManage from '../../../components/src/ImageReverseManage';
// Customizable Area End

import TermsConditionsDetailController, {
  Props,
  configJSON,
} from "./TermsConditionsDetailController";

export default class TermsConditionsDetail extends TermsConditionsDetailController {
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
      <SafeAreaView style={styles.safeAreaContainer}>
        {this.state.loading &&
          <CustomLoader />
        }
        <View style={styles.container}>
          <View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID='backBuID'
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={IMG_CONST.BackIcon} style={[styles.backIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
            </TouchableOpacity>
            <Text style={styles.signupText}>{i18n.t('privacyPolicyText')}</Text>
            <View />
          </View>
          <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            <View style={styles.textContainer}>
              <HTMLView
                value={this.state.htmlCode}
                stylesheet={htmlrenderstyles}
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
const htmlrenderstyles =StyleSheet.create({
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

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  backIconImg: {
    width: Scale(32),
    height: Scale(32),
    tintColor: '#475569',
    marginLeft: Scale(-5)
  },
  signupText: {
    fontSize: Scale(20),
    fontWeight: "700",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -35
  },
  textContainer: {
    paddingHorizontal: 5,
    marginVertical: 20
  },
  textheading: {
    fontSize: 18,
    color: '#375280',
    fontWeight: '700',
    paddingBottom: 10
  },
  textPara: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: "500",
    paddingBottom: 10,
    lineHeight: 18
  }
});
// Customizable Area End