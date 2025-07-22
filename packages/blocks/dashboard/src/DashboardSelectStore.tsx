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
import { backIcon,searchIcon,fashionLogo } from "./assets";

import DashboardSelectStoreController, { Props,AllOrderArrProps } from "./DashboardSelectStoreController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import CustomSwitch from "../../../components/src/CustomSwitch";
import ImageNotFound from "../../../components/src/ImageNotFound";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
// Customizable Area End

export default class DashboardSelectStore extends DashboardSelectStoreController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllStoreDataList = (itemAllStore:AllOrderArrProps,indexOrder:number)=>{
        let value = itemAllStore;
        return (
            <View style={styles.flatMainViewOrder}>
                <View style={styles.flatMainView}>
                    <TouchableOpacity testID="btnStoreDashboardRedirection" style={styles.flatlistStoreMainView} onPress={()=>{this.storeDashboardRedirection(value)}}>
                        <Image source={ImageNotFound(value.attributes.image)} style={styles.flatStoreImage}></Image>
                        <Text numberOfLines={1} style={styles.flatStoreText}>{value.attributes.store_name}</Text>
                        <View style={styles.flatStoreStatusView}>
                            <Text style={styles.flatStoreStatusText}>{this.openCloseStatusText(value.attributes.is_open)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.flatCustomSwitchMainView}>
                        <View style={styles.flatCustomSwitchMargin}>
                        <CustomSwitch
                            size={16}
                            value={value.attributes.is_open}
                            onValueChange={() => {
                                this.toggleStoreStatus('single', value.attributes.is_open,value.id,indexOrder);
                            }}
                            testID="toggleOpenStatus"
                        />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerOrder}>
            <SafeAreaView style={styles.safeViewContainerOrder}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewOrder,globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewOrder, {direction : FlatListRowManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackSelectStore" style={styles.backTouchOrder} onPress={()=>{this.dashBoardBackManage()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrder, {
                            transform : [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]
                        }]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleAllOrder}>{i18n.t("selectStoreText")}</Text>
                    </View>
                    <View style={styles.extraViewOrder}>
                    </View>
                </View>
            </View>

            <View
              style={[
                styles.allOrderViewContainer,
                { direction: FlatListRowManage(i18n.language),},
                { marginTop: (windowWidth * 3) / 100 },
              ]}>
              <View style={styles.searchIconCss}>
                <Image
                  source={searchIcon}
                  style={styles.backIconOrder}
                ></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_select_store"}
                  onChangeText={(txtSearch) => {
                    this.checkSpecialCharacter(txtSearch);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    this.searchStore()
                    Keyboard.dismiss();
                  }}
                  placeholder={i18n.t("searchStore")}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinput, {
                    textAlign : TextAlignManage(i18n.language)
                  }]}
                  value={this.state.storeSearchTxt}
                />
              </View>
            </View>

            <View style={[styles.allStoreMainView, {direction : FlatListRowManage(i18n.language)}]}>
                <Text style={styles.allStoreMainText}>{i18n.t("openClosedAllStore")}</Text>
                <CustomSwitch
                size={16}
                value={this.state.allStoreOpenCloseStatus}
                disabled={this.state.allSellerStore.length<=0 ? true : false}
                onValueChange={() => {
                    this.toggleStoreStatus('all', this.state.allStoreOpenCloseStatus,'0',-1);
                }}
                testID="toggleAllOpenStatus"
                />
            </View>

            <View style={styles.storeCreateMainViewOrder}>
                <FlatList
                testID={"allSellerStoreDataList"}
                bounces={false}
                data={this.state.allSellerStore}
                contentContainerStyle={[styles.flatContainerOrder, {direction : FlatListRowManage(i18n.language)}]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyView}>
                        <Text style={styles.emptyFlatlistText}>
                          {i18n.t("noStoresFoundText")}
                        </Text>
                      </View>
                    ) : null
                }
                ItemSeparatorComponent={() => <View style={styles.itemSepratorAllOrder} />}
                renderItem={({item,index}) => this.getAllStoreDataList(item,index)}
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
    safeViewContainerOrder:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerOrder: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewOrder:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewOrder:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchOrder:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconOrder:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAllOrder:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewOrder:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewOrder:{
        marginTop:windowWidth*4/100,
    },
    itemSepratorAllOrder:{
        width: windowWidth*90/100,
        borderBottomWidth:1,
        borderBottomColor:'#CBD5E1',
        alignSelf:'center'
    },
    flatMainViewOrder:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*4/100,
        paddingBottom:windowWidth*3/100
    },
    flatContainerOrder:{
        paddingBottom:windowWidth*50/100
    },
    searchIconCss: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
        position: "absolute",
        marginTop: (windowWidth * 4) / 100,
        left: (windowWidth * 3) / 100,
    },
    searchTextinput: {
        width: (windowWidth * 80) / 100,
        height: (windowHeight * 6) / 100,
        padding: 10,
        color: "#000000",
        marginLeft: (windowWidth * 7) / 100,
    },
    allOrderViewContainer: {
        flexDirection: "row",
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
    },
    flatMainView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    flatlistStoreMainView:{
        flexDirection:'row',
        alignItems:'center'
    },
    flatStoreImage:{
        width:windowWidth*8/100,
        height:windowWidth*8/100,
        borderRadius:windowWidth*8/100
    },
    flatStoreText:{
        color:'#375280',
        fontSize:windowWidth*4/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        marginLeft:windowWidth*2/100,
        width:windowWidth*40/100,
        textAlign : 'left'
    },
    flatStoreStatusView:{
        backgroundColor:'#E2E8F0',
        width:windowWidth*13/100,
        borderRadius:5,
        padding:3,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginLeft:windowWidth*2/100
    },
    flatStoreStatusText:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular'
    },
    flatCustomSwitchMainView:{
        borderLeftWidth:1,
        borderLeftColor:'#375280'
    },
    flatCustomSwitchMargin:{
        marginLeft:windowWidth*5/100
    },
    allStoreMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:windowWidth*5/100,
        alignItems:'center'
    },
    allStoreMainText:{
        fontSize:windowWidth*4/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        color:'#375280'
    },
    emptyLisyView: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 30) / 100,
    },
    emptyFlatlistText: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
});
// Customizable Area End