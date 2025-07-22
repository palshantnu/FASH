import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import NavigateTo from "../../../components/src/NavigateTo";
import {  cancel,backIcon,rightArrow } from "./assets";
import { StatsResponse } from "./response";
import ImageReverseManage from '../../../components/src/ImageReverseManage'

const windowWidth = Dimensions.get("window").width;
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
const { width } = Dimensions.get("window");
// Customizable Area End

import Inventorymanagement2Controller, {
  Props,
  configJSON,
} from "./Inventorymanagement2Controller";

export default class Inventorymanagement2 extends Inventorymanagement2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  stats = [
    {
      title: i18n.t('totalProduct'),
      onPress: () => {},
    },
    {
      title: i18n.t('outOfStock'),
      onPress: () => {},
    },
    {
      title: i18n.t('lowStock'),
      onPress: () => {},
    },
    {
      title: i18n.t('unlist'),
      onPress: () => {},
    },
  ];

  statBox = ({
    title,
    count,
    onPress,
    testID,
  }: {
    title: string;
    count: string;
    onPress?: () => unknown;
    testID?: string;
  }) => (
    <Pressable onPress={onPress} testID={testID}>
      <View style={styles.box}>
        <View style={[styles.row,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <Text style={styles.headTxt}>{title}</Text>
          <Image source={rightArrow} style={[styles.arrow,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]} />
        </View>
        <Text style={styles.descTxt}>{count}</Text>
      </View>
    </Pressable>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    if (!this.state.stats && this.state.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <CustomLoader />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.headerViewMainAssignStoreInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <TouchableOpacity testID="btn-navigation-left" style={styles.backTouchAssignstoreInAssign}
                  onPress={() => { this.props.navigation.goBack() }}
                >
                          <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstoreInAssign,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                </TouchableOpacity>
                  <View>
                      <Text style={styles.headerTitleAssignstoreInAssign}>{i18n.t('inventoryMangement')}</Text>
                    </View>
                    <TouchableOpacity style={styles.filterIconTouchInAssign}>

                </TouchableOpacity>
          </View>
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.boxes,{flexDirection:FlexConditionManage(i18n.language)}]}>
            {Object.keys(this.state.stats!).map((key, index) => (
              <this.statBox
                count={String(this.state.stats![key as keyof StatsResponse])}
                title={this.stats[index].title}
                onPress={this.stats[index].onPress}
                key={`stat-${key}`}
              />
            ))}
          </View>
          <View style={styles.menu} testID="buttonsLoad">
            {this.menu.map((item, index) => (
              <NavigateTo
                key={`menu-${index}`}
                showBottomBorder={index < this.menu.length - 1}
                {...item}
              />
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          testID="modal"
          transparent={true}
          visible={this.state.bulkActionModal}
          statusBarTranslucent
          onRequestClose={() =>
            this.setState({ bulkActionModal: !this.state.bulkActionModal })
          }
        >
          <TouchableOpacity
            testID="popupCloseBtn"
            style={styles.centeredViewBulkAction}
            onPress={() =>
              this.setState({ bulkActionModal: !this.state.bulkActionModal })
            }
          >
            <View style={styles.modalViewBulkAction}>
              <View style={styles.lineView} />

              <TouchableOpacity
                testID="cancelBtn"
                onPress={() =>
                  this.setState({
                    bulkActionModal: !this.state.bulkActionModal,
                  })
                }
                style={styles.crossContainerBulkAction}
              >
                <Image style={styles.crossIconBulkAction} source={cancel} />
              </TouchableOpacity>
              <View style={styles.modalTextContainerBulkAction}>
                <Text style={styles.modalTextBulkAction}>
                  {i18n.t('selectBulkAction')}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  testID="updateBtn"
                  style={styles.textStyleContainerBulkAction}
                  onPress={() =>
                    this.goToCSVPage(i18n.t('updateInventory'), i18n.t('updateProduct'))
                  }
                >
                  <Text style={styles.textStyleBulkAction}>
                  {i18n.t('updateInventory')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="assignBtn"
                  style={styles.textStyleContainerBulkAction}
                  onPress={() =>
                    this.goToCSVPage(i18n.t('assignStore'), i18n.t('updateProduct'))
                  }
                >
                  <Text style={styles.textStyleBulkAction}>{i18n.t('assignStore')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="addBtn"
                  style={styles.textStyleContainerBulkAction}
                  onPress={() =>
                    this.goToCSVPage(i18n.t('addProduct'), i18n.t('updateProduct'))
                  }
                >
                  <Text style={styles.textStyleBulkAction}>{i18n.t('addProduct')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="editBtn"
                  style={styles.textStyleContainerBulkAction}
                  onPress={() =>
                    this.goToCSVPage(i18n.t('editProduct'), i18n.t('updateProduct'))
                  }
                >
                  <Text style={styles.textStyleBulkAction}>{i18n.t('editProduct')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="deleteBtn"
                  style={[
                    styles.textStyleContainerBulkAction,
                    { borderBottomWidth: 0 },
                  ]}
                  onPress={this.goToSelectStorePage}
                >
                  <Text
                    style={[styles.textStyleBulkAction, { color: "#DC2626" }]}
                  >
                    {i18n.t('deleteProduct')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerViewMainAssignStoreInAssign: {
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
filterIconTouchInAssign: {
  width: windowWidth * 6 / 100,
  height: windowWidth * 6 / 100
},
backIconCssAssignstoreInAssign: {
  width: windowWidth * 5 / 100,
  height: windowWidth * 5 / 100,
},
backTouchAssignstoreInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
headerTitleAssignstoreInAssign: {
  color: '#375280',
  fontSize: windowWidth * 5 / 100,
  textAlign: 'center',
  fontFamily: 'Avenir-Heavy'
},
  boxes: {
    flexWrap: "wrap",
    width,
    padding: Scale(10),
    flexDirection: "row",
  },
  box: {
    margin: Scale(10),
    width: (width - Scale(60)) / 2,
    height: Scale(90),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(3),
  },
  row: {
    
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Scale(12),
  },
  arrow: {
    height: Scale(16),
    width: Scale(16),
    transform: i18n.language === 'ar'? [{ rotate: "0deg" }]:[{ rotate: "180deg" }],
  },
  headTxt: {
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: Scale(2),
  },
  descTxt: {
    fontFamily: "Lato",
    color: "#375280",
    fontSize: 24,
    fontWeight: "700",
    marginTop: Scale(10),
  },
  menu: {
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(10),
  },
  centeredViewBulkAction: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalViewBulkAction: {
    backgroundColor: "white",
    paddingBottom: 5,
  },
  lineView: {
    borderBottomWidth: 2,
    borderBottomColor: "#E3E4E5",
    height: 4,
    marginTop: 4,
    alignSelf: "center",
    width: 60,
  },
  textStyleBulkAction: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(18),
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
  },
  textStyleContainerBulkAction: {
    borderBottomWidth: 2,
    marginHorizontal: 15,
    borderBottomColor: "#E3E4E5",
  },
  apiTextStyleContainerBulkAction: {
    marginHorizontal: 12,
  },
  crossContainerBulkAction: {
    alignItems: "flex-end",
    paddingRight: 8,
    marginTop: 4,
  },
  modalTextBulkAction: {
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontSize: 20,
    fontWeight: "800",
    color: "#375280",
  },
  modalTextContainerBulkAction: {
    paddingBottom: "5%",
    borderBottomWidth: 2,
    borderBottomColor: "#E3E4E5",
  },
  crossIconBulkAction: {
    width: Scale(25),
    height: Scale(25),
  },
});
// Customizable Area End
