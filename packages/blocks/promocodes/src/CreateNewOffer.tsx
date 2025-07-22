import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {  calender, eyeIcon ,rightArrow} from "./assets";
import {  selectedCheckBox, unSelectedCheckBox } from "./../../catalogue/src/assets";
import Scale from "../../../components/src/Scale";
import * as IMG_CONST from "./assets";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import HTMLView from 'react-native-htmlview';
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage';
import ImageReverseManage from '../../../components/src/ImageReverseManage';
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
interface CatalogueItem{ product:string,sku:string,selectStatus:boolean,id:number}
// Customizable Area End

import CreateNewOfferController, {
  Props,
  configJSON,
} from "./CreateNewOfferController";

export default class CreateNewOffer extends CreateNewOfferController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  showUserTypeDiscount(){
    return(
      <View style={[styles.container1,{marginHorizontal:20,marginBottom:5}]}>
      <Text style={[styles.discountPercentText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Discount applicable for')}</Text>
      <View style={{flexDirection:FlexConditionManage(i18n.language)}}>
        <TouchableOpacity style={[this.state.selectUserType?styles.userTypeButtonActive:styles.userTypeButtonInactive,{  marginRight: this.state.selectUserType?Scale(15):0,marginLeft:ManageDynamicMargin(i18n.language,(windowWidth * 3) / 100,undefined)}]} onPress={this.AllusersbtnPress} testID="AllUsersBrn">
          <Text style={[this.state.selectUserType?styles.userTypeTextActive:styles.userTypeTextInactive,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('All Users')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[!this.state.selectUserType?styles.userTypeButtonActive:styles.userTypeButtonInactive,{ width: Scale(132)}]} onPress={this.newUsersBtnPress} testID="newUsersBtnPressID">
          <Text style={[!this.state.selectUserType?styles.userTypeTextActive:styles.userTypeTextInactive,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('New Users')}</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
  renderItem = ({ item,index }: { item: CatalogueItem ,index:number}) => {
    const { product, sku,selectStatus } = item;
    return (
      <View style={[styles.renderContainer,{marginHorizontal:15}, index === this.state.productList.length-1 && {
        borderBottomWidth: 1.5,
        borderBottomColor: '#f1f5f9'
      }]}>
        <View style={{width: '40%',  paddingRight: 4, paddingVertical: 6,marginLeft:5}}>
          <Text style={[styles.renderItemTextStyel,{textAlign:TextAlignManage(i18n.language)}]}>{product}</Text>
        </View>
        <View style={{width: '30%',  paddingRight: 4, paddingVertical: 6, borderRightWidth: 1.5, borderRightColor: '#f1f5f9'}}>
          <Text style={[styles.renderItemTextStyel,{textAlign:TextAlignManage(i18n.language)}]}>{sku}</Text>
        </View>
        <View style={{ width: '30%',  padding: 6, alignItems:'center',flexDirection:FlexConditionManage(i18n.language)}}>
          <TouchableOpacity testID="selectCheckBox" onPress={() => this.toggleItemSelection(item)}>
            <Image
              style={[styles.checkBoxImage, {marginHorizontal: 6}]}
              source={selectStatus ? selectedCheckBox : unSelectedCheckBox}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
};

  productModel=()=>{ return(
  <Modal
  animationType={"fade"}
  transparent={false}
  visible={this.state.productModel}
>
  <ScrollView style={styles.modalContainer}>
  <CustomHeader
          leftTestId="btn-navigation-left"
          title="All Products"
          onLeftPress={() => this.hideProdcutModel()}  />
        <>
          {this.state.productList.length > 0 && 
              <View style={[styles.selectAllContainer,{marginHorizontal:15},{flexDirection:FlexConditionManage(i18n.language)}]}>
              <Text style={[styles.selectAllItemText,{marginLeft:5},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Select All Products')}</Text>
              <TouchableOpacity testID="allBtnCheckBox" onPress={this.toggleSelectAll}
              style={{ marginRight: responsiveWidth(11)}}
              >
                <Image
                  style={[styles.checkBoxImage]}
                  source={this.state.isSelectAll ? selectedCheckBox : unSelectedCheckBox}
                />
              </TouchableOpacity>
            </View>
          } 
            </>
             <View style={{borderBottomColor:"#f2f2f2",borderWidth:1,opacity:0.1}}></View>
                    <View style={[styles.renderContainer,{marginHorizontal:15}]}>
                            <Text style={[styles.renderItemText,{width:'40%',marginTop:10,marginLeft:5},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Product Name')}</Text>
                            <View style={{ width: '30%', borderRightWidth: 1.6, borderRightColor: '#f1f5f9', paddingTop: Scale(15), marginRight: Platform.OS == 'ios' ? -6 : -5 }}>
                            <Text style={[styles.renderItemText,{width:'30%',marginTop:10},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Sku')}</Text>
                           </View>
                            <Text style={[styles.renderItemText,{width:'30%',marginTop:10, paddingLeft: 12},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Select Products')}</Text>
                    </View>
                <FlatList
                    testID={"Assignstore_show_flatlist_list"}
                    data={this.state.productList}
                    contentContainerStyle={{flexGrow:1}}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{borderBottomColor:"#f2f2f2",borderWidth:1,opacity:0.1,marginBottom:10}}></View>
                <View style={[{alignSelf:'center',width:'100%',paddingHorizontal:20}]}>
              <View style={{bottom:15,width:'100%'}}>
               <TouchableOpacity
                    onPress={this.handleAssignStoreSaveButton}
                    style={[styles.saveButtonStyle,]}
                    testID="assignStoreSaveBtn"
                >
                    <Text style={[styles.saveButtonText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Select Products')}</Text>
                </TouchableOpacity>
                </View>
                
            </View>
  </ScrollView>
</Modal>
)}
productSelectContent=()=>{
  return(
    <>
    <View style={[styles.container1,{ shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,  },this.state.errorMsgProduct&&{borderColor:'#F87171',borderWidth:1}]}>
      <View style={{ height:Scale(56),width:'100%',flexDirection:FlexConditionManage(i18n.language)}}>
      <TouchableOpacity style={[styles.contentContainerss,{flexDirection:FlexConditionManage(i18n.language)}]} testID="showModel" onPress={()=>this.showProductModel()}>
      <Text style={[styles.titlessNew,{fontSize:15},{textAlign:TextAlignManage(i18n.language)}]}>{this.state.selectVerientIds.length>0?"Selected Products" +(this.state.selectVerientIds.length):i18n.t('Select Products')}</Text>
      <Image source={rightArrow} style={[styles.rightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
    </TouchableOpacity>
      </View>
    </View>
    {this.state.errorMsgProduct&&
    <View style={{width:windowWidth*90/100,alignSelf:'center',marginTop:10}}>
    <Text style={[styles.errorText1 ,{textAlign:TextAlignManage(i18n.language)}]}>
        {i18n.t('*Product not selected')}
      </Text>
      </View>
    }
    </>
  )
}
discountContent=()=>{
  return(
<>
          <View style={styles.container1}>
            <Text style={[styles.discountPercentText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Discount Percentage *')}</Text>
            <View style={{ backgroundColor: "#F8F8F8",height:Scale(56),width:'100%',justifyContent:'center'}}>
            <TextInput
              testID="MaxCaptextInput"
              placeholderTextColor="#375280"
              placeholder={i18n.t("Enter discount percentage")}
              style={[styles.buildingTextInput,this.state.errorMsgDiscountPercent&&{borderColor:'#F87171',borderWidth:1},{textAlign:TextAlignManage(i18n.language)}]}
              maxLength={4}
              value={this.state.discountPercent}
              onSubmitEditing={Keyboard.dismiss}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={this.handleDiscountPercent}
            />
            </View>
          </View>
          {this.state.errorMsgDiscountPercent&&
          <View style={{width:windowWidth*90/100,alignSelf:'center',marginTop:15}}>
          <Text style={[styles.errorText1,{textAlign:TextAlignManage(i18n.language)}]}>
              {i18n.t('*Please enter discount percentage')}
            </Text>
            </View>
          }
       </>
)}
maxContent(){
  return(
    <>
    <View style={styles.container1}>
      <Text style={[styles.discountPercentText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Max Cap *')}</Text>
      <View style={{ backgroundColor: "#F8F8F8",height:Scale(56),width:'100%',justifyContent:'center'}}>
      <TextInput
        testID="textinputIDMaxCap"
        placeholderTextColor="#375280"
        keyboardType="numeric"
        placeholder={i18n.t("Enter max cap")}
        style={[styles.buildingTextInput,this.state.errorMsgMaxCap&&{borderColor:'#F87171',borderWidth:1},{textAlign:TextAlignManage(i18n.language)}]}
        maxLength={40}
        value={this.state.maxCap}
        onSubmitEditing={Keyboard.dismiss}
        autoCapitalize="none"
        onChangeText={this.handleMaxCap}
      />
      </View>
    </View>
    {this.state.errorMsgMaxCap&&
    <View style={{width:windowWidth*90/100,alignSelf:'center',marginTop:15}}>
    <Text style={[styles.errorText1,{textAlign:TextAlignManage(i18n.language)}]}>
        {i18n.t('*Please enter max cap')}
      </Text>
      </View>
    }
 </>
  )
}
promocodeContent(){
  return(
    <View style={styles.container1}>
    <Text style={[styles.discountPercentText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create promo code *')}</Text>
    <View style={{ backgroundColor: "#F8F8F8",height:Scale(56),width:'100%',justifyContent:'center'}}>
    <TextInput
      testID="txtInputpromoCode"
      value={this.state.createPromocode}
      placeholderTextColor="#375280"
      placeholder={i18n.t("Enter promo code")}
      style={[styles.buildingTextInput, { borderColor: this.state.errorMsgPromocode ? "#F87171" : "#F8F8F8", borderWidth: this.state.errorMsg ? 1 : 0 },{textAlign:TextAlignManage(i18n.language)}]}
      maxLength={40}
      onSubmitEditing={Keyboard.dismiss}
      autoCapitalize="none"
      keyboardType="default"
      onChangeText={this.handlePromoCode}
    />
</View>
</View>
  )
}
showTersAndCondition(){
  return(
  <Modal
  animationType={"fade"}
  transparent={false}
  visible={this.state.termsShow}
>
  <SafeAreaView style={styles.tncContainers}>
  <CustomHeader leftTestId="customHeader"
          title={"Terms & Conditions"}
          onLeftPress={() => this.setState({ termsShow: false })} language={""}        />
  <View style={styles.container}>
 
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      <View style={styles.htmlCodeCons}>
        <HTMLView
          value={this.state.htmlCode}
          stylesheet={tnchtmlrenderstylesNew}
        />
      </View>
    </ScrollView>
  </View>
</SafeAreaView>
</Modal>
  )
}
minValueContent(){
  return(
    <>
          <View style={styles.container1}>
            <Text style={[styles.discountPercentText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Minimum order value *')}</Text>
            <View style={{ backgroundColor: "#F8F8F8",height:Scale(56),width:'100%',justifyContent:'center'}}>
            <TextInput
              testID="txtInputminOrder"
              value={this.state.minOrderValue}
              placeholderTextColor="#375280"
              placeholder={i18n.t("Enter minimum order value")}
              style={[styles.buildingTextInput,this.state.errorMsgMinOrderValue&&{borderColor:'#F87171',borderWidth:1},{textAlign:TextAlignManage(i18n.language)}]}
              maxLength={40}
              onSubmitEditing={Keyboard.dismiss}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={this.handleMinOrderValueChange}
            />
            </View>
          </View>
          {this.state.errorMsgMinOrderValue&&
          <View style={{width:windowWidth*90/100,alignSelf:'center',marginTop:15}}>
          <Text style={[styles.errorText1,{textAlign:TextAlignManage(i18n.language)}]}>
              {i18n.t('*Please enter min order value')}
            </Text>
            </View>
          }
       </>
  )
}
  render() {
    return (
<SafeAreaView style={styles.safeareaview}>
{this.state.loading &&
    <CustomLoader />
  }

      <CustomHeader
          title={this.state.offer_id != 0 ? i18n.t("Edit offer") : i18n.t("Create new offer")}
          onLeftPress={() => this.props.navigation.goBack()} language={""}        />
      <ScrollView
      ref={this.setScrollViewRef}
      contentContainerStyle={styles.scrollViewContainer}>
        {this.productModel()}
        {this.showTersAndCondition()}
        <View style={{alignItems:'center'}}>
          {this.state.errorMsg &&
            <View style={styles.errorContainer}>
              <View style={styles.errorRow}>
                <View style={[styles.iconContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Image source={eyeIcon} style={[styles.iconI,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                </View>
                <View>
              <Text style={[styles.errorText1,{marginLeft:15},{textAlign:TextAlignManage(i18n.language)}]}>
                  {i18n.t('Failed to create the promotion')}
            </Text>
            <Text style={[styles.retryText,{textAlign:TextAlignManage(i18n.language)}]}>
                  {i18n.t('Please try again.')}
                </Text>
              </View>
              </View>
            </View>
          }
          {this.state.type==='Products' &&
         this.productSelectContent()
        }
        {this.discountContent()}
       {this.maxContent()}
       {this.showUserTypeDiscount()}
        {this.promocodeContent()}
         {this.minValueContent()}
          <View style={styles.campaignContainer}>
            <Text style={[styles.discountPercentText,{marginVertical:10},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Campaign start date *')}</Text>
            <View>
            <View style={[styles.datePickerContainerss,this.state.errorMsgStartDate&&{borderColor:'#F87171',borderWidth:1}]}>
              <DateTimePickerModal
                testID="dateTimePickerEdit"
                isVisible={this.state.isStartDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirmDate}
                onCancel={this.hideDatePicker}
                minimumDate={this.state.campaingStartDate}
                locale={i18n.language}
              />
              <Pressable testID="openModel1" onPress={this.openDobModal} style={[styles.dateRowss,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={[styles.dateText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.selectFromDate?this.formatDate(this.state.selectedDate):i18n.t("Select start date")}</Text>
                <Image source={calender} style={[styles.icon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </Pressable>
            </View>
            {this.state.errorMsgStartDate&&
            <Text style={[styles.errorText1,{marginLeft:0,marginTop:10},{textAlign:TextAlignManage(i18n.language)}]}>
                {this.state.startDateErrorMsg}
              </Text>
            }
       </View>
            <Text style={[styles.campaignInfo,{textAlign:TextAlignManage(i18n.language)}]}>
            {i18n.t('Your campaign will start on {{startDate}}. You can stop this campaign at any time.', {
            startDate: this.formatDate(this.state.selectedDate)
            })}
            </Text>
          </View>
          <View style={styles.campaignContainer}>
            <Text style={[styles.CampaignenddateText,{marginVertical:10},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Campaign end date *')}</Text>
            <View>
            <View style={[styles.datePickerContainerss,this.state.errorMsgToDate&&{borderColor:'#F87171',borderWidth:1}]}>
              <DateTimePickerModal
              testID="dateTimePickerEditID"
                isVisible={this.state.isEndDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirmDate1}
                onCancel={this.hideDatePicker}
                locale={i18n.language}
                minimumDate={this.state.campaingStartDate}
              />
              <Pressable testID="openModel" onPress={this.openDobModal1} style={[styles.dateRowss,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <Text style={[styles.dateText,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.selectToDate?this.formatDate(this.state.selectedDate1):i18n.t("Select end date")}</Text>
                <Image source={calender} style={[styles.icon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
              </Pressable>
            </View>
            {this.state.errorMsgToDate&&
            <Text style={[styles.errorText1,{marginLeft:0,marginTop:10},{textAlign:TextAlignManage(i18n.language)}]}>
               {this.state.endDateErrorMsg}
            </Text>
          }
       </View>
            <View style={styles.endCampain}>
              <Text style={[styles.campaignInfo, {textAlign: TextAlignManage(i18n.language)}]}>
                {i18n.t('Your campaign will end on {{endDate}}. You can stop this campaign at any time.', {
                endDate: this.formatDate(this.state.selectedDate1)
                })}
              </Text>

            </View>
          </View>
          <View style={[styles.container1]}>
            <Text style={[styles.CampaignenddateText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("Offer details")}</Text>
            <Text style={[styles.offerDetailsText,{textAlign:TextAlignManage(i18n.language), marginBottom : 3}]}>
              {i18n.t('Offer applicable for ')}
              <Text style={[styles.highlightedText,{textAlign:TextAlignManage(i18n.language)}]}>{!this.state.selectUserType?i18n.t("New Users") +  " ":this.state.allUsersText}</Text>
              {i18n.t(' on all stores.')}
            </Text>
            <Text style={[styles.offerDetailsText,{textAlign:TextAlignManage(i18n.language), marginBottom : 3}]}>
              <Text style={[styles.offerDetailsText,{textAlign:TextAlignManage(i18n.language)}]}>
                {i18n.t('Valid on minimum order value of ')}
                <Text style={[styles.highlightedText,{textAlign:TextAlignManage(i18n.language)}]}>${this.state.minOrderValue}</Text>
              </Text>
            </Text>
            <Text style={[styles.offerDetailsText,{textAlign:TextAlignManage(i18n.language), marginBottom : 3}]}>
              {i18n.t(" Valid for ")}
              <Text style={[styles.selectedStoresText,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t("Selected stores.")}</Text>
            </Text>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.createButton} onPress={() => this.handleTheCreateButton()} testID="createBtn">
            <Text style={[styles.createButtonText]}>{this.state.offer_id!=0?i18n.t("Update"):i18n.t("Create")}</Text>
          </TouchableOpacity>
          <View style={[styles.tncContainer,{flexDirection:FlexConditionManage(i18n.language),marginLeft:ManageDynamicMargin(i18n.language,undefined,15),marginRight:ManageDynamicMargin(i18n.language,15,undefined)}]}>
            <View style={[styles.checkboxCon,{marginLeft:ManageDynamicMargin(i18n.language,5,undefined),marginRight:ManageDynamicMargin(i18n.language,undefined,5)}]}>
              <TouchableOpacity
                testID="checkbox"
                style={[
                  styles.checkboxstyle,
                  {
                    borderColor: "#375280"}
                  
                ]}
                onPress={this.handleCheckBox}
              >
                <Image
                  testID="checkboxImage"
                  source={this.state.termsAccepted ? IMG_CONST.check : null}
                  style={styles.passwordIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.tncContainerdes,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <Text style={[styles.trmtext,{textAlign:TextAlignManage(i18n.language)}]}>
              {i18n.t("By clicking create offer, you agree to our")}
              </Text>
              <TouchableOpacity
                style={styles.ppBtn}
                testID="btnTnC"
                onPress={this.navigationToTremsAndConditions}
              >
                <Text style={[styles.trmtextbtn,{textAlign:TextAlignManage(i18n.language)}]}>
                  {i18n.t('Terms & Conditions')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
</SafeAreaView>
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const tnchtmlrenderstylesNew =StyleSheet.create({
  body: {
    fontFamily: 'Lato-Regular',
    color: '#375280',
    
  },
  h2: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    fontWeight: '600',
    color: '#375280',
   
  },
  p: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#375280',
    
  },
  a: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#375280',
   
  },
});
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    backgroundColor:'#fff'
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
  },
  passwordIcon: {
    width: Scale(24),
    height: Scale(24),
  },
  trmtext: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    lineHeight: Scale(20),
    color: "#94A3B8",
    textAlign:'center'
  },
  tncContainerdes: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
   
  },
  ppBtn: {
    marginHorizontal: 2,
  },
  trmtextbtn: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(14),
    fontWeight: "500",
    lineHeight: Scale(20),
    flexWrap: "wrap",
  },
  safeareaview: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  divider: {
    width: Scale(380),
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
  checkboxCon: {
    width: 30,
    height: 30,
   marginRight: 5,
  },
  checkboxstyle: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
   
  },
  tncContainer: {
   marginLeft:15,
    marginTop: 20,
   alignItems:'center',
   alignSelf:'center'

  },
  contentContainerss:{
    flexDirection:"row",
    paddingTop:Scale(5),
    paddingLeft:Scale(5)
  },  
  titlessNew: {
    marginTop:10,
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: 14,
    color: "#375280",
    width:'94%',
    paddingLeft:5,
   height:Scale(56)
  },
  titless: {
    marginTop:10,
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: 14,
    color: "#375280",
    width:'94%',
    paddingLeft:5,
    backgroundColor: "#F8F8F8",height:Scale(56)
  },
  rightIcon: {
    marginTop:10,
    height: Scale(22),
    width: Scale(22), 
    resizeMode: "contain",
  },
  campaignContainer: {  marginTop: Scale(18),width:windowWidth*90/100,alignSelf:'center' },
  createButton: {
    marginTop:10,
    width: Scale(380),
    height: Scale(54),
    backgroundColor: '#CCBEB1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  createButtonText: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    color: '#FFFFFF',
  },
  safearea: {
    backgroundColor: '#ffffffff',
    width: '100%',
    paddingHorizontal: 20,
    flexGrow: 1,

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: Scale(380)
  },
  highlightedText: {
    color: '#375280',
    fontFamily: 'Lato-Bold',
    fontSize: 16
  },
  checkboxText: {
    fontSize: 14,
    color: '#CCBEB1',
  },
  termsText: {
    color: '#375280',
    textDecorationLine: 'underline',
  },
  selectedStoresText: {
    color: '#375280',
    fontFamily:'Lato-Black'
  },
  bottomView: {
    width: "80%",
    bottom: 10,
    backgroundColor: "white",
    position: "absolute",

    paddingHorizontal: Scale(20)

  },
  addAdressButton: {
    backgroundColor: "#CCBEB1",

    width: "100%",
    height: Scale(48),
    borderRadius: 2,
    position: "absolute",
    bottom: 10,
    alignItems: 'center',
    justifyContent: "center",
  },
  addNewButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: 16,
    fontWeight: "500",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerformainHead: {
    width: 380, height: 48, flexDirection: 'row'
  },

  endCampain: {
    width:'100%',
    marginBottom: Scale(20)
  },

  campaignInfo: {
    fontWeight: '400',
    fontSize: 14,
    color: "#375280",
    marginTop: Scale(15),

  },
  errorContainer:
  {
    height: Scale(70),
    width: Scale(380),
    borderRadius: 4,
    backgroundColor: 'rgba(254, 226, 226, 0.3)',
    borderColor: 'rgba(220, 38, 38, 0.3)',
    borderWidth: 1,
   alignSelf:'center',
   justifyContent:'center',
   paddingLeft:15
  },

  errorRow:
  {
    flexDirection: 'row',
  },
  iconContainer: { marginTop: Scale(15) },

  iconI: {
    height: 24,
    width: 24,
    marginTop: -5
  },
 
  errorText1:
  {
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    fontSize: Scale(16),
    color: "#F87171"
  },
  retryText:
  {
    color: 'rgba(220, 38, 38, 1)',
    fontSize: 14,
    fontWeight: '400',
    marginLeft:15,
    marginTop:5
  },

  backIcon: {
    height: Scale(20),
    width: Scale(20),
    marginLeft: Scale(20),
    marginTop: Scale(18),
    resizeMode: "contain",
    marginRight: Scale(4),
  },

  container1: {
    marginTop:10,
    width: '88%',
    backgroundColor: '#fff'
  },
  offerss: {
    top: 11,
    left: 110,
    right: 90,
    width: 295,
    fontFamily: 'Avenir-Heavy',
    fontSize: 20,
    letterSpacing: 0,
    color: '#375280',
  },
  rightIcon2: {
    height: Scale(18),
    width: Scale(18),
    left: Scale(50),
    bottom: Scale(20),
    resizeMode: "contain",
  },
  rightIcon1: {
    height: Scale(24),
    width: Scale(24),
    left: Scale(20),
    marginTop: Scale(22),
    resizeMode: "contain",
  },
  buildingTextInput: {
    marginVertical:Scale(5),
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    fontWeight: "400",
    height:Scale(56),
    paddingLeft:10,
  },

  main: {
    padding: Scale(20),
    flex: 1,
  },
  wrapper: {
    marginVertical: Scale(8),
  },
  discountPercentText: {
    marginVertical:Scale(5),
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: '#375280',
  },
  inputViewContainer: {
    borderWidth: 1,
    borderRadius: 4,
    height: Scale(100),
    width: Scale(380),
    //  margin: Scale(15),
    // marginTop: Scale(20),
    backgroundColor: '#fff'
  },
  userTypeButtonInactive: {
    backgroundColor: "#E2E8F0",
    width: Scale(132),
    height: Scale(48),
    justifyContent: 'center',
    alignItems: "center",
    marginTop: Scale(20),
  },
  userTypeTextInactive: {
    textAlign: 'center',
    color: '#375280',
    fontWeight: '500',
    fontSize: 18,
  },
  userTypeTextActive: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: '500',
    fontSize: 18,
  },
  userTypeButtonActive: {
    backgroundColor: "#375280",
    width: Scale(132),
    height: Scale(48),
    justifyContent: 'center',
    alignItems: "center",
    marginTop: Scale(20),
    marginLeft: Scale(15),
  },

  CampaignenddateText: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    color: '#375280',

  },
  offerDetailsText: {
    fontSize: 14,
    color: "#375280",
    marginTop: 15,
    fontFamily: 'Lato-Regular',
  },
  datePickerContainerss: {
    borderRadius: 4,
    justifyContent:'center',
    height:Scale(56),
    backgroundColor: "#F8F8F8",
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  label: {
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: Scale(16),
    color: "#375280",
    marginBottom: Scale(6),
  },
  textInput: {
    padding: Scale(8),
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
    color: "#375280",
    fontFamily: "Lato",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dob: {
    color: "#375280",
    fontFamily: "Lato",
  },
  dateRowss: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical:Scale(5),
  },
  dateText: {
    fontSize: 16,
    color: '#375280',
    marginLeft:10,
  },
  icon: {
    width: Scale(24),
    height: Scale(24),
    marginRight:10,
  },

  container: {
    flexGrow: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },

  modalContainer: {
    marginTop: windowWidth*10/100,
    
  },
  modalContainerImageView: {
    padding: 25,
    marginTop: 50,
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center"
  },
  shareModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#AAAAAAAA"
  },
  shareModalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: "100%"
  },
  modalTitle: {
    fontWeight: "bold",
    color: "#090909",
    textAlign: "center",
    fontSize: 18
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  buttonBoxImageView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  buttonBoxShareModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styledBtn: {
    backgroundColor: "blue",
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10
  },
  styledBtnRed: {
    backgroundColor: "#E1325A",
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10
  },
  btnSelectImage: {
    backgroundColor: "red",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10
  },
  btnTextWhite: {
    color: "#ffffff",
    fontWeight: "bold"
  },


  checkBoxImage: {
    width: Scale(22),
    height: Scale(22),

},
selectAllContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: Scale(20)
},
selectAllItemText: {
  fontFamily: "Lato-Regular",
  color: "#375280",
  lineHeight: Scale(24),
  fontWeight: "600",
  fontSize: Scale(16),
 
},
renderContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
renderSubLeftContainer: {
    flexDirection: "row",
    flex: 2,
},
renderItemTextStyel:{
  justifyContent: "center",
  width: Scale(120),
  paddingVertical: 4,
  color: '#375280',
  fontFamily: 'Lato-Regular',
  fontSize: Scale(14),
  alignItems: "center",
  
}
, renderItemText: {
  fontFamily: 'Lato-Regular',
  fontSize: Scale(14),
  fontWeight: '700',
  color: '#375280',
  marginBottom: 12,
},
renderItemImage: {
    height: Scale(32),
    width: Scale(32),
    borderRadius: Scale(16)
},
assignStoreSeperator: {
    marginVertical: Scale(10)
},
subCateListMainView: {
  flex: 1,
  width: windowWidth * 90 / 100,
  alignSelf: 'center'
},
saveButtonStyle: {
  height: Scale(56),

  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "#CCBEB1",
  borderRadius: 2,
  marginTop: Scale(25),

},
saveButtonText: {
  fontFamily: "Lato-Bold",
  fontSize: Scale(20),
  color: '#FFFFFF',

  lineHeight: Scale(26)
},
tncContainers: {
  height: "100%",
  width: "100%",
  backgroundColor: '#fff'
},

headerContainers: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15
},
backIconImgs: {
  width: Scale(32),
  height: Scale(32),
  tintColor: '#475569',
  marginLeft: Scale(-5)
},
tncTexts: {
  fontSize: Scale(20),
  fontWeight: "700",
  lineHeight: 26,
  color: '#375280',
  textAlign: 'center',
  marginLeft: -35
},
htmlCodeCons: {
  paddingHorizontal: 5,
  marginVertical: 20,
  marginBottom:50
}
});
// Customizable Area End
