import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MyClientsController, {
  Props,
} from "./MyClientsController";
import { arrowRight, backIcon } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
const windowWidth = Dimensions.get("window").width;
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class MyClients extends MyClientsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
   renderMyClientListContainer = () =>{
    return(
        <FlatList
        testID="flatlistTestID"
        style={{
          marginBottom: verticalScale(40),
          marginTop:verticalScale(24)
        }}
        data={this.state.clientList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>this.createWishlist(item)} style={[styles.mainBox,{flexDirection:FlexConditionManage(i18n.language)}]}  testID="btnScreen">
            <View style={styles.item}>
                <Text style={styles.title}>{item?.attributes?.full_name}</Text>
                <View style={item?.attributes?.service_status === "current" ? styles.statusView:styles.statusComplView}>
                  <Text style={item?.attributes?.service_status === "current"? styles.statusCurrentTxt : styles.statusCompleteTxt}>
                     {item?.attributes?.service_status === "current" ? i18n.t('current') :  i18n.t('completed')}
                  </Text>
                </View>
            </View>
              <Image source={arrowRight} resizeMode="contain" style={[styles.imageStyle,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]} />
        </TouchableOpacity>
        )}
    />
    )
   }
   renderEmptyListContainer = () => {
    return(
     <View style={styles.emptyView} testID="emptyitem">
         <Text style={styles.emptyText}>{i18n.t('no_data_found')}</Text>
     </View>
    ) 
 }
 headerBackbtn = () =>{
  return (
    <TouchableOpacity
    testID="btnBackClientsAndchat"
    style={styles.backTouchCliAndChat}
    onPress={()=> this.props.navigation.goBack()}
  >
    <Image
      resizeMode="contain"
      source={backIcon}
      style={[styles.backIconCssN,{transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
    />
  </TouchableOpacity>
  )
 }
 headerView = () => {
  return(
    <View style={styles.container}>
          <View style={[styles.headerViewCli,{flexDirection:FlexConditionManage(i18n.language)}]}>
             {this.headerBackbtn()}
            <View>
              <Text style={styles.headerTitleCliAndChat}>{i18n.t('my_clients')}</Text>
            </View>
            <View style={styles.extraViewTouch} />
          </View>
        </View>
  )
 }
  // Customizable Area End

  render() {
     // Customizable Area Start
    return (
        <View style={styles.mainContainer}>
         <SafeAreaView style={styles.safeContainer} />  
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
          {this.headerView()}
          {this.state.isLoading && <CustomLoader/>}
          {this.renderMyClientListContainer()} 
          {this.state.clientList.length == 0 && !this.state.isLoading && this.renderEmptyListContainer()}  
        </View>
    );
    // Customizable Area End
}

}
 // Customizable Area Start
const styles = StyleSheet.create({
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  mainBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    paddingTop:verticalScale(16),
    paddingBottom:verticalScale(16),
    marginHorizontal:Scale(15),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight:'500',
    color:'#375280',
    lineHeight: 24,
    fontStyle: "normal",
    fontFamily:'Lato'
  },
  statusCurrentTxt: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: 'Lato',
    fontStyle: "normal",
    lineHeight:18,
    color:'#BE5B00',
    textAlign:'center',
  },
  statusView:{
    height:verticalScale(27),
    backgroundColor: "#FFE7D0",
    borderRadius: 5,
    marginLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:Scale(10),
    paddingRight:Scale(10),
  },
  statusComplView: {
    height:verticalScale(27),
    backgroundColor: "#D1FAE5",
    borderRadius: 5,
    marginLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:Scale(10),
    paddingRight:Scale(10),
  },
  statusCompleteTxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight:18,
    color:'#059669',
    textAlign:'center',
    fontFamily: 'Lato',
    fontStyle: "normal",
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 10,
  },
  headerViewCli: {
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchCliAndChat: {
    height: (windowWidth * 6) / 100,
    width: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssN: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCliAndChat: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },
  extraViewTouch: {
    height: (windowWidth * 6) / 100,
    width: (windowWidth * 6) / 100,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  }, 
 emptyText:{
    fontSize: 18,
    fontWeight: '600',
    color: '#375280',
    fontFamily:'Lato-regular',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 28,
 } 

})
 // Customizable Area End