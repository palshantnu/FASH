import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

import React from "react";
import VariantImages from "../../src/VariantImages";

const navigation = require("react-navigation");

const ProductData: any = {
  "addProductDetails": {
    "brand": "ni",
    "category": "61",
    "fit": "bj",
    "gender": "male",
    "isListed": "listed",
    "material": "ni",
    "productCare": "bm",
    "productDescription": "bn",
    "productName": "nish2",
    "subCategory": "470",
    "subSubCategory": "117"
  },
  "variants": [
    {
      "block_qty": null,
      "breadth": null,
      "catalogue_id": null,
      "catalogue_variant_color_id": 7,
      "catalogue_variant_size_id": 1,
      "created_at": null,
      "discount_price": null,
      "focusedView": "front",
      "height": null,
      "id": null,
      "is_listed": true,
      "length": null,
      "low_stock_threshold": 0,
      "on_sale": null,
      "price": "56",
      "remove_back_image": { uri: "abc.png" },
      "remove_front_image": { uri: "abc.png" },
      "remove_side_image": null,
      "sale_price": null,
      "sku": "Aaaao",
      "stock_qty": "23",
      "updated_at": null,
      "variant_color": "Grey",
      "variant_size": "Small"
    },
    {
      "id": null,
      "catalogue_id": null,
      "catalogue_variant_color_id": 7,
      "catalogue_variant_size_id": 3,
      "price": null,
      "stock_qty": null,
      "on_sale": null,
      "sale_price": null,
      "focusedView": 'side',
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
      "remove_side_image": { uri: "abc.png" },
      "variant_color": "Grey",
      "variant_size": "Large"
    }
  ]
};

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: jest.fn().mockReturnValue(ProductData),
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
  },
  id: "VariantImages",
};

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
          "image": "jkjjjjjk"
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
          "image": "hgghhg"
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

const catalogueErrorMock={ "errors": [
  {
      "name": "Catalogue already exist with this name, please create use another name"
  },
  {
      "catalogue_variants.sku": "Variant SKU has already been taken."
  }
]}

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

const feature = loadFeature("./__tests__/features/variantimages-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to variantimages", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: VariantImages;

    given("I am a User loading variantimages", () => {
      exampleBlockA = shallow(<VariantImages {...screenProps} />);
    });

    when("I navigate to the variantimages", () => {
      instance = exampleBlockA.instance() as VariantImages;
    });

    then("variantimages will load with out errors", () => {
      instance.setState({ loading: true })
      expect(exampleBlockA).toBeTruthy();
    });

    then("Set token from session response", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const receivedReqApiMessage = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "tokenstring"
      );
      instance.receive("from", receivedReqApiMessage);

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
      instance.setState({
        catalougeDetails: ProductData
      })
    });

    then("I can select the different type of view", () => {
      let frontViewButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "front0"
      );
      frontViewButton.simulate("press")
      let backViewButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "back0"
      );
      backViewButton.simulate("press")
      let sideViewButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "side0"
      );
      sideViewButton.simulate("press")

    })
    then("if I enter next button without image i should get the error", () => {
      let btnNext = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnNext"
      );
      btnNext.simulate("press")
    })
    then("I can upload the image", () => {
      let uploadImagebtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "uploadImgbtn"
      );
      uploadImagebtn.simulate("press")
      let uploadImageconfirmbtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnConfirm"
      );
      uploadImageconfirmbtn.simulate("press")
      uploadImagebtn.simulate("press")
      let uploadImageCameraRadioBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cameraBtn"
      );
      uploadImageCameraRadioBtn.simulate("press")
      uploadImageconfirmbtn.simulate("press")

    })

    then("I can delete the image",()=>{
      let frontViewButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "front0"
      );
      frontViewButton.simulate("press")
      let deleteButton = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "deletebtn0"
      );
      deleteButton.simulate("press")
    })
    then("I can enter next button to create the catalouge", () => {
      let btnNext = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnNext"
      );
      btnNext.simulate("press")
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
      instance.postCreateCatalougeApiCallMsgId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
      const tokenMsgs: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsgs.addData(getName(MessageEnum.ProductDetailsData), {addProductDetails:{productName:'dfdsf',gender:'male',brand:'dsfds',category:1,subCategory:1,subSubCategory:1,material:'dfsf',fit:'dsds',productCare:'dfsdf',isListed:"listed",productDescription:"dfdsf"},variants:[{catalogue_variant_color_id:"", catalogue_variant_size_id:"", stock_qty:"", price:"", sku:"", remove_back_image:"sdadsa", remove_front_image:'sadsad', remove_side_image:'sdads'}]});
      runEngine.sendMessage("Unit Test", tokenMsgs);
    })

    then("I can recive the error if unable to create the variant",()=>{
      let btnNext = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnNext"
      );
      btnNext.simulate("press")
      const errorApiMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    errorApiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorApiMsg.messageId
    );
    errorApiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueErrorMock
    );
    instance.postCreateCatalougeApiCallMsgId = errorApiMsg.messageId;
    runEngine.sendMessage("ErrorTest", errorApiMsg);

    })

    then("I can click back Icon with out errors", () => {
      const msgToken = new Message(getName(MessageEnum.AccoutLoginSuccess));
      msgToken.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);


      const buttonNavigate = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnBackVariantImage"
      )
      buttonNavigate.simulate("press")

    });

    then("I can click back button to navigate to previous screen", () => {
      const buttonNavigate = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnBack"
      )
      buttonNavigate.simulate("press")
      
      const errorApiMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
    );
    errorApiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        errorApiMsg.messageId
    );
    errorApiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{type:"stylist_account"}}
    );
    instance.getStylishApiCallId = errorApiMsg.messageId;
    runEngine.sendMessage("ErrorTest", errorApiMsg);

    const buttonNavigates = exampleBlockA.findWhere(
      (node) => node.prop("testID") == "btnNext"
    )
    buttonNavigates.simulate("press")
    const buttonNavigatess = exampleBlockA.findWhere(
      (node) => node.prop("testID") == "btnNext"
    )
    buttonNavigatess.simulate("press")
    const errorApiMsgs = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
  );
  errorApiMsgs.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      errorApiMsgs.messageId
  );
  errorApiMsgs.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {data:{type:"stylist_accountss"}}
  );
  instance.getStylishApiCallId = errorApiMsgs.messageId;
  runEngine.sendMessage("ErrorTest", errorApiMsgs);
  const errorApiMsgss = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
);
errorApiMsgss.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    errorApiMsgss.messageId
);
errorApiMsgss.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {data:{type:"stylist_accountss"}}
);
instance.createProductsID = errorApiMsgss.messageId;
runEngine.sendMessage("ErrorTest", errorApiMsgss);
const errorApiMsgsss = new Message(
  getName(MessageEnum.RestAPIResponceMessage)
);
errorApiMsgsss.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  errorApiMsgsss.messageId
);
errorApiMsgsss.addData(
  getName(MessageEnum.RestAPIResponceSuccessMessage),
  {errors:{type:"stylist_accountss"}}
);
instance.createProductsID = errorApiMsgsss.messageId;
runEngine.sendMessage("ErrorTest", errorApiMsgsss);
    });



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
    instance.getStylishApiCallId = errorApiMsgs.messageId;
    runEngine.sendMessage("ErrorTest", errorApiMsgs);
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
