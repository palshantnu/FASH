import { defineFeature, loadFeature } from "jest-cucumber";
import {  shallow,ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";
import { beforeEach, jest, expect } from "@jest/globals";
import * as flash from "react-native-flash-message";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { Listener } from "../../../catalogue/__mock__/eventlistener"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
import React from "react";
import Productdescription3 from "../../src/Productdescription3";
import Productdescription3Controller from "../../src/Productdescription3Controller";

import { dummyProduct, addToCartSuccess,dummyProductWithAddress } from "../__mocks__/responses";
import * as alert from "../../../../components/src/CustomAlert";
import i18n from "../../../../components/src/i18n/i18n.config";
const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    getParam: jest.fn().mockReturnValueOnce("100").mockReturnValue(""),
    addListener: listener.addEventListener,
  },
  id: "Productdescription3",
};

const feature = loadFeature(
  "./__tests__/features/productdescription3-scenario.feature"
);

const dummyProduct2 = {
  data: {
    id: "100",
    type: "catalogue",
    attributes: {
      name: "Offer catalogue26",
      brand: null,
      tags: [],
      reviews: [],
      sku: null,
      description: "Lorem Ipsum",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      stock_qty: null,
      availability: null,
      weight: null,
      price: null,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      is_wishlist: false,
      product_number: null,
      primary_image:
        "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
      gender: "female",
      brand_name: "Hues",
      material: "Cotton",
      fit: "Slimfit",
      prodcut_care: "Handwash",
      list_the_product: "listed",
      fit_discription: null,
      category: {
        id: "65",
        type: "category",
        attributes: {
          id: 65,
          name: "Women's Clothing",
          status: "active",
          created_at: "2023-12-08T10:31:06.580Z",
          updated_at: "2023-12-14T10:56:24.931Z",
          image:
            "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
        },
      },
      sub_category: {
        id: "435",
        type: "sub_category",
        attributes: {
          id: 435,
          name: "Dresses",
          created_at: "2023-12-08T10:31:06.697Z",
          updated_at: "2023-12-08T10:31:06.697Z",
          image: "",
        },
      },
      sub_sub_category: {
        id: "1",
        type: "sub_sub_category",
        attributes: {
          id: 1,
          name: "Casual Dresses",
          created_at: "2023-12-08T10:31:06.744Z",
          updated_at: "2023-12-08T10:31:06.744Z",
          image: "",
        },
      },
      service: null,
      average_rating: 0,
      catalogue_variants: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
        },
      ],
      catalogue_variants_with_store: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            custom_lp : 10,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
          store_info: {
            id: "14",
            type: "bussiness",
            attributes: undefined,
          },
        },
      ],
      owner_first_name: "fashion",
      owner_last_name: "fashion",
      owner_full_name: "fashion fashion",
      owner_address: null
    },
  },
};

const dummyProduct3 = {
  data: {
    id: "100",
    type: "catalogue",
    attributes: {
      name: "Offer catalogue26",
      brand: null,
      tags: [],
      reviews: [],
      sku: null,
      description: "Lorem Ipsum",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      stock_qty: null,
      availability: null,
      weight: null,
      price: null,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      is_wishlist: false,
      product_number: null,
      primary_image:
        "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
      gender: "female",
      brand_name: "Hues",
      material: "Cotton",
      fit: "Slimfit",
      prodcut_care: "Handwash",
      list_the_product: "listed",
      fit_discription: null,
      category: {
        id: "65",
        type: "category",
        attributes: {
          id: 65,
          name: "Women's Clothing",
          status: "active",
          created_at: "2023-12-08T10:31:06.580Z",
          updated_at: "2023-12-14T10:56:24.931Z",
          image:
            "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
        },
      },
      sub_category: {
        id: "435",
        type: "sub_category",
        attributes: {
          id: 435,
          name: "Dresses",
          created_at: "2023-12-08T10:31:06.697Z",
          updated_at: "2023-12-08T10:31:06.697Z",
          image: "",
        },
      },
      sub_sub_category: {
        id: "1",
        type: "sub_sub_category",
        attributes: {
          id: 1,
          name: "Casual Dresses",
          created_at: "2023-12-08T10:31:06.744Z",
          updated_at: "2023-12-08T10:31:06.744Z",
          image: "",
        },
      },
      service: null,
      average_rating: 0,
      catalogue_variants: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
        },
      ],
      catalogue_variants_with_store: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            custom_lp : 10,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
          store_info: undefined,
        },
      ],
      owner_first_name: "fashion",
      owner_last_name: "fashion",
      owner_full_name: "fashion fashion",
      owner_address: null
    },
  },
};

