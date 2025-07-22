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
  FlatList,
  Modal,
  SafeAreaView
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import {  rightArrow,blackRightIcon,optionButton } from "./assets";
import CustomHeader from "../../../components/src/CustomHeader";
import Scale from "../../../components/src/Scale";
import { RFValue } from "react-native-responsive-fontsize";
import {  cancel } from "./../../catalogue/src/assets";
import CustomSwitch from "../../../components/src/CustomSwitch";
import i18n from '../../../components/src/i18n/i18n.config';
import TextAlignManage from '../../../components/src/TextAlignManage';
import ImageReverseManage from '../../../components/src/ImageReverseManage';
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
// Customizable Area End

import CreateOfferController, {
  Props,
} from "./CreateOfferController";
import { configJSON } from "./CreateNewOfferController";

export default class CreateOffer extends CreateOfferController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

editProductModel(){
  return(
  <Modal
  animationType="slide"
  testID="modal"
  transparent={true}
  visible={this.state.modalVisible}
  statusBarTranslucent
  onRequestClose={() =>
    this.setState({ modalVisible: !this.state.modalVisible })
  }
>
  <TouchableOpacity
    testID="closeBtn"
    style={styles.centeredView}
    onPress={() =>
      this.setState({ modalVisible: !this.state.modalVisible })
    }
  >
    <View style={styles.modalView}>
      <TouchableOpacity
        testID="cancelBtn"
        onPress={() =>
          this.setState({ modalVisible: !this.state.modalVisible })
        }
        style={[styles.crossContainer,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}
      >
        <Image style={styles.crossIcon} source={cancel} />
      </TouchableOpacity>
      <View style={styles.modalTextContainer}>
        <Text style={[styles.modalText]}>{i18n.t('Track Offer Menu')}</Text>
      </View>
      <View>
        <TouchableOpacity
          testID="manualBtn"
          style={styles.textStyleContainer}
          onPress={()=>this.editOffer()}
        >
          <Text style={[styles.textStyle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Edit Offer')}</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="deleteBtn" style={[styles.textStyleContainer,{borderBottomWidth:0}]} onPress={this.deleteModal}>
          <Text style={[styles.textStyle,{color:'#F87171'},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Delete Offer')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
</Modal>
  )}
rendersubHeader = ({ item }: { item: { id: number; header: string } }) => {
  return (
    <TouchableOpacity
      testID={"selectHeader"+item.id}
      style={[
        styles.subHeaderBtn,
        {
          borderBottomColor:
            item.header === this.state.selectedHeader ? 'rgba(55, 82, 128, 1)' : 'transparent',
        },
      ]}
      onPress={() => this.selectHeader(item)}
    >
      <Text
        style={[
          styles.subHeaderTxt,
          {
            color:item.header === this.state.selectedHeader ?"#375280":"#94A3B8",
            fontFamily:
              item.header === this.state.selectedHeader ? 'Lato-Bold' : 'Lato-Regular',
          }
        ]}
      >
        {item.header}
      </Text>
    </TouchableOpacity>
  );
}


render() {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <CustomHeader leftTestId="customHeader"
        title={i18n.t("Offers and Discounts")}
        onLeftPress={() => this.props.navigation.goBack()} language={""}        />
        {this.editProductModel()}
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={{paddingBottom:140, backgroundColor: "#ffffff",}}>
       
        <View style={styles.flatlistContainer}>
          <FlatList
            testID="flatlistID"
            data={this.state.subHeader}
            renderItem={this.rendersubHeader}
            keyExtractor={(item: { id: number }) => item.id.toString()}
            numColumns={2}
            style={{direction : FlatListRowManage(i18n.language)}}
          />
        </View>
        {this.state.selectedHeader ===i18n.t("Create offer")?<>
        <TouchableOpacity  style={styles.contentss} onPress={()=>this.navigateToCreateNewOffer('Stores')} testID="navigateToCreateNewOffer">
          <View style={[styles.contentContainerss,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={[styles.titless,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create your offer for stores')}</Text>
            <Image source={rightArrow} style={[styles.rightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
          </View>
          <Text style={[styles.subtitless,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create best offer to get more orders')}</Text>
          <View style={styles.bottomViewes}>
              <View testID="btnAddAdress" style={styles.addAdressButton} >
                    <Text style={styles.addNewButtonText}>{i18n.t('Create offer')}</Text>
                </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contentss,{ marginTop: Scale(15)}]} onPress={()=>this.navigateToCreateNewOffer('Products')} testID="navigationBtn">
          <View style={[styles.contentContainerss,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={[styles.titless,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create your offer for products')}</Text>
            <Image  style={[styles.rightIcon,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} source={rightArrow} resizeMode="contain"/>
          </View>
          <Text style={[styles.subtitless,{ paddingLeft:Scale(5)},{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Create best offer to get more orders')}</Text>
          <View style={styles.bottomViewes}>
              <View style={styles.addAdressButton} >
                    <Text style={styles.addNewButtonText}>{i18n.t('Create offer')}</Text>
                </View>
          </View>
          </TouchableOpacity>
        </>:
         <View >
        {this.state.offerList.length>0?
       
         <FlatList
                    testID={"Assignstore_show_flatlist_list"}
                    data={this.state.offerList}
                    contentContainerStyle={{flexGrow:1,marginBottom:10}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=> {
                      return (
                        
                      <View style={styles.contentss}  >
                      <View style={[styles.contentContainerss,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <View style={{flexDirection:FlexConditionManage(i18n.language),width:'92%',paddingVertical:5 }}>
                        <Text style={[styles.titlessNew,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.code}</Text>
                       <View style={ {
                        marginLeft: (windowWidth * 3) / 100,flexDirection:FlexConditionManage(i18n.language)
                      }}>
                        <CustomSwitch
                      testID={"CustomCheckBox"+index} 
                      size={16}
                      onValueChange={()=>{this.updateOfferStatus(item.id)}}
                      value={
                        item.attributes.isActive
                      }
                      activeBGColor="#375280"
                    />
                    </View>
                      </View>
                        <TouchableOpacity testID="showModel" onPress={()=>this.showModel(item)} >
                        <Image source={optionButton} style={[styles.rightIconNew,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:FlexConditionManage(i18n.language),paddingVertical:5}}>
                      <Text style={[styles.subtitlessNew,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Minimum Order Value ')}</Text>
                      
                      <Text style={[styles.titlessNewDate,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.currencyIconS}{parseInt(item.attributes.min_cart_value)}</Text>
                      </View>
                      <View style={{flexDirection:FlexConditionManage(i18n.language),paddingVertical:5}}>
                      <View style={{flexDirection:FlexConditionManage(i18n.language),width:'78%'}}>
                        <Text style={[styles.subtitlessNew,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Campaign Start Date ')}</Text>
                        <Text style={[styles.titlessNewDate,{textAlign:TextAlignManage(i18n.language)}]}>{this.formatDateOffer(item.attributes.valid_from)}</Text>
                        </View>
                        <Text style={[styles.titlessNewPercent,{textAlign:TextAlignManage(i18n.language)}]}>{parseInt(item.attributes.discount)+`% OFF`}</Text>
                       
                         </View>
                      </View>
                     
                    )}}
                    keyExtractor={(item, index) => index.toString()}
                />
       
        :<View style={styles.contentss}>
          <Text style={{textAlign:TextAlignManage(i18n.language)}}>{i18n.t('Offer and discount data not available!')}</Text>
        </View>
}
        </View>
        }
      </View>
    </ScrollView>
    <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.deleteModal}>
          <View style={styles.modalMainViewDeleteNew}>
            <SafeAreaView style={styles.modalSafeDeleteNew}></SafeAreaView>
            <View style={styles.cameraModalMainViewAddDeleteNew}>
              <View style={styles.parentViewNew}>

                <View style={styles.lineViewObjNew}></View>

                <View style={styles.modalHeaderViewNew}>
                  <Text style={[styles.modalTitleTextNew]}>{i18n.t('Delete Offer')}</Text>
                </View>

                <View style={styles.modalDecViewNew}>
                  
                  <Text style={[styles.modalDecTextNew, {marginTop: 8 }]}>{i18n.t('Are you sure you want to delete Offer?')}</Text>
                </View>

                <View style={[styles.modalBtnBgViewNew,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <TouchableOpacity testID="btndeleteModal" style={styles.deleteBtnNew}
                  onPress={this.deleteOfferItem}
                  >
                    <Text style={[styles.deleteBtnTextNew,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Delete')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity testID="btnCanceldeleteModal" style={styles.cancelBtnNew} onPress={() => { this.setState({ deleteModal: false }) }}>
                    <Text style={[styles.cancelBtnTextNew,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('Cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
  );
}

  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
 
  contentss: {
    marginTop: Scale(12),
    alignSelf:'center',
    width:'99%',
    padding: Scale(10),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,   
    borderRadius:Scale(2),
    marginBottom:20
  
  },
  mainView:{ flexDirection: 'row' },
             
                
  addAdressButton: {
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    paddingHorizontal:15,
    paddingVertical:13,
  },
  addNewButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: Scale(20),
    fontWeight: "600",
  },
  flatlistContainer:{ borderBottomWidth: 1, borderBottomColor: '#94A3B8' },
  offers : {
    top: 11,
    left: 95,
    right: 90,
    position: 'absolute',   
     width: 295,
    fontFamily: 'Avenir-Heavy',
    fontWeight: '800',
    fontSize: 20,
    letterSpacing: 0,
    color: '#375280',
  },
  

  subHeaderBtn: { borderBottomWidth: RFValue(3), flex: 1, paddingBottom: 10, marginTop: Scale(20) ,width:Scale(182)
  },
  subHeaderTxt: {
    fontSize: Scale(16),
    justifyContent: "center",
    textAlign: "center"
  },
  bottomViewes: {
    marginTop:Scale(20),
    marginBottom:Scale(5),
    padding:Scale(5),
    backgroundColor: "white",
  },
  addNewBtnTxt: {
    color: "white",
    textAlign: "center",
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainerss:{
    flexDirection:"row",
    paddingTop:Scale(5),
    paddingLeft:Scale(5)
  },   
  titlessNewDate: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 14,
    color: "#375280",
  },
  titlessNewPercent: {
    right:0,
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
  },
  titlessNew: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 18,
    color: "#375280",
  },
  titless: {
    fontWeight: "700",
    fontFamily: "Lato",
    fontSize: 18,
    color: "#375280",
    width:'90%'
  },
  subtitless: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: 16,
    color: '#94A3B8',
   paddingLeft:Scale(5)
  },
  subtitlessNew: {
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: 13,
    color: '#94A3B8',
   paddingLeft:Scale(5)
  },
  scrollView:{  flexGrow: 1,
    paddingHorizontal: Scale(20),
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    backgroundColor: "#ffffff",
   },
  safeareaview: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  headerContainer :{ width: 380, height: 48, flexDirection: 'row' },
  backIcon: {
    height: Scale(20),
    width: Scale(20),  
    marginLeft:Scale(20),
     marginTop:Scale(18),
    resizeMode: "contain",
    marginRight: Scale(4),
  },
  rightIconNew:{
    right:0,
    height: Scale(32),
    width: Scale(32), 
    resizeMode: "contain",
  },
  rightIcon: {
    height: Scale(32),
    width: Scale(32), 
    resizeMode: "contain",
  },
  rightIcon2: {
    height: Scale(18),
    width: Scale(18), 
    left:Scale(50),
   bottom:Scale(20),
    //marginTop:Scale(10),
    resizeMode: "contain",
  },
  rightIconss:{
    height: Scale(24),
    width: Scale(24), 
    left:Scale(20),
    marginTop:Scale(22),
    resizeMode: "contain",
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
  promocodeRowContainer: {
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 13,
    paddingVertical: 15,
    minHeight: 80,
    borderColor: "#e4e4e4",
  },
recommendedoffersContainer:{ backgroundColor: "#ffffff", height: Scale(234), width: Scale(380), padding: 10, },
recommendtext:{
  marginTop:5,
  fontFamily: 'Lato-Bold',
  fontSize: 18,
  fontWeight: '700',
  lineHeight: 26,
  color:"#375280"
},
  container1: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', 
  },
  box: {
    
    marginTop:20,
    width:'45%',
    padding: 20,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 2,
     elevation: 1,
    
  },
  text: {
    fontSize: 14,
    color: '#334155',
    fontFamily: 'Lato-Bold',
  },
  percentage: {
    fontSize: 24,
    color: '#375280',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    paddingBottom: 5,
  },
  textStyle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
  },
  textStyleContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 15,
    borderBottomColor: "#E3E4E5",
  },
  apiTextStyleContainer: {
    marginHorizontal: 12,
  },
  crossContainer: {
    alignItems: "flex-end",
    paddingRight: 8,
    paddingTop: 5,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    fontWeight: "800",
    color: "#375280",
  },
  modalTextContainer: {
    paddingBottom: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "#E3E4E5",
  },
  crossIcon: {
    width: Scale(25),
    height: Scale(25),
  },
 
 
modalMainViewDeleteNew:{
  flex: 1, 
  alignItems: 'center',
  backgroundColor: '#00000030', 
},
cameraModalMainViewAddDeleteNew:{
  position: 'absolute', 
  bottom:0,
  width:windowWidth
},
modalSafeDeleteNew:{
  flex:0
},
parentViewNew: { backgroundColor: '#fff', width: '100%', alignSelf: 'center', height: windowHeight * 36 / 100 },
lineViewObjNew: { borderWidth: 2, borderColor: '#F2F3F5', width: windowWidth * 20 / 100, alignSelf: 'center', marginTop: windowWidth * 3 / 100 },
modalHeaderViewNew: { borderBottomWidth: 1, borderBottomColor: '#E3E4E5', height: windowHeight * 6 / 100, marginTop: windowWidth * 5 / 100 },
modalTitleTextNew: { textAlign: 'center', fontSize: windowWidth * 5.5 / 100, color: '#375280', fontFamily: 'Lato-Bold', },
modalDecViewNew: { borderBottomWidth: 1, borderBottomColor: '#E3E4E5', height: windowHeight * 10 / 100, marginTop: windowWidth * 5 / 100, padding: 5, alignSelf: 'center', width: windowWidth },
modalDecTextNew: { textAlign: 'center', color: '#375280', fontSize: windowWidth * 4.1 / 100, fontFamily: 'Lato-Regular', width: windowWidth * 90 / 100, alignSelf: 'center' },
modalBtnBgViewNew:{ width: windowWidth * 90 / 100, flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', alignSelf: 'center', bottom: 30, position: 'absolute' },
deleteBtnNew: { width: windowWidth * 42 / 100, backgroundColor: '#F87171', height: windowHeight * 5.5 / 100, alignItems: 'center', justifyContent: 'center' },
deleteBtnTextNew: { color: '#ffffff', textAlign: 'center', fontSize: windowWidth * 4.5 / 100, fontFamily: 'Lato-Bold' },
cancelBtnNew: { width: windowWidth * 42 / 100, backgroundColor: '#ffffff', height: windowHeight * 5.5 / 100, alignItems: 'center', justifyContent: 'center', borderColor: '#CCBEB1', borderWidth: 1 },
cancelBtnTextNew: { color: '#375280', textAlign: 'center', fontSize: windowWidth * 4.5 / 100, fontFamily: 'Lato-Bold' }, 

});
// Customizable Area End
