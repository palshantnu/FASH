import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import AssignStore from "../../src/AssignStore";

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {

            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "AssignStore",
};




const navigationPropsMock = {
    "addProductDetails": {
        "productName": "tshirt ",
        "gender": "male",
        "brand": "jjk",
        "category": "65",
        "subCategory": "435",
        "subSubCategory": "3",
        "material": "bnj",
        "fit": "hnj",
        "productCare": "bnjh",
        "productDescription": "njjb",
        "isListed": "listed"
    },
    "variants": [
        {
            "id": null,
            "catalogue_id": null,
            "catalogue_variant_color_id": 7,
            "catalogue_variant_size_id": 1,
            "price": "96",
            "stock_qty": "23",
            "on_sale": null,
            "sale_price": null,
            "discount_price": null,
            "length": null,
            "breadth": null,
            "height": null,
            "created_at": null,
            "updated_at": null,
            "block_qty": null,
            "sku": "bbhh",
            "low_stock_threshold": 0,
            "is_listed": true,
            "remove_front_image": {
                "name": "profile.jpg",
                "type": "image/jpeg",
                "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
            },
            "remove_back_image": null,
            "remove_side_image": null,
            "variant_color": "Grey",
            "variant_size": "Small",
            "focusedView": "front"
        }
    ]
}