const dummyProduct4 = {
  data: {
    id: "100",
    type: "catalogue",
    attributes: {
      name: "Offer catalogue26",
      brand: null,
      tags: [],
      reviews: [],
      sku: null,
      description: "Lorem Ipsum",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      stock_qty: null,
      availability: null,
      weight: null,
      price: null,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      is_wishlist: false,
      product_number: null,
      primary_image:
        "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
      gender: "female",
      brand_name: "Hues",
      material: "Cotton",
      fit: "Slimfit",
      prodcut_care: "Handwash",
      list_the_product: "listed",
      fit_discription: null,
      category: {
        id: "65",
        type: "category",
        attributes: {
          id: 65,
          name: "Women's Clothing",
          status: "active",
          created_at: "2023-12-08T10:31:06.580Z",
          updated_at: "2023-12-14T10:56:24.931Z",
          image:
            "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
        },
      },
      sub_category: {
        id: "435",
        type: "sub_category",
        attributes: {
          id: 435,
          name: "Dresses",
          created_at: "2023-12-08T10:31:06.697Z",
          updated_at: "2023-12-08T10:31:06.697Z",
          image: "",
        },
      },
      sub_sub_category: {
        id: "1",
        type: "sub_sub_category",
        attributes: {
          id: 1,
          name: "Casual Dresses",
          created_at: "2023-12-08T10:31:06.744Z",
          updated_at: "2023-12-08T10:31:06.744Z",
          image: "",
        },
      },
      service: null,
      average_rating: 0,
      catalogue_variants: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
        },
      ],
      catalogue_variants_with_store: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            custom_lp : 10,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
          store_info: {
            id: "14",
            type: "bussiness",
            attributes: {
              address: "123 Street, City",
              store_name: "HandM",
              description: null,
              area: "Test Area",
              block: "QA",
              mall_name: null,
              floor: "3",
              unit_number: null,
              city: "Dream City",
              zipcode: "123456",
              driver_instruction: null,
              average_shipping_time: null,
              payment_mode: [],
              store_operating_hours: {},
              status: "Pending",
              latitude: null,
              longitude: null,
              is_open: true,
              available_variants: [
                {
                  id: "119",
                  type: "inventory_management",
                  attributes: {
                    id: 119,
                    catalogue_id: 100,
                    product_name: "Offer catalogue26",
                    product_description: "Lorem Ipsum",
                    sku: "A26",
                    stock_qty: 26,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1025.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "female",
                    front_image:
                      "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
                  },
                },
                {
                  id: "127",
                  type: "inventory_management",
                  attributes: {
                    id: 127,
                    catalogue_id: 72,
                    product_name: "Casual Shoes",
                    product_description: "Lorem Ipsum",
                    sku: "Q5",
                    stock_qty: 50,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "8900.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "female",
                    front_image: "",
                  },
                },
                {
                  id: "96",
                  type: "inventory_management",
                  attributes: {
                    id: 96,
                    catalogue_id: 78,
                    product_name: "Offer catalogue3",
                    product_description: "Lorem Ipsum",
                    sku: "A3",
                    stock_qty: 3,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1002.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "male",
                    front_image: "",
                  },
                },
                {
                  id: "97",
                  type: "inventory_management",
                  attributes: {
                    id: 97,
                    catalogue_id: 79,
                    product_name: "Offer catalogue4",
                    product_description: "Lorem Ipsum",
                    sku: "A4",
                    stock_qty: 4,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1003.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "male",
                    front_image: "",
                  },
                },
              ],
              image: null,
              email: "tvsseller@yopmail.com",
              contact_number: {
                country_code: "+91",
                phone_number: "9876543210",
              },
              expected_delivery_time: "2024-02-21T14:52:49.764Z",
            },
          },
        },
      ],
      owner_first_name: "fashion",
      owner_last_name: "fashion",
      owner_full_name: "fashion fashion",
      owner_address: null
    },
  },
};

