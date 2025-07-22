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
import { backIcon,attachment } from "./assets";

import ContactUsAddContactDriverController, { Props,DropdownArrProps } from "./ContactUsAddContactDriverController";
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import {Dropdown} from "react-native-element-dropdown"
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
// Customizable Area End

export default class ContactUsAddContactDriver extends ContactUsAddContactDriverController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const renderItemListDriver = (item:DropdownArrProps) => {
      return (
        <View style={styles.dropDownRenderMainViewDriver}>
          <View style={styles.dropDownContainerDriverWidth}>
            <Text style={[styles.dropDownLabelTextDriver,{textAlign:TextAlignManage(i18n.language) }]}>{item.label}</Text>
          </View>
        </View>
      )
    }
    return (
        <View style={styles.containerDriver}>
            <SafeAreaView style={styles.safeContainerDriver}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            {this.state.loading && <CustomLoader />}
            <View style={[styles.containerDriverViewAddContact,globalStyle.headerMarginManage]}>
              <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewAddContactDriver]}>
                <TouchableOpacity testID="btnBackAddDriverContact" style={styles.backTouchAddContactDriver} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAddContactDriver,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAddContactDriver}>{this.state.headerTitleShow}</Text>
                </View>
                <View style={styles.filterExtraTouchDriver}>
                </View>
              </View>
              
              <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPaddingManage}>
              {
                this.state.contactUsType === 'deliveredOrder' &&
                <View style={styles.contactUsAddMainViewDriver}>
                  <Text style={[{textAlign:TextAlignManage(i18n.language)}, styles.addContactLabelTextDriver]}>{i18n.t('deliveredOrderIdText')}</Text>
                  <Dropdown
                  testID="deliveredOrderDropdown"
                  data={this.state.deliveredOrderArrDropdown}
                  maxHeight={200}
                  value={this.state.orderId}
                  labelField="label"
                  valueField="value"
                  placeholder={i18n.t('selectDeliveredOrderIdText')}
                  placeholderStyle={[styles.dropdownPlaceholder,{textAlign:TextAlignManage(i18n.language)}]}
                  selectedTextStyle={[styles.imageNameColorDriver,{textAlign:TextAlignManage(i18n.language)}]}
                  style={[{
                    borderWidth: this.state.storeNameError ? 1 : 0,
                    borderColor: this.checkBoarderColor(this.state.storeNameError)},styles.addContactTextInputDriver]}
                    onChange={(item)=>{
                      this.selectOrder(item)
                    }}
                    iconStyle={[{right:ManageDynamicMargin(i18n.language,undefined,5),left:ManageDynamicMargin(i18n.language,5,undefined)},styles.dropdownIconCss]}
                    iconColor={'#475569'}
                    renderItem={renderItemListDriver}
                    itemTextStyle={{textAlign:TextAlignManage(i18n.language) }}
                  />
                  {
                    this.state.storeNameError &&
                    <View style={styles.errorViewAddContactDriver}>
                      <Text style={styles.errorTextAddContactDriver}>{i18n.t('pleaseSelectDeliveredOrderErrorText')}</Text>
                    </View>
                  }
                </View>
              }


              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('nameText')}</Text>
                <TextInput
                  testID={"txt_enter_name"}
                  onChangeText={(txtName) => {
                      this.onNameChange(txtName)
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
                      borderColor: this.checkBoarderColor(this.state.nameError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInputDriver]}
                  value={this.state.name}
                />
                {
                  this.state.nameError &&
                  <View style={styles.errorViewAddContactDriver}>
                    <Text style={[styles.errorTextAddContactDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterNameErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.addContactLabelTextDriver]}>{i18n.t('emailText')}</Text>
                <TextInput
                  testID={"txt_enter_email"}
                  onChangeText={(txtEmail) => {
                    this.onEmailChange(txtEmail)
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
                      borderColor: this.checkBoarderColor(this.state.emailError),textAlign:TextAlignManage(i18n.language)},styles.addContactTextInputDriver]}
                  value={this.state.email}
                />
                {
                  this.state.emailError &&
                  <View style={styles.errorViewAddContactDriver}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)},styles.errorTextAddContactDriver]}>{i18n.t('pleaseEnterEmailErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[styles.addContactLabelTextDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('subjectText')}</Text>
                <TextInput
                  testID={"txt_enter_subject"}
                  onChangeText={(txtSubject) => {
                    this.onSubjectChange(txtSubject)
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
                      textAlign:TextAlignManage(i18n.language),
                      borderWidth: this.state.subjectError ? 1 : 0,
                      borderColor: this.checkBoarderColor(this.state.subjectError)},styles.addContactTextInputDriver]}
                  value={this.state.subject}
                />
                {
                  this.state.subjectError &&
                  <View style={styles.errorViewAddContactDriver}>
                    <Text style={[styles.errorTextAddContactDriver,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseEnterSubjectErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[{textAlign:TextAlignManage(i18n.language)}, styles.addContactLabelTextDriver]}>{i18n.t('descriptionText')}</Text>
                <TextInput
                  testID={"txt_enter_description"}
                  onChangeText={(txtDes) => {
                    this.onDescriptionChange(txtDes)
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
                      borderColor: this.checkBoarderColor(this.state.descriptionError),textAlign:TextAlignManage(i18n.language)},styles.descriptionInputDriver]}
                  value={this.state.description}
                />
                {
                  this.state.descriptionError &&
                  <View style={styles.errorViewAddContactDriver}>
                    <Text style={[styles.errorTextAddContactDriver, {textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pleaseDescriptionErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.contactUsAddMainViewDriver}>
                <Text style={[styles.addContactLabelTextDriver,   {textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('attchmentText')}</Text>
                <View style={[{borderWidth: this.state.selectImageError ? 1 : 0,borderColor: this.checkBoarderColor(this.state.selectImageError),justifyContent:'center'},styles.addContactTextInputDriver]}>
                  <Text style={styles.imageNameColorDriver}>{this.state.imageFileName}</Text>
                </View>
                <TouchableOpacity testID="btnAttachmentOpen" style={[styles.attachmentTouch,{right:ManageDynamicMargin(i18n.language,undefined,10),left:ManageDynamicMargin(i18n.language,10,undefined)}]} onPress={()=>{this.mediaModalOpen()}}>
                  <Image source={attachment} style={styles.attachmentIcon}></Image>
                </TouchableOpacity>
                {
                  this.state.selectImageError &&
                  <View style={styles.errorViewAddContactDriver}>
                    <Text style={[{textAlign:TextAlignManage(i18n.language)}, styles.errorTextAddContactDriver]}>{i18n.t('pleaseSelectAttachmentErrorText')}</Text>
                  </View>
                }
              </View>

              <View style={styles.btnContactMarginDriver}>
                <TouchableOpacity testID="btnContactSupport" style={styles.btnContactButtonDriver} onPress={()=>{this.contactUsSubmitDriver()}}>
                  <Text style={styles.contactButtonTextDriver}>{i18n.t('submitText')}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.mediamodal}>
              <View style={styles.mediaModalMainView}>
                <SafeAreaView style={styles.mediaModalFlexManage}></SafeAreaView>
                <View style={styles.cameraModalMainViewDriver}>
                  <View style={styles.mediaModalAfterView}>
                    <TouchableOpacity  
                    testID={"btn_camera"}
                    style={styles.cameraModalTouchDriver} activeOpacity={0.9} onPress={()=>{this.Camerapopen()}}>
                      <View style={styles.cameraModalViewDriver}>
                          <Text style={styles.cameraModalTextDriver}>{i18n.t('cameraText')}</Text>
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity  
                      testID={"btn_gallery"}
                      style={[styles.cameraModalTouchDriver,{marginTop:10}]} onPress={()=>{this.Galleryopen()}}>
                      <View style={styles.cameraModalViewDriver}>
                          <Text style={styles.cameraModalTextDriver}>{i18n.t('galleryText')}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.cameraModalCancelViewDriver}>
                      <TouchableOpacity 
                      testID={"btn_cancelMedia"}
                      onPress={() => {this.mediaModalClose() }} style={styles.cameraModalCancelTouchDriver}>
                          <Text style={styles.cameraModalCancelTextDriver}>{i18n.t('cancelText')}</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
          </Modal>

        </View>
      //Merge Engine End DefaultContainerDriver
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerDriver: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainerDriver:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  containerDriverViewAddContact:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  headerViewAddContactDriver:{
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchAddContactDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconCssAddContactDriver:{
    width:windowWidth*5/100,
    height:windowWidth*5/100
  },
  headerTitleAddContactDriver:{
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center',
    fontFamily:'Avenir-Heavy'
  },
  filterExtraTouchDriver:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  contactUsAddMainViewDriver:{
    marginTop:windowWidth*5/100
  },
  addContactLabelTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*3.9/100
  },
  addContactTextInputDriver:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  errorViewAddContactDriver:{
    marginTop:windowWidth*1/100
  },
  errorTextAddContactDriver:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  descriptionInputDriver:{
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 10) / 100,
    padding: 7,
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  btnContactMarginDriver:{
    marginTop:windowWidth*5/100
  },
  btnContactButtonDriver:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6.5/100,
    borderRadius:2,
    marginTop:windowWidth*8/100,
    justifyContent:'center'
  },
  contactButtonTextDriver:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*4.5/100
  },
  cameraModalTouchDriver:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  cameraModalViewDriver:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalTextDriver:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  cameraModalCancelViewDriver:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cameraModalCancelTouchDriver:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  cameraModalCancelTextDriver:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  cameraModalMainViewDriver:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  dropDownRenderMainViewDriver:{
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'#D5D5D5',
    width:windowWidth*90/100,
    alignItems:'center',
    justifyContent:'space-between'
  },
  dropDownLabelTextDriver:{
    color:'#375280',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  dropDownAddresTextDriver:{
    color:'#94A3B8',
    fontFamily:'Lato-Regular',
    fontWeight:'500',
    fontSize:windowWidth*4/100
  },
  dropDownContainerDriverWidth:{
    width:windowWidth*80/100
  },
  imageNameColorDriver:{
    fontFamily:'Lato-Regular',
    color:'#375280'
  },
  attachmentTouch:{
    position:'absolute',
    top:windowWidth*10.5/100
  },
  attachmentIcon:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  mediaModalMainView:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  mediaModalAfterView:{
    alignSelf: 'center',
    width:'100%'
  },
  mediaModalFlexManage:{
    flex:0
  },
  dropdownIconCss:{
    position:'absolute',
    width:windowWidth*6/100,
    height:windowWidth*6/100,
  },
  scrollPaddingManage:{
    paddingBottom:150
  },
  dropdownPlaceholder:{
    color:'#9A9A9A',
    padding:5,
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.5/100
  }
});