const storeMockData = {
    "data": [
        {
            "id": "100",
            "type": "bussiness",
            "attributes": {
                "store_name": "Nyk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },
        {
            "id": "99",
            "type": "bussiness",
            "attributes": {
                "store_name": "puma",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },
        {
            "id": "87",
            "type": "bussiness",
            "attributes": {
                "store_name": "kk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        }]
}


const storeSearchMockData = {
    "data": [
        {
            "id": "100",
            "type": "bussiness",
            "attributes": {
                "store_name": "Nyk",
                "image": {
                    "name": "profile.jpg",
                    "type": "image/jpeg",
                    "uri": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
                }
            }
        },]
}

const catalogueMockData = {
    "data": {
      "id": "130",
      "type": "catalogue",
      "attributes": {
        "name": "Brandnnb",
        "brand": null,
        "tags": [],
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
        "gender": "male",
        "brand_name": "H&M",
        "material": "Cotton",
        "fit": "Slim Fit",
        "prodcut_care": "Machine Wash",
        "list_the_product": "listed",
        "fit_discription": "Lorem Ipsum",
        "category": {
          "id": "61",
          "type": "category",
          "attributes": {
            "id": 61,
            "name": "New Arrivals",
            "status": "active",
            "created_at": "2023-09-26T13:16:14.144Z",
            "updated_at": "2023-12-14T10:59:32.550Z",
            "image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0VDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c0f94a1617712d435117e462e7815fcb5bd0f62/tshirt.jpg"
          }
        },
        "sub_category": {
          "id": "470",
          "type": "sub_category",
          "attributes": {
            "id": 470,
            "name": "Women's New In",
            "created_at": "2023-12-08T10:31:08.939Z",
            "updated_at": "2023-12-14T11:01:57.062Z",
            "image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0lDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--585919f0cbb296aa4fadb91bb4dec8cdb3f944e6/captain.jpg"
          }
        },
        "sub_sub_category": {
          "id": "117",
          "type": "sub_sub_category",
          "attributes": {
            "id": 117,
            "name": "Latest Dresses",
            "created_at": "2023-12-08T10:31:08.952Z",
            "updated_at": "2023-12-08T10:31:08.952Z",
            "image": ""
          }
        },
        "service": null,
        "average_rating": 0,
        "catalogue_variants": [
          {
            "id": "160",
            "type": "catalogue_variant",
            "attributes": {
              "id": 160,
              "catalogue_id": 130,
              "catalogue_variant_color_id": 10,
              "catalogue_variant_color": {
                "id": 10,
                "name": "Whiteee",
                "created_at": "2023-10-05T05:20:08.849Z",
                "updated_at": "2023-10-05T05:20:08.849Z"
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
              "created_at": "2024-02-19T19:30:49.180Z",
              "updated_at": "2024-02-19T19:30:49.180Z",
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
            "id": "160",
            "type": "catalogue_variant",
            "attributes": {
              "id": 160,
              "catalogue_id": 130,
              "catalogue_variant_color_id": 10,
              "catalogue_variant_color": {
                "id": 10,
                "name": "Whiteee",
                "created_at": "2023-10-05T05:20:08.849Z",
                "updated_at": "2023-10-05T05:20:08.849Z"
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
              "created_at": "2024-02-19T19:30:49.180Z",
              "updated_at": "2024-02-19T19:30:49.180Z",
              "low_stock_threshold": 0,
              "is_listed": true,
              "front_image": "",
              "back_image": "",
              "side_image": "",
              "pair_it_with": []
            },
            "store_info": {}
          }
        ]
      }
    }
  }


const feature = loadFeature(
    "./__tests__/features/assignstore-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to AssignStore", ({ given, when, then }) => {
        let AssignStoreWrapper: ShallowWrapper;
        let storeInstance: AssignStore;

        given("I am a User loading AssignStore", () => {
            AssignStoreWrapper = shallow(<AssignStore {...screenProps} />);
        });

        when("I navigate to the AssignStore", () => {
            storeInstance = AssignStoreWrapper.instance() as AssignStore;
        });

        then("AssignStore will load with out errors", () => {
            expect(AssignStoreWrapper).toBeTruthy();
        });
        then("Set token from session response", () => {


            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            storeInstance.receive("from", reciveToken);

            runEngine.sendMessage("Unit Test", reciveToken);
        });

        then("set recived catalogue id from navigation", () => {
            const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            payloadMsg.addData(
                getName(MessageEnum.ProductDetailsData),
                navigationPropsMock
            );
            runEngine.sendMessage("Unit Test", payloadMsg);
            expect(AssignStoreWrapper.state("catalougeDetails")).toStrictEqual(navigationPropsMock)
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
                storeMockData
            );
            storeInstance.getAllStoreApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(AssignStoreWrapper.state("assignStore")).toStrictEqual(storeMockData.data)
        })

        then("I can show all stores list", () => {
            const flatlist = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "Assignstore_show_flatlist_list"
            )

            const item = storeMockData.data[0]
            const renderItem = flatlist.renderProp("renderItem")({ item: item, index: 0 })
            const buttonNavigate = renderItem.findWhere(
                (node) => node.prop("testID") == "selectCheckBox"
            )
            buttonNavigate.simulate("press")

            const item2 = {}
            flatlist.renderProp("ListEmptyComponent")({ item: item2 })

            flatlist.props().ListEmptyComponent();
            const searchInputBox = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "nyk")
           
            flatlist.props().ListEmptyComponent();

        });

        then("I can select the all store checkbox", () => {
            const allBtnCheckBox = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "allBtnCheckBox"
            )
            allBtnCheckBox.simulate("press")
            expect(AssignStoreWrapper.state("selectedItem")).toStrictEqual(["100","99","87"])

        })

        then("I can able to search the store", () => {
            const searchInputBox = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "searchInputBox"
            )
            searchInputBox.simulate("changeText", "nyk")
            searchInputBox.simulate("submitEditing")

            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                storeSearchMockData
            );
            storeInstance.getAllStoreApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(AssignStoreWrapper.state("assignStore")).toStrictEqual(storeSearchMockData.data)
        })

        then("I can able to create the catalogue via confirm button", () => {
            const btnConfirm = AssignStoreWrapper.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            )
            btnConfirm.simulate("press")
            

            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                catalogueMockData
            );
            storeInstance.postCreateCatalougeApiCallMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
        })

        then("I can leave the screen with out errors", () => {
            storeInstance.setState({updateLanguage:'en'})
            storeInstance.fetchTheStoreDetails()
            storeInstance.componentWillUnmount();
            expect(AssignStoreWrapper).toBeTruthy();
        });




    });
});
