import React from "react";
// Customizable Area Start
import StlyingDetailsController, {Props } from "./StlyingRequestDetailsController";
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, StatusBar,ScrollView } from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
const { width } = Dimensions.get("window");
// Customizable Area End

export default class StlyingRequestDetails extends StlyingDetailsController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    itemSeparator = () => <View style={styles.separator} />;

    _listEmptyComponent = () => {
        return (
            <View>
               <Text>{i18n.t('no_image_available')}</Text>
            </View>
        )
    }

    renderImageContainer = () => {
        return(
            <FlatList
                 testID="flatlistTestID"
                  horizontal={true}
                  inverted={i18n.language === 'ar' ?true:false}
                  style={{marginTop:verticalScale(20)}}
                  data={this.state.stylishData?.data.attributes.images}
                  keyExtractor={(item, index) => index.toString()}
                   renderItem={({ item, index }) => (
                    <Image source={{uri:item.url}} style={styles.catlougeImg} testID="btnScreen"/>
                 )}
                 ItemSeparatorComponent={this.itemSeparator}
                 ListEmptyComponent={this._listEmptyComponent}
              />
        )
     }

    descriptionBox = () => {
        return (
            <View style={{ marginTop: Scale(24) }}>
                <View style={[styles.textBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.titleTxt}>{this.state.stylishData?.data.attributes.stylist_name}</Text>
                </View>

                < View style={[styles.textBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.lightTxt}>{i18n.t('gender')} - <Text style={styles.planText}>{this.state.stylishData?.data.attributes.gender}</Text></Text>
                    <Text style={styles.lightTxt}>{i18n.t('budget')} - <Text style={styles.planText}>{this.state.localCurrency}{this.state.stylishData?.data.attributes.min_price} - {this.state.localCurrency}{this.state.stylishData?.data.attributes.max_price}</Text></Text>
                </View>

                <View style={[styles.textBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.lightTxt}>{i18n.t('colours')} - <Text style={styles.planText}>{this.state.stylishData?.data.attributes.colour||''}</Text></Text>
                </View>
                <Text style={styles.descrptionTxt}>
                  {this.state.stylishData?.data.attributes.detail}  
                </Text>
                {this.state.stylishData?.data.attributes.status == 'pending' &&
                    <View style={[styles.btnBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <TouchableOpacity style={[styles.button, styles.rejectBtn]} testID="isRejectTestID" onPress={()=>this.isAccept('rejected')}>
                            <Text style={styles.rejectBtnText}>{i18n.t('reject')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.acceptBtn]} testID="acceptBtnTestId" onPress={()=>this.isAccept('accepted')}>
                            <Text style={styles.acceptBtnText}>{i18n.t('accept')}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {this.state.stylishData?.data.attributes.status == 'accepted' &&
                    <TouchableOpacity style={styles.chatBtn} testID="chatBtnTestId" onPress={()=> {this.navigateToChat(this.state.stylishData?.data.attributes.buyer_id)}}>
                        <Text style={styles.acceptBtnText}>{i18n.t('chat_with_customer')}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
    renderHeaderContainer(){
        return(
              <View style={[styles.upperTxtBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.orderNumber}>#{this.state.stylishData?.data.attributes.stylist_id}-{this.state.stylishData?.data.id} | {this.state.stylishData?.data?.attributes?.created_at && this.state.stylishData?.data?.attributes?.created_at.slice(0, -2) + " " + this.state.stylishData?.data?.attributes?.created_at.slice(-2).toUpperCase()}</Text>
                    <View style={[styles.acceptBtnStyle,{backgroundColor:this.getStatusBackgroundColor(this.state.stylishData?.data.attributes.status)}]}>
                      <Text style={[styles.statusCurrentTxt,{color:this.getStatusColor(this.state.stylishData?.data.attributes.status)}]}>{this.getStatus(this.state.stylishData?.data.attributes.status)}</Text>
                   </View>
                </View>
        )
    }
    // Customizable Area End

    render() {
        return (
            // Customizable Area Start
            <View style={styles.container}>
              <SafeAreaView>
                 <StatusBar
                     backgroundColor="#ffffff"
                      barStyle="dark-content"
                      hidden={false}
                      translucent={false}
                       networkActivityIndicatorVisible={false}
                    />
                <CustomHeader
                    title={i18n.t('styling_requests')}
                    onLeftPress={this.goBack}
                    onRightPress={undefined}
                    data-test-id="goBackBtn"
                />
                {this.state.isLoading && <CustomLoader/>}   
                <ScrollView style={styles.scrollstyle}>
                {this.renderHeaderContainer()}
                {this.renderImageContainer()}
                {this.descriptionBox()}
                </ScrollView>
             </SafeAreaView>  
            </View>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    icon: {
        width: (width * 4) / 100,
        height: (width * 5) / 100,
    },
    upperTxtBox: {
        justifyContent: "space-between",
    },
    orderNumber: {
        fontSize: Scale(14),
        color: '#375280',
        fontWeight: "400",
        fontFamily: 'Lato-regular',
        fontStyle:'normal',
        lineHeight: 22,
    },
    acceptBtnStyle:{
        height: verticalScale(27),
        alignItems: 'center',
        paddingLeft: Scale(10),
        paddingRight: Scale(10),
        justifyContent: 'center',  
        fontFamily:'Lato-regular',
        fontWeight:'400',
        fontStyle:'normal',
        borderRadius:5,

    },
    statusCurrentTxt: {
        fontSize: Scale(12),
        fontWeight: "400",
        fontFamily: 'Lato-regular',
        fontStyle:'normal',
        lineHeight: 18,
        textAlign: 'center',
    },
    catlougeImg: {
        height: verticalScale(80),
        width: Scale(80),

    },
    separator: {
        height:verticalScale(12),
        width: Scale(12),
        backgroundColor: 'transparent',
    },
    textBox: {
        justifyContent: "space-between",
        marginBottom: Scale(16)
    },
    titleTxt: {
        color: "#375280",
        fontSize: 18,
        fontWeight: "700",
        fontFamily: 'Lato-bold',
        fontStyle:'normal',
        lineHeight: 26,
    },
    planText:{
        fontSize: Scale(16),
        fontWeight: "700",
        fontFamily: 'Lato-Bold',
        fontStyle:'normal',
        lineHeight: 24,
    },
    lightTxt: {
        color: "#375280",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: 'Lato-regular',
        lineHeight: 24,
        fontStyle:'normal',
    },
    descrptionTxt: {
        fontSize: Scale(18),
        color: '#375280',
        marginBottom: 10,
        textAlign: 'justify',
        fontFamily: 'Lato-regular',
        fontWeight: '400',
        lineHeight: 26,
        fontStyle:'normal',
    },
    btnBox: {
        justifyContent: 'space-between',
        marginTop:verticalScale(14),
        marginBottom:verticalScale(40)
    },
    button: {
        flex: 1,
        padding: Scale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    rejectBtn: {
        backgroundColor: '#FFFFFF',
        borderWidth: Scale(1),
        borderColor: '#F87171',
        marginRight: Scale(10),
    },
    acceptBtn: {
        backgroundColor: '#CCBEB1',
    },
    rejectBtnText: {
        color: '#F87171',
        fontSize: Scale(18),
        fontWeight: '700',
        fontFamily: 'Lato-bold',
    },
    chatBtn: {
        backgroundColor: '#CCBEB1',
        alignItems: 'center',
        justifyContent: 'center',
        height: Scale(54),
        marginTop:verticalScale(14),
        marginBottom:verticalScale(40)
    },
    acceptBtnText: {
        color: '#FFFFFF',
        fontSize: Scale(18),
        fontWeight: '700',
        fontFamily: 'Lato-bold',
    },
    scrollstyle: { 
        paddingLeft:Scale(24),
        paddingRight:Scale(24),
        paddingTop:verticalScale(24),
        marginBottom:verticalScale(45)
     }
});
// Customizable Area End
