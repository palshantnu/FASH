import React from "react";

// Customizable Area Start
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import { backIcon } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";

const { width } = Dimensions.get("window");
// Customizable Area End

import UpdateInventoryFilterController, {
  Props,
  configJSON,
} from "./UpdateInventoryFilterController";

export default class UpdateInventoryFilter extends UpdateInventoryFilterController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={[styles.container, styles.sb]} testID="filterScreen">
        <View>
          
          <View style={[styles.headerViewMainAssignStoreInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="goBack" style={[styles.backTouchAssignstoreInAssign,{marginRight: i18n.language ? 20:0}]}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignFilter,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAssignFilter}>{i18n.t('filter')}</Text>
                    </View>
                    <TouchableOpacity style={styles.filterIconTouchInAssignInventory} onPress={()=>this.clearAllFilters()}>
                    <Text style={styles.filterClearText}>{i18n.t('clearAll')}</Text>
                    </TouchableOpacity>
                </View>
          <View style={styles.filters}>
            <FlatList
              data={this.filters}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View style={[styles.filterRow,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Text style={styles.filterText}>{item.title}</Text>
                  <CheckBox
                    testID={item.key}
                    value={this.state.filters[item.key]}
                    onChange={this.handleFilter(item.key)}
                    boxType="square"
                    tintColor="#FFFFFF"
                    onCheckColor="#FFFFFF"
                    onFillColor="#CCBEB1"
                    onTintColor="#FFFFFF"
                    tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
                    animationDuration={0}
                    style={styles.checkBox}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.btnsRow}>
          <CustomButton
            title={i18n.t('cancel')}
            onPress={this.closeFilters}
            style={styles.cancelBtn}
            textStyle={styles.filterClearText}
            testID="cancelFilter"
          />
          <CustomButton
            title={i18n.t('apply')}
            testID="applyFilter"
            onPress={this.goBackToInventoryWithData}
            style={styles.filterApplyButton}
          />
        </View>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  filterClearText: {
    fontWeight: "500",
    fontFamily: "Lato",
    fontSize: 16,
    color: "#375280",
    // marginRight: Scale(4),
  },
  filters: {
    borderTopWidth: Scale(1),
    borderColor: "#F1F5F9",
    marginTop: Scale(10),
    paddingVertical: Scale(20),
    paddingHorizontal: Scale(14),
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: Scale(12),
    height: Scale(24),
  },
  filterText: {
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "400",
    color: "#375280",
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
  btnsRow: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Scale(15),
    paddingTop: Scale(10),
    paddingBottom: Scale(20),
    flexDirection: "row",
    alignItems: "center",
  },
  cancelBtn: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    backgroundColor: "#FFFFFF",
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
    color: "#375280",
    fontWeight: "500",
  },
  filterApplyButton: {
    flex: 1,
    marginHorizontal: Scale(5),
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    borderRadius: Scale(2),
  },
  sb: {
    justifyContent: "space-between",
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
backTouchAssignstoreInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssignInventory: {
    width: windowWidth * 20 / 100,
    height: windowWidth * 6 / 100,
    marginLeft:i18n.language? 15:0
},
backIconCssAssignFilter: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleAssignFilter: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
}
});
// Customizable Area End
