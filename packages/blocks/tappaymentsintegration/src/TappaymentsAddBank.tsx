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
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import TappaymentsAddBankController, { Props } from "./TappaymentsAddBankController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class TappaymentsAddBank extends TappaymentsAddBankController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerDriver}>
            <SafeAreaView style={styles.safeContainerBank}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerDriverViewAddBank,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewAddBankDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackAddBank" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddBankDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddBankDriver}>{i18n.t('bankAccountText') as string}</Text>
                </View>
                <View style={styles.filterExtraTouchBank}>
                </View>
              </View>
              
              <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPaddingManage}>

              <View style={styles.bankAddMainViewDriver}>
                <Text style={[styles.addBankLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('accountHolderNameStarText') as string}</Text>
                <TextInput
                  testID={"txt_enter_account_name"}
                  onChangeText={(txtName) => {
                      this.onAccountHolderNameChange(txtName)
                  }}
                  keyboardType="default"
                  maxLength={70}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('enterAccountHolderPlaceholderText')}
                  placeholderTextColor={'#9A9A9A'}
                  style={[{
                      borderWidth: this.state.accountHolderNameError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.accountHolderNameError),textAlign:TextAlignManage(i18n.language)},styles.addBankTextInputDriver]}
                  value={this.state.accountHolderName}
                />
                {
                  this.state.accountHolderNameError &&
                  <View style={styles.errorViewBankDriver}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextBankDriver]}>{i18n.t('pleaseEnterAccountHolderErrorText') as string}</Text>
                  </View>
                }
              </View>

                <View style={styles.bankAddMainViewDriver}>
                    <Text style={[styles.addBankLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('IBANNumber') as string}</Text>
                    <TextInput
                    testID={"txt_enter_iban_number"}
                    onChangeText={(txtIbanNumber) => {
                        this.onIbanNumberChange(txtIbanNumber)
                    }}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t('EnterIBANNumber')}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.state.IbanNumberError ? 1 : 0,
                        borderColor: this.checkBoarderColor(this.state.IbanNumberError),textAlign:TextAlignManage(i18n.language)},styles.addBankTextInputDriver]}
                    value={this.state.IbanNumber}
                    />
                    {
                    this.state.IbanNumberError &&
                    <View style={styles.errorViewBankDriver}>
                        <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextBankDriver]}>{i18n.t('EnterIBANNumberError') as string}</Text>
                    </View>
                    }
                </View>

                <View style={styles.bankAddMainViewDriver}>
                    <Text style={[styles.addBankLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('accountNumberStarText') as string}</Text>
                    <TextInput
                    testID={"txt_enter_account_number"}
                    onChangeText={(txtAccountNumber) => {
                        this.onAccountNumberChange(txtAccountNumber)
                    }}
                    keyboardType="number-pad"
                    maxLength={30}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t('accountNumberPlaceholderText')}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.state.accountNumberError ? 1 : 0,
                        borderColor: this.checkBoarderColor(this.state.accountNumberError),textAlign:TextAlignManage(i18n.language)},styles.addBankTextInputDriver]}
                    value={this.state.accountNumber}
                    />
                    {
                    this.state.accountNumberError &&
                    <View style={styles.errorViewBankDriver}>
                        <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextBankDriver]}>{i18n.t('pleaseEnterAccountNumberErrorText') as string}</Text>
                    </View>
                    }
                </View>


              <View style={styles.btnBankMarginDriver}>
                <TouchableOpacity testID="btnAddBankAccount" style={styles.btnBankButtonDriver} onPress={()=>{this.addBankAccount()}}>
                  <Text style={styles.submitButtonTextDriver}>{i18n.t('Submit') as string}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

        </View>
      //Merge Engine End DefaultContainerDriver
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerDriver: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainerBank:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerDriverViewAddBank:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewAddBankDriver:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchAddBankDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCssAddBankDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleAddBankDriver:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterExtraTouchBank:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  bankAddMainViewDriver:{
    marginTop:windowWidth*5/100
  },
  addBankLabelTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  addBankTextInputDriver:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorViewBankDriver:{
    marginTop:windowWidth*1/100
  },
  errorTextBankDriver:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  btnBankMarginDriver:{
    marginTop:windowWidth*5/100
  },
  btnBankButtonDriver:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*8/100,
    justifyContent:'center'
  },
  submitButtonTextDriver:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
  },
  scrollPaddingManage:{
    paddingBottom:150
  }
});
