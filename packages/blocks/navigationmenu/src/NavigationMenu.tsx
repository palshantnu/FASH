import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal
} from "react-native";
import { analystIcon, arrowIcon, crossIcon, fashionIcon, revenueIcon, salesIcon, yourActivutyIcon,logout } from "./assets";
import Scale from "../../../components/src/Scale";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Customizable Area End

import NavigationMenuController, {
  Props,
  configJSON,
} from "./NavigationMenuController";

export default class NavigationMenu extends NavigationMenuController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          this.hideKeyboard();
        }}
      >
        {/* Customizable Area Start */}
        {/* Merge Engine UI Engine Code */}
        <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        networkActivityIndicatorVisible={false}
      />

      <View style={[styles.subContiner,{ height:this.isPlatformiOS() ? windowHeight*90/100 : windowHeight*97/100}]}>
        <View style={styles.header}>
          <View style={styles.topLeftContainer}>
            <Image style={styles.fashionIconStyle} source={fashionIcon} />
            <View style={{ paddingHorizontal: Scale(17) }}>
              <Text style={styles.fashionHubText}>Fashion Hub</Text>
              <TouchableOpacity style={styles.openBtn}>
                <Text style={styles.openText}>Open</Text>
              </TouchableOpacity>

            </View >
            <Image style={[styles.topArrowIconStyle, ]} source={arrowIcon} />
          </View>
<TouchableOpacity testID="cancelIcon" onPress={this.handleNavigationToHomePage}>
          <Image style={styles.crossIconStyle} source={crossIcon} />
          </TouchableOpacity>

        </View>
        <View style={styles.body}>
          <TouchableOpacity onPress={this.handleFeatureNotYetImplemented} testID="analyticsBtn" style={styles.bodyItemContainer}>
            <View style={styles.topLeftContainer}>
              <Image style={styles.leftSideIconStyle} source={analystIcon} />
              <Text style={styles.leftSideIconText}>Analytics and Insights</Text>
            </View>
            <Image style={styles.arrowIconStyle} source={arrowIcon} />
          </TouchableOpacity>
          <View style={styles.seperator} />
          <TouchableOpacity onPress={this.handleFeatureNotYetImplemented} testID="salesBtn" style={styles.bodyItemContainer}>
            <View style={styles.topLeftContainer}>
              <Image style={styles.leftSideIconStyle} source={salesIcon} />
              <Text style={styles.leftSideIconText}>Sales Report</Text>
            </View>
            <Image style={styles.arrowIconStyle} source={arrowIcon} />
          </TouchableOpacity>
          <View style={styles.seperator} />
          <TouchableOpacity onPress={this.handleFeatureNotYetImplemented} testID="revenueBtn" style={styles.bodyItemContainer}>
            <View style={styles.topLeftContainer}>
              <Image style={styles.leftSideIconStyle} source={revenueIcon} />
              <Text style={styles.leftSideIconText}>Revenue/Payments</Text>
            </View>
            <Image style={styles.arrowIconStyle} source={arrowIcon} />
          </TouchableOpacity>
          <View style={styles.seperator} />
          <TouchableOpacity onPress={this.handleFeatureNotYetImplemented} testID="activityBtn" style={styles.bodyItemContainer}>
            <View style={styles.topLeftContainer}>
              <Image style={styles.leftSideIconStyle} source={yourActivutyIcon} />
              <Text style={styles.leftSideIconText}>Your Activity</Text>
            </View>
            <Image style={styles.arrowIconStyle} source={arrowIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{this.setState({logoutModal:true})}} testID="logout"  style={styles.footer}>
          <Image style={styles.logoutIconStyle} resizeMode="contain" source={logout}/>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.logoutModal}>
          <View style={styles.modalMainView}>
             
              <View style={styles.cameraModalMainViewAdd}>
                  <View style={{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100}}>
                      <View style={{borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100}}></View>
                      <View style={{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100}}>
                          <Text style={{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'}}>Log out</Text>
                      </View>
                      <View style={{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth}}>
                          <Text style={{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'}}>Are you sure you want to log out your account?</Text>
                      </View>
                      <View style={{width:windowWidth*90/100,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:windowWidth*4/100}}>
                          <TouchableOpacity testID="btnLogoutModal" style={{width:windowWidth*42/100,backgroundColor:'#F87171',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.btnLogoutAndRedirection()}}>
                              <Text style={{color:'#ffffff',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>Logout</Text>
                          </TouchableOpacity>
                          <TouchableOpacity testID="btnCancelLogoutModal" style={{width:windowWidth*42/100,backgroundColor:'#ffffff',height:windowHeight*5.5/100,alignItems:'center',justifyContent:'center',borderColor:'#CCBEB1',borderWidth:1}} onPress={()=>{this.setState({logoutModal:false})}}>
                              <Text style={{color:'#375280',textAlign:'center',fontSize:windowWidth*4.5/100,fontFamily:'Lato-Bold'}}>Cancel</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </View>
      </Modal>
      </SafeAreaView>
        {/* Merge Engine UI Engine Code */}
        {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  subContiner: {
    
   
    paddingVertical: Scale(14),
    justifyContent: "space-between"
  },
  header: {
    paddingVertical: Scale(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft:Scale(14)
  },
  body: {
    paddingVertical: Scale(23),
    display: "flex",
    flexGrow: 1,
paddingHorizontal:Scale(14)

  },
  bodyItemContainer: {
    height: Scale(42),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  footer: {
   paddingHorizontal:Scale(14),
    height:Scale(40),
    flexDirection: "row",
    alignItems:"center",
    paddingVertical:5,
    marginBottom:4
  },
  topLeftContainer: {
    flexDirection: "row",
    justifyContent: "space-between",


  },
  fashionIconStyle: {
    width: Scale(48),
    height: Scale(48),
    borderRadius: Scale(24),

  },
  arrowIconStyle: {
    paddingLeft: 10,
    width: Scale(20),
    height: Scale(20),

    transform: [{ rotate: '-90deg' }],
    resizeMode: "contain"
  },
  topArrowIconStyle:{
    paddingLeft: 10,
    width: Scale(20),
    height: Scale(20),

   
    resizeMode: "contain"
  },
  
  crossIconStyle: {
    resizeMode: "contain",
    width: Scale(48),
    height: Scale(48),
  marginRight:3
  },
  openBtn: {
    width: Scale(59),
    height: Scale(24),
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  fashionHubText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(16),
    fontWeight: '700',
    color: '#375280',
  },
  openText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: '400',
    color: '#375280',
  },
  leftSideIconStyle: {
    width: Scale(24),
    height: Scale(24),
    marginRight: Scale(10)
  },
  leftSideIconText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(18),
    fontWeight: '700',
    color: '#375280',
  },
  seperator: {
    height: 1,
    backgroundColor: "#D9D9D9",
    opacity: 1,
    marginVertical: Scale(15),
    paddingHorizontal:5
  },
  logoutIconStyle:{
    width: Scale(24),
    height: Scale(24),
    marginRight: Scale(10)
  },
logoutText:{
  fontSize:windowWidth*4.5/100,
  color:'#F87171',
  fontFamily:'Lato-Regular',
  fontWeight:'500',
},
modalMainView:{
  flex: 1, 
  backgroundColor: '#00000030', 
  alignItems: 'center'
},

cameraModalMainViewAdd:{
  position: 'absolute', 
  bottom:0,
  width:windowWidth
},
modalSecondView:{
  alignSelf: 'center',
  width:'100%'
},
modalSafe:{
  flex:0
},

});
// Customizable Area End
