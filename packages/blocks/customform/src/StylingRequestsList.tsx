import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Platform
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import StylingRequestsListController, {
    PlatformKeys,
    Props,
} from "./StylingRequestsListController";
import { backIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

export default class StylingRequestsList extends StylingRequestsListController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start
    rendersStylingRequestListContainer = () => {
        return (
            <FlatList
                testID="flatlistTestID"
                data={this.state.stylingrequestArr}
                keyExtractor={(item, index) => index.toString()}
                style={{marginTop:verticalScale(24),marginBottom:verticalScale(40)}}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[styles.requestContainer, { marginHorizontal: Scale(this.PlatformCss[Platform.OS as PlatformKeys])}]}>
                            <View style={[styles.dateView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.requestId}>#{item?.attributes?.stylist_id}-{item?.id}| {item?.attributes?.created_at.slice(0, -2) + " " + item?.attributes?.created_at.slice(-2).toUpperCase()}</Text>
                                <View style={[styles.newRequestBtnStyle,{backgroundColor:this.getStatusBackgroundColor(item?.attributes?.status)}]}>
                                    <Text style={[styles.accepStyles,{color:this.getStatusColor(item?.attributes?.status)}]}>{this.getStatus(item?.attributes?.status)}</Text>
                                </View>
                            </View>
                            <View style={[styles.genderView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.name}>{item?.attributes?.stylist_name}</Text>
                            </View>

                            <View style={[styles.genderBudgetContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.budget}>{i18n.t('budget')}</Text>
                                <Text style={styles.budget}>{this.state.localCurrency}{item?.attributes?.min_price} - {this.state.localCurrency}{item?.attributes?.max_price}</Text>
                            </View>
                            <TouchableOpacity style={styles.viewRequestButton} testID="navigationHandlerTestId" onPress={()=>this.navigationHandler(item.id)}>
                                <Text style={styles.viewRequestText}>{i18n.t('view_request')}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        )
    }

    renderHeaderContainer = () =>{
      return(
          <View style={[styles.headerViewCli,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackStyling"
              style={styles.backTouchStylingReq}
              onPress={()=> this.onGoback()}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCssN,{marginLeft:Scale(this.PlatformHeaderCss[Platform.OS as PlatformKeys]),transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleStylingReq}>{i18n.t('styling_requests')}</Text>
            </View>
            <View style={styles.extraSpace} />
          </View>
      )  
    }

    renderEmptyListContainer = () => {
       return(
        <View style={styles.emptyView}>
            <Text style={styles.emptyText}>{i18n.t('no_styling_requests_available')}</Text>
        </View>
       ) 
    }
    // Customizable Area End

    render() {
        // Customizable Area Start

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.mainView}>
                <StatusBar
                     backgroundColor="#ffffff"
                      barStyle="dark-content"
                      hidden={false}
                      translucent={false}
                       networkActivityIndicatorVisible={false}
                  /> 
                 {this.renderHeaderContainer()}
                 {this.state.isLoading && <CustomLoader/>}
                 {this.state.stylingrequestArr.length == 0 && !this.state.isLoading && this.renderEmptyListContainer()} 
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                {this.state.stylingrequestArr.length !== 0 && !this.state.isLoading  && this.rendersStylingRequestListContainer()}
                </ScrollView>
                </SafeAreaView>
            </View>
        )
        // Customizable Area End

    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    mainView:{
        flex: 1,
        backgroundColor: "#ffff",
        padding: 20,
    },
    scrollView: {
        backgroundColor: '#ffff'
    },
    requestContainer: {
        flex: 1,
        marginVertical: Scale(20),
        backgroundColor: "#ffff",
    },
    requestId: {
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.14,
        lineHeight: 22,
        color: '#375280',
        fontFamily:'Lato-regular',
    },
    name: {
        fontSize: 18,
        color: '#375280',
        fontWeight: '700',
        lineHeight: 24,
        fontFamily:'Lato-bold',
    },
    genderBudgetContainer: {
        justifyContent: 'space-between',
        marginTop: Scale(13),
    },
    gender: {
        fontSize: 14,
        fontWeight: '500',
        color: '#375280'
    },
    budget: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 22,
        color: '#375280',
        fontFamily:'Lato-bold',

    },
    viewRequestButton: {
        marginTop: verticalScale(13),
        paddingVertical: Scale(10),
        backgroundColor: 'transparent',
        borderRadius: 5,
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCBEB1'
    },
    viewRequestText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
        color: '#375280',
        fontFamily:'Lato-Regular',
    },
    newRequestBtnStyle: {
        height: verticalScale(27),
        alignItems: 'center',
        paddingLeft: Scale(10),
        paddingRight: Scale(10),
        justifyContent: 'center',
        borderRadius:5
    },
    newTextStyle: {
        fontSize: 12,
        lineHeight: 18,
        color: '#059669'
    },
    accepStyles:{
        fontSize: 12,
        lineHeight: 18, 
        color: '#BE5B00',
        fontFamily:'Lato-regular',
        fontWeight:'400',
        fontStyle:'normal'
    },
    dateView:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: Scale(12) 
    },
    genderView:{ 
        justifyContent: 'space-between' 
    },
    headerViewCli: {
        justifyContent: "space-between",
        marginTop: (windowWidth * 3) / 100,
        alignContent: "center",
    },
    backTouchStylingReq: {
        height: (windowWidth * 6) / 100,
        width: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
      },
      backIconCssN: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
      },
      headerTitleStylingReq: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Lato-bold",
        textAlign: "center",
        lineHeight:26,
        fontWeight:'700',
        fontStyle: 'normal',
      },
      extraSpace: {
        height: (windowWidth * 6) / 100,
        width: (windowWidth * 6) / 100,
      },
      emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
      }, 
     emptyText:{
        fontSize: 18,
        fontWeight: '600',
        color: '#375280',
        fontFamily:'Lato-regular',
        textAlign: 'center',
        alignSelf: 'center',
        lineHeight: 28,
     } 
})
// Customizable Area End