import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { render } from "@testing-library/react-native";
import { jest, expect} from "@jest/globals";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NotificationsBuyer from "../../src/NotificationsBuyer"
import NotificationsBuyerWeb from "../../src/NotificationsBuyer.web";
import { CarouselMockData } from "../../../landingpage/__tests__/__mocks__/responses";
import storage from "../../../../framework/src/StorageProvider";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
    id: "NotificationsBuyer"
  }

let orderNotification = {
    "data": [
        {
            "id": "17619",
            "type": "notification",
            "attributes": {
                "id": 17619,
                "created_by": null,
                "headings": "Order confirmation",
                "contents": "<p><span style=\"color: rgb(0, 0, 0);\">Great news, your order is confirmed. Get ready for the stylish collections on the way.</span></p>",
                "contents_arabic": "<p><span style=\"color: rgb(0, 0, 0);\">استعد لاستقبال طلبك ✨ متحمس لإطلالتك الجديدة؟ جاري تجهيز وشحن مشترياتك. تابع طلبك الآن حتى يصل إلى بابك.</span></p><p><br></p><p><br></p>",
                "app_url": null,
                "is_read": false,
                "action": "order_confirm",
                "data": {
                    "account_id": 1082,
                    "action": "order_confirm",
                    "order_id": 2385,
                    "catalogue_variant_id": null,
                    "catalogue_id": null,
                    "store_id": null,
                    "notification_name": null
                },
                "read_at": null,
                "created_at": "2025-02-24T09:23:44.783Z",
                "updated_at": "2025-02-24T09:23:44.783Z",
                "notification_type": "for_order",
                "account": {
                    "id": 1082,
                    "first_name": "Buyer",
                    "last_name": "Gupta",
                    "full_phone_number": "918989565621",
                    "country_code": 91,
                    "phone_number": 8989565621,
                    "email": "buyergupta@gmail.com",
                    "activated": true,
                    "device_id": null,
                    "unique_auth_id": "CIfkEyQrk3iWaVNpwzhbsgtt",
                    "password_digest": "$2a$12$Sa64gHVNdp/zqDq4AGHEju6KsvU926Ku.1SBxa7/YAkW8sji4BSQu",
                    "created_at": "2024-07-29T10:20:14.765Z",
                    "updated_at": "2025-02-24T09:27:41.007Z",
                    "user_name": null,
                    "platform": null,
                    "user_type": null,
                    "app_language_id": null,
                    "last_visit_at": null,
                    "is_blacklisted": false,
                    "suspend_until": null,
                    "status": "regular",
                    "gender": null,
                    "date_of_birth": null,
                    "age": null,
                    "stripe_id": null,
                    "stripe_subscription_id": null,
                    "stripe_subscription_date": null,
                    "role": "buyer",
                    "full_name": "Buyer Gupta",
                    "is_verified": null,
                    "share_token": null,
                    "approve_status": "Pending",
                    "seller_status": "Signup",
                    "notification": {
                        "push_notification": {
                            "order_invoices": true,
                            "order_confirmations": true,
                            "delivery_confirmation": true,
                            "reviews_and_feedback_requests": true,
                            "refund_or_payment_complete": true,
                            "marketing_emails": true,
                            "product_stock_updates": true
                        },
                        "email_notification": {
                            "order_invoices": true,
                            "order_confirmations": true,
                            "delivery_confirmation": true,
                            "reviews_and_feedback_requests": true,
                            "refund_or_payment_complete": true,
                            "marketing_emails": true,
                            "product_stock_updates": true
                        }
                    },
                    "customer_id": "cus_TS01A0320250921Mt912402646",
                    "wallet_amount": "0.0",
                    "withdrawable_amount": "0.0",
                    "latitude": null,
                    "longitude": null,
                    "driver_status": "offline",
                    "language": "English",
                    "currency": "Dollar",
                    "driver_redirect_flag": null,
                    "stylist_redirect_flag": null,
                    "filter_range": "monthly",
                    "selected_month": "September",
                    "secondary_email": null,
                    "deleted_at": null,
                    "open_api_key": null,
                    "open_api_expires_at": null,
                    "stylist_status": "off"
                }
            }
        },
        {
            "id": "17617",
            "type": "notification",
            "attributes": {
                "id": 17617,
                "created_by": null,
                "headings": "Order Confirmation and Receipt: Detailed confirmation of the order along with a receipt.",
                "contents": "<p><span style=\"color: rgb(0, 0, 0);\">Your order has been placed and paid. View the receipt.</span></p>",
                "contents_arabic": "<p><span style=\"color: rgb(0, 0, 0);\">عملية دفع ناجحة؛ انقر هنا لعرض إيصال الدفع وتفاصيل الطلب.</span></p><p><br></p><p><br></p>",
                "app_url": null,
                "is_read": false,
                "action": "payment_done",
                "data": {
                    "account_id": 1082,
                    "action": "payment_done",
                    "order_id": 2385,
                    "catalogue_variant_id": null,
                    "catalogue_id": null,
                    "store_id": null,
                    "notification_name": null
                },
                "read_at": null,
                "created_at": "2025-02-24T09:21:30.679Z",
                "updated_at": "2025-02-24T09:21:30.679Z",
                "notification_type": "for_order",
                "account": {
                    "id": 1082,
                    "first_name": "Buyer",
                    "last_name": "Gupta",
                    "full_phone_number": "918989565621",
                    "country_code": 91,
                    "phone_number": 8989565621,
                    "email": "buyergupta@gmail.com",
                    "activated": true,
                    "device_id": null,
                    "unique_auth_id": "CIfkEyQrk3iWaVNpwzhbsgtt",
                    "password_digest": "$2a$12$Sa64gHVNdp/zqDq4AGHEju6KsvU926Ku.1SBxa7/YAkW8sji4BSQu",
                    "created_at": "2024-07-29T10:20:14.765Z",
                    "updated_at": "2025-02-24T09:27:41.007Z",
                    "user_name": null,
                    "platform": null,
                    "user_type": null,
                    "app_language_id": null,
                    "last_visit_at": null,
                    "is_blacklisted": false,
                    "suspend_until": null,
                    "status": "regular",
                    "gender": null,
                    "date_of_birth": null,
                    "age": null,
                    "stripe_id": null,
                    "stripe_subscription_id": null,
                    "stripe_subscription_date": null,
                    "role": "buyer",
                    "full_name": "Buyer Gupta",
                    "is_verified": null,
                    "share_token": null,
                    "approve_status": "Pending",
                    "seller_status": "Signup",
                    "notification": {
                        "push_notification": {
                            "order_invoices": true,
                            "order_confirmations": true,
                            "delivery_confirmation": true,
                            "reviews_and_feedback_requests": true,
                            "refund_or_payment_complete": true,
                            "marketing_emails": true,
                            "product_stock_updates": true
                        },
                        "email_notification": {
                            "order_invoices": true,
                            "order_confirmations": true,
                            "delivery_confirmation": true,
                            "reviews_and_feedback_requests": true,
                            "refund_or_payment_complete": true,
                            "marketing_emails": true,
                            "product_stock_updates": true
                        }
                    },
                    "customer_id": "cus_TS01A0320250921Mt912402646",
                    "wallet_amount": "0.0",
                    "withdrawable_amount": "0.0",
                    "latitude": null,
                    "longitude": null,
                    "driver_status": "offline",
                    "language": "English",
                    "currency": "Dollar",
                    "driver_redirect_flag": null,
                    "stylist_redirect_flag": null,
                    "filter_range": "monthly",
                    "selected_month": "September",
                    "secondary_email": null,
                    "deleted_at": null,
                    "open_api_key": null,
                    "open_api_expires_at": null,
                    "stylist_status": "off"
                }
            }
        }
    ],
    "meta": {
        "message": "List of notifications.",
        "read_count": 0,
        "unread_count": 2
    }
}

