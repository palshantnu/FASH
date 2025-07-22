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
import { backIcon, radiobutton, radiobuttonActive } from "./assets";

import CustomButton from "../../../components/src/CustomButton";

import OrderReturnModeController, {
    Props,
} from "./OrderReturnModeController";

import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

export default class OrderReturnMode extends OrderReturnModeController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start
    renderModalConfirmation = () => {
        const { returnTypeThere, selectedModeIndex, modalVisible } = this.state;
        const choosenMode = returnTypeThere === 'self_drop_off' ? i18n.t("Self-DropOff") : i18n.t("RequestDeliveryPartner");
        const selectedMode = selectedModeIndex === 0 ? 'self_drop_off' : 'request_delivery_partner';
        const selectedText = selectedMode === 'request_delivery_partner' ? i18n.t("RequestDeliveryPartner") : i18n.t("Self-DropOff");
        return (
          <Modal
            testID="btnCancelModal"
            animationType="slide"
            transparent
            visible={modalVisible}
          >
            <View style={styles.modalMainView}>
              <SafeAreaView style={styles.modalSafeArea} />
              <View style={styles.modalButtonMainView}>
                <Text style={styles.cancelOrderText}>
                  {i18n.t('youHaveAlreadyChosen')} {choosenMode}.
                </Text>
                <Text style={styles.cancelOrderText}>
                  {i18n.t('areYouSureYouWant')} {selectedText}?
                </Text>

                <View style={[styles.modalTwoBtnView, { flexDirection: FlexConditionManage(i18n.language) }]}>
                  <TouchableOpacity
                    testID="btnCancelOrderNo"
                    style={styles.cancelTouch}
                    onPress={this.closeModal}
                  >
                    <Text style={styles.noText}>{i18n.t('No')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="btnCancelOrderYes"
                    style={styles.yesTouch}
                    onPress={() => {
                      this.confirmYes()
                    }}
                  >
                    <Text style={styles.yesText}>{i18n.t('Yes')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.safecontainerInReturnMode}>
                <View style={styles.containerInReturnMode}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerReturnMode}>

                        <View style={[styles.headerViewMainReturnMode,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackAcceptOrder" style={styles.backTouchReturnMode}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssReturnMode,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleReturnMode}>{i18n.t("ModeofReturn")}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouchReturnMode}>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.divReturnMode} />
                        <View style={[{ flex: 1, }, { paddingHorizontal: Scale(20) }]}>
                       
                    <TouchableOpacity
                    style={[styles.rowReturnMode,{justifyContent:'space-between',flexDirection:FlexConditionManage(i18n.language)}]}
                    onPress={() => this.updateStatusMode(0)}
                    disabled={this.state.returnTypeThere == "self_drop_off"?true:false}
                    testID="language">
                       <View style={{width:'89%'}}>
                    <Text style={styles.areYouSureTextReturnMode}>{i18n.t("Self-DropOff")}</Text>
                    <Text style={[styles.subLabelReturnMode,{marginTop:-2,fontSize:14}]}>{i18n.t("Dropyourself")}</Text>
                    </View>
                        <View
                    style={[
                      styles.boxReturnMode,
                     {right:0}
                    ]}
                  >
                      <Image style={styles.plusIconReturnMode} source={this.state.selectedModeIndex===0?radiobutton:radiobuttonActive} />
                      </View>
                      </TouchableOpacity>
                    
                    <TouchableOpacity
                    style={[styles.rowReturnMode,{ borderTopColor: "#CBD5E1",
                    borderTopWidth: 2 * StyleSheet.hairlineWidth, paddingVertical:10,justifyContent:'space-between',flexDirection:FlexConditionManage(i18n.language)}]}
                    onPress={() => this.updateStatusMode(1)}
                    disabled={this.state.returnTypeThere == "request_delivery_partner"?true:false}
                    testID="language1">
                        <View style={{width:'89%'}}>
                    <Text style={styles.areYouSureTextReturnMode}>{i18n.t("RequestDeliveryPartner")}</Text>
                    <Text style={[styles.subLabelReturnMode,{marginTop:-2,fontSize:14}]}>{i18n.t("scheduleDeliveryTitle")}</Text>
                    <Text style={[styles.subLabelReturnMode,{marginTop:-2,fontSize:14}]}>{i18n.t("scheduleDeliveryDescription")}</Text>
                    
                    </View>
                        <View
                    style={[
                      styles.boxReturnMode,
                      {right:0}
                    ]}
                  >
                      <Image style={styles.plusIconReturnMode} source={this.state.selectedModeIndex===1?radiobutton:radiobuttonActive} />
                      </View>
                      </TouchableOpacity>
                    </View>
                    <View style={[{ paddingHorizontal: Scale(20),marginBottom:5 }]}>
                    <Text style={[styles.areYouSureTextReturnModeNew,{fontSize:13.5}]}>
                    {this.state.selectedModeIndex===1?i18n.t('refundNote'):''}
                       </Text>
                       </View>
                        <View style={styles.flFooterContainerReturnMode}>
                  <View style={styles.flFooterInnerContainerReturnMode}>
                    
                    <View style={[styles.spaceBetweenReturnMode,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <Text style={styles.subLabelReturnMode}>{i18n.t('EstimatedPickupCharges')}</Text>
                      <Text style={styles.subCostReturnMode}>{PriceConvertValue(this.state.selectedModeIndex===1?this.state.delivery_charges.toFixed(2):"0",this.state.currencyLocal)}</Text>
                    </View>
                   
                    <View
                      style={[styles.spaceBetweenReturnMode, styles.totalContainerReturnMode,{flexDirection:FlexConditionManage(i18n.language)}]}
                    >
                      <Text style={styles.totalTextReturnMode}>{i18n.t('TotalCharges')}</Text>
                      <Text style={styles.totalPriceReturnMode}>{PriceConvertValue(this.state.selectedModeIndex===1?this.state.delivery_charges.toFixed(2):"0",this.state.currencyLocal)}</Text>
                    </View>
                  </View>
                </View>
                        <View style={[styles.rowReturnMode, styles.btnsReturnMode, { paddingHorizontal: Scale(20) }]}>
                            
                            <CustomButton
                            testID="confirmBtn"
                                title={i18n.t('Submit')}
                                style={styles.accButtonReturnMode}
                                textStyle={styles.accTxtReturnMode}
                                onPress={this.returnRequestModeSelect}
                                disabled={this.buttonDisable()}
                            />
                        </View>
                    </View>
                </View>
                {this.renderModalConfirmation()}
            </SafeAreaView>




        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerInReturnMode: {
        flex: 1,
    },
    safecontainerInReturnMode: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainReturnMode: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: Scale(20)
    },
    viewContainerReturnMode: {
        flex: 1,

    },
    backTouchReturnMode: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouchReturnMode: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssReturnMode: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleReturnMode: {
        color: '#375280',
        fontSize: windowWidth * 5.4 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },

    
    boxReturnMode: {
        
        padding: 16,
        alignSelf:'flex-start'
      },
    
   
    rowReturnMode: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical:10,
    },
  
    flFooterContainerReturnMode: {
        marginTop: Scale(2),
        marginBottom: Scale(-10),
        width:'90%',
        alignSelf:'center',
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
       
      },
      flFooterInnerContainerReturnMode: {
        paddingVertical: Scale(24),
      },
     
      spaceBetweenReturnMode: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Scale(24),
      },
      totalContainerReturnMode: {
        marginTop: Scale(14),
        paddingTop: Scale(12),
        borderTopColor: "#CBD5E1",
        borderTopWidth: 2 * StyleSheet.hairlineWidth,
      },
      subLabelReturnMode: {
        fontSize: 14,
        fontFamily: "Lato",
        fontWeight: "400",
        color: "#94A3B8",
        marginBottom: Scale(10),
      },
      subCostReturnMode: {
        fontSize: 14,
        fontFamily: "Lato",
        fontWeight: "700",
        color: "#375280",
      },
      totalTextReturnMode: {
        fontSize: 22,
        fontFamily: "Lato",
        fontWeight: "700",
        color: "#375280",
      },
      totalPriceReturnMode: {
        fontSize: 22,
        fontFamily: "Lato",
        fontWeight: "700",
        color: "#375280",
      },
    btnsReturnMode: {
        paddingVertical: Scale(35),

    },
    accTxtReturnMode: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    cancelOrderText:{
      fontSize: (windowWidth * 4.3) / 100,
      color: "#375280",
      textAlign:'center',
      fontFamily:'Lato-Regular',
      fontWeight:'600'
  },
    accButtonReturnMode: {
        flex: 1,
        borderRadius: Scale(2),
    },
    divReturnMode: {
        height: Scale(1),
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 0,
        marginTop: Scale(25)
    },
  
    areYouSureTextReturnMode: {
        color: "#375280",
        fontWeight: "400",
        fontSize: 18,
        fontFamily: "Lato-Bold",
        marginVertical: Scale(10),
    },
    yesText:{
      textAlign: "center",
      color: "#ffffff",
      fontSize: (windowWidth * 3.7) / 100,
      fontWeight: '500',
      fontFamily:'Lato-Regular',
  },
    areYouSureTextReturnModeNew: {
        color: "#375280",
        fontSize: 18,
        fontFamily: "Lato-Regular",
        marginVertical: Scale(10),
    },
    plusIconReturnMode: {
        height: Scale(20),
        width: Scale(20),
        resizeMode: "contain"
    },
    yesTouch:{
      backgroundColor: "#CCBEB1",
      padding: (windowWidth * 3) / 100,
      width: (windowWidth * 36) / 100,
      alignSelf: "center",
      borderRadius: 3,
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
    cancelTouch:{
      backgroundColor: "#FFFFFF",
      padding: (windowWidth * 3) / 100,
      width: (windowWidth * 36) / 100,
      alignSelf: "center",
      borderRadius: 3,
      borderWidth:1,
      borderColor:'#CCBEB1'
  },
    modalTwoBtnView:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom:10
    },
    
    noText:{
        textAlign: "center",
        fontSize: (windowWidth * 3.7) / 100,
        fontWeight: '500',
        fontFamily:'Lato-Regular',
        color:'#375280'
    },
    modalButtonMainView:{
      height: (windowHeight * 28) / 100,
      width: (windowWidth * 90) / 100,
      alignSelf: "center",
      backgroundColor: "#ffffff",
      borderRadius: 10,
      padding: (windowWidth * 7) / 100,
      justifyContent: "space-between",
  },
   
   

});
// Customizable Area End
