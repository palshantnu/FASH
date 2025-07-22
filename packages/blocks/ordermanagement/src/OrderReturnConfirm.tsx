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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon} from "./assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'

import CustomButton from "../../../components/src/CustomButton";

import OrderReturnConfirmController, {
    Props,
} from "./OrderReturnConfirmController";
// Customizable Area End

export default class OrderReturnConfirm extends  OrderReturnConfirmController {
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
            <SafeAreaView style={styles.safecontainerInRetrrnOrder}>
                <View style={styles.containerInRetrrnOrder}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />
                    <View style={styles.viewContainerRetrrnOrder}>
                        <View style={[styles.headerViewMainRetrrnOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackRetrrnOrder" style={styles.backTouchRetrrnOrder}
                                onPress={() => { this.backRedirection() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssRetrrnOrder,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleRetrrnOrder}>{i18n.t("Confirmation")}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouchRetrrnOrder}>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divRetrrnOrder} />
                        <View style={[{ flex: 1,alignItems:'center',justifyContent:'center' }, { paddingHorizontal: Scale(20) }]}>
                        <Text style={[styles.DropdownLableTextRetrrnOrder,{fontSize:22}]}>{i18n.t("Returnrequestsubmitted")}</Text>
                            <Text style={styles.areYouSureTextRetrrnOrder}>{i18n.t("returnConfirmDescription")}</Text>                      
                        </View>
                         <View style={[styles.rowRetrrnOrder, styles.btnsRetrrnOrder, { paddingHorizontal: Scale(20) }]}>
                            <CustomButton
                            testID="confirmBtn"
                                title={i18n.t("OrdersText")}
                                style={styles.accButtonRetrrnOrder}
                                textStyle={styles.accTxtRetrrnOrder}
                                onPress={()=>this.backRedirection()}
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
    containerInRetrrnOrder: {
        flex: 1,
    },
    safecontainerInRetrrnOrder: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainRetrrnOrder: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: Scale(20)
    },
    viewContainerRetrrnOrder: {
        flex: 1,

    },
    backTouchRetrrnOrder: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouchRetrrnOrder: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssRetrrnOrder: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleRetrrnOrder: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },

    rowRetrrnOrder: {
        flexDirection: "row",
        alignItems: "center",
    },
  
    btnsRetrrnOrder: {
        paddingVertical: Scale(35),

    },
    accTxtRetrrnOrder: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },

  
    accButtonRetrrnOrder: {
        flex: 1,
        borderRadius: Scale(2),
    },

    areYouSureTextRetrrnOrder: {
        color: "#375280",
        fontWeight: "400",
        fontSize: 16,
        fontFamily: "Lato-Regular",
        marginVertical: Scale(10),
        textAlign: "center"
    },
    DropdownLableTextRetrrnOrder: {
        color: "#375280",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Bold",
        textAlign: "left"
    },
    divRetrrnOrder: {
        height: Scale(1),
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 0,
        marginTop: Scale(25)
    },

});
// Customizable Area End
