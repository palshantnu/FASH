import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import OrderManagementBuyerConfirmationController, { Props } from "./OrderManagementBuyerConfirmationController";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { backIcon, endIcon, message, startIcon } from "./assets";
import { phone } from "../../landingpage/src/assets";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

export default class OrderManagementBuyerConfirmation extends OrderManagementBuyerConfirmationController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  GOOGLE_MAPS_APIKEY = "AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw";

  // Customizable Area End

  render() {
    // Customizable Area Start
    const {
      matchedOrderItem,
      orderStatusList
    } = this.state;
    const driverLatitude = matchedOrderItem?.attributes?.driver_latitude;
    const driverLongitude = matchedOrderItem?.attributes?.driver_longitude;
    const buyerLatitude = orderStatusList?.attributes?.buyer_latitude;
    const buyerLongitude = orderStatusList?.attributes?.buyer_longitude;

    const isDriverLocationAvailable = driverLatitude!=null && driverLongitude!=null;
    const isBuyerLocationAvailable = buyerLatitude && buyerLongitude;
    const orderExpectedTime = orderStatusList?.attributes?.expected_time;

    const haversineDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number => {
      const toRad = (degrees: number) => (degrees * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
    
    const estimateTravelTime = (distance: number, speed = 50): number =>
      (distance / speed) * 3600;
    
    
    const distance = haversineDistance(driverLatitude, driverLongitude, buyerLatitude, buyerLongitude);
    const travelTime = estimateTravelTime(distance);
    const formattedTravelTime = this.formatTravelTime(travelTime);

    return (
      <View style={styles.mainContainerStore}>
        <SafeAreaView style={styles.safeContainerViewStore}/>
        <TouchableOpacity style={[i18n.language==="ar"?styles.roundRight:styles.round]} activeOpacity={0.7}>

          <TouchableOpacity testID="btnBackOrderStatus" style={styles.backTouchOrderStatus} onPress={()=>{this.props.navigation.goBack()}}>
            <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrderStatus,{transform:[{ scaleX: ImageReverseManage(i18n.language) }]}]}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.mapFlex}>
          <MapView
            followsUserLocation={true}
            testID="mapViewShowForm"
            ref={this.mapRef}
            style={{ flex: 1, ...StyleSheet.absoluteFillObject, bottom: 1 }}
            region={this.state.region}
            onLayout={() => this.fitElements()}
            provider={PROVIDER_GOOGLE}
            minZoomLevel={2}
            maxZoomLevel={20}
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
            {isDriverLocationAvailable && driverLatitude !== null && driverLongitude !== null && (
              <Marker
                testID="googleMapMarker"
                coordinate={{
                  latitude: driverLatitude,
                  longitude: driverLongitude,
                }}
                icon={startIcon}
                identifier="start"
              />
            )}
            {isBuyerLocationAvailable && buyerLatitude !== undefined && buyerLongitude !== undefined && (
              <Marker
                coordinate={{
                  latitude: buyerLatitude,
                  longitude: buyerLongitude,
                }}
                title="Seller Location"
                icon={endIcon}
                identifier="end"
              />
            )}
            {((isDriverLocationAvailable || isBuyerLocationAvailable) &&
                <MapViewDirections
                  origin={{
                    latitude: driverLatitude,
                    longitude: driverLongitude,
                  }}
                  destination={{
                    latitude: buyerLatitude,
                    longitude: buyerLongitude,
                  }}
                  apikey={this.GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor="#375280"
                />
              )}
            </MapView>
          </View>
          <View style={{ margin: 10, height: Scale(290) }}>
          {this.state.matchedOrderItem && (
            <>
              <Text style={styles.partner}>
                {this.state.matchedOrderItem?.attributes?.driver_name} {i18n.t('deliveryPartener')}
              </Text>
              <View style={[styles.box,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <View style={styles.otpBox}>
                  <Text style={styles.otpText}>
                   {i18n.t('OTP')}- {this.state.matchedOrderItem?.attributes?.otp}
                  </Text>
                </View>
                <View style={[styles.imgBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <TouchableOpacity onPress={() => {this.chatNavigation(this.state.matchedOrderItem.attributes.driver_id)}} testID="ChatNavigation">
                    <Image source={message} style={styles.img} />
                  </TouchableOpacity>
                  <Image source={phone} style={styles.img} />
                </View>
              </View>
              <View style={[styles.box2,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <View>
                <Text style={styles.contacts}>{i18n.t('Arrivingin')} {formattedTravelTime}</Text>
                </View>
                <View style={[styles.imgBox,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Text style={styles.contact} numberOfLines={1} 
                  ellipsizeMode="tail">
                    {i18n.t('contactText')} {this.state.matchedOrderItem?.attributes?.driver_name}
                  </Text>
                </View>
              </View>
              <View style={styles.line} />
              <View>
                <Text style={styles.delivery}>{i18n.t('Outfordelivery')}</Text>
                <Text style={styles.info} numberOfLines={2}>
                  {i18n.t('arrivedAt')} {orderExpectedTime}
                </Text>
              </View>
            </>
          )}
        </View>

      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainerViewStore:{
    flex:0,
    backgroundColor:'#ffffff'
  },
  mainContainerStore: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerViewStore:{
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  roundRight:{
    position: 'absolute',
    top: Scale(50),
    right: Scale(24),
    borderRadius: 100,
    padding: 8,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    height: Scale(38),
    width: Scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  round: {
    position: 'absolute',
    top: Scale(50),
    left: Scale(24),
    borderRadius: 100,
    padding: 8,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    height: Scale(38),
    width: Scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  backTouchOrderStatus:{
    width:windowWidth*6/100,
    height:windowWidth*6/100,
    marginTop:windowWidth*1/100
  },
  backIconOrderStatus: {
    width: Scale(8.59),
    height: Scale(17.34),
    alignSelf: 'center',
    right: Scale(2),
    top: 1
  },
  filterTouchStore:{
    width:windowWidth*6/100,
    height:windowWidth*6/100
  },
  marginCategoryManage:{
    justifyContent:'center',
    alignItems:'center',
    height:windowHeight*80/100
  },
  mapFlex: {
    flex: 1,
  },
  btnNextMargin:{
    bottom:windowWidth*8/100,
    position:'absolute',
    width:windowWidth*90/100,
    alignSelf:'center'
  },
  btnCreateStoreButtonAdd:{
      backgroundColor:'#CCBEB1',
      width:windowWidth*90/100,
      height:windowHeight*6/100,
      borderRadius:2,
      justifyContent:'center'
  },
  createStoreButtonText:{
      color:'#fff',
      textAlign:'center',
      fontFamily:'Lato-Black',
      fontSize:windowWidth*4.5/100
  },
  greatText:{
    fontFamily:'Avenir-Heavy',
    color:'#375280',
    fontSize:windowWidth*5/100,
    textAlign:'center'
  },
  partner: {
    color: "#375280",
    fontSize: 18,
    textAlign: 'center',
    marginTop: Scale(30),
    fontFamily: 'Lato-Regular',
    padding: 3
  },
  box: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between'
  },
  info: {
    color: '#94A3B8',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  line: {
    borderWidth: 0.8,
    marginVertical: 15,
    marginBottom: 18,
    borderColor: "#D5D5D5",
  },
  delivery: {
    color: '#375280',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    paddingBottom: 5
  },
  box2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgBox: {
    flexDirection: 'row',
  },
  img: {
    width: 48,
    height: 48,
    marginHorizontal: 5,
  },
  contact: {
    color: "#375280",
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    width: Scale(110)
  },
  contacts: {
    color: "#375280",
    fontSize: 14,
    fontFamily:'Lato-Regular',
    height: Scale(19),
  },
  otpBox: {
    borderColor: '#CCBEB1',
    height: 48,
    width: 119,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otpText: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  confirmationText:{
    alignSelf:'center',
    width:windowWidth*90/100
  },
  headerViewOrder:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center'
  },
  backTouchOrder:{
      width:windowWidth*6/100,
      height:windowWidth*6/100,
      marginTop:windowWidth*1/100
  },
  backIconOrder:{
      width:windowWidth*5/100,
      height:windowWidth*5/100
  },
  headerTitleAllOrder:{
      color:'#375280',
      fontSize:windowWidth*5/100,
      textAlign:'center',
      fontFamily:'Avenir-Heavy'
  },
  extraViewOrder:{
      width:windowWidth*6/100,
      height:windowWidth*6/100
  },
});
