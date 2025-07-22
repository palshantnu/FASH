import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";
const windowWidth = Dimensions.get("window").width;
//@ts-ignore
import {back,down,infoIcon,starIcon,greenIcon} from './assets'
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import LoyaltysystemController, {
  Props,
  configJSON,
} from "./LoyaltysystemController";

export default class Loyaltysystem extends LoyaltysystemController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
          <View style={[styles.headerViewMainLoyalityScreen]}>
              <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchLoyality}
                        onPress={() => { this.props.navigation.goBack() }}>
                  <Image resizeMode="contain" source={back} style={[styles.backIconLoyalityScreen]}></Image>
              </TouchableOpacity>
              <View>
                  <Text style={styles.headerTitleLoyalityScreen}>{'Loyalty Points'}</Text>
              </View>
              <TouchableOpacity>
                  <Image source={infoIcon} resizeMode={'contain'} style={[styles.backIconLoyalityScreen]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.pointsView}>
                <Image resizeMode='contain' source={starIcon} style={[styles.starIconStyle]}/>
                <Text style={styles.numbertext}>475</Text>
            </View>
            <Text style={styles.availabletext}>Available Points</Text>
            <TouchableOpacity testID="loyaltyPointBtn" onPress={()=>this.props.navigation.navigate('RedeemScreen')} style={styles.useLoyalityview}>
              <Text style={styles.useLoyalityText}>Use Loyalty Points</Text>
            </TouchableOpacity>
            <Text style={styles.redeemtext}>{'Redeem your points effortlessly when you purchase new products from us.'}</Text>
            <View style={styles.lineView}></View>
            <View style={styles.transactionview}>
              <Text style={styles.transactionText}>{'Transactions'}</Text>
              <View style={styles.allview}>
                <Text style={styles.alltext}>All</Text>
                <Image source={down} style={styles.backIconLoyalityScreen}/>
              </View>
            </View>
            <FlatList
              testID="loyaltyDataFlatlist"
              data={this.state.data}
              keyExtractor={(index,id)=>id.toString()}
              bounces={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item})=>(
                <View style={styles.mainrendercontainer}>
                  <View style={styles.renderLeftSideView}>
                   <Image source={greenIcon} style={{height:25,width:25}}/>
                   <View style={styles.renderOrderView}>
                      <Text style={styles.orderIdText}>{item.orderID}</Text>
                      <Text style={styles.datetext}>{item.date}</Text>
                   </View>
                  </View>
                  <View><Text style={styles.pointsText}>{item.points}</Text></View>
                </View>
              )}
            />
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffffff",
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  headerViewMainLoyalityScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
},
viewContainerAssignStoreInAssign: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchLoyality: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconLoyalityScreen: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleLoyalityScreen: {
    color: '#375280',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
},
pointsView:{
  height:60,
  width:"32%",
  alignSelf:"center",
  marginTop:windowWidth*5/100,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginRight:windowWidth*5/100
},
starIconStyle:{
  height:40,width:40,marginTop:5
},
numbertext:{
  fontSize:40,
  color:"#CCBEB1",
  fontWeight:"700",
  fontFamily: 'Avenir-Heavy'
},
availabletext:{
  color:'#375280',
  textAlign:"center",
  marginTop:8,
  fontSize:16,
  fontFamily:'Lato-Regular',
},
useLoyalityview:{
  height:56,
  width:"97%",
  alignSelf:"center",
  backgroundColor:"#CCBEB1",
  marginTop:windowWidth*3/100
},
useLoyalityText:{
  color:"white",
  fontSize:23,
  textAlign:'center',
  marginTop:10,
  fontWeight:"700",
  fontFamily:'Lato-Regular',
},
redeemtext:{
  fontSize:15,
  left:5,
  color:"#375280",
  marginTop:10,
  fontFamily:'Lato-Regular',
},
lineView:{
  width:"96%",
  borderWidth:0.3,
  borderColor:"#CBD5E1",
  marginTop:windowWidth*4/100,
},
transactionview:{
  width:"96%",
  alignSelf:"center",
  height:50,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:windowWidth*5/100
},
transactionText:{
  fontFamily:'Lato-Bold',
  fontSize:17,
  color:"#375280",
  // fontWeight:'500'
},
allview:{
  width:"16%",
  height:35,
  borderWidth:1,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:'space-evenly',
  borderColor:"#CCBEB1"
},
alltext:{
  color:"#375280",
  fontSize:16
},
mainrendercontainer:{
  flexDirection:"row",
  width:"98%",
  justifyContent:"space-between",
  marginTop: windowWidth*5/100,
  height:'auto',
  minHeight:45
},
renderLeftSideView:{
  flexDirection:"row"
},
pointsText:{
  color:"#059669", // for red color #DC2626
  fontFamily:'Lato-Regular',
  fontSize:15
},
orderIdText:{
  fontFamily:'Lato-Regular',
  color:"#375280",
  fontSize:17
},
datetext:{
  fontFamily:'Lato-Regular',
  color:"#94A3B8",
  fontSize:15
},
renderOrderView:{
  justifyContent:"space-between"
}
});
// Customizable Area End
