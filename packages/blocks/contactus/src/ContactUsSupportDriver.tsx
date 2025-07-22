import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";

import { backIcon,phoneIcon,rightArrow } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import globalStyle from "../../../components/src/GlobalStyle";
import ContactUsSupportDriverController, { Props } from "./ContactUsSupportDriverController";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
// Customizable Area End

export default class ContactUsSupportDriver extends ContactUsSupportDriverController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerDriver}>
            <SafeAreaView style={styles.safeContainerViewDriver}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[globalStyle.headerMarginManage,styles.containerView]}>
                <View style={[styles.headerViewDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackContactSupportDriver" style={styles.backTouchDriver} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconCssDriver]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleDriver}>{i18n.t('contactUsText')}</Text>
                    </View>
                    <View style={styles.filterTouchDriver}>
                    </View>
                </View>

                <View style={styles.marginMainTopDriver}>
                    <TouchableOpacity testID="btnContactCallRedirectionDriver" style={[styles.cardMainViewDriver,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.adminCallDriver()}}>
                        <Text style={styles.cardTitleTextDriver}>{i18n.t('customerServiceCallText')}</Text>
                        <Image source={phoneIcon} style={[styles.cardIconDriver]}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity testID="btnContactFormPayoutRedirection" style={[styles.cardOtherViewDriver,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnContactUsAddRedirectionDriver('payout','Payout-Related Concerns')}}>
                        <Text style={styles.cardTitleTextDriver}>{i18n.t('payoutRelatedConcernText')}</Text>
                        <Image source={rightArrow} style={[styles.cardIconDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity testID="btnContactFormDeliveredRedirection" style={[styles.cardOtherViewDriver,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnContactUsAddRedirectionDriver('deliveredOrder','Delivery-Specific Contact')}}>
                      <Text style={styles.cardTitleTextDriver}>{i18n.t('deliverySpecificContactText')}</Text>
                        <Image source={rightArrow} style={[styles.cardIconDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainerViewDriver:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  mainContainerDriver: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerView:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewDriver:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCssDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleDriver:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterTouchDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginMainTopDriver:{
    marginTop:windowWidth*5/100
  },
  cardMainViewDriver:{
    justifyContent:'space-between',
    height:windowHeight*8/100,
    elevation:4,
    alignItems:'center',
    padding:10,
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.10,
    shadowRadius: 4,
    backgroundColor:'#fff'
  },
  cardTitleTextDriver:{
    color:'#375280',
    fontFamily:'Lato-regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  cardIconDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  cardOtherViewDriver:{
    justifyContent:'space-between',
    height:windowHeight*8/100,
    elevation:4,
    alignItems:'center',
    padding:10,
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.10,
    shadowRadius: 4,
    backgroundColor:'#fff',
    marginTop:windowWidth*4/100
  }
});
