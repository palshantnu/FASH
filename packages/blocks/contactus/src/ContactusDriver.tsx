import React from "react";
// Customizable Area Start
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
    SafeAreaView,
    Image,
    FlatList,
    Dimensions
} from "react-native";

import { backIcon,downArrow,upArrow } from "./assets";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ContactusDriverController, { Props } from "./ContactusDriverController";
import globalStyle from "../../../components/src/GlobalStyle"
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class ContactusDriver extends ContactusDriverController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerDriver}>
        <SafeAreaView style={styles.safeViewContainerDriver}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        <View style={[styles.containerViewContactDriver,globalStyle.headerMarginManage, {flex :1}]}>
          <View style={[styles.headerViewContactDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackContactUs" style={styles.backTouchContactDriver} onPress={()=>{this.props.navigation.goBack()}}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconContactCssDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
              </TouchableOpacity> 
              <View>
                  <Text style={styles.headerTitleContactDriver}>{i18n.t('customerSupportText')}</Text>
              </View>
              <View style={styles.extraViewDriver}>
              </View>
          </View>

          <View style={styles.marginTopManageDriver}>
            <Text style={[styles.helpTitleTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('helpCenterText')}</Text>
            <Text style={[styles.pleaseGetTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseGetTouchSubTitleText')}</Text>
          </View>

          <View style={styles.marginTopManageDriver}>
            <Text style={[styles.moreQueryTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('moreQueriesText')}</Text>

            <View style={styles.queryFlatMainViewDriver}>
              <FlatList
                testID="contactQuery_flat_data"
                data={this.state.queryContactArr}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                scrollEnabled={false}
                ItemSeparatorComponent={()=><View style={styles.queryItemSepView}></View>}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            testID="select_contact_btn"
                            activeOpacity={0.8}
                            style={styles.queryFlatTouchDriver}
                            onPress={() => {
                                this.openCloseQuestion(index)
                            }}
                        >
                        <View style={[styles.queryFlatViewDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={[styles.queryFlatQuestionTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.title}</Text>
                            <Image source={item.attributes.status ? upArrow : downArrow} style={[styles.queryFlatIconDriver]} />
                        </View>
                        {
                            item.attributes.status &&
                            
                            <Text style={[styles.queryFlatAnswerTextDriver,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>{item.attributes.answer}</Text>
                        }
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>

          </View>
          
          <View style={{flex :1}} />
          <View style={styles.btnContactMarginDriver}>
            <TouchableOpacity testID="btnContactSupportDriver" style={styles.btnContactButtonDriver} onPress={()=>{this.contactUsSupportDriverRedirection()}}>
              <Text style={styles.contactButtonTextDriver}>{i18n.t('contactSupportText')}</Text>
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
  mainContainerDriver: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeViewContainerDriver:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerViewContactDriver:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewContactDriver:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchContactDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconContactCssDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleContactDriver:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  extraViewDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginTopManageDriver:{
    marginTop:windowWidth*4/100
  },
  helpTitleTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4.5/100
  },
  pleaseGetTextDriver:{
    color:'#475569',
    fontSize:windowWidth*3.5/100,
    fontFamily:'Lato-Regular',
    marginTop:windowWidth*2/100
  },
  moreQueryTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.5/100
  },
  queryFlatMainViewDriver:{
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
  queryFlatTouchDriver:{
    width:windowWidth*85/100,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    paddingBottom:windowWidth*3/100
  },
  queryFlatViewDriver:{
    justifyContent:'space-between',
    alignItems:'center'
  },
  queryFlatQuestionTextDriver:{
    alignItems: 'center',
    fontSize: windowWidth *4/100,
    marginTop: windowWidth * 1.2 / 100,
    fontWeight:'500',
    width:windowWidth*80/100,
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  queryFlatIconDriver:{
    width: windowWidth * 3.5 / 100,
    height: windowWidth * 3.5 / 100,
    resizeMode: 'contain',
    marginRight: windowWidth * 2 / 100,
  },
  queryFlatAnswerTextDriver:{
    marginTop: windowWidth * 4/100,
    width: windowWidth * 88 / 100,
    fontSize: windowWidth * 0.035,
    fontFamily:'Lato-Regular',
    color:'#375280',
  },
  tapToViewTextDriver:{
    color:'#475569',
    fontSize:windowWidth*3.5/100,
    fontFamily:'Lato-Regular',
    marginTop:windowWidth*2/100
  },
  articleMainViewDriver:{
    marginTop:windowWidth*4/100,
    width:windowWidth*85/100,
    alignSelf:'center'
  },
  articalPointUiViewDriver:{
    width:windowWidth*1.5/100,
    height:windowWidth*1.5/100,
    borderRadius:windowWidth*1.5/100,
    backgroundColor:'#375280',
    marginTop:windowWidth*1.6/100
  },
  articalPointMoreView:{
    marginTop:windowWidth*4/100
  },
  articalPointTextDriver:{
    fontFamily:'Lato-Regular',
    color:'#475569'
  },
  btnContactMarginDriver:{
    marginTop:windowWidth*5/100,
    marginBottom:windowWidth*5/100
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
    fontSize:windowWidth*5/100
  },
});
// Customizable Area End