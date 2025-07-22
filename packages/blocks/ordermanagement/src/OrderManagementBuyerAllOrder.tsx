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
import { backIcon,filterIcon,searchIcon } from "./assets";

import OrderManagementBuyerAllOrderController, { Props,AllOrderArrProps } from "./OrderManagementBuyerAllOrderController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class OrderManagementBuyerAllOrder extends OrderManagementBuyerAllOrderController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllOrderDataList = (itemAllOrder:AllOrderArrProps,indexOrder:number)=>{
        let value = itemAllOrder;
        
        return (
            <TouchableOpacity testID="btnOrderDetailRedirect" style={styles.flatMainViewOrder} onPress={()=>{this.orderDetailRedirect(value.id)}}>
                <View style={[styles.orderIdMainViewAll,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={[styles.orderIDTextAll]}>{i18n.t("OrderID")} : # {value.attributes.order_number}</Text>
                    <Text style={[styles.orderIDTextAll]}>{value.attributes.order_items.length} {i18n.t("product")}</Text>
                </View>
                <View style={styles.itemFlatViewAll}>
                    <FlatList
                    testID={"orderAllItemStatusDataList"}
                    bounces={false}
                    data={value.attributes.order_items}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{paddingBottom:windowWidth*5/100}}>
                                <View style={[styles.orderItemViewOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Image style={styles.itemImageOrder} source={ImageNotFound(item?.attributes?.catalogue_variant_front_image)}></Image>
                                    <View style={[styles.itemTextViewOrder,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                                        <Text style={[styles.itemTextAllOrder,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.catalogue_name}</Text>
                                        <Text style={[styles.itemAnotherMainTextOrder]}>{this.firstLetterCapital(value.attributes.status.replace("_"," "))} {i18n.t('on')} {this.dateFormatChangeOrder(value.attributes.order_date)}</Text>
                                    </View>
                                </View>
                            </View>

                        )
                    }}
                    keyExtractor={(item) => item.id}
                    />
                </View>
            </TouchableOpacity>
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
                <View style={[styles.headerViewOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackAllOrder" style={styles.backTouchOrder} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrder,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleAllOrder}>{i18n.t('allOrdersText')}</Text>
                    </View>
                    <TouchableOpacity style={styles.extraViewOrder} onPress={()=>this.onFilterOrderScreen()}>
                        <Image resizeMode="contain" source={filterIcon} style={[styles.extraViewOrder,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View
              style={[
                styles.allOrderViewContainer,
                { marginTop: (windowWidth * 3) / 100 },{flexDirection:FlexConditionManage(i18n.language)}
              ]}>
              <View style={styles.searchIconCss}>
                <Image
                  source={searchIcon}
                  style={[styles.backIconOrder,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}
                ></Image>
              </View>
              <View>
                <TextInput
                  testID={"txt_enter_order"}
                  onChangeText={(txtSearch) => {
                    this.checkSpecialCharacter(txtSearch);
                  }}
                  keyboardType="default"
                  maxLength={30}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.searchBuyerOrder()
                  }}
                  placeholder={i18n.t("SearchOrder")}
                  placeholderTextColor="#9A9A9A"
                  style={[styles.searchTextinput,{textAlign:TextAlignManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,(windowWidth * 7) / 100),marginRight:ManageDynamicMargin(i18n.language,(windowWidth * 7) / 100,0)}]}
                  value={this.state.orderSearchTxt}
                />
              </View>
            </View>

            <View style={styles.storeCreateMainViewOrder}>
                <FlatList
                testID={"orderAllStatusDataList"}
                bounces={false}
                data={this.state.allOrderArr}
                contentContainerStyle={styles.flatContainerOrder}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.itemSepratorAllOrder} />}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyView}>
                        <Text style={styles.emptyFlatlistText}>
                          {i18n.t("notFound")}
                        </Text>
                      </View>
                    ) : null
                }
                renderItem={({item,index}) => this.getAllOrderDataList(item,index)}
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
        marginTop:windowWidth*4/100
    },
    orderIdMainViewAll:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    orderIDTextAll:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    itemFlatViewAll:{
        marginTop:windowWidth*3/100
    },
    itemImageOrder:{
        width:windowWidth*23/100,
        height:windowWidth*23/100
    },
    itemTextViewOrder:{
        marginLeft:windowWidth*3/100,
        marginTop:windowWidth*3/100
    },
    itemTextAllOrder:{
        color:'#375280',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    itemAnotherMainTextOrder:{
        color:'#94A3B8',
        fontSize:windowWidth*3.4/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
        marginTop:windowWidth*3/100
    },
    flatContainerOrder:{
        paddingBottom:windowWidth*50/100
    },
    orderItemViewOrder:{
        flexDirection:'row'
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
        color: "#375280",
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
    emptyLisyView: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistText: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
});
// Customizable Area End