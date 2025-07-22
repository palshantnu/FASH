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
import { backIcon, search, selectedCheckBox, unSelectedCheckBox, errorIcon } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import {
  CatalogueItem
} from "../../productdescription3/src/response";

import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import AssignStoresController, {
  Props,
} from "./AssignStoresController";

// Customizable Area End

export default class AssignStores extends AssignStoresController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }


  // Customizable Area Start
  renderItemInAssign = ({ item }: { item: CatalogueItem }) => {
    const { store_name, image } = item.attributes;
    const isSelected = this.state.selectedItem.includes(item.id);
    return (
      <View>
        <View style={[styles.renderContainerInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <View style={[styles.renderSubLeftContainerInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <Image style={styles.renderItemImageInAssign} source={ImageNotFound(image)} />
            <Text style={styles.renderItemTextInAssign}>{store_name}</Text>
          </View>
          <TouchableOpacity testID="selectCheckBox" onPress={() => this.toggleItemSelectionInAssign(item.id)}>
            <Image
              style={styles.checkBoxImageInAssign}
              source={isSelected ? selectedCheckBox : unSelectedCheckBox}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.seperatorInAssign} />
      </View>
    );
  };




  renderAssignStoreItemInAssign = () => {
    const { errorMsg, assignStoreSearchText, assignStore, isSelectAll } = this.state
    return (<View style={styles.marginCategoryManageInAssign}>
      <View style={[styles.shopMainViewContainerInAssign, {flexDirection:FlexConditionManage(i18n.language), marginTop: windowWidth * 3 / 100 }]}>
        <View style={styles.searchIconCssInAssign}>
          <Image source={search} style={[styles.backIconCssInAssignstore, {marginTop: 4}]}></Image>
        </View>
        <View>
          <TextInput
            testID={"searchInputBox"}
            onChangeText={this.updateTheSearchTextInAssign}
            keyboardType="default"
            maxLength={30}
            returnKeyLabel="done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              this.searchAssignStoreInAssign()
            }}
            placeholder={i18n.t('searchStore')}
            placeholderTextColor="#9A9A9A"
            style={[styles.searchTextinputInAssign]}
            value={assignStoreSearchText}
          />
        </View>
      </View>
      {errorMsg.errorHeader.length > 1 && <View style={styles.errorMsgContainerInAssignStore}>
        <Image source={errorIcon} style={styles.errorIconInAssignStore} />
        <View style={styles.errorTextContainerInAssignStore}>
          <Text style={styles.errorHeadingInAssignStore}>{errorMsg.errorHeader}</Text>
          <Text style={styles.errorDescriptionInAssignStore}>{errorMsg.errorTitle}</Text>
        </View>
      </View>}
      {assignStore.length > 0 && <View style={[styles.selectAllContainerInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
        <Text style={styles.selectAllItemTextInAssign}>{i18n.t('selectAllStore')} ({this.state.assignStore.length})</Text>
        <TouchableOpacity testID="allBtnCheckBox" onPress={this.toggleSelectAllInAssign}>
          <Image
            style={styles.checkBoxImageInAssign}
            source={isSelectAll ? selectedCheckBox : unSelectedCheckBox}
          />
        </TouchableOpacity>
      </View>
      }

      <View style={styles.subCateListMainViewInAssign}>
        <FlatList
          bounces={false}
          testID={"Assignstores_data_flatlist_list"}
          data={assignStore}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            !this.state.loading ? (
              <View style={styles.listEmptyContainerInAssign}>
                <Text style={styles.listEmptyContainerTitleTextInAssign}>
                  {this.state.assignStoreSearchText ? `'${i18n.t('noProductfoundNamed')}' '${this.state.assignStoreSearchText}'` : i18n.t('productNotFound')}
                </Text>
                <Text style={[{ fontSize: windowWidth * 4 / 100, color: '#75838D' }, styles.noAssignstoreTextInAssign]}>
                  {this.state.assignStoreSearchText ? `'${i18n.t('thereAreNoProduct')}' '${this.state.assignStoreSearchText}'` : i18n.t('pleaseCreateProduct')}
                </Text>
              </View>
            ) : null
          )}
          renderItem={this.renderItemInAssign}
          keyExtractor={(item, index) => index.toString()}
        />

          <TouchableOpacity
            testID="btnConfirm"
            style={styles.nextButtonAddproductsInAssign}
            onPress={this.assignStoresFunction}
          >
            <Text style={styles.nextButtonTextInAssign}>{i18n.t('assignStore')}</Text>
          </TouchableOpacity>
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
            <View style={styles.viewContainerInAssignStore}>

                <View style={[styles.headerViewMainInAssignStore,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchInAssignstore}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssInAssignstore,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleInAssignstore}>{i18n.t('assignStore')}</Text>
                    </View>
                    <View style={styles.backTouchInAssignstore} />
                </View>

                <View style={{ flex: 1 }}>
                    {this.renderAssignStoreItemInAssign()}
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
headerViewMainInAssignStore: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center'
},
viewContainerInAssignStore: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchInAssignstore: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconCssInAssignstore: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleInAssignstore: {
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
    alignSelf: 'center'
},


noAssignstoreTextInAssign: {
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
emptyContainerViewInAssign: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "center"
},

listEmptyContainerTitleTextInAssign: {
    fontSize: windowWidth * 5 / 100,
    fontFamily: 'Avenir-Heavy',
    color: '#375280'
},
shopMainViewContainerInAssign: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 3,
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
},
searchIconCssInAssign: {
    position: 'absolute',
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
    marginTop: windowWidth * 2.8 / 100,
    left: windowWidth * 3 / 100
},
searchTextinputInAssign: {
    marginLeft:60,
    width: windowWidth * 80 / 100,
    height: windowHeight * 6 / 100,
    padding: 10,
    color: '#375280',
    right:30

},




checkBoxImageInAssign: {
    width: Scale(22),
    height: Scale(22),

},
selectAllContainerInAssign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Scale(20)
},
selectAllItemTextInAssign: {
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(16),
    lineHeight: Scale(24),
    fontWeight: "600",
},
renderContainerInAssign: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: "center"
},
renderSubLeftContainerInAssign: {
    flexDirection: "row",
    flex: 2,
}
, renderItemTextInAssign: {
    marginLeft: Scale(15),
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontSize: Scale(18),
    lineHeight: Scale(24),
    fontWeight: "600",
    marginTop: 3,
    marginRight:10
},
renderItemImageInAssign: {
    height: Scale(32),
    width: Scale(32),
    borderRadius: Scale(16)
},
seperatorInAssign: {
    height: 1,
    backgroundColor: "#D9D9D9",
    opacity: 1,
    marginVertical: Scale(22)
},
buttonsContainerAddProductsInAssign: {

    marginTop: Scale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    alignItems: "center",



},
backButtonAddProductsInAssign: {
    width: "48%",
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,

    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCBEB1",
},
backTextInAssign: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500",
},
nextButtonAddproductsInAssign: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: "100%",
    borderRadius: 2,
    justifyContent: "center",
    marginBottom: 12
},
nextButtonTextInAssign: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
},
errorMsgContainerInAssignStore: {
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
errorIconInAssignStore: {
    marginRight: 10,
    width: Scale(27),
    height: Scale(27),
    backgroundColor: "white"
},
errorTextContainerInAssignStore: {
    flex: 1,
    marginLeft: Scale(5)
},
errorHeadingInAssignStore: {
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#DC2626",
    fontFamily: "Lato",
},
errorDescriptionInAssignStore: {
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
},
});
// Customizable Area End
