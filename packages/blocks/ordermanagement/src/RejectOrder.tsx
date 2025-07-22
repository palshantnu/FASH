import React from "react";

// Customizable Area Start
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    Text,
   

} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomButton from "../../../components/src/CustomButton";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon } from "./assets";

import { Dropdown } from "react-native-element-dropdown";



import RejectOrderController, {
    Props,
} from "./RejectOrderController";
import i18n from "../../../components/src/ClientGlobals";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import { t } from "i18next";


// Customizable Area End

export default class RejectOrder extends RejectOrderController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start

    renderDropDown = (
    ) => {


        return (<>
        <Text style={styles.DropdownLableText}>{i18n.t("reasonOfRejection")}</Text>
            <Dropdown
                testID={"reject-drop-down"}
                style={[
                    styles.dropdown,
                    { borderColor: "#F8F8F8" },
                    { direction : FlatListRowManage(i18n.language)}
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={this.state.allRejectedReason}
                itemTextStyle={styles.selectedTextStyle}
                labelField="reason"
                valueField="id"
                placeholder={i18n.t("selectTheReason")}
                iconStyle={styles.iconStyle}
                iconColor="#375280"
                value={this.state.selectedRejectReason}
                onChange={this.dropDownpUpdatedreason}
                dropdownPosition={"auto"}
            />
            </>
        );
    };




    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.safecontainerInRejectOrder}>
                <View style={[styles.containerInRejectOrder,{ direction : FlatListRowManage(i18n.language)}]}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerRejectOrder}>

                        <View style={styles.headerViewMainRejectOrder}>
                            <TouchableOpacity testID="btnBackRejectOrder" style={styles.backTouchRejectOrder}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={styles.backIconCssRejectOrder}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleRejectOrder}>{i18n.t("rejectOrder")}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouch}>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.div}/>   
                        <View style={[{ flex: 1 ,},{ paddingHorizontal:Scale(20)}]}>
                        
                     
                        <Text style={styles.areYouSureText}>{i18n.t("confirmationRejectOrder")}</Text>
                            {this.renderDropDown()}
                           

                        </View>
                        <View style={[styles.row, styles.btns,{ paddingHorizontal:Scale(20)}]}>
                                <CustomButton
                                    testID="closeBtn"
                                    title={i18n.t("closeText")}
                                    style={styles.rejButton}
                                    textStyle={styles.rejTxt}
                                    onPress={this.goBackToOrderSummaryScreen}
                                />
                                <CustomButton
                                    testID="rejectBtn"
                                    title={i18n.t("reject")}
                                    style={styles.accButton}
                                    textStyle={styles.accTxt}
                                    onPress={this.updateTheStatus}
                                />
                            </View>
                    </View>
                </View>
            </SafeAreaView>




        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerInRejectOrder: {
        flex: 1,
    },
    safecontainerInRejectOrder: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainRejectOrder: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal:Scale(20)
    },
    viewContainerRejectOrder: {
        flex: 1,
     
    },
    backTouchRejectOrder: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssRejectOrder: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleRejectOrder: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },



    errorMsgcontainerInRejectOrder: {
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 8) / 100,
        marginVertical: (windowWidth * 4) / 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderColor: 'rgba(220, 38, 38, 0.30)',
        backgroundColor: 'rgba(254, 226, 226, 0.30)',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: Scale(15),
    },
    errorIcon: {
        marginRight: 10,
        width: Scale(27),
        height: Scale(27),
        backgroundColor: "white"
    },
    errorTextcontainerInRejectOrder: {
        flex: 1,
        marginLeft: Scale(5)
    },
    errorHeading: {
        lineHeight: 24,
        fontSize: Scale(16),
        fontWeight: "700",
        color: "#DC2626",
        fontFamily: "Lato",
    },
    errorDescription: {
        fontSize: Scale(16),
        fontWeight: "400",
        color: "#DC2626",
        fontFamily: "Lato",
        lineHeight: 24,
    },

    dropdown: {
        justifyContent: "center",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 16,
        height: Scale(50),
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 10
    },

    placeholderStyle: {
        fontFamily: "Lato-Regular",
        color: "#375280",
        fontSize: Scale(16),
        fontWeight: "400",
    },
    selectedTextStyle: {
        flex: 1,
        fontFamily: "Lato-Regular",
        fontSize: 16,
        color: "#375280",
        paddingRight: 10,
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    btns: {
        paddingVertical: Scale(35),

    },
    accTxt: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },
    accButton: {
        flex: 1,
        borderRadius: Scale(2),
    },
    rejButton: {
        flex: 1,
        marginRight: Scale(10),
        borderRadius: Scale(2),
        backgroundColor: "#FFFFFF",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#CCBEB1",
    },
    rejTxt: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },

    div: {
        height: Scale(1),
        backgroundColor: "#F1F5F9",
         paddingHorizontal:0,
        marginTop:Scale(25)
    },
    areYouSureText:{
        color: "#375280",
        fontWeight: "400",
        fontSize: 16,
        fontFamily: "Lato-Regular",
        marginVertical:Scale(25),
        textAlign:"center"
    },
    DropdownLableText:{
        color: "#375280",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Bold",
        textAlign:"left" 
    }

});
// Customizable Area End