const dummyProduct5 = {
  data: {
    id: "100",
    type: "catalogue",
    attributes: {
      name: "Offer catalogue26",
      brand: null,
      tags: [],
      reviews: [],
      sku: null,
      description: "Lorem Ipsum",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      stock_qty: null,
      availability: null,
      weight: null,
      price: null,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      is_wishlist: false,
      product_number: null,
      primary_image:
        "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
      gender: "female",
      brand_name: "Hues",
      material: "Cotton",
      fit: "Slimfit",
      prodcut_care: "Handwash",
      list_the_product: "listed",
      fit_discription: "Small",
      category: {
        id: "65",
        type: "category",
        attributes: {
          id: 65,
          name: "Women's Clothing",
          status: "active",
          created_at: "2023-12-08T10:31:06.580Z",
          updated_at: "2023-12-14T10:56:24.931Z",
          image:
            "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
        },
      },
      sub_category: {
        id: "435",
        type: "sub_category",
        attributes: {
          id: 435,
          name: "Dresses",
          created_at: "2023-12-08T10:31:06.697Z",
          updated_at: "2023-12-08T10:31:06.697Z",
          image: "",
        },
      },
      sub_sub_category: {
        id: "1",
        type: "sub_sub_category",
        attributes: {
          id: 1,
          name: "Casual Dresses",
          created_at: "2023-12-08T10:31:06.744Z",
          updated_at: "2023-12-08T10:31:06.744Z",
          image: "",
        },
      },
      service: null,
      average_rating: 0,
      catalogue_variants: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
        },
      ],
      catalogue_variants_with_store: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            custom_lp : 10,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
          store_info: {
            id: "14",
            type: "bussiness",
            attributes: {
              address: undefined,
              store_name: "HandM",
              description: null,
              area: "Test Area",
              block: "QA",
              mall_name: null,
              floor: "3",
              unit_number: null,
              city: "Dream City",
              zipcode: "123456",
              driver_instruction: null,
              average_shipping_time: null,
              payment_mode: [],
              store_operating_hours: {},
              status: "Pending",
              latitude: null,
              longitude: null,
              is_open: true,
              available_variants: [
                {
                  id: "119",
                  type: "inventory_management",
                  attributes: {
                    id: 119,
                    catalogue_id: 100,
                    product_name: "Offer catalogue26",
                    product_description: "Lorem Ipsum",
                    sku: "A26",
                    stock_qty: 26,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1025.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "female",
                    front_image:
                      "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
                  },
                },
                {
                  id: "127",
                  type: "inventory_management",
                  attributes: {
                    id: 127,
                    catalogue_id: 72,
                    product_name: "Casual Shoes",
                    product_description: "Lorem Ipsum",
                    sku: "Q5",
                    stock_qty: 50,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "8900.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "female",
                    front_image: "",
                  },
                },
                {
                  id: "96",
                  type: "inventory_management",
                  attributes: {
                    id: 96,
                    catalogue_id: 78,
                    product_name: "Offer catalogue3",
                    product_description: "Lorem Ipsum",
                    sku: "A3",
                    stock_qty: 3,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1002.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "male",
                    front_image: "",
                  },
                },
                {
                  id: "97",
                  type: "inventory_management",
                  attributes: {
                    id: 97,
                    catalogue_id: 79,
                    product_name: "Offer catalogue4",
                    product_description: "Lorem Ipsum",
                    sku: "A4",
                    stock_qty: 4,
                    low_stock_threshold: 0,
                    is_listed: true,
                    price: "1003.0",
                    size: "Small",
                    colour: "Grey",
                    gender: "male",
                    front_image: "",
                  },
                },
              ],
              image: null,
              email: "tvsseller@yopmail.com",
              contact_number: {
                country_code: "+91",
                phone_number: "9876543210",
              },
              expected_delivery_time: "2024-02-21T14:52:49.764Z",
            },
          },
        },
      ],
      owner_first_name: "fashion",
      owner_last_name: "fashion",
      owner_full_name: "fashion fashion",
      owner_address: null
    },
  },
};

const dummyProduct6 = {
  data: {
    id: "100",
    type: "catalogue",
    attributes: {
      name: "Offer catalogue26",
      brand: null,
      tags: [],
      reviews: [],
      sku: null,
      description: "Lorem Ipsum",
      manufacture_date: null,
      length: null,
      breadth: null,
      height: null,
      stock_qty: null,
      availability: null,
      weight: null,
      price: null,
      recommended: null,
      on_sale: null,
      sale_price: null,
      discount: null,
      is_wishlist: false,
      product_number: null,
      primary_image:
        "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
      gender: "female",
      brand_name: "Hues",
      material: "Cotton",
      fit: "Slimfit",
      prodcut_care: "Handwash",
      list_the_product: "listed",
      fit_discription: null,
      category: {
        id: "65",
        type: "category",
        attributes: {
          id: 65,
          name: "Women's Clothing",
          status: "active",
          created_at: "2023-12-08T10:31:06.580Z",
          updated_at: "2023-12-14T10:56:24.931Z",
          image:
            "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
        },
      },
      sub_category: {
        id: "435",
        type: "sub_category",
        attributes: {
          id: 435,
          name: "Dresses",
          created_at: "2023-12-08T10:31:06.697Z",
          updated_at: "2023-12-08T10:31:06.697Z",
          image: "",
        },
      },
      sub_sub_category: {
        id: "1",
        type: "sub_sub_category",
        attributes: {
          id: 1,
          name: "Casual Dresses",
          created_at: "2023-12-08T10:31:06.744Z",
          updated_at: "2023-12-08T10:31:06.744Z",
          image: "",
        },
      },
      service: null,
      average_rating: 0,
      catalogue_variants: [
        {
          id: "119",
          type: "catalogue_variant",
          attributes: {
            id: 119,
            catalogue_id: 100,
            catalogue_variant_color_id: 7,
            catalogue_variant_color: {
              id: 7,
              name: "Grey",
              created_at: "2023-10-05T05:19:28.122Z",
              updated_at: "2023-10-05T05:19:28.122Z",
            },
            catalogue_variant_size_id: 1,
            catalogue_variant_size: {
              id: 1,
              name: "Small",
              created_at: "2023-09-22T04:45:35.966Z",
              updated_at: "2023-09-22T04:45:35.966Z",
            },
            price: "1025.0",
            stock_qty: 26,
            on_sale: null,
            sale_price: null,
            discount_price: null,
            length: null,
            breadth: null,
            height: null,
            created_at: "2024-02-01T11:01:12.461Z",
            updated_at: "2024-02-12T10:07:07.627Z",
            low_stock_threshold: 0,
            is_listed: true,
            front_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
            back_image:
              "https://example.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
            side_image: "",
            pair_it_with: [
              {
                id: "121",
                type: "inventory_management",
                attributes: {
                  id: 121,
                  catalogue_id: 102,
                  product_name: "Offer catalogue28",
                  product_description: "Lorem Ipsum",
                  sku: "A28",
                  stock_qty: 28,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1027.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
              {
                id: "120",
                type: "inventory_management",
                attributes: {
                  id: 120,
                  catalogue_id: 101,
                  product_name: "Offer catalogue27",
                  product_description: "Lorem Ipsum",
                  sku: "A27",
                  stock_qty: 3,
                  low_stock_threshold: 0,
                  is_listed: true,
                  price: "1026.0",
                  size: "Small",
                  colour: "Grey",
                  gender: "male",
                  front_image: "",
                },
              },
            ],
          },
        },
      ],
      catalogue_variants_with_store: [],
      owner_first_name: "fashion",
      owner_last_name: "fashion",
      owner_full_name: "fashion fashion",
      owner_address: null
    },
  },
};

defineFeature(feature, (test) => {
  const flashSpy = jest.spyOn(flash, "showMessage");
  const spy = jest.spyOn(runEngine, "sendMessage");

  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    flashSpy.mockClear();
    spy.mockClear();
  });

  test("User navigates to productdescription", ({ given, when, then, and }) => {
    let productDescription: ReturnType<typeof render>;
    let productinstance:Productdescription3 
    let productBlock:ShallowWrapper;
    given("I am a User loading productdescription", () => {
      i18n.language = "en";
      productDescription = render(<Productdescription3 {...screenProps} />);
      productBlock = shallow(<Productdescription3 {...screenProps}/>)
      productinstance = productBlock.instance() as Productdescription3;
    });

    when("I navigate to the productdescription", async() => {
      listener.simulateListener("willFocus");
      
      expect(productDescription.getByTestId("custom-loader")).toBeTruthy();

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      runEngine.sendMessage("Unit Test", npmessage);

      // send again to check `getParam()`
      runEngine.sendMessage("Unit Test", sessionMessage);

      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct5
      );
      runEngine.sendMessage("Unit Test", prod);
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct4
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    then("productdescription will load with out errors", () => {
      expect(
        productDescription.findByTestId("product-description")
      ).toBeTruthy();
    });

    and("I can click on share", () => {
      fireEvent.press(productDescription.getByTestId("share"));
    });

    and("I can click on wishlist", () => {
      fireEvent.press(productDescription.getByTestId("wishlist"));
    });

    when("There are multiple photos", () => {
      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    then("I see dot indicators", () => {
      expect(productDescription.getByTestId("swiperDots")).toBeTruthy();
    });

    when("There is one photo", () => {
      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: {
          ...dummyProduct.data,
          attributes: {
            ...dummyProduct.data.attributes,
            catalogue_variants_with_store:
              dummyProduct.data.attributes.catalogue_variants_with_store.map(
                (item) => {
                  const newItem = { ...item };
                  newItem.attributes.front_image = "";
                  newItem.attributes.side_image = "";
                  newItem.attributes.back_image = "";
                  return newItem;
                }
              ),
          },
        },
      });
      runEngine.sendMessage("Unit Test", prod);
    });

    then("I see no dot indicators", () => {
      expect(productDescription.queryByTestId("swiperDots")).toBeFalsy();
    });

    when("I click on wishlist button", () => {
      fireEvent.press(productDescription.getByTestId("wishlist"));
    });

    then("product gets wishlisted", () => {
      expect(productDescription.queryByTestId("heart-icon")).not.toBeNull();
    });

    when("I click on wishlist again", () => {
      const wishlist = productDescription.getByTestId("wishlist");
      fireEvent.press(wishlist);
    });

    then("product gets removed from wishlist", () => {
      expect(productDescription.queryByTestId("hearto-icon")).not.toBeNull();
    });

    then("I can check for descriptionText",()=> {
      productinstance.getDescriptionText(
        "uhwbcw",
        "dihwduiwb"
      )
    } )
  });

  test("User changes variants", ({ given, when, then }) => {
    let productDescription: ReturnType<typeof render>;

    given("I am a user on loaded product description screen", () => {
      i18n.language = "ar";
      productDescription = render(<Productdescription3 {...screenProps} />);

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      runEngine.sendMessage("Unit Test", npmessage);
    });

    when("I change color", async() => {
      jest.spyOn(utils, "getStorageData").mockImplementation((key):any => {
     
        if (key === "token") {
          return null;
        }
       
    })
    await  productDescription.container.instance.componentDidMount()
      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);

      const colorDropDown = productDescription.getByTestId("color-dd");
      fireEvent(colorDropDown, "change", {
        id: 7,
        name: "Grey",
        created_at: "2023-10-05T05:19:28.122Z",
        updated_at: "2023-10-05T05:19:28.122Z",
      });
    });

    then("size also gets changed", () => {
      expect(
        productDescription.queryAllByText("Small", { exact: false })
      ).not.toBeNull();
    });
  });

  test("User toggles accordions", ({ given, when, then }) => {
    let productDescription: ReturnType<typeof render>;
    let productBlock:ShallowWrapper;
    let productinstance:Productdescription3
    given("All the accordions are open", () => {
      productDescription = render(<Productdescription3 {...screenProps} />);
      productBlock = shallow(<Productdescription3 {...screenProps}/>)
      productinstance = productBlock.instance() as Productdescription3; 
      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    when("I click on accordions", () => {
      fireEvent.press(productDescription.getByTestId("desc-toggle"));
      fireEvent.press(productDescription.getByTestId("size-toggle"));
      fireEvent.press(productDescription.getByTestId("care-toggle"));
      fireEvent.press(productDescription.getByTestId("price-toggle"));
      fireEvent.press(productDescription.getByTestId("store-info-toggle"));
      fireEvent.press(productDescription.getByTestId("btnNavigateStore"));

      expect(Productdescription3Controller.getStoreAddress()).toBe("");
    });

    then("It gets collapsed", async () => {
      expect(
        productDescription.getByTestId("store-info-ct").props.style.display
      ).toBe("none");
    });
  });

  test("User toggles accordions for stylist", ({ given, when, then }) => {
    let productDescription: ReturnType<typeof render>;
    let productBlock:ShallowWrapper;
    let productinstance:Productdescription3
    given("stylist the accordions are open", () => {
      productDescription = render(<Productdescription3 {...screenProps} />);
      productBlock = shallow(<Productdescription3 {...screenProps}/>)
      productinstance = productBlock.instance() as Productdescription3; 
      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProductWithAddress
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    when("I click on accordions", () => {
      fireEvent.press(productDescription.getByTestId("stylist-info-toggle"));
      fireEvent.press(productDescription.getByTestId("goBack"));

      expect(Productdescription3Controller.getStoreAddress()).toBe("");
    });

    then("It gets collapsed", async () => {
      expect(
        productDescription.getByTestId("stylist-info-ct").props.style.display
      ).toBe("none");
    });
  });

  test("Seller opens product description", ({ given, then }) => {
    let screen: ReturnType<typeof render>;
    given("product loaded successfully", () => {
      screen = render(<Productdescription3 {...screenProps} />);

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      npmessage.addData(getName(MessageEnum.ShowByStoreId), "100");
      runEngine.sendMessage("Unit Test", npmessage);

      // send again to check `getParam()`
      runEngine.sendMessage("Unit Test", sessionMessage);

      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      screen.container.instance.getProductDetailApiCallId = prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    then("there should be no wishlist button", () => {
      expect(screen.queryByTestId("wishlist")).toBeNull();
    });

    then("there should be no add to cart and buy now button", () => {
      expect(screen.queryByTestId("buyCartBtns")).toBeNull();
    });

    then("there should be no pair it with button", () => {
      expect(screen.queryByTestId("pair")).toBeNull();
    });
  });

  test("Guest User opens product description", ({ given, when, then }) => {
    let productDescription: ReturnType<typeof render>;
    let productBlock:ShallowWrapper;
    let productinstance:Productdescription3
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("user can see the product", () => {
      productDescription = render(<Productdescription3 {...screenProps} />);
      productBlock = shallow(<Productdescription3 {...screenProps}/>)
      productinstance = productBlock.instance() as Productdescription3; 

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(getName(MessageEnum.SessionResponseToken), "");
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      runEngine.sendMessage("Unit Test", npmessage);

      const product = new Message(getName(MessageEnum.RestAPIResponceMessage));
      product.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        product.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        product.messageId;
      product.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", product);
      let owner_address= {
        "address": "kn",
        "area": 'aw',
        "block": "test",
        "mall_name": "test",
        "floor": "test",
        "unit_number": 124,
        "city": "indore",
        "zipcode": "452001"
    }
      productinstance.setState({stylistAddress:owner_address})
      productinstance.addToCart()
    });

    when("user clicks on wishlist", () => {
      fireEvent.press(productDescription.getByTestId("wishlist"));
    });

    then("user gets sign in popup", () => {
      expect(alertSpy.mock.calls.length).toBe(1);
    });

    when("user clicks on buy now", () => {
      fireEvent.press(productDescription.getByTestId("buyNow"));
    });
    then("user gets sign in popup", () => {
      expect(alertSpy.mock.calls.length).toBe(2);
    });

    when("user clicks on add to cart", () => {
      fireEvent.press(productDescription.getByTestId("addToCart"));
      const addToCart = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      productDescription.container.instance.addToCartApiCallId =
        addToCart.messageId;
      addToCart.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: addToCart.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: addToCartSuccess,
      });
      runEngine.sendMessage("Unit Test", addToCart);
    });

    then("user goes to cart", () => {
      const navigation = spy.mock.calls.pop();
      expect(navigation).toEqual(
        expect.arrayContaining(["NavigationShoppingCartOrdersMessage"])
      );
    });
  });

  test("Guest User opens product description for details", ({ given, when, then }) => {
    let productDescription: ReturnType<typeof render>;
    let productBlock:ShallowWrapper;
    let productinstance:Productdescription3
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("user can see the product for details", () => {
      productDescription = render(<Productdescription3 {...screenProps} />);
      productBlock = shallow(<Productdescription3 {...screenProps}/>)
      productinstance = productBlock.instance() as Productdescription3; 

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(getName(MessageEnum.SessionResponseToken), "");
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      runEngine.sendMessage("Unit Test", npmessage);

      const product = new Message(getName(MessageEnum.RestAPIResponceMessage));
      product.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        product.messageId
      );
      productDescription.container.instance.getProductDetailApiCallId =
        product.messageId;
      product.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", product);
      let owner_address= {
        "address": "kn",
        "area": 'aw',
        "block": "test",
        "mall_name": "test",
        "floor": "test",
        "unit_number": 124,
        "city": "indore",
        "zipcode": "452001"
    }
      productinstance.setState({stylistAddress:owner_address,token:'qwewrwerw'})
      productinstance.addToCart()
    });

    when("user clicks on wishlist for details", () => {
      fireEvent.press(productDescription.getByTestId("wishlist"));
    });

    when("user clicks on buy now for details", () => {
      fireEvent.press(productDescription.getByTestId("buyNow"));
    });

    when("user clicks on add to cart for details", () => {
      productinstance.setState({stylistAddress:null,token:'qwewrwerw'})
      productinstance.addToCart()
      fireEvent.press(productDescription.getByTestId("addToCart"));
      const addToCart = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      productDescription.container.instance.addToCartApiCallId =
        addToCart.messageId;
      addToCart.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: addToCart.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: addToCartSuccess,
      });
      runEngine.sendMessage("Unit Test", addToCart);
    });

    then("user goes to cart for details", () => {
      productinstance.setState({languageUpdated:'en'});
      productinstance.getToken()
      const navigation = spy.mock.calls.pop();
      expect(navigation).toEqual(
        expect.arrayContaining(["NavigationShoppingCartOrdersMessage"])
      );
    });
  });

  test("Seller opens set selectd address", ({ given, then }) => {
    let screen: ReturnType<typeof render>;
    given("product loaded successfully set selectd address", () => {
      screen = render(<Productdescription3 {...screenProps} />);

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage("Unit Test", sessionMessage);

      const npmessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      npmessage.addData(getName(MessageEnum.productIDMessage), "100");
      npmessage.addData(getName(MessageEnum.ShowByStoreId), "100");
      runEngine.sendMessage("Unit Test", npmessage);

      // send again to check `getParam()`
      runEngine.sendMessage("Unit Test", sessionMessage);

      const prod = new Message(getName(MessageEnum.RestAPIResponceMessage));
      screen.container.instance.getProductDetailApiCallId = prod.messageId;
      prod.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        prod.messageId
      );
      prod.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyProduct
      );
      runEngine.sendMessage("Unit Test", prod);
    });

    then("there should be no wishlist button set selectd address", () => {
      expect(screen.queryByTestId("wishlist")).toBeNull();
    });

    then("there should be no add to cart and buy now button set selectd address", () => {
      expect(screen.queryByTestId("buyCartBtns")).toBeNull();
    });

    then("there should be no pair it with button set selectd address", () => {
      expect(screen.queryByTestId("pair")).toBeNull();
      screen.container.instance.handleProductResponse(dummyProduct3)
      screen.container.instance.handleProductResponse(dummyProduct4)
      screen.container.instance.handleProductResponse(dummyProduct5)
      screen.container.instance.handleProductResponse(dummyProduct6)
      
    });
  });
  
});
