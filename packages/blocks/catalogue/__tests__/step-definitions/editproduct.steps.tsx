import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import EditProduct from "../../src/EditProduct";

const dummyCatalogueDetails = {
  id: "12345",
  attributes: {
    name: "Elegant Dress",
    name_arabic: "فستان أنيق",
    prodcut_care: "Machine wash cold",
    prodcut_care_arabic: "غسيل آلي بارد",
    description: "A stylish evening gown.",
    description_arabic: "فستان سهرة أنيق.",
    gender: "female",
    gender_arabic: "أنثى",
    fit: "Slim Fit",
    fit_arabic: "مقاس ضيق",
    material: "Cotton",
    material_arabic: "قطن",
    brand_name: "FashionCo",
    brand_name_arabic: "موضةكو",
    category: {
      id: "cat1",
      attributes: {
        name: "Clothing",
      },
    },
    sub_category: {
      id: "subcat1",
      attributes: {
        name: "Dresses",
      },
    },
    sub_sub_category: {
      id: "subsubcat1",
      attributes: {
        name: "Evening Wear",
      },
    },
    list_the_product: "listed",
    catalogue_variants: [
      {
        attributes: {
          catalogue_variant_color_id: 1,
          catalogue_variant_size_id: 101,
        },
      },
      {
        attributes: {
          catalogue_variant_color_id: 2,
          catalogue_variant_size_id: 102,
        },
      },
      {
        attributes: {
          catalogue_variant_color_id: null,
          catalogue_variant_size_id: 103,
        },
      },
    ],
    catalogue_variants_with_store: [
      {
        store_info: {
          id: "store1",
        },
      },
      {
        store_info: {
          id: "store2",
        },
      },
      {
        store_info: null,
      },
    ],
  },
};


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
  id: "EditProduct",
};


jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(() =>
    Promise.resolve({
      path: "mobile/image.png",
      data: 'mocked-image-data',
    }),
  ),
  openCamera: jest.fn(() => Promise.resolve({
    path: "",
    data: 'mocked-image-data',
  }),),
}));




