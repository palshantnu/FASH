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
  Modal,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,editIcon,gpsIcon } from "./assets";

import CustomformEditStoreDetailsController, { Props } from "./CustomformEditStoreDetailsController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import MobileWithCountryCodesInput from "../../../components/src/MobileWithCountryCodesInput";
import i18n from "../../../components/src/i18n/i18n.config";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class CustomformEditStoreDetails extends CustomformEditStoreDetailsController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderStoreDetails = ()=>{
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:windowWidth*50/100}}>
        <View>
            <View>
            <View style={styles.uploadStoreImageView}>
            <Image source={{uri:this.state.selectImage}} style={styles.uploadStoreImageView}></Image>
            <TouchableOpacity testID="btnEditIcon" onPress={()=>{this.setState({mediamodal:true})}} style={styles.editIconTouch}>
                <Image source={editIcon} style={[styles.editIconCss, { direction : FlatListRowManage(i18n.language) }]}></Image>
            </TouchableOpacity>
            </View>

            {
                this.state.selectImageError &&
                <View style={styles.errorView}>
                <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseSelectStoreImage')}</Text>
                </View>
            }
            </View>

            <View style={styles.storeCreateMainView}>
            <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('storeNameStarText')}</Text>
            <TextInput
                testID={"txt_enter_store_name"}
                onChangeText={(txt) => {
                    this.setState({ storeName: txt,storeError:false });
                }}
                keyboardType="default"
                maxLength={70}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
                placeholder={i18n.t('enterYourStoreName')}
                placeholderTextColor={'#9A9A9A'}
                style={[{ direction : FlatListRowManage(i18n.language)},{
                    borderWidth: this.state.storeError ? 1 : 0,
                    textAlign: TextAlignManage(i18n.language),
                    borderColor: this.checkBoarderColor(this.state.storeError)},styles.emailTextInput]}
                value={this.state.storeName}
            />
            {
                this.state.storeError &&
                <View style={styles.errorView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.errorText]}>{this.state.storeNameErrorMessage}</Text>
                </View>
            }
            </View>

            <View style={styles.storeCreateMainView}>
            <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.labelText]}>{i18n.t('storeNameArabicText')}</Text>
            <TextInput
                testID={"txt_edit_ar_store_name"}
                onChangeText={(txt) => {
                    this.setState({ storeNameEditArabic: txt,storeArabicError:false });
                }}
                keyboardType="default"
                maxLength={70}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
                placeholder={i18n.t('enterYourStoreName')}
                placeholderTextColor={'#9A9A9A'}
                style={[{ direction : FlatListRowManage(i18n.language)},{
                    borderWidth: this.state.storeArabicError ? 1 : 0,
                    textAlign: TextAlignManage(i18n.language),
                    borderColor: this.checkBoarderColor(this.state.storeArabicError)},styles.emailTextInput]}
                value={this.state.storeNameEditArabic}
            />
            {
                this.state.storeArabicError &&
                <View style={styles.errorView}>
                <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>{this.state.storeNameErrorMessage}</Text>
                </View>
            }
            </View>

            <View style={styles.storeDesMainView}>
            <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('storeDescriptionStarText')}</Text>
            <TextInput
                testID={"txt_enter_store_description"}
                onChangeText={(txt) => {
                    this.setState({ storeDescription: txt,storeDescriptionError:false });
                }}
                keyboardType="default"
                maxLength={250}
                returnKeyLabel="done"
                returnKeyType="done"
                multiline={true}
                textAlignVertical={"top"}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
                placeholder={i18n.t('enterYourStoreDesText')}
                placeholderTextColor={'#9A9A9A'}
                style={[{
                    textAlign: TextAlignManage(i18n.language),
                    borderWidth: this.state.storeDescriptionError ? 1 : 0,
                    borderColor: this.checkBoarderColor(this.state.storeDescriptionError)},styles.storeDescriptionInput,
                    { direction : FlatListRowManage(i18n.language)}
                  ]}
                value={this.state.storeDescription}
            />
            {
                this.state.storeDescriptionError &&
                <View style={styles.errorView}>
                <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('pleaseEnterStoreDesText')}</Text>
                </View>
            }
            </View>

            <View style={styles.storeDesMainView}>
            <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('storeDescriptionArabicStarText')}</Text>
            <TextInput
                testID={"txt_edit_ar_store_description"}
                onChangeText={(txt) => {
                    this.setState({ storeDescriptionEditArabic: txt,storeDesEditArabicError:false });
                }}
                keyboardType="default"
                maxLength={250}
                returnKeyLabel="done"
                returnKeyType="done"
                multiline={true}
                textAlignVertical={"top"}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
                placeholder={i18n.t('enterYourStoreDesText')}
                placeholderTextColor={'#9A9A9A'}
                style={[{
                    textAlign: TextAlignManage(i18n.language),
                    borderWidth: this.state.storeDesEditArabicError ? 1 : 0,
                    borderColor: this.checkBoarderColor(this.state.storeDesEditArabicError)},styles.storeDescriptionInput,
                    { direction : FlatListRowManage(i18n.language)}
                  ]}
                value={this.state.storeDescriptionEditArabic}
            />
            {
                this.state.storeDesEditArabicError &&
                <View style={styles.errorView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.errorText]}>{i18n.t('pleaseEnterStoreDesText')}</Text>
                </View>
            }
            </View>

        </View>
      </ScrollView>
    )
  }

  renderAddressDetails = ()=>{
    return(
       
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:windowWidth*50/100}}>
            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t('addressStarText')}</Text>
                <View style={[styles.addressView,{borderWidth: this.checkBoarderWidth(this.state.addressError), flexDirection : FlexConditionManage(i18n.language),
                            borderColor: this.checkBoarderColor(this.state.addressError)}]}>
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
                        style={[styles.addressTextInput,
                            { direction : FlatListRowManage(i18n.language)},
                            { textAlign : TextAlignManage(i18n.language)}
                        ]}
                        value={this.state.address}
                    />
                    <TouchableOpacity testID="btnRedirectGps" style={styles.gpsTouch} onPress={()=>{this.btnRedirectGps()}}>
                        <Image source={gpsIcon} style={styles.gpsIcon}></Image>
                    </TouchableOpacity>
                </View>
                {
                    this.state.addressError &&
                    <View style={styles.errorView}>
                    <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>
                      {i18n.t("pleaseEnterAddressError")}
                    </Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={
                  [{textAlign:TextAlignManage(i18n.language) },styles.labelText]
                  }>{i18n.t("areaStarText")}</Text>
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
                    placeholder={i18n.t("enterYourStoreArea")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        textAlign: TextAlignManage(i18n.language),
                        borderWidth: this.checkBoarderWidth(this.state.areaError),
                        borderColor: this.checkBoarderColor(this.state.areaError)},styles.storeTextInput]}
                    value={this.state.area}
                />
                {
                    this.state.areaError &&
                    <View style={styles.errorView}>
                    <Text style={[
                      {textAlign:TextAlignManage(i18n.language) },
                      styles.errorText
                    ]}>{i18n.t("pleaseEnterStoreAreaError")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,
                  {textAlign:TextAlignManage(i18n.language) }]}>{i18n.t("areaArabic")}</Text>
                <TextInput
                    testID={"txt_edit_ar_area"}
                    onChangeText={(txt) => {
                        this.setState({ areaEditArabic: txt,areaEditArabicError:false });
                    }}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("enterYourStoreArea")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        textAlign: TextAlignManage(i18n.language),
                        borderWidth: this.checkBoarderWidth(this.state.areaEditArabicError),
                        borderColor: this.checkBoarderColor(this.state.areaEditArabicError)},styles.storeTextInput]}
                    value={this.state.areaEditArabic}
                />
                {
                    this.state.areaEditArabicError &&
                    <View style={styles.errorView}>
                    <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>
                      {i18n.t("pleaseEnterStoreAreaError")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language) },
                  styles.labelText]}>
                  {i18n.t("blockStarText")}</Text>
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
                    placeholder={i18n.t("enterYourStoreBlock")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.blockStoreError),
                        borderColor: this.checkBoarderColor(this.state.blockStoreError),
                        textAlign : TextAlignManage(i18n.language)
                      },styles.storeTextInput]}
                    value={this.state.blockStore}
                />
                {
                    this.state.blockStoreError &&
                    <View style={styles.errorView}>
                    <Text 
                    style={[{textAlign:TextAlignManage(i18n.language) },styles.errorText]}>
                      {i18n.t("pleaseEnterYourStoreBlock")}
                    </Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t("blockArabic")}</Text>
                <TextInput
                    testID={"txt_edit_ar_store_block"}
                    onChangeText={(txt) => {
                        this.setState({ blockStoreArabic: txt,blockStoreEditArabicError:false });
                    }}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("enterYourStoreBlock")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.blockStoreEditArabicError),
                        borderColor: this.checkBoarderColor(this.state.blockStoreEditArabicError),
                        textAlign : TextAlignManage(i18n.language)
                      },styles.storeTextInput]}
                    value={this.state.blockStoreArabic}
                />
                {
                    this.state.blockStoreEditArabicError &&
                    <View style={styles.errorView}>
                    <Text 
                    style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>
                      {i18n.t("pleaseEnterYourStoreBlock")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={styles.labelText}>{i18n.t("Mall_Name_(Optional)")}</Text>
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
                    placeholder={i18n.t("enterYourMallName")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[styles.storeTextInput, {
                      textAlign: TextAlignManage(i18n.language)
                    }]}
                    value={this.state.mallName}
                />
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>
                  {i18n.t("mallNameArabicText")}</Text>
                <TextInput
                    testID={"txt_edit_ar_mall_name"}
                    onChangeText={(txt) => {
                        this.setState({ mallNameEditArabic: txt});
                    }}
                    keyboardType="default"
                    maxLength={70}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("enterYourMallName")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[styles.storeTextInput, {
                      textAlign: TextAlignManage(i18n.language)
                    }]}
                    value={this.state.mallNameEditArabic}
                />
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.labelText]}>{i18n.t("Floor_(Optional)")}</Text>
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
                    placeholder={i18n.t("enterYourFloorName")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{textAlign : TextAlignManage(i18n.language)}, styles.storeTextInput]}
                    value={this.state.floor}
                />
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("floorArabicText")}</Text>
                <TextInput
                    testID={"txt_edit_ar_floor"}
                    onChangeText={(txt) => {
                        this.setState({ floorEdtiArabic: txt});
                    }}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("enterYourFloorName")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{textAlign : TextAlignManage(i18n.language)}, styles.storeTextInput]}
                    value={this.state.floorEdtiArabic}
                />
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t("unitNumberText")}</Text>
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
                    placeholder={i18n.t("enterYourUnitNumber")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[styles.storeTextInput, {}, {
                      textAlign : TextAlignManage(i18n.language),
                    }]}
                    value={this.state.unitNumber}
                />
            </View>
            <View style={styles.storeCreateMainView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.labelText]}>{i18n.t("cityText")}</Text>
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
                    placeholder={i18n.t("enterYourStoreCity")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.cityError),
                        textAlign : TextAlignManage(i18n.language),
                        borderColor: this.checkBoarderColor(this.state.cityError)},styles.storeTextInput]}
                    value={this.state.city}
                />
                {
                    this.state.cityError &&
                    <View style={styles.errorView}>
                    <Text style={
                      [styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t("pleaseEnterStoreCity")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language) }]}>
                  {i18n.t("cityArabicText")}
                  </Text>
                <TextInput
                    testID={"txt_edit_ar_store_city"}
                    onChangeText={(txt) => {
                        this.setState({ cityEditArabic: txt,cityArabicError:false });
                    }}
                    keyboardType="default"
                    maxLength={50}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("enterYourStoreCity")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.cityArabicError),
                        textAlign : TextAlignManage(i18n.language),
                        borderColor: this.checkBoarderColor(this.state.cityArabicError)},styles.storeTextInput]}
                    value={this.state.cityEditArabic}
                />
                {
                    this.state.cityArabicError &&
                    <View style={styles.errorView}>
                    <Text style={[
                      {textAlign:TextAlignManage(i18n.language) },styles.errorText]
                      }>{i18n.t("pleaseEnterStoreCity")}</Text>
                    </View>
                }
            </View>
            
            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{ textAlign:TextAlignManage(i18n.language)}]}>
                  {i18n.t("zipcodeTextStar")}</Text>
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
                    placeholder={'Enter your store zip code'}
                    placeholderTextColor={'#9A9A9A'}
                    style={[
                      {
                        textAlign : TextAlignManage(i18n.language)
                      },
                      {
                        borderWidth: this.checkBoarderWidth(this.state.zipcodeError),
                        borderColor: this.checkBoarderColor(this.state.zipcodeError)},styles.storeTextInput]}
                    value={this.state.zipcode}
                />
                {
                    this.state.zipcodeError &&
                    <View style={styles.errorView}>
                    <Text style={
                      [styles.errorText,{textAlign:TextAlignManage(i18n.language) }]
                      }>{i18n.t("pleaseEnterStoreZipcodeError")}</Text>
                    </View>
                }
            </View>
            <View style={styles.storeCreateMainView}>
                <Text 
                style={[{textAlign:TextAlignManage(i18n.language) },styles.labelText]}>
                  {i18n.t("instructionsDriverReachStore")}</Text>
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
                    placeholder={i18n.t("instructionPlaceholderText")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.driverReachError),
                        borderColor: this.checkBoarderColor(this.state.driverReachError)},
                        {textAlign : TextAlignManage(i18n.language)},
                        styles.storeTextInput]}
                    value={this.state.driverReach}
                />
                {
                    this.state.driverReachError &&
                    <View 
                    style={styles.errorView}>
                    <Text 
                    style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>{i18n.t("pleaseEnterReachDriverError")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
                <Text style={[styles.labelText,{textAlign:TextAlignManage(i18n.language)}]}>
                  {i18n.t("instructionsDriverReachStoreArabic")}</Text>
                <TextInput
                    testID={"txt_edit_ar_driver_reach"}
                    onChangeText={(txt) => {
                        this.setState({ driverReachEditArabic: txt,driverReachEditArabicError:false });
                    }}
                    keyboardType="default"
                    maxLength={70}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    placeholder={i18n.t("instructionPlaceholderText")}
                    placeholderTextColor={'#9A9A9A'}
                    style={[{
                        borderWidth: this.checkBoarderWidth(this.state.driverReachEditArabicError),
                        borderColor: this.checkBoarderColor(this.state.driverReachEditArabicError)},
                        {textAlign : TextAlignManage(i18n.language)},
                        styles.storeTextInput]}
                    value={this.state.driverReachEditArabic}
                />
                {
                    this.state.driverReachEditArabicError &&
                    <View style={styles.errorView}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.errorText]}>
                      {i18n.t("pleaseEnterReachDriverError")}</Text>
                    </View>
                }
            </View>

            <View style={styles.storeCreateMainView}>
            <Text style={[{textAlign:TextAlignManage(i18n.language) },styles.labelText]}>{i18n.t("ContactNumber")}</Text>
            <MobileWithCountryCodesInput
                inputTestId="txtInputPhoneNumber"
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
                placeHolderInput={i18n.t("enterYourContactNumber")}
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
                <Text style={[styles.errorText,{textAlign:TextAlignManage(i18n.language) }]}>
                    {i18n.t('enterValidContactError')}
                </Text>
                </View>
            )}
            </View>

            <View style={styles.saveDetailbtnView}>
                <TouchableOpacity testID="btnUpdateStoreTimings" style={styles.btnNextButtonAddEdit} onPress={()=>{this.updateStoreDetails()}}>
                <Text style={styles.createButtonTextEdit}>{i18n.t("saveDetails")}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <KeyboardAvoidingView behavior={this.isPlatformiOS() ? "padding" : undefined} style={styles.keyboardPadding}>
        <View style={[styles.containerViewStoreUpload,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackEditStore" style={styles.backTouchStoreUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconStoreBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleStoreUpload}>{i18n.t("editDetails")}</Text>
              </View>
              <View style={styles.extraViewStoreUpload}>
              </View>
          </View>

            <View style={styles.uploadStoreHeaderActiveView}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity testID="btnStoreDetails" style={{alignItems:'center',width:windowWidth*45/100,borderBottomWidth:this.state.storeDataActive === 0 ? 3:1,borderBottomColor:this.state.storeDataActive === 0 ? '#375280':'#94A3B8',paddingBottom:windowWidth*3/100}} onPress={()=>{this.setState({storeDataActive:0})}}>
                        <Text style={{color:this.state.storeDataActive === 0 ? '#375280':'#94A3B8',fontFamily:'Lato-Regular',fontWeight:'500',fontSize:windowWidth*3.6/100}}>{i18n.t("storeDetails")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID="btnStoreAddress" style={{alignItems:'center',width:windowWidth*45/100,borderBottomWidth:this.state.storeDataActive === 1 ? 3:1,borderBottomColor:this.state.storeDataActive === 1 ? '#375280':'#94A3B8',paddingBottom:windowWidth*3/100}} onPress={()=>{this.setState({storeDataActive:1})}}>
                        <Text style={{color:this.state.storeDataActive === 1 ? '#375280':'#94A3B8',fontFamily:'Lato-Regular',fontWeight:'500',fontSize:windowWidth*3.6/100}}>{i18n.t("Address")}</Text>
                    </TouchableOpacity>
                </View>   
            </View>
            {this.state.storeDataActive === 0 && this.renderStoreDetails()}
            {this.state.storeDataActive === 1 && this.renderAddressDetails()}
        </View>
        </KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.mediamodal}>
            <View style={styles.modalMainView}>
                    <SafeAreaView style={styles.modalSafe}></SafeAreaView>
                    <View style={styles.cameraModalMainViewAdd}>
                  <View style={styles.modalSecondView}>
                    <TouchableOpacity  
                    testID={"btn_camera"}
                    style={styles.cameraModalTouchAdd} activeOpacity={0.9} onPress={()=>{this.Camerapopen()}}>
                      <View style={styles.cameraModalViewAdd}>
                          <Text style={styles.cameraModalTextAdd}>{i18n.t("cameraText")}</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity  
                      testID={"btn_gallery"}
                      style={[styles.cameraModalTouchAdd,{marginTop:10}]} onPress={()=>{this.Galleryopen()}}>
                      <View style={styles.cameraModalViewAdd}>
                          <Text style={styles.cameraModalTextAdd}>{i18n.t("galleryText")}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.cameraModalCancelViewAdd}>
                      <TouchableOpacity 
                      testID={"btn_cancelMedia"}
                      onPress={() => {this.setState({mediamodal:false}) }} style={styles.cameraModalCancelTouch}>
                          <Text style={styles.cameraModalCancelTextAdd}>{i18n.t("cancel")}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </View>
        </Modal>

      {
        this.state.storeDataActive === 0 &&
        <View style={styles.saveStoreDetailbtnView}>
          <TouchableOpacity testID="btnUpdateStoreTimings" style={styles.btnNextButtonAddEdit} onPress={()=>{this.updateStoreDetails()}}>
          <Text style={styles.createButtonTextEdit}>{i18n.t("saveDetails")}</Text>
          </TouchableOpacity>
        </View>
      }
      </View>
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
  containerViewStoreUpload:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewStoreUpload:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchStoreUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconStoreBack:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleStoreUpload:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewStoreUpload:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  uploadStoreHeaderActiveView:{
    width:windowWidth*90/100,
    height:windowHeight*7/100,
    marginTop:windowWidth*5/100
  },
  uploadStoreImageView:{
    width:windowWidth*90/100,
    height:windowHeight*20/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  exportIcon:{
    width:windowWidth*10/100,
    height:windowWidth*10/100
  },
  exportText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    marginTop:windowWidth*3/100
  },
  btnContactMargin:{
    width:windowWidth*90/100,
    marginTop:windowWidth*8/100,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
    bottom:windowWidth*10/100,
    alignSelf:'center'
  },
  btnCancelButton:{
    width:windowWidth*42/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    borderColor:'#CCBEB1',
    borderWidth:1
  },
  cancelButtonText:{
    color:'#375280',
    textAlign:'center',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*4.5/100,
    fontWeight:'500'
  },
  btnNextButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*42/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center'
  },
  nextButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  storeCreateMainView:{
    marginTop:windowWidth*4/100
  },
  labelText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  emailTextInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  storeDescriptionInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 15) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorView:{
    marginTop:windowWidth*1/100
  },
  errorText:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  storeDesMainView:{
    marginTop:windowWidth*5/100
  },
  cameraModalTouchAdd:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalViewAdd:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalTextAdd:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelViewAdd:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouch:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelTextAdd:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainView:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  cameraModalMainViewAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondView:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafe:{
    flex:0
  },
  selectedStyle: {
    flexDirection: 'row',
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
    marginRight: 5,
    fontSize: 16,
    color:'#375280'
  },
  addressView:{
    flexDirection:'row',
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
  addressTextInput:{
    width: (windowWidth * 80) / 100,
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  saveDetailbtnView:{
    marginTop:windowWidth*8/100,
    paddingBottom:windowWidth*8/100
  },
  btnNextButtonAddEdit:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center'
  },
  createButtonTextEdit:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
},
    saveStoreDetailbtnView :{
      position:'absolute',
      bottom:windowWidth*7/100,
      width:windowWidth*90/100,
      alignSelf:'center'
    },
    editIconTouch:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        borderRadius:windowWidth*6/100,
        backgroundColor:'#ffffff',
        position:'absolute',
        top:windowWidth*3/100,
        right:windowWidth*5/100,
        alignItems:'center'
    },
    editIconCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100,
        marginTop:windowWidth*1/100
    }
});
// Customizable Area End