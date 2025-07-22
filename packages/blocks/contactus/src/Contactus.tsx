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
  FlatList
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,downArrow,upArrow } from "./assets";

import ContactusController, { Props } from "./ContactusController";
import globalStyle from "../../../components/src/GlobalStyle"
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class Contactus extends ContactusController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeViewContainer}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        <View style={[styles.containerViewContact,globalStyle.headerMarginManage]}>
          <View style={[styles.headerViewContact,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackContactUs" style={styles.backTouchContact} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconContactCss,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleContact}>{i18n.t('customerServiceText')}</Text>
              </View>
              <View style={styles.extraView}>
              </View>
          </View>

          <View style={styles.marginTopManage}>
            <Text style={[styles.helpTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('helpCenterText')}</Text>
            <Text style={[styles.pleaseGetText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseGetTouchSubTitleText')}</Text>
          </View>

          <View style={styles.marginTopManage}>
            <Text style={[styles.moreQueryText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('moreQueriesText')}</Text>

            <View style={styles.queryFlatMainView}>
              <FlatList
                testID="query_flat_data"
                data={this.state.queryArr}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                numColumns={1}
                ItemSeparatorComponent={()=><View style={styles.queryItemSepView}></View>}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            testID="select_faq_btn"
                            activeOpacity={0.8}
                            style={styles.queryFlatTouch}
                            onPress={() => {
                                this.select_btn(index)
                            }}
                        >
                        <View style={[styles.queryFlatView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={[styles.queryFlatQuestionText,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.title}</Text>
                            <Image source={item.attributes.status ? upArrow : downArrow} style={styles.queryFlatIcon} />
                        </View>
                        {
                            item.attributes.status &&
                            
                            <Text style={[styles.queryFlatAnswerText,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{item.attributes.answer}</Text>
                        }
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>

          </View>

          <View style={styles.marginTopManage}>
            <Text style={[styles.moreQueryText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('trendingArticlesText')}</Text>
            <Text style={[styles.tapToViewText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('tapToViewSubTitleText')}</Text>
            <View style={styles.articleMainView}>
              <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
                <View style={styles.articalPointUiView}></View>
                <Text style={[{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*2/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,0)},styles.articalPointText]}>{i18n.t('trendingSubSubTitleText')}</Text>
              </View>

              <View style={[styles.articalPointMoreView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <View style={styles.articalPointUiView}></View>
                <Text style={[{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*2/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,0)},styles.articalPointText]}>{i18n.t('trendingSubSubTitleText')}</Text>
              </View>

              <View style={[styles.articalPointMoreView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <View style={styles.articalPointUiView}></View>
                <Text style={[{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*2/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,0)},styles.articalPointText]}>{i18n.t('trendingSubSubTitleText')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.btnContactMargin}>
            <TouchableOpacity testID="btnContactSupport" style={styles.btnContactButton} onPress={()=>{this.contactUsSupportRedirection()}}>
              <Text style={styles.contactButtonText}>{i18n.t('contactSupportText')}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  containerViewContact:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewContact:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchContact:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconContactCss:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleContact:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraView:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginTopManage:{
    marginTop:windowWidth*4/100
  },
  helpTitleText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4.5/100
  },
  pleaseGetText:{
    color:'#475569',
    fontSize:windowWidth*3.5/100,
    fontFamily:'Lato-Regular',
    marginTop:windowWidth*2/100
  },
  moreQueryText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.5/100
  },
  queryFlatMainView:{
    borderWidth:1,
    borderRadius:5,
    borderColor:'#D5D5D5',
    marginTop:windowWidth*4/100
  },
  queryItemSepView:{
    borderBottomWidth:0.8,
    width:windowWidth*90/100,
    alignSelf:'center',
    borderBottomColor:'#D5D5D5',
    marginTop:windowWidth*1/100
  },
  queryFlatTouch:{
    width:windowWidth*85/100,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    paddingBottom:windowWidth*3/100
  },
  queryFlatView:{
    justifyContent:'space-between',
    alignItems:'center'
  },
  queryFlatQuestionText:{
    alignItems: 'center',
    fontSize: windowWidth *4/100,
    marginTop: windowWidth * 1.2 / 100,
    fontWeight:'500',
    width:windowWidth*80/100,
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  queryFlatIcon:{
    width: windowWidth * 3.5 / 100,
    height: windowWidth * 3.5 / 100,
    resizeMode: 'contain',
    marginRight: windowWidth * 2 / 100,
  },
  queryFlatAnswerText:{
    marginTop: windowWidth * 4/100,
    width: windowWidth * 88 / 100,
    fontSize: windowWidth * 0.035,
    fontFamily:'Lato-Regular',
    color:'#375280',
    marginLeft:windowWidth*3/100
  },
  tapToViewText:{
    color:'#475569',
    fontSize:windowWidth*3.5/100,
    fontFamily:'Lato-Regular',
    marginTop:windowWidth*2/100
  },
  articleMainView:{
    marginTop:windowWidth*4/100,
    width:windowWidth*85/100,
    alignSelf:'center'
  },
  articalPointUiView:{
    width:windowWidth*1.5/100,
    height:windowWidth*1.5/100,
    borderRadius:windowWidth*1.5/100,
    backgroundColor:'#375280',
    marginTop:windowWidth*1.6/100
  },
  articalPointMoreView:{
    marginTop:windowWidth*4/100
  },
  articalPointText:{
    fontFamily:'Lato-Regular',
    color:'#475569'
  },
  btnContactMargin:{
    marginTop:windowWidth*5/100
  },
  btnContactButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*8/100,
    justifyContent:'center'
  },
  contactButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
});
// Customizable Area End