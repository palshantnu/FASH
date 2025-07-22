import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 

import React from "react";
import Varients from "../../src/Varients";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
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
  id: "Varients",
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

const sizeMockData={
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

const colorMockData={
  
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

 const variantMock=[
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
      "variant_size": "Small"
  }
]

const multipleVariantMock=[
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
      "variant_size": "Large"
  }
]
 const skuExistanceMock={
  "already_exists": [
      "Aaaa1", "Aaaa2"
  ]
}

const skuExistanceEmptyMock={
  "already_exists": [
      "Aaaa1", "Aaaa2"
  ]
}

const feature = loadFeature("./__tests__/features/varients-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.doMock('react-native-element-dropdown', () => {});
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to varients", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Varients;

    given("I am a User loading varients", () => {
      exampleBlockA = shallow(<Varients {...screenProps} />);
    });

    when("I navigate to the varients", () => {
      instance = exampleBlockA.instance() as Varients;
      instance.handleImageOperation(false)
    });

    then("varients will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    then("set token from session response", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const tokenMsgs: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsgs.addData(getName(MessageEnum.ProductDetailsData), {addProductDetails:{productName:'dfdsf',gender:'male',brand:'dsfds',category:1,subCategory:1,subSubCategory:1,material:'dfsf',fit:'dsds',productCare:'dfsdf',isListed:"listed",productDescription:"dfdsf"},variants:[{catalogue_variant_color_id:"", catalogue_variant_size_id:"", stock_qty:"", price:"", sku:"", remove_back_image:"sdadsa", remove_front_image:'sadsad', remove_side_image:'sdads'}]});
      runEngine.sendMessage("Unit Test", tokenMsgs);
      const receivedReqApiMessage = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "tokenstring"
      );
      instance.receive("from", receivedReqApiMessage);

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    when("As a user i can select the size", () => {
      let SelectSize = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnVariantSize"
      );
 SelectSize.simulate("focus")
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
SelectSize.simulate("press");
expect(exampleBlockA.state("sizeList")).toEqual([
  { label: 'Small', value: '1' },
  { label: 'Large', value: '3' },
  { label: '4efrsfdsfd', value: '6' }
]);
    });
 
    then("As a user i can select the color", () => {
      let selectColor = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnVariantColor"
      );
      selectColor.simulate("focus")
      const apiTestMsg = new Message(
       getName(MessageEnum.RestAPIResponceMessage)
     );
     apiTestMsg.addData(
       getName(MessageEnum.RestAPIResponceDataMessage),
       apiTestMsg.messageId
     );
     apiTestMsg.addData(
       getName(MessageEnum.RestAPIResponceSuccessMessage),
       colorMockData
     );
     instance.getColorListApiCallMsgId = apiTestMsg.messageId;
     runEngine.sendMessage("Test", apiTestMsg);
     selectColor.simulate("press");
  
     expect(exampleBlockA.state("colorList")).toEqual([
      { label: 'Grey', value: '7' }, { label: 'Whiteee', value: '10' }
    ]);

    instance.setState({
      colorSelected:["7"],
      sizeSelected:["1"]
    })

    });

    when("I can create the variants", () => {
      let createBtn = exampleBlockA.findWhere(
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
     
    });
 
   then("If user click the next button without empty value it should give the error",()=>{
    let btnNext = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "btnNext"
    );
    btnNext.simulate("press")

   })
   

   then("user can enter all the values",()=>{
    let quantInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputQuantity0"
    );
    quantInp.simulate("changeText","0")
    let priceInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputPrice0"
    );
    priceInp.simulate("changeText","0")
    let skuInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku0"
    );
    skuInp.simulate("changeText","SKU001")
    let nextBtn = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "btnNext"
    );
    nextBtn.simulate("press")

   })
   
   then("user enter same sku value it should give the error",()=>{
    instance.setState({
      colorSelected:["7"],
      sizeSelected:["1","3"],

    })
     let createBtn = exampleBlockA.findWhere(
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
       multipleVariantMock
     );
     instance.getCreateVarientsApiCallMsgId = apiTestMsg.messageId;
     runEngine.sendMessage("Test", apiTestMsg);

 let quantInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputQuantity0"
    );
    quantInp.simulate("changeText","22")
    let priceInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputPrice0"
    );
    priceInp.simulate("changeText","25")
    priceInp.simulate("changeText","25.0.0")
    let skuInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku0"
    );
    skuInp.simulate("changeText","SKU001")

    let quantInp1 = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputQuantity1"
    );
    quantInp1.simulate("changeText","22")
    let priceInp1 = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputPrice1"
    );
    priceInp1.simulate("changeText","25")
    let skuInp1 = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku1"
    );
    skuInp1.simulate("changeText","SKU001")
    let nextBtn = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "btnNext"
    );
    nextBtn.simulate("press")
   })

   then("user enter sku value if it alredy exist then it give the error",()=>{
   
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

 
    let skuInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku0"
    );
    skuInp.simulate("changeText","Aaa1")

    let skuInp1 = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku1"
    );
    skuInp1.simulate("changeText","Aaa2")
    let nextBtn = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "btnNext"
    );
    nextBtn.simulate("press")
   })
 
   then("user can go to next screen with enter the valid values",()=>{
   
  const apiTestMsg = new Message(
       getName(MessageEnum.RestAPIResponceMessage)
     );
     apiTestMsg.addData(
       getName(MessageEnum.RestAPIResponceDataMessage),
       apiTestMsg.messageId
     );
     apiTestMsg.addData(
       getName(MessageEnum.RestAPIResponceSuccessMessage),
       skuExistanceEmptyMock
     );
     instance.getCheckSkuValidationApiCallMsgId = apiTestMsg.messageId;
     runEngine.sendMessage("Test", apiTestMsg);


    let skuInp = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku0"
    );
    skuInp.simulate("changeText","Aasda1")

    let skuInp1 = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "txtInputsku1"
    );
    skuInp1.simulate("changeText","Aaadsd2")
    let nextBtn = exampleBlockA.findWhere(
      (node) => node.prop("testID") === "btnNext"
    );
    nextBtn.simulate("press")
   })
    then("I can click back Icon with out errors", () => {
      const msgToken = new Message(getName(MessageEnum.AccoutLoginSuccess));
      msgToken.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
      

      const buttonNavigate = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnBack"
      )
      buttonNavigate.simulate("press")
      const buttonNavigate1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      )
      buttonNavigate1.simulate("press")
      
    });

    then("I can leave the screen with out errors", () => {
      const buttonNavigate = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnNext"
      )
      buttonNavigate.simulate("press")
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
