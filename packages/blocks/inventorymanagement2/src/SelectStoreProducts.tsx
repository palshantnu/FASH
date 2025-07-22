import React from "react";

// Customizable Area Start
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  Modal,
  Platform
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, search, selectedCheckBox, unSelectedCheckBox, errorIcon } from "./assets";
import {
  PairWith
} from "../../productdescription3/src/response";

import SelectStoreProductsController, {
  Props,
} from "./SelectStoreProductsController";
import { responsiveWidth } from "react-native-responsive-dimensions";

import TextAlignManage from '../../../components/src/TextAlignManage'
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
// Customizable Area End

export default class SelectStoreProducts extends SelectStoreProductsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderItemStoreProducts = ({ item, index }: { item: PairWith, index: number }) => {
    const { product_name, sku } = item.attributes;
    const isSelected = this.state.selectedItem.includes(item.id);
    return (
      <View style={[styles.variantBodyContainerStoreProducts , {
        borderBottomWidth: 1.5,
        borderBottomColor: '#f1f5f9',
        flexDirection:FlexConditionManage(i18n.language),
        marginTop:10
        
      }]}>

        <View style={{width: '40%'}}>
          <Text style={[styles.numberingsStoreProducts,{textAlign:TextAlignManage(i18n.language)}]}>{product_name}</Text>
        </View>

        <View style={{width: '30%'}}>
          <Text style={[styles.numberingsStoreProducts,{textAlign:TextAlignManage(i18n.language)}]}>{sku}</Text>
        </View>

        <View style={{ width: '30%',  padding: 0}}>
          <TouchableOpacity style={[styles.chkboxStyle,{marginLeft:ManageDynamicMargin(i18n.language,windowWidth*17/100,undefined)}]} testID="selectCheckBox" onPress={() => this.toggleItemSelectionStoreProducts(item.id)}>
            <Image
              style={[styles.checkBoxImageStoreProducts, {marginHorizontal: 0}]}
              source={isSelected ? selectedCheckBox : unSelectedCheckBox}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderStoreProductsItem = () => {
    const { errorMsg, storeProductsSearchText, storeProducts, isSelectAll } = this.state
    return (
    <View style={styles.marginCategoryManageStoreProducts}>
      {storeProducts.length > 0 &&
        <>
          <View style={[styles.shopMainViewContainerStoreProducts, { marginTop: windowWidth * 3 / 100,flexDirection:FlexConditionManage(i18n.language) }]}>
            <View style={styles.searchIconCssStoreProducts}>
              <Image source={search} style={[styles.backIconCssAssignstoreStoreProducts, {marginTop: 4}]}></Image>
            </View>
            <View>
              <TextInput
                testID={"searchInputBox"}
                onChangeText={this.updateTheSearchTextStoreProducts}
                keyboardType="default"
                maxLength={30}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  this.searchAssignStoreStoreProducts()
                }}
                placeholder={i18n.t('searchProduct')}
                placeholderTextColor="#9A9A9A"
                style={[styles.searchTextinputStoreProducts,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*8/100,undefined)}]}
                value={storeProductsSearchText}
              />
            </View>
          </View>


