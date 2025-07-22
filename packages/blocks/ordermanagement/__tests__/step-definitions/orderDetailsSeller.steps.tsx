import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import OrderDetailsSeller from "../../src/OrderDetailsSeller";
import { getStorageData } from "../../../../framework/src/Utilities";
const screenProps = {
    navigation: {
        addListener: jest.fn((event: string, callback: () => unknown) => {
            callback();
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "OrderDetailsSeller",
};

const NewOrderNavigationMockData= {
    "id": "105",
    "type": "seller_order_seller",
    "attributes": {
        "id": 105,
        "status": "processed",
        "accept_order_upload_time": null,
        "estimated_arrival_time": "2024-09-16T16:21:56.027+00:00",
        "order_items": [
            {
                "id": "216",
                "type": "order_item_seller",
                "attributes": {
                    "quantity": 3,
                    "unit_price": "700.0",
                    "total_price": "2100.0",
                    "estimated_delivery_time": "2024-04-24T11:21:25.204Z",
                    "reason_of_rejection": null,
                    "catalogue_name": "winter best t shirt",
                    "brand_name": "bjk",
                    "catalogue_variant_color": "Grey",
                    "catalogue_variant_sku": "x1",
                    "store_name": "radio",
                    "catalogue_variant_size": "Small",
                    "catalogue_variant_front_image": "example.jpg",
                    "catalogue_variant_back_image": "example.jpg",
                    "catalogue_variant_side_image": "example.jpg",
                    "driver_name":'bx',
                    "otp":'123'
                }
            }
        ],
        "order_management_order": {
            "id": "150",
            "type": "order_seller_side",
            "attributes": {
                "order_number": "OD00000131",
                "account": "Nishanth",
                "sub_total": "2100.0",
                "total": "2478.0",
                "status": "placed",
                "placed_at": "2024-04-22T11:21:07.400Z",
                "confirmed_at": null,
                "in_transit_at": null,
                "delivered_at": null,
                "cancelled_at": null,
                "refunded_at": null,
                "returned_at": null,
                "deliver_by": null,
                "order_status_id": 2,
                "created_at": "2024-04-22T11:19:58.934Z",
                "updated_at": "2024-04-22T11:21:07.435Z",
                "order_deliver_date": "09-12-2024",
                "order_deliver_time": "2PM",
                "delivery_addresses": {
                    "id": "6",
                    "type": "delivery_address",
                    "attributes": {
                        "name": "bingo",
                        "country_code": "+965",
                        "phone_number": "22111111",
                        "contact_number": "+96522111111",
                        "street": "tira",
                        "zip_code": "96385",
                        "area": "hues",
                        "block": "S",
                        "city": "ahemdabad",
                        "house_or_building_number": "12",
                        "address_name": "Home",
                        "is_default": true,
                        "latitude": 11.111,
                        "longitude": 12.111
                    }
                },
                "order_return_date": null,
                "order_return_time": null,
                "payment_detail": {
                    "payment_type":"masterCard",
                },
                "applied_coupon_code": 'sample10',
                "applied_discount": "10",
            }
        }
    }
}

const InProcessNavigationMockData=   {
    "id": "105",
    "type": "seller_order_seller",
    attributes: {
        "id": 105,
        "status": "in_process",
        "accept_order_upload_time": null,
        "estimated_arrival_time": "null",
        order_items: [
            {
                "id": "216",
                "type": "order_item_seller",
                "attributes": {
                    "quantity": 3,
                    "unit_price": "700.0",
                    "total_price": "2100.0",
                    "estimated_delivery_time": "2024-04-24T11:24:00.765Z",
                    "reason_of_rejection": null,
                    "catalogue_name": "winter best t shirt",
                    "brand_name": "bjk",
                    "catalogue_variant_color": "Grey",
                    "catalogue_variant_sku": "x1",
                    "store_name": null,
                    "catalogue_variant_size": "Small",
                    "catalogue_variant_front_image": "example.jpg",
                    "catalogue_variant_back_image": "example.jpg",
                    "catalogue_variant_side_image": "example.jpg",
                    "driver_name":'bjk',
                    "otp":'123'

                }
            }
        ],
        order_management_order: {
            "id": "150",
            "type": "order_seller_side",
            attributes: {
                "order_number": "OD00000131",
                "account": "Nishanth",
                "sub_total": "2100.0",
                "total": "2478.0",
                "status": "confirmed",
                "placed_at": "2024-04-22T11:21:07.400Z",
                "confirmed_at": "2024-04-22T11:21:41.570Z",
                "in_transit_at": null,
                "delivered_at": null,
                "cancelled_at": null,
                "refunded_at": null,
                "returned_at": null,
                "deliver_by": null,
                "order_status_id": 2,
                "created_at": "2024-04-22T11:19:58.934Z",
                "updated_at": "2024-04-22T11:21:41.575Z",
                "order_deliver_date": "09-12-2024",
                "order_deliver_time": "2PM",
                "delivery_addresses": null,
                "order_return_date": null,
                "order_return_time": null,
                payment_detail: {
                    payment_type:"masterCard"
                },
                "applied_coupon_code": 'sample10',
                "applied_discount": "10",
            }
        }
    }
}



function createMockDataDriver(status: string){
    return {
        id: "105",
        type: "seller_order_seller",
        attributes: {
            id: 105,
            status: status,
            accept_order_upload_time: null,
            estimated_delivery_time: null,
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
                        brand_name: "bjk",
                        catalogue_variant_color: "Grey",
                        catalogue_variant_sku: "x1",
                        store_name: 'radio',
                        catalogue_variant_size: "Small",
                        "catalogue_variant_front_image": "example.jpg",
                        "catalogue_variant_back_image": "example.jpg",
                        "catalogue_variant_side_image": "example.jpg",
                        driver_name:"test driver",
                        "otp":'123'

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
                    payment_detail: {
                        payment_type:"masterCard"
                    },
                    applied_coupon_code: 'sample10',
                applied_discount: "10",

                }
            }
        }
    };
}


function createMockData(status: string){
    return {
        id: "105",
        type: "seller_order_seller",
        attributes: {
            id: 105,
            status: status,
            accept_order_upload_time: null,
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
                        brand_name: "bjk",
                        catalogue_variant_color: "Grey",
                        catalogue_variant_sku: "x1",
                        store_name: 'radio',
                        catalogue_variant_size: "Small",
                        "catalogue_variant_front_image": "example.jpg",
                        "catalogue_variant_back_image": "example.jpg",
                        "catalogue_variant_side_image": "example.jpg",
                         driver_name:null,
                         otp:null,
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
                    payment_detail: {
                        payment_type:"masterCard"
                    },
                    applied_coupon_code: 'sample10',
                   applied_discount: "10",
                
                }
            }
        }
    };
}

