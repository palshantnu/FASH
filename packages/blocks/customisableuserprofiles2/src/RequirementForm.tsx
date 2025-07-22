import React from "react";

import {
  // Customizable Area Start
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import * as IMG_CONST from "./assets";
import RequirementFormController, { Props } from "./RequirementFormController";
import Scale, { verticalScale } from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
import { Dropdown } from "react-native-element-dropdown";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import { responsiveHeight } from "react-native-responsive-dimensions";
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

export default class RequirementForm extends RequirementFormController  {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    formContainer() {
        return (
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={[styles.genderLabelText, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("gender")}</Text>
                    <Dropdown
                        testID="dropId"
                        style={styles.dropdown}
                        placeholderStyle={[styles.placeholderStyleForm,{ textAlign: TextAlignManage(i18n.language) }]}
                        selectedTextStyle={[styles.selectedTextStyleForm, { textAlign: TextAlignManage(i18n.language) }]}
                        itemTextStyle={[{ textAlign: TextAlignManage(i18n.language),color:'#375280' }]}
                        iconStyle={styles.iconStyleForm}
                        data={[
                            { label: i18n.t('Male'), value: 'male' },
                            { label: i18n.t('Female'), value: 'female' },
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={i18n.t("selectGender")}
                        value={this.state.gender}
                        onChange={item => {
                            this.setState({ gender: item.value,isErrorGender:false });
                        }}
                    />
                    {this.state.isErrorGender && <Text style={[styles.errorMsg, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("* Gender is required")}</Text>}
                </View>

                <View style={[styles.inputGroup,{marginTop:verticalScale(15)}]}>
                    <Text style={[styles.labelForm, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("colourPreference")}</Text>
                    <TextInput
                       testID="colorPreferenceTextID"
                        style={[styles.textInput, { textAlign: TextAlignManage(i18n.language) }]}
                        placeholder={i18n.t("enterPreferredColour")}
                        value={this.state.colorPreference as string}
                        onChangeText={text => this.onSetColor(text)}
                        placeholderTextColor={"#375280"}
                    />
                  {this.state.isErrorColor && <Text style={[styles.errorMsg, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("colorPreferenceError")}</Text>}  
                </View>
             <View>
                <View style={[styles.row, {flexDirection: FlexConditionManage(i18n.language)}]}>
                    <View style={{flex:0.48}}>
                        <Text style={[styles.labelForm ,{ textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("minimumPrice")}</Text>
                        <TextInput
                        testID="minPriceTestId"
                            style={[styles.textInput, { textAlign: TextAlignManage(i18n.language) }]}
                            placeholder="$0"
                            keyboardType="numeric"
                            placeholderTextColor={"#375280"}
                            value={this.manageCurrencyValue()}
                            onChangeText={text => this.updateMinPrice(text)}
                        />
                       
                    </View>
                    <View style={{flex:0.48}}>
                        <Text style={[styles.labelForm ,{ textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("maximumPrice")}</Text>
                        <TextInput
                            testID="maxPriceTestId"
                            style={[styles.textInput, { textAlign: TextAlignManage(i18n.language) }]}
                            placeholder="$0"
                            keyboardType="numeric"
                            value={this.manageCurrencyValueMax()}
                            placeholderTextColor={"#375280"}
                            onChangeText={text => this.updateMaxPrice(text)}
                        />
                
                    </View>
                </View>
                {this.state.isErrorMax || this.state.isErrorMin ? <Text style={[styles.errorMsg, { textAlign: TextAlignManage(i18n.language) }]}>* {this.state.errorMessage}</Text>:<Text/>} 
            </View> 
                <View style={styles.textareaContainer}>
                    <Text style={[styles.detailsLabelText,{ textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("moreDetailsText")}</Text>
                    <TextInput
                    testID="moreDetailsTestId"
                        style={[styles.textareaStyle, { textAlign: TextAlignManage(i18n.language) }]}
                        multiline={true}
                        value={this.state.moreDetails as string}
                        onChangeText={text => this.setState({ moreDetails: text ,isErrorDetails: false })}
                    />
                    {this.state.isErrorDetails && <Text style={[styles.errorMsg, { textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("detailsError")}</Text>}
                </View>

                <View style={{marginTop:verticalScale(10),flex:1}}>
                    <Text style={[styles.labelForm ,{ textAlign: TextAlignManage(i18n.language) }]}>{i18n.t("Attachments")}</Text>
                    <TouchableOpacity style={styles.uploadBtn}
                        onPress={() => { this.Galleryopen() }} >
                        <Image source={IMG_CONST.exportImg} />
                        <Text style={styles.labelFormText}>{i18n.t("imageType")}</Text>
                    </TouchableOpacity>
                    {this.state.isErrorImage && <Text style={[styles.errorMsg,{ textAlign: TextAlignManage(i18n.language) },{height:verticalScale(18)}]}>{i18n.t("* Image is required")}</Text> }
                </View>
                <View style={{flex:1,flexDirection:FlexConditionManage(i18n.language),marginTop:verticalScale(8)}}>
                {this.state.selectImage && this.state.selectImage.map(image =>{
                    return(
                        <View style={styles.imgBox} >
                            <Image source={{ uri: image.uri}} style={{height:verticalScale(80),width:Scale(80)}} />
                            <TouchableOpacity testID="ImageId" style={styles.deleteBtn} onPress={()=>this.onRemoveImage(image.id)} >
                                <Image source={IMG_CONST.deleteIcon} style={{marginTop:verticalScale(2)}}/>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                </View> 
                 

                <TouchableOpacity
                    onPress={()=>{this.checkValidation(this.state.gender,this.state.colorPreference || null,this.state.minPrice || null,this.state.maxPrice || null,this.state.moreDetails || null,this.state.profileImageData)}}
                    testID="customFormAPiBtnTestID"
                    style={styles.addButton}>
                    <Text style={styles.addText}>{i18n.t("submitText")}</Text>
                </TouchableOpacity>

            </View>
        );
    }

    headerContainer(){
        return(
            <View style={[styles.containerView, globalStyle.headerMarginManage]}>
                    <View style={[styles.headerViewRF, { flexDirection: FlexConditionManage(i18n.language) }]}>
                        <TouchableOpacity testID="styllistPageTestId" style={styles.backTouch} onPress={this.navigateToStylishProfile} >
                            <Image resizeMode="contain" source={backIcon} style={[styles.backIconRF, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTitleAll}>{i18n.t('requirementForm')}</Text>
                        </View>
                        <View style={styles.extraSpaceView} />
                    </View>
                </View>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeViewContainer}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
            {this.state.isLoading && <CustomLoader />}
                {this.headerContainer()}
                <ScrollView>
                 {this.formContainer()}
                </ScrollView>
            </View>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    addButton: {
        alignItems: "center",
        backgroundColor: "#CCBEB1",
        height:verticalScale(62),
        borderRadius: 2,
        justifyContent: "center",
        marginVertical:verticalScale(12),
        marginBottom:responsiveHeight(6)
      },
      addText: {
          fontWeight:'800',
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize:20,
        lineHeight: 26,
      },
    inputGroup: {
        justifyContent: "space-between",
        marginTop:verticalScale(10)
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop:verticalScale(15)
    },
    halfWidth: {
        width: '48%',
    },
    labelForm: {
        fontSize: 16,
        lineHeight: Scale(24),
        fontWeight: '600',
        color: '#375280',
        fontFamily: 'Lato-Bold',
        marginBottom:verticalScale(10)
    },
    genderLabelText:{
        fontSize: 16,
        lineHeight: Scale(24),
        fontWeight: '600',
        color: '#375280',
        fontFamily: 'Lato-Bold',
    },
    detailsLabelText:{
        fontSize: 16,
        lineHeight: Scale(24),
        fontWeight: '600',
        color: '#375280',
        fontFamily: 'Lato-Bold',
    },
    labelFormText:{
        fontSize: 18,
        lineHeight: Scale(24),
        fontWeight: '700',
        color: '#375280',
        fontFamily: 'Lato',
        marginTop:verticalScale(12)
    },
    uploadBtn:{
        height: verticalScale(184),
        alignItems: "center",
         justifyContent: "center",
         backgroundColor: '#F8F8F8',
    },
    imgBox: {
        position: "relative",
        width: Scale(80),
        height: verticalScale(80),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: Scale(12),
        marginBottom: Scale(20)
    },
    deleteBtn:{
        alignItems:'center',
        position: "absolute", 
        right: 5,
        top: 5,
        height: Scale(24),
        width: Scale(24), 
        borderRadius: Scale(12), 
        backgroundColor: 'white'
    },
    textInput: {
        fontSize: Scale(18),
        fontWeight: '400',
        lineHeight: Scale(24),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 2,
        color: '#375280',
        fontFamily: 'Lato-Regular',
        backgroundColor:'#F8F8F8',
        height:verticalScale(45),
        paddingLeft:Scale(10)
    },
    textareaStyle:{
        fontSize: Scale(18),
        fontWeight: '400',
        lineHeight: Scale(24),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 2,
        height:verticalScale(84),
        padding: 10,
        color: '#375280',
        fontFamily: 'Lato-Regular',
        backgroundColor: '#F8F8F8',  
        marginTop:verticalScale(10),
        textAlignVertical: 'top' 
    },
    textareaContainer:{
     marginTop:verticalScale(15),
    },
    placeholderStyleForm: {
        fontSize: 16,
        color: '#375280',
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        backgroundColor:'#F8F8F8',
    },
    selectedTextStyleForm: {
        fontSize: Scale(16),
        fontFamily:'Lato-Rugular',
        fontWeight:'400',
        color: '#375280',
    },
    iconStyleForm: {
        width: Scale(20),
        height: Scale(20),
    },
    safeViewContainer:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerView:{
        width:windowWidth*90/100,
        alignSelf:'center',
    },
    headerViewRF:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouch:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconRF:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAll:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraSpaceView:{
        justifyContent: 'center',
    },
    formContainer:{
        marginTop:verticalScale(25),
        marginHorizontal:Scale(24),
        flex:1,
        justifyContent: 'space-between',
    },
  
    dropdown: {
        height: verticalScale(50),
        borderColor: '#375280',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop:verticalScale(10),
        backgroundColor:'#F8F8F8'
      },
      icon: {
        marginRight: 5,
      },
      
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: verticalScale(24),
        height: Scale(24),
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      errorMsg: {
        fontSize: 14,
        color: "red",
        marginTop:verticalScale(5),
        fontFamily:'Lato-Regular',
        fontWeight:'400'
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});