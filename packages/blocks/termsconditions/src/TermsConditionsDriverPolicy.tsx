import React from "react";

// Customizable Area Start
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image,StatusBar,Dimensions } from "react-native";
import * as IMG_CONST from './assets';
import Scale from "../../../components/src/Scale";
import HTMLView from 'react-native-htmlview';
import CustomLoader from "../../../components/src/CustomLoader";
import TermsConditionsDriverPolicyController, {
  Props
} from "./TermsConditionsDriverPolicyController";
import globalStyle from "../../../components/src/GlobalStyle";
const windowWidth = Dimensions.get('window').width;
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End


export default class TermsConditionsDriverPolicy extends TermsConditionsDriverPolicyController {
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
        <View style={styles.mainAreaContainerDriver}>
                {this.state.loading &&
                <CustomLoader />
                }
                <SafeAreaView style={styles.safeAreaContainerDriver}/>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
                <View style={[styles.headerViewAdmin,globalStyle.headerMarginManage,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackDriverPolicy" style={styles.backTouchAdmin} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={IMG_CONST.BackIcon} style={[styles.backIconImgDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleAdmin}>{this.state.headerShowTitle}</Text>
                    </View>
                    <View style={styles.filterTouchAdmin}>
                    </View>
                </View>
                <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainerDriver}>
                    <HTMLView
                        value={this.state.htmlCode}
                        stylesheet={htmlrenderDriverstyles}
                    />
                    </View>
                </ScrollView>
        </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const htmlrenderDriverstyles =StyleSheet.create({
    body: {
        fontFamily: 'Lato-Regular',
        color: '#375280',
    },
    h2: {
        color: '#375280',
        fontSize: 18,
        fontWeight: '600',
            fontFamily: 'Lato-Regular',
    },
    p: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#375280',
    },
    a: {
        color: '#375280',
        fontFamily: 'Lato-Regular',
        fontSize: 14,
    },
});

const styles = StyleSheet.create({
  mainAreaContainerDriver: {
    flex:1,
    backgroundColor: '#fff'
  },
  safeAreaContainerDriver: {
    flex:0,
    backgroundColor: '#fff'
  },
  containerDriver: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainerDriver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  backIconImgDriver: {
    width: Scale(32),
    height: Scale(32),
    tintColor: '#475569',
    marginLeft: Scale(-5)
  },
  headerText: {
    fontSize: Scale(20),
    fontWeight: "700",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginLeft: -35
  },
  textContainerDriver: {
    paddingHorizontal: 5,
    marginVertical: 20,
    width:windowWidth*90/100,
    alignSelf:'center'
  },
    headerViewAdmin:{
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    backTouchAdmin:{
        width: Scale(35),
        height: Scale(35),
    },
    headerTitleAdmin:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterTouchAdmin:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
});
// Customizable Area End