import React from "react";
// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as IMG_CONST from './assets';
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config'
import HTMLView from 'react-native-htmlview';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
// Customizable Area End
import ShippingPolicyController, {
  Props,
} from "./ShippingPolicyController";
export default class ShippingPolicy extends ShippingPolicyController {
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
      <SafeAreaView style={styles.shippingmaincon}>
        {this.state.loading &&
          <CustomLoader />
        }
        <View style={styles.container}>
          <View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID='goBackID'
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={IMG_CONST.BackIcon} style={[styles.backIconImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
            </TouchableOpacity>
            <Text style={styles.shippingText}>{i18n.t('shippingPolicyText')}</Text>
            <View />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="always">
            <View style={styles.shippingTextcon}>
              <HTMLView
                value={this.state.htmlCode}
                stylesheet={shippingstyles}
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
const shippingstyles =StyleSheet.create({
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
    marginTop: 0,
    marginBottom: -10,
    padding: 0,
    lineHeight: 15, 
  },
  a: {
    fontSize: 14,
    color: '#375280',
    fontFamily: 'Lato-Regular',
  },
  div: {
    marginTop: 0,
    marginBottom: -10,
    padding: 0,
  },
  span: {
    lineHeight: 18,
  }
});

const styles = StyleSheet.create({
  shippingmaincon: {
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
  shippingText: {
    fontFamily: 'Avenir-Heavy',
    fontSize: Scale(20),
    fontWeight: "700",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -35
  },
  shippingTextcon: {
    paddingHorizontal: 5,
    marginVertical: 20
  },
});
// Customizable Area End
