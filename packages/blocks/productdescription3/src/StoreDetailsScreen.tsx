import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import * as IMG_CONST from "./assets";
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import Productdescription3Controller from "./Productdescription3Controller";
import i18n from '../../../components/src/i18n/i18n.config'
import TextAlignManage from '../../../components/src/TextAlignManage'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End

import StoreProfileController, { Props } from "./StoreProfileController";

export default class StoreDetailsScreen extends StoreProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setState({
      storeData: this.props.navigation.state.params.storeData,
      detailAddress: this.props.navigation.state.params.address,
      imgState: this.props.navigation.state.params.imgState,
      storeOpratingData: this.props.navigation.state.params.storeOpratingData,
    });
  }

  renderTime = () => {
    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    return (
      <>
        {daysOfWeek.map(
          (day) =>
            this.state.storeOpratingData?.[day]?.is_open && (
              <Text
                key={day}
                style={[styles.storeDesStyle, { paddingBottom: 4,textAlign:TextAlignManage(i18n.language) }]}
              >
                {`${this.state.storeData.store_operating_hours[day].open}-${this.state.storeData.store_operating_hours[day].close} For ${this.capitalizeFirstLetter(day)}`}
              </Text>
            )
        )}
      </>
    );
  };
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.storecontainer}>
        {/* Customizable Area Start */}
        {this.state.isloading && <CustomLoader />}
        {/* Merge Engine UI Engine Code */}
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={styles.viewContainer}>
          <View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="backButtonID"
              onPress={() => this.props.navigation.goBack()}
            >
              <Image source={IMG_CONST.backIcon} style={[styles.backIconImg,{ transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]} />
            </TouchableOpacity>
            <Text style={styles.storeTextStyle}>{i18n.t('storeDetails')}</Text>
            <View />
          </View>
          <View style={styles.storeImgContainer}>
            <Image
              testID="bgImgID"
              source={
                this.state.imgState
                  ? { uri: this.state.imgState }
                  : IMG_CONST.bgImg
              }
              style={styles.storeImg}
            />
            <View style={styles.overlay}></View>
          </View>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.storedesContainer}>
              <Text style={[styles.textHeader,{textAlign:TextAlignManage(i18n.language)}]}>
                {this.state.storeData.store_name}
              </Text>
              <Text style={[styles.storeDesTextStyle,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('storeDescription')}</Text>
              <Text style={[styles.storeDesStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                {this.state.storeData.description}
              </Text>
              <Text style={[styles.storeDesTextStyle, { paddingBottom: 4 ,textAlign:TextAlignManage(i18n.language)}]}>
                {i18n.t('address')}
              </Text>
              <Text style={[styles.storeDesStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                {
                  this.state.detailAddress
                }
              </Text>
              <Text style={[styles.storeDesTextStyle, { paddingBottom: 4,textAlign:TextAlignManage(i18n.language) }]}>
                {i18n.t('contactNumber')}
              </Text>
              <Text style={[styles.storeDesStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                {this.state.storeData.contact_number.country_code+' '+this.state.storeData.contact_number.phone_number}
              </Text>
              <Text style={[styles.storeDesTextStyle, { paddingBottom: 4,textAlign:TextAlignManage(i18n.language) }]}>
                {i18n.t('emailText')}
              </Text>
              <Text style={[styles.storeDesStyle,{textAlign:TextAlignManage(i18n.language)}]}>
                {this.state.storeData?.email ?? "N/A"}
              </Text>

              <Text style={[styles.storeDesTextStyle, { paddingBottom: 4,textAlign:TextAlignManage(i18n.language) }]}>
                {i18n.t('storeHours')}
              </Text>

              {this.renderTime()}
            </View>
          </ScrollView>
        </View>
        {/* Merge Engine UI Engine Code */}
        {/* Customizable Area End */}
      </View>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  storecontainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  backIconImg: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  storeTextStyle: {
    fontFamily: "Avenir-Heavy",
    fontSize: Scale(20),
    color: "#375280",
    textAlign: "center",
  },
  storeImgContainer: {
    width: "100%",
    height: 200,
    marginTop: 20,
    position: "relative",
  },
  storeImg: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
  bannerTextStyle: {
    position: "absolute",
    top: "33%",
    left: "30%",
  },
  bannerTextIconStyle: {
    width: 142,
    height: 69,
  },
  overlay: {
    opacity: 0.4,
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 6,
  },
  storedesContainer: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 22,
    textTransform: "capitalize",
  },
  storeDesTextStyle: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    color: "#375280",
    paddingBottom: 12,
  },
  storeDesStyle: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    fontWeight: "normal",
    color: "#375280",
    lineHeight: 24,
    paddingBottom: 16,
  },
});
// Customizable Area End
