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

import TappaymentDEarningActivityController, { Props,EarningActivityProps } from "./TappaymentDEarningActivityController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import Timeline from 'react-native-timeline-flatlist'
// Customizable Area End

export default class TappaymentDEarningActivity extends TappaymentDEarningActivityController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getEarningActivityView = (itemAllOrder:EarningActivityProps,indexOrder:number)=>{
        let value = itemAllOrder;
        return (
            <View>
                <View style={styles.flatMainView}>
                    <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
                        <Text style={[styles.flatListOrderText,{textAlign: TextAlignManage(i18n.language)}]}>#{value.order_number}</Text>
                        <Text style={[styles.flatListOrderText,{textAlign: TextAlignManage(i18n.language)}]}> | {this.convertTimeActivity(value.date+' '+value.time)}</Text>
                        <Text style={[styles.flatListOrderText,{textAlign: TextAlignManage(i18n.language)}]}> | {this.convertDateActivity(value.date)}</Text>
                    </View>
                    <View style={styles.flatBorderView}></View>

                    <View style={[styles.flatMarginManage]}>
                    <Timeline
                        data={this.convertAddress(value.pick_up_store,value.delivery_address)}
                        circleSize={15}
                        columnFormat={this.timelineFlatListArabicManage(i18n.language)}
                        circleColor='rgba(204, 190, 177, 1)'
                        lineColor='rgba(204, 190, 177, 1)'
                        descriptionStyle={[styles.descriptionText,{textAlign: TextAlignManage(i18n.language)}]}
                        titleStyle={[styles.textStyleText,{textAlign: TextAlignManage(i18n.language)}]}
                        showTime={false}
                        dotSize={1}
                        innerCircle={'icon'}
                        options={{
                            bounces: false
                        }}
                    />
                    </View>
                </View>
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
              <View style={[styles.headerViewAddBankDriver,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackEarningActivity" style={styles.backTouchAddBankDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddBankDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddBankDriver}>{i18n.t('earningActivityText')}</Text>
                </View>
                <View style={styles.filterExtraTouchBank}>
                </View>
              </View>

            </View>


            <View style={styles.marginTenManage}>
                <FlatList
                    testID={"earningActivityFlatlist"}
                    bounces={false}
                    data={this.state.earningActivityArr}
                    contentContainerStyle={styles.scrollPaddingManage}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=>{return(<View style={styles.flatlistItemSepView}>

                    </View>)}}
                    ListEmptyComponent={() =>
                        !this.state.loading ? (
                        <View style={styles.emptyLisyViewPayment}>
                            <Text style={styles.emptyFlatlistTextPayment}>
                            {i18n.t('noEarningActivityFoundText')}
                            </Text>
                        </View>
                        ) : null
                    }
                    renderItem={({item,index}) => this.getEarningActivityView(item,index)}
                    keyExtractor={(item) => item.id}
                />
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
        alignContent:'center'
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
    bankAddMainViewDriver:{
        marginTop:windowWidth*5/100
    },
    scrollPaddingManage:{
        paddingBottom:150
    },
    emptyLisyViewPayment: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistTextPayment: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    descriptionText:{
        color:'#375280',
        fontSize:windowWidth*3.8/100,
        fontFamily:'Lato-Regular',
        marginTop:windowWidth*1/100,
        paddingBottom:windowWidth*8/100
    },
    textStyleText:{
        color:'#94A3B8',
        fontSize:windowWidth*3.8/100,
        fontFamily:'Lato-Regular',
        marginTop:-windowWidth*3/100
    },
    flatMainView:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    flatBorderView:{
        borderWidth:0.8,
        borderColor:'#D5D5D5',
        marginTop:windowWidth*5/100
    },
    flatMarginManage:{
        marginTop:windowWidth*6/100
    },
    flatListOrderText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.8/100
    },
    marginTenManage:{
        marginTop:windowWidth*10/100
    },
    flatlistItemSepView:{
        borderTopWidth:1,
        borderTopColor:'#D5D5D5',
        paddingBottom:windowWidth*5/100
    }
});
