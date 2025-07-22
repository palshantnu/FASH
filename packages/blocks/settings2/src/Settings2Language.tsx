import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import CustomRadioButton from "../../../components/src/CustomRadioButton";
import CustomButton from "../../../components/src/CustomButton";
import globalStyle from "../../../components/src/GlobalStyle"
const windowWidth = Dimensions.get("window").width;
import { backUpdateIcon } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

import Settings2LanguageController, { Props } from "./Settings2LanguageController";
import Scale from "../../../components/src/Scale";

export default class Settings2Language extends Settings2LanguageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer} testID="Settings2Language"/>
        {this.state.loading && <CustomLoader />}
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        <View style={[styles.containerViewStoreUpload,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewStoreUpload,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackLanguageCurrency" style={styles.backTouchStoreUpload} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backUpdateIcon} style={[styles.backIconStoreBack,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleStoreUpload}>{i18n.t('languageCurrencyText')}</Text>
              </View>
              <View style={styles.extraViewStoreUpload}>
              </View>
          </View>
        </View>
        
          
          <View style={styles.spaceBetween}>
            <View>
              <FlatList
                ListHeaderComponent={
                  <Text style={[styles.title,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,undefined,12),marginRight:ManageDynamicMargin(i18n.language,12,undefined)}]}>{i18n.t('selectLanguageText')}</Text>
                }
                numColumns={2}
                data={this.languages}
                style={styles.fl}
                contentContainerStyle={styles.flContainer}
                keyExtractor={this.extractKeys}
                bounces={false}
                scrollEnabled={false}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    onPress={() => this.updateLanguage(index)}
                    testID="language"
                    style={[
                      styles.box,
                      {
                        borderColor:
                          this.state.selectedLanguageIndex === index
                            ? "#CCBEB1"
                            : "#FFFFFF",
                      },
                    ]}
                  >
                    <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <CustomRadioButton
                        selected={index === this.state.selectedLanguageIndex}
                        size={20}
                      />
                      <Text style={[styles.txt,{marginLeft:ManageDynamicMargin(i18n.language,undefined,8),marginRight:ManageDynamicMargin(i18n.language,8,undefined)}]}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <FlatList
                ListHeaderComponent={
                  <Text style={[styles.title,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,undefined,12),marginRight:ManageDynamicMargin(i18n.language,12,undefined)}]}>{i18n.t('selectCurrencyText')}</Text>
                }
                numColumns={2}
                data={this.currencies}
                style={styles.fl}
                contentContainerStyle={styles.flContainer}
                keyExtractor={this.extractKeys}
                bounces={false}
                scrollEnabled={false}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    onPress={() => this.updateCurrency(index)}
                    testID="currency"
                    style={[
                      styles.box,
                      {
                        borderColor:
                          this.state.selectedCurrencyIndex === index
                            ? "#CCBEB1"
                            : "#FFFFFF",
                      },
                    ]}
                  >
                    <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <CustomRadioButton
                        selected={index === this.state.selectedCurrencyIndex}
                        size={20}
                      />
                      <Text style={[styles.txt,{marginLeft:ManageDynamicMargin(i18n.language,undefined,8),marginRight:ManageDynamicMargin(i18n.language,8,undefined)}]}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        <CustomButton
          title={i18n.t('continueText')}
          style={{ margin: 20 }}
          testID="continueBtnLanguage"
          onPress={()=>{this.updateLanguageAndCurrencyApi()}}
        />
        </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
  },
  justify: {
    justifyContent: 'space-between'
  },
  logoWrapper: {
    paddingVertical: Scale(44),
    alignSelf: "center",
  },
  logo: {
    width: 154,
    height: 36,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: windowWidth*4.3/100,
    lineHeight: 26,
    color: "#375280",
  },
  fl: {
    flexGrow: 0,
    marginTop:windowWidth*5/100
  },
  flContainer: {
    padding: 8,
  },
  box: {
    marginHorizontal: 8,
    marginVertical: 12,
    padding: 16,
    flex: 1,
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 5,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: windowWidth*3.9/100,
    lineHeight: 24,
  },
  spaceBetween: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 24,
  },
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
    flexDirection:'row',
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
});
// Customizable Area End
