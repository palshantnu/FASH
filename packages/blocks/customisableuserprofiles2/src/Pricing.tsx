import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  FlatList,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import PricingController, {
  Props,
  Service,
  ServiceAttributes,
} from "./PricingController";

export default class Pricing extends PricingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.header, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouch}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backIcon, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>
          {i18n.t("pricing")}
        </Text>
      </View>
      <View style={styles.extraView} />
    </View>

  );

  renderPlanDetails = (attributes: ServiceAttributes) => {
    const details = [];

    if (attributes.styling_per_week > 0) {
      details.push(`${attributes.styling_per_week} ${i18n.t("stylingsPerWeek")}`);
    }

    if (parseInt(attributes.discussion_time) > 0) {
      details.push(`${attributes.discussion_time} ${i18n.t("hoursOfDiscussionTime")}`);
    }

    if (attributes.voice_call_facility && attributes.video_call_facility) {
      details.push(i18n.t("voiceAndVideoCallFacility"));
    }

    else if (attributes.voice_call_facility) {
      details.push(i18n.t("voiceCallFacility"));
    }

    else if (attributes.video_call_facility) {
      details.push(i18n.t("videoCallFacility"));
    }

    return details.map((detail, index) => (
      <Text key={index} style={[styles.detailText, { textAlign : TextAlignManage(i18n.language) }]}>{`\u2022 ${detail}`}</Text>
    ));
  };

  renderServiceItem = ({ item }: { item: Service }) => {
    const { name, service_charges } = item.attributes;
    const { selectedService } = this.state;
    const planTitles: { [key: string]: string } = {
      weekly_plan: i18n.t("weeklyPlan"),
      quarterly_plan: i18n.t("quarterlyPlan"),
      monthly_plan: i18n.t("monthlyPlan"),
    };
    const isSelected = selectedService === item;
    const getFontFamily = isSelected ? 'Lato-Bold' : 'Lato-Regular';
    const getFontSize = isSelected ? 20 : 18;
    return (
      <TouchableOpacity testID={name} activeOpacity={1} onPress={() => this.toggleSelectedService(item)}>
        <View style={[selectedService == item ? styles.card : styles.shadowBox]}>
          <View style={[styles.cardHeader, selectedService == item ? null : {marginBottom: 0}, { flexDirection : FlexConditionManage(i18n.language) }]}>
          {name in planTitles && (
            <Text
              style={[
                styles.title,
                { fontFamily: getFontFamily, fontSize: getFontSize }
              ]}
            >
              {planTitles[name]}
            </Text>
          )}
            <Text style={[styles.price, {
              fontFamily: selectedService == item ? 'Lato-Bold' : 'Lato-Regular'
            }]}>{PriceConvertValue(service_charges?.toString(),this.state.localCurrency)}/-</Text>
          </View>
          {selectedService == item && (
            <View style={styles.details}>
              {this.renderPlanDetails(item.attributes)}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  Footer = () => (
    <View style={styles.footer}>
      <View style={[styles.radio, {flexDirection : FlexConditionManage(i18n.language)}]}>
        <CheckBox
          testID={`store-button`}
          value={this.state.tAndC}
          onValueChange={() => this.toggleTAndC()}
          boxType="square"
          tintColor="#FFFFFF"
          onCheckColor="#FFFFFF"
          onFillColor="#CCBEB1"
          onTintColor="#FFFFFF"
          animationDuration={0}
          tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
          style={styles.checkBox}
        />
        <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: 'center', flexWrap: 'wrap', width: (windowWidth * 80) / 100, alignSelf: 'center', marginHorizontal : 4 }}>
          <Text style={[styles.tAndC , { textAlign : TextAlignManage(i18n.language)}]}>{i18n.t("iAgreeToTheStylistS")} {" "}</Text>
          <TouchableOpacity onPress={this.OpenTAndC} testID="tAndC">
            <Text style={[styles.tAndC, {
              color: '#375280',
              textDecorationLine: 'underline',
              textAlign : TextAlignManage(i18n.language)
            }]}>{i18n.t("termsAndConditions")} {" "}</Text>
          </TouchableOpacity>
          <Text style={[styles.tAndC, {textAlign : TextAlignManage(i18n.language)}]}>{i18n.t("ofServices")}.</Text>
        </View>
      </View>
      {
        this.state.isvalidCheck &&
        <Text style={[styles.errorName, {textAlign : TextAlignManage(i18n.language)}]}>{this.state.errorMessage}</Text>
      }
      <TouchableOpacity
        testID="nextButton"
        style={styles.addButton}
        onPress={this.navigateToYetToDevelop}
      >
        <Text style={styles.addText}>{i18n.t("continueToPay")}</Text>
      </TouchableOpacity>
    </View>
  )
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="Pricing">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={{ alignSelf: "center" }}
        >
          <this.Header />
          <View style={styles.subCateListMainView}>
            <FlatList
              style={{ paddingTop: 5 }}
              data={this.state.apiData.data}
              renderItem={this.renderServiceItem}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              keyExtractor={(item) => item.id}
              bounces={false}
              testID={"flatlist_list"}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              ListFooterComponent={
                this.state.apiData.data && this.state.apiData.data.length > 0 ?
                  <Text style={[styles.tAndC, {
                    marginTop: verticalScale(20),
                    width: (windowWidth * 90) / 100,
                    alignSelf: 'center',
                    textAlign : TextAlignManage(i18n.language)
                  }]}>
                    {i18n.t("oneTimePaymentOptions")}
                  </Text> : null
              }
              ListEmptyComponent={() =>
                !this.state.loading ? (
                  <View style={styles.listEmptymainView} testID="emptyComp">
                    <Text style={styles.listEmptyTitleText}>
                      {i18n.t("noPlanFound")}
                    </Text>
                  </View>
                ) : null
              }
            />
            {!this.state.isViewOnly && this.state.apiData.data && this.state.apiData.data.length > 0 && <this.Footer />}
          </View>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignSelf: 'center',
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
    width: (windowWidth * 90) / 100,
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  backIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  bottomView: {
    justifyContent: 'flex-end',
    backgroundColor: '#CCBEB1',
    borderRadius: 2,
    paddingVertical: verticalScale(15),
    paddingHorizontal: Scale(16),
    marginHorizontal: Scale(24),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  subCateListMainView: {
    flex: 2,
    marginTop: (windowWidth * 2) / 100,
    width: (windowWidth),
    alignSelf: 'center',
  },
  bodyView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 90) / 100,
    alignSelf: "center",
  },
  errorName: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: Scale(24),
    color: "#F87171",
    marginBottom: 2,
  },
  bottomTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: "#CCBEB1",
    width: (windowWidth * 90) / 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 16,
  },
  addText: {
    color: "#ffffff",
    fontFamily: "Lato-Bold",
    fontSize: 20,
    lineHeight: 26,
  },
  footer: {
    width: windowWidth * 0.9,
    alignSelf: "center",
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: (windowWidth * 90) / 100,
    padding: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#375280',
    alignSelf: 'center',
  },
  shadowBox: {
    width: (windowWidth * 90) / 100,
    padding: Scale(16),
    alignSelf: 'center',
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: Scale(2),
  },
  checkBox: {
    borderWidth: 2,
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    ...Platform.select({
      ios: {
        height: 15,
        width: 15,
      },
    }),
  },
  radio: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: 'center',
    marginBottom: 10,
    width: (windowWidth * 90) / 100,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    color: '#375280',
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    color: '#375280',
    lineHeight: 24,
  },
  tAndC: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "#94A3B8",
  },
  details: {
    paddingTop: 6,
    borderColor: '#CBD5E1',
    borderTopWidth: 1,
  },
  detailText: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Lato-Regular',
    lineHeight: 24,
    color: '#375280'
  },
  listEmptymainView: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: (windowWidth * 50) / 100,
  },

  listEmptyTitleText: {
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Avenir-Heavy",
    color: "#375280",
  },
});
// Customizable Area End