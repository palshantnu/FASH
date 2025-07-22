import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { backIcon, cross1, toast,cancel,plus,heartWishlist } from "./assets";
import StylistCatalogueController, {
  Props,
} from "./StylistCatalogueController";
import ImageNotFound from "../../../components/src/ImageNotFound";
import {CatalogueItem} from "./CatalogueSellerController";
import Scale from "../../../components/src/Scale";
import FirstRoute from "../../../components/src/FirstRoute";
import ProductSourcingTabComp from "../../customform/src/ProductSourcingTabComp";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
import FlatListRowManage from "../../../components/src/FlatlistRowManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Customizable Area End

export default class StylistCatalogue extends StylistCatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  SecondRoute = () => <View style={{ flex: 1 }} testID="SecondRouteId"/>;
  ThirdRoute = () => <View style={{ flex: 1 }} testID="ThirdRouteId"/>;
 
  renderScene = ({ route } : any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute testID="FirstRouteId" data={this.state.getPlan} toggleModal={this.toggleModal} removeModal= {this.removeModal} getPlanForId={this.getPlanForId} getCurrency={this.state.updateLocalCurrency}/>;
      
        case 'second':
          return <ProductSourcingTabComp navigation={this.props.navigation} id={this.props.id}/>;
  
      case 'third':
          return this.state.isProductList
          ? this.catalougeListRender()
          :this.emptyCatalougeListRender();

      default:
        return null;
    }
  };
  
  catalougeListRender = () => {
    return (
      <View style={styles.marginCategoryManage}>
        <View style={styles.subCateListMainView}>
          <FlatList
            bounces={false}
            testID={"catalogue_show_flatlist_list"}
            data={this.state.catalougeList}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            contentContainerStyle={{ paddingBottom: (windowHeight * 30) / 100 , direction : FlatListRowManage(i18n.language)}}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
            numColumns={2}
            onEndReachedThreshold={1}
            onEndReached={() => this.getListRequest("more")}
            renderItem={(item) => this.getList(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  };
  emptyCatalougeListRender = () => {
    return (
      <View style={styles.noProductsContainer}>
        <Text style={styles.noProductText}>{i18n.t("noAddProduct")}</Text>
        <TouchableOpacity
          testID="btnNext"
          style={styles.addProductButton}
          onPress={() => {
            this.changeModelStatus()
          }}
        >
          <Text style={styles.addProductButtonText}>{`+ ${i18n.t("addProduct")}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTabBar = (props: any) => (
    <TabBar
      tabStyle={{ flex: 1 }}
      {...props}
      indicatorStyle={{ backgroundColor: "#375280", height: 2 }}
      style={[styles.tabStyle, {direction : FlatListRowManage(i18n.language)}]}
      labelStyle={styles.tablabel}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? '#375280' : '#94A3B8', ...styles.tablabel }}>
          {route.title}
        </Text>
      )}
    />
  );
  getList(item: ListRenderItemInfo<CatalogueItem>) {
    const type = item.item.type;

    if (type != "addProduct") {
      const value = item.item.attributes;
      return (
        <TouchableOpacity
          testID="btnCatalogueListRedirection"
          style={styles.subCateListViewMainTouch}
          onPress={() => this.redirectToProductdetails(item.item.id)}
        >
          <View>
            <Image
              source={ImageNotFound(value.primary_image)}
              style={styles.subCatalogueListViewImage}
            ></Image>
          </View>
           <View style={styles.subCatalogueHeartTouch}>
            <Image
              source={heartWishlist}
              style={styles.subCatalogueHeartIcon}
            ></Image>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.subCatalogueText}>
              {value.name}
            </Text>
            <Text numberOfLines={1} style={styles.subCatalogueDesText}>
              {value.description}
            </Text>
            <Text style={styles.subCatalogueListViewPriceText}>
              {PriceConvertValue(value.primary_price,this.state.updateLocalCurrency)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.flItem}
          testID="btnAddProducts"
          onPress={() => {
            this.changeModelStatus()
          }}
        >
          <View style={styles.addItem}>
            <Image source={plus} style={styles.plusIcon} />
            <Text style={styles.addStore}>{i18n.t("addNewProduct")}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={styles.container}>
          <View style={[styles.headerViewCate, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <TouchableOpacity
              testID="btnBackCatalogue"
              style={styles.backTouchCateCata}
              onPress={()=>this.handleBackPage() }
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCssN, {
                  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]
                }]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCatCata}>{i18n.t("catalogueText")}</Text>
            </View>
            <View style={styles.filterExtraViewTouch} />
          </View>
        </View>
        <View style={{ flex: 1}}
        onStartShouldSetResponder={() => true}
        onResponderStart={this.handleResponderStart}
        onResponderMove={this.handleResponderMove}
        onResponderRelease={this.handleResponderRelease}
        >
          <TabView
            style={{ backgroundColor: "white" }}
            navigationState={{
              index: this.state.index,
              routes: this.state.routes,
            }}
            renderScene={this.renderScene}
            onIndexChange={this.setIndex}
            initialLayout={this.state.layout}
            renderTabBar={this.renderTabBar}
            swipeEnabled={false}
            data-test-id="TabId"
          />
        </View>
        {this.state.deletePlan && this.state.showToast &&
          showMessage({
            message: i18n.t("deletePlanSuccessMsg"),
            position: { top: 0 },
          })}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisibleModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{ alignSelf: "flex-end", position: "absolute" }}
                onPress={this.toggleModal}
                testID="toggleId"
              >
                <Image source={cross1} style={styles.cross} />
              </TouchableOpacity>
              <Text style={styles.modalTxt}>{i18n.t("createPlans")}</Text>
              <View style={styles.line} />
              <View style={{ paddingHorizontal: 20 }}>
                {this.state.plan.map((planItem) => (
                  <View key={planItem.id}>
                    <TouchableOpacity
                      testID="WeeklyId"
                      activeOpacity={0.6}
                      onPress={() => this.handlePlanPress(planItem.id)}
                    >
                      <Text style={[styles.dummyTxt, { textAlign: TextAlignManage(i18n.language) }]}>{planItem.title}</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
            animationType="slide"
            testID="modal"
            transparent={true}
            visible={this.state.modalVisible}
            statusBarTranslucent
            onRequestClose={() =>
              this.setState({ modalVisible: !this.state.modalVisible })
            }
          >
            <TouchableOpacity
              testID="closeBtn"
              style={styles.centeredView}
              onPress={() =>
                this.changeModelStatus()
              }
            >
              <View style={styles.modalView}>
                <TouchableOpacity
                  testID="cancelBtn"
                  onPress={() =>
                    this.changeModelStatus()
                  }
                  style={styles.crossContainer}
                >
                  <Image style={styles.crossIcon} source={cancel} />
                </TouchableOpacity>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>{i18n.t("addProduct")}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    testID="manualBtn"
                    style={styles.textStyleContainer}
                    onPress={() => this.navigationHandler('AddProduct')}
                  >
                    <Text style={styles.textStyle}>{i18n.t("manually")}</Text>
                  </TouchableOpacity>
                  <View style={styles.textStyleContainer}>
                    <TouchableOpacity
                    testID="manualBtnCsv"
                      onPress={() => this.navigationHandler('CsvFileUpload')}
                    >
                      <Text style={styles.textStyle}>{i18n.t("excelSheet")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isRemoveModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTxt}>{i18n.t("deleteYourPlan")}</Text>
              <View style={styles.line} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.deleteTxt}>{i18n.t("deletePlanWarn")}</Text>
              </View>
              <View style={styles.line2} />
              {this.state.getPlan.map((item) => (
              item.id === this.state.selectedPlanId && (
                <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'center' }}>
                  <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7} onPress={() => this.deletePlanList(item.id)}>
                    <Text style={styles.deleteTitle}>{i18n.t("deleteTextBtn")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} onPress={()=> this.removeModal(item.id)} testID="removeToggleId">
                    <Text style={styles.cancelTitle}>{i18n.t("cancelText")}</Text>
                  </TouchableOpacity>
                </View>
              )
            ))}
            </View>
          </View>
        </Modal>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  dummyTxt: {
    fontWeight: "500",
    fontSize: Scale(18),
    color: "#375280",
  },
  modalTxt: {
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#375280",
    textAlign: "center",
  },
  cross: {
    width: Scale(40),
    height: Scale(40),
  },
  subCateListMainView: {
    marginTop: (windowWidth * 5) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
  subCatalogueListViewImage: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 20) / 100,
  },
  subCateListViewMainTouch: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 32) / 100,
  },
  subCateListViewMainAddProduct: {
    width: (windowWidth * 42) / 100,
    height: (windowHeight * 29.5) / 100,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  createPlan: {
    borderRadius: Scale(2),
    width: Scale(293),
    backgroundColor: "#CCBEB1",
    justifyContent: "center",
    alignItems: "center",
    minHeight: Scale(56),
    marginTop: Scale(20),
    flexDirection: "row",
  },
  deleteTxt:{
    fontSize: Scale(16),
    fontWeight: '400',
    textAlign: 'center',
    color: '#375280'
  },
  line: {
    borderWidth: 0.8,
    marginVertical: 20,
    borderColor: "#E3E4E5",
    width: "100%",
  },
  line2: {
    borderWidth: 0.8,
    marginTop: 20,
    borderColor: "#E3E4E5",
    width: "100%",
  },
  line1: {
    borderWidth: 0.8,
    marginVertical: 15,
    borderColor: "#E3E4E5",
   marginHorizontal: Scale(15)
  },
  toastContainer: {
    position: 'absolute',
    justifyContent : 'space-around',
    bottom: 15,
    width: Scale(340),
    height: Scale(58),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    fontSize: 16,
    color: '#375280',
    textAlign: 'right',
    fontWeight:'400',
  },
  txt: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 26,
    color: "#FFFFFF",
    marginLeft: Scale(5),
  },
  add: {
    height: Scale(24),
    width: Scale(24),
  },
  headerViewCate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchCateCata: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssN: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  first: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonStyle: {
    height: Scale(56),
    width: Scale(380),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    bottom: 20,
  },
  saveButtonText: {
    fontFamily: "Lato",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
  filterIconCssN: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerTitleCatCata: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterExtraViewTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },

  overlayView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: (windowHeight * 20) / 100,
  },
  textView: {
    position: "absolute",
    marginTop: (windowHeight * 8) / 100,
    alignSelf: "center",
  },
  dataContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 6) / 100,
  },
  categoryTouch: {
    width: (windowWidth * 43) / 100,
    height: (windowHeight * 21) / 100,
  },
  catalogeIcons: {
    width: (windowWidth * 43) / 100,
    height: (windowHeight * 20) / 100,
  },
  categoryText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: (windowWidth * 5) / 100,
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  tablabel: {
    textTransform: "capitalize",
    textAlign: "center",
    fontSize: (windowWidth * 3.1) / 100,
    fontWeight: "500",
  },
  tabStyle: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },
  listAmountTitle: {
    color: '#375280',
    fontWeight: '700',
    fontSize: 20
  },
  listPlanitle: {
    color: '#375280',
    fontWeight: '700',
    fontSize: Scale(20)
  },
  firstRoute:{
    marginHorizontal: 10,
    borderWidth : 1,
    borderColor : '#375280',
    marginTop : Scale(15),
    padding : Scale(10),
    borderRadius: 2

  },
  bulletlistTitle:{
    color: '#375280',
    fontSize : Scale(16),
    fontWeight : "500",
  },
  removebtn:{
    width: Scale(164),
    height: Scale(48), padding: 10, borderRadius: 2, borderColor: '#F87171', borderWidth : 0.5
  },
  deleteBtn:{
    width: Scale(182),
    height: Scale(54), padding: 10, borderRadius: 2, backgroundColor: '#F87171'
  },
  removeTitle : {
    fontSize : Scale(16),
    fontWeight : '500',
    color : '#F87171',
    textAlign : 'center',
  },
  deleteTitle : {
    fontSize : Scale(20),
    fontWeight : '700',
    color : '#FFFFFF',
    textAlign : 'center',
  },
  editBtn:{
    width: Scale(164),
    height: Scale(48), padding: 10, backgroundColor : '#CCBEB1',borderRadius : 2
  },
  cancelBtn:{
    width: Scale(182),
    height: Scale(54), padding: 10, borderColor : '#CCBEB1',borderRadius : 2, borderWidth: 1
  },
  editTitle:{
    fontSize : Scale(16),
    fontWeight : '500',
    textAlign : 'center',
    color : 'white',
    paddingTop: Scale(2)
  },
  cancelTitle:{
    fontSize : Scale(20),
    fontWeight : '500',
    textAlign : 'center',
    color : '#375280',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 5, // This makes the view a circle
    backgroundColor: '#375280', // Custom color for the bullet
    marginRight: 10,
  },
  addProductButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
  noProductText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    textAlign: "center",
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  addProductButton: {
    backgroundColor: "#CCBEB1",
    width: "70%",
    height: (windowHeight * 7.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    paddingBottom: 5,
  },
  subCatalogueListViewPriceText: {
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    textAlign: "left",
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  textStyle: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
  },
  textStyleContainer: {
    borderBottomWidth: 2,
    marginHorizontal: 15,
    borderBottomColor: "#E3E4E5",
  },
  apiTextStyleContainer: {
    marginHorizontal: 12,
  },
  crossContainer: {
    alignItems: "flex-end",
    paddingRight: 8,
    paddingTop: 5,
  },
  modalText: {
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    fontWeight: "800",
    color: "#375280",
  },
  modalTextContainer: {
    paddingBottom: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "#E3E4E5",
  },
  crossIcon: {
    width: Scale(25),
    height: Scale(25),
  },

  marginCategoryManage: {
    marginTop: (windowWidth * 4) / 100,
  },
  subCatalogueHeartTouch: {
    position: "absolute",
    right: 5,
    top: 5,
    opacity:0
  },
  subCatalogueHeartIcon: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  subCatePriceText: {
    alignItems: "flex-start",
    color: "#375280",
    fontSize: (windowWidth * 4.5) / 100,
    marginTop: (windowWidth * 5) / 100,
    fontFamily: "lato-Bold",
  },
  subCatalogueText: {
    fontSize: (windowWidth * 4.2) / 100,
    marginTop: (windowWidth * 2) / 100,
    textAlign: "left",
    color: "#375280",
    fontFamily: "Lato-Bold",
  },
  subCatalogueDesText: {
    fontSize: (windowWidth * 3.5) / 100,
    marginTop: (windowWidth * 2) / 100,
    textAlign: "left",
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  flItem: {
    width: (windowWidth - Scale(60)) / 2,
    height: (windowHeight * 29.6) / 100,
    justifyContent: "space-between",
  },
  addItem: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: Scale(220),
  },
  plusIcon: {
    height: Scale(48),
    width: Scale(48),
  },
  addStore: {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 16,
    marginVertical: Scale(10),
    color: "#375280",
  },
});
// Customizable Area End
