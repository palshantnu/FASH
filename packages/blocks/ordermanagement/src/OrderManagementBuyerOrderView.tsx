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
  FlatList,
  Modal
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import OrderManagementBuyerOrderViewController, { Props,OrderArrProps } from "./OrderManagementBuyerOrderViewController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import TextAlignManage from '../../../components/src/TextAlignManage'
// Customizable Area End

export default class OrderManagementBuyerOrderView extends OrderManagementBuyerOrderViewController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start

    getOrderDataList = (itemOrder:OrderArrProps,indexOrder:number)=>{
        let value = itemOrder;
        return (
            <View style={styles.flatMainView}>
                <View style={[styles.orderIdView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.orderIDText}>{i18n.t("OrderID")} : #{value.attributes.order_number}</Text>
                    <Text style={styles.orderIDText}>{value.attributes.order_items.length} {i18n.t("product")} </Text>
                </View>
                <View style={styles.itemFlatView}>
                    <FlatList
                    testID={"orderItemDataList"}
                    bounces={false}
                    data={value.attributes.order_items}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.itemSepratorSecondFlat} />}
                    renderItem={({ item, index }) => {       
                        return (
                            <View>
                                <View style={[styles.itemIdView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Image style={styles.itemImage} source={ImageNotFound(item.attributes.catalogue_variant_front_image)}></Image>
                                    <View style={[styles.itemTextView,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                                        <Text numberOfLines={1} style={[styles.itemText,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.catalogue_name}</Text>
                                        <View style={[styles.itemAnotherMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                            <View style={styles.sizeView}>
                                                <Text numberOfLines={1} style={styles.itemAnotherMainText}>{i18n.t("size")}: {item.attributes.catalogue_variant_size}</Text>
                                            </View>
                                            <View style={styles.sizeView}>
                                                <Text numberOfLines={1} style={styles.itemAnotherMainText}>{i18n.t("color")}: {item.attributes.catalogue_variant_color}</Text>
                                            </View>
                                            <Text style={styles.itemAnotherMainText}>{i18n.t("Quantity")}: {item.attributes.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )
                    }}
                    keyExtractor={(item) => item.id}
                    />
                </View>

                <View>
                    <View style={[styles.orderRemianingView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.orderRemainingText}>{i18n.t("order_date")} :</Text>
                        <Text style={styles.orderReaminingDynamicText}>{this.dateFormatChange(value.attributes.placed_at)}</Text>
                    </View>
                    <View style={[styles.orderRemianingView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.orderRemainingText}>{i18n.t("CustomerName")} :</Text>
                        <Text style={styles.orderReaminingDynamicText}>{value?.attributes?.delivery_addresses?.attributes?.name}</Text>
                    </View>
                    <View style={[styles.orderRemianingView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.orderRemainingText}>{i18n.t("order_status")} :</Text>
                        <Text style={[styles.orderReaminingDynamicText,{textTransform:'capitalize'}]}>{value.attributes.status.replace('_'," ")}</Text>
                    </View>
                    <View style={[styles.orderRemianingView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.orderRemainingText}>{i18n.t("Address")} :</Text>
                        <Text style={[styles.orderAddressText,{textAlign:i18n.language==="ar"?'left':'right'}]}>{value?.attributes?.delivery_addresses?.attributes?.house_or_building_number} {value?.attributes?.delivery_addresses?.attributes?.block} {value?.attributes?.delivery_addresses?.attributes?.area} {value?.attributes?.delivery_addresses?.attributes?.street}, {value?.attributes?.delivery_addresses?.attributes?.city}, {value?.attributes?.delivery_addresses?.attributes?.zip_code}</Text>
                    </View>
                </View>
                   { this.showButtons(itemOrder,indexOrder)}
                
            </View>
        );
    }
    showButtons(itemOrder:OrderArrProps,indexOrder:number){
        let value=itemOrder
       let status:string=""
       let return_type:string=""
        itemOrder.attributes.order_items.forEach(element => {
            status=element.attributes.status
            return_type=element.attributes.return_type!=null?element.attributes.return_type:""
           
        } )
        
        if( status==="return_confirmed" && this.state.orderType==="Returned" ){ return(
            <>
                 <View style={[styles.btnMainViewWork,{flexDirection:FlexConditionManage(i18n.language)}]}>
                 
                 <TouchableOpacity testID="btnCancelOrder1" style={styles.btnCancelButtonOrder} onPress={()=>{this.cancelOrder(value.id,indexOrder)}}>
                     <Text style={styles.cancelButtonTextOrder}>{this.state.buttonText}</Text>
                 </TouchableOpacity>
                
                 <TouchableOpacity testID="btnOrderStatus1" style={styles.btnOrderStatusOrder} onPress={()=>{this.orderRedirectMode(value.id, return_type)}}>
                 <Text style={styles.buttonOrderStatusText}>{i18n.t("ModeofReturn")}</Text>
                 </TouchableOpacity>
             </View>
             </>
             )
             
        
        } else if(status==="return_placed" && this.state.orderType==="Returned"){ return(
            <>
                 <View style={[styles.btnMainViewWork,{flexDirection:FlexConditionManage(i18n.language)}]}>
                 
                 <TouchableOpacity testID="btnCancelOrder2" style={styles.btnCancelButtonOrder} onPress={()=>{this.cancelOrder(value.id,indexOrder)}}>
                     <Text style={styles.cancelButtonTextOrder}>{this.state.buttonText}</Text>
                 </TouchableOpacity>
                
                 <TouchableOpacity testID="btnOrderStatus2" style={styles.btnOrderStatusOrder} onPress={()=>{this.orderDetailRedirect(value.id)}}>
                 <Text style={styles.buttonOrderStatusText}>{i18n.t("ReturnStatus")}</Text>
                 </TouchableOpacity>
             </View>
             </>
             )
             
        
        }else
        if(status==="order_placed" ||  status==="confirmed"){ return(
            <>
                 <View style={[styles.btnMainViewWork,{flexDirection:FlexConditionManage(i18n.language)}]}>
                 <TouchableOpacity testID="btnCancelOrder3" style={styles.btnCancelButtonOrder} onPress={()=>{this.cancelOrder(value.id,indexOrder)}}>
                     <Text style={styles.cancelButtonTextOrder}>{i18n.t("cancelText")}</Text>
                 </TouchableOpacity>               
                 <TouchableOpacity testID="btnOrderStatus3" style={styles.btnOrderStatusOrder} onPress={()=>{this.orderDetailRedirect(value.id)}}>
                 <Text style={styles.buttonOrderStatusText}>{i18n.t("order_status")}</Text>
                 </TouchableOpacity>
             </View>
             </>
             )
        }else
        if(status==="delivered" ){ return(
            <>
                 <View style={[styles.btnMainViewWork,{flexDirection:FlexConditionManage(i18n.language)}]}>
                 <TouchableOpacity testID="btnCancelOrder4" style={styles.btnCancelButtonOrder} onPress={()=>{this.cancelOrder(value.id,indexOrder)}}>
                     <Text style={styles.cancelButtonTextOrder}>{this.state.buttonText}</Text>
                 </TouchableOpacity>               
                 <TouchableOpacity testID="btnOrderStatus4" style={styles.btnOrderStatusOrder} onPress={()=>{this.orderDetailRedirect(value.id)}}>
                 <Text style={styles.buttonOrderStatusText}>{i18n.t("order_status")}</Text>
                 </TouchableOpacity>
             </View>
             </>
             )
        }else{
            return(
                <>
                     <View style={[styles.btnMainViewWork,{flexDirection:FlexConditionManage(i18n.language)}]}>
                     <TouchableOpacity testID="btnOrderStatus5" style={[styles.btnOrderStatusOrder,{width:"100%"}]} onPress={()=>{this.orderDetailRedirect(value.id)}}>
                     <Text style={styles.buttonOrderStatusText}>{i18n.t("order_status")}</Text>
                     </TouchableOpacity>
                 </View>
                 </>
                 )
        }
    }
    orderTypeText=()=>{
        if(this.state.orderType==="Delivered"){
            return i18n.t('deliveredText')
          }else
          if(this.state.orderType==="Returned"){
            return i18n.t('returned')
          }else
          if(this.state.orderType === 'Processing')
          {
            return i18n.t('processingText')
          }else{
            return i18n.t('processingText')
          }
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerEdit}>
        <SafeAreaView style={styles.safeViewContainerEdit}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewMangeTiming,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewManageTime,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackOrderStatus" style={styles.backTouchManageTime} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconManageTime,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleManageTime}>{this.orderTypeText()}</Text>
                </View>
                <View style={styles.extraViewManageTime}>
                </View>
            </View>
        </View>


            <View style={styles.storeCreateMainViewEdit}>
                <FlatList
                testID={"orderStatusDataList"}
                bounces={false}
                data={this.state.orderArr}
                contentContainerStyle={styles.flatContainer}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.itemSepratorEdit} />}
                ListEmptyComponent={() => (!this.state.loading ? 
                    <View style={styles.flatlistEmptyMainView}>
                      <Text style={styles.flatlistEmptyText}>{i18n.t('notFound')}</Text>
                    </View>
                    : null)}
                renderItem={({item,index}) => this.getOrderDataList(item,index)}
                keyExtractor={(item) => item.id}
                />
                
            </View>


            <Modal
                testID="btnCancelModal"
                animationType="slide"
                transparent={true}
                visible={this.state.cancelOrderModal}>

                <View style={styles.modalMainViewOrd}>
                    <SafeAreaView style={styles.modalSafeArea} />

                    <View style={styles.modalButtonMainViewOrd}>
                        <Text style={styles.cancelOrderText}>
                            {i18n.t('cancelDescriptiion')}
                        </Text>

                        <View style={styles.modalTwoBtnViewOrd}>
                            <TouchableOpacity
                                testID={"btnCancelOrderNo"}
                                style={styles.cancelTouch}
                                onPress={() => {
                                    this.cancelModalClose()
                                }}>
                                <Text style={styles.noText}>{i18n.t('No')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                testID="btnCancelOrderYes"
                                style={styles.yesTouchOrd}
                                onPress={() => {
                                    this.cancelOrderConfirm()
                                }}>
                                <Text style={styles.yesText}>{i18n.t('Yes')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerEdit:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerEdit: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewMangeTiming:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewManageTime:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchManageTime:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconManageTime:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleManageTime:{
        color:'#375280',
        textAlign:'center',
        fontSize:windowWidth*5/100,
        fontFamily:'Avenir-Heavy'
    },
    extraViewManageTime:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewEdit:{
        marginTop:windowWidth*4/100,
    },
    blueThemeColorEdit:{
        color:'#375280'
    },
    itemSepratorSecondFlat:{
        height:windowHeight*2/100
    },
    itemSepratorEdit:{
        width: windowWidth*90/100,
        borderBottomColor:'#CBD5E1',
        borderBottomWidth:1,
        alignSelf:'center'
    },
    btnMainViewWork:{
        marginTop:windowWidth*8/100,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:windowWidth*4/100
      },
      btnCancelButtonOrder:{
        width:windowWidth*43/100,
        height:windowHeight*5.5/100,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderColor:'#CCBEB1',
        borderWidth:1
      },
      cancelButtonTextOrder:{
        color:'#375280',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4/100,
        fontWeight:'500'
      },
      btnOrderStatusOrder:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*43/100,
        height:windowHeight*5.5/100,
        borderRadius:2,
        justifyContent:'center'
      },
      buttonOrderStatusText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4.5/100,
        fontWeight:'500'
    },
    flatMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*4/100
    },
    orderIdView:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemIdView:{
        flexDirection:'row',
    },
    orderIDText:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    itemFlatView:{
        marginTop:windowWidth*3/100
    },
    itemImage:{
        width:windowWidth*25/100,
        height:windowWidth*25/100
    },
    itemTextView:{
        marginLeft:windowWidth*3/100
    },
    itemText:{
        color:'#375280',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    itemAnotherMainView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:windowWidth*60/100,
        marginTop:windowWidth*2/100,
    },
    itemAnotherMainText:{
        color:'#94A3B8',
        fontSize:windowWidth*3.2/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderRemianingView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:windowWidth*3/100
    },
    orderRemainingText:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderReaminingDynamicText:{
        color:'#94A3B8',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderAddressText:{
        color:'#94A3B8',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
        width:windowWidth*50/100,
        textAlign:"right"
    },
    flatContainer:{
        paddingBottom:windowWidth*50/100
    },
    sizeView:{
        width:windowWidth*20/100
    },
    flatlistEmptyMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:windowHeight*35/100
    },
    flatlistEmptyText:{
        fontSize:windowWidth*5/100,
        fontFamily:'Avenir-Heavy',
        color:'#375280'
    },
    modalMainViewOrd:{
        flex: 1,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center",
    },
    modalSafeArea:{
        flex: 0, 
        backgroundColor: "#00000080"
    },
    modalButtonMainViewOrd:{
        height: (windowHeight * 22) / 100,
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: (windowWidth * 7) / 100,
        justifyContent: "space-between",
    },
    cancelOrderText:{
        fontSize: (windowWidth * 4.3) / 100,
        color: "#375280",
        textAlign:'center',
        fontFamily:'Lato-Bold'
    },
    modalTwoBtnViewOrd:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelTouch:{
        backgroundColor: "#FFFFFF",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
        borderWidth:1,
        borderColor:'#CCBEB1'
    },
    noText:{
        textAlign: "center",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
        color:'#375280'
    },
    yesTouchOrd:{
        backgroundColor: "#CCBEB1",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
    },
    yesText:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
    }
});
// Customizable Area End