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
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import SocialMediaAccountOtpVerificationController, { Props } from "./SocialMediaAccountOtpVerificationController";

export default class SocialMediaAccountOtpVerification extends SocialMediaAccountOtpVerificationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
          <View style={styles.container}>
            <SafeAreaView style={{flex:0}}/>
            <StatusBar barStyle="dark-content" backgroundColor={"#fff"} hidden={false} translucent={false} networkActivityIndicatorVisible={true}/>
            {this.state.loading && <CustomLoader />}
            <ScrollView bounces={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            <View style={[styles.header,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="button_go_back" style={styles.headerBackTouchSocial} onPress={() => { this.props.navigation.goBack() }}>
                <Image resizeMode="contain" style={[styles.headerBackImageSocial,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]  }]} source={backIcon}></Image>
              </TouchableOpacity>

              <View style={styles.headerTitleViewSocial}>
                <Text style={styles.headerTitleTextSocial}>{i18n.t('otp_verification')}</Text>
              </View>
            </View>

            <View style={styles.otpMainViewSocial}>
              <Text style={styles.otpMainTextSocial}>{i18n.t("please_enter_the_4_digit_code_sent_to_your_mobile_number")} {this.replaceNumberSocial(this.state.contact_number)}</Text>
            </View>

            <View style={styles.otpMainTextSocialInputView}>
              <View>
                <View
                  style={styles.otpTextInputContainerSocial}
                >
                  {this.state.OtpArray.map((item, index) => {
                    return (
                    <TextInput
                    testID={"txt_input_otp" + index.toString()}
                    key={index.toString()}
                    maxLength={1}
                    ref={ref => this.otpTextInput[index] = ref}
                    textContentType="oneTimeCode"
                    onFocus={() => this.setState({ showErrorMessage: false })}
                    value={item}
                    keyboardType="numeric"
                    onKeyPress={e => this.prevoiusFocusSocial(e.nativeEvent.key, index)}
                    onChangeText={text => this.changeFocusSocial(text, index)}
                    style={styles.txt_otp_inputSocial}
                  ></TextInput>
                    )
                  })
                  }
                </View>
                <View style={styles.errorContainerSocial}>
                  {
                    this.state.showErrorMessage && <Text style={styles.txt_ErrorMsgSocial}>
                      * {this.state.showErroMessageString}</Text>
                  }
                </View>
              </View>

              <View style={styles.timeRemainingMainViewSocial}>
                <Text style={styles.timeRemainingTextSocial}>{i18n.t('TimeRemaining')} {this.state.remainingTime}</Text>

                <Text style={styles.didnotReceivedTextSocial}>{i18n.t('notReceivedCode')} <Text testID="btn_resendOtp" onPress={() => this.resendOTP()} style={[this.state.remainingTime == '0:00' ? styles.resendButtonAfterSocial : styles.resendButtonBeforeSocial]}>{i18n.t('ResendCode')}</Text></Text>
              </View>
            </View>

              <TouchableOpacity testID="btn_VarifyOTP" style={styles.btnEmailButtonSocial} onPress={()=>{this.submitOtp()}}>
                <Text style={styles.emailButtonTextSocial}>{i18n.t('login')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
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
  btnEmailButtonSocial:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*54/100,
    justifyContent:'center',
    alignSelf:'center'
  },
  emailButtonTextSocial:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  txt_otp_inputSocial: {
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
    color:'#000000',
    fontSize:windowWidth*5.5/100
  },
  errorContainerSocial: {
    width: 280,
    paddingHorizontal: 0,
    alignSelf: 'center',
  },
  txt_ErrorMsgSocial: {
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  resendButtonBeforeSocial: {
    color: '#8C8C8C'
  },
  resendButtonAfterSocial: {
    color: '#375280',
    fontFamily:'Lato-Bold'
  },
  header:{
    width: windowWidth * 90 / 100, 
    alignSelf: 'center', 
    marginTop: windowWidth * 5 / 100,
  },
  headerBackTouchSocial:{
    width: windowWidth * 7 / 100, 
    height: windowWidth * 7 / 100
  },
  headerBackImageSocial:{
    width: windowWidth * 5 / 100, 
    height: windowWidth * 5 / 100
  },
  headerTitleViewSocial:{
    marginLeft:windowWidth*20/100
  },
  headerTitleTextSocial:{
    color:'#375280',
    fontFamily:'Avenir-Heavy',
    fontSize:windowWidth*5/100
  },
  otpMainViewSocial:{
    width: windowWidth * 90 / 100, 
    alignSelf: 'center', 
    marginTop: windowHeight * 22 / 100
  },
  otpMainTextSocial:{
    color:'#375280',
    fontFamily:'Avenir-Heavy',
    fontSize:windowWidth*4.2/100,
    textAlign:'center'
  },
  otpMainTextSocialInputView:{
    flex: 1, 
    padding: 20
  },
  otpTextInputContainerSocial:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  timeRemainingMainViewSocial:{
    alignSelf: 'center', 
    marginTop: windowWidth * 3 / 100
  },
  timeRemainingTextSocial:{
    color: '#0061A7', 
    fontWeight: 'bold', 
    fontSize: windowWidth * 3.7 / 100, 
    textAlign: 'center'
  },
  didnotReceivedTextSocial:{
    textAlign: 'center', 
    fontSize: windowWidth * 3.7 / 100, 
    color: '#8C8C8C',
    marginTop:windowWidth*1/100
  }
});
// Customizable Area End
