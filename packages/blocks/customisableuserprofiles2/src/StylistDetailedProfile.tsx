import React from "react";

import {
  // Customizable Area Start
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  // Customizable Area End
} from "react-native";
// Customizable Area Start
import StylistDetailedProfileController, { Props } from "./StylistDetailedProfileController";
import { backIcon, heart, call, chat, arrowRight, heartActive, leftArrow } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
const windowWidth = Dimensions.get('window').width;
import CustomLoader from "../../../components/src/CustomLoader";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import HeaderIconRight from "../../../components/src/HeaderIconRight";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
// Customizable Area End

export default class StylistDetailedProfile extends StylistDetailedProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerContainerProfile, { flexDirection : FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backBtn, 
            {
              transform: [{ scaleY: ImageReverseManage(i18n.language) }, { scaleX: ImageReverseManage(i18n.language) } ]
            }
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{i18n.t("stylist")}</Text>
      <View />
    </View>
  );

  Body = () => (
    <View style={styles.mainView}>
      <View style={[styles.stylistView, {flexDirection: FlexConditionManage(i18n.language)}]}>
        <View style={[styles.row, {flexDirection: FlexConditionManage(i18n.language)}]}>
          <Image source={
            {
              uri:
                this.state.apiData.data.profile_picture||
                "https://i.ibb.co/8Nb9QHL/image.png",
            }} style={styles.imageView} />
          <View style={styles.detailsView}>
            <Text style={styles.nameTxt}>{this.state.apiData.data.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.handleFav()} testID="btnFav">
        {
          this.state.apiData.meta.is_fav ?
          <Image source={heartActive} style={styles.heart} /> : 
          <Image source={heart} style={styles.heart} /> 
        }
        </TouchableOpacity>
      </View>
      <Text style={[styles.descTxt , { textAlign : TextAlignManage(i18n.language) }]}>
        {this.state.apiData.data.bio}
      </Text>
      <View style={[styles.cardView, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <TouchableOpacity
          onPress={() => this.navigateToRequestCall()}
          testID="btnRequestCallback"
          style={{ borderRightColor: '#E2E8F0', borderRightWidth: 1, width: windowWidth * .45 }}>
          <Image
            resizeMode="contain"
            source={call}
            style={styles.callBtn}
          />
          <Text style={styles.cardText}>{i18n.t("requestCallback")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.navigateToChat(this.state.stylist_id)}}
          testID="btnChat"
          style={{ width: windowWidth * .45 }}>
          <Image
            resizeMode="contain"
            source={chat}
            style={styles.callBtn}
          />
          <Text style={[styles.cardText]}>{i18n.t("chatWith")} {this.state.apiData.data.name}</Text> 
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => this.goToProductByStylist()} testID="btnProducts"
        style={[styles.row, { justifyContent: 'space-between', paddingVertical: 12, marginTop: 10 },{flexDirection: FlexConditionManage(i18n.language)}]}>
        <View
          style={{}}>
          <Text style={[styles.nextText,  { textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("productsBy")} {this.state.apiData.data.name}</Text>
        </View>
        <View>
          <Image source={HeaderIconRight(i18n.language) ? arrowRight : leftArrow}  style={styles.rightIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => { this.NavigateToPricing("price") }} testID="btnPricing"
        style={[{ flexDirection: FlexConditionManage(i18n.language)}, { justifyContent: 'space-between', paddingVertical: 12 }]}>
        <View
          style={{}}>
          <Text style={styles.nextText}>{i18n.t("pricing")}</Text>
        </View>
        <View>
          <Image source={arrowRight} style={[styles.rightIcon, 
            {
              transform: [{ scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) } ]
            }
          ]} />
        </View>
      </TouchableOpacity>
      <View
        style={[styles.row, {flexDirection : FlexConditionManage(i18n.language), justifyContent: 'space-between', paddingVertical: 12, alignItems: 'center' }]}>
        <View
          style={{}}>
          <Text style={styles.exportText}>{i18n.t("explorePortfolio")}</Text>
        </View>
        {
          this.state.chunkedArray && this.state.chunkedArray.length > 0 &&
        <TouchableOpacity
          onPress={() => this.navigateToSeeAll()} testID="btnExplore">
          <Text style={styles.seeAllText}>
            {i18n.t("See all")}
          </Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  )

  Footer = () => (
    <TouchableOpacity testID="btnHireStylist" style={styles.bottomView} onPress={() => { this.navigateToHireStylistForm() }}>
      <Text style={styles.bottomTxt}>{i18n.t("hireStylist")}</Text>
    </TouchableOpacity>
  )

  renderImages = (item: any, index: number) => {
    if (index % 3 === 0) {
      return this.view1(item, index);
    } else if (index % 3 === 1) {
      return this.view2(item, index);
    } else {
      return this.view3(item, index);
    }
  };

  renderImageItem = (item: any, index: number) => (
    <View
      key={index}
      testID={`image${index}`}
    >
      <Image source={{ uri: item.url }} style={{ width: 141, height: 141 }} />
    </View>
  );

  view2 = (items: any, index: number) => (
    <View style={{ flexDirection: FlexConditionManage(i18n.language) }} key={index}>
      {items.map((item: any, ind: number) => this.renderImageItem(item, ind))}
    </View>
  );

  view1 = (items: any, index: number) => (
    <View style={{ flexDirection: FlexConditionManage(i18n.language), width: '50%' }} key={index}>
      <View
        testID="image01"
      >
        <Image source={{ uri: items[0]?.url }} style={{ width: responsiveWidth(50), height: responsiveHeight(30.1)}} />
      </View>
      <View style={{ width: '100%' }}>
        {items.slice(1, 3).map((item: any, ind: number) => (
          <View
            key={ind}
            testID={`image0${ind + 1}`}
          >
            <Image source={{ uri: item.url }} style={{ width: responsiveWidth(50), height: responsiveHeight(15.05)}} />
          </View>
        ))}
      </View>
    </View>
  );

  view3 = (items: any, index: number) => (
    <View style={{ flexDirection: FlexConditionManage(i18n.language), width: '50%' }} key={index}>
      <View style={{ width: '100%' }}>
        {items.slice(0, 2).map((item: any, ind: number) => (
          <View
            key={ind}
            testID={`image3${ind}`}
          >
            <Image source={{ uri: item.url }} style={{ width: 177, height: 134 }} />
          </View>
        ))}
      </View>
      <View
        testID="image32"
      >
        <Image source={{ uri: items[2]?.url }} style={{ width: 250, height: 269 }} />
      </View>
    </View>
  );

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.mainContainer} testID="StylistProfile">
        <this.Header />
        {this.state.loading && <CustomLoader />}
        {
          (this.state.apiData.data && this.state.apiData.meta) &&
          <ScrollView style={styles.bodyView} bounces={false} showsVerticalScrollIndicator={false}>
            <this.Body />
            <View>
              <FlatList
                testID="imageList"
                data={this.state.chunkedArray}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  () => {
                    return (
                      <View style={styles.listEmptyContainer}>
                        <Text style={styles.listEmptyTitleText}>
                          {i18n.t("noPortfolioImages")}
                        </Text>
                      </View>
                    )
                  }
                }
                renderItem={({ item, index }) => this.renderImages(item, index)}
              />
            </View>
            {this.state.apiData.meta.request_status != 'pending' &&  this.state.apiData.meta.request_status != 'accepted' && !this.state.isHired &&
            <this.Footer />
            }
          </ScrollView>
        }

      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  nextIcon: {
    padding: 10,
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  rightIcon: {
    padding: 10,
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerContainerProfile: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginVertical: verticalScale(25),
    marginHorizontal: Scale(24),
    justifyContent: 'space-between'
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height : 200,
  },
  listEmptyTitleText: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Lato-Regular",
    color: "#375280",
    margin: Scale(20),
  },
  backBtn: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  callBtn: {
    alignSelf: 'center',
    width: (windowWidth * 10) / 100,
    height: (windowWidth * 10) / 100,
    marginTop: (windowWidth * 2) / 100,
  },
  headerTxt: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    color: "#375280",
    lineHeight: 26,
    fontWeight: '800'
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
    marginTop: verticalScale(20),
  },
  bodyView: {
    flex: 1,
  },
  nextText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    lineHeight: 28,
    color: '#375280',
  },
  bottomTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#375280'
  },
  mainView: {
    marginHorizontal: Scale(24),
  },
  descTxt: {
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 20,
    marginTop: verticalScale(10),
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  stylistView: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  nameTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#375280',
  },
  detailsView: {
    marginHorizontal: Scale(20),
    marginTop: verticalScale(10),
  },
  availableTxt: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.2,
    color: '#059669',
    marginTop: verticalScale(4),
  },
  heart: {
    marginTop: verticalScale(10),
    height: 30,
    width: 30
  },
  cardView: {
    flexDirection: 'row',
    width: windowWidth * .9,
    justifyContent: 'space-between',
    alignContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  cardText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#375280',
    lineHeight: 24,
    textAlign: 'center',
    padding: 10,
  },
  exportText: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    color: '#375280',
  },
});
// Customizable Area End
