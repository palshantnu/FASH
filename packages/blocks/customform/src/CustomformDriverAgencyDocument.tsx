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
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,headPhoneIcon,arrowRight } from "./assets";

import CustomformDriverAgencyDocumentController, { Props } from "./CustomformDriverAgencyDocumentController";
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import globalStyle from "../../../components/src/GlobalStyle"
// Customizable Area End

export default class CustomformDriverAgencyDocument extends CustomformDriverAgencyDocumentController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerAgency}>
        <SafeAreaView style={styles.safeViewContainerAgency}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewMangeAgency,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewManageAgency,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackDriverAgencyDocument" style={styles.backTouchManageAgency} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconManageAgency,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAgency}>{i18n.t('agencyDocumentSubText')}</Text>
                </View>
                <TouchableOpacity testID="btnContactRedirectAgency" style={styles.extraViewManageTime} onPress={()=>{this.btnRedirectContact()}}>
                    <Image resizeMode="contain" source={headPhoneIcon} style={styles.backTouchManageAgency}></Image>
                </TouchableOpacity>
            </View>
        </View>

            <ScrollView style={styles.timingCenterViewAgency} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.submitMainViewAgency}>
                    <Text style={[styles.submitTitleTextAgency,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('submitYourAgencyDocText')}</Text>
                    <Text style={[styles.submitSubTilteTextAgency,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('submittedDocumentDaysText')}</Text>

                    <View style={styles.manageMarginTopAgency}>
                        <View style={styles.profileMainViewAgency}>
                            <TouchableOpacity testID="btnProfilePhotoAgency" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectDriverAgenecyPhoto()}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('profilePhotoText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.profile_photo_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.profile_photo_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnDrivingLicenseRedirectAgency" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectDocumentUpload('Driving License')}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('drivingLicenseText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.license_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.license_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnAddVehicleRegistration" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectAddVehicleDocumentUpload()}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('addVehicleText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.vehicle_registration_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.vehicle_registration_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnCivilIdRedirect" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectCivilIdPass()}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('civilIDPassportText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.civil_id_passport_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.civil_id_passport_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnAuthorizationLetter" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectDocumentUpload('Agency Authorization Letter')}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('agencyAuthorizationLetterText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.agency_authorization_letter_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.agency_authorization_letter_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnAgencyAddBank" style={[styles.listViewTouchAgency,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectAddBank()}}>
                                <View>
                                    <Text style={styles.listViewTextAgency}>{i18n.t('agencyBankAccountText')}</Text>
                                    <Text style={[styles.listViewSecondAgencyText,{color:this.statusColorManageAgency(this.state.driverAgencyDocumentStatus.bank_detail_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusReturnAgency(this.state.driverAgencyDocumentStatus.bank_detail_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            
            </ScrollView>
            <View style={styles.btnContactMargin}>
                <TouchableOpacity testID="logoutbtn" style={styles.btnNextButton} onPress={()=>{this.LogOutAction()}}>
                    <Text style={styles.nextButtonText}>{i18n.t('logOutText')}</Text>
                </TouchableOpacity>
            </View>
        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerAgency:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerAgency: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewMangeAgency:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewManageAgency:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    btnContactMargin:{
        width:windowWidth*90/100,
        marginTop:windowWidth*8/100,
        flexDirection:'row',
        justifyContent:'space-between',
        position:'absolute',
        bottom:windowWidth*10/100,
        alignSelf:'center'
      },
      btnNextButton:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*90/100,
        height:windowHeight*6/100,
        borderRadius:2,
        justifyContent:'center'
      },
      nextButtonText:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*5/100
      },
    backTouchManageAgency:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconManageAgency:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAgency:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewManageTime:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    timingCenterViewAgency:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    profileMainViewAgency: {
        margin: 2,
        marginBottom: 30,
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
    listViewTouchAgency:{
        flexDirection:'row',
        height:windowHeight*7/100,
        borderBottomWidth:1,
        borderBottomColor:'#E2E8F0',
        alignItems:'center',
        paddingLeft:windowWidth*3/100
    },
    listFirstIcon:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    listViewTextAgency:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold',
        marginLeft:windowWidth*4/100
    },
    listViewSecondAgencyText:{
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Bold',
        marginLeft:windowWidth*4/100
    },
    listViewRightIcon:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        position:'absolute',
        right:10
    },
    firstListView:{
        borderTopWidth:4,
        borderTopColor:'#D9D9D9',
        borderRadius:1
    },
    submitMainViewAgency:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*5/100
    },
    submitTitleTextAgency:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.5/100,
        color:'#375280'
    },
    submitSubTilteTextAgency:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.2/100,
        color:'#94A3B8'
    },
    manageMarginTopAgency:{
        marginTop:windowWidth*6/100
    }
});
// Customizable Area End