let APIError ={
    "errors": [
        {
            "message": "No notification found."
        }
    ]
}

let notificationObject = [
    {
        id:'1',
        read:false,
        titleMessage:'Thank you for shopping with us. We have refunded an item from your order per your request',
        created_at:'4 hours ago'
    },
    {
        id:'2',
        read:false,
        titleMessage:'Thank you for shopping with us. We have refunded an item from your order per your request',
        created_at:'5 hours ago'
    },
    {
        id:'3',
        read:true,
        titleMessage:'Thank you for shopping with us. We have refunded an item from your order per your request',
        created_at:'1 hours ago'
    },
]

const feature = loadFeature('./__tests__/features/NotificationsBuyer-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");
const map = new Map();
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        storage.get = (k: string) => map.get(k);
    });

    test('User navigates to NotificationsBuyer', ({ given, when, then }) => {
        let notificationsBuyerBlock:ShallowWrapper;
        let instance:NotificationsBuyer; 
        let screen: ReturnType<typeof render>;

        given('I am a User loading NotificationsBuyer', () => {
            notificationsBuyerBlock = shallow(<NotificationsBuyer {...screenProps}/>)
        });

        when('I navigate to the NotificationsBuyer', () => {
             instance = notificationsBuyerBlock.instance() as NotificationsBuyer
             const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                CarouselMockData
              );
              instance.notificationListApiCallID = apiTestMsg.messageId;
              runEngine.sendMessage("Test", apiTestMsg);

              const OrdersListAPIMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              OrdersListAPIMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                OrdersListAPIMsg.messageId
              );
              OrdersListAPIMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                APIError
            )
              instance.notificationOrdersApiCallID = OrdersListAPIMsg.messageId;
              runEngine.sendMessage("Test", OrdersListAPIMsg);
              OrdersListAPIMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                orderNotification,
              );
              runEngine.sendMessage("Test", OrdersListAPIMsg);
              OrdersListAPIMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                APIError
            )
              instance.notificationDealsApiCallID = OrdersListAPIMsg.messageId;
              runEngine.sendMessage("Test", OrdersListAPIMsg);
              OrdersListAPIMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                orderNotification,
              );
              runEngine.sendMessage("Test", OrdersListAPIMsg);
        });

        then('NotificationsBuyer will load with out errors', () => {
            let dataRender = render(<NotificationsBuyerWeb {...screenProps} />);
            expect(dataRender).toBeTruthy()
            
        });
        then("I can click on back button notification with out errors", () => {
            let buttonComponent = notificationsBuyerBlock.findWhere(
              (node) => node.prop("testID") === "btnBackNotifications"
            );
            buttonComponent.simulate("press");
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then('I can click on setting button with out errors',()=>{
            let buttonComponent = notificationsBuyerBlock.findWhere((node) => node.prop('testID') === 'btnSettingRedirection');
            buttonComponent.simulate('press');
            expect(buttonComponent.exists()).toBe(true);
        });

        then('I can click on all tab button with out errors',()=>{
            let buttonComponent = notificationsBuyerBlock.findWhere((node) => node.prop('testID') === 'alltab');
            buttonComponent.simulate('press');
            expect(buttonComponent.exists()).toBe(true);
        });

        then('I can click on deal tab button with out errors',()=>{
            let buttonComponent = notificationsBuyerBlock.findWhere((node) => node.prop('testID') === 'dealTab');
            buttonComponent.simulate('press');
            expect(buttonComponent.exists()).toBe(true);
        });

        then('I can click on your order button with out errors',()=>{
            let buttonComponent = notificationsBuyerBlock.findWhere((node) => node.prop('testID') === 'yourOrderTab');
            buttonComponent.simulate('press');
            expect(buttonComponent.exists()).toBe(true);
        });
    
        then('I can render notification flatlist with out errors',async()=>{
            const flatlist = notificationsBuyerBlock.findWhere(
                (node)=>node.prop("testID") === "notificationRenderFlatlist"
            )
            const item = notificationObject[0]
            let renderData = flatlist.renderProp("renderItem")({item:item,index:0})
            flatlist.renderProp("ListEmptyComponent")({})
            flatlist.renderProp("ItemSeparatorComponent")({})
            flatlist.renderProp("keyExtractor")({id:'1'})
    
            expect(flatlist.exists()).toBe(true)

            let item2 =  {
                "id": "17617",
                "type": "notification",
                "attributes": {
                    "id": 17617,
                    "created_by": null,
                    "headings": "Order Confirmation and Receipt: Detailed confirmation of the order along with a receipt.",
                    "contents": "<p><span style=\"color: rgb(0, 0, 0);\">Your order has been placed and paid. View the receipt.</span></p>",
                    "contents_arabic": "<p><span style=\"color: rgb(0, 0, 0);\">عملية دفع ناجحة؛ انقر هنا لعرض إيصال الدفع وتفاصيل الطلب.</span></p><p><br></p><p><br></p>",
                    "app_url": null,
                    "is_read": false,
                    "action": "appointment_is_made_by_client",
                    "data": {
                        "account_id": 1082,
                        "action": "appointment_is_made_by_client",
                        "order_id": 2385,
                        "catalogue_variant_id": null,
                        "catalogue_id": null,
                        "store_id": null,
                        "notification_name": null
                    },
                    "read_at": null,
                    "created_at": "2025-02-24T09:21:30.679Z",
                    "updated_at": "2025-02-24T09:21:30.679Z",
                    "notification_type": "for_order",
                    "account": {
                        "id": 1082,
                        "first_name": "Buyer",
                        "last_name": "Gupta",
                        "full_phone_number": "918989565621",
                        "country_code": 91,
                        "phone_number": 8989565621,
                        "email": "buyergupta@gmail.com",
                        "activated": true,
                        "device_id": null,
                        "unique_auth_id": "CIfkEyQrk3iWaVNpwzhbsgtt",
                        "password_digest": "$2a$12$Sa64gHVNdp/zqDq4AGHEju6KsvU926Ku.1SBxa7/YAkW8sji4BSQu",
                        "created_at": "2024-07-29T10:20:14.765Z",
                        "updated_at": "2025-02-24T09:27:41.007Z",
                        "user_name": null,
                        "platform": null,
                        "user_type": null,
                        "app_language_id": null,
                        "last_visit_at": null,
                        "is_blacklisted": false,
                        "suspend_until": null,
                        "status": "regular",
                        "gender": null,
                        "date_of_birth": null,
                        "age": null,
                        "stripe_id": null,
                        "stripe_subscription_id": null,
                        "stripe_subscription_date": null,
                        "role": "buyer",
                        "full_name": "Buyer Gupta",
                        "is_verified": null,
                        "share_token": null,
                        "approve_status": "Pending",
                        "seller_status": "Signup",
                        "notification": {
                            "push_notification": {
                                "order_invoices": true,
                                "order_confirmations": true,
                                "delivery_confirmation": true,
                                "reviews_and_feedback_requests": true,
                                "refund_or_payment_complete": true,
                                "marketing_emails": true,
                                "product_stock_updates": true
                            },
                            "email_notification": {
                                "order_invoices": true,
                                "order_confirmations": true,
                                "delivery_confirmation": true,
                                "reviews_and_feedback_requests": true,
                                "refund_or_payment_complete": true,
                                "marketing_emails": true,
                                "product_stock_updates": true
                            }
                        },
                        "customer_id": "cus_TS01A0320250921Mt912402646",
                        "wallet_amount": "0.0",
                        "withdrawable_amount": "0.0",
                        "latitude": null,
                        "longitude": null,
                        "driver_status": "offline",
                        "language": "English",
                        "currency": "Dollar",
                        "driver_redirect_flag": null,
                        "stylist_redirect_flag": null,
                        "filter_range": "monthly",
                        "selected_month": "September",
                        "secondary_email": null,
                        "deleted_at": null,
                        "open_api_key": null,
                        "open_api_expires_at": null,
                        "stylist_status": "off"
                    }
                }
            }

            let flatlistWrapper = shallow(
                flatlist.props().renderItem({item: item2,index:0})
              )
              let NotificationA = flatlistWrapper.findWhere(
                (node) => node.prop("testID") === "notificationTouch"
              );
              NotificationA.simulate("press");
        })

        then('I can render notification flatlist unread notification with out errors',async()=>{
            const flatlistNotification = notificationsBuyerBlock.findWhere(
                (node)=>node.prop("testID") === "notificationRenderFlatlist"
            )
            const item = notificationObject[2]
            let renderData = flatlistNotification.renderProp("renderItem")({item:item,index:0})
            flatlistNotification.renderProp("ListEmptyComponent")({})
            flatlistNotification.renderProp("ItemSeparatorComponent")({})
            flatlistNotification.renderProp("keyExtractor")({id:'1'})
    
            expect(flatlistNotification.exists()).toBe(true)
            instance.onNavigateScreen('seller_new_order', {})
            instance.onNavigateScreen('seller_cancel_order', {})
            instance.onNavigateScreen('seller_payment_confirm',{})
            instance.onNavigateScreen('delivery_assignment',{})
            instance.onNavigateScreen('seller_store_approved',{})
            instance.onNavigateScreen('seller_product_price',{})
            instance.onNavigateScreen('seller_store_approved',{})
            instance.onNavigateScreen('seller_terms_updates',{})
            instance.onNavigateScreen('seller_low_stock',{})
            instance.onNavigateScreen('stylist_terms_updates',{})
            instance.onNavigateScreen('stylist_monthly_orders_report',{})
            instance.onNavigateScreen('buyer_catalogue_price_drop',{})
            instance.onNavigateScreen('weekly_update_loyalty_points',{})
            instance.onNavigateScreen('driver_terms_updates',{})
            instance.onNavigateScreen('earning_status_updates',{})
            instance.onNavigateScreen('product_sourcing_request_by_stylist',{})
            instance.onNavigateScreen('monthly_orders_report',{})
            instance.onNavigateScreen('account_password_changed',{})
            instance.onNavigateScreen('buyer_requested_stylists',{})
            instance.onNavigateScreen('buyer_quoted_for_stylist_items',{})
            instance.onNavigateScreen('sign_up',{})
            instance.onNavigateScreen('order_confirm',{data : {order_id : 123}})
            instance.onNavigateScreen('order_dispatched',{data : {order_id : 123}})
            instance.onNavigateScreen('order_placed',{data : {order_id : 123}})
            instance.onNavigateScreen('order_delivered',{data : {order_id : 123}})
            instance.onNavigateScreen('payment_done',{data : {order_id : 123}})
            instance.onNavigateScreen('monthly_deliveries_updates',{data : {order_id : 123}})
            instance.onNavigateScreen('',{data : {order_id : 123}})
            instance.navigateToOrderSummryBuyer()
        })
    });


});
