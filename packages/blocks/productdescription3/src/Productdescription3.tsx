import React from "react";

// Customizable Area Start
import {
  FlatList,
  ListRenderItem,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import CustomLoader from "../../../components/src/CustomLoader";
import Accordion from "../../../components/src/Accordion";
import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/CustomButton";
import { upArrow, partIcon, backIcon, rewardStar } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End

const { width } = Dimensions.get("window");
// Customizable Area End

import Productdescription3Controller, {
  Props,
  configJSON,
} from "./Productdescription3Controller";
import { VariantAttributes } from "./response";

export default class Productdescription3 extends Productdescription3Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  _renderImages: ListRenderItem<{
    id: string;
    uri: string;
  }> = ({ item }) => (
    <ImageBackground
      key={item.id}
      source={{ uri: item.uri }}
      style={styles.image}
      resizeMode="cover"
      testID="images"
    />
  );

  renderStylistDetail = () => {
    return (
      <>
        {
          this.state.stylistAddress != null &&
          <Accordion
            open={this.state.stylistInfoOpen}
            setOpen={(stylistInfoOpen) => this.setState({ stylistInfoOpen })}
            label={i18n.t('stylistInformation')}
            containerStyle={styles.accordion}
            toggleTestID="stylist-info-toggle"
            childTestID="stylist-info-ct">
            <Text style={styles.storeName}>
              {this.state.stylistName}
            </Text>
            <Text style={styles.stylistAddress}>
              {this.setStylistAddress(this.state.stylistAddress)}
            </Text>
          </Accordion>
        }
      </>
    )
  }

  renderCustomLoader = () => {
    return (
      this.state.loading && <CustomLoader />
    )
  }

  renderButtonsContainer = () => {
    return (
      <View style={[styles.row, styles.btns, { flexDirection: FlexConditionManage(i18n.language) }]} testID="buyCartBtns">
        <CustomButton
          title={i18n.t('addtoCart')}
          onPress={this.addToCart}
          style={styles.cartButton}
          textStyle={[styles.addToCartText, { fontSize: i18n.language == 'ar' ? 18 : 20 }]}
          testID="addToCart"
        />
        <CustomButton
          title={i18n.t('buyNow')}
          testID="buyNow"
          style={styles.buyNowButton}
          onPress={this.buyNow}
        />
      </View>
    )

  }

  loyaltyPointsCondition = () => {
    return (
      <View>
        {this.state.loyaltyPoints > 0 &&
          <Text style={[styles.rewardOne, { textAlign: TextAlignManage(i18n.language) }]}>
            <Text>{`${i18n.t('youwillearn')} `}</Text>
            <Image style={styles.rewardBadge} source={rewardStar} />
            <Text>{' ' + this.state.loyaltyPoints + ' ' + `${i18n.t('loyaltypoints')}`}</Text>
          </Text>}
      </View>
    )
  }

  renderCustomLP = () => {
    return (
      this.state.selectedVariant.custom_lp != 0 && this.state.selectedVariant.custom_lp != null &&
      <Text style={[styles.rewardOne, { textAlign: TextAlignManage(i18n.language) }]}>
        <Text>{`or Pay ${PriceConvertValue(this.state.selectedVariant.custom_pay, this.state.localCurrency)} + `}</Text>
        <Image style={styles.rewardBadge} source={rewardStar} />
        <Text>{PriceConvertValue(this.state.selectedVariant.custom_lp, this.state.localCurrency)}</Text>
      </Text>
    )
  }

  renderLoader() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomLoader />
      </SafeAreaView>
    );
  }
  
  renderProductImages() {
    return (
      <FlatList
        key={this.state.selectedVariant.id + "-id"}
        testID="product-images-fl"
        data={this.state.productImages}
        keyExtractor={({ id }) => id}
        renderItem={this._renderImages}
        horizontal={true}
        pagingEnabled={true}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
  
  renderBackAndWishlistButtons() {
    const rightMargin = ManageDynamicMargin(i18n.language, Scale(8), undefined);
    const leftMargin = ManageDynamicMargin(i18n.language, undefined, Scale(8));
    return (
      <>
        <View style={[styles.btnRowright, { right: rightMargin, left: leftMargin }]}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => this.props.navigation.pop()}
            testID="goBack"
          >
            <Image
              source={backIcon}
              style={[
                styles.backIcon,
                { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.btnRowLeft, { right: leftMargin, left: rightMargin }]}>
          <View style={[styles.costRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.shareButton()}
              testID="share"
            >
              <AntDesign name="sharealt" size={22} color="#375280" />
            </TouchableOpacity>
            {!this.state.sellerPov && this.renderWishlistButton()}
          </View>
        </View>
      </>
    );
  }
  
  renderWishlistButton() {
    return (
      <TouchableOpacity
        style={styles.icon}
        onPress={this.toggleWishlist}
        testID="wishlist"
      >
        <AntDesign
          name={
            this.state.productData.attributes.is_wishlist
              ? "heart"
              : "hearto"
          }
          size={22}
          color="#375280"
          testID={
            this.state.productData.attributes.is_wishlist
              ? "heart-icon"
              : "hearto-icon"
          }
        />
      </TouchableOpacity>
    );
  }
  
  renderPairWithButton() {
    if (!this.state.pairItWith) return null;
    return (
      <TouchableOpacity
        style={styles.pair}
        testID="pair"
        onPress={this.navigateToPairWith}
      >
        <View style={styles.costRow}>
          <Text style={styles.pairItWith}>{i18n.t('pairITWith')}</Text>
          <Image source={partIcon} style={styles.pairIcon} />
        </View>
      </TouchableOpacity>
    );
  }
  
  renderSwiperDots() {
    if (this.state.productImages.length <= 1) return null;
    return (
      <View
        key={this.state.selectedVariant.id + "-id"}
        testID="swiperDots"
        style={[styles.row, styles.swiperDotsContainer]}
      >
        {this.state.productImages.map((item, index) => (
          <View
            testID="dots"
            key={item.id + "-dot"}
            style={
              index === this.state.productImageIndex
                ? styles.activeDot
                : styles.inactiveDot
            }
          />
        ))}
      </View>
    );
  }
  
  renderProductInfo() {
    return (
      <View style={[styles.row, styles.productInfo, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <View style={styles.wrapText}>
          <Text style={[styles.headerText, { textAlign: TextAlignManage(i18n.language) }]}>
            <Text style={[styles.boldText, { textAlign: TextAlignManage(i18n.language) }]}>
              {i18n.language === "en" ? this.state.productData.attributes.brand_name : this.state.productData.attributes.brand_name_arabic}
            </Text>
            {" " + (i18n.language === "en" ? this.state.productData.attributes.name : this.state.productData.attributes.name_arabic)}
          </Text>
        </View>
        <View>
          <Text style={[styles.headerText, styles.boldText]}>
            {PriceConvertValue(this.state.selectedVariant.discounted_price, this.state.localCurrency)}
          </Text>
          {this.state.productData.attributes.primary_discounted_percentage !== '0' && (
            <Text style={[{ textAlign: TextAlignManage(i18n.language) }, styles.scratchedPriceTextDes]}>
              {PriceConvertValue(this.state.selectedVariant.price, this.state.localCurrency)}
            </Text>
          )}
        </View>
      </View>
    );
  }
  
  renderDropdowns() {
    return (
      <View style={[styles.DropDownrow, { flexDirection: FlexConditionManage(i18n.language) }]}>
        {this.renderDropdown('color', this.state.colors, this.handleColorChange)}
        {this.renderDropdown('size', this.state.sizes, this.handleSizeChange)}
      </View>
    );
  }
  
  renderDropdown(label: string, data: Array<VariantAttributes>, onChange: (value: any) => void) {
    return (
      <Dropdown
        data={data}
        valueField="id"
        labelField="name"
        value={data[0]}
        placeholder={i18n.t(label)}
        testID={`${label}-dd`}
        itemTextStyle={[styles.dropDownText, { textAlign: TextAlignManage(i18n.language), marginRight: ManageDynamicMargin(i18n.language, windowWidth * 2 / 100, undefined), marginLeft: ManageDynamicMargin(i18n.language, undefined, windowWidth * 2 / 100) }]}
        placeholderStyle={styles.dropDownText}
        selectedTextStyle={[styles.dropDownText, { textAlign: TextAlignManage(i18n.language), marginRight: ManageDynamicMargin(i18n.language, windowWidth * 2 / 100, undefined), marginLeft: ManageDynamicMargin(i18n.language, undefined, windowWidth * 2 / 100) }]}
        style={[styles.dropDown, { marginRight: ManageDynamicMargin(i18n.language, windowWidth * 2 / 100, undefined), marginLeft: ManageDynamicMargin(i18n.language, undefined, windowWidth * 2 / 100) }]}
        maxHeight={300}
        onChange={onChange}
        iconStyle={[styles.dropdownIconCssEdit, { right: ManageDynamicMargin(i18n.language, undefined, 5), left: ManageDynamicMargin(i18n.language, 5, undefined) }]}
      />
    );
  }
  
  renderAccordions() {
    return (
      <>
        {this.renderAccordion('productDiscri', this.state.descriptionOpen, this.state.descText, 'desc-toggle', 'desc-ct', 'descriptionOpen')}
        {this.renderAccordion('sizeAndFit', this.state.fitOpen, this.state.fitText, 'size-toggle', 'size-ct', 'fitOpen')}
        {this.renderAccordion('productCareMeterial', this.state.careAndMaterialOpen, this.state.careAndMaterialText, 'care-toggle', 'care-ct' , 'careAndMaterialOpen')}
        {this.renderDeliveryAccordion()}
      </>
    );
  }
  
  renderAccordion(label: string, open: boolean, content: string, toggleTestID: string, childTestID: string, stateName : ("descriptionOpen" | "fitOpen" | "careAndMaterialOpen" | "expDeliveryAndCostOpen" | "shopInfoOpen" | "stylistInfoOpen")) {
    return (
      <Accordion
        open={open}
        setOpen={(newValue) => this.setState((prevState) => ({ ...prevState, [stateName]: newValue }))}
        label={i18n.t(label)}
        containerStyle={styles.accordion}
        toggleTestID={toggleTestID}
        childTestID={childTestID}
      >
        <Text style={[styles.infoText, { textAlign: TextAlignManage(i18n.language) }]}>{content}</Text>
      </Accordion>
    );
  }
  
  renderDeliveryAccordion() {
    const estimatedDelivery = this.getEstimatedDelivery(this.state.store);
    const totalCost = this.getTotalCost(this.state.selectedVariant.discounted_price);
    return (
      <Accordion
        open={this.state.expDeliveryAndCostOpen}
        setOpen={(newValue) => this.setState({ expDeliveryAndCostOpen: newValue })}
        label={i18n.t('expectedDeliveryTotal')}
        containerStyle={styles.accordion}
        toggleTestID="price-toggle"
        childTestID="price-ct"
      >
        <Text style={[styles.infoText, styles.eta, { textAlign: TextAlignManage(i18n.language) }]}>{estimatedDelivery}</Text>
        <View style={[styles.costRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={styles.infoText}>{i18n.t('productPrice')}</Text>
          <Text style={styles.infoText}>
            {PriceConvertValue(this.state.selectedVariant.discounted_price, this.state.localCurrency)}
          </Text>
        </View>
        <View style={[styles.costRow, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={styles.infoText}>{i18n.t('approxDeliveryCost')}</Text>
          <Text style={styles.infoText}>{PriceConvertValue("10.0", this.state.localCurrency)}</Text>
        </View>
        <View style={[styles.costRow, { paddingTop: 4 }, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={styles.storeName}>{i18n.t('totalCost')}</Text>
          <Text style={styles.storeName}>{totalCost}</Text>
        </View>
      </Accordion>
    );
  }
  
  renderStoreInformation() {
    if (!this.state.storeAddress) return null;
    return (
      <Accordion
        open={this.state.shopInfoOpen}
        setOpen={(newValue) => this.setState({ shopInfoOpen: newValue })}
        label={i18n.t('storeInformation')}
        containerStyle={styles.accordion}
        toggleTestID="store-info-toggle"
        childTestID="store-info-ct"
      >
        <TouchableOpacity
          testID="btnNavigateStore"
          disabled={this.state.sellerPov}
          onPress={() => this.btnNavigationStore()}
        >
          <Text style={[styles.storeName, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.store?.store_name}</Text>
          <Text style={[styles.storeAddress, { textAlign: TextAlignManage(i18n.language) }]}>{this.state.storeAddress}</Text>
        </TouchableOpacity>
      </Accordion>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    if (!this.state.productData.id) {
      return this.renderLoader();
    }
    return (
      <SafeAreaView style={styles.container} testID="product-description">
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {this.renderProductImages()}
            {this.renderBackAndWishlistButtons()}
            {this.renderPairWithButton()}
          </View>
          {this.renderSwiperDots()}
          {this.renderProductInfo()}
          {this.renderCustomLP()}
          {this.renderDropdowns()}
          {this.renderAccordions()}
          {this.renderStoreInformation()}
          {this.renderStylistDetail()}
          {this.loyaltyPointsCondition()}
        </ScrollView>
        {this.state.sellerPov ? null : this.renderButtonsContainer()}
        {this.renderCustomLoader()}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  image: {
    width,
    height: width * 1.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  DropDownrow: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  swiperDotsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  activeDot: {
    height: Scale(12),
    width: Scale(12),
    borderRadius: Scale(6),
    overflow: "hidden",
    marginHorizontal: Scale(4),
    backgroundColor: "#375280",
  },
  inactiveDot: {
    height: Scale(8),
    width: Scale(8),
    borderRadius: Scale(4),
    overflow: "hidden",
    marginHorizontal: Scale(4),
    backgroundColor: "#CBD5E1",
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: Scale(20),
    paddingTop: Scale(6),
    paddingBottom: Scale(12),
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  wrapText: {
    flexShrink: 1,
  },
  headerText: {
    fontFamily: "Lato",
    fontSize: 22,
    lineHeight: 30,
    color: "#375280",
    fontWeight: "500",
  },
  dropdownIconCssEdit: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  boldText: {
    fontWeight: "700",
  },
  ddRow: {
    marginBottom: Scale(12),
    marginHorizontal: i18n.language == 'ar' ? Scale(10) : 0
  },
  dropDownText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#375280",
    paddingRight: 10,
    fontWeight: "500",
  },
  dropDown: {
    marginVertical: Scale(20),
    justifyContent: "center",
    width: (windowWidth * 42) / 100,

    height: Scale(50),
    borderWidth: 1,
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderTopColor: "#E2E8F0",
    borderBottomColor: "#E2E8F0"
  },
  dleft: {
    marginLeft: Scale(20),
    marginRight: Scale(10),
    paddingLeft: Scale(6),
  },
  dright: {
    marginLeft: Scale(10),
    marginRight: Scale(20),
    paddingLeft: Scale(6),
  },
  arrowBtnStyle: {
    transform: [{ rotate: "180deg" }],
    width: 20,
    height: 20,
  },
  colorIcon: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(8),
  },
  ddItem: {
    justifyContent: "center",
    height: Scale(50),
  },
  accordion: {
    marginHorizontal: Scale(20),
    marginBottom: Scale(12),
    paddingVertical: Scale(8),
    borderTopColor: "#E2E8F0",
    borderTopWidth: StyleSheet.hairlineWidth * 3,
  },
  accordionOne: {
    marginTop: Scale(12),
    marginHorizontal: 0,
    paddingHorizontal: Scale(20),
  },
  infoText: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 18,
    marginVertical: Scale(4),
  },
  storeName: {
    fontFamily: "Lato",
    fontWeight: "700",
    color: "#375280",
    fontSize: 14,
    marginTop: Scale(4),
  },
  storeAddress: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: Scale(4),
  },
  stylistAddress: {
    fontFamily: "Lato",
    fontWeight: "500",
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: Scale(4),
    marginTop: Scale(7)
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnRowLeft: {
    position: "absolute",
    top: Scale(8),
    left: Scale(8),
  },
  btnRowright: {
    position: "absolute",
    top: Scale(8),
    right: Scale(8),
  },
  backIcon: {
    height: Scale(20),
    width: Scale(20),
    resizeMode: "contain",
  },
  pair: {
    position: "absolute",
    bottom: Scale(20),
    right: Scale(20),
    padding: Scale(8),
    backgroundColor: "#FFFFFF",
    borderRadius: Scale(2),
  },
  icon: {
    height: Scale(40),
    width: Scale(40),
    borderRadius: Scale(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: Scale(6),
    alignSelf: 'center'
  },
  pairItWith: {
    marginLeft: Scale(8),
    color: "#375280",
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: 16,
  },
  pairIcon: {
    width: Scale(24),
    height: Scale(24),
    resizeMode: "contain",
    marginHorizontal: Scale(8),
  },
  btns: {
    paddingHorizontal: Scale(15),
    paddingBottom: Scale(20),
  },
  cartButton: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#CCBEB1",
    marginHorizontal: Scale(5),
  },
  buyNowButton: {
    flex: 1,
    marginHorizontal: Scale(5),
  },
  addToCartText: {
    color: "#375280",
  },
  eta: {
    marginBottom: Scale(12),
  },
  rewardOne: {
    marginBottom: Scale(16),
    color: "#375280",
    fontWeight: "400",
    fontFamily: "Lato",
    fontSize: 15,
    marginHorizontal: Scale(20),
  },

  rewardBadge: {
    height: Scale(18),
    width: Scale(18),
    resizeMode: "contain",
  },
  scratchedPriceTextDes: {
    color: '#94A3B8',
    fontSize: windowWidth * 4.3 / 100,
    fontFamily: "Lato",
    fontWeight: '600',
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
    marginTop: 7
  },
});
// Customizable Area End
