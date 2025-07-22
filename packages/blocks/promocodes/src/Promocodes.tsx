import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { rightArrow } from "./assets";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage';
import ImageReverseManage from '../../../components/src/ImageReverseManage';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import AlignSelfManage from '../../../components/src/AlignSelfManage'

// Customizable Area End

import PromocodesController, {
  Props,
  configJSON,
} from "./PromocodesController";
import moment from "moment";

export default class Promocodes extends PromocodesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start


  

  render() {

  
      return (
        <SafeAreaView style={styles.SafeAreaView} testID="storeDetails">
        <CustomHeader leftTestId="customHeader"
            title={i18n.t("Offers and Discounts")}
            onLeftPress={() => this.props.navigation.goBack()}/>
        <ScrollView style={styles.mainView} bounces={false}>
        <TouchableOpacity style={[styles.content,{paddingBottom:10}]} onPress={()=>this.handleScreen()} testID="navigationBtn">
          <View style={[styles.contentContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={[styles.title ,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Offers & Discounts')}</Text>
            <Image source={rightArrow} style={[styles.rightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
          </View>
          <Text style={[styles.subtitle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create new offers & Discount coupons')}</Text>
          <View style={[styles.bottomView,{alignSelf:AlignSelfManage(i18n.language)}]}>
              <View style={styles.addAdressButton} >
                    <Text style={styles.addNewButtonText}>{i18n.t('Explore More')}</Text>
              </View>
          </View>
          </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
 mainView: {
    flex: 1,
    paddingBottom: Scale(20),
    paddingHorizontal: Scale(15),
  },
  content: {
    marginTop: Scale(25),
    alignSelf:'center',
    width:'99%',
    padding: Scale(10),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,   
    borderRadius:Scale(2),
    marginBottom: 30,
  },
  contentContainer:{
    flexDirection:"row",
    paddingTop:Scale(5),
    paddingLeft:Scale(5)
  },       
                
  bottomView: {
    marginTop:Scale(20),
    marginBottom:Scale(5),
    padding:Scale(5),
    backgroundColor: "white",
  },
  offers : {
    top: 11,
    left: 95,
    right: 90,
    position: 'absolute',   
     width: 295,
    fontFamily: 'Avenir-Heavy',
    fontWeight: '800',
    fontSize: 20,
    letterSpacing: 0,
    color: '#375280',
  },
  
   addAdressButton: {
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    width:'55%',
    paddingHorizontal:15,
    paddingVertical:13,
  },
  addNewButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: Scale(20),
    fontWeight: "600",
  },

  title: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 22,
    color: "#375280",
    width:'90%'
  },
  subtitle: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: 16,
    color: '#375280',
    marginTop:5,
   paddingLeft:Scale(5)
  },
  offersAndDiscountContainer :{ width: 380, height: 48 , flexDirection:'row'},
  SafeAreaView: {
      flex: 1,
      backgroundColor: "#ffffff",
  },
  backIcon: {
    height: Scale(20),
    width: Scale(20),  
    marginLeft:Scale(20),
     marginTop:Scale(18),
    resizeMode: "contain",
    marginRight: Scale(4),
  },
  
  rightIcon: {
    height: Scale(32),
    width: Scale(32), 
    resizeMode: "contain",
  },
  rightIcon1:{
    height: Scale(24),
    width: Scale(24), 
    left:Scale(130),
    marginTop:Scale(22),
    resizeMode: "contain",
  },

  container: {
    flexGrow: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  promocodeRowContainer: {
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 13,
    paddingVertical: 15,
    minHeight: 80,
    borderColor: "#e4e4e4",
  },
  promocodeRowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  promocodeExpiryContainer: {
    flexDirection: "row",
    marginTop: 7,
  },
  promocodeDetailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 3,
  },
  promocodePercentageContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 21,
  },
  minimumPurchaseText: {
    fontSize: 12,
    color: "#000000",
  },
  minimumPurchaseAmount: {
    marginLeft: 6,
    fontSize: 12,
    color: "#000000",
    fontWeight: 'bold',
  },
  promocodePercentageText: {
    fontSize: 17,
    color: "#d4312d",
    fontWeight: 'bold',
  },
  noPromocodeContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  noPromocodeCircleContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  noPromocodeCrossIcon: {
    width: 25,
    height: 25,
  },
  noPromocodeSorryText: {
    marginTop: 12,
    fontSize: 16,
    color: "#2f2a2b",
    fontWeight: 'bold',
  },
  noPromocodeText: {
    marginTop: 6,
    fontSize: 12,
    color: "#2f2a2b",
  },
  continueShoppingText: {
    fontSize: 14,
  },
  continueShoppingBtnContainer: {
    width: "90%",
    marginTop: 18,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
