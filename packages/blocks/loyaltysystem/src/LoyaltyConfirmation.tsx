import React from "react";

import {
  // Customizable Area Start
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  // Customizable Area End
} from "react-native";

// Customizable Area Start
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get('window').height;
import {backIcon} from './assets'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
// Customizable Area End

import LoyaltyConfirmationController, {
  Props,
} from "./LoyaltyConfirmationController";

export default class LoyaltyConfirmation extends LoyaltyConfirmationController {
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
        <SafeAreaView style={styles.container}>
            <View style={[styles.headerViewMainConfirmationScreen,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackConfirmation" style={styles.backTouchConfirmationScreen}
                        onPress={() => { this.props.navigation.goBack() }}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconConfirmScreen,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity>
              <View>
                  <Text style={styles.headerTitleConfirmScreen}>{i18n.t('confirmation')}</Text>
              </View>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('congratulations')}</Text>
        <Text style={styles.subtitle}>{i18n.t('thankyouLoyaltyText')} {this.state.message}</Text>
      </View>
            <TouchableOpacity testID="btnCatalogueRedirect" onPress={()=>this.btnRedirectCatalogue()} style={styles.catalougeview}>
                <Text style={styles.catalougetext}>{i18n.t('Checkout')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#ffffffff",
    },
    headerViewMainConfirmationScreen: {
        justifyContent: 'space-between',
        alignContent: 'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    
    backTouchConfirmationScreen: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    
    backIconConfirmScreen: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },
    headerTitleConfirmScreen: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },
    congratsview:{
      
        borderWidth:1,
        height:windowWidth*150/100
    },
    insidecongratview:{
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        alignSelf:"center",
        borderWidth:2,
        
    },
    congratstext:{
        fontFamily:'Lato-Bold',
        color:"#375280",
        textAlign:"center",
        fontSize:22
    },
    thankyoutext:{
        fontFamily:'Lato-Regular',
        color:"#375280",
        fontSize:17,
        textAlign:"center",
        marginTop:10
    },
    catalougeview:{
      backgroundColor: "#CCBEB1",
      width: (windowWidth * 90) / 100,
      height: (windowHeight * 6.5) / 100,
      borderRadius: 2,
      bottom: (windowWidth * 11) / 100,
      justifyContent: "center",
      position:'absolute',
      alignSelf:'center'
    },
    catalougetext:{
        fontFamily:'Lato-Bold',
        color:"#FFFFFF",
        textAlign:"center",
        fontSize: (windowWidth * 5) / 100
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
      title: {
        fontSize: 24,
        fontFamily:'Lato-Bold',
        color: '#375280',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 17,
        color: '#375280',
        textAlign: 'center',
        marginHorizontal: 20,
      },
})    
// Customizable Area End
