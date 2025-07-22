import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
  FlatList,
  Modal,
  Platform,
  ListRenderItem
} from "react-native";
import { Address } from "../../addressmanagement/src/responses";
import CheckBox from "@react-native-community/checkbox";
import { backIcon,home,other } from "../../addressmanagement/src/assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { search, direct, emptyHeart, notification, shoppingCart, fillHeart,downArrow,gps } from "./assets";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Scale from "../../../components/src/Scale";
import { LandingPageContent, HomeCategory } from './LandingPageController';
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import FastImage from 'react-native-fast-image'
// Customizable Area End

import LandingPageController, {
  Props,
  configJSON
} from "./LandingPageController";
export default class LandingPage extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItemSlider = (item: any) => {    
    const { title, subtitle, description,app_image } = item.item.attributes
    return (
      <TouchableOpacity style={styles.sliderMainView} testID="slider-item" onPress={() => { this.handleSliderPress(item) }}>
        <View style={styles.imageContainer}>
          <Image source={ImageNotFound(app_image)} style={styles.sliderImage}></Image>
        </View>
        <View style={styles.sliderTilteMainView}>
          <Text style={styles.sliderTitleText}>{this.truncateDescription(title)}</Text>
          <Text style={styles.sliderSubTitleText}>{this.truncateDescription(subtitle)}</Text>
          <TouchableOpacity style={styles.sliderUrlTouch} disabled={true} >
            <Text style={styles.sliderUrlText}>{this.truncateDescription(description)}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  getCategoryList = (item: { item: HomeCategory }) => {
    let value = item.item;
      return (
        <TouchableOpacity testID="btn_selected_home_category" onPress={() => { this.selectStatus(value) }} style={[{ borderBottomWidth: this.state.categorySelectStatus.name == value.name ? 2 : 1, borderBottomColor: this.state.categorySelectStatus.name == value.name ? '#375280' : '#9A9A9A' },this.getCatagoryTabAccordingToLogin().length>2?{ paddingHorizontal:i18n.language == 'ar'? windowWidth * 9 / 100:windowWidth * 3 / 100,
          paddingBottom: windowWidth * 3 / 100,}: styles.categoryTouch]}>
          <Text style={[{ color: this.state.categorySelectStatus.name == value.name ? '#375280' : '#9A9A9A' }, styles.fontSetup,{textAlign:TextAlignManage(i18n.language)}]}>{value.name}</Text>
        </TouchableOpacity>
      );
  }

  renderHeader = () => (
    <>
      <View style={styles.homeTitleMainView}>
        <Text style={styles.homeTitleText}>{this.state.titleContent}</Text>
        <Text style={styles.homeSubTitleText}>{this.state.subTitleContent}</Text>
      </View>

      <View style={styles.manageWidth}>
        <Carousel
          testID="corouselHomeBannerImages"
          layout="stack"
          data={this.state.homeBannerArr}
          renderItem={this.renderItemSlider}
          sliderWidth={windowWidth * 80 / 100}
          itemWidth={(windowWidth * 50 / 100 + windowWidth * 2 / 100) * 2}
          layoutCardOffset={15}
          firstItem={1}
          loop={true}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(index) => this.handleCarsouelImageChange(index)}
        />
        <Pagination
          dotsLength={this.state.homeBannerArr.length}
          activeDotIndex={this.state.CarouselIndex}
          containerStyle={styles.paginationContainer}
          dotColor={'#375280'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#9BA8BF'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>

      <View style={this.getCatagoryTabAccordingToLogin().length>2?styles.categoryMainViewAfterLogin: styles.categoryMainView}>
        <FlatList
          testID={"category_data_show"}
          horizontal={true}
          bounces={false}
          data={this.getCatagoryTabAccordingToLogin()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[this.getCatagoryTabAccordingToLogin().length>2?styles.horizontalCatagorySelectedContainerAfterLogin:styles.horizontalCatagorySelectedContainer,{flexDirection:FlexConditionManage(i18n.language),}]}
          renderItem={item => this.getCategoryList(item)}
          keyExtractor={(item, index) => item.id.toString()}

        />
      </View>
    </>
  )
  renderAdressList: ListRenderItem<Address> = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.addressContainer]} testID="addressItem"
        disabled={this.state.addressList!.length > 1 } 
        onPress={() => {
          this.toggleAssignAddress(item.id); this.updateSuccessMessage()
        }}
      >
        <View
          style={[
            styles.flexRow,
            { flexDirection: FlexConditionManage(i18n.language) },
          ]}
        >
          <Image
            resizeMode="contain"
            source={
              item.attributes.address_name &&
                item.attributes.address_name.toLowerCase() === "home"
                ? home
                : other
            }
            style={{ height: 24, width: 24, alignItems: "center" }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={[
                styles.addressContentHeader,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {item.attributes.address_name}
              {item.attributes.is_default && (
                <Text
                  style={[
                    styles.defaultAddress,
                    { textAlign: TextAlignManage(i18n.language) },
                  ]}
                >{` (${i18n.t("default")})`}</Text>
              )}
            </Text>
            <Text
              style={[
                styles.addressText,
                { marginTop: 8 },
                { textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {item.attributes.name}
            </Text>
            <Text
              numberOfLines={3}
              style={[
                styles.addressText,
                { textAlign: TextAlignManage(i18n.language) },
              ]}
            >
              {item.attributes.house_or_building_number},{" "}
              {item.attributes.street}, {item.attributes.block},{" "}
              {item.attributes.area}, {item.attributes.zipcode}
            </Text>

            <View
              style={{
                ...styles.flexRow,
                marginTop: 20,
                flexDirection: FlexConditionManage(i18n.language),
              }}
            >
              <TouchableOpacity
                testID="editAddressBtn"
                onPress={() =>
                  this.editAddress(item.id)
                }
              >
                <Text
                  style={[
                    styles.editText,
                    { textAlign: TextAlignManage(i18n.language) },
                  ]}
                >
                  {i18n.t("Edit")}
                </Text>
              </TouchableOpacity>
              {!item.attributes.is_default && (
                <TouchableOpacity
                  testID="deleteAddressBtn"
                  onPress={() => this.deleteAddressButton(item.id)}
                >
                  <Text
                    style={[
                      styles.deletText,
                      { textAlign: TextAlignManage(i18n.language) },
                    ]}
                  >
                    {i18n.t("Delete")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {this.state.addressList!.length > 1 ? (
            <View style={styles.checkBoxContainer}>
              <CheckBox
                testID={item.id + "-checkbox"}
                value={item.attributes.is_default_1}
                disabled={item.attributes.is_default_1}
                onChange={() => { this.toggleAssignAddress(item.id); this.updateSuccessMessage() }}
                boxType="square"
                tintColor="#FFFFFF"
                onCheckColor="#FFFFFF"
                onFillColor="#CCBEB1"
                onTintColor="#FFFFFF"
                animationDuration={0}
                tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
                style={styles.checkBox}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  addressTxt = () => {
    return (
      (this.state.addressList !== null && this.state.addressList.length > 0) &&
      <Text style={[styles.headerTitleCatalogue, { textAlign: TextAlignManage(i18n.language), marginLeft: 10, marginTop: 15, marginBottom: 0 }]}>
        {i18n.t('savedAddressesText')}
      </Text>
    )
  }

  locationAddress = () =>{
    return(
      <Text numberOfLines={2} style={{color: "#375280",fontFamily: "Lato-Regular", fontWeight: "700", fontSize: 16, lineHeight: 22,marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0),maxWidth:windowWidth*40/100}}>{this.state.addressName!=null?this.state.addressName : i18n.t('Home')}</Text>
    )
  }

  crossButtonView = () => {
    //istanbul ignore next
    return(
      <TouchableOpacity
        onPress={() => this.handleClearInput()}
        testID="crossButtonPress"
        style={{
          position: 'absolute',
          right: i18n.language== 'en'? 20: 35,
          justifyContent: 'center',
          alignItems: 'center',
          height: windowWidth * 4 / 100,
          width: windowWidth * 4 / 100,
          alignSelf: 'center',
          backgroundColor: '#CCCCCC',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 10, top: -2, color: '#FFFFFF',fontWeight:'600' }}>
          x
        </Text>
      </TouchableOpacity>
    )}
    landingPageLoader = () => {
      return  (this.state.loading || this.state.loadingCat) && <CustomLoader />
    }
  // Customizable Area End

  render() {
    // Customizable Area Start            
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
        {this.landingPageLoader()}
        <View style={styles.manageWidth}>
          <View style={[styles.mainHeaderView,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity testID="locationShowModel" style={[styles.mainHeaderView,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>this.showLocationModel()}>
              <Image resizeMode="contain" source={direct} style={styles.mainLogo}></Image>
             {this.locationAddress()}
              <Image resizeMode="contain" source={downArrow} style={styles.DownLogo}></Image>
            </TouchableOpacity>
            <View style={styles.notificationMainView}>
              <TouchableOpacity testID="btnNotifcationBuyerRedirection" onPress={()=>{this.btnNotificationRedirection()}} style={styles.notificationTouch}>
                <Image resizeMode="contain" source={notification} style={styles.notificationIcon}></Image>
                {this.state.hasNewNotification && <View style={styles.redDot} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.notificationTouch} testID="goToCart" onPress={this.goToCart}>
                <Image source={shoppingCart} style={styles.notificationIcon}></Image>
                {this.state.cartItemCount ? (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartText}>{this.state.cartItemCount}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{color: "#94A3B8",fontFamily: "Lato-Regular", fontSize: 13,marginTop:-5,marginBottom:5,marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*1/100,),marginRight:ManageDynamicMargin(i18n.language,windowWidth*1/100,0)}}>{this.state.address}</Text>
        
          <View style={[styles.shopMainViewContainer, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <View style={[{
              left: ManageDynamicMargin(i18n.language, undefined, (windowWidth * 2) / 100), marginRight: ManageDynamicMargin(i18n.language, (windowWidth * 2) / 100, 0), width: windowWidth * 5 / 100,
              height: windowWidth * 5 / 100,
              position: 'absolute',
              marginTop: windowWidth * 4 / 100,
            }]}>
              <Image source={search} style={{
                width: windowWidth * 5 / 100,
                height: windowWidth * 5 / 100
              }}></Image>
            </View>
            <View>
              <TextInput
                testID={"txt_enter_product"}
                maxLength={30}
                returnKeyLabel="done"
                returnKeyType="done"
                onFocus={this.navigateToCatalogueHomeSearch}
                keyboardType="default"
                placeholder={i18n.t('search_for_a_product')}
                placeholderTextColor="#9A9A9A"
                style={[{ textAlign: TextAlignManage(i18n.language) }, styles.searchTextinputCate]}
              />
            </View>
          </View>
         </View>

        <View style={{ flex: 1 }}>

          <View style={{ width: windowWidth * 90 / 100, alignSelf: 'center', marginTop: windowWidth * 3 / 100 }}>
            <FlatList
              bounces={false}
              testID={"cate_show_flatlist_list"}
              data={this.state.homeCatalogueArr}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              columnWrapperStyle={styles.catalogueColumWrapper}
              numColumns={2}
              contentContainerStyle={styles.categoryContainer}
              ListEmptyComponent={() => (!this.state.loadingCat ?
                <View style={styles.listEmptymainView}>
                  <Text style={styles.listEmptyTitleText}>{i18n.t('noRecordFoundText')}</Text>
                </View>
                : null)}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity testID="btnCatalogueListRedirection" style={styles.subCateListViewMainTouch} onPress={() => { this.catalogueDetailRedirection(item.id) }}>
                    <View>
                      <FastImage source={ImageNotFound(item.attributes.primary_image)} style={styles.subCateListViewImage}></FastImage>
                    </View>
                    <View style={[styles.subCateHeartTouch,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      {item.attributes.primary_discounted_percentage != '0'?<Text style={styles.discountText}>{item.attributes.primary_discounted_percentage}% {i18n.t('offText')}</Text>:<View/>}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        testID={"wishlistToggle"}
                        onPress={() => this.toggleWishlistData(item)}
                      >
                        <Image
                          source={
                            item.attributes.is_wishlist ? fillHeart : emptyHeart
                          }
                          style={styles.subCateHeartIcon}
                          testID={item.attributes.is_wishlist ? "filled" : "empty"}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text numberOfLines={1} style={[{textAlign:TextAlignManage(i18n.language)},styles.subCateText]}>{item.attributes.name}</Text>
                      <Text numberOfLines={2} style={[{textAlign:TextAlignManage(i18n.language)},styles.subCateDesText]}>{item.attributes.primary_store_name}</Text>
                      <View style={[styles.priceContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={[{textAlign:TextAlignManage(i18n.language),marginRight:ManageDynamicMargin(i18n.language,undefined,6),marginLeft:ManageDynamicMargin(i18n.language,6,undefined)},styles.subCateListViewPriceText]}> 
                        {PriceConvertValue(item.attributes.primary_price,this.state.localCurrency)}
                        </Text>
                        {item.attributes.primary_discounted_percentage != '0' ?<Text style={[{textAlign:TextAlignManage(i18n.language)},styles.scratchedPriceText]}>
                        {PriceConvertValue(item.attributes.primary_main_price,this.state.localCurrency)}</Text>:<View/>}
                      </View>    
                    </View>

                  </TouchableOpacity>
                );
              }}
              ListHeaderComponent={this.renderHeader}
              keyExtractor={(item, index) => item.id}
              onEndReachedThreshold={0.5}
              onEndReached={() => this.renderMoreCatalogue()}
            />
          </View>

        </View>
        <Modal
            animationType="fade"
            transparent={true}
            testID="logoutModal"
            visible={this.state.locationModel}>
            <SafeAreaView style={styles.modalMainViewDriver}>
            <View style={styles.viewContainer}>
          <View
            style={[
              styles.headerViewMainCatalogue,
              { flexDirection: FlexConditionManage(i18n.language) },
            ]}
          >
            <TouchableOpacity
              testID="btnBackAddress"
              style={styles.backTouchCatalogue}
              onPress={() => {
                this.hideLocationModel()
              }}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[
                  styles.backIconCssCatalogue,
                  {
                    transform: [
                      { scaleX: ImageReverseManage(i18n.language) },
                      { scaleY: ImageReverseManage(i18n.language) },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            <View>
              <Text style={[styles.headerTitleCatalogue,{textAlign:TextAlignManage(i18n.language),marginLeft:10}]}>
                {i18n.t("addressPlaceholderText")}
              </Text>
            </View>
            <View style={styles.filterTouch} />
          </View>
          <TouchableOpacity onPress={this.btnredirectMap} style={[{flexDirection:FlexConditionManage(i18n.language), width: windowWidth * 90 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 3,
    alignItems:'center',
    marginTop: windowWidth * 3 / 100}]}>
            <View style={[{left:ManageDynamicMargin(i18n.language,undefined,(windowWidth * 2) / 100),marginRight: ManageDynamicMargin(i18n.language,(windowWidth * 2) / 100,0) },styles.searchIconCss]}>
              <Image source={search} style={styles.notificationIcon}></Image>
            </View>
            <View>
              <Text style={{
                          backgroundColor: 'fff',
                          fontSize: 16,
                          color: '#375280',
                          width: windowWidth * 80 / 100,
                          height: windowHeight * 5 / 100,
                          padding: 8,
                          marginLeft:25,
                          marginTop: windowWidth * 2 / 100,
                        }} >{i18n.t("searchRedirectMap")}</Text>

            </View>
          </TouchableOpacity>
              <TouchableOpacity 
              testID="enableLocationAgain"
              onPress={()=>{this.requestFromLocationAgain()}} style={[{
                flexDirection: FlexConditionManage(i18n.language), width: windowWidth * 90 / 100,
                alignSelf: 'center',
                paddingVertical: windowWidth * 5 / 100,
                borderBottomWidth: 1,
                borderColor: '#CBD5E1',
                borderRadius: 3
              }]}>
                <View style={[{
                  left: ManageDynamicMargin(i18n.language, undefined, (windowWidth * 2) / 100), marginRight: ManageDynamicMargin(i18n.language, (windowWidth * 2) / 100, 0), width: windowWidth * 5 / 100,
                  height: windowWidth * 5 / 100,
                }]}>
                  <Image source={gps} style={styles.notificationIcon}></Image>
                </View>

                <Text
                  style={[
                    styles.addressContentHeader,
                    { textAlign: TextAlignManage(i18n.language), fontSize: 16, marginLeft: 10 },
                  ]}
                > Use current location</Text>

              </TouchableOpacity>
               {this.addressTxt()}
          <FlatList
            data={this.state.addressList}
            testID={"address_flatlist_list"}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.flContainer}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={this.renderAdressList}
          
          />
          {(() => {
            if ( this.state.token !=null ) {
             
              return (
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    testID="btnAddAdress"
                    style={styles.addAdressButton}
                    onPress={() => this.goToAddAddress()}
                  >
                    <Text style={styles.addNewButtonText}>
                      {i18n.t("Add New Address")}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
           
          })()}
        </View>
            </SafeAreaView>
          </Modal>
          <TouchableOpacity
          testID={"toHandleDataForLocation"}
          ></TouchableOpacity>
          <TouchableOpacity
          testID={"toHandleDataForLocation1"}
          ></TouchableOpacity>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  notificationIcon: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  shopMainViewContainer: {
   // flexDirection: 'row',
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 3,
    marginTop: windowWidth * 3 / 100
  },
  searchIconCss: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
    position: 'absolute',
    marginTop: windowWidth * 4 / 100,
  },
  searchTextinputCate: {
    width: windowWidth * 80 / 100,
    height: windowHeight * 6 / 100,
    padding: 10,
    color: '#375280',
    marginHorizontal: (windowWidth * 6) / 100,
  },
  sliderWidth: {
    width: windowWidth * 90 / 100
  },
  slider: {
    marginTop: 15,
    overflow: 'visible',
    alignSelf: 'center',
  },
  sliderContentContainer: {
    paddingVertical: 10
  },
  imageContainer: {

  },
  paginationContainer: {
    width: windowWidth * 10 / 100,
    alignSelf: 'center',
    height: windowHeight * 2 / 100
  },
  paginationDot: {
    width: windowWidth * 3 / 100,
    height: windowWidth * 3 / 100,
    borderRadius: windowWidth * 3 / 100,
  },
  itemSeprator: {
    width: windowWidth * 5 / 100
  },
  fontSetup: {
    fontFamily: 'Lato-Regular',
    fontWeight: '500'
  },
  subCateListViewMainTouch: {
    width: windowWidth * 42 / 100,
    height: windowHeight * 32 / 100,
    marginBottom: Scale(25)
  },
  subCateListViewImage: {
    width: windowWidth * 42 / 100,
    height: windowHeight * 20 / 100
  },
  listEmptymainView: {
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: windowWidth * 20 / 100
  },
  listEmptyTitleText: {
    fontSize: windowWidth * 5 / 100,
    fontFamily: 'Avenir-Heavy',
    color: '#375280'
  },
  subCateListViewPriceText: {
    color: '#375280',
    fontSize: windowWidth * 4.2 / 100,
    fontFamily: 'Lato-Bold',
  },
  scratchedPriceText: {
    color: '#94A3B8',
    fontSize: windowWidth * 3.7 / 100,
    fontFamily: 'Lato-Bold',
    textDecorationLine:'line-through',
    marginBottom:1.5
  },
  subCateText: {
    color: '#375280',
    fontSize: windowWidth * 4.2 / 100,
    marginTop: windowWidth * 2 / 100,
    fontFamily: 'Lato-Bold'
  },
  subCateDesText: {
    color: '#375280',
    fontSize: windowWidth * 3.5 / 100,
    marginTop: windowWidth * 2 / 100,
    fontFamily: 'Lato-Regular',
    fontWeight: '500'
  },
  subCateHeartTouch: {
    position: 'absolute',
    top: 7,
    flexDirection:"row",
    justifyContent:"space-between",
    alignSelf:'center',
    width:'90%'
  },
  subCateHeartIcon: {
    width: windowWidth * 7 / 100,
    height: windowWidth * 7 / 100
  },
  manageWidth: {
    width: windowWidth * 90 / 100,
    alignSelf: 'center'
  },
  mainHeaderView: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainLogo: {
    width: windowWidth * 7 / 100,
    height: windowHeight * 7 / 100
  },
  DownLogo: {
    width: windowWidth * 5 / 100,
    height: windowHeight * 5 / 100,
    marginLeft:2
  },
  notificationMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 14 / 100
  },
  notificationTouch: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 5 / 100
  },
  homeTitleMainView: {
    marginTop: windowWidth * 4 / 100,
    width: windowWidth * 87 / 100,
    alignSelf: 'center'
  },
  homeTitleText: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 28
  },
  homeSubTitleText: {
    color: '#375280',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: windowWidth * 1 / 100
  },
  categoryMainView: {
    flex: 1,
    borderColor: "#9A9A9A",
   
    marginBottom:12,


  },
  categoryMainViewAfterLogin:{
    width: windowWidth * 93 / 100,
    alignSelf: 'flex-end'
  },
  sliderMainView: {
    width: windowWidth * 82 / 100,
    height: windowHeight * 37 / 100,
    backgroundColor: '#ffffff',
    shadowOffset: {
      height: 7,
      width: 0
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.20,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 5
  },
  sliderImage: {
    width: windowWidth * 82 / 100,
    height: windowHeight * 22 / 100,
    borderRadius: 5
  },
  sliderTitleText: {
    color: '#375280',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Lato-Bold'
  },
  sliderSubTitleText: {
    color: '#375280',
    textAlign: 'center',
    marginTop: windowWidth * 2 / 100,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Lato-Regular'
  },
  sliderUrlText: {
    color: '#375280',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#375280',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Lato-Regular',
  },
  sliderTilteMainView: {
    marginTop: windowWidth * 3 / 100
  },
  sliderUrlTouch: {
    marginTop: windowWidth * 5 / 100
  },
  categoryContainer: {
    paddingBottom: windowHeight * 10 / 100,

  },
  catalogueColumWrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },
  categoryTouch: {
  width:windowWidth*45/100,
alignItems:"center",
    paddingBottom: windowWidth * 3 / 100
  },
  categoryTouchAfterLogin:{
    paddingHorizontal: windowWidth * 3 / 100,
    paddingBottom: windowWidth * 3 / 100
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -2,
    backgroundColor: '#CCBEB1',
    height: 14,
    width: 14,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartText: {
    color: '#375280',
    fontSize: 8,
    fontWeight: 'bold'
  },
  horizontalCatagorySelectedContainer: {
    display: "flex",
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 

  },
  horizontalCatagorySelectedContainerAfterLogin:{ 
    paddingRight: windowWidth * 5 / 100 ,
    paddingLeft:12,
    marginBottom:20
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
discountText:{
  backgroundColor:'#F1F5F9CC',
  paddingHorizontal:6,
  fontSize:windowWidth * 3 / 100,
  alignSelf:'center',
  paddingVertical:4,
  borderRadius:2,
  fontFamily: 'Lato-Regular',
  fontWeight: '800',
  color:'#375280'
},
priceContainer:{
  flexDirection:'row',
  alignItems:'flex-end', 
  marginTop: windowWidth * 2 / 100,
  flexWrap:'wrap',
},
modelTextViewTitle:{textAlign:'center',color:'#375280',fontSize:windowWidth*4.7/100,fontFamily:'Lato-Regular',width:windowWidth*70/100,alignSelf:'center'},
modelTextView:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*8/100,marginTop:windowWidth*5/100,padding:5,alignSelf:'center',width:windowWidth},
modelViewContentHeaderText:{textAlign:'center',fontSize:windowWidth*5.5/100,color:'#375280',fontFamily:'Lato-Bold'},
modelViewShow:{backgroundColor:'#fff',width:'100%',alignSelf:'center',height:windowHeight*28/100},
modelViewContentHeader:{borderBottomWidth:1,borderBottomColor:'#E3E4E5',height:windowHeight*4/100,marginTop:windowWidth*4/100},
modelViewContent:{
  borderWidth:2,borderColor:'#F2F3F5',width:windowWidth*20/100,alignSelf:'center',marginTop:windowWidth*3/100
},
modalMainViewDriver:{
  flex: 1, 
  backgroundColor: '#fff', 
  alignItems: 'center'
},
viewContainer: {
  flex: 1,
  alignSelf: "center",
  width: (windowWidth * 90) / 100,
},
headerViewMainCatalogue: {
  flexDirection: "row",
  justifyContent: "flex-start",
  marginTop: (windowHeight * 2) / 100,
  alignContent: "center",
},
backTouchCatalogue: {
  width: (windowWidth * 6) / 100,
  height: (windowWidth * 6) / 100,
  marginTop: (windowWidth * 1) / 100,
},
backIconCssCatalogue: {
  width: (windowWidth * 5) / 100,
  height: (windowWidth * 5) / 100,
},
headerTitleCatalogue: {
  color: "#375280",
  fontSize: (windowWidth * 5) / 100,
  textAlign: "center",
  fontFamily: "Avenir-Heavy",
},
safeContainer: {
  // flex: 1,
  backgroundColor: "#ffffff",
},
filterTouch: {
  width: (windowWidth * 6) / 100,
  height: (windowWidth * 6) / 100,
},
checkBoxContainer: {
  width: Scale(22),
  height: Scale(22),
  alignItems: "center",
  position: "absolute",
  right: 2,
},
checkBox: {
  margin: Scale(2),
  borderWidth: Scale(2),
  borderColor: "#CCBEB1",
  borderRadius: Scale(2),
  ...Platform.select({
    ios: {
      height: Scale(24),
      width: Scale(24),
    },
  }),
},
addressHeader: {
  color: "#375280",
  fontFamily: "Avenir-Heavy",
  fontSize: (windowWidth * 5) / 100,
  textAlign: "center",
  fontWeight: "800",
},
bottomView: {
  width: "100%",
  bottom: 0,
  height: "10%",
  backgroundColor: "white",
  position: "absolute",
},
addAdressButton: {
  backgroundColor: "#CCBEB1",
  width: (windowWidth * 86) / 100,
  height: (windowHeight * 6.5) / 100,
  borderRadius: 2,
  marginTop: 24,
  marginLeft: "2%",
  justifyContent: "center",
  position: "absolute",
  bottom: 20,
},
addAdressBtn: {
  backgroundColor: "white",
  width: (windowWidth * 90) / 100,
  height: (windowHeight * 6.5) / 100,
  borderRadius: 2,
  borderWidth: 1,
  borderColor: "#CCBEB1",
  marginTop: (windowWidth * 80) / 100,
  justifyContent: "center",
  position: "absolute",
  bottom: 20,
},
addNewButtonText: {
  color: "white",
  textAlign: "center",
  fontFamily: "Lato-Bold",
  fontSize: (windowWidth * 4) / 100,
},
addressSubHeader: {
  fontSize: (windowHeight * 2) / 100,
  textAlign: "center",
  marginTop: (windowHeight * 2) / 100,
  fontFamily: "Lato-Regular",
  fontWeight: "500",
},
addressContainer: {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 16,
  shadowColor: "grey",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 5,
  shadowOpacity: 0.5,
  elevation: Platform.OS == "android" ? 10 : 2,
  marginTop: 24,
  margin: 8,
},
addressText: {
  paddingRight: Scale(12),
  fontFamily: "Lato-Regular",
  color: "#475569",
  fontSize: (windowWidth * 3.8) / 100,
},
addressContentHeader: {
  fontFamily: "Lato-Bold",
  color: "#375280",
  fontSize: (windowWidth * 4.5) / 100,
  textTransform: "capitalize",
  width:(windowWidth * 62) / 100,
},
flexRow: {
  flexDirection: "row",
},
defaultAddress: {
  textTransform: "none",
  fontWeight: "500",
  color: "#475569",
},
editText: {
  fontFamily: "Lato-Bold",
  fontWeight: "700",
  color: "#375280",
  fontSize: (windowHeight * 2) / 100,
  marginBottom: 5,
},
deletText: {
  fontFamily: "Lato-Bold",
  fontWeight: "700",
  fontSize: (windowHeight * 2) / 100,
  marginBottom: 5,
  marginHorizontal: 20,
  color: "#F97171",
},
noProductTextInAdd: {
  fontFamily: "Lato-Regular",
  fontSize: Scale(18),
  fontWeight: "500",
  color: "#375280",
  textAlign: "center",
},
noProductsContainerInAdd: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5%",
},
addProductButtonInAdd: {
  backgroundColor: "#CCBEB1",
  width: "48%",
  height: (windowHeight * 6.5) / 100,
  borderRadius: 2,
  marginTop: (windowWidth * 4) / 100,
  justifyContent: "center",
},
addAddress: {
  backgroundColor: "#FFFFFF",
  borderWidth: StyleSheet.hairlineWidth * 2,
  borderColor: "#CCBEB1",
  borderRadius: 2,
  marginTop: Scale(16),
  marginHorizontal: Scale(6),
},
addProductButtonTextInAdd: {
  color: "#fff",
  textAlign: "center",
  fontFamily: "Lato-Bold",
  fontSize: (windowWidth * 5) / 100,
  fontWeight: "800",
},
flContainer: { paddingBottom: 100 },
});
// Customizable Area End