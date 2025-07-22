import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import ProductdescriptionSeller from "../../src/ProductdescriptionSeller";
import { Listener } from "../../../catalogue/__mock__/eventlistener"
const listener = new Listener();
const screenProps = {
    navigation: {
        addListener: listener.addEventListener,
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "ProductdescriptionSeller",
};


const productDetailsMockdata = {
    "data": {
        "id": "148",
        "type": "catalogue",
        "attributes": {
            "name": "Brand128b",
            "brand": null,
            "tags": {
                "data": []
            },
            "reviews": [],
            "sku": null,
            "description": "Lorem Ipsum",
            "manufacture_date": null,
            "length": null,
            "breadth": null,
            "height": null,
            "stock_qty": null,
            "availability": null,
            "weight": null,
            "price": null,
            "recommended": null,
            "on_sale": null,
            "sale_price": null,
            "discount": null,
            "is_wishlist": false,
            "product_number": null,
            "primary_image": null,
            "primary_price": "1000.0",
            "gender": "male",
            "brand_name": "H&M",
            "material": "Cotton",
            "fit": "Slim Fit",
            "prodcut_care": "Machine Wash",
            "list_the_product": "listed",
            "fit_discription": "Lorem Ipsum",
            "primary_discounted_percentage":"0",
            "category": {
                "id": "65",
                "type": "category",
                "attributes": {
                    "id": 65,
                    "name": "Women's Clothing",
                    "status": "active",
                    "created_at": "2023-12-08T10:31:06.580Z",
                    "updated_at": "2023-12-14T10:56:24.931Z",
                    "image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg"
                }
            },
            "sub_category": {
                "id": "435",
                "type": "sub_category",
                "attributes": {
                    "id": 435,
                    "name": "Dresses",
                    "created_at": "2023-12-08T10:31:06.697Z",
                    "updated_at": "2023-12-08T10:31:06.697Z",
                    "image": ""
                }
            },
            "sub_sub_category": {
                "id": "1",
                "type": "sub_sub_category",
                "attributes": {
                    "id": 1,
                    "name": "Casual Dresses",
                    "created_at": "2023-12-08T10:31:06.744Z",
                    "updated_at": "2023-12-08T10:31:06.744Z",
                    "image": ""
                }
            },
            "service": null,
            "average_rating": 0,
            "catalogue_variants": [
                {
                    "id": "199",
                    "type": "catalogue_variant",
                    "attributes": {
                        "id": 199,
                        "catalogue_id": 148,
                        "catalogue_variant_color_id": 7,
                        "catalogue_variant_color": {
                            "id": 7,
                            "name": "Grey",
                            "created_at": "2023-10-05T05:19:28.122Z",
                            "updated_at": "2023-10-05T05:19:28.122Z"
                        },
                        "catalogue_variant_size_id": 1,
                        "catalogue_variant_size": {
                            "id": 1,
                            "name": "Small",
                            "created_at": "2023-09-22T04:45:35.966Z",
                            "updated_at": "2023-09-22T04:45:35.966Z"
                        },
                        "price": "1000.0",
                        "stock_qty": 20,
                        "on_sale": null,
                        "sale_price": null,
                        "discount_price": null,
                        "length": null,
                        "breadth": null,
                        "height": null,
                        "created_at": "2024-03-01T05:56:53.604Z",
                        "updated_at": "2024-03-01T05:56:53.604Z",
                        "sku": "ABCD2229v",
                        "low_stock_threshold": 0,
                        "is_listed": true,
                        "front_image": "",
                        "back_image": "",
                        "side_image": "",
                        "pair_it_with": []
                    }
                },
                {
                    "id": "198",
                    "type": "catalogue_variant",
                    "attributes": {
                        "id": 198,
                        "catalogue_id": 148,
                        "catalogue_variant_color_id": 8,
                        "catalogue_variant_color": {
                            "id": 8,
                            "name": "blue",
                            "created_at": "2023-10-05T05:19:28.122Z",
                            "updated_at": "2023-10-05T05:19:28.122Z"
                        },
                        "catalogue_variant_size_id": 3,
                        "catalogue_variant_size": {
                            "id": 1,
                            "name": "medium",
                            "created_at": "2023-09-22T04:45:35.966Z",
                            "updated_at": "2023-09-22T04:45:35.966Z"
                        },
                        "price": "1000.0",
                        "stock_qty": 20,
                        "on_sale": null,
                        "sale_price": null,
                        "discount_price": null,
                        "length": null,
                        "breadth": null,
                        "height": null,
                        "created_at": "2024-03-01T05:56:53.604Z",
                        "updated_at": "2024-03-01T05:56:53.604Z",
                        "sku": "ABCD2229v",
                        "low_stock_threshold": 0,
                        "is_listed": true,
                        "front_image": "",
                        "back_image": "",
                        "side_image": "",
                        "pair_it_with": []
                    }
                }
            ],
            "catalogue_variants_with_store": [
                {
                    "id": "199",
                    "type": "catalogue_variant",
                    "attributes": {
                        "id": 199,
                        "catalogue_id": 148,
                        "catalogue_variant_color_id": 7,
                        "catalogue_variant_color": {
                            "id": 7,
                            "name": "Grey",
                            "created_at": "2023-10-05T05:19:28.122Z",
                            "updated_at": "2023-10-05T05:19:28.122Z"
                        },
                        "catalogue_variant_size_id": 1,
                        "catalogue_variant_size": {
                            "id": 1,
                            "name": "Small",
                            "created_at": "2023-09-22T04:45:35.966Z",
                            "updated_at": "2023-09-22T04:45:35.966Z"
                        },
                        "price": "1000.0",
                        "stock_qty": 20,
                        "on_sale": null,
                        "sale_price": null,
                        "discount_price": null,
                        "length": null,
                        "breadth": null,
                        "height": null,
                        "created_at": "2024-03-01T05:56:53.604Z",
                        "updated_at": "2024-03-01T05:56:53.604Z",
                        "sku": "ABCD2229v",
                        "low_stock_threshold": 0,
                        "is_listed": true,
                        "front_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDREIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4885ea983735d6a88cf9863477d696c51989cad6/profile.jpg",
                        "back_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDREIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4885ea983735d6a88cf9863477d696c51989cad6/profile.jpg",
                        "side_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdDREIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4885ea983735d6a88cf9863477d696c51989cad6/profile.jpg",
                        "pair_it_with": []
                    },
                    "store_info": {
                        "id": "87",
                        "type": "bussiness",
                        "attributes": {
                            "store_name": "Kk",
                            "description": "Store",
                            "area": "Dodda ",
                            "block": "Hhh",
                            "mall_name": "Bb",
                            "floor": "Bn",
                            "unit_number": 66,
                            "city": "Gh ",
                            "zipcode": "571101",
                            "driver_instruction": "Jjjbjj",
                            "average_shipping_time": "10 mins",
                            "payment_mode": [
                                "UPI,COD"
                            ],
                            "store_operating_hours": {
                                "monday": {
                                    "open": "00:57",
                                    "close": "02:57",
                                    "is_open": true
                                },
                                "tuesday": {
                                    "open": "03:57",
                                    "close": "08:58",
                                    "is_open": true
                                },
                                "wednesday": {
                                    "open": "04:58",
                                    "close": "08:58",
                                    "is_open": true
                                },
                                "thursday": {
                                    "open": "03:58",
                                    "close": "03:58",
                                    "is_open": true
                                },
                                "friday": {
                                    "open": "08:58",
                                    "close": "08:58",
                                    "is_open": true
                                },
                                "saturday": {
                                    "open": "08:58",
                                    "close": "08:58",
                                    "is_open": true
                                },
                                "sunday": {
                                    "open": "03:58",
                                    "close": "04:58",
                                    "is_open": true
                                }
                            },
                            "status": "Pending",
                            "latitude": 29.378586,
                            "longitude": 47.990341,
                            "is_open": false,
                            "available_variants": [
                                {
                                    "id": "199",
                                    "type": "inventory_management",
                                    "attributes": {
                                        "id": 199,
                                        "catalogue_id": 148,
                                        "product_name": "Brand128b",
                                        "product_description": "Lorem Ipsum",
                                        "sku": "ABCD2229v",
                                        "stock_qty": 20,
                                        "low_stock_threshold": 0,
                                        "is_listed": true,
                                        "price": "1000.0",
                                        "size": "Small",
                                        "colour": "Grey",
                                        "gender": "male",
                                        "front_image": "",
                                        "brand_name": "H&M"
                                    }
                                }
                            ],
                            "image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaEVFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--189f562f511e2830fda362696c345c656379007f/profile.jpg",
                            "email": "nishanthnishu118@gmail.com",
                            "contact_number": {
                                "country_code": "+91",
                                "phone_number": "9148538896"
                            },
                            "expected_delivery_time": "2024-03-02T18:49:21.510+00:00"
                        }
                    }
                }
            ]
        }
    }
}



const feature = loadFeature(
    "./__tests__/features/productdescriptionseller-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to ProductdescriptionSeller", ({ given, when, then }) => {
        let ProductdescriptionSellerWrapper: ShallowWrapper;
        let instance: ProductdescriptionSeller;

        given("I am a User loading ProductdescriptionSeller", () => {
            ProductdescriptionSellerWrapper = shallow(<ProductdescriptionSeller {...screenProps} />);
        });

        when("I navigate to the ProductdescriptionSeller", () => {
            listener.simulateListener("willFocus");
            instance = ProductdescriptionSellerWrapper.instance() as ProductdescriptionSeller;
        });

        then("ProductdescriptionSeller will load with out errors", () => {
            let saveButton = ProductdescriptionSellerWrapper.findWhere(
                (node) => node.prop("testID") === "btnBack"
              );
              saveButton.simulate("press");
            expect(ProductdescriptionSellerWrapper).toBeTruthy();
        });
        then("Set token from session response", () => {


            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            instance.receive("from", reciveToken);

            runEngine.sendMessage("Unit Test", reciveToken);
        });

        then("set recived catalogue id from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.ProductDescriptionSellerCatalogueId),
                148
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            expect(ProductdescriptionSellerWrapper.state("catalogueId")).toBe(148)
        })
        then('load the product details', () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                productDetailsMockdata
            );
            instance.getCatalogueDetailsApiMsgCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(ProductdescriptionSellerWrapper.state("productDetailsData")).toStrictEqual(productDetailsMockdata.data)
        })

        then("I can view the other color variants", () => {

            const dropDown = ProductdescriptionSellerWrapper.findWhere(
                (node) => node.prop("testID") === "color"
            )
            dropDown.simulate("change", { name: "blue", id: "8" })
            expect(ProductdescriptionSellerWrapper.state("selectedColor")).toBe("8")

        })

        then("I can view the other size variants", () => {
            const dropDown = ProductdescriptionSellerWrapper.findWhere(
                (node) => node.prop("testID") === "size"
            )
            dropDown.simulate("change", { name: "medium", id: "3" })
            expect(ProductdescriptionSellerWrapper.state("selectedSize")).toBe("3")
            let viewAsBuyer = ProductdescriptionSellerWrapper.findWhere(
                (node) => node.prop("testID") === "viewAsBuyerBtn"
              );
              viewAsBuyer.simulate("press");
        })
        then("I can click edit button to navigate product details screen", () => {
            const editProductBtn = ProductdescriptionSellerWrapper.findWhere(
                (node) => node.prop("testID") === "editProductBtn"
            )
            editProductBtn.simulate("press")
           
        })

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(ProductdescriptionSellerWrapper).toBeTruthy();
        });




    });
});
