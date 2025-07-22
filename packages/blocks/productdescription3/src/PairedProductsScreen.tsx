import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  ListRenderItem
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import { PairWith } from "./response";
import i18n from '../../../components/src/i18n/i18n.config'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')
import { backIcon } from "./assets";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import PriceConvertValue from "../../../components/src/PriceConvertValue";
// Customizable Area End

import PairedProductsController, {
  Props,
  configJSON,
} from "./PairedProductsController";

export default class PairedProductsScreen extends PairedProductsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  _flHeaderSwiper = () => (
    <View>
      <View style={[styles.headerViewMainAssignStore, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchAssignstore}
          onPress={() => { this.props.navigation.pop() }}
        >
          <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstore, { transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }] }]}></Image>

        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitleAssignstore}>{i18n.t('pairItwith')}</Text>
        </View>
        <TouchableOpacity style={styles.filterIconTouch}>

        </TouchableOpacity>

      </View>
      <View style={styles.containerFl}>
        <FlatList
          data={this.state.variantImages}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <ImageBackground
              key={item.id}
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
              testID="images"
            />
          )}
          horizontal={true}
          pagingEnabled={true}
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={this.onViewableItemsChanged}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        {this.state.variantImages.length > 1 ?
          <View testID="swiperDots" style={[styles.row, styles.swiperDotsContainer]}>
            {this.state.variantImages.map((item, index) => (
              <View
                testID="dots"
                key={item.id + '-dot'}
                style={
                  index === this.state.variantImageIndex
                    ? styles.activeDot
                    : styles.inactiveDot}
              />
            ))}
          </View>
          : null}
        <Text style={styles.productName}>
          {
            this.state.variant!.catalogue.brand_name +
            " " +
            this.state.variant!.catalogue.name
          }
        </Text>
      </View>
      <Text style={[styles.alsoLike,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('youMayAlsoLike')}</Text>
    </View>
  )

  _renderSimilarProduct: ListRenderItem<PairWith> = ({ item }) => (
    <View style={styles.flItem}>
      <Pressable
        onPress={() => this.pushToProductDetails(item.attributes.catalogue_id)}
        testID="go-to-similar-product"
      >
        <View>
          <Image
            source={{ uri: item.attributes.front_image || 'https://i.ibb.co/8Nb9QHL/image.png' }}
            style={styles.similarImage}
          />
          <View style={[styles.subCateHeartTouchpair,{flexDirection:FlexConditionManage(i18n.language)}]}>
            {item.attributes.discounted_percentage !='0' ? <Text style={styles.discountText}>{item.attributes.discounted_percentage}% {i18n.t('offText')}</Text>:<View/>}
            <TouchableOpacity
              style={styles.icon}
              onPress={this.yetToBeDevelopedAlert}
              testID="wishlist"
            >
              <AntDesign
                name="heart"
                size={12}
                color="#375280"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.prodBrand,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.brand_name ?? "None"}</Text>
        <Text style={[styles.prodName,{textAlign:TextAlignManage(i18n.language)}]}>{item.attributes.product_name}</Text>
        <View style={[styles.priceContainerPaired, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <Text style={[{ textAlign: TextAlignManage(i18n.language), marginRight: ManageDynamicMargin(i18n.language, undefined, 6), marginLeft: ManageDynamicMargin(i18n.language, 6, undefined) }, styles.subCateListViewPriceTextPaired]}>
            {PriceConvertValue(item.attributes.discounted_price, this.state.localCurrency)}
          </Text>
         {item.attributes.discounted_percentage !='0' ? <Text style={[{ textAlign: TextAlignManage(i18n.language) }, styles.scratchedPriceTextPaired]}>
            {PriceConvertValue(item.attributes.price, this.state.localCurrency)}</Text>:<View/>}
        </View>
      </Pressable>
    </View>
  )
  // Customizable Area End

  render() {
    // Customizable Area Start
    if (!this.state.variant) {
      return (
        <SafeAreaView style={styles.container}>
          <CustomLoader />
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={styles.container} testID="paired-products">
        <FlatList
          style={[styles.container, styles.fl2]}
          data={this.state.variant.pair_it_with}
          keyExtractor={(item) => item.id + '-variant'}
          renderItem={this._renderSimilarProduct}
          numColumns={2}
          ListHeaderComponent={this._flHeaderSwiper()}
        />
      </SafeAreaView>
    )
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#375280',
    fontFamily: 'Lato'
  },
  row: {
    flexDirection: 'row',
  },
  activeDot: {
    height: Scale(12),
    width: Scale(12),
    borderRadius: Scale(6),
    overflow: 'hidden',
    marginHorizontal: Scale(4),
    backgroundColor: '#375280'
  },
  inactiveDot: {
    height: Scale(8),
    width: Scale(8),
    borderRadius: Scale(4),
    overflow: 'hidden',
    marginHorizontal: Scale(4),
    backgroundColor: '#CBD5E1'
  },
  swiperDotsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  },
  image: {
    height: Scale(360),
    width: Scale(240),
  },
  containerFl: {
    paddingHorizontal: (windowWidth - Scale(240 + 20)) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Lato',
    fontWeight: '700',
    marginVertical: Scale(6),
    fontSize: 22,
    color: '#375280',
    textAlign: "center"
  },
  alsoLike: {
    fontFamily: 'Lato',
    fontWeight: '700',
    marginHorizontal: Scale(10),
    marginVertical: Scale(14),
    fontSize: 18,
    color: '#375280',
  },
  fl: {
    paddingHorizontal: Scale(10),
    flex: 1,
  },
  flItem: {
    marginHorizontal: Scale(10),
    marginVertical: Scale(12),
    width: (windowWidth - Scale(60)) / 2
  },
  similarImage: {
    resizeMode: 'cover',
    aspectRatio: 1,
    borderRadius: 3,
    overflow: 'hidden',
  },
  icon: {
    height: Scale(24),
    width: Scale(24),
    borderRadius: Scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  prodBrand: {
    fontFamily: 'Lato',
    fontWeight: '700',
    marginTop: Scale(10),
    fontSize: 16,
    color: '#375280',
  },
  prodName: {
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: 14,
    color: '#375280',
  },
  prodPrice: {
    fontFamily: 'Lato',
    fontWeight: '700',
    marginTop: Scale(10),
    fontSize: 18,
    color: '#375280',
  },
  fl2: {
    paddingHorizontal: Scale(10),
    
  },
  headerViewMainAssignStore: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  filterIconTouch: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
  },
  backTouchAssignstore: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
  },
  backIconCssAssignstore: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  headerTitleAssignstore: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
  },
  subCateHeartTouchpair: {
    position: 'absolute',
    top: 7,
    flexDirection:"row",
    justifyContent:"space-between",
    alignSelf:'center',
    width:'90%'
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
  priceContainerPaired:{
    flexDirection:'row',
    alignItems:'flex-end', 
    marginTop: windowWidth * 2 / 100,
    flexWrap:'wrap',
  },
  scratchedPriceTextPaired: {
    color: '#94A3B8',
    fontSize: windowWidth * 3.7 / 100,
    fontFamily: 'Lato-Bold',
    textDecorationLine:'line-through',
    marginBottom:2
  },
  subCateListViewPriceTextPaired: {
    color: '#375280',
    fontSize: windowWidth * 4.2 / 100,
    fontFamily: 'Lato-Bold',
  },
});
// Customizable Area End
