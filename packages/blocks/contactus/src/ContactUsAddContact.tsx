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
  Keyboard,
  Modal,
  ScrollView
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon,attachment,rightArrow } from "./assets";

import ContactUsAddContactController, { Props } from "./ContactUsAddContactController";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import {Dropdown} from "react-native-element-dropdown"
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
// Customizable Area End

export default class ContactUsAddContact extends ContactUsAddContactController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerViewAddContact,globalStyle.headerMarginManage]}>
              <View style={[styles.headerViewAddContact,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBackAddContact" style={styles.backTouchAddContact} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddContact,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddContact}>{i18n.t('adminRelatedConcernText')}</Text>
                </View>
                <View style={styles.filterExtraTouch}>
                </View>
              </View>
              
              <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
              <View style={styles.contactUsAddMainView}>
                <Text style={[styles.addContactLabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('nameText')}</Text>
                <TextInput
                  testID={"txt_enter_name"}
                  onChangeText={(txt) => {
                      this.setState({ name: txt,nameError:false });
                  }}
                  keyboardType="default"
                  maxLength={70}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('enterYourName')}
                  placeholderTextColor={'#9A9A9A'}
                  style={[{
                      borderWidth: this.state.nameError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.nameError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInput]}
                  value={this.state.name}
                />
                {
                  this.state.nameError &&
                  <View style={styles.errorViewAddContact}>
                    <Text style={[styles.errorTextAddContact,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterNameErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainView}>
                <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.addContactLabelText]}>{i18n.t('emailText')}</Text>
                <TextInput
                  testID={"txt_enter_email"}
                  onChangeText={(txt) => {
                      this.setState({ email: txt,emailError:false });
                  }}
                  keyboardType="email-address"
                  maxLength={70}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('emailPlaceholderText')}
                  placeholderTextColor={'#9A9A9A'}
                  style={[{
                      borderWidth: this.state.emailError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.emailError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInput]}
                  value={this.state.email}
                />
                {
                  this.state.emailError &&
                  <View style={styles.errorViewAddContact}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextAddContact]}>{i18n.t('pleaseEnterEmailErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainView}>
                <Text style={[styles.addContactLabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('subjectText')}</Text>
                <TextInput
                  testID={"txt_enter_subject"}
                  onChangeText={(txt) => {
                      this.setState({ subject: txt,subjectError:false });
                  }}
                  keyboardType="default"
                  maxLength={70}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('subjectPlaceholderText')}
                  placeholderTextColor={'#9A9A9A'}
                  style={[{
                      borderWidth: this.state.subjectError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.subjectError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInput]}
                  value={this.state.subject}
                />
                {
                  this.state.subjectError &&
                  <View style={styles.errorViewAddContact}>
                    <Text style={[styles.errorTextAddContact,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterSubjectErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainView}>

                <Text style={[styles.addContactLabelText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('descriptionText')}</Text>

                <TextInput
                  testID={"txt_enter_description"}
                  onChangeText={(txt) => {
                      this.setState({ description: txt,descriptionError:false });
                  }}
                  keyboardType="default"
                  maxLength={250}
                  returnKeyLabel="done"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                      Keyboard.dismiss();
                  }}
                  placeholder={i18n.t('descriptionPlaceholderText')}
                  placeholderTextColor={'#9A9A9A'}
                  multiline={true}
                  textAlignVertical={"top"}
                  style={[{
                      borderWidth: this.state.descriptionError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.descriptionError),textAlign:TextAlignManage(i18n.language)},styles.descriptionInput]}
                  value={this.state.description}
                />
                {
                  this.state.descriptionError &&
                  <View style={styles.errorViewAddContact}>

                    <Text style={[styles.errorTextAddContact,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseDescriptionErrorText')}</Text>
                    
                  </View>
                }
              </View>

            </ScrollView>
          </View>
          <View style={styles.btnContactMargin}>
            <TouchableOpacity testID="btnContactSupport" style={styles.btnContactButton} onPress={()=>{this.contactUsSubmit()}}>
              <Text style={styles.contactButtonText}>{i18n.t('submitText')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainer:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerViewAddContact:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewAddContact:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchAddContact:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCssAddContact:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleAddContact:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterExtraTouch:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  contactUsAddMainView:{
    marginTop:windowWidth*5/100
  },
  addContactLabelText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  addContactTextInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorViewAddContact:{
    marginTop:windowWidth*1/100
  },
  errorTextAddContact:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  descriptionInput:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 10) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  btnContactMargin:{
    position:'absolute',
    bottom:windowWidth*6/100,
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  btnContactButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*8/100,
    justifyContent:'center'
  },
  contactButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
  },
  cameraModalTouch:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalView:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalText:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelView:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouch:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelText:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  cameraModalMainView:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  dropDownRenderMainView:{
    flexDirection:'row',
    padding:8,
    borderBottomWidth:1,
    borderBottomColor:'#D5D5D5',
    width:windowWidth*90/100,
    alignItems:'center',
    justifyContent:'space-between'
  },
  dropDownLabelText:{
    color:'#375280',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  dropDownAddresText:{
    color:'#94A3B8',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  dropDownContainerWidth:{
    width:windowWidth*80/100
  },
  imageNameColor:{
    fontFamily:'Lato-Regular',
    color:'#000000'
  }
});
