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

import CustomformDriverAgencyInfoController, { Props } from "./CustomformDriverAgencyInfoController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class CustomformDriverAgencyInfo extends CustomformDriverAgencyInfoController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerDriver}>
            <SafeAreaView style={styles.safeContainerDriver}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerDriverViewAddContact,globalStyle.headerMarginManage]}>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewAddContactDriver]}>
                <TouchableOpacity testID="btnBackAddDriverContact" style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backTouchAddContactDriver]} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={styles.backIconCssAddContactDriver}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddContactDriver}>{i18n.t('agencyInformationText')}</Text>
                </View>
                <View style={styles.filterExtraTouchDriver}>
                </View>
              </View>
              
              <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPaddingManage}>

              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('agencyNameStarText')}</Text>
                <TextInput
                  testID={"txt_enter_agenecy_name"}
                  onChangeText={(txtName) => {
                      this.onAgencyNameChange(txtName)
                  }}
                  keyboardType="default"
                  maxLength={70}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('agencyNamePlaceholderText')}
                  placeholderTextColor={'#9A9A9A'}
                  style={[{
                      borderWidth: this.state.nameError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.nameError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInputDriver]}
                  value={this.state.agencyName}
                />
                {
                  this.state.nameError &&
                  <View style={styles.errorViewAgencyDriver}>
                    <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterAgenecyErrorText')}</Text>
                  </View>
                }
              </View>

                <View style={styles.contactUsAddMainViewDriver}>
                    <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('agencyConactNumberText')}</Text>
                    <MobileWithCountryCodesInput
                      optionsList={this.state.countryList}
                      inputValue={this.state.phoneNumber}
                      onValueChange={this.handleMobileChange}
                      open={this.state.dropdownOpen}
                      toggleOpen={this.toggleCountryDropdown}
                      selectedIndex={this.state.selectedCodeIndex}
                      onSelect={this.handleCountrySelect}
                      hasError={this.state.phoneNumberError}
                      placeHolderInput={i18n.t('agnecyContactPlaceholder')}
                      placeHolderInputColor="#9A9A9A"
                    />
                    {
                    this.state.phoneNumberError &&
                    <View style={styles.errorViewAgencyDriver}>
                        <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterContactError')}</Text>
                    </View>
                    }
                </View>

                <View style={styles.contactUsAddMainViewDriver}>
                    <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('agencyAddressText')}</Text>
                    <TextInput
                    testID={"txt_enter_agency_address"}
                    onChangeText={(txtAddress) => {
                        this.onAddressChange(txtAddress)
                    }}
                    keyboardType="default"
                    maxLength={100}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t('agencyAddressPlaceholderText')}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.state.addressError ? 1 : 0,
                        borderColor: this.checkBoarderColor(this.state.addressError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInputDriver]}
                    value={this.state.address}
                    />
                    {
                    this.state.addressError &&
                    <View style={styles.errorViewAgencyDriver}>
                        <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterAgencyAddError')}</Text>
                    </View>
                    }
                </View>

                <View style={[styles.viewFlexManageAgency,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <View style={styles.contactUsAddMainViewDriver}>
                        <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('areaStarText')}</Text>
                        <TextInput
                        testID={"txt_enter_area_agency"}
                        onChangeText={(txtArea) => {
                            this.onAreaChange(txtArea)
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('areaPlaceholderText')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.state.areaError ? 1 : 0,
                            borderColor: this.checkBoarderColor(this.state.areaError),textAlign:TextAlignManage(i18n.language)},styles.agencySplitTextInputDriver]}
                        value={this.state.area}
                        />
                        {
                        this.state.areaError &&
                        <View style={styles.errorViewAgencyDriver}>
                            <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterAreaErrorText')}</Text>
                        </View>
                        }
                    </View>
                    <View style={styles.contactUsAddMainViewDriver}>
                        <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('blockStarText')}</Text>
                        <TextInput
                        testID={"txt_enter_block_agency"}
                        onChangeText={(txtBlock) => {
                            this.onBlockChange(txtBlock)
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('blockPlaceholderText')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.state.blockError ? 1 : 0,
                            borderColor: this.checkBoarderColor(this.state.blockError),textAlign:TextAlignManage(i18n.language)},styles.agencySplitTextInputDriver]}
                        value={this.state.block}
                        />
                        {
                        this.state.blockError &&
                        <View style={styles.errorViewAgencyDriver}>
                            <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterBlockErrorText')}</Text>
                        </View>
                        }
                    </View>
                </View>

                <View style={styles.contactUsAddMainViewDriver}>
                    <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('hourseBuildingStarText')}</Text>
                    <TextInput
                    testID={"txt_enter_house_number_agency"}
                    onChangeText={(txtHouseNumber) => {
                        this.onHouseNumberChange(txtHouseNumber)
                    }}
                    keyboardType="default"
                    maxLength={100}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t('housePlaceholderText')}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.state.houseNumberError ? 1 : 0,
                        borderColor: this.checkBoarderColor(this.state.houseNumberError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInputDriver]}
                    value={this.state.houseNumber}
                    />
                    {
                    this.state.houseNumberError &&
                    <View style={styles.errorViewAgencyDriver}>
                        <Text style={[styles.errorTextAgencyDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterHouseErrorText')}</Text>
                    </View>
                    }
                </View>

                <View style={styles.contactUsAddMainViewDriver}>
                    <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('zipcodeText')}</Text>
                    <TextInput
                    testID={"txt_enter_zipcode"}
                    onChangeText={(txtZipcode) => {
                        this.onzipcodeChange(txtZipcode)
                    }}
                    keyboardType="default"
                    maxLength={6}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t('zipcodePlaceholderText')}
                    placeholderTextColor={'#9A9A9A'}
                    style={[styles.addContactTextInputDriver,{textAlign:TextAlignManage(i18n.language)}]}
                    value={this.state.zipcode}
                    />
                </View>


              <View style={styles.btnContactMarginDriver}>
                <TouchableOpacity testID="btnAgencyInformation" style={styles.btnContactButtonDriver} onPress={()=>{this.agencyInformationSubmitDriver()}}>
                  <Text style={styles.contactButtonTextDriver}>{i18n.t('Submit')}</Text>
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
  safeContainerDriver:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerDriverViewAddContact:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewAddContactDriver:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchAddContactDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCssAddContactDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleAddContactDriver:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterExtraTouchDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  contactUsAddMainViewDriver:{
    marginTop:windowWidth*5/100
  },
  addContactLabelTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  addContactTextInputDriver:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  agencySplitTextInputDriver:{
    width: (windowWidth * 43) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorViewAgencyDriver:{
    marginTop:windowWidth*1/100
  },
  errorTextAgencyDriver:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  btnContactMarginDriver:{
    marginTop:windowWidth*5/100
  },
  btnContactButtonDriver:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*8/100,
    justifyContent:'center'
  },
  contactButtonTextDriver:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
  },
  scrollPaddingManage:{
    paddingBottom:150
  },
  viewFlexManageAgency:{
    justifyContent:'space-between'
  }
});
