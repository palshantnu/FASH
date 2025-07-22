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
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import { DriverBankMethodProps } from "./types/types";
import TappaymentsDriverBankDetailController, { Props } from "./TappaymentsDriverBankDetailController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class TappaymentsDriverBankDetail extends TappaymentsDriverBankDetailController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getAllPaymentMethods = (itemAllPayment:DriverBankMethodProps,indexOrder:number)=>{
        let value = itemAllPayment;
        return (
            <View>
                <View style={[styles.flatRenderMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={[styles.flatUserNameText,{textAlign:TextAlignManage(i18n.language)}]}>{value.attributes.account_holder_name}</Text>
                </View>
                <View style={[styles.flatIbanView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.flatIbanText}>{i18n.t('IBANNumberText')}</Text>
                    <Text style={styles.flatAccountNumberText}>{value.attributes.iban}</Text>
                </View>

                <View style={[styles.flatIbanView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.flatIbanText}>{i18n.t('accountNumberText')}</Text>
                    <Text style={styles.flatAccountNumberText}>{value.attributes.account_number}</Text>
                </View>

                <View style={styles.flatBorderView}></View>
            </View>
        );
    }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.mainContainerMethod}>
            <SafeAreaView style={styles.safeViewContainerMethod}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewMethod,globalStyle.headerMarginManage]}>
                <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewPayment]}>
                    <TouchableOpacity testID="btnBackPaymentMethod" style={styles.backTouchMethod} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image resizeMode="contain" source={backIcon} style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconMethod]}></Image>
                    </TouchableOpacity> 
                    <View>
                        <Text style={styles.headerTitleMethod}>{i18n.t('paymentMethodsText')}</Text>
                    </View>
                    <View style={styles.extraViewMethod}>
                    </View>
                </View>
            </View>


            <View style={styles.storeCreateMainViewMethod}>
                <View style={styles.paymentMethodMainView}>
                    <View style={styles.paymentMethodTitle}>
                        <Text style={[styles.paymentMethodText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('yourBankInformationText')}</Text>
                    </View>
                </View>
                <FlatList
                testID={"paymentMethodShow"}
                bounces={false}
                data={this.state.allPaymentMethodArr}
                contentContainerStyle={styles.flatContainerMethod}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() =>
                    !this.state.loading ? (
                      <View style={styles.emptyLisyViewMethod}>
                        <Text style={styles.emptyFlatlistTextMethod}>
                        {i18n.t('noPaymentMethodEmptyText')}
                        </Text>
                      </View>
                    ) : null
                }
                renderItem={({item,index}) => this.getAllPaymentMethods(item,index)}
                keyExtractor={(item) => item.id}
                />
                
            </View>

        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerMethod:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerMethod: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewMethod:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewPayment:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchMethod:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconMethod:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleMethod:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewMethod:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    storeCreateMainViewMethod:{
        marginTop:windowWidth*4/100,
        width:windowWidth*90/100,
        alignSelf:'center',
    },
    flatContainerMethod:{
        paddingBottom:windowWidth*50/100
    },
    emptyLisyViewMethod: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowHeight * 32) / 100,
    },
    emptyFlatlistTextMethod: {
        fontSize: (windowWidth * 5) / 100,
        fontFamily: "Avenir-Heavy",
        color: "#375280",
    },
    paymentMethodMainView: {
        margin: 2,
        marginBottom: 20,
        shadowColor: "#000000",
        backgroundColor: "#FFFFFF",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 1,
    },
    paymentMethodTitle:{
        width:windowWidth*90/100,
        alignSelf:'center',
        padding:windowWidth*3/100
    },
    paymentMethodText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.9/100
    },
    flatRenderMainView:{
        alignItems:'center'
    },
    flatUserNameText:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4/100
    },
    flatPrimaryView:{
        backgroundColor:'#E2E8F0',
        padding:4,
        borderRadius:5,
        marginLeft:windowWidth*3/100,
        width:windowWidth*18/100,
        alignItems:'center'
    },
    flatPrimaryText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.7/100
    },
    flatIbanView:{
        justifyContent:'space-between',
        marginTop:windowWidth*3/100
    },
    flatIbanText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.4/100,
        fontWeight:'500'
    },
    flatAccountNumberText:{
        color:'#94A3B8',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.4/100,
        fontWeight:'500'
    },
    flatBorderView:{
        borderWidth:0.8,
        borderColor:'#E2E8F0',
        marginTop:windowWidth*8/100
    }
});
// Customizable Area End