import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Text
} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

import CustomformMapController, {
  Props
} from "./CustomformMapController";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End


export default class CustomformMap extends CustomformMapController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <View
        style={styles.container}
      >
        <SafeAreaView style={{flex:0}}/>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
          <View style={{flex:1}}>
            <MapView
                followsUserLocation={true}
                testID="mapViewShowForm"
                initialRegion={this.state.region}
                style={{flex:1,...StyleSheet.absoluteFillObject,bottom:1}}
                region={this.state.region}
                provider={PROVIDER_GOOGLE}
                onMapReady={() => this.onMapReady}
                minZoomLevel={2}
                maxZoomLevel={20}
                zoomEnabled={true}
                rotateEnabled={true}
                pitchEnabled={true}
                userLocationPriority='high'
                moveOnMarkerPress={true}
                showsScale={true} // also this is not working
                showsCompass={true} // and this is not working
                showsPointsOfInterest={true} // this is not working either
                showsBuildings={true} // and finally, this isn't working either
            >
                <Marker
                testID="googleMapMarker"
                ref={this.marker}
                coordinate={{ latitude: this.state.region?.latitude, longitude: this.state.region?.longitude }}
                title={"Your location"}
                draggable
                />
            </MapView>
            <View style={{position:'absolute',width:'100%',top:20}}>
                <View style={{flex:1,paddingHorizontal:20}}>
                    <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(_data, details) => {
                        this.selectAddress(details)
                    }}
                   //@ts-ignore
                    testID="google_places_autocomplete"
                    fetchDetails={true}
                    query={{
                        key: 'AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw',
                        language: 'en',
                    }}
                    listViewDisplayed='auto' 
                    suppressDefaultStyles={true}
                    textInputProps={{color:'#000000',placeholderTextColor:'#9A9A9A'}}
                    styles={{ 
                      container: {
                        flex: 1,
                      },
                      textInputContainer: {
                        flexDirection: 'row',
                      },
                      textInput: {
                        backgroundColor: '#FFFFFF',
                        height: 44,
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        fontSize: 15,
                        flex: 1,
                        color:'#000000'
                      },
                      poweredContainer: {
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderColor: '#c8c7cc',
                        borderTopWidth: 0.5,
                      },
                      powered: {},
                      listView: {
                        marginTop:windowWidth*3/100,
                        marginRight:windowWidth*1/100,
                        marginLeft:windowWidth*12/100
                      },
                      row: {
                        backgroundColor: '#FFFFFF',
                        padding: 13,
                        height: 44,
                        flexDirection: 'row',
                      },
                      separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc',
                      },
                      description: {
                        color:'#000000'
                      },
                      loader: {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        height: 20,
                      },
                    }}
                    renderLeftButton={() => {
                        return (
                        <View style={{ justifyContent: 'center',marginRight:windowWidth*5/100 }}>
                            <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                            }}
                            testID="btnBackIconManageMap"
                            >
                            <Icon name="arrowleft" type="antdesign" />
                            </TouchableOpacity>
                        </View>)
                    }}
                    />
                </View>
            </View>

            <TouchableOpacity testID="btnMobileLogIn"
              style={styles.btnPhoneButton}
              onPress={()=>{this.btnConfirmLocation()}}
              >
                <Text style={styles.phoneButtonText}>{i18n.t('chooseLocationText')}</Text>
            </TouchableOpacity>
          </View>
      </View>
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
  login_btn_after: {
    backgroundColor: '#0061A7',
    padding: 13,
    borderRadius: 5,
    textAlign: "center",
    width: windowWidth * 90 / 100,
    alignSelf: 'center',

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
    width: windowWidth * 3 / 100,
    height: windowWidth * 3 / 100,
  },
  btnPhoneButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    bottom: (windowWidth * 11) / 100,
    justifyContent: "center",
    position:'absolute',
    alignSelf:'center'
  },
  phoneButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Black",
    fontSize: (windowWidth * 5) / 100
  },
});
// Customizable Area End
