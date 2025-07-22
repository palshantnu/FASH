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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,phoneIcon,rightArrow } from "./assets";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ContactUsSupportController, { Props } from "./ContactUsSupportController";
import globalStyle from "../../../components/src/GlobalStyle";
// Customizable Area End

export default class ContactUsSupport extends ContactUsSupportController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeContainerView}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[globalStyle.headerMarginManage,styles.containerView]}>
                <View style={[styles.headerView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackContactSupport" style={styles.backTouch} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCss,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitle}>{i18n.t('contactUsText')}</Text>
                    </View>
                    <View style={styles.filterTouch}>
                    </View>
                </View>

                <View style={styles.marginMainTop}>
                    <TouchableOpacity testID="btnContactCallRedirection" style={[styles.cardMainView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.adminCall()}}>
                        <Text style={styles.cardTitleText}>{i18n.t('customerServiceCallText')}</Text>
                        <Image source={phoneIcon} style={styles.cardIcon}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity testID="btnContactFormAdminRedirection" style={[styles.cardOtherView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnContactUsAddRedirection('admin','Admin-Related Concerns')}}>
                        <Text style={styles.cardTitleText}>{i18n.t('adminRelatedConcernText')}</Text>
                        <Image source={rightArrow} style={[styles.cardIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
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
  safeContainerView:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerView:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerView:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouch:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCss:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitle:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterTouch:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginMainTop:{
    marginTop:windowWidth*5/100
  },
  cardMainView:{
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
  cardTitleText:{
    color:'#375280',
    fontFamily:'Lato-regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  cardIcon:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  cardOtherView:{
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
