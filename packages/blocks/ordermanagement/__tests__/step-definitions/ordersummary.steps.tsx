import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import storage from "../../../../framework/src/StorageProvider";
import * as helpers from '../../../../framework/src/Helpers'
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import { beforeEach, jest, expect } from "@jest/globals";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { getStorageData } from "../../../../framework/src/Utilities";
import * as Utilities from "../../../../framework/src/Utilities";
import OrderSummary from "../../src/OrderSummary"
import { mockNewOrderResponse } from "../__mocks__/response"
import { or } from "react-native-reanimated"

const map = new Map();

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback: any) => {
            if (event === "focus") {
              callback();
            }
            if (event === "willFocus") {
              callback();
            }
            if (event === "didFocus") {
              callback();
            }
            if (event === "willBlur") {
              callback();
            }
            if (event === "didBlur") {
              callback();
            }
          }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "OrderSummary",
};

function createMockData(status: string) {
    return {
        "data": [{
            id: "105",
            type: "seller_order_seller",
            attributes: {
                id: 105,
                order_wait_time:1,
                status: status,
                accept_order_upload_time: null,
                estimated_arrival_time:'2024-09-16T06:57:05.248+00:00',
                order_items: [
                    {
                        id: "216",
                        type: "order_item_seller",
                        attributes: {
                            quantity: 3,
                            unit_price: "700.0",
                            total_price: "2100.0",
                            estimated_delivery_time: "2024-04-24T11:21:25.204Z",
                            reason_of_rejection: null,
                            catalogue_name: "winter best t shirt",
                            catalogue:{attributes:{name:'nameee'}},
                            brand_name: "bjk",
                            catalogue_variant_color: "Grey",
                            catalogue_variant_sku: "x1",
                            store_name: null,
                            catalogue_variant_size: "Small",
                            "catalogue_variant_front_image": "example.jpg",
                    "catalogue_variant_back_image": "example.jpg",
                    "catalogue_variant_side_image": "example.jpg"
                        }
                    }
                ],
                order_management_order: {
                    id: "150",
                    type: "order_seller_side",
                    attributes: {
                        order_number: "OD00000131",
                        account: "Nishanth",
                        sub_total: "2100.0",
                        total: "2478.0",
                        status: "placed",
                        placed_at: "2024-04-22T11:21:07.400Z",
                        confirmed_at: null,
                        in_transit_at: null,
                        delivered_at: null,
                        cancelled_at: null,
                        refunded_at: null,
                        returned_at: null,
                        deliver_by: null,
                        order_status_id: 2,
                        created_at: "2024-04-22T11:19:58.934Z",
                        updated_at: "2024-04-22T11:21:07.435Z",
                        order_deliver_date: "09-12-2024",
                        order_deliver_time: "2PM",
                        delivery_addresses: null,
                        order_return_date: null,
                        order_return_time: null,
                        payment_detail: null,
                        applied_coupon_code: 'sample10',
                        applied_discount: '10'
                    }
                }
            }
        }]
    };
}





const sendMessage = jest.spyOn(runEngine, "sendMessage");

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
    const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
    instance[apiCallID] = msgSucessRestAPI.messageId
    runEngine.sendMessage("Unit Test", msgSucessRestAPI);        
}

