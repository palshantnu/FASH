import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Table, Cell, TableWrapper } from "react-native-table-component";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'

import Scale from "../../../components/src/Scale";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomSearch from "../../../components/src/CustomSearch";
import CustomSwitch from "../../../components/src/CustomSwitch";
import CustomButton from "../../../components/src/CustomButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { filter,backIcon } from "./assets";
// Customizable Area End

import UpdateInventoryController, {
  Props,
  configJSON,
} from "./UpdateInventoryController";

export default class UpdateInventoryScreen extends UpdateInventoryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEmpty = () =>
    this.state.loading ? null : (
      <View style={[styles.container, styles.center]} testID="emptyView">
        <Text style={[styles.cellDataText, styles.empty]}>
          {this.state.emptyMessage}
        </Text>
      </View>
    );

  widthArr = [Scale(130), Scale(90), Scale(90), Scale(100), Scale(90)];

  renderHeaderCell = () => (
    <View style={[styles.tableview,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <View style={[{ width: this.widthArr[0] }, styles.cell]}>
        <Text style={styles.rowHeaderText}>{i18n.t('Product Name')}</Text>
      </View>
      <View
        style={[{ width: this.widthArr[1] }, styles.borderRight, styles.cell]}
      >
        <Text style={styles.rowHeaderText}>{i18n.t('sku')}</Text>
      </View>
      <View style={[{ width: this.widthArr[2] }, styles.cHCenter]}>
        <Text style={styles.rowHeaderText}>{i18n.t('currentStock')}</Text>
      </View>
      <View style={[{ width: this.widthArr[3] }, styles.cHCenter]}>
        <Text style={styles.rowHeaderText}>{i18n.t('lowstockThreshold')}</Text>
      </View>
      <View style={[{ width: this.widthArr[4] }, styles.cell]}>
        <Text style={styles.rowHeaderText}>{i18n.t('listedUnlisted')}</Text>
      </View>
    </View>
  );

  renderCell = (
    cellData: string | number | boolean,
    cellIndex: number,
    rowIndex: number
  ) => {
    if (cellIndex === 4) {
      return (
        <View style={[styles.hCenter, { width: this.widthArr[cellIndex] }]}>
          <CustomSwitch
            value={Boolean(cellData)}
            size={14}
            onValueChange={() => this.toggleListStatus(rowIndex, cellIndex)}
            testID={`switch-${rowIndex}-${cellIndex}`}
          />
        </View>
      );
    }
    if (cellIndex === 3) {
      return (
        <View style={[styles.hCenter, { width: this.widthArr[cellIndex] }]}>
          <TextInput
            testID={`lowStock-${rowIndex}-${cellIndex}`}
            style={styles.input}
            value={String(this.state.rowsData[rowIndex][cellIndex])}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onBlur={() => this.setToZero(rowIndex, cellIndex)}
            onChangeText={(text) => this.updateInput(text, rowIndex, cellIndex)}
          />
        </View>
      );
    }
    if (cellIndex === 2) {
      return (
        <View style={[styles.hCenter, { width: this.widthArr[cellIndex] }]}>
          <TextInput
            testID={`stock-${rowIndex}-${cellIndex}`}
            style={[
              styles.input,
              Number(this.state.rowsData[rowIndex][cellIndex]) === 0
                ? { borderColor: "#F87171" }
                : {},
            ]}
            value={String(this.state.rowsData[rowIndex][cellIndex])}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onBlur={() => this.setToZero(rowIndex, cellIndex)}
            onChangeText={(text) => this.updateInput(text, rowIndex, cellIndex)}
          />
        </View>
      );
    }
    if (cellIndex === 1) {
      return (
        <View
          style={[
            styles.cell,
            styles.borderRight,
            { width: this.widthArr[cellIndex], flex: 1 },
          ]}
        >
          <Text style={styles.cellDataText}>{cellData.toString()}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.cell, { width: this.widthArr[cellIndex] }]}>
        <Text style={styles.cellDataText} numberOfLines={3}>
          {cellData.toString()}
        </Text>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
       
        <View style={[styles.headerViewMainAssignStoreInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="goBack" style={[styles.backTouchAssignstoreInAssignInventory,{marginRight: i18n.language ? 20:0}]}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstoreInventory,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAssignstoreInventory}>{i18n.t('updateInventory')}</Text>
                    </View>
                    <TouchableOpacity testID="btn-navigation-right" style={styles.filterIconTouchInAssignInventory} onPress={()=>this.goToFilters()}>
                    <Image
                      source={filter}
                      style={[styles.backTouchAssignstoreInAssignInventory,{}]}
                    />
                    </TouchableOpacity>
                </View>
        <CustomSearch
          testID="searchInventory"
          value={this.state.searchKey}
          onChangeText={(text) => this.updateSearchKeyword(text)}
          returnKeyLabel="Search"
          returnKeyType="search"
          onSubmitEditing={this.searchItem}
          placeholder={i18n.t('searchProduct')}
          containerStyle={styles.search}
        />
        {this.state.items.length ? (
          <>
            <ScrollView
              horizontal
              bounces={false}
              style={[styles.container, styles.table]}
              testID="inventoryData"
            >
              <Table style={{ marginHorizontal: Scale(10) }}>
                <TableWrapper
                  style={{ flexDirection: "row", height: Scale(60) }}
                >
                  {this.renderHeaderCell()}
                </TableWrapper>
                <ScrollView bounces={false}>
                  {this.state.rowsData.map((rowData, index) => (
                    <TableWrapper
                      key={`row-${index}`}
                      style={[styles.tableview,{flexDirection:FlexConditionManage(i18n.language)}]}
                    >
                      {rowData.map((cellData, cellIndex) => (
                        <Cell
                          key={`cell-${index}-${cellIndex}`}
                          data={this.renderCell(cellData, cellIndex, index)}
                        />
                      ))}
                    </TableWrapper>
                  ))}
                </ScrollView>
              </Table>
            </ScrollView>
            <View style={styles.bgWhite}>
              <CustomButton
                title={i18n.t('confirm')}
                testID="confirmButton"
                disabled={!this.state.isDirty}
                onPress={this.updateItems}
                textStyle={this.state.isDirty ? {} : styles.inactiveText}
                style={
                  this.state.isDirty
                    ? styles.activeBtnStyle
                    : styles.inactiveBtnStyle
                }
              />
            </View>
          </>
        ) : (
          this.renderEmpty()
        )}
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tableview:{ flexDirection: "row" },
  main: {
    paddingHorizontal: Scale(20),
  },
  filter: {
    width: Scale(24),
    height: Scale(24),
    alignSelf: "center",
  },
  search: {
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
  },
  table: {
    borderTopWidth: Scale(2),
    borderBottomWidth: Scale(2),
    borderColor: "#F1F5F9",
  },
  rowHeaderText: {
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "700",
    color: "#375280",
  },
  cellDataText: {
    fontFamily: "Lato",
    fontSize: 14,
    fontWeight: "400",
    color: "#375280",
  },
  cell: {
    paddingVertical: Scale(6),
    paddingHorizontal: Scale(12),
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: Scale(60),
    color: "#375280",
    padding: Scale(3),
    marginVertical: Scale(2),
    borderWidth: Scale(1),
    borderColor: "#E2E8F0",
    borderRadius: Scale(2),
    height: Scale(36),
    paddingHorizontal: Scale(8),
  },
  bgWhite: {
    backgroundColor: "#FFFFFF",
  },
  inactiveText: {
    color: "#375280",
  },
  activeBtnStyle: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
  },
  inactiveBtnStyle: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    opacity: 0.5,
    backgroundColor: "#FFFFFF",
  },
  empty: {
    fontWeight: "500",
    fontSize: 16,
  },
  borderRight: {
    borderRightWidth: Scale(2),
    borderRightColor: "#F1F5F9",
  },
  hCenter: {
    alignItems: "center",
  },
  cHCenter: {
    alignItems: "center",
    padding: Scale(6),
  },
  headerViewMainAssignStoreInAssign: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal:Scale(10)
},
viewContainerAssignStoreInAssign: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchAssignstoreInAssignInventory: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssignInventory: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginLeft:i18n.language? 25:0
},
backIconCssAssignstoreInventory: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleAssignstoreInventory: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
}



});
// Customizable Area End
