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
  ScrollView,
  Modal,
  Platform,
  Keyboard
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
import Scale from "../../../components/src/Scale";
import CustomButton from "../../../components/src/CustomButton";
import Accordion from "../../../components/src/Accordion";
import { filtern,dots,closeicon, backIcon } from "./assets";
import ImageNotFound from "../../../components/src/ImageNotFound";
import { OrderItemSeller, SellerOrderSellerSeller } from "./types";

import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import OrderSummaryController, { Props } from "./OrderSummaryController";

import CustomSearch from "../../../components/src/CustomSearch";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

export default class OrderSummary extends OrderSummaryController {
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
  );
  renderInProcessContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#FFE7D0" }]}>
      <Text style={[styles.orhh2, { color: "#BE5B00" }]}>{i18n.t('inProcess')}</Text>
    </View>
  );

  renderReadyForCollectionContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#FEF3C7" }]}>
      <Text style={[styles.orhh2, { color: "#D97706" }]}>
        {i18n.t('readyForCollection')}
      </Text>
    </View>
  );

  renderOutOfDeliveryContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#F0E5FF" }]}>
      <Text style={[styles.orhh2, { color: "#6200EA" }]}>{i18n.t('outForDelivery')}</Text>
    </View>
  );

  renderDeliverdContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#E2E8F0" }]}>
      <Text style={[styles.orhh2, { color: "#375280" }]}>{i18n.t('deliveredText')}</Text>
    </View>
  );

  renderReturnRequestContainer = () => (
    <View
      style={[
        styles.orhh2Wrapper,
        { backgroundColor: "rgba(10, 132, 255, 0.1)" },
      ]}
    >
      <Text style={[styles.orhh2, { color: "#0A84FF" }]}>{i18n.t('returnRequest')}</Text>
    </View>
  );

  renderReadyReturnInProcessContainer = () => (
    <View
      style={[
        styles.orhh2Wrapper,
        { backgroundColor: "rgba(181, 91, 82, 0.1)" },
      ]}
    >
      <Text style={[styles.orhh2, { color: "#B55B52" }]}>
        {i18n.t('returnInProcess')}
      </Text>
    </View>
  );

  renderRefundInProcessContainer = () => (
    <View
      style={[
        styles.orhh2Wrapper,
        { backgroundColor: "rgba(251, 49, 219, 0.1)" },
      ]}
    >
      <Text style={[styles.orhh2, { color: "#FB31DB" }]}>
        {i18n.t('refundINProcress')}
      </Text>
    </View>
  );

  renderRefundedContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#E1EFE1" }]}>
      <Text style={[styles.orhh2, { color: "#039000" }]}>{i18n.t('refunded')}</Text>
    </View>
  );

  renderRejectedContainer = () => (
    <View style={[styles.orhh2Wrapper, { backgroundColor: "#FEE2E2" }]}>
      <Text style={[styles.orhh2, { color: "#DC2626" }]}>{i18n.t('Rejected')}</Text>
    </View>
  );

  renderStatusContainer = (text: string, status: string) => (
    <View style={[styles.row, styles.sb, styles.ordersH2,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <Text style={styles.orhh1}>#{text}</Text>
      {status === "new_order" && this.renderNewOrderContainer()}
      {status === "in_process" && this.renderInProcessContainer()}
      {status === "processed" && this.renderReadyForCollectionContainer()}
      {status === "shipped" && this.renderOutOfDeliveryContainer()}
      {status === "delivered" && this.renderDeliverdContainer()}
      {status === "return_request" && this.renderReturnRequestContainer()}
      {status === "return_in_process" &&
        this.renderReadyReturnInProcessContainer()}
      {status === "return_under_process" &&
        this.renderRefundInProcessContainer()}
      {status === "refunded" && this.renderRefundedContainer()}
      {status === "rejected" && this.renderRejectedContainer()}
    </View>
  );

  renderStaticSecondItem = () => (
    <View style={[styles.row, styles.ordersH2]}>
      <Image
        source={{ uri: "https://i.ibb.co/Mstq2hp/image-shawl2.png" }}
        style={styles.orderThumb}
      />
      <View style={styles.orderInfo}>
        <Text style={styles.prodName}>
          {i18n.t('shawlCollar')}
        </Text>
        <Text style={styles.quantity}>{`${i18n.t('Quantity')} : ` + 1}</Text>
      </View>
    </View>
  );

  renderStaticBottomFbContainer = (totalAmmount: string,shopName: string,cardName:string) => (
    <View style={[styles.row, styles.sb, styles.orderFh,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <Text style={styles.orhh1}>{this.state.roleType==="3"?i18n.t('paymentMode'):shopName}</Text>

      <Text style={styles.orhh1}>
        <Text style={styles.prodName}>
          {this.state.currencyIcon}{this.formatThePrice(totalAmmount)}
        </Text>{" "}
        {cardName || ''}
      </Text>
    </View>
  );

  renderSubItems = ({ item }: { item: OrderItemSeller }) => {
    const {
      quantity,
      catalogue,
      catalogue_name,
      catalogue_variant,
      catalogue_variant_front_image
    } = item.attributes;
    const catalogueName = catalogue_name?catalogue_name:catalogue?.attributes?.name
    const catalogueImage = catalogue_variant_front_image?catalogue_variant_front_image: catalogue_variant?.attributes?.front_image
    return (
      <View style={[styles.row, styles.ordersH2,{flexDirection:FlexConditionManage(i18n.language)}]}>
        <Image
          source={ImageNotFound(catalogueImage)}
          style={styles.orderThumb}
        />
        <View style={styles.orderInfo}>
          <Text style={styles.prodName}>{catalogueName}</Text>
          <Text style={[styles.quantity,{textAlign:TextAlignManage(i18n.language)}]}>{`${i18n.t('Quantity')} : ` + quantity}</Text>
        </View>
      </View>
    );
  };

  renderNewOrderBottomContainer = (OrderId: number) => {
    const id = OrderId.toString();
    const orderText = i18n.t('acceptOrder');
    const timeRemaining = this.findTimeRemainingForId(id);
    const title = `${orderText} (${timeRemaining})`;
    return (
      <View style={[styles.row, styles.btns]}>
        <CustomButton
          testID="rejectBtn"
          title={i18n.t('reject')}
          style={styles.rejButton}
          textStyle={styles.rejTxt}
          onPress={() => {
            this.navigationToRejectOrder(OrderId);
          }}
        />
        <CustomButton
          testID="acceptBtn"
          title={title}
          style={styles.accButton}
          textStyle={styles.accTxt}
          onPress={() => {
            this.navigationToAcceptOrder(OrderId);
          }}
        />
      </View>)
  };

  renderInProcessBottomConatiner = (OrderId: number) => (
    <View style={[styles.row, styles.btns]}>
      <CustomButton
        testID="inProcessOrderChangeBtn"
        title={i18n.t('readyTOShip')}
        style={styles.accButton}
        textStyle={styles.accTxt}
        onPress={() => this.updateStatusModal(OrderId)}
      />
    </View>
  );

   renderDeliverdTxtContainer = (driverDetails: { driverName: string, otp: string },arriveTime: { hours: number; minutes: number; }) => {
    const { driverName, otp } = driverDetails;

    return (
      <View style={[styles.deliveredtxtConatiner,{backgroundColor:this.showColor(driverDetails)}]}>
        {driverName !== "null" && driverName !== null && driverName !== "" && (
          <View style={[styles.row, styles.sb, { padding: 10 }]}>
            <Text style={styles.deliveredTimingsText}>{driverName}</Text>
            {(!isNaN(arriveTime.hours) || !isNaN(arriveTime.minutes)) && (
            <Text style={[styles.deliveredTimingsText, { fontWeight: "700" }]}>
            {i18n.t('arrivingIn')} {arriveTime.hours ? arriveTime.hours + ' hours' :''}{arriveTime.minutes ?arriveTime.minutes + ' mins':''}
            </Text>
            )}
          </View>
        )} 
        
        {otp !== "null" && otp !== null  && otp !== "" && (
          <View style={[styles.row, styles.sb, { padding: 10 }]}>
            <Text style={styles.deliveredTimingsText}>{i18n.t('pickupOTP')}</Text>
            <Text style={[styles.deliveredTimingsText, { fontWeight: "700" }]}>
              {otp}
            </Text>
          </View>
        )}
      </View>
    );
  };
  
  
  
  renderReadyForCollectionBottomContainer = (id:any ,orderId: number,driverDetails:{driverName:string,otp:string},arriveTime: { hours: number; minutes: number; }, status : any) => (
    <>
      {this.renderDeliverdTxtContainer(driverDetails,arriveTime)}
      <View style={[styles.row, styles.btns]}>
        <CustomButton
          testID="ReadyForCollectionOrderStatusBtn"
          title={i18n.t('order_status')}
          style={[styles.rejButton, { paddingHorizontal: 20, width: "100%" }]}
          textStyle={styles.rejTxt}
          onPress={() => this.trackOrder(id, orderId, status)}
        />
      </View>
    </>
  );
  renderOutOfDeliveryBottomContainer = (id:any ,orderId: number,status : any,driverDetails: {driverName: string; otp:string;},arriveTime: { hours: number; minutes: number; }) => (
    <>
      <View style={[styles.deliveredtxtConatiner,{backgroundColor:'#F4F4F4'}]}>
        <View style={[styles.row, styles.sb, { padding: 10 }]}>
          <Text style={[styles.deliveredTimingsText]}>{driverDetails?.driverName}</Text>
          {(!isNaN(arriveTime.hours) || !isNaN(arriveTime.minutes)) && (
          <Text style={[styles.deliveredTimingsText, { fontWeight: "700" }]}>
            {i18n.t('deliverIN')} : {arriveTime.hours ? arriveTime.hours + ' hours' :''}{arriveTime.minutes ?arriveTime.minutes + ' mins':''}
          </Text>
          )}
        </View>
      </View>

      <View style={[styles.row, styles.btns]}>
        <CustomButton
          title={i18n.t('order_status')}
          style={[styles.rejButton, { paddingHorizontal: 20, width: "100%" }]}
          textStyle={styles.rejTxt}
          onPress={() => {this.trackOrder(id, orderId, status)}}
        />
      </View>
    </>
  );

  renderReturnRequestBottomContainer = (orderId: number) => (
    <View style={[styles.row, styles.btns,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <CustomButton
        title={i18n.t('reject')}
        testID="rejectReturnButton"
        style={[styles.rejButton,{width: Scale(windowWidth * 0.45),  
        }]}
        onPress={() => this.rejectReturn(orderId)}
        textStyle={styles.rejTxt}
      />
      <CustomButton
        title={i18n.t('accept')}
        testID="acceptReturnButton"
        style={styles.accButton}
        textStyle={styles.accTxt}
        onPress={() => this.acceptReturnModal(orderId)}
      />
    </View>
  );

  renderReturnInProcessBottonContainer = (orderId: number,return_type:string) =>{ if(return_type==="self_drop_off"){return (

    <CustomButton
    testID="returnInProgressButton"
    title={i18n.t('returned')}
    style={[
      styles.rejButton,
      { paddingHorizontal: 20, marginVertical: 10, width: "100%" },
    ]}
    textStyle={styles.rejTxt}
    onPress={() => this.trackReturnedOrder(orderId)}
  />
  )}else{
    return(
    <CustomButton
      testID="returnInProgressButton"
      title={i18n.t('order_status')}
      style={[
        styles.rejButton,
        { paddingHorizontal: 20, marginVertical: 10, width: "100%" },
      ]}
      textStyle={styles.rejTxt}
      onPress={() => this.trackRejectedOrder(orderId)}
    />
    )
  }};

  renderReturnUnderProcessBottomContainer = (
    orderId: number,
    orderTag: string,
    orderPrice:string,
    return_type:string
  ) => (
    <View style={[styles.row, styles.btns,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <CustomButton
        title={i18n.t('reject')}
        testID="rejectRefundButton"
        style={styles.rejButton}
        textStyle={styles.rejTxt}
        onPress={() => this.rejectRefund(orderId)}
      />
      <CustomButton
        title={i18n.t('initiateRefund')}
        testID="initiateRefundButton"
        style={styles.accButton}
        textStyle={styles.accTxt}
        onPress={() =>return_type==="self_drop_off"?this.trackRefundedOrder(orderId): this.initiateRefund(orderTag,orderPrice)}
      />
    </View>
  );

  renderTheItems = ({ item }: { item: SellerOrderSellerSeller }) => {
    const { order_management_order, status, id, order_items,estimated_arrival_time } = item.attributes;
    const orderNumber = `${order_management_order.attributes.order_number
      } | ${this.getTimeInCorrectFormat(
        order_management_order.attributes.placed_at
      )}`;
    const totalPrice = this.getTheTotalPrice(order_items);
    const shopName = this.getBrandName(order_items);
    const driverDetails = this.getDriverDetails(order_items)
    const arriveTime = this.onGetArriveTime(estimated_arrival_time);
    let renderedContent = null;
    switch (status) {
      case "new_order":
        renderedContent = this.renderNewOrderBottomContainer(id);
        break;
      case "in_process":
        renderedContent = this.renderInProcessBottomConatiner(id);
        break;
      case "processed":
        renderedContent = this.renderReadyForCollectionBottomContainer(order_items[0].id, id,driverDetails,arriveTime,status);
        break;
      case "shipped":
        renderedContent = this.renderOutOfDeliveryBottomContainer(order_items[0].id, id,status,driverDetails,arriveTime);
        break;
      case "return_request":
        renderedContent = this.renderReturnRequestBottomContainer(id);
        break;
      case "return_in_process":
        renderedContent = this.renderReturnInProcessBottonContainer(id,order_items[0].attributes.return_type);
        break;
      case "return_under_process":
        renderedContent = this.renderReturnUnderProcessBottomContainer(
          id,
          order_management_order.attributes.order_number,
          totalPrice,
          order_items[0].attributes.return_type
        );
        break;
    }

    return (
      <>
        {this.renderStatusContainer(orderNumber, status)}
        <TouchableOpacity
          testID="itemsOnPress"
          onPress={() => {
            this.navigationToOrderDetailsSeller(item);
          }}>
          <FlatList
            testID="sub_flatList"
            data={order_items}
            renderItem={this.renderSubItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </TouchableOpacity>
        {this.renderStaticBottomFbContainer(totalPrice,shopName,order_management_order.attributes?.payment_detail?.payment_type)}
        {renderedContent}

        <View style={styles.div} />
      </>
    );
  };

  renderAllOrderItem = () => (
    <>
      <FlatList
        testID="flatList-main"
        style={{ flex: 1 }}
        data={this.state.orderList}
        renderItem={this.renderTheItems}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={() =>
          !this.state.loading ? (
            <View style={styles.listEmptyContainer}>
              <Text
                style={[
                  { fontSize: (windowWidth * 5) / 100, color: "#375280" },
                  styles.noCatalogueText,
                ]}
              >
                {i18n.t('thereAreNoOrder')}
              </Text>
            </View>
          ) : null
        }
      />
    </>
  );

  renderRefundSection = ({
    data,
    count,
    title,
    isOpen,
    accordionFunc,
    toggleTestID,
    childTestId = "desc-ct",
    flTestId = "flatlist-main",
  }: {
    data: SellerOrderSellerSeller[];
    count: number | string;
    title: string;
    isOpen: boolean;
    accordionFunc: (curr: boolean) => void;
    toggleTestID: string;
    childTestId?: string;
    flTestId?: string;
  }) => (
    <Accordion
      open={isOpen}
      setOpen={accordionFunc}
      label={`${title} (${count})`}
      containerStyle={[styles.accordion, { marginVertical: Scale(7) }]}
      toggleTestID={toggleTestID}
      childTestID={childTestId}
    >
      <FlatList
        testID={flTestId}
        style={{ flex: 1 }}
        data={data}
        renderItem={this.renderTheItems}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={() =>
          !this.state.loading ? (
            <View style={styles.listEmptyContainerRefund}>
              <Text
                style={[
                  { fontSize: (windowWidth * 5) / 100, color: "#375280" },
                  styles.noCatalogueText,
                ]}
              >
                {i18n.t('thereAreNoOrder')}
              </Text>
            </View>
          ) : null
        }
      />
    </Accordion>
  );

  renderReturnRefundItem = () => (
    <View style={{ flex: 1 }}>
      {this.renderRefundSection({
        data: this.state.returnRequest,
        count: this.state.returnRequestCount,
        title: i18n.t('returnRequest'),
        isOpen: this.state.returnRequestAccordian,
        accordionFunc: (open) => this.handleSetreturnRequestAccordian(open),
        toggleTestID: "returnRequestAccordian",
        childTestId: "returnRequestContainer",
      })}
      <View style={styles.div} />
      {this.renderRefundSection({
        data: this.state.returnAndRefundList.return_in_process,
        count: this.state.returnInProcessCount,
        title: i18n.t('returnInProcess'),
        isOpen: this.state.returnInProcessAccordian,
        accordionFunc: (open) => this.handleSetreturnInProcessAccordian(open),
        toggleTestID: "returnInProcessAccordian",
        childTestId: "returnInProcessFl",
      })}
      <View style={styles.div} />
      {this.renderRefundSection({
        data: this.state.returnAndRefundList.return_under_process,
        count: this.state.returnUnderProcessCount,
        title: i18n.t('refundUnderProcess'),
        isOpen: this.state.returnUnderProcessAccordian,
        accordionFunc: (open) =>
          this.handleSetreturnUnderProcessAccordian(open),
        toggleTestID: "returnUnderProcessAccordian",
      })}
      <View style={styles.div} />
      {this.renderRefundSection({
        data: this.state.returnAndRefundList.refunded,
        count: this.state.refundedCount,
        title: i18n.t('refunded'),
        isOpen: this.state.returnRefundedAccordian,
        accordionFunc: (open) => this.handleSetreturnRefundedAccordian(open),
        toggleTestID: "returnRefundedAccordian",
        childTestId: "returnRefundedFl",
      })}
    </View>
  );

  renderHorizontalScrollingItems = () => {
    const {
      allOrdersCount,
      newOrderCount,
      inProcessCount,
      rejectedCount,
      deliveredCount,
      outOfDeliveryCount,
      returnAndRefundCount,
      readyForCollectionCount,
    } = this.state;
    const buttons = [
      { index: "all_orders", value: `${i18n.t('allOrdersText')} (${allOrdersCount})` },
      { index: "new_orders", value: `${i18n.t('newOrdersText')} (${newOrderCount})` },
      { index: "in_process", value: `${i18n.t('inProcess')} (${inProcessCount})` },
      {
        index: "processed",
        value: `${i18n.t('readyForCollection')} (${readyForCollectionCount})`,
      },
      { index: "shipped", value: `${i18n.t('outForDelivery')} (${outOfDeliveryCount})` },
      { index: "delivered", value: `${i18n.t('deliveredText')} (${deliveredCount})` },
      {
        index: "return_and_refund",
        value: `${i18n.t('returnRefundText')} (${returnAndRefundCount})`,
      },
      { index: "rejected", value: `${i18n.t('Rejected')} (${rejectedCount})` },
    ];
    return (
      <View style={styles.topHorizontalScrollingStyle}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection:FlexConditionManage(i18n.language) }}
        >
          {buttons.map(({ index, value }) => (
            <TouchableOpacity
              testID={index}
              key={index}
              style={[
                styles.button,
                index === this.state.focusedButtonIndex &&
                styles.focusedButtonstyle,
              ]}
              onPress={() => this.handleFocusSelectedView(index)}
            >
              <Text
                style={[
                  styles.buttonText,
                  index === this.state.focusedButtonIndex && {
                    color: "#375280",
                  },
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  renderBodyContentConatiner = () => {
    let renderedContent = null;
    switch (this.state.focusedButtonIndex) {
      case "all_orders":
        renderedContent = this.renderAllOrderItem();
        break;
      case "new_orders":
        renderedContent = this.renderAllOrderItem();
        break;
      case "in_process":
        renderedContent = this.renderAllOrderItem();
        break;
      case "processed":
        renderedContent = this.renderAllOrderItem();
        break;
      case "shipped":
        renderedContent = this.renderAllOrderItem();
        break;
      case "delivered":
        renderedContent = this.renderAllOrderItem();
        break;
      case "return_and_refund":
        renderedContent = this.renderReturnRefundItem();
        break;
      case "rejected":
        renderedContent = this.renderAllOrderItem();
        break;
      default:
        break;
    }
    return renderedContent;
  };

  closeIcon = (language:string) =>{
    return(
      <Text 
      testID="inventorytext"
      onPress={()=>this.navigationToInventoryManagement()}
    style={[styles.inventorytext,{left:language==='en'? 20 : windowWidth*70/100,top:30}]}>{i18n.t('inventoryMangement')}</Text>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <SafeAreaView style={styles.safeContainerInAssign}>
        <View style={styles.containerInAssign}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            translucent={false}
            hidden={false}
            networkActivityIndicatorVisible={false}
          />

          {this.state.loading && <CustomLoader />}
          <View style={styles.viewContainerAssignStoreInAssign}>
            <View style={[styles.headerViewMainAssignStoreInAssign,{flexDirection:FlexConditionManage(i18n.language)}]}>
              <View>
                <Text style={styles.headerTitleAssignstoreInAssign}>
                  {i18n.t('orderSummary')}
                </Text>
              </View>
              <TouchableOpacity
              testID="threeDotBtn"
              onPress={()=>this.threeDotFunction()}
              style={styles.filterIconTouchInAssign}>
                <Image
                  source={this.state.roleType==='3'?dots:filtern}
                  style={styles.backIconCssAssignstoreInAssign}
                ></Image>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }}>
              <View style={[styles.topViewContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>{i18n.t('total')}</Text>
                  <Text style={styles.totalValueText}>
                    {this.state.allOrdersCount}
                  </Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>{i18n.t('shipped')}</Text>
                  <Text style={styles.totalValueText}>
                    {this.state.outOfDeliveryCount}
                  </Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>{i18n.t('delivered')}</Text>
                  <Text style={styles.totalValueText}>
                    {this.state.deliveredCount}
                  </Text>
                </View>
              </View>

              <CustomSearch
                containerStyle={styles.shopMainViewContainer}
                testID={"searchInputBox"}
                keyboardType="default"
                maxLength={30}
                returnKeyLabel="done"
                returnKeyType="done"
                placeholder={i18n.t('searchOrder')}
                value={this.state.searchText}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  this.searchOrderByNameAndNumber()
                }
                }
                onChangeText={text => this.setValueForSearch(text)}
              />
              {
                this.state.selectedModeStr == "Stylist" &&
              <TouchableOpacity onPress={()=>{
                  this.NavigateToProductSourcingOrders();
                }} style={[styles.productSourceMainView,{flexDirection: FlexConditionManage(i18n.language)}]}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                  color: '#375280',
                   lineHeight: 24,
                }}>
               {i18n.t('productSourcingOrders')}
                </Text>
                
                 <Image resizeMode="contain" source={backIcon} 
                style={[
                  {
                    transform: [
                      { scaleY: -1 * ImageReverseManage(i18n.language) },
                      { scaleX: -1 * ImageReverseManage(i18n.language) },
                    ],
                  },
                  styles.nextIcon,
                ]}
                 ></Image>
              </TouchableOpacity>
              }

              {this.renderHorizontalScrollingItems()}
              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  marginHorizontal: Scale(20),
                }}
              >
                {this.renderBodyContentConatiner()}
              </View>
              <Modal
                animationType="slide"
                testID="dotModal"
                transparent={true}
                visible={this.state.showModal}
                statusBarTranslucent
                onRequestClose={() => this.dotCloseFunc()}
              
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView1}>
                    {this.closeIcon(i18n.language)}
                  <TouchableOpacity testID="closeDotIcon" onPress={()=> this.dotCloseFunc()} style={styles.circlesview}>
                    <Image
                        source={closeicon}
                        style={{height:40,width:40}}
                    />
                  </TouchableOpacity>
                  </View>
                </View>
              </Modal>  
              <Modal
                animationType="slide"
                testID="modal"
                transparent={true}
                visible={this.state.changeTheOrderStatusModal}
                statusBarTranslucent
                onRequestClose={() => this.updateStatusModal()}
              >
                <View testID="closeBtn" style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalTextContainer}>
                      <Text style={styles.modalText}>{i18n.t('changeStatus')}</Text>
                    </View>
                    <View style={styles.modalBodyConatiner}>
                      <Text style={styles.modalBodyText}>
                        {i18n.t('areYouSureWantToChageOrder')}{"\n"}
                        {i18n.t('statusToReady')}{"\n"}
                        {i18n.t('deliveryPartnerWillbe')}{"\n"}
                        {i18n.t('orderPickup')}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.row,
                        styles.btns,
                        { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) },
                      ]}
                    >
                      <CustomButton
                        testID="closeBtn"
                        title={i18n.t('close')}
                        style={styles.confirmBtn}
                        textStyle={styles.rejTxt}
                        onPress={() => this.updateStatusModal()}
                      />
                      <CustomButton
                        testID="confirmBtn"
                        title={i18n.t('confirm')}
                        style={styles.accButton}
                        textStyle={styles.accTxt}
                        onPress={this.updateTheStatus}
                      />
                    </View>

                    <View></View>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                testID="returnModal"
                visible={this.state.acceptReturnModal}
                statusBarTranslucent
                onRequestClose={this.closeReturnModal}
              >
                <View testID="closeBtn" style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalTextContainer}>
                      <Text style={styles.modalText}>{i18n.t('acceptReturn')}</Text>
                    </View>
                    <View style={styles.modalBodyConatiner}>
                      <Text style={styles.modalBodyText}>
                        {i18n.t('areYouSureAcceptTheReturnOrder')}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.row,
                        styles.btns,
                        { paddingHorizontal: Scale(20),flexDirection:FlexConditionManage(i18n.language) },
                      ]}
                    >
                      <CustomButton
                        testID="closeReturnBtn"
                        title={i18n.t('close')}
                        style={styles.confirmBtn}
                        textStyle={styles.rejTxt}
                        onPress={this.closeReturnModal}
                      />
                      <CustomButton
                        testID="confirmReturnBtn"
                        title={i18n.t('confirm')}
                        style={styles.accButton}
                        textStyle={styles.accTxt}
                        onPress={this.acceptReturn}
                      />
                    </View>
                    <View></View>
                  </View>
                </View>
              </Modal>
            </ScrollView>
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
    backgroundColor: "#fff",
  },
  circlesview:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:"white",
    right:15,
    top:-18
  },
  headerViewMainAssignStoreInAssign: {
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    alignContent: "center",
    marginHorizontal: Scale(20),
    alignItems: "center",
  },
  viewContainerAssignStoreInAssign: {
    flex: 1,
    alignSelf: "center",
  },
  nextIcon:{
    width: 14,
    height: 14,
    marginRight: 10,
    tintColor:'#375280',
  },
  filterIconTouchInAssign: {},
  backIconCssAssignstoreInAssign: {
    width: (windowWidth * 7) / 100,
    height: (windowWidth * 7) / 100,
  },
  headerTitleAssignstoreInAssign: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  topViewContainer: {
    flexDirection: "row",
    marginTop: (windowWidth * 3) / 100,
    justifyContent: "space-between",
    marginHorizontal: Scale(20),
  },

  totalContainer: {
    width: Scale(116),
    height: Scale(83),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  totalText: {
    color: "#334155",
    fontSize: Scale(14),
    textAlign: "center",
    fontFamily: "Lato",
    fontWeight: "400",
  },
  totalValueText: {
    color: "#375280",
    fontSize: Scale(22),
    textAlign: "center",
    fontFamily: "Lato",
    fontWeight: "700",
  },
  shopMainViewContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    marginHorizontal: Scale(20),
    alignSelf: "center",
    marginVertical: Scale(20),
  },
  topHorizontalScrollingStyle: {
    marginTop: Scale(7),
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    justifyContent: "center",
    height: Scale(49),
  },
  focusedButtonstyle: {
    borderBottomWidth: 4,
    borderBottomColor: "#375280",
  },
  button: {
    height: Scale(49),

    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#fff",

    paddingHorizontal: Scale(5),
  },
  buttonText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "600",
    color: "#94A3B8",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(10),
    lineHeight: Scale(18),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },

  hh1: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato",
  },
  hh2Wrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#375280",
  },
  hh2: {
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato",
  },
  ordersH1: {
    marginVertical: Scale(12),
  },
  ordersH2: {
    marginBottom: Scale(16),
  },
  orderFh: {
    marginBottom: Scale(5),
  },
  orhh1: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  orhh2: {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 12,
  },
  orhh2Wrapper: {
    backgroundColor: "#D1FAE5",
    borderRadius: Scale(5),
    overflow: "hidden",
    paddingHorizontal: Scale(10),
    paddingVertical: Scale(4),
  },
  orderThumb: {
    height: Scale(48),
    width: Scale(48),
    borderRadius: Scale(4),
    resizeMode: "cover",
  },
  orderInfo: {
    marginHorizontal: Scale(12),
  },
  prodName: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato",
  },
  quantity: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "400",
    color: "#375280",
    fontFamily: "Lato",
  },
  deliveredtxtConatiner: {
    paddingVertical: 5,

    borderRadius: 3,
  },
  deliveredTimingsText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato",
  },
  rejButton: {
    width: Scale(windowWidth * 0.35),
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
  },
  accButton: {
    flex: 1,
    borderRadius: Scale(2),
  },
  accTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  div: {
    height: Scale(2),
    flex: 1,
    backgroundColor: "#DDDDDD",

    marginBottom: Scale(20),
    marginTop: Scale(10),
  },
  btns: {
    paddingVertical: Scale(12),
    marginBottom: Scale(Platform.select({ ios: 24, default: 12 })),
  },
  accordion: {},
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  modalView1: {
    backgroundColor: "white",
    flexDirection:"row",
    justifyContent: "space-between",
    height:100,
  },
  inventorytext:{
    left:20,
    top:20,
    color:"#375280",
    fontSize:20,
    fontWeight:'500'
  },
  modalTextContainer: {
    padding: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
    color: "#375280",
  },
  modalBodyConatiner: {
    display: "flex",
    flexGrow: 1,
    padding: 10,
    paddingHorizontal: 25,
    borderColor: "#E3E4E5",
    borderWidth: 1,
    borderStyle: "solid",
  },
  modalBodyText: {
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    textAlign: "center",
    lineHeight: 24,
  },
  confirmBtn: {
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
  listEmptyContainerRefund: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: (windowWidth * 25) / 100,
  },
  noCatalogueText: {
    fontFamily: "Lato-Regular",
    fontWeight: "500",
  },
  productSourceMainView:{
    flex: 1,
    marginVertical: 5,
    marginHorizontal: Scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation:3,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
     paddingHorizontal:10,
    paddingVertical:14,
    backgroundColor:'#ffffff'
    },
    redDot:{
      backgroundColor:'red',
      width:6.5,height:6.5,
      borderRadius:3.25,
      position:'absolute',
      top:6,
      right:7
     }
});
// Customizable Area End
