import React from "react";

// Customizable Area Start
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Table, Cell, TableWrapper } from "react-native-table-component";

import CustomLoader from "../../../components/src/CustomLoader";
import CustomSearch from "../../../components/src/CustomSearch";
import CustomButton from "../../../components/src/CustomButton";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import Scale from "../../../components/src/Scale";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { backIcon } from "./assets";

const { width } = Dimensions.get("window");
// Customizable Area End

import SetPricesController, { Props, configJSON } from "./SetPricesController";

export default class SetPricesScreen extends SetPricesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEmptyMessage = () =>
    this.state.loading ? null : (
      <View style={[styles.container, styles.center]} testID="emptyView">
        <Text style={[styles.cellDataText, styles.empty]} testID="emptyText">
          {this.isSearched
            ? configJSON.emptySearchResult
            : configJSON.noCataloguesFound}
        </Text>
      </View>
    );

  widthArr = [Scale(130), Scale(90), Scale(90), Scale(100), Scale(120)];

  renderHeaderCells = () => (
    <>
      {[
        i18n.t('productName'),
        i18n.t('sku'),
        i18n.t('price'),
        i18n.t('discountedPercentage'),
        i18n.t('discountedPrice'),
      ].map((item, index) => (
        <View
          key={`head-${index}`}
          style={[
            index === 1 ? styles.borderRight : {},
            [2, 3].includes(index) ? styles.cHCenter : styles.cell,
            { minWidth: this.widthArr[index] },
          ]}
        >
          <Text style={styles.rowHeaderText}>{item}</Text>
        </View>
      ))}
    </>
  );

  renderCell = (
    cellData: string | number | boolean,
    cellIndex: number,
    rowIndex: number
  ) => {
    if (cellIndex === 0) {
      return (
        <View style={[styles.cell, { width: this.widthArr[cellIndex] }]}>
          <Text style={styles.cellDataText} numberOfLines={3}>
            {cellData.toString()}
          </Text>
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
    if (cellIndex === 2) {
      return (
        <View style={[styles.hCenter, { width: this.widthArr[cellIndex] }]}>
          <TextInput
            testID={`price-${rowIndex}-${cellIndex}`}
            style={styles.input}
            value={String(this.state.rowsData[rowIndex][cellIndex])}
            onBlur={() => this.onBlur(rowIndex, cellIndex)}
            onChangeText={(text) => this.updatePriceInput(text, rowIndex, cellIndex)}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
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
            onChangeText={(text) => this.updateInput(text, rowIndex, cellIndex)}
            onBlur={() => this.onBlur(rowIndex, cellIndex)}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
          />
        </View>
      );
    }
    return (
      <View style={[styles.hCenter, { width: this.widthArr[cellIndex] }]}>
        <TextInput
          testID={`lowStock-${rowIndex}-${cellIndex}`}
          style={styles.input}
          value={Number(this.state.rowsData[rowIndex][4]).toFixed(0)}
          onChangeText={(text) => this.updateInput(text, rowIndex, cellIndex)}
          editable={false}
          onBlur={() => this.onBlur(rowIndex, cellIndex)}
          keyboardType="numeric"
          returnKeyLabel="Done"
          returnKeyType="done"
        />
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView testID="mainContainer" style={styles.container}>
        
          <View style={[styles.headerViewMainSetPriceScreen,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchSetPrice}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconSetPriceInAssign,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleSetPrice}>{i18n.t('setPrices')}</Text>
                    </View>
                    <View></View>
                </View>
        <CustomSearch
          value={this.state.searchKey}
          onChangeText={(text) => this.updateSearchKeyword(text)}
          onSubmitEditing={this.searchCatalogue}
          containerStyle={styles.search}
          testID="searchInventory"
          returnKeyLabel="Search"
          returnKeyType="search"
          placeholder={i18n.t('searchProduct')}
        />
        {this.state.items.length ? (
          <>
            <ScrollView
              style={[styles.container, styles.table]}
              testID="pricesData"
              bounces={false}
              horizontal
            >
              <Table style={styles.table2}>
                <TableWrapper
                  style={{ flexDirection:FlexConditionManage(i18n.language), height: Scale(60) }}
                >
                  {this.renderHeaderCells()}
                </TableWrapper>
                <ScrollView bounces={false}>
                  {this.state.rowsData.map((row, index) => (
                    <TableWrapper
                      key={`row-${index}`}
                      style={{ flexDirection:FlexConditionManage(i18n.language) }}
                    >
                      {row.map((cellData, cellIndex) => (
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
                testID="confirmButton"
                textStyle={this.state.isDirty ? {} : styles.inactiveText}
                title={i18n.t('confirm')}
                onPress={this.updateItems}
                disabled={!this.state.isDirty}
                style={
                  this.state.isDirty
                    ? styles.activeBtnStyle
                    : styles.inactiveBtnStyle
                }
              />
            </View>
          </>
        ) : (
          this.renderEmptyMessage()
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
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  main: {
    paddingHorizontal: Scale(20),
  },
  search: {
    marginVertical: Scale(10),
    marginHorizontal: Scale(20),
  },
  filter: {
    width: Scale(24),
    height: Scale(24),
  },
  headerViewMainSetPriceScreen: {
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
backTouchSetPrice: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconSetPriceInAssign: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleSetPrice: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
},


  table: {
    borderTopWidth: Scale(2),
    borderBottomWidth: Scale(2),
    borderColor: "#F1F5F9",
  },
  table2: { marginHorizontal: Scale(10) },
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    paddingVertical: Scale(6),
    paddingHorizontal: Scale(12),
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
  inactiveBtnStyle: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
    borderWidth: Scale(1),
    borderColor: "#CCBEB1",
    opacity: 0.5,
    backgroundColor: "#FFFFFF",
  },
  activeBtnStyle: {
    marginHorizontal: Scale(20),
    marginVertical: Scale(10),
  },
  borderRight: {
    borderRightWidth: Scale(2),
    borderRightColor: "#F1F5F9",
  },
  cHCenter: {
    alignItems: "center",
    padding: Scale(6),
  },
  empty: {
    fontWeight: "500",
    fontSize: 16,
  },
  hCenter: {
    alignItems: "center",
  },
});
// Customizable Area End