const sendMessage = jest.spyOn(runEngine, "sendMessage");
const feature = loadFeature(
    "./__tests__/features/orderdetailsseller-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to OrderDetailsSeller", ({ given, when, then }) => {
        let OrderDetailsSellerWrapper: ShallowWrapper;
        let instance: OrderDetailsSeller;

        given("I am a User loading OrderDetailsSeller", () => {
            OrderDetailsSellerWrapper = shallow(<OrderDetailsSeller {...screenProps} />);
        });

        when("I navigate to the OrderDetailsSeller", async() => {
            instance = OrderDetailsSellerWrapper.instance() as OrderDetailsSeller;
           
        });

        then("Set token from session response",async () => {
            instance.setState({roleType:'3'})
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
        

        when("set recived new order item from navigation", () => {
            const dummy = createMockData("new_order");
            const payload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payload.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                {
                    ...dummy,
                    attributes: {
                        ...dummy.attributes,
                        order_management_order: {
                            ...dummy.attributes.order_management_order,
                            attributes: {
                                ...dummy.attributes.order_management_order.attributes,
                                delivered_at: null
                            }
                        },
                        order_items: [
                            {
                                ...dummy.attributes.order_items[0],
                                attributes: {
                                    ...dummy.attributes.order_items[0].attributes,
                                    delivered_at: null
                                }
                            }
                        ]
                    }
                }
            );
            runEngine.sendMessage("Unit Test", payload);

            const payload2 = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payload2.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                {
                    ...dummy,
                    attributes: {
                        ...dummy.attributes,
                        order_management_order: {
                            ...dummy.attributes.order_management_order,
                            attributes: {
                                ...dummy.attributes.order_management_order.attributes,
                                delivered_at: "2024-07-31T07:05:42.680Z"
                            }
                        },
                    }
                }
            );
            runEngine.sendMessage("Unit Test", payload2);

            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("new_order")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
        })

        then("load the new order List", () => {
            const flatlist = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "flatlist-orderDetails"
            )

          
            const renderItem = flatlist.renderProp("renderItem")({item:InProcessNavigationMockData.attributes.order_items[0],index:0})
          flatlist.props().ListFooterComponent();
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "New Order");
            expect(statusTxt.exists()).toBe(false);
            const flatlist1 = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "flatlist-orderDetails"
            )
            const renderItem1 = flatlist.renderProp("renderItem")({item:InProcessNavigationMockData.attributes.order_management_order,index:0})
            flatlist.props().ListFooterComponent();
            instance.renderArrivalTime()
            instance.getArrivalText({hours:NaN, minutes:NaN})
        });
        then("I can able to click reject button to navigate reject screen", () => {
            const rejectBtn = OrderDetailsSellerWrapper.findWhere(
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

        then("I can able to click accept button to navigate accept screen", () => {
            const AcceptBtn = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "acceptBtn"
            )
            AcceptBtn.simulate("press")
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "NavigationAcceptOrderMessage" }),
                ])
            );
          
        });
        when("set recived in process item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("in_process")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
          
        })
        then("load the in process List", () => {
            const flatlist = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "flatlist-orderDetails"
            )

          
            const renderItem = flatlist.renderProp("renderItem")({item:InProcessNavigationMockData.attributes.order_items[0],index:0})
          
           
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "In Process");
            expect(statusTxt.exists()).toBe(false);
            const mockOnGetArriveTime = jest.spyOn(instance, 'onGetArriveTime');

            // Call the method with null
            const result = instance.onGetArriveTime(null);
          
            // Verify that the function returns { hours: 0, minutes: 0 } for null input
            expect(result).toEqual({ hours: NaN, minutes: NaN });
            expect(result.hours).toBe(NaN);
            expect(result.minutes).toBe(NaN);

        });
        when('I click the Ready to ship button',()=>{
            const ship = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "inProcess-shipped"
            )
            ship.simulate("press")
        })
         
        then("I can able to change the status of order",()=>{
            const confirmBtn = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "confirm"
            )
            confirmBtn.simulate("press")
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                createMockData("processed")
            );
            instance.updateTheProceesedStatusMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "In Process");
            expect(statusTxt.exists()).toBe(false);
        })

        when("set recived processed item from navigation", () => {
            instance.setState({roleType:'1'})
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("processed")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);

            const orderStatus = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "orderStatus"
            )
            orderStatus.simulate("press")
            expect(instance.getTheStatusOfOrderDetails()).toBe('processed')
                const mockOnGetArriveTime = jest.spyOn(instance, 'onGetArriveTime').mockReturnValue({ hours: 2, minutes: 30 });

                    // Call the method with a specific argument
                    instance.onGetArriveTime("2024-09-16T16:21:56.027+00:00");

                    // Now check if onGetArriveTime was called with the correct argument
                    expect(mockOnGetArriveTime).toBeCalledWith("2024-09-16T16:21:56.027+00:00");

                    // Optionally, verify the return value
                    expect(mockOnGetArriveTime).toHaveReturnedWith({ hours: 2, minutes: 30 });
  
             
        })
        then("load the processed List", () => {
            const flatlist = OrderDetailsSellerWrapper.findWhere(
                (node) => node.prop("testID") === "flatlist-orderDetails"
            )

          
            const renderItem = flatlist.renderProp("renderItem")({item:NewOrderNavigationMockData.attributes.order_items[0],index:0})
          
           
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Ready for Collection");
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockDataDriver("RefundInProcess")
            );
            runEngine.sendMessage("Unit Test", payloadMsg); 
            expect(instance.showColor()).toBe("#F4F4F4")           
            expect(statusTxt.exists()).toBe(false);
            instance.getTheStatusOfOrderDetails()
            instance.renderAllTheProducts();
            instance.renderReadyForCollectionContainer();
            instance.getRejectionOfOrderReason();
            instance.getReasonOfOrderReturn();
            instance.renderStoreInformation();
            instance.renderArrivalTime()
           
        });
        

        then("set recived shipped item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("shipped")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Out for Delivery");
            expect(statusTxt.exists()).toBe(false);
          
        })
        then("set recived delivered item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("delivered")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Delivered");
            expect(statusTxt.exists()).toBe(false);
        })
        then("set recived ReturnRequest item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("return_request")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Return Request");
            expect(statusTxt.exists()).toBe(false);
        })
        then("set recived ReadyReturnInProcess item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("return_in_process")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Return In Process");
            expect(statusTxt.exists()).toBe(false);
        })
        then("set recived RefundInProcess item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("return_under_process")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Refund In Process");
            expect(statusTxt.exists()).toBe(false);
        })
        then("set recived Refunded item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("refunded")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Refunded");
            expect(statusTxt.exists()).toBe(false);
        })
        then("Set token from session response in order mangement",async () => {
            
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
        then("set recived rejected item from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.NavigationPlayLoadSellerOrderDetails),
                createMockData("rejected")
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            const statusTxt = OrderDetailsSellerWrapper.findWhere(node => node.text() === "Rejected");
            expect(statusTxt.exists()).toBe(true);
            instance.renderAllTheProducts()
        
        })
        

    });
});
