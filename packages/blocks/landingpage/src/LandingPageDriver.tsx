import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  Platform,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Logo, notification, upArrow,navigation } from "./assets";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import LandingPageDriverController, {
  Props,
} from "./LandingPageDriverController";
import CustomSwitch from "../../../components/src/CustomSwitch";
import MapViewDirections from "react-native-maps-directions";
import { NewOrder } from "./responses";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
// Customizable Area End

export default class LandingPageDriver extends LandingPageDriverController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  showDirection(){
    return(
    <MapViewDirections
    origin={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    }}
    destination={{
      latitude:
      this.state.newOrderList.attributes.status==="processed"? this.state.newOrderList?.attributes
          ?.business_information?.latitude:this.state.newOrderList?.attributes
          ?.delivery_address?.latitude,
      longitude:
      this.state.newOrderList.attributes.status==="processed"? this.state.newOrderList?.attributes
      ?.business_information?.longitude:this.state.newOrderList?.attributes
      ?.delivery_address?.longitude,
    }}
    apikey={this.GOOGLE_MAPS_APIKEY}
    strokeWidth={1}
    strokeColor="black"
  />
    )
  }


  GOOGLE_MAPS_APIKEY = "AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw";
  // Customizable Area End

  render() {
    // Customizable Area Start
    const businessInfo = this.getBusinessInfo();
    let sellerMarker = null;
     if (businessInfo) {
      const sellerLongitude = Number( this.longitudeSet());
      const sellerLatitude = Number(this.latitudeSet());
      if (!isNaN(sellerLatitude) && !isNaN(sellerLongitude)) {
        sellerMarker = (
          <Marker
          title="Seller Location"
          description="This is where the seller is located"
            coordinate={{
              latitude: sellerLatitude,
              longitude: sellerLongitude,
            }}
           
          />
        );
      }
    }
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.mainSafeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <TouchableOpacity testID="redirectPage" onPress={this.handleOrder}></TouchableOpacity>
        <TouchableOpacity testID="redirectPage2" onPress={this.btnRedirectDriverOrder}></TouchableOpacity>
        <View style={styles.manageWidth}>
          <View style={styles.mainHeaderView}>
            <View>
              <Image
                resizeMode="contain"
                source={Logo}
                style={styles.mainLogo}
              />
            </View>
            <View style={styles.notificationMainView}>
              <Text style={styles.onlineOfflineCss}>
                {this.state.driverOnlineOffline ? "Online" : "Offline"}
              </Text>
              <CustomSwitch
                size={16}
                value={this.state.driverOnlineOffline}
                onValueChange={(value) => {
                  this.onlineOfflineStatusUpdate(value);
                }}
                testID="onlineOfflineStatusSwitch"
                activeBGColor="#059669"
              />
              <TouchableOpacity style={styles.notificationTouch} onPress={()=>this.btnNotificationRedirection()}>
                <Image
                  resizeMode="contain"
                  source={notification}
                  style={styles.notificationIcon}
                />
                 {this.state.hasNewNotification && <View style={styles.redDot} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.driverOnlineOffline && this.state.newOrderList?.id !="" && this.state.newOrderList.attributes.driver_id==null &&  ( 
            <TouchableOpacity style={[styles.newOrderView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={this.btnRedirectDriverOrder}>
              <View>
                <Text style={styles.newOrderText}>{i18n.t('new_order')}</Text>
                <Text style={styles.orderDetails}>
                  {i18n.t('tap_to_see_details_and_accept_order')} 
                </Text>
              </View>
              <TouchableOpacity
                testID="btnView"
                style={styles.viewBtnContainer}
                onPress={this.btnRedirectDriverOrder}
                activeOpacity={0.6}
              >
                <View style={styles.viewbtn}>
                  <Text style={styles.viewbtnText}>{i18n.t('View')}</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          )} 
        {this.state.newOrderList.attributes.driver_id==null ? (
          <View style={styles.mapFlexManage}>
            <MapView
              followsUserLocation={true}
              testID="mapViewShowForm"
              initialRegion={this.state.region}
              style={{ flex: 1, ...StyleSheet.absoluteFillObject, bottom: 1 }}
              region={this.state.region}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => this.onMapReady}
              minZoomLevel={2}
              maxZoomLevel={14}
              zoomEnabled={true}
              rotateEnabled={true}
              pitchEnabled={true}
              userLocationPriority="high"
              moveOnMarkerPress={true}
              showsScale={true} 
              showsCompass={true} 
              showsPointsOfInterest={true} 
              showsBuildings={true}
            >
              <Marker
                testID="googleMapMarker"
                coordinate={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }}
              />
              <Circle
                center={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }}
                radius={1500}
                fillColor="rgba(55, 82, 128, 0.24)"
                strokeColor="rgba(55, 82, 128, 0.24)"
                zIndex={2}
                strokeWidth={2}
              />
            </MapView>
          </View>
        ) : ( 
          <View style={styles.mapFlex}>
            <MapView
              testID="mapViewShowForm1"
              followsUserLocation={true}
              style={{ flex: 1, ...StyleSheet.absoluteFillObject, bottom: 1 }}
              initialRegion={this.state.region}
              region={this.state.region}
              onMapReady={() => this.onMapReady}
              provider={PROVIDER_GOOGLE}
              minZoomLevel={2}
              zoomEnabled={true}
              maxZoomLevel={20}
              rotateEnabled={true}
              userLocationPriority="high"
              pitchEnabled={true}
              moveOnMarkerPress={true}
            >
              <Marker
                testID="googleMapMarker"
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
              />
              {sellerMarker}
             {this.showDirection()}
            </MapView>
            {this.state.driverOnlineOffline && this.state.newOrderList?.id !=="" && this.state.newOrderList.attributes.driver_id!==null &&
            <>
    <View style={{flex:1,alignSelf:'flex-end',justifyContent:'flex-end',right:10,marginBottom:100}}>
 <TouchableOpacity
  style={{ 
  marginBottom:10,
  padding:2,
  backgroundColor: "#375280",
 alignItems:'center',
  flexDirection: "row",
  borderRadius: 2,}}
  activeOpacity={0.6}
  onPress={!this.state.customerSideDone?this.handleNavigation :this.handleCustNavigation}
  testID="navigationId2"
>
  <Image source={navigation} style={{marginLeft:3,width:18,height:18,tintColor:'#fff'}} />
  <Text style={{
    fontWeight: "800",
    color: "#FFFFFF",
    padding: 5,fontSize:12}}>{i18n.t('start_navigation')}</Text>
</TouchableOpacity>
</View>


            <TouchableOpacity style={[styles.newOrderView1,{flexDirection:FlexConditionManage(i18n.language)}]}   onPress={this.btnRedirectDriverOrder}>
              <View>
                <Text style={styles.newOrderText}>{i18n.t('order_ongoing')}</Text>
                <Text style={styles.orderDetails}>
                  {i18n.t('reach_store_tap_to_continue_with_order')}
                </Text>
              </View>
              <TouchableOpacity
                testID="btnView"
                style={styles.viewBtnContainer}
                onPress={this.btnRedirectDriverOrder}
                activeOpacity={0.6}
              >
                <TouchableOpacity
                  onPress={this.handleOrderInfo1}
                  testID="orderId3"
                >
                  <Image source={upArrow} style={{width:30,height:30}}/>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
            </>
  }
          </View>
        )}
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainSafeContainer: {
    backgroundColor: "#FFFFFF",
  },
  redDot: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 8,
    height: 8,
    borderRadius:4,
    backgroundColor: 'red',
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  newOrderView: {
    marginTop:Platform.OS=="ios"?50:10,
    position: "absolute",
    top:  60,
    right: 0,
    margin: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingRight: 10,
    zIndex: 1,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  newOrderView1: {
    position: "absolute",
    bottom:  30,
    right: 0,
    margin: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingRight: 10,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  OrderConatiner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingRight: 10,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  newOrderText: {
    color: "#375280",
    fontSize: 18,
    fontWeight: "700",
  },
  viewBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewbtn: {
    backgroundColor: "#CCBEB1",
    paddingVertical: 7,
    paddingHorizontal: 40,
    borderRadius: 2,
  },
  viewbtnText: {
    color: "#fff",
    fontSize: 16,
  },
  orderDetails: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "400",
  },
  mapFlex: {
    flex: 1,
  },
  notificationIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  mapMainViewContainer: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    marginTop: (windowWidth * 3) / 100,
  },
  fontSetup: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  manageWidth: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#34D39930",
  },
  mainHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainLogo: {
    width: (windowWidth * 18) / 100,
    height: (windowHeight * 5) / 100,
  },
  notificationMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: (windowWidth * 32) / 100,
    alignItems: "center",
  },
  notificationTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 5) / 100,
  },
  onlineOfflineTouch: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 5) / 100,
  },
  onlineOfflineIcon: {
    width: (windowWidth * 20) / 100,
    height: (windowWidth * 5) / 100,
  },
  container: {
    backgroundColor: "#FFFFFF",
  },
  login_btn_after: {
    backgroundColor: "#0061A7",
    padding: 13,
    borderRadius: 5,
    textAlign: "center",
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  login_btn_text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: (windowWidth * 3) / 100,
    height: (windowWidth * 3) / 100,
  },
  btnPhoneButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    bottom: (windowWidth * 11) / 100,
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
  },
  phoneButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100,
  },
  onlineOfflineCss: {
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.8) / 100,
    color: "#94A3B8",
    fontWeight: "600",
  },
  mapFlexManage: {
    flex: 1,
  },
});
// Customizable Area End
