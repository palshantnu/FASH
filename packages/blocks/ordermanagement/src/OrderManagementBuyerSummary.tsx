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
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import OrderManagementBuyerSummaryController, { Props } from "./OrderManagementBuyerSummaryController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import ImageNotFound from "../../../components/src/ImageNotFound";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

export default class OrderManagementBuyerSummary extends OrderManagementBuyerSummaryController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  getOrderDataList=(item:{ id:string,
    attributes:{driver_name: string;
        quantity: number,
        catalogue_name: string,
        catalogue_variant_color: string,
        catalogue_variant_size:string,
        catalogue_variant_front_image:string|null,
        store_name:string|undefined,
        status: string,
        reason_of_return: string,stylist_full_name:string}},index:number)=>{
    return (
        <View>
            <View style={[styles.itemIdViewOrderSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Image style={styles.itemImageOrderSum} source={ImageNotFound(item.attributes.catalogue_variant_front_image)}></Image>
                <View style={[styles.itemTextViewOrderSum,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*3/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                   
                        <Text numberOfLines={1} style={[styles.itemText,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.catalogue_name}</Text>
                    
                    <View style={[styles.itemAnotherMainViewOrderSum,{flexDirection:FlexConditionManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,0,0),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,0)}]}>
                        <View style={styles.sizeView}>
                            <Text style={styles.itemAnotherMainTextOrderSum}>{i18n.t("size")}: {item.attributes.catalogue_variant_size}</Text>
                        </View>
                        <View style={styles.sizeView}>
                            <Text numberOfLines={1} style={styles.itemAnotherMainTextOrderSum}>{i18n.t("color")}: {item.attributes.catalogue_variant_color}</Text>
                        </View>
                            <Text style={styles.itemAnotherMainTextOrderSum}>{i18n.t("Quantity")}: {item.attributes.quantity}</Text>
                    </View>
                   { item.attributes.status!=="returned" && <View style={[styles.orderstatus,{right:ManageDynamicMargin(i18n.language,0,10),left:ManageDynamicMargin(i18n.language,10,0)}]}>
                    <TouchableOpacity testID="btnOrderStatus" style={styles.btnOrderStatusOrderSum} onPress={()=>{this.btnOrderStatusRedirect(this.state.orderDetailArr.id,item.attributes.status, item.id)}}>
                            <Text style={styles.buttonOrderStatusTextSum}>{i18n.t("order_status")}</Text>
                    </TouchableOpacity>
                    </View>
                    }
                </View>
            </View>
            {
                item.attributes.store_name === undefined ?
                <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.orderRemainingTextSum}>{i18n.t("StylistName")} :</Text>
                    <Text style={styles.orderReaminingDynamicTextSum}>{item.attributes.stylist_full_name}</Text>
                </View>
                :
                <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.orderRemainingTextSum}>{i18n.t('StoreName')} :</Text>
                    <Text style={styles.orderReaminingDynamicTextSum}>{item.attributes.store_name}</Text>
                </View>
            }
            <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={styles.orderRemainingTextSum}>{i18n.t('DeliveryPartner')} :</Text>
                <Text style={styles.orderReaminingDynamicTextSum}>{item.attributes.driver_name}</Text>
            </View>
        </View>

    )
  }
  showButtons(){
    
   let status:string=""
   this.state.orderDetailArr.attributes.order_items.forEach(element => {
        status=element.attributes.status
     } )
    
     if(status==="return_placed" ){ return(
        <>
           <View style={styles.btnMainViewWorkSum}>
                        <TouchableOpacity testID="btnCancelOrder" style={styles.btnReturnButtonOrder} onPress={()=> this.returnCancelOrder()}>
                            <Text style={styles.returnButtonTextOrder}>{i18n.t("ReturnCancel")}</Text>
                        </TouchableOpacity>
                    </View>
         </>
         )
         
    
    }else
    if(status==="delivered" ){ return(
        <>
            <View style={styles.btnMainViewWorkSum}>
                        <TouchableOpacity testID="btnCancelOrder" style={styles.btnReturnButtonOrder} onPress={()=> this.returnOrder()}>
                            <Text style={styles.returnButtonTextOrder}>{i18n.t("ReturnOrder")}</Text>
                        </TouchableOpacity>
                    </View>
         </>
         )
    }else{
        return null
    }
}
showReturnRejectionText=()=>{
    let returnReason=""
    this.state.orderDetailArr.attributes.order_items.forEach(element => {
        if(element.attributes.reason_of_return!="" && element.attributes.reason_of_return!=null){
            returnReason=element.attributes.reason_of_return  
    }
    })
    if(returnReason!==""){
    return(
        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={styles.orderRemainingTextSum}>{i18n.t("Reasonreturn")} :</Text>
            <Text style={[styles.orderReaminingDynamicTextSum,{textTransform:'capitalize',width:'50%',textAlign:i18n.language==="ar"?'left':'right'}]}>{returnReason}</Text>
        </View>
)
    }
}
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerSum}>
        <SafeAreaView style={styles.safeViewContainerSum}/>
        <ScrollView style={{marginBottom:40}}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewOrderSum,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewOrderSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackOrderSummary" style={styles.backTouchOrderSum} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrderSum,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleOrderSum}>{i18n.t("OrderSummary")}</Text>
                </View>
                <View style={styles.extraViewOrderSum}>
                </View>
            </View>
        </View>


            <View style={styles.storeCreateMainViewStoreSum}>
                <View style={styles.flatMainViewOrderSum}>
                    <View style={[styles.orderIdViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.orderIDTextSum}>{i18n.t("OrderID")} : # {this.state.orderDetailArr.attributes.order_number}</Text>
                        <Text style={styles.orderIDTextSum}>{this.state.orderDetailArr.attributes.order_items.length+this.state.retern_items.length} {i18n.t("product")}</Text>
                    </View>
                    <View style={styles.itemFlatViewSum}>
                        <FlatList
                        testID={"orderDetailItemDataList"}
                        bounces={false}
                        data={this.state.orderDetailArr.attributes.order_items}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.itemSepratorSecondFlatSum} />}
                        renderItem={({item,index}) => this.getOrderDataList(item,index)}
                        keyExtractor={(item) => item.id}
                        />
                    </View>
                   {this.state.retern_items.length>0&& <View style={[styles.orderIdViewSum,{borderTopWidth:1,borderTopColor:'#CBD5E1',marginBottom:windowWidth*1/100,marginTop:windowWidth*4/100,paddingTop:windowWidth*4/100}]}>
                    <Text numberOfLines={1} style={styles.itemTextReturn}>{i18n.t("ReturnedItems")}</Text>
                    </View>
                    }
                    <View style={styles.itemFlatViewSum}>
                        <FlatList
                        testID={"orderDetailItemDataList2"}
                        bounces={false}
                        data={this.state.retern_items}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.itemSepratorSecondFlatSum} />}
                        renderItem={({item,index}) => this.getOrderDataList(item,index)}
                        keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={{borderTopWidth:1,borderTopColor:'#CBD5E1',marginTop:windowWidth*4/100}}>
                        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.orderRemainingTextSum}>{i18n.t("CustomerName")} :</Text>
                            <Text style={styles.orderReaminingDynamicTextSum}>{this.state.orderDetailArr.attributes.delivery_addresses.attributes.name}</Text>
                        </View>
                        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.orderRemainingTextSum}>{i18n.t("order_status")} :</Text>
                            <Text style={[styles.orderReaminingDynamicTextSum,{textTransform:'capitalize'}]}>{this.state.orderDetailArr.attributes.status!=""&&this.statusManage(this.state.orderDetailArr.attributes.status.replace('_'," "))}</Text>
                        </View>
                        {this.showReturnRejectionText()}
                       
                        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.orderRemainingTextSum}>{i18n.t("DeliveryDate")} :</Text>
                            <Text style={styles.orderReaminingDynamicTextSum}>{this.dateFormatChangeSummary(this.state.orderDetailArr.attributes.order_date)}</Text>
                        </View>
                        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.orderRemainingTextSum}>{i18n.t("ShippingAddress")} :</Text>
                            <Text style={[styles.orderAddressTextSum,{textAlign:i18n.language==="ar"?'left':'right'}]}>{this.state.orderDetailArr.attributes.delivery_addresses.attributes.house_or_building_number} {this.state.orderDetailArr.attributes.delivery_addresses.attributes.block} {this.state.orderDetailArr.attributes.delivery_addresses.attributes.area} {this.state.orderDetailArr.attributes.delivery_addresses.attributes.street}, {this.state.orderDetailArr.attributes.delivery_addresses.attributes.city}, {this.state.orderDetailArr.attributes.delivery_addresses.attributes.zip_code}</Text>
                        </View>
                        {
                            this.state.orderDetailArr.attributes.applied_copon_code !== null &&
                            <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.orderRemainingTextSum}>{i18n.t("couponApplied")} :</Text>
                                <Text style={styles.orderReaminingDynamicTextSum}>{this.state.orderDetailArr.attributes.applied_copon_code}(-{PriceConvertValue(this.state.orderDetailArr.attributes.applied_discount,this.state.localCurrency)})</Text>
                            </View>
                        }
                        <View style={[styles.orderRemianingViewSum,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.orderRemainingTextSum}>{i18n.t("PaymentMode")} :</Text>
                            <Text style={styles.orderReaminingDynamicTextSum}>{this.state.orderDetailArr.attributes.payment_detail.payment_type} Card ending {this.state.orderDetailArr.attributes.payment_detail.last_four_card_digit}</Text>
                        </View>
                    </View>
                  
                    {this.showButtons()}
                </View>
                
            </View>
            <Modal
            testID="btnCancelModal"
            animationType="slide"
            transparent={true}
            visible={this.state.cancelOrderModal}>

            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafeArea} />

                <View style={styles.modalButtonMainView}>
                <Text style={styles.cancelOrderText}>
                    {i18n.t("cancelDescriptiion")}
                </Text>

                <View style={styles.modalTwoBtnView}>
                    <TouchableOpacity
                    testID={"btnCancelOrderNo"}
                    style={styles.cancelTouch}
                    onPress={() => {
                        this.cancelModalClose()
                    }}>
                    <Text style={styles.noText}>{i18n.t("No")} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    testID="btnCancelOrderYes"
                    style={styles.yesTouch}
                    onPress={() => {
                        this.cancelOrderConfirm()
                    }}>
                    <Text style={styles.yesText}>{i18n.t("Yes")}</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>
            </ScrollView>
        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerSum:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerSum: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewOrderSum:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewOrderSum:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchOrderSum:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconOrderSum:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleOrderSum:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewOrderSum:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewStoreSum:{
        marginTop:windowWidth*4/100,
    },
    itemSepratorSecondFlatSum:{
        height:windowHeight*2/100
    },
    orderstatus: 
    {position:"absolute",bottom:10},
    btnMainViewWorkSum:{
        marginTop:windowWidth*8/100,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingBottom:windowWidth*4/100,
        borderBottomWidth:1,
        borderBottomColor:'#CBD5E1'
    },
    btnReturnButtonOrder:{
        width:windowWidth*90/100,
        height:windowHeight*5.5/100,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    returnButtonTextOrder:{
        color:'#375280',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4/100,
        fontWeight:'500'
    },
    btnOrderStatusOrderSum:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*30/100,
        height:windowHeight*3.8/100,
        borderRadius:2,
        alignSelf:"flex-end",
        justifyContent:"center",
        alignItems:"center"
    },
    buttonOrderStatusTextSum:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4/100,
        fontWeight:'500',
        top: -2,
    },
    flatMainViewOrderSum:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*4/100
    },
    orderIdViewSum:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemIdViewOrderSum:{
        flexDirection:'row',
        width:"100%",
        // justifyContent:"space-between"
    },
    orderIDTextSum:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.3/100
    },
    itemFlatViewSum:{
        marginTop:windowWidth*3/100
    },
    itemImageOrderSum:{
        width:windowWidth*25/100,
        height:windowWidth*25/100
    },
    itemTextViewOrderSum:{
        // marginLeft:windowWidth*3/100,
        // justifyContent:'center',
        // alignItems: 'flex-end',
        width:"70%"
    },
    itemTextReturn:{
        color:'#375280',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500',
        fontFamily:'Lato-Bold'
    },
    itemText:{
        color:'#375280',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
    },
    itemAnotherMainViewOrderSum:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:windowWidth*60/100,
        marginTop:windowWidth*2/100,
    },
    itemAnotherMainTextOrderSum:{
        color:'#94A3B8',
        fontSize:windowWidth*3.2/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderRemianingViewSum:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:windowWidth*3/100
    },
    orderRemainingTextSum:{
        color:'#375280',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderReaminingDynamicTextSum:{
        color:'#94A3B8',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular'
    },
    orderAddressTextSum:{
        color:'#94A3B8',
        fontSize:windowWidth*3.5/100,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
        width:windowWidth*50/100,
        textAlign:"right"
    },
    sizeView:{
        width:windowWidth*22/100
    },
    modalMainView:{
        flex: 1,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center",
    },
    modalSafeArea:{
        flex: 0, 
        backgroundColor: "#00000080"
    },
    modalButtonMainView:{
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
    modalTwoBtnView:{
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
    yesTouch:{
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