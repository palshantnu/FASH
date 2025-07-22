import React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as IMG_CONST from './assets';
import i18n from '../../../components/src/i18n/i18n.config'
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import HTMLView from 'react-native-htmlview';
// Customizable Area End

import TermsConditionsUsersController, {
  Props,
  configJSON,
} from "./TermsConditionsUsersController";

export default class TermsConditionsUsers extends TermsConditionsUsersController {
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
      <SafeAreaView style={styles.tncContainer}>
        {this.state.loading &&
          <CustomLoader />
        }
        <View style={styles.container}>
          <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerContainer]}>
            <TouchableOpacity
              testID='backTermsButtonID'
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={IMG_CONST.BackIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconImg]} />
            </TouchableOpacity>
            <Text style={styles.tncText}>{i18n.t('termsConditionsText')}</Text>
            <View />
          </View>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
            <View style={styles.htmlCodeCon}>
              <HTMLView
                value={this.state.htmlCode}
                stylesheet={tnchtmlrenderstyles}
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
const tnchtmlrenderstyles =StyleSheet.create({
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
  tncContainer: {
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
  tncText: {
    fontSize: Scale(20),
    fontWeight: "700",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -35
  },
  htmlCodeCon: {
    paddingHorizontal: 5,
    marginVertical: 20
  }
});
// Customizable Area End