import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  ColorValue,
  Modal 
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import {
  LineChart
} from "react-native-chart-kit";
import Svg, { Line } from "react-native-svg";

import ProductAnalyticsController, { Props } from "./ProductAnalyticsController";
import Scale from "../../../components/src/Scale";
import { backIcon } from "../../addressmanagement/src/assets";
import { filter } from "../../catalogue/src/assets";
import { doc, download, jpeg, pdf } from "./assets";
// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
// Customizable Area End


export default class ProductAnalytics extends ProductAnalyticsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start    
    // Customizable Area End
  }

  // Customizable Area Start
  renderCustomRadioButton = (value: string, color: ColorValue | undefined) => {
    const { selectedValue } = this.state;
    let isSelected = selectedValue === value;

    return (
      <TouchableOpacity
      testID="radioId"
        onPress={() => this.handleRadioButtonPress(value)}
        style={[
          styles.radioButton,
          {
            borderColor: isSelected ? color : "#C7B9AD",
            borderWidth: 1,
            marginVertical: Scale(10),
          },
        ]}
      >
        {isSelected && (
          <View style={[styles.radioButtonInner, { backgroundColor: color }]} />
        )}
      </TouchableOpacity>
    );
  };
  
  chartConfig = {
    backgroundColor: "#ffffff", // Set background color to white
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set line color to black

    labelColor: (opacity = 1) => `#375280`,
    propsForDots: {
      r: "3",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
    },
    propsForLabels: {
      fontWeight: '600',
      fontSize: 11,
    },
    decimalPlaces: 0,
  };

  CustomLegend = () => (
    <View style={{ flexDirection:FlexConditionManage(i18n.language), alignItems: 'center', paddingBottom: Scale(25), top: 5, justifyContent: 'flex-start' }}>
      <View style={{ width: 20, height: 20, backgroundColor: '#F59E0B', borderRadius: 2, }} />
      <Text style={{ color: '#375280', fontSize: 14, fontWeight: '400', paddingHorizontal: 10 }}>{i18n.t('soldUnit')}</Text>
      <View style={{ width: 20, height: 20, backgroundColor: '#34D399', borderRadius: 2, left: 20 }} />
      <Text style={{ color: '#375280', fontSize: 14, fontWeight: '400', paddingHorizontal: 32 }}>{i18n.t('appearedInSearchText')}</Text>
    </View>
  );

  *ylabel(val: number[]) {
      yield val[0];
      yield '';     
      yield '';    
      yield '';
      yield val[1];
  }

  calculateChartWidth = (keysLength: number, screenWidth: number) => {
    const chartWidth = keysLength * 40;
    return chartWidth > screenWidth ? chartWidth : screenWidth;
  };
  
  formatYLabelFunction = (yLabelIterator: { next: () => { (): any; new(): any; value: any; }; }) => (yvalue: string) => {
    const values = [0, 1];
    if (values.length === 2) {
      if (yvalue === "0" || yvalue === "1") {
        return yLabelIterator.next().value;
      }
    }
    return yvalue;
  };
  // Customizable Area End

  render() {
    const soldUnits = this.state.analyticsData?.impression_and_sales?.sold_units;
    const keys = soldUnits ? Object.keys(soldUnits).map(key => {
      const dateMonthMatch = key.match(/^(\d{2}) (\w+)$/);
      if (dateMonthMatch) {
        const [_, date, month] = dateMonthMatch;
        const shortMonth = month.charAt(0).toUpperCase() + month.slice(1, 3).toLowerCase();
        return `${date} ${shortMonth}`;
      }
      if (/^\d+$/.test(key)) {
        return key;
      }
      const slicedKey = key.slice(0, 3);
      return slicedKey.charAt(0).toUpperCase() + slicedKey.slice(1).toLowerCase();
    }) : [];

    const numericKeys = keys.filter(key => /^\d+$/.test(key)).sort((a, b) => parseFloat(a) - parseFloat(b));
    const transformedKeys = keys.filter(key => /\d{2} \w{3}/.test(key));
    const nonNumericKeys = keys.filter(key => !/^\d+$/.test(key) && !/\d{2} \w{3}/.test(key));

    const sortedKeys = [...numericKeys, ...transformedKeys, ...nonNumericKeys];
    
    const valuesone:any = soldUnits?  Object.values(soldUnits): [];
    const search = this.state.analyticsData?.impression_and_sales?.appeared_in_search;
    const values1 = search ? Object.values(search) : [];
    const combinedValues = [...valuesone, ...values1];
    const uniqueValues: any = [...new Set(combinedValues)];

    const yLabelIterator: any = this.ylabel(uniqueValues);

    const data = {
      labels: sortedKeys,
      datasets: [
        {
          data: valuesone as number[],
          color: (opacity = 1) => '#F59E0B',
          strokeWidth: 1
        },
        {
          data: values1 as number[],
          color: (opacity = 1) => `#34D399`,
          strokeWidth: 1
        }
      ],
    };

    const screenWidth = Dimensions.get('window').width;
    const capitalizedFilter = this.state.filter ? this.state.filter.charAt(0).toUpperCase() + this.state.filter.slice(1) : '';

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={[styles.headerViewMainCatalogue,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <TouchableOpacity
            testID="btnBackAddAddress"
            style={styles.backTouchCatalogue}
            onPress={this.goToBackInAddAddress}
          >
            <Image
              resizeMode="contain"
              source={backIcon}
              style={[{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]},styles.backIconCssCatalogue]}
            ></Image>
          </TouchableOpacity>
          <View>
            <Text
              style={styles.headerTitleCatalogue}
            >{i18n.t('productAnalytics')}</Text>
          </View>
          <TouchableOpacity testID="filterId" style={styles.filterTouch} onPress={this.navigateFilter}>
            <Image
              resizeMode="contain"
              source={filter}
              style={styles.filterIconCss}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection:FlexConditionManage(i18n.language), paddingVertical: Scale(15) }}>
          <Text style={styles.past}>{capitalizedFilter || i18n.t('thisWeek')}</Text>

          <TouchableOpacity activeOpacity={0.5} testID="downloadId" onPress={() => this.removeModal()}>
          <Image source={download} style={{ width: Scale(24), height: Scale(24) }} />
          </TouchableOpacity></View>

        <View style={styles.statGroup}>
          <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <View style={styles.statItem}>
              <View>
                <Text style={styles.statH}>{i18n.t('soldUnit')}</Text>
                <Text style={styles.statD}>{this.state.analyticsData?.sold_units}</Text>
              </View>
            </View>

            <View style={styles.statItem1}>
              <View>
                <Text style={styles.statH}>{i18n.t('returnUnit')}</Text>
                <Text style={styles.statD}>{this.state.analyticsData?.returned_units}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.row, styles.sb,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <View style={styles.statItem}>
              <View>
                <Text style={styles.statH}>{i18n.t('appearedInSearchText')}</Text>
                <Text style={styles.statD}>{this.state.analyticsData?.appeared_in_search}</Text>
              </View>
            </View>

            <View style={styles.statItem1}>
              <View>
                <Text style={styles.statH}>{i18n.t('totalRevenue')}</Text>
                <Text style={styles.statD}>{this.state.analyticsData?.total_revenue}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.graph,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('impressionSale')}</Text>
          {this.CustomLegend()}
          <View>
          <ScrollView style={{right: Scale(50)}} horizontal>
          <LineChart
          data={data}
          width={this.calculateChartWidth(keys.length, screenWidth)}
          height={220}
          formatYLabel={this.formatYLabelFunction(yLabelIterator)}
          chartConfig={this.chartConfig}
          withVerticalLines={false}
          withShadow={false}
          decorator={({ width, height }: { width: number, height: number, }) => {
            const paddingLeft = Scale(72);
            const paddingRight = Scale(0);
            const lastLineX = width - paddingRight;
            
            return (
              <Svg height={height} width={width}>
                <Line
                  x1={paddingLeft}
                  x2={paddingLeft}
                  y1={'7%'}
                  y2={'82.5%'}
                  stroke="rgba(0, 0, 0, 0.2)"
                  strokeWidth="1"
                />
                <Line
                  x1={lastLineX}
                  x2={lastLineX}
                  y1={'7%'}
                  y2={'82.5%'}
                  stroke="rgba(0, 0, 0, 0.3)"
                  strokeWidth="2"
                />
              </Svg>
            );
          }}
        />
          </ScrollView>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTxt}>{i18n.t('exportReport')}</Text>
              <View style={styles.line} />
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={[styles.report,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('exportAnalytics')}</Text>
              <View>
                <TouchableOpacity testID='btn' style={[styles.pdf,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => this.handleRadioButtonPress('pdf')}>
              <View style={{flexDirection:FlexConditionManage(i18n.language)}}><Image source={pdf} style={styles.imgStyle}></Image>
              <Text style={styles.type}>{i18n.t('pdfText')}</Text>
              </View>
              {this.renderCustomRadioButton("pdf", "#C7B9AD")}
                </TouchableOpacity>
              <View style={styles.line2} />
              <TouchableOpacity testID='btn1' style={[styles.mainRadio,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => this.handleRadioButtonPress('doc')}>
              <View style={{flexDirection:FlexConditionManage(i18n.language)}}><Image source={doc} style={styles.imgStyle}></Image>
              <Text style={styles.type}>{i18n.t('docFileText')}</Text>
              </View>
              {this.renderCustomRadioButton("doc", "#C7B9AD")}
                </TouchableOpacity>
              <View style={styles.line2} />
              <TouchableOpacity testID='btn2' style={[styles.mainRadio,{flexDirection:FlexConditionManage(i18n.language)}]} onPress={() => this.handleRadioButtonPress('jpg')}>
              <View style={{flexDirection:FlexConditionManage(i18n.language)}}><Image source={jpeg} style={styles.imgStyle}></Image>
              <Text style={styles.type}>{i18n.t('jpgText')}</Text>
              </View>
              {this.renderCustomRadioButton("jpg", "#C7B9AD")}
                </TouchableOpacity>
              </View>
                <View style={{ flexDirection:FlexConditionManage(i18n.language), justifyContent: 'space-around', marginTop: 5, alignItems: 'center' }} >
                <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7} testID="removeToggleId" onPress={this.removeModal}>
                    <Text style={styles.cancelTitle}>{i18n.t('cancelText')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    testID="editProductBtn"
                    style={styles.nextButtonAddproducts}
                    onPress={() => this.handleDownload()}
                  >
                    <Text style={styles.nextButtonText}>{i18n.t('export')}</Text>
                  </TouchableOpacity>
          </View>
          </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


// Customizable Area Start
const styles = StyleSheet.create({
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  type: {
    color: '#375280',
    fontSize: 18,
    paddingLeft: 15, 
    textAlign: 'center', 
    top: 15,
    fontFamily: 'Lato-Bold',
  },
  report: {
    fontSize: Scale(16),
    color: "#375280",
    paddingVertical: 20,
    fontFamily: 'Lato-Regular'
  },
  imgStyle: { width: Scale(60), height: Scale(60) },
  mainRadio: {
  justifyContent: 'space-between', 
  alignItems: 'center',
  paddingVertical : 18
},
pdf:{
  justifyContent: 'space-between', 
  alignItems: 'center',
  paddingBottom : 18
},
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  nextButtonAddproducts: {
    backgroundColor: "#CCBEB1",
    height: Scale(54),
    width: Scale(180),
    borderRadius: 2,
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },
  cancelBtn:{
    width: Scale(182),
    height: Scale(54), padding: 10, borderColor : '#CCBEB1',borderRadius : 2, borderWidth: 1
  },
  cancelTitle:{
    fontSize : Scale(20),
    fontWeight : '500',
    textAlign : 'center',
    color : '#375280',
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#E3E4E5",
    width: "100%",
    marginTop: 20
  },
  line2: {
    borderWidth: 0.5,
    borderColor: "#E3E4E5",
    width: "100%",
  },
  modalTxt: {
    fontSize: Scale(20),
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Bold"
  },
  past: {
    color: "#375280",
    fontSize: 16,
    fontWeight: '400'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerViewMainCatalogue: {
    justifyContent: "space-between",
    marginTop: Platform.OS == "ios" ? (windowWidth * 3) / 100 : 0,
    alignContent: "center",
  },
  backTouchCatalogue: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssCatalogue: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCatalogue: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  filterIconCss: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    top: Scale(5)
  },
  filterTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  graph: {
    color: '#375280',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: Scale(15),
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  statGroup: {
  },
  statItem: {
    flex: 1,
    marginVertical: Scale(6),
    marginRight: Scale(6),
    padding: Scale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
    height: Scale(82),
    justifyContent: 'center'
  },
  statItem1: {
    flex: 1,
    margin: Scale(6),
    padding: Scale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
    height: Scale(82),
    justifyContent: 'center'
  },
  row: {
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  statImg: {
    height: Scale(50),
    width: Scale(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: Scale(2),
  },
  statIcon: {
    height: Scale(30),
    width: Scale(30),
    resizeMode: "contain",
  },
  statH: {
    fontSize: 14,
    lineHeight: 26,
    color: "#334155",
    fontFamily: "Lato-Regular",
    textAlign: 'center'
  },
  statD: {
    fontSize: 20,
    lineHeight: 26,
    color: "#375280",
    fontFamily: "Lato-Bold",
    marginHorizontal: Scale(12),
    textAlign: 'center'
  },

});
// Customizable Area End