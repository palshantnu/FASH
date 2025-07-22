import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  Keyboard
} from "react-native";

import { backIcon,downArrow,upArrow,search } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Customisableuserprofiles2FaqController, {
  Props
} from "./Customisableuserprofiles2FaqController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle"
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

export default class Customisableuserprofiles2Faq extends Customisableuserprofiles2FaqController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {this.state.loading && <CustomLoader></CustomLoader>}
            <SafeAreaView style={{flex:0}}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[styles.headerView,globalStyle.headerMarginManage, {flexDirection : FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackFaq" style={styles.backTouch} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCss, {
                        transform: [{ scaleY: ImageReverseManage(i18n.language) },{ scaleX: ImageReverseManage(i18n.language) }]
                    }]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitle}>{i18n.t("faq")}</Text>
                </View>
                <View style={styles.filterTouch}>
                </View>
            </View>

            <View style={styles.mainViewContainer}>
              <View style={[styles.shopMainViewContainer,{marginTop:windowWidth*3/100, flexDirection : FlexConditionManage(i18n.language)}]}>
                <View style={[styles.searchIconCss, { right: i18n.language == 'ar' ?  windowWidth*3/100 : 0 }]}>
                    <Image source={search} style={styles.backIconCss}></Image>
                </View>
                <View>
                    <TextInput
                    testID={"txt_enter_faq"}
                    onChangeText={searchText => {
                        this.onSearchInput(searchText)
                    }}
                    keyboardType="default"
                    maxLength={30}
                    returnKeyLabel="done"
                    returnKeyType="done"
                    onSubmitEditing={() => {
                    Keyboard.dismiss();
                    }}
                    placeholder={'Search'}
                    placeholderTextColor="#9A9A9A"
                    style={[styles.searchTextinput, {textAlign: TextAlignManage(i18n.language)}]}
                    value={this.state.faqSearchText}
                    />
                </View>
              </View>
                  <FlatList
                      testID="faq_flat_data"
                      data={this.state.faq_arr}
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                      style={{marginTop:windowWidth*5/100}}
                      contentContainerStyle={{ paddingBottom: 200 }}
                      ListEmptyComponent={() => (!this.state.loading ? 
                        <View style={styles.flatlistEmptyMainView}>
                          <Text style={styles.flatlistEmptyText}>{i18n.t("noRecordFoundText")}</Text>
                        </View>
                        : null)}
                      renderItem={({ item, index }) => {
                          return (
                              <>
                              <TouchableOpacity
                                  testID="select_faq_btn"
                                  activeOpacity={0.8}
                                  onPress={() => {
                                      this.select_btn(index)
                                  }}
                              >
                              <View style={[styles.faqMainView, { flexDirection : FlexConditionManage(i18n.language) }]}>
                                  <Text style={[styles.faqQuestionText, {textAlign : TextAlignManage(i18n.language)}]}>{item.attributes.question}</Text>
                                  <Image source={item.attributes.status ? upArrow : downArrow} style={styles.arrowIcon} />
                              </View>
                              {
                                  item.attributes.status &&
                                  
                                  <Text style={[styles.answerText,{textAlign : TextAlignManage(i18n.language)}]}>{item.attributes.answer}</Text>
                              }

                              </TouchableOpacity>

                              <View style={styles.faqViewBorder}></View>
                              </>
                          )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                  />
            </View>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}


// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#ffffff'
  },
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    width:windowWidth*90/100,
    alignSelf:'center'
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
    shopMainViewContainer:{
      flexDirection:'row',
      width:windowWidth*90/100,
      alignSelf:'center',
      borderWidth:1,
      borderColor:'#CBD5E1',
      borderRadius:3
    },
    searchTextinput:{
      width:windowWidth*80/100,
      height:windowHeight*6/100,
      padding:10,
      color:'#375280',
      marginHorizontal:windowWidth*7/100
    },
    searchIconCss:{
      width:windowWidth*5/100,
      height:windowWidth*5/100,
      position:'absolute',
      marginTop:windowWidth*4/100,
      left:windowWidth*3/100
    },
    faqMainView:{
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent:'space-between' 
    },
    faqQuestionText:{
      alignItems: 'center',
      fontSize: windowWidth *4/100,
      marginTop: windowWidth * 1.2 / 100,
      fontWeight:'500',
      width:windowWidth*80/100,
      color:'#375280',
      fontFamily:'Lato-Regular'
    },
    arrowIcon:{
      width: windowWidth * 3.5 / 100,
      height: windowWidth * 3.5 / 100,
      resizeMode: 'contain',
      marginRight: windowWidth * 2 / 100,
    },
    answerText:{
      marginTop: windowWidth * 4/100,
      width: windowWidth * 88 / 100,
      fontSize: windowWidth * 0.035,
      fontFamily:'Lato-Regular',
      color:'#375280'
    },
    faqViewBorder:{
      borderWidth:1,
      width:windowWidth*90/100,
      alignSelf:'center',
      borderColor:'#D5D5D5',
      marginTop:windowWidth*4/100
    },
    mainViewContainer:{
      width:windowWidth*90/100,
      alignSelf:'center',
      marginTop:windowWidth*4/100
    },
    flatlistEmptyMainView:{
      width:windowWidth*90/100,
      alignSelf:'center',
      alignItems:'center',
      marginTop:windowHeight*30/100
    },
    flatlistEmptyText:{
      fontSize:windowWidth*5/100,
      fontFamily:'Avenir-Heavy',
      color:'#375280'
    }
});
// Customizable Area End
