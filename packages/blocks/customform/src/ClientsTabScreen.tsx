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
} from "react-native";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { arrowRight } from "./assets"
import ClientsTabController, {
    Props,
} from "./ClientsTabController";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class ClientsTabScreen extends ClientsTabController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    // Customizable Area Start
    renderRow = (item: { name: string, screenName: string }) => {
        return (
            <TouchableOpacity style={[styles.rowStyle,{flexDirection:FlexConditionManage(i18n.language)}]} testID="btnScreen" onPress={()=>this.onHandleScreen(item.screenName)}>
                <Text style={styles.itemText}>{item.name}</Text>
                    <Image source={arrowRight} resizeMode="contain" style={[styles.rightImg,{transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]} />
            </TouchableOpacity>
        )
    }

    renderScreenListContainer = () => {
        return (
            <FlatList
            testID="flatlistTestID"
                data={this.state.itemList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            {this.renderRow(item)}
                            <View style={styles.divider} />
                        </View>
                    )
                }}
            />
        )
    }

    renderRequestListContainer = () => {
        return (
            <FlatList
                data={this.state.requestArr}
                testID="requestFlatlistTestID"
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.requestContainer}>
                            <View style={[styles.dateView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.requestId}>{item?.attributes?.stylist_id}-{item?.id}| {item?.attributes?.created_at}</Text>
                                <View style={[styles.newRequestBtnStyle,{backgroundColor:this.getStatusBgColor(item?.attributes?.status)}]}>
                                    <Text style={[styles.newTextStyle,{color:this.getStatusTextColor(item?.attributes?.status)}]}>{this.getReqStatus(item?.attributes?.status)}</Text>
                                </View>
                            </View>
                            <View style={[styles.genderView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.name}>{item?.attributes?.stylist_name}</Text>
                                <Text style={styles.gender}>{i18n.t('Gender')} - {item?.attributes?.gender}</Text>
                            </View>

                            <View style={[styles.genderBudgetContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <Text style={styles.budget}>{i18n.t('budget')}</Text>
                                <Text style={styles.budget}>{this.state.localCurrency}{item?.attributes?.min_price} - {this.state.localCurrency}{item?.attributes?.max_price}</Text>
                            </View>
                            <TouchableOpacity style={styles.viewRequestButton} testID="navigationRequestTestID" onPress={()=>this.navigationRequestDetailsHandler(item?.id)} >
                                <Text style={styles.viewRequestText}>{i18n.t('view_request')}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        )
    }

    renderEmptyContainer = () => {
        return(
         <View style={styles.emptyView}>
             <Text style={styles.emptyText}>{i18n.t('no_styling_requests_available')} </Text>
         </View>
        ) 
     }
    // Customizable Area End

    render() {
        // Customizable Area Start

        return (
            <View style={styles.container}>
                {this.state.isLoading && <CustomLoader />}
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                    {this.renderScreenListContainer()}
                    <Text style={{ fontSize: 18, color: '#375280', marginVertical: Scale(12), fontWeight: '700' }}>{i18n.t('latest_request')}</Text>
                    {this.state.requestArr.length !== 0 && !this.state.isLoading && this.renderRequestListContainer()}
                    {this.state.requestArr.length == 0 && !this.state.isLoading && this.renderEmptyContainer()}
                </ScrollView>
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
        padding: 20,
    },
    scrollView: {
        backgroundColor: '#ffff'
    },
    divider: {
        width: Scale(370),
        borderBottomWidth: 0.5,
        borderColor: '#375280',
        marginVertical: Scale(12)
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Scale(12)
    },
    itemText: {
        fontWeight: '700',
        fontSize: Scale(18),
        color: '#375280'
    },
    requestContainer: {
        flex: 1,
        marginVertical: Scale(10),
    },
    requestId: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.14,
        lineHeight: 22,
        color: '#375280'
    },
    name: {
        fontSize: 16,
        color: '#375280',
        fontWeight: '700',
        lineHeight: 24
    },
    genderBudgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Scale(12),
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
        color: '#375280'
    },
    viewRequestButton: {
        marginTop: Scale(12),
        paddingVertical: Scale(10),
        backgroundColor: 'transparent',
        borderRadius: 5,
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#CCBEB1'
    },
    viewRequestText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
        color: '#375280'
    },
    newRequestBtnStyle: {
        height: Scale(27),
        alignItems: 'center',
        paddingLeft: Scale(10),
        paddingRight: Scale(10),
        justifyContent: 'center'
    },
    newTextStyle: {
        fontSize: 12,
        lineHeight: 18,
    },
    emptyView: {
        flex: 0.5,
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
        justifyContent: 'center',
     }, 
    rightImg:{
         height: Scale(24), 
         width: Scale(24) 
    },
    dateView:{ 
        justifyContent: 'space-between',
        marginBottom: Scale(12) 
    },
    genderView:{ 
        justifyContent: 'space-between' 
    }
})
// Customizable Area End