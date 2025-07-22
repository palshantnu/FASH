import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import * as helpers from "../../../../framework/src/Helpers";
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import DashboardAsBuyer from "../../src/DashboardAsBuyer";
import { Listener } from "../../__mocks__/eventlistener";
const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: listener.addEventListener,
  },
  id: "DashboardAsBuyer",
};

const feature = loadFeature(
  "./__tests__/features/dashboardasbuyer-scenario.feature"
);

let productData = {
  data: [
    {
      id: "337",
      type: "catalogue_listing",
      attributes: {
        name: "Partwear gown long",
        description:
          "ruiritiei shsjsj xjdjkejs djdjdnnd sjsjsjs jdjdjs hwhwhwj ayurieie jdbcbx Ane jdkdkekebjdjekeke ienejjeke ejejdd ndjdje",
        catalogue_variants: [
          {
            id: "528",
            type: "catalogue_variant",
            attributes: {
              id: 528,
              catalogue_id: 337,
              catalogue_variant_color_id: 13,
              catalogue_variant_color: {
                id: 13,
                name: "Maroon",
                created_at: "2024-03-27T09:19:36.201Z",
                updated_at: "2024-03-27T09:19:36.201Z",
              },
              catalogue_variant_size_id: 11,
              catalogue_variant_size: {
                id: 11,
                name: "XL",
                created_at: "2024-03-29T11:17:59.975Z",
                updated_at: "2024-03-29T11:17:59.975Z",
              },
              price: "6000.0",
              stock_qty: 259,
              on_sale: null,
              sale_price: null,
              discount_price: null,
              length: null,
              breadth: null,
              height: null,
              created_at: "2024-08-02T12:41:27.926Z",
              updated_at: "2024-09-19T10:05:15.245Z",
              sku: "re1",
              deactivate: false,
              low_stock_threshold: 0,
              is_listed: false,
              discounted_price: null,
              front_image:
                "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazRRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d6f4b753fce1de8cf0a4e1b66660b3ec4c632ee/profile.jpg",
              back_image:
                "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazhRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0b425bac94959ad7c0fc9a59dbde9d879396e7d2/profile.jpg",
              side_image: "",
              pair_it_with: [],
            },
          },
        ],
        primary_image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazRRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d6f4b753fce1de8cf0a4e1b66660b3ec4c632ee/profile.jpg",
        primary_price: "6000.0",
        is_wishlist: false,
      },
    },
    {
      id: "319",
      type: "catalogue_listing",
      attributes: {
        name: "Kidsfashion",
        description: "Lorem Ipsum",
        catalogue_variants: [
          {
            id: "503",
            type: "catalogue_variant",
            attributes: {
              id: 503,
              catalogue_id: 319,
              catalogue_variant_color_id: 17,
              catalogue_variant_color: {
                id: 17,
                name: "purple",
                created_at: "2024-05-22T05:34:27.804Z",
                updated_at: "2024-05-22T05:34:27.804Z",
              },
              catalogue_variant_size_id: 11,
              catalogue_variant_size: {
                id: 11,
                name: "XL",
                created_at: "2024-03-29T11:17:59.975Z",
                updated_at: "2024-03-29T11:17:59.975Z",
              },
              price: "1000.0",
              stock_qty: 0,
              on_sale: null,
              sale_price: null,
              discount_price: null,
              length: null,
              breadth: null,
              height: null,
              created_at: "2024-07-22T11:47:57.552Z",
              updated_at: "2024-09-13T07:52:48.185Z",
              sku: "ABCD335",
              deactivate: false,
              low_stock_threshold: 0,
              is_listed: true,
              discounted_price: null,
              front_image:
                "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW9PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cd71bf2aadb132377e3121f7bcf9cf46486aee4e/kids%20cloth.jpg",
              back_image:
                "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdXNPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c590876c7a5a133cbac1f782b084cfe42b78d773/kids%20cloth.jpg",
              side_image: "",
              pair_it_with: [],
            },
          },
        ],
        primary_image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdW9PIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cd71bf2aadb132377e3121f7bcf9cf46486aee4e/kids%20cloth.jpg",
        primary_price: "1000.0",
        is_wishlist: false,
      },
    },
  ],
  meta: {
    total_pages: 28,
    current_page: 2,
    total_record: {
      "163": 1,
      "167": 1,
      "190": 1,
      "211": 1,
      "220": 1,
      "222": 1,
      "224": 1,
      "225": 1,
      "229": 1,
      "282": 1,
      "287": 1,
      "292": 1,
      "294": 1,
      "295": 1,
      "296": 1,
      "297": 1,
      "298": 1,
      "299": 1,
      "300": 1,
      "301": 1,
      "302": 1,
      "306": 1,
      "310": 1,
      "312": 1,
      "313": 1,
      "317": 1,
      "319": 1,
      "323": 1,
      "324": 1,
      "328": 1,
      "331": 1,
      "332": 1,
      "335": 1,
      "336": 1,
      "337": 1,
      "339": 1,
      "346": 1,
      "354": 1,
      "356": 1,
      "359": 1,
      "364": 1,
      "375": 1,
      "377": 1,
      "378": 1,
      "380": 1,
      "381": 1,
      "382": 1,
      "383": 1,
      "384": 1,
      "403": 1,
      "430": 1,
      "442": 1,
      "460": 1,
      "463": 1,
      "468": 1,
    },
    prev_page: 1,
    next_page: 3,
  },
};
let dummyCart = {
  data: {
    id: "67",
    type: "order",
    attributes: {
      id: 67,
      order_number: "OD00000057",
      title: "Order Summary",
      amount: null,
      order_item_count: 1,
      account_id: 423,
      coupon_code_id: null,
      delivery_address_id: null,
      sub_total: "2008.0",
      total: "2369.44",
      status: "created",
      custom_label: null,
      applied_discount: "0.0",
      cancellation_reason: null,
      order_date: null,
      is_gift: false,
      placed_at: null,
      confirmed_at: null,
      in_transit_at: null,
      delivered_at: null,
      cancelled_at: null,
      refunded_at: null,
      source: null,
      shipment_id: null,
      delivery_charges: null,
      tracking_url: null,
      schedule_time: null,
      payment_failed_at: null,
      payment_pending_at: null,
      returned_at: null,
      tax_charges: "0.0",
      deliver_by: null,
      tracking_number: null,
      is_error: false,
      delivery_error_message: null,
      order_status_id: 1,
      is_group: true,
      is_availability_checked: false,
      shipping_charge: "50.0",
      shipping_discount: "50.0",
      shipping_net_amt: "0.0",
      shipping_total: "0.0",
      total_tax: 361.44,
      created_at: "2024-02-07T13:23:56.301Z",
      updated_at: "2024-02-12T06:05:23.458Z",
      order_deliver_date: null,
      order_deliver_time: null,
      delivery_addresses: [],
      order_return_date: null,
      order_return_time: null,
      razorpay_order_id: null,
      charged: null,
      invoice_id: null,
      invoiced: null,
      order_items: [
        {
          id: "89",
          type: "order_item",
          attributes: {
            id: 89,
            order_management_order_id: 67,
            variant_availability: "available",
            quantity: 2,
            unit_price: "1004.0",
            total_price: "2008.0",
            old_unit_price: null,
            status: "in_cart",
            catalogue_id: 105,
            catalogue_variant_id: 124,
            order_status_id: 1,
            placed_at: null,
            confirmed_at: null,
            in_transit_at: null,
            delivered_at: null,
            cancelled_at: null,
            refunded_at: null,
            manage_placed_status: false,
            manage_cancelled_status: false,
            created_at: "2024-02-07T13:23:56.415Z",
            updated_at: "2024-02-12T06:05:23.432Z",
            reason_of_rejection: null,
            rejected_at: null,
            estimated_delivery_time: "2024-02-14T06:05:56.589Z",
            order_statuses: {
              order_number: "OD00000057",
              placed_at: null,
              confirmed_at: null,
              in_transit_at: null,
              delivered_at: null,
              cancelled_at: null,
              refunded_at: null,
            },
          },
        },
      ],
    },
  },
};
let createWishlistresponse = {
  data: {
    id: "61",
    type: "wishlist",
    attributes: {
      id: 61,
      account_id: 1198,
      name: "anyname",
      shareable_id: 1198,
      wishlist_items: [],
    },
  },
  meta: {
    message: "Wishlist Already present.",
  },
};
let getwishlistData = {
  data: [
    {
      id: "57",
      type: "wishlist",
      attributes: {
        id: 57,
        account_id: 1198,
        name: "myname",
        shareable_id: 1197,
        shareable_name: "hii",
        wishlist_items: [
          {
            id: 778,
            created_at: "2024-09-19T05:54:42.291Z",
            updated_at: "2024-09-19T05:54:42.291Z",
            favouriteable_id: 444,
            favouriteable_type: "BxBlockCatalogue::Catalogue",
            user_id: null,
            wishlist_id: 57,
            notes: null,
          },
          {
            id: 779,
            created_at: "2024-09-19T05:54:46.592Z",
            updated_at: "2024-09-19T05:54:46.592Z",
            favouriteable_id: 443,
            favouriteable_type: "BxBlockCatalogue::Catalogue",
            user_id: null,
            wishlist_id: 57,
            notes: null,
          },
        ],
      },
    },
    {
      id: "61",
      type: "wishlist",
      attributes: {
        id: 61,
        account_id: 1198,
        name: "anyname",
        shareable_id: 1198,
        shareable_name: "hii",
        wishlist_items: [
          {
            id: 807,
            created_at: "2024-09-20T09:37:11.222Z",
            updated_at: "2024-09-20T09:37:11.222Z",
            favouriteable_id: 420,
            favouriteable_type: "BxBlockCatalogue::Catalogue",
            user_id: 1198,
            wishlist_id: 61,
            notes: null,
          },
        ],
      },
    },
  ],
};
const addTowishlistresponse = {
  data: {
    id: "824",
    type: "favourite",
    attributes: {
      favouriteable_id: 324,
      favouriteable_type: "BxBlockCatalogue::Catalogue",
      wishlist_id: 57,
      notes: null,
      created_at: "2024-09-20T15:09:22.695Z",
      updated_at: "2024-09-20T15:09:22.695Z",
      favouriteable: {
        data: {
          id: "324",
          type: "catalogue_wishlist",
          attributes: {
            name: "lifestyle",
            brand: null,
            sku: null,
            description: "Lorem Ipsum",
            manufacture_date: null,
            stock_qty: null,
            availability: null,
            price: null,
            discount: null,
            is_wishlist: false,
            product_number: null,
            primary_image:
              "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.random/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcE1QIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d41d805139958fc533b76d24381e0a62cc16743/cat1.jpg",
            primary_price: "500.0",
            gender: "male",
            brand_name: "H&M",
            material: "Cotton",
            fit: "Slim Fit",
            prodcut_care: "Machine Wash",
            list_the_product: "listed",
            fit_discription: "Lorem Ipsum",
            primary_size: {
              id: 9,
              name: "Medium",
              created_at: "2024-03-06T05:53:50.617Z",
              updated_at: "2024-03-06T05:53:50.617Z",
            },
            primary_colour: {
              id: 17,
              name: "purple",
              created_at: "2024-05-22T05:34:27.804Z",
              updated_at: "2024-05-22T05:34:27.804Z",
            },
          },
        },
      },
    },
  },
  meta: {
    message: "Added to wishlist.",
  },
};
let wishlistData = [
  {
    id: "57",
    type: "wishlist",
    attributes: {
      id: 57,
      account_id: 1198,
      name: "myname",
      shareable_id: 1197,
      wishlist_items: [
        {
          id: 830,
          created_at: "2024-09-23T03:30:25.176Z",
          updated_at: "2024-09-23T03:30:25.176Z",
          favouriteable_id: 443,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: null,
          wishlist_id: 57,
          notes: null,
        },
        {
          id: 831,
          created_at: "2024-09-23T03:30:26.486Z",
          updated_at: "2024-09-23T03:30:26.486Z",
          favouriteable_id: 358,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: null,
          wishlist_id: 57,
          notes: null,
        },
        {
          id: 851,
          created_at: "2024-09-23T12:19:52.626Z",
          updated_at: "2024-09-23T12:19:52.626Z",
          favouriteable_id: 476,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: null,
          wishlist_id: 57,
          notes: null,
        },
        {
          id: 867,
          created_at: "2024-09-26T15:12:36.747Z",
          updated_at: "2024-09-26T15:12:36.747Z",
          favouriteable_id: 378,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: null,
          wishlist_id: 57,
          notes: null,
        },
        {
          id: 819,
          created_at: "2024-09-20T14:54:27.936Z",
          updated_at: "2024-09-20T14:54:27.936Z",
          favouriteable_id: 420,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: null,
          wishlist_id: 57,
          notes: null,
        },
      ],
    },
  },
  {
    id: "61",
    type: "wishlist",
    attributes: {
      id: 61,
      account_id: 1198,
      name: "anyname",
      shareable_id: 1198,
      wishlist_items: [
        {
          id: 849,
          created_at: "2024-09-23T12:13:16.509Z",
          updated_at: "2024-09-23T12:13:16.509Z",
          favouriteable_id: 190,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 866,
          created_at: "2024-09-26T15:12:25.024Z",
          updated_at: "2024-09-26T15:12:25.024Z",
          favouriteable_id: 335,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 868,
          created_at: "2024-09-26T15:12:54.650Z",
          updated_at: "2024-09-26T15:12:54.650Z",
          favouriteable_id: 298,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 869,
          created_at: "2024-09-26T15:13:22.913Z",
          updated_at: "2024-09-26T15:13:22.913Z",
          favouriteable_id: 306,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 870,
          created_at: "2024-09-26T15:13:48.869Z",
          updated_at: "2024-09-26T15:13:48.869Z",
          favouriteable_id: 460,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 871,
          created_at: "2024-09-26T15:20:46.784Z",
          updated_at: "2024-09-26T15:20:46.784Z",
          favouriteable_id: 471,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 872,
          created_at: "2024-09-26T15:20:57.098Z",
          updated_at: "2024-09-26T15:20:57.098Z",
          favouriteable_id: 494,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 873,
          created_at: "2024-09-26T15:21:12.645Z",
          updated_at: "2024-09-26T15:21:12.645Z",
          favouriteable_id: 282,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
        {
          id: 874,
          created_at: "2024-09-26T15:21:35.941Z",
          updated_at: "2024-09-26T15:21:35.941Z",
          favouriteable_id: 297,
          favouriteable_type: "BxBlockCatalogue::Catalogue",
          user_id: 1198,
          wishlist_id: 61,
          notes: null,
        },
      ],
    },
  },
];
defineFeature(feature, (test) => {
     beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "mobile" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "mobile");
        jest.mock("react-native-flash-message", () => ({ showMessage: jest.fn() }));
        jest
          .spyOn(utils, "getStorageData")
          .mockImplementationOnce(async () => "")
          .mockImplementationOnce(async () => "true");
      });
  test("User navigates to dashboardasbuyer", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("I am a User loading dashboardasbuyer", () => {
      screen = render(<DashboardAsBuyer {...screenProps} />);
      render(<DashboardAsBuyer {...screenProps} />);
    });

    when("I navigate to the dashboardasbuyer", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);
      const cartAmountMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cartAmountMessage.messageId
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyCart
      );
      screen.container.instance.cartApiCallId = cartAmountMessage.messageId;
      runEngine.sendMessage("Unit Test", cartAmountMessage);

      // cart with no items
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "No active cart found",
        }
      );
      runEngine.sendMessage("Unit Test", cartAmountMessage);
    });

    then("dashboardasbuyer will load with out errors", () => {
      screen.container.instance.setState({ modalTrue: true });
      const touchableFeedback = screen.getByTestId("ModalOutside");
      fireEvent.press(touchableFeedback);
      const touchable = screen.getAllByTestId("btnBackSelectStore");
      fireEvent.press(touchable[0]);
      fireEvent.press(touchable[1]);
      const secOne = screen.getByTestId("selectOne");
      const secTwo = screen.getByTestId("selectTwo");
      const secThree = screen.getByTestId("selectThree");
      fireEvent.press(secOne);
      fireEvent.press(secTwo);
      fireEvent.press(secThree);
      //   expect(screen.queryByTestId("stylistDashboard")).not.toBe(null);
    });

    then("user clicks on categoryImage and store Image", () => {
      const storeImage = screen.getByTestId("storeImage");
      const categoryImage = screen.getByTestId("categoryImage");
      fireEvent.press(storeImage);
      fireEvent.press(categoryImage);
    });

    then("user clicks heart button", () => {
      const wishlistbutton = screen.getByTestId("wishlistbutton");
      fireEvent.press(wishlistbutton);
    });
    then("user clicks on the processing,delivered button", () => {
      const processing = screen.getByTestId("Processing");
      const Delivered = screen.getByTestId("Delivered");
      const Returns = screen.getByTestId("Returns");
      const all_orders = screen.getByTestId("all_orders");

      fireEvent.press(processing);
      fireEvent.press(Delivered);
      fireEvent.press(Returns);
      fireEvent.press(all_orders);
    });
    then("user goes back", () => {
      const backbutton = screen.getByTestId("backButtonId");
      fireEvent.press(backbutton);
    });
    then("component mounts api hits and user is able to see products", () => {
      const ProductcallMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ProductcallMsg
      );
      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        productData
      );

      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ProductcallMsg.messageId
      );
      screen.container.instance.getProductDetailsApiCallId =
        ProductcallMsg.messageId;
      runEngine.sendMessage("Unit Test", ProductcallMsg);

      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: "Catalogues not found.",
        }
      );

      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ProductcallMsg.messageId
      );
      screen.container.instance.getProductDetailsApiCallId =
        ProductcallMsg.messageId;
      runEngine.sendMessage("Unit Test", ProductcallMsg);
      expect(ProductcallMsg).toBeTruthy();
    });
    then("user clicks on the product", () => {
      screen.container.instance.setState({ productsArray: productData.data });
      const navigateToProduct = screen.getAllByTestId("navigateToProduct");
      fireEvent.press(navigateToProduct[0]);
    });
    then("component mounts api hits and wish list is created", () => {
      const createWishlist = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createWishlist
      );
      createWishlist.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        createWishlistresponse
      );

      createWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createWishlist.messageId
      );
      screen.container.instance.createWishlistforStylist =
        createWishlist.messageId;
      runEngine.sendMessage("Unit Test", createWishlist);
      expect(createWishlist).toBeTruthy();
    });
    then("user scrolls inorder to get more product lists", () => {
      const ProductcallMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ProductcallMsg
      );
      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        productData
      );

      ProductcallMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ProductcallMsg.messageId
      );
      screen.container.instance.getNextProductDetailsApiCallId =
        ProductcallMsg.messageId;
      runEngine.sendMessage("Unit Test", ProductcallMsg);

      expect(ProductcallMsg).toBeTruthy();
    });
    then("component mounts and wishlist details are fetched", () => {
      listener.simulateListener("willFocus");
      const getwishlistapi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getwishlistapi
      );
      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        getwishlistData
      );

      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getwishlistapi.messageId
      );
      screen.container.instance.getWishListApiCallId = getwishlistapi.messageId;
      runEngine.sendMessage("Unit Test", getwishlistapi);
      expect(getwishlistapi).toBeTruthy();
      screen.container.instance.componentDidMount();
    });

    then("added to wishlist", () => {
      listener.simulateListener("willFocus");
      const getwishlistapi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getwishlistapi
      );
      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        addTowishlistresponse
      );

      getwishlistapi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getwishlistapi.messageId
      );
      screen.container.instance.addToWishListApiCallId =
        getwishlistapi.messageId;
      runEngine.sendMessage("Unit Test", getwishlistapi);
      expect(getwishlistapi).toBeTruthy();
      screen.container.instance.componentDidMount();
      const touchableFeedback = screen.getAllByTestId("goTocategory");
      fireEvent.press(touchableFeedback[0]);
    });

    when("wish list true in product list", () => {
      productData.data[0].attributes.is_wishlist = true;
      productData.data[1].attributes.is_wishlist = true;
      screen.container.instance.setState({ productsArray: productData.data });
    });
    then("user is able to remove the wishlist", () => {
      const touchableFeedback = screen.getAllByTestId("removeWishlist");
      fireEvent.press(touchableFeedback[0]);
    });

    when("modal is true", () => {
      let checkArray = new Array(wishlistData.length).fill(true);
      screen.container.instance.setState({
        productsArray: productData.data,
        modalTrue: true,
        ischeked: checkArray,
        wishlistData: wishlistData,
      });
    });
    then("stylist selects the user and adds the product to wishlist", () => {
      const checbox = screen.getAllByTestId("checkbox");
      fireEvent.press(checbox[0]);
      const addwishListButton = screen.getAllByTestId("goTocategory");
      fireEvent.press(addwishListButton[0]);
    });
    then("stylist can search and find the clients in modal", () => {
      const checbox = screen.getByTestId("Modalsearchbar");
      fireEvent.changeText(checbox, "my");
    });
  });
});
