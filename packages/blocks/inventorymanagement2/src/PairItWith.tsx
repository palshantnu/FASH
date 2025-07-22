import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
  TextInput,
  Keyboard
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, search,  errorIcon ,filtern} from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'


import PairItWithController, {
  Props,InventoryItem
} from "./PairItWithController";

// Customizable Area End

export default class PairItWith extends PairItWithController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }


  // Customizable Area Start
  renderItemInAssign = ({ item }: { item: InventoryItem }) => {
    const {product_name,sku,front_image}=item.attributes
    return (
        <TouchableOpacity testID="varinatItem" style={[styles.renderContainerInAssign,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={()=>this.navigationToPairItWithDescription(item)}>
        <Image style={styles.renderItemImageInAssign} source={ImageNotFound(front_image)} />
        <View style={[styles.renderItemRightContainer,{marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,undefined)}]}>
            <Text style={styles.renderItemTextInAssign}>{product_name}</Text>
            <Text style={styles.renderItemTextInAssignSubText}>{i18n.t('sku')} - {sku}</Text>
        </View>
        </TouchableOpacity>
    );
  };




  renderPairItWithItemInAssign = () => {
    const { errorMsg, PairItWithearchText, PairItWithList } = this.state
    return (<View style={styles.marginCategoryManageInAssign}>
      <View style={[styles.shopMainViewContainerInAssign, { marginTop: windowWidth * 3 / 100,flexDirection:FlexConditionManage(i18n.language) }]}>
        <View style={styles.searchIconCssInAssign}>
          <Image source={search} style={[styles.backIconCssPairItWithInAssign, {marginTop: 4,marginLeft:ManageDynamicMargin(i18n.language,10,undefined)}]}></Image>
        </View>
        <View >
          <TextInput
            testID={"searchInputBox"}
            onChangeText={this.updateTheSearchTextInAssign}
            keyboardType="default"
            maxLength={30}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              this.searchPairItWithInAssign()
            }}
            placeholder={i18n.t('searchForProduct')}
            placeholderTextColor="#94A3B8"
            style={[styles.searchTextinputInAssign]}
            value={PairItWithearchText}
          />

          
        </View>
      </View>
      {errorMsg.errorHeader.length > 1 && <View style={styles.errorMsgContainerInAssign}>
        <Image source={errorIcon} style={styles.errorIconInAssign} />
        <View style={styles.errorTextContainerInAssign}>
          <Text style={styles.errorHeadingInAssign}>{errorMsg.errorHeader}</Text>
          <Text style={styles.errorDescriptionInAssign}>{errorMsg.errorTitle}</Text>
        </View>
      </View>}
   
    

      <View style={styles.subCateListMainViewInAssign}>
        <FlatList
          bounces={false}
          testID={"PairItWith_data_flatlist_list"}
          data={PairItWithList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            !this.state.loading ? (
              <View style={styles.listEmptyContainerInAssign}>
                <Text style={styles.listEmptyContainerTitleTextInAssign}>
                  {this.state.PairItWithearchText ? `'${i18n.t('noVariantFoundNamed')}' '${this.state.PairItWithearchText}'` : i18n.t('noVariantFound')}
                </Text>
                <Text style={[{ fontSize: windowWidth * 4 / 100, color: '#75838D' }, styles.noPairItWithTextInAssign]}>
                  {this.state.PairItWithearchText ? `'${i18n.t('thereAreNoVariant')}' '${this.state.PairItWithearchText}'` : i18n.t('pleaseCreateVariant')}
                </Text>
              </View>
            ) : null
          )}
          renderItem={this.renderItemInAssign}
          keyExtractor={(item, index) => index.toString()}
        />

         
      </View>
    </View>)
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.safeContainerInAssign}>
        <View style={styles.containerInAssign}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

            {this.state.loading && <CustomLoader />}
            <View style={styles.viewContainerPairItWithInAssign}>

                <View style={[styles.headerViewMainPairItWithInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackPairItWith" style={styles.backTouchPairItWithInAssign}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssPairItWithInAssign,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitlePairItWithInAssign}>{i18n.t('pairItWith')}</Text>
                    </View>
                    <TouchableOpacity style={styles.filterIconTouchInAssign} disabled>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {this.renderPairItWithItemInAssign()}
                </View>
            </View>
        </View>
     </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerInAssign: {
    flex: 1,


},
safeContainerInAssign: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',

},
headerViewMainPairItWithInAssign: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center',

},
viewContainerPairItWithInAssign: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchPairItWithInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssign: {
   
  
},
backIconCssPairItWithInAssign: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
filterIcon: {
  width: windowWidth * 7 / 100,
  height: windowWidth * 7 / 100,
},
headerTitlePairItWithInAssign: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
},





marginCategoryManageInAssign: {
    flex: 1,
    marginTop: windowWidth * 4 / 100
},


subCateListMainViewInAssign: {
    flex: 1,

    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    marginTop:8
},


noPairItWithTextInAssign: {
    fontFamily: 'Lato-Regular',
    fontWeight: '500'
},
listEmptyContainerInAssign: {
    flex: 1,
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: "70%",
    justifyContent: "center"
},


listEmptyContainerTitleTextInAssign: {
    fontSize: windowWidth * 5 / 100,
    fontFamily: 'Avenir-Heavy',
    color: '#375280'
},
shopMainViewContainerInAssign: {
    
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 3,
    width: windowWidth * 90 / 100,
    // alignSelf: 'center',
    justifyContent:"space-between"
},
searchIconCssInAssign: {
    // position: 'absolute',
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
    marginTop: windowWidth * 2.8 / 100,
    left: windowWidth * 5 / 100,
    // borderWidth:1
},
searchTextinputInAssign: {
    marginLeft: windowWidth * 5 / 100,
    width: windowWidth * 75 / 100,
    height: windowHeight * 6 / 100,
    // padding: 10,
    color: '#375280',
},

renderContainerInAssign: {
    marginTop:Scale(20),
},

renderItemRightContainer:{
marginLeft:Scale(10),
}
, renderItemTextInAssign: {
   
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    lineHeight: Scale(24),
    fontWeight: "600",
    marginTop: 3,
    width: "80%"
},
renderItemTextInAssignSubText:{

    fontFamily: "Lato-Bold",
    color: "#375280",
    fontSize: Scale(12),
    lineHeight: Scale(24),
    fontWeight: "700",
    marginTop: 3
},
renderItemImageInAssign: {
    height: Scale(82),
    width: Scale(79),
    borderRadius: Scale(2)
},






errorMsgContainerInAssign: {
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
errorIconInAssign: {
    marginRight: 10,
    width: Scale(27),
    height: Scale(27),
    backgroundColor: "white"
},
errorTextContainerInAssign: {
    flex: 1,
    marginLeft: Scale(5)
},
errorHeadingInAssign: {
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#DC2626",
    fontFamily: "Lato",
},
errorDescriptionInAssign: {
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
},
});
// Customizable Area End
