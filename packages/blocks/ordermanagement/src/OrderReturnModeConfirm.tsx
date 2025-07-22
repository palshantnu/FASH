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
    Modal
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon } from "./assets";


import CustomButton from "../../../components/src/CustomButton";

import OrderReturnModeConfirmController, {
    Props,
} from "./OrderReturnModeConfirmController";

import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'

// Customizable Area End

export default class OrderReturnModeConfirm extends  OrderReturnModeConfirmController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start

    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.safecontainerInModeConfirm}>
                <View style={styles.containerInModeConfirm}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerModeConfirm}>

                        <View style={[styles.headerViewMainModeConfirm,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackAcceptOrder" style={styles.backTouchModeConfirm}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssModeConfirm,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleModeConfirm}>{i18n.t("Confirmation")}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouchModeConfirm}>

                            </TouchableOpacity>
                        </View>
                        <View style={[{ flex: 1,alignItems:'center',justifyContent:'center' }, { paddingHorizontal: Scale(20) }]}>

                        <Text style={[styles.DropdownLableTextModeConfirm,{fontSize:22}]}>{this.state.selectedMode===0?i18n.t("Self-dropoffconfirmed"):i18n.t("DriverRequested")}</Text>
                            <Text style={styles.areYouSureTextModeConfirm}>{this.state.selectedMode===0?i18n.t("Youmustreturn"):i18n.t("Adeliverypartner")}</Text>
                           
                        </View>
                       
                        {this.state.selectedMode===1?
                         <View style={[styles.rowModeConfirm, styles.btnsModeConfirm, { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) }]}>
                            <CustomButton
                            testID="confirmBtn"
                                title={i18n.t("TrackReturn")}
                                style={styles.accButtonModeConfirm}
                                textStyle={styles.accTxtModeConfirm}
                                onPress={this.navigationToOredrSummary}
                            />
                            </View>
                            :
                            <View style={[styles.rowModeConfirm, styles.btnsModeConfirm, { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language)}]}>
                            <CustomButton
                            testID="closeBtn"
                            title={i18n.t("CancelReturn")}
                            style={styles.confirmBtnModeConfirm}
                            textStyle={styles.rejTxtModeConfirm}
                            onPress={this.returnCancelOrder}
                        />
                        <CustomButton
                        testID="confirmBtn"
                            title={i18n.t("confirm")}
                            style={styles.accButtonModeConfirm}
                            textStyle={styles.accTxtModeConfirm}
                            onPress={this.navigationToOredrSummary}
                        />
                         </View>
                            }
                       
                    </View>
                </View>
                <Modal
            testID="btnCancelModal"
            animationType="slide"
            transparent={true}
            visible={this.state.cancelOrderModal}>

            <View style={styles.modalMainViews}>
                <SafeAreaView style={styles.modalSafeAreas} />

                <View style={styles.modalButtonMainViews}>
                <Text style={styles.cancelOrderTexts}>
                    {i18n.t('cancelDescriptiion')}
                </Text>

                <View style={styles.modalTwoBtnViews}>
                    <TouchableOpacity
                    testID={"btnCancelOrderNo"}
                    style={styles.cancelTouchs}
                    onPress={() => {
                        this.returnCancelModalClose()
                    }}>
                    <Text style={styles.noTexts}>{i18n.t('No')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    testID="btnCancelOrderYes"
                    style={styles.yesTouchs}
                    onPress={() => {
                        this.cancelOrderConfirm()
                    }}>
                    <Text style={styles.yesTexts}>{i18n.t('Yes')}</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>
            </SafeAreaView>




        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerInModeConfirm: {
        flex: 1,
    },
    safecontainerInModeConfirm: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainModeConfirm: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: Scale(20)
    },
    viewContainerModeConfirm: {
        flex: 1,

    },
    backTouchModeConfirm: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouchModeConfirm: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssModeConfirm: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleModeConfirm: {
        color: '#375280',
        fontSize: windowWidth * 5.4 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },

  
    rowModeConfirm: {
        flexDirection: "row",
        alignItems: "center",
    },
  
    btnsModeConfirm: {
        paddingVertical: Scale(35),

    },
    accTxtModeConfirm: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },

    confirmBtnModeConfirm: {
        flex: 1,
        marginRight: Scale(10),
        borderRadius: Scale(2),
        backgroundColor: "#FFFFFF",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#CCBEB1",
    },
    accButtonModeConfirm: {
        flex: 1,
        borderRadius: Scale(2),
    },
    divModeConfirm: {
        height: Scale(1),
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 0,
        marginTop: Scale(25)
    },
    rejTxtModeConfirm: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },

    areYouSureTextModeConfirm: {
        color: "#375280",
        fontWeight: "400",
        fontSize: 16,
        fontFamily: "Lato-Regular",
        marginVertical: Scale(10),
        textAlign: "center"
    },
    DropdownLableTextModeConfirm: {
        color: "#375280",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Bold",
        textAlign: "left"
    },
    modalMainViews:{
        flex: 1,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center",
    },
    modalSafeAreas:{
        flex: 0, 
        backgroundColor: "#00000080"
    },
    modalButtonMainViews:{
        height: (windowHeight * 22) / 100,
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: (windowWidth * 7) / 100,
        justifyContent: "space-between",
    },
    cancelOrderTexts:{
        fontSize: (windowWidth * 4.3) / 100,
        color: "#375280",
        textAlign:'center',
        fontFamily:'Lato-Bold'
    },
    modalTwoBtnViews:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelTouchs:{
        backgroundColor: "#FFFFFF",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
        borderWidth:1,
        borderColor:'#CCBEB1'
    },
    noTexts:{
        textAlign: "center",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
        color:'#375280'
    },
    yesTouchs:{
        backgroundColor: "#CCBEB1",
        padding: (windowWidth * 3) / 100,
        width: (windowWidth * 36) / 100,
        alignSelf: "center",
        borderRadius: 3,
    },
    yesTexts:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
    }
});
// Customizable Area End
