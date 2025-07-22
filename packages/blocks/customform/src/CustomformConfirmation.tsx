import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import CustomformConfirmationController, { Props } from "./CustomformConfirmationController";
import globalStyle from "../../../components/src/GlobalStyle";
// Customizable Area End

export default class CustomformConfirmation extends CustomformConfirmationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerStore}>
            <SafeAreaView style={styles.safeContainerViewStore}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[globalStyle.headerMarginManage,styles.containerViewStore]}>

                <View style={styles.confirmationText}>
                    <Text style={styles.headerTitleConfirmation}>{i18n.t('confirmation')}</Text>
                </View>

                <View style={styles.marginCategoryManage}>
                    <Text style={styles.greatText}>{i18n.t('greatText')}</Text>
                    <Text style={styles.descritionText}>{i18n.t('sellerSingupRequestText')}</Text>
                </View>
               
            </View>
            <View style={[styles.btnNextMargin,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnLogout" style={styles.btnLogoutBackButton} onPress={()=>{this.logOutBtn()}}>
                    <Text style={styles.logoutButtonText}>{i18n.t('logOutText')}</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="btnCreateStoreRedirect" style={styles.btnCreateStoreButtonAdd} onPress={()=>{this.createStoreRedirection()}}>
                <Text style={styles.createStoreButtonText}>{i18n.t('createStoreText')}</Text>
                </TouchableOpacity>
            </View>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainerViewStore:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  mainContainerStore: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewStore:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerTitleConfirmation:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterTouchStore:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginCategoryManage:{
    justifyContent:'center',
    alignItems:'center',
    height:windowHeight*80/100
  },
  btnNextMargin:{
    justifyContent:'space-between',
    bottom:windowWidth*8/100,
    position:'absolute',
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  btnLogoutBackButton:{
      width:windowWidth*42/100,
      height:windowHeight*6/100,
      borderRadius:2,
      justifyContent:'center',
      backgroundColor:'#ffffff',
      borderColor:'#CCBEB1',
      borderWidth:1
  },
  logoutButtonText:{
      color:'#375280',
      textAlign:'center',
      fontFamily:'Lato-Regular',
      fontSize:windowWidth*4.5/100,
      fontWeight:'500'
  },
  btnCreateStoreButtonAdd:{
      backgroundColor:'#CCBEB1',
      width:windowWidth*42/100,
      height:windowHeight*6/100,
      borderRadius:2,
      justifyContent:'center'
  },
  createStoreButtonText:{
      color:'#fff',
      textAlign:'center',
      fontFamily:'Lato-Black',
      fontSize:windowWidth*4.5/100
  },
  greatText:{
    fontWeight:'500',
    fontFamily:'Lato-Regular',
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center'
  },
  descritionText:{
    fontWeight:'500',
    fontFamily:'Lato-Regular',
    color:'#375280',
    fontSize:windowWidth*3.8/100,
    textAlign:'center',
    marginTop:windowWidth*2/100
  },
  confirmationText:{
    alignSelf:'center',
    width:windowWidth*90/100
  }
});
