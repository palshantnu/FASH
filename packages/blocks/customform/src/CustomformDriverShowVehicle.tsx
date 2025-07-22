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
  ScrollView,
  FlatList
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,arrowRight,twoWheeler,carIcon } from "./assets";

import CustomformDriverShowVehicleController, { Props } from "./CustomformDriverShowVehicleController";
import globalStyle from "../../../components/src/GlobalStyle"
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class CustomformDriverShowVehicle extends CustomformDriverShowVehicleController {
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
        <View style={[styles.containerViewAddVehicle,globalStyle.headerMarginManage]}>
            <View style={[styles.headerViewDriverAdd,{ flexDirection: FlexConditionManage(i18n.language) }]}>
                <TouchableOpacity testID="btnBackShowVehicle" style={styles.backTouchManageAddDriver} onPress={()=>{this.props.navigation.pop(3)}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconShowVehicle,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleVehicleShow}>{i18n.t('vehiclesText')}</Text>
                </View>
                <View style={styles.extraViewShowVehicle}>
                </View>
            </View>
        </View>

            <ScrollView style={styles.timingCenterShowVehicle} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.showVehicleMainView}>
                    <View style={styles.manageMarginTop}>
                        <View style={styles.profileMainViewShowVehicle}>
                        <FlatList
                            testID="showVehiclesFlatData"
                            data={this.state.vehicleArr}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            ListEmptyComponent={() => (!this.state.loading ? 
                            <View style={styles.flatlistEmptyMainView}>
                            <Text style={styles.flatlistEmptyText}>{i18n.t('noVehicleFoundEmpty')}</Text>
                            </View>
                            : null)}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={1} testID="btnProfilePhoto" style={[styles.listViewTouchShowVehicle,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                        <View style={[styles.flatlistAfterView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                            <Image resizeMode="contain" source={item.attributes.vehicle_type === 'Car' ? carIcon:twoWheeler} style={styles.listFirstIconShowVehicle}/>
                                            <Text style={[styles.listViewTextShowVehicle,{marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*3/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*3/100,undefined)}]}>{item.attributes.registration_number}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </View>
                        
                        <View style={styles.btnAddVehicleMainView}>
                            <TouchableOpacity testID="btnAddVehicle" style={styles.btnAddVehicleButton} onPress={()=>{this.btnAddVehicleRedirection()}}>
                                <Text style={styles.addVehicleButtonText}>{i18n.t('addVehicleText')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            
            </ScrollView>
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
    containerViewAddVehicle:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewDriverAdd:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchManageAddDriver:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconShowVehicle:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleVehicleShow:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewShowVehicle:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    timingCenterShowVehicle:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    profileMainViewShowVehicle: {
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
    listViewTouchShowVehicle:{
        height:windowHeight*7/100,
        borderBottomWidth:1,
        borderBottomColor:'#E2E8F0',
        alignItems:'center',
        paddingLeft:windowWidth*3/100
    },
    listFirstIconShowVehicle:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    listViewTextShowVehicle:{
        fontSize:windowWidth*4.5/100,
        color:'#375280',
        fontFamily:'Lato-Regular',
        marginLeft:windowWidth*3/100
    },
    listViewRightIconShowVehicle:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        position:'absolute',
        right:10
    },
    showVehicleMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        marginTop:windowWidth*5/100
    },
    manageMarginTop:{
        marginTop:windowWidth*3/100
    },
    flatlistEmptyMainView:{
        width:windowWidth*90/100,
        alignSelf:'center',
        alignItems:'center',
        marginTop:windowHeight*30/100
    },
    flatlistEmptyText:{
        fontSize:windowWidth*5/100,
        fontFamily:'Avenir-Heavy',
        color:'#375280'
    },
    btnAddVehicleMainView:{
        marginTop:windowWidth*5/100,
        paddingBottom:windowWidth*8/100
    },
    btnAddVehicleButton:{
        width:windowWidth*90/100,
        height:windowHeight*6/100,
        borderRadius:2,
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderColor:'#CCBEB1',
        borderWidth:1
    },
    addVehicleButtonText:{
        color:'#375280',
        textAlign:'center',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*4.5/100,
        fontWeight:'500'
    },
    flatlistAfterView:{
        flexDirection:'row',
        width:windowWidth*50/100
    }
});
// Customizable Area End