
import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage';
import ImageReverseManage from '../../../components/src/ImageReverseManage';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
// Customizable Area End

import VerifyAccountController, { Props } from "./VerifyAccountController";

export default class VerifyAccount  extends VerifyAccountController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
          <View style={styles.mainConatiner}>
            <SafeAreaView style={styles.safeareaview}/>
            <StatusBar barStyle="dark-content" backgroundColor={"#fff"} hidden={false} translucent={false} networkActivityIndicatorVisible={true}/>
            {this.state.loading && <CustomLoader />}
            <ScrollView bounces={false} keyboardShouldPersistTaps="always">
            <View style={[styles.headers,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="button_go_back" style={styles.headerBackTouchbtn} onPress={() => { this.props.navigation.goBack() }}>
                <Image style={[styles.backImg,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} source={backIcon}></Image>
              </TouchableOpacity>

              <View style={styles.headerTitle}>
                <Text style={[styles.headerTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Verify Account')}</Text>
              </View>
            </View>

            <View style={styles.otpMainV}>
              <Text style={[styles.otpMainText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Please enter the 4 digit code sent to your email')}</Text>
            </View>

         

              <TouchableOpacity testID="btn_VarifyOTP" style={styles.btnEmailButton} >
                <Text style={[styles.emailButtonText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Submit')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: "#fff"
  },
  safeareaview:{flex:0},
  btn_backArrow: {
    width: windowWidth * 7 / 100,
    height: windowWidth * 7 / 100,
    alignSelf: 'center',
    padding: 5
  },
  img_backArrow: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  btnEmailButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*54/100,
    justifyContent:'center',
    alignSelf:'center'
  },
  emailButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  txt_otp_input: {
    width: 60,
    borderRadius: 5,
    height: 60,
    fontFamily:'Lato-Bold',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#F8F8F8',
    color:'#375280',
    fontSize:windowWidth*5.5/100
  },
  errorContainerrs: {
    width: 280,
    paddingHorizontal: 0,
    alignSelf: 'center',
  },
  txt_ErrorMsg: {
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: "flex-end"
  },
  txtRemainingTime: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    textAlignVertical: 'center'
  },
  btn_resend: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt_resendOTP: {
    textAlignVertical: 'center'
    , fontWeight: "700",
    textDecorationLine: "underline"
  },
  login_btn_after: {
    backgroundColor: '#0061A7',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: windowWidth * 10 / 100
  },
  resendButtonBefore: {
    color: '#8C8C8C'
  },
  resendButtonAfter: {
    color: '#375280',
    fontFamily:'Lato-Bold'
  },
  headers:{
    width: windowWidth * 90 / 100, 
    alignSelf: 'center', 
    marginTop: windowWidth * 5 / 100,
    flexDirection:'row'
  },
  headerBackTouchbtn:{
    width: windowWidth * 9 / 100, 
    height: windowWidth * 9 / 100
  },
  backImg:{
    width: windowWidth * 7 / 100, 
    height: windowWidth * 7 / 100
  },
  headerTitle:{
    marginLeft:windowWidth*20/100
  },
  headerTitleText:{
    color:'#375280',
    fontFamily:'Avenir-Heavy',
    fontSize:windowWidth*5/100
  },
  otpMainV:{
    width: windowWidth * 90 / 100, 
    alignSelf: 'center', 
    marginTop: windowHeight * 22 / 100
  },
  otpMainText:{
    color:'#375280',
    fontFamily:'Avenir-Heavy',
    fontSize:windowWidth*4.2/100,
    textAlign:'center'
  },
  otpMainTextInputviews:{
    flex: 1, 
    padding: 20
  },
  otpTextInputContainerrs:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  timeRemainingMainView:{
    alignSelf: 'center', 
    marginTop: windowWidth * 3 / 100
  },
  timeRemainingText:{
    color: '#0061A7', 
    fontWeight: 'bold', 
    fontSize: windowWidth * 3.7 / 100, 
    textAlign: 'center'
  },
  didnotReceivedText:{
    textAlign: 'center', 
    fontSize: windowWidth * 3.7 / 100, 
    color: '#8C8C8C',
    marginTop:windowWidth*1/100
  }
});
// Customizable Area End
