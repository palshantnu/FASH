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
  TextInput,
  ScrollView,
  FlatList
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";

import CustomformCreateManageTimingController, { Props,WeekDayArrProps } from "./CustomformCreateManageTimingController";
import {Dropdown} from "react-native-element-dropdown"
import globalStyle from "../../../components/src/GlobalStyle"
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import CustomLoader from "../../../components/src/CustomLoader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// Customizable Area End

export default class CustomformCreateManageTiming extends CustomformCreateManageTimingController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
    getWeekDayListEdit = (item:WeekDayArrProps,index:number)=>{
        let value = item;
        return (
            <View>
                <View style={[styles.dayFlatlistMainViewEdit,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={[styles.dayTimingTextEdit,{textAlign:TextAlignManage(i18n.language)}]}>{value.showDayValue} *</Text>
                    <TouchableOpacity style={styles.textInputTouchEdit} testID="btnShowTimeFromEdit" onPress={()=>{this.showTimepickerEdit('from',item,index)}}>
                        <TextInput
                            testID={"txt_enter_from_time_edit"}
                            keyboardType="default"
                            returnKeyLabel="done"
                            returnKeyType="done"
                            editable={false}
                            pointerEvents="none"
                            placeholder={i18n.t('from')}
                            placeholderTextColor={'#9A9A9A'}
                            style={[{
                                borderWidth: this.checkBoarderWidth(value.dayFromError),
                                borderColor: this.checkBoarderColor(value.dayFromError),textAlign:TextAlignManage(i18n.language)},styles.timeTextInput]}
                            value={value.startTime}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textInputTouchEdit} testID="btnShowTimePickerToEdit" onPress={()=>{this.showTimepickerEdit('to',item,index)}}>
                        <TextInput
                            testID={"txt_enter_to_time_edit"}
                            keyboardType="default"
                            returnKeyLabel="done"
                            returnKeyType="done"
                            editable={false}
                            pointerEvents="none"
                            placeholder={i18n.t('to')}
                            placeholderTextColor={'#9A9A9A'}
                            style={[{
                                borderWidth: this.checkBoarderWidth(value.dayToError),
                                borderColor: this.checkBoarderColor(value.dayToError),textAlign:TextAlignManage(i18n.language)},styles.timeTextInput]}
                            value={value.endTime}
                        />
                    </TouchableOpacity>
                </View>
                {
                    (value.dayFromError || value.dayToError) &&
                    <View style={[styles.errorViewEdit,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*18/100,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,windowWidth*18/100)}]}>
                    <Text style={[styles.errorTextEdit,{textAlign:TextAlignManage(i18n.language)}]}>{value.errorMsg}</Text>
                    </View>
                }
            </View>
        );
    }
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
                <TouchableOpacity testID="btnBackManageTiming" style={styles.backTouchManageTime} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconManageTime,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleManageTime}>{i18n.t('manageTimingsText')}</Text>
                </View>
                <View style={styles.extraViewManageTime}>
                </View>
            </View>
        </View>

            <ScrollView style={styles.timingCenterViewEdit} showsVerticalScrollIndicator={false} bounces={false}>

                <View style={styles.storeCreateMainViewEdit}>
                    <FlatList
                    testID={"weekday_data_show_edit"}
                    bounces={false}
                    data={this.state.weekDayArr}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.itemSepratorEdit} />}
                    renderItem={({item,index}) => this.getWeekDayListEdit(item,index)}
                    keyExtractor={(item) => item.id}
                    />
                   
                </View>

                <View style={styles.storeCreateMainViewEdit}>
                  <Text style={[styles.labelTextEdit,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('averageTimeOrderText')}</Text>
                  <Dropdown
                  testID="avgTimeDropdownEdit"
                  data={this.state.timingArrDropdown}
                  placeholder={i18n.t('selectAverageTimeText')}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  value={this.state.orderAvgTiming}
                  itemTextStyle={[styles.blueThemeColorEdit,{textAlign:TextAlignManage(i18n.language)}]}
                  placeholderStyle={[styles.dropdownPlaceholderEdit,{textAlign:TextAlignManage(i18n.language)}]}
                  selectedTextStyle={[styles.blueThemeColorEdit,{textAlign:TextAlignManage(i18n.language)}]}
                  style={[{
                    borderWidth: this.checkBoarderWidth(this.state.avgTimeError),
                    borderColor: this.checkBoarderColor(this.state.avgTimeError)},styles.dropDownTextInputEdit]}
                    onChange={(item)=>{
                      this.selectAvgTimeUpdate(item.value)
                    }}
                    iconStyle={[styles.dropdownIconCssEdit,{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)}]}
                    iconColor={'#475569'}
                  />
                  {
                    this.state.avgTimeError &&
                    <View style={styles.errorViewEditDrop}>
                      <Text style={[styles.errorTextEdit,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterAverageTimeError')}</Text>
                    </View>
                  }
                </View>


                <DateTimePickerModal
                    date={new Date()}
                    testID="dateTimePickerEdit"
                    onHide={this.hideDatePickerEdit}
                    isVisible={this.state.isDatePickerVisibleEdit}
                    mode="time"
                    onConfirm={this.handleConfirmEdit}
                    onCancel={this.hideDatePickerEdit}
                />
            </ScrollView>
            <View style={styles.btnNextMarginEdit}>
                <TouchableOpacity testID="btnUpdateStoreTimings" style={styles.btnNextButtonAddEdit} onPress={()=>{this.updateStoreTimingsBtn()}}>
                <Text style={styles.createButtonTextEdit}>{i18n.t('saveDetails')}</Text>
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
    safeViewContainerEdit:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerEdit: {
        flex: 1,
        backgroundColor: "#ffffff",
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
    btnNextMarginEdit:{
        position:'absolute',
        bottom:windowWidth*7/100,
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    btnNextButtonAddEdit:{
        backgroundColor:'#CCBEB1',
        width:windowWidth*90/100,
        height:windowHeight*6/100,
        borderRadius:2,
        justifyContent:'center'
    },
    createButtonTextEdit:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Lato-Black',
        fontSize:windowWidth*4.5/100
    },
    storeCreateMainViewEdit:{
        marginTop:windowWidth*4/100,
    },
    labelTextEdit:{
        color:'#375280',
        fontFamily:'Lato-Bold',
        fontSize:windowWidth*3.9/100
    },
    textInputTouchEdit:{
        width: (windowWidth * 34) / 100,
        height: (windowHeight * 6.5) / 100,
    },
    timeTextInput:{
        width: (windowWidth * 34) / 100,
        height: (windowHeight * 5.5) / 100,
        padding: 7,
        marginTop: 7,
        borderRadius: 5,
        backgroundColor: '#F8F8F8',
        fontFamily:'Lato-Regular',
        color:'#375280'
    },
    errorViewEdit:{
        marginTop:windowWidth*1/100
    },
    errorTextEdit:{
        color:'#F87171',
        fontFamily:'Lato-Regular',
        fontSize:windowWidth*3.9/100
    },
    dropDownTextInputEdit:{
        width: (windowWidth * 90) / 100,
        height: (windowHeight * 5.5) / 100,
        padding: 7,
        marginTop: 7,
        borderRadius: 5,
        backgroundColor: '#F8F8F8',
        fontFamily:'Lato-Regular',
        color:'#000000'
    },
    errorViewEditDrop:{
        marginTop:windowWidth*1/100,
    },
    blueThemeColorEdit:{
        color:'#375280'
    },
    itemSepratorEdit:{
        height: windowWidth*2/100
    },
    dropdownIconCssEdit:{
        position:'absolute',
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        right:5
    },
    dropdownPlaceholderEdit:{
        color:'#9A9A9A',
        padding:5
    },
    timingCenterViewEdit:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    dayTimingTextEdit:{
        fontSize:windowWidth*4/100,
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        width:windowWidth*18/100
    },
    dayFlatlistMainViewEdit:{
        justifyContent:'space-between',
        alignItems:'center'
    }
});
// Customizable Area End