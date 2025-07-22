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
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import { backIcon,headPhoneIcon,arrowRight } from "./assets";

import CustomformDriverDocumentController, { Props } from "./CustomformDriverDocumentController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

export default class CustomformDriverDocument extends CustomformDriverDocumentController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainerEdit}>
        <SafeAreaView style={styles.safeViewContainerEdit}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
        {this.state.loading && <CustomLoader />}
        <View style={[styles.containerViewMangeTiming,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewManageTime,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackDriverDocument" style={styles.backTouchManageTime} onPress={()=>{this.btnLogoutConfirm()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconManageTime,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleManageTime}>{i18n.t('documentSubmissionText')}</Text>
                </View>
                <View style={styles.extraViewManageTime}>
                    <Image resizeMode="contain" source={headPhoneIcon} style={styles.backTouchManageTime}></Image>
                </View>
            </View>
        </View>

            <ScrollView style={styles.timingCenterViewEdit} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.submitMainView}>
                    <Text style={[styles.submitTitleText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('submitDocumentStepsText')}</Text>
                    <Text style={[styles.submitSubTilteText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('submittedDocumentsDaysApproved')}</Text>

                    <View style={styles.manageMarginTop}>
                        <View style={styles.profileMainView}>
                            <TouchableOpacity testID="btnProfilePhoto" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectDriverPhoto()}}>
                                <View>
                                    <Text style={styles.listViewText}>{i18n.t('profilePhotoText')}</Text>
                                    <Text style={[styles.listViewSecondText,{color:this.statusColorManage(this.state.driverDocumentStatus.profile_photo_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusAccordingTextManage(this.state.driverDocumentStatus.profile_photo_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnDrivingLicenseRedirect" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectDocumentUpload('Driving License')}}>
                                <View>
                                    <Text style={styles.listViewText}>{i18n.t('drivingLicenseText')}</Text>
                                    <Text style={[styles.listViewSecondText,{color:this.statusColorManage(this.state.driverDocumentStatus.license_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusAccordingTextManage(this.state.driverDocumentStatus.license_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnAddVehicleDriver" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectAddVehicleDriver()}}>
                                <View>
                                    <Text style={styles.listViewText}>{i18n.t('addVehicleText')}</Text>
                                    <Text style={[styles.listViewSecondText,{color:this.statusColorManage(this.state.driverDocumentStatus.vehicle_registration_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusAccordingTextManage(this.state.driverDocumentStatus.vehicle_registration_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity testID="btnBankDriverRedirect" style={[styles.listViewTouch,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>{this.btnRedirectAddBankDriver()}}>
                                <View>
                                    <Text style={styles.listViewText}>{i18n.t('Bank_Account')}</Text>
                                    <Text style={[styles.listViewSecondText,{color:this.statusColorManage(this.state.driverDocumentStatus.bank_detail_status),textAlign:TextAlignManage(i18n.language)}]}>{this.statusAccordingTextManage(this.state.driverDocumentStatus.bank_detail_status)}</Text>
                                </View>
                                <Image resizeMode="contain" source={arrowRight} style={[styles.listViewRightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            
            </ScrollView>
            {
                !this.state.fromProfile && 
                    <View style={styles.btnContactMargin}>
                        <TouchableOpacity testID="logoutbtn" style={styles.btnNextButton} onPress={()=>{this.btnLogoutConfirm()}}>
                            <Text style={styles.nextButtonText}>{i18n.t('logOutText')}</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerEdit:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerEdit: {
        flex: 1,
        backgroundColor: "#ffffff",
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
    containerViewMangeTiming:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewManageTime:{
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchManageTime:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconManageTime:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleManageTime:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewManageTime:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    timingCenterViewEdit:{
        width:windowWidth*90/100,
        alignSelf:'center',
        flex: 1,
    },
    profileMainView: {
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
    listViewTouch:{
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
    listViewText:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Bold',
        marginLeft:windowWidth*4/100
    },
    listViewSecondText:{
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
    submitMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*5/100
    },
    submitTitleText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*4.5/100,
        color:'#375280'
    },
    submitSubTilteText:{
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.2/100,
        color:'#94A3B8'
    },
    manageMarginTop:{
        marginTop:windowWidth*6/100
    }
});
// Customizable Area End