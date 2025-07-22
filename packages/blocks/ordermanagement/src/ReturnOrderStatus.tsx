import React from "react";

// Customizable Area Start
import { StyleSheet, SafeAreaView, View, Text,Dimensions,TouchableOpacity,Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";

import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";
import {backIcon} from './assets'
const windowWidth = Dimensions.get("window").width;
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from '../../../components/src/TextAlignManage'
import { deviceWidth } from "framework/src/Utilities";
// Customizable Area End

import RejectOrderStatusController, {
  Props,
  configJSON,
} from "./ReturnOrderStatusController";

export default class RejectOrderStatus extends RejectOrderStatusController {
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
        
        <View style={[styles.headerViewMainOrderStatus,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchOrderStatus}
                    onPress={() => { this.props.navigation.goBack() }}
                >
                  <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrderStatus,{marginLeft:10,transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                </TouchableOpacity>
                <View>
                  <Text style={styles.headerTitleOrderStatus}>{i18n.t('order_status')}</Text>
                </View>
                <TouchableOpacity></TouchableOpacity>
          </View>
        <Timeline
          data={this.state.timeline}
          circleSize={15}
          circleColor="rgba(204, 190, 177, 1)"
          lineColor="rgba(204, 190, 177, 1)"
          descriptionStyle={[styles.descStyle,{textAlign:TextAlignManage(i18n.language)}]}
          titleStyle={[styles.textStyleText,{textAlign:TextAlignManage(i18n.language)}]}
          timeStyle={styles.timeStyle}
          showTime={true}
          innerCircle={"icon"}
          columnFormat={i18n.language === 'ar'?'single-column-right':'single-column-left'}
          options={{
            bounces: false,
            style: styles.fl,
          }}
          // @ts-expect-error in tests, component is mocked
          testID={"timeline"}
        />
        <View style={styles.ftContainer}>
          <View style={styles.footer}>
            <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <Text style={styles.footerTextMain}>{i18n.t('orderID')}:</Text>
              <Text style={styles.footerTextContent}>
                {"#" + this.state.orderNumber}
              </Text>
            </View>
            <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <Text style={styles.footerTextMain}>{i18n.t('PurchaseDate')}:</Text>
              <Text style={styles.footerTextContent}>
                {this.state.placetAt}
              </Text>
            </View>
          </View>
          <CustomButton
            testID="trackDriver"
            title={i18n.t('trackText')}
            onPress={this.goToTrackOrder}
            disabled={!this.state.showFooter}
          />
        </View>
        {this.state.loading && <CustomLoader />}
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
    color: "#94A3B8",
    fontSize: (deviceWidth * 3.8) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    marginTop: (deviceWidth * 1) / 100,
    paddingBottom: (deviceWidth * 10) / 100,
  },
  textStyleText: {
    color: "#375280",
    fontSize: (deviceWidth * 4.5) / 100,
    fontFamily: "Lato-Bold",
    marginTop: (-deviceWidth * 4) / 100,
  },
  timeStyle: {
    color: "#979797",
    fontSize: (deviceWidth * 3.2) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
    marginTop: (deviceWidth * 1) / 100,
    paddingBottom: (deviceWidth * 10) / 100,
  },
  fl: {
    flex: 1,
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
  },
  ftContainer: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
  },
  footer: {
    marginBottom: Scale(20),
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Scale(10),
  },
  footerTextMain: {
    color: "#375280",
    fontFamily: "Lato-Bold",
    fontSize: Scale(15),
  },
  footerTextContent: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: Scale(15),
  },
  headerViewMainOrderStatus: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center'
},
viewContainerAssignStoreInAssign: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchOrderStatus: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100,
    marginRight:windowWidth*4/100
},
filterIconTouchInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconOrderStatus: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleOrderStatus: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
},

});
// Customizable Area End
