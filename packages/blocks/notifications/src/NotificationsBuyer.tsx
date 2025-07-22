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
import { backIcon } from "./assets";

import NotificationsBuyerController, { Props, NotificationData } from "./NotificationsBuyerController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import HTMLView from 'react-native-htmlview';
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class NotificationsBuyer extends NotificationsBuyerController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  getNotificationView = (itemAllNotification: NotificationData,indexOrder:number)=>{
    let value = itemAllNotification.attributes;
    const styleshtml = {
        p: {
            fontFamily: 'Lato-Regular',
            fontWeight: '500' as const, // TypeScript interprets it as one of the allowed values
            fontSize: windowWidth * 3.8 / 100,
            color: value?.is_read ? '#94A3B8' : '#375280',
        },
      }
        return (
            <View style={styles.notificationMainView}>
            <TouchableOpacity 
            testID="notificationTouch"
            onPress={()=>{
                this.onNavigateScreen(value.action, value)
            }}>
            <HTMLView
                value={value?.contents}
                stylesheet={styleshtml}
              />
                <Text style={styles.notificationTimeText}>{this.timeAgo(value?.created_at)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.containerDriver}>
            <SafeAreaView style={styles.safeContainerBank}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerDriverViewAddBank,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewAddBankDriver,{ flexDirection: FlexConditionManage(i18n.language) }]}>
                <TouchableOpacity testID="btnBackNotifications" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddBankDriver,{
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  }]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddBankDriver}>{i18n.t("notificationText")}</Text>
                </View>
                <View testID="btnSettingRedirection" style={styles.filterExtraTouchBank}>
                </View>
              </View>
            </View>

                <View style={[styles.containerDriverViewAddBank,styles.marginManage]}>

                    {
                        this.state.selectedModeStr !== "Delivery Partner" &&
                        <View style={[styles.storeMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="alltab" style={[styles.tabsTouch,{borderBottomWidth:this.state.notificationType === 'all'? 2:0}]} onPress={()=>{this.activeAnalytics('all')}}>
                                <Text style={[styles.tabsTitleText,{color:this.state.notificationType === 'all' ?'#375280':'#94A3B8'}]}>{i18n.t("allText")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="dealTab" style={[styles.tabsTouch,{borderBottomWidth:this.state.notificationType === 'deals'? 2:0}]} onPress={()=>{this.activeAnalytics('deals')}}>
                                <Text style={[styles.tabsTitleText,{color:this.state.notificationType === 'deals' ?'#375280':'#94A3B8'}]}>{i18n.t("dealsText")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity testID="yourOrderTab" style={[styles.tabsTouch,{borderBottomWidth:this.state.notificationType === 'yourOrder'? 2:0}]} onPress={()=>{this.activeAnalytics('yourOrder')}}>
                                <Text style={[styles.tabsTitleText,{color:this.state.notificationType === 'yourOrder' ?'#375280':'#94A3B8'}]}>{i18n.t("yourOrderText")}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                    <View style={styles.marginManage}>
                        <FlatList
                        testID={"notificationRenderFlatlist"}
                        bounces={false}
                        data={this.state.flatNotificationArr}
                        contentContainerStyle={styles.scrollPaddingManage}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=>{return(<View style={styles.flatlistItemSepView}>
                        </View>)}}
                        ListEmptyComponent={() =>
                            !this.state.loading ? (
                            <View style={styles.emptyLisyViewPayment}>
                                <Text style={styles.emptyFlatlistTextPayment}>
                                {i18n.t("notificationNotFoundMsg")}
                                </Text>
                                <Text style={styles.flatListEmptySubTitleText}>{i18n.t("notificationEmptyMessage")}</Text>
                            </View>
                            ) : null
                        }
                        renderItem={({item,index}) => this.getNotificationView(item,index)}
                        keyExtractor={(item) => item.id}
                    />
                    </View>

                </View>

        </View>
      //Merge Engine End DefaultContainerDriver
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerDriver: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainerBank:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    containerDriverViewAddBank:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewAddBankDriver:{
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center'
    },
    backTouchAddBankDriver:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssAddBankDriver:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAddBankDriver:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraTouchBank:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    scrollPaddingManage:{
        paddingBottom:windowWidth*55/100
    },
    mainCateSubCateView: {
        height: (windowHeight * 6.5) / 100,
        marginTop: (windowWidth * 7) / 100,
        width: (windowWidth * 90) / 100,
        borderRadius: 3,
        justifyContent: "center",
    },
    itemSeprator: {
        width: (windowWidth * 2) / 100,
    },
    marginManage:{
        marginTop:windowWidth*4/100
    },
    backIconCss:{
        width:windowWidth*4/100,
        height:windowWidth*4/100
    },
    fontSetup: {
        fontFamily: "Lato-Regular",
        fontWeight: "500",
        fontSize:windowWidth*4.2/100,
        textAlign:'center'
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
    marginManageTop:{
        marginTop:windowWidth*10/100
    },
    chartXLable:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'600',
        fontSize:windowWidth*3.5/100
    },
    themeColor:{
        color:'#375280'
    },
    allStoreView:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
    },
    allStoreText:{
        width:windowWidth*75/100,
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4/100
    },
    storeMainView:{
        flexDirection:'row',
        borderBottomColor:'#94A3B8',
        borderBottomWidth:0.5
    },
    tabsTouch:{
        width:windowWidth*30/100,
        borderBottomColor:'#375280',
        justifyContent:'center',
        alignItems:'center',
        height:windowHeight*5/100
    },
    tabsTitleText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.8/100
    },
    scrollContain:{
        paddingBottom:windowWidth*20/100
    },
    emptyLisyViewPayment: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 34) / 100,
    },
    emptyFlatlistTextPayment: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Lato-Regular",
        fontWeight:'500',
        color: "#375280",
    },
    flatlistItemSepView:{
        borderTopWidth:1,
        borderTopColor:'#D5D5D5',
        paddingBottom:windowWidth*4/100,
        marginTop:windowWidth*4/100
    },
    flatListEmptySubTitleText:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.8/100,
        fontWeight:'500',
        marginTop:windowWidth*2/100
    },
    notificationMainView:{
        padding:5
    },
    notificationTimeText:{
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        color:'#94A3B8',
        fontSize:windowWidth*3.5/100,
        marginTop:windowWidth*2/100
    }
});
