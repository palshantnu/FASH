import React from "react";

import {
  // Customizable Area Start
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Modal
  // Customizable Area End
} from "react-native";

// Customizable Area Start
const windowWidth = Dimensions.get("window").width;
import {infoIcon,backIcon,starIcon} from './assets'
// Customizable Area End

import LoyaltysystemController, {
  Props,
} from "./LoyaltysystemController";

export default class RedeemScreen extends LoyaltysystemController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
        <SafeAreaView style={styles.container}>
            <View style={[styles.headerViewMainRedeemScreen]}>
              <TouchableOpacity testID="btnBackInReddemScreen" style={styles.backTouchRedeemScreen}
                        onPress={() => { this.props.navigation.goBack() }}>
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconRedeemScreen]}></Image>
              </TouchableOpacity>
              <View>
                  <Text style={styles.headerTitleRedeemScreen}>{'Loyalty Points'}</Text>
              </View>
              <TouchableOpacity>
                  <Image source={infoIcon} style={[styles.backIconRedeemScreen]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.pointsViewredeemscreen}>
                <Image resizeMode='contain' source={starIcon} style={[styles.starIconStyle]}/>
                <Text style={styles.numbertextredeemscreen}>475</Text>
            </View>
            <Text style={styles.redeemavailabletext}>Available Points</Text>
            <View style={styles.redeemlineView}></View>
            <FlatList
                testID="pointsDataFlatlist"
                data={this.state.redeemDataArray}
                keyExtractor={(index,id)=>id.toString()}
                bounces={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                  <View style={styles.rendermaincontainer}>
                    <View style={styles.rendertextstyle}>
                        <Text style={styles.titletext}>{item.title}</Text>
                        <View style={styles.renderpointview}>
                            <Text style={styles.claimtext}>Claim offer using</Text>
                             <Image source={starIcon} style={{height:22,width:22,left:5}}/>   
                             <Text style={[styles.claimtext,{left:10}]} >{`${item.earn_points} points`}</Text>
                        </View>
                    </View>
                    <TouchableOpacity testID="redeemBtn" onPress={()=>this.openModalFunc()} style={styles.redeemboxview}>
                        <Text style={styles.reedemtext}>Redeem</Text>
                    </TouchableOpacity>
                  </View>
                )}
            />
            <Modal 
              animationType="slide"
              transparent={true}
              // testID="returnModal"
              visible={this.state.showModal}
              statusBarTranslucent
            >
              <View style={styles.modalview}>
                <View style={styles.insidemodalview}>
                  <View style={styles.smalllineview}></View>
                  <Text style={styles.redeempointtext}>Redeem points?</Text>
                  <View style={styles.lineview}></View>
                  <Text style={styles.taptext}>Tap ‘Redeem’ to collect the reward using points.</Text>
                  <View style={styles.buttonstyle}>
                      <TouchableOpacity testID="cancelBtn" style={styles.cancelview} onPress={()=>this.cancelButton()}> 
                        <Text style={styles.canceltext}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity testID="redeemFunction" onPress={()=>this.handleRedeemFunction()} style={styles.redeemview}>
                        <Text style={styles.redeemtext}>Redeem</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
        </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#ffffffff",
    },
    headerViewMainRedeemScreen: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    
    backTouchRedeemScreen: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    
    backIconRedeemScreen: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },
    headerTitleRedeemScreen: {
        color: '#375280',
        fontSize: windowWidth * 5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },
    pointsViewredeemscreen:{
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
      numbertextredeemscreen:{
        fontSize:40,
        color:"#CCBEB1",
        fontWeight:"700",
        fontFamily: 'Avenir-Heavy'
      },
      redeemavailabletext:{
        color:'#375280',
        textAlign:"center",
        marginTop:8,
        fontSize:16,
        fontFamily:'Lato-Regular',
      },
      redeemlineView:{
        width:"98%",
        borderWidth:0.5,
        borderColor:"#CBD5E1",
        marginTop:windowWidth*4/100,
      },
      rendermaincontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:windowWidth*6/100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor:"white",
        elevation: 5,
        padding:10,
        borderRadius:5,
      },
      renderpointview:{
        flexDirection:"row",
        // justifyContent:'space-evenly',
        alignItems:"center"
        
      },
      redeemboxview:{
        height:40,
        width:"25%",
        backgroundColor:"#CBD5E1", //light brown color: #CCBEB1
        borderRadius:3,
        marginTop:10,
        marginRight:5
      },
      reedemtext:{
        color:"white",
        textAlign:"center",
        marginTop:windowWidth*3/100,
        fontFamily:"Lato-Regular",
        fontSize:16
      },
      titletext:{
        color:"#375280",
        fontFamily:"Lato-Regular",
        fontSize:16.5
      },
      claimtext:{
        fontFamily:"Lato-Regular",
        color:"#94A3B8",
        fontSize:14.5
      },
      rendertextstyle:{
        height:55,
        flexDirection:'column',
        justifyContent:'space-around'
      },
      modalview:{
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      insidemodalview:{
        backgroundColor: "white",
        justifyContent: "space-between",
      },
      buttonstyle:{
        flexDirection:"row",
        marginTop:windowWidth*10/100,
        justifyContent:'space-evenly'
      },
      redeempointtext:{
        fontFamily:"Lato-Bold",
        color:'#375280',
        textAlign:"center",
        marginTop:20,
        fontSize:20,
      },
      taptext:{
        textAlign:"center",
        fontFamily:"Lato-Regular",
        color:'#375280',
        marginTop: windowWidth*5/100,
        fontSize:17
      },
      lineview:{
        width:"100%",
        borderWidth:1.3,
        borderColor:"#E3E4E5",
        marginTop: windowWidth*8/100
      },
      cancelview:{
        width:'40%',
        height:55,
        borderWidth:1,
        borderColor:"#CCBEB1",
        marginBottom:20,
        padding:6
      },
      redeemview:{
        width:'40%',
        height:55,
        backgroundColor:"#CCBEB1",
        marginBottom:20,
        padding:6
      },
      redeemtext:{
        textAlign:"center",
        fontFamily:"Lato-Bold",
        color:'white',
        fontSize:18,
        marginTop:10
      },
      canceltext:{
        textAlign:"center",
        fontFamily:"Lato-Regular",
        color:'#375280',
        fontSize:18,
        marginTop:10
      },
      smalllineview:{
        width:'15%',
        borderWidth:3,
        borderColor:"#F2F3F5",
        alignSelf:"center",
        marginTop:windowWidth*3/100
      } 
})    
// Customizable Area End
