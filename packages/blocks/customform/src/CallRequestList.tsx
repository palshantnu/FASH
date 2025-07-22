import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import CallRequestListController, {
    Props,
    StylistCallRequest,
} from "./CallRequestListController";
import { backIcon } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
// Customizable Area End

export default class CallRequestList extends CallRequestListController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderButtonContainer(item: StylistCallRequest){
        const status = item?.attributes?.status;
        switch (status) {
            case 'rejected':
                return (
                    <TouchableOpacity style={styles.rejectedButton} testID="rejectedID">
                        <Text style={styles.rejectedText}>{i18n.t('rejected')}</Text>
                    </TouchableOpacity>
                );
    
            case 'accepted':
                return (
                    <TouchableOpacity style={styles.acceptedButton} testID="onMakeCallTestId" onPress={() => this.onMakeCall('completed', item.id, item.attributes.buyer_phone_number)}>
                        <Text style={styles.acceptedText}>{i18n.t('make_call')}</Text>
                    </TouchableOpacity>
                );
    
            case 'pending':
                return (
                    <View style={[styles.buttonContainer2,{flexDirection:FlexConditionManage(i18n.language)}]}>  
                        <TouchableOpacity style={[styles.rejectButton2]} testID="updateCallStatusTestID" onPress={() => this.updateCallStatus('rejected', item.id)}>
                            <Text style={styles.rejectButtonText2}>{i18n.t('reject')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.acceptButton,{marginRight:ManageDynamicMargin(i18n.language,Scale(5),undefined)}]} onPress={() => this.updateCallStatus('accepted', item.id)}>
                            <Text style={styles.acceptButtonText}>{i18n.t('accept')}</Text>
                        </TouchableOpacity>
                    </View>
                );
    
            case 'completed':
                return (
                    <TouchableOpacity style={styles.completedButton} disabled testID="completedId">
                        <Text style={styles.completedText}>{i18n.t('completed')}</Text>
                    </TouchableOpacity>
                );
    
            default:
                return null;
        }
    } 

    headerTitleView = () =>{
        return(
            <View style={[styles.headerViewCli,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
                testID="btnBackClientsAndchat"
                style={styles.backTouchCliAndChat}
                onPress={this.goBackScreen}
            >
                <Image
                    resizeMode="contain"
                    source={backIcon}
                    style={[styles.backIconCssN,{transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerTitleCliAndChat}>{i18n.t('call_requests')}</Text>
            </View>
            <View style={styles.extraViewTouch} />
        </View>
        )
    }
    
    renderCallListContainer = () => {
        return (
            <FlatList
                testID="flatlistTestID"
                showsVerticalScrollIndicator={false}
                data={this.state.callRequestList}
                style={{ marginHorizontal: Scale(24), marginBottom: verticalScale(24) ,marginTop:verticalScale(15),}}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item, }) => {
                    return (
                        <View style={{ flex: 1, marginTop: verticalScale(24),backgroundColor:'#ffffff' }}>
                            <View style={{ flexDirection: FlexConditionManage(i18n.language), justifyContent: 'space-between' }}>
                                <Text style={styles.styName}>{item?.attributes?.buyer_name}</Text>
                                <Text style={styles.styTime}>{i18n.t('time')} - {item?.attributes?.hour}:{item?.attributes?.minute}</Text>
                            </View>
                            <Text style={{ fontSize: 15, fontWeight: '400', fontFamily: 'Lato-Regular', lineHeight: 28, marginTop: verticalScale(5), color: '#375280',textAlign:TextAlignManage(i18n.language) }}>{item?.attributes?.reason}</Text>
                            {this.renderButtonContainer(item)}
                        </View>
                    )
                }}
            />
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start

        return (
            <View style={styles.mainContainer}>
                <SafeAreaView style={styles.safeContainer} />
                <StatusBar backgroundColor="#ffffff"
                    barStyle="dark-content"
                    hidden={false}
                    translucent={false}
                    networkActivityIndicatorVisible={false} />
                <View style={styles.container}>
                   {this.headerTitleView()}
                </View>
                {this.state.loading && <CustomLoader />}
                {this.renderCallListContainer()}
            </View>
        )
        // Customizable Area End
    }
}
// Customizable Area Start
const styles = StyleSheet.create({
    safeContainer: {
        flex: 0,
        backgroundColor: "#ffffff",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
    },
    headerViewCli: {
        justifyContent: "space-between",
        marginTop: (windowWidth * 3) / 100,
        alignContent: "center",
    },
    backTouchCliAndChat: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
        marginTop: (windowWidth * 1) / 100,
    },
    backIconCssN: {
        width: (windowWidth * 5) / 100,
        height: (windowWidth * 5) / 100,
    },
    headerTitleCliAndChat: {
        color: "#375280",
        fontSize: (windowWidth * 5) / 100,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
    },
    extraViewTouch: {
        width: (windowWidth * 6) / 100,
        height: (windowWidth * 6) / 100,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: verticalScale(15),
    },
    rejectButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F87171',
    },
    accepButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D3BCA3',
        marginLeft: Scale(8),
        backgroundColor: '#CCBEB1'
    },
    rejectButtonText: {
        fontSize: 16,
        color: '#F87171',
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    accpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Lato-Bold',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    rejectedButton: {
        borderColor: '#F87171',
        borderWidth: 1,
        flex: 1,
        height: verticalScale(42),
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(15)
    },
    rejectedText: {
        color: '#F87171',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Lato-Regular',
        lineHeight: 28,
        fontStyle: 'normal'
    },
    acceptedButton: {
        flex: 1,
        height: verticalScale(42),
        backgroundColor: '#CCBEB1',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(15)
    },
    acceptedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Lato-Bold',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    buttonContainer2: {
        justifyContent: 'space-between',
        marginVertical: verticalScale(15)
    },
    rejectButton2: {
        flex: 1,
        height: verticalScale(42),
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth:1,
        borderColor:'#F87171',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Scale(5) // Margin between buttons
    },
    rejectButtonText2: {
        color: '#F87171',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        lineHeight: 28,
        fontStyle: 'normal'
    },
    acceptButton: {
        flex: 1,
        height: verticalScale(42),
        backgroundColor: '#CCBEB1',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        fontFamily: 'Lato-Bold',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    completedButton: {
        flex: 1,
        height: verticalScale(42),
        backgroundColor: '#CBD5E1',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(15)
    },
    completedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'Lato-Bold',
        lineHeight: 24,
        fontStyle: 'normal'
    },
    styName:{ 
        fontSize: 18,
        fontWeight: '800',
        fontFamily: 'Lato-Bold',
        color: '#375280',
        lineHeight: 28 
    },
    styTime:{
        fontSize: 16, 
        fontWeight: '800', 
        fontFamily: 'Lato-Bold',
        color: '#375280', 
        lineHeight: 28 
    }
})
// Customizable Area End