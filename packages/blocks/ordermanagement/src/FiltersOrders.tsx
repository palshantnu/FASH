import React from "react";
// Customizable Area Start
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    StatusBar,
    Image,
    Dimensions,
    ColorValue,
    Platform
} from "react-native";

const windowWidth = Dimensions.get("window").width;
import { backIcon} from "./assets";
import globalStyle from "../../../components/src/GlobalStyle"
import   FiltersOrdersController, {OrderStatus, Props, SortByFilter } from "./FiltersOrdersController";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { RadioButton } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";

// Customizable Area End

export default class FiltersOrders extends FiltersOrdersController {
    constructor(props: Props) {
        super(props);
    }
    // Customizable Area Start
    renderContainerFilterName = () => {
        return (
            <View style={{ flex: 0.4 }}>
                <TouchableOpacity testID="sortById" style={this.state.isActiveFilter == 'sortByActive' ? styles.isActiveFilterView : styles.isInActiveFilterView}
                    onPress={() => this.handleChangeFilter('sortByActive')}>
                    <Text style={this.state.isActiveFilter == 'sortByActive' ? styles.isActiveFilter : styles.isInActiveFilter}>{i18n.t('sort_by')}</Text>
                </TouchableOpacity >
                <TouchableOpacity  testID="orderById" style={this.state.isActiveFilter == 'orderByActive' ? styles.isActiveFilterView : styles.isInActiveFilterView}
                    onPress={() => this.handleChangeFilter('orderByActive')} >
                    <Text style={this.state.isActiveFilter == 'orderByActive' ? styles.isActiveFilter : styles.isInActiveFilter}>{i18n.t('order_status')}</Text>
                </TouchableOpacity>
                <TouchableOpacity  testID="dateById" style={this.state.isActiveFilter == 'dateByActive' ? styles.isActiveFilterView : styles.isInActiveFilterView}
                    onPress={() => this.handleChangeFilter('dateByActive')}>
                    <Text style={this.state.isActiveFilter == 'dateByActive' ? styles.isActiveFilter : styles.isInActiveFilter}>{i18n.t('order_date')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderCustomRadioButton = (value: SortByFilter, color: ColorValue | undefined) => {
        const { sortBy } = this.state;
        let isSelected = sortBy === value;

        if ((sortBy === 'mostRecent' && value === 'mostRecent') || (sortBy === 'oldestFirst' && value === 'oldestFirst')) {
            isSelected = true;
        }
        return (
            <TouchableOpacity
                testID="radioId"
                onPress={() => this.handleSortByChange(value)}
                style={[
                    styles.radioButton,
                    {
                        borderColor: isSelected ? color : "#C7B9AD",
                        borderWidth: 1,
                        marginVertical: Scale(5),
                        backgroundColor: isSelected ? color : '#ffff'
                    },
                ]}
            >
                {isSelected && (
                    <View style={[styles.radioButtonInner, { backgroundColor: '#ffff' }]} />
                )}
            </TouchableOpacity>
        );
    };

    renderSortFilterValue = () => {
        return (
            <RadioButton.Group onValueChange={()=>{}} value={this.state.sortBy}>
                <TouchableOpacity testID='mostbtn' style={{ flexDirection: "row", alignItems: "center",marginTop: verticalScale(5) }} onPress={() => this.handleSortByChange('mostRecent')}>
                    {this.renderCustomRadioButton('mostRecent', "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                       {i18n.t('mostRecent')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity testID='oldestbtn' style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(5) }} onPress={() => this.handleSortByChange('oldestFirst')}>
                    {this.renderCustomRadioButton('oldestFirst', "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                       {i18n.t('oldest_First')}
                    </Text>
                </TouchableOpacity>
            </RadioButton.Group>
        )
    }
    renderCheckbox = (status:boolean,orderName:OrderStatus) => {
        return(
            <CheckBox
            testID={orderName + "-checkbox"}
            value={status}
             onValueChange={() => this.handleOrderStatusChange(orderName)}
             boxType="square"
             tintColor="#FFFFFF"
             onCheckColor="#FFFFFF"
             onFillColor="#CCBEB1"
             onTintColor="#FFFFFF"
             animationDuration={0}
             tintColors={{ true: "#CCBEB1", false: "#CCBEB1" }}
             style={styles.checkBox}
         />
        )
    }

    renderOderStatusFilterValue = () =>{
        return(
         <>
       <View style={styles.radio}>
          {this.renderCheckbox(this.state.orderStatus.allOrders,'allOrders')}
         <Text style={this.state.orderStatus.allOrders?styles.selectedCheckBoxSize:styles.size}>{i18n.t('allOrdersText')}</Text>
      </View>
      <View style={styles.radio}>
          {this.renderCheckbox(this.state.orderStatus.processing,'processing')}
         <Text style={this.state.orderStatus.processing?styles.selectedCheckBoxSize:styles.size}>{i18n.t('processingText')}</Text>
      </View>
      <View style={styles.radio}>
          {this.renderCheckbox(this.state.orderStatus.delivered,'delivered')}
         <Text style={this.state.orderStatus.delivered?styles.selectedCheckBoxSize:styles.size}>{i18n.t('deliveredText')}</Text>
      </View>
      <View style={styles.radio}>
          {this.renderCheckbox(this.state.orderStatus.returned,'returned')}
         <Text style={this.state.orderStatus.returned?styles.selectedCheckBoxSize:styles.size}>{i18n.t('returned')}</Text>
      </View>
      </>   
        )
    }
    renderCustomDateRadioButton = (value:string , color: ColorValue | undefined) =>{
        const { orderDate } = this.state;
        let isSelected = orderDate === value;
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

        if ((orderDate === 'last30days' && value === 'last30days') || (orderDate === 'last3months' && value === 'last3months')
            || (orderDate === currentYear.toString() && value === currentYear.toString()) || (orderDate === previousYear.toString() && value === previousYear.toString())) {
            isSelected = true;
        }
        return (
            <TouchableOpacity
            testID="dateIdfil"
                onPress={() => this.handleOrderDateChange(value)}
                style={[
                    styles.radioButton,
                    {
                        borderColor: isSelected ? color : "#C7B9AD",
                        borderWidth: 1,
                        marginVertical: Scale(5),
                        backgroundColor: isSelected ? color : '#ffff'
                    },
                ]}
            >
                {isSelected && (
                    <View style={[styles.radioButtonInner, { backgroundColor: '#ffff' }]} />
                )}
            </TouchableOpacity>
        )
    }
    renderDateContainr = () =>{
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

       return (
        <RadioButton.Group data-test-id='radioBtn' onValueChange={(value) => {this.handleOrderDateChange(value.toString())}} value={this.state.sortBy}>
                <TouchableOpacity testID='lastbtn' style={{ flexDirection: "row", alignItems: "center" , marginTop: verticalScale(5)}} onPress={() => this.handleOrderDateChange('last30days')}>
                    {this.renderCustomDateRadioButton('last30days', "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                        {i18n.t('last_30_days')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity testID='monthbtn' style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(5) }} onPress={() => this.handleOrderDateChange('last3months')}>
                    {this.renderCustomDateRadioButton('last3months', "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                       {i18n.t('last_3_months')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity testID='currbtn' style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(5) }} onPress={() => this.handleOrderDateChange(currentYear.toString())}>
                    {this.renderCustomDateRadioButton(currentYear.toString(), "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                        {currentYear}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity testID='prevbtn' style={{ flexDirection: "row", alignItems: "center", marginTop: verticalScale(5) }} onPress={() => this.handleOrderDateChange(previousYear.toString())}>
                    {this.renderCustomDateRadioButton(previousYear.toString(), "#C7B9AD")}
                    <Text
                        style={styles.radioTxt}>
                        {previousYear}
                    </Text>
                </TouchableOpacity>
          </RadioButton.Group>    
      )  
    }

    renderContent() {
        const { isActiveFilter } = this.state;
    
        if (isActiveFilter === 'sortByActive') {
            return this.renderSortFilterValue();
        } else if (isActiveFilter === 'orderByActive') {
            return this.renderOderStatusFilterValue();
        } else {
            return this.renderDateContainr();
        }
    }

    renderFiltersList = () => {
        return (
            <View style={{ flexDirection: FlexConditionManage(i18n.language), flex: 1 }}>
                {this.renderContainerFilterName()}
                <View style={{ flex: 0.6, borderLeftColor: '#F1F5F9', borderLeftWidth: Scale(1),borderBottomColor:'transparent' }}>
                 {this.renderContent()}
                </View>
            </View>
        )
    }
    renderBtnContainer = () =>{
       return(
        <View style={[styles.footer,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <TouchableOpacity style={styles.button} onPress={()=>this.goBackScreen()}>
            <Text style={styles.buttonText}>{i18n.t('cancelText')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.applyButton]} testID="onApplyfilter" onPress={()=>this.onApplyfilter()}>
            <Text style={[styles.buttonText, styles.applyButtonText]}>{i18n.t('apply')}</Text>
          </TouchableOpacity>
        </View>
       ) 
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <SafeAreaView style={styles.mainContainerOrder}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false} />
                <View style={[styles.containerViewOrder, globalStyle.headerMarginManage]}>
                    <View style={[styles.headerViewOrder,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <TouchableOpacity testID="btnBackAllOrder" style={styles.backTouchOrder} onPress={() => this.goBackScreen()}>
                            <Image resizeMode="contain" source={backIcon} style={[styles.backIconOrder,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                        </TouchableOpacity>  
                        <View>
                            <Text style={styles.headerTitleAllOrder}>{i18n.t('filter')}</Text>
                        </View>
                        <TouchableOpacity testID="clearBtnTstId"style={styles.extraViewfilter} onPress={()=>this.onClearFilter()}>
                            <Text style={styles.clearStyle}>{i18n.t('clearAll')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderTopColor: '#F1F5F9', borderTopWidth: Scale(1), marginTop: verticalScale(10) }} />
                {this.renderFiltersList()}
                {this.renderBtnContainer()}

            </SafeAreaView>
        )
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    safeViewContainerOrder:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainerOrder: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerViewOrder:{
        width:windowWidth*90/100,
        alignSelf:'center',
    },
    headerViewOrder:{
        //flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
    },
    backTouchOrder:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconOrder:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAllOrder:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    extraViewfilter:{

        justifyContent: 'center',
    },
    clearStyle:{
        color:'#375280',
        fontWeight: '500',
        fontSize: 16,
        fontFamily: 'Lato',
        fontStyle: 'normal',
        lineHeight: 24
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 16,
    },
    isActiveFilter: {
        fontFamily: "Lato",
        fontWeight: "700",
        fontSize: 16,
        color: "#FFFFFF",
    },
    isInActiveFilter: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: 16,
        color: "#375280",
    },
    isActiveFilterView: {
        backgroundColor: '#CCBEB1',
        paddingVertical: Scale(16),
        paddingHorizontal: Scale(24),
        borderColor: "#F1F5F9",
        borderWidth: Scale(1),
        borderRadius: Scale(1),
    },
    isInActiveFilterView: {
        paddingVertical: Scale(16),
        paddingHorizontal: Scale(24),
        borderColor: "#F1F5F9",
        borderWidth: Scale(1),
        borderRadius: Scale(1),
        backgroundColor: '#ffffff'
    },
    radioButton: {
        height: 22,
        width: 22,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft:14
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 6,
        borderWidth: 0.1,
        borderColor: "#375280",
    },
    radioTxt: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 16,
    color: "#375280",
    },
    checkBox: {
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
    radio: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical:Scale(10),
        paddingHorizontal:Scale(10),
    },
    size: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: 16,
        color: "#375280",
        marginLeft: Scale(8),
    },
    selectedCheckBoxSize: {
        fontFamily: "Lato",
        fontWeight: "500",
        fontSize: 16,
        color: "#375280",
        marginLeft: Scale(8),
    },
    footer: {
        alignItems: "center",
        paddingHorizontal: Scale(15),
        paddingTop: Scale(10),
        paddingBottom: Scale(20),
        backgroundColor: "#FFFFFF",
      },
      button: {
        flex: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D3BCA3',
        marginHorizontal: Scale(5),
        minHeight: Scale(56),
        overflow: "hidden",
      },
      applyButton: {
        backgroundColor: '#D3BCA3',
      },
      buttonText: {
        fontSize: 16,
        color: '#375280',
        fontWeight:'500',
        fontFamily:'Lato',
        lineHeight: 28,
        fontStyle:'normal'
      },
      applyButtonText: {
        color: 'white',
        fontWeight:'800',
        lineHeight:28,
        fontStyle:'normal',
        fontFamily: "Lato-Bold",
        fontSize: 20,
      },
})
// Customizable Area End    