          <View style={[styles.selectAllContainerStoreProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Text style={styles.selectAllItemTextStoreProducts}>{i18n.t('selectAllProduct')} ({this.state.storeProducts.length})</Text>
            <TouchableOpacity testID="allBtnCheckBox" onPress={this.toggleSelectAllStoreProducts}
            style={{ marginRight: responsiveWidth(11)}}
            >
              <Image
                style={styles.checkBoxImageStoreProducts}
                source={isSelectAll ? selectedCheckBox : unSelectedCheckBox}
              />
            </TouchableOpacity>
          </View>


          <View style={{ width: responsiveWidth(100), backgroundColor: '#f1f5f9', marginBottom: 8, height: 1.5, marginLeft: responsiveWidth(-5) }}></View>

          <View style={[styles.headerContainerStoreProdcts,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <View style={{width:i18n.language==='ar'?"30%":'40%'}}>
            <Text style={[styles.blockSubTitleStoreProdcts, { textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('productName')}</Text>
            </View>
            <View style={{ width: i18n.language==='ar'?"40%":'30%'}}>
              <Text style={[styles.blockSubTitleStoreProdcts,{ textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('sku')}</Text>
            </View>
            <View style={{width:"30%"}}>
            <Text style={[styles.blockSubTitleStoreProdcts, { textAlign:TextAlignManage(i18n.language), paddingLeft: 0 }]}>{i18n.t('selectProduct')}</Text>
            </View>
          </View>

        </>
      }


      <View style={styles.subCateListMainViewStoreProducts}>
        <FlatList
          bounces={false}
          testID={"SelectedStoreProducts_data_flatlist_list"}
          data={storeProducts}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            !this.state.loading ? (
              <View style={styles.listEmptyContainerStoreProducts}>
                <Text style={styles.listEmptyContainerTitleTextStoreProducts}>
                  {this.state.storeProductsSearchText ? `'${i18n.t('noProductfoundNamed')}' '${this.state.storeProductsSearchText}'` : i18n.t('productNotFound')}
                </Text>
                <Text style={[{ fontSize: windowWidth * 4 / 100, color: '#75838D' }, styles.noAssignstoreTextStoreProducts]}>
                  {this.state.storeProductsSearchText ? `'${i18n.t('thereAreNoProduct')}' '${this.state.storeProductsSearchText}'` : i18n.t('pleaseCreateProduct')}
                </Text>
              </View>
            ) : null
          )}
          renderItem={this.renderItemStoreProducts}
          keyExtractor={(item, index) => index.toString()}
        />

        {storeProducts.length > 0 &&
          <>
            {this.state.selectedItem.length > 0 ?
              <TouchableOpacity
                testID="btnConfirm"
                style={styles.nextButtonAddproductsStoreProducts}
                onPress={this.selectProductFunction}
              >
                <Text style={styles.nextButtonTextStoreProducts}>{i18n.t('confirm')}</Text>
              </TouchableOpacity>
              :
              <View
                style={styles.viewNextButtonAddproductsStoreProducts}
              >
                <Text style={[styles.nextButtonTextStoreProducts, {color: '#9ba8bf'}]}>{i18n.t('confirm')}</Text>
              </View>
            }
          </>
        }
      </View>
    </View>)
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.storeContainer}>
        <View style={styles.containerStoreProducts}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

            {this.state.loading && <CustomLoader />}
            <View style={styles.viewContainerAssignStoreStoreProducts}>

                <View style={[styles.headerViewMaStoreProductsStoreStoreProducts,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackProductstore" style={styles.backTouchAssignstoreStoreProducts}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstoreStoreProducts,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAssignstoreStoreProducts}>{i18n.t('selectStoreProduct')}</Text>
                    </View>
                    <TouchableOpacity style={styles.filterIconTouchStoreProducts}>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {this.renderStoreProductsItem()}
                </View>
            </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.deleteModal}>
          <View style={styles.modalMainViewDelete}>
            <SafeAreaView style={styles.modalSafeDelete}></SafeAreaView>
            <View style={styles.cameraModalMainViewAddDelete}>
              <View style={styles.parentView}>

                <View style={styles.lineViewObj}></View>

                <View style={styles.modalHeaderView}>
                  <Text style={styles.modalTitleText}>{i18n.t('deleteProduct')}</Text>
                </View>

                <View style={styles.modalDecView}>
                  <Text style={styles.modalDecText}>{i18n.t('allSelectedProduct')}</Text>

                  <Text style={[styles.modalDecText, {marginTop: 8 }]}>{i18n.t('wantToDelete')}</Text>
                </View>

                <View style={styles.modalBtnBgView}>
                  <TouchableOpacity testID="btndeleteModal" style={styles.deleteBtn}
                  onPress={this.deleteProducts}
                  >
                    <Text style={styles.deleteBtnText}>{i18n.t('deleteTextBtn')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity testID="btnCanceldeleteModal" style={styles.cancelBtn} onPress={() => { this.setState({ deleteModal: false }) }}>
                    <Text style={styles.cancelBtnText}>{i18n.t('cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  storeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerStoreProducts: {
    flex: 1,
  }, 
  headerViewMaStoreProductsStoreStoreProducts: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center'
},
viewContainerAssignStoreStoreProducts: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchAssignstoreStoreProducts: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchStoreProducts: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconCssAssignstoreStoreProducts: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleAssignstoreStoreProducts: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
}, 
addProductButtonStoreProducts: {
  backgroundColor: "#CCBEB1",
  width: '48%',
  height: (windowHeight * 6.5) / 100,
  borderRadius: 2,
  marginTop: (windowWidth * 4) / 100,
  justifyContent: "center"
},
addProductButtonTextStoreProducts: {
  color: "#fff",
  textAlign: "center",
  fontFamily: "Lato-Bold",
  fontSize: (windowWidth * 5) / 100,
  fontWeight: "800"
},



marginCategoryManageStoreProducts: {
  flex: 1,
  marginTop: windowWidth * 4 / 100
},


subCateListMainViewStoreProducts: {
  flex: 1,
  width: windowWidth * 100 / 100,
  alignSelf: 'center',
},


noAssignstoreTextStoreProducts: {
  fontFamily: 'Lato-Regular',
  fontWeight: '500'
},
listEmptyContainerStoreProducts: {
  width: windowWidth * 90 / 100,
  alignSelf: 'center',
  alignItems: 'center',
  marginTop: "60%",
  justifyContent: "center"
},
emptyContainerViewStoreProducts: {
  flex: 1,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: "center"
},

listEmptyContainerTitleTextStoreProducts: {
  fontSize: windowWidth * 5 / 100,
  fontFamily: 'Avenir-Heavy',
  color: '#375280'
},
shopMainViewContainerStoreProducts: {
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 3,
  width: windowWidth * 90 / 100,
  alignSelf: 'center',
},
searchIconCssStoreProducts: {
  position: 'absolute',
  width: windowWidth * 5 / 100,
  height: windowWidth * 5 / 100,
  marginTop: windowWidth * 2.8 / 100,
  left: windowWidth * 3 / 100
},
searchTextinputStoreProducts: {
  marginLeft: windowWidth * 7 / 100,
  width: windowWidth * 80 / 100,
  height: windowHeight * 6 / 100,
  padding: 10,
  color: '#375280'
},
checkBoxImageStoreProducts: {
  width: Scale(22),
  height: Scale(22),

},
selectAllContainerStoreProducts: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: Scale(20)
},
selectAllItemTextStoreProducts: {
  fontFamily: "Lato-Regular",
  color: "#375280",
  fontSize: Scale(16),
  lineHeight: Scale(24),
  fontWeight: "600",
},
renderContainerStoreProducts: {
  flexDirection: 'row',
  justifyContent: 'space-between',

  alignItems: "center"
},
renderSubLeftContainerStoreProducts: {
  flexDirection: "row",
  flex: 2,
}
, renderItemTextStoreProducts: {
  marginLeft: Scale(15),
  fontFamily: "Lato-Regular",
  color: "#375280",
  fontSize: Scale(18),
  lineHeight: Scale(24),
  fontWeight: "600",
  marginTop: 3
},
renderItemImageStoreProducts: {
  height: Scale(32),
  width: Scale(32),
  borderRadius: Scale(16)
},
seperatorStoreProducts: {
  height: 1,
  backgroundColor: "#D9D9D9",
  opacity: 1,
  marginVertical: Scale(22)
},
buttonsContainerAddProductsStoreProducts: {

  marginTop: Scale(40),
  flexDirection: "row",
  justifyContent: "space-between",
  bottom: 20,
  alignItems: "center",



},
backButtonAddProductsStoreProducts: {
  width: "48%",
  backgroundColor: "#fff",
  height: (windowHeight * 6.5) / 100,

  borderRadius: 2,
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#CCBEB1",
},
backTextStoreProducts: {
  color: "#375280",
  textAlign: "center",
  fontFamily: "Lato-Regular",
  fontSize: (windowWidth * 5) / 100,
  fontWeight: "500",
},
nextButtonAddproductsStoreProducts: {
  backgroundColor: "#CCBEB1",
  height: (windowHeight * 6.5) / 100,
  width: responsiveWidth(90),
  borderRadius: 2,
  justifyContent: "center",
  marginBottom: 12,
  marginLeft: responsiveWidth(5),
  marginTop: 21
},
viewNextButtonAddproductsStoreProducts: {
  backgroundColor: "white",
  height: (windowHeight * 6.5) / 100,
  width: responsiveWidth(90),
  borderRadius: 2,
  justifyContent: "center",
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#CCBEB1",
  marginLeft: responsiveWidth(5),
  marginTop: 21
},
nextButtonTextStoreProducts: {
  color: "#fff",
  textAlign: "center",
  fontFamily: "Lato-Bold",
  fontSize: (windowWidth * 5) / 100,
  fontWeight: "800",
},
errorMsgContainerStoreProducts: {
  width: (windowWidth * 90) / 100,
  height: (windowHeight * 8) / 100,
  marginTop: (windowWidth * 4) / 100,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: "center",
  borderColor: 'rgba(220, 38, 38, 0.30)',
  backgroundColor: 'rgba(254, 226, 226, 0.30)',
  borderWidth: 1,
  borderRadius: 4,
  paddingHorizontal: Scale(15),
},
errorIconStoreProducts: {
  marginRight: 10,
  width: Scale(27),
  height: Scale(27),
  backgroundColor: "white"
},
errorTextContainerStoreProducts: {
  flex: 1,
  marginLeft: Scale(5)
},
errorHeadingStoreProducts: {
  lineHeight: 24,
  fontSize: Scale(16),
  fontWeight: "700",
  color: "#DC2626",
  fontFamily: "Lato",
},
errorDescriptionStoreProducts: {
  fontSize: Scale(16),
  fontWeight: "400",
  color: "#DC2626",
  fontFamily: "Lato",
  lineHeight: 24,
},


variantContainerStoreProdcts: {
  flexDirection: 'row',
},
VarientSubcontainerStoreProdcts: {
  flex: 1,
},
headerContainerStoreProdcts: {

  justifyContent: 'space-between',
  alignItems: 'center',
},
blockSubTitleStoreProdcts: {
  fontFamily: 'Lato-Regular',
  fontSize: Scale(14),
  fontWeight: '700',
  color: '#375280',
  marginBottom: 12,
},

variantBodyContainerStoreProducts: {
 width:"90%",
 alignSelf:"center"
  // paddingHorizontal: responsiveWidth(5)
},
numberingsStoreProducts: {
  fontFamily: 'Lato-Regular',
  fontSize: Scale(14),
  color: '#375280',
},

modalMainViewDelete:{
  flex: 1, 
  backgroundColor: '#00000030', 
  alignItems: 'center'
},
cameraModalMainViewAddDelete:{
  position: 'absolute', 
  bottom:0,
  width:windowWidth
},
modalSafeDelete:{
  flex:0
},
parentView: { backgroundColor: '#fff', width: '100%', alignSelf: 'center', height: windowHeight * 44 / 100 },
lineViewObj: { borderWidth: 2, borderColor: '#F2F3F5', width: windowWidth * 20 / 100, alignSelf: 'center', marginTop: windowWidth * 3 / 100 },
modalHeaderView: { borderBottomWidth: 1, borderBottomColor: '#E3E4E5', height: windowHeight * 6 / 100, marginTop: windowWidth * 5 / 100 },
modalTitleText: { textAlign: 'center', fontSize: windowWidth * 5.5 / 100, color: '#375280', fontFamily: 'Lato-Bold', },
modalDecView: { borderBottomWidth: 1, borderBottomColor: '#E3E4E5', height: windowHeight * 18 / 100, marginTop: windowWidth * 5 / 100, padding: 5, alignSelf: 'center', width: windowWidth },
modalDecText: { textAlign: 'center', color: '#375280', fontSize: windowWidth * 4.2 / 100, fontFamily: 'Lato-Regular', width: windowWidth * 90 / 100, alignSelf: 'center', lineHeight: 26 },
modalBtnBgView:{ width: windowWidth * 90 / 100, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', bottom: 24, position: 'absolute' },
deleteBtn: { width: windowWidth * 42 / 100, backgroundColor: '#F87171', height: windowHeight * 5.5 / 100, alignItems: 'center', justifyContent: 'center' },
deleteBtnText: { color: '#ffffff', textAlign: 'center', fontSize: windowWidth * 4.5 / 100, fontFamily: 'Lato-Bold' },
cancelBtn: { width: windowWidth * 42 / 100, backgroundColor: '#ffffff', height: windowHeight * 5.5 / 100, alignItems: 'center', justifyContent: 'center', borderColor: '#CCBEB1', borderWidth: 1 },
cancelBtnText: { color: '#375280', textAlign: 'center', fontSize: windowWidth * 4.5 / 100, fontFamily: 'Lato-Bold' }, 
chkboxStyle:{
  marginLeft:5
}
});
// Customizable Area End
