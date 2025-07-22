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
    Modal

} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import CustomButton from "../../../components/src/CustomButton";
import {OrderItemSeller} from "./types";

import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'

import OrderDetailsSellerController, {
    Props,
} from "./OrderDetailsSellerController";
import PriceConvertValue from "../../../components/src/PriceConvertValue";


// Customizable Area End

export default class OrderDetailsSeller extends OrderDetailsSellerController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }


    // Customizable Area Start
    renderNewOrderContainer = () => (
        <View style={styles.orhh2Wrapper}>
            <Text style={styles.orhh2}>{i18n.t('newOrdersText')}</Text>
        </View>
    )


    renderReadyForCollectionContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#FEF3C7" }]}>
            <Text style={[styles.orhh2, { color: "#D97706" }]}>{i18n.t('readyForCollection')}</Text>
        </View>
    )
    renderInProcessContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#FFE7D0" }]}>
            <Text style={[styles.orhh2, { color: "#BE5B00" }]}>{i18n.t('inProcess')}</Text>
        </View>
    )
    renderDeliverdContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#E2E8F0" }]}>
            <Text style={[styles.orhh2, { color: "#375280" }]}>{i18n.t('deliveredText')}</Text>
        </View>
    )


    renderOutOfDeliveryContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#F0E5FF" }]}>
            <Text style={[styles.orhh2, { color: "#6200EA" }]}>{i18n.t('outForDelivery')}</Text>
        </View>
    )

    renderReadyReturnInProcessContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "rgba(181, 91, 82, 0.1)" }]}>
            <Text style={[styles.orhh2, { color: "#B55B52" }]}>{i18n.t('returnInProcess')}</Text>
        </View>
    )
    renderReturnRequestContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "rgba(10, 132, 255, 0.1)" }]}>
            <Text style={[styles.orhh2, { color: "#0A84FF" }]}>{i18n.t('returnRequest')}</Text>
        </View>
    )



    renderRefundInProcessContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "rgba(251, 49, 219, 0.1)" }]}>
            <Text style={[styles.orhh2, { color: "#FB31DB" }]}>{i18n.t('refundINProcress')}</Text>
        </View>
    )
    renderRejectedContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#FEE2E2" }]}>
            <Text style={[styles.orhh2, { color: "#DC2626" }]}>{i18n.t('Rejected')}</Text>
        </View>
    )

    renderRefundedContainer = () => (
        <View style={[styles.orhh2Wrapper, { backgroundColor: "#E1EFE1" }]}>
            <Text style={[styles.orhh2, { color: "#039000" }]}>{i18n.t('refunded')}</Text>
        </View>
    )



    renderListProduct = ({ item }: { item: OrderItemSeller }) => {
        const { quantity, catalogue_name, catalogue_variant_color, catalogue_variant_size, catalogue_variant_front_image, brand_name, catalogue_variant_sku, total_price } = item.attributes
        return (

            <View style={styles.displayFlex}>
                <View style={[styles.row, styles.displayFlex, { marginBottom: "3%",flexDirection:FlexConditionManage(i18n.language) }]}>
                    <Image style={[styles.imageStyle,]} source={ImageNotFound(catalogue_variant_front_image)} />
                    <View style={[styles.imageRightContainer, styles.displayFlex]}>
                        <Text style={styles.productTitleTxt}>{catalogue_name}</Text>
                        <Text style={styles.brandTxt}>{i18n.t('brandText')} : {brand_name}</Text>
                        <View style={[styles.row, styles.sizeColorQuantittyContainer, styles.displayFlex,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <Text style={styles.sizeTxt}>{i18n.t('size')} : {catalogue_variant_size}</Text>


                            <Text style={styles.sizeTxt}>{i18n.t('color')} : {catalogue_variant_color}</Text>

                            <Text style={styles.sizeTxt}>{i18n.t('Quantity')} : {quantity}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.productCodeText}>{i18n.t('productCode')} :</Text>
                    <Text style={styles.productCodeValueText}>{catalogue_variant_sku}</Text>
                </View>
                <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.productCodeText}>{i18n.t('price')} :</Text>
                    <Text style={styles.productCodeValueText}>{PriceConvertValue(total_price,this.state.localCurrency)}</Text>
                </View>
                <View style={styles.div} />
            </View>
        )
    }
     getArrivalText = (arriveTime: { hours: number, minutes: number }) => {
        if (isNaN(arriveTime.hours) && isNaN(arriveTime.minutes)) {
          return null;
        }
      
        const hoursText = arriveTime.hours ? `${arriveTime.hours} hours` : '';
        const minutesText = arriveTime.minutes ? `${arriveTime.minutes} mins` : '';
        
        const arrivalText = `${hoursText} ${minutesText}`.trim();
      
        return arrivalText;
      };
      
       renderArrivalTime () {
        const arriveTime = this.onGetArriveTime(this.state.orderDetailsList?.attributes.estimated_arrival_time);
      
        const arrivalText = this.getArrivalText(arriveTime);
      
        if (!arrivalText) {
          return null;
        }
      
        return (
          <Text style={[styles.deliveredTimingsText, { fontWeight: '700',color: "#334155", }]}>
            {i18n.t('arrivingIn')} {arrivalText}
          </Text>
        );
      };

    renderStoreInformation = () => {
        const { orderDetailsList, deliverDate } = this.state;
        const orderAttributes = orderDetailsList?.attributes.order_management_order.attributes ;
        const storeName = orderDetailsList?.attributes.order_items[0].attributes.store_name || "";

        const customerName = orderAttributes?.account;
        const deliveryAddresses = this.formatTheAddress(orderAttributes?.delivery_addresses);
        const appliedCouponCode = orderAttributes?.applied_coupon_code;
        const appliedDiscount = orderAttributes?.applied_discount;
        const paymentType = orderAttributes?.payment_detail?.payment_type;
    
        const showDeliveryDate = this.showDeliveryDate(orderDetailsList);
    
        return (
            <>
                <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.productCodeText}>{this.state.roleType==='3'?"":`${i18n.t('storeNameText')}:`}</Text>
                    <Text style={styles.productCodeValueText}>{this.state.roleType ==='3' ? '':storeName}</Text>
                </View>
                <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.productCodeText}>{i18n.t('customerName')} :</Text>
                    <Text style={styles.productCodeValueText}>{customerName}</Text>
                </View>
                {showDeliveryDate && (
                    <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.productCodeText}>{i18n.t('deliveryDate')} :</Text>
                        <Text style={styles.productCodeValueText}>{deliverDate}</Text>
                    </View>
                )}
                <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <Text style={styles.productCodeText}>{i18n.t('shippingAddress')} :</Text>
                    <Text style={styles.productCodeValueText}>{deliveryAddresses}</Text>
                </View>
                {appliedCouponCode && (
                    <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.productCodeText}>{i18n.t('couponApplied')} :</Text>
                        <Text style={styles.productCodeValueText}>
                            {appliedCouponCode} (-{PriceConvertValue(appliedDiscount?? '',this.state.localCurrency)})
                        </Text>
                    </View>
                )}
                {paymentType && (
                    <View style={[styles.productCodeCotainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <Text style={styles.productCodeText}>{i18n.t('paymentMethodsText')} :</Text>
                        <Text style={styles.productCodeValueText}>{paymentType}</Text>
                    </View>
                )}
            </>
        );
    }
    
    renderAllTheProducts = () => {
        let status = this.getTheStatusOfOrderDetails();

        let containerComponent = null;
        let additionalComponent = null;

        switch (status) {
            case "new_order":
                containerComponent = this.renderNewOrderContainer();
                break;
            case "in_process":
                containerComponent = this.renderInProcessContainer();
                break;
            case "processed":
                containerComponent = this.renderReadyForCollectionContainer();
                additionalComponent = (
                    <View style={[styles.deliveredtxtConatiner,{backgroundColor:this.showColor()}]}>
                         {this.state.orderDetailsList?.attributes.order_items[0].attributes.driver_name && 
                        <View style={[styles.row, styles.sb, { padding: 10 }]}>
                            <Text style={[styles.deliveredTimingsText]}>{this.state.orderDetailsList?.attributes.order_items[0].attributes.driver_name}</Text>
                             {this.renderArrivalTime()}
                         </View>
                        }
                        { this.state.orderDetailsList?.attributes.order_items[0].attributes.otp &&
                        <View style={[styles.row, styles.sb, { padding: 10 }]}>
                            <Text style={[styles.deliveredTimingsText]}>{i18n.t('pickupOTP')}</Text>
                            <Text style={[styles.deliveredTimingsText, { fontWeight: "700" }]}>{this.state.orderDetailsList.attributes.order_items[0].attributes.otp}</Text>
                        </View>
                      }
                    </View>
                );
                break;
            case "shipped":
                containerComponent = this.renderOutOfDeliveryContainer();
                break;
            case "delivered":
                containerComponent = this.renderDeliverdContainer();
                break;
            case "return_request":
                containerComponent = this.renderReturnRequestContainer();
                additionalComponent = (
                    <View style={styles.reassonOfRejectionContainer}>
                        <Text style={styles.reasonNamingText}>{i18n.t('reasonOfProductReject')} :</Text>
                        <Text style={styles.reasonNamingValueText}>{this.getRejectionOfOrderReason()}</Text>
                        <View style={styles.returnview}>
                            <Text style={styles.returntext}>{this.getReasonOfOrderReturn()}</Text>
                        </View>
                    </View>
                );
                break;
            case "return_in_process":
                containerComponent = this.renderReadyReturnInProcessContainer();
                additionalComponent = (
                    <View style={styles.reassonOfRejectionContainer}>
                        <Text style={styles.reasonNamingText}>{i18n.t('reasonOfProductReject')} :</Text>
                        <Text style={styles.reasonNamingValueText}>{this.getRejectionOfOrderReason()}</Text>
                        <View style={styles.returnview}>
                            <Text style={styles.returntext}>{this.getReasonOfOrderReturn()}</Text>
                        </View>
                    </View>
                );
                break;
            case "return_under_process":
                containerComponent = this.renderRefundInProcessContainer();
                additionalComponent = (
                    <View style={styles.reassonOfRejectionContainer}>
                        <Text style={styles.reasonNamingText}>{i18n.t('reasonOfProductReject')} :</Text>
                        <Text style={styles.reasonNamingValueText}>{this.getRejectionOfOrderReason()}</Text>
                        <View style={styles.returnview}>
                            <Text style={styles.returntext}>{this.getReasonOfOrderReturn()}</Text>
                        </View>
                    </View>
                );
                break;
            case "refunded":
                containerComponent = this.renderRefundedContainer();
                break;
            case "rejected":
                containerComponent = this.renderRejectedContainer();
                additionalComponent = (
                    <View style={styles.reassonOfRejectionContainer}>
                        <Text style={styles.reasonNamingText}>{i18n.t('reasonOfProductReject')} :</Text>
                        <Text style={styles.reasonNamingValueText}>{this.getRejectionOfOrderReason()}</Text>
                    </View>
                );
                break;
            default:
                break;
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.totalProductContainer}>
                    <Text style={styles.totalProductText}>{i18n.t('totalProduct')} : {this.getItemsLength()}</Text>
                    {containerComponent}
                </View>
                <View style={{ marginBottom: 10 }}>
                    {additionalComponent}
                </View>
                <FlatList
                    testID="flatlist-orderDetails"
                    data={this.state.orderDetailsList?.attributes?.order_items}
                    renderItem={this.renderListProduct}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={this.renderStoreInformation}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    renderNewOrderBottomContainer = () => (
        <View style={[styles.row, styles.btns, { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) }]}>
            <CustomButton
                testID="rejectBtn"
                title={i18n.t('reject')}
                style={styles.rejButton}
                textStyle={styles.rejTxt}
                onPress={() => { this.navigationToRejectOrder() }}

            />
            <CustomButton
                testID="acceptBtn"
                title={i18n.t('accept')}
                style={styles.accButton}
                textStyle={styles.accTxt}
                onPress={() => { this.navigationToAcceptOrder() }}
            />
        </View>
    )

    renderInProcessBottomConatiner = () => (
        <View style={[styles.row, styles.btns, { paddingHorizontal: Scale(20) }]}>

            <CustomButton
                testID="inProcess-shipped"
                title={i18n.t('readyTOShip')}
                style={styles.accButton}
                textStyle={styles.accTxt}
                onPress={() =>
                    this.updateStatusModal()
                }
            />
        </View>
    )

    renderReadyForCollectionBottomContainer = () => (

        <View style={[styles.row, styles.btns, { paddingHorizontal: Scale(20) }]}>

            <CustomButton
                testID="orderStatus"
                title={i18n.t('order_status')}
                style={[styles.rejButton, { paddingHorizontal: 20, width: "100%" }]}
                textStyle={styles.rejTxt}
                onPress={() => this.trackOrder()}
            />
        </View>


    )



    // Customizable Area End

    render() {
        // Customizable Area Start
        let status = this.getTheStatusOfOrderDetails()
        let renderedContent = null;
        switch (status) {
            case "new_order":
                renderedContent = this.renderNewOrderBottomContainer();
                break;
            case "in_process":
                renderedContent = this.renderInProcessBottomConatiner();
                break;
            case "processed":
                renderedContent = this.renderReadyForCollectionBottomContainer();
                break;
            case "delivered":
                    renderedContent = this.renderReadyForCollectionBottomContainer();
                break;    
            case "shipped":
                renderedContent = this.renderReadyForCollectionBottomContainer();
                break;
            case "return_request":
                renderedContent = this.renderNewOrderBottomContainer();
                break;
            case "return_in_process":
                    renderedContent = this.renderNewOrderBottomContainer();
                break;
            case "return_under_process":
                    renderedContent = this.renderNewOrderBottomContainer();
                break;    
        }
        return (
            <SafeAreaView style={styles.safecontainerInOrderDetails}>
                <View style={styles.containerInOrderDetails}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

                    {this.state.loading && <CustomLoader />}
                    <View style={styles.viewContainerOrderDetails}>

                        <View style={[styles.headerViewMainOrderDetails,{flexDirection:FlexConditionManage(i18n.language)}]}>
                            <TouchableOpacity testID="btnBackOrderDetails" style={styles.backTouchOrderDetails}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssOrderDetails,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerTitleOrderDetails}>{"#" + this.state.orderDetailsList?.attributes?.order_management_order?.attributes.order_number}</Text>
                            </View>
                            <TouchableOpacity style={styles.filterIconTouch}>

                            </TouchableOpacity>
                        </View>

                        <View style={[{ flex: 1, }, { paddingHorizontal: Scale(20) }]}>



                            {this.renderAllTheProducts()}


                        </View>
                        {renderedContent}



                    </View>
                    <Modal
                        animationType="slide"
                        testID="modal"
                        transparent={true}
                        visible={this.state.changeTheOrderStatusModal}
                        statusBarTranslucent
                        onRequestClose={() =>
                            this.updateStatusModal()
                        }>
                        <View testID="closeBtn" style={styles.centeredView} >
                            <View style={styles.OrderDetailsModalView}>
                                <View style={styles.OrderDetailsModalViewContainer}>
                                    <Text style={styles.OrderDetailsModalViewText}>{i18n.t('changeStatus')}</Text>
                                </View >
                                <View style={styles.OrderDetailsModaBodyConatiner}>

                                    <Text style={styles.OrderDetailsModaBodyText}>
                                       {i18n.t('areYouSureWantToChageOrder')}{"\n"}
                                       {i18n.t('statusToReady')}{"\n"}
                                       {i18n.t('deliveryPartnerWillbe')}{"\n"}
                                       {i18n.t('orderPickup')}
                                    </Text>


                                </View>

                                <View style={[styles.row, styles.btns, { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) }]}>
                                    <CustomButton
                                        testID="closeBtn"
                                        title={i18n.t('close')}
                                        style={styles.OrderDetailsConfirmBtn}
                                        textStyle={styles.rejTxt}
                                        onPress={() =>
                                            this.updateStatusModal()
                                        }
                                    />
                                    <CustomButton
                                       testID="confirm"
                                        title={i18n.t('confirm')}
                                        style={styles.accButton}
                                        textStyle={styles.accTxt}
                                        onPress={this.updateTheStatus}
                                    />
                                </View>

                                <View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>




        );
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    containerInOrderDetails: {
        flex: 1,
    },
    safecontainerInOrderDetails: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',

    },
    headerViewMainOrderDetails: {
        flexDirection: 'row',
        marginTop: windowWidth * 3 / 100,
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: Scale(20)
    },
    viewContainerOrderDetails: {
        flex: 1,

    },
    backTouchOrderDetails: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100,
        marginTop: windowWidth * 1 / 100
    },
    filterIconTouch: {
        width: windowWidth * 6 / 100,
        height: windowWidth * 6 / 100
    },
    backIconCssOrderDetails: {
        width: windowWidth * 5 / 100,
        height: windowWidth * 5 / 100,
    },

    headerTitleOrderDetails: {
        color: '#375280',
        fontSize: windowWidth * 4.5 / 100,
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    },

    row: {
        flexDirection: "row",

    },
    displayFlex: {
        display: "flex",
        flex: 1,
    },
    btns: {

        paddingVertical: Scale(25),

    },
    accTxt: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },
    accButton: {
        flex: 1,
        borderRadius: Scale(2),
    },
    rejButton: {
        flex: 1,
        marginRight: Scale(10),
        borderRadius: Scale(2),
        backgroundColor: "#FFFFFF",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#CCBEB1",
    },
    rejTxt: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },

    div: {
        height: Scale(2),
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 0,

        marginTop: Scale(13),
        marginBottom: Scale(22)
    },


    imageStyle: {
        height: Scale(101),
        width: Scale(101),
    },
    productTitleTxt: {
        color: "#375280",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Lato-Regular",
        marginBottom: Scale(12),
        width: windowWidth * 40 / 100,

    },
    brandTxt: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 14,
        fontFamily: "Lato-Regular",
        marginBottom: Scale(10)
    },
    sizeTxt: {
        color: "#94A3B8",
        fontWeight: "500",
        fontSize: 14,
        fontFamily: "Lato-Regular",

    },
    productCodeText: {
        color: "#375280",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular",

        flex: 1,
    },
    productCodeValueText: {
        color: "#94A3B8",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular",

        flex: 1,
        textAlign: "right"
    },
    productCodeCotainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Scale(15),

    },

    totalProductContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Scale(15)
    },
    totalProductText: {
        color: "#9A9A9A",
        fontWeight: "500",
        fontSize: 16,
        fontFamily: "Lato-Regular"
    },
    orhh2Wrapper: {
        backgroundColor: "#D1FAE5",
        borderRadius: Scale(5),
        overflow: "hidden",
        paddingHorizontal: Scale(10),
        paddingVertical: Scale(4),
    },
    orhh2: {
        color: "#059669",
        fontFamily: "Lato",
        fontWeight: "400",
        fontSize: 12,
    },
    colorCircle: {
        width: Scale(9),
        height: Scale(9),
        borderRadius: 9 / 2,
        backgroundColor: '#707865',
        alignSelf: "center",
        marginTop: Scale(3.9)
    },
    imageRightContainer: {
        marginLeft: Scale(10),
        marginRight: i18n.language === 'ar' ? Scale(10):0,
        marginBottom: Scale(20)
    },
    sizeColorQuantittyContainer: {
        justifyContent: "space-between",


    },
    deliveredtxtConatiner: {
        paddingVertical: 5,

        borderRadius: 3
    },
    deliveredTimingsText: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "500",
        color: "#334155",
        fontFamily: "Lato",
    },
    sb: {
        justifyContent: "space-between",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    OrderDetailsModalView: {

        backgroundColor: 'white',

        justifyContent: "space-between"
    },

    OrderDetailsModalViewContainer: {
        padding: 10
    },
    OrderDetailsModalViewText: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Avenir-Heavy",
        fontWeight: "800",
        color: '#375280',

    },
    OrderDetailsModaBodyConatiner: {
        display: "flex",
        flexGrow: 1,
        padding: 10,

        paddingHorizontal: 25,
        borderColor: "#E3E4E5",
        borderWidth: 1,
        borderStyle: "solid"
    },
    OrderDetailsModaBodyText: {
        fontWeight: "500",
        color: '#375280',
        paddingVertical: 22,
        fontFamily: "Lato-Regular",
        fontSize: Scale(16),

        textAlign: "center",
        lineHeight: 24
    },
    OrderDetailsConfirmBtn: {
        flex: 1,
        marginRight: Scale(10),
        borderRadius: Scale(2),
        backgroundColor: "#FFFFFF",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#CCBEB1",
    },
    listEmptyContainer: {
        width: (windowWidth * 90) / 100,
        alignSelf: "center",
        alignItems: "center",
        marginTop: (windowWidth * 50) / 100,
    },
    noCatalogueText: {
        fontFamily: "Lato-Regular",
        fontWeight: "500",
    },

    reasonNamingText: {
        fontWeight: "400",
        color: '#375280',

        fontFamily: "Lato-Regular",
        fontSize: Scale(14),

        textAlign: "left",
        lineHeight: 22
    },
    reassonOfRejectionContainer: {
        backgroundColor: "#F8F8F8",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    reasonNamingValueText: {
        fontWeight: "700",
        color: '#375280',

        fontFamily: "Lato-Regular",
        fontSize: Scale(16),

        textAlign: "left",
        lineHeight: 24
    },
    returnview:{
        height:'auto',
        width:"100%",
        alignSelf:"center",
        backgroundColor:'#EEFFE8',
        padding:10,
        marginTop:5,
        marginBottom:5
    },
    returntext:{
        color:"#059669"
    }

});
// Customizable Area End
