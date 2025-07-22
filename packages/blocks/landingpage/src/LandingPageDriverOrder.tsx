import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import LandingPageDriverController, {
  Props,
} from "./LandingPageDriverController";
import {
  Line,
  arrow_right,
  circle,
  cross,
  dollar,
  downArrow,
  headset_mic,
  location,
  minus,
  navigation,
  notification,
  phone,
  store1,
  view1,
  view2,
  view3,
  chat
} from "./assets";
import MapViewDirections from "react-native-maps-directions";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { scale } from "react-native-size-matters";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NewOrder } from "./responses";
import CustomLoader from "../../../components/src/CustomLoader";
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
import ManageDynamicMargin from "../../../components/src/ManageDynamicMargin";
// Customizable Area End

export default class LandingPageDriverOrder extends LandingPageDriverController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderLeftActions = () => {
    return (
      <TouchableOpacity>
        <Text>.</Text>
      </TouchableOpacity>
    );
  };
  GOOGLE_MAPS_APIKEY = "AIzaSyC74_7QnkOgBJRb2SecLdMvVrDL57anZzw";

  showAcceptButton(){
    if (this.state.newOrderList.attributes.driver_order_status==="in_progress") {
      return (
        <View style={[styles.orderAccept,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <GestureHandlerRootView style={{width:'80%'}}>
            <Swipeable
              renderLeftActions={this.renderLeftActions}
              friction={2}
              overshootFriction={8}
              data-test-id="swipe"
              onSwipeableLeftOpen={() => {
                this.acceptOrRejectOrder("accept");
               
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.slide}>
                  <Image source={view1} />
                  <Image source={view2} />
                  <Image source={view3} />
                </View>
                <View style={styles.accept}>
                  <Text style={styles.acceptTxt}>{i18n.t('slide_to_accept_order')}</Text>
                </View>
              </View>
            </Swipeable>
          </GestureHandlerRootView>
          <TouchableOpacity
          style={{width:'20%'}}
            testID="rejectId"
            onPress={() => {
              this.cancelModalClose()
            }}
          >
            <Image source={minus}  style={{width:'100%',left:5, height: scale(65),marginTop:scale(3)}} resizeMode="cover"/>
          </TouchableOpacity>
        </View>
      );
    }
  }
  arivedPickedView (){
    return(
      <View style={{ flexDirection:FlexConditionManage(i18n.language)}}>
              <View style={styles.slide}>
                <Image source={view1} />
                <Image source={view2} />
                <Image source={view3} />
              </View>
              <View style={styles.accept}>
                <Text style={styles.acceptTxt}>
                  {i18n.t('arrived_at_pick_up_location')}
                </Text>
              </View>
            </View>
    )
  }
  arrivedAtLocationButton(){
    if (this.state.storeSideStatus && this.state.newOrderList.attributes.driver_order_status==="accepted" ) {
      return (
        <View style={[styles.orderAccept,{top:5,flexDirection:FlexConditionManage(i18n.language)}]}>
        <GestureHandlerRootView>
          <Swipeable
            renderLeftActions={this.renderLeftActions}
            friction={2}
            overshootFriction={8}
            data-test-id="swipe2"
            onSwipeableLeftOpen={() => {
              this.ArrivedAtLocation();
             
            }}
          >
            {this.arivedPickedView()}
          </Swipeable>
        </GestureHandlerRootView>
        </View>
      );
    }
  }
  storeNavigationButton(){
    if (!this.state.storeSideStatus && this.state.newOrderList.attributes.driver_order_status==="accepted") {
      return (
        <TouchableOpacity
          style={[styles.navigationContainer,{flexDirection:FlexConditionManage(i18n.language)}]}
          activeOpacity={0.6}
          onPress={this.handleNavigation}
          testID="navigationId"
        >
          <Image source={navigation} style={styles.navigation} resizeMode="cover"/>
          <Text style={styles.navigationText}>{i18n.t('start_navigation')}</Text>
        </TouchableOpacity>
      );
    }
  }
  customerRichLocationButton(){

    if (this.state.customerSideDone && (this.state.newOrderList.attributes.driver_order_status==="store_otp_confirm" || ((this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp" && this.state.newOrderList.attributes.status==="return_in_process")))) {
      return (
        <View style={[styles.orderAccept,{top:5,flexDirection:FlexConditionManage(i18n.language)}]}>
        <GestureHandlerRootView>
          <Swipeable
            renderLeftActions={this.renderLeftActions}
            friction={2}
            overshootFriction={8}
            data-test-id="reachswipe"
            onSwipeableLeftOpen={() => {
              if( this.state.newOrderList.attributes.status==="return_in_process"){
                this.sendStoreOTP();
              }else{
                this.otpByDriver()
              
              }
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.slide}>
                <Image source={view1} />
                <Image source={view2} />
                <Image source={view3} />
              </View>
              <View style={styles.accept}>
                <Text style={styles.acceptTxt}>
                  {i18n.t('reach_to_drop_location')}
                </Text>
              </View>
            </View>
          </Swipeable>
        </GestureHandlerRootView>
        </View>
      );
    }
  }
  customerNavigationButton(){
  if (!this.state.customerSideDone && (this.state.newOrderList.attributes.driver_order_status==="store_otp_confirm" || ((this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp" && this.state.newOrderList.attributes.status==="return_in_process")))) {
    return (
      <TouchableOpacity
        style={[styles.navigationContainer2,{flexDirection:FlexConditionManage(i18n.language)}]}
        activeOpacity={0.6}
        onPress={this.handleCustNavigation}
        testID="navigationId2"
      >
        <Image source={navigation} style={styles.navigation2} resizeMode="cover"/>
        <Text style={styles.navigationText2}>{i18n.t('start_navigation')}</Text>
      </TouchableOpacity>
    );
  }
}
  renderOrderContent() {
  return(
    <View style={{width:'100%',alignSelf:'center'}}>{
    this.showAcceptButton()}
    {this.arrivedAtLocationButton()}
    {this.storeNavigationButton()}
    {this.customerRichLocationButton()}
   { this.customerNavigationButton()}
  
    </View>
  )
  }

  renderContent() {
    if (this.state.newOrderList.attributes.driver_id ===null) {
      return (
        <View style={[styles.info,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <View style={styles.dollar}>
            <Image source={dollar} style={styles.img} />
            <Text style={styles.dollartxt}>${this.state.newOrderList.attributes.expected_earning || ''}</Text>
            <Text style={styles.title}>{i18n.t('expected_earnings')}</Text>
          </View>
          <View style={styles.dollar}>
            <Image source={arrow_right} style={styles.img} />
            <Text style={styles.dollartxt}>{this.state.newOrderList.attributes.pickup_distance}</Text>
            <Text style={styles.title}>{i18n.t('Pickup_Distance')}</Text>
          </View>
          <View style={styles.dollar}>
            <Image source={location} style={[styles.img]} />
            <Text style={styles.dollartxt}>{this.state.newOrderList.attributes.drop_distance}</Text>
            <Text style={styles.title}>{i18n.t('drop_distance')}</Text>
          </View>
        </View>
      );
    }else {
      return (
        null
      );
    }
  }

  renderOrderNavigation = () => (

    <View style={[{flexDirection:FlexConditionManage(i18n.language),justifyContent:'space-between',alignItems:'center',width:'94%',alignSelf:'center'}]} >
      <TouchableOpacity testID="orderBack" onPress={this.handleBackPress}>
        <Image source={downArrow} style={{width:30,height:30}}/>
      </TouchableOpacity>
      <Text style={styles.new2}>
        {i18n.t('order_id')}
        {
          this.state.newOrderList?.attributes?.order_number
        }
      </Text>
      <TouchableOpacity style={[styles.notificationTouch,{marginTop:-5}]}>
        <Image
          resizeMode="contain"
          source={notification}
          style={styles.notificationIcon2}
        />
      </TouchableOpacity>
    </View>
  );

  renderCustomerInfo = () => {
    const full_name =this.setCustomerName()
    const address1 =this.getDeliveryInfo();
    const id = this.state.newOrderList.attributes.customer_information.id 
    return (
      <>
      <View style={[{flexDirection:FlexConditionManage(i18n.language),alignSelf:'flex-start',justifyContent:'space-between',alignItems:'flex-start'}]}>
      <View style={[styles.icons,{width:'70%',paddingHorizontal:5,flexDirection:FlexConditionManage(i18n.language)}]}>
      <View>
        <Text style={[styles.custInfo,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('info')}</Text>
        <View style={[styles.fashionDiv2,{flexDirection:FlexConditionManage(i18n.language)}]}>
          <Text style={[styles.fashionHub2,{textAlign:TextAlignManage(i18n.language)}]}>{full_name}</Text>
        </View>
        <Text style={[styles.address2,{textAlign:TextAlignManage(i18n.language)}]}>
        {[address1]}
        </Text>
      </View>
    </View>
     <View style={[styles.call,{width:'28%',alignItems:'flex-end',flexDirection:FlexConditionManage(i18n.language)}]}>
     <TouchableOpacity activeOpacity={0.7} testID="chat" onPress={()=>this.chatWithCustomer(id.toString())}>
       <Image source={chat} style={styles.phone1} />
     </TouchableOpacity>
     <TouchableOpacity activeOpacity={0.7} testID="call" onPress={()=>this.callInPhoneCustomer()}>
       <Image source={headset_mic} style={styles.headset} />
     </TouchableOpacity>
     <TouchableOpacity activeOpacity={0.7} testID="call_new" onPress={()=>this.callInPhone()}>
       <Image source={phone} style={styles.phone1} />
     </TouchableOpacity>
   </View>
   </View>
   <Text style={[styles.date1,{marginBottom:25,left:2,textAlign:TextAlignManage(i18n.language)}]}>
            {`#${this.state.newOrderList.attributes?.order_number || ""} | ${ this.formatTime(
   this.state.newOrderList?.attributes?.order_placed_at) || ""
            } | ${this.formatDate(
              this.state.newOrderList?.attributes?.order_placed_at) || ""}`}
          </Text>
 </>
    );
  };
showReachText(){
  if(this.state.newOrderList?.attributes?.status==="return_in_process" && this.state.storeSideStatus){
    return"Reach Customer !";
  }else
    if(this.state.storeSideStatus){
      return "Reach Store !"
    }else{  
      return "New Order !";
  }
}
  renderGeneralNavigation = () => (
    <View style={[styles.navbar,{flexDirection:FlexConditionManage(i18n.language)}]}>
      <TouchableOpacity onPress={this.handleBackPress} testID="backPress">
        <Image source={downArrow} style={{width:30,height:30}}/>
      </TouchableOpacity>
      <Text style={styles.new}>
     { this.showReachText()}
      </Text>
      <TouchableOpacity style={styles.notificationTouch}>
        <Image
          resizeMode="contain"
          source={notification}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );

  
  renderNewOrderText() {
    if (this.state.newOrderList.attributes.driver_id===null) {
      return <Text style={styles.new}>{i18n.t('new_order_!')}</Text>;
    }else{
      return(
        <View style={{paddingBottom:15,alignSelf:'center'}}>
          <View style={{borderColor:'#f2f3f5',borderWidth:2,paddingHorizontal:35}}></View>
        </View>
      )
    }
    
  }

 
 
  renderNavigation() {
    
    return (
      <>
       {(this.state.newOrderList.attributes.driver_order_status==="send_customer_otp" || this.state.newOrderList.attributes.driver_order_status==="store_otp_send" || this.state.newOrderList.attributes.driver_order_status==="store_otp_confirm") && !this.state.orderCompleted
          ? this.renderOrderNavigation()
          : null}
         { this.state.newOrderList.attributes.driver_order_status==="accepted"?this.renderGeneralNavigation() : null}
      </>
    );
  }
showNavigationInMap(){
  if((this.state.customerSideDone && this.state.newOrderList.attributes.driver_order_status==="store_otp_confirm") || (this.state.storeSideStatus && this.state.newOrderList.attributes.driver_order_status==="accepted") ){
    return(
      <View style={{flex:1,alignSelf:'flex-end',justifyContent:'flex-end',right:10}}>
        <TouchableOpacity
          style={{ 
          marginBottom:10,
          padding:2,
          backgroundColor: "#375280",
        alignItems:'center',
          flexDirection: "row",
          borderRadius: 2,}}
          activeOpacity={0.6}
          onPress={!this.state.customerSideDone?this.handleNavigation :this.handleCustNavigation}
          testID="navigationId2"
        >
          <Image source={navigation} style={{marginLeft:3,width:18,height:18,tintColor:'#fff'}} />
          <Text style={[styles.navigationText2,{fontSize:12}]}>{i18n.t('start_navigation')}</Text>
        </TouchableOpacity>
      </View>
   )
  }
}
  showDateTimeName=()=>{
    if(this.state.newOrderList.attributes.driver_id!=null){
        return(
            <>
              <Text style={[styles.date1,{marginLeft:5,textAlign:TextAlignManage(i18n.language),marginRight: ManageDynamicMargin(i18n.language,(windowWidth * 5) / 100,0)}]}>
                        {`#${this.state.newOrderList.attributes?.order_number || ""} | ${ this.formatTime(
              this.state.newOrderList?.attributes?.order_placed_at) || ""
                        } | ${this.formatDate(
                          this.state.newOrderList?.attributes?.order_placed_at) || ""}`}
              </Text>
              <Text style={[styles.date1,{marginBottom:15,marginLeft:5,textAlign:TextAlignManage(i18n.language),marginRight: ManageDynamicMargin(i18n.language,(windowWidth * 5) / 100,0)}]}>{this.setCustomerName()}</Text>
            </>
        )
    }
    else{
      return null
    }
}
showOrderComplete(){
      const address = this.getBusinessInfo();
      const store =this.setStoreName();
      const address1 =this.getDeliveryInfo();
      const full_name =this.setCustomerName();
    if(this.state.orderCompleted ){
        return ( 
            <ScrollView >
              <View style={{minHeight:'100%',backgroundColor:'#fff'}}>
              <View style={[styles.navbar3,{flexDirection:FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="orderBack" style={{width:'15%'}}   onPress={() => {
                  this.handleDashboard();
                }}>
                  <Image source={cross} style={{width:80,height:80}} />
                </TouchableOpacity>
                <Text style={[styles.new2,{width:'80%',marginTop:0}]}>{i18n.t('order_completed')}</Text>
              <View  style={{width:'10%'}}></View>
              </View>
              <View style={[styles.orderInfo,{marginTop:-10,paddingTop:20,flexDirection:'column'}]}>
                <Text style={[styles.date,{width:'100%',textAlign:TextAlignManage(i18n.language)}]}>
                  {`#${this.state.newOrderList.attributes?.order_number || ""} | ${this.formatTime(
     this.state.newOrderList?.attributes?.order_placed_at) || ""
              } | ${this.formatDate(
                this.state.newOrderList?.attributes?.order_placed_at) || ""}`}
                </Text>
                <View style={styles.line} />
                <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
                  <View style={{ flexDirection: "column" ,height:windowHeight*17.2/100}}>
                    <Image source={circle} style={{ height: 20, width: 20 }} />
                    <Image source={Line} style={{ marginHorizontal: 10,height:windowHeight*14.1/100 }} />
                    <Image source={circle} style={{ height: 20, width: 20 }} />
                  </View>
                  <View
                    style={{ flexDirection: "column", paddingHorizontal: 10 }}
                  >
                    <View style={[styles.icons,{marginTop:-2,height:windowHeight*17.2/100,paddingHorizontal:5,flexDirection:FlexConditionManage(i18n.language)}]}>
                      <View>
                      <Text style={styles.pickup2}>{i18n.t('pickup')} {this.state.newOrderList.attributes.status==="return_in_process"?"Customer":"Store"}</Text>
                        <View style={[styles.fashionDiv2,{flexDirection:FlexConditionManage(i18n.language)}]}>
                          <Image source={store1} style={styles.storeIcon2} />
                          <Text style={styles.fashionHub2}>{store}</Text>
                        </View>
                        <Text style={[styles.address2,{textAlign:TextAlignManage(i18n.language)}]}>
                          {[address]}
                        </Text>
                      </View>
                    </View>
                    <View style={{  marginLeft:5}}>
                      <Text style={[styles.custInfo,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('info')} </Text>
                      <Text style={[styles.custInfo2,{textAlign:TextAlignManage(i18n.language)}]}>{full_name}</Text>
                      <Text style={[styles.address2,{bottom:0,textAlign:TextAlignManage(i18n.language)}]}>{[address1]}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center",marginTop:25 }}>
              <Text style={[styles.dollartxt1,{width:'50%',fontSize:28}]}>{i18n.t('order delivered successfully!')}</Text>
             
                <Image source={circle} style={{width:70,height:70}}/>
              </View>
              <View style={[styles.newOrderBox,{ shadowColor: '#0000000F',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3, marginTop:20,marginBottom:20  }]}>
         <View style={{paddingBottom:15,alignSelf:'center'}}>
            <View style={{borderColor:'#f2f3f5',borderWidth:2,paddingHorizontal:35}}></View>
          </View>
          <Text style={[styles.dollartxt1]}>{i18n.t('order_summary!')}</Text>
                <View style={[styles.info,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <View style={styles.dollar}>
                    <Image source={dollar} style={styles.img} />
                    <Text style={[styles.dollartxt,{fontSize:18}]}>{this.state.newOrderList.attributes.trip_earning || ''}</Text>
                    <Text style={styles.title}>{i18n.t('trip_earnings')}</Text>
                  </View>
                  <View style={styles.dollar}>
                    <Image source={arrow_right} style={styles.img} />
                    <Text style={[styles.dollartxt,{fontSize:18}]}>{this.state.newOrderList.attributes.trip_distance || ''}</Text>
                    <Text style={styles.title}>{i18n.t('trip_distance')}</Text>
                  </View>
                  <View style={styles.dollar}>
                    <Image source={location} style={styles.img} />
                    <Text style={[styles.dollartxt,{fontSize:18}]}>{this.state.newOrderList.attributes.todays_earning || ''}</Text>
                    <Text style={styles.title}>{i18n.t('earnings_today')}</Text>
                  </View>
                </View>
                <TouchableOpacity
                style={[styles.navigationContainer,{marginTop:20,flexDirection:FlexConditionManage(i18n.language)}]}
                activeOpacity={0.6}
                onPress={() => {
                  this.handleDashboard();
                }}
                testID="DashboardId"
              >
                <Text style={styles.navigationText}>{i18n.t('go_to_dashboard')}</Text>
              </TouchableOpacity>
              </View>
              </View>
            </ScrollView>
          )
      }
}
storeOtpBtn() {
  return (
    <View style={[styles.call, { width: '20%', flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity testID="call" activeOpacity={0.7} onPress={() => this.callInPhoneCustomer()}>
        <Image source={headset_mic} style={styles.headset} />
      </TouchableOpacity>
      <TouchableOpacity testID="call_new" activeOpacity={0.7} onPress={() => this.callInPhone()}>
        <Image source={phone} style={styles.phone1} />
      </TouchableOpacity>
    </View>
  )
}
 storeOrderOtp(){
      const address1 =this.getDeliveryInfo();
      const full_name =this.setCustomerName()
      const address = this.getBusinessInfo();
      const store =this.setStoreName();
      let checkStatus=this.checkStatusStore()
    if(checkStatus){ return(
            <View style={styles.orderIdNav}>
              <View style={styles.orderMain}>
                <View style={[styles.orderInfo,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <View style={{width:'80%'}}>
                    <Text style={styles.pickup}>{i18n.t('pickup_from')}</Text>
                    <View style={[styles.fashionDiv,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <Image source={store1} style={styles.storeIcon} />
                      <Text style={styles.fashionHub}> {store}</Text>
                    </View>
                    <Text style={[styles.address,{textAlign:TextAlignManage(i18n.language)}]}>
                      {[address]}
                    </Text>
                  </View>
                  {this.storeOtpBtn()}
                </View>
                <View style={styles.custMain}>
                  <Text style={[styles.numItems,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.newOrderList?.attributes?.order_item_count} {i18n.t('items')}
                  </Text>
                  <View style={styles.line} />
                  <View>
                    <Text style={[styles.custInfo,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('info')}</Text>
                    <Text style={[styles.custInfo2,{textAlign:TextAlignManage(i18n.language)}]}>{full_name}</Text>
                    <Text style={[styles.custInfo2,{}]}>{[address1]} </Text>
                  </View>
                  <View style={styles.line} />
                  <Text style={[styles.date,{textAlign:TextAlignManage(i18n.language)}]}>
                  {`#${this.state.newOrderList.attributes?.order_number } | ${ this.formatTime(
     this.state.newOrderList?.attributes?.order_placed_at) 
              } | ${this.formatDate(
                this.state.newOrderList?.attributes?.order_placed_at) }`}
                  </Text>
                  <View style={styles.line} />
                  <TouchableOpacity
                    style={styles.otp}
                    activeOpacity={0.7}
                    onPress={() => { this.toggleModal(); }}
                    testID="enterOTPId"
                  >
                    <Text style={styles.enterOTP}>{i18n.t('enter')} {this.state.newOrderList.attributes.status==="return_in_process"?"Customer":"Store"} {i18n.t('otp')}</Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.isVisibleModal}
                >
                  <>
                   <KeyboardAvoidingView testID="storeOtp" behavior={this.isPlatformiOS() ? "padding" : undefined}
          style={{ flex: 1 }}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.otpTitle}>{i18n.t('enter_collection_otp')}</Text>
                      <View style={styles.otpTextInputContainers}>
                        {this.state.OtpArray.map((item, index) => {
                          return (
                            <TextInput
                              testID={"txt_input_otp" + index.toString()}
                              key={index.toString()}
                              maxLength={1}
                              ref={(ref) => (this.otpTextInput[index] = ref)}
                              onFocus={() =>
                                this.setState({ showErrorMessage: false })
                              }
                              textContentType="oneTimeCode"
                              value={item}
                              keyboardType="numeric"
                              style={styles.txt_otp_input}
                              onKeyPress={(e) =>
                                this.prevoiusFocus(e.nativeEvent?.key, index)
                              }
                              onChangeText={(text) =>
                                this.changeFocus(text, index)
                              }
                            />
                          );
                        })}
                      </View>
                      <View style={[styles.errorContainerSocial]}>
                        {this.state.showErrorMessage && (
                          <Text style={styles.txt_ErrorMsgSocial}>
                            {this.state.showErroMessageString}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={[styles.navigationContainer,{flexDirection:FlexConditionManage(i18n.language)}]}
                        activeOpacity={0.6}
                        onPress={() => {
                          (this.state.newOrderList.attributes.driver_order_status==="send_customer_otp" &&  this.state.newOrderList.attributes.status==="return_in_process")?
                          this.confirmOTP()
                          :
                          this.enterOTP();
                        }}
                        testID="sendId"
                      >
                        <Text style={styles.navigationText}>{i18n.t('confirm')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.toggleModal}>
                        <Text style={styles.cancel}>{i18n.t('cancel')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  </KeyboardAvoidingView>
                  </>
                </Modal>
              </View>
            </View>
   )} 
 }
customerOrderOtp(){
        
    const address1 =this.getDeliveryInfo();
    const full_name =this.setCustomerName()
    let checkStatus=this.checkStatusCustomer()
    if(checkStatus){return (
            <View style={styles.orderIdNav}>
                <View style={styles.orderMain}>
               <View style={[styles.orderInfo,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <View style={{width:'80%'}}>
                    <Text style={[styles.pickup,{textAlign:TextAlignManage(i18n.language)}]}>{this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('info')}</Text>
                    <View style={[styles.fashionDiv,{flexDirection:FlexConditionManage(i18n.language)}]}>
                      <Image source={store1} style={styles.storeIcon} />
                      <Text style={styles.fashionHub}> {full_name}</Text>
                    </View>
                    <Text style={[styles.address,{textAlign:TextAlignManage(i18n.language)}]}> {[address1]}</Text>
                 
                  </View>
                  <View style={[styles.call,{width:'20%',flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="call" activeOpacity={0.7} onPress={()=>this.callInPhoneCustomer()}>
                      <Image source={headset_mic} style={styles.headset} />
                    </TouchableOpacity>
                    <TouchableOpacity testID="call_new" activeOpacity={0.7} onPress={()=>this.callInPhone()}>
                      <Image source={phone} style={styles.phone1} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.custMain}>
                  <Text style={[styles.date,{textAlign:TextAlignManage(i18n.language)}]}>
                    <Text style={{textAlign:TextAlignManage(i18n.language)}}>{i18n.t('order_id:')}</Text>{`#${this.state.newOrderList.attributes?.order_number} | ${ this.formatTime(
     this.state.newOrderList?.attributes?.order_placed_at)
              } | ${this.formatDate(
                this.state.newOrderList?.attributes?.order_placed_at)}`}
                  </Text>
                  <View style={styles.line} />
                  <TouchableOpacity
                    style={styles.otp}
                    activeOpacity={0.6}
                    onPress={() => {
                      this.toggleModal();
                    }}
                    testID="enterOTPId2"
                  >
                    <Text style={styles.enterOTP}>{i18n.t('enter')} {this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('otp')}</Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.isVisibleModal}
                > 
                <>
                <KeyboardAvoidingView  testID="customerOtp" behavior={this.isPlatformiOS() ? "padding" : undefined}
                style={{ flex: 1 }}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.otpTitle}>{i18n.t('enter')} {this.state.newOrderList.attributes.status==="return_in_process"?"Store":"Customer"} {i18n.t('otp')}</Text>
                      <View style={styles.otpTextInputContainer}>
                        {this.state.OtpArray.map((item, index) => {
                          return (
                            <TextInput
                              key={index.toString()}
                              testID={"txt_input_otp2" + index.toString()}
                              ref={(ref) => (this.otpTextInput[index] = ref)}
                              onFocus={() =>
                                this.setState({ showErrorMessage: false })
                              }
                              maxLength={1}
                              value={item}
                              textContentType="oneTimeCode"
                              style={styles.txt_otp_input}
                              keyboardType="numeric"
                              onChangeText={(text) =>
                                this.changeFocus(text, index)
                              }
                              onKeyPress={(e) =>
                                this.prevoiusFocus(e.nativeEvent?.key, index)
                              }
                            />
                          );
                        })}
                      </View>
                      <View style={styles.errorContainerSocial}>
                        {this.state.showErrorMessage && (
                          <Text style={styles.txt_ErrorMsgSocial}>
                            {this.state.showErroMessageString}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={[styles.navigationContainer,{flexDirection:FlexConditionManage(i18n.language)}]}
                        activeOpacity={0.6}
                        onPress={() => {
                          (this.state.newOrderList.attributes.status==="return_in_process")?
                          this.enterOTP()
                          :
                          this.confirmOTP()
                         
                        }}
                        testID="sendId2"
                      >
                        <Text style={styles.navigationText}>{i18n.t('confirm')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.toggleModal}>
                        <Text style={styles.cancel}>{i18n.t('cancel')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  </KeyboardAvoidingView>
                  </>
                </Modal>
              </View>
            </View>
  )}
}
showDirections(){
  
          let latitude =   this.latitudeSet()
          let longitude =   this.longitudeSet()
    return(
          <MapViewDirections
          data-test-id="mapViewDirection"
          origin={{
           latitude: this.state.latitude,
           longitude: this.state.longitude,
         }}
           destination={{
             longitude:longitude,
             latitude:latitude,
           }}
           onReady={(result:{distance:number,duration:number})=>this.checkLocationData(result)}
         apikey={this.GOOGLE_MAPS_APIKEY}
         strokeWidth={1}
         strokeColor="black"
       />
          )
        }
  // Customizable Area End

  // Customizable Area Start
  render() {
    const address = this.getBusinessInfo();
    const businessInfo = this.getBusinessInfo();
    const store =this.setStoreName();
    let sellerMarker = null;
    if (businessInfo) {
      const sellerLatitude = Number(this.latitudeSet());
      const sellerLongitude = Number( this.longitudeSet)
      if (!isNaN(sellerLatitude) && !isNaN(sellerLongitude)) {
        sellerMarker = (
          <Marker
            coordinate={{
              latitude: sellerLatitude,
              longitude: sellerLongitude,
            }}
            title="Seller Location"
            description="This is where the seller is located"
          />
        );
      }
    }

    return (
      <View style={styles.main}>
        <SafeAreaView />
        
        {this.state.loading && <CustomLoader />}
        {this.renderNavigation()}
        {!this.state.orderCompleted && (
          <View style={styles.mapFlex}>
            <MapView
              followsUserLocation={true}
              testID="mapViewShowForm"
              initialRegion={this.state.region}
              style={{ flex: 1, ...StyleSheet.absoluteFillObject, bottom: 1 }}
              region={this.state.region}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => this.onMapReady}
              minZoomLevel={2}
              maxZoomLevel={20}
              zoomEnabled={true}
              rotateEnabled={true}
              pitchEnabled={true}
              userLocationPriority="high"
              moveOnMarkerPress={true}
            >
              <Marker
                testID="googleMapMarker"
                title="Your Location"
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
              />
              {sellerMarker}
             {this.showDirections()}
            </MapView>
            {this.showNavigationInMap()}
          </View>
        )}
       
         {(this.state.newOrderList.attributes.driver_order_status==="in_progress" || this.state.newOrderList.attributes.driver_order_status==="accepted")&&
        <View style={styles.newOrderBox}>
        { this.renderNewOrderText()}
            <View style={[styles.icons,{flexDirection:FlexConditionManage(i18n.language),paddingHorizontal:i18n.language == 'ar'?18:5,}]}>
              <View style={{width:'70%'}}>
                <Text style={[styles.pickup2,{textAlign:TextAlignManage(i18n.language)}]}>{i18n.t('pickup_from')}</Text>
                <View style={[styles.fashionDiv2,{flexDirection:FlexConditionManage(i18n.language)}]}>
                  <Image source={store1} style={styles.storeIcon2} />
                  <Text style={styles.fashionHub2}>{store}</Text>
                </View>
                <Text style={[styles.address2,{textAlign:TextAlignManage(i18n.language)}]}>
                  {[address]}
                </Text>
              </View>
              {this.state.newOrderList.attributes.driver_id!=null&&
                <View style={[styles.call,{width:'30%',alignItems:'flex-end',flexDirection:FlexConditionManage(i18n.language)}]}>
                  <TouchableOpacity activeOpacity={0.7} testID="call" onPress={()=>this.callInPhoneCustomer()}>
                    <Image source={headset_mic} style={styles.headset} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} testID="call_new" onPress={()=>this.callInPhone()}>
                    <Image source={phone} style={styles.phone1} />
                  </TouchableOpacity>
                </View>
            }
            </View>
          { this.renderContent()}
          <View>
           {this.showDateTimeName()}
               </View>
        { this.renderOrderContent()}          
     </View>
  } 
  { (this.state.newOrderList.attributes.driver_order_status==="store_otp_confirm" || ((this.state.newOrderList.attributes.driver_order_status==="confirm_customer_otp" && this.state.newOrderList.attributes.status==="return_in_process")))  && <View style={styles.newOrderBox}>{ 
        this.renderNewOrderText()}{this.renderCustomerInfo()}{ this.renderOrderContent()}</View>}
        {this.storeOrderOtp()}
        {this.customerOrderOtp()}
        {this.showOrderComplete()}
        <Modal
            testID="btnCancelModal"
            animationType="slide"
            transparent={true}
            visible={this.state.cancelOrderModal}>

            <View style={styles.modalMainView}>
                <SafeAreaView style={styles.modalSafeArea} />

                <View style={styles.modalButtonMainView}>
                <Text style={styles.cancelOrderText}>
                   {i18n.t('are_you_sure_you_want_to_reject_this_order')}
                </Text>

                <View style={[styles.modalTwoBtnView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity
                    testID={"btnCancelOrderNo"}
                    style={styles.cancelTouch}
                    onPress={() => {
                        this.cancelModalClose()
                    }}>
                    <Text style={styles.noText}>{i18n.t('No')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    testID="btnCancelOrderYes"
                    style={styles.yesTouch}
                    onPress={() => {
                        this.cancelOrderConfirm()
                    }}>
                    <Text style={styles.yesText}>{i18n.t('Yes')}</Text>
                    </TouchableOpacity>
                </View>
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
  newOrderView: {
    position: "absolute",
    top: 50,
    right: 0,
    margin: 10,
    left: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingRight: 10,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phone1: {
    width: 34,
    height: 34,
  },
  contactSeller: {
    color: "#375280",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Lato-Regular",
  },
  orderCompleteBox: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  txt_otp_input: {
    width: 60,
    borderRadius: 5,
    height: 60,
    fontFamily: "Lato-Bold",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F8F8F8",
    color: "#375280",
    fontSize: (windowWidth * 5.5) / 100,
    paddingVertical: 10,
  },
  custnav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpTextInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  otpTextInputContainers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato-Regular",
    paddingVertical: 15,
  },
  cancel: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    paddingVertical: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: 300,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
  orderIdNav: {
    top:  0,
  },
  custInfo: {
    fontSize: 12,
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom: 5,
    fontFamily: "Lato-Regular",
  },
  custInfo3: {
    fontSize: 16,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  enterOTP: {
    fontSize: 16,
    fontFamily: "Lato-Bold",
    color: "#375280",
    textAlign: "center",
  },
  otp: {
    width: windowWidth * 0.9,
    borderRadius: 2,
    borderColor: "#CCBEB1",
    borderWidth: 1,
    padding: 15,
    alignItems:'center',
    justifyContent:'center'
  },
  custInfo2: {
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato-Regular",
    width: 280,
  },
  custInfo4: {
    fontSize: 14,
    fontWeight: "400",
    color: "#375280",
    fontFamily: "Lato-Regular",
    width: 240,
  },
  custMain: { padding: 20 },
  orderMain: {
    backgroundColor: "#ffff",
    height: "100%",
  },
  orderInfo: {
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  line: {
    borderWidth: 0.8,
    marginVertical: 15,
    borderColor: "#D5D5D5",
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    color: "#375280",
  },
  navbar: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  navbar2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  navbar3: {
    backgroundColor: "#fff",
    alignItems:'center',
    justifyContent:'center'
  },
  numItems: {
    color: "#375280",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Lato-Regular",
  },
  call: {
    justifyContent: "flex-end",
  },
  icons: {
    width:'100%',
    alignItems:'flex-start',
  },
  headset: {
    marginHorizontal: 10,
    width: 34,
    height: 34,
  },
  dateId: {
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  date1: {
    fontSize: 16,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  navigation: {
    tintColor: "#FFFFFF",
    height: 24,
    width: 24,
  },
  navigation2: {
    tintColor: "#FFFFFF",
    height: 24,
    width: 24,
  },
  navigationContainer2: {
    justifyContent: "center",
    alignItems: "center",
    width: '97%',
    backgroundColor: "#CCBEB1",
    height: 56,
    borderRadius: 2,
    alignSelf:'center'
  },
  navigationContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '97%',
    alignSelf:'center',
    backgroundColor: "#CCBEB1",
    height: 56,
    borderRadius: 2,
  },
  navigationContainer3: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    backgroundColor: "#CCBEB1",
    height: 56,
    flexDirection: "row",
    borderRadius: 2,
    marginHorizontal: 10,
    marginBottom:10
  },
  errorContainerSocial: {
    width: '100%',
    paddingHorizontal: 0,
  },
  txt_ErrorMsgSocial: {
    color: "#F87171",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 3.9) / 100,
    marginBottom:10
  },
  navigationText: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    color: "#FFFFFF",
    padding: 5,
  },
  navigationText2: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    color: "#FFFFFF",
    padding: 5,
  },
  mapFlex: {
    flex: 1,
  },
  acceptTxt: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    color: "#FFFFFF",
    textAlign:'center'
  },
  accept: {
    backgroundColor: "#B2A69B",
    height: 56,
    width:  '80%',
    borderRadius: 2,
    justifyContent: "center",
   alignItems:'center',
  },
  arrived: {
    backgroundColor: "#B2A69B",
    height: 56,
    width: scale(300),
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  arrived2: {
    backgroundColor: "#B2A69B",
    height: 56,
    width: 300,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    left: -4,
  },
  pickup: {
    fontSize: 12,
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom: 5,
    fontFamily: "Lato-Regular",
  },
  pickup2: {
    fontSize: 12,
    fontWeight: "400",
    color: "#94A3B8",
    marginBottom: 5,
    fontFamily: "Lato-Regular",
  },
  info: {
    justifyContent:'space-between',
  },
  dollartxt: {
    fontSize: 20,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato-Regular",
    
  },
  dollartxt1: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    color: "#375280",
    textAlign: "center",
    marginBottom: 20,
   
  },
  slide: {
    backgroundColor: "#CCBEB1",
    height: 56,
    width: '20%',
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
  slide2: {
    backgroundColor: "#CCBEB1",
    height: 56,
    width: 60,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
  viewbtn: {
    backgroundColor: "#CCBEB1",
    paddingVertical: 7,
    paddingHorizontal: 40,
    borderRadius: 2,
  },
  orderAccept: {
    width:'100%',
   paddingHorizontal:5,
   top:10,
   alignItems:'center',
   justifyContent:'center'
  },
  img: {
    tintColor: "#375280",
    width:scale(80),
    height:scale(80),
    resizeMode:'contain',
    marginBottom:-scale(25),
    marginTop:-scale(10),
  },
  title: {
    width: 80,
    fontSize: 14,
    fontWeight: "400",
    color: "#94A3B8",
    textAlign: "center",
    fontFamily: "Lato-Regular",
  },
  dollar: {
  flexDirection:'column',
  alignItems:'center'
  },
  viewbtnText: {
    color: "#fff",
    fontSize: 16,
  },
  notificationTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 5) / 100,
  },
  orderDetails: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
  },
  main: {
    flex: 1,
    backgroundColor: "#ffff",
    
  },
  progressBarContainer: {
   
    height: 4,
    backgroundColor: "#34D39930",
  },
  progressBarMapContainer: {
    height: 4,
    backgroundColor: "#34D39930",
    top: -1,
  },
  fashionDiv: {
    marginBottom: 10,
  },
  fashionDiv2: {
    marginBottom: 10,
    alignItems:'center'
  },
  notificationIcon: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  notificationIcon2: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  fashionHub: {
    fontSize: 16,
    fontWeight: "700",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  fashionHub2: {
    fontSize: 16,
    fontWeight: "500",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  progressBar: {
    width: "40%",
    height: "100%",
    backgroundColor: "#34D399",
  },
  progressBarMap: {
    width: "30%",
    height: "100%",
    backgroundColor: "#34D399",
  },
  storeIcon: {
    height: 24,
    width: 24,
    tintColor: "#375280",
  },
  storeIcon2: {
    height: 18,
    width: 18,
    tintColor: "#375280",
  },
  new: {
    color: "#375280",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Lato-Regular",
  },
  new2: {
    color: "#375280",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
    fontFamily: "Lato-Regular",
  },
  newOrderBox: {
    paddingHorizontal: Platform.OS === "ios" ? 20 : 10,
    paddingVertical: 20,
    backgroundColor: "white",
    marginBottom:Platform.OS=="ios"?25:0,
  },
  address: {
    color: "#375280",
    fontSize: 12,
    fontWeight: "400",
    bottom: 10,
    textAlign:'left',
    fontFamily: "Lato-Regular",
    width:'90%'
  },
  address2: {
    color: "#375280",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    width: 232,
    bottom: 10,
  },
  modalMainView:{
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
},
modalSafeArea:{
    flex: 0, 
    backgroundColor: "#00000080"
},
modalButtonMainView:{
    height: (windowHeight * 22) / 100,
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: (windowWidth * 7) / 100,
    justifyContent: "space-between",
},
cancelOrderText:{
    fontSize: (windowWidth * 4.3) / 100,
    color: "#375280",
    textAlign:'center',
    fontFamily:'Lato-Bold'
},
modalTwoBtnView:{
    justifyContent: "space-between",
},
cancelTouch:{
    backgroundColor: "#FFFFFF",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
    borderWidth:1,
    borderColor:'#CCBEB1'
},
noText:{
    textAlign: "center",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily:'Lato-Regular',
    color:'#375280'
},
yesTouch:{
    backgroundColor: "#CCBEB1",
    padding: (windowWidth * 3) / 100,
    width: (windowWidth * 36) / 100,
    alignSelf: "center",
    borderRadius: 3,
},
yesText:{
    textAlign: "center",
    color: "#ffffff",
    fontSize: (windowWidth * 3.7) / 100,
    fontWeight: '500',
    fontFamily:'Lato-Regular',
}
});
// Customizable Area End