const feature = loadFeature('./__tests__/features/ordersummary-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
         jest.mock("../../../../framework/src/StorageProvider");
        storage.get = (k: string) => map.get(k);

            jest.spyOn(utils,'setStorageData').mockImplementation( async () => undefined)
            map.set("FA_LOGIN_MODE", "Seller");
    });

    test("User navigates to OrderSummary", ({ given, when, then }) => {
        let OrderSummaryWrapper: ShallowWrapper;
        let instance: OrderSummary;
        let acceptReturnMsgId: string = "acceptReturnMsgId";

        given("I am a User loading OrderSummary", () => {
            OrderSummaryWrapper = shallow(<OrderSummary {...screenProps} />);
        });

        when("I navigate to the OrderSummary", () => {
            instance = OrderSummaryWrapper.instance() as OrderSummary;
            instance.setState({roleType:'1'});
            
        });
        then("Set token from session response", () => {
            instance.navigationToInventoryManagement();
            instance.threeDotFunction();
            instance.dotCloseFunc();
            instance.closeReturnModal();
            instance.closeIcon('en')
            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            runEngine.sendMessage("Unit Test", reciveToken);


            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );

        });

        when('I can select the neworder tab', () => {
            instance.setState({roleType:'3'})
            instance.threeDotFunction();
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "new_orders"
            )
            buttonTab.simulate("press")
            const threeDotBtn1 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "threeDotBtn"
            )
            threeDotBtn1.simulate("press")
            

        })
        then('I can load the new orders', async() => {
            const mockRoleType = '3';
            (getStorageData as jest.Mock).mockResolvedValueOnce(Promise.resolve(mockRoleType));

            
            const roleResult1 = await getStorageData('someKey');
          
            
            expect(roleResult1).toBe(mockRoleType);
          
            const mockData = mockNewOrderResponse.orders
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                mockData
            );
            instance.getOrderListMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);

            let result = instance.calculateNewTimeRemainingData(mockData.data)
            result =[
                {
                    id: '1', timeRemaining: '5',
                    minutes: 0,
                    startTime: ""
                },
                {
                    id: '2', timeRemaining: '0',
                    minutes: 0,
                    startTime: ""
                },
                {
                    id: '3', timeRemaining: '3',
                    minutes: 0,
                    startTime: ""
                }, 
            ]

            instance.setState({timeRemainingData:result})

            const result1 = instance.startReducingTimer()

            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })

            const subflatlist = renderMainItem.findWhere(
                (node) => node.prop("testID") === "sub_flatList"
            )
            subflatlist.renderProp("renderItem")({ item: mockData.data[0].attributes.order_items[0], index: 0 })

            const statusTxt = renderMainItem.findWhere(node => node.text() === "New Order");
            expect(statusTxt.exists()).toBe(false);
            const itemsOnPress = renderMainItem.findWhere(
                (node) => node.prop("testID") === "itemsOnPress"
            )
            itemsOnPress.simulate("press")


            Mainflatlist.props().ListEmptyComponent();
            mockAPICall(instance, acceptReturnMsgId, {});
        })

        then("I can able to accpet or reject the order", () => {

            const mockData = createMockData("new_order")
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })
            const acceptOrderBtn = renderMainItem.findWhere(
                (node) => node.prop("testID") === "acceptBtn"
            )
            acceptOrderBtn.simulate("press")
            const rejectBtn = renderMainItem.findWhere(
                (node) => node.prop("testID") === "rejectBtn"
            )
            rejectBtn.simulate("press")
            
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "NavigationRejectOrderMessage" }),
                ])
            );
        })

        when('I can select the inprocess tab', () => {
            jest.advanceTimersByTime(5000);
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "in_process"
            )
            buttonTab.simulate("press")
           
        })

        then('I can load the inprocess orders', () => {

            const mockData = createMockData("in_process")
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                mockData
            );
            instance.getOrderListMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })

            const subflatlist = renderMainItem.findWhere(
                (node) => node.prop("testID") === "sub_flatList"
            )
            subflatlist.renderProp("renderItem")({ item: mockData.data[0].attributes.order_items[0], index: 0 })

            const statusTxt = renderMainItem.findWhere(node => node.text() === "In Process");
            expect(statusTxt.exists()).toBe(false);

        })

        then("I can able to change the order status", () => {
            const mockData = createMockData("in_process")
            const readyForCollectionMockData = createMockData("processed");
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })
            let driverName = {
                driverName: 'mohit',
                otp: '1234'
            }
            let arriveTime ={
                hours:1,
                minutes: 30
            }
             instance.renderReadyForCollectionBottomContainer(1,105,driverName,arriveTime, "hello")
            const InProcessOrderChangeBtn = renderMainItem.findWhere(
                (node) => node.prop("testID") === "inProcessOrderChangeBtn"
            )
            InProcessOrderChangeBtn.simulate("press")

            const confirmBtn = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "confirmBtn"
            )
            confirmBtn.simulate("press")
            const dotButton = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "closeDotIcon"
            )
            dotButton.simulate("press")

            const inventorytextBtn = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "inventorytext"
            )
            inventorytextBtn.simulate("press")

            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                readyForCollectionMockData
            );
            instance.updateTheAcceptStatusMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);

            const statusTxt = renderMainItem.findWhere(node => node.text() === "In Process");
            expect(statusTxt.exists()).toBe(false);

        })

        when('I can select the readyforcollection tab', () => {
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "processed"
            )
            buttonTab.simulate("press")

        })
        then('I can load the readyforcollection orders', () => {

            const readyForCollectionMockData = createMockData("processed");
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                readyForCollectionMockData
            );
            instance.getOrderListMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: readyForCollectionMockData.data[0], index: 0 })

            const subflatlist = renderMainItem.findWhere(
                (node) => node.prop("testID") === "sub_flatList"
            )
            subflatlist.renderProp("renderItem")({ item: readyForCollectionMockData.data[0].attributes.order_items[0], index: 0 })
            const readyButton = renderMainItem.findWhere(
                (node) => node.prop("testID") == "ReadyForCollectionOrderStatusBtn"
            )
            readyButton.simulate("press")
            const statusTxt = renderMainItem.findWhere(node => node.text() === "Ready for Collection");
            expect(statusTxt.exists()).toBe(false);
           let driverDetails={
            driverName: "null",
            otp:"123"
           }
           expect(instance.showColor(driverDetails)).toBe("#F4F4F4");
           let driverDetails2={
            driverName: "nikhel",
            otp:"null"
           }
           expect(instance.showColor(driverDetails2)).toBe("#F4F4F4"); 
           let driverDetails3={
            driverName: "null",
            otp:"null"
           }
           expect(instance.showColor(driverDetails3)).toBe("#ffffff"); 
          
        })

        then('I can select the outofdelivery tab', () => {
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "shipped"
            )
            buttonTab.simulate("press")
            const statusTxt = OrderSummaryWrapper.findWhere(node => node.text() === "Out for Delivery");
            expect(statusTxt.exists()).toBe(false);
            let arriveTime ={
                hours: 1,
                minutes: 2
               }
               let driverDetails2={
                driverName: "nikhel",
                otp:"null"
               }
            instance.renderOutOfDeliveryBottomContainer(1,2,3,driverDetails2,arriveTime)
            const mockData = createMockData("shipped")
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })
        })

        then('I can select the deliverd tab', () => {
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "delivered"
            )
            buttonTab.simulate("press")
            const statusTxt = OrderSummaryWrapper.findWhere(node => node.text() === "Out for Delivery");
            expect(statusTxt.exists()).toBe(false);
            let arriveTime ={
                hours: 1,
                minutes: 2
               }
               let driverDetails2={
                driverName: "nikhel",
                otp:"null"
               }
            instance.renderDeliverdContainer()
            const mockData = createMockData("delivered")
            const Mainflatlist = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "flatList-main"
            )
            const renderMainItem = Mainflatlist.renderProp("renderItem")({ item: mockData.data[0], index: 0 })
        })
        

        then('I can select the returnandrefund tab', () => {
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "return_and_refund"
            )
            buttonTab.simulate("press")
            const statusTxt = OrderSummaryWrapper.findWhere(node => node.text() === "Delivered");
            expect(statusTxt.exists()).toBe(false);
        })
        then("I can enlarge the accordian in returnandrefund", () => {
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnRequestAccordian"
            )
            buttonTab.props().setOpen(true);
           

            const buttonTab1 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnInProcessAccordian"
            )
            buttonTab1.props().setOpen(true);
           

            const buttonTab2 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnUnderProcessAccordian"
            )
            buttonTab2.props().setOpen(true);
           

            const buttonTab3 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnRefundedAccordian"
            )
            buttonTab3.props().setOpen(true);
            const statusTxt = OrderSummaryWrapper.findWhere(node => node.text() === "Delivered");
            expect(statusTxt.exists()).toBe(false);
        })

        then('I can select the reject tab', () => {
            const buttonTabs = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "delivered"
            )
            buttonTabs.simulate("press")
           
            let textInput = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox" 
              );
              textInput.simulate("changeText",'fdsfds');
              textInput.props().onSubmitEditing()
              const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const buttonTab = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "rejected"
            )
            instance.renderRejectedContainer()
            buttonTab.simulate("press")
            const apiTestMsgs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgs.messageId
            );
            apiTestMsgs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgs.messageId;
            runEngine.sendMessage("Test", apiTestMsgs);
            const buttonTabss = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "all_orders"
            )
            buttonTabss.simulate("press")
            const apiTestMsgss = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgss.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgss.messageId
            );
            apiTestMsgss.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgss.messageId;
            runEngine.sendMessage("Test", apiTestMsgss);
            const new_order = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "new_orders"
            )
            new_order.simulate("press")
            const apiTestMsgnew_order = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgnew_order.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgnew_order.messageId
            );
            apiTestMsgnew_order.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgnew_order.messageId;
            runEngine.sendMessage("Test", apiTestMsgnew_order);
            const in_process = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "in_process"
            )
            in_process.simulate("press")
            const apiTestMsgin_process = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgin_process.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgin_process.messageId
            );
            apiTestMsgin_process.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgin_process.messageId;
            runEngine.sendMessage("Test", apiTestMsgin_process);
            const processed = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "processed"
            )
            processed.simulate("press")
            const apiTestMsgprocessed = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgprocessed.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgprocessed.messageId
            );
            apiTestMsgprocessed.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgprocessed.messageId;
            runEngine.sendMessage("Test", apiTestMsgprocessed);
            const shipped = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "shipped"
            )
            shipped.simulate("press")
            const apiTestMsgshipped = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgshipped.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgshipped.messageId
            );
            apiTestMsgshipped.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgshipped.messageId;
            runEngine.sendMessage("Test", apiTestMsgshipped);
           
            const return_and_refund = OrderSummaryWrapper.findWhere(
                (node) => node.prop("testID") == "return_and_refund"
            )
            return_and_refund.simulate("press")
            const apiTestMsgreturn_and_refund = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgreturn_and_refund.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgreturn_and_refund.messageId
            );
            apiTestMsgreturn_and_refund.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{attributes:{status:"refunded"}}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgreturn_and_refund.messageId;
            runEngine.sendMessage("Test", apiTestMsgreturn_and_refund);
            const buttonTab1 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnInProcessAccordian"
            )
            buttonTab1.props().setOpen(true);
            
            const apiTestMsgreturn_and_refunds = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgreturn_and_refunds.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgreturn_and_refunds.messageId
            );
            apiTestMsgreturn_and_refunds.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{attributes:{status:"return_in_process"}}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgreturn_and_refunds.messageId;
            runEngine.sendMessage("Test", apiTestMsgreturn_and_refunds);
            const buttonTabsss = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnRequestAccordian"
            )
            buttonTabsss.props().setOpen(true);
            const apiTestMsgreturn_and_refundss = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgreturn_and_refundss.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgreturn_and_refundss.messageId
            );
            apiTestMsgreturn_and_refundss.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{attributes:{status:"return_request"}}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgreturn_and_refundss.messageId;
            runEngine.sendMessage("Test", apiTestMsgreturn_and_refundss);
            const buttonTab2 = OrderSummaryWrapper.findWhere(
                (node) => node.prop("toggleTestID") == "returnUnderProcessAccordian"
            )
            buttonTab2.props().setOpen(true);
            const apiTestMsgreturn_and_refundsss = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsgreturn_and_refundsss.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsgreturn_and_refundsss.messageId
            );
            apiTestMsgreturn_and_refundsss.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {orders:{data:[{attributes:{status:"return_under_process"}}]}}
            );
            instance.getOrderListSearchMsgId = apiTestMsgreturn_and_refundsss.messageId;
            runEngine.sendMessage("Test", apiTestMsgreturn_and_refundsss);
            const statusTxt = OrderSummaryWrapper.findWhere(node => node.text() === "rejected");
            expect(statusTxt.exists()).toBe(false);
        })
    });

    test("User navigates to OrderSummary new cases", ({ given, when, then }) => {
        let OrderSummaryWrapper: ShallowWrapper;
        let instance: OrderSummary;
        let acceptReturnMsgId: string = "acceptReturnMsgId";

        given("I am a User loading OrderSummary new cases", () => {
            OrderSummaryWrapper = shallow(<OrderSummary {...screenProps} />);
        });

        when("I navigate to the OrderSummary new cases", () => {
            instance = OrderSummaryWrapper.instance() as OrderSummary;
            instance.closeIcon('ar')
            instance.setState({roleType:'1'});
        });
        then("Set token from session response new cases", () => {

        });
    });
});
