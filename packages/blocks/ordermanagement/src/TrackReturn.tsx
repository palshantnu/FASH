import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";
import Timeline from "react-native-timeline-flatlist";

import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import { deviceWidth, deviceHeight } from "../../../framework/src/Utilities";

import { startIcon, endIcon, phone, message, backIcon } from "./assets";
import i18n from "../../../components/src/i18n/i18n.config";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
// Customizable Area End

import TrackReturnController, { Props } from "./TrackReturnController";

export default class TrackReturn extends TrackReturnController {
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
      <SafeAreaView style={styles.container}>
        {this.state.loading ? (
          <CustomLoader />
        ) : (
          <View style={{ flex: 1 }} testID="main">
            <MapView
              testID="mapView"
              provider={PROVIDER_GOOGLE}
              ref={this.mapRef}
              style={styles.map}
              region={{
                latitude: this.state.start.latitude,
                longitude: this.state.start.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              minZoomLevel={1}
              zoomEnabled={true}
              rotateEnabled={true}
              pitchEnabled={true}
              moveOnMarkerPress={true}
              showsScale={true}
              showsCompass={true}
              showsPointsOfInterest={true}
              showsBuildings={true}
              onLayout={() => this.fitElements()}
            >
              <Marker
                testID="markerStart"
                coordinate={this.state.start}
                icon={startIcon}
                identifier="start"
              />
              <Marker
                testID="markerEnd"
                coordinate={this.state.destination}
                icon={endIcon}
                identifier="end"
              />
              <MapViewDirections
                origin={this.state.start}
                destination={this.state.destination}
                apikey={this.GMAP_API_KEY}
                strokeWidth={3}
                strokeColor="#375280"
                geodesic={true}
              />
            </MapView>
            <Pressable
              testID="backBtn"
              onPress={this.goBack}
              style={[styles.backWrap, { right : i18n.language === "ar" ? Scale(20) : 0 }]}
            >
              <Image source={backIcon} style={styles.back} />
            </Pressable>
            <View>
              <View style={[styles.bar, {direction : FlatListRowManage(i18n.language)}]} />
              <View style={[styles.driverRow]}>
                <Text numberOfLines={1} style={styles.driverText}>
                  {this.state.driver}
                </Text>
                <Text numberOfLines={1} style={styles.driverText}>
                  {this.state.eta}
                </Text>
              </View>
              <View style={[styles.row, styles.borderBottom]}>
                <View style={styles.otpBox}>
                  <Text style={styles.otp}>{this.state.otp + " - OTP"}</Text>
                </View>
                <View style={styles.iconRow}>
                  <Pressable testID="chatButton">
                    <Image source={message} style={styles.icon} />
                  </Pressable>
                  <Pressable testID="phoneButton">
                    <Image source={phone} style={styles.icon} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Timeline
              data={this.state.timeline}
              circleSize={15}
              circleColor="rgba(204, 190, 177, 1)"
              lineColor="rgba(204, 190, 177, 1)"
              descriptionStyle={styles.descStyle}
              titleStyle={styles.textStyleText}
              timeStyle={styles.timeStyle}
              showTime={true}
              innerCircle={"icon"}
              rowContainerStyle={{ marginHorizontal: Scale(20) }}
              style={styles.fl}
              options={{
                bounces: false,
                scrollEnabled: false,
                contentContainerStyle: styles.flContainer,
              }}
            />
          </View>
        )}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  descStyle: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    color: "#94A3B8",
    fontSize: (deviceWidth * 3.8) / 100,
    paddingBottom: (deviceWidth * 10) / 100,
    marginTop: (deviceWidth * 1) / 100,
  },
  textStyleText: {
    fontFamily: "Lato-Bold",
    color: "#375280",
    fontSize: (deviceWidth * 4.5) / 100,
    marginTop: (-deviceWidth * 4) / 100,
  },
  timeStyle: {
    fontFamily: "Lato-Regular",
    color: "#979797",
    fontWeight: "500",
    fontSize: (deviceWidth * 3.2) / 100,
    marginTop: (deviceWidth * 1) / 100,
    paddingBottom: (deviceWidth * 10) / 100,
    minWidth: Scale(70),
  },
  fl: {
    flex: 1,
  },
  flContainer: {
    paddingTop: Scale(20),
  },
  map: {
    flex: 1,
    width: deviceWidth,
    minHeight: deviceHeight * 0.25,
  },
  bar: {
    alignSelf: "center",
    height: Scale(4),
    width: Scale(80),
    backgroundColor: "#F2F3F5",
    marginTop: Scale(8),
    marginBottom: Scale(16),
  },
  driverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Scale(8),
    backgroundColor: "#F4F4F4",
    color: "#375280",
    marginHorizontal: Scale(20),
    marginBottom: Scale(8),
  },
  driverText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    textAlign : "left",
    color: "#375280",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: Scale(20),
    marginTop: Scale(10),
  },
  back: {
    width: Scale(20),
    height: Scale(20),
    resizeMode: "contain",
  },
  backWrap: {
    position: "absolute",
    top: Scale(22),
    left: Scale(20),
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    backgroundColor: "#CCBEB1",
    paddingVertical: Scale(10),
    paddingHorizontal: Scale(16),
    height: Scale(48),
    justifyContent: "center",
    alignItems: "center",
  },
  otp: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(16),
    textAlign : "left",
    color: "#FFFFFF",
  },
  icon: {
    height: Scale(48),
    width: Scale(48),
    marginLeft: Scale(12),
  },
  borderBottom: {
    paddingBottom: Scale(20),
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: "#E3E4E5",
  },
});
// Customizable Area End
