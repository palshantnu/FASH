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

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

import AnalyticsSelectProductController, { Props,AllProductArrProps } from "./AnalyticsSelectProductController";
import { activeStatus, backIcon,searchIcon, unSelectIcon } from "./assets";
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageNotFound from "../../../components/src/ImageNotFound";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class AnalyticsSelectProduct extends AnalyticsSelectProductController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllProductDataList = (itemAllProduct:AllProductArrProps,indexP:number)=>{
        let value = itemAllProduct;
        return (
            <View style={styles.flatMainViewProduct}>
                <TouchableOpacity testID="btnProductSelect" style={[styles.flatMainView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.selectProductStatus(value.id,value.attributes.name)}}>
                    <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.flatlistProductMainView]}>
                        <Image source={ImageNotFound(value.attributes.primary_image)} style={styles.flatStoreImage}></Image>
                        <Text numberOfLines={1} style={[styles.flatProductText,{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,windowWidth*2/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*2/100)}]}>{value.attributes.name}</Text>
                    </View>
                    <View style={styles.flatCustomRadioMargin}>
                        <TouchableOpacity>
                            <Image resizeMode="contain" source={this.state.productSelectedId === value.id ?activeStatus :unSelectIcon} style={styles.backIconProduct}></Image>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerProduct}>
            <SafeAreaView style={styles.safeViewContainerProduct}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewProduct,globalStyle.headerMarginManage]}>
                <View style={[styles.headerViewProduct,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackSelectProduct" style={styles.backTouchProduct} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconProduct,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleAllProduct}>{i18n.t('selectProductText')}</Text>
                    </View>
                    <View style={styles.extraViewProduct}>
                    </View>
                </View>
            </View>

            <View
              style={[
                styles.allProductViewContainer,
                { marginTop: (windowWidth * 3) / 100,flexDirection:FlexConditionManage(i18n.language) }
              ]}>
              <View style={[styles.searchIconCssProduct,{right:ManageDynamicMargin(i18n.language,(windowWidth * 3) / 100,undefined),left:ManageDynamicMargin(i18n.language,undefined,(windowWidth * 3) / 100)}]}>
                <Image
                  source={searchIcon}
                  style={styles.backIconProduct}
                ></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_select_product"}
                  onChangeText={(txtSearch) => {
                    this.checkSpecialCharacterP(txtSearch);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    this.searchProduct()
                    Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('searchProductText')}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinputProduct,{textAlign:TextAlignManage(i18n.language)}]}
                  value={this.state.productSearchTxt}
                />
              </View>
            </View>

            <View style={styles.storeCreateMainViewProduct}>
                <FlatList
                testID={"allSellerProductDataList"}
                bounces={false}
                data={this.state.allSellerProduct}
                contentContainerStyle={styles.flatContainerProduct}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyViewProduct}>
                        <Text style={styles.emptyFlatlistTextProduct}>
                        {i18n.t('noProductsFoundText')}
                        </Text>
                      </View>
                    ) : null
                }
                ItemSeparatorComponent={() => <View style={styles.itemSepratorAllProduct} />}
                renderItem={({item,index}) => this.getAllProductDataList(item,index)}
                keyExtractor={(item) => item.id}
                />
                
            </View>

            <View style={[styles.btnMainViewProduct,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnCloseProduct" style={styles.btnCloseProduct} onPress={()=>{this.props.navigation.goBack()}}>
                    <Text style={styles.closeProductBtnText}>{i18n.t('closeText')}</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="btnConfirmProduct" style={styles.btnConfirmProduct} onPress={()=>{this.btnProductConfirm()}}>
                <Text style={styles.productBtnConfirmText}>{i18n.t('confirm')}</Text>
                </TouchableOpacity>
            </View>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerProduct:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerProduct: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewProduct:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewProduct:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchProduct:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconProduct:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAllProduct:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewProduct:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewProduct:{
        marginTop:windowWidth*4/100,
    },
    itemSepratorAllProduct:{
        width: windowWidth*90/100,
        borderBottomWidth:1,
        borderBottomColor:'#CBD5E1',
        alignSelf:'center'
    },
    flatMainViewProduct:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*4/100,
        paddingBottom:windowWidth*3/100
    },
    flatContainerProduct:{
        paddingBottom:windowWidth*50/100
    },
    searchIconCssProduct: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
        position: "absolute",
        marginTop: (windowWidth * 4) / 100
    },
    searchTextinputProduct: {
        width: (windowWidth * 80) / 100,
        height: (windowHeight * 6) / 100,
        padding: 10,
        color: "#000000",
        marginLeft: (windowWidth * 7) / 100,
    },
    allProductViewContainer: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 3,
    },
    flatMainView:{
        alignItems:'center',
        justifyContent:'space-between'
    },
    flatlistProductMainView:{
        alignItems:'center'
    },
    flatStoreImage:{
        width:windowWidth*8/100,
        height:windowWidth*8/100,
        borderRadius:2
    },
    flatProductText:{
        color:'#375280',
        fontSize:windowWidth*4/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        marginLeft:windowWidth*2/100,
        width:windowWidth*40/100
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
    flatCustomRadioMargin:{
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
    emptyLisyViewProduct: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 30) / 100,
    },
    emptyFlatlistTextProduct: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    btnMainViewProduct:{
        marginTop:windowWidth*8/100,
        justifyContent:'space-between',
        bottom:windowWidth*8/100,
        position:'absolute',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    btnCloseProduct:{
        width:windowWidth*43/100,
        height:windowHeight*6/100,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    closeProductBtnText:{
        color:'#375280',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4.5/100,
        fontWeight:'500'
    },
    btnConfirmProduct:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*43/100,
        height:windowHeight*6/100,
        borderRadius:2,
        justifyContent:'center'
    },
    productBtnConfirmText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*5/100
    },
});
// Customizable Area End