const storeMockData = {
  "data": [
    {
      "id": "100",
      "type": "bussiness",
      "attributes": {
        "store_name": "Nyk",
        "image": 
          "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
     
      }
    },
    {
      "id": "99",
      "type": "bussiness",
      "attributes": {
        "store_name": "puma",
        "image": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
        
      }
    },
    {
      "id": "87",
      "type": "bussiness",
      "attributes": {
        "store_name": "kk",
        "image": "file:///storage/emulated/0/Android/data/com.FashionAggregator/files/Pictures/355b8f4d-8660-496b-b658-584470648359.jpg"
        
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




const navigationProductDetailsMockData = {
  "id": "208",
  "type": "catalogue",
  "attributes": {
    "name": "casual t shirt",
    "brand": null,
    "tags": {
      "data": []
    },
    "reviews": [],
    "sku": null,
    "description": "best for Summer shsh jsjs",
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
    "primary_image": "jhhjhjhj",
    "primary_price": "46.0",
    "gender": "male",
    "brand_name": "bjk",
    "material": "cotten",
    "fit": "hghjj ",
    "prodcut_care": "jhfhgf kg kg",
    "list_the_product": "listed",
    "fit_discription": null,
    "category": {
      "id": "66",
      "type": "category",
      "attributes": {
        "id": 66,
        "name": "Men's Clothing",
        "status": "active",
        "created_at": "2023-12-08T10:31:07.151Z",
        "updated_at": "2023-12-19T12:56:16.170Z",
        "image": "jkjkjkkjkjjk"
      }
    },
    "sub_category": {
      "id": "443",
      "type": "sub_category",
      "attributes": {
        "id": 443,
        "name": "T-shirts",
        "created_at": "2023-12-08T10:31:07.220Z",
        "updated_at": "2023-12-08T10:31:07.220Z",
        "image": ""
      }
    },
    "sub_sub_category": {
      "id": "27",
      "type": "sub_sub_category",
      "attributes": {
        "id": 27,
        "name": "Graphic Tees",
        "created_at": "2023-12-08T10:31:07.235Z",
        "updated_at": "2023-12-08T10:31:07.235Z",
        "image": ""
      }
    },
    "service": null,
    "average_rating": 0,
    "catalogue_variants": [
      {
        "id": "309",
        "type": "catalogue_variant",
        "attributes": {
          "id": 309,
          "catalogue_id": 208,
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
          "price": "46.0",
          "stock_qty": 30,
          "on_sale": null,
          "sale_price": null,
          "discount_price": null,
          "length": null,
          "breadth": null,
          "height": null,
          "created_at": "2024-03-14T19:11:30.847Z",
          "updated_at": "2024-03-14T19:11:30.862Z",
          "sku": "sjsnsb",
          "low_stock_threshold": 0,
          "is_listed": true,
          "front_image": "ghghghgh",
          "back_image": "",
          "side_image": "",
          "pair_it_with": []
        }
      },
      {
        "id": "310",
        "type": "catalogue_variant",
        "attributes": {
          "id": 310,
          "catalogue_id": 208,
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
          "price": "50.0",
          "stock_qty": 19,
          "on_sale": null,
          "sale_price": null,
          "discount_price": null,
          "length": null,
          "breadth": null,
          "height": null,
          "created_at": "2024-03-14T19:11:30.862Z",
          "updated_at": "2024-03-14T19:11:30.875Z",
          "sku": "Babjk",
          "low_stock_threshold": 0,
          "is_listed": true,
          "front_image": "jhjjkhg",
          "back_image": "",
          "side_image": "",
          "pair_it_with": []
        }
      }
    ],
    "catalogue_variants_with_store": [
      {
        "store_info": {
          "id": "99",
        }
      },
    ]
  }
}

const updateApiMockData = {
  "data": navigationProductDetailsMockData
}

const mockIntializeVariantResponse = [
  {
    "id": 309,
    "catalogue_id": 208,
    "catalogue_variant_color_id": 7,
    "catalogue_variant_size_id": 1,
    "price": "46.0",
    "stock_qty": 30,
    "on_sale": null,
    "sale_price": null,
    "discount_price": null,
    "length": null,
    "breadth": null,
    "height": null,
    "created_at": "2024-03-14T19:11:30.847Z",
    "updated_at": "2024-03-14T19:11:30.862Z",
    "block_qty": null,
    "sku": "sjsnsb",
    "low_stock_threshold": 0,
    "is_listed": true,
    "remove_front_image": null,
    "remove_back_image": null,
    "remove_side_image": null,
    "variant_color": "Grey",
    "variant_size": "Small",
    "front_image": "hjgggh",
    "side_image": null,
    "back_image": null
  },
  {
    "id": null,
    "catalogue_id": 208,
    "catalogue_variant_color_id": 7,
    "catalogue_variant_size_id": 3,
    "price": null,
    "stock_qty": null,
    "on_sale": null,
    "sale_price": null,
    "discount_price": null,
    "length": null,
    "breadth": null,
    "height": null,
    "created_at": null,
    "updated_at": null,
    "block_qty": null,
    "sku": null,
    "low_stock_threshold": 0,
    "is_listed": true,
    "remove_front_image": null,
    "remove_back_image": null,
    "remove_side_image": null,
    "variant_color": "Grey",
    "variant_size": "Large",
    "front_image": null,
    "side_image": null,
    "back_image": null
  }
]

const categoryMockData = {
  "data": [
    {
      "id": "61",
      "type": "category",
      "attributes": {
        "id": 61,
        "name": "New Arrivals",
        "status": "active",
        "created_at": "2023-09-26T13:16:14.144Z",
        "updated_at": "2023-12-14T10:59:32.550Z",
        "image": "hhkjkj"
      }
    },
    {
      "id": "65",
      "type": "category",
      "attributes": {
        "id": 65,
        "name": "Women's Clothing",
        "status": "active",
        "created_at": "2023-12-08T10:31:06.580Z",
        "updated_at": "2023-12-14T10:56:24.931Z",
        "image": "ghhgjjghghj"
      }
    },]
}

const subCategoryMockData = {
  "data": [
    {
      "id": "470",
      "type": "sub_category",
      "attributes": {
        "id": 470,
        "name": "Women's New In",
        "created_at": "2023-12-08T10:31:08.939Z",
        "updated_at": "2023-12-14T11:01:57.062Z",
        "image": "hgghhghgjhg"
      }
    },
    {
      "id": "472",
      "type": "sub_category",
      "attributes": {
        "id": 472,
        "name": "Kids' New In",
        "created_at": "2023-12-08T10:31:09.085Z",
        "updated_at": "2023-12-19T12:56:32.862Z",
        "image": "ghjgghj"
      }
    },]
}

const subsubCategoryMock = {
  "data": [
    {
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
    {
      "id": "118",
      "type": "sub_sub_category",
      "attributes": {
        "id": 118,
        "name": "New Tops",
        "created_at": "2023-12-08T10:31:08.966Z",
        "updated_at": "2023-12-15T10:31:49.921Z",
        "image": "jhjhhjg"
      }
    },]
}

const sizeMockData = {
  "data": [
    {
      "id": "1",
      "type": "catalogue_variant_size",
      "attributes": {
        "id": 1,
        "name": "Small",
        "created_at": "2023-09-22T04:45:35.966Z",
        "updated_at": "2023-09-22T04:45:35.966Z"
      }
    },
    {
      "id": "3",
      "type": "catalogue_variant_size",
      "attributes": {
        "id": 3,
        "name": "Large",
        "created_at": "2023-09-22T04:45:48.783Z",
        "updated_at": "2023-09-22T04:45:48.783Z"
      }
    },
    {
      "id": "6",
      "type": "catalogue_variant_size",
      "attributes": {
        "id": 6,
        "name": "4efrsfdsfd",
        "created_at": "2023-10-06T04:45:41.059Z",
        "updated_at": "2023-10-06T04:45:41.059Z"
      }
    }
  ]
}

const colorMockData = {

  "data": [
    {
      "id": "7",
      "type": "catalogue_variant_color",
      "attributes": {
        "id": 7,
        "name": "Grey",
        "created_at": "2023-10-05T05:19:28.122Z",
        "updated_at": "2023-10-05T05:19:28.122Z"
      }
    },
    {
      "id": "10",
      "type": "catalogue_variant_color",
      "attributes": {
        "id": 10,
        "name": "Whiteee",
        "created_at": "2023-10-05T05:20:08.849Z",
        "updated_at": "2023-10-05T05:20:08.849Z"
      }
    }
  ]

}
const variantMock = [
  {
    "id": null,
    "catalogue_id": null,
    "catalogue_variant_color_id": 7,
    "catalogue_variant_size_id": 1,
    "price": null,
    "stock_qty": null,
    "on_sale": null,
    "sale_price": null,
    "discount_price": null,
    "length": null,
    "breadth": null,
    "height": null,
    "created_at": null,
    "updated_at": null,
    "block_qty": null,
    "sku": null,
    "low_stock_threshold": 0,
    "is_listed": true,
    "remove_front_image": null,
    "remove_back_image": null,
    "remove_side_image": null,
    "variant_color": "Grey",
    "variant_size": "Small",
    "front_image": null,
    "side_image": null,
    "back_image": null
  },
  {
    "id": 309,
    "catalogue_id": 208,
    "catalogue_variant_color_id": 7,
    "catalogue_variant_size_id": 1,
    "price": "46.0",
    "stock_qty": 30,
    "on_sale": null,
    "sale_price": null,
    "discount_price": null,
    "length": null,
    "breadth": null,
    "height": null,
    "created_at": "2024-03-14T19:11:30.847Z",
    "updated_at": "2024-03-14T19:11:30.862Z",
    "block_qty": null,
    "sku": "sjsnsb",
    "low_stock_threshold": 0,
    "is_listed": true,
    "remove_front_image": null,
    "remove_back_image": null,
    "remove_side_image": null,
    "variant_color": "Grey",
    "variant_size": "Small",
    "front_image": "jjhhjhj",
    "side_image": null,
    "back_image": null
},
]

const skuExistanceMock = {
  "already_exists": ["SKU001"]
}

const skuEmptyExistanceMock = {
  "already_exists": []
}
const feature = loadFeature(
  "./__tests__/features/editproduct-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to EditProduct", ({ given, when, then }) => {
    let EditProductWrapper: ShallowWrapper;
    let instance: EditProduct;

    given("I am a User loading EditProduct", () => {
      EditProductWrapper = shallow(<EditProduct {...screenProps} />);
    });

    when("I navigate to the EditProduct", () => {
      instance = EditProductWrapper.instance() as EditProduct;
    });

    then("EditProduct will load with out errors", () => {
      expect(EditProductWrapper).toBeTruthy();
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

    then("set recived catalogue details from navigation", () => {
      const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      payloadMsg.addData(
        getName(MessageEnum.ProductDetailsData),
        navigationProductDetailsMockData
      );
      runEngine.sendMessage("Unit Test", payloadMsg);
      expect(EditProductWrapper.state("productName")).toBe(navigationProductDetailsMockData.attributes.name)
    })
    then("load the initialize the variants", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockIntializeVariantResponse
      );
      instance.getCreateVarientsApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

    })

    then("I can get the error for missing values", () => {
      let inpProductName = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductName"
      );
      let txtInputProductNameArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductNameArabic"
      );
      txtInputProductNameArabic.props().onSubmitEditing()
      let txtInputMaterial = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputMaterial"
      );
      let txtInputMaterialArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputMaterialArabic"
      );
      txtInputMaterialArabic.props().onSubmitEditing()
      let txtInputFit = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputFit"
      );
      let txtInputFitArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputFitArabic"
      );
      txtInputFitArabic.props().onSubmitEditing()
      let txtInputProductCare = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductCare"
      );
      let txtInputProductCareArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductCareArabic"
      );
      txtInputProductCareArabic.props().onSubmitEditing()

      let txtInputProductDescription = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductDescription"
      );
      let txtInputProductDescriptionArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductDescriptionArabic"
      );
      let txtInputBrandArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBrandArabic"
      );
      txtInputBrandArabic.props().onSubmitEditing()
      txtInputBrandArabic.simulate("changeText", "");
      txtInputProductCare.simulate("changeText", "");
      txtInputProductCareArabic.simulate("changeText", "");


      txtInputFit.simulate("changeText", "");
      txtInputFitArabic.simulate("changeText", "");


      txtInputMaterial.simulate("changeText", "");
      txtInputMaterialArabic.simulate("changeText", "");


      inpProductName.simulate("changeText", "");
      txtInputProductNameArabic.simulate("changeText", "")
      txtInputProductDescription.simulate("changeText", "");
      txtInputProductDescriptionArabic.simulate("changeText", "");
      let inpBrand = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBrand"
      );

      inpBrand.simulate("changeText", "");
      let saveButton = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "productDetailsSaveBtn"
      );
      saveButton.simulate("press")

    })

    then("I can edit the product details", () => {
      let hideKeyboard = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      hideKeyboard.simulate('press')
      let inpProductName = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductName"
      );
      let selectGender = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectGender"
      );
      let selectGenderArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectGenderArabic"
      );
      selectGender.simulate('press')
      selectGenderArabic.simulate('press')
      let txtInputMaterial = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputMaterial"
      );
      let txtInputFit = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputFit"
      );
      let txtInputProductCare = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductCare"
      );

      let txtInputProductDescription = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductDescription"
      );
      let txtInputBrandArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBrandArabic"
      );
      txtInputBrandArabic.simulate("changeText", "kk ramnd");
      
      txtInputProductCare.simulate("changeText", "kk ramn");

      txtInputFit.simulate("changeText", "full");

      txtInputMaterial.simulate("changeText", "cotten");

      inpProductName.simulate("changeText", "wagon t-shirt");
      txtInputProductDescription.simulate("changeText", "big t shiers");
      let inpBrand = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBrand"
      );

      inpBrand.simulate("changeText", "Nike");

      let txtInputProductNameArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductNameArabic"
      );
      txtInputProductNameArabic.props().onSubmitEditing()
      let txtInputMaterialArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputMaterialArabic"
      );
      let txtInputFitArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputFitArabic"
      );
     
      let txtInputProductCareArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductCareArabic"
      );

      let txtInputProductDescriptionArabic = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductDescriptionArabic"
      );
      txtInputProductCareArabic.simulate("changeText", "Seller care");
      txtInputFitArabic.simulate("changeText", "fit arabic");
      txtInputMaterialArabic.simulate("changeText", "material arabic");
      txtInputProductNameArabic.simulate("changeText", "name arabic")
      txtInputProductDescriptionArabic.simulate("changeText", "des arabic");
    })


    then("I can load categories ,subcategories and subsubcategories", () => {
      let inpCategory = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectCategory"
      );

      inpCategory.simulate("focus");

      const categoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApi.messageId
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        categoryMockData
      );
      instance.getSubcategoriesApiCallMsgId = categoryApi.messageId;
      runEngine.sendMessage("Test", categoryApi);
      inpCategory.simulate("change", { label: "New Arrivals", value: "61" })
      expect(EditProductWrapper.state("category")).toBe("61")



      let inpSubCategory = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubCategory"
      );

      inpSubCategory.simulate("focus");
      const subcategoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subcategoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        subcategoryApi.messageId
      );
      subcategoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subCategoryMockData
      );
      instance.getcategoriesProductApiCallMsgId = subcategoryApi.messageId;
      runEngine.sendMessage("Test", subcategoryApi);
      inpSubCategory.simulate("change", { label: "Women's New In", value: "470" })
      expect(EditProductWrapper.state("subCategory")).toBe("470")

      let inpSubSubCategory = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubSubCategory"
      );

      inpSubSubCategory.simulate("focus");
      let inpSubSubCategorys = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubSubCategory"
      );

      inpSubSubCategorys.simulate("focus");
      const subsubCategoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subsubCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        subsubCategoryApi.messageId
      );
      subsubCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subsubCategoryMock
      );
      instance.getSubSubCategoriesApiCallMsgId = subsubCategoryApi.messageId;
      runEngine.sendMessage("Test", subsubCategoryApi);
      inpSubSubCategory.simulate("change", { label: "Latest Dresses", value: "117" })
      expect(EditProductWrapper.state("subSubCategory")).toBe("117")

    })

    then('I can update the product details', () => {
      let saveButton = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "productDetailsSaveBtn"
      );
      saveButton.simulate("press");
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        updateApiMockData
      );
      instance.updateProductDetailsApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
    })

    when("I can select update variants tab", () => {
      let UpdateVariantsBtn = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "updateVarient"
      );
      UpdateVariantsBtn.simulate("press")

    })
    then("I can load size and color list", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        sizeMockData
      );
      instance.getSizeListApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      const ColorapiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ColorapiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        ColorapiTestMsg.messageId
      );
      ColorapiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        colorMockData
      );
      instance.getColorListApiCallMsgId = ColorapiTestMsg.messageId;
      runEngine.sendMessage("Test", ColorapiTestMsg);
      let selectColor = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "btnVariantColor"
      );
      let SelectSize = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "btnVariantSize"
      );
      selectColor.simulate("change", { label: "Grey", value: "7" }, { label: "Whiteee", value: "10" })
      SelectSize.simulate("change", { label: "Small", value: "1" }, { label: "Large", value: "3" })

    })

    then("I can create the variant", () => {
      let createBtn = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "createBtn"
      );
      createBtn.simulate("press")
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        variantMock
      );
      instance.getCreateVarientsApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
    })

    then("I can enter all the values", () => {
      let quantInp = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputQuantity0"
      );
      quantInp.simulate("changeText", "0")
      let priceInp = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPrice0"
      );
      priceInp.simulate("changeText", "0")
      priceInp.simulate("changeText","25.0.0")
      let skuInp = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputsku0"
      );
      skuInp.simulate("changeText", "SKU001")

    })
    then("I can enter sku value if it alredy exist then it give the error", () => {
      let updateVariantSaveBtn = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "updateVariantSaveBtn"
      );
      updateVariantSaveBtn.simulate("press")
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        skuExistanceMock
      );
      instance.getCheckSkuValidationApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);



    })
    then("I can edit alredy exit sku", () => {
      let skuInp = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputsku0"
      );
      skuInp.simulate("changeText", "SKU002")
      let updateVariantSaveBtn = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "updateVariantSaveBtn"
      );
      updateVariantSaveBtn.simulate("press")

      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        skuEmptyExistanceMock
      );
      instance.getCheckSkuValidationApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

    })

   when("I can select upload image tab",()=>{
    let UpdateVariantsBtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "uploadImages"
    );
    UpdateVariantsBtn.simulate("press")
   })

   then("I can select the different type of view", () => {
    let frontViewButton = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "front0"
    );
    frontViewButton.simulate("press")
    let backViewButton = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "back0"
    );
    backViewButton.simulate("press")
    let sideViewButton = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "side0"
    );
    sideViewButton.simulate("press")

  })
  then("if I enter next button without image i should get the error", () => {
    let uploadImageSaveBtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "uploadImageSaveBtn"
    );
    uploadImageSaveBtn.simulate("press")
  })
  then("I can upload the image", () => {
    let uploadImagebtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "uploadImgbtn0"
    );
    uploadImagebtn.simulate("press")
    let uploadImageconfirmbtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "btnConfirm"
    );
    uploadImageconfirmbtn.simulate("press")
    uploadImagebtn.simulate("press")
    let uploadImageCameraRadioBtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "cameraBtn"
    );
    uploadImageCameraRadioBtn.simulate("press")
    uploadImageconfirmbtn.simulate("press")
    jest.mock('react-native-image-crop-picker', () => ({
      openPicker: jest.fn(() =>
        Promise.resolve({
          path: "mobile/image.png",
          data: 'mocked-image-data',
        }),
      ),
      openCamera: jest.fn(() => Promise.resolve({
        path: "image.png",
        data: 'mocked-image-data',
      }),),
    }));

  })

  then('I can update the variant details', () => {
    let uploadImageSaveBtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "uploadImageSaveBtn"
    );
    uploadImageSaveBtn.simulate("press")
    const apiTestMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    apiTestMsg.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      apiTestMsg.messageId
    );
    apiTestMsg.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      updateApiMockData
    );
    instance.updateProductDetailsApiCallMsgId = apiTestMsg.messageId;
    runEngine.sendMessage("Test", apiTestMsg);
  
  })

  when("I can select assign store tab",()=>{
    let assignStoreBtn = EditProductWrapper.findWhere(
      (node) => node.prop("testID") === "assignStore"
    );
    assignStoreBtn.simulate("press")
   })
   then('load the assign store details', () => {
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
    instance.getAllStoreApiCallId = apiTestMsg.messageId;
    runEngine.sendMessage("Test", apiTestMsg);


    expect(EditProductWrapper.state("assignStore")).toStrictEqual(storeMockData.data)
})

then("I can show all stores list", () => {
    const flatlist = EditProductWrapper.findWhere(
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
    const searchInputBox = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "searchInputBox"
    )
    searchInputBox.simulate("changeText", "nyk")
   
    flatlist.props().ListEmptyComponent();

});

then("I can select the all store checkbox", () => {
    const allBtnCheckBox = EditProductWrapper.findWhere(
        (node) => node.prop("testID") === "allBtnCheckBox"
    )
    allBtnCheckBox.simulate("press")
    expect(EditProductWrapper.state("selectedItem")).toStrictEqual(["100","99","87"])

    instance.handleCatalogueDetialsPropsData(dummyCatalogueDetails);

    
    instance.setState({
      productName: 'Test Product',
      genderText: 'Male',
      brand: 'Test Brand',
      category: '1',
      subCategory: '2',
      material: 'Cotton',
      fit: 'Regular',
      productCare: 'Hand wash',
      productDescription: 'Test Description',
      isListed: true,
      subSubCategory: '3',
      productArabicName: 'منتج اختبار',
      brandArabic: 'علامة تجارية اختبار',
      genderArabicText: 'ذكر',
      materialArabic: 'قطن',
      fitArabic: 'عادي',
      productCareArabic: 'غسل اليد',
      productDescriptionArabic: 'وصف الاختبار'
    });

    instance.handleProductDetailsSaveButton();

})

then("I can able to search the store", () => {
    const searchInputBox = EditProductWrapper.findWhere(
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
    instance.getAllStoreApiCallId = apiTestMsg.messageId;
    runEngine.sendMessage("Test", apiTestMsg);
    expect(EditProductWrapper.state("assignStore")).toStrictEqual(storeSearchMockData.data)
})

then('I can update the assign details', () => {
  let assignStoreSaveBtn = EditProductWrapper.findWhere(
    (node) => node.prop("testID") === "assignStoreSaveBtn"
  );
  assignStoreSaveBtn.simulate("press")
  const apiTestMsg = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  apiTestMsg.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    apiTestMsg.messageId
  );
  apiTestMsg.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    updateApiMockData
  );
  instance.updateProductDetailsApiCallMsgId = apiTestMsg.messageId;
  runEngine.sendMessage("Test", apiTestMsg);
  const errorApiMsgss = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
);
errorApiMsgss.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    errorApiMsgss.messageId
);
errorApiMsgss.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {data:{type:"stylist_accounts"}}
);
instance.getStylishProfileApiCallId = errorApiMsgss.messageId;
runEngine.sendMessage("ErrorTest", errorApiMsgss);
  const errorApiMsgs = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
);
errorApiMsgs.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    errorApiMsgs.messageId
);
errorApiMsgs.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {data:{type:"stylist_account"}}
);
instance.getStylishProfileApiCallId = errorApiMsgs.messageId;
runEngine.sendMessage("ErrorTest", errorApiMsgs);
let UpdateVariantsBtn = EditProductWrapper.findWhere(
  (node) => node.prop("testID") === "Upload Images"
);
UpdateVariantsBtn.simulate("press")
const apiTestMsgs = new Message(
  getName(MessageEnum.RestAPIResponceMessage)
);
apiTestMsgs.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  apiTestMsgs.messageId
);
apiTestMsgs.addData(
  getName(MessageEnum.RestAPIResponceSuccessMessage),
  updateApiMockData
);
instance.updateProductDetailsApiCallMsgId = apiTestMsgs.messageId;
runEngine.sendMessage("Test", apiTestMsgs);
})

    then("I can leave the screen with out errors", () => {
      const errorApiMsgs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    errorApiMsgs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorApiMsgs.messageId
    );
    errorApiMsgs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {errors:"stylist_account"}
    );
    instance.getStylishProfileApiCallId = errorApiMsgs.messageId;
    runEngine.sendMessage("ErrorTest", errorApiMsgs);
      instance.componentWillUnmount();
      expect(EditProductWrapper).toBeTruthy();
    });

  });
});
