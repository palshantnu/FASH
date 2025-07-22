import React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as IMG_CONST from './assets';
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import HTMLView from 'react-native-htmlview';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End

import ReturnPolicyController, {
  Props,
} from "./ReturnPolicyController";
export default class ReturnPolicy extends ReturnPolicyController {
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
      <SafeAreaView style={styles.mainsubcontainer}>
        {this.state.loading &&
          <CustomLoader />
        }
        <View style={styles.subcontainer}>
          <View style={[styles.headersubcontainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID='backButtonID'
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={IMG_CONST.BackIcon} style={[styles.backIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
            </TouchableOpacity>
            <Text style={styles.signupText}>{i18n.t('returnPolicyText')}</Text>
            <View />
          </View>
          <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            <View style={styles.textsubcontainer}>
              <HTMLView
                value={this.state.htmlCode}
                stylesheet={returnStyle}
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
const returnStyle =StyleSheet.create({
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
    fontSize: 15,
    color: '#375280',
    fontFamily: 'Lato-Regular',
    marginTop: 0,
    marginBottom: -20,
    padding: 0,
    lineHeight: 18, 
  },
  a: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
  div: {
    marginTop: 0,
    marginBottom: -15,
    padding: 0,
  },
  span: {
    lineHeight: 18,
  }
});

const styles = StyleSheet.create({
  mainsubcontainer: {
    height: "100%",
    width: "100%",
    backgroundColor: '#fff'
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headersubcontainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
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
  textsubcontainer: {
    paddingHorizontal: 5,
    marginVertical: 20
  }
});
// Customizable Area End
