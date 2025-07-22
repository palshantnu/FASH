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
  Keyboard,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,addressActive,gpsIcon,storeTwoStepAr } from "./assets";

import CustomformCreateStoreAddressController, { Props } from "./CustomformCreateStoreAddressController";
import globalStyle from "../../../components/src/GlobalStyle"
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
// Customizable Area End

export default class CustomformCreateStoreAddress extends CustomformCreateStoreAddressController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView behavior={this.isPlatformiOS() ? "padding" : undefined} style={styles.keyboardPadding}>
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        <View style={[styles.containerViewStoreAdd,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewStoreAdd,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackStoreAdd" style={styles.backTouchStoreAdd} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconStoreAdd,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleStoreAdd}>{i18n.t('createAStoreText')}</Text>
                </View>
                <View style={styles.extraViewStoreAdd}>
                </View>
            </View>

            <View style={styles.headerImage}>
                <Image source={this.state.languageGet === 'en' ? addressActive:storeTwoStepAr} resizeMode="contain" style={styles.headerImage}></Image>
            </View>
        </View>
        
            <ScrollView style={styles.scrollMainView} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('addressStarText')}</Text>
                    <View style={[styles.addressView,{borderWidth: this.checkBoarderWidth(this.state.addressError),
                                borderColor: this.checkBoarderColor(this.state.addressError),flexDirection:FlexConditionManage(i18n.language)}]}>
                        <TextInput
                            testID={"txt_enter_address"}
                            onChangeText={(txt) => {
                                this.setState({ address: txt,addressError:false });
                            }}
                            keyboardType="default"
                            returnKeyLabel="done"
                            returnKeyType="done"
                            editable={false}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                            placeholder={i18n.t('enterYourStoreAddress')}
                            placeholderTextColor={'#9A9A9A'}
                            autoFocus={true}
                            style={[styles.addressTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                            value={this.state.address}
                        />
                        <TouchableOpacity testID="btnRedirectGps" style={styles.gpsTouch} onPress={()=>{this.btnRedirectGps()}}>
                            <Image source={gpsIcon} style={styles.gpsIcon}></Image>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.addressError &&
                        <View style={styles.errorView}>
                        <Text style={[styles.errorTextStore,{textAlign:TextAlignManage(i18n.language)}]}>
                            {i18n.t('pleaseEnterAddressError')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)}, styles.storelabelText]}>
                        {i18n.t('areaStarText')}</Text>
                    <TextInput
                        testID={"txt_enter_area"}
                        onChangeText={(txt) => {
                            this.setState({ area: txt,areaError:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreArea')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.areaError),
                            borderColor: this.checkBoarderColor(this.state.areaError),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.area}
                    />
                    {
                        this.state.areaError &&
                        <View style={styles.errorView}>
                        <Text style={[styles.errorTextStore,
                            { textAlign:TextAlignManage(i18n.language)}
                            ]}>{i18n.t('pleaseEnterStoreAreaError')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)},
                    styles.storelabelText]}>{i18n.t('areaArabic')}</Text>
                    <TextInput
                        testID={"txt_enter_area_arabic"}
                        onChangeText={(txt) => {
                            this.setState({ areaArabic: txt,areaErrorArabic:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreArea')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.areaErrorArabic),
                            borderColor: this.checkBoarderColor(this.state.areaErrorArabic),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.areaArabic}
                    />
                    {
                        this.state.areaErrorArabic &&
                        <View style={styles.errorView}>
                        <Text style={[styles.errorTextStore,{ textAlign:TextAlignManage(i18n.language)}]}>
                            {i18n.t('pleaseEnterStoreAreaError')}</Text>
                        </View>
                    }
                </View>
                <View style={styles.storeCreateMainView}>
                    <Text style={
                        [ styles.storelabelText,{textAlign:TextAlignManage(i18n.language)} ]
                        }>{i18n.t('blockStarText')}</Text>
                    <TextInput
                        testID={"txt_enter_store_block"}
                        onChangeText={(txt) => {
                            this.setState({ blockStore: txt,blockStoreError:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreBlock')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.blockStoreError),
                            borderColor: this.checkBoarderColor(this.state.blockStoreError),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.blockStore}
                    />
                    {
                        this.state.blockStoreError &&
                        <View style={styles.errorView}>
                        <Text style={[styles.errorTextStore,{textAlign:TextAlignManage(i18n.language) }]}>
                            {i18n.t('pleaseEnterYourStoreBlock')}
                            </Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[ 
                        styles.storelabelText,
                        {textAlign:TextAlignManage(i18n.language)} 
                        ]}>{i18n.t('blockArabic')}</Text>
                    <TextInput
                        testID={"txt_arabic_store_block"}
                        onChangeText={(txt) => {
                            this.setState({ blockStoreArabic: txt,blockStoreErrorArabic:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreBlock')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.blockStoreErrorArabic),
                            borderColor: this.checkBoarderColor(this.state.blockStoreErrorArabic),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.blockStoreArabic}
                    />
                    {
                        this.state.blockStoreErrorArabic &&
                        <View style={styles.errorView}>

                        <Text 
                        style={[styles.errorTextStore,{textAlign:TextAlignManage(i18n.language) }]}
                        >{i18n.t('pleaseEnterYourStoreBlock')}
                        </Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.storelabelText]}>{i18n.t('mallNameText')}</Text>
                    <TextInput
                        testID={"txt_enter_mall_name"}
                        onChangeText={(txt) => {
                            this.setState({ mallName: txt,mallNameError:false });
                        }}
                        keyboardType="default"
                        maxLength={70}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourMallName')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[styles.storeTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={this.state.mallName}
                    />
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.storelabelText]}>{i18n.t('mallNameArabicText')}</Text>
                    <TextInput
                        testID={"txt_arabic_mall_name"}
                        onChangeText={(txt) => {
                            this.setState({ mallNameArabic: txt });
                        }}
                        keyboardType="default"
                        maxLength={70}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourMallName')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[styles.storeTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={this.state.mallNameArabic}
                    />
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{ textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('floorText')}</Text>
                    <TextInput
                        testID={"txt_enter_floor"}
                        onChangeText={(txt) => {
                            this.setState({ floor: txt});
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourFloorName')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[styles.storeTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={this.state.floor}
                    />
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{ textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('floorArabicText')}</Text>
                    <TextInput
                        testID={"txt_arabic_enter_floor"}
                        onChangeText={(txt) => {
                            this.setState({ floorArabic: txt});
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourFloorName')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[styles.storeTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={this.state.floorArabic}
                    />
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('unitNumberText')}</Text>
                    <TextInput
                        testID={"txt_enter_store_unit"}
                        onChangeText={(txt) => {
                            this.setState({ unitNumber: txt });
                        }}
                        keyboardType="number-pad"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourUnitNumber')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[styles.storeTextInput,{textAlign:TextAlignManage(i18n.language)}]}
                        value={this.state.unitNumber}
                    />
                </View>
                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}
                    >
                        {i18n.t('cityText')}
                    </Text>
                    <TextInput
                        testID={"txt_enter_store_city"}
                        onChangeText={(txt) => {
                            this.setState({ city: txt,cityError:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreCity')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.cityError),
                            borderColor: this.checkBoarderColor(this.state.cityError),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.city}
                    />
                    {
                        this.state.cityError &&
                        <View style={styles.errorView}>
                        <Text style={[
                            {textAlign:TextAlignManage(i18n.language)},
                            styles.errorTextStore]}>{i18n.t('pleaseEnterStoreCity')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,
                        {textAlign:TextAlignManage(i18n.language)}
                        ]}>{i18n.t('cityArabicText')}</Text>
                    <TextInput
                        testID={"txt_arabic_store_city"}
                        onChangeText={(txt) => {
                            this.setState({ cityArabic: txt,cityErrorArabic:false });
                        }}
                        keyboardType="default"
                        maxLength={50}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreCity')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.cityErrorArabic),
                            borderColor: this.checkBoarderColor(this.state.cityErrorArabic),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.cityArabic}
                    />
                    {
                        this.state.cityErrorArabic &&
                        <View style={styles.errorView}>
                        <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextStore]}>
                            {i18n.t('pleaseEnterStoreCity')}
                        </Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('zipcodeTextStar')}</Text>
                    <TextInput
                        testID={"txt_enter_zip_code"}
                        onChangeText={(txt) => {
                            this.setState({ zipcode: txt,zipcodeError:false });
                        }}
                        keyboardType="number-pad"
                        maxLength={6}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('enterYourStoreZipCode')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.zipcodeError),
                            borderColor: this.checkBoarderColor(this.state.zipcodeError),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.zipcode}
                    />
                    {
                        this.state.zipcodeError &&
                        <View style={styles.errorView}>
                        <Text style={[styles.errorTextStore,{ textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('pleaseEnterStoreZipcodeError')}</Text>
                        </View>
                    }
                </View>
                <View style={styles.storeCreateMainView}>
                    <Text 
                    style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}
                    >{i18n.t('instructionsDriverReachStore')}
                    </Text>
                    <TextInput
                        testID={"txt_enter_driver_reach"}
                        onChangeText={(txt) => {
                            this.setState({ driverReach: txt,driverReachError:false });
                        }}
                        keyboardType="default"
                        maxLength={70}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('instructionPlaceholderText')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.driverReachError),
                            borderColor: this.checkBoarderColor(this.state.driverReachError),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.driverReach}
                    />
                    {
                        this.state.driverReachError &&
                        <View style={styles.errorView}>
                        <Text 
                        style={[ styles.errorTextStore ,{ textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('pleaseEnterReachDriverError')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                    <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('instructionsDriverReachStoreArabic')}</Text>
                    <TextInput
                        testID={"txt_arabic_driver_reach"}
                        onChangeText={(txt) => {
                            this.setState({ driverReachArabic: txt,driverReachErrorArabic:false });
                        }}
                        keyboardType="default"
                        maxLength={70}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        placeholder={i18n.t('instructionPlaceholderText')}
                        placeholderTextColor={'#9A9A9A'}
                        style={[{
                            borderWidth: this.checkBoarderWidth(this.state.driverReachErrorArabic),
                            borderColor: this.checkBoarderColor(this.state.driverReachErrorArabic),textAlign:TextAlignManage(i18n.language)},styles.storeTextInput]}
                        value={this.state.driverReachArabic}
                    />
                    {
                        this.state.driverReachErrorArabic &&
                        <View style={styles.errorView}>
                        <Text style={[{ textAlign:TextAlignManage(i18n.language) },
                            styles.errorTextStore]}>{i18n.t('pleaseEnterReachDriverError')}</Text>
                        </View>
                    }
                </View>

                <View style={styles.storeCreateMainView}>
                  <Text style={[styles.storelabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('ContactNumber')}</Text>
                  <MobileWithCountryCodesInput
                    optionsList={this.state.countryList}
                    selectedIndex={this.state.selectedCodeIndex}
                    onSelect={(index, { numeric_code }) =>
                      this.setState({
                        selectedCodeIndex: index,
                        dropdownOpen: false,
                        selectedCountryCode: numeric_code
                      })
                    }
                    inputValue={this.state.phoneNumber}
                    placeHolderInput={i18n.t('enterYourContactNumber')}
                    placeHolderInputColor='#9A9A9A'
                    onValueChange={txt =>
                      this.setState({ phoneNumber: txt, phoneNumberError: false })
                    }
                    open={this.state.dropdownOpen}
                    toggleOpen={c => this.setState({ dropdownOpen: !c })}
                    hasError={this.state.phoneNumberError}
                  />
                  {this.state.phoneNumberError && (
                    <View style={styles.errorView}>
                      <Text style={[styles.errorTextStore,{textAlign:TextAlignManage(i18n.language)}]}>
                      {
                        this.state.formError
                        ? i18n.t('enterValidContactError')
                        : i18n.t('pleaseContactNumberError')
                      }
                      </Text>
                    </View>
                  )}
                </View>

                <View style={[styles.btnContactMargin,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnAddressBack" style={styles.btnCancelBackButtonAdd} onPress={()=>{this.props.navigation.goBack()}}>
                        <Text style={styles.cancelBackButtonTextAdd}>{i18n.t('Back')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID="btnStoreTimingRedirect" style={styles.btnNextButtonAddStore} onPress={()=>{this.nextBtnTimingRedirection()}}>
                    <Text style={styles.contactButtonNextText}>{i18n.t('Next')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeViewContainer:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerViewStoreAdd:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewStoreAdd:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchStoreAdd:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconStoreAdd:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleStoreAdd:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewStoreAdd:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  btnContactMargin:{
    marginTop:windowWidth*8/100,
    justifyContent:'space-between',
    paddingBottom:windowWidth*8/100
  },
  btnCancelBackButtonAdd:{
    width:windowWidth*42/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  cancelBackButtonTextAdd:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  btnNextButtonAddStore:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*42/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center'
  },
  contactButtonNextText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  storeCreateMainView:{
    marginTop:windowWidth*4/100
  },
  storelabelText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  storelabelTextArabic:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  addressTextInput:{
    width: (windowWidth * 80) / 100,
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  storeTextInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorTextStore:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  errorView:{
    marginTop:windowWidth*1/100
  },
  gpsTouch:{
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
    right: 5,
    position: 'absolute',
    marginTop: windowWidth * 6.5 / 100
  },
  themeColor:{
    color:'#375280'
  },
  selectedStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'white',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth:1,
    borderColor:'#CCBEB1'
  },
  textSelectedStyle: {
    fontSize: 16,
    color:'#375280'
  },
  addressView:{
    width:windowWidth*90/100,
    backgroundColor:'#F8F8F8',
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    alignItems:'center'
  },
  gpsIcon:{
    width:windowWidth*5/100,
    height:windowWidth*5/100,
    marginTop:windowWidth*1/100
  },
  keyboardPadding: { flex: 1 },
  dropdownIconCssAdd:{
    position:'absolute',
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    right:5
  },
  headerImage:{
    width:windowWidth*90/100,
    height:windowHeight*10/100
  },
  scrollMainView:{
    width:windowWidth*90/100,
    alignSelf:'center'
  }
});
// Customizable Area End