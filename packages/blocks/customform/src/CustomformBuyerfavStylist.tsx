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
  FlatList,
  Keyboard
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,searchIcon,fillHeart } from "./assets";

import CustomformBuyerfavStylistController, { Props,AllFavStylistArrProps } from "./CustomformBuyerfavStylistController";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import { bold } from "@uiw/react-md-editor";
// Customizable Area End

export default class CustomformBuyerfavStylist extends CustomformBuyerfavStylistController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllFavStylistList = (itemAllStylist:AllFavStylistArrProps,indexStylist:number)=>{
        let value = itemAllStylist;
        return (
            <View style={[styles.flatListMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnStylistRedirection" style={[styles.flatListFirstTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectStylistProfile(value.id)}}>
                    <Image source={ImageNotFound(value.attributes.profile_picture)} style={styles.flatStylistImage}></Image>
                    <View style={{marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}}>
                        <Text style={[styles.flatListStylistNameText,{textAlign:TextAlignManage(i18n.language)}]}>{value.attributes.full_name}</Text>
                        <Text numberOfLines={1} style={[styles.flatListStylistBioText,{textAlign:TextAlignManage(i18n.language)}]}>{value.attributes.bio}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity testID="btnRemoveFav" style={styles.flatHeartTouch} onPress={()=>{this.removeFavStylist(value.id)}}>
                    <Image source={fillHeart} style={styles.flatHeartIcon}></Image>
                </TouchableOpacity>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerfavStylist}>
            <SafeAreaView style={styles.safeViewContainerFavStylist}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewFavStylist,globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackAllFavStylist" style={styles.backTouchFavStylist} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconFavStylist,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleAllFavStylist}>{i18n.t('favStylistText')}</Text>
                    </View>
                    <View style={styles.extraViewStylist}>
                    </View>
                </View>
            </View>

            <View
              style={[styles.allFavStylistViewContainer,styles.marginManage,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <View style={[styles.searchIconCssStylist]}>
                <Image
                  source={searchIcon}
                  style={styles.backIconFavStylist}
                ></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_stylist"}
                  onChangeText={(txtSearch) => {
                    this.checkSpecialCharacter(txtSearch);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.searchFavStylist()
                  }}
                  placeholder={i18n.t('searchStylistText')}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinputStylist,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*7/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*7/100)}]}
                  value={this.state.stylistSearchTxt}
                />
              </View>
            </View>

            <View style={styles.storeCreateMainViewStylist}>
                <FlatList
                testID={"allStylistFav"}
                bounces={false}
                data={this.state.allFavStylistArr}
                contentContainerStyle={styles.flatContainerfavStylist}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.itemSepratorAllFavStylist} />}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyViewStylist}>
                        <Text style={styles.emptyFlatlistTextStylist}>
                        {i18n.t('noFavouriteStylistText')}
                        </Text>
                      </View>
                    ) : null
                }
                renderItem={({item,index}) => this.getAllFavStylistList(item,index)}
                keyExtractor={(item) => item.id}
                />
                
            </View>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerFavStylist:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerfavStylist: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewFavStylist:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewOrder:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchFavStylist:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconFavStylist:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAllFavStylist:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Lato-Bold',
    },
    extraViewStylist:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewStylist:{
        marginTop:windowWidth*4/100,
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    itemSepratorAllFavStylist:{
        marginTop:windowWidth*5/100
    },
    flatContainerfavStylist:{
        paddingBottom:windowWidth*50/100
    },
    orderItemViewOrder:{
        flexDirection:'row'
    },
    searchIconCssStylist: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
        position: "absolute",
        marginTop: (windowWidth * 4) / 100,
        left: (windowWidth * 3) / 100,
    },
    searchTextinputStylist: {
        width: (windowWidth * 80) / 100,
        height: (windowHeight * 6) / 100,
        padding: 10,
        color: "#375280"
    },
    allFavStylistViewContainer: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
    },
    emptyLisyViewStylist: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
        fontFamily:'Lato-Bold',
    },
    emptyFlatlistTextStylist: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily:'Lato-Bold',
        color: "#375280",
    },
    flatListMainView:{
        justifyContent:'space-between'
    },
    flatListFirstTouch:{
        padding:2,
        width:windowWidth*65/100
    },
    flatStylistImage:{
        width:windowWidth*13/100,
        height:windowWidth*13/100,
        borderRadius:windowWidth*13/100
    },
    flatStylistView:{
        marginLeft:windowWidth*2/100
    },
    flatListStylistNameText:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.3/100
    },
    flatListStylistBioText:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.9/100,
        marginTop:windowWidth*1/100
    },
    flatHeartTouch:{
        width:windowWidth*10/100
    },
    flatHeartIcon:{
        width:windowWidth*8/100,
        height:windowWidth*8/100
    },
    marginManage:{
        marginTop: (windowWidth * 3) / 100
    }
});
// Customizable